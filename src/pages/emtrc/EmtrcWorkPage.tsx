import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Gauge,
  Lock,
  Phone,
  Smartphone,
} from 'lucide-react';
import { SITE } from '../../content/site';
import { PREVIEW_PRESETS } from '../../context/SiteContext';
import { useLanguage } from '../../context/LanguageContext';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { GalleryCarousel, type GallerySlide } from '../../components/emtrc/GalleryCarousel';
import { PageHeader } from '../../components/emtrc/PageHeader';
import { ScrollReveal, ScrollRevealItem } from '../../components/emtrc/ScrollReveal';
import { AnimatedSectionHeader } from '../../components/emtrc/SectionSeparator';
import { SafeImage } from '../../components/SafeImage';

export interface WorkPresetMeta {
  businessName: string;
  domain: string;
  borough: string;
  outcome: string;
  ctaLabel: string;
  accentHex: string;
  loadTime: string;
  image: string;
  alt: string;
}

export const WORK_PRESET_METADATA: Record<string, WorkPresetMeta> = {
  'barber-bold-hackney': {
    businessName: 'Kingsland Blade & Fade',
    domain: 'kingslandblade.co.uk',
    borough: 'Hackney E8',
    outcome: 'Live open status, upfront fade pricing and one-tap Fresha chair booking.',
    ctaLabel: 'Book Chair',
    accentHex: '#E03528',
    loadTime: '0.8s',
    image: '/src/assets/images/barber_fade_editorial_1795426201374.jpg',
    alt: 'Master London barber finishing a crisp skin fade in Hackney E8',
  },
  'barber-elegant-marylebone': {
    businessName: 'Chiltern & Crown Grooming',
    domain: 'chilterncrown.co.uk',
    borough: 'Marylebone W1U',
    outcome: 'Editorial serif aesthetic for traditional hot-towel shaves and scissor cuts.',
    ctaLabel: 'Reserve Cut',
    accentHex: '#C28A3E',
    loadTime: '0.8s',
    image: '/src/assets/images/barber_tools_craft_1795370823939.jpg',
    alt: 'Traditional London barber craft scissors, brush and brass grooming tools',
  },
  'barber-minimal-brixton': {
    businessName: 'Coldharbour Cuts',
    domain: 'coldharbourcuts.co.uk',
    borough: 'Brixton SW9',
    outcome: 'Ultra-fast 1-page Starter build with walk-in hours and tap-to-call.',
    ctaLabel: 'Call Shop',
    accentHex: '#3B82F6',
    loadTime: '0.7s',
    image: '/src/assets/images/barber_shop_interior_1795370825070.jpg',
    alt: 'Independent Brixton barbershop interior with timber stations',
  },
  'salon-elegant-kensington': {
    businessName: 'Linden & Silk',
    domain: 'lindenandsilk.co.uk',
    borough: 'South Kensington SW7',
    outcome: 'Categorised cut, balayage colour and BIAB treatment menus with direct booking.',
    ctaLabel: 'Book Colour',
    accentHex: '#B6895B',
    loadTime: '0.9s',
    image: '/src/assets/images/london_salon_balayage_studio_1795428787038.jpg',
    alt: 'South Kensington hair stylist finishing balayage colour beside Georgian sash windows',
  },
  'salon-bold-islington': {
    businessName: 'Upper Street Colour House',
    domain: 'upperstreetcolour.co.uk',
    borough: 'Islington N1',
    outcome: 'High-contrast modern salon showcase with stylists, pricing and manicure lookbook.',
    ctaLabel: 'Book Studio',
    accentHex: '#E03528',
    loadTime: '0.8s',
    image: '/src/assets/images/salon_manicure_studio_1795426201499.jpg',
    alt: 'Travertine stone manicure table and botanical bottles in Islington salon',
  },
  'salon-minimal-richmond': {
    businessName: 'Kew Green Hair & Brow',
    domain: 'kewgreenhair.co.uk',
    borough: 'Richmond TW9',
    outcome: 'Calm 1-page Starter site built for rapid mobile appointment booking.',
    ctaLabel: 'Book Visit',
    accentHex: '#10B981',
    loadTime: '0.7s',
    image: '/src/assets/images/salon_warm_studio_1795370824298.jpg',
    alt: 'Sunlit Richmond hair and brow salon interior',
  },
  'trades-bold-greenwich': {
    businessName: 'Blackheath Heating & Electrical',
    domain: 'blackheathheating.co.uk',
    borough: 'Greenwich SE10',
    outcome: '24/7 emergency boiler call-out banner, fixed rates and Gas Safe + NICEIC badges.',
    ctaLabel: '24/7 Call-Out',
    accentHex: '#E03528',
    loadTime: '0.8s',
    image: '/src/assets/images/london_boiler_engineer_work_1795428786510.jpg',
    alt: 'Gas Safe certified British heating engineer inspecting copper combi boiler pipework in Greenwich',
  },
  'trades-elegant-camden': {
    businessName: 'Regent Park Electrical',
    domain: 'regentparkelectrical.co.uk',
    borough: 'Camden NW1',
    outcome: 'NICEIC-certified domestic rewiring, smart brass lighting, EICRs and EV chargers.',
    ctaLabel: 'Get Quote',
    accentHex: '#D97706',
    loadTime: '0.8s',
    image: '/src/assets/images/london_electrician_smart_lighting_1795428787002.jpg',
    alt: 'Certified UK domestic electrician testing brushed brass dimmer switches in Camden home',
  },
  'trades-minimal-ealing': {
    businessName: 'Westside Plumbing & Boilers',
    domain: 'westsideboilers.co.uk',
    borough: 'Ealing W5',
    outcome: 'Fast 1-page sole-trader plumber build focused on tap-to-call and postcode trust.',
    ctaLabel: 'Tap to Call',
    accentHex: '#2563EB',
    loadTime: '0.7s',
    image: '/src/assets/images/emtrc_london_plumber_van_1795422464729.jpg',
    alt: 'London heating engineer checking live job bookings beside his trade van',
  },
  'cleaner-minimal-wandsworth': {
    businessName: 'Battersea Bright Cleaning',
    domain: 'batterseabright.co.uk',
    borough: 'Wandsworth SW11',
    outcome: 'Built-in postcode & bedroom quote calculator for regular & end-of-tenancy cleans.',
    ctaLabel: 'Price My Flat',
    accentHex: '#059669',
    loadTime: '0.8s',
    image: '/src/assets/images/cleaner_kitchen_sparkle_1795373182615.jpg',
    alt: 'Spotless modern London flat kitchen after professional deep clean in Wandsworth',
  },
  'cleaner-bold-tower-hamlets': {
    businessName: 'Docklands Deposit-Back Cleans',
    domain: 'docklandscleans.co.uk',
    borough: 'Canary Wharf E14',
    outcome: 'End-of-tenancy inventory checklist, fixed flat pricing and instant quote form.',
    ctaLabel: 'Instant Quote',
    accentHex: '#0EA5E9',
    loadTime: '0.8s',
    image: '/src/assets/images/london_clean_townhouse_1795426201377.jpg',
    alt: 'Spotless Georgian London townhouse living room with polished oak floors',
  },
  'cleaner-elegant-hampstead': {
    businessName: 'Heathside Housekeepers',
    domain: 'heathsidehouse.co.uk',
    borough: 'Hampstead NW3',
    outcome: 'Vetted weekly housekeeping and deep-clean packages for North London homes.',
    ctaLabel: 'Book Weekly',
    accentHex: '#B45309',
    loadTime: '0.9s',
    image: '/src/assets/images/cleaner_bright_flat_1795370824764.jpg',
    alt: 'Sunlit freshly cleaned North London flat interior in Hampstead',
  },
  'cafe-elegant-southwark': {
    businessName: 'Bellenden Roastery & Bakery',
    domain: 'bellendenbakery.co.uk',
    borough: 'Peckham SE15',
    outcome: 'Categorised daily sourdough, pastry & brunch menu with V/VG/GF dietary labels.',
    ctaLabel: 'View Menu',
    accentHex: '#15803D',
    loadTime: '0.8s',
    image: '/src/assets/images/london_cafe_storefront_morning_1795428788037.jpg',
    alt: 'Independent East London racing-green corner sourdough bakery and coffee shopfront',
  },
  'cafe-bold-shoreditch': {
    businessName: 'Redchurch Espresso & Kitchen',
    domain: 'redchurchespresso.co.uk',
    borough: 'Shoreditch E2',
    outcome: 'High-contrast dark espresso aesthetic with morning bakery and all-day brunch.',
    ctaLabel: 'See Brunch',
    accentHex: '#E03528',
    loadTime: '0.9s',
    image: '/src/assets/images/cafe_brunch_pastry_1795373181666.jpg',
    alt: 'Sourdough brunch plate and laminated almond pastry in Shoreditch café',
  },
  'cafe-minimal-hammersmith': {
    businessName: 'Brackenbury Bakehouse',
    domain: 'brackenburybake.co.uk',
    borough: 'Hammersmith W6',
    outcome: 'Crisp 1-page neighbourhood café menu with live opening hours and allergen notes.',
    ctaLabel: 'Opening Hours',
    accentHex: '#B45309',
    loadTime: '0.7s',
    image: '/src/assets/images/emtrc_london_cafe_owner_1795422462836.jpg',
    alt: 'Independent London neighbourhood café owner preparing morning espresso',
  },
};

