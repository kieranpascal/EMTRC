import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { AlertTriangle, ArrowRight, Calendar, Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { getOpenStatus } from '../../utils/hours';
import { getNicheLabels, resolveAccreditationBadges } from '../../utils/niche';
import { normalizeTelHref } from '../../utils/seo';
import { SafeImage } from '../SafeImage';
import { MagneticLink } from '../emtrc/MagneticLink';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroSection() {
  const { site, theme, blueprint } = useSite();
  const prefersReduced = useReducedMotion();
  const [openStatus, setOpenStatus] = useState(() => getOpenStatus(site.openingHours));

  // Subtle pointer parallax for hero photography
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const imgX = useSpring(rawX, { stiffness: 120, damping: 24 });
  const imgY = useSpring(rawY, { stiffness: 120, damping: 24 });

  const handleStageMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(nx * -12);
    rawY.set(ny * -10);
  };

  const handleStageMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  useEffect(() => {
    setOpenStatus(getOpenStatus(site.openingHours));
    const timer = window.setInterval(() => {
      setOpenStatus(getOpenStatus(site.openingHours));
    }, 60_000);
    return () => window.clearInterval(timer);
  }, [site.openingHours]);

  const labels = getNicheLabels(site.niche);
  const bookingLabel = site.bookingLabel?.trim() || labels.defaultBookingLabel;
  const heroPhoto = blueprint.heroImage ?? site.heroImage ?? site.gallery[0];
  const badges = resolveAccreditationBadges(site);

  const renderPrimaryActions = (onDarkPhoto = false) => (
    <div className="flex flex-wrap items-center gap-3.5">
      {site.bookingUrl?.trim() ? (
        <>
          <MagneticLink
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            strength={0.24}
            maxOffset={8}
            className={`inline-flex items-center justify-center gap-2 bg-[var(--site-accent)] px-6 py-3.5 text-sm font-semibold text-[var(--site-accent-ink)] whitespace-nowrap transition-opacity duration-150 hover:opacity-90 ${theme.buttonRadius}`}
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <span>{bookingLabel}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </MagneticLink>
          <MagneticLink
            href={normalizeTelHref(site.phone)}
            strength={0.18}
            maxOffset={6}
            className={`inline-flex items-center justify-center gap-2 border px-6 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors duration-150 ${
              onDarkPhoto
                ? 'border-white/30 bg-black/35 text-white hover:bg-black/55 backdrop-blur-sm'
                : 'border-[var(--site-border)] bg-[var(--site-surface)] text-[var(--site-ink)] hover:border-[var(--site-ink)]'
            } ${theme.buttonRadius}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="tabular-nums">Call {site.phone}</span>
          </MagneticLink>
        </>
      ) : (
        <>
          <MagneticLink
            href={normalizeTelHref(site.phone)}
            strength={0.24}
            maxOffset={8}
            className={`inline-flex items-center justify-center gap-2 bg-[var(--site-accent)] px-6 py-3.5 text-sm font-semibold text-[var(--site-accent-ink)] whitespace-nowrap transition-opacity duration-150 hover:opacity-90 ${theme.buttonRadius}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="tabular-nums">Call {site.phone}</span>
          </MagneticLink>
          {site.quoteForm?.enabled ? (
            <MagneticLink
              href="#quote-form"
              strength={0.18}
              maxOffset={6}
              className={`inline-flex items-center justify-center gap-2 border px-6 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors duration-150 ${
                onDarkPhoto
                  ? 'border-white/30 bg-black/35 text-white hover:bg-black/55 backdrop-blur-sm'
                  : 'border-[var(--site-border)] bg-[var(--site-surface)] text-[var(--site-ink)] hover:border-[var(--site-ink)]'
              } ${theme.buttonRadius}`}
            >
              <span>Request a quote</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </MagneticLink>
          ) : (
            <MagneticLink
              href="#services"
              strength={0.18}
              maxOffset={6}
              className={`inline-flex items-center justify-center gap-2 border px-6 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors duration-150 ${
                onDarkPhoto
                  ? 'border-white/30 bg-black/35 text-white hover:bg-black/55 backdrop-blur-sm'
                  : 'border-[var(--site-border)] bg-[var(--site-surface)] text-[var(--site-ink)] hover:border-[var(--site-ink)]'
              } ${theme.buttonRadius}`}
            >
              <span>Explore {labels.servicesNavLabel.toLowerCase()}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </MagneticLink>
          )}
        </>
      )}
    </div>
  );

  const renderEmergencyStrip = () =>
    site.emergencyCallout && (
      <div
        data-testid="emergency-callout-strip"
        className="border-b border-[var(--site-border)] bg-[var(--site-primary)] text-[var(--site-primary-ink)]"
      >
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold leading-snug">{site.emergencyCallout.headline}</p>
              <p className="mt-0.5 text-xs opacity-90">
                {site.emergencyCallout.subtext}
                {site.emergencyCallout.responseTime ? ` · ${site.emergencyCallout.responseTime}` : ''}
              </p>
            </div>
          </div>
          <a
            href={normalizeTelHref(site.phone)}
            className={`inline-flex shrink-0 items-center justify-center gap-2 bg-[var(--site-accent)] px-4 py-2 text-sm font-semibold text-[var(--site-accent-ink)] whitespace-nowrap transition-opacity hover:opacity-90 ${theme.buttonRadius}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="tabular-nums">Emergency: {site.phone}</span>
          </a>
        </div>
      </div>
    );

  const renderProofMetricsStrip = () => (
    <div className="border-t border-[var(--site-border)] bg-[var(--site-surface)]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 divide-x divide-y divide-[var(--site-border)] sm:divide-y-0 md:grid-cols-4">
        {blueprint.metrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 + idx * 0.06, ease: EASE }}
            className="px-5 py-5 sm:px-7 sm:py-6"
          >
            <p className="font-mono-data text-xl font-bold text-[var(--site-accent-text)] sm:text-2xl">
              {metric.value}
            </p>
            <p className="mt-1 text-xs font-semibold text-[var(--site-ink)] sm:text-sm">
              {metric.label}
            </p>
            <p className="mt-0.5 text-xs text-[var(--site-muted)]">{metric.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAccreditationBadges = () =>
    badges.length > 0 && (
      <div
        data-testid="accreditation-badges"
        className="mx-auto max-w-[1200px] px-5 pb-10 sm:px-8"
      >
        <div className="grid grid-cols-1 gap-4 border-t border-[var(--site-border)] pt-7 sm:grid-cols-3">
          {badges.map((badge) => (
            <div
              key={`${badge.type}-${badge.label}`}
              className={`flex items-start gap-3 border border-[var(--site-border)] bg-[var(--site-surface)] px-4 py-3.5 ${theme.cardRadius}`}
            >
              <ShieldCheck
                className="mt-0.5 h-5 w-5 shrink-0 text-[var(--site-accent-text)]"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-bold text-[var(--site-ink)]">{badge.label}</p>
                {badge.registrationNumber && (
                  <p className="font-mono-data mt-0.5 text-xs text-[var(--site-muted)]">
                    {badge.registrationNumber}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  // ── ARCHETYPE 1: EDITORIAL CINEMA (Full-bleed cinematic photo hero with measured scrim & dramatic typography) ──
  if (blueprint.archetype === 'editorial-cinema') {
    return (
      <section className="border-b border-[var(--site-border)]">
        {renderEmergencyStrip()}
        <div
          ref={stageRef}
          onMouseMove={handleStageMouseMove}
          onMouseLeave={handleStageMouseLeave}
          className="relative overflow-hidden bg-[#090B0F]"
        >
          {heroPhoto && (
            <motion.div
              style={prefersReduced ? undefined : { x: imgX, y: imgY, scale: 1.04 }}
              className="absolute inset-0"
            >
              <SafeImage
                src={heroPhoto.url}
                alt={heroPhoto.alt}
                width={heroPhoto.width}
                height={heroPhoto.height}
                priority
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent"
              />
            </motion.div>
          )}

          <div className="relative z-10 mx-auto flex min-h-[540px] max-w-[1200px] flex-col justify-end px-5 pt-24 pb-14 sm:min-h-[600px] sm:px-8 sm:pb-18">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="max-w-3xl"
            >
              <div
                data-testid="hero-open-status"
                className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono-data text-xs text-white/80"
              >
                <span>{blueprint.heroEyebrow}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-white">
                  <Clock className="h-3.5 w-3.5 text-[var(--site-accent)]" aria-hidden="true" />
                  <span>{openStatus.label}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{openStatus.detail}</span>
              </div>

              <h1
                className={`font-display mt-4 text-[clamp(2.75rem,6vw,4.75rem)] font-bold leading-[0.98] text-white ${theme.headingTracking} ${theme.headingTransform}`}
              >
                {site.businessName}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                {site.tagline}
              </p>

              <div className="mt-8">{renderPrimaryActions(true)}</div>

              {site.address?.trim() && (
                <p className="mt-6 flex items-center gap-2 text-xs text-white/75">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--site-accent)]" aria-hidden="true" />
                  <span>{site.address}</span>
                </p>
              )}
            </motion.div>
          </div>
        </div>
        {renderAccreditationBadges()}
        {renderProofMetricsStrip()}
      </section>
    );
  }

  // ── ARCHETYPE 2: ATELIER MAGAZINE (Centered editorial masthead + framed full-width studio showcase) ──
  if (blueprint.archetype === 'atelier-magazine') {
    return (
      <section className="border-b border-[var(--site-border)]">
        {renderEmergencyStrip()}
        <div
          ref={stageRef}
          onMouseMove={handleStageMouseMove}
          onMouseLeave={handleStageMouseLeave}
          className="mx-auto max-w-[1200px] px-5 pt-12 pb-14 sm:px-8 sm:pt-16 sm:pb-18"
        >
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mx-auto max-w-3xl text-center"
          >
            <div
              data-testid="hero-open-status"
              className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-mono-data text-xs text-[var(--site-muted)]"
            >
              <span>{blueprint.heroEyebrow}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--site-ink)]">
                <Clock className="h-3.5 w-3.5 text-[var(--site-accent-text)]" aria-hidden="true" />
                <span>{openStatus.label}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{openStatus.detail}</span>
            </div>

            <h1
              className={`font-display mt-5 text-[clamp(2.65rem,5.2vw,4.35rem)] font-bold leading-[1.03] text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform}`}
            >
              {site.businessName}
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--site-muted)] sm:text-lg">
              {site.tagline}
            </p>

            <div className="mt-7 flex justify-center">{renderPrimaryActions(false)}</div>
          </motion.div>

          {/* Editorial Widescreen Framed Portrait with Side Caption Strip */}
          {heroPhoto && (
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
              className="mt-10 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12"
            >
              <div
                className={`overflow-hidden border border-[var(--site-border)] bg-[var(--site-surface)] lg:col-span-9 ${theme.imageRadius}`}
              >
                <motion.div
                  style={prefersReduced ? undefined : { x: imgX, y: imgY, scale: 1.03 }}
                  className="h-full w-full"
                >
                  <SafeImage
                    src={heroPhoto.url}
                    alt={heroPhoto.alt}
                    width={heroPhoto.width}
                    height={heroPhoto.height}
                    priority
                    className="aspect-[16/9] h-full w-full object-cover"
                  />
                </motion.div>
              </div>
              <div
                className={`flex flex-col justify-between border border-[var(--site-border)] bg-[var(--site-surface)] p-6 lg:col-span-3 ${theme.cardRadius}`}
              >
                <div>
                  <p className="font-mono-data text-xs text-[var(--site-accent-text)]">
                    {site.borough}, London
                  </p>
                  <p className="font-display mt-3 text-xl font-bold leading-snug text-[var(--site-ink)]">
                    {heroPhoto.caption || site.tagline}
                  </p>
                </div>
                <div className="mt-6 border-t border-[var(--site-border)] pt-4 text-xs text-[var(--site-muted)]">
                  <p className="font-semibold text-[var(--site-ink)]">
                    {site.address?.trim() || `Serving ${site.borough} & nearby`}
                  </p>
                  <p className="mt-1 tabular-nums">{site.phone}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        {renderAccreditationBadges()}
        {renderProofMetricsStrip()}
      </section>
    );
  }

  // ── ARCHETYPE 3: SWISS GRID (Asymmetric 12-col architectural grid with hairline dividers & crisp geometry) ──
  if (blueprint.archetype === 'swiss-grid') {
    return (
      <section className="border-b border-[var(--site-border)]">
        {renderEmergencyStrip()}
        <div
          ref={stageRef}
          onMouseMove={handleStageMouseMove}
          onMouseLeave={handleStageMouseLeave}
          className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 sm:py-14"
        >
          <div className="grid grid-cols-1 border border-[var(--site-border)] bg-[var(--site-surface)] lg:grid-cols-12">
            {/* Left 7-col Poster Type Block */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col justify-between border-b border-[var(--site-border)] p-6 sm:p-10 lg:col-span-7 lg:border-r lg:border-b-0"
            >
              <div>
                <div
                  data-testid="hero-open-status"
                  className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono-data text-xs text-[var(--site-muted)]"
                >
                  <span>{blueprint.heroEyebrow}</span>
                  <span aria-hidden="true">/</span>
                  <span className="font-semibold text-[var(--site-ink)]">{openStatus.label}</span>
                  <span aria-hidden="true">/</span>
                  <span className="tabular-nums">{openStatus.detail}</span>
                </div>

                <h1
                  className={`font-display mt-6 text-[clamp(2.5rem,4.8vw,4.1rem)] font-bold leading-[1.01] text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform}`}
                >
                  {site.businessName}
                </h1>

                <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--site-muted)]">
                  {site.tagline}
                </p>
              </div>

              <div className="mt-8 border-t border-[var(--site-border)] pt-6">
                {renderPrimaryActions(false)}
                {site.address?.trim() && (
                  <p className="font-mono-data mt-4 text-xs text-[var(--site-muted)]">
                    {site.address}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Right 5-col Tall Editorial Photo Frame */}
            {heroPhoto && (
              <div className="overflow-hidden lg:col-span-5">
                <motion.div
                  style={prefersReduced ? undefined : { x: imgX, y: imgY, scale: 1.03 }}
                  className="h-full w-full"
                >
                  <SafeImage
                    src={heroPhoto.url}
                    alt={heroPhoto.alt}
                    width={heroPhoto.width}
                    height={heroPhoto.height}
                    priority
                    className="h-full min-h-[300px] w-full object-cover"
                  />
                </motion.div>
              </div>
            )}
          </div>
        </div>
        {renderAccreditationBadges()}
        {renderProofMetricsStrip()}
      </section>
    );
  }

  // ── ARCHETYPE 4: GALLERY MINIMAL (Flipped asymmetric photo-first quiet luxury split) ──
  if (blueprint.archetype === 'gallery-minimal') {
    return (
      <section className="border-b border-[var(--site-border)]">
        {renderEmergencyStrip()}
        <div
          ref={stageRef}
          onMouseMove={handleStageMouseMove}
          onMouseLeave={handleStageMouseLeave}
          className="mx-auto max-w-[1200px] px-5 pt-10 pb-14 sm:px-8 sm:pt-14 sm:pb-18"
        >
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left 7-col Expansive Lead Photo */}
            {heroPhoto && (
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
                className={`overflow-hidden border border-[var(--site-border)] bg-[var(--site-surface)] lg:col-span-7 ${theme.imageRadius}`}
              >
                <motion.div
                  style={prefersReduced ? undefined : { x: imgX, y: imgY, scale: 1.03 }}
                  className="h-full w-full"
                >
                  <SafeImage
                    src={heroPhoto.url}
                    alt={heroPhoto.alt}
                    width={heroPhoto.width}
                    height={heroPhoto.height}
                    priority
                    className="h-full min-h-[300px] w-full object-cover sm:min-h-[420px]"
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Right 5-col Quiet Editorial Typography */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
              className="flex flex-col justify-center lg:col-span-5"
            >
              <div
                data-testid="hero-open-status"
                className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[var(--site-muted)]"
              >
                <span>{site.borough}, London</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--site-ink)]">
                  <Clock className="h-3.5 w-3.5 text-[var(--site-accent-text)]" aria-hidden="true" />
                  <span>{openStatus.label}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{openStatus.detail}</span>
              </div>

              <h1
                className={`font-display mt-5 text-[clamp(2.3rem,4.3vw,3.65rem)] font-bold leading-[1.06] text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform}`}
              >
                {site.businessName}
              </h1>

              <p className="mt-4 text-base leading-relaxed text-[var(--site-muted)]">
                {site.tagline}
              </p>

              <div className="mt-8">{renderPrimaryActions(false)}</div>

              {site.address?.trim() && (
                <p className="mt-6 border-t border-[var(--site-border)] pt-5 text-xs text-[var(--site-muted)]">
                  {site.address}
                </p>
              )}
            </motion.div>
          </div>
        </div>
        {renderAccreditationBadges()}
        {renderProofMetricsStrip()}
      </section>
    );
  }

  // ── ARCHETYPE 5: ENGINEERING COMMAND (High-trust technical split with measured-scrim service overlay) ──
  return (
    <section className="border-b border-[var(--site-border)]">
      {renderEmergencyStrip()}
      <div
        ref={stageRef}
        onMouseMove={handleStageMouseMove}
        onMouseLeave={handleStageMouseLeave}
        className="mx-auto max-w-[1200px] px-5 pt-12 pb-14 sm:px-8 sm:pt-16 sm:pb-18"
      >
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col justify-center lg:col-span-6"
          >
            <div
              data-testid="hero-open-status"
              className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono-data text-xs text-[var(--site-muted)]"
            >
              <span className="font-semibold text-[var(--site-accent-text)]">
                {blueprint.heroEyebrow}
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--site-ink)]">
                <Clock className="h-3.5 w-3.5 text-[var(--site-accent-text)]" aria-hidden="true" />
                <span>{openStatus.label}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{openStatus.detail}</span>
            </div>

            <h1
              className={`font-display mt-5 text-[clamp(2.45rem,4.6vw,3.9rem)] font-bold leading-[1.04] text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform}`}
            >
              {site.businessName}
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--site-muted)] sm:text-lg">
              {site.tagline}
            </p>

            <div className="mt-8">{renderPrimaryActions(false)}</div>

            {site.address?.trim() && (
              <p className="mt-5 text-xs text-[var(--site-muted)]">{site.address}</p>
            )}
          </motion.div>

          {heroPhoto && (
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
              className="lg:col-span-6"
            >
              <div
                className={`relative h-full overflow-hidden border border-[var(--site-border)] bg-[var(--site-surface)] ${theme.imageRadius}`}
              >
                <motion.div
                  style={prefersReduced ? undefined : { x: imgX, y: imgY, scale: 1.03 }}
                  className="h-full w-full"
                >
                  <SafeImage
                    src={heroPhoto.url}
                    alt={heroPhoto.alt}
                    width={heroPhoto.width}
                    height={heroPhoto.height}
                    priority
                    className="h-full min-h-[280px] w-full object-cover sm:min-h-[380px]"
                  />
                </motion.div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                />
                <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-4 text-white">
                  <div>
                    <p className="font-mono-data text-[11px] text-white/80">
                      Serving {site.borough} &amp; surrounding postcodes
                    </p>
                    <p className="mt-0.5 text-sm font-semibold">
                      Fixed written quotes before work begins
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      {renderAccreditationBadges()}
      {renderProofMetricsStrip()}
    </section>
  );
}
