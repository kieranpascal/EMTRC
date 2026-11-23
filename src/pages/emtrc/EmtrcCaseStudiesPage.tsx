import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, MapPin } from 'lucide-react';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { PageHeader } from '../../components/emtrc/PageHeader';
import {
  KickerRule,
  ParallaxFrame,
  Reveal,
  StaggerContainer,
  StaggerItem,
} from '../../components/emtrc/Reveal';
import { BeforeAfterSlider } from '../../components/emtrc/BeforeAfterSlider';
import { MapsRankingOrbitIllustration } from '../../components/emtrc/AnimatedIllustrations';
import { SafeImage } from '../../components/SafeImage';
import { CASE_STUDIES } from '../../content/caseStudies';
import { SITE } from '../../content/site';

const TRADE_FILTERS = [
  'All Trades',
  'Barber Shop',
  'Plumber & Heating',
  'Hair & Beauty',
  'Local Cleaner',
  'Neighbourhood Café',
] as const;

export function EmtrcCaseStudiesPage() {
  const [selectedTrade, setSelectedTrade] = useState<(typeof TRADE_FILTERS)[number]>('All Trades');

  const filtered =
    selectedTrade === 'All Trades'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.trade === selectedTrade);

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="London Case Studies — Before & After Websites | emtrc"
        description="See how emtrc transforms London barbers, heating engineers, salons, cleaners and cafés from social-only or slow websites into sub-second local call generators."
      />

      <PageHeader
        kicker="London Case Studies · Architecture & Outcomes"
        headlineLine1="What a 48-hour rebuild"
        headlineLine2="actually looks like in London."
        description="Every case study below pairs a real London high-street bottleneck — hidden prices, missed calls on site, slow PDF menus or domain lock-in — with a live, clickable working build you can inspect on your phone right now."
        backdropImage="/src/assets/images/emtrc_london_barber_craft_1795422463841.jpg"
        backdropAlt="Independent East London barber shop studio interior"
        metrics={[
          { value: '0.9s', label: 'Typical mobile 4G paint' },
          { value: '48h', label: 'To first live demo link' },
          { value: '99/100', label: 'Mobile Lighthouse target' },
          { value: '15', label: 'Live London demos online' },
        ]}
      />

      {/* Interactive Before / After Website Comparison */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]">
        <div className="mx-auto max-w-[1200px] px-5 py-11 sm:px-8 sm:py-14">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <Reveal>
              <KickerRule>Interactive Comparison</KickerRule>
              <h2 className="mt-2.5 font-editorial text-3xl font-bold tracking-tight sm:text-4xl">
                Drag to compare before &amp; after.
              </h2>
            </Reveal>
            <p className="max-w-md text-sm text-[var(--emtrc-muted)]">
              Slide the divider left and right to see the gap between a typical unmanaged London listing and a sub-second emtrc shopfront.
            </p>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Filterable Case Studies Catalog */}
      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-22">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--emtrc-border)] pb-6">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter case studies by trade">
            {TRADE_FILTERS.map((trade) => {
              const active = selectedTrade === trade;
              return (
                <button
                  key={trade}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedTrade(trade)}
                  className={`relative rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                    active
                      ? 'text-white'
                      : 'border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] text-[var(--emtrc-muted)] hover:border-[var(--emtrc-ink)] hover:text-[var(--emtrc-ink)]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="case-study-filter-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-[var(--emtrc-accent)]"
                    />
                  )}
                  <span className="relative z-10">{trade}</span>
                </button>
              );
            })}
          </div>
          <p className="font-mono-data text-xs text-[var(--emtrc-muted)]">
            Showing {filtered.length} of {CASE_STUDIES.length} London builds
          </p>
        </div>

        <StaggerContainer
          className={`mt-10 grid grid-cols-1 gap-7 ${
            filtered.length === 1
              ? 'max-w-2xl'
              : filtered.length === 2
                ? 'md:grid-cols-2'
                : 'md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filtered.map((study) => (
            <StaggerItem key={study.slug}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--emtrc-accent)] hover:shadow-xl">
                <div className="relative h-56 overflow-hidden bg-[var(--emtrc-navy)]">
                  <ParallaxFrame offset={14} className="h-full w-full">
                    <SafeImage
                      src={study.image}
                      alt={study.imageAlt}
                      width={960}
                      height={640}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </ParallaxFrame>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono-data text-[11px] text-[var(--emtrc-muted)]">
                      <span className="font-semibold text-[var(--emtrc-accent)]">
                        {study.trade.toUpperCase()}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {study.borough} · {study.postcode}
                      </span>
                    </div>

                    <h3 className="mt-3 font-editorial text-2xl font-bold leading-snug text-[var(--emtrc-ink)]">
                      <Link
                        to={`/case-studies/${study.slug}`}
                        className="hover:text-[var(--emtrc-accent)] transition-colors"
                      >
                        {study.businessName}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm font-medium text-[var(--emtrc-ink)]">
                      {study.headline}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                      {study.summary}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3 border-y border-[var(--emtrc-border)] py-3.5 text-xs">
                      <div>
                        <p className="font-mono-data text-lg font-bold text-[var(--emtrc-accent)]">
                          {study.heroStat}
                        </p>
                        <p className="text-[var(--emtrc-muted)]">{study.heroStatLabel}</p>
                      </div>
                      <div>
                        <p className="font-mono-data text-sm font-semibold text-[var(--emtrc-ink)]">
                          {study.planUsed}
                        </p>
                        <p className="mt-0.5 text-[var(--emtrc-muted)]">{study.turnaround}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <Link
                      to={`/case-studies/${study.slug}`}
                      data-testid={`case-study-link-${study.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--emtrc-ink)] hover:text-[var(--emtrc-accent)]"
                    >
                      <span>Read full breakdown</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>

                    <Link
                      to={`/demos/${study.demoPresetId}`}
                      className="inline-flex items-center gap-1.5 font-mono-data text-xs font-semibold text-[var(--emtrc-accent)] hover:underline"
                    >
                      <span>Inspect live site</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-14 border-t border-[var(--emtrc-border)] pt-12">
          <MapsRankingOrbitIllustration />
        </div>

        {/* Representative disclosure & CTA */}
        <Reveal>
          <div className="mt-12 rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-navy)] p-8 text-white sm:p-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <KickerRule light>Built around your exact shop or trade</KickerRule>
                <h2 className="mt-3 font-editorial text-2xl font-bold sm:text-3xl">
                  Want a working before-and-after demo for your own business?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#B4BCCB]">
                  Send us your business name, London borough and trade. We build a working demo in 2 working days so you can inspect it on your own phone before spending a penny.
                </p>
                <p className="mt-4 text-xs text-[#8D96A8]">
                  {SITE.ownerVoices.disclosureNote}
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                <Link
                  to="/free-demo"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)] lg:w-auto"
                >
                  <span>Request my free demo</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/work"
                  className="text-xs font-semibold text-[#D4DAE4] underline underline-offset-4 hover:text-white"
                >
                  Or browse all 15 live London demos →
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </EmtrcLayout>
  );
}
