# Handoff: DexwinPay — Payroll, HR & Compliance Platform

## Overview
DexwinPay is a payroll, HR and statutory-compliance product for Ghanaian companies. It
lets a company owner sign up, verify their email, add employees, set up and run payroll,
file SSNIT/PAYE, and fund a company wallet. This bundle contains the full design for the
authenticated app plus the public marketing/auth surfaces, delivered as interactive HTML
prototypes.

The flow these designs implement:

```
Landing → Sign Up (form → verify email → activated, all in one page)
        → Login
        → Dashboard (onboarding checklist)
        → People (employee roster) → Employee Profile / Add Employees
        → Payroll (set up + run)
        → Company Wallet (apply → review → active)
        → Invite Team (owner + invited members with granular permissions)
```

## About the Design Files
**The files in this bundle are design references created in HTML** — prototypes that show
the intended look, layout, copy and behavior. They are **not production code to ship as-is.**

The task is to **recreate these designs in the target codebase's existing environment**
(React, Vue, SwiftUI, native, etc.) using its established components, patterns and libraries.
If no front-end environment exists yet, choose the most appropriate framework for the project
and implement the designs there.

The prototypes are authored as "Design Components" (`.dc.html`). Each one is a self-contained
page with an inline-styled template and a small logic class. You do **not** need to reproduce
that runtime — read each file for the exact markup, styling values, copy, and state logic, then
re-implement using your stack. A shared `app-state.js` module shows the intended client-side
state model (see **State Management**).

## Fidelity
**High-fidelity (hifi).** These are pixel-level mockups with final colors, typography, spacing,
radii, shadows and interactions, all drawn from the DexwinPay design system (Untitled UI base,
re-anchored on the Dexwin brand green and the Maven Pro typeface). Recreate the UI faithfully
using your codebase's component library; map the design tokens below onto your system's tokens.

---

## Screens / Views

### 1. Sign Up (`Sign Up.dc.html`)
Single-page, three-step onboarding. A **fixed 600px** left marketing panel (brand photo +
gradient, headline, 5-star social proof) sits beside a flexible right panel that swaps between
three steps **in place** — there is intentionally no navigation to separate pages.

