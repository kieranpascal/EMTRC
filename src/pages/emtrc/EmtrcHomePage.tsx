import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  Download,
  ExternalLink,
  HelpCircle,
  MapPin,
} from 'lucide-react';
import { SITE, type PdfGuideItem } from '../../content/site';
import { BLOG_ARTICLES } from '../../content/blog';
import { CASE_STUDIES } from '../../content/caseStudies';
import { TRAINING_TRACKS } from '../../content/training';
import { useLanguage } from '../../context/LanguageContext';
import { calculatePlanPricing, formatGbp } from '../../utils/pricing';
import { BeforeAfterSlider } from '../../components/emtrc/BeforeAfterSlider';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { HeroPhonePreview } from '../../components/emtrc/HeroPhonePreview';
import { PdfDownloadModal } from '../../components/emtrc/PdfDownloadModal';
import {
  AnimatedCounter,
  EditorialHeading,
  HeroParallaxStage,
  KickerRule,
  Magnetic,
  ParallaxFrame,
  Reveal,
  SpotlightCard,
  StaggerContainer,
  StaggerItem,
} from '../../components/emtrc/Reveal';
import { SafeImage } from '../../components/SafeImage';

const HERO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function EmtrcHomePage() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [selectedGuide, setSelectedGuide] = useState<PdfGuideItem | null>(null);
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();

  const slides = SITE.showcaseDeck.slides;
  const currentSlide = slides[slideIdx];
  const prevSlide = () => setSlideIdx((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setSlideIdx((prev) => (prev + 1) % slides.length);
  const journalHighlights = BLOG_ARTICLES.slice(0, 3);
  const featuredStudies = CASE_STUDIES.slice(0, 3);

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="emtrc — Websites, Hosting & AI Front Office for London Local Businesses"
        description="Websites for London barbers, salons, trades, cleaners and cafés. Built, hosted and looked after for one monthly price — we build you a free demo first."
        includeHomeJsonLd
      />

      {/* CHAPTER 1: Architectural London Editorial Hero with Mouse-Parallax Stage & Magnetic CTAs */}
      <HeroParallaxStage className="hero-editorial-wash overflow-hidden border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 pt-12 pb-14 sm:px-8 sm:pt-18 sm:pb-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <Reveal immediate>
                <KickerRule>{t.hero.kicker}</KickerRule>
              </Reveal>

              <EditorialHeading
                as="h1"
                immediate
                delay={0.05}
                line1={t.hero.headlineLine1}
                line2={t.hero.headlineLine2}
                line2Tone="accent"
                className="mt-4 font-editorial text-[clamp(2.95rem,6.1vw,4.85rem)] font-bold leading-[0.98] tracking-[-0.035em] text-[var(--emtrc-ink)]"
              />

              <Reveal immediate delay={0.14}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--emtrc-muted)] sm:text-lg">
                  {t.hero.subheadline}
                </p>
              </Reveal>

              <Reveal immediate delay={0.2}>
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <Magnetic>
                    <Link
                      to="/free-demo"
                      className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-6 py-3.5 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                    >
                      <span>{t.hero.primaryCta}</span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </Magnetic>
                  <Magnetic strength={0.18}>
                    <Link
                      to="/app"
                      className="inline-flex items-center justify-center rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-6 py-3.5 text-sm font-semibold text-[var(--emtrc-ink)] whitespace-nowrap transition-colors hover:border-[var(--emtrc-ink)]"
                    >
                      Explore the emtrc App
                    </Link>
                  </Magnetic>
                </div>

                <p className="mt-6 text-sm text-[var(--emtrc-muted)]">
                  {t.hero.footnotePrefix}{' '}
                  <a
                    href={SITE.brand.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--emtrc-ink)] underline underline-offset-4 hover:text-[var(--emtrc-accent)]"
                  >
                    {t.hero.footnoteLink} →
                  </a>
                </p>
              </Reveal>
            </div>

            <Reveal immediate delay={0.16} className="lg:col-span-6">
              <HeroPhonePreview />
            </Reveal>
          </div>

          {/* Live Animated Studio Telemetry Strip */}
          <Reveal delay={0.1}>
            <div className="mt-14 grid grid-cols-2 gap-6 border-t border-[var(--emtrc-border)] pt-8 lg:grid-cols-4">
              <div>
                <p className="font-editorial text-2xl font-bold text-[var(--emtrc-ink)] sm:text-3xl">
                  <AnimatedCounter target={0.9} decimals={1} suffix="s" />
                </p>
                <p className="mt-1 text-xs text-[var(--emtrc-muted)]">Typical mobile 4G load time</p>
              </div>
              <div>
                <p className="font-editorial text-2xl font-bold text-[var(--emtrc-accent)] sm:text-3xl">
                  <AnimatedCounter target={48} suffix=" hrs" />
                </p>
                <p className="mt-1 text-xs text-[var(--emtrc-muted)]">To your free working demo</p>
              </div>
              <div>
                <p className="font-editorial text-2xl font-bold text-[var(--emtrc-ink)] sm:text-3xl">
                  <AnimatedCounter target={15} />
                </p>
                <p className="mt-1 text-xs text-[var(--emtrc-muted)]">Live London trade demos online</p>
              </div>
              <div>
                <p className="font-editorial text-2xl font-bold text-[var(--emtrc-ink)] sm:text-3xl">
                  <AnimatedCounter target={39} prefix="£" suffix="/mo" />
                </p>
                <p className="mt-1 text-xs text-[var(--emtrc-muted)]">Starting monthly managed plan</p>
              </div>
            </div>
          </Reveal>
        </div>
      </HeroParallaxStage>

      {/* CHAPTER 2: Editorial Photography Marquee Strip */}
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

      {/* CHAPTER 3: Interactive Before & After Website Transformation */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Reveal>
              <KickerRule>Why London clients choose a real studio over DIY AI</KickerRule>
              <h2 className="mt-3 max-w-2xl font-editorial text-3xl font-bold leading-[1.06] tracking-[-0.025em] sm:text-5xl">
                What your neighbours see today — vs with emtrc.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <Link
                to="/case-studies"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--emtrc-accent)] hover:underline"
              >
                <span>Explore all 5 London case studies</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.06}>
            <BeforeAfterSlider />
          </Reveal>
        </div>
      </section>

      {/* CHAPTER 4: Full-Bleed Obsidian Charcoal Interactive Capability Deck */}
      <section className="bg-[var(--emtrc-navy)] text-[#F5F6F8]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="max-w-2xl">
            <Reveal>
              <KickerRule light>{t.homeSections.deckKicker}</KickerRule>
            </Reveal>
            <EditorialHeading
              as="h2"
              line1={t.homeSections.deckLine1}
              line2={t.homeSections.deckLine2}
              line2Tone="brass-underline"
              className="mt-3 font-editorial text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white"
            />
            <Reveal delay={0.08}>
              <p className="mt-5 text-base leading-relaxed text-[#B4BCCB]">
                {t.homeSections.deckSub}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
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
                  transition={{ duration: 0.25, ease: HERO_EASE }}
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
                    <p className="font-mono-data text-xs font-semibold text-[var(--emtrc-brass-light)]">
                      {currentSlide.kicker}
                    </p>
                    <h3 className="mt-2 font-editorial text-2xl font-bold leading-snug text-white sm:text-3xl">
                      {currentSlide.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-[#B4BCCB] sm:text-base">
                      {currentSlide.description}
                    </p>

                    <div className="mt-6 border-t border-[var(--emtrc-navy-border)] pt-5">
                      <p className="font-mono-data text-4xl font-bold text-white">
                        {currentSlide.statValue}
                      </p>
                      <p className="mt-1 text-xs text-[#9BA3B4]">{currentSlide.statLabel}</p>
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
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--emtrc-navy-border)] text-[#D4DAE4] transition-colors hover:border-white hover:text-white"
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
                          : 'w-4 bg-[#2A3342] hover:bg-[#495569]'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next capability"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--emtrc-navy-border)] text-[#D4DAE4] transition-colors hover:border-white hover:text-white"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CHAPTER 5: Featured London Case Studies with Parallax Documentary Photography */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <KickerRule>London Case Studies · Real Trade Workflows</KickerRule>
                <h2 className="mt-3 font-editorial text-3xl font-bold tracking-[-0.025em] sm:text-4xl">
                  Built for Hackney barbers, Greenwich heating firms &amp; Peckham cafés.
                </h2>
              </div>
              <Link
                to="/case-studies"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--emtrc-accent)] whitespace-nowrap shrink-0 hover:underline"
              >
                <span>View all case studies</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <StaggerContainer className="mt-10 grid grid-cols-1 gap-7 lg:grid-cols-3">
            {featuredStudies.map((study) => (
              <StaggerItem key={study.slug}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] transition-colors hover:border-[var(--emtrc-ink)]">
                  <Link to={`/case-studies/${study.slug}`} className="block overflow-hidden">
                    <ParallaxFrame offset={16} className="h-56 w-full">
                      <SafeImage
                        src={study.image}
                        alt={study.imageAlt}
                        width={900}
                        height={640}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </ParallaxFrame>
                  </Link>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center justify-between gap-2 font-mono-data text-[11px]">
                        <span className="font-semibold text-[var(--emtrc-accent)]">{study.trade}</span>
                        <span className="inline-flex items-center gap-1 text-[var(--emtrc-muted)]">
                          <MapPin className="h-3 w-3" aria-hidden="true" />
                          {study.postcode}
                        </span>
                      </div>
                      <h3 className="mt-2 font-editorial text-xl font-bold leading-snug text-[var(--emtrc-ink)] group-hover:text-[var(--emtrc-accent)]">
                        <Link to={`/case-studies/${study.slug}`}>{study.businessName}</Link>
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                        {study.headline}
                      </p>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-[var(--emtrc-border)] pt-4">
                      <span className="font-mono-data text-sm font-bold text-[var(--emtrc-ink)]">
                        {study.heroStat}
                      </span>
                      <Link
                        to={`/case-studies/${study.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--emtrc-accent)] hover:underline"
                      >
                        <span>Read case study</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CHAPTER 6: Three Steps. Live This Week. (Sand Chapter + Savile Emerald Launch Dial) */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-sand)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <KickerRule>{t.homeSections.rhythmKicker}</KickerRule>
              </Reveal>
              <EditorialHeading
                as="h2"
                line1={t.homeSections.rhythmLine1}
                line2={t.homeSections.rhythmLine2}
                line2Tone="accent"
                className="mt-3 font-editorial text-3xl font-bold leading-[1.04] tracking-[-0.03em] sm:text-5xl"
              />
              <Reveal delay={0.08}>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-base">
                  {SITE.rhythmSection.body}
                </p>
              </Reveal>

              <StaggerContainer className="mt-9 space-y-6">
                {SITE.rhythmSection.steps.map((step) => (
                  <StaggerItem key={step.marker}>
                    <div className="grid grid-cols-1 gap-2 border-t border-[var(--emtrc-border)] pt-5 sm:grid-cols-12 sm:gap-4">
                      <p className="font-mono-data text-sm font-bold text-[var(--emtrc-accent)] sm:col-span-3">
                        {step.marker}
                      </p>
                      <div className="sm:col-span-9">
                        <h3 className="font-editorial text-lg font-bold">{step.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <Reveal delay={0.12} className="mt-8">
                <Link
                  to="/how-it-works"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--emtrc-ink)] underline underline-offset-4 hover:text-[var(--emtrc-accent)]"
                >
                  <span>See the full launch process</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </Reveal>
            </div>

            {/* Clean Architectural SVG Rhythm Dial (Savile Emerald + Obsidian) */}
            <div className="lg:col-span-5">
              <Reveal delay={0.12}>
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
                      stroke="#C82419"
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

                    <circle cx="160" cy="44" r="24" fill="#0A0B0E" />
                    <text x="160" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
                      D1
                    </text>
                    <text x="160" y="14" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600">
                      Free demo built
                    </text>

                    <circle cx="260" cy="218" r="24" fill="#C82419" />
                    <text x="260" y="222" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
                      D3
                    </text>
                    <text x="260" y="260" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600">
                      Domain &amp; live
                    </text>

                    <circle cx="60" cy="218" r="24" fill="#262A36" />
                    <text x="60" y="222" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
                      MO
                    </text>
                    <text x="60" y="260" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="600">
                      Edits &amp; reports
                    </text>
                  </svg>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 7: Live Interactive London Demos */}
      <section className="border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <KickerRule>{t.homeSections.workKicker}</KickerRule>
                <h2 className="mt-3 font-editorial text-3xl font-bold tracking-[-0.025em] sm:text-4xl">
                  {t.homeSections.workHeadline}
                </h2>
              </div>
              <Link
                to="/work"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--emtrc-accent)] whitespace-nowrap shrink-0 hover:underline"
              >
                <span>{t.homeSections.workAllLink}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SITE.demoShowcase.map((demo) => (
              <StaggerItem key={demo.id}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] transition-colors hover:border-[var(--emtrc-ink)]">
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
                      <p className="font-mono-data text-[11px] font-medium text-[var(--emtrc-muted)]">
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
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CHAPTER 8: Owner Training Centre + FAQ Hub Spotlight */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-navy)]">
                  <ParallaxFrame offset={18} className="h-[340px] sm:h-[400px] w-full">
                    <SafeImage
                      src="/src/assets/images/emtrc_training_workshop_1795422463963.jpg"
                      alt="London bakery owner shooting smartphone craft photography beside a printed Google Maps checklist"
                      width={1000}
                      height={760}
                      className="h-full w-full object-cover"
                    />
                  </ParallaxFrame>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal>
                <KickerRule>Owner Training Centre &amp; Straight Answers</KickerRule>
                <h2 className="mt-3 font-editorial text-3xl font-bold leading-tight tracking-[-0.025em] sm:text-4xl">
                  Free checklists built for busy shop owners — not marketers.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-base">
                  Whether you work with us today or next year, our interactive Training Centre walks you step by step through Google Maps hygiene, 5-minute daylight smartphone photography, UK DMCC-compliant reviews and preparing your 020 phone line before 31 January 2027.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {TRAINING_TRACKS.map((track) => (
                    <Link
                      key={track.id}
                      to="/training"
                      className="rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] p-4 transition-colors hover:border-[var(--emtrc-accent)]"
                    >
                      <p className="font-mono-data text-[10px] font-semibold text-[var(--emtrc-accent)]">
                        {track.code} · {track.estimatedTime}
                      </p>
                      <p className="mt-1 font-editorial text-sm font-bold text-[var(--emtrc-ink)]">
                        {track.title}
                      </p>
                    </Link>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3.5">
                  <Link
                    to="/training"
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                  >
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    <span>Open Training Centre</span>
                  </Link>
                  <Link
                    to="/faq"
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] px-5 py-3 text-sm font-semibold text-[var(--emtrc-ink)] transition-colors hover:border-[var(--emtrc-ink)]"
                  >
                    <HelpCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Browse all 24 FAQs</span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 9: The emtrc Journal (Static Markdown Blog Showcase) */}
      <section className="border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <KickerRule>{t.homeSections.blogKicker}</KickerRule>
                <h2 className="mt-3 font-editorial text-3xl font-bold tracking-[-0.025em] sm:text-4xl">
                  {t.homeSections.blogHeadline}
                </h2>
              </div>
              <Link
                to="/blog"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--emtrc-accent)] whitespace-nowrap shrink-0 hover:underline"
              >
                <span>{t.homeSections.blogAllLink}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {journalHighlights.map((article) => (
              <StaggerItem key={article.slug}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] transition-colors hover:border-[var(--emtrc-ink)]">
                  <Link to={`/blog/${article.slug}`} className="block overflow-hidden">
                    <SafeImage
                      src={article.image}
                      alt={article.imageAlt}
                      width={1200}
                      height={900}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <p className="font-mono-data text-[11px] font-medium text-[var(--emtrc-accent)]">
                        {article.category} · {article.readTime}
                      </p>
                      <h3 className="mt-2 font-editorial text-xl font-bold leading-snug text-[var(--emtrc-ink)] group-hover:text-[var(--emtrc-accent)]">
                        <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="mt-5 border-t border-[var(--emtrc-border)] pt-4">
                      <Link
                        to={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--emtrc-accent)] hover:underline"
                      >
                        <span>{t.blogPage.readArticle}</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CHAPTER 10: Free PDF Guides Shelf */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-sand)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <KickerRule>{t.homeSections.guidesKicker}</KickerRule>
                <h2 className="mt-3 font-editorial text-3xl font-bold tracking-[-0.025em] sm:text-4xl">
                  {t.homeSections.guidesHeadline}
                </h2>
              </div>
              <Link
                to="/resources"
                className="text-sm font-semibold text-[var(--emtrc-ink)] underline underline-offset-4 hover:text-[var(--emtrc-accent)]"
              >
                Search all resources →
              </Link>
            </div>
          </Reveal>

          <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {SITE.pdfGuides.map((guide) => (
              <StaggerItem key={guide.id}>
                <article className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]">
                  <div>
                    <SafeImage
                      src={guide.coverImage}
                      alt={guide.coverAlt}
                      width={1200}
                      height={900}
                      className="h-44 w-full object-cover"
                    />
                    <div className="p-6">
                      <p className="font-mono-data text-[11px] font-medium text-[var(--emtrc-accent)]">
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
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CHAPTER 11: Clear Pricing Preview + 4 Guarantees */}
      <section className="border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <KickerRule>{t.homeSections.pricingKicker}</KickerRule>
              <h2 className="mt-3 font-editorial text-3xl font-bold tracking-[-0.025em] sm:text-4xl">
                {t.homeSections.pricingHeadline}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-base">
                {SITE.pricing.termSummary}
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {SITE.pricing.plans.map((plan) => {
              const calc = calculatePlanPricing(plan.monthlyPrice, 'monthly', SITE.flags.showExVat);
              const popular = Boolean(plan.badge);
              return (
                <StaggerItem key={plan.id}>
                  <SpotlightCard
                    darkSurface={popular}
                    className={`flex h-full flex-col justify-between rounded-2xl border p-7 ${
                      popular
                        ? 'border-[var(--emtrc-accent)] bg-[var(--emtrc-navy)] text-[#F5F6F8]'
                        : 'border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] text-[var(--emtrc-ink)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-editorial text-2xl font-bold">{plan.name}</h3>
                        {plan.badge && (
                          <span className="font-mono-data text-xs font-semibold text-[var(--emtrc-brass-light)]">
                            {plan.badge}
                          </span>
                        )}
                      </div>
                      <p className={`mt-2 text-sm ${popular ? 'text-[#B4BCCB]' : 'text-[var(--emtrc-muted)]'}`}>
                        {plan.summary}
                      </p>

                      <div className="mt-6 flex items-baseline gap-1.5">
                        <span className="font-editorial text-4xl font-bold tabular-nums">
                          {formatGbp(calc.displayMonthly)}
                        </span>
                        <span className={`text-sm ${popular ? 'text-[#B4BCCB]' : 'text-[var(--emtrc-muted)]'}`}>
                          /month{calc.vatSuffix}
                        </span>
                      </div>
                      <p className={`mt-1 font-mono-data text-xs ${popular ? 'text-[#9BA3B4]' : 'text-[var(--emtrc-muted)]'}`}>
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
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <Reveal delay={0.08}>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--emtrc-muted)]">
              <p>
                Prefer a one-off build? <strong className="text-[var(--emtrc-ink)]">£595 once + £25/month care plan.</strong>
              </p>
              <Link to="/pricing" className="font-semibold text-[var(--emtrc-accent)] hover:underline">
                Compare all plans, annual savings &amp; add-ons →
              </Link>
            </div>
          </Reveal>

          {/* 4 Guarantees Row */}
          <StaggerContainer className="mt-16 grid grid-cols-1 gap-6 border-t border-[var(--emtrc-border)] pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {SITE.guarantees.map((g) => (
              <StaggerItem key={g.number}>
                <p className="font-mono-data text-xs font-bold text-[var(--emtrc-accent)]">
                  {g.number}
                </p>
                <h3 className="mt-1.5 font-editorial text-base font-bold">{g.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                  {g.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CHAPTER 12: Dual Action Split Closing Conversion Band */}
      <section>
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] p-8 sm:p-10 text-[#F5F6F8]">
                <h2 className="font-editorial text-2xl font-bold sm:text-3xl text-white">
                  {t.homeSections.closingDemoTitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#B4BCCB] sm:text-base">
                  Send us your business name, London borough and trade. We build a working demo on our own time so you can test it on your phone before spending a penny.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    to="/free-demo"
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                  >
                    <span>{t.hero.primaryCta}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={SITE.brand.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-[#323C4E] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1A202C]"
                  >
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>{t.bookCallShort}</span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="h-full rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-8 sm:p-10">
                <h2 className="font-editorial text-2xl font-bold sm:text-3xl">
                  {t.homeSections.closingGuideTitle}
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
            </Reveal>
          </div>
        </div>
      </section>

      <PdfDownloadModal guide={selectedGuide} onClose={() => setSelectedGuide(null)} />
    </EmtrcLayout>
  );
}
