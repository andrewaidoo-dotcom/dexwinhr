/* ============================================================================
 * DexwinPay — Ghana Payroll Calculation Engine  (2026 statutory year)
 * ----------------------------------------------------------------------------
 * Pure, framework-agnostic. No DOM, no storage, no network — give it numbers,
 * get back a fully itemised payslip. Safe to use in the browser frontend AND to
 * mirror inside a Supabase Edge Function / Postgres function so server-side
 * recomputation matches the UI cent-for-cent.
 *
 * Exposed as:  globalThis.PayrollEngine   and   module.exports (Node)
 *
 * SOURCES (verified Jun 2026):
 *  - SSNIT 2026 max insurable earning GHS 69,000; max Tier 1 (13.5%) GHS 9,315;
 *    min insurable earning GHS 587.79. Employee 5.5% / employer 13% = 18.5%,
 *    reported as Tier 1 13.5% + Tier 2 5%. Tier 1 caps; overflow → Tier 2.
 *  - GRA PAYE 2026 monthly bands: 490@0, 110@5%, 130@10%, 3166.67@17.5%,
 *    16000@25%, 30520@30%, remainder@35% (tax-free GHS 490/mo = 5,880/yr).
 *  - Contractors / independent: 7.5% withholding tax on gross, no SSNIT/PAYE.
 *  - NSS personnel: no SSNIT; PAYE only on the excess over the monthly stipend.
 * ==========================================================================*/
