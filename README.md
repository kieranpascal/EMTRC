# London Local Business Website Template (1–5 Pages)

A reusable, zero-backend **Vite + React + TypeScript + Tailwind CSS v4** static website template for local London businesses, built to be cloned and deployed to **Cloudflare Pages** automatically from a single `public/site.json` file.

Every piece of business-specific copy, branding, opening hours, pricing, gallery photography, reviews, SEO metadata, theme colours, typography, accreditation badges, and enabled pages comes from **`public/site.json`** (bundled at build time via Vite — zero runtime API calls, zero secrets, zero external font requests).

Supports **5 London business niches** × **3 visual styles** (`bold`, `elegant`, `minimal`) out of the box:

- **Barber shop** (`niche: "barber"`) — dark, bold, masculine styling, chair booking, walk-in hours.
- **Hair & beauty salon** (`niche: "salon"`) — warm, refined styling, categorised cuts/colour/beauty treatments.
- **Plumber / electrician** (`niche: "trades"`) — trustworthy blue palette, prominent 24/7 emergency call-out strip, optional `gasSafeNumber` & `niceicNumber` badge fields that hide completely unless filled in.
- **Cleaner** (`niche: "cleaner"`) — fresh light layout + built-in validated quote-request form.
- **Café** (`niche: "cafe"`) — categorised **Menu** section (nav & headings switch automatically from Services to Menu) with dietary tags (`V`, `VG`, `GF`) + coffee & brunch food photography.

---

## Included Example `site.json` Files (15 Examples — 3 Boroughs × 3 Styles per Niche)

| Niche | File | Borough | Style | Font | Highlights |
| --- | --- | --- | --- | --- | --- |
| **Barber** | `examples/barber-bold-hackney.json` | Hackney | `bold` (dark) | `athletic` | 5 pages, Fresha booking |
| **Barber** | `examples/barber-elegant-marylebone.json` | Westminster | `elegant` (dark) | `editorial` | 5 pages, Booksy booking |
| **Barber** | `examples/barber-minimal-brixton.json` | Lambeth | `minimal` (light) | `modern` | 1-page anchor mode |
| **Salon** | `examples/salon-elegant-kensington.json` | Kensington & Chelsea | `elegant` (light) | `editorial` | 5 pages, categorised treatments |
| **Salon** | `examples/salon-bold-islington.json` | Islington | `bold` (light) | `athletic` | 5 pages, late Thursday hours |
| **Salon** | `examples/salon-minimal-richmond.json` | Richmond upon Thames | `minimal` (light) | `modern` | 1 page, empty `reviews` auto-hides |
| **Trades** | `examples/trades-bold-greenwich.json` | Greenwich | `bold` (light) | `modern` | Emergency strip + `gasSafeNumber` + `niceicNumber` |
| **Trades** | `examples/trades-elegant-camden.json` | Camden | `elegant` (light) | `editorial` | Electrician schema + `niceicNumber` only |
| **Trades** | `examples/trades-minimal-ealing.json` | Ealing | `minimal` (light) | `modern` | 1 page, blank Gas Safe/NICEIC auto-hides badges |
| **Cleaner** | `examples/cleaner-minimal-wandsworth.json` | Wandsworth | `minimal` (light) | `modern` | 5 pages + quote-request form |
| **Cleaner** | `examples/cleaner-bold-tower-hamlets.json` | Tower Hamlets | `bold` (light) | `athletic` | 5 pages + Canary Wharf quote form |
| **Cleaner** | `examples/cleaner-elegant-hampstead.json` | Camden | `elegant` (light) | `editorial` | 5 pages + eco housekeeping quote form |
| **Café** | `examples/cafe-elegant-southwark.json` | Southwark | `elegant` (light) | `editorial` | 5 pages + Menu + coffee & brunch photos |
| **Café** | `examples/cafe-bold-shoreditch.json` | Hackney | `bold` (dark) | `athletic` | 5 pages + dark-roast Menu + brunch photos |
| **Café** | `examples/cafe-minimal-hammersmith.json` | Hammersmith & Fulham | `minimal` (light) | `modern` | 1-page Menu + food photos |

> **Previewing locally:** The default `public/site.json` sets `"showTemplatePreview": true` so you can switch between all 15 examples using the non-sticky **Preview example** bar at the top of the page (or pass `?preset=trades-bold-greenwich` in the URL). Every file in `examples/` omits `showTemplatePreview`, so live client sites have zero preview UI.

---

## How to Create & Deploy a New Business Site

### Step 1: Copy a starting `site.json` (or generate from Google Places)

Pick the closest niche/style from `examples/` and copy it over `public/site.json`:

```bash
cp examples/barber-bold-hackney.json public/site.json
```

