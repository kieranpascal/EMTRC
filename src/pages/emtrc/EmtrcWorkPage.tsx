import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import { SITE } from '../../content/site';
import { PREVIEW_PRESETS } from '../../context/SiteContext';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { Reveal } from '../../components/emtrc/Reveal';

const PRESET_METADATA: Record<
  string,
  { businessName: string; borough: string; outcome: string; image: string; alt: string }
> = {
  'barber-bold-hackney': {
    businessName: 'Kingsland Blade & Fade',
    borough: 'Hackney E8',
    outcome: 'Live open status, upfront fade pricing and one-tap Fresha chair booking.',
    image: '/src/assets/images/barber_shop_interior_1795370825070.jpg',
    alt: 'Kingsland Blade & Fade barbershop interior in Hackney',
  },
  'barber-elegant-marylebone': {
    businessName: 'Chiltern & Crown Grooming',
    borough: 'Marylebone W1U',
    outcome: 'Editorial serif aesthetic for traditional hot-towel shaves and scissor cuts.',
    image: '/src/assets/images/barber_hero_craft_1795370823978.jpg',
    alt: 'Traditional London barber craft tools and leather chair',
  },
  'barber-minimal-brixton': {
    businessName: 'Coldharbour Cuts',
    borough: 'Brixton SW9',
    outcome: 'Ultra-fast 1-page Starter build with walk-in hours and tap-to-call.',
    image: '/src/assets/images/barber_fade_detail_1795370824505.jpg',
    alt: 'Fresh skin fade detail in a South London barbershop',
  },
  'salon-elegant-kensington': {
    businessName: 'Linden & Silk',
    borough: 'South Kensington SW7',
    outcome: 'Categorised cut, colour and BIAB treatment menus with direct booking.',
    image: '/src/assets/images/salon_warm_studio_1795370824298.jpg',
    alt: 'Sunlit London hair and beauty salon interior',
  },
  'salon-bold-islington': {
    businessName: 'Upper Street Colour House',
    borough: 'Islington N1',
    outcome: 'High-contrast modern salon showcase with stylists, pricing and Instagram gallery.',
    image: '/src/assets/images/salon_nails_botanicals_1795370825343.jpg',
    alt: 'Manicure and botanical beauty salon finish',
  },
  'salon-minimal-richmond': {
    businessName: 'Kew Green Hair & Brow',
    borough: 'Richmond TW9',
    outcome: 'Calm 1-page Starter site built for rapid mobile appointment booking.',
    image: '/src/assets/images/salon_warm_studio_1795370824298.jpg',
    alt: 'Minimal warm hair and brow studio in Richmond',
  },
  'trades-bold-greenwich': {
    businessName: 'Blackheath Heating & Electrical',
    borough: 'Greenwich SE10',
    outcome: '24/7 emergency call-out banner, fixed rates and Gas Safe + NICEIC badges.',
    image: '/src/assets/images/trades_precision_heating_1795370825196.jpg',
    alt: 'Precision copper heating pipework installed in London',
  },
  'trades-elegant-camden': {
    businessName: 'Regent Park Electrical',
    borough: 'Camden NW1',
    outcome: 'NICEIC-certified domestic rewiring, EICRs and EV chargers with transparent rates.',
    image: '/src/assets/images/trades_electrical_craft_1795373181964.jpg',
    alt: 'Clean modern residential electrical consumer unit installation',
  },
  'trades-minimal-ealing': {
    businessName: 'Westside Plumbing & Boilers',
    borough: 'Ealing W5',
    outcome: 'Fast 1-page sole-trader plumber build focused on tap-to-call and postcode trust.',
    image: '/src/assets/images/trades_precision_heating_1795370825196.jpg',
    alt: 'Neat London boiler and copper pipework installation',
  },
  'cleaner-minimal-wandsworth': {
    businessName: 'Battersea Bright Cleaning',
    borough: 'Wandsworth SW11',
    outcome: 'Built-in postcode & bedroom quote calculator for regular & end-of-tenancy cleans.',
    image: '/src/assets/images/cleaner_kitchen_sparkle_1795373182615.jpg',
    alt: 'Spotless modern London flat kitchen after cleaning',
  },
  'cleaner-bold-tower-hamlets': {
    businessName: 'Docklands Deposit-Back Cleans',
    borough: 'Canary Wharf E14',
    outcome: 'End-of-tenancy checklist, fixed flat pricing and instant quote request form.',
    image: '/src/assets/images/cleaner_living_room_1795373182422.jpg',
    alt: 'Freshly cleaned bright London apartment living room',
  },
  'cleaner-elegant-hampstead': {
    businessName: 'Heathside Housekeepers',
    borough: 'Hampstead NW3',
    outcome: 'Vetted weekly housekeeping and deep-clean packages for North London homes.',
    image: '/src/assets/images/cleaner_living_room_1795373182422.jpg',
    alt: 'Calm sunlit North London living room interior',
  },
  'cafe-elegant-southwark': {
    businessName: 'Bellenden Roastery & Bakery',
    borough: 'Peckham SE15',
    outcome: 'Categorised daily coffee, pastry & brunch menu with V/VG/GF dietary labels.',
    image: '/src/assets/images/cafe_brunch_pastry_1795373181666.jpg',
    alt: 'Sourdough brunch plate and almond croissant at London café',
  },
  'cafe-bold-shoreditch': {
    businessName: 'Redchurch Espresso & Kitchen',
    borough: 'Shoreditch E2',
    outcome: 'High-contrast dark espresso aesthetic with morning bakery and all-day brunch.',
    image: '/src/assets/images/cafe_coffee_bakery_1795370824300.jpg',
    alt: 'Specialty espresso bar and laminated pastries in East London',
  },
  'cafe-minimal-hammersmith': {
    businessName: 'Brackenbury Bakehouse',
    borough: 'Hammersmith W6',
    outcome: 'Crisp 1-page neighbourhood café menu with opening hours and allergen notes.',
    image: '/src/assets/images/cafe_coffee_bakery_1795370824300.jpg',
    alt: 'Artisan morning bakehouse counter and coffee bar',
  },
};