(function (root) {
  'use strict';

  /* ---- Statutory constants for the year. Bump these once a year. ---------- */
  var Y2026 = {
    year: 2026,
    ssnit: {
      maxInsurable: 69000,      // GHS / month — Tier 1 ceiling
      minInsurable: 587.79,     // GHS / month — Tier 1 floor
      employeeRate: 0.055,      // shown on payslip, tax-deductible
      employerRate: 0.13,       // employer cost
      tier1Rate: 0.135,         // reporting split — capped
      tier2Rate: 0.05,          // reporting split — receives overflow
      get tier1Max() { return +(this.tier1Rate * this.maxInsurable).toFixed(2); } // 9315
    },
    // GRA monthly PAYE bands: [width of band in GHS, marginal rate]. Last = Infinity.
    payeBands: [
      [490, 0], [110, 0.05], [130, 0.10],
      [3166.67, 0.175], [16000, 0.25], [30520, 0.30],
      [Infinity, 0.35]
    ],
    overtime: { juniorSplit: 0.5, lowRate: 0.05, highRate: 0.10 }, // 5% up to 50% of basic, then 10%
    contractorWHT: 0.075,        // services WHT
    nssMonthlyStipend: 759       // PAYE only applies above this for NSS personnel
  };

  function r2(n) { return Math.round((Number(n) || 0) * 100) / 100; }
  function clamp(n, lo, hi) { return Math.min(hi, Math.max(lo, n)); }

  /* ---- PAYE on a monthly taxable amount, returns tax + per-band breakdown -- */
  function paye(taxable, bands) {
    bands = bands || Y2026.payeBands;
    var rem = Math.max(0, Number(taxable) || 0), tax = 0, rows = [];
    for (var i = 0; i < bands.length; i++) {
      var width = bands[i][0], rate = bands[i][1];
      var amt = Math.min(rem, width);
      var t = amt * rate;
      if (amt > 0) rows.push({ band: i + 1, rate: rate, amount: r2(amt), tax: r2(t) });
      tax += t; rem -= amt;
      if (rem <= 0) break;
    }
    return { tax: r2(tax), bands: rows };
  }

  /* ---- Overtime tax (junior-staff model) ---------------------------------- */
  function overtimeTax(basic, ot, cfg) {
    cfg = cfg || Y2026.overtime;
    if (ot <= 0) return 0;
    var threshold = cfg.juniorSplit * basic;
    return ot <= threshold
      ? ot * cfg.lowRate
      : threshold * cfg.lowRate + (ot - threshold) * cfg.highRate;
  }

  /* ---- SSNIT: employee deduction + statutory Tier 1 / Tier 2 split -------- */
  function ssnit(basic, s) {
    s = s || Y2026.ssnit;
    var insurable = clamp(basic, 0, s.maxInsurable);     // employee side caps at ceiling
    var employee = r2(s.employeeRate * insurable);       // payslip deduction (max 3,795)
    var employer = r2(s.employerRate * basic);           // employer cost
    var totalMandatory = r2((s.employeeRate + s.employerRate) * basic); // 18.5% of basic
    var tier1 = r2(Math.min(s.tier1Rate * basic, s.tier1Max));          // capped at 9,315
    var tier2 = r2(totalMandatory - tier1);              // 5% of basic + any Tier 1 overflow
    var overflow = r2(Math.max(0, s.tier1Rate * basic - s.tier1Max));   // the part redirected
    return { employee: employee, employer: employer, insurable: r2(insurable),
             tier1: tier1, tier2: tier2, overflow: overflow, capped: basic > s.maxInsurable };
  }

  /* ========================================================================
   * calcPay(input) → full payslip
   * input = {
   *   employmentType: 'employee'|'contractor'|'independent'|'nss'|'intern',
   *   basic, taxableAllowance, nonTaxableAllowance, overtime,
   *   staffLoan, salaryAdvance,            // post-tax deductions
   *   additions: [{ name, amount, kind: 'overtime'|'reimbursement'|'cash'|'bonus' }],
   *   deductions:[{ name, amount, taxMode: 'pretax'|'posttax' }],
   *   ssnitMember: true|false              // employees can opt out (rare)
   * }
   * ====================================================================== */
  /* ---- Employment-type regimes (match the Employee Upload Template) ------- */
  var REGIME = {
    'full-time-resident':{r:'graduated',ssnit:true},
    'resident-part-time-resident':{r:'graduated',ssnit:true},
    'part-time-resident':{r:'graduated',ssnit:true},
    'casual-resident':{r:'casual',rate:0.05,ssnit:false},
    'casual':{r:'casual',rate:0.05,ssnit:false},
    'independent contractor':{r:'contractor',rate:0.075,ssnit:false},
    'contractor-full-time':{r:'contractor',rate:0.075,ssnit:false},
    'contractor':{r:'contractor',rate:0.075,ssnit:false},
    'independent':{r:'contractor',rate:0.075,ssnit:false},
    'nss':{r:'nss',ssnit:false},
    'intern':{r:'graduated',ssnit:true},
    'non-resident':{r:'nonresident',rate:0.25,ssnit:false},
    'employee':{r:'graduated',ssnit:true},
    'secondary@5%':{r:'secondary',rate:0.05,ssnit:false},
    'secondary@10%':{r:'secondary',rate:0.10,ssnit:false},
    'secondary@17.5%':{r:'secondary',rate:0.175,ssnit:false},
    'secondary@25%':{r:'secondary',rate:0.25,ssnit:false}
  };
  function regimeOf(t){ return REGIME[String(t||'employee').toLowerCase().trim()] || {r:'graduated',ssnit:true}; }

  function calcPay(input, opts) {
    var Y = (opts && opts.year) || Y2026;
    var type = input.employmentType || 'employee';
    var rg = regimeOf(type);

    var basic = +input.basic || 0;
    var taxAllow = +input.taxableAllowance || 0;
    var nonTax = +input.nonTaxableAllowance || 0;
    var overtime = +input.overtime || 0;

    (input.additions || []).forEach(function (a) {
      var amt = +a.amount || 0;
      if (a.kind === 'overtime') overtime += amt;
      else if (a.kind === 'reimbursement') nonTax += amt;
      else taxAllow += amt;
    });

    var preTaxDed = 0, postTaxItems = [];
    (input.deductions || []).forEach(function (d) {
      var amt = +d.amount || 0;
      if (d.taxMode === 'pretax') preTaxDed += amt;
      else postTaxItems.push({ name: d.name, amount: r2(amt) });
    });

    var gross = r2(basic + taxAllow + nonTax + overtime);
    var sn = { employee:0, employer:0, tier1:0, tier2:0, overflow:0, capped:false };
    var taxableIncome = 0, payeTax = 0, otTax = 0, wht = 0, flat = 0, flatRate = 0, taxLabel = 'PAYE';

    if (rg.r === 'contractor') { wht = r2(gross * rg.rate); taxLabel = 'WHT 7.5%'; }
    else if (rg.r === 'nonresident') { flat = r2(gross * rg.rate); flatRate = rg.rate; taxLabel = 'Non-resident 25%'; }
    else if (rg.r === 'casual') { flat = r2(gross * rg.rate); flatRate = rg.rate; taxLabel = 'Casual 5%'; }
    else if (rg.r === 'secondary') { flat = r2(gross * rg.rate); flatRate = rg.rate; taxLabel = 'Secondary ' + (rg.rate*100) + '%'; }
    else if (rg.r === 'nss') {
      var nssTaxable = Math.max(0, (basic + taxAllow) - Y.nssMonthlyStipend - preTaxDed);
      payeTax = paye(nssTaxable, Y.payeBands).tax; taxableIncome = r2(nssTaxable); taxLabel = 'PAYE (excl. stipend)';
    } else {
      if (rg.ssnit && input.ssnitMember !== false) sn = ssnit(basic, Y.ssnit);
      taxableIncome = r2(basic - sn.employee + taxAllow - preTaxDed);
      payeTax = paye(taxableIncome, Y.payeBands).tax;
      otTax = r2(overtimeTax(basic, overtime, Y.overtime));
    }

    var postTaxTotal = postTaxItems.reduce(function (a, x) { return a + x.amount; }, 0);
    var incomeTax = r2(payeTax + flat + wht);
    var totalDeduction = r2(
      sn.employee + payeTax + flat + otTax + wht +
      (+input.staffLoan || 0) + (+input.salaryAdvance || 0) + postTaxTotal
    );
    var net = r2(gross - totalDeduction);

    return {
      employmentType: type, regime: rg.r,
      basic: r2(basic), taxableAllowance: r2(taxAllow), nonTaxableAllowance: r2(nonTax),
      overtime: r2(overtime), gross: gross, taxableIncome: taxableIncome,
      ssnitEmployee: sn.employee, ssnitEmployer: sn.employer,
      tier1: sn.tier1, tier2: sn.tier2, tier1Overflow: sn.overflow, ssnitCapped: sn.capped,
      paye: payeTax, flatTax: flat, flatRate: flatRate, overtimeTax: otTax, withholdingTax: wht,
      incomeTax: incomeTax, taxLabel: taxLabel,
      staffLoan: r2(input.staffLoan), salaryAdvance: r2(input.salaryAdvance),
      postTaxDeductions: postTaxItems, preTaxDeductions: r2(preTaxDed),
      totalDeduction: totalDeduction, net: net, employerCost: r2(gross + sn.employer)
    };
  }

  /* ---- Aggregate a register (a whole payroll run) ------------------------- */
  function calcRegister(rows, opts) {
    var lines = rows.map(function (r) { return Object.assign({ ref: r.ref || r.id || null, name: r.name || null }, calcPay(r, opts)); });
    var sum = function (k) { return r2(lines.reduce(function (a, l) { return a + (l[k] || 0); }, 0)); };
    return {
      lines: lines,
      totals: {
        gross: sum('gross'), net: sum('net'),
        ssnitEmployee: sum('ssnitEmployee'), ssnitEmployer: sum('ssnitEmployer'),
        tier1: sum('tier1'), tier2: sum('tier2'),
        paye: sum('paye'), flatTax: sum('flatTax'), overtimeTax: sum('overtimeTax'), withholdingTax: sum('withholdingTax'),
        totalDeduction: sum('totalDeduction'), employerCost: sum('employerCost'),
        totalTaxes: r2(sum('paye') + sum('flatTax') + sum('overtimeTax') + sum('withholdingTax'))
      }
    };
  }

  var API = {
    YEAR_2026: Y2026, REGIME: REGIME, regimeOf: regimeOf,
    round2: r2, paye: paye, overtimeTax: overtimeTax, ssnit: ssnit,
    calcPay: calcPay, calcRegister: calcRegister
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  root.PayrollEngine = API;
})(typeof globalThis !== 'undefined' ? globalThis : this);