### Step 2: Populate `public/site.json`

Validate against `site.schema.json` (Draft 2020-12) and `src/types/site.ts`:

- **Core fields**: `businessName`, `tagline`, `niche` (`"barber" | "salon" | "trades" | "cleaner" | "cafe"`), `borough`, `phone`, optional `address` (hides if empty), optional `whatsapp`, `email`, `bookingUrl`, `instagramUrl`.
- **Opening hours**: 7 rows (`Monday`–`Sunday`), each `{ "day": "Monday", "open": "09:00", "close": "19:00" }` or `{ "day": "Sunday", "status": "closed" }`. The live **"Open now / Closed now"** indicator computes in the browser using `Europe/London` time.
- **Services / Menu**: `services` array (`name`, `description`, optional `price`, `duration`, `category`, `dietary`). For `niche: "cafe"`, nav and headings automatically render as **Menu**.
- **Gallery & Hero**: `heroImage` (optional, defaults to `gallery[0]`) and `gallery` array with `url`, `alt`, explicit `width` and `height` (lazy-loaded to protect Lighthouse CLS).
- **Reviews**: `reviews` array — pass `[]` to hide the Reviews section and omit `aggregateRating` from JSON-LD automatically.
- **Niche modules**:
  - `emergencyCallout`: prominent emergency bar on trades sites (omit to hide).
  - `gasSafeNumber` & `niceicNumber`: optional string fields on trades sites — badges render only when non-empty and hide completely when blank/omitted. Additional accreditations can also be supplied via `badges`.
  - `quoteForm`: `{ "enabled": true, "endpoint": "" }` renders a validated quote-request form (dry-run confirmation when `endpoint` is empty; set `endpoint` to a Cloudflare Pages Function or Tally URL in production).
- **Theme**:
  - `primaryColour` & `accentColour`: 6-digit hex (button foreground contrast is automatically enforced to WCAG AA).
  - `font`: `"athletic"` (Oswald) | `"editorial"` (Playfair Display) | `"modern"` (Plus Jakarta Sans) — all self-hosted via `@fontsource-variable/*`.
  - `style`: `"bold"` | `"elegant"` | `"minimal"`.
  - `mode` (optional): `"dark"` | `"light"` (defaults to `"dark"` for barbers, `"light"` for other niches).
- **Pages (1 to 5 pages)**: Toggle `pages.services`, `pages.gallery`, `pages.about`, `pages.contact`. Setting all four to `false` switches cleanly to a **1-page** site with anchor navigation.
- **Demo Mode (`demoMode`)**:
  - `true`: displays `"This is a free demo website made for [businessName] by emtrc. Like it? Call [demoBannerPhone]"` and adds `<meta name="robots" content="noindex, nofollow" />`.
  - `false`: hides the demo banner and allows search engine indexing.

### Automated Generation from Google Places (Claude Code Workflow)

When generating `public/site.json` from a Google Places record:

| Google Places Field | `public/site.json` Field |
| --- | --- |
| `displayName.text` | `businessName` |
| `formattedAddress` / `addressComponents` | `address` & `borough` |
| `nationalPhoneNumber` | `phone` |
| `regularOpeningHours.periods` | `openingHours` (7 days, `HH:MM` or `{ day, status: "closed" }`) |
| `reviews[]` | `reviews[]` (`author`, `text`, `rating`, `source: "Google"`) |
| `primaryType` | `niche` + `seo.schemaType` (`BarberShop`, `BeautySalon`, `Plumber`, `Electrician`, `HousekeepingService`, `CafeOrCoffeeShop`) |
| Register lookup (optional) | `gasSafeNumber`, `niceicNumber` (leave `""` if unverified so badges stay hidden) |

Always leave `showTemplatePreview` omitted (or `false`) and set `demoMode: true` for outreach demos, then flip `demoMode: false` when the client signs on.

### Step 3: Develop, Test & Build Locally

Requires **Node.js 20+** (`.node-version` is pinned to `20`).

```bash
npm install
npm test          # Unit tests (hours, theme contrast, SEO JSON-LD, quote form, all 15 examples)
npm run lint      # TypeScript check (tsc --noEmit)
npm run build     # Production static output in dist/
```

### Step 4: Deploy to Cloudflare Pages

1. Push the repo (with the business's `public/site.json`) to GitHub, or deploy directly with `npx wrangler pages deploy dist --project-name=<slug>`.
2. In **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**:
   - **Framework preset**: `Vite` (or `None`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variables**: `NODE_VERSION` = `20` (no API keys or secrets required)
3. `public/_redirects` (`/* /index.html 200`) is copied automatically to `dist/_redirects` for SPA routing.
