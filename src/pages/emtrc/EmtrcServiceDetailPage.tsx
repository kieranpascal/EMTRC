import { useState } from 'react';
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
import {
  EditorialHeading,
  KickerRule,
  Reveal,
  StaggerContainer,
  StaggerItem,
} from '../../components/emtrc/Reveal';
import { ServicePreviewPhone } from '../../components/emtrc/ServicePreviewPhone';
import { SafeImage } from '../../components/SafeImage';

export function EmtrcServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug);
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const [openFaqKey, setOpenFaqKey] = useState<string | null>('0-0');

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

      {/* CHAPTER 1: Editorial Service Hero with Warm Radial Wash */}
      <section className="hero-editorial-wash overflow-hidden border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-24">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.servicePage.backToServices}</span>
            <span aria-hidden="true" className="text-[var(--emtrc-border)]">/</span>
            <span className="text-[var(--emtrc-ink)]">{service.shortTitle}</span>
          </Link>

          <div className="mt-7 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <KickerRule>
                {service.category} · {service.priceTag}
              </KickerRule>

              <EditorialHeading
                as="h1"
                immediate
                line1={service.headlineLine1}
                line2={service.headlineLine2}
                line2Tone="brass"
                className="mt-4 font-editorial text-[clamp(2.5rem,5.4vw,4.35rem)] font-extrabold leading-[1.01] tracking-[-0.035em] text-[var(--emtrc-ink)]"
              />

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--emtrc-muted)] sm:text-lg">
                {service.subheadline}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
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
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-5 py-3.5 text-sm font-semibold text-[var(--emtrc-ink)] whitespace-nowrap transition-colors hover:border-[var(--emtrc-ink)]"
                >
                  <Calendar className="h-4 w-4 text-[var(--emtrc-brass)]" aria-hidden="true" />
                  <span>{t.hero.footnoteLink}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] shadow-lg">
                <SafeImage
                  src={service.heroImage}
                  alt={service.heroAlt}
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 2: "— THE PAIN THIS KILLS" 4-Card Diagnostic Grid (Klyara signature) */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <KickerRule>{t.servicePage.painKicker}</KickerRule>
            <h2 className="mt-3 font-editorial text-3xl font-extrabold tracking-[-0.03em] sm:text-5xl">
              {t.servicePage.painHeadline}
            </h2>
          </Reveal>

          <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {service.pains.map((pain, idx) => (
              <StaggerItem key={pain.title}>
                <article className="flex h-full flex-col justify-between rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] p-7">
                  <div>
                    <div className="flex items-center justify-between gap-4 text-xs">
                      <span className="font-editorial font-extrabold text-[var(--emtrc-muted)]">
                        0{idx + 1}
                      </span>
                      <span className="font-semibold text-[var(--emtrc-brass)]">
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
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emtrc-accent)]"
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

      {/* CHAPTER 3: "Watch it actually work." 3 Steps + Interactive ServicePreviewPhone */}
      <section className="border-b border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] text-[#F5F3EE]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <KickerRule light>How it runs week to week</KickerRule>
                <EditorialHeading
                  as="h2"
                  line1={t.servicePage.watchHeadline1}
                  line2={t.servicePage.watchHeadline2}
                  line2Tone="brass-underline"
                  className="mt-3 font-editorial text-[clamp(2.1rem,4.4vw,3.5rem)] font-extrabold leading-[1.03] tracking-[-0.03em] text-white"
                />
                <p className="mt-5 max-w-xl text-base leading-relaxed text-[#BAC5DC]">
                  {service.watchIntro}
                </p>
              </Reveal>

              <StaggerContainer className="mt-10 space-y-6">
                {service.steps.map((step) => (
                  <StaggerItem key={step.num}>
                    <div className="grid grid-cols-12 gap-4 border-t border-[var(--emtrc-navy-border)] pt-5">
                      <span className="col-span-2 font-editorial text-lg font-extrabold text-[var(--emtrc-brass-light)]">
                        {step.num}
                      </span>
                      <div className="col-span-10">
                        <h3 className="font-editorial text-lg font-bold text-white">{step.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#BAC5DC]">{step.body}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={0.1}>
                <ServicePreviewPhone appTitle={service.previewAppTitle} tabs={service.previewTabs} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 4: "Who this is for." 3 London Trade Personas */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-sand)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <KickerRule>Built for independent London operators</KickerRule>
            <h2 className="mt-3 font-editorial text-3xl font-extrabold tracking-[-0.03em] sm:text-5xl">
              {t.servicePage.whoHeadline}
            </h2>
          </Reveal>

          <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {service.personas.map((persona) => (
              <StaggerItem key={persona.title}>
                <article className="flex h-full flex-col justify-between rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-7">
                  <div>
                    <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
                      {persona.tag}
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

      {/* CHAPTER 5: "Why ours beats DIY." Split Documentary Photo + Proof Points */}
      <section className="border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)]">
                  <SafeImage
                    src={service.secondaryImage}
                    alt={service.secondaryAlt}
                    width={1200}
                    height={900}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal>
                <KickerRule>Built properly, owned by you</KickerRule>
                <EditorialHeading
                  as="h2"
                  line1={t.servicePage.whyHeadline1}
                  line2={t.servicePage.whyHeadline2}
                  line2Tone="accent"
                  className="mt-3 font-editorial text-3xl font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-5xl"
                />
                <ul className="mt-8 space-y-4 border-t border-[var(--emtrc-border)] pt-7">
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
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 6: Grouped Expandable FAQ Accordions (Klyara signature) */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]">
        <div className="mx-auto max-w-[960px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <KickerRule>{t.servicePage.faqKicker}</KickerRule>
            <h2 className="mt-3 font-editorial text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
              {t.servicePage.faqHeadline}
            </h2>
          </Reveal>

          <div className="mt-10 space-y-10" data-testid="service-faq-groups">
            {service.faqGroups.map((group, gIdx) => (
              <div key={group.groupTitle}>
                <h3 className="text-xs font-bold tracking-wider text-[var(--emtrc-brass)]">
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

      {/* CHAPTER 7: Related Services + Tailored Closing CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <Reveal>
            <KickerRule>{t.servicePage.relatedKicker}</KickerRule>
            <h2 className="mt-3 font-editorial text-2xl font-extrabold tracking-[-0.025em] sm:text-3xl">
              {t.servicePage.relatedHeadline}
            </h2>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                to={`/services/${rel.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6 transition-transform duration-200 hover:-translate-y-0.5 hover:border-[var(--emtrc-accent)]"
              >
                <div>
                  <p className="text-xs font-semibold text-[var(--emtrc-brass)]">{rel.category}</p>
                  <h3 className="mt-2 font-editorial text-xl font-bold text-[var(--emtrc-ink)] group-hover:text-[var(--emtrc-accent)]">
                    {rel.shortTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                    {rel.menuDescription}
                  </p>
                </div>
                <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--emtrc-accent)]">
                  <span>Read full details</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </p>
              </Link>
            ))}
          </div>

          {/* Closing Band */}
          <Reveal className="mt-14">
            <div className="rounded-2xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] p-8 text-[#F5F3EE] sm:p-12">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <p className="text-xs font-semibold text-[var(--emtrc-brass-light)]">
                    {service.priceTag}
                  </p>
                  <h2 className="mt-2 font-editorial text-3xl font-extrabold leading-tight text-white sm:text-4xl">
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
