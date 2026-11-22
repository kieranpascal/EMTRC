import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Download,
  ExternalLink,
} from 'lucide-react';
import { SITE, type PdfGuideItem } from '../../content/site';
import { calculatePlanPricing, formatGbp } from '../../utils/pricing';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { HeroPhonePreview } from '../../components/emtrc/HeroPhonePreview';
import { PdfDownloadModal } from '../../components/emtrc/PdfDownloadModal';
import { Reveal } from '../../components/emtrc/Reveal';
import { SafeImage } from '../../components/SafeImage';

export function EmtrcHomePage() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [selectedGuide, setSelectedGuide] = useState<PdfGuideItem | null>(null);
  const prefersReduced = useReducedMotion();

  const slides = SITE.showcaseDeck.slides;
  const currentSlide = slides[slideIdx];
  const prevSlide = () => setSlideIdx((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setSlideIdx((prev) => (prev + 1) % slides.length);

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="emtrc — Websites, Hosting & AI Front Office for London Local Businesses"
        description="Websites for London barbers, salons, trades, cleaners and cafés. Built, hosted and looked after for one monthly price — we build you a free demo first."
        includeHomeJsonLd
      />

      {/* CHAPTER 1: Editorial Hero + Interactive Phone over London High Street Photography */}
      <section className="overflow-hidden border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 pt-12 pb-16 sm:px-8 sm:pt-18 sm:pb-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold tracking-wide text-[var(--emtrc-brass)]">
                {SITE.hero.kicker}
              </p>

              <h1 className="mt-4 font-editorial text-[clamp(2.85rem,6vw,4.75rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-[var(--emtrc-ink)]">
                <span className="block">{SITE.hero.headlineLine1}</span>
                <span className="mt-1 block text-[var(--emtrc-brass)]">
                  {SITE.hero.headlineLine2}
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--emtrc-muted)] sm:text-lg">
                {SITE.hero.subheadline}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/free-demo"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-6 py-3.5 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <span>{SITE.hero.primaryCta}</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-6 py-3.5 text-sm font-semibold text-[var(--emtrc-ink)] whitespace-nowrap transition-colors hover:border-[var(--emtrc-ink)]"
                >
                  {SITE.hero.secondaryCta}
                </Link>
              </div>

              <p className="mt-6 text-sm text-[var(--emtrc-muted)]">
                {SITE.hero.footnotePrefix}{' '}
                <a
                  href={SITE.brand.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--emtrc-ink)] underline underline-offset-4 hover:text-[var(--emtrc-accent)]"
                >
                  {SITE.hero.footnoteLinkLabel} →
                </a>
              </p>
            </div>

            <div className="lg:col-span-6">
              <HeroPhonePreview />
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 2: Editorial Photography Marquee Strip (Klyara rhythm) */}
      <section
        aria-label="What emtrc handles for London businesses"
        className="overflow-hidden border-b border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] py-5"
      >
        <div className="animate-emtrc-marquee items-center gap-8">
          {[...SITE.marqueeItems, ...SITE.marqueeItems].map((item, index) => (
            <div key={`${item.text}-${index}`} className="flex items-center gap-5 shrink-0 pr-3">
              <span className="font-editorial text-sm font-bold tracking-tight text-[var(--emtrc-ink)] whitespace-nowrap">
                {item.text}
              </span>
              <div className="h-14 w-24 overflow-hidden rounded-lg border border-[var(--emtrc-border)] shrink-0">
                <SafeImage
                  src={item.image}
                  alt={item.alt}
                  width={192}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHAPTER 3: Full-Bleed Deep Midnight Navy Interactive Capability Deck */}
      <section className="bg-[var(--emtrc-navy)] text-[#F5F3EE]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[var(--emtrc-brass-light)]">
                {SITE.showcaseDeck.kicker}
              </p>
              <h2 className="mt-3 font-editorial text-[clamp(2rem,4.4vw,3.4rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white">
                <span className="block">{SITE.showcaseDeck.headlineLine1}</span>
                <span className="mt-1 inline-block text-[var(--emtrc-brass-light)] underline decoration-[#2347FF] decoration-4 underline-offset-8">
                  {SITE.showcaseDeck.headlineLine2}
                </span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#BAC5DC]">
                {SITE.showcaseDeck.subheadline}
              </p>
            </div>
          </Reveal>

          <div
            data-testid="capability-deck"
            className="mt-12 rounded-2xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy-surface)] p-5 sm:p-8 lg:p-10"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={prefersReduced ? false : { opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReduced ? undefined : { opacity: 0, x: -14 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-6">
                  <div className="overflow-hidden rounded-xl border border-[var(--emtrc-navy-border)]">
                    <SafeImage
                      src={currentSlide.image}
                      alt={currentSlide.imageAlt}
                      width={1200}
                      height={900}
                      className="h-[260px] w-full object-cover sm:h-[340px]"
                    />
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <p className="text-xs font-semibold text-[var(--emtrc-brass-light)]">
                    {currentSlide.kicker}
                  </p>
                  <h3 className="mt-2 font-editorial text-2xl font-bold leading-snug text-white sm:text-3xl">
                    {currentSlide.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#C7D0E4] sm:text-base">
                    {currentSlide.description}
                  </p>

                  <div className="mt-6 border-t border-[var(--emtrc-navy-border)] pt-5">
                    <p className="font-editorial text-4xl font-extrabold tabular-nums text-white">
                      {currentSlide.statValue}
                    </p>
                    <p className="mt-1 text-xs text-[#9BA7C2]">{currentSlide.statLabel}</p>
                  </div>

                  <div className="mt-6">
                    <Link
                      to={currentSlide.linkTo}
                      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--emtrc-brass-light)] hover:text-white transition-colors"
                    >
                      <span>{currentSlide.linkLabel}</span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Deck Controls */}
            <div className="mt-8 flex items-center justify-between border-t border-[var(--emtrc-navy-border)] pt-6">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous capability"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--emtrc-navy-border)] text-[#D6DEF0] transition-colors hover:border-white hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2" role="tablist" aria-label="Capability slides">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={idx === slideIdx}
                    aria-label={`Show ${s.kicker}`}
                    onClick={() => setSlideIdx(idx)}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      idx === slideIdx
                        ? 'w-10 bg-[var(--emtrc-brass-light)]'
                        : 'w-4 bg-[#2E3E68] hover:bg-[#495F99]'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next capability"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--emtrc-navy-border)] text-[#D6DEF0] transition-colors hover:border-white hover:text-white"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 4: The London High Street Problem Strip + 4 Quantitative Proof Numbers */}
      <section className="border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold tracking-wide text-[var(--emtrc-brass)]">
                  {SITE.problemStrip.eyebrow}
                </p>
                <h2 className="mt-3 font-editorial text-3xl font-extrabold leading-tight tracking-[-0.025em] sm:text-4xl">
                  {SITE.problemStrip.headline}
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-base">
                  {SITE.problemStrip.body}
                </p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-[var(--emtrc-border)] pt-10 lg:grid-cols-4">
              {SITE.problemStrip.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-editorial text-3xl font-extrabold tabular-nums text-[var(--emtrc-ink)] sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--emtrc-muted)] sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CHAPTER 5: Three Steps. Live This Week. (Sand Chapter + Geometric Launch Rhythm Dial) */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-sand)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold tracking-wide text-[var(--emtrc-brass)]">
                  {SITE.rhythmSection.kicker}
                </p>
                <h2 className="mt-3 font-editorial text-3xl font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-5xl">
                  <span className="block">{SITE.rhythmSection.headlineLine1}</span>
                  <span className="text-[var(--emtrc-accent)]">{SITE.rhythmSection.headlineLine2}</span>
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-base">
                  {SITE.rhythmSection.body}
                </p>

                <div className="mt-9 space-y-6">
                  {SITE.rhythmSection.steps.map((step) => (
                    <div
                      key={step.marker}
                      className="grid grid-cols-1 gap-2 border-t border-[var(--emtrc-border)] pt-5 sm:grid-cols-12 sm:gap-4"
                    >
                      <p className="font-editorial text-sm font-extrabold text-[var(--emtrc-accent)] sm:col-span-3">
                        {step.marker}
                      </p>
                      <div className="sm:col-span-9">
                        <h3 className="font-editorial text-lg font-bold">{step.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link
                    to="/how-it-works"
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--emtrc-ink)] underline underline-offset-4 hover:text-[var(--emtrc-accent)]"
                  >
                    <span>See the full launch process</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Clean Architectural SVG Rhythm Dial (Inspired by Klyara's monthly clock) */}
              <div className="lg:col-span-5">
                <div className="mx-auto max-w-[380px] rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-8">
                  <svg
                    viewBox="0 0 320 320"
                    className="h-auto w-full"
                    role="img"
                    aria-label="Three-step emtrc cadence: Day 1 free demo, Day 3 live site and email, Monthly updates and reports"
                  >
                    <circle
                      cx="160"
                      cy="160"
                      r="116"
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity="0.14"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                    />
                    <circle
                      cx="160"
                      cy="160"
                      r="116"
                      fill="none"
                      stroke="#2347FF"
                      strokeWidth="3.5"
                      strokeDasharray="240 520"
                      strokeLinecap="round"
                      transform="rotate(-90 160 160)"
                    />
                    <text
                      x="160"
                      y="148"
                      textAnchor="middle"
                      fill="currentColor"
                      fontSize="11"
                      fontWeight="700"
                      letterSpacing="2"
                      opacity="0.65"
                    >
                      LAUNCH WEEK
                    </text>
                    <text
                      x="160"
                      y="174"
                      textAnchor="middle"
                      fill="currentColor"
                      fontSize="24"
                      fontWeight="800"
                    >
                      5 days
                    </text>
                    <text
                      x="160"
                      y="196"
                      textAnchor="middle"
                      fill="currentColor"
                      fontSize="11"
                      opacity="0.65"
                    >
                      demo to live domain
                    </text>

                    {/* Node 1: Top */}
                    <circle cx="160" cy="44" r="24" fill="#0B132B" />
                    <text x="160" y="48" textAnchor="middle" fill="#F5F3EE" fontSize="11" fontWeight="700">
                      D1
                    </text>
                    <text x="160" y="14" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600">
                      Free demo built
                    </text>

                    {/* Node 2: Bottom Right */}
                    <circle cx="260" cy="218" r="24" fill="#2347FF" />
                    <text x="260" y="222" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
                      D3
                    </text>
                    <text x="260" y="260" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600">
                      Domain &amp; live
                    </text>

                    {/* Node 3: Bottom Left */}
                    <circle cx="60" cy="218" r="24" fill="#B87B24" />
                    <text x="60" y="222" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
                      MO
                    </text>
                    <text x="60" y="260" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600">
                      Edits &amp; reports
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CHAPTER 6: Live Interactive London Demos (Links directly into our 15 real templates!) */}
      <section className="border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wide text-[var(--emtrc-brass)]">
                  Real working demos — click and test them
                </p>
                <h2 className="mt-2 font-editorial text-3xl font-extrabold tracking-[-0.025em] sm:text-4xl">
                  Built for London barbers, salons, trades, cleaners and cafés.
                </h2>
              </div>
              <Link
                to="/work"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--emtrc-accent)] whitespace-nowrap shrink-0 hover:underline"
              >
                <span>Browse all 15 live demos</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SITE.demoShowcase.map((demo) => (
                <article
                  key={demo.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Link to={`/demos/${demo.presetId}`} className="block overflow-hidden">
                    <SafeImage
                      src={demo.image}
                      alt={demo.imageAlt}
                      width={1200}
                      height={900}
                      className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <p className="text-xs font-medium text-[var(--emtrc-muted)]">
                        {demo.niche} · {demo.borough}
                      </p>
                      <h3 className="mt-1.5 font-editorial text-xl font-bold leading-snug">
                        {demo.businessName}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                        {demo.outcome}
                      </p>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-[var(--emtrc-border)] pt-4 text-xs">
                      <span className="text-[var(--emtrc-muted)]">{demo.styleLabel}</span>
                      <Link
                        to={`/demos/${demo.presetId}`}
                        className="inline-flex items-center gap-1 font-semibold text-[var(--emtrc-accent)] hover:underline"
                      >
                        <span>Open live demo</span>
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CHAPTER 7: Free PDF Guides Shelf (Email-Capture Lead Magnets) */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-sand)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wide text-[var(--emtrc-brass)]">
                  Free PDF guides for London owners
                </p>
                <h2 className="mt-2 font-editorial text-3xl font-extrabold tracking-[-0.025em] sm:text-4xl">
                  Rather read first? Take our playbooks free.
                </h2>
              </div>
              <Link
                to="/resources#guides"
                className="text-sm font-semibold text-[var(--emtrc-ink)] underline underline-offset-4 hover:text-[var(--emtrc-accent)]"
              >
                View all resources →
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {SITE.pdfGuides.map((guide) => (
                <article
                  key={guide.id}
                  className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]"
                >
                  <div>
                    <SafeImage
                      src={guide.coverImage}
                      alt={guide.coverAlt}
                      width={1200}
                      height={900}
                      className="h-44 w-full object-cover"
                    />
                    <div className="p-6">
                      <p className="text-xs font-medium text-[var(--emtrc-brass)]">
                        {guide.category} · {guide.pages}
                      </p>
                      <h3 className="mt-1.5 font-editorial text-xl font-bold leading-snug">
                        {guide.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                        {guide.summary}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-[var(--emtrc-border)] px-6 py-4">
                    <button
                      type="button"
                      onClick={() => setSelectedGuide(guide)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--emtrc-navy)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent)] dark:bg-[var(--emtrc-accent)] dark:hover:bg-[var(--emtrc-accent-hover)]"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      <span>Download free PDF</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CHAPTER 8: Clear Pricing Preview + 4 Guarantees */}
      <section className="border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[var(--emtrc-brass)]">
                Straightforward pricing
              </p>
              <h2 className="mt-2 font-editorial text-3xl font-extrabold tracking-[-0.025em] sm:text-4xl">
                One monthly price. No surprises.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-base">
                {SITE.pricing.termSummary}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {SITE.pricing.plans.map((plan) => {
                const calc = calculatePlanPricing(plan.monthlyPrice, 'monthly', SITE.flags.showExVat);
                const popular = Boolean(plan.badge);
                return (
                  <article
                    key={plan.id}
                    className={`flex flex-col justify-between rounded-2xl border p-7 ${
                      popular
                        ? 'border-[var(--emtrc-accent)] bg-[var(--emtrc-navy)] text-[#F5F3EE]'
                        : 'border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] text-[var(--emtrc-ink)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-editorial text-2xl font-bold">{plan.name}</h3>
                        {plan.badge && (
                          <span className="text-xs font-semibold text-[var(--emtrc-brass-light)]">
                            {plan.badge}
                          </span>
                        )}
                      </div>
                      <p className={`mt-2 text-sm ${popular ? 'text-[#BAC5DC]' : 'text-[var(--emtrc-muted)]'}`}>
                        {plan.summary}
                      </p>

                      <div className="mt-6 flex items-baseline gap-1.5">
                        <span className="font-editorial text-4xl font-extrabold tabular-nums">
                          {formatGbp(calc.displayMonthly)}
                        </span>
                        <span className={`text-sm ${popular ? 'text-[#BAC5DC]' : 'text-[var(--emtrc-muted)]'}`}>
                          /month{calc.vatSuffix}
                        </span>
                      </div>
                      <p className={`mt-1 text-xs tabular-nums ${popular ? 'text-[#9BA7C2]' : 'text-[var(--emtrc-muted)]'}`}>
                        + {formatGbp(plan.setupFee)} setup ({calc.dailyEquivalent} a day)
                      </p>

                      <ul className="mt-6 space-y-2.5 border-t border-current/15 pt-6 text-sm">
                        {plan.features.slice(0, 5).map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5">
                            <Check
                              className={`mt-0.5 h-4 w-4 shrink-0 ${
                                popular ? 'text-[var(--emtrc-brass-light)]' : 'text-[var(--emtrc-accent)]'
                              }`}
                              aria-hidden="true"
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <Link
                        to={plan.ctaTo}
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                          popular
                            ? 'bg-[var(--emtrc-accent)] text-white hover:bg-[var(--emtrc-accent-hover)]'
                            : 'border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] text-[var(--emtrc-ink)] hover:border-[var(--emtrc-ink)]'
                        }`}
                      >
                        <span>{plan.ctaLabel}</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--emtrc-muted)]">
              <p>
                Prefer a one-off build? <strong className="text-[var(--emtrc-ink)]">£595 once + £25/month care plan.</strong>
              </p>
              <Link to="/pricing" className="font-semibold text-[var(--emtrc-accent)] hover:underline">
                Compare all plans, annual savings &amp; add-ons →
              </Link>
            </div>

            {/* 4 Guarantees Row */}
            <div className="mt-16 grid grid-cols-1 gap-6 border-t border-[var(--emtrc-border)] pt-12 sm:grid-cols-2 lg:grid-cols-4">
              {SITE.guarantees.map((g) => (
                <div key={g.number}>
                  <p className="font-editorial text-xs font-extrabold text-[var(--emtrc-brass)]">
                    {g.number}
                  </p>
                  <h3 className="mt-1.5 font-editorial text-base font-bold">{g.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                    {g.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CHAPTER 9: Dual Action Split (Klyara-style closing conversion band) */}
      <section>
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] p-8 sm:p-10 text-[#F5F3EE]">
              <h2 className="font-editorial text-2xl font-extrabold sm:text-3xl text-white">
                See your new website in 2 working days.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#BAC5DC] sm:text-base">
                Send us your business name, London borough and trade. We build a working demo on our own time so you can test it on your phone before spending a penny.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/free-demo"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <span>Get my free demo</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={SITE.brand.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#314475] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#162447]"
                >
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span>Book a 15-minute call</span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-8 sm:p-10">
              <h2 className="font-editorial text-2xl font-extrabold sm:text-3xl">
                Not ready for a demo yet?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-base">
                Grab our free London Local Business Website Checklist PDF — 14 practical checks you can run on your own listing in ten minutes today.
              </p>
              <div className="mt-7">
                <button
                  type="button"
                  onClick={() => setSelectedGuide(SITE.pdfGuides[0])}
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--emtrc-ink)] bg-[var(--emtrc-canvas)] px-6 py-3 text-sm font-semibold text-[var(--emtrc-ink)] transition-colors hover:bg-[var(--emtrc-ink)] hover:text-[var(--emtrc-canvas)]"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Get the free checklist PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PdfDownloadModal guide={selectedGuide} onClose={() => setSelectedGuide(null)} />
    </EmtrcLayout>
  );
}
