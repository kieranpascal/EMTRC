import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
} from 'lucide-react';
import { SITE } from '../../content/site';
import { getServiceBySlug, SERVICE_DETAILS } from '../../content/services';
import { useLanguage } from '../../context/LanguageContext';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { GalleryCarousel, type GallerySlide } from '../../components/emtrc/GalleryCarousel';
import {
  EditorialHeading,
  KickerRule,
  Reveal,
  StaggerContainer,
  StaggerItem,
} from '../../components/emtrc/Reveal';
import { AnimatedSectionHeader, SectionSeparator } from '../../components/emtrc/SectionSeparator';
import { ServicePreviewPhone } from '../../components/emtrc/ServicePreviewPhone';

const SERVICE_EXTRA_SLIDES: Record<string, readonly GallerySlide[]> = {
  websites: [
    {
      src: '/src/assets/images/london_cafe_storefront_morning_1795428788037.jpg',
      alt: 'East London neighbourhood sourdough bakery and coffee bar storefront',
      caption: 'Sub-second mobile shopfronts built for London cafés, barbers, salons and trades.',
      tag: 'EAST LONDON · STOREFRONT',
    },
    {
      src: '/src/assets/images/london_salon_balayage_studio_1795428787038.jpg',
      alt: 'South Kensington hair studio interior photographed in crisp natural window light',
      caption: 'Categorised treatment menus and transparent pricing that turn walk-by searchers into bookings.',
      tag: 'SOUTH KENSINGTON · SALON BUILD',
    },
  ],
  'domains-email': [
    {
      src: '/src/assets/images/london_studio_dusk_header_1795426202168.jpg',
      alt: 'Independent London studio street at blue hour dusk',
      caption: 'Your .co.uk or .com domain stays legally registered in your own business name — zero agency lock-in.',
      tag: 'OWNERSHIP GUARANTEE',
    },
    {
      src: '/src/assets/images/london_electrician_smart_lighting_1795428787002.jpg',
      alt: 'London electrician working inside a modern renovated terraced townhouse',
      caption: 'Authenticated SPF, DKIM and DMARC DNS records so customer quotes land in primary inboxes.',
      tag: 'INBOX DELIVERABILITY',
    },
  ],
  'local-seo': [
    {
      src: '/src/assets/images/barber_fade_editorial_1795426201374.jpg',
      alt: 'Master London barber crafting a crisp skin fade in Hackney',
      caption: 'Primary category alignment, borough pages and LocalBusiness schema built for the Google Maps 3-Pack.',
      tag: 'GOOGLE MAPS · TOP 3',
    },
    {
      src: '/src/assets/images/london_cafe_storefront_morning_1795428788037.jpg',
      alt: 'Independent East London sourdough bakery facade',
      caption: 'Structured HTML service lists readable by ChatGPT, Perplexity and Apple Intelligence.',
      tag: 'AI SEARCH · CITATIONS',
    },
  ],
  'review-engine': [
    {
      src: '/src/assets/images/salon_manicure_studio_1795426201499.jpg',
      alt: 'Sunlit Islington manicure table with botanical bottles and crisp linen',
      caption: 'Polite 2-hour post-appointment SMS invitations that stay 100% compliant with the UK DMCC Act.',
      tag: 'UK DMCC COMPLIANT',
    },
    {
      src: '/src/assets/images/london_clean_townhouse_1795426201377.jpg',
      alt: 'Spotless Georgian London townhouse living room after a professional clean',
      caption: 'Turn every finished job into verified borough-specific social proof on Google Maps.',
      tag: 'VERIFIED 5-STAR VELOCITY',
    },
  ],
  'lead-catcher': [
    {
      src: '/src/assets/images/london_boiler_engineer_work_1795428786510.jpg',
      alt: 'British Gas Safe heating engineer inspecting combi boiler pipework',
      caption: 'Hands busy on a boiler install? Missed callers receive an instant branded SMS within 8 seconds.',
      tag: '8-SECOND RECOVERY',
    },
    {
      src: '/src/assets/images/emtrc_london_plumber_van_1795422464729.jpg',
      alt: 'London trade engineer checking recovered SMS enquiries beside his van',
      caption: 'Every SMS reply lands directly in your emtrc mobile app so you book the job between visits.',
      tag: 'LIVE SMS INBOX',
    },
  ],
  'ai-receptionist': [
    {
      src: '/src/assets/images/london_electrician_smart_lighting_1795428787002.jpg',
      alt: 'Certified UK domestic electrician testing architectural brass dimmers',
      caption: 'Natural British-voice reception answering emergency call-outs, pricing questions and bookings 24/7.',
      tag: '24/7 BRITISH VOICE',
    },
    {
      src: '/src/assets/images/emtrc_app_hero_mobile_1795424181857.jpg',
      alt: 'London shop owner reading instant AI call transcripts on smartphone',
      caption: 'Instant structured call summary texted to your pocket the moment the caller hangs up.',
      tag: 'INSTANT TRANSCRIPT',
    },
  ],
  'business-phone': [
    {
      src: '/src/assets/images/london_studio_dusk_header_1795426202168.jpg',
      alt: 'East London high-street premises ready for Cloud VoIP',
      caption: 'Port your 020 landline safely before the 31 January 2027 Openreach copper switch-off.',
      tag: 'PSTN 2027 READY',
    },
    {
      src: '/src/assets/images/emtrc_app_hero_mobile_1795424181857.jpg',
      alt: 'London business owner answering 020 calls on mobile VoIP app outside shopfront',
      caption: 'Ring reception handset and mobile app simultaneously with automatic after-hours routing.',
      tag: '020 IN YOUR POCKET',
    },
  ],
  'care-plan': [
    {
      src: '/src/assets/images/emtrc_london_studio_team_1795422461958.jpg',
      alt: 'emtrc London studio team reviewing monthly site updates and performance telemetry',
      caption: 'Send price changes or bank-holiday hours on WhatsApp — our London studio publishes within 24 hours.',
      tag: '24H HUMAN EDIT SLA',
    },
    {
      src: '/src/assets/images/london_boiler_engineer_work_1795428786510.jpg',
      alt: 'Independent London tradesperson focused on client craft while emtrc handles website maintenance',
      caption: 'Cloudflare edge security, SSL renewals, daily backups and plain-English monthly call reports.',
      tag: 'ZERO ADMIN OVERHEAD',
    },
  ],
};

