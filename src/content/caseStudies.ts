export interface CaseStudyMetric {
  label: string;
  before: string;
  after: string;
}

export interface CaseStudy {
  slug: string;
  businessName: string;
  trade: 'Barber Shop' | 'Plumber & Heating' | 'Hair & Beauty' | 'Local Cleaner' | 'Neighbourhood Café';
  borough: string;
  postcode: string;
  planUsed: string;
  turnaround: string;
  headline: string;
  summary: string;
  heroStat: string;
  heroStatLabel: string;
  image: string;
  imageAlt: string;
  demoPresetId: string;
  challenge: string;
  whatWeBuilt: readonly string[];
  outcome: string;
  metrics: readonly CaseStudyMetric[];
  ownerNote: string;
}

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: 'kingsland-blade-hackney',
    businessName: 'Kingsland Blade & Fade',
    trade: 'Barber Shop',
    borough: 'Hackney',
    postcode: 'E8',
    planUsed: 'Business (£69/mo) + Review Engine',
    turnaround: '44 hours to live demo',
    headline: 'Replacing an Instagram-only link with a 0.9-second booking shopfront in Hackney E8.',
    summary:
      'Walk-in and commuter clients searching Google Maps in Dalston could not see fade prices without logging into Instagram. We built a dark editorial 5-page site wired directly to Fresha and tap-to-call.',
    heroStat: '0.9s',
    heroStatLabel: 'Mobile load speed on 4G (down from 6.1s)',
    image: '/src/assets/images/emtrc_london_barber_craft_1795422463841.jpg',
    imageAlt: 'East London barber finishing a precision skin fade inside a dark tiled studio',
    demoPresetId: 'barber-bold-hackney',
    challenge:
      'A 4-chair independent shop on Kingsland High Street had strong word-of-mouth but sent all Google Maps traffic to an Instagram grid. First-time residents could not check skin fade prices, wait times or late-Thursday hours on mobile.',
    whatWeBuilt: [
      'Sub-second mobile website with live London open/closed status indicator in the header.',
      'Transparent HTML service & price list (Skin Fade, Beard Trim, Hot Towel Shave) — zero PDF downloads.',
      'Direct one-tap Fresha chair booking + click-to-call buttons right where the thumb lands.',
      'BarberShop Schema.org JSON-LD synced identically with Google Business Profile.',
    ],
    outcome:
      'Every new customer searching "barber Hackney E8" lands on a crisp, high-trust shopfront with clear prices and zero login wall — turning casual Maps taps into booked Thursday and Saturday chairs.',
    metrics: [
      { label: 'Mobile load time', before: 'Instagram login wall', after: '0.9 seconds' },
      { label: 'Lighthouse Mobile score', before: 'N/A', after: '99 / 100' },
      { label: 'Tap-to-book steps', before: '5 taps + login', after: '1 tap to Fresha' },
      { label: 'Monthly edits handled', before: 'Owner DIY', after: 'Done in < 24 hrs' },
    ],
    ownerNote:
      'Representative London workflow based on our live Kingsland Blade & Fade template — click below to inspect the live interactive 5-page build.',
  },
  {
    slug: 'blackheath-heating-greenwich',
    businessName: 'Blackheath Heating & Electrical',
    trade: 'Plumber & Heating',
    borough: 'Greenwich',
    postcode: 'SE10',
    planUsed: 'Growth (£129/mo) + Lead Catcher',
    turnaround: '48 hours to live demo',
    headline: 'Capturing emergency boiler calls across SE10 & SE3 even while under a sink.',
    summary:
      'Independent heating engineers lose thousands every winter when calls ring out to voicemail on site. We paired a high-trust trade site with 8-second missed-call text-back and clear postcode pages.',
    heroStat: '8 sec',
    heroStatLabel: 'Automatic SMS response to every missed call',
    image: '/src/assets/images/emtrc_london_plumber_van_1795422464729.jpg',
    imageAlt: 'London heating engineer inspecting precision copper pipework beside a Victorian sash window',
    demoPresetId: 'trades-bold-greenwich',
    challenge:
      'Homeowners with no heating in Blackheath or Greenwich ring the first Gas Safe engineer on Google Maps. When calls went to voicemail during an installation, 4 in 5 callers immediately rang the next listing down.',
    whatWeBuilt: [
      'High-contrast trade website displaying Gas Safe & NICEIC registration badges above the fold.',
      'Upfront transparent call-out, boiler service and landlord CP12 pricing in plain HTML.',
      'Three dedicated local coverage blocks for Greenwich SE10, Blackheath SE3 and Lewisham SE13.',
      'Lead Catcher 8-second missed-call text-back asking for the caller’s postcode and boiler fault.',
    ],
    outcome:
      'Instead of losing urgent winter call-outs to voicemail, enquiries are greeted politely within eight seconds and arrive with the customer’s postcode ready to confirm.',
    metrics: [
      { label: 'Missed call reply speed', before: 'Voicemail (ignored)', after: '8 seconds via SMS' },
      { label: 'Call-out price clarity', before: 'Hidden / phone only', after: 'Published upfront' },
      { label: 'Local postcode pages', before: '0 area pages', after: '3 SE London zones' },
      { label: 'Business email', before: '@gmail.com', after: 'office@blackheath…' },
    ],
    ownerNote:
      'Representative SE London trade build — inspect the full live Blackheath Heating & Electrical site with emergency call-out strip.',
  },
  {
    slug: 'linden-silk-kensington',
    businessName: 'Linden & Silk',
    trade: 'Hair & Beauty',
    borough: 'Kensington & Chelsea',
    postcode: 'SW7',
    planUsed: 'Business (£69/mo)',
    turnaround: '2 working days',
    headline: 'A calm, gallery-grade treatment menu for a South Kensington hair and nail studio.',
    summary:
      'Replacing a cluttered, slow WordPress theme that took 5.8 seconds to load with an understated editorial treatment menu covering balayage, BIAB nails and bridal styling.',
    heroStat: '98/100',
    heroStatLabel: 'Mobile performance score with full gallery',
    image: '/src/assets/images/salon_warm_studio_1795370824298.jpg',
    imageAlt: 'Sunlit London hair and beauty salon interior with arched mirrors and oak styling chairs',
    demoPresetId: 'salon-elegant-kensington',
    challenge:
      'High-value colour and balayage clients in SW7 judge a salon’s craft immediately by its website. The previous WordPress site required pinching into a blurry PDF menu and broke whenever plugins auto-updated.',
    whatWeBuilt: [
      'Categorised, searchable treatment menu for Cut & Finish, Colour & Balayage, and BIAB Nails.',
      'Lazy-loaded modern image gallery showcasing authentic colour work without slowing mobile 4G.',
      'Zero-plugin static architecture on Cloudflare — zero broken updates or security warnings.',
      'Same-day seasonal price and stylist rota updates via one WhatsApp message.',
    ],
    outcome:
      'Clients browse exact treatment durations and starting prices effortlessly on their commute and book directly without ringing reception for basic pricing.',
    metrics: [
      { label: 'Menu format', before: '4.2 MB PDF download', after: 'Instant HTML menu' },
      { label: 'Monthly maintenance', before: 'Broken WP plugins', after: 'Zero downtime' },
      { label: 'Price update speed', before: '2 weeks waiting', after: 'Same day via text' },
      { label: 'Domain ownership', before: 'Old agency account', after: 'Client’s legal name' },
    ],
    ownerNote:
      'Representative West London salon architecture — preview all five pages live in our Work gallery.',
  },
  {
    slug: 'battersea-bright-wandsworth',
    businessName: 'Battersea Bright Cleaning',
    trade: 'Local Cleaner',
    borough: 'Wandsworth',
    postcode: 'SW11',
    planUsed: 'Business (£69/mo)',
    turnaround: '48 hours to live demo',
    headline: 'Pre-qualifying end-of-tenancy cleaning enquiries across SW11 with a built-in postcode form.',
    summary:
      'Tenants and landlords moving out in Battersea and Clapham wanted instant clarity on 1-bed to 4-bed pricing. We built a crisp minimal site with a tailored bedroom & add-on quote form.',
    heroStat: '2 mins',
    heroStatLabel: 'From Google search to structured quote enquiry',
    image: '/src/assets/images/cleaner_kitchen_sparkle_1795373182615.jpg',
    imageAlt: 'Spotless modern London flat kitchen following an end-of-tenancy clean',
    demoPresetId: 'cleaner-minimal-wandsworth',
    challenge:
      'Back-and-forth WhatsApp messages asking "how many bedrooms?", "do you need oven cleaning?" and "which postcode?" wasted two hours every evening.',
    whatWeBuilt: [
      'Structured postcode, property size and oven/carpet add-on quote form right on the page.',
      'Transparent starting rates for regular domestic cleans and deposit-back end-of-tenancy cleans.',
      'Clear Battersea, Clapham Junction, Nine Elms and Wandsworth borough coverage.',
      'Professional @batterseabright.co.uk business inbox configured with SPF/DKIM/DMARC.',
    ],
    outcome:
      'Every enquiry lands in the owner’s inbox with property size, service type and postcode already captured — cutting out tyre-kickers and speeding up confirmations.',
    metrics: [
      { label: 'Enquiry completeness', before: '6 back-and-forth texts', after: '1 structured form' },
      { label: 'Email deliverability', before: 'Spam-folder risk', after: 'Full SPF/DKIM auth' },
      { label: 'Mobile score', before: '61 / 100', after: '99 / 100' },
      { label: 'Setup cost', before: '£1,800 agency quote', after: '£199 + £69/mo' },
    ],
    ownerNote:
      'Representative South West London cleaning workflow — test the interactive postcode quote form in the live demo.',
  },
  {
    slug: 'bellenden-roastery-peckham',
    businessName: 'Bellenden Roastery & Bakery',
    trade: 'Neighbourhood Café',
    borough: 'Southwark',
    postcode: 'SE15',
    planUsed: 'Business (£69/mo) + VoIP Ready',
    turnaround: '48 hours to live demo',
    headline: 'Putting morning sourdough, dietary tags and real opening hours front and centre in SE15.',
    summary:
      'Independent London cafés win weekend brunch traffic when locals can scan vegan, gluten-free and pastry options cleanly on mobile before walking over.',
    heroStat: '100%',
    heroStatLabel: 'Crawled by Google Maps & AI search assistants',
    image: '/src/assets/images/emtrc_london_cafe_owner_1795422462836.jpg',
    imageAlt: 'Independent London neighbourhood café owner pouring a flat white beside dark timber windows',
    demoPresetId: 'cafe-elegant-southwark',
    challenge:
      'Weekend visitors searching "sourdough brunch Peckham" landed on outdated third-party review pages with wrong Sunday closing times and zero allergen info.',
    whatWeBuilt: [
      'Editorial daily coffee, bakery and brunch menu with crisp V / VG / GF dietary indicators.',
      'Live UK opening hours synced with Google Business Profile and CafeOrCoffeeShop Schema.',
      'Warm natural-light food photography optimised in modern formats with zero layout shift.',
      'PSTN 2027 readiness audit keeping the café’s 020 number alive on Cloud VoIP.',
    ],
    outcome:
      'Locals and weekend visitors check live Sunday hours and dietary menus in seconds — driving steady footfall without third-party delivery commission fees.',
    metrics: [
      { label: 'Allergen clarity', before: 'Not listed online', after: 'V / VG / GF tags' },
      { label: 'Sunday hour accuracy', before: 'Conflicting listings', after: 'Single source of truth' },
      { label: 'AI search visibility', before: 'Unstructured PDF', after: 'CafeOrCoffeeShop LD' },
      { label: '020 phone readiness', before: 'Legacy copper line', after: 'PSTN 2027 ready' },
    ],
    ownerNote:
      'Representative SE15 café & bakery build — inspect the full live Bellenden Roastery demo.',
  },
  {
    slug: 'regent-park-electrical-camden',
    businessName: 'Regent Park Electrical',
    trade: 'Plumber & Heating',
    borough: 'Camden',
    postcode: 'NW1',
    planUsed: 'Growth (£129/mo) + AI Receptionist',
    turnaround: '46 hours to live demo',
    headline: 'Winning EICR landlord certificates and domestic rewires across Camden NW1 & Primrose Hill.',
    summary:
      'NICEIC-certified electricians lose lucrative rewiring and EV-charger quotes when homeowners cannot verify credentials or request a fixed estimate on mobile.',
    heroStat: '99/100',
    heroStatLabel: 'Lighthouse mobile score + NICEIC trust strip',
    image: '/src/assets/images/london_electrician_smart_lighting_1795428787002.jpg',
    imageAlt: 'Certified London domestic electrician installing brushed brass architectural dimmer switches in Camden NW1',
    demoPresetId: 'trades-elegant-camden',
    challenge:
      'Camden landlords and Victorian townhouse renovators searching for EICR safety certificates or architectural lighting upgrades encountered slow directory listings with zero transparent pricing.',
    whatWeBuilt: [
      'Architectural trade shopfront showcasing NICEIC approval, £5m public liability and upfront EICR rates.',
      'Dedicated NW1, NW3 and N1 coverage pages structured with Electrician Schema.org JSON-LD.',
      'Instant quote request form capturing property size, fuseboard photo readiness and postcode.',
      '24/7 AI Receptionist fallback answering evening fault calls and booking daytime inspections.',
    ],
    outcome:
      'Landlords and homeowners verify NICEIC registration in two seconds and submit complete inspection requests — cutting wasted back-and-forth calls.',
    metrics: [
      { label: 'Mobile paint speed', before: '5.1s directory profile', after: '0.8 seconds' },
      { label: 'EICR quote clarity', before: 'Call for estimate', after: 'Fixed band upfront' },
      { label: 'Evening fault capture', before: 'Missed / voicemail', after: '24/7 AI Receptionist' },
      { label: 'Domain control', before: 'Third-party listing', after: 'regentparkelectrical.co.uk' },
    ],
    ownerNote:
      'Representative North London NICEIC electrical build — explore the full live Regent Park Electrical demo.',
  },
];

export function getCaseStudyBySlug(slug: string | undefined): CaseStudy | undefined {
  if (!slug) return undefined;
  return CASE_STUDIES.find((c) => c.slug === slug);
}
