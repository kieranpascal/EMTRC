import type { BusinessNiche, GalleryImage, SiteConfig, ThemeMode } from '../types/site';
import { getContrastRatio, getReadableTextOnColor } from './theme';

export type DemoLayoutArchetype =
  | 'editorial-cinema'
  | 'atelier-magazine'
  | 'swiss-grid'
  | 'engineering-command'
  | 'gallery-minimal';

export type DemoHeaderStyle = 'classic-split' | 'centered-masthead' | 'minimal-underline';

export type DemoFontPairId =
  | 'oswald-jakarta'
  | 'fraunces-dm'
  | 'playfair-public'
  | 'bricolage-dm'
  | 'archivo-public'
  | 'jakarta-public';

export interface DemoMetric {
  value: string;
  label: string;
  detail: string;
}

export interface DemoProcessStep {
  number: string;
  title: string;
  description: string;
  durationOrNote: string;
}

export interface DemoFaqItem {
  question: string;
  answer: string;
}

export interface DemoDesignProfile {
  presetId: string;
  archetype: DemoLayoutArchetype;
  headerStyle: DemoHeaderStyle;
  fontPairId: DemoFontPairId;
  fontLabel: string;
  displayFont: string;
  bodyFont: string;
  headingTransform: 'uppercase' | 'none';
  headingTracking: string;
  mode: ThemeMode;
  cardRadius: string;
  buttonRadius: string;
  imageRadius: string;
  heroEyebrow: string;
  heroImage: GalleryImage;
  gallery: GalleryImage[];
  metrics: DemoMetric[];
  processHeading: string;
  processSubheading: string;
  processSteps: DemoProcessStep[];
  craftKicker: string;
  craftHeadline: string;
  craftSummary: string;
  faqs: DemoFaqItem[];
  cssVars: Record<string, string>;
}

const FONT_PAIRS: Record<
  DemoFontPairId,
  { label: string; display: string; body: string; tracking: string; transform: 'uppercase' | 'none' }
> = {
  'oswald-jakarta': {
    label: 'Oswald + Plus Jakarta Sans',
    display: '"Oswald Variable", "Oswald", ui-sans-serif, sans-serif',
    body: '"Plus Jakarta Sans Variable", "Plus Jakarta Sans", system-ui, sans-serif',
    tracking: 'tracking-[0.015em]',
    transform: 'uppercase',
  },
  'fraunces-dm': {
    label: 'Fraunces + DM Sans',
    display: '"Fraunces Variable", "Fraunces", Georgia, serif',
    body: '"DM Sans Variable", "DM Sans", system-ui, sans-serif',
    tracking: 'tracking-[-0.02em]',
    transform: 'none',
  },
  'playfair-public': {
    label: 'Playfair Display + Public Sans',
    display: '"Playfair Display Variable", "Playfair Display", Georgia, serif',
    body: '"Public Sans Variable", "Public Sans", system-ui, sans-serif',
    tracking: 'tracking-[-0.022em]',
    transform: 'none',
  },
  'bricolage-dm': {
    label: 'Bricolage Grotesque + DM Sans',
    display: '"Bricolage Grotesque Variable", "Bricolage Grotesque", ui-sans-serif, sans-serif',
    body: '"DM Sans Variable", "DM Sans", system-ui, sans-serif',
    tracking: 'tracking-[-0.03em]',
    transform: 'none',
  },
  'archivo-public': {
    label: 'Archivo + Public Sans',
    display: '"Archivo Variable", "Archivo", ui-sans-serif, sans-serif',
    body: '"Public Sans Variable", "Public Sans", system-ui, sans-serif',
    tracking: 'tracking-[-0.028em]',
    transform: 'none',
  },
  'jakarta-public': {
    label: 'Plus Jakarta Sans + Public Sans',
    display: '"Plus Jakarta Sans Variable", "Plus Jakarta Sans", ui-sans-serif, sans-serif',
    body: '"Public Sans Variable", "Public Sans", system-ui, sans-serif',
    tracking: 'tracking-[-0.025em]',
    transform: 'none',
  },
};

