import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { AnimatedCounter, Reveal } from '../emtrc/Reveal';
import { ScrollReveal, ScrollRevealItem } from '../emtrc/ScrollReveal';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ReviewsSection() {
  const { site, theme, blueprint, activePresetId } = useSite();
  const prefersReduced = useReducedMotion();
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  useEffect(() => {
    setSpotlightIndex(0);
  }, [activePresetId]);

  // Strictly hide section when reviews array is empty
  if (site.reviews.length === 0) {
    return null;
  }

  const avgNumeric =
    site.reviews.reduce((sum, r) => sum + r.rating, 0) / site.reviews.length;

  const isEditorialPullQuote =
    blueprint.archetype === 'atelier-magazine' || blueprint.archetype === 'gallery-minimal';
  const isSwissLedger = blueprint.archetype === 'swiss-grid';

  const safeIdx = spotlightIndex % site.reviews.length;
  const featuredReview = site.reviews[safeIdx];

  return (
    <section
      id="reviews"
      data-testid="reviews-section"
      className={`border-b border-[var(--site-border)] bg-[var(--site-surface)] ${theme.sectionPadding}`}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono-data text-xs font-semibold text-[var(--site-accent-text)]">
                Verified Local Feedback
              </p>
              <h2
                className={`font-display mt-2 text-2xl font-bold text-[var(--site-ink)] sm:text-4xl ${theme.headingTracking} ${theme.headingTransform}`}
              >
                Customer reviews
              </h2>
            </div>

            <div className="flex items-center gap-3 border border-[var(--site-border)] bg-[var(--site-bg)] px-4 py-2.5 text-sm">
              <Star
                className="h-4 w-4 fill-[var(--site-accent-text)] text-[var(--site-accent-text)]"
                aria-hidden="true"
              />
              <span className="font-bold text-[var(--site-ink)]">
                <AnimatedCounter target={avgNumeric} decimals={1} /> / 5
              </span>
              <span className="text-[var(--site-border)]" aria-hidden="true">
                |
              </span>
              <span className="text-xs text-[var(--site-muted)]">
                {site.reviews.length} featured in {site.borough}
              </span>
            </div>
          </div>
        </Reveal>

        {/* ATELIER MAGAZINE & GALLERY MINIMAL: Interactive Spotlight Pull-Quote + Compact Strip */}
        {isEditorialPullQuote ? (
          <div className="mt-10">
            <div
              className={`border border-[var(--site-border)] bg-[var(--site-bg)] p-7 sm:p-11 ${theme.cardRadius}`}
            >
              <AnimatePresence mode="wait">
                <motion.figure
                  key={`${activePresetId}-${safeIdx}`}
                  initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="mx-auto max-w-3xl text-center"
                >
                  <div
                    className="flex items-center justify-center gap-1 text-[var(--site-accent-text)]"
                    aria-label={`${featuredReview.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className={`h-4 w-4 ${
                          starIdx < Math.round(featuredReview.rating)
                            ? 'fill-current'
                            : 'opacity-25'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="font-display mt-5 text-xl sm:text-2xl md:text-[1.75rem] font-medium leading-[1.35] text-[var(--site-ink)]">
                    &ldquo;{featuredReview.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center justify-center gap-2 text-xs text-[var(--site-muted)]">
                    <span className="font-semibold text-[var(--site-ink)]">
                      {featuredReview.author}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-data">{featuredReview.source}</span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>

              {site.reviews.length > 1 && (
                <div className="mt-8 flex items-center justify-center gap-3 border-t border-[var(--site-border)] pt-6">
                  <button
                    type="button"
                    onClick={() =>
                      setSpotlightIndex((safeIdx - 1 + site.reviews.length) % site.reviews.length)
                    }
                    aria-label="Previous review"
                    className={`inline-flex h-9 w-9 items-center justify-center border border-[var(--site-border)] bg-[var(--site-surface)] text-[var(--site-ink)] hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <div className="flex items-center gap-2">
                    {site.reviews.map((rev, idx) => (
                      <button
                        key={`${rev.author}-${idx}`}
                        type="button"
                        onClick={() => setSpotlightIndex(idx)}
                        aria-label={`Read review by ${rev.author}`}
                        className={`font-mono-data px-2.5 py-1 text-xs transition-colors ${
                          idx === safeIdx
                            ? 'bg-[var(--site-accent)] font-semibold text-[var(--site-accent-ink)]'
                            : 'text-[var(--site-muted)] hover:text-[var(--site-ink)]'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSpotlightIndex((safeIdx + 1) % site.reviews.length)}
                    aria-label="Next review"
                    className={`inline-flex h-9 w-9 items-center justify-center border border-[var(--site-border)] bg-[var(--site-surface)] text-[var(--site-ink)] hover:border-[var(--site-ink)] ${theme.buttonRadius}`}
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : isSwissLedger ? (
          /* SWISS GRID: Hairline Columnar Ledger */
          <div className="mt-10 grid grid-cols-1 border border-[var(--site-border)] bg-[var(--site-bg)] md:grid-cols-3 md:divide-x md:divide-[var(--site-border)]">
            {site.reviews.map((review, index) => (
              <figure
                key={`${review.author}-${index}`}
                className="flex flex-col justify-between border-b border-[var(--site-border)] p-6 last:border-b-0 md:border-b-0"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-data text-xs font-semibold text-[var(--site-accent-text)] tabular-nums">
                      REF {String(index + 1).padStart(2, '0')}
                    </span>
                    <div
                      className="flex items-center gap-0.5 text-[var(--site-accent-text)]"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className={`h-3.5 w-3.5 ${
                            starIdx < Math.round(review.rating) ? 'fill-current' : 'opacity-25'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote className="mt-4 text-sm leading-relaxed text-[var(--site-ink)]">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                </div>

                <figcaption className="mt-6 flex items-center justify-between border-t border-[var(--site-border)] pt-4 text-xs text-[var(--site-muted)]">
                  <span className="font-semibold text-[var(--site-ink)]">{review.author}</span>
                  <span className="font-mono-data">{review.source}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          /* EDITORIAL CINEMA & ENGINEERING COMMAND: Staggered Studio Review Cards */
          <ScrollReveal
            autoWrapChildren={false}
            className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {site.reviews.map((review, index) => (
              <ScrollRevealItem key={`${review.author}-${index}`}>
                <motion.figure
                  whileHover={prefersReduced ? undefined : { y: -3 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className={`flex h-full flex-col justify-between border border-[var(--site-border)] bg-[var(--site-bg)] p-6 ${theme.cardRadius}`}
                >
                  <div>
                    <div
                      className="flex items-center gap-0.5 text-[var(--site-accent-text)]"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className={`h-4 w-4 ${
                            starIdx < Math.round(review.rating) ? 'fill-current' : 'opacity-25'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <blockquote className="mt-4 text-sm leading-relaxed text-[var(--site-ink)]">
                      &ldquo;{review.text}&rdquo;
                    </blockquote>
                  </div>

                  <figcaption className="mt-5 flex items-center justify-between gap-2 border-t border-[var(--site-border)] pt-4 text-xs text-[var(--site-muted)]">
                    <span className="font-semibold text-[var(--site-ink)]">{review.author}</span>
                    <span className="font-mono-data">{review.source}</span>
                  </figcaption>
                </motion.figure>
              </ScrollRevealItem>
            ))}
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