- **Step 1 — Form.** Heading "Create your account". Fields (all required except phone is also
  required visually): First Name + Last Name (2-col grid), Company Name, Email, Phone Number
  (country-dial `Select` 132px + tel input), Create Password (with show/hide eye toggle and a
  helper hint "Use 8 characters with letters, numbers, and symbols."), Confirm Password (eye
  toggle). Primary full-width `Continue` button. Footer: "Already have an account? Sign in".
  - Inputs persist live to shared state as the user types (see State Management).
  - Clicking **Continue** validates: first/last/company required, email required + must match
    `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. On error, the offending Input shows an inline error message.
  - On valid submit it also **resets onboarding state** to defaults (employees `todo`, payroll
    `locked`, wallet `none`, roster cleared), then advances to Step 2.
- **Step 2 — Verify email.** Centered green mail FeaturedIcon, "Verify your email", subtext
  "We've sent a 6-digit code to {email}. Enter the code to verify your email" (email comes from
  the form). Six single-char OTP boxes (56×56, 12px radius) with auto-advance, backspace-to-prev,
  and paste-to-fill. "Didn't get a code? Click to resend" (shows transient "Code resent ✓").
  `Verify & continue` button is disabled until all 6 boxes are filled. "Back to sign up" link
  returns to Step 1.
- **Step 3 — Account activated.** Centered green check FeaturedIcon, "Account activated",
  subtext "Your account has been successfully activated. Please sign in to continue.", and a
  `Sign in` button linking to Login.

### 2. Login (`Login.dc.html`)
Same **fixed 600px** marketing panel on the left. Right panel: "Welcome back" style form with
Email/Phone and Password inputs and a primary sign-in button. Mirrors Sign Up's layout shell.

### 3. Landing Page (`Landing Page.dc.html`)
Public marketing page: sticky translucent nav (`rgba(255,255,255,0.86)` + `blur(12px)`), green
hero with a product card, feature sections, a dark `brand-900` compliance/CTA block, and trust
signals. Sentence-case copy throughout, Ghanaian specifics (Cedi amounts, SSNIT/PAYE/GRA).

### 4. Sidebar (`Sidebar.dc.html`) — shared app shell
288px fixed sidebar, white, `1px var(--border-secondary)` right border, sticky full-height.
- Logo + collapse icon in a top bar (`top-height` prop, 72 or 80px).
- Nav links (active state = `brand-50` bg + `brand-700` text + `brand-600` icon; idle = transparent
  + `fg-secondary` + `gray-500` icon; hover = `gray-50` wash): **Dashboard**, section label "HR" →
  **People**, section label "Finance" → **Payroll**, **Wallets** (with a balance pill on the right).
- Footer: Support, Settings, then an account card (avatar with initials, user name, company,
  up/down chevron).
- **Identity is read from saved account state** (see State Management), not hardcoded. Falls back
  to neutral labels ("Your account", "Your company") when no account exists.
- Props: `active` (enum: dashboard/payroll/wallets/people/none), `wallet` (text), `topHeight` (int).

### 5. Dashboard (`Dashboard Page.dc.html`)
Sidebar + main column. Greeting "Welcome, {firstName}" and "Let's finish setting up payroll for
{companyName}" (both from account state; fall back to "there" / "your company"). Onboarding
checklist with three actions whose state comes from shared app-state: **Add employees**, **Set up
payroll** (locked until employees added), **Company wallet**. KPI tiles and a setup progress count.

### 6. People (`People Page.dc.html`)
Employee roster table. Header "People" + "This is everyone in {companyName}." A segmented
add-control. Two data states: **Empty** (fresh account) and **Populated**. When testers have added
real employees they always show; otherwise a seed dataset can be toggled for demo. Rows link to
Employee Profile. "Add employee" opens a drawer with validation and a success toast.

### 7. Employee Profile (`Employee Profile.dc.html`)
Full employee record resolved by `?i=<index>` against the saved roster (or seed data in demo).
Editable fields write back to the roster.

### 8. Add Employees (`Add Employees.dc.html`)
Bulk/guided employee setup (PAYE details, bank info). Commits the roster to shared state and
flips onboarding `employees` → done / `payroll` → unlocked.

### 9. Payroll (`Payroll Page.dc.html`)
Payroll setup and run. Stages derived from app-state: **No employees** → **Payroll not set up** →
**Ready to run**. Employee pay table with gross/SSNIT/PAYE/net columns (tabular figures).

### 10. Set Up Payroll (`Set Up Payroll.dc.html`)
Guided payroll configuration (pay schedule, templates, employee amounts).

### 11. Company Wallet (`Company Wallet.dc.html`)
Wallet overview. State derived from app-state `wallet`: **No application** / **Under review** /
**Approved**. Shows balance, account details (account name = company from account state, account
number, branch), and recent activity. Approve flow drives the state.

### 12. Company Wallet Application (`Company Wallet Application.dc.html`)
Multi-step KYB/wallet application (business details, shareholders, invitees), submission, and
review status.

### 13. Invite Team (`Invite Team.dc.html`)
Header "Invite your team". A card lists the **owner** (read from account state, badge "Full
Access") plus any **invited** members (badge "Full Access" or "Limited Access", with a remove
button). A dashed "Invite a team member" button opens a modal:
- Inputs: First Name, Last Name, Email, Phone — **all start empty** (no prefill).
- "What can this team member access?" — six permission rows, each a title + description + a
  Toggle. The list (exact copy):
  1. **Full Access - Admin** — Has access to all features and can manage other team members.
  2. **Manage employees** — Add, update, and manage employee records and profiles.
  3. **Role Management** — Create and manage roles and team member permissions.
  4. **Run Payroll** — Process and manage employee payroll and compensation.
  5. **Finance Full Access** — Full access to financial data, reports, and transactions.
  6. **Company Profile Access** — View and manage company profile and organizational settings.
  - Toggling "Full Access - Admin" on switches every other permission on and disables them.
  - Each row has a 1px bottom divider **except the last row** (no divider).
- Footer: Cancel / Send Invite (validates first/last/email). The owner row opens a read-only
  "Your access" variant (all permissions on, inputs disabled).

---

## Interactions & Behavior
- **In-page step machine** (Sign Up): `form → verify → activated`, swapping the right panel
  only; left panel never changes. Validation gates each transition.
- **OTP inputs**: auto-advance on entry, backspace moves to previous empty box, paste distributes
  digits across boxes, submit enabled only when all six are filled.
- **Show/hide password**: eye icon toggles input `type` between `password` and `text`.
- **Permission toggles**: master "Full Access - Admin" cascades to all and locks the rest.
- **Onboarding gating**: payroll is locked until employees exist; adding employees unlocks it;
  completing payroll marks it done. Wallet has its own state machine.
- **Navigation**: sidebar links route between app pages; Sign Up's internal steps do NOT route.
- **Toasts**: "Employee has been added successfully" after adding a person (auto-dismiss).
- **Animation**: quiet and quick — 120ms ease on color/background/shadow for hovers; 160–300ms
  for toggles, progress and expanding panels. Buttons nudge `translateY(1px)` on press. No
  bounces or decorative loops. Focus = 4px brand ring.

## State Management
The intended client-side model is in **`app-state.js`** (`window.AppState`), persisted in
`localStorage`. Re-implement this as your app's store/server model — the keys and transitions are
the spec:

- **Onboarding dimensions** (`dxp_<key>`):
  - `employees`: `'todo' | 'done'`
  - `payroll`: `'locked' | 'unlocked' | 'done'` (locked until employees added)
  - `wallet`: `'none' | 'review' | 'active' | 'rejected'`
  - API: `AppState.get()`, `AppState.set(patch)`
- **Employee roster** (`dxp_roster`): array of employee records.
  - API: `getEmployees()`, `setEmployees(list)`, `addEmployees(emps)`, `clearEmployees()`
- **Account owner** (`dxp_account`): `{ firstName, lastName, company, email, dial, phone }`,
  captured live during Sign Up.
  - API: `getAccount()`, `setAccount(patch)`, `clearAccount()`
  - Consumed by: Sidebar (user/company), Dashboard (greeting), People (company name),
    Company Wallet (account name), Invite Team (owner row), Sign Up verify step (email).
- **Reset on signup**: submitting the Sign Up form resets `employees='todo'`, `payroll='locked'`,
  `wallet='none'` and clears the roster, so a new account starts with everything still "to do".

Because pages can mount before `app-state.js` defines `window.AppState`, the prototypes poll
briefly (~20 × 30ms) for it. In a real app this is just your store being ready — no polling needed.

## Design Tokens
Full token sheets are included under `tokens/` (colors, typography, spacing, shadows, base). Key
values:

**Brand / color**
- Brand green: `--brand-500 #02aa69` (accent), `--brand-600 #018f58` (PRIMARY solid),
  `--brand-700 #016f45` (text on light / press), `--brand-900 #013a25` (dark banners).
