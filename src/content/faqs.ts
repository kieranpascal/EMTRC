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
  // Free Demo & Launch
  {
    id: 'demo-catch',
    category: 'Free Demo & Launch',
    question: 'What is the catch with the free working demo?',
    answer:
      'There isn’t one. Send us your business name, London borough and trade, and within 2 working days we build a real working demo populated with your prices, hours and services so you can inspect it on your own phone. If you do not love it, you walk away owing nothing and we take the demo down cleanly.',
    keywords: ['free demo', 'catch', 'cost', '48 hours', 'working days'],
    relatedLink: { label: 'Request your free demo', to: '/free-demo' },
  },
  {
    id: 'launch-speed',
    category: 'Free Demo & Launch',
    question: 'How quickly can my new website actually go live?',
    answer:
      'Once you approve your free demo and any small tweaks, most Starter and Business sites go live on your own domain within 3 to 5 working days — including SSL security, professional email setup and Google Business Profile link-up.',
    keywords: ['launch', 'timeline', 'how long', 'days', 'go live'],
    relatedLink: { label: 'See how it works', to: '/how-it-works' },
  },
  {
    id: 'photos-needed',
    category: 'Free Demo & Launch',
    question: 'What if I don’t have professional photos yet?',
    answer:
      'We can start with crisp photos from your existing Google listing, Instagram or clean smartphone shots taken in daylight (our Training Centre shows you how in 5 minutes). Whenever you take newer photos, just WhatsApp them over and we swap them in under your monthly edits.',
    keywords: ['photos', 'images', 'photography', 'smartphone'],
    relatedLink: { label: '5-minute smartphone photo guide', to: '/training' },
  },
  {
    id: 'london-coverage',
    category: 'Free Demo & Launch',
    question: 'Do you cover all London boroughs or just Central London?',
    answer:
      'We work with independent businesses across all 32 London boroughs and the City of London — from Hackney, Stratford and Greenwich to Croydon, Kingston, Ealing, Barnet and Kensington.',
    keywords: ['boroughs', 'london', 'area', 'location', 'postcodes'],
  },

  // Pricing & Contracts
  {
    id: 'monthly-term',
    category: 'Pricing & Contracts',
    question: 'How does the 12-month minimum term work?',
    answer:
      'Monthly plans (Starter £39/mo, Business £69/mo, Growth £129/mo) have a straightforward 12-month minimum term because we absorb the bulk of the upfront build cost. After 12 months, your plan rolls month to month on just 30 days’ notice — never an auto-renewing multi-year lock-in.',
    keywords: ['contract', '12 months', 'cancel', 'notice', 'minimum term'],
    relatedLink: { label: 'Compare all plans', to: '/pricing' },
  },
  {
    id: 'annual-discount',
    category: 'Pricing & Contracts',
    question: 'Can I save money by paying annually?',
    answer:
      'Yes. Prepaying annually on Starter, Business or Growth gives you 2 full months free (you pay for 10 months instead of 12). You can toggle Monthly vs Annual directly on the Pricing page to see the exact numbers.',
    keywords: ['annual', 'discount', '2 months free', 'prepay'],
    relatedLink: { label: 'View annual savings', to: '/pricing' },
  },
  {
    id: 'one-off-option',
    category: 'Pricing & Contracts',
    question: 'What if I prefer a one-off build instead of a higher monthly plan?',
    answer:
      'We offer a One-off Build for £595 once, paired with a £25/month Care Plan covering Cloudflare hosting, SSL security, daily backups and uptime checks. Ad-hoc edits on the one-off plan are £45/hour billed in plain 15-minute increments.',
    keywords: ['one-off', '595', 'buy outright', 'care plan', 'hourly'],
    relatedLink: { label: 'See One-off Build details', to: '/pricing#one-off' },
  },
  {
    id: 'monthly-edits',
    category: 'Pricing & Contracts',
    question: 'What counts as monthly edits and how fast are they done?',
    answer:
      'Price list updates, seasonal opening hours, staff bios, new gallery photos, banners and fresh customer reviews all count. Starter includes 15 minutes/month, Business includes 30 minutes/month, and Growth includes 1 hour/month. Just email or WhatsApp us — routine updates usually go live inside 24 hours.',
    keywords: ['edits', 'updates', 'prices', 'hours', 'whatsapp', 'support'],
    relatedLink: { label: 'Explore Monthly Care & Edits', to: '/services/care-plan' },
  },

  // Domains & Email
  {
    id: 'domain-ownership',
    category: 'Domains & Email',
    question: 'Who owns my .co.uk or .com domain name?',
    answer:
      'You do — always. We register your domain in your business’s legal or trading name, never locked under our agency. If you ever choose to move elsewhere after your term, we release your Nominet IPS tag (.co.uk) or EPP transfer auth code (.com) within 5 working days with zero ransom fees.',
    keywords: ['domain', 'ownership', 'co.uk', 'nominet', 'transfer', 'auth code'],
    relatedLink: { label: 'Domains & Business Email', to: '/services/domains-email' },
  },
  {
    id: 'existing-domain',
    category: 'Domains & Email',
    question: 'I already own a domain name — can we use it?',
    answer:
      'Yes, easily. We connect your existing domain cleanly via DNS without disrupting your current email inbox, and if your old agency registered it for you, we help you verify ownership and transfer it back into your control.',
    keywords: ['existing domain', 'dns', 'transfer', 'keep domain'],
  },
  {
    id: 'business-email-included',
    category: 'Domains & Email',
    question: 'How does the @yourbusiness email address work?',
    answer:
      'Business and Growth plans include 1 standard business mailbox (5 GB Zoho Mail Lite) configured with SPF, DKIM and DMARC records so quotes land in customers’ inboxes instead of spam. Extra mailboxes are £3/user/month, or we can manage Google Workspace / Microsoft 365 at list price + £2/user/month.',
    keywords: ['email', 'mailbox', 'zoho', 'google workspace', 'microsoft 365', 'spf', 'dkim'],
  },
  {
    id: 'email-migration',
    category: 'Domains & Email',
    question: 'Can you move me off @gmail.com without losing old emails?',
    answer:
      'Yes. Our email setup and migration service starts from £49 one-off and sets up forwarding plus clean folder migration so every old client thread and quote stays searchable.',
    keywords: ['gmail', 'hotmail', 'migration', 'old emails'],
  },

  // Google Maps & Local SEO
  {
    id: 'maps-ranking-time',
    category: 'Google Maps & Local SEO',
    question: 'How long does it take to climb into the Google Maps Top 3?',
    answer:
      'Most independent London businesses see measurable gains in Maps tap-to-call clicks within 30 to 90 days once their site speed, primary/secondary Google categories, LocalBusiness schema and weekly review rhythm are aligned properly.',
    keywords: ['google maps', '3-pack', 'seo', 'ranking', 'how long'],
    relatedLink: { label: 'Explore Local SEO & AI Search', to: '/services/local-seo' },
  },
  {
    id: 'chatgpt-ai-search',
    category: 'Google Maps & Local SEO',
    question: 'How do you get my business recommended by ChatGPT and Apple Maps?',
    answer:
      'AI assistants cannot read blurry JPEG price lists or Instagram captions reliably. Every Business and Growth site ships with validated LocalBusiness Schema.org JSON-LD (exact trade subtype, London boroughs served, opening hours) plus clean HTML service pricing so AI engines can verify and cite you.',
    keywords: ['chatgpt', 'ai search', 'schema', 'json-ld', 'apple maps', 'siri'],
    relatedLink: { label: 'Read our AI Search article', to: '/blog/chatgpt-apple-maps-ai-search-local-businesses' },
  },
  {
    id: 'local-area-pages',
    category: 'Google Maps & Local SEO',
    question: 'What are the 3 local area pages on the Growth plan?',
    answer:
      'If you serve multiple neighbouring London boroughs (for example Greenwich, Blackheath and Lewisham), dedicated local area pages let you rank specifically for searches in each postcode without stuffing keywords awkwardly onto your homepage.',
    keywords: ['local area pages', 'boroughs', 'growth plan', 'seo'],
  },
  {
    id: 'analytics-privacy',
    category: 'Google Maps & Local SEO',
    question: 'Do you track visitors with intrusive cookies?',
    answer:
      'No. We use lightweight, cookieless privacy-friendly analytics that measure what actually matters — page visits, tap-to-call clicks, booking clicks and form enquiries — without annoying cookie pop-ups slowing down mobile visitors.',
    keywords: ['cookies', 'analytics', 'gdpr', 'privacy', 'reports'],
  },

  // AI Tools & Calls
  {
    id: 'ai-tools-required',
    category: 'AI Tools & Calls',
    question: 'Do I have to buy AI tools when I start my website?',
    answer:
      'Not at all. Most clients start with the Business website plan (£69/month) and add Review Engine (£39/month), Lead Catcher (£79/month) or AI Receptionist (£149/month) later once they want to capture missed calls or accelerate reviews.',
    keywords: ['ai tools', 'optional', 'bolt-on', 'upgrade'],
    relatedLink: { label: 'Explore AI Tools', to: '/ai-tools' },
  },
  {
    id: 'missed-call-text-back',
    category: 'AI Tools & Calls',
    question: 'How does 8-second missed-call text-back actually work?',
    answer:
      'Whenever you cannot answer an incoming call (hands full with a client, driving or on a ladder), Lead Catcher immediately sends the caller a polite branded SMS within ~8 seconds asking how you can help or sharing your booking link. Their reply lands straight on your phone.',
    keywords: ['missed call', 'text back', 'sms', 'lead catcher', '8 seconds'],
    relatedLink: { label: 'Explore Lead Catcher', to: '/services/lead-catcher' },
  },
  {
    id: 'ai-receptionist-transparency',
    category: 'AI Tools & Calls',
    question: 'Does the AI Receptionist sound robotic or deceive callers?',
    answer:
      'Neither. It uses a calm, natural British voice and is always transparent that it is your digital receptionist assisting while you are busy. It quotes your standard prices, checks London postcode coverage, books calendar slots and texts you a clean call summary.',
    keywords: ['ai receptionist', 'voice', 'british', 'transparent', 'calls'],
    relatedLink: { label: 'Explore AI Receptionist', to: '/services/ai-receptionist' },
  },
  {
    id: 'dmcc-reviews-legal',
    category: 'AI Tools & Calls',
    question: 'Are automated Google review requests legal under UK law?',
    answer:
      'Yes — when done cleanly. Under the UK Digital Markets, Competition and Consumers (DMCC) Act, fake reviews and selective "review gating" (hiding the Google link from unhappy clients) are prohibited. Our Review Engine sends the exact same polite invitation to every completed customer.',
    keywords: ['dmcc', 'reviews', 'legal', 'uk law', 'review engine'],
    relatedLink: { label: 'Explore Review Engine', to: '/services/review-engine' },
  },

  // UK PSTN 2027 Switch-Off
  {
    id: 'pstn-deadline',
    category: 'UK PSTN 2027 Switch-Off',
    question: 'What happens to my 020 landline on 31 January 2027?',
    answer:
      'Openreach is retiring the legacy UK copper Public Switched Telephone Network (PSTN) on 31 January 2027. Traditional copper wall-socket landlines will stop working as standard voice lines, and business calls move onto internet-based Cloud VoIP.',
    keywords: ['pstn', '31 january 2027', 'copper', 'openreach', 'bt', 'landline'],
    relatedLink: { label: 'Read the PSTN 2027 guide', to: '/blog/uk-pstn-switch-off-31-january-2027-london-guide' },
  },
  {
    id: 'keep-020-number',
    category: 'UK PSTN 2027 Switch-Off',
    question: 'Can I keep my existing 020 London phone number?',
    answer:
      'Yes — as long as you do NOT cancel your old copper line before porting! Your new Cloud VoIP provider submits a formal number port request while the old line stays live. Once the port finishes (usually 7–14 working days), you keep the exact same 020 number on your mobile app and desk handset.',
    keywords: ['020', 'keep number', 'porting', 'voip', 'mobile'],
    relatedLink: { label: 'Business Phone (Cloud VoIP)', to: '/services/business-phone' },
  },
  {
    id: 'alarms-card-machines',
    category: 'UK PSTN 2027 Switch-Off',
    question: 'Will the copper switch-off affect my shop card machine or alarm?',
    answer:
      'Modern Wi-Fi/4G card machines are unaffected, but older PDQ terminals and monitored burglar alarms plugged into telephone wall sockets may stop dialling out. Our Training Centre includes a 5-minute shop-floor socket check to catch these early.',
    keywords: ['card machine', 'pdq', 'burglar alarm', 'socket', 'copper'],
    relatedLink: { label: 'Run the PSTN audit checklist', to: '/training' },
  },
  {
    id: 'voip-waitlist',
    category: 'UK PSTN 2027 Switch-Off',
    question: 'When is emtrc Business Phone (Cloud VoIP) launching?',
    answer:
      'We are onboarding founding London businesses now ahead of the 31 January 2027 switch-off. Pre-register on our Business Phone page or mention it in your free demo request to lock in priority 020 porting.',
    keywords: ['voip', 'business phone', 'coming soon', 'waitlist', 'pre-register'],
    relatedLink: { label: 'Pre-register for Business Phone', to: '/services/business-phone' },
  },
];