const WORK_SPOTLIGHT_SLIDES: readonly GallerySlide[] = [
  {
    src: '/src/assets/images/london_boiler_engineer_work_1795428786510.jpg',
    alt: 'Greenwich Gas Safe heating engineer inspecting combi boiler pipework',
    caption: 'Blackheath Heating & Electrical (SE10) — 24/7 emergency call-out banner, Gas Safe trust strip and 0.8s mobile load time.',
    tag: 'PLUMBER & HEATING · GREENWICH SE10',
  },
  {
    src: '/src/assets/images/london_salon_balayage_studio_1795428787038.jpg',
    alt: 'South Kensington hair stylist finishing balayage colour beside tall sash windows',
    caption: 'Linden & Silk (SW7) — Categorised colour & cut menus with upfront pricing and 1-tap Fresha appointment booking.',
    tag: 'HAIR & BEAUTY · SOUTH KENSINGTON SW7',
  },
  {
    src: '/src/assets/images/london_cafe_storefront_morning_1795428788037.jpg',
    alt: 'East London corner sourdough bakery and specialty espresso bar in morning sunlight',
    caption: 'Bellenden Roastery & Bakery (SE15) — Instant HTML brunch & dietary menus replacing slow pinch-to-zoom PDFs.',
    tag: 'NEIGHBOURHOOD CAFÉ · PECKHAM SE15',
  },
  {
    src: '/src/assets/images/london_electrician_smart_lighting_1795428787002.jpg',
    alt: 'Certified UK domestic electrician testing brushed brass dimmer switches in London home',
    caption: 'Regent Park Electrical (NW1) — NICEIC domestic rewiring, EICR landlord certificates and postcode quote forms.',
    tag: 'ELECTRICAL · CAMDEN NW1',
  },
];

