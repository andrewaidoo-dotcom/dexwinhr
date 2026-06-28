DexwinPay — Hosting Package
===========================

This folder is the complete, self-contained DexwinPay site. Entry point: index.html
(it redirects to "Landing Page.dc.html").

HOW TO HOST
-----------
Upload the ENTIRE contents of this folder (keep the structure intact) to any
static web host — e.g. Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3, or
an nginx/Apache server.

TWO REQUIREMENTS — both matter, and explain why an earlier copy "behaved
differently" when opened locally:

1. MUST be served over HTTP/HTTPS — NOT opened by double-clicking the files.
   The pages load their components with fetch(), which browsers block on the
   file:// protocol. If you double-click an .html file it will look broken.
   To preview locally, run a tiny static server from inside this folder, e.g.:
       python3 -m http.server 8080
   then open http://localhost:8080/

2. Needs internet access in the visitor's browser. React and Babel are loaded
   from the unpkg.com CDN at runtime. Any normal public host is fine; a fully
   offline/air-gapped network is not.

KEEP FILENAMES EXACTLY AS-IS
----------------------------
Filenames contain spaces and capital letters (e.g. "Landing Page.dc.html").
Most hosts (Linux/nginx/GitHub Pages) are case-sensitive, so do not rename or
change the casing — the in-app links rely on the exact names.

WHAT'S INSIDE
-------------
  index.html            entry/redirect
  *.dc.html             the pages (Landing, Login, Sign Up, Dashboard, etc.)
  support.js            page runtime
  ds-base.js            design-system loader
  app-state.js          shared in-browser state (localStorage)
  _ds/                  DexwinPay design system (tokens, fonts, components)
  assets/               images & logos

Note: the older "design_handoff_dexwinpay_app" folder in the source project is
an outdated, incomplete export (it was missing the _ds design-system folder) —
do not host that one. This dist/ folder is the correct, current build.
