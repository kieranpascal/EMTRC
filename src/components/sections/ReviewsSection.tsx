import { Star } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export function ReviewsSection() {
  const { site, theme } = useSite();

  // Strictly hide section when reviews array is empty
  if (site.reviews.length === 0) {
    return null;
  }

  const avgRating = (
    site.reviews.reduce((sum, r) => sum + r.rating, 0) / site.reviews.length
  ).toFixed(1);

  return (
    <section
      id="reviews"
      data-testid="reviews-section"
      className={`border-b border-[var(--site-border)] bg-[var(--site-surface)] ${theme.sectionPadding}`}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              className={`font-display text-2xl font-bold text-[var(--site-ink)] sm:text-3xl ${theme.headingTracking} ${theme.headingTransform}`}
            >
              Customer reviews
            </h2>
            <p className="mt-2.5 flex items-center gap-2 text-sm text-[var(--site-muted)]">
              <Star
                className="h-4 w-4 fill-[var(--site-accent-text)] text-[var(--site-accent-text)]"
                aria-hidden="true"
              />
              <span className="font-semibold tabular-nums text-[var(--site-ink)]">
                {avgRating} / 5
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Based on {site.reviews.length} featured local{' '}
                {site.reviews.length === 1 ? 'review' : 'reviews'}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {site.reviews.map((review, index) => (
            <figure
              key={`${review.author}-${index}`}
              className={`flex flex-col justify-between border border-[var(--site-border)] bg-[var(--site-bg)] p-6 ${theme.cardRadius}`}
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
                        starIdx < Math.round(review.rating)
                          ? 'fill-current'
                          : 'opacity-25'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-[var(--site-ink)]">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
              </div>

              <figcaption className="mt-5 flex items-center gap-2 border-t border-[var(--site-border)] pt-4 text-xs text-[var(--site-muted)]">
                <span className="font-semibold text-[var(--site-ink)]">{review.author}</span>
                <span aria-hidden="true">·</span>
                <span>{review.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
