import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';
import { getNicheLabels, groupServicesByCategory } from '../../utils/niche';
import { normalizeTelHref } from '../../utils/seo';
import { Reveal } from '../emtrc/Reveal';
import { ScrollReveal, ScrollRevealItem } from '../emtrc/ScrollReveal';

interface ServicesSectionProps {
  limit?: number;
  showFullPageLink?: boolean;
  isStandalonePage?: boolean;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ServicesSection({
  limit,
  showFullPageLink = false,
  isStandalonePage = false,
}: ServicesSectionProps) {
  const { site, theme, blueprint, activePresetId } = useSite();
  const prefersReduced = useReducedMotion();
  const labels = getNicheLabels(site.niche);

  const itemsToDisplay = limit ? site.services.slice(0, limit) : site.services;
  const allGroups = groupServicesByCategory(itemsToDisplay);
  const categoryNames = allGroups.map((g) => g.category).filter(Boolean);
  const hasMultipleCategories = categoryNames.length > 1;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setSelectedCategory('all');
  }, [activePresetId]);

  const visibleGroups =
    selectedCategory === 'all'
      ? allGroups
      : allGroups.filter((g) => g.category === selectedCategory);

  const HeadingTag = isStandalonePage ? 'h1' : 'h2';
  const archetype = blueprint.archetype;

  const renderCategoryTabs = () => {
    if (!hasMultipleCategories) return null;
    const tabs = [{ key: 'all', label: 'All' }, ...categoryNames.map((c) => ({ key: c, label: c }))];

    return (
      <div
        role="tablist"
        aria-label={`Filter ${labels.servicesNavLabel.toLowerCase()} by category`}
        className="mt-8 flex flex-wrap items-center gap-1 border-b border-[var(--site-border)]"
      >
        {tabs.map((tab) => {
          const isActive = selectedCategory === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(tab.key)}
              className={`relative px-4 py-3 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                isActive
                  ? 'text-[var(--site-ink)]'
                  : 'text-[var(--site-muted)] hover:text-[var(--site-ink)]'
              }`}
            >
              <span>{tab.label}</span>
              {isActive && (
                <motion.span
                  layoutId={`services-tab-${activePresetId}`}
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-x-0 -bottom-px h-[2px] bg-[var(--site-accent)]"
                />
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <section
      id="services"
      data-archetype={archetype}
      className={`border-b border-[var(--site-border)] bg-[var(--site-bg)] ${theme.sectionPadding}`}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="font-mono-data text-xs font-semibold text-[var(--site-accent-text)]">
                {archetype === 'engineering-command'
                  ? 'Fixed Rates & Specification'
                  : archetype === 'atelier-magazine'
                    ? 'The Menu & Tariff'
                    : archetype === 'swiss-grid'
                      ? 'Index / Pricing'
                      : 'Clear Local Pricing'}
              </p>
              <HeadingTag
                className={`font-display mt-2 font-bold text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform} ${
                  isStandalonePage
                    ? 'text-[clamp(2.25rem,4.2vw,3.5rem)] leading-[1.06]'
                    : 'text-2xl sm:text-4xl leading-[1.08]'
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
                to="services"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--site-accent-text)] whitespace-nowrap transition-opacity hover:opacity-80"
              >
                <span>View full {labels.servicesNavLabel.toLowerCase()}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            )}
          </div>
        </Reveal>

        {renderCategoryTabs()}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activePresetId}-${selectedCategory}`}
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: EASE }}
            className="mt-10 space-y-12"
          >
            {visibleGroups.map((group, groupIdx) => {
              const runningOffset = visibleGroups
                .slice(0, groupIdx)
                .reduce((acc, g) => acc + g.items.length, 0);

              return (
                <div key={group.category || 'all'}>
                  {group.category && (
                    <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-[var(--site-border)] pb-3">
                      <h3
                        className={`font-display text-lg sm:text-xl font-bold text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform}`}
                      >
                        {group.category}
                      </h3>
                      <span className="font-mono-data text-xs text-[var(--site-muted)] tabular-nums">
                        {String(group.items.length).padStart(2, '0')} items
                      </span>
                    </div>
                  )}

                  {/* ARCHETYPE 1: ATELIER MAGAZINE — Dotted-Leader Editorial Menu */}
                  {archetype === 'atelier-magazine' && (
                    <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2">
                      {group.items.map((item) => (
                        <article
                          key={`${group.category}-${item.name}`}
                          className="border-b border-[var(--site-border)]/70 pb-5"
                        >
                          <div className="flex items-baseline gap-3">
                            <h4 className="font-display text-lg font-bold text-[var(--site-ink)] shrink-0">
                              {item.name}
                            </h4>
                            <span
                              aria-hidden="true"
                              className="flex-1 border-b border-dotted border-[var(--site-border)] -translate-y-1"
                            />
                            {item.price && (
                              <span className="font-mono-data text-base font-bold tabular-nums text-[var(--site-accent-text)] whitespace-nowrap shrink-0">
                                {item.price}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="mt-2 text-sm leading-relaxed text-[var(--site-muted)]">
                              {item.description}
                            </p>
                          )}
                          {(item.duration || (item.dietary && item.dietary.length > 0)) && (
                            <p className="font-mono-data mt-2 text-xs text-[var(--site-muted)]">
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

                  {/* ARCHETYPE 2: SWISS GRID — Indexed Hairline Specification Ledger */}
                  {archetype === 'swiss-grid' && (
                    <div className="border border-[var(--site-border)] bg-[var(--site-surface)]">
                      <ul className="divide-y divide-[var(--site-border)]">
                        {group.items.map((item, idx) => (
                          <li
                            key={`${group.category}-${item.name}`}
                            className="grid grid-cols-1 gap-3 px-5 py-5 transition-colors hover:bg-[var(--site-surface-alt)] sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:px-6"
                          >
                            <span className="font-mono-data text-xs font-semibold text-[var(--site-accent-text)] tabular-nums sm:col-span-1">
                              {String(runningOffset + idx + 1).padStart(2, '0')}
                            </span>
                            <div className="sm:col-span-7">
                              <h4 className="font-display text-base sm:text-lg font-bold text-[var(--site-ink)]">
                                {item.name}
                              </h4>
                              {item.description && (
                                <p className="mt-1 text-sm leading-relaxed text-[var(--site-muted)]">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            <div className="font-mono-data text-xs text-[var(--site-muted)] sm:col-span-2">
                              {[
                                item.duration,
                                item.dietary && item.dietary.length > 0
                                  ? item.dietary.join(' · ')
                                  : null,
                              ]
                                .filter(Boolean)
                                .join(' · ') || 'Standard'}
                            </div>
                            <div className="sm:col-span-2 sm:text-right">
                              {item.price && (
                                <span className="font-mono-data text-base font-bold tabular-nums text-[var(--site-ink)] whitespace-nowrap">
                                  {item.price}
                                </span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* ARCHETYPE 3: ENGINEERING COMMAND — Technical Upfront Rate Matrix */}
                  {archetype === 'engineering-command' && (
                    <ScrollReveal
                      autoWrapChildren={false}
                      className="grid grid-cols-1 gap-4 md:grid-cols-2"
                    >
                      {group.items.map((item, idx) => (
                        <ScrollRevealItem key={`${group.category}-${item.name}`}>
                          <article
                            className={`group flex h-full flex-col justify-between border border-[var(--site-border)] bg-[var(--site-surface)] p-6 transition-colors hover:border-[var(--site-accent)] ${theme.cardRadius}`}
                          >
                            <div>
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <span className="font-mono-data text-[11px] text-[var(--site-muted)] tabular-nums">
                                    SPEC {String(runningOffset + idx + 1).padStart(2, '0')}
                                  </span>
                                  <h4 className="font-display mt-1 text-lg font-bold text-[var(--site-ink)]">
                                    {item.name}
                                  </h4>
                                </div>
                                {item.price && (
                                  <span className="font-mono-data shrink-0 border border-[var(--site-border)] bg-[var(--site-surface-alt)] px-3 py-1.5 text-sm font-bold tabular-nums text-[var(--site-accent-text)] whitespace-nowrap">
                                    {item.price}
                                  </span>
                                )}
                              </div>
                              {item.description && (
                                <p className="mt-3 text-sm leading-relaxed text-[var(--site-muted)]">
                                  {item.description}
                                </p>
                              )}
                            </div>

                            <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--site-border)] pt-3.5 text-xs">
                              <span className="font-mono-data text-[var(--site-muted)]">
                                {item.duration || 'Written quote before work'}
                              </span>
                              <a
                                href={normalizeTelHref(site.phone)}
                                className="inline-flex items-center gap-1 font-semibold text-[var(--site-accent-text)] hover:underline underline-offset-4"
                              >
                                <Phone className="h-3 w-3" aria-hidden="true" />
                                <span>Enquire</span>
                              </a>
                            </div>
                          </article>
                        </ScrollRevealItem>
                      ))}
                    </ScrollReveal>
                  )}

                  {/* ARCHETYPE 4: GALLERY MINIMAL — Quiet Spacious Editorial Rows */}
                  {archetype === 'gallery-minimal' && (
                    <ul className="divide-y divide-[var(--site-border)] border-y border-[var(--site-border)]">
                      {group.items.map((item) => (
                        <li
                          key={`${group.category}-${item.name}`}
                          className="flex flex-col justify-between gap-3 py-6 sm:flex-row sm:items-baseline sm:gap-10"
                        >
                          <div className="max-w-2xl">
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                              <span className="font-display text-lg font-bold text-[var(--site-ink)]">
                                {item.name}
                              </span>
                              {item.duration && (
                                <span className="font-mono-data text-xs text-[var(--site-muted)]">
                                  {item.duration}
                                </span>
                              )}
                              {item.dietary && item.dietary.length > 0 && (
                                <span className="font-mono-data text-xs text-[var(--site-accent-text)]">
                                  {item.dietary.join(' · ')}
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
                            <span className="font-mono-data text-base font-bold tabular-nums text-[var(--site-ink)] whitespace-nowrap shrink-0">
                              {item.price}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* ARCHETYPE 5: EDITORIAL CINEMA — Bold Elevated Studio Cards */}
                  {archetype === 'editorial-cinema' && (
                    <ScrollReveal
                      autoWrapChildren={false}
                      className="grid grid-cols-1 gap-5 md:grid-cols-2"
                    >
                      {group.items.map((item) => (
                        <ScrollRevealItem key={`${group.category}-${item.name}`}>
                          <motion.article
                            whileHover={prefersReduced ? undefined : { y: -3 }}
                            transition={{ duration: 0.2, ease: EASE }}
                            className={`group relative flex h-full flex-col justify-between overflow-hidden border border-[var(--site-border)] bg-[var(--site-surface)] p-6 transition-colors hover:border-[var(--site-accent)] ${theme.cardRadius}`}
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-y-0 left-0 w-[3px] bg-[var(--site-accent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                            />
                            <div>
                              <div className="flex items-baseline justify-between gap-4">
                                <h4
                                  className={`font-display text-lg font-bold text-[var(--site-ink)] ${theme.headingTracking}`}
                                >
                                  {item.name}
                                </h4>
                                {item.price && (
                                  <span className="font-mono-data text-base font-bold tabular-nums text-[var(--site-accent-text)] whitespace-nowrap shrink-0">
                                    {item.price}
                                  </span>
                                )}
                              </div>
                              {item.description && (
                                <p className="mt-2.5 text-sm leading-relaxed text-[var(--site-muted)]">
                                  {item.description}
                                </p>
                              )}
                            </div>

                            {(item.duration || (item.dietary && item.dietary.length > 0)) && (
                              <p className="font-mono-data mt-5 border-t border-[var(--site-border)] pt-3 text-xs text-[var(--site-muted)]">
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
                          </motion.article>
                        </ScrollRevealItem>
                      ))}
                    </ScrollReveal>
                  )}
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
