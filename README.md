# emtrc — London Web Design, Hosting & AI Front Office

Static marketing website for **emtrc** (`World Finance Global Limited trading as emtrc`), built for independent London small businesses (barbers, salons, plumbers, electricians, builders, cleaners and cafés), complete with **15 live interactive London business demos** at `/demos/:presetId`, **3 downloadable PDF playbooks**, and a fortnightly newsletter capture band.

## Architecture & Guarantees
- **100% static SPA**: Vite + React 19 + TypeScript + Tailwind CSS v4. Zero backend, zero runtime API calls, zero API keys or secrets anywhere, zero cookies, zero third-party trackers, zero Google Fonts requests (all variable fonts self-hosted via `@fontsource-variable/*`).
- **Single-source content**: Every headline, plan price, add-on, AI tool description, PDF guide, Calendly link (`https://calendly.com/kieranpascal/emtrc-introduction`), legal flag and form endpoint lives in **`src/content/site.ts`**.
- **Cloudflare Pages ready**: Includes `public/_redirects` (`/* /index.html 200`), `public/robots.txt`, `public/sitemap.xml`, `public/favicon.svg`, and real PDF downloads in `public/downloads/`.
- **Live demos included**: All 15 London local-business templates (`examples/*.json`) remain live and browsable right from `/work` and `/demos/:presetId`.

## Routes
| Route | Purpose |
| --- | --- |
| `/` | Editorial landing page with interactive hero phone preview, photo marquee, dark capability deck, launch cadence, live demos, free PDF guides, pricing summary & newsletter |
| `/services` | Managed websites, domains & email, Google Maps & AI search, monthly care |
| `/pricing` | Monthly / Annual (2 months free) toggle, Starter / Business / Growth plans, One-off build (£595 + £25/mo), add-ons table, feature comparison & "Why monthly?" |
| `/ai-tools` | Review Engine (£39/mo), Lead Catcher (£79/mo), AI Receptionist (£149/mo), Business Phone (Cloud VoIP — ahead of 31 January 2027 PSTN switch-off) with HTML/CSS flow diagrams |
| `/how-it-works` | 4-stage launch timeline, domain ownership promise & FAQs |
| `/work` | Filterable gallery of all 15 live London demos across 5 trades × 3 styles |
| `/demos/:presetId` | Interactive live demo viewer with top return bar back to emtrc.com |
| `/resources` | Email-gated free PDF library (3 real downloadable PDFs) + newsletter + FAQs |
| `/about` | Studio ethos, operating principles, 4 written guarantees & company details |
| `/contact` | Email, Calendly booking link, London service area & legal company line (no address map) |
| `/free-demo` | Validated demo request form (32 London boroughs + City of London, honeypot, GDPR checkboxes) |
| `/privacy` & `/terms` | UK GDPR draft privacy policy and terms of service for World Finance Global Limited trading as emtrc |

## Local Development, Testing & Production Build

Requires **Node.js 20+**.

```bash
npm install
npm run dev      # Local dev server on http://localhost:3000
npm test         # Runs all unit tests (pricing, forms, schemas, open hours, SEO, themes)
npm run lint     # TypeScript strict type-check (tsc --noEmit)
npm run build    # Outputs static production bundle to dist/
npm run preview  # Preview production dist/ locally
```

## Deploying to Cloudflare Pages

1. Export or push this repository to GitHub.
2. In the **Cloudflare Dashboard**, go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository and use these build settings:
   - **Framework preset**: `Vite` (or `None`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variable**: `NODE_VERSION` = `20`
4. Click **Save and Deploy**. `public/_redirects` handles SPA client-side routing automatically.

## Pre-Launch Placeholder Checklist (`src/content/site.ts`)

Everything you need to update before going live is in **`src/content/site.ts`** (plus `public/sitemap.xml` / `public/robots.txt` if your production domain differs from `https://emtrc.com`):

1. **Company registration details** (`SITE.brand`):
   - `companyNumber`: replace `"[Company number — update before launch]"` with World Finance Global Limited's Companies House number.
   - `registeredOffice`: replace `"[Registered office address — update before launch]"` with the registered office address.
   - `phoneDisplay` / `phoneHref`: replace `020 7946 0900` (Ofcom UK drama range) with your live emtrc London phone number.
   - `email`: confirm `hello@emtrc.com` is active.
2. **Form & email endpoints** (`SITE.endpoints`):
   - `freeDemoEndpoint`: set to your Cloudflare Pages Function or Tally webhook URL (currently empty = validated dry-run success).
   - `newsletterEndpoint`: set to your Brevo / Cloudflare Pages Function endpoint for fortnightly newsletter signups.
   - `pdfDownloadEndpoint`: set to your Brevo / Cloudflare Pages Function endpoint for PDF download email captures.
3. **Feature flags** (`SITE.flags`):
   - `showExVat`: leave `false` until VAT registered; set `true` to append `"ex VAT"` across all pricing tables.
   - `showLegalDraftBanner`: set `false` once a solicitor has signed off `/privacy` and `/terms`.
4. **Domain URLs**:
   - Confirm `SITE.brand.siteUrl`, `index.html`, `public/robots.txt`, and `public/sitemap.xml` match your final production domain (`https://emtrc.com`).