const NICHE_GALLERY_POOL: Record<BusinessNiche, GalleryImage[]> = {
  barber: [
    {
      url: '/src/assets/images/barber_shop_interior_1795370825070.jpg',
      alt: 'Vintage black leather barber chairs, dark charcoal walls and warm brass sconces on the main shop floor',
      width: 1408,
      height: 768,
      caption: 'Main cutting floor with custom walnut stations and walk-in seating.',
    },
    {
      url: '/src/assets/images/barber_fade_editorial_1795426201374.jpg',
      alt: 'Senior London barber detailing a sharp skin fade inside a dark tiled grooming studio',
      width: 1408,
      height: 768,
      caption: 'Precision zero fades and scissor blends tailored to head shape and growth pattern.',
    },
    {
      url: '/src/assets/images/barber_tools_craft_1795370823939.jpg',
      alt: 'Japanese steel shears, cordless clippers, straight razor and rolled steam towel on oiled oak bench',
      width: 1200,
      height: 900,
      caption: 'Japanese steel shears, fresh single-use blades and eucalyptus steam towels.',
    },
    {
      url: '/src/assets/images/emtrc_london_barber_craft_1795422463841.jpg',
      alt: 'Independent East London barber working at a quiet morning chair with natural window light',
      width: 1408,
      height: 768,
      caption: 'Unhurried 40-minute appointments with complimentary espresso or cold brew.',
    },
  ],
  salon: [
    {
      url: '/src/assets/images/salon_warm_studio_1795370824298.jpg',
      alt: 'Sunlit London hair and beauty salon with arched bronze mirrors, linen chairs and travertine counters',
      width: 1408,
      height: 768,
      caption: 'Daylight-filled styling studio designed for calm, unhurried appointments.',
    },
    {
      url: '/src/assets/images/london_salon_balayage_studio_1795428787038.jpg',
      alt: 'Colourist finishing soft lived-in balayage ribbons in a bright London salon',
      width: 1408,
      height: 768,
      caption: 'Bespoke hand-painted balayage and ammonia-free gloss formulations.',
    },
    {
      url: '/src/assets/images/salon_hair_craft_1795373182080.jpg',
      alt: 'Botanical hair oils, brass scissors and waffle linen arranged on a warm travertine styling bench',
      width: 1200,
      height: 900,
      caption: 'Vegan bond builders, gentle botanical oils and ammonia-free colour care.',
    },
    {
      url: '/src/assets/images/salon_manicure_studio_1795426201499.jpg',
      alt: 'Minimalist nail and beauty bar set for Russian cuticle work and BIAB gel manicures',
      width: 1200,
      height: 900,
      caption: 'Dedicated brow, lash and BIAB builder-gel treatment sanctuary.',
    },
  ],
  trades: [
    {
      url: '/src/assets/images/trades_precision_heating_1795370825196.jpg',
      alt: 'Precision copper pipework manifold, newly installed condensing boiler and smart heating zone controls',
      width: 1408,
      height: 768,
      caption: 'Precision copper manifolds, boiler replacements and smart zoned controls.',
    },
    {
      url: '/src/assets/images/london_electrician_smart_lighting_1795428787002.jpg',
      alt: 'NICEIC electrician commissioning warm architectural dimmer circuits and LED lighting in a London home',
      width: 1408,
      height: 768,
      caption: 'Architectural lighting design, EV chargers and full rewiring tested to BS 7671.',
    },
    {
      url: '/src/assets/images/london_boiler_engineer_work_1795428786510.jpg',
      alt: 'Gas Safe heating engineer calibrating flue gas combustion and boiler pressure in a London kitchen',
      width: 1408,
      height: 768,
      caption: 'Annual boiler servicing, flue analysis and same-day digital CP12 certification.',
    },
    {
      url: '/src/assets/images/trades_electrical_craft_1795373181964.jpg',
      alt: 'Neatly labelled 18th Edition metal RCBO consumer unit tested and certified to UK regulations',
      width: 1200,
      height: 900,
      caption: '18th Edition RCBO consumer unit upgrades with full Part P sign-off.',
    },
  ],
  cleaner: [
    {
      url: '/src/assets/images/cleaner_bright_flat_1795370824764.jpg',
      alt: 'Spotless sunlit London apartment living space with crisp upholstery and streak-free sash windows',
      width: 1408,
      height: 768,
      caption: 'Agency-approved end-of-tenancy and weekly home cleaning across London.',
    },
    {
      url: '/src/assets/images/cleaner_kitchen_sparkle_1795373182615.jpg',
      alt: 'Immaculate modern London kitchen with gleaming quartz worktops, brushed taps and degreased hob',
      width: 1200,
      height: 900,
      caption: 'Deep kitchen degreasing, extractor hoods, limescale removal and internal appliances.',
    },
    {
      url: '/src/assets/images/london_clean_townhouse_1795426201377.jpg',
      alt: 'Bright Victorian London townhouse reception room freshly cleaned with polished oak floors',
      width: 1408,
      height: 768,
      caption: 'Vetted, insured regular housekeepers trained for delicate stone, marble and oak.',
    },
  ],
  cafe: [
    {
      url: '/src/assets/images/cafe_brunch_pastry_1795373181666.jpg',
      alt: 'Sourdough avocado toast with poached eggs, flaky almond croissant and silky flat white on oak table',
      width: 1200,
      height: 900,
      caption: 'All-day sourdough brunch plates cooked to order alongside laminated morning pastries.',
    },
    {
      url: '/src/assets/images/cafe_coffee_bakery_1795370824300.jpg',
      alt: 'Warm London speciality coffee bar counter lined with cardamom buns and fresh croissants',
      width: 1408,
      height: 768,
      caption: 'Small-batch seasonal espresso dialled in at 6:30am every morning.',
    },
    {
      url: '/src/assets/images/london_cafe_storefront_morning_1795428788037.jpg',
      alt: 'Sunlit independent London neighbourhood café storefront with pavement tables and morning commuters',
      width: 1408,
      height: 768,
      caption: 'Independent neighbourhood corner spot with window seating and takeaway bar.',
    },
    {
      url: '/src/assets/images/emtrc_london_cafe_owner_1795422462836.jpg',
      alt: 'London café barista pouring velvety microfoam into a stoneware ceramic cup',
      width: 1408,
      height: 768,
      caption: 'Zero surcharge for barista oat milk and single-origin batch brew on tap.',
    },
  ],
};

