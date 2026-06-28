# DexwinPay Design System

The design system for **DexwinPay** — a payroll, HR and statutory-compliance platform built for Ghanaian companies. It lets teams pay their staff, file SSNIT and PAYE, and manage leave in one calm, modern workspace.

This system is built on **Untitled UI** (a Tailwind-based palette and component structure), re-anchored on the Dexwin brand: green `#018F58` / `#02AA69` and the **Maven Pro** typeface.

---

## Products in scope

1. **Marketing site** — the public landing experience (`ui_kits/marketing/`). Light, spacious, with a green hero, a dark compliance/CTA section, and trust signals tuned for Ghanaian SMEs.
2. **DexwinPay app** — the authenticated payroll/HR product (`ui_kits/app/`). A 280px sidebar shell with Dashboard, Payroll and Employees views; dense tables, KPI tiles, status badges and an approve-run flow.

---

## Sources (for whoever maintains this)

- **Figma:** "❖ Dexwin UI – (v7.0)" — a full Untitled UI v7 library (foundations, base components, application components, examples). Used as the structural reference for the component set and token scales. Note: the Figma library ships in **Inter** with stock Untitled UI colors; the Dexwin brand adaptation (Maven Pro + green) lives in the codebase below and is the source of truth here.
- **Codebase:** `DexwinHR/` (read-only mount) — the working product build. Its `colors_and_type.css` is the authoritative, brand-adapted token sheet and was the basis for `tokens/`. Real screens: `index.html` (marketing), `Dashboard.html`, `Payroll.html`, `Add Employee.html`, `Login.html`, `Sign Up.html`, etc.
- **Brand assets:** uploaded logos (`dexwin-logo*.svg`, `dexwin-brandmark-*.svg`) and the **Maven Pro** TTF family.

---

## Content fundamentals

How DexwinPay writes:

- **Voice:** calm, plain-spoken, reassuring. The product's promise is *less panic* — copy reflects that ("Sleep through the 14th of every month.", "We got our Saturdays back.").
- **Person:** addresses the customer as **you** ("Pay your team", "your next payroll"). The company is **we** ("We do — and we file the returns for you.").
- **Casing:** sentence case everywhere — headings, buttons, nav, table headers. Never Title Case buttons. Acronyms stay uppercase (SSNIT, PAYE, NHIL, GETFund, GRA).
- **Specificity & locality:** copy is unmistakably Ghanaian — Cedi amounts (`GH₵ 248,900.00`), real statutory bodies (SSNIT Tier 1, GRA, PAYE bands), cities (Accra, Kumasi, Tema), names (Akua Mensah, Kwame Owusu), and channels (payslips on WhatsApp, in English & Twi). Numbers are concrete, never lorem-ipsum.
- **Numbers:** currency is always `GH₵` + space + thousands-separated, tabular figures. Percentages are exact (`19.6% of gross`).
- **Tone of length:** short, confident sentences. Feature bullets are 3–5 words to a clause. Headlines use a period for finality ("not days.").
- **Emoji:** used very sparingly, only in warm in-app moments (the dashboard greeting "Good morning, Ama 👋"). Never in marketing headlines, buttons, or table data.
- **Vibe:** trustworthy fintech meets friendly local SaaS — competent and warm, never corporate-cold or hype-y.

---

## Visual foundations