- Brand tints: `--brand-50 #e8fbf1` (active nav, soft chips), `--brand-25 #f3fdf8`.
- Neutrals (gray-modern): `#fafafa` 50 · `#f5f5f5` 100 · `#e9eaeb` 200 · `#d5d7da` 300 ·
  `#a4a7ae` 400 · `#717680` 500 · `#535862` 600 · `#414651` 700 · `#252b37` 800 · `#181d27` 900.
- Status: success `#039855`/`#ecfdf3`, warning `#dc6803`/`#fffaeb`, error `#d92d20`/`#fef3f2`,
  info `#1570ef`/`#eff8ff`.
- Accents (tags/avatars/charts): orange `#ef6820`, pink `#ee46bc`, indigo `#6172f3`/`#3538cd`,
  teal `#15b79e`, purple `#7a5af8`.
- Semantic: text `--fg-primary #181d27` / secondary `#414651` / tertiary `#535862` /
  quaternary `#717680`. Surfaces: `--bg-primary #ffffff`, `--bg-secondary #fafafa` (canvas).
  Borders: `--border-secondary #e9eaeb` (default), `--border-primary #d5d7da` (inputs).
  Overlay `rgba(10,13,18,0.50)`.

**Typography** — one typeface, **Maven Pro** (display + body + UI). Mono = system stack.
- Weights: 400/500/600/**700**/**800**/900. Headings are 700–800 with `-0.02em` tracking.
- Display scale: 72/90, 60/72, 48/60, 36/44, 30/38, 24/32 (size/line-height px).
- Text scale: 20/30, 18/28, 16/24, 14/20, 12/18. Tables/metrics/currency use `tabular-nums`.

