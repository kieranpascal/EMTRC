export interface ServicePainPoint {
  title: string;
  costLabel: string;
  problem: string;
  solution: string;
}

export interface ServiceWorkflowStep {
  num: string;
  title: string;
  body: string;
}

export interface ServicePhoneTab {
  id: string;
  tabLabel: string;
  headerSub: string;
  title: string;
  subtitle: string;
  rows: readonly { label: string; value: string; highlight?: boolean }[];
  footnote: string;
}

export interface ServicePersona {
  tag: string;
  title: string;
  description: string;
}

export interface ServiceFaqGroup {
  groupTitle: string;
  questions: readonly { q: string; a: string }[];
}

export interface ServiceDetail {
  slug: string;
  shortTitle: string;
  category: 'Websites & foundations' | 'AI front desk' | 'Get found locally';
  menuDescription: string;
  priceTag: string;
  headlineLine1: string;
  headlineLine2: string;
  subheadline: string;
  heroImage: string;
  heroAlt: string;
  secondaryImage: string;
  secondaryAlt: string;
  pains: readonly ServicePainPoint[];
  steps: readonly ServiceWorkflowStep[];
  watchIntro: string;
  previewAppTitle: string;
  previewTabs: readonly ServicePhoneTab[];
  personas: readonly ServicePersona[];
  whyUsPoints: readonly string[];
  faqGroups: readonly ServiceFaqGroup[];
  closingHeadline: string;
  closingBody: string;
  closingCtaLabel: string;
  closingCtaTo: string;
  relatedSlugs: readonly string[];
}