interface PresetVisualSpec {
  archetype: DemoLayoutArchetype;
  headerStyle: DemoHeaderStyle;
  fontPairId: DemoFontPairId;
  mode: ThemeMode;
  bg: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  ink: string;
  muted: string;
  primary: string;
  accent: string;
  heroImageIndex: number;
  heroEyebrow: string;
  cardRadius: string;
  buttonRadius: string;
  imageRadius: string;
}

const PRESET_SPECS: Record<string, PresetVisualSpec> = {
  // ── BARBERS (3 completely distinct designs) ──
  'barber-bold-hackney': {
    archetype: 'editorial-cinema',
    headerStyle: 'classic-split',
    fontPairId: 'oswald-jakarta',
    mode: 'dark',
    bg: '#090B0F',
    surface: '#12151C',
    surfaceAlt: '#191D27',
    border: '#272C39',
    ink: '#F6F5F1',
    muted: '#A6AEBE',
    primary: '#12151C',
    accent: '#D99B3E',
    heroImageIndex: 0,
    heroEyebrow: 'East London Grooming House · Dalston E8',
    cardRadius: 'rounded-lg',
    buttonRadius: 'rounded-md',
    imageRadius: 'rounded-lg',
  },
  'barber-elegant-marylebone': {
    archetype: 'atelier-magazine',
    headerStyle: 'centered-masthead',
    fontPairId: 'fraunces-dm',
    mode: 'dark',
    bg: '#101215',
    surface: '#181B20',
    surfaceAlt: '#21252C',
    border: '#2D323C',
    ink: '#F5EFE6',
    muted: '#B5ACA0',
    primary: '#1E2229',
    accent: '#CFA972',
    heroImageIndex: 1,
    heroEyebrow: 'West End Tailored Barbering · Marylebone W1',
    cardRadius: 'rounded-2xl',
    buttonRadius: 'rounded-xl',
    imageRadius: 'rounded-2xl',
  },
  'barber-minimal-brixton': {
    archetype: 'swiss-grid',
    headerStyle: 'minimal-underline',
    fontPairId: 'bricolage-dm',
    mode: 'light',
    bg: '#F7F6F2',
    surface: '#FFFFFF',
    surfaceAlt: '#EEECE5',
    border: '#D9D5CB',
    ink: '#101216',
    muted: '#535865',
    primary: '#101216',
    accent: '#C43827',
    heroImageIndex: 2,
    heroEyebrow: 'Precision Walk-In & Booked Studio · Brixton SW9',
    cardRadius: 'rounded-none',
    buttonRadius: 'rounded-none',
    imageRadius: 'rounded-none',
  },

  // ── SALONS (3 completely distinct designs) ──
  'salon-elegant-kensington': {
    archetype: 'atelier-magazine',
    headerStyle: 'centered-masthead',
    fontPairId: 'playfair-public',
    mode: 'light',
    bg: '#FAF7F2',
    surface: '#FFFFFF',
    surfaceAlt: '#F2ECE3',
    border: '#E3D9CB',
    ink: '#1E1815',
    muted: '#5D524A',
    primary: '#2B1D19',
    accent: '#8E4B3E',
    heroImageIndex: 0,
    heroEyebrow: 'South Kensington Hair & Botanical Atelier · SW7',
    cardRadius: 'rounded-2xl',
    buttonRadius: 'rounded-xl',
    imageRadius: 'rounded-2xl',
  },
  'salon-bold-islington': {
    archetype: 'editorial-cinema',
    headerStyle: 'classic-split',
    fontPairId: 'bricolage-dm',
    mode: 'dark',
    bg: '#120D10',
    surface: '#1C1419',
    surfaceAlt: '#261C22',
    border: '#3A2B34',
    ink: '#FBF5F7',
    muted: '#C2B0B9',
    primary: '#261620',
    accent: '#E05375',
    heroImageIndex: 1,
    heroEyebrow: 'Upper Street Colour & Gloss Studio · Islington N1',
    cardRadius: 'rounded-xl',
    buttonRadius: 'rounded-lg',
    imageRadius: 'rounded-xl',
  },
  'salon-minimal-richmond': {
    archetype: 'gallery-minimal',
    headerStyle: 'minimal-underline',
    fontPairId: 'jakarta-public',
    mode: 'light',
    bg: '#F8F7F4',
    surface: '#FFFFFF',
    surfaceAlt: '#EFEDE7',
    border: '#DFDBD2',
    ink: '#191715',
    muted: '#5D5852',
    primary: '#26221F',
    accent: '#7D5B47',
    heroImageIndex: 2,
    heroEyebrow: 'Riverside Hair & Beauty Sanctuary · Richmond TW9',
    cardRadius: 'rounded-md',
    buttonRadius: 'rounded-md',
    imageRadius: 'rounded-md',
  },

  // ── TRADES (3 completely distinct designs) ──
  'trades-bold-greenwich': {
    archetype: 'engineering-command',
    headerStyle: 'classic-split',
    fontPairId: 'archivo-public',
    mode: 'light',
    bg: '#F4F7FC',
    surface: '#FFFFFF',
    surfaceAlt: '#E9F0FA',
    border: '#D0DDF0',
    ink: '#0B162C',
    muted: '#45556E',
    primary: '#0B295E',
    accent: '#1D4ED8',
    heroImageIndex: 0,
    heroEyebrow: 'Gas Safe & NICEIC Certified Engineers · SE10',
    cardRadius: 'rounded-lg',
    buttonRadius: 'rounded-md',
    imageRadius: 'rounded-lg',
  },
  'trades-elegant-camden': {
    archetype: 'atelier-magazine',
    headerStyle: 'centered-masthead',
    fontPairId: 'playfair-public',
    mode: 'dark',
    bg: '#0B101B',
    surface: '#131A2A',
    surfaceAlt: '#1B2438',
    border: '#29354F',
    ink: '#F3F5FA',
    muted: '#A4B0C9',
    primary: '#162442',
    accent: '#D5A353',
    heroImageIndex: 1,
    heroEyebrow: 'Architectural Lighting & NICEIC Contractors · NW1',
    cardRadius: 'rounded-xl',
    buttonRadius: 'rounded-lg',
    imageRadius: 'rounded-xl',
  },
  'trades-minimal-ealing': {
    archetype: 'gallery-minimal',
    headerStyle: 'minimal-underline',
    fontPairId: 'jakarta-public',
    mode: 'light',
    bg: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceAlt: '#EFF4F9',
    border: '#D7E2EE',
    ink: '#0F172A',
    muted: '#4B5B73',
    primary: '#162B4D',
    accent: '#1E40AF',
    heroImageIndex: 2,
    heroEyebrow: 'Local Heating & Plumbing Specialists · Ealing W5',
    cardRadius: 'rounded-sm',
    buttonRadius: 'rounded-md',
    imageRadius: 'rounded-sm',
  },

  // ── CLEANERS (3 completely distinct designs) ──
  'cleaner-bold-tower-hamlets': {
    archetype: 'engineering-command',
    headerStyle: 'classic-split',
    fontPairId: 'bricolage-dm',
    mode: 'dark',
    bg: '#081417',
    surface: '#0F2126',
    surfaceAlt: '#152C33',
    border: '#224049',
    ink: '#F1F9FA',
    muted: '#9ABCC4',
    primary: '#0E3A42',
    accent: '#14B8A6',
    heroImageIndex: 1,
    heroEyebrow: 'Deposit-Back End-of-Tenancy Specialists · E14',
    cardRadius: 'rounded-xl',
    buttonRadius: 'rounded-lg',
    imageRadius: 'rounded-xl',
  },
  'cleaner-elegant-hampstead': {
    archetype: 'gallery-minimal',
    headerStyle: 'centered-masthead',
    fontPairId: 'fraunces-dm',
    mode: 'light',
    bg: '#F8F9F5',
    surface: '#FFFFFF',
    surfaceAlt: '#EEF2EA',
    border: '#D7E0D2',
    ink: '#15211C',
    muted: '#4B5E55',
    primary: '#1F493E',
    accent: '#2B6E5B',
    heroImageIndex: 2,
    heroEyebrow: 'Private Residence Housekeeping · Hampstead NW3',
    cardRadius: 'rounded-2xl',
    buttonRadius: 'rounded-xl',
    imageRadius: 'rounded-2xl',
  },
  'cleaner-minimal-wandsworth': {
    archetype: 'swiss-grid',
    headerStyle: 'minimal-underline',
    fontPairId: 'archivo-public',
    mode: 'light',
    bg: '#F6FAFC',
    surface: '#FFFFFF',
    surfaceAlt: '#EBF3F7',
    border: '#D2E2EB',
    ink: '#0D1C26',
    muted: '#4A5F6E',
    primary: '#0E4C5E',
    accent: '#0E7490',
    heroImageIndex: 0,
    heroEyebrow: 'Checklist-Verified London Cleaners · Wandsworth SW18',
    cardRadius: 'rounded-none',
    buttonRadius: 'rounded-none',
    imageRadius: 'rounded-none',
  },

  // ── CAFÉS (3 completely distinct designs) ──
  'cafe-bold-shoreditch': {
    archetype: 'editorial-cinema',
    headerStyle: 'classic-split',
    fontPairId: 'oswald-jakarta',
    mode: 'dark',
    bg: '#110D0B',
    surface: '#1A1411',
    surfaceAlt: '#241C18',
    border: '#382B24',
    ink: '#FAF4ED',
    muted: '#C2B1A3',
    primary: '#231812',
    accent: '#E07D3C',
    heroImageIndex: 0,
    heroEyebrow: 'Small-Batch Roastery & Sourdough Kitchen · Shoreditch E2',
    cardRadius: 'rounded-lg',
    buttonRadius: 'rounded-md',
    imageRadius: 'rounded-lg',
  },
  'cafe-elegant-southwark': {
    archetype: 'atelier-magazine',
    headerStyle: 'centered-masthead',
    fontPairId: 'fraunces-dm',
    mode: 'light',
    bg: '#FAF6EE',
    surface: '#FFFFFF',
    surfaceAlt: '#F2EADE',
    border: '#E2D6C3',
    ink: '#1E1712',
    muted: '#615246',
    primary: '#3B2316',
    accent: '#8D4B28',
    heroImageIndex: 1,
    heroEyebrow: 'Neighbourhood Bakery & Espresso Bar · Peckham SE15',
    cardRadius: 'rounded-2xl',
    buttonRadius: 'rounded-xl',
    imageRadius: 'rounded-2xl',
  },
  'cafe-minimal-hammersmith': {
    archetype: 'swiss-grid',
    headerStyle: 'minimal-underline',
    fontPairId: 'archivo-public',
    mode: 'light',
    bg: '#F6F5F0',
    surface: '#FFFFFF',
    surfaceAlt: '#ECEAE2',
    border: '#D9D5C9',
    ink: '#171512',
    muted: '#5A554C',
    primary: '#2E231B',
    accent: '#7A4F2C',
    heroImageIndex: 2,
    heroEyebrow: 'Speciality Coffee & Morning Counter · Hammersmith W6',
    cardRadius: 'rounded-none',
    buttonRadius: 'rounded-none',
    imageRadius: 'rounded-none',
  },
};

