export type BlogCategory =
  | 'Websites & Speed'
  | 'Google Maps & AI Search'
  | 'UK Phones & PSTN 2027'
  | 'Reviews & Lead Capture';

export interface BlogArticleSection {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
}

export interface BlogArticle {
  slug: string;
  category: BlogCategory;
  shortTag: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  readTime: string;
  author: string;
  image: string;
  imageAlt: string;
  keyTakeaways: readonly string[];
  sections: readonly BlogArticleSection[];
  relatedGuideId: string;
  relatedServiceSlug: string;
}

export const BLOG_CATEGORIES: readonly BlogCategory[] = [
  'Websites & Speed',
  'Google Maps & AI Search',
  'UK Phones & PSTN 2027',
  'Reviews & Lead Capture',
] as const;

export const BLOG_ARTICLES: readonly BlogArticle[] = [
  {
    slug: 'uk-pstn-switch-off-31-january-2027-london-guide',
    category: 'UK Phones & PSTN 2027',
    shortTag: '31 Jan 2027',
    title: '31 January 2027: What Actually Happens to Your 020 Copper Landline (And How to Keep Your Number)',
    excerpt:
      'Openreach is retiring legacy UK copper phone lines on 31 January 2027. Here is the plain-English checklist for London shops, salons and trades so you keep your 020 number and avoid £35/month emergency charges.',
    publishedDate: 'November 2026',
    readTime: '5 min read',
    author: 'emtrc Editorial · London',
    image: '/src/assets/images/emtrc_service_voip_office_1795375919862.jpg',
    imageAlt: 'London shop counter with modern VoIP business handset beside Victorian sash window',
    keyTakeaways: [
      'Old copper PSTN landlines retire across the UK on 31 January 2027 — voice calls move onto internet-based Cloud VoIP.',
      'Never cancel your old BT/Openreach landline before your 020 number finishes porting, or you risk losing it permanently.',
      'Check older card machines (PDQ) and monitored shop burglar alarms that plug into wall phone sockets before switching.',
    ],
    sections: [
      {
        heading: 'Why 31 January 2027 matters for independent London shops',
        paragraphs: [
          'For decades, almost every London barber, salon, café and trade office relied on the copper Public Switched Telephone Network (PSTN) plugged into a master wall socket. Openreach and UK telecoms providers have confirmed that legacy PSTN voice services switch off permanently on 31 January 2027.',
          'For most high-street owners, the risk is not technical complexity — it is leaving the switch until the final quarter of 2026, when porting queues lengthen and legacy providers push customers onto expensive interim Emergency Voice Access tariffs.',
        ],
      },
      {
        heading: 'The golden rule: keep your 020 number alive while porting',
        paragraphs: [
          'Your 020 number is printed on shop signage, van livery, business cards, invoices and Google Maps. The single costliest mistake small firms make is ringing their old provider to cancel the copper line first.',
          'Once a line is ceased, the number can be returned to the telecoms pool and become unrecoverable. Instead, your new Cloud VoIP provider submits a formal number port request while your old line remains live — once the port completes, the old copper service closes cleanly.',
        ],
        bullets: [
          'Grab a recent phone bill showing your exact account name, address and 020 number.',
          'Confirm whether your broadband runs on the same copper line — you may need SoGEA or full-fibre broadband first.',
          'Allow 7 to 14 working days for a clean business number port with zero dead-tone gaps.',
        ],
      },
      {
        heading: 'Two hidden shop-floor devices to check this week',
        paragraphs: [
          'Walk around your counter and check what is physically plugged into telephone wall sockets. Older PDQ card terminals and monitored intruder alarms sometimes still dial out over copper lines.',
          'Most modern card machines already run over Wi-Fi with 4G SIM backup, and alarm companies offer simple GSM/4G dialler upgrades — checking now avoids an awkward Saturday morning outage.',
        ],
      },
      {
        heading: 'The upside: one 020 number that works properly on your mobile',
        paragraphs: [
          'Moving off copper is actually a big upgrade for small teams. With Cloud VoIP, your 020 London number can ring a desk phone at reception and your mobile app simultaneously, follow proper opening hours (so work stops interrupting dinner at 9pm), and connect directly to missed-call text-back or a 24/7 AI receptionist.',
        ],
      },
    ],
    relatedGuideId: 'pstn-2027',
    relatedServiceSlug: 'business-phone',
  },
  {
    slug: 'why-1-in-3-london-shops-lose-google-maps-calls',
    category: 'Websites & Speed',
    shortTag: '1 in 3',
    title: 'Why 1 in 3 London High-Street Businesses Lose Calls Before the Phone Even Rings',
    excerpt:
      'Neighbours decide whether to call you in ten seconds on Google Maps. We broke down the five mobile conversion leaks costing London barbers, salons and trades real bookings every week.',
    publishedDate: 'November 2026',
    readTime: '6 min read',
    author: 'emtrc Editorial · London',
    image: '/src/assets/images/emtrc_hero_london_highstreet_1795374294553.jpg',
    imageAlt: 'Independent London high street barber shop and neighbourhood café in morning sun',
    keyTakeaways: [
      'Over 80% of local “near me” searches in London happen on a mobile phone while walking or between errands.',
      'Hiding prices, slow 6-second page loads, and Instagram-only links quietly push buyers to the next listing down.',
      'Four fundamentals fix 90% of leaks: live open status, upfront starting prices, tap-to-call above the fold and sub-2-second speed.',
    ],
    sections: [
      {
        heading: 'The ten-second mobile test on every London high street',
        paragraphs: [
          'Picture someone standing outside Hackney Central with a broken boiler or looking for a same-day skin fade. They type into Google Maps, tap the first three results, and scan for three exact facts: Are you open right now? Roughly what do you charge? Can I tap to call or book in two seconds?',
          'If your Google listing has no website — or links to an Instagram grid that asks them to log in — a huge slice of ready-to-buy customers simply press Back and call the competitor below you.',
        ],
      },
      {
        heading: 'Five silent leaks we see on London small-business sites',
        paragraphs: [
          'Even businesses that already paid £1,500+ for a site often suffer from avoidable friction that suppresses calls:',
        ],
        bullets: [
          'PDF menus or price lists that force mobile visitors to download a 4 MB file and pinch-to-zoom.',
          'Slow WordPress themes loaded with 20 plugins taking 5+ seconds on London 4G.',
          'No clear borough or postcode coverage — leaving trades customers unsure whether you travel to their area.',
          'Personal @gmail.com contact details instead of a trustworthy @yourbusiness address.',
          'Out-of-date opening hours that disagree with Google Maps.',
        ],
      },
      {
        heading: 'What wins calls instead (and costs less than a flat white a day)',
        paragraphs: [
          'You do not need animated 3D graphics or a 20-page corporate brochure. You need crisp real photography of your work, transparent prices in readable HTML, live UK opening hours, real Google reviews and an unmistakable call or booking button right where the thumb sits.',
          'That is exactly why every emtrc site starts with a free working demo built around your business in 2 working days — so you can test the 10-second mobile check on your own phone before spending a penny.',
        ],
      },
    ],
    relatedGuideId: 'website-checklist',
    relatedServiceSlug: 'websites',
  },
  {
    slug: 'how-to-rank-top-3-google-maps-london-borough',
    category: 'Google Maps & AI Search',
    shortTag: '3-Pack',
    title: 'How London Barbers, Salons and Trades Win the Google Maps 3-Pack in 90 Days',
    excerpt:
      'Forget £600/month SEO mystery retainers. These five practical Google Business Profile and website fundamentals drive the biggest local Maps jump in competitive London postcodes.',
    publishedDate: 'October 2026',
    readTime: '7 min read',
    author: 'emtrc Editorial · London',
    image: '/src/assets/images/emtrc_blog_maps_phone_1795375920087.jpg',
    imageAlt: 'Smartphone beside ceramic coffee cup and open planning notebook on travertine',
    keyTakeaways: [
      'Your primary Google Business Profile category is the single highest-leverage Maps ranking setting.',
      'Steady weekly reviews (2–4 per week) beat a one-off burst of 20 reviews followed by six months of silence.',
      'Matching NAP (Name, Address, Phone) and borough-specific service pages reinforce your local relevance.',
    ],
    sections: [
      {
        heading: 'Why the top three Maps slots take almost all the calls',
        paragraphs: [
          'When a Londoner searches “plumber Greenwich” or “balayage South Kensington”, Google shows a map with exactly three businesses above the fold. Position four sits behind a “More places” tap that most hurried searchers never click.',
          'The good news: local Maps rankings are far less secretive than SEO agencies pretend. Google weighs three plain signals — relevance (what you do), distance (where you serve) and prominence (reviews, website quality and consistent local mentions).',
        ],
      },
      {
        heading: 'The 5-point 90-day London Maps sprint',
        paragraphs: [
          'Run through these five steps in order before spending a penny on paid ads:',
        ],
        bullets: [
          'Audit your primary and secondary Google categories so they match exact services (e.g. “Heating contractor” alongside “Plumber”).',
          'Fill out the Google Services section with real London descriptions and starting prices.',
          'Add 3 genuine real-world photos a fortnight — clean shopfront, team at work, finished cuts or neat pipework.',
          'Set up a steady, DMCC-compliant weekly review ask (never buy reviews or gate unhappy customers).',
          'Link your profile to a fast mobile website with matching LocalBusiness Schema.org JSON-LD and clear borough coverage.',
        ],
      },
      {
        heading: 'Measure calls, not vanity impressions',
        paragraphs: [
          'Rankings only matter if your diary fills up. Track three concrete numbers each month: Google Maps tap-to-call clicks, website call/booking clicks, and directions requests. Inside 90 days of steady execution, the trend line becomes unmistakable.',
        ],
      },
    ],
    relatedGuideId: 'maps-ai-search',
    relatedServiceSlug: 'local-seo',
  },
  {
    slug: 'chatgpt-apple-maps-ai-search-local-businesses',
    category: 'Google Maps & AI Search',
    shortTag: 'AI Search',
    title: 'Why ChatGPT Only Recommends 1% of Local London Businesses — And How Structured Data Fixes It',
    excerpt:
      'More residents now ask ChatGPT, Gemini and Siri for local recommendations. Here is why most London high-street websites are invisible to AI engines and the four fixes that get you cited.',
    publishedDate: 'October 2026',
    readTime: '6 min read',
    author: 'emtrc Editorial · London',
    image: '/src/assets/images/emtrc_editorial_desk_craft_1795374293989.jpg',
    imageAlt: 'Studio walnut desk with matte laptop, espresso and graph notebook',
    keyTakeaways: [
      'AI assistants cannot guess your prices from an image or Instagram reel — they cite plain HTML text and Schema.org data.',
      'Exact Schema subtypes (BarberShop, BeautySalon, Plumber, Electrician, CafeOrCoffeeShop) tell AI exactly who you are.',
      'Recent, descriptive Google reviews mentioning specific treatments or repairs dramatically increase AI citations.',
    ],
    sections: [
      {
        heading: 'How local search is quietly shifting in London',
        paragraphs: [
          'Five years ago, local discovery meant ten blue links on Google. Today, commuters and homeowners increasingly type conversational prompts straight into ChatGPT, Gemini or Apple Intelligence: “Find a reliable Gas Safe boiler engineer near Blackheath who publishes call-out prices.”',
          'When AI builds its shortlist of two or three recommended businesses, it looks for structured, verifiable facts it can quote confidently without hallucinating.',
        ],
      },
      {
        heading: 'Why 98% of local sites get skipped by AI assistants',
        paragraphs: [
          'If your price list lives inside a scanned JPEG menu, your opening hours are only on Instagram, and your website has zero structured JSON-LD markup, AI crawlers skip straight past you to the one competitor whose services, postcodes and reviews are crystal clear in code.',
        ],
        bullets: [
          'Publish services and starting prices in clean HTML tables or lists — never trapped in images.',
          'Include LocalBusiness JSON-LD with exact subtype, areaServed boroughs, openingHoursSpecification and contact links.',
          'Reply naturally to Google reviews mentioning the actual service performed (“Glad we got your E10 boiler pressure sorted”).',
          'Keep Apple Business Connect and Google Business Profile synced with identical details.',
        ],
      },
      {
        heading: 'Baked into every emtrc build automatically',
        paragraphs: [
          'You should never have to learn JSON-LD to run a barbershop or heating firm. Every emtrc Business and Growth site ships with validated LocalBusiness Schema, clean semantic headings and crawlable service pricing right out of the box.',
        ],
      },
    ],
    relatedGuideId: 'maps-ai-search',
    relatedServiceSlug: 'local-seo',
  },
  {
    slug: 'missed-call-text-back-maths-london-trades',
    category: 'Reviews & Lead Capture',
    shortTag: '8 Seconds',
    title: 'The Missed-Call Maths: What 4 Unanswered Calls a Week Actually Cost a London Plumber or Salon',
    excerpt:
      'Most owners underestimate missed calls because callers rarely leave voicemails. Here is the straightforward London maths behind automatic 8-second missed-call text-back.',
    publishedDate: 'September 2026',
    readTime: '4 min read',
    author: 'emtrc Editorial · London',
    image: '/src/assets/images/emtrc_editorial_phone_studio_1795374293354.jpg',
    imageAlt: 'London reception desk with matte black wireless business phone and brass lamp',
    keyTakeaways: [
      'Nearly 4 in 5 local callers hang up on voicemail and immediately call the next business on Google Maps.',
      'Even 4 missed calls a week at a £120 average job value equals £1,900+/month walking straight to competitors.',
      'An automatic polite SMS sent within 8 seconds keeps the caller engaged until you finish the job in front of you.',
    ],
    sections: [
      {
        heading: 'Why voicemail quietly costs thousands',
        paragraphs: [
          'Think about what you did the last time you rang a tradesperson or salon and hit voicemail. Unless they were personally recommended by a close friend, you probably hung up and tapped the next 4.9-star listing on Google Maps.',
          'Because most callers never leave a message, business owners only see a handful of unknown missed numbers at 6pm — and rarely realise how many ready-to-book jobs slipped away.',
        ],
      },
      {
        heading: 'Simple London back-of-the-envelope maths',
        paragraphs: [
          'Take a typical London plumber, electrician or end-of-tenancy cleaner with an average job value of £180. Miss just 4 genuine new-customer calls a week while working or driving — 16 a month. Even if only half of those would have booked, that is £1,440 a month in lost work.',
          'Now compare that to Lead Catcher (£79/month): the moment a call goes unanswered, the caller receives a calm, polite SMS within 8 seconds asking how you can help or linking straight to your booking page. Rescuing a single job pays for the service two times over.',
        ],
      },
      {
        heading: 'When to step up to a 24/7 AI Receptionist',
        paragraphs: [
          'For solo barbers, cafés and smaller shops, missed-call text-back + website chat (£79/month) is usually the sweet spot. Once you handle high-value emergency call-outs or 40+ incoming calls a week, stepping up to our 24/7 British AI Receptionist (£149/month) answers calls live and books slots straight into your calendar.',
        ],
      },
    ],
    relatedGuideId: 'website-checklist',
    relatedServiceSlug: 'lead-catcher',
  },
  {
    slug: 'domain-ownership-trap-uk-small-business',
    category: 'Websites & Speed',
    shortTag: 'Ownership',
    title: 'Never Let an Agency Register Your Domain in Their Name: The UK Small-Business Ownership Checklist',
    excerpt:
      'Every month we rescue London shops whose old web developer or directory owns their .co.uk domain and stopped replying. Five minutes of checking protects your business name for good.',
    publishedDate: 'September 2026',
    readTime: '5 min read',
    author: 'emtrc Editorial · London',
    image: '/src/assets/images/emtrc_editorial_guides_print_1795374293225.jpg',
    imageAlt: 'Printed linen business playbooks beside spectacles and espresso on stone desk',
    keyTakeaways: [
      'Your .co.uk or .com domain is a core business asset — it must be registered under your legal or trading name.',
      'For .co.uk domains, Nominet controls ownership via an IPS tag; for .com domains, you need an EPP/Auth transfer code.',
      'Ask every agency one question in writing before signing: “If I leave, how fast do you release my domain?”',
    ],
    sections: [
      {
        heading: 'The most common rescue job on the London high street',
        paragraphs: [
          'A shop owner signs up with a bundled directory package or a mate’s cousin five years ago. The site grows stale, prices are wrong, and the owner decides to upgrade — only to discover their .co.uk domain was registered under the old supplier’s company name, with a cancellation penalty or radio silence.',
          'Losing your domain means losing your business email, breaking every Google Maps link, and reprinting shop signs and menus.',
        ],
      },
      {
        heading: 'Four checks every owner should make today',
        paragraphs: [
          'Spend five minutes confirming you genuinely control your own shopfront online:',
        ],
        bullets: [
          'Verify the registrant name on your domain receipt is your business or your own name — not your developer’s agency.',
          'Check who receives renewal reminder emails (ideally your own email address, never an agency-only inbox).',
          'Confirm your contract states a clear handover timeline for Nominet IPS tags (.co.uk) or EPP auth codes (.com).',
          'Ensure your Google Business Profile has your own Google account listed as Primary Owner — never only as Manager.',
        ],
      },
      {
        heading: 'Our written promise at emtrc',
        paragraphs: [
          'At emtrc, your domain is registered in your business name from day one. If you ever decide to move on after your term, we hand over your transfer codes within 5 working days with zero ransom fees. Making leaving easy is why our clients feel safe staying.',
        ],
      },
    ],
    relatedGuideId: 'website-checklist',
    relatedServiceSlug: 'domains-email',
  },
];

export function getBlogArticleBySlug(slug: string | undefined): BlogArticle | undefined {
  if (!slug) return undefined;
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}
