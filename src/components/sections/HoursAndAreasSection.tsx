import { useEffect, useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { formatHoursRange, getOpenStatus } from '../../utils/hours';
import { getNicheLabels } from '../../utils/niche';

export function HoursAndAreasSection() {
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

  return (
    <section
      id="hours"
      className={`border-b border-[var(--site-border)] bg-[var(--site-surface)] ${theme.sectionPadding}`}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Opening Hours with browser-computed Open Now status */}
          <div className="lg:col-span-6">
            <h2
              className={`font-display text-2xl font-bold text-[var(--site-ink)] sm:text-3xl ${theme.headingTracking} ${theme.headingTransform}`}
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
              <span className="tabular-nums text-[var(--site-muted)]">{openStatus.detail}</span>
            </div>

            <dl className="mt-6 divide-y divide-[var(--site-border)] border-y border-[var(--site-border)] text-sm">
              {site.openingHours.map((entry) => {
                const isToday = entry.day === openStatus.todayDay;
                return (
                  <div
                    key={entry.day}
                    className={`flex items-center justify-between gap-4 py-3 ${
                      isToday ? 'font-semibold text-[var(--site-ink)]' : 'text-[var(--site-muted)]'
                    }`}
                  >
                    <dt className="flex items-center gap-2">
                      <span>{entry.day}</span>
                      {isToday && (
                        <span className="text-xs font-semibold text-[var(--site-accent-text)]">
                          Today
                        </span>
                      )}
                    </dt>
                    <dd className="tabular-nums">{formatHoursRange(entry)}</dd>
                  </div>
                );
              })}
            </dl>
          </div>

          {/* Areas Served */}
          <div className="lg:col-span-6 lg:pl-6">
            <h2
              className={`font-display text-2xl font-bold text-[var(--site-ink)] sm:text-3xl ${theme.headingTracking} ${theme.headingTransform}`}
            >
              {labels.areasHeading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--site-muted)]">
              Based in {site.borough}, London and serving customers across these nearby areas.
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-y-3 gap-x-6 border-t border-[var(--site-border)] pt-6 sm:grid-cols-2">
              {site.areasServed.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2.5 text-sm font-medium text-[var(--site-ink)]"
                >
                  <MapPin
                    className="h-3.5 w-3.5 shrink-0 text-[var(--site-accent-text)]"
                    aria-hidden="true"
                  />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