const NICHE_FILTERS = [
  'All trades',
  'Barber Shop',
  'Hair & Beauty Salon',
  'Plumber & Electrician',
  'Cleaner',
  'Café',
] as const;

export function EmtrcWorkPage() {
  const [selectedNiche, setSelectedNiche] = useState<(typeof NICHE_FILTERS)[number]>('All trades');

  const items = useMemo(() => {
    const base =
      selectedNiche === 'All trades'
        ? PREVIEW_PRESETS
        : PREVIEW_PRESETS.filter((p) => p.niche === selectedNiche);

    return base.map((preset) => {
      const meta = PRESET_METADATA[preset.id];
      return {
        ...preset,
        businessName: meta?.businessName ?? preset.label,
        borough: meta?.borough ?? 'London',
        outcome: meta?.outcome ?? 'Tailored London local business website built for mobile calls.',
        image: meta?.image ?? '/src/assets/images/emtrc_hero_london_highstreet_1795374294553.jpg',
        alt: meta?.alt ?? preset.label,
      };
    });
  }, [selectedNiche]);

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="Work & Live London Demos — 15 Working Examples | emtrc"
        description="Browse 15 live, interactive London small business websites built by emtrc across barbers, salons, plumbers, electricians, cleaners and cafés."
      />

      {/* Editorial Header */}
      <section className="border-b border-[var(--emtrc-border)] pt-12 pb-14 sm:pt-16 sm:pb-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
                Live portfolio · 15 clickable London demos
              </p>
              <h1 className="mt-3 font-editorial text-4xl font-extrabold leading-[1.03] tracking-[-0.035em] text-[var(--emtrc-ink)] sm:text-6xl">
                Real working demos.
                <span className="block text-[var(--emtrc-muted)]">
                  Not flat screenshots.
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--emtrc-muted)] sm:text-lg">
                Every card below opens a live, interactive demo website across five London trades
                and three visual styles (Bold, Elegant and Minimal) — the exact standard we build
                for your free 48-hour demo.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                to="/free-demo"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
              >
                <span>Get one built for your business</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Clean underline filter tabs (zero pill spam) */}
          <div
            role="tablist"
            aria-label="Filter live demos by trade"
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--emtrc-border)] pt-5"
          >
            {NICHE_FILTERS.map((filter) => {
              const active = selectedNiche === filter;
              const count =
                filter === 'All trades'
                  ? PREVIEW_PRESETS.length
                  : PREVIEW_PRESETS.filter((p) => p.niche === filter).length;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedNiche(filter)}
                  className={`pb-2 text-sm transition-colors ${
                    active
                      ? 'border-b-2 border-[var(--emtrc-accent)] font-bold text-[var(--emtrc-ink)]'
                      : 'text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]'
                  }`}
                >
                  {filter}{' '}
                  <span className="text-xs font-normal text-[var(--emtrc-muted)]">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live Demo Grid */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, idx) => (
              <Reveal key={item.id} delay={(idx % 3) * 0.04}>
                <Link
                  to={`/demos/${item.id}`}
                  data-testid={`work-demo-card-${item.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--emtrc-ink)] hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--emtrc-sand)]">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading={idx < 3 ? 'eager' : 'lazy'}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold text-[var(--emtrc-brass)]">
                      {item.niche} · {item.borough} · {item.style}
                    </p>
                    <h2 className="mt-2 font-editorial text-xl font-bold text-[var(--emtrc-ink)] group-hover:text-[var(--emtrc-accent)] transition-colors">
                      {item.businessName}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                      {item.outcome}
                    </p>
                    <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--emtrc-ink)] group-hover:text-[var(--emtrc-accent)]">
                      <span>Open interactive demo</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Bottom Custom Demo Prompt */}
          <div className="mt-16 rounded-2xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] p-8 text-[#F5F3EE] sm:p-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass-light)]">
                  Don’t see your exact trade?
                </p>
                <h2 className="mt-2 font-editorial text-2xl font-extrabold text-white sm:text-3xl">
                  We build your free demo around your actual shop, services &amp; London postcode.
                </h2>
                <p className="mt-2 text-sm text-[#BAC5DC]">
                  Every site is tailored to your colours, photos, prices, booking platform and local
                  borough — delivered in 2 working days with zero obligation.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
                <Link
                  to="/free-demo"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <span>Request my free demo</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={SITE.brand.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#DCE3F2] underline underline-offset-4 hover:text-white"
                >
                  <span>Or book a 15-min chat</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </EmtrcLayout>
  );
}