export const SERVICE_DETAILS: readonly ServiceDetail[] = [
  {
    slug: 'websites',
    shortTitle: 'Managed Websites',
    category: 'Websites & foundations',
    menuDescription: 'Fast mobile-first sites built, hosted and updated monthly',
    priceTag: 'From £39/month · Free 48-hour demo first',
    headlineLine1: 'A site that wins local calls,',
    headlineLine2: 'not just exists.',
    subheadline:
      'Fast, mobile-first websites for London barbers, salons, trades, cleaners and cafés — built around upfront pricing, live opening hours and one-tap calling, hosted on Cloudflare’s global edge, and looked after every month.',
    heroImage: '/src/assets/images/emtrc_hero_london_highstreet_1795374294553.jpg',
    heroAlt: 'London Victorian high street shopfronts with independent barber and café',
    secondaryImage: '/src/assets/images/emtrc_editorial_desk_craft_1795374293989.jpg',
    secondaryAlt: 'Minimal walnut design studio desk with laptop and notebook',
    pains: [
      {
        title: 'No website, or an outdated one',
        costLabel: 'Costs you bookings',
        problem:
          'Neighbours check you on Google Maps before calling. A missing link or a broken 2016 site quietly hands the job to the next listing down.',
        solution: 'A sharp, live working demo sent to your phone within 2 working days',
      },
      {
        title: 'Painful on mobile phones',
        costLabel: 'Costs you callers',
        problem:
          'Over 80% of local London searches happen on a phone. Pinch-to-zoom menus and hidden numbers kill enquiries in five seconds.',
        solution: 'Mobile-first layout with 95+ speed target and sticky tap-to-call',
      },
      {
        title: 'Nobody left to update it',
        costLabel: 'Costs your evenings',
        problem:
          'The old freelance developer vanished, your prices are two years out of date, and you dread touching a bloated WordPress dashboard.',
        solution: 'Monthly edits included — email or WhatsApp us changes, live inside 24 hours',
      },
      {
        title: '£2,500 agencies that disappear',
        costLabel: 'Costs your cashflow',
        problem:
          'Traditional agencies invoice £2,500 up front, deliver slowly, and bill extra for every small tweak or SSL renewal.',
        solution: 'Clear monthly plans from £39/mo (or £595 one-off + £25/mo care)',
      },
    ],
    watchIntro:
      'Tap through the preview to see what happens from the moment a London customer finds you on Google Maps to the call landing on your mobile.',
    previewAppTitle: 'yourshop.co.uk · live',
    previewTabs: [
      {
        id: 'speed',
        tabLabel: 'Live Site',
        headerSub: 'CLOUDFLARE EDGE · LONDON',
        title: 'Loaded in 0.9 seconds',
        subtitle: 'Instant first paint on 4G across London',
        rows: [
          { label: 'Mobile Lighthouse score', value: '99 / 100', highlight: true },
          { label: 'Tap-to-call & WhatsApp', value: '1-tap ready' },
          { label: 'Live UK open status', value: 'Open until 19:00' },
          { label: 'SSL & daily backups', value: 'Auto-renewed' },
        ],
        footnote: 'Fast sites convert Maps searchers into real calls before they hit Back.',
      },
      {
        id: 'booking',
        tabLabel: 'Enquiries',
        headerSub: 'CONVERSION · 24/7',
        title: 'Direct bookings & quotes',
        subtitle: 'Wired to Fresha, Booksy, Treatwell or forms',
        rows: [
          { label: 'Skin Fade + Beard', value: 'Booked · 14:30', highlight: true },
          { label: 'Quote form · SW11', value: '2-bed end of tenancy' },
          { label: 'Spam blocked', value: 'Honeypot active' },
          { label: 'Cookie banners needed', value: 'Zero' },
        ],
        footnote: 'Every booking button routes directly to your own booking system or inbox.',
      },
      {
        id: 'edits',
        tabLabel: 'Edits',
        headerSub: 'MONTHLY CARE INCLUDED',
        title: 'Updated inside 24 hours',
        subtitle: 'Send changes by email or WhatsApp',
        rows: [
          { label: 'Price list update', value: 'Done in 3 hrs', highlight: true },
          { label: 'Bank holiday hours', value: 'Scheduled' },
          { label: '6 fresh gallery photos', value: 'Optimised & live' },
          { label: 'Extra invoice sent', value: '£0' },
        ],
        footnote: '15–60 minutes of edits included every month depending on your plan.',
      },
      {
        id: 'ownership',
        tabLabel: 'Ownership',
        headerSub: 'NO HOSTAGE DOMAINS',
        title: 'Registered in your name',
        subtitle: 'Zero agency lock-in, in writing',
        rows: [
          { label: 'Domain owner', value: 'Your business', highlight: true },
          { label: 'Auth code handover', value: 'Within 5 days' },
          { label: '30-day launch guarantee', value: 'Setup refunded' },
          { label: 'Post-year notice', value: '30 days rolling' },
        ],
        footnote: 'You stay because the site pays for itself — never because we locked the door.',
      },
    ],
    steps: [
      {
        num: '01',
        title: 'We build your working demo in 48 hours',
        body: 'Send us your business name, London borough and trade. We pull your public services, hours and booking links and build a real demo you can open on your phone before paying a penny.',
      },
      {
        num: '02',
        title: 'Domain, email & Google Maps wired cleanly',
        body: 'Once you approve tweaks, we register your .co.uk or .com domain in your name, connect your @yourbusiness mailbox, align Google Business Profile and launch on Cloudflare.',
      },
      {
        num: '03',
        title: 'Monthly care keeps it fast and current',
        body: 'Hosting, SSL, security, backups and routine monthly edits happen quietly in the background. You never touch a broken plugin or wrestle a drag-and-drop builder again.',
      },
    ],
    personas: [
      {
        tag: 'Starting out',
        title: 'First proper website',
        description:
          'Off Instagram-only and onto your own .co.uk domain with a sharp 1-page Starter (£39/mo) or 5-page Business (£69/mo) site.',
      },
      {
        tag: 'Trading up',
        title: 'Replacing a slow 2016 site',
        description:
          'Keep your domain and Google history, ditch the clunky layout. Every old URL is redirected cleanly so rankings survive the upgrade.',
      },
      {
        tag: 'Busy London shop',
        title: 'Zero time for admin',
        description:
          'Barbers, salons, cafés and trades who want one reliable team handling website edits, email and local SEO without chasing freelancers.',
      },
    ],
    whyUsPoints: [
      'Built specifically for London high-street buying habits: open-now status, clear prices, borough coverage and instant calling',
      'Zero bloated WordPress plugins — static Cloudflare edge hosting means sub-second loads and practically zero hack surface',
      'We write crisp plain-English copy from your existing services so you never stall on “website homework”',
      'Your domain is registered in your own business name from day one, never held hostage',
      'Four written guarantees: free demo first, 30-day setup refund, 90-day leads promise and 5-day domain handover',
    ],
    faqGroups: [
      {
        groupTitle: 'The essentials',
        questions: [
          {
            q: 'Is the 48-hour demo genuinely free?',
            a: 'Yes. You submit your business name, trade and London borough — no card details asked. Within 2 working days we send a private working link you can test on your phone. If you do not want it, we take it down and part as friends.',
          },
          {
            q: 'Do you write the words and structure the pages?',
            a: 'Yes. Most small business owners stall for months when an agency asks them to write five pages of copy. We draft every page in clear British plain English from your services, prices and Google listing, then tweak anything you want changed.',
          },
          {
            q: 'What if I already have a domain or old website?',
            a: 'We keep your existing domain and map 301 redirects from your old pages so you do not lose Google history or bookmarks. Zero downtime during the switchover.',
          },
        ],
      },
      {
        groupTitle: 'How it works day to day',
        questions: [
          {
            q: 'How do monthly edits work?',
            a: 'Email or WhatsApp us whatever changed — new haircut prices, seasonal café menu, winter hours or fresh job photos. Starter includes 15 minutes a month, Business 30 minutes, Growth 60 minutes. Routine changes go live inside 24 hours.',
          },
          {
            q: 'Can you link Fresha, Booksy, Treatwell or a quote calculator?',
            a: 'Yes. We wire directly to your booking link, WhatsApp chat, tap-to-call phone number or a validated postcode quote form — with zero commission taken by emtrc.',
          },
        ],
      },
      {
        groupTitle: 'Money & small print',
        questions: [
          {
            q: 'Monthly plan vs One-off build — which makes more sense?',
            a: 'Monthly plans (Starter £39/mo, Business £69/mo, Growth £129/mo) keep upfront cash in your business and bundle edits, domain and email. Prefer to pay up front? Our One-off build is £595 once + £25/month care plan (hosting, SSL, backups; edits £45/hr).',
          },
          {
            q: 'What happens if I leave after 12 months?',
            a: 'After your initial 12 months, your plan rolls month to month on 30 days’ notice. Your domain is already in your name and we release auth/transfer codes within 5 working days.',
          },
        ],
      },
    ],
    closingHeadline: 'See your London business online this week.',
    closingBody:
      'Tell us your shop name, trade and borough. We will build a working demo on our own time and send it to your phone within 2 working days.',
    closingCtaLabel: 'Get my free demo',
    closingCtaTo: '/free-demo',
    relatedSlugs: ['domains-email', 'local-seo', 'care-plan'],
  },
  {
    slug: 'domains-email',
    shortTitle: 'Domains & Business Email',
    category: 'Websites & foundations',
    menuDescription: 'Your .co.uk/.com in your name and proper @yourbusiness email',
    priceTag: 'Included on Business & Growth · Extra mailboxes £3/mo',
    headlineLine1: 'Proper business email,',
    headlineLine2: 'owned in your name.',
    subheadline:
      'Stop sending £1,200 quotes or booking confirmations from a personal Gmail or Hotmail address. We register your .co.uk or .com domain directly in your name and configure rock-solid @yourbusiness email that actually reaches customer inboxes.',
    heroImage: '/src/assets/images/emtrc_editorial_desk_craft_1795374293989.jpg',
    heroAlt: 'Studio walnut desk with matte laptop, espresso and graph notebook',
    secondaryImage: '/src/assets/images/emtrc_service_voip_office_1795375919862.jpg',
    secondaryAlt: 'London workshop counter with leather binder, phone and tea',
    pains: [
      {
        title: 'Quoting from personal Gmail',
        costLabel: 'Costs you trust',
        problem:
          'Homeowners and commercial clients notice when an invoice arrives from daveplumbing1984@hotmail.co.uk instead of quotes@blackheathheating.co.uk.',
        solution: 'Clean @yourbusiness mailboxes on your phone and laptop',
      },
      {
        title: 'Quotes landing in spam folders',
        costLabel: 'Costs you jobs',
        problem:
          'Misconfigured DNS records (missing SPF, DKIM and DMARC) cause Google and Outlook to silently dump your quotes into junk mail.',
        solution: 'Full SPF, DKIM and DMARC authentication verified before launch',
      },
      {
        title: 'Locked out of your own domain',
        costLabel: 'Costs you control',
        problem:
          'Many legacy directories and agencies register your domain in their own account and charge hefty release fees when you try to leave.',
        solution: 'Registered in your name with guaranteed 5-day transfer code handover',
      },
      {
        title: 'Messy email migrations',
        costLabel: 'Costs your weekend',
        problem:
          'Switching email providers wrongly breaks incoming mail for days or strands old customer threads in an old inbox.',
        solution: 'Zero-downtime setup and clean migration from £49 one-off',
      },
    ],
    watchIntro:
      'Every mailbox we configure is verified against modern Google and Microsoft deliverability rules before you send a single invoice.',
    previewAppTitle: 'mail.yourbusiness.co.uk',
    previewTabs: [
      {
        id: 'dns',
        tabLabel: 'Deliverability',
        headerSub: 'AUTHENTICATION · VERIFIED',
        title: 'Inbox delivery passed',
        subtitle: 'All three UK/global anti-spam records live',
        rows: [
          { label: 'SPF record', value: 'Pass · Verified', highlight: true },
          { label: 'DKIM 2048-bit key', value: 'Signed' },
          { label: 'DMARC policy', value: 'Active' },
          { label: 'SSL / TLS encryption', value: 'Enforced' },
        ],
        footnote: 'Your quotes, receipts and booking confirmations land in Primary, not Junk.',
      },
      {
        id: 'mailboxes',
        tabLabel: 'Mailboxes',
        headerSub: 'ZOHO · GOOGLE · M365',
        title: 'Flexible per-user plans',
        subtitle: 'Start with 1 included, scale as you hire',
        rows: [
          { label: '1st mailbox (Business plan)', value: 'Included', highlight: true },
          { label: 'Extra Zoho Lite mailbox', value: '£3 / user / mo' },
          { label: 'Google Workspace / M365', value: 'List + £2 / mo' },
          { label: 'iPhone & Android sync', value: 'Guided setup' },
        ],
        footnote: 'Works natively in Apple Mail, Outlook, Gmail app or clean webmail.',
      },
      {
        id: 'domain',
        tabLabel: 'Domain',
        headerSub: 'NOMINET .CO.UK & .COM',
        title: 'Always in your name',
        subtitle: 'Renewed automatically, zero hijack risk',
        rows: [
          { label: 'Registrant', value: 'Your business', highlight: true },
          { label: '.co.uk annual renewal', value: '£15/yr (or incl.)' },
          { label: '.com annual renewal', value: '£20/yr (or incl.)' },
          { label: 'IPS tag / EPP code', value: '≤ 5 working days' },
        ],
        footnote: 'Included free on Business and Growth plans — renewed on time every year.',
      },
      {
        id: 'migration',
        tabLabel: 'Migration',
        headerSub: 'ZERO DOWNTIME MOVE',
        title: 'Clean inbox transfer',
        subtitle: 'Move off Gmail, GoDaddy or 123-Reg cleanly',
        rows: [
          { label: 'Existing mail preserved', value: '100% synced', highlight: true },
          { label: 'Forwarding safety net', value: 'Configured' },
          { label: 'DNS propagation check', value: 'Monitored' },
          { label: 'One-off migration fee', value: 'From £49' },
        ],
        footnote: 'Never lose a client conversation during a domain or provider move.',
      },
    ],
    steps: [
      {
        num: '01',
        title: 'Choose or connect your domain',
        body: 'We check clean .co.uk and .com availability and register your domain directly in your business name — or connect the domain you already own without breaking existing email.',
      },
      {
        num: '02',
        title: 'Mailbox & DNS authentication configured',
        body: 'We set up hello@, bookings@ or yourname@yourbusiness on Zoho Mail, Google Workspace or Microsoft 365, and lock down SPF, DKIM and DMARC records.',
      },
      {
        num: '03',
        title: 'Connected to your phone & watched monthly',
        body: 'We walk you through adding the inbox to your iPhone, Android or laptop and monitor renewals so your domain and email never unexpectedly expire.',
      },
    ],
    personas: [
      {
        tag: 'Sole traders',
        title: 'Upgrading off @gmail.com',
        description:
          'One sharp mailbox included free on our Business plan (£69/mo) so every quote looks established.',
      },
      {
        tag: 'Growing teams',
        title: 'Adding staff inboxes',
        description:
          'Add extra standard mailboxes for £3/user/month or full Google Workspace / Microsoft 365 at list price + £2/month.',
      },
      {
        tag: 'Rescuing old setups',
        title: 'Untangling 123-Reg or GoDaddy',
        description:
          'We clean up messy DNS zones, move your domain cleanly, and fix deliverability issues from £49.',
      },
    ],
    whyUsPoints: [
      'Domain registered in your legal/trading name from day one — zero agency lock-in',
      'SPF, DKIM and DMARC configured properly so quotes stop vanishing into spam',
      'Choice of lean Zoho Mail (£3/mo extra) or full Google Workspace / Microsoft 365',
      'Renewals tracked automatically so you never suffer an expired-domain outage',
      'Clean migrations off legacy registrars without dropping incoming enquiries',
    ],
    faqGroups: [
      {
        groupTitle: 'The essentials',
        questions: [
          {
            q: 'Is my domain included in the Business plan?',
            a: 'Yes. One .co.uk or .com domain registration and annual renewal plus 1 professional @yourbusiness mailbox are included in our Business (£69/mo) and Growth (£129/mo) plans.',
          },
          {
            q: 'Can I keep using Google Workspace or Microsoft 365?',
            a: 'Absolutely. We set up and manage Google Workspace or Microsoft 365 at official list price plus £2/user/month for ongoing DNS and support — or plug directly into an existing account.',
          },
        ],
      },
      {
        groupTitle: 'How it works',
        questions: [
          {
            q: 'Will I lose old emails when switching?',
            a: 'No. Our email migration service (from £49 one-off) copies your existing folders over and sets forwarding rules so nothing gets missed during the cutover.',
          },
        ],
      },
      {
        groupTitle: 'Money & small print',
        questions: [
          {
            q: 'What if I only want a domain on Starter?',
            a: 'On Starter (£39/mo), domains are £15/year (.co.uk) or £20/year (.com), and a standard business mailbox is £3/month.',
          },
        ],
      },
    ],
    closingHeadline: 'Look like the pro you already are in every inbox.',
    closingBody:
      'Start with a free working website demo — we can sort your domain and @yourbusiness email at the same time when you go live.',
    closingCtaLabel: 'Get my free demo',
    closingCtaTo: '/free-demo',
    relatedSlugs: ['websites', 'local-seo', 'care-plan'],
  },
  {
    slug: 'local-seo',
    shortTitle: 'Local SEO & AI Search',
    category: 'Get found locally',
    menuDescription: 'Google Business Profile, Maps 3-Pack and AI search visibility',
    priceTag: 'Included on Business & Growth · +3 area pages on Growth',
    headlineLine1: 'Own your London borough',
    headlineLine2: 'on Maps and AI search.',
    subheadline:
      'A smart website buried on page four is a shop with the shutters down. We align your Google Business Profile, bake in LocalBusiness Schema.org data, and structure your borough pages so neighbours find you on Google Maps, Apple Maps and ChatGPT.',
    heroImage: '/src/assets/images/emtrc_blog_maps_phone_1795375920087.jpg',
    heroAlt: 'Smartphone beside ceramic flat white and London planning notebook on warm travertine',
    secondaryImage: '/src/assets/images/emtrc_hero_london_highstreet_1795374294553.jpg',
    secondaryAlt: 'Independent London high street shopfronts in morning sun',
    pains: [
      {
        title: 'Stuck below the Google 3-Pack',
        costLabel: 'Costs you 70% of clicks',
        problem:
          'The top three businesses on Google Maps capture the overwhelming majority of local taps and calls. Position seven might as well be invisible.',
        solution: 'Primary categories, services, hours and site structure aligned to Google’s local signals',
      },
      {
        title: 'Invisible in ChatGPT & AI answers',
        costLabel: 'Costs future demand',
        problem:
          'More Londoners now ask ChatGPT or Siri “best Gas Safe plumber in Greenwich”. Without structured Schema data and clear prices, AI skips you completely.',
        solution: 'Clean LocalBusiness JSON-LD, area pages and verifiable review signals',
      },
      {
        title: 'Mismatched hours and broken links',
        costLabel: 'Costs you walk-ins',
        problem:
          'Google listing says closed on Sunday while Instagram says open — confused customers call someone else.',
        solution: 'One consistent source of truth across website and Google Business Profile',
      },
      {
        title: '£600/month mystery SEO retainers',
        costLabel: 'Costs your budget',
        problem:
          'SEO agencies send 30-page jargon PDFs full of vanity keyword graphs without showing whether your phone actually rang.',
        solution: 'Honest local foundations built into Business & Growth, measured in real calls',
      },
    ],
    watchIntro:
      'See how clean local structure connects your website, Google Business Profile and neighbouring London postcodes.',
    previewAppTitle: 'London Maps & AI visibility',
    previewTabs: [
      {
        id: 'maps',
        tabLabel: 'Google Maps',
        headerSub: '3-PACK SIGNALS · ALIGNED',
        title: 'Local listing optimised',
        subtitle: 'Categories, services and booking link synced',
        rows: [
          { label: 'Primary & secondary cats', value: 'Verified', highlight: true },
          { label: 'Service menu & prices', value: 'Published' },
          { label: 'Tap-to-call consistency', value: '100% NAP match' },
          { label: 'Photo freshness plan', value: 'Active' },
        ],
        footnote: 'Consistent Name, Address, Phone and opening hours build fast local trust.',
      },
      {
        id: 'ai',
        tabLabel: 'AI Search',
        headerSub: 'CHATGPT · APPLE · GEMINI',
        title: 'Machine-readable entity',
        subtitle: 'Structured Schema.org JSON-LD baked in',
        rows: [
          { label: 'LocalBusiness subtype', value: 'Exact niche match', highlight: true },
          { label: 'Area served postcodes', value: 'Borough + adjacent' },
          { label: 'OpeningHoursSpecification', value: 'Valid JSON-LD' },
          { label: 'Plain-English price list', value: 'Crawlable HTML' },
        ],
        footnote: 'AI assistants cite businesses with clear services, areas and fresh reviews.',
      },
      {
        id: 'areas',
        tabLabel: 'Area Pages',
        headerSub: 'GROWTH PLAN · 3 BOROUGHS',
        title: 'Neighbouring postcodes',
        subtitle: 'Genuine local pages — never cloned spam',
        rows: [
          { label: 'Primary borough', value: 'Greenwich SE10', highlight: true },
          { label: 'Area page 1', value: 'Blackheath SE3' },
          { label: 'Area page 2', value: 'Lewisham SE13' },
          { label: 'Area page 3', value: 'Canary Wharf E14' },
        ],
        footnote: 'Each page covers real local services, response times and customer needs.',
      },
      {
        id: 'report',
        tabLabel: 'Tracking',
        headerSub: 'PLAIN ENGLISH · ZERO COOKIES',
        title: 'Calls, not vanity metrics',
        subtitle: 'Privacy-friendly visitor & call-click data',
        rows: [
          { label: 'Maps profile visits', value: '614 this month', highlight: true },
          { label: 'Tap-to-call clicks', value: '47 calls' },
          { label: 'Directions requests', value: '118 taps' },
          { label: 'Cookie banners needed', value: 'None' },
        ],
        footnote: 'No bloated dashboards — just what made your phone ring.',
      },
    ],
    steps: [
      {
        num: '01',
        title: 'Audit your Google listing & borough competitors',
        body: 'We check how you currently appear in Google Maps, fix wrong categories or duplicate listings, and see exactly why the top three competitors outrank you.',
      },
      {
        num: '02',
        title: 'Build local foundations into the website',
        body: 'Exact Schema.org LocalBusiness subtypes (BarberShop, BeautySalon, Plumber, CafeOrCoffeeShop), fast mobile loads, clean H1/meta structure and optional borough landing pages.',
      },
      {
        num: '03',
        title: 'Pair with steady reviews & real results tracking',
        body: 'Fresh Google reviews plus consistent local signals compound month over month — and we show you real clicks, calls and enquiries without cookie clutter.',
      },
    ],
    personas: [
      {
        tag: 'High-street shops',
        title: 'Barbers, salons & cafés',
        description:
          'Win “near me” mobile searches from commuters and local residents looking for open-now spots.',
      },
      {
        tag: 'Mobile trades',
        title: 'Plumbers, sparks & cleaners',
        description:
          'Capture jobs across 3–4 neighbouring London boroughs using dedicated local area pages on Growth.',
      },
      {
        tag: 'Rebuilds',
        title: 'Protecting existing rankings',
        description:
          'Already rank well on an old ugly site? We map every URL redirect one-to-one so rankings stay safe.',
      },
    ],
    whyUsPoints: [
      'Honest timelines: indexing takes days, local ranking climbs over 6–12 weeks — we never promise overnight magic',
      'Exact Schema.org LocalBusiness JSON-LD tuned for Google Maps and AI recommendations',
      'Zero cookie banners or creepy third-party trackers slowing down your site',
      'Dedicated London borough pages written cleanly (never spammy copy-paste town lists)',
      'Pairs seamlessly with Review Engine (£39/mo) to accelerate Maps 3-Pack movement',
    ],
    faqGroups: [
      {
        groupTitle: 'The essentials',
        questions: [
          {
            q: 'Will my site jump to #1 on Google overnight?',
            a: 'No — anyone promising instant #1 rankings is selling snake oil. What improves immediately is conversion (people who find you actually call), Google Business Profile completeness, and mobile speed. Organic local positions typically build over 6 to 16 weeks.',
          },
          {
            q: 'How does AI search (ChatGPT / Apple Intelligence) find local businesses?',
            a: 'AI engines read structured website data (Schema.org), clear service and price tables in plain HTML, Google/Apple Maps accuracy and recent customer reviews. We bake all four into every Business and Growth launch.',
          },
        ],
      },
      {
        groupTitle: 'How it works',
        questions: [
          {
            q: 'What are the 3 local area pages in Growth?',
            a: 'If you cover multiple parts of London — say Hackney, Islington and Walthamstow — we build three tailored area pages highlighting the jobs you do there, response times and local postcodes.',
          },
        ],
      },
      {
        groupTitle: 'Money & small print',
        questions: [
          {
            q: 'Can I add extra local area pages later?',
            a: 'Yes — extra tailored pages are £49 one-off at any time.',
          },
        ],
      },
    ],
    closingHeadline: 'Stop losing local London searches to slower competitors.',
    closingBody:
      'Grab our free Google Maps & AI Search Playbook PDF, or request a free 48-hour working website demo built around your borough.',
    closingCtaLabel: 'Get my free demo',
    closingCtaTo: '/free-demo',
    relatedSlugs: ['review-engine', 'websites', 'lead-catcher'],
  },
  {
    slug: 'review-engine',
    shortTitle: 'Review Engine',
    category: 'AI front desk',
    menuDescription: 'DMCC-compliant Google review requests & drafted replies',
    priceTag: '£39/month standalone · Included in Lead Catcher & Growth',
    headlineLine1: 'Five-star Google reviews,',
    headlineLine2: 'asked properly every week.',
    subheadline:
      'Happy London customers rarely think to leave a Google review unless you send them a one-tap link right after a great cut, clean or repair. Review Engine automates the polite ask and drafts thoughtful replies — 100% compliant with UK DMCC Act rules.',
    heroImage: '/src/assets/images/emtrc_service_reviews_shop_1795375920338.jpg',
    heroAlt: 'Happy customer leaving a warm sunlit independent East London salon counter',
    secondaryImage: '/src/assets/images/salon_warm_studio_1795370824298.jpg',
    secondaryAlt: 'Bright independent London hair and beauty studio',
    pains: [
      {
        title: 'Stuck on 12 old reviews',
        costLabel: 'Costs you Maps rank',
        problem:
          'Google Maps favours businesses with fresh, steady reviews. Even a 5.0 rating from 2023 loses to a competitor getting 5 new reviews a month.',
        solution: 'Steady stream of genuine weekly reviews via 1-tap SMS or email',
      },
      {
        title: 'Awkward asking face to face',
        costLabel: 'Costs you momentum',
        problem:
          'Owners hate sounding pushy at the till, so nobody asks — and only the occasional grumpy customer remembers to post online.',
        solution: 'Polite automated message sent 2 hours after a finished visit',
      },
      {
        title: 'Unanswered Google reviews',
        costLabel: 'Costs you credibility',
        problem:
          'Leaving customer praise (or a rare tough review) sitting unanswered signals an inactive business to both Google and AI search.',
        solution: 'Tailored replies drafted for your 1-click approval',
      },
      {
        title: 'Risky fake-review tricks',
        costLabel: 'Costs legal penalties',
        problem:
          'Under the UK DMCC Act, buying reviews or blocking unhappy customers from reviewing is illegal and gets Google profiles suspended.',
        solution: '100% honest, DMCC-compliant requests sent fairly to real customers',
      },
    ],
    watchIntro:
      'See the full loop: mark a customer complete in 5 seconds, a polite 1-tap SMS lands while the good impression is fresh, and your Google rating compounds.',
    previewAppTitle: 'Review Engine · Google Maps',
    previewTabs: [
      {
        id: 'sms',
        tabLabel: 'Polite Ask',
        headerSub: 'SENT 2 HRS AFTER VISIT',
        title: '1-tap Google link',
        subtitle: 'Short, friendly British tone — never spammy',
        rows: [
          { label: 'Recipient', value: 'Hannah · SW7', highlight: true },
          { label: 'Channel', value: 'SMS / WhatsApp' },
          { label: 'Taps to leave review', value: '1 tap straight to box' },
          { label: 'Follow-up cap', value: 'Max 1 gentle nudge' },
        ],
        footnote: '“Thanks for popping in today! If you have 20 seconds, a quick Google review helps our small London shop hugely.”',
      },
      {
        id: 'growth',
        tabLabel: 'Maps Lift',
        headerSub: '90-DAY MOMENTUM',
        title: '4.9 ★ (142 reviews)',
        subtitle: 'Consistent weekly velocity beats sporadic bursts',
        rows: [
          { label: 'New reviews this month', value: '+11 reviews', highlight: true },
          { label: 'Average star score', value: '4.9 ★' },
          { label: 'Maps 3-Pack position', value: 'Top 3 local' },
          { label: 'Reply turnaround', value: '< 24 hours' },
        ],
        footnote: 'Fresh reviews are the #1 trust signal for both neighbours and ChatGPT.',
      },
      {
        id: 'replies',
        tabLabel: 'AI Replies',
        headerSub: 'HUMAN APPROVED',
        title: 'Natural local replies',
        subtitle: 'Mentions the real service & borough naturally',
        rows: [
          { label: '5★ review · Marcus', value: 'Reply drafted', highlight: true },
          { label: 'Tone', value: 'Warm & human' },
          { label: 'Approval mode', value: '1-tap confirm' },
          { label: 'Negative review alert', value: 'Instant SMS to owner' },
        ],
        footnote: 'Never robotic “Thank you for your valued feedback” copy-paste replies.',
      },
      {
        id: 'dmcc',
        tabLabel: 'UK Law',
        headerSub: 'DMCC ACT COMPLIANT',
        title: 'Clean & suspension-safe',
        subtitle: 'Zero review gating, zero bought stars',
        rows: [
          { label: 'Review gating', value: 'Disabled (compliant)', highlight: true },
          { label: 'Opt-out handling', value: 'Automatic' },
          { label: 'Verified customers only', value: 'Yes' },
          { label: 'Google policy safe', value: '100%' },
        ],
        footnote: 'Protects your Google Business Profile for the long run.',
      },
    ],
    steps: [
      {
        num: '01',
        title: 'Trigger after a finished visit or job',
        body: 'Tap one button on your phone or connect your booking/invoice software so happy customers are queued automatically.',
      },
      {
        num: '02',
        title: 'Polite 1-tap review link sent',
        body: 'Customers get a brief, friendly text opening straight onto your Google review box — takes them 20 seconds on the bus home.',
      },
      {
        num: '03',
        title: 'Reply drafted & published fast',
        body: 'Every new review triggers an alert and a natural, non-robotic reply draft for you to approve in one tap.',
      },
    ],
    personas: [
      {
        tag: 'Under 40 reviews',
        title: 'Climbing into the Maps top 3',
        description:
          'Close the gap on older competitors with steady, genuine reviews from the customers you already serve.',
      },
      {
        tag: 'High-volume shops',
        title: 'Barbers, salons & cafés',
        description:
          'Turn even 10% of weekly regulars into public 5-star proof without asking awkwardly at the counter.',
      },
      {
        tag: 'Trades & cleaners',
        title: 'Winning high-value trust',
        description:
          'Homeowners letting a plumber or cleaner into their flat read the latest 5 reviews first.',
      },
    ],
    whyUsPoints: [
      '£39/month standalone — or bundled inside Lead Catcher (£79/mo) and Growth (£129/mo)',
      'Strict UK DMCC Act compliance: no illegal review gating or fake incentives',
      'Written in warm, natural British English — never pushy American marketing spam',
      'Direct one-tap Google review link removes login friction and triples completion rates',
      'Instant alert on any sub-4-star review so you can resolve issues calmly and professionally',
    ],
    faqGroups: [
      {
        groupTitle: 'The essentials',
        questions: [
          {
            q: 'Do I need an emtrc website to use Review Engine?',
            a: 'No — Review Engine works with any existing Google Business Profile for £39/month, or comes bundled inside Lead Catcher (£79/mo) and our Growth plan (£129/mo).',
          },
          {
            q: 'Is automated review asking allowed by Google and UK law?',
            a: 'Yes, provided you invite genuine customers neutrally without offering rewards for positive scores and without filtering out unhappy customers (review gating). Our templates follow UK DMCC Act rules strictly.',
          },
        ],
      },
      {
        groupTitle: 'How it works',
        questions: [
          {
            q: 'Can I approve replies before they go public?',
            a: 'Yes — by default we text or email you the drafted reply for one-tap approval, especially for anything under 5 stars.',
          },
        ],
      },
      {
        groupTitle: 'Money & small print',
        questions: [
          {
            q: 'Are SMS messages included?',
            a: 'Standard monthly fair-use volume for a local shop or trade is included with transparent pricing — no surprise per-click surcharges.',
          },
        ],
      },
    ],
    closingHeadline: 'Turn happy London regulars into your strongest advert.',
    closingBody:
      'Book a quick 15-minute call to see Review Engine in action, or bundle it straight into our Growth plan.',
    closingCtaLabel: 'Book a 15-minute call',
    closingCtaTo: '/contact',
    relatedSlugs: ['lead-catcher', 'local-seo', 'ai-receptionist'],
  },
  {
    slug: 'lead-catcher',
    shortTitle: 'Lead Catcher',
    category: 'AI front desk',
    menuDescription: '24/7 AI website chat, 8-sec missed-call SMS & reviews',
    priceTag: '£79/month bundle · Included in Growth (£129/mo)',
    headlineLine1: 'Catch every missed call',
    headlineLine2: 'in under ten seconds.',
    subheadline:
      'When you are mid-fade, up a ladder or with a client, callers do not leave voicemails — they call the next London firm on Google Maps. Lead Catcher texts missed callers back in 8 seconds, answers website questions 24/7, and automates Google reviews in one bundle.',
    heroImage: '/src/assets/images/emtrc_editorial_phone_studio_1795374293354.jpg',
    heroAlt: 'London studio counter with wireless business handset and brass lamp',
    secondaryImage: '/src/assets/images/trades_precision_heating_1795370825196.jpg',
    secondaryAlt: 'Clean copper heating manifold installation in a London home',
    pains: [
      {
        title: 'Callers hang up on voicemail',
        costLabel: 'Costs £150–£600/job',
        problem:
          '78% of local callers never leave a voicemail — they simply tap the next number on Google Maps within 30 seconds.',
        solution: 'Instant polite SMS in 8 seconds keeps the conversation with you',
      },
      {
        title: 'Late-night website browsers bounce',
        costLabel: 'Costs evening bookings',
        problem:
          'Customers check prices and ask “do you cover SW11?” at 10pm when you are off duty.',
        solution: '24/7 trained website chat answers prices, postcodes and captures their number',
      },
      {
        title: 'Juggling three separate subscriptions',
        costLabel: 'Costs time & fees',
        problem:
          'Paying separately for chat widgets, SMS tools and review software wastes £180+/month and none of them talk to each other.',
        solution: 'Chat + Missed-Call Text-Back + Review Engine together for £79/month',
      },
      {
        title: 'Robotic chatbots customers hate',
        costLabel: 'Costs your reputation',
        problem:
          'Generic bots waffle endlessly without knowing your prices, opening hours or London areas.',
        solution: 'Trained strictly on your real prices, services and plain-English tone',
      },
    ],
    watchIntro:
      'Watch a real missed call turn into a confirmed booking while you finish the job in front of you.',
    previewAppTitle: 'Lead Catcher · Live',
    previewTabs: [
      {
        id: 'missed',
        tabLabel: 'Missed Call',
        headerSub: 'AUTO-SMS · 8 SECONDS',
        title: 'Missed call saved at 14:22',
        subtitle: 'Caller stopped calling competitors',
        rows: [
          { label: 'Missed caller', value: '07700 900 418' },
          { label: 'Auto-SMS sent', value: '14:22 · 8 sec', highlight: true },
          { label: 'Caller reply', value: '“Boiler pressure drop E10”' },
          { label: 'Summary to you', value: 'WhatsApp + SMS' },
        ],
        footnote: '“Sorry we missed your call at Blackheath Heating — how can we help? Reply here and we’ll get straight back.”',
      },
      {
        id: 'chat',
        tabLabel: 'Site Chat',
        headerSub: 'WEBSITE · 22:40 PM',
        title: 'After-hours enquiry won',
        subtitle: 'Answered from your real price list',
        rows: [
          { label: 'Question', value: '“Do you do BIAB nails?”' },
          { label: 'AI answer', value: '“Yes — £42, 60 mins”', highlight: true },
          { label: 'Action taken', value: 'Booking link + mobile' },
          { label: 'Transparent AI label', value: 'Always disclosed' },
        ],
        footnote: 'Visitors get instant honest answers instead of bouncing to another salon.',
      },
      {
        id: 'reviews',
        tabLabel: 'Reviews',
        headerSub: 'INCLUDED IN BUNDLE',
        title: 'Review Engine included',
        subtitle: 'Worth £39/mo on its own',
        rows: [
          { label: 'Post-job SMS invites', value: 'Active', highlight: true },
          { label: 'AI reply drafts', value: 'Included' },
          { label: 'DMCC Act compliant', value: 'Verified' },
          { label: 'Standalone value', value: '£39/mo included' },
        ],
        footnote: 'Everything you need to catch leads and grow your Google rating.',
      },
      {
        id: 'roi',
        tabLabel: 'The Maths',
        headerSub: 'PAYBACK CHECK',
        title: '1 saved job pays the month',
        subtitle: 'Zero complex CRM needed',
        rows: [
          { label: 'Bundle price', value: '£79 / month', highlight: true },
          { label: 'Typical plumber/clean job', value: '£120 – £450' },
          { label: 'Saved leads per month', value: '4 – 12 typical' },
          { label: 'Or inside Growth plan', value: '£129/mo w/ site' },
        ],
        footnote: 'If it saves even one booking a month, it pays for itself several times over.',
      },
    ],
    steps: [
      {
        num: '01',
        title: 'Trained on your exact prices & borough rules',
        body: 'We load your services, opening hours, postcodes covered and booking link so the chat and SMS replies never guess or invent promises.',
      },
      {
        num: '02',
        title: 'Wired to your phone & website in 48 hours',
        body: 'Missed calls trigger an instant polite SMS; website visitors get a fast, lightweight assistant that clearly states it is your automated helper.',
      },
      {
        num: '03',
        title: 'Qualified enquiries arrive straight to you',
        body: 'Name, postcode, job details and preferred time land cleanly on your phone so you call back warm leads instead of empty missed-call logs.',
      },
    ],
    personas: [
      {
        tag: 'Hands-full trades',
        title: 'Plumbers, sparks & builders',
        description:
          'Never lose a £300 boiler call-out because you were under a sink or driving through South London traffic.',
      },
      {
        tag: 'Chair-based shops',
        title: 'Barbers & beauty salons',
        description:
          'Keep scissors moving while missed callers automatically receive your Fresha/Booksy link by text.',
      },
      {
        tag: 'Growing teams',
        title: 'Best value inside Growth',
        description:
          'Take Lead Catcher standalone at £79/mo, or pair it with a full 5-page website & email inside Growth (£129/mo).',
      },
    ],
    whyUsPoints: [
      'Three tools in one £79/month bundle: AI website chat + missed-call text-back + Review Engine',
      'Sub-10-second text-back stops callers dialling the next business on Google Maps',
      'Transparent disclosure — customers always know when an automated assistant is helping',
      'Zero bloated chat widgets that drag down mobile Lighthouse performance',
      'Upgrade seamlessly to full voice AI Receptionist (£149/mo) whenever call volume grows',
    ],
    faqGroups: [
      {
        groupTitle: 'The essentials',
        questions: [
          {
            q: 'Do I have to change my phone number for missed-call text-back?',
            a: 'No. We configure clean call-forwarding on no-answer/busy or pair with a dedicated tracking number so your customers dial the exact number they know.',
          },
          {
            q: 'Will the AI website chat ever make up prices?',
            a: 'No. We lock its knowledge strictly to the service list, prices and London boroughs you approve. Anything outside scope is routed politely to you for a callback.',
          },
        ],
      },
      {
        groupTitle: 'How it works',
        questions: [
          {
            q: 'Can I turn off auto-SMS when I am on holiday?',
            a: 'Yes — tell us your holiday dates and we switch the reply to a polite out-of-office message taking bookings for your return.',
          },
        ],
      },
      {
        groupTitle: 'Money & small print',
        questions: [
          {
            q: 'Is Lead Catcher included in the Growth website plan?',
            a: 'Yes. Growth (£129/month) includes the full Business 5-page website, domain, email, 3 local area pages AND the complete Lead Catcher bundle.',
          },
        ],
      },
    ],
    closingHeadline: 'Stop donating missed calls to the shop down the road.',
    closingBody:
      'Book a 15-minute live walkthrough of Lead Catcher, or see it paired with a free 48-hour demo website.',
    closingCtaLabel: 'Book a 15-minute call',
    closingCtaTo: '/contact',
    relatedSlugs: ['ai-receptionist', 'review-engine', 'business-phone'],
  },
  {
    slug: 'ai-receptionist',
    shortTitle: 'AI Receptionist',
    category: 'AI front desk',
    menuDescription: '24/7 British voice call answering, qualification & diary booking',
    priceTag: '£149/month + £199 setup',
    headlineLine1: 'Every phone call answered,',
    headlineLine2: '24/7 — even on a ladder.',
    subheadline:
      'A natural British-voiced AI receptionist that picks up within two rings, quotes your standard rates, checks the customer’s London postcode, and books appointments straight into your calendar — evenings, weekends and bank holidays included.',
    heroImage: '/src/assets/images/emtrc_service_voip_office_1795375919862.jpg',
    heroAlt: 'London workshop counter with VoIP handset, brass task lamp and leather diary',
    secondaryImage: '/src/assets/images/emtrc_editorial_phone_studio_1795374293354.jpg',
    secondaryAlt: 'Wireless studio handset beside brass desk lamp',
    pains: [
      {
        title: 'Paying £22,000+ for a receptionist',
        costLabel: 'Costs your margin',
        problem:
          'A full-time London receptionist costs £22k–£28k a year plus NI and still only covers 9-to-5 weekdays.',
        solution: '24/7 call answering and booking for £149/month',
      },
      {
        title: 'Emergency calls missed after 6pm',
        costLabel: 'Costs high-value work',
        problem:
          'Burst pipes, tripping fuse boards and weekend hair emergencies happen outside office hours — whoever answers first wins the job.',
        solution: 'Answered in 2 rings at 9pm or Sunday morning, with urgent calls escalated',
      },
      {
        title: 'Tyre-kickers outside your patch',
        costLabel: 'Costs your focus',
        problem:
          'Stopping work to answer a call only to discover the caller is 15 miles outside your London boroughs.',
        solution: 'Checks postcode and job type politely before booking a slot',
      },
      {
        title: 'Scrawled notes on van dashboards',
        costLabel: 'Costs forgotten leads',
        problem:
          'Trying to jot an address while driving leads to misdialled numbers and forgotten quotes.',
        solution: 'Instant written transcript, caller details and calendar invite sent to your phone',
      },
    ],
    watchIntro:
      'Listen to how a typical evening call is answered, qualified by London postcode, and booked straight into your diary.',
    previewAppTitle: 'AI Receptionist · 24/7 Voice',
    previewTabs: [
      {
        id: 'call',
        tabLabel: 'Live Call',
        headerSub: 'ANSWERED IN 2 RINGS · 19:45',
        title: 'Natural British voice',
        subtitle: 'Clear greeting + transparent AI disclosure',
        rows: [
          { label: 'Caller', value: 'Sarah · Greenwich SE10', highlight: true },
          { label: 'Request', value: 'Consumer unit tripping' },
          { label: 'Postcode check', value: 'SE10 · Covered ✓' },
          { label: 'Call-out rate quoted', value: '£95 first hour' },
        ],
        footnote: 'Polite, unhurried British voice trained on your exact trade vocabulary.',
      },
      {
        id: 'booking',
        tabLabel: 'Booked In',
        headerSub: 'CALENDAR SYNCED',
        title: 'Slot confirmed live',
        subtitle: 'Synced with Google Calendar, Outlook or Fresha',
        rows: [
          { label: 'Booked slot', value: 'Tomorrow · 09:00', highlight: true },
          { label: 'SMS confirmation', value: 'Sent to caller' },
          { label: 'Owner summary', value: 'Texted + emailed' },
          { label: 'Double-bookings', value: 'Prevented' },
        ],
        footnote: 'Checks your real availability so you never arrive at two places at once.',
      },
      {
        id: 'urgent',
        tabLabel: 'Escalation',
        headerSub: 'EMERGENCY ROUTING',
        title: 'True emergencies transferred',
        subtitle: 'Your rules for gas leaks, floods or VIPs',
        rows: [
          { label: 'Emergency keywords', value: 'Flood / leak / no power', highlight: true },
          { label: 'Action', value: 'Live transfer to mobile' },
          { label: 'Routine quotes', value: 'Qualified & logged' },
          { label: 'Cold sales callers', value: 'Politely filtered' },
        ],
        footnote: 'Only genuine emergencies interrupt dinner — cold callers never reach your mobile.',
      },
      {
        id: 'log',
        tabLabel: 'Transcripts',
        headerSub: 'FULL RECORD · UK GDPR',
        title: 'Every call documented',
        subtitle: 'Audio + written summary in seconds',
        rows: [
          { label: 'Call summary', value: '3 bullet lines', highlight: true },
          { label: 'Full transcript', value: 'Included' },
          { label: 'Monthly minutes', value: 'Fair-use covered' },
          { label: 'Setup & scripting', value: '£199 one-off' },
        ],
        footnote: 'Review every call in ten seconds between jobs.',
      },
    ],
    steps: [
      {
        num: '01',
        title: 'We script your exact call flow & rules',
        body: 'During your £199 onboarding, we map your services, standard rates, London postcodes covered, calendar rules and which emergency calls should ring straight through to you.',
      },
      {
        num: '02',
        title: 'Test-call your own receptionist first',
        body: 'You call your live AI receptionist yourself, throw awkward customer questions at it, and approve the tone before a single customer hears it.',
      },
      {
        num: '03',
        title: 'Switch on overflow or 24/7 answering',
        body: 'Use it only when you cannot pick up (overflow after 4 rings), strictly out of hours, or as your full-time 24/7 front desk.',
      },
    ],
    personas: [
      {
        tag: 'Emergency trades',
        title: 'Plumbers, heating & electrical',
        description:
          'One rescued £350 boiler or fuse-board job covers more than two months of the service.',
      },
      {
        tag: 'High-volume clinics & salons',
        title: 'Salons, aesthetics & dental',
        description:
          'Answer appointment questions and re-bookings while every stylist or clinician is with a client.',
      },
      {
        tag: 'Multi-van teams',
        title: 'Cleaners, builders & removals',
        description:
          'Capture full flat sizes, postcodes and dates cleanly without paying for a full-time office desk.',
      },
    ],
    whyUsPoints: [
      'Natural British accent — never stiff call-centre IVR “press 1 for sales” menus',
      'Always transparent with callers that an AI assistant is helping, aligned with UK guidance',
      'Can run strictly as overflow (when you miss a call), after-hours only, or full 24/7',
      'Filters out spam and cold sales calls automatically',
      'Pairs natively with Business Phone (Cloud VoIP) ahead of the 31 January 2027 PSTN switch-off',
    ],
    faqGroups: [
      {
        groupTitle: 'The essentials',
        questions: [
          {
            q: 'Can I still answer my own phone when I am free?',
            a: 'Yes! Most clients set the AI Receptionist as overflow (answers if you do not pick up within 3–4 rings) and out-of-hours (evenings and weekends). You stay completely in control.',
          },
          {
            q: 'Does it sound robotic?',
            a: 'No — we use modern low-latency British conversational voice models and let you test-call your custom receptionist before going live.',
          },
        ],
      },
      {
        groupTitle: 'How it works',
        questions: [
          {
            q: 'What if a caller insists on speaking to a human?',
            a: 'It politely takes their name, number and reason for calling, flags the message as priority callback, or transfers live if you have enabled live transfers during office hours.',
          },
        ],
      },
      {
        groupTitle: 'Money & small print',
        questions: [
          {
            q: 'What does the £199 one-off setup cover?',
            a: 'Custom British script writing, postcode & pricing rules, calendar integration, test calls with you, and call-forwarding setup on your existing number.',
          },
        ],
      },
    ],
    closingHeadline: 'Hear a live demo call tailored to your London trade.',
    closingBody:
      'Book a 15-minute intro call and we will walk you through a live AI Receptionist test call answering real local enquiries.',
    closingCtaLabel: 'Book a 15-minute call',
    closingCtaTo: '/contact',
    relatedSlugs: ['business-phone', 'lead-catcher', 'review-engine'],
  },
  {
    slug: 'business-phone',
    shortTitle: 'Business Phone (VoIP)',
    category: 'AI front desk',
    menuDescription: 'Keep your 020 number before copper lines switch off 31 Jan 2027',
    priceTag: 'Pre-register now · Ready ahead of 31 January 2027',
    headlineLine1: 'Keep your 020 number',
    headlineLine2: 'past 31 January 2027.',
    subheadline:
      'Old BT and Openreach copper landlines switch off across the UK on 31 January 2027. Move your existing 020 London number onto modern Cloud VoIP — answer it on your mobile, desk handset or laptop, and avoid expensive emergency line charges.',
    heroImage: '/src/assets/images/emtrc_service_voip_office_1795375919862.jpg',
    heroAlt: 'London shop desk with modern VoIP business handset by Victorian sash window',
    secondaryImage: '/src/assets/images/emtrc_editorial_guides_print_1795374293225.jpg',
    secondaryAlt: 'Printed UK PSTN switch-off survival guide playbooks on stone desk',
    pains: [
      {
        title: 'Copper lines close 31 Jan 2027',
        costLabel: 'Confirmed UK deadline',
        problem:
          'Openreach is retiring the legacy PSTN copper network. Legacy landlines stop working — and waiting until late 2026 risks porting queues.',
        solution: 'Port your existing 020 number cleanly onto cloud VoIP well ahead of deadline',
      },
      {
        title: 'Cancelling first loses your 020 number',
        costLabel: 'Costs years of signage',
        problem:
          'If you cancel your old BT line before porting completes, your established 020 number (printed on vans, flyers and Google) can be lost permanently.',
        solution: 'We handle the entire porting request while your old line stays active',
      },
      {
        title: 'Tied to a shop desk handset',
        costLabel: 'Costs missed calls',
        problem:
          'Traditional copper landlines only ring inside the shop — step out for supplies and callers ring out to nothing.',
        solution: 'One 020 number rings your desk phone, mobile app and team simultaneously',
      },
      {
        title: 'Card machines & burglar alarms',
        costLabel: 'Costs surprise outages',
        problem:
          'Old PDQ card terminals and monitored alarms plugged into wall phone sockets can fail silently when copper lines retire.',
        solution: 'Clear pre-switch audit checklist included in our free PSTN 2027 PDF',
      },
    ],
    watchIntro:
      'See how modern cloud telephony keeps your trusted 020 London number ringing wherever you work.',
    previewAppTitle: 'Cloud VoIP · 020 London',
    previewTabs: [
      {
        id: 'port',
        tabLabel: 'Keep 020',
        headerSub: 'ZERO-DROP NUMBER PORT',
        title: 'Your number moves cleanly',
        subtitle: 'Keep every van sign, flyer & Google listing',
        rows: [
          { label: 'Existing number', value: '020 7XXX XXXX', highlight: true },
          { label: 'Old line cancelled?', value: 'Never before port' },
          { label: 'Porting window', value: '7–14 working days' },
          { label: 'PSTN 31 Jan 2027 ready', value: '100% compliant' },
        ],
        footnote: 'We coordinate the port so callers never hear a dead tone.',
      },
      {
        id: 'ring',
        tabLabel: 'Rings Anywhere',
        headerSub: 'MOBILE · DESK · LAPTOP',
        title: 'Work from shop or van',
        subtitle: 'Caller ID always shows your 020 number',
        rows: [
          { label: 'Shop desk handset', value: 'Connected', highlight: true },
          { label: 'iPhone & Android app', value: 'Separate work ring' },
          { label: 'Evening quiet hours', value: 'Auto-routed at 18:00' },
          { label: 'Personal mobile number', value: 'Kept private' },
        ],
        footnote: 'Return calls from your mobile displaying your professional 020 London number.',
      },
      {
        id: 'ai-pair',
        tabLabel: 'AI Ready',
        headerSub: 'OPTIONAL BOLT-ONS',
        title: 'Wired for Lead Catcher',
        subtitle: 'Missed-call SMS or 24/7 AI answering',
        rows: [
          { label: 'Missed-call text-back', value: '1-click enable', highlight: true },
          { label: '24/7 AI Receptionist', value: 'Native overflow' },
          { label: 'Voicemail-to-email', value: 'Included' },
          { label: 'Call recordings', value: 'Optional UK GDPR' },
        ],
        footnote: 'Upgrade your phone line once and unlock modern call handling effortlessly.',
      },
      {
        id: 'check',
        tabLabel: 'Checklist',
        headerSub: 'PRE-SWITCH AUDIT',
        title: 'No shop-floor surprises',
        subtitle: 'Broadband, card machine & alarm checked',
        rows: [
          { label: 'Fibre / broadband line', value: 'Verified', highlight: true },
          { label: 'PDQ card terminal', value: 'Wi-Fi / 4G check' },
          { label: 'Shop burglar alarm', value: 'SIM backup check' },
          { label: 'Free PDF guide', value: 'Ready to download' },
        ],
        footnote: 'Download our free 2-page PSTN 2027 Survival Guide in Resources.',
      },
    ],
    steps: [
      {
        num: '01',
        title: 'Pre-switch audit of your line & equipment',
        body: 'We check your current bill, confirm your broadband stays intact, and flag any old card machine or alarm plugged into a copper socket.',
      },
      {
        num: '02',
        title: 'Clean 020 number port onto Cloud VoIP',
        body: 'We submit the porting paperwork while your existing line remains live — zero dead phone days and zero lost numbers.',
      },
      {
        num: '03',
        title: 'Ring on mobile & desk + optional AI backup',
        body: 'Set business hours, add staff handsets, and optionally connect missed-call text-back or our 24/7 AI Receptionist.',
      },
    ],
    personas: [
      {
        tag: 'Legacy landlines',
        title: 'Shops on old BT copper lines',
        description:
          'Beat the late-2026 rush ahead of the 31 January 2027 UK PSTN retirement date.',
      },
      {
        tag: 'Mobile-only trades',
        title: 'Wanting a local 020 number',
        description:
          'Add a trusted London 020 number that rings straight to your mobile without carrying two phones.',
      },
      {
        tag: 'Multi-person teams',
        title: 'Sharing one front-desk number',
        description:
          'Ring two or three staff phones at once and stop passing a single cordless handset around the shop.',
      },
    ],
    whyUsPoints: [
      'Built specifically for the confirmed 31 January 2027 UK PSTN copper switch-off',
      'Keep your established 020 number or pick a brand-new London 020 number',
      'Separates business calls from personal mobile calls with proper opening-hours routing',
      'Plugs directly into Lead Catcher missed-call SMS and 24/7 AI Receptionist',
      'Includes our plain-English UK PSTN Switch-Off PDF checklist free',
    ],
    faqGroups: [
      {
        groupTitle: 'The essentials',
        questions: [
          {
            q: 'Is 31 January 2027 really the final UK copper switch-off date?',
            a: 'Yes — Openreach and UK telecoms providers have confirmed 31 January 2027 as the retirement date for legacy PSTN copper voice lines. Moving earlier avoids porting delays and costly interim emergency tariffs.',
          },
          {
            q: 'Should I cancel my BT landline first?',
            a: 'Never cancel first! Cancelling before a port completes can release your 020 number back into the pool. Always let the new VoIP provider port the active number first.',
          },
        ],
      },
      {
        groupTitle: 'How it works',
        questions: [
          {
            q: 'Do I need special hardware?',
            a: 'No — you can answer straight on your iPhone, Android or laptop app, or plug a sleek VoIP desk handset into your broadband router.',
          },
        ],
      },
      {
        groupTitle: 'Money & small print',
        questions: [
          {
            q: 'How do I pre-register for emtrc Business Phone?',
            a: 'Book a quick 15-minute call or download our free PSTN 2027 PDF guide — we will put you on priority onboarding and check your current bill free.',
          },
        ],
      },
    ],
    closingHeadline: 'Get ahead of the 31 January 2027 switch-off calmly.',
    closingBody:
      'Download our free 2-page UK PSTN Switch-Off Guide PDF or book a 15-minute call to plan your 020 number move.',
    closingCtaLabel: 'Download free PSTN 2027 PDF',
    closingCtaTo: '/resources#guide-pstn-2027',
    relatedSlugs: ['ai-receptionist', 'lead-catcher', 'websites'],
  },
  {
    slug: 'care-plan',
    shortTitle: 'Monthly Care & Reports',
    category: 'Get found locally',
    menuDescription: 'Cloudflare hosting, SSL, backups, fast edits & monthly call reports',
    priceTag: 'Included on all monthly plans · £25/mo with One-off build',
    headlineLine1: 'Your website stays fast,',
    headlineLine2: 'updated and watched.',
    subheadline:
      'Most small-business websites slowly rot after launch day: expired SSL certificates, broken forms, old prices and vanished freelancers. Our monthly care keeps every link, backup, edit and results summary handled like clockwork.',
    heroImage: '/src/assets/images/emtrc_editorial_guides_print_1795374293225.jpg',
    heroAlt: 'Printed minimalist linen playbooks beside spectacles and espresso',
    secondaryImage: '/src/assets/images/emtrc_editorial_desk_craft_1795374293989.jpg',
    secondaryAlt: 'Walnut studio desk with laptop and architectural grid notebook',
    pains: [
      {
        title: '“Not Secure” browser warnings',
        costLabel: 'Costs instant trust',
        problem:
          'One forgotten SSL renewal puts a bright red warning across your website and scares off every customer.',
        solution: 'Automatic SSL monitoring and Cloudflare global security included',
      },
      {
        title: 'Out-of-date prices & hours',
        costLabel: 'Costs awkward conversations',
        problem:
          'Customers walk in quoting a 2024 price list or turn up on a bank holiday because nobody had time to update the site.',
        solution: 'Included monthly edit time — just send a quick message',
      },
      {
        title: 'Zero idea if the site works',
        costLabel: 'Costs confidence',
        problem:
          'You pay for hosting every year with no clue whether 5 people or 500 people called from your website.',
        solution: 'Privacy-friendly visitor & tap-to-call tracking (and monthly PDF on Growth)',
      },
      {
        title: 'Baffling technical bills',
        costLabel: 'Costs surprise fees',
        problem:
          'Separate invoices for domain, hosting, SSL, email and hourly ad-hoc fixes add up silently.',
        solution: 'One predictable monthly invoice covering the entire technical stack',
      },
    ],
    watchIntro:
      'See what runs quietly behind the scenes every month so you never think about servers, certificates or backups.',
    previewAppTitle: 'emtrc Care · Monthly Watch',
    previewTabs: [
      {
        id: 'health',
        tabLabel: 'Health',
        headerSub: 'AUTOMATED WATCH · 24/7',
        title: '100% uptime & green speed',
        subtitle: 'Cloudflare global edge network',
        rows: [
          { label: '30-day uptime', value: '100.0%', highlight: true },
          { label: 'SSL certificate', value: 'Valid · Auto-renew' },
          { label: 'Off-site backups', value: 'Daily verified' },
          { label: 'Broken link check', value: '0 errors' },
        ],
        footnote: 'Static edge hosting eliminates 99% of traditional WordPress crashes and hacks.',
      },
      {
        id: 'edits',
        tabLabel: 'Fast Edits',
        headerSub: 'DONE FOR YOU',
        title: 'No CMS wrestling',
        subtitle: 'Text or email changes anytime',
        rows: [
          { label: 'Starter allowance', value: '15 mins / month' },
          { label: 'Business allowance', value: '30 mins / month', highlight: true },
          { label: 'Growth allowance', value: '60 mins / month' },
          { label: 'Typical turnaround', value: 'Under 24 hours' },
        ],
        footnote: 'Price changes, fresh job photos, new team members or seasonal offers.',
      },
      {
        id: 'report',
        tabLabel: 'Results PDF',
        headerSub: '1ST OF EVERY MONTH',
        title: 'Plain-English summary',
        subtitle: 'Calls, clicks & top pages at a glance',
        rows: [
          { label: 'Website visitors', value: '842 (+24%)', highlight: true },
          { label: 'Tap-to-call clicks', value: '47 calls' },
          { label: 'Form & booking leads', value: '29 enquiries' },
          { label: 'Cookie banners needed', value: 'Zero' },
        ],
        footnote: 'Written in normal English — no 40-tab Google Analytics maze.',
      },
      {
        id: 'oneoff',
        tabLabel: 'One-Off Care',
        headerSub: 'FOR £595 ONE-OFF BUILDS',
        title: '£25/month Care Plan',
        subtitle: 'Light ongoing protection for one-off owners',
        rows: [
          { label: 'Hosting, SSL & backups', value: 'Included', highlight: true },
          { label: 'Security & uptime watch', value: 'Included' },
          { label: 'Ad-hoc edits rate', value: '£45 / hour' },
          { label: 'Minimum notice', value: '30 days' },
        ],
        footnote: 'Ideal if you prefer to pay £595 up front and keep monthly costs minimal.',
      },
    ],
    steps: [
      {
        num: '01',
        title: 'Continuous edge hosting & security watch',
        body: 'Your site runs on Cloudflare’s edge with automatic SSL, zero-cookie analytics and daily versioned backups.',
      },
      {
        num: '02',
        title: 'Message us whenever business details change',
        body: 'Send a quick email or WhatsApp with updated prices, new photos or bank-holiday hours — we format, compress and publish them cleanly.',
      },
      {
        num: '03',
        title: 'Review plain-English results each month',
        body: 'See real local visitor numbers, tap-to-call taps and enquiry counts so you always know your website is pulling its weight.',
      },
    ],
    personas: [
      {
        tag: 'Monthly plan clients',
        title: 'Bundled automatically',
        description:
          'Every Starter (£39), Business (£69) and Growth (£129) plan already includes full hosting, security and monthly edit minutes.',
      },
      {
        tag: 'One-off build owners',
        title: '£25/month peace of mind',
        description:
          'Keep your £595 one-off build fast, secure and backed up every day without touching technical dashboards.',
      },
      {
        tag: 'Seasonal shops',
        title: 'Menus, offers & hours',
        description:
          'Cafés, salons and trades whose prices, menus or offers change throughout the year.',
      },
    ],
    whyUsPoints: [
      'Included automatically in all monthly plans — £25/month standalone for one-off builds',
      'Most routine edits go live inside 24 hours without raising a ticket in a clunky portal',
      'Zero cookies, zero third-party tracking bloat, full UK GDPR simplicity',
      'Cloudflare edge delivery keeps mobile load times crisp on London 4G',
      '90-day Leads or Free Month guarantee backs our ongoing accountability',
    ],
    faqGroups: [
      {
        groupTitle: 'The essentials',
        questions: [
          {
            q: 'What counts as a monthly edit?',
            a: 'Updating prices, swapping photos, changing opening hours, adding a testimonial, updating a booking link or announcing a seasonal offer. Bigger new pages are £49 one-off.',
          },
          {
            q: 'Do unused edit minutes roll over?',
            a: 'Monthly edit allowances cover routine updates within each month and do not roll over, keeping turnaround fast for every client.',
          },
        ],
      },
      {
        groupTitle: 'Money & small print',
        questions: [
          {
            q: 'How is ad-hoc work billed on the £25/month Care Plan?',
            a: 'If you took our £595 one-off build + £25/month Care Plan, ad-hoc edits are billed transparently at £45/hour in 15-minute increments — always quoted before we start.',
          },
        ],
      },
    ],
    closingHeadline: 'Never chase a vanished web developer again.',
    closingBody:
      'Compare our Starter, Business, Growth and One-off plans side by side, or request your free 48-hour demo.',
    closingCtaLabel: 'Compare all plans',
    closingCtaTo: '/pricing',
    relatedSlugs: ['websites', 'domains-email', 'local-seo'],
  },
];

export function getServiceBySlug(slug: string | undefined): ServiceDetail | undefined {
  if (!slug) return undefined;
  return SERVICE_DETAILS.find((s) => s.slug === slug);
}
