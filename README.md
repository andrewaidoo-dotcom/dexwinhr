# DexwinPay

Payroll, HR and statutory-compliance platform for Ghanaian companies. This
repository implements the DexwinPay product designs (Untitled UI base,
re-anchored on the Dexwin brand green and the Maven Pro typeface).

## Stack

- **React 18** + **TypeScript**
- **Vite** for dev/build
- **react-router-dom** for routing
- Design tokens as CSS custom properties under `src/styles/tokens/` — the
  source of truth for color, typography, spacing, radii and shadows.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Implemented

- **Sign Up** (`/signup`) — single-page, three-step onboarding
  (`form → verify email → activated`) that swaps the right panel in place
  beside a fixed 600px marketing panel. Includes live persistence of form
  fields to the shared client store, email validation, password show/hide
  toggles, a 6-digit OTP entry with auto-advance / backspace / paste, and a
  resend affordance.
- **Login** (`/login`) — minimal placeholder that shares the auth layout
  shell; the full screen is a follow-up.

## Project structure

```
src/
  components/
    AuthMarketingPanel.tsx   # shared 600px brand panel
    ui/                      # design-system primitives (Button, Input, Select, EyeToggle)
  lib/
    appState.ts              # client-side onboarding/account store (localStorage)
  pages/
    SignUp.tsx
    Login.tsx
  styles/
    global.css
    tokens/                  # color / typography / spacing / shadow tokens
public/
  assets/                    # brand logos, photography, textures
```

## State model

`src/lib/appState.ts` re-implements the design handoff's client state model
(`AppState`), persisted in `localStorage`:

- **Onboarding** — `employees` (`todo|done`), `payroll`
  (`locked|unlocked|done`), `wallet` (`none|review|active|rejected`).
- **Account owner** — captured live during Sign Up, consumed across the app.
- **Roster** — employee records.

Submitting the Sign Up form resets onboarding to defaults and clears the
roster, so a new account starts with everything still "to do".
