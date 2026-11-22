import { ArrowUpRight, Calendar, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { getNicheLabels } from '../../utils/niche';
import { buildMapsLink, normalizeTelHref, normalizeWhatsappHref } from '../../utils/seo';

interface ContactSectionProps {
  isStandalonePage?: boolean;
}

export function ContactSection({ isStandalonePage = false }: ContactSectionProps) {
  const { site, theme } = useSite();
  const labels = getNicheLabels(site.niche);
  const bookingLabel = site.bookingLabel?.trim() || labels.defaultBookingLabel;
  const mapsUrl = buildMapsLink(site);
  const HeadingTag = isStandalonePage ? 'h1' : 'h2';

  return (
    <section id="contact" className={theme.sectionPadding}>
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <HeadingTag
            className={`font-display font-bold text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform} ${
              isStandalonePage
                ? 'text-[clamp(2.15rem,4vw,3.35rem)] leading-[1.1]'
                : 'text-2xl sm:text-3xl'
            }`}
          >
            {labels.contactHeading}
          </HeadingTag>
          <p className="mt-3 text-base leading-relaxed text-[var(--site-muted)]">
            Call directly, message us on WhatsApp or open directions in Google Maps.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Tap to call */}
          <div
            className={`flex flex-col justify-between border border-[var(--site-border)] bg-[var(--site-surface)] p-6 ${theme.cardRadius}`}
          >
            <div>
              <p className="text-xs font-semibold text-[var(--site-muted)]">Phone</p>
              <p className="mt-2 text-lg font-bold tabular-nums text-[var(--site-ink)]">
                {site.phone}
              </p>
            </div>
            <div className="mt-5">
              <a
                href={normalizeTelHref(site.phone)}
                className={`inline-flex items-center gap-2 bg-[var(--site-accent)] px-4 py-2.5 text-sm font-semibold text-[var(--site-accent-ink)] whitespace-nowrap transition-opacity hover:opacity-90 ${theme.buttonRadius}`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>Tap to call</span>
              </a>
            </div>
          </div>

          {/* WhatsApp / Booking / Email */}
          {(site.whatsapp?.trim() || site.bookingUrl?.trim() || site.email?.trim()) && (
            <div
              className={`flex flex-col justify-between border border-[var(--site-border)] bg-[var(--site-surface)] p-6 ${theme.cardRadius}`}
            >
              <div>
                <p className="text-xs font-semibold text-[var(--site-muted)]">
                  {site.whatsapp?.trim()
                    ? 'WhatsApp & direct messaging'
                    : site.bookingUrl?.trim()
                      ? 'Online booking'
                      : 'Email'}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--site-ink)]">
                  {site.email?.trim() ? site.email : `Quick replies from ${site.businessName}.`}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {site.whatsapp?.trim() && (
                  <a
                    href={normalizeWhatsappHref(site.whatsapp, site.businessName)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 border border-[var(--site-border)] bg-[var(--site-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--site-ink)] whitespace-nowrap transition-colors hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
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
                    className={`inline-flex items-center gap-2 border border-[var(--site-border)] bg-[var(--site-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--site-ink)] whitespace-nowrap transition-colors hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                  >
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>{bookingLabel}</span>
                  </a>
                )}
                {site.email?.trim() && (
                  <a
                    href={`mailto:${site.email}`}
                    className={`inline-flex items-center gap-2 border border-[var(--site-border)] bg-[var(--site-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--site-ink)] whitespace-nowrap transition-colors hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>Email</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Location + External Map Link (NO embedded Google Map) */}
          <div
            className={`flex flex-col justify-between border border-[var(--site-border)] bg-[var(--site-surface)] p-6 ${theme.cardRadius}`}
          >
            <div>
              <p className="text-xs font-semibold text-[var(--site-muted)]">
                {site.address?.trim() ? 'Address & directions' : 'Service area'}
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--site-ink)]">
                {site.address?.trim() ? site.address : `${site.borough}, London`}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 border border-[var(--site-border)] bg-[var(--site-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--site-ink)] whitespace-nowrap transition-colors hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
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