function buildNicheContent(site: SiteConfig): {
  metrics: DemoMetric[];
  processHeading: string;
  processSubheading: string;
  processSteps: DemoProcessStep[];
  craftKicker: string;
  craftHeadline: string;
  craftSummary: string;
  faqs: DemoFaqItem[];
} {
  const borough = site.borough;
  const rating =
    site.reviews.length > 0
      ? (site.reviews.reduce((sum, r) => sum + r.rating, 0) / site.reviews.length).toFixed(1)
      : '4.9';

  switch (site.niche) {
    case 'barber':
      return {
        metrics: [
          { value: `${rating} ★`, label: 'Google Rating', detail: `Verified ${borough} regulars` },
          { value: '40 min', label: 'Unhurried Slots', detail: 'Zero rushed 15-minute cuts' },
          { value: '7 Days', label: 'Walk-Ins & Bookings', detail: 'Reserve online in 30 seconds' },
          { value: '100%', label: 'Transparent Menu', detail: 'Fixed prices — hot towel incl.' },
        ],
        processHeading: 'The chair experience, start to finish.',
        processSubheading: `Every appointment at ${site.businessName} follows a disciplined three-stage craft routine.`,
        processSteps: [
          {
            number: '01',
            title: 'Growth-pattern consultation',
            description:
              'Before a clipper switches on, your barber checks crown direction, density and how your hair grows out over weeks two and three.',
            durationOrNote: '5 min · Included',
          },
          {
            number: '02',
            title: 'Precision fade & scissor work',
            description:
              'Graduated foil or taper blending paired with point-cut scissor texture on top for a silhouette that holds without heavy product.',
            durationOrNote: '25–35 min',
          },
          {
            number: '03',
            title: 'Hot towel & razor detail',
            description:
              'Fresh single-use straight razor neck cleanup, eucalyptus steam towel press and matte finish tailored to your daily routine.',
            durationOrNote: '10 min · Signature finish',
          },
        ],
        craftKicker: 'Live Studio Craft & Chair Planner',
        craftHeadline: 'Choose your cut. Preview timing & finish.',
        craftSummary:
          'Interactive grooming planner built into the site so commuters know exact chair duration, pricing and walk-in availability before heading over.',
        faqs: [
          {
            question: `Do I need to book ahead or do you take walk-ins in ${borough}?`,
            answer:
              'Both. We hold dedicated walk-in chairs every day, and you can also reserve your preferred barber online up to 30 minutes before your slot.',
          },
          {
            question: 'What if I am running 5–10 minutes late on the tube or bus?',
            answer:
              'Just tap our phone number or send a quick WhatsApp message. We hold bookings for 10 minutes and will always do our best to keep your chair.',
          },
          {
            question: 'Are hot towels and styling products included in the listed price?',
            answer:
              'Yes — every haircut and beard sculpt includes a consultation, hot towel finish and matte styling with zero surprise add-ons at the till.',
          },
          {
            question: 'Can I book a specific senior barber for every visit?',
            answer:
              'Yes. Online bookings let you pick your preferred barber directly, and we keep notes on your clipper grade and finish so every visit is consistent.',
          },
        ],
      };

    case 'salon':
      return {
        metrics: [
          { value: `${rating} ★`, label: 'Client Rating', detail: `Google & Treatwell in ${borough}` },
          { value: '15 min', label: 'Free Consultation', detail: 'Complimentary colour & cut chat' },
          { value: '100%', label: 'Botanical & Vegan', detail: 'Ammonia-free colour & bond care' },
          { value: '48 hr', label: 'Patch Test Care', detail: 'Gentle skin-first safety standard' },
        ],
        processHeading: 'Unhurried rituals, designed around hair health.',
        processSubheading: `How ${site.businessName} approaches bespoke colour, precision cutting and botanical beauty.`,
        processSteps: [
          {
            number: '01',
            title: 'Bespoke tone & texture consultation',
            description:
              'We assess natural undertone, previous colour history and lifestyle maintenance before recommending a transparent plan and exact quote.',
            durationOrNote: 'Complimentary · 15 min',
          },
          {
            number: '02',
            title: 'Bond-protected formulation & craft',
            description:
              'Every colour and gloss service includes vegan bond protection and gentle botanical oils so hair feels stronger when you leave.',
            durationOrNote: 'Tailored timing',
          },
          {
            number: '03',
            title: 'Signature finish & grow-out care',
            description:
              'Finished with a bouncy blow-dry or soft wave plus straightforward advice on keeping gloss vibrant between visits.',
            durationOrNote: 'Included in every visit',
          },
        ],
        craftKicker: 'Interactive Colour & Ritual Studio',
        craftHeadline: 'Explore signature tones & appointment cadence.',
        craftSummary:
          'Preview our most requested London colour palettes, gloss levels and recommended maintenance intervals before booking your complimentary consultation.',
        faqs: [
          {
            question: 'Do I need a skin patch test before a colour appointment?',
            answer:
              'If you are a new colour client or have not visited for colour in 6 months, pop in for a quick 2-minute patch test at least 48 hours before your booking.',
          },
          {
            question: 'Are toners and bond-builder treatments included in your balayage prices?',
            answer:
              'Yes. We price transparently so your custom toner, bond protection and signature blow-dry are clearly quoted before we begin.',
          },
          {
            question: `How far is the salon from the nearest ${borough} station?`,
            answer:
              'We are a short walk from Underground and Overground links, with step-free ground-floor access and complimentary herbal tea or espresso on arrival.',
          },
          {
            question: 'What is your rescheduling policy if plans change?',
            answer:
              'You can reschedule free of charge with 24 hours’ notice via your booking confirmation link or a quick WhatsApp message to reception.',
          },
        ],
      };

    case 'trades':
      return {
        metrics: [
          { value: `${rating} ★`, label: 'Verified Rating', detail: `Homeowners across ${borough}` },
          { value: '60–90m', label: 'Rapid Response', detail: 'Direct to a qualified engineer' },
          { value: '12 Mo', label: 'Workmanship Guarantee', detail: 'Backed in writing on every job' },
          { value: '£0', label: 'Hidden Call-Out Fees', detail: 'Fixed quotes approved upfront' },
        ],
        processHeading: 'Straightforward engineering, zero surprises.',
        processSubheading: `From your first phone call to same-day digital certification across ${borough}.`,
        processSteps: [
          {
            number: '01',
            title: 'Speak straight to an engineer',
            description:
              'No call centres or vague windows. Describe the fault or send a quick WhatsApp photo of your boiler or fuse board for immediate guidance.',
            durationOrNote: 'Same-day slot',
          },
          {
            number: '02',
            title: 'Upfront written fixed quote',
            description:
              'Before any parts are fitted, you receive a clear fixed price in plain English — covering labour, manufacturer-grade parts and testing.',
            durationOrNote: 'Zero hidden extras',
          },
          {
            number: '03',
            title: 'Tidy work & instant PDF certificate',
            description:
              'We protect floors with clean dust sheets, test every circuit or flue reading, and email your CP12, EICR or warranty PDF before leaving.',
            durationOrNote: '12-month guarantee',
          },
        ],
        craftKicker: 'Live London Dispatch & Safety Diagnostic',
        craftHeadline: 'Inspect response zones & compliance checks.',
        craftSummary:
          'Interactive dispatch and safety overview showing typical engineer arrival windows, mandatory safety test checks and fixed transparent rates.',
        faqs: [
          {
            question: 'Are your engineers Gas Safe registered and NICEIC approved?',
            answer:
              'Yes. Every engineer carries current photo ID and official registration credentials, and we issue full digital certificates for landlords and homeowners.',
          },
          {
            question: 'Do you charge a call-out fee just to inspect a fault?',
            answer:
              'We explain our fixed diagnostic fee upfront on the phone before dispatching, and we always confirm any repair parts price before fitting anything.',
          },
          {
            question: 'Can you issue Landlord CP12 and EICR certificates in one visit?',
            answer:
              'Yes — we regularly combine gas safety checks, boiler servicing and electrical inspections into a single coordinated visit with digital PDFs sent the same day.',
          },
          {
            question: `Do you cover parking and ULEZ charges in ${borough}?`,
            answer:
              'Our vans are fully ULEZ compliant with zero ULEZ surcharges. Any controlled-zone visitor parking requirements are confirmed clearly when booking.',
          },
        ],
      };

    case 'cleaner':
      return {
        metrics: [
          { value: `${rating} ★`, label: 'Local Rating', detail: `Trusted across ${borough}` },
          { value: '72 hr', label: 'Deposit Guarantee', detail: 'Free re-clean if agent flags anything' },
          { value: '48-Pt', label: 'Room Checklist', detail: 'Inventory-grade kitchen & bath' },
          { value: '£5M', label: 'Fully Insured', detail: 'DBS-checked, in-house teams' },
        ],
        processHeading: 'How every clean passes inspection first time.',
        processSubheading: `Vetted teams, commercial-grade eco products and a documented checklist for ${borough} homes.`,
        processSteps: [
          {
            number: '01',
            title: 'Instant fixed quote by property size',
            description:
              'Tell us your postcode, bedrooms and whether oven or carpet steam-cleaning is needed. We confirm a fixed price — never an open-ended hourly clock.',
            durationOrNote: 'Fixed price upfront',
          },
          {
            number: '02',
            title: '48-point room-by-room blitz',
            description:
              'Our uniformed team arrives with HEPA vacuums, steam equipment and surface-safe eco solutions for marble, oak, glass and stainless steel.',
            durationOrNote: 'All supplies included',
          },
          {
            number: '03',
            title: 'Walk-through & 72-hour guarantee',
            description:
              'Inspect every room with our team lead (or receive timestamped photos if you are at work). Any agency snag is rectified free within 72 hours.',
            durationOrNote: 'Deposit-back backed',
          },
        ],
        craftKicker: 'Interactive Room Checklist & Price Estimator',
        craftHeadline: 'Select your rooms. Preview scope & estimate.',
        craftSummary:
          'Toggle rooms and deep-clean extras to preview our exact London inventory checklist, estimated team time and fixed price guide.',
        faqs: [
          {
            question: 'Do I need to provide cleaning products or a vacuum?',
            answer:
              'No — our teams bring commercial HEPA vacuums, colour-coded microfibre cloths and non-toxic eco-friendly detergents suitable for stone, wood and glass.',
          },
          {
            question: 'How does your 72-hour deposit-back guarantee work?',
            answer:
              'If your landlord or inventory clerk flags any cleaning item within 72 hours of an end-of-tenancy clean, we return and re-clean the area free of charge.',
          },
          {
            question: 'Will I get the same vetted housekeeper for regular weekly cleans?',
            answer:
              'Yes. For weekly and fortnightly domestic clients we assign one dedicated, DBS-checked housekeeper, with vetted holiday cover available whenever needed.',
          },
          {
            question: 'Can you collect keys from our concierge or letting agent?',
            answer:
              'Yes — we routinely collect and return keys from building concierges or local estate agents across London at no extra charge.',
          },
        ],
      };

    case 'cafe':
    default:
      return {
        metrics: [
          { value: `${rating} ★`, label: 'Neighbourhood Love', detail: `Google reviews in ${borough}` },
          { value: '6:30am', label: 'Baked Fresh Daily', detail: 'Laminated pastries & sourdough' },
          { value: '£0', label: 'Oat Milk Surcharge', detail: 'Barista oat & estate dairy equal' },
          { value: '100%', label: 'Direct-Trade Beans', detail: 'Seasonal single-origin espresso' },
        ],
        processHeading: 'From morning roast to sourdough plate.',
        processSubheading: `Everything served across the counter at ${site.businessName} is dialled in and baked daily.`,
        processSteps: [
          {
            number: '01',
            title: 'Dialled in before sunrise',
            description:
              'Every morning at 6:30am our head barista calibrates grind, dose and 28-second extraction yield for balanced sweetness and zero bitterness.',
            durationOrNote: '6:30am calibration',
          },
          {
            number: '02',
            title: 'Warm viennoiserie from the oven',
            description:
              'Twice-baked almond croissants, pistachio morning buns and seasonal galettes hit the marble counter warm throughout the morning rush.',
            durationOrNote: '3 morning batches',
          },
          {
            number: '03',
            title: 'Cooked-to-order brunch kitchen',
            description:
              'Free-range poached eggs, wild-fermented sourdough and vibrant vegetarian plates cooked fresh from opening until 3pm.',
            durationOrNote: 'All-day until 3pm',
          },
        ],
        craftKicker: 'Interactive Roast & Morning Bake Bar',
        craftHeadline: 'Explore today’s espresso profile & oven batches.',
        craftSummary:
          'Switch between our house espresso, seasonal single-origin pour-over and cold brew to inspect tasting notes, origin elevation and fresh bake times.',
        faqs: [
          {
            question: 'Do you charge extra for oat, soy or almond milk?',
            answer:
              'Never. Barista oat, organic soy and estate dairy milk are all included at the exact same menu price on every espresso drink.',
          },
          {
            question: 'Do you take brunch table bookings or is it walk-in only?',
            answer:
              'We keep most tables for walk-ins so neighbours can always drop by, and we hold a handful of weekend brunch slots via phone or quick message for groups of 4+.',
          },
          {
            question: 'Are gluten-free and vegan brunch options available daily?',
            answer:
              'Yes — our menu clearly marks vegan (VG), vegetarian (V) and gluten-free (GF) dishes, and we keep dedicated GF sourdough and plant-based bakes at the counter.',
          },
          {
            question: 'Can I bring my dog or work from a laptop during weekdays?',
            answer:
              'Well-behaved dogs are always welcome (with treats behind the bar), and laptop tables with power sockets are open Monday to Friday.',
          },
        ],
      };
  }
}

