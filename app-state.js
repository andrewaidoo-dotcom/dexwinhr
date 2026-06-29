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

  // Employee roster — the actual people testers add, persisted across pages.
  var RKEY = 'dxp_roster';
  function getEmployees() {
    try { var v = localStorage.getItem(RKEY); return v ? JSON.parse(v) : []; } catch (e) { return []; }
  }
  function setEmployees(list) {
    try { localStorage.setItem(RKEY, JSON.stringify(Array.isArray(list) ? list : [])); } catch (e) {}
  }
  function addEmployees(emps) {
    var list = getEmployees();
    var add = Array.isArray(emps) ? emps : [emps];
    setEmployees(list.concat(add));
    return getEmployees();
  }
  function clearEmployees() {
    try { localStorage.removeItem(RKEY); } catch (e) {}
  }
  // A canonical sample roster used to populate demo scenarios. Names match the
  // payroll register (EMP_EARNINGS) so People and Payroll stay consistent.
  var SAMPLE_ROSTER = [
    { fullName: 'Akua Mensah',  initials: 'AM', employmentType: 'Full Time', jobRole: 'Operations Lead',   phone: '24 555 0101', status: 'Active' },
    { fullName: 'Kwame Owusu',  initials: 'KO', employmentType: 'Full Time', jobRole: 'Accountant',        phone: '24 555 0102', status: 'Active' },
    { fullName: 'Ama Boateng',  initials: 'AB', employmentType: 'Full Time', jobRole: 'Software Engineer', phone: '24 555 0103', status: 'Active' },
    { fullName: 'Yaw Asante',   initials: 'YA', employmentType: 'Full Time', jobRole: 'Sales Executive',   phone: '24 555 0104', status: 'needs' },
    { fullName: 'Adwoa Nyarko', initials: 'AN', employmentType: 'Full Time', jobRole: 'HR Manager',        phone: '24 555 0105', status: 'needs' },
    { fullName: 'Kofi Boadi',   initials: 'KB', employmentType: 'Full Time', jobRole: 'Customer Support',  phone: '24 555 0106', status: 'Active' },
  ];
  function seedSampleRoster() {
    if (getEmployees().length === 0) setEmployees(SAMPLE_ROSTER.map(function (p) { var o = {}; for (var k in p) o[k] = p[k]; return o; }));
    return getEmployees();
  }

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

  // ---- Payroll calculation engine (per Payroll_Calculations.docx) ----
  // Columns: Basic, Taxable Allowance, Non-Taxable Allowance, Overtime, Gross,
  // Taxable Income, SSNIT (5.5% of basic), PAYE (on taxable income, GH bands),
  // OT Tax, Staff Loan, Salary Advance, Total Deduction, Net = Gross - Total Deduction.
  var EMP_EARNINGS = {
    e1: { basic: 5000,  taxAllow: 800, nonTax: 500, overtime: 0,      staffLoan: 0,   salaryAdvance: 0 },
    e2: { basic: 5000,  taxAllow: 500, nonTax: 0,   overtime: 0,      staffLoan: 0,   salaryAdvance: 0 },
    e3: { basic: 10000, taxAllow: 0,   nonTax: 400, overtime: 0,      staffLoan: 0,   salaryAdvance: 0 },
    e4: { basic: 10000, taxAllow: 800, nonTax: 500, overtime: 590.97, staffLoan: 0,   salaryAdvance: 5000 },
    e5: { basic: 6000,  taxAllow: 600, nonTax: 300, overtime: 0,      staffLoan: 0,   salaryAdvance: 0 },
    e6: { basic: 3500,  taxAllow: 0,   nonTax: 200, overtime: 0,      staffLoan: 400, salaryAdvance: 0 },
  };
  function _round2(n) { return Math.round((Number(n) || 0) * 100) / 100; }
  // Ghana monthly PAYE bands: 1st 490 @0, next 110 @5, next 130 @10, next 3166 @17.5, remaining @25
  function payeOf(t) {
    if (t <= 0) return 0;
    var bands = [[490, 0], [110, 0.05], [130, 0.10], [3166, 0.175]];
    var tax = 0, rem = t;
    for (var i = 0; i < bands.length; i++) {
      var amt = Math.min(rem, bands[i][0]);
      tax += amt * bands[i][1]; rem -= amt;
      if (rem <= 0) break;
    }
    if (rem > 0) tax += rem * 0.25;
    return tax;
  }
  // Overtime tax (junior-staff flat model): 5% up to 50% of basic, 10% on the excess
  function otTaxOf(basic, ot) {
    if (ot <= 0) return 0;
    var half = 0.5 * basic;
    return ot <= half ? ot * 0.05 : half * 0.05 + (ot - half) * 0.10;
  }
  function calcPay(empId, period) {
    var b = EMP_EARNINGS[empId] || { basic: 0, taxAllow: 0, nonTax: 0, overtime: 0, staffLoan: 0, salaryAdvance: 0 };
    var items = getPayItems(period, empId);
    var taxAllow = b.taxAllow, nonTax = b.nonTax, overtime = b.overtime;
    (items.additions || []).forEach(function (a) {
      var amt = Number(a.amount) || 0;
      if (a.kind === 'overtime') overtime += amt;
      else if (a.kind === 'reimbursement') nonTax += amt;
      else taxAllow += amt; // cash allowance & bonus are taxable
    });
    var otherDed = (items.deductions || []).map(function (d) { return { name: d.name, tag: d.tag, amount: Number(d.amount) || 0 }; });
    var otherDedTotal = otherDed.reduce(function (a, x) { return a + x.amount; }, 0);
    var ssnit = _round2(b.basic * 0.055);
    var taxableIncome = _round2(b.basic - ssnit + taxAllow);
    var paye = _round2(payeOf(taxableIncome));
    var otTax = _round2(otTaxOf(b.basic, overtime));
    var gross = _round2(b.basic + taxAllow + nonTax + overtime);
    var totalDeduction = _round2(ssnit + paye + otTax + b.staffLoan + b.salaryAdvance + otherDedTotal);
    var net = _round2(gross - totalDeduction);
    return {
      basic: b.basic, taxAllow: _round2(taxAllow), nonTax: _round2(nonTax), overtime: _round2(overtime),
      gross: gross, taxableIncome: taxableIncome, ssnit: ssnit, paye: paye, otTax: otTax,
      staffLoan: b.staffLoan, salaryAdvance: b.salaryAdvance, otherDed: otherDed,
      totalDeduction: totalDeduction, net: net,
      instanceAdditions: items.additions || [], instanceDeductions: items.deductions || [],
    };
  }

  window.AppState = {
    get: get, set: set,
    getEmployees: getEmployees, setEmployees: setEmployees,
    addEmployees: addEmployees, clearEmployees: clearEmployees,
    seedSampleRoster: seedSampleRoster, SAMPLE_ROSTER: SAMPLE_ROSTER,
    getAccount: getAccount, setAccount: setAccount, clearAccount: clearAccount,
    isSignedIn: isSignedIn, signIn: signIn, signOut: signOut,
    getApproval: getApproval, setApproval: setApproval, clearApproval: clearApproval,
    getPerspective: getPerspective, setPerspective: setPerspective,
    getWalletBalance: getWalletBalance, setWalletBalance: setWalletBalance, WB_DEFAULT: WB_DEFAULT,
    getPayItems: getPayItems, setPayItems: setPayItems, payItemsDelta: payItemsDelta,
    calcPay: calcPay, EMP_EARNINGS: EMP_EARNINGS,
  };
})();