- **Color:** a single brand green (`#018F58` primary / `#02AA69` accent / `#016F45` text-on-light) over a cool Untitled UI gray neutral scale. White surfaces on a `gray-50` canvas. Dark sections use `brand-900` (`#013a25`) for hero banners, the compliance block and CTAs. Status uses the semantic ramps (success/warning/error/info); accents (orange/pink/indigo/teal/purple) are reserved for tags, charts and avatars. Color is used with restraint — mostly neutral, with green as the single confident accent.
- **Type:** Maven Pro for everything. Headings are **bold (700) / extrabold (800)** with tight tracking (`-0.02em`); body is regular/medium. Display scale 72→24px, text scale 20→12px. Numbers use `tabular-nums` in tables, metrics and currency.
- **Spacing:** 4px base grid. Generous section padding on marketing (88px), tighter in-app (24–36px).
- **Corners:** generous rounding. Cards `radius-xl`/`2xl` (12–16px), large panels `radius-4xl` (24px), and **pill (`radius-full`) for all buttons, chips, badges and avatars** — the most recognisable Dexwin shape cue.
- **Cards:** white, `1px var(--border-secondary)`, `radius-2xl`, `shadow-xs`; hover lifts to `shadow-md`. Headers and footers are divided by hairline borders; footers sit on a `gray-50` tint.
- **Shadows:** the Untitled UI cool, low-opacity, layered ladder (xs→2xl). Buttons add a skeuomorphic inset ring + 2px bottom bevel (`--shadow-btn-primary`).
- **Backgrounds:** mostly flat white / `gray-50`. Imagery appears as photos in rounded frames (warm, natural-light office/people shots) and a subtle topographic texture (`assets/welcome-bg.png`, `topo-bg.png`) behind dark banners. Radial green glows accent dark CTAs. No loud full-bleed gradients.
- **Borders & dividers:** hairline `gray-200` (`border-secondary`) is the default; `gray-300` (`border-primary`) for inputs and emphasis; `rgba(255,255,255,0.12)` on dark.
- **Animation:** quiet and quick. 120ms ease on color/background/shadow for hovers; 160–300ms for toggles, progress and expanding panels. No bounces, no decorative loops.
- **Hover states:** solid buttons darken one step (brand-600 → 700); secondary/ghost get a `gray-50` wash; nav items get a `gray-50` wash, active is `brand-50` + `brand-700`. Cards lift their shadow.
- **Press states:** buttons nudge `translateY(1px)`; no scale.
- **Focus:** 4px brand ring (`--ring-brand`) on inputs and controls; error ring for invalid.
- **Transparency & blur:** the sticky marketing nav is `rgba(255,255,255,0.86)` + `blur(12px)`; modals use a `rgba(10,13,18,0.5)` overlay with a light backdrop blur.
- **Imagery vibe:** warm, natural-light, real people at work; never cold stock or heavy filters.

---

## Iconography

- **System:** outline / line icons in the Untitled UI house style — 1.5–2px stroke, round caps and joins, on a 24px grid. This is visually equivalent to **Lucide / Feather**.
- **In this system:** the design-system cards and UI kits load **[Lucide](https://lucide.dev) via CDN** (`unpkg.com/lucide`) as the closest faithful match to Untitled UI's line set. ⚠️ *Substitution flag:* the Figma's bespoke Untitled UI icon set was **not** extracted as SVGs; Lucide is used in its place. If you want pixel-exact Untitled UI glyphs, export them from the Figma and drop them into `assets/icons/`.
- **Stroke convention:** default 2px (`stroke-width`), 1.75–1.9px when small (≤18px). Color via `currentColor` so icons inherit text/role color.
- **Brand glyphs:** the Dexwin diamond brandmark (`assets/dexwin-mark.svg` and `-brandmark-*`) is its own mark, not an icon-font glyph — use it for the favicon and app icon only.
- **Emoji:** only as occasional warm punctuation in-app (dashboard greeting). Not an icon system.
- **Unicode:** `★` is used for testimonial star ratings; `GH₵` for currency. No other unicode-as-icon usage.

---

## File index / manifest

**Global entry**
- `styles.css` — the one file consumers link. `@import`s fonts + all tokens + base reset.

**Tokens** (`tokens/`)
- `colors.css` — brand, gray, semantic ramps, accents + fg/bg/border role aliases.
- `typography.css` — Maven Pro families, weights, type scale + `.h-*` / `.t-*` classes.
- `spacing.css` — spacing, radii, widths, containers.
- `shadows.css` — elevation ladder, button shadow, focus rings.
- `base.css` — minimal reset.

**Fonts** (`fonts/`) — Maven Pro TTFs + `fonts.css` `@font-face` rules.

**Components** (`components/`) — React primitives, one folder per group, each with a `@dsCard` HTML demo:
- `buttons/` — Button, IconButton
- `forms/` — Input, Textarea, Select, Checkbox, Radio, Toggle
- `display/` — Badge, Tag, Avatar, FeaturedIcon
- `data/` — Card, Metric, Tabs, Table
- `feedback/` — Alert, Tooltip, ProgressBar, Modal

**Guidelines** (`guidelines/`) — foundation specimen cards for the Design System tab (Colors, Type, Spacing, Brand).

**UI kits** (`ui_kits/`)
- `marketing/` — landing page recreation.
- `app/` — payroll/HR app shell with Dashboard, Payroll, Employees + approve-run modal.

**Assets** (`assets/`) — logos, brandmarks, hero photo, banner textures, GRA logo.

**Other**
- `SKILL.md` — Agent-Skills wrapper so this can be used in Claude Code.

The compiler generates `_ds_bundle.js`, `_ds_manifest.json` and `_adherence.oxlintrc.json` — do not edit those by hand. Components are reachable in card/kit HTML via `window.DexwinPayDesignSystem_848e17`.