const NICHE_FILTERS = [
  'All trades',
  'Barber Shop',
  'Hair & Beauty Salon',
  'Plumber & Electrician',
  'Cleaner',
  'Café',
] as const;

export function EmtrcWorkPage() {
  const { t } = useLanguage();
  const [selectedNiche, setSelectedNiche] = useState<(typeof NICHE_FILTERS)[number]>('All trades');

  const items = useMemo(() => {
    const base =
      selectedNiche === 'All trades'
        ? PREVIEW_PRESETS
        : PREVIEW_PRESETS.filter((p) => p.niche === selectedNiche);

    return base.map((preset) => {
      const meta = WORK_PRESET_METADATA[preset.id];
      return {
        ...preset,
        businessName: meta?.businessName ?? preset.label,
        domain: meta?.domain ?? `${preset.id}.co.uk`,
        borough: meta?.borough ?? 'London',
        outcome: meta?.outcome ?? 'Tailored London local business website built for mobile calls.',
        ctaLabel: meta?.ctaLabel ?? 'Open Live Site',
        accentHex: meta?.accentHex ?? '#E03528',
        loadTime: meta?.loadTime ?? '0.8s',
        image: meta?.image ?? '/src/assets/images/emtrc_hero_london_highstreet_1795374294553.jpg',
        alt: meta?.alt ?? preset.label,
      };
    });
  }, [selectedNiche]);

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="Work & Live London Website Showcase — 15 Interactive Builds | emtrc"
        description="Inspect 15 live, clickable London small business websites inside desktop and mobile previews across barbers, salons, plumbers, electricians, cleaners and cafés."
      />

      <PageHeader
        kicker={t.workPage.kicker}
        headlineLine1={t.workPage.headlineLine1}
        headlineLine2={t.workPage.headlineLine2}
        description={t.workPage.description}
        backdropImage="/src/assets/images/london_cafe_storefront_morning_1795428788037.jpg"
        backdropAlt="Independent London sourdough bakery and specialty coffee bar storefront"
        actions={
          <Link
            to="/free-demo"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-[var(--emtrc-accent-hover)]"
          >
            <span>{t.workPage.ctaLabel}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
        metrics={[
          { value: '15', label: 'Clickable live builds' },
          { value: '5', label: 'London trades covered' },
          { value: '<0.9s', label: 'Mobile edge load' },
          { value: '48 hrs', label: 'Free custom demo' },
        ]}
        bottomBar={
          <div
            role="tablist"
            aria-label="Filter live demos by trade"
            className="flex flex-wrap gap-x-6 gap-y-2.5"
          >
            {NICHE_FILTERS.map((filter) => {
              const active = selectedNiche === filter;
              const count =
                filter === 'All trades'
                  ? PREVIEW_PRESETS.length
                  : PREVIEW_PRESETS.filter((p) => p.niche === filter).length;
              const label = filter === 'All trades' ? t.workPage.allTrades : filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedNiche(filter)}
                  className={`relative pb-2 text-sm transition-colors ${
                    active ? 'font-semibold text-white' : 'text-[#9BA3B5] hover:text-white'
                  }`}
                >
                  <span>{label}</span>{' '}
                  <span className="font-mono-data text-xs text-[#8E96A8]">({count})</span>
                  {active && (
                    <motion.span
                      layoutId="work-filter-underline"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#FF7B63]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        }
      />

      {/* Live Website Portfolio Browser + Mobile Device Showcase Grid */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] py-10 sm:py-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <AnimatedSectionHeader
              index="01"
              kicker="Interactive Website Showcase · Click Any Build to Launch"
              headline="Real desktop & mobile builds"
              accentWord="tailored to every trade."
              tone="coral"
            />
            <p className="font-mono-data text-xs text-[var(--emtrc-muted)] whitespace-nowrap">
              Showing {items.length} of 15 live London sites
            </p>
          </div>

          <ScrollReveal
            key={selectedNiche}
            autoWrapChildren={false}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((item, idx) => (
              <ScrollRevealItem key={item.id}>
                <Link
                  to={`/demos/${item.id}`}
                  data-testid={`work-demo-card-${item.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--emtrc-accent)] hover:shadow-2xl"
                >
                  {/* Realistic Desktop Browser Mockup + Floating Mobile Phone Preview */}
                  <div className="relative bg-[#0E1118] px-4 pt-4 pb-5 sm:px-5">
                    {/* Browser Chrome Bar */}
                    <div className="overflow-hidden rounded-xl border border-white/12 bg-[#090B10] shadow-xl">
                      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#151924] px-3 py-2">
                        <div className="flex items-center gap-1.5" aria-hidden="true">
                          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                        </div>
                        <div className="flex items-center gap-1.5 rounded-md bg-black/45 px-3 py-0.5 font-mono-data text-[10px] text-[#C2C9D9] max-w-[220px] truncate">
                          <Lock className="h-2.5 w-2.5 shrink-0 text-emerald-400" aria-hidden="true" />
                          <span className="truncate">{item.domain}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 font-mono-data text-[10px] text-emerald-400 whitespace-nowrap">
                          <Gauge className="h-3 w-3" aria-hidden="true" />
                          {item.loadTime}
                        </span>
                      </div>

                      {/* Simulated Live Website Viewport Inside Browser */}
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <SafeImage
                          src={item.image}
                          alt={item.alt}
                          width={960}
                          height={540}
                          priority={idx < 4}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#07090D]/90 via-[#07090D]/55 to-[#07090D]/15" />

                        {/* Simulated Website Navigation + Hero Overlay inside the Browser Frame */}
                        <div className="absolute inset-0 flex flex-col justify-between p-4 pr-24 sm:p-5 sm:pr-28">
                          <div className="flex items-center gap-2 font-mono-data text-[10px] text-white/80">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: item.accentHex }}
                              aria-hidden="true"
                            />
                            <span className="uppercase tracking-wider">{item.borough}</span>
                            <span aria-hidden="true">·</span>
                            <span className="text-emerald-300">Open now</span>
                          </div>

                          <div>
                            <p className="font-editorial text-lg font-bold leading-tight text-white sm:text-xl">
                              {item.businessName}
                            </p>
                            <div className="mt-2.5 flex items-center gap-2">
                              <span
                                style={{ backgroundColor: item.accentHex }}
                                className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm"
                              >
                                <Phone className="h-2.5 w-2.5" aria-hidden="true" />
                                {item.ctaLabel}
                              </span>
                              <span className="rounded-md border border-white/25 bg-black/45 px-2 py-1 font-mono-data text-[10px] text-white/90 backdrop-blur-xs">
                                Prices &amp; Hours
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Sleek Mobile Preview Thumbnail overlapping bottom-right */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute right-6 bottom-2 hidden w-[88px] overflow-hidden rounded-[16px] border-2 border-[#343A49] bg-[#090B10] shadow-2xl transition-transform duration-300 group-hover:-translate-y-1 sm:block"
                    >
                      <div className="mx-auto mt-1.5 h-1 w-6 rounded-full bg-white/20" />
                      <div className="mt-1.5 h-[84px] overflow-hidden">
                        <SafeImage
                          src={item.image}
                          alt=""
                          width={200}
                          height={240}
                          className="h-full w-full object-cover opacity-85"
                        />
                      </div>
                      <div className="p-1.5">
                        <div className="h-1.5 w-10 rounded-full bg-white/75" />
                        <div
                          className="mt-1.5 h-3.5 w-full rounded-sm"
                          style={{ backgroundColor: item.accentHex }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Concise Portfolio Spec Strip */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 font-mono-data text-[11px]">
                        <span className="font-semibold text-[var(--emtrc-accent)]">
                          {item.niche}
                        </span>
                        <span className="uppercase text-[var(--emtrc-muted)]">
                          {item.style} theme · Mobile + Desktop
                        </span>
                      </div>
                      <h3 className="mt-1.5 font-editorial text-2xl font-bold text-[var(--emtrc-ink)] group-hover:text-[var(--emtrc-accent)] transition-colors">
                        {item.businessName}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                        {item.outcome}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[var(--emtrc-border)] pt-3.5">
                      <span className="inline-flex items-center gap-1.5 font-mono-data text-[11px] text-[var(--emtrc-muted)]">
                        <Smartphone className="h-3.5 w-3.5 text-[var(--emtrc-accent)]" aria-hidden="true" />
                        Responsive live demo
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono-data text-xs font-semibold text-[var(--emtrc-ink)] group-hover:text-[var(--emtrc-accent)]">
                        <span>{t.workPage.openDemo}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollRevealItem>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Hyper-Relevant London Craft Photography Carousel + Custom Demo CTA */}
      <section className="bg-[#0B0D12] py-12 text-[#F5F3EE] sm:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <AnimatedSectionHeader
                index="02"
                kicker={t.workPage.bottomKicker}
                headline={t.workPage.bottomHeadline}
                accentWord="in 48 hours."
                subtitle={t.workPage.bottomBody}
                tone="amber"
                light
              />
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/free-demo"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <span>{t.workPage.bottomCta}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={SITE.brand.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#DCE3F2] underline underline-offset-4 hover:text-white"
                >
                  <span>{t.hero.footnoteLink}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <GalleryCarousel
                slides={WORK_SPOTLIGHT_SLIDES}
                title="London Craft Direction · Real Trade Photography"
                aspect="16/9"
                darkSurface
              />
            </div>
          </div>
        </div>
      </section>
    </EmtrcLayout>
  );
}
