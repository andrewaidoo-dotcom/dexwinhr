// Shared onboarding state across DexwinPay pages, persisted in localStorage.
// Three dimensions:
//   employees: 'todo' | 'done'
//   payroll:   'locked' | 'unlocked' | 'done'   (locked until employees added; done once set up)
//   wallet:    'none' | 'review' | 'active' | 'rejected'
(function () {
  var KS = ['employees', 'payroll', 'wallet'];
  var DEF = { employees: 'todo', payroll: 'locked', wallet: 'none' };
  function get() {
    var d = { employees: DEF.employees, payroll: DEF.payroll, wallet: DEF.wallet };
    try { for (var i = 0; i < KS.length; i++) { var v = localStorage.getItem('dxp_' + KS[i]); if (v) d[KS[i]] = v; } } catch (e) {}
    return d;
  }
  function set(patch) {
    try { for (var k in patch) { if (KS.indexOf(k) !== -1 && patch[k] != null) localStorage.setItem('dxp_' + k, patch[k]); } } catch (e) {}
  }

  // Employee roster — THE single source of truth. Every record is real user input
  // (the add-employee form or a parsed import file). Nothing is seeded or fabricated.
  var RKEY = 'dxp_roster';
  function _uid() { return 'emp-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7); }
  // Normalise a raw record to the canonical shape and guarantee a stable id.
  function _normalizeEmp(r) {
    r = r || {};
    var first = (r.firstName || '').trim();
    var last = (r.surname || r.lastName || '').trim();
    var name = (r.fullName || r.name || (first + ' ' + last)).trim();
    var initials = r.initials || (name ? name.split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase() : '');
    var other = (r.otherNames || '').trim();
    // Account name is the employee's full legal name (first + other + surname) unless one was explicitly given.
    var acctName = (r.accountName && String(r.accountName).trim()) || [first, other, last].filter(Boolean).join(' ').trim();
    var basic = (r.basic != null && r.basic !== '') ? _num(r.basic) : _num(r.basicSalary);
    var ssnitRaw = String(r.ssnit == null ? '' : r.ssnit).toLowerCase();
    var ssnit = ssnitRaw === 'yes' ? 'yes' : (ssnitRaw === 'no' ? 'no' : (r.ssnit || ''));
    var out = {};
    for (var k in r) out[k] = r[k];
    out.id = r.id || _uid();
    out.firstName = first; out.surname = last; out.fullName = name; out.name = name; out.initials = initials;
    out.basic = basic; out.basicSalary = (r.basicSalary != null ? r.basicSalary : basic);
    out.accountName = acctName;
    out.ssnit = ssnit; out.ssnitMember = (ssnit !== 'no');
    return out;
  }
  function getEmployees() {
    try {
      var v = localStorage.getItem(RKEY); if (!v) return [];
      var arr = JSON.parse(v); if (!Array.isArray(arr)) return [];
      // Back-fill ids/shape once for any legacy records that predate normalisation.
      if (arr.some(function (r) { return !r || !r.id; })) { arr = arr.map(_normalizeEmp); localStorage.setItem(RKEY, JSON.stringify(arr)); }
      return arr;
    } catch (e) { return []; }
  }
  function setEmployees(list) {
    try { var arr = (Array.isArray(list) ? list : []).map(_normalizeEmp); localStorage.setItem(RKEY, JSON.stringify(arr)); return arr; } catch (e) { return []; }
  }
  function addEmployees(emps) {
    var add = (Array.isArray(emps) ? emps : [emps]).map(_normalizeEmp);
    var arr = getEmployees().concat(add);
    try { localStorage.setItem(RKEY, JSON.stringify(arr)); } catch (e) {}
    return arr;
  }
  function getEmployeeById(id) { var l = getEmployees(); for (var i = 0; i < l.length; i++) { if (l[i].id === id) return l[i]; } return null; }
  function clearEmployees() { try { localStorage.removeItem(RKEY); } catch (e) {} }
  // Seeding is intentionally a no-op — employees only ever come from real input.
  var SAMPLE_ROSTER = [];
  function seedSampleRoster() { return getEmployees(); }

  // Account owner — captured during sign up, reused across the app.
  var AKEY = 'dxp_account';
  function getAccount() {
    var d = { firstName: '', lastName: '', company: '', email: '', dial: '', phone: '' };
    try { var v = localStorage.getItem(AKEY); if (v) { var p = JSON.parse(v); for (var k in p) d[k] = p[k]; } } catch (e) {}
    return d;
  }
  function setAccount(patch) {
    try {
      var cur = getAccount();
      for (var k in patch) { if (patch[k] != null) cur[k] = patch[k]; }
      localStorage.setItem(AKEY, JSON.stringify(cur));
    } catch (e) {}
    return getAccount();
  }
  function clearAccount() {
    try { localStorage.removeItem(AKEY); } catch (e) {}
  }

  // Auth session — whether the owner is signed in. Persisted so a refresh keeps them logged in.
  var SKEY = 'dxp_signed_in';
  function isSignedIn() {
    try { return localStorage.getItem(SKEY) === '1'; } catch (e) { return false; }
  }
  function signIn() {
    try { localStorage.setItem(SKEY, '1'); } catch (e) {}
  }
  function signOut() {
    try { localStorage.removeItem(SKEY); } catch (e) {}
  }

  // Payroll approval request — a single active request shared across perspectives
  // and the external view-only page. Persisted so the sidebar perspective switch
  // and the external approval link (separate tab) all read/write the same record.
  //   route:  'self' | 'platform' | 'external'
  //   status: 'pending' | 'approved' | 'rejected'
  var APKEY = 'dxp_approval';
  function getApproval() {
    try { var v = localStorage.getItem(APKEY); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }
  function setApproval(patch) {
    try {
      var cur = getApproval() || {};
      for (var k in patch) { cur[k] = patch[k]; }
      localStorage.setItem(APKEY, JSON.stringify(cur));
      return cur;
    } catch (e) { return null; }
  }
  function clearApproval() {
    try { localStorage.removeItem(APKEY); } catch (e) {}
  }

  // Which person the demo is currently "logged in" as. 'owner' is the account
  // owner (preparer); any other value is a teammate id from the approval record.
  var PKEY = 'dxp_perspective';
  function getPerspective() {
    try { return localStorage.getItem(PKEY) || 'owner'; } catch (e) { return 'owner'; }
  }
  function setPerspective(p) {
    try { if (p && p !== 'owner') localStorage.setItem(PKEY, p); else localStorage.removeItem(PKEY); } catch (e) {}
  }

  // Company wallet balance (GH cedis). Funded once the wallet is active; drawn
  // down as payroll is disbursed. Shared so the sidebar reflects the real amount.
  var WBKEY = 'dxp_wallet_balance';
  var WB_DEFAULT = 84250;
  function getWalletBalance() {
    try { var v = localStorage.getItem(WBKEY); return v != null ? Number(v) : null; } catch (e) { return null; }
  }
  function setWalletBalance(n) {
    try { localStorage.setItem(WBKEY, String(Math.max(0, Math.round(Number(n) || 0)))); } catch (e) {}
  }

  // Per-employee, per-period pay items added on the payroll-instance employee page.
  //   additions: [{ id, kind, name, amount }]   (kind: overtime|reimbursement|cash|bonus)
  //   deductions:[{ id, name, amount, taxMode }] (taxMode: pretax|posttax)
  function _payKey(period, emp) { return 'dxp_payitems_' + (period || 'cur') + '_' + (emp || ''); }
  function getPayItems(period, emp) {
    try { var v = localStorage.getItem(_payKey(period, emp)); var o = v ? JSON.parse(v) : null; return { additions: (o && o.additions) || [], deductions: (o && o.deductions) || [] }; }
    catch (e) { return { additions: [], deductions: [] }; }
  }
  function setPayItems(period, emp, obj) {
    try { localStorage.setItem(_payKey(period, emp), JSON.stringify({ additions: (obj && obj.additions) || [], deductions: (obj && obj.deductions) || [] })); } catch (e) {}
  }
  function payItemsDelta(period, emp) {
    var p = getPayItems(period, emp);
    var add = p.additions.reduce(function (a, x) { return a + (Number(x.amount) || 0); }, 0);
    var ded = p.deductions.reduce(function (a, x) { return a + (Number(x.amount) || 0); }, 0);
    return add - ded;
  }

  // Company-wide pay additions configured in Set Up Payroll → Pay additions.
  //   { id, name, type, typeLabel, value, valueMode, freq, taxable, applyLabel, count }
  var CADD = 'dxp_company_additions';
  function getCompanyAdditions() {
    try { var v = localStorage.getItem(CADD); return v ? JSON.parse(v) : []; } catch (e) { return []; }
  }
  function addCompanyAddition(item) {
    try { var l = getCompanyAdditions(); l.push(item); localStorage.setItem(CADD, JSON.stringify(l)); return l; } catch (e) { return []; }
  }
  function removeCompanyAddition(id) {
    try { var l = getCompanyAdditions().filter(function (x) { return x.id !== id; }); localStorage.setItem(CADD, JSON.stringify(l)); return l; } catch (e) { return []; }
  }
  function clearCompanyAdditions() { try { localStorage.removeItem(CADD); } catch (e) {} }

  // Company-wide pay deductions configured in Set Up Payroll → Pay deductions.
  //   { id, name, taxMode: 'pretax'|'posttax', value, valueMode: 'fixed'|'pct',
  //     freq, scope: 'all'|'specific', empIds: [] }
  var CDED = 'dxp_company_deductions';
  function getCompanyDeductions() {
    try { var v = localStorage.getItem(CDED); return v ? JSON.parse(v) : []; } catch (e) { return []; }
  }
  function addCompanyDeduction(item) {
    try { var l = getCompanyDeductions(); l.push(item); localStorage.setItem(CDED, JSON.stringify(l)); return l; } catch (e) { return []; }
  }
  function removeCompanyDeduction(id) {
    try { var l = getCompanyDeductions().filter(function (x) { return x.id !== id; }); localStorage.setItem(CDED, JSON.stringify(l)); return l; } catch (e) { return []; }
  }
  function clearCompanyDeductions() { try { localStorage.removeItem(CDED); } catch (e) {} }

  // Staff loans & salary advances — company-wide, persisted.
  var LKEY = 'dxp_loans';
  function getLoans() { try { var v = localStorage.getItem(LKEY); return v ? JSON.parse(v) : []; } catch (e) { return []; } }
  function setLoans(list) { try { localStorage.setItem(LKEY, JSON.stringify(Array.isArray(list) ? list : [])); } catch (e) {} return getLoans(); }

  // ---- Payroll calculation engine ----
  // Powered by globalThis.PayrollEngine (payroll-engine.js). app-state ADAPTS the
  // real employee record + stored pay items into the engine's input shape, then maps
  // the engine's payslip back to the field names the Payroll pages consume.
  function _round2(n) { return Math.round((Number(n) || 0) * 100) / 100; }
  function _num(v) { return Number(String(v == null ? '' : v).replace(/[^0-9.\-]/g, '')) || 0; }
  function _engine() { var g = (typeof globalThis !== 'undefined') ? globalThis : window; return g.PayrollEngine; }

  // Payroll roster — derived live from the real employee records. Drives the pay-item
  // employee pickers so "specific" scope stores ids that calcPay can match.
  function getPayrollRoster() {
    return getEmployees().map(function (r) {
      return { id: r.id, name: r.name, init: r.initials, dept: r.department || '', role: r.jobRole || r.position || '', etype: r.employmentType || 'Full-Time-Resident', basic: _num(r.basic) };
    });
  }

  // Legacy employment-type strings (quick-add / sample roster) → canonical engine regime keys.
  var TYPE_ALIAS = {
    'full time': 'full-time-resident', 'full-time': 'full-time-resident',
    'part time': 'part-time-resident', 'part-time': 'part-time-resident',
    'contract': 'independent contractor', 'freelance': 'independent contractor',
    'temporary': 'casual-resident', 'internship': 'intern', 'national service': 'nss',
  };
  function normType(t) { var k = String(t == null ? '' : t).toLowerCase().trim(); return TYPE_ALIAS[k] || t || 'full-time-resident'; }

  // Resolve a company addition/deduction's monthly cash amount for a given basic.
  function _itemAmount(it, basic) {
    if (it.type === 'bik') { var amt = basic * _num(it.bikPct) / 100; var cap = _num(it.bikCap); return cap > 0 ? Math.min(amt, cap) : amt; }
    var v = _num(it.value);
    return it.valueMode === 'pct' ? basic * v / 100 : v;
  }
  function _addKind(ca) {
    if (ca.kind) return ca.kind;
    if (ca.type === 'reimb') return ca.reimbKind === 'keep' ? 'cash' : 'reimbursement';
    return 'cash'; // cash allowance & benefit-in-kind are taxable
  }
  // Parse a run period id ('jun', 'jun-2026', 'cur', undefined) → {m: monthIndex, y: year}.
  var _MONTHS_IDX = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
  function _periodMY(period) {
    var now = new Date(), m = now.getMonth(), y = now.getFullYear();
    if (period && period !== 'cur') {
      var s = String(period).toLowerCase();
      for (var k in _MONTHS_IDX) { if (s.indexOf(k) !== -1) { m = _MONTHS_IDX[k]; break; } }
      var ym = s.match(/(20\d{2})/); if (ym) y = parseInt(ym[1], 10);
    }
    return { m: m, y: y };
  }
  // Does an item's frequency make it due in this run period?
  //   Monthly  → every run
  //   Quarterly→ every 3rd month from its anchor (e.g. added in Jun → Jun, Sep, Dec, Mar…)
  //   Annually → the same month each year as its anchor
  //   One-off  → only the exact period it was set up for
  // Anchor = the month/year the item was created (anchorMonth/anchorYear), else current.
  function _freqApplies(it, period) {
    var f = it.freq || 'Monthly';
    if (f === 'Monthly') return true;
    var p = _periodMY(period);
    var def = _periodMY(null);
    var am = (it.anchorMonth != null) ? it.anchorMonth : def.m;
    var ay = (it.anchorYear != null) ? it.anchorYear : def.y;
    if (f === 'One-off')   return p.m === am && p.y === ay;
    if (f === 'Annually')  return p.m === am;
    if (f === 'Quarterly') { var diff = (p.y - ay) * 12 + (p.m - am); return diff >= 0 && diff % 3 === 0; }
    return false;
  }
  // Does a company item apply to this employee for this run? Scope (all / empIds) AND frequency.
  function _itemApplies(it, empId, period) {
    if (!_freqApplies(it, period)) return false;
    if (it.scope === 'all') return true;
    if (Array.isArray(it.empIds)) return it.empIds.indexOf(empId) !== -1;
    return false;
  }

  function calcPay(empId, period) {
    var b = getEmployeeById(empId) || { basic: 0, employmentType: 'Full-Time-Resident' };
    var items = getPayItems(period, empId);
    var basic = _num(b.basic);
    var _ls = 0, _as = 0;
    try { (getLoans() || []).forEach(function (l) { if (l.empId === empId) { var m = _num(l.monthly); if (l.type === 'advance') _as += m; else _ls += m; } }); } catch (e) {}

    // ---- Build engine ADDITIONS: base allowances + per-period items + applicable company additions
    var additions = [];
    if (_num(b.taxAllow) > 0)  additions.push({ name: 'Taxable allowance',     amount: _num(b.taxAllow), kind: 'cash' });
    if (_num(b.nonTax) > 0)    additions.push({ name: 'Non-taxable allowance', amount: _num(b.nonTax),    kind: 'reimbursement' });
    if (_num(b.overtime) > 0)  additions.push({ name: 'Overtime',              amount: _num(b.overtime),  kind: 'overtime' });
    (items.additions || []).forEach(function (a) { additions.push({ name: a.name, amount: _num(a.amount), kind: a.kind, tag: a.tag }); });
    getCompanyAdditions().forEach(function (ca) { if (_itemApplies(ca, empId, period)) additions.push({ name: ca.name, amount: _round2(_itemAmount(ca, basic)), kind: _addKind(ca) }); });

    // ---- Build engine DEDUCTIONS: per-period items + applicable company deductions + Tier 3 (pretax, tax-deductible)
    var deductions = [];
    (items.deductions || []).forEach(function (d) { deductions.push({ name: d.name, amount: _num(d.amount), taxMode: d.taxMode || 'posttax', tag: d.tag }); });
    getCompanyDeductions().forEach(function (cd) { if (_itemApplies(cd, empId, period)) deductions.push({ name: cd.name, amount: _round2(_itemAmount(cd, basic)), taxMode: cd.taxMode || 'posttax' }); });
    if (b.tier3 === 'yes' || b.tier3 === true) {
      var t3 = (b.tier3Mode === 'fixed') ? _num(b.tier3Amount) : basic * _num(b.tier3Amount) / 100;
      if (t3 > 0) deductions.push({ name: 'Tier 3 pension', amount: _round2(t3), taxMode: 'pretax' });
    }

    var Eng = _engine();
    if (Eng && Eng.calcPay) {
      var out = Eng.calcPay({
        employmentType: normType(b.employmentType),
        basic: basic,
        additions: additions,
        deductions: deductions,
        staffLoan: _ls,
        salaryAdvance: _as,
        ssnitMember: (b.ssnitMember !== false) && (String(b.ssnit || '').toLowerCase() !== 'no'),
      });
      // The engine reduces taxable income by pre-tax deductions but does NOT subtract the
      // contribution itself from net — a pre-tax deduction is still cash withheld, so fold it in.
      var preTax = _num(out.preTaxDeductions);
      var totalDeduction = _round2(_num(out.totalDeduction) + preTax);
      var net = _round2(_num(out.gross) - totalDeduction);
      var otherDed = deductions.map(function (d) { return { name: d.name, tag: d.tag, amount: _round2(d.amount) }; });
      return {
        basic: _round2(out.basic), taxAllow: _round2(out.taxableAllowance), nonTax: _round2(out.nonTaxableAllowance), overtime: _round2(out.overtime),
        gross: _round2(out.gross), taxableIncome: _round2(out.taxableIncome),
        ssnit: _round2(out.ssnitEmployee), ssnitEmployer: _round2(out.ssnitEmployer), tier1: _round2(out.tier1), tier2: _round2(out.tier2),
        // flat-regime tax (casual/secondary/non-resident) shown in the PAYE column; contractors use WHT
        paye: _round2(_num(out.paye) + _num(out.flatTax)), wht: _round2(out.withholdingTax), otTax: _round2(out.overtimeTax),
        taxLabel: out.taxLabel,
        staffLoan: _ls, salaryAdvance: _as,
        preTaxDeductions: _round2(preTax), otherDed: otherDed,
        totalDeduction: totalDeduction, net: net, contractor: out.regime === 'contractor',
        instanceAdditions: items.additions || [], instanceDeductions: items.deductions || [],
      };
    }

    // ---- Fallback (engine script not loaded): simplified legacy math ----
    function payeOf(t) {
      if (t <= 0) return 0;
      var bands = [[490, 0], [110, 0.05], [130, 0.10], [3166, 0.175]], tax = 0, rem = t;
      for (var i = 0; i < bands.length; i++) { var amt = Math.min(rem, bands[i][0]); tax += amt * bands[i][1]; rem -= amt; if (rem <= 0) break; }
      if (rem > 0) tax += rem * 0.25; return tax;
    }
    function otTaxOf(bb, ot) { if (ot <= 0) return 0; var half = 0.5 * bb; return ot <= half ? ot * 0.05 : half * 0.05 + (ot - half) * 0.10; }
    var taxAllow = _num(b.taxAllow), nonTax = _num(b.nonTax), overtime = _num(b.overtime);
    (items.additions || []).forEach(function (a) { var amt = _num(a.amount); if (a.kind === 'overtime') overtime += amt; else if (a.kind === 'reimbursement') nonTax += amt; else taxAllow += amt; });
    var oDed = (items.deductions || []).map(function (d) { return { name: d.name, tag: d.tag, amount: _num(d.amount) }; });
    var oDedTotal = oDed.reduce(function (a, x) { return a + x.amount; }, 0);
    var isContractor = normType(b.employmentType).indexOf('contractor') !== -1;
    var gross = _round2(basic + taxAllow + nonTax + overtime);
    var ssnit = isContractor ? 0 : _round2(basic * 0.055);
    var taxableIncome = isContractor ? 0 : _round2(basic - ssnit + taxAllow);
    var paye = isContractor ? 0 : _round2(payeOf(taxableIncome));
    var wht = isContractor ? _round2(gross * 0.075) : 0;
    var otTax = isContractor ? 0 : _round2(otTaxOf(basic, overtime));
    var totalDeduction = _round2(ssnit + paye + wht + otTax + _ls + _as + oDedTotal);
    var net = _round2(gross - totalDeduction);
    return {
      basic: basic, taxAllow: _round2(taxAllow), nonTax: _round2(nonTax), overtime: _round2(overtime),
      gross: gross, taxableIncome: taxableIncome, ssnit: ssnit, paye: paye, wht: wht, otTax: otTax,
      staffLoan: _ls, salaryAdvance: _as, otherDed: oDed,
      totalDeduction: totalDeduction, net: net, contractor: isContractor,
      instanceAdditions: items.additions || [], instanceDeductions: items.deductions || [],
    };
  }

  // ============================ EMPLOYEE IMPORT ============================
  // Parses the real uploaded file (CSV or the .xlsx bulk template) into employee
  // records. Columns are matched by HEADER NAME (order-independent) and validated
  // against the template's dropdowns. Nothing is invented — a missing required
  // cell becomes a row error, not a guess.
  var EMP_TYPE_VALUES = ['Full-Time-Resident', 'Resident-Part-Time-Resident', 'Casual-Resident', 'Independent Contractor', 'Contractor-Full-Time', 'NSS', 'Intern', 'Non-Resident', 'Secondary@5%', 'Secondary@10%', 'Secondary@17.5%', 'Secondary@25%'];
  var POSITION_VALUES = ['Management', 'Senior', 'Junior', 'Expatriate', 'Other'];
  var CSV_HEADERS = ['First Name', 'Last Name', 'Other Name', 'Email', 'Phone Number', 'Employment Type', 'Position', 'Contributes SSNIT', 'Basic Salary / Contract Amount', 'Tier 3 Percentage Paid', 'Bank Name', 'Bank Branch', 'Bank Account Number', 'Employee Address', 'Date of Birth', 'Ghana Card', 'SSNIT Number', 'TIN', 'Beneficiary Name', 'Beneficiary Contact', 'Beneficiary Relationship'];
  var COLMAP = {
    firstname: 'firstName', lastname: 'surname', surname: 'surname', othername: 'otherNames', othernames: 'otherNames',
    email: 'email', phonenumber: 'phone', phone: 'phone', employmenttype: 'employmentType', position: 'position',
    contributesssnit: 'ssnit', ssnit: 'ssnit', basicsalarycontractamount: 'basicSalary', basicsalary: 'basicSalary',
    tier3percentagepaid: 'tier3Amount', tier3: 'tier3Amount', bankname: 'bankName', bankbranch: 'bankBranch',
    bankaccountnumber: 'accountNumber', accountnumber: 'accountNumber', employeeaddress: 'address', address: 'address',
    dateofbirth: 'dob', dob: 'dob', ghanacard: 'ghanaCard', ssnitnumber: 'ssnitNumber', tin: 'tin',
    beneficiaryname: 'beneficiaryName', beneficiarycontact: 'beneficiaryContact', beneficiaryrelationship: 'beneficiaryRelationship',
  };
  var _LABEL = { firstName: 'First name', surname: 'Last name', email: 'Email', phone: 'Phone number', employmentType: 'Employment type', position: 'Position' };
  function _normHeader(h) { return String(h == null ? '' : h).toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function _xmlDecode(s) { return String(s).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'"); }
  function employeeCsvTemplate() { return CSV_HEADERS.join(',') + '\n'; }

  function _parseCsvText(text) {
    var rows = [], row = [], cur = '', q = false, c;
    text = String(text).replace(/^\uFEFF/, '');
    for (var i = 0; i < text.length; i++) {
      c = text[i];
      if (q) { if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
      else if (c === '"') q = true;
      else if (c === ',') { row.push(cur); cur = ''; }
      else if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; }
      else if (c !== '\r') cur += c;
    }
    if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
    return rows;
  }
  function _validateEmpRow(rec) {
    var e = [];
    ['firstName', 'surname', 'email', 'phone', 'employmentType', 'position'].forEach(function (f) { if (!rec[f]) e.push(_LABEL[f] + ' is required'); });
    if (!rec.basicSalary) e.push('Basic salary is required'); else if (_num(rec.basicSalary) <= 0) e.push('Basic salary must be a number');
    if (!rec.ssnit) e.push('Contributes SSNIT is required'); else if (['yes', 'no'].indexOf(String(rec.ssnit).toLowerCase()) === -1) e.push('Contributes SSNIT must be Yes or No');
    if (rec.employmentType && EMP_TYPE_VALUES.map(function (v) { return v.toLowerCase(); }).indexOf(String(rec.employmentType).toLowerCase()) === -1) e.push('Unknown employment type: ' + rec.employmentType);
    if (rec.position && POSITION_VALUES.map(function (v) { return v.toLowerCase(); }).indexOf(String(rec.position).toLowerCase()) === -1) e.push('Unknown position: ' + rec.position);
    return e;
  }
  function _rowsToEmployees(matrix) {
    var result = { employees: [], errors: [], headers: [] };
    var hi = -1;
    for (var k = 0; k < matrix.length; k++) {
      var hs = matrix[k].map(_normHeader);
      if (hs.indexOf('firstname') !== -1 && (hs.indexOf('lastname') !== -1 || hs.indexOf('surname') !== -1)) { hi = k; break; }
    }
    if (hi < 0) return result;
    var headers = matrix[hi].map(_normHeader);
    result.headers = matrix[hi].slice();
    for (var r = hi + 1; r < matrix.length; r++) {
      var cells = matrix[r] || [];
      if (cells.every(function (x) { return String(x == null ? '' : x).trim() === ''; })) continue;
      var rec = {};
      for (var ci = 0; ci < headers.length; ci++) {
        var f = COLMAP[headers[ci]];
        if (f) { var val = String(cells[ci] == null ? '' : cells[ci]).trim(); if (val !== '') rec[f] = val; }
      }
      if (rec.tier3Amount && _num(rec.tier3Amount) > 0) { rec.tier3 = 'yes'; rec.tier3Mode = 'percent'; } else { rec.tier3 = 'no'; }
      result.errors.push(_validateEmpRow(rec));
      result.employees.push(_normalizeEmp(rec));
    }
    return result;
  }
  function parseEmployeesCsv(text) { return _rowsToEmployees(_parseCsvText(text)); }

  // --- .xlsx (zip of XML) reader: inflate sharedStrings + first worksheet, build a cell matrix ---
  async function _inflateRaw(bytes) {
    var ds = new DecompressionStream('deflate-raw'), w = ds.writable.getWriter(); w.write(bytes); w.close();
    var out = [], rd = ds.readable.getReader();
    for (;;) { var s = await rd.read(); if (s.done) break; out.push(s.value); }
    var len = out.reduce(function (a, b) { return a + b.length; }, 0), res = new Uint8Array(len), o = 0;
    out.forEach(function (c) { res.set(c, o); o += c.length; });
    return new TextDecoder().decode(res);
  }
  function _colIdx(letters) { var n = 0; for (var i = 0; i < letters.length; i++) n = n * 26 + (letters.charCodeAt(i) - 64); return n - 1; }
  async function _xlsxToMatrix(ab) {
    var u8 = new Uint8Array(ab), dv = new DataView(ab), td = new TextDecoder(), want = {};
    for (var i = 0; i + 4 <= u8.length; i++) {
      if (dv.getUint32(i, true) === 0x02014b50) {
        var method = dv.getUint16(i + 10, true), compSize = dv.getUint32(i + 20, true), nameLen = dv.getUint16(i + 28, true), extraLen = dv.getUint16(i + 30, true), cmtLen = dv.getUint16(i + 32, true), localOff = dv.getUint32(i + 42, true);
        var name = td.decode(u8.subarray(i + 46, i + 46 + nameLen));
        if (name === 'xl/sharedStrings.xml' || name === 'xl/worksheets/sheet1.xml') want[name] = { method: method, compSize: compSize, localOff: localOff };
        i += 46 + nameLen + extraLen + cmtLen - 1;
      }
    }
    var parts = {};
    for (var nm in want) {
      var e = want[nm], nl = dv.getUint16(e.localOff + 26, true), el = dv.getUint16(e.localOff + 28, true), start = e.localOff + 30 + nl + el, data = u8.subarray(start, start + e.compSize);
      parts[nm] = e.method === 8 ? await _inflateRaw(data) : td.decode(data);
    }
    var strings = [], ss = parts['xl/sharedStrings.xml'] || '';
    ss.replace(/<si>([\s\S]*?)<\/si>/g, function (_m, inner) { var t = ''; inner.replace(/<t[^>]*>([\s\S]*?)<\/t>/g, function (_2, x) { t += x; return ''; }); strings.push(_xmlDecode(t)); return ''; });
    var matrix = [], sheet = parts['xl/worksheets/sheet1.xml'] || '';
    sheet.replace(/<row[^>]*>([\s\S]*?)<\/row>/g, function (_m, rowXml) {
      var cells = [];
      rowXml.replace(/<c\s+r="([A-Z]+)\d+"([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g, function (_2, col, at, inner) {
        var isS = /t="s"/.test(at), vm = (inner || '').match(/<v>([\s\S]*?)<\/v>/), tm = (inner || '').match(/<t[^>]*>([\s\S]*?)<\/t>/), val = '';
        if (isS && vm) val = strings[parseInt(vm[1], 10)] || '';
        else if (tm) val = _xmlDecode(tm[1]);
        else if (vm) val = vm[1];
        cells[_colIdx(col)] = val; return '';
      });
      for (var c2 = 0; c2 < cells.length; c2++) if (cells[c2] == null) cells[c2] = '';
      matrix.push(cells); return '';
    });
    return matrix;
  }
  async function parseEmployeesXlsx(arrayBuffer) { return _rowsToEmployees(await _xlsxToMatrix(arrayBuffer)); }

  window.AppState = {
    get: get, set: set,
    getEmployees: getEmployees, setEmployees: setEmployees, getEmployeeById: getEmployeeById,
    addEmployees: addEmployees, clearEmployees: clearEmployees,
    seedSampleRoster: seedSampleRoster, SAMPLE_ROSTER: SAMPLE_ROSTER,
    getAccount: getAccount, setAccount: setAccount, clearAccount: clearAccount,
    isSignedIn: isSignedIn, signIn: signIn, signOut: signOut,
    getApproval: getApproval, setApproval: setApproval, clearApproval: clearApproval,
    getPerspective: getPerspective, setPerspective: setPerspective,
    getWalletBalance: getWalletBalance, setWalletBalance: setWalletBalance, WB_DEFAULT: WB_DEFAULT,
    getPayItems: getPayItems, setPayItems: setPayItems, payItemsDelta: payItemsDelta,
    getCompanyAdditions: getCompanyAdditions, addCompanyAddition: addCompanyAddition, removeCompanyAddition: removeCompanyAddition, clearCompanyAdditions: clearCompanyAdditions,
    getCompanyDeductions: getCompanyDeductions, addCompanyDeduction: addCompanyDeduction, removeCompanyDeduction: removeCompanyDeduction, clearCompanyDeductions: clearCompanyDeductions,
    getLoans: getLoans, setLoans: setLoans,
    getPayrollRoster: getPayrollRoster,
    parseEmployeesCsv: parseEmployeesCsv, parseEmployeesXlsx: parseEmployeesXlsx, employeeCsvTemplate: employeeCsvTemplate,
    EMP_TYPE_VALUES: EMP_TYPE_VALUES, POSITION_VALUES: POSITION_VALUES,
    calcPay: calcPay,
  };
})();
