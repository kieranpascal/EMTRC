import { ArrowUpRight, Calendar, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { getNicheLabels } from '../../utils/niche';
import { buildMapsLink, normalizeTelHref, normalizeWhatsappHref } from '../../utils/seo';
import { MagneticLink } from '../emtrc/MagneticLink';
import { Reveal } from '../emtrc/Reveal';

interface ContactSectionProps {
  isStandalonePage?: boolean;
}

export function ContactSection({ isStandalonePage = false }: ContactSectionProps) {
  const { site, theme, blueprint } = useSite();
  const labels = getNicheLabels(site.niche);
  const bookingLabel = site.bookingLabel?.trim() || labels.defaultBookingLabel;
  const mapsUrl = buildMapsLink(site);
  const HeadingTag = isStandalonePage ? 'h1' : 'h2';
  const archetype = blueprint.archetype;

  const hasSecondaryChannel = Boolean(
    site.whatsapp?.trim() || site.bookingUrl?.trim() || site.email?.trim()
  );

  // ── ARCHETYPE 1: ATELIER MAGAZINE — Centered Editorial Concierge Band ──
  if (archetype === 'atelier-magazine') {
    return (
      <section id="contact" className={`bg-[var(--site-bg)] ${theme.sectionPadding}`}>
        <div className="mx-auto max-w-[960px] px-5 text-center sm:px-8">
          <Reveal>
            <p className="font-mono-data text-xs font-semibold uppercase tracking-[0.14em] text-[var(--site-accent-text)]">
              Reservations &amp; Direct Line · {site.borough}
            </p>
            <HeadingTag
              className={`font-display mt-3 font-bold text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform} ${
                isStandalonePage
                  ? 'text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.04]'
                  : 'text-3xl sm:text-5xl leading-[1.06]'
              }`}
            >
              {labels.contactHeading}
            </HeadingTag>

            <a
              href={normalizeTelHref(site.phone)}
              className="font-display mt-6 inline-block text-3xl font-bold tabular-nums text-[var(--site-ink)] transition-colors hover:text-[var(--site-accent-text)] sm:text-5xl"
            >
              {site.phone}
            </a>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--site-muted)]">
              {site.address?.trim() ? site.address : `${site.borough}, London`} — answered directly
              at {site.businessName} during opening hours.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <MagneticLink
                href={normalizeTelHref(site.phone)}
                strength={0.2}
                maxOffset={6}
                className={`inline-flex items-center gap-2 bg-[var(--site-accent)] px-6 py-3 text-sm font-semibold text-[var(--site-accent-ink)] whitespace-nowrap transition-opacity hover:opacity-90 ${theme.buttonRadius}`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>Call {site.phone}</span>
              </MagneticLink>
              {site.bookingUrl?.trim() && (
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 border border-[var(--site-border)] bg-[var(--site-surface)] px-5 py-3 text-sm font-semibold text-[var(--site-ink)] whitespace-nowrap transition-colors hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                >
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span>{bookingLabel}</span>
                </a>
              )}
              {site.whatsapp?.trim() && (
                <a
                  href={normalizeWhatsappHref(site.whatsapp, site.businessName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 border border-[var(--site-border)] bg-[var(--site-surface)] px-5 py-3 text-sm font-semibold text-[var(--site-ink)] whitespace-nowrap transition-colors hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              )}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-[var(--site-accent-text)] underline underline-offset-4 hover:opacity-80"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>Directions in Maps</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  // ── ARCHETYPE 2: GALLERY MINIMAL — Quiet Spacious Typographic Directory ──
  if (archetype === 'gallery-minimal') {
    return (
      <section id="contact" className={`bg-[var(--site-bg)] ${theme.sectionPadding}`}>
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="font-mono-data text-xs font-semibold text-[var(--site-accent-text)]">
                  Studio Directory
                </p>
                <HeadingTag
                  className={`font-display mt-2 font-bold text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform} ${
                    isStandalonePage
                      ? 'text-[clamp(2.25rem,4.2vw,3.5rem)] leading-[1.06]'
                      : 'text-2xl sm:text-4xl leading-[1.08]'
                  }`}
                >
                  {labels.contactHeading}
                </HeadingTag>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--site-muted)]">
                  Reach {site.businessName} directly by telephone, message, or open directions in
                  Google Maps.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={0.05}>
                <dl className="divide-y divide-[var(--site-border)] border-y border-[var(--site-border)]">
                  <div className="flex flex-col justify-between gap-4 py-6 sm:flex-row sm:items-center">
                    <div>
                      <dt className="font-mono-data text-xs text-[var(--site-muted)]">Telephone</dt>
                      <dd className="font-display mt-1 text-2xl font-bold tabular-nums text-[var(--site-ink)]">
                        {site.phone}
                      </dd>
                    </div>
                    <MagneticLink
                      href={normalizeTelHref(site.phone)}
                      strength={0.18}
                      maxOffset={5}
                      className={`inline-flex items-center gap-2 bg-[var(--site-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--site-accent-ink)] whitespace-nowrap hover:opacity-90 ${theme.buttonRadius}`}
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      <span>Tap to call</span>
                    </MagneticLink>
                  </div>

                  {hasSecondaryChannel && (
                    <div className="flex flex-col justify-between gap-4 py-6 sm:flex-row sm:items-center">
                      <div>
                        <dt className="font-mono-data text-xs text-[var(--site-muted)]">
                          Appointments &amp; Enquiries
                        </dt>
                        <dd className="mt-1 text-sm font-medium text-[var(--site-ink)]">
                          {site.email?.trim() || `Direct messaging with ${site.businessName}`}
                        </dd>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {site.bookingUrl?.trim() && (
                          <a
                            href={site.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 border border-[var(--site-border)] bg-[var(--site-surface)] px-4 py-2 text-sm font-semibold text-[var(--site-ink)] hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                          >
                            <Calendar className="h-4 w-4" aria-hidden="true" />
                            <span>{bookingLabel}</span>
                          </a>
                        )}
                        {site.whatsapp?.trim() && (
                          <a
                            href={normalizeWhatsappHref(site.whatsapp, site.businessName)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 border border-[var(--site-border)] bg-[var(--site-surface)] px-4 py-2 text-sm font-semibold text-[var(--site-ink)] hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                          >
                            <MessageCircle className="h-4 w-4" aria-hidden="true" />
                            <span>WhatsApp</span>
                          </a>
                        )}
                        {site.email?.trim() && (
                          <a
                            href={`mailto:${site.email}`}
                            className={`inline-flex items-center gap-2 border border-[var(--site-border)] bg-[var(--site-surface)] px-4 py-2 text-sm font-semibold text-[var(--site-ink)] hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                          >
                            <Mail className="h-4 w-4" aria-hidden="true" />
                            <span>Email</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col justify-between gap-4 py-6 sm:flex-row sm:items-center">
                    <div>
                      <dt className="font-mono-data text-xs text-[var(--site-muted)]">
                        {site.address?.trim() ? 'Location' : 'Service Area'}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-[var(--site-ink)]">
                        {site.address?.trim() ? site.address : `${site.borough}, London`}
                      </dd>
                    </div>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--site-accent-text)] underline underline-offset-4 hover:opacity-80 whitespace-nowrap"
                    >
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      <span>Open in Google Maps</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── ARCHETYPE 3: SWISS GRID — Architectural Hairline Columnar Ledger ──
  if (archetype === 'swiss-grid') {
    return (
      <section id="contact" className={`bg-[var(--site-bg)] ${theme.sectionPadding}`}>
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col justify-between gap-4 border-b border-[var(--site-border)] pb-6 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono-data text-xs font-semibold uppercase tracking-wider text-[var(--site-accent-text)]">
                  Direct Contact / {site.borough}
                </p>
                <HeadingTag
                  className={`font-display mt-2 font-bold text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform} ${
                    isStandalonePage
                      ? 'text-[clamp(2.25rem,4.2vw,3.5rem)] leading-[1.06]'
                      : 'text-2xl sm:text-4xl leading-[1.08]'
                  }`}
                >
                  {labels.contactHeading}
                </HeadingTag>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono-data text-xs font-semibold uppercase tracking-wider text-[var(--site-ink)] underline underline-offset-4 hover:text-[var(--site-accent-text)]"
              >
                <span>Google Maps</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <div
            className={`mt-8 grid grid-cols-1 border border-[var(--site-border)] bg-[var(--site-surface)] divide-y divide-[var(--site-border)] md:divide-y-0 md:divide-x ${
              hasSecondaryChannel ? 'md:grid-cols-3' : 'md:grid-cols-2'
            }`}
          >
            <div className="flex flex-col justify-between p-6 sm:p-7">
              <div>
                <p className="font-mono-data text-xs uppercase tracking-wider text-[var(--site-muted)]">
                  Telephone
                </p>
                <p className="font-display mt-3 text-2xl font-bold tabular-nums text-[var(--site-ink)]">
                  {site.phone}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[var(--site-muted)]">
                  Answered directly at {site.businessName} during advertised hours.
                </p>
              </div>
              <div className="mt-6">
                <MagneticLink
                  href={normalizeTelHref(site.phone)}
                  strength={0.18}
                  maxOffset={5}
                  className={`inline-flex items-center gap-2 bg-[var(--site-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--site-accent-ink)] whitespace-nowrap hover:opacity-90 ${theme.buttonRadius}`}
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>Call now</span>
                </MagneticLink>
              </div>
            </div>

            {hasSecondaryChannel && (
              <div className="flex flex-col justify-between p-6 sm:p-7">
                <div>
                  <p className="font-mono-data text-xs uppercase tracking-wider text-[var(--site-muted)]">
                    Direct Messaging
                  </p>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--site-ink)]">
                    {site.email?.trim() || `Fast replies from our ${site.borough} team.`}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {site.whatsapp?.trim() && (
                    <a
                      href={normalizeWhatsappHref(site.whatsapp, site.businessName)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 border border-[var(--site-border)] bg-[var(--site-bg)] px-4 py-2 text-sm font-semibold text-[var(--site-ink)] hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                  {site.bookingUrl?.trim() && (
                    <a
                      href={site.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 border border-[var(--site-border)] bg-[var(--site-bg)] px-4 py-2 text-sm font-semibold text-[var(--site-ink)] hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                    >
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      <span>{bookingLabel}</span>
                    </a>
                  )}
                  {site.email?.trim() && (
                    <a
                      href={`mailto:${site.email}`}
                      className={`inline-flex items-center gap-2 border border-[var(--site-border)] bg-[var(--site-bg)] px-4 py-2 text-sm font-semibold text-[var(--site-ink)] hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      <span>Email</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col justify-between p-6 sm:p-7">
              <div>
                <p className="font-mono-data text-xs uppercase tracking-wider text-[var(--site-muted)]">
                  {site.address?.trim() ? 'Premises' : 'Patch'}
                </p>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-[var(--site-ink)]">
                  {site.address?.trim() ? site.address : `${site.borough}, London`}
                </p>
              </div>
              <div className="mt-6">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 border border-[var(--site-border)] bg-[var(--site-bg)] px-4 py-2 text-sm font-semibold text-[var(--site-ink)] hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                >
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span>Open in Maps</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── ARCHETYPE 4 & 5: EDITORIAL CINEMA & ENGINEERING COMMAND — Asymmetric Direct Dispatch Split ──
  return (
    <section id="contact" className={`bg-[var(--site-bg)] ${theme.sectionPadding}`}>
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div
          className={`grid grid-cols-1 overflow-hidden border border-[var(--site-border)] bg-[var(--site-surface)] lg:grid-cols-12 ${theme.cardRadius}`}
        >
          {/* Left 7-col Primary Telephone & Booking Block */}
          <div className="flex flex-col justify-between p-7 sm:p-10 lg:col-span-7 lg:border-r lg:border-[var(--site-border)]">
            <Reveal>
              <p className="font-mono-data text-xs font-semibold uppercase tracking-wider text-[var(--site-accent-text)]">
                {archetype === 'engineering-command'
                  ? 'Direct Dispatch & Enquiries'
                  : 'Direct Line & Bookings'}
              </p>
              <HeadingTag
                className={`font-display mt-2 font-bold text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform} ${
                  isStandalonePage
                    ? 'text-[clamp(2.25rem,4.2vw,3.5rem)] leading-[1.06]'
                    : 'text-2xl sm:text-4xl leading-[1.08]'
                }`}
              >
                {labels.contactHeading}
              </HeadingTag>

              <p className="font-display mt-6 text-3xl font-bold tabular-nums text-[var(--site-ink)] sm:text-4xl">
                {site.phone}
              </p>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-[var(--site-muted)]">
                Speak directly with {site.businessName} in {site.borough} — no call centres, no
                middlemen.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <MagneticLink
                  href={normalizeTelHref(site.phone)}
                  strength={0.2}
                  maxOffset={6}
                  className={`inline-flex items-center gap-2 bg-[var(--site-accent)] px-6 py-3 text-sm font-semibold text-[var(--site-accent-ink)] whitespace-nowrap transition-opacity hover:opacity-90 ${theme.buttonRadius}`}
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>Tap to call</span>
                </MagneticLink>
                {site.bookingUrl?.trim() && (
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 border border-[var(--site-border)] bg-[var(--site-bg)] px-5 py-3 text-sm font-semibold text-[var(--site-ink)] whitespace-nowrap transition-colors hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                  >
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>{bookingLabel}</span>
                  </a>
                )}
                {site.whatsapp?.trim() && (
                  <a
                    href={normalizeWhatsappHref(site.whatsapp, site.businessName)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 border border-[var(--site-border)] bg-[var(--site-bg)] px-5 py-3 text-sm font-semibold text-[var(--site-ink)] whitespace-nowrap transition-colors hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </Reveal>
          </div>

          {/* Right 5-col Address, Email & Directions Dossier */}
          <div className="flex flex-col justify-between border-t border-[var(--site-border)] bg-[var(--site-surface-alt)] p-7 sm:p-10 lg:col-span-5 lg:border-t-0">
            <div className="space-y-6">
              <div>
                <p className="font-mono-data text-xs font-semibold uppercase tracking-wider text-[var(--site-muted)]">
                  {site.address?.trim() ? 'Where to find us' : 'London coverage'}
                </p>
                <p className="mt-2 text-base font-semibold leading-relaxed text-[var(--site-ink)]">
                  {site.address?.trim() ? site.address : `${site.borough}, London`}
                </p>
              </div>

              {site.email?.trim() && (
                <div className="border-t border-[var(--site-border)] pt-5">
                  <p className="font-mono-data text-xs font-semibold uppercase tracking-wider text-[var(--site-muted)]">
                    Email
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1.5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-ink)] underline underline-offset-4 hover:text-[var(--site-accent-text)]"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{site.email}</span>
                  </a>
                </div>
              )}
            </div>

            <div className="mt-8 border-t border-[var(--site-border)] pt-6">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 border border-[var(--site-border)] bg-[var(--site-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--site-ink)] whitespace-nowrap transition-colors hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
              >
                <MapPin className="h-4 w-4 text-[var(--site-accent-text)]" aria-hidden="true" />
                <span>Open in Google Maps</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
