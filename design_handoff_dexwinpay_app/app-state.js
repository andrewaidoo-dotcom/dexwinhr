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

  window.AppState = {
    get: get, set: set,
    getEmployees: getEmployees, setEmployees: setEmployees,
    addEmployees: addEmployees, clearEmployees: clearEmployees,
    getAccount: getAccount, setAccount: setAccount, clearAccount: clearAccount,
  };
})();