function buildEnrichedGallery(niche: BusinessNiche, heroIdx: number, site: SiteConfig): GalleryImage[] {
  const pool = NICHE_GALLERY_POOL[niche];
  const ordered: GalleryImage[] = [];
  const seen = new Set<string>();

  const pushUnique = (img: GalleryImage | undefined) => {
    if (!img || seen.has(img.url)) return;
    seen.add(img.url);
    ordered.push(img);
  };

  // Start with the preset's unique designated hero photo, then fill with niche studio photos
  pushUnique(pool[heroIdx % pool.length]);
  for (const img of pool) {
    pushUnique(img);
  }
  // Preserve any extra custom image from site.json if distinct
  for (const img of site.gallery) {
    pushUnique(img);
  }
  return ordered;
}

/**
 * Pure, deterministic resolver mapping each of the 15 London demo presets to a completely
 * distinct architectural layout, font pairing, colour atmosphere, hero photo, and rich local content.
 */
export function getDemoDesignProfile(presetId: string, site: SiteConfig): DemoDesignProfile {
  const fallbackKey = `${site.niche}-${site.theme.style}`;
  const spec =
    PRESET_SPECS[presetId] ??
    Object.entries(PRESET_SPECS).find(([key]) => key.startsWith(fallbackKey))?.[1] ??
    PRESET_SPECS['barber-bold-hackney'];

  const fontPair = FONT_PAIRS[spec.fontPairId];
  const gallery = buildEnrichedGallery(site.niche, spec.heroImageIndex, site);
  const heroImage = gallery[0];

  const accentInk = getReadableTextOnColor(spec.accent);
  const primaryInk = getReadableTextOnColor(spec.primary);
  const accentTextOnBg =
    getContrastRatio(spec.accent, spec.bg) >= 4.5
      ? spec.accent
      : spec.mode === 'dark'
        ? '#F2C98A'
        : spec.primary;

  const content = buildNicheContent(site);

  return {
    presetId,
    archetype: spec.archetype,
    headerStyle: spec.headerStyle,
    fontPairId: spec.fontPairId,
    fontLabel: fontPair.label,
    displayFont: fontPair.display,
    bodyFont: fontPair.body,
    headingTransform: fontPair.transform,
    headingTracking: fontPair.tracking,
    mode: spec.mode,
    cardRadius: spec.cardRadius,
    buttonRadius: spec.buttonRadius,
    imageRadius: spec.imageRadius,
    heroEyebrow: spec.heroEyebrow,
    heroImage,
    gallery,
    ...content,
    cssVars: {
      '--font-display': fontPair.display,
      '--font-body': fontPair.body,
      '--site-primary': spec.primary,
      '--site-primary-ink': primaryInk,
      '--site-accent': spec.accent,
      '--site-accent-ink': accentInk,
      '--site-accent-text': accentTextOnBg,
      '--site-bg': spec.bg,
      '--site-surface': spec.surface,
      '--site-surface-alt': spec.surfaceAlt,
      '--site-border': spec.border,
      '--site-ink': spec.ink,
      '--site-muted': spec.muted,
      '--site-focus': accentTextOnBg,
    },
  };
}
