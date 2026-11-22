import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';
import { getNicheLabels, groupServicesByCategory } from '../../utils/niche';

interface ServicesSectionProps {
  limit?: number;
  showFullPageLink?: boolean;
  isStandalonePage?: boolean;
}

export function ServicesSection({
  limit,
  showFullPageLink = false,
  isStandalonePage = false,
}: ServicesSectionProps) {
  const { site, theme } = useSite();
  const labels = getNicheLabels(site.niche);

  const itemsToDisplay = limit ? site.services.slice(0, limit) : site.services;
  const groups = groupServicesByCategory(itemsToDisplay);
  const HeadingTag = isStandalonePage ? 'h1' : 'h2';

  return (
    <section
      id="services"
      className={`border-b border-[var(--site-border)] ${theme.sectionPadding}`}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <HeadingTag
              className={`font-display font-bold text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform} ${
                isStandalonePage
                  ? 'text-[clamp(2.15rem,4vw,3.35rem)] leading-[1.1]'
                  : 'text-2xl sm:text-3xl'
              }`}
            >
              {labels.servicesHeading}
            </HeadingTag>
            <p className="mt-3 text-base leading-relaxed text-[var(--site-muted)]">
              {labels.servicesSubheading}
            </p>
          </div>

          {showFullPageLink && site.pages.services && (
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--site-accent-text)] whitespace-nowrap hover:opacity-80"
            >
              <span>View full {labels.servicesNavLabel.toLowerCase()}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>

        <div className="mt-10 space-y-12">
          {groups.map((group) => (
            <div key={group.category || 'all'}>
              {group.category && (
                <h3
                  className={`font-display mb-5 border-b border-[var(--site-border)] pb-2.5 text-lg font-bold text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform}`}
                >
                  {group.category}
                </h3>
              )}

              {theme.style === 'minimal' ? (
                <ul className="divide-y divide-[var(--site-border)] border-y border-[var(--site-border)]">
                  {group.items.map((item) => (
                    <li
                      key={`${group.category}-${item.name}`}
                      className="flex flex-col justify-between gap-3 py-5 sm:flex-row sm:items-baseline sm:gap-8"
                    >
                      <div className="max-w-2xl">
                        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                          <span className="text-base font-bold text-[var(--site-ink)]">
                            {item.name}
                          </span>
                          {item.duration && (
                            <span className="text-xs text-[var(--site-muted)]">
                              · {item.duration}
                            </span>
                          )}
                          {item.dietary && item.dietary.length > 0 && (
                            <span className="text-xs font-medium text-[var(--site-accent-text)]">
                              · {item.dietary.join(' · ')}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="mt-1.5 text-sm leading-relaxed text-[var(--site-muted)]">
                            {item.description}
                          </p>
                        )}
                      </div>
                      {item.price && (
                        <span className="text-base font-bold tabular-nums text-[var(--site-ink)] whitespace-nowrap shrink-0">
                          {item.price}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {group.items.map((item) => (
                    <article
                      key={`${group.category}-${item.name}`}
                      className={`flex flex-col justify-between border border-[var(--site-border)] bg-[var(--site-surface)] p-6 ${theme.cardRadius}`}
                    >
                      <div>
                        <div className="flex items-baseline justify-between gap-4">
                          <h4 className="font-body text-base font-bold text-[var(--site-ink)]">
                            {item.name}
                          </h4>
                          {item.price && (
                            <span className="text-base font-bold tabular-nums text-[var(--site-accent-text)] whitespace-nowrap shrink-0">
                              {item.price}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="mt-2 text-sm leading-relaxed text-[var(--site-muted)]">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {(item.duration || (item.dietary && item.dietary.length > 0)) && (
                        <p className="mt-4 text-xs text-[var(--site-muted)]">
                          {[
                            item.duration,
                            item.dietary && item.dietary.length > 0
                              ? item.dietary.join(' · ')
                              : null,
                          ]
                            .filter(Boolean)
                            .join(' · ')}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
