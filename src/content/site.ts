export interface NavLinkItem {
  label: string;
  description: string;
  to: string;
  external?: boolean;
}

export interface MegaMenuColumn {
  heading: string;
  items: NavLinkItem[];
}

export interface PdfGuideItem {
  id: string;
  title: string;
  shortTitle: string;
  pages: string;
  readTime: string;
  category: string;
  summary: string;
  highlights: string[];
  pdfUrl: string;
  fileName: string;
  coverImage: string;
  coverAlt: string;
}

export interface PlanTier {
  id: 'starter' | 'business' | 'growth';
  name: string;
  badge?: string;
  summary: string;
  setupFee: number;
  monthlyPrice: number;
  bestFor: string;
  features: string[];
  ctaLabel: string;
  ctaTo: string;
}

export interface ShowcaseSlide {
  id: string;
  kicker: string;
  title: string;
  description: string;
  statValue: string;
  statLabel: string;
  linkLabel: string;
  linkTo: string;
  image: string;
  imageAlt: string;
}

export interface DemoShowcaseItem {
  id: string;
  presetId: string;
  businessName: string;
  niche: string;
  borough: string;
  styleLabel: string;
  outcome: string;
  image: string;
  imageAlt: string;
}

export const SITE = {
  brand: {
    name: 'emtrc',
    tagline: 'Your business, online this week.',
    siteUrl: 'https://emtrc.com',
    email: 'hello@emtrc.com',
    phoneDisplay: '020 7946 0900',
    phoneHref: 'tel:02079460900',
    calendlyUrl: 'https://calendly.com/kieranpascal/emtrc-introduction',
    serviceArea: 'All 32 London boroughs and the City of London',
    legalLine:
      'emtrc is a trading name of World Finance Global Limited, registered in England and Wales.',
    companyNumber: '[Company number — update before launch]',
    registeredOffice: '[Registered office address — update before launch]',
    socials: [
      { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/emtrc.london' },
      { id: 'x', label: 'X (Twitter)', href: 'https://x.com/emtrclondon' },
      { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/emtrc' },
      { id: 'youtube', label: 'YouTube', href: 'https://youtube.com/@emtrclondon' },
      { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/442079460900' },
    ] as const,
  },

  flags: {
    /** Set true when VAT registered to append "ex VAT" across pricing tables. */
    showExVat: false,
    /** Set false once your solicitor has signed off /privacy and /terms. */
    showLegalDraftBanner: true,
  },

  endpoints: {
    /** Set to a Cloudflare Pages Function or Tally URL when ready. Empty = validated dry-run success. */
    freeDemoEndpoint: '',
    /** Brevo / Cloudflare Pages Function endpoint for fortnightly newsletter signups. */
    newsletterEndpoint: '',
    /** Brevo / Cloudflare Pages Function endpoint for PDF guide email captures. */
    pdfDownloadEndpoint: '',
  },

  announcement: {
    label: 'PSTN 2027',
    text: 'Old BT copper phone lines switch off on 31 January 2027 — read our plain-English survival guide.',
    linkLabel: 'Get the free PDF',
    to: '/blog/uk-pstn-switch-off-31-january-2027-london-guide',
  },

  tickerItems: [
    {
      badge: 'PSTN 2027',
      text: 'Old BT copper phone lines switch off on 31 January 2027 — keep your 020 number.',
      linkLabel: 'Read the guide',
      to: '/blog/uk-pstn-switch-off-31-january-2027-london-guide',
    },
    {
      badge: 'FREE DEMO',
      text: 'See a real working website for your London business in 48 hours before paying a penny.',
      linkLabel: 'Request yours',
      to: '/free-demo',
    },
    {
      badge: 'ANNUAL',
      text: 'Prepay annually on Starter, Business or Growth and get 2 full months free.',
      linkLabel: 'See pricing',
      to: '/pricing',
    },
    {
      badge: 'FREE PDF',
      text: '14 practical fixes turning Google Maps searchers into real phone calls.',
      linkLabel: 'Download free',
      to: '/resources#guides',
    },
  ] as const,

  megaMenu: {
    services: [
      {
        heading: 'Websites & foundations',
        items: [
          {
            label: 'Managed Websites',
            description: 'Fast mobile-first sites built, hosted and updated monthly',
            to: '/services/websites',
          },
          {
            label: 'Domains & Business Email',
            description: 'Your name on the domain, proper @yourbusiness inbox',
            to: '/services/domains-email',
          },
          {
            label: 'Monthly Care & Edits',
            description: 'Text or email price changes, photos and hours — done in 24h',
            to: '/services/care-plan',
          },
          {
            label: 'The emtrc App',
            description: 'Manage missed calls, reviews and 24-hour edits from your pocket',
            to: '/app',
          },
          {
            label: 'Live London Demos (15)',
            description: 'Click through working demos across five London trades',
            to: '/work',
          },
        ],
      },
      {
        heading: 'AI front desk',
        items: [
          {
            label: 'Lead Catcher',
            description: '24/7 AI chat, 8-second missed-call text-back & reviews',
            to: '/services/lead-catcher',
          },
          {
            label: 'AI Receptionist',
            description: 'Every call answered 24/7 in a natural British voice',
            to: '/services/ai-receptionist',
          },
          {
            label: 'Review Engine',
            description: 'Polite DMCC-compliant Google review requests & replies',
            to: '/services/review-engine',
          },
          {
            label: 'Business Phone (VoIP)',
            description: 'Keep your 020 number ahead of the 31 Jan 2027 switch-off',
            to: '/services/business-phone',
          },
        ],
      },
      {
        heading: 'Get found locally',
        items: [
          {
            label: 'Local SEO & AI Search',
            description: 'Google Maps top-3 profile alignment + Schema for ChatGPT',
            to: '/services/local-seo',
          },
          {
            label: 'How it works',
            description: 'From free 48-hour demo to live domain in one week',
            to: '/how-it-works',
          },
          {
            label: 'One-off builds',
            description: 'Prefer to pay once? £595 build + £25/month care plan',
            to: '/pricing#one-off',
          },
          {
            label: 'All 8 services',
            description: 'Compare everything we handle under one London roof',
            to: '/services',
          },
        ],
      },
    ] as MegaMenuColumn[],
    servicesSpotlights: [
      {
        title: 'Free demo built first',
        description: 'See a working site for your London business before you spend a penny.',
        cta: 'Request your demo',
        to: '/free-demo',
      },
      {
        title: 'Free PDF playbooks',
        description: 'Website checklist, Jan 2027 phone guide and Google Maps playbook.',
        cta: 'Download free guides',
        to: '/resources#guides',
      },
    ],
    resources: [
      {
        heading: 'Learn & prove',
        items: [
          {
            label: 'London Case Studies',
            description: 'Before/after transformations across Hackney, Greenwich, SW7 & SE15',
            to: '/case-studies',
          },
          {
            label: 'Owner Training Centre',
            description: 'Interactive checklists for Google Maps, phone photos & PSTN 2027',
            to: '/training',
          },
          {
            label: 'Signals — Field Journal',
            description: 'Searchable plain-English London guides on websites, Maps, AI & UK phones',
            to: '/blog',
          },
          {
            label: 'Straight Answers (FAQ Hub)',
            description: '24 clear answers on demos, contracts, domains & AI tools',
            to: '/faq',
          },
        ],
      },
      {
        heading: 'Free PDF guides',
        items: [
          {
            label: 'London Website Checklist (PDF)',
            description: '14 things that turn Maps searches into phone calls',
            to: '/resources#guide-website-checklist',
          },
          {
            label: 'UK PSTN Switch-Off Guide (PDF)',
            description: 'What happens to copper lines on 31 January 2027',
            to: '/resources#guide-pstn-2027',
          },
          {
            label: 'Google Maps & AI Search Playbook',
            description: 'Win top-3 Maps spots and ChatGPT recommendations',
            to: '/resources#guide-maps-ai',
          },
          {
            label: 'All Resources & Downloads',
            description: 'Search across PDFs, guides, training and FAQs',
            to: '/resources',
          },
        ],
      },
    ] as MegaMenuColumn[],
  },

  hero: {
    kicker: 'London local businesses · Built, hosted & looked after',
    headlineLine1: 'Run the business.',
    headlineLine2: 'We run the online bit.',
    subheadline:
      'Websites, domains, business email and AI call-handling for London barbers, salons, trades, cleaners and cafés. One monthly price — and we build you a working demo before you pay a penny.',
    primaryCta: 'Get my free demo',
    secondaryCta: 'Plans from £39/month',
    footnotePrefix: 'Prefer to talk first?',
    footnoteLinkLabel: 'Book a free 15-minute call',
    backgroundPhoto: '/src/assets/images/emtrc_hero_london_highstreet_1795374294553.jpg',
    backgroundPhotoAlt:
      'Independent London Victorian high street shopfronts with a barber shop and neighbourhood café in golden morning sunlight',
  },

  heroPhoneScreens: [
    {
      id: 'demo',
      tabLabel: 'Free Demo',
      headerSub: 'LIVE PREVIEW · HACKNEY E8',
      title: 'Kingsland Blade & Fade',
      subtitle: 'Built in 48 hours · Ready to go live',
      rows: [
        { label: 'Mobile speed score', value: '99 / 100', highlight: true },
        { label: 'Google Maps link-up', value: 'Synced' },
        { label: 'Tap-to-call & Fresha', value: 'Active' },
        { label: 'Domain ownership', value: 'In your name' },
      ],
      footerNote: 'You see the real website on your phone before paying anything.',
    },
    {
      id: 'missed-call',
      tabLabel: 'Missed-Call Text',
      headerSub: 'LEAD CATCHER · INSTANT SMS',
      title: 'Missed call at 14:22',
      subtitle: 'Caller texted automatically in 8 seconds',
      rows: [
        { label: 'Caller', value: '07700 900 418' },
        { label: 'Auto-reply sent', value: '14:22 · 8 sec', highlight: true },
        { label: 'Customer reply', value: '“Need boiler check E10”' },
        { label: 'Slot booked', value: 'Thu 09:30' },
      ],
      footerNote: 'Never lose a job because your hands were full or you were with a client.',
    },
    {
      id: 'reviews',
      tabLabel: 'Review Engine',
      headerSub: 'REPUTATION · GOOGLE MAPS',
      title: 'This month on Google',
      subtitle: 'Polite requests + replies drafted for approval',
      rows: [
        { label: 'New 5-star reviews', value: '+11 this month', highlight: true },
        { label: 'Average rating', value: '4.9 ★ (142)' },
        { label: 'Replies published', value: '11 of 11' },
        { label: 'DMCC Act compliant', value: 'Verified' },
      ],
      footerNote: 'Fresh reviews move you up Google Maps and get AI search recommending you.',
    },
    {
      id: 'report',
      tabLabel: 'Monthly Report',
      headerSub: 'PLAIN ENGLISH · 1ST OF MONTH',
      title: 'March summary',
      subtitle: 'Sent straight to your inbox',
      rows: [
        { label: 'Website visitors', value: '842 (+24%)' },
        { label: 'Tap-to-call clicks', value: '47 calls', highlight: true },
        { label: 'Booking & form leads', value: '29 enquiries' },
        { label: 'Uptime & SSL check', value: '100% healthy' },
      ],
      footerNote: 'No baffling analytics dashboards — just what rang your phone.',
    },
  ],

  marqueeItems: [
    {
      text: 'Working demo in 2 working days',
      image: '/src/assets/images/barber_shop_interior_1795370825070.jpg',
      alt: 'Independent London barber shop interior',
    },
    {
      text: '24/7 missed-call text-back',
      image: '/src/assets/images/trades_precision_heating_1795370825196.jpg',
      alt: 'Precision copper plumbing manifold in a London home',
    },
    {
      text: 'Domain registered in your own name',
      image: '/src/assets/images/salon_warm_studio_1795370824298.jpg',
      alt: 'Warm sunlit London hair and beauty salon',
    },
    {
      text: 'Menus, prices and live opening hours',
      image: '/src/assets/images/cafe_brunch_pastry_1795373181666.jpg',
      alt: 'London neighbourhood café sourdough brunch and almond croissant',
    },
    {
      text: 'Fixed quote forms built in',
      image: '/src/assets/images/cleaner_kitchen_sparkle_1795373182615.jpg',
      alt: 'Spotless modern London flat kitchen',
    },
  ],

  problemStrip: {
    eyebrow: 'The London high street reality',
    headline: '1 in 3 London local businesses still have no website — or one that loses callers.',
    body: 'When a neighbour searches on Google Maps, they decide in ten seconds: are you open, what do you charge, and can they tap to call? Traditional agencies quote £2,500 and vanish. DIY builders eat your Sunday nights. We handle the whole lot for less than the price of a flat white a day.',
    stats: [
      { value: '1 in 3', label: 'London local listings without a working website' },
      { value: '48 hrs', label: 'To see a free working demo built for your business' },
      { value: '£2.27', label: 'A day on our Business plan — domain & email included' },
      { value: '31 Jan 2027', label: 'UK copper phone switch-off deadline (PSTN retirement)' },
    ],
  },

  showcaseDeck: {
    kicker: 'Everything handled in one place',
    headlineLine1: 'Your digital front office,',
    headlineLine2: 'without hiring an agency.',
    subheadline:
      'Start with a fast website that actually brings in calls. Add review requests, missed-call text-back, AI answering and cloud phones only when your business is ready.',
    slides: [
      {
        id: 'websites',
        kicker: '01 · Websites, hosting & email',
        title: 'Fast, mobile-first sites built to win local calls.',
        description:
          'Clear prices, live UK opening hours, tap-to-call buttons, Google Maps link-up and real photography. Hosted on Cloudflare’s global edge with SSL, daily backups and monthly edits done for you.',
        statValue: '95+',
        statLabel: 'Mobile Lighthouse target on every single launch',
        linkLabel: 'Explore Managed Websites',
        linkTo: '/services/websites',
        image: '/src/assets/images/emtrc_mobile_maps_search_1795424180037.jpg',
        imageAlt: 'London commuter on a sunlit high street holding a smartphone with a local business map listing and tap-to-call button',
      },
      {
        id: 'lead-catcher',
        kicker: '02 · Lead Catcher & Review Engine',
        title: 'Catch every missed call and build a 5-star Google profile.',
        description:
          'When you cannot answer the phone, callers receive a polite text within seconds. After every job or appointment, satisfied customers get a simple link to leave a Google review — lifting you into the Maps top three.',
        statValue: '8 sec',
        statLabel: 'Average speed of automatic missed-call text-back',
        linkLabel: 'Explore Lead Catcher',
        linkTo: '/services/lead-catcher',
        image: '/src/assets/images/emtrc_editorial_phone_studio_1795374293354.jpg',
        imageAlt: 'London studio reception desk with matte black wireless business phone and brass lamp',
      },
      {
        id: 'pstn',
        kicker: '03 · Cloud Business Phone & AI Receptionist',
        title: 'Ready before old BT copper lines switch off.',
        description:
          'On 31 January 2027, legacy UK copper landlines retire. Keep your existing 020 number, route calls to your mobile or desk handset, and optionally switch on a 24/7 AI receptionist that books jobs while you work.',
        statValue: '24/7',
        statLabel: 'Calls answered and logged — evenings and bank holidays included',
        linkLabel: 'Explore Business Phone (VoIP)',
        linkTo: '/services/business-phone',
        image: '/src/assets/images/emtrc_service_voip_office_1795375919862.jpg',
        imageAlt: 'London shop counter with modern VoIP business handset beside Victorian sash window',
      },
      {
        id: 'guides',
        kicker: '04 · Plain-English London playbooks',
        title: 'Practical guides you can act on this afternoon.',
        description:
          'No 40-page waffle. Download our London Website Checklist, UK PSTN Switch-Off Survival Guide and Google Maps & AI Search Playbook free — written specifically for high-street owners and local trades.',
        statValue: '3 PDFs',
        statLabel: 'Free practical handbooks ready to download today',
        linkLabel: 'Browse free PDF guides',
        linkTo: '/resources#guides',
        image: '/src/assets/images/emtrc_editorial_guides_print_1795374293225.jpg',
        imageAlt: 'Printed minimalist linen-bound business playbooks beside spectacles and espresso',
      },
    ] as ShowcaseSlide[],
  },

  rhythmSection: {
    kicker: 'How a launch actually feels',
    headlineLine1: 'Three steps.',
    headlineLine2: 'Live this week.',
    body: 'No six-week discovery workshops, no endless questionnaires and no holding your domain hostage. Here is the exact timeline from your first click to a live site.',
    steps: [
      {
        marker: 'Day 1',
        title: 'We build your free demo',
        description:
          'Send us your business name, borough and trade. Within 2 working days we send a real working demo populated with your prices, hours and services so you can test it on your own phone.',
      },
      {
        marker: 'Day 3',
        title: 'Approve tweaks & go live',
        description:
          'If you love it, we register your domain in your own name, set up your professional @yourbusiness email, connect Google Maps and push the site live with SSL security.',
      },
      {
        marker: 'Monthly',
        title: 'Edits, hosting & results handled',
        description:
          'Need a price updated, new photos added or seasonal hours changed? Email or WhatsApp us. Every month we keep everything fast, backed up and send a plain-English summary of calls and leads.',
      },
    ],
  },

  guarantees: [
    {
      number: '01',
      title: 'See it before you pay',
      description: 'We build your working demo first. If it is not right for your business, you walk away owing nothing.',
    },
    {
      number: '02',
      title: '30-day love it or leave it',
      description: 'Not delighted in your first 30 days after launch? Cancel and we refund your setup fee in full.',
    },
    {
      number: '03',
      title: 'Leads or a free month',
      description: 'If your live site gets zero tracked calls or form enquiries in the first 90 days, your next month is on us.',
    },
    {
      number: '04',
      title: 'You own your domain, always',
      description: 'Registered in your name, never locked in. Need your auth code to move elsewhere? Handed over within 5 working days.',
    },
  ],

  demoShowcase: [
    {
      id: 'kingsland-blade',
      presetId: 'barber-bold-hackney',
      businessName: 'Kingsland Blade & Fade',
      niche: 'Barber Shop',
      borough: 'Hackney E8',
      styleLabel: 'Bold · Dark · 5 pages',
      outcome: 'Live opening status, transparent fade pricing and one-tap Fresha chair booking.',
      image: '/src/assets/images/barber_shop_interior_1795370825070.jpg',
      imageAlt: 'Kingsland Blade & Fade barbershop interior in Hackney',
    },
    {
      id: 'linden-silk',
      presetId: 'salon-elegant-kensington',
      businessName: 'Linden & Silk',
      niche: 'Hair & Beauty Salon',
      borough: 'South Kensington SW7',
      styleLabel: 'Elegant · Warm · 5 pages',
      outcome: 'Categorised cut, balayage and BIAB treatment menus with direct appointment booking.',
      image: '/src/assets/images/salon_warm_studio_1795370824298.jpg',
      imageAlt: 'Linden & Silk hair and beauty salon in South Kensington',
    },
    {
      id: 'blackheath-heating',
      presetId: 'trades-bold-greenwich',
      businessName: 'Blackheath Heating & Electrical',
      niche: 'Plumber & Electrician',
      borough: 'Greenwich SE10',
      styleLabel: 'Bold · Trust Blue · 5 pages',
      outcome: '24/7 emergency call-out strip, upfront fixed rates and verified Gas Safe + NICEIC badges.',
      image: '/src/assets/images/trades_precision_heating_1795370825196.jpg',
      imageAlt: 'Blackheath Heating & Electrical copper manifold installation',
    },
    {
      id: 'battersea-bright',
      presetId: 'cleaner-minimal-wandsworth',
      businessName: 'Battersea Bright Cleaning',
      niche: 'Local Cleaner',
      borough: 'Wandsworth SW11',
      styleLabel: 'Minimal · Fresh · Quote Form',
      outcome: 'Built-in postcode & bedroom quote calculator for regular and end-of-tenancy cleans.',
      image: '/src/assets/images/cleaner_kitchen_sparkle_1795373182615.jpg',
      imageAlt: 'Spotless freshly cleaned Battersea flat kitchen',
    },
    {
      id: 'bellenden-roastery',
      presetId: 'cafe-elegant-southwark',
      businessName: 'Bellenden Roastery & Bakery',
      niche: 'Neighbourhood Café',
      borough: 'Peckham SE15',
      styleLabel: 'Elegant · Editorial · Menu',
      outcome: 'Categorised daily coffee, pastry and brunch menu with V/VG/GF labels and food photography.',
      image: '/src/assets/images/cafe_brunch_pastry_1795373181666.jpg',
      imageAlt: 'Bellenden Roastery sourdough brunch and almond croissant',
    },
    {
      id: 'redchurch-espresso',
      presetId: 'cafe-bold-shoreditch',
      businessName: 'Redchurch Espresso & Kitchen',
      niche: 'Coffee & Brunch Café',
      borough: 'Shoreditch E2',
      styleLabel: 'Bold · Dark Roast · Menu',
      outcome: 'High-contrast dark espresso aesthetic with morning bakery & all-day brunch menu.',
      image: '/src/assets/images/cafe_coffee_bakery_1795370824300.jpg',
      imageAlt: 'Redchurch Espresso coffee bar and laminated pastries',
    },
  ] as DemoShowcaseItem[],

  pricing: {
    termSummary: '12-month minimum term, then 30 days’ notice. Annual prepay gives 2 months free.',
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        summary: 'Clean 1-page site to get off social-only and start winning Google Maps calls.',
        setupFee: 99,
        monthlyPrice: 39,
        bestFor: 'Sole traders & single-chair shops',
        features: [
          '1-page mobile-first website',
          'Fast Cloudflare hosting & SSL security',
          'Google Business Profile link-up',
          'Live opening hours & click-to-call button',
          '15 minutes of edits included each month',
          'Domain registered separately (£15/yr .co.uk)',
        ],
        ctaLabel: 'Get free Starter demo',
        ctaTo: '/free-demo?plan=starter',
      },
      {
        id: 'business',
        name: 'Business',
        badge: 'Most popular',
        summary: 'Everything a busy London shop or trade needs — domain, email and local SEO included.',
        setupFee: 199,
        monthlyPrice: 69,
        bestFor: 'Barbers, salons, cafés, trades & cleaners',
        features: [
          'Up to 5 tailored pages (Home, Services, Gallery, About, Contact)',
          'Domain included (.co.uk or .com, registered in your name)',
          '1 professional business mailbox (@yourbusiness)',
          'Validated contact or quote-request form',
          'Local SEO + Schema.org structured data',
          'Privacy-friendly visitor & call-click analytics',
          '30 minutes of edits included each month',
        ],
        ctaLabel: 'Get free Business demo',
        ctaTo: '/free-demo?plan=business',
      },
      {
        id: 'growth',
        name: 'Growth',
        summary: 'Your website plus automated AI lead capture, review requests and local area pages.',
        setupFee: 399,
        monthlyPrice: 129,
        bestFor: 'Growing teams who never want to miss a lead',
        features: [
          'Everything in Business',
          'AI website chat answering questions 24/7',
          'Automatic missed-call text-back in seconds',
          'Automated Google review requests',
          '3 dedicated London local area pages',
          '1 full hour of updates & edits each month',
          'Plain-English monthly performance report',
        ],
        ctaLabel: 'Get free Growth demo',
        ctaTo: '/free-demo?plan=growth',
      },
    ] as PlanTier[],
    oneOff: {
      name: 'One-off build + Care plan',
      buildPrice: 595,
      careMonthly: 25,
      hourlyEdits: 45,
      summary:
        'Prefer to own the build up front with a smaller monthly bill? Pay £595 once, then £25/month for hosting, SSL, security updates and daily backups. Ad-hoc edits are £45/hour.',
    },
    addOns: [
      { item: 'Extra standard business mailbox', price: '£3 / user / month', note: '5 GB Zoho Mail Lite, SPF/DKIM/DMARC configured' },
      { item: 'Google Workspace or Microsoft 365 mailbox', price: 'List price + £2 / user / month', note: 'Full setup, DNS records and ongoing support' },
      { item: 'Review Engine (standalone bolt-on)', price: '£39 / month', note: 'Automatic review requests + AI reply drafts' },
      { item: 'Extra website page', price: '£49 one-off', note: 'Local area page, specialist service page or menu' },
      { item: 'Email setup & migration', price: 'From £49 one-off', note: 'Move cleanly off Gmail/Hotmail without losing mail' },
      { item: '.co.uk / .com domain registration & renewal', price: '£15–£20 / year', note: 'Included free on Business & Growth plans — always registered in your name' },
    ],
    comparisonRows: [
      { feature: 'Pages included', starter: '1 page', business: 'Up to 5 pages', growth: 'Up to 5 + 3 local pages' },
      { feature: 'Free working demo before paying', starter: 'Yes', business: 'Yes', growth: 'Yes' },
      { feature: 'Fast hosting, SSL & backups', starter: 'Included', business: 'Included', growth: 'Included' },
      { feature: 'Domain (.co.uk / .com) in your name', starter: 'Extra (£15–£20/yr)', business: 'Included', growth: 'Included' },
      { feature: 'Business mailbox (@yourbusiness)', starter: 'Extra (£3/mo)', business: '1 included', growth: '1 included' },
      { feature: 'Contact / quote form', starter: 'Click-to-call / WhatsApp', business: 'Included', growth: 'Included' },
      { feature: 'Local SEO & LocalBusiness schema', starter: 'Basic', business: 'Full local setup', growth: 'Full + 3 area pages' },
      { feature: 'AI website chat & missed-call text-back', starter: 'Bolt-on', business: 'Bolt-on', growth: 'Included' },
      { feature: 'Automated Google review requests', starter: 'Bolt-on (£39/mo)', business: 'Bolt-on (£39/mo)', growth: 'Included' },
      { feature: 'Monthly edits included', starter: '15 mins / mo', business: '30 mins / mo', growth: '60 mins / mo' },
      { feature: 'Monthly results report', starter: '—', business: 'Analytics access', growth: 'Full monthly PDF' },
    ],
    whyMonthly: {
      headline: 'Why pay monthly instead of £2,500 up front?',
      points: [
        {
          title: 'Keep cash in your business',
          body: 'A traditional London agency asks for £1,500 to £3,500 up front — then invoices extra every time you change a price or renew hosting.',
        },
        {
          title: 'We stay accountable every month',
          body: 'Because you pay monthly, our incentive is keeping your site fast, secure, updated and bringing in enquiries — not disappearing after launch day.',
        },
        {
          title: 'Zero technical headaches',
          body: 'Domains, SSL certificates, DNS records, email deliverability and photo swaps happen quietly in the background while you run your business.',
        },
      ],
    },
  },

  aiTools: {
    headline: 'Stop losing work when you cannot pick up the phone.',
    subheadline:
      'Every AI tool we install is built for real London high-street workflows: polite, transparent (callers always know when AI assists), and wired straight into your calendar and phone.',
    cards: [
      {
        id: 'review-engine',
        name: 'Review Engine',
        price: '£39/month',
        status: 'Available now',
        whatItDoes:
          'Automatically sends a polite, DMCC-compliant Google review link after a completed visit or job, and drafts thoughtful local replies for your approval.',
        whoItsFor:
          'Barbers, salons, cafés, cleaners and trades sitting below 40 Google reviews who want to climb into the local Maps top 3.',
        flowSteps: [
          { step: '01', label: 'Job finishes', detail: 'Mark customer complete' },
          { step: '02', label: 'Polite SMS sent', detail: '1-tap Google review link' },
          { step: '03', label: 'Reply drafted', detail: 'Boosts Maps & AI search' },
        ],
      },
      {
        id: 'lead-catcher',
        name: 'Lead Catcher',
        price: '£79/month',
        status: 'Most popular add-on',
        whatItDoes:
          'Combines 24/7 AI website chat, instant missed-call text-back (under 10 seconds), and automated Google review requests in one bundle.',
        whoItsFor:
          'Busy trades on ladders, stylists with hands full, and small teams who miss 3 to 10 enquiries every week during rush hours.',
        flowSteps: [
          { step: '01', label: 'Missed call or chat', detail: 'Customer reaches out' },
          { step: '02', label: 'Instant response', detail: 'Polite SMS or chat answers' },
          { step: '03', label: 'Enquiry captured', detail: 'Details & slot sent to you' },
        ],
      },
      {
        id: 'ai-receptionist',
        name: 'AI Receptionist',
        price: '£149/month',
        status: 'Available now · +£199 setup',
        whatItDoes:
          'Answers incoming phone calls 24/7 in a natural British voice, quotes your standard prices, qualifies the postcode and books appointments straight into your diary.',
        whoItsFor:
          'Plumbers, electricians, clinics and high-volume salons where one missed emergency call or booking costs £120 to £600.',
        flowSteps: [
          { step: '01', label: 'Phone rings 24/7', detail: 'Answered in 2 rings' },
          { step: '02', label: 'AI qualifies & books', detail: 'Checks diary & postcode' },
          { step: '03', label: 'Summary texted', detail: 'Transcript + calendar invite' },
        ],
      },
      {
        id: 'business-phone',
        name: 'Business Phone (Cloud VoIP)',
        price: 'Coming soon',
        status: 'Pre-register ahead of 31 Jan 2027',
        whatItDoes:
          'Modern cloud business phone system so you can keep your existing 020 London landline number and answer it on your mobile, desk handset or laptop — ready before the old BT copper phone lines switch off on 31 January 2027.',
        whoItsFor:
          'Any London shop, salon or office still paying for a legacy BT/Openreach copper landline who wants to avoid forced Emergency Voice Access rates.',
        flowSteps: [
          { step: '01', label: 'Keep 020 number', detail: 'Ported cleanly off copper' },
          { step: '02', label: 'Rings anywhere', detail: 'Mobile app or desk phone' },
          { step: '03', label: 'Switch-off ready', detail: 'Ahead of 31 Jan 2027' },
        ],
      },
    ],
  },

  pdfGuides: [
    {
      id: 'website-checklist',
      title: 'The London Local Business Website Checklist (2026/27)',
      shortTitle: 'London Website Checklist',
      pages: '2-page actionable PDF',
      readTime: '6 min read',
      category: 'Websites & Conversion',
      summary:
        'The 14 practical details that turn Google Maps searchers into real phone calls — covering mobile speed, transparent pricing, domain ownership and LocalBusiness schema.',
      highlights: [
        'The 3-second mobile test every London shop fails',
        'Exact trust signals that beat £3,000 agency builds',
        'Domain & email ownership checklist (avoid Yell-style lock-in)',
      ],
      pdfUrl: '/downloads/emtrc-london-website-checklist-2026.pdf',
      fileName: 'emtrc-london-website-checklist-2026.pdf',
      coverImage: '/src/assets/images/emtrc_editorial_guides_print_1795374293225.jpg',
      coverAlt: 'Bound print edition of the emtrc London Website Checklist',
    },
    {
      id: 'pstn-2027',
      title: 'The UK PSTN Phone Switch-Off Guide (31 January 2027)',
      shortTitle: 'PSTN Jan 2027 Switch-Off Guide',
      pages: '2-page survival PDF',
      readTime: '5 min read',
      category: 'Business Phones & VoIP',
      summary:
        'Plain-English guide to Openreach retiring copper landlines on 31 January 2027: how to keep your 020 number, check alarms/card machines and avoid £35/month emergency line charges.',
      highlights: [
        'Confirmed Openreach dates & what stops working',
        '4-step 020 number porting checklist (do not cancel first)',
        'Pairing cloud VoIP with missed-call text-back & AI answering',
      ],
      pdfUrl: '/downloads/emtrc-uk-pstn-switch-off-guide-2027.pdf',
      fileName: 'emtrc-uk-pstn-switch-off-guide-2027.pdf',
      coverImage: '/src/assets/images/emtrc_editorial_phone_studio_1795374293354.jpg',
      coverAlt: 'Modern matte wireless business phone on a London reception desk',
    },
    {
      id: 'maps-ai-search',
      title: 'Google Maps & AI Search Playbook for Local Businesses',
      shortTitle: 'Google Maps & AI Search Playbook',
      pages: '2-page playbook PDF',
      readTime: '7 min read',
      category: 'Local SEO & AI Visibility',
      summary:
        'How London barbers, salons, cafés and trades climb into the Google 3-Pack and get recommended by ChatGPT and Apple Maps — including a UK DMCC-compliant review SMS script.',
      highlights: [
        'Why AI search currently recommends only ~1.2% of local firms',
        'Copy-and-paste review request SMS that follows UK law',
        'The 5 Google Business Profile fields that move rankings fastest',
      ],
      pdfUrl: '/downloads/emtrc-google-maps-ai-search-playbook.pdf',
      fileName: 'emtrc-google-maps-ai-search-playbook.pdf',
      coverImage: '/src/assets/images/emtrc_mobile_maps_search_1795424180037.jpg',
      coverAlt: 'London commuter using a smartphone on a Victorian high street to compare local businesses on Google Maps',
    },
  ] as PdfGuideItem[],

  newsletter: {
    eyebrow: 'The London Local Dispatch',
    headline: 'One useful email a fortnight.',
    bullets: [
      'Google Maps, AI search & UK phone deadlines before they bite',
      'Plain-English fixes that bring in real local calls',
      'First access to our London Web Census data & new PDF guides',
    ],
    placeholder: 'you@yourbusiness.co.uk',
    buttonLabel: 'Join free',
    disclaimer: 'No spam, ever. One click to unsubscribe, and we never sell your address.',
    successMessage:
      'You are on the list. Look out for the next London Local Dispatch in your inbox.',
  },

  faqs: [
    {
      q: 'What is the catch with the free demo?',
      a: 'There isn’t one. We build a working demo of your new website in 2 working days so you can open it on your own phone and see how it looks before paying anything. If you don’t want it, we take it down and part as friends.',
    },
    {
      q: 'Who owns my domain name and content?',
      a: 'You do — always. We register your .co.uk or .com domain in your business name and hand over transfer auth codes within 5 working days if you ever decide to move.',
    },
    {
      q: 'What happens after the 12-month minimum term?',
      a: 'Your plan rolls month to month on 30 days’ notice. No sneaky auto-renewing multi-year lock-ins. You can also prepay annually to get 2 months free.',
    },
    {
      q: 'How do monthly edits work?',
      a: 'Email or WhatsApp us your new prices, seasonal opening hours, staff changes or fresh photos. Starter includes 15 minutes a month, Business includes 30 minutes, and Growth includes a full hour — most routine updates are done inside 24 hours.',
    },
    {
      q: 'Do I have to take AI tools straight away?',
      a: 'No. Most clients start with the Business website plan (£69/month) and add the Review Engine (£39/month), Lead Catcher (£79/month) or AI Receptionist (£149/month) once they see the site paying for itself.',
    },
  ],

  tradesList: [
    'Barber',
    'Hair / beauty',
    'Nails / lashes',
    'Plumber',
    'Electrician',
    'Builder',
    'Cleaner',
    'Café / restaurant',
    'Other',
  ],

  londonBoroughs: [
    'Barking and Dagenham',
    'Barnet',
    'Bexley',
    'Brent',
    'Bromley',
    'Camden',
    'City of London',
    'Croydon',
    'Ealing',
    'Enfield',
    'Greenwich',
    'Hackney',
    'Hammersmith and Fulham',
    'Haringey',
    'Harrow',
    'Havering',
    'Hillingdon',
    'Hounslow',
    'Islington',
    'Kensington and Chelsea',
    'Kingston upon Thames',
    'Lambeth',
    'Lewisham',
    'Merton',
    'Newham',
    'Redbridge',
    'Richmond upon Thames',
    'Southwark',
    'Sutton',
    'Tower Hamlets',
    'Waltham Forest',
    'Wandsworth',
    'Westminster',
  ],

  freeDemoSuccessMessage: "Thanks. We'll send your free demo within 2 working days.",

  ownerVoices: {
    disclosureNote:
      'Representative London high-street workflows based on our live trade templates — real client case studies publish as our founding London cohort goes live.',
    featured: {
      quote:
        '“Seeing our real barber shop website working on my phone in 48 hours before paying a penny made the decision obvious. Walk-ins actually know our fade prices and tap straight into Fresha.”',
      name: 'Hackney E8 Barber Workflow',
      role: '4-chair independent shop · Business plan + Review Engine',
      metricValue: '0.9s',
      metricLabel: 'Mobile load time on 4G',
      demoPresetId: 'barber-bold-hackney',
    },
    cards: [
      {
        quote:
          '“When I’m under a sink in Greenwich I cannot pick up. Missed-call text-back replies in 8 seconds and gets the postcode before they ring the next plumber.”',
        name: 'SE10 Heating & Plumbing',
        role: 'Emergency trade · Growth plan',
        demoPresetId: 'trades-bold-greenwich',
      },
      {
        quote:
          '“We stopped chasing freelance developers every time we changed balayage prices. One WhatsApp message and our treatment menu updates the same day.”',
        name: 'SW7 Hair & Beauty Studio',
        role: 'Independent salon · Business plan',
        demoPresetId: 'salon-elegant-kensington',
      },
      {
        quote:
          '“Having an instant postcode and bedroom quote form meant fewer tyre-kicker texts and far more serious end-of-tenancy bookings.”',
        name: 'SW11 Local Cleaning Team',
        role: 'Domestic & EoT cleaning · Business plan',
        demoPresetId: 'cleaner-minimal-wandsworth',
      },
      {
        quote:
          '“Moving our 020 number onto cloud VoIP before the Jan 2027 copper switch-off took two weeks with zero missed orders.”',
        name: 'SE15 Bakery & Café',
        role: 'Neighbourhood café · Business + VoIP',
        demoPresetId: 'cafe-elegant-southwark',
      },
    ] as const,
  },

  legal: {
    draftBannerText:
      'Draft, under review — this document is provisional legal copy prepared for World Finance Global Limited trading as emtrc and is awaiting final solicitor sign-off.',
    lastUpdated: 'November 2026',
  },
} as const;

export { SERVICE_DETAILS, getServiceBySlug, type ServiceDetail } from './services';
export { BLOG_ARTICLES, BLOG_CATEGORIES, getBlogArticleBySlug, type BlogArticle, type BlogCategory } from './blog';
export { SUPPORTED_LANGUAGES, type LocaleCode } from './i18n';