**Spacing** — 4px base grid: 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.

**Radii** — inputs/nav `--radius-md 8px`; default card `--radius-xl 12px`; large card/banner
`--radius-2xl 16px`; CTA panels `--radius-4xl 24px`; **all buttons, chips, badges, avatars are
`--radius-full 9999px` (pill)** — the signature Dexwin shape.

**Shadows** — Untitled UI cool, low-opacity ladder `xs → 2xl`. Cards use `shadow-xs`, hover lifts
to `shadow-md`. Buttons add a skeuomorphic inset ring + 2px bottom bevel
(`--shadow-btn-primary`). Focus rings: `--ring-brand 0 0 0 4px rgba(2,170,105,0.24)`.

**Content rules** — sentence case everywhere (never Title-Case buttons); acronyms stay caps
(SSNIT, PAYE, NHIL, GETFund, GRA); currency is `GH₵ ` + thousands-separated tabular figures;
copy is calm, plain-spoken, Ghanaian-specific. Emoji only as rare warm in-app punctuation.

## Iconography
Outline / line icons in the Untitled UI house style (1.5–2px stroke, round caps/joins, 24px
grid) — equivalent to **Lucide / Feather**. Icons inherit color via `currentColor`. Use Lucide (or
your codebase's existing line-icon set) to match. The Dexwin diamond brandmark is a brand glyph
(favicon / app icon), not part of the icon set.

## Assets
The `assets/` folder is included and holds: brand logos & brandmarks (`dexwin-logo*.svg`,
`dexwin-logo-full.png`, `dexwin-logo-onphoto.svg`, `dexwin-mark.svg`), the Maven Pro web fonts
(under `_ds/.../fonts/`), the Sign Up/Login photography and gradient (`signup-couple.png`,
`signup-gradient.png`, `signup-avatars.png`), the topographic banner texture (`topo-bg.png`,
`welcome-bg.png`), and the GRA logo. Swap in your own licensed photography for production; reuse
the brand SVGs from your codebase's brand system if it already has them.

## Files
Design prototypes (open any in a browser):
- `Landing Page.dc.html` — public marketing page
- `Sign Up.dc.html` — onboarding (form → verify → activated, single page)
- `Login.dc.html` — sign in
- `Sidebar.dc.html` — shared app shell (imported by the app pages)
- `Dashboard Page.dc.html` — onboarding dashboard
- `People Page.dc.html` — employee roster
- `Employee Profile.dc.html` — single employee record
- `Add Employees.dc.html` — guided employee setup
- `Payroll Page.dc.html` — payroll setup + run
- `Set Up Payroll.dc.html` — payroll configuration
- `Company Wallet.dc.html` — wallet overview
- `Company Wallet Application.dc.html` — KYB/wallet application
- `Invite Team.dc.html` — team members + permissions
- `Account Activated.dc.html`, `Verify Email.dc.html` — original standalone versions of those
  screens (their content now lives inline inside `Sign Up.dc.html`; kept here for reference only)

Supporting code (read for intent, re-implement in your stack):
- `app-state.js` — the client-side state model (see State Management)
- `ds-base.js`, `support.js` — the prototype runtime + design-system loader (do **not** port)

Design system reference:
- `tokens/` — colors, typography, spacing, shadows, base (the source of truth for all values)
- `assets/` — brand logos, fonts, photography, textures