export function EmtrcServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug);
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const [openFaqKey, setOpenFaqKey] = useState<string | null>('0-0');

  const gallerySlides = useMemo<GallerySlide[]>(() => {
    if (!service) return [];
    const extras = SERVICE_EXTRA_SLIDES[service.slug] ?? [
      {
        src: '/src/assets/images/london_studio_dusk_header_1795426202168.jpg',
        alt: 'East London independent studio at dusk',
        caption: 'Designed and supported directly from London for all 32 boroughs.',
        tag: 'LONDON STUDIO',
      },
      {
        src: '/src/assets/images/emtrc_app_hero_mobile_1795424181857.jpg',
        alt: 'London business owner managing calls and edits from smartphone',
        caption: 'Managed seamlessly from the emtrc pocket app and Client Portal.',
        tag: 'MOBILE CONTROL',
      },
    ];

    return [
      {
        src: service.heroImage,
        alt: service.heroAlt,
        caption: service.heroAlt,
        tag: `${service.shortTitle.toUpperCase()} · OVERVIEW`,
      },
      {
        src: service.secondaryImage,
        alt: service.secondaryAlt,
        caption: service.secondaryAlt,
        tag: 'IN THE FIELD',
      },
      ...extras,
    ];
  }, [service]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const relatedServices = service.relatedSlugs
    .map((s) => SERVICE_DETAILS.find((item) => item.slug === s))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <EmtrcLayout>
      <EmtrcHead
        title={`${service.shortTitle} for London Businesses | emtrc`}
        description={service.subheadline}
      />

      {/* CHAPTER 1: Dark Architectural Service Hero + Swipeable 4-Photo GalleryCarousel */}
      <section className="relative overflow-hidden bg-[#090B10] text-[#F5F4F0]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '68px 68px',
          }}
        />
        <div className="relative mx-auto max-w-[1200px] px-5 pt-8 pb-12 sm:px-8 sm:pt-12 sm:pb-16">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 font-mono-data text-xs font-semibold text-[#9BA3B5] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.servicePage.backToServices}</span>
            <span aria-hidden="true" className="text-white/25">/</span>
            <span className="text-[#FF8C73]">{service.shortTitle}</span>
          </Link>

          <div className="mt-7 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <KickerRule light>
                {service.category} · {service.priceTag}
              </KickerRule>

              <EditorialHeading
                as="h1"
                immediate
                line1={service.headlineLine1}
                line2={service.headlineLine2}
                line2Tone="accent"
                className="mt-4 font-editorial text-[clamp(2.35rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.025em] text-white [&>span:nth-child(2)>span]:font-editorial-italic [&>span:nth-child(2)>span]:font-normal"
              />

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#C2C9D9] sm:text-lg">
                {service.subheadline}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <Link
                  to={service.closingCtaTo}
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-6 py-3.5 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <span>{service.closingCtaLabel}</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <a
                  href={SITE.brand.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:border-white/45"
                >
                  <Calendar className="h-4 w-4 text-[#FF8C73]" aria-hidden="true" />
                  <span>{t.hero.footnoteLink}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <GalleryCarousel
                slides={gallerySlides}
                title={`${service.shortTitle} · 4-Photo Gallery`}
                aspect="16/10"
                darkSurface
              />
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator variant="angle" from="obsidian" to="sand" accentColor="coral" />

      {/* CHAPTER 2: "THE PAIN THIS KILLS" 4-Card Diagnostic Grid */}
      <section className="bg-[var(--emtrc-sand)]">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <AnimatedSectionHeader
            index="01"
            kicker={t.servicePage.painKicker}
            headline={t.servicePage.painHeadline}
            tone="coral"
          />

          <StaggerContainer className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {service.pains.map((pain, idx) => (
              <StaggerItem key={pain.title}>
                <article className="flex h-full flex-col justify-between rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6 shadow-xs transition-colors hover:border-[var(--emtrc-accent)]">
                  <div>
                    <div className="flex items-center justify-between gap-4 font-mono-data text-xs">
                      <span className="font-bold text-[var(--emtrc-muted)]">
                        0{idx + 1}
                      </span>
                      <span className="font-semibold text-[var(--emtrc-accent)]">
                        {pain.costLabel}
                      </span>
                    </div>
                    <h3 className="mt-3 font-editorial text-xl font-bold leading-snug text-[var(--emtrc-ink)]">
                      {pain.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                      {pain.problem}
                    </p>
                  </div>
                  <div className="mt-5 flex items-start gap-2.5 border-t border-[var(--emtrc-border)] pt-4 text-sm font-semibold text-[var(--emtrc-ink)]">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                      aria-hidden="true"
                    />
                    <span>{pain.solution}</span>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionSeparator variant="architectural-ribbon" from="sand" to="obsidian" accentColor="amber" />

      {/* CHAPTER 3: "Watch it actually work." 3 Steps + Tall Interactive ServicePreviewPhone */}
      <section className="bg-[#0B0D12] text-[#F5F3EE]">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <AnimatedSectionHeader
                index="02"
                kicker="How it runs week to week"
                headline={t.servicePage.watchHeadline1}
                accentWord={t.servicePage.watchHeadline2}
                subtitle={service.watchIntro}
                tone="amber"
                light
              />

              <StaggerContainer className="mt-8 space-y-5">
                {service.steps.map((step) => (
                  <StaggerItem key={step.num}>
                    <div className="grid grid-cols-12 gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <span className="col-span-2 font-mono-data text-lg font-bold text-[#FF8C73]">
                        {step.num}
                      </span>
                      <div className="col-span-10">
                        <h3 className="font-editorial text-lg font-bold text-white">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-[#BAC5DC]">{step.body}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <ServicePreviewPhone appTitle={service.previewAppTitle} tabs={service.previewTabs} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator variant="wave" from="obsidian" to="surface" accentColor="emerald" />

      {/* CHAPTER 4: "Who this is for." 3 London Trade Personas */}
      <section className="bg-[var(--emtrc-surface)]">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <AnimatedSectionHeader
            index="03"
            kicker="Built for independent London operators"
            headline={t.servicePage.whoHeadline}
            tone="emerald"
          />

          <StaggerContainer className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {service.personas.map((persona, pIdx) => (
              <StaggerItem key={persona.title}>
                <article className="flex h-full flex-col justify-between rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] p-6">
                  <div>
                    <p className="font-mono-data text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      0{pIdx + 1} · {persona.tag}
                    </p>
                    <h3 className="mt-2 font-editorial text-xl font-bold leading-snug text-[var(--emtrc-ink)]">
                      {persona.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                      {persona.description}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionSeparator variant="editorial-rule" from="surface" to="sand" label="Craftsmanship & Ownership" accentColor="coral" />

      {/* CHAPTER 5: "Why ours beats DIY." Split GalleryCarousel + Proof Points */}
      <section className="bg-[var(--emtrc-sand)]">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <GalleryCarousel
                  slides={[...gallerySlides].reverse()}
                  title="London Proof & Craftsmanship"
                  aspect="4/3"
                />
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <AnimatedSectionHeader
                index="04"
                kicker="Built properly, owned by you"
                headline={t.servicePage.whyHeadline1}
                accentWord={t.servicePage.whyHeadline2}
                tone="coral"
              />
              <ul className="mt-7 space-y-3.5 border-t border-[var(--emtrc-border)] pt-6">
                {service.whyUsPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-relaxed sm:text-base">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-[var(--emtrc-accent)]"
                      aria-hidden="true"
                    />
                    <span className="text-[var(--emtrc-ink)]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator variant="angle" from="sand" to="surface" accentColor="blue" flip />

      {/* CHAPTER 6: Grouped Expandable FAQ Accordions */}
      <section className="bg-[var(--emtrc-surface)]">
        <div className="mx-auto max-w-[960px] px-5 py-12 sm:px-8 sm:py-16">
          <AnimatedSectionHeader
            index="05"
            kicker={t.servicePage.faqKicker}
            headline={t.servicePage.faqHeadline}
            tone="blue"
          />

          <div className="mt-9 space-y-8" data-testid="service-faq-groups">
            {service.faqGroups.map((group, gIdx) => (
              <div key={group.groupTitle}>
                <h3 className="font-mono-data text-xs font-bold uppercase tracking-wider text-[var(--emtrc-accent)]">
                  {group.groupTitle}
                </h3>
                <div className="mt-3 divide-y divide-[var(--emtrc-border)] border-y border-[var(--emtrc-border)]">
                  {group.questions.map((item, qIdx) => {
                    const key = `${gIdx}-${qIdx}`;
                    const isOpen = openFaqKey === key;
                    return (
                      <div key={item.q}>
                        <button
                          type="button"
                          data-testid={`faq-trigger-${key}`}
                          aria-expanded={isOpen}
                          onClick={() => setOpenFaqKey(isOpen ? null : key)}
                          className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-[var(--emtrc-ink)] transition-colors hover:text-[var(--emtrc-accent)]"
                        >
                          <span>{item.q}</span>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 text-[var(--emtrc-muted)] transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-[var(--emtrc-accent)]' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={prefersReduced ? false : { height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={prefersReduced ? undefined : { height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="pb-5 pr-8 text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-base">
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator variant="angle" from="surface" to="canvas" accentColor="coral" />

      {/* CHAPTER 7: Related Services + Tailored Closing CTA */}
      <section className="bg-[var(--emtrc-canvas)] py-12 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <AnimatedSectionHeader
            kicker={t.servicePage.relatedKicker}
            headline={t.servicePage.relatedHeadline}
            tone="coral"
          />

          <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                to={`/services/${rel.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--emtrc-accent)] hover:shadow-lg"
              >
                <div>
                  <p className="font-mono-data text-[11px] font-semibold uppercase tracking-wider text-[var(--emtrc-accent)]">
                    {rel.category}
                  </p>
                  <h3 className="mt-2 font-editorial text-xl font-bold text-[var(--emtrc-ink)] group-hover:text-[var(--emtrc-accent)]">
                    {rel.shortTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                    {rel.menuDescription}
                  </p>
                </div>
                <p className="mt-5 inline-flex items-center gap-1.5 font-mono-data text-xs font-semibold text-[var(--emtrc-accent)]">
                  <span>Read full details</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </p>
              </Link>
            ))}
          </div>

          {/* Closing Band */}
          <Reveal className="mt-12">
            <div className="rounded-2xl border border-[var(--emtrc-navy-border)] bg-[#0B0D12] p-8 text-[#F5F3EE] sm:p-11">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <p className="font-mono-data text-xs font-semibold text-[#FF8C73]">
                    {service.priceTag}
                  </p>
                  <h2 className="mt-2 font-editorial text-3xl font-bold leading-tight text-white sm:text-4xl">
                    {service.closingHeadline}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#BAC5DC] sm:text-base">
                    {service.closingBody}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                  <Link
                    to={service.closingCtaTo}
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                  >
                    <span>{service.closingCtaLabel}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </EmtrcLayout>
  );
}
