export type FaqCategory =
  | 'Free Demo & Launch'
  | 'Pricing & Contracts'
  | 'Domains & Email'
  | 'Google Maps & Local SEO'
  | 'AI Tools & Calls'
  | 'UK PSTN 2027 Switch-Off';

export interface FaqEntry {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  deepDive: string;
  keyPoints: readonly string[];
  keywords: readonly string[];
  relatedLink?: { label: string; to: string };
}

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  'Free Demo & Launch',
  'Pricing & Contracts',
  'Domains & Email',
  'Google Maps & Local SEO',
  'AI Tools & Calls',
  'UK PSTN 2027 Switch-Off',
] as const;

export const ALL_FAQS: readonly FaqEntry[] = [
  // =========================================================================
  // 1. FREE DEMO & LAUNCH (5 detailed entries)
  // =========================================================================
  {
    id: 'demo-catch',
    category: 'Free Demo & Launch',
    question: 'What is the catch with the free working demo?',
    answer:
      'There isn’t one — and we never ask for a debit card, setup deposit, or signed agreement to build it. Send us your business name, London borough, and trade (plus a link to your current Google Maps listing or Instagram if you have one), and within 2 working days we build a real, clickable website populated with your actual services, starting prices, opening hours, and borough copy.',
    deepDive:
      'We built this process because too many London barbers, plumbers, and café owners have been burned by agencies taking £1,500 upfront and delivering a slow generic template six weeks later. By letting you tap through your own real site on your phone first, you judge our design craft and loading speed with your own eyes before spending a penny. If you decide not to go ahead, we simply switch the preview URL off cleanly and never chase you with spam calls.',
    keyPoints: [
      'Zero deposit, zero card details, and zero obligation to proceed',
      'Delivered as a private live preview link inside 2 working days',
      'Populated with your real London borough, services, and price guide — never lorem ipsum',
    ],
    keywords: ['free demo', 'catch', 'cost', '48 hours', 'working days', 'obligation'],
    relatedLink: { label: 'Request your free demo', to: '/free-demo' },
  },
  {
    id: 'launch-speed',
    category: 'Free Demo & Launch',
    question: 'How quickly can my new website actually go live?',
    answer:
      'Once you review your free demo and tell us any tweaks (new prices, extra photos, or wording changes), most Starter and Business websites go live on your own .co.uk or .com domain within 3 to 5 working days. Growth builds with three dedicated London borough landing pages typically go live in 5 to 7 working days.',
    deepDive:
      'During launch week we handle every technical chore in parallel so your shop floor is never interrupted: registering or connecting your domain, provisioning Cloudflare SSL encryption, setting up your @yourbusiness email DNS records (SPF, DKIM, DMARC), validating your LocalBusiness Schema.org markup, and linking your new website cleanly back to your Google Business Profile.',
    keyPoints: [
      'Day 1–2: We build and send your private clickable demo link',
      'Day 3–4: You request edits by WhatsApp or email while we configure DNS & email',
      'Day 5: Live on Cloudflare’s UK edge with sub-second mobile load speed',
    ],
    keywords: ['launch', 'timeline', 'how long', 'days', 'go live', 'turnaround'],
    relatedLink: { label: 'See the full launch timeline', to: '/how-it-works' },
  },
  {
    id: 'photos-needed',
    category: 'Free Demo & Launch',
    question: 'What if I don’t have professional photos yet?',
    answer:
      'You do not need a £1,200 commercial photoshoot to launch a trustworthy London website. We can start immediately using crisp photos pulled from your existing Google Business Profile, Instagram feed, or five quick daylight smartphone shots taken right outside your shopfront or job site.',
    deepDive:
      'In fact, our A/B tests across London trades consistently show that genuine, bright smartphone photos of your real chair, copper boiler installation, or morning espresso counter outperform polished American stock photography by over 2x on tap-to-call clicks. Our free Training Centre includes a 5-minute smartphone photography checklist, and whenever you snap fresher work later, just WhatsApp the photos over and we optimise and swap them in under your monthly edit allowance.',
    keyPoints: [
      'We compress, colour-balance, and crop every smartphone photo you send us',
      'Includes free access to our 5-minute London smartphone photo guide',
      'Swap in seasonal or fresh job photos any month via WhatsApp',
    ],
    keywords: ['photos', 'images', 'photography', 'smartphone', 'stock'],
    relatedLink: { label: 'Open the 5-minute smartphone photo guide', to: '/training' },
  },
  {
    id: 'london-coverage',
    category: 'Free Demo & Launch',
    question: 'Do you cover all London boroughs or just Central London?',
    answer:
      'We build and support websites for independent businesses across all 32 London boroughs and the City of London — from Hackney, Dalston, Walthamstow, and Stratford in East London to Greenwich, Peckham, Clapham, Croydon, Kingston, Richmond, Ealing, Harrow, Barnet, and Kensington.',
    deepDive:
      'London customers search hyper-locally: someone in SE10 searches for "boiler repair Greenwich" or "Blackheath emergency plumber", not "London heating contractor". That is why every site we ship includes postcode-aware local copy, genuine local landmarks/areas served, and clean Schema.org areaServed definitions tailored specifically to the postcodes you actually want to travel to.',
    keyPoints: [
      'All 32 London boroughs plus Zone 6 border towns (Bromley, Watford, Kingston, Romford)',
      'Growth plans include 3 dedicated postcode/borough landing pages for multi-area trades',
      'UK-based support team working standard London business hours (Mon–Fri, 08:30–18:00)',
    ],
    keywords: ['boroughs', 'london', 'area', 'location', 'postcodes', 'zones'],
    relatedLink: { label: 'Browse 15 live London demos', to: '/work' },
  },
  {
    id: 'existing-booking-links',
    category: 'Free Demo & Launch',
    question: 'Can you connect my existing Fresha, Booksy, Treatwell, or Tradify booking system?',
    answer:
      'Yes — seamlessly. We never force you to abandon booking software your regular clients already love. Whether you use Fresha, Booksy, Squire, Treatwell, Timely, Square Appointments, ResDiary, ServiceM8, or Tradify, we wire prominent "Book now" buttons across your header, hero, and service price cards straight into your live calendar.',
    deepDive:
      'We also track every tap on your booking button using cookieless analytics so your monthly report shows exactly how many visitors moved from your website into your booking checkout. Where platforms charge high marketplace commission fees on new clients (such as Treatwell’s 35% first-visit cut), routing Google Maps traffic to your own emtrc website first often saves salons and barbers hundreds of pounds every single month.',
    keyPoints: [
      'Works with Fresha, Booksy, Squire, Treatwell, Timely, Square, Calendly, and ServiceM8',
      'Direct website bookings help you avoid 25%–35% marketplace commission fees',
      'Every booking tap is counted cleanly in your monthly performance report',
    ],
    keywords: ['fresha', 'booksy', 'treatwell', 'booking', 'calendar', 'square', 'tradify'],
    relatedLink: { label: 'Explore Fast Local Websites', to: '/services/websites' },
  },

  // =========================================================================
  // 2. PRICING & CONTRACTS (5 detailed entries)
  // =========================================================================
  {
    id: 'monthly-term',
    category: 'Pricing & Contracts',
    question: 'How does the 12-month minimum term work?',
    answer:
      'Our three managed monthly plans — Starter (£39/mo), Business (£69/mo), and Growth (£129/mo) — carry a straightforward 12-month minimum term because we absorb the majority of the upfront design, engineering, and setup work so you don’t have to pay £1,500–£3,000 on day one.',
    deepDive:
      'Once your initial 12 months are complete, your plan automatically rolls onto a flexible month-to-month basis with just 30 days’ written notice. We never use sneaky auto-renewing multi-year contracts, hidden hosting renewal invoices, or surprise SSL renewal fees. Everything — Cloudflare global edge hosting, domain renewal on Business/Growth, SSL security, and monthly edits — is rolled into one predictable invoice.',
    keyPoints: [
      '12-month initial term spreads the build cost into an affordable monthly figure',
      'Rolls month-to-month after year one on plain 30 days’ notice',
      'Zero surprise renewal bills for SSL, hosting, or security plugins',
    ],
    keywords: ['contract', '12 months', 'cancel', 'notice', 'minimum term', 'rolling'],
    relatedLink: { label: 'Compare all plans side by side', to: '/pricing' },
  },
  {
    id: 'annual-discount',
    category: 'Pricing & Contracts',
    question: 'Can I save money by paying annually?',
    answer:
      'Yes. Prepaying annually on Starter, Business, or Growth gives you 2 full months free — you pay for 10 months and receive 12 months of hosting, domain renewal, support, and monthly edits. That saves £78/year on Starter, £138/year on Business, and £258/year on Growth.',
    deepDive:
      'Many established London businesses prefer annual billing because it reduces bookkeeping to a single clean UK VAT-ready invoice per year while locking in an effective 16.7% discount immediately. You can switch the Monthly / Annual toggle on our Pricing page to inspect exact totals and daily cost equivalents before deciding.',
    keyPoints: [
      'Starter Annual: £390/year (save £78 — equivalent to £32.50/mo)',
      'Business Annual: £690/year (save £138 — equivalent to £57.50/mo)',
      'Growth Annual: £1,290/year (save £258 — equivalent to £107.50/mo)',
    ],
    keywords: ['annual', 'discount', '2 months free', 'prepay', 'yearly', 'save'],
    relatedLink: { label: 'Toggle annual savings on Pricing', to: '/pricing' },
  },
  {
    id: 'one-off-option',
    category: 'Pricing & Contracts',
    question: 'What if I prefer a one-off build instead of a higher monthly plan?',
    answer:
      'If you prefer to pay upfront and keep monthly overheads minimal, choose our One-off Build at £595 once, paired with a £25/month Care Plan covering Cloudflare edge hosting, SSL certificates, uptime monitoring, security maintenance, and automated backups.',
    deepDive:
      'The One-off Build delivers the exact same sub-second static architecture, mobile-first layout, and clean LocalBusiness SEO as our Business tier. Whenever you need copy tweaks, price updates, or extra pages added later, ad-hoc edits are billed transparently at £45/hour in fair 15-minute increments (£11.25 per quick update) — and we always confirm the cost before touching anything.',
    keyPoints: [
      '£595 one-off design & engineering fee with zero 12-month website lock-in',
      '£25/month Care Plan keeps hosting, SSL, speed, and backups rock-solid',
      'Ad-hoc edits billed fairly in 15-minute blocks (£11.25) with upfront approval',
    ],
    keywords: ['one-off', '595', 'buy outright', 'care plan', 'hourly', 'upfront'],
    relatedLink: { label: 'See One-off Build details', to: '/pricing#one-off' },
  },
  {
    id: 'monthly-edits',
    category: 'Pricing & Contracts',
    question: 'What counts as monthly edits and how fast are they done?',
    answer:
      'Anything you need to keep your site fresh and accurate counts: price list revisions, seasonal Bank Holiday opening hours, new team member bios, fresh job/haircut gallery photos, homepage offer banners, updated Gas Safe/NICEIC accreditations, and new customer testimonials.',
    deepDive:
      'Starter includes 15 minutes/month, Business includes 30 minutes/month, and Growth includes 1 full hour/month. There is no clunky WordPress login to fight with at 10pm — simply send us a quick WhatsApp voice note, photo, or email and our London team publishes the change, usually inside 24 working hours (and same-day for urgent phone number or closure notices).',
    keyPoints: [
      'Just WhatsApp or email your changes — zero CMS dashboards to wrestle with',
      'Routine updates typically go live within 24 working hours',
      'Urgent hours/closure notices prioritised same working day',
    ],
    keywords: ['edits', 'updates', 'prices', 'hours', 'whatsapp', 'support', 'turnaround'],
    relatedLink: { label: 'Explore Monthly Care & Edits', to: '/services/care-plan' },
  },
  {
    id: 'upgrade-downgrade',
    category: 'Pricing & Contracts',
    question: 'Can I start on Starter or Business and upgrade later as my business grows?',
    answer:
      'Absolutely — upgrading is effortless and carries zero rebuild penalty. You can start on Starter (£39/mo) or Business (£69/mo) today, then step up to Growth (£129/mo) or bolt on Review Engine / Lead Catcher whenever your calendar gets busier.',
    deepDive:
      'Because every emtrc website is built on the same modular TypeScript + Cloudflare Pages foundation, expanding a 1-page Starter site into a 5-page Business site with extra borough landing pages takes a few days rather than throwing your site away and starting from scratch. We simply credit your existing setup and adjust your monthly plan from the next billing cycle.',
    keyPoints: [
      'Upgrade seamlessly from Starter → Business → Growth with zero wasted work',
      'Add or pause AI bolt-ons (Review Engine, Lead Catcher) independently',
      'No hidden "re-platforming" charges when adding new services or London boroughs',
    ],
    keywords: ['upgrade', 'scale', 'change plan', 'starter to business', 'grow'],
    relatedLink: { label: 'Compare Starter, Business & Growth', to: '/pricing' },
  },

  // =========================================================================
  // 3. DOMAINS & EMAIL (5 detailed entries)
  // =========================================================================
  {
    id: 'domain-ownership',
    category: 'Domains & Email',
    question: 'Who owns my .co.uk or .com domain name?',
    answer:
      'You do — 100%, from day one. We register every .co.uk, .uk, or .com domain directly in your legal or trading name, never trapped under a mysterious agency holding account. Even while we manage your DNS renewals for convenience, you remain the legal registrant on Nominet/ICANN records.',
    deepDive:
      'One of the dirtiest tricks in local web design is an agency holding your domain hostage if you ever decide to leave. We put our Domain Ownership Guarantee in writing: after your term, if you ever move elsewhere, we release your Nominet IPS tag (.co.uk) or EPP transfer auth code (.com) within 5 working days with zero release fees or friction.',
    keyPoints: [
      'Registered directly in your business name on Nominet (.co.uk) or ICANN (.com)',
      'Annual domain renewal included free on Business and Growth plans',
      'Guaranteed Nominet IPS tag or EPP auth code release within 5 working days',
    ],
    keywords: ['domain', 'ownership', 'co.uk', 'nominet', 'transfer', 'auth code', 'hostage'],
    relatedLink: { label: 'Domains & Business Email details', to: '/services/domains-email' },
  },
  {
    id: 'existing-domain',
    category: 'Domains & Email',
    question: 'I already own a domain name — can we use it without downtime?',
    answer:
      'Yes, cleanly and with zero email interruption. Whether your domain sits with GoDaddy, 123-reg, Ionos, Fasthosts, Namecheap, or Cloudflare, we audit your existing MX (email) records first, replicate them safely, and point only your web traffic to our fast Cloudflare edge network.',
    deepDive:
      'If a previous web designer registered your domain years ago and has gone quiet, we also help you navigate Nominet’s official registrant recovery process for .co.uk domains so you reclaim full ownership permanently before launching your upgraded site.',
    keyPoints: [
      'Zero email downtime — we audit and preserve every MX/TXT record before switching',
      'Works with GoDaddy, 123-reg, Ionos, Namecheap, Fasthosts, and Cloudflare',
      'Guidance included if you need to recover a .co.uk domain from an unresponsive ex-agency',
    ],
    keywords: ['existing domain', 'dns', 'transfer', 'keep domain', 'godaddy', '123-reg'],
    relatedLink: { label: 'Explore Domains & Email setup', to: '/services/domains-email' },
  },
  {
    id: 'business-email-included',
    category: 'Domains & Email',
    question: 'How does the @yourbusiness email address work?',
    answer:
      'Business and Growth plans include 1 professional business mailbox (5 GB Zoho Mail Lite, e.g. hello@yourshop.co.uk or quotes@yourtrade.co.uk) fully configured on your iPhone, Android, and desktop — complete with authenticated SPF, DKIM, and DMARC records.',
    deepDive:
      'Since February 2024, Google and Yahoo aggressively filter unauthenticated small-business emails straight into Junk. By engineering proper SPF, DKIM, and DMARC cryptographic signatures for your domain, your boiler quotes, appointment confirmations, and invoices land straight in your customers’ primary inbox. Need extra team mailboxes? They are just £3/user/month, or we can manage Google Workspace / Microsoft 365 at list price + £2/user/month.',
    keyPoints: [
      '1 standard 5 GB mailbox included free on Business & Growth plans',
      'Full SPF, DKIM & DMARC authentication so quotes stop landing in Junk/Spam',
      'Synced cleanly to Apple Mail, Gmail app, Outlook, and webmail',
    ],
    keywords: ['email', 'mailbox', 'zoho', 'google workspace', 'microsoft 365', 'spf', 'dkim', 'dmarc'],
    relatedLink: { label: 'See Email & Domain specifications', to: '/services/domains-email' },
  },
  {
    id: 'email-migration',
    category: 'Domains & Email',
    question: 'Can you move me off @gmail.com or @hotmail.co.uk without losing old emails?',
    answer:
      'Yes. Moving from a free @gmail.com, @btinternet.com, or @hotmail.co.uk inbox to a branded @yourbusiness.co.uk address is one of the highest-trust upgrades a London trade can make — and you keep every single historic customer thread.',
    deepDive:
      'Our Email Setup & Migration service (from £49 one-off) migrates your existing folders cleanly via IMAP and puts automatic forwarding in place from your old free address for 12+ months. Whenever a past customer emails your old Gmail, it lands right inside your new professional inbox and your reply goes out smoothly from your branded domain.',
    keyPoints: [
      'Full IMAP migration keeps years of customer quotes, receipts, and threads intact',
      'Automatic forwarding catches emails sent to your old Gmail/BT/Hotmail address',
      'Customers immediately see a credible @yourcompany.co.uk sender name',
    ],
    keywords: ['gmail', 'hotmail', 'btinternet', 'migration', 'old emails', 'forwarding'],
    relatedLink: { label: 'Domains & Email migration', to: '/services/domains-email' },
  },
  {
    id: 'static-security-speed',
    category: 'Domains & Email',
    question: 'Why don’t you build on WordPress — and why is Cloudflare Pages faster?',
    answer:
      'WordPress was invented in 2003 as a blogging database. For a 1-to-5 page local London business site, WordPress adds bloated PHP plugins, constant security patch risks, slow mobile server delays, and surprise £300 "hacked site recovery" fees.',
    deepDive:
      'Every emtrc website is compiled as pre-rendered static HTML, CSS, and TypeScript delivered from Cloudflare’s London edge data centres (LHR). There is no exposed database to hack, zero plugin breakages, automatic TLS 1.3 SSL security, and typical mobile load times of 0.7–0.9 seconds even on patchy London Underground or 4G connections — giving you an instant Core Web Vitals advantage over slower local competitors.',
    keyPoints: [
      'Sub-1-second loads from Cloudflare’s London edge network (LHR)',
      'Zero WordPress plugin vulnerabilities, malware pop-ups, or database crashes',
      'Consistently scores 95–100 on Google Mobile PageSpeed & Core Web Vitals',
    ],
    keywords: ['wordpress', 'cloudflare', 'speed', 'security', 'static', 'fast', 'hacked'],
    relatedLink: { label: 'Read: Why slow sites lose 53% of London mobile visitors', to: '/blog/why-slow-websites-cost-london-trades-half-their-mobile-calls' },
  },

  // =========================================================================
  // 4. GOOGLE MAPS & LOCAL SEO (5 detailed entries)
  // =========================================================================
  {
    id: 'maps-ranking-time',
    category: 'Google Maps & Local SEO',
    question: 'How long does it take to climb into the Google Maps Top 3?',
    answer:
      'Most independent London businesses see measurable gains in Google Maps profile views, direction taps, and tap-to-call clicks within 30 to 90 days once their site speed, Google primary/secondary categories, LocalBusiness schema, and weekly review rhythm are aligned properly.',
    deepDive:
      'Google ranks local London businesses on three core pillars: Relevance (does your website and Google profile explicitly match the trade & service?), Distance (clear borough/postcode signals), and Prominence (review velocity, fresh real photos, and clean citations). Unlike shady SEO agencies promising "guaranteed #1 overnight", we engineer all three pillars cleanly so your rankings compound and stick.',
    keyPoints: [
      'Weeks 1–2: Fast site live + Google Business Profile categories & NAP fixed',
      'Days 30–60: Early lift in "near me" impressions and tap-to-call enquiries',
      'Days 60–90+: Compounding Top 3 Maps visibility powered by weekly reviews & photos',
    ],
    keywords: ['google maps', '3-pack', 'seo', 'ranking', 'how long', 'near me'],
    relatedLink: { label: 'Explore Local SEO & AI Search', to: '/services/local-seo' },
  },
  {
    id: 'chatgpt-ai-search',
    category: 'Google Maps & Local SEO',
    question: 'How do you get my business recommended by ChatGPT, Perplexity, and Apple Maps?',
    answer:
      'More Londoners now ask ChatGPT, Perplexity, or Siri "Who is a reliable Gas Safe heating engineer in Greenwich?" or "Best skin fade barber open Sunday in Dalston?". AI engines cannot reliably parse blurry Instagram price screenshots or slow JavaScript builders.',
    deepDive:
      'Every Business and Growth website ships with strict, machine-validated LocalBusiness Schema.org JSON-LD declaring your exact trade subtype (BarberShop, Plumber, Electrician, CafeOrCoffeeShop), London boroughs served, live opening hours, price range, and sameAs links — paired with clean semantic HTML service menus and Apple Business Connect alignment so AI assistants can verify and cite you with confidence.',
    keyPoints: [
      'Validated LocalBusiness Schema.org JSON-LD built into every Business & Growth page',
      'Clean HTML service names and starting prices readable by AI crawlers',
      'Aligned across Google Business Profile, Apple Business Connect, and Bing Places',
    ],
    keywords: ['chatgpt', 'ai search', 'schema', 'json-ld', 'apple maps', 'siri', 'perplexity'],
    relatedLink: { label: 'Read our ChatGPT & Apple Maps AI Search guide', to: '/blog/chatgpt-apple-maps-ai-search-local-businesses' },
  },
  {
    id: 'local-area-pages',
    category: 'Google Maps & Local SEO',
    question: 'What are the 3 local area pages on the Growth plan?',
    answer:
      'If your London business serves multiple neighbouring areas — for example a Greenwich boiler engineer also covering Blackheath (SE3), Lewisham (SE13), and Dulwich (SE21) — a single generic homepage struggles to outrank competitors physically based in those neighbouring postcodes.',
    deepDive:
      'Our Growth plan includes 3 custom-written London borough landing pages targeting your highest-value neighbouring postcodes. Each page carries genuine local context (property types, parking/call-out times, local area reviews, and postcode-specific Schema.org markup) rather than lazy copy-paste doorway text that Google ignores.',
    keyPoints: [
      'Targets 3 high-margin neighbouring London boroughs or postcode clusters',
      'Written with real local London context — never spammy keyword-stuffed clones',
      'Ideal for plumbers, electricians, cleaners, locksmiths, and mobile specialists',
    ],
    keywords: ['local area pages', 'boroughs', 'growth plan', 'seo', 'postcodes', 'landing pages'],
    relatedLink: { label: 'See Growth plan inclusions', to: '/pricing' },
  },
  {
    id: 'analytics-privacy',
    category: 'Google Maps & Local SEO',
    question: 'Do you track visitors with intrusive cookie banners?',
    answer:
      'No. We use lightweight, cookieless privacy-first analytics that comply with UK GDPR and PECR out of the box — meaning zero annoying "Accept All Cookies" pop-ups blocking half the screen on your customer’s smartphone.',
    deepDive:
      'Even without tracking cookies, you get crystal-clear monthly numbers that actually affect your till: total local visitors, exact tap-to-call phone clicks, WhatsApp button taps, online booking button clicks, and contact form submissions — delivered as a plain-English 1-page monthly report on Business and Growth plans.',
    keyPoints: [
      'Zero intrusive cookie pop-up walls slowing down first-time mobile visitors',
      'Tracks real money actions: phone calls, WhatsApp taps, bookings & form leads',
      'Plain-English monthly report you can read in 90 seconds on your phone',
    ],
    keywords: ['cookies', 'analytics', 'gdpr', 'privacy', 'reports', 'tracking'],
    relatedLink: { label: 'Explore Local SEO & Reporting', to: '/services/local-seo' },
  },
  {
    id: 'gbp-ownership-safety',
    category: 'Google Maps & Local SEO',
    question: 'Do I keep full ownership of my Google Business Profile?',
    answer:
      'Yes, permanently. You stay Primary Owner of your Google Business Profile at all times; we only ever request Manager access to update your categories, services, website UTM links, and quarterly audits.',
    deepDive:
      'If your profile has ever been suspended, duplicated, or claimed by a former agency, we walk through Google’s official video verification and ownership recovery steps with you so your reviews and map pin are permanently protected under your own Google account.',
    keyPoints: [
      'You remain Primary Owner — emtrc only uses revocable Manager access',
      'Full protection against agency lock-in or accidental duplicate listings',
      'Support with Google video verification for newly launched London premises',
    ],
    keywords: ['google business profile', 'primary owner', 'suspended', 'verification', 'gbp'],
    relatedLink: { label: 'Follow Track 01 in our Training Centre', to: '/training' },
  },

  // =========================================================================
  // 5. AI TOOLS & CALLS (5 detailed entries)
  // =========================================================================
  {
    id: 'ai-tools-required',
    category: 'AI Tools & Calls',
    question: 'Do I have to buy AI tools when I start my website?',
    answer:
      'Not at all. Most London clients start purely with our Business website plan (£69/month) to establish a crisp, fast online presence and clean Google Maps profile. Our AI Front Office tools are 100% optional modular bolt-ons you can add whenever you are ready.',
    deepDive:
      'When you start getting more calls than you can physically answer while cutting hair, tiling a bathroom, or making flat whites, you can switch on Review Engine (£39/month), Lead Catcher (£79/month), or AI Receptionist (£149/month) in a couple of days with zero website redesign needed.',
    keyPoints: [
      'Website plans work brilliantly standalone — AI bolt-ons are completely optional',
      'Add Review Engine (£39/mo), Lead Catcher (£79/mo) or AI Receptionist (£149/mo) anytime',
      'Managed from the same clean emtrc mobile app inbox',
    ],
    keywords: ['ai tools', 'optional', 'bolt-on', 'upgrade', 'front office'],
    relatedLink: { label: 'Explore the AI Front Office suite', to: '/ai-tools' },
  },
  {
    id: 'missed-call-text-back',
    category: 'AI Tools & Calls',
    question: 'How does 8-second missed-call text-back actually work?',
    answer:
      'When a potential London customer rings your business number and you cannot pick up — because your hands are covered in clippers, you are driving through Lewisham, or you are under a sink — Lead Catcher automatically sends them a polite, branded SMS within ~8 seconds.',
    deepDive:
      'Research across UK local trades shows over 62% of callers will NOT leave a voicemail; they immediately hit back on Google Maps and ring the next business down the list. An instant text saying "Sorry we missed your call at [Business Name] — we’re with a customer right now. Reply here with what you need or book directly: [link]" freezes their search, captures their job details, and drops their SMS reply straight into your phone.',
    keyPoints: [
      'Fires automatically inside ~8 seconds whenever a call goes unanswered',
      'Stops urgent callers from ringing the next competitor on Google Maps',
      'Captures job details and lets you reply cleanly between appointments',
    ],
    keywords: ['missed call', 'text back', 'sms', 'lead catcher', '8 seconds', 'voicemail'],
    relatedLink: { label: 'Explore Lead Catcher', to: '/services/lead-catcher' },
  },
  {
    id: 'ai-receptionist-transparency',
    category: 'AI Tools & Calls',
    question: 'Does the AI Receptionist sound robotic or try to trick callers?',
    answer:
      'Neither. It speaks with a calm, natural British voice and is always upfront and polite that it is your digital receptionist helping out while you are with a client or after closing hours.',
    deepDive:
      'We train it strictly on your real price guide, service area postcodes, parking notes, and calendar rules — never making up quotes or overpromising call-out windows. It collects the caller’s name, London postcode, and job summary, books available slots or flags urgent jobs, and immediately texts you a crisp bullet-point summary so you stay 100% in control.',
    keyPoints: [
      'Warm, natural British voice with honest, transparent digital assistant disclosure',
      'Quotes only your approved starting prices and checks your London postcode boundaries',
      'Instant WhatsApp/SMS call transcript and summary straight to your pocket',
    ],
    keywords: ['ai receptionist', 'voice', 'british', 'transparent', 'calls', 'after hours'],
    relatedLink: { label: 'Explore 24/7 AI Receptionist', to: '/services/ai-receptionist' },
  },
  {
    id: 'dmcc-reviews-legal',
    category: 'AI Tools & Calls',
    question: 'Are automated Google review requests legal under UK law?',
    answer:
      'Yes — when engineered properly. Under the UK Digital Markets, Competition and Consumers (DMCC) Act 2024, fake reviews, incentivised positive-only reviews, and selective "review gating" (routing happy clients to Google while hiding the link from unhappy ones) are strictly prohibited.',
    deepDive:
      'emtrc Review Engine is built around UK DMCC compliance from the ground up. Every completed customer receives the exact same polite, neutral SMS or WhatsApp invitation with your direct Google review link two hours after their visit — never gated, never bribed. Consistent authentic reviews are the single strongest long-term engine for Google Maps Top 3 dominance.',
    keyPoints: [
      '100% compliant with the UK Digital Markets, Competition and Consumers (DMCC) Act',
      'Zero review-gating — every real customer gets the same honest Google link',
      'Includes reply templates so you respond cleanly to both 5-star and tough feedback',
    ],
    keywords: ['dmcc', 'reviews', 'legal', 'uk law', 'review engine', 'gating', 'cma'],
    relatedLink: { label: 'Explore Review Engine', to: '/services/review-engine' },
  },
  {
    id: 'emtrc-app-how-it-works',
    category: 'AI Tools & Calls',
    question: 'Do I have to check a complicated laptop dashboard every day?',
    answer:
      'Never. The emtrc mobile companion app puts your missed-call texts, new website enquiries, Google review alerts, 1-tap photo uploads, and monthly call stats into one calm pocket screen designed for business owners who work on their feet.',
    deepDive:
      'Want to update Bank Holiday hours or upload two fresh job photos? Tap "Request Edit" right inside the app and our London studio updates your live site for you. You can try an interactive walkthrough of every screen right now on our App preview page.',
    keyPoints: [
      'Unified pocket feed for missed-call SMS, web enquiries, and new Google reviews',
      'Send photo swaps or price changes to our team in 10 seconds without a laptop',
      'Test the full interactive smartphone preview right now on our App page',
    ],
    keywords: ['app', 'mobile', 'dashboard', 'iphone', 'android', 'portal'],
    relatedLink: { label: 'Explore the emtrc Mobile App', to: '/app' },
  },

  // =========================================================================
  // 6. UK PSTN 2027 SWITCH-OFF (5 detailed entries)
  // =========================================================================
  {
    id: 'pstn-deadline',
    category: 'UK PSTN 2027 Switch-Off',
    question: 'What happens to my 020 landline on 31 January 2027?',
    answer:
      'Openreach and UK telecoms providers are permanently retiring the legacy copper Public Switched Telephone Network (PSTN) and ISDN lines on 31 January 2027. After switch-off, traditional analogue wall-socket landlines stop working as standard voice lines, and every UK business moves onto internet-based Digital Voice / Cloud VoIP.',
    deepDive:
      'Although 31 January 2027 is the national hard cut-off, many London telephone exchanges already have "Stop Sell" orders in place — meaning if you change provider, move shop premises, or suffer a copper line fault, you cannot order a new copper line. Planning your clean migration in 2026 prevents frantic Q4 queues and protects your established 020 number.',
    keyPoints: [
      '31 January 2027 is the confirmed UK-wide PSTN & ISDN copper retirement date',
      'Many London exchanges are already under Openreach "Stop Sell" restrictions',
      'Cloud VoIP gives you clearer HD audio plus mobile app ringing for less than copper line rental',
    ],
    keywords: ['pstn', '31 january 2027', 'copper', 'openreach', 'bt', 'landline', 'isdn'],
    relatedLink: { label: 'Read the complete London PSTN 2027 Guide', to: '/blog/uk-pstn-switch-off-31-january-2027-london-guide' },
  },
  {
    id: 'keep-020-number',
    category: 'UK PSTN 2027 Switch-Off',
    question: 'Can I keep my existing 020 London phone number?',
    answer:
      'Yes — you can keep your exact 020 7, 020 8, or 020 3 London number permanently, as long as you do NOT cancel your old copper line first! Cancelling a copper line before a formal port completes can disconnect your number back into the exchange pool.',
    deepDive:
      'When you move to Cloud VoIP, your new provider submits a regulated UK Letter of Authority (LoA) number port request while your old copper line stays live. Porting normally completes smoothly in 7 to 14 working days with zero dead-tone gap. Once live, your familiar 020 number rings simultaneously on your shop desk handset AND your smartphone app anywhere in London.',
    keyPoints: [
      'CRITICAL RULE: Never cancel your old copper line before your number port finishes',
      'Regulated UK LoA porting typically completes in 7–14 working days with zero outage',
      'Keep the exact 020 number printed on your van, shopfront sign, and Google Maps listing',
    ],
    keywords: ['020', 'keep number', 'porting', 'voip', 'mobile', 'loa', 'cancel'],
    relatedLink: { label: 'Explore Business Phone (Cloud VoIP)', to: '/services/business-phone' },
  },
  {
    id: 'alarms-card-machines',
    category: 'UK PSTN 2027 Switch-Off',
    question: 'Will the copper switch-off affect my shop card machine or burglar alarm?',
    answer:
      'Modern Wi-Fi and 4G SIM card readers (SumUp, Zettle, Dojo, Square, modern Worldpay) are completely unaffected. However, legacy PDQ terminals, monitored red-care burglar alarms, panic buttons, and lift emergency diallers plugged directly into BT telephone wall sockets WILL fail when copper turns off.',
    deepDive:
      'Do not wait for your telecoms provider to guess what is plugged into your walls. Take five minutes today to trace every cable coming out of your shop’s master phone socket and call your alarm monitoring company to confirm whether you need a dual-path IP/4G cellular dialler upgrade. Our free Training Centre has a printable shop-floor socket audit checklist ready to use.',
    keyPoints: [
      'Wi-Fi / 4G card machines (Dojo, Square, SumUp, Zettle) keep working unaffected',
      'Old copper-socket burglar alarms and lift phones MUST move to IP/4G diallers',
      'Check if your shop broadband is ADSL/FTTC tied to the copper phone line (upgrade to SoGEA/FTTP first)',
    ],
    keywords: ['card machine', 'pdq', 'burglar alarm', 'socket', 'copper', 'broadband', 'sogea'],
    relatedLink: { label: 'Run the free PSTN shop-floor audit checklist', to: '/training' },
  },
  {
    id: 'power-cut-broadband-backup',
    category: 'UK PSTN 2027 Switch-Off',
    question: 'What happens to my Cloud VoIP 020 calls if my shop Wi-Fi drops?',
    answer:
      'Unlike an old wall landline that simply rings out unanswered when your shop loses connection, Cloud VoIP automatically fails over your 020 calls straight onto your mobile phone over 4G/5G — so customers never hear a dead tone.',
    deepDive:
      'We also recommend pairing your router with an inexpensive £45 desktop mini-UPS battery backup if you rely on desk handsets at reception, while your emtrc mobile app acts as an instant zero-cost backup line on 4G/5G whenever you are out on jobs or experiencing a brief street broadband glitch.',
    keyPoints: [
      'Automatic instant failover routes 020 calls to your mobile on 4G/5G if shop Wi-Fi drops',
      'Optional £45 mini-UPS keeps your router & reception handset online through brief power blips',
      'Answer calls as your 020 London number from anywhere — home, van, or shop floor',
    ],
    keywords: ['wifi drops', 'power cut', 'failover', '4g', '5g', 'backup', 'voip reliability'],
    relatedLink: { label: 'Learn about Cloud VoIP routing', to: '/services/business-phone' },
  },
  {
    id: 'voip-waitlist',
    category: 'UK PSTN 2027 Switch-Off',
    question: 'When is emtrc Business Phone (Cloud VoIP) launching and what will it cost?',
    answer:
      'We are onboarding founding London businesses now ahead of the 31 January 2027 deadline, with straightforward single-user plans designed to sit cleanly below legacy BT copper business line rental while bundling opening-hours routing and missed-call text-back readiness.',
    deepDive:
      'Pre-registering takes 30 seconds and locks in priority 020 number porting plus a free pre-port copper/broadband check so you avoid the Q4 2026 Openreach migration bottleneck completely. Existing emtrc website clients receive priority onboarding and single-invoice billing.',
    keyPoints: [
      'Priority 020 number porting ahead of the Q4 2026 London migration rush',
      'Free pre-port check of your current BT/Openreach bill and broadband line type',
      'Integrates natively with emtrc Lead Catcher (8s missed-call SMS) and AI Receptionist',
    ],
    keywords: ['voip', 'business phone', 'coming soon', 'waitlist', 'pre-register', 'price'],
    relatedLink: { label: 'Pre-register for emtrc Business Phone', to: '/services/business-phone' },
  },
];
