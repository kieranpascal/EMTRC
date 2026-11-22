import { useEffect, useState } from 'react';
import { AlertTriangle, Calendar, Clock, Phone, ShieldCheck } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { getOpenStatus } from '../../utils/hours';
import { getNicheLabels, resolveAccreditationBadges } from '../../utils/niche';
import { normalizeTelHref } from '../../utils/seo';
import { SafeImage } from '../SafeImage';

export function HeroSection() {
  const { site, theme } = useSite();
  const [openStatus, setOpenStatus] = useState(() => getOpenStatus(site.openingHours));

  useEffect(() => {
    setOpenStatus(getOpenStatus(site.openingHours));
    const timer = window.setInterval(() => {
      setOpenStatus(getOpenStatus(site.openingHours));
    }, 60_000);
    return () => window.clearInterval(timer);
  }, [site.openingHours]);

  const labels = getNicheLabels(site.niche);
  const bookingLabel = site.bookingLabel?.trim() || labels.defaultBookingLabel;
  const heroPhoto = site.heroImage ?? site.gallery[0];
  const badges = resolveAccreditationBadges(site);

  return (
    <section className="border-b border-[var(--site-border)]">
      {/* Optional Prominent Emergency Call-Out Strip (Trades: Plumbers / Electricians) */}
      {site.emergencyCallout && (
        <div
          data-testid="emergency-callout-strip"
          className="border-b border-[var(--site-border)] bg-[var(--site-primary)] text-[var(--site-primary-ink)]"
        >
          <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-bold leading-snug">{site.emergencyCallout.headline}</p>
                <p className="mt-0.5 text-xs opacity-90">
                  {site.emergencyCallout.subtext}
                  {site.emergencyCallout.responseTime
                    ? ` · ${site.emergencyCallout.responseTime}`
                    : ''}
                </p>
              </div>
            </div>
            <a
              href={normalizeTelHref(site.phone)}
              className={`inline-flex shrink-0 items-center justify-center gap-2 bg-[var(--site-accent)] px-4 py-2.5 text-sm font-semibold text-[var(--site-accent-ink)] whitespace-nowrap transition-opacity hover:opacity-90 ${theme.buttonRadius}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="tabular-nums">Emergency: {site.phone}</span>
            </a>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1200px] px-5 pt-12 pb-14 sm:px-8 sm:pt-18 sm:pb-20">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Headline, open status, CTAs */}
          <div className="flex flex-col justify-center lg:col-span-6">
            {/* Unboxed metadata line: Borough · Live Open Status */}
            <div
              data-testid="hero-open-status"
              className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[var(--site-muted)]"
            >
              <span>{site.borough}, London</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5 text-[var(--site-ink)] font-semibold">
                <Clock className="h-3.5 w-3.5 text-[var(--site-accent-text)]" aria-hidden="true" />
                <span>{openStatus.label}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{openStatus.detail}</span>
            </div>

            <h1
              className={`font-display mt-5 font-bold leading-[1.08] text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform} ${
                theme.style === 'bold'
                  ? 'text-[clamp(2.5rem,5vw,4.15rem)]'
                  : theme.style === 'elegant'
                    ? 'text-[clamp(2.35rem,4.5vw,3.75rem)]'
                    : 'text-[clamp(2.25rem,4.2vw,3.5rem)]'
              }`}
            >
              {site.businessName}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--site-muted)] sm:text-lg">
              {site.tagline}
            </p>

            {/* Primary CTA + Secondary CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              {site.bookingUrl?.trim() ? (
                <>
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 bg-[var(--site-accent)] px-6 py-3.5 text-sm font-semibold text-[var(--site-accent-ink)] whitespace-nowrap transition-opacity duration-150 hover:opacity-90 ${theme.buttonRadius}`}
                  >
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>{bookingLabel}</span>
                  </a>
                  <a
                    href={normalizeTelHref(site.phone)}
                    className={`inline-flex items-center justify-center gap-2 border border-[var(--site-border)] bg-[var(--site-surface)] px-6 py-3.5 text-sm font-semibold text-[var(--site-ink)] whitespace-nowrap transition-colors duration-150 hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span className="tabular-nums">Call {site.phone}</span>
                  </a>
                </>
              ) : (
                <>
                  <a
                    href={normalizeTelHref(site.phone)}
                    className={`inline-flex items-center justify-center gap-2 bg-[var(--site-accent)] px-6 py-3.5 text-sm font-semibold text-[var(--site-accent-ink)] whitespace-nowrap transition-opacity duration-150 hover:opacity-90 ${theme.buttonRadius}`}
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span className="tabular-nums">Call {site.phone}</span>
                  </a>
                  {site.quoteForm?.enabled && (
                    <a
                      href="#quote-form"
                      className={`inline-flex items-center justify-center border border-[var(--site-border)] bg-[var(--site-surface)] px-6 py-3.5 text-sm font-semibold text-[var(--site-ink)] whitespace-nowrap transition-colors duration-150 hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                    >
                      Request a quote
                    </a>
                  )}
                </>
              )}
            </div>

            {site.address?.trim() && (
              <p className="mt-6 text-xs text-[var(--site-muted)]">{site.address}</p>
            )}
          </div>

          {/* Right column: Full-height focal photograph */}
          {heroPhoto && (
            <div className="lg:col-span-6">
              <div
                className={`h-full overflow-hidden border border-[var(--site-border)] bg-[var(--site-surface)] ${theme.imageRadius}`}
              >
                <SafeImage
                  src={heroPhoto.url}
                  alt={heroPhoto.alt}
                  width={heroPhoto.width}
                  height={heroPhoto.height}
                  priority
                  className="h-full w-full object-cover min-h-[260px] sm:min-h-[340px]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Optional Trade Accreditation Badges (Gas Safe / NICEIC — hidden completely unless filled in) */}
        {badges.length > 0 && (
          <div
            data-testid="accreditation-badges"
            className="mt-10 grid grid-cols-1 gap-4 border-t border-[var(--site-border)] pt-8 sm:grid-cols-3"
          >
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
                    <p className="mt-0.5 text-xs tabular-nums text-[var(--site-muted)]">
                      {badge.registrationNumber}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
