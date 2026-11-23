import { useEffect, useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { formatHoursRange, getOpenStatus } from '../../utils/hours';
import { getNicheLabels } from '../../utils/niche';
import { Reveal } from '../emtrc/Reveal';

export function HoursAndAreasSection() {
  const { site, theme, blueprint } = useSite();
  const [openStatus, setOpenStatus] = useState(() => getOpenStatus(site.openingHours));

  useEffect(() => {
    setOpenStatus(getOpenStatus(site.openingHours));
    const timer = window.setInterval(() => {
      setOpenStatus(getOpenStatus(site.openingHours));
    }, 60_000);
    return () => window.clearInterval(timer);
  }, [site.openingHours]);

  const labels = getNicheLabels(site.niche);
  const archetype = blueprint.archetype;
  const isSwiss = archetype === 'swiss-grid';
  const isQuietEditorial = archetype === 'atelier-magazine' || archetype === 'gallery-minimal';

  return (
    <section
      id="hours"
      className={`border-b border-[var(--site-border)] bg-[var(--site-surface)] ${theme.sectionPadding}`}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div
          className={
            isSwiss
              ? 'grid grid-cols-1 border border-[var(--site-border)] bg-[var(--site-bg)] lg:grid-cols-12'
              : 'grid grid-cols-1 gap-12 lg:grid-cols-12'
          }
        >
          {/* Opening Hours with browser-computed Open Now status */}
          <div
            className={
              isSwiss
                ? 'border-b border-[var(--site-border)] p-6 sm:p-9 lg:col-span-6 lg:border-r lg:border-b-0'
                : 'lg:col-span-6'
            }
          >
            <Reveal>
              <p className="font-mono-data text-xs font-semibold text-[var(--site-accent-text)]">
                Live London Schedule
              </p>
              <h2
                className={`font-display mt-2 text-2xl font-bold text-[var(--site-ink)] sm:text-3xl ${theme.headingTracking} ${theme.headingTransform}`}
              >
                Opening hours
              </h2>

              <div
                data-testid="hours-open-indicator"
                className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm"
              >
                <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--site-accent-text)]">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>{openStatus.label}</span>
                </span>
                <span className="text-[var(--site-muted)]" aria-hidden="true">
                  ·
                </span>
                <span className="font-mono-data tabular-nums text-[var(--site-muted)]">
                  {openStatus.detail}
                </span>
              </div>

              <dl className="mt-6 divide-y divide-[var(--site-border)] border-y border-[var(--site-border)] text-sm">
                {site.openingHours.map((entry) => {
                  const isToday = entry.day === openStatus.todayDay;
                  return (
                    <div
                      key={entry.day}
                      className={`flex items-center justify-between gap-4 py-3.5 transition-colors ${
                        isToday
                          ? 'border-l-2 border-l-[var(--site-accent)] bg-[var(--site-surface-alt)] pr-3 pl-3 font-semibold text-[var(--site-ink)]'
                          : 'px-2 text-[var(--site-muted)]'
                      }`}
                    >
                      <dt className="flex items-center gap-2.5">
                        <span>{entry.day}</span>
                        {isToday && (
                          <span className="font-mono-data text-[11px] font-semibold uppercase tracking-wider text-[var(--site-accent-text)]">
                            Today
                          </span>
                        )}
                      </dt>
                      <dd className="font-mono-data tabular-nums">{formatHoursRange(entry)}</dd>
                    </div>
                  );
                })}
              </dl>
            </Reveal>
          </div>

          {/* Areas Served — Adapted cleanly per archetype, zero robotic numbering */}
          <div className={isSwiss ? 'p-6 sm:p-9 lg:col-span-6' : 'lg:col-span-6 lg:pl-6'}>
            <Reveal delay={0.06}>
              <p className="font-mono-data text-xs font-semibold text-[var(--site-accent-text)]">
                Neighbourhood Coverage
              </p>
              <h2
                className={`font-display mt-2 text-2xl font-bold text-[var(--site-ink)] sm:text-3xl ${theme.headingTracking} ${theme.headingTransform}`}
              >
                {labels.areasHeading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--site-muted)]">
                Based in {site.borough}, London and welcoming customers from across these
                neighbouring postcodes.
              </p>

              {isQuietEditorial ? (
                <ul className="mt-6 divide-y divide-[var(--site-border)] border-y border-[var(--site-border)] sm:columns-2 sm:gap-x-10">
                  {site.areasServed.map((area) => (
                    <li
                      key={area}
                      className="flex items-center gap-2.5 py-3.5 text-sm font-medium text-[var(--site-ink)] break-inside-avoid"
                    >
                      <MapPin
                        className="h-3.5 w-3.5 shrink-0 text-[var(--site-accent-text)]"
                        aria-hidden="true"
                      />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              ) : isSwiss ? (
                <ul className="mt-6 grid grid-cols-1 border border-[var(--site-border)] sm:grid-cols-2">
                  {site.areasServed.map((area) => (
                    <li
                      key={area}
                      className="flex items-center gap-2.5 border-b border-[var(--site-border)] px-4 py-3.5 text-sm font-medium text-[var(--site-ink)] sm:odd:border-r"
                    >
                      <MapPin
                        className="h-3.5 w-3.5 shrink-0 text-[var(--site-accent-text)]"
                        aria-hidden="true"
                      />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 border-t border-[var(--site-border)] pt-6 sm:grid-cols-2">
                  {site.areasServed.map((area) => (
                    <li
                      key={area}
                      className={`flex items-center gap-2.5 border-b border-[var(--site-border)]/70 py-2.5 text-sm font-medium text-[var(--site-ink)]`}
                    >
                      <MapPin
                        className="h-3.5 w-3.5 shrink-0 text-[var(--site-accent-text)]"
                        aria-hidden="true"
                      />
                      <span className="truncate">{area}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
