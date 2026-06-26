// Shared onboarding state across DexwinPay pages, persisted in localStorage.
// Re-implementation of the design handoff's app-state.js as a typed module.
// The keys and transitions are the spec; consumed by Sign Up, Sidebar,
// Dashboard, People, Company Wallet and Invite Team.

export type EmployeesState = "todo" | "done";
export type PayrollState = "locked" | "unlocked" | "done";
export type WalletState = "none" | "review" | "active" | "rejected";

export interface OnboardingState {
  employees: EmployeesState;
  payroll: PayrollState;
  wallet: WalletState;
}

export interface Account {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  dial: string;
  phone: string;
}

export interface Employee {
  [key: string]: unknown;
}

const ONBOARDING_KEYS = ["employees", "payroll", "wallet"] as const;
const DEFAULTS: OnboardingState = {
  employees: "todo",
  payroll: "locked",
  wallet: "none",
};

const ROSTER_KEY = "dxp_roster";
const ACCOUNT_KEY = "dxp_account";

const EMPTY_ACCOUNT: Account = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  dial: "",
  phone: "",
};

function get(): OnboardingState {
  const out: OnboardingState = { ...DEFAULTS };
  try {
    for (const key of ONBOARDING_KEYS) {
      const v = localStorage.getItem(`dxp_${key}`);
      if (v) (out as unknown as Record<string, string>)[key] = v;
    }
  } catch {
    /* localStorage unavailable */
  }
  return out;
}

function set(patch: Partial<OnboardingState>): void {
  try {
    for (const key of Object.keys(patch) as (keyof OnboardingState)[]) {
      const value = patch[key];
      if (ONBOARDING_KEYS.includes(key as never) && value != null) {
        localStorage.setItem(`dxp_${key}`, value);
      }
    }
  } catch {
    /* localStorage unavailable */
  }
}

function getEmployees(): Employee[] {
  try {
    const v = localStorage.getItem(ROSTER_KEY);
    return v ? (JSON.parse(v) as Employee[]) : [];
  } catch {
    return [];
  }
}

function setEmployees(list: Employee[]): void {
  try {
    localStorage.setItem(ROSTER_KEY, JSON.stringify(Array.isArray(list) ? list : []));
  } catch {
    /* localStorage unavailable */
  }
}

function addEmployees(emps: Employee | Employee[]): Employee[] {
  const list = getEmployees();
  const add = Array.isArray(emps) ? emps : [emps];
  setEmployees(list.concat(add));
  return getEmployees();
}

function clearEmployees(): void {
  try {
    localStorage.removeItem(ROSTER_KEY);
  } catch {
    /* localStorage unavailable */
  }
}

function getAccount(): Account {
  const out: Account = { ...EMPTY_ACCOUNT };
  try {
    const v = localStorage.getItem(ACCOUNT_KEY);
    if (v) {
      const parsed = JSON.parse(v) as Partial<Account>;
      for (const key of Object.keys(parsed) as (keyof Account)[]) {
        if (parsed[key] != null) out[key] = parsed[key] as string;
      }
    }
  } catch {
    /* ignore */
  }
  return out;
}

function setAccount(patch: Partial<Account>): Account {
  try {
    const cur = getAccount();
    for (const key of Object.keys(patch) as (keyof Account)[]) {
      if (patch[key] != null) cur[key] = patch[key] as string;
    }
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(cur));
  } catch {
    /* ignore */
  }
  return getAccount();
}

function clearAccount(): void {
  try {
    localStorage.removeItem(ACCOUNT_KEY);
  } catch {
    /* ignore */
  }
}

export const AppState = {
  get,
  set,
  getEmployees,
  setEmployees,
  addEmployees,
  clearEmployees,
  getAccount,
  setAccount,
  clearAccount,
};

export default AppState;
