import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, X } from 'lucide-react';
import { BLOG_ARTICLES, BLOG_CATEGORIES, type BlogCategory } from '../../content/blog';
import { useLanguage } from '../../context/LanguageContext';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import {
  EditorialHeading,
  KickerRule,
  ParallaxFrame,
  Reveal,
  StaggerContainer,
  StaggerItem,
} from '../../components/emtrc/Reveal';
import { SafeImage } from '../../components/SafeImage';
import { matchesSearchQuery } from '../../utils/markdown';

export function EmtrcBlogPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'all' | BlogCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      const catMatch = selectedCategory === 'all' || article.category === selectedCategory;
      const searchMatch = matchesSearchQuery(
        {
          title: article.title,
          excerpt: article.excerpt,
          category: article.category,
          keywords: article.keywords,
          rawBody: article.rawBody,
        },
        searchQuery
      );
      return catMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="The emtrc Journal — Websites, Google Maps, AI & UK Phones | London"
        description="Plain-English guides for London small businesses covering mobile websites, Google Maps rankings, missed-call text-back, DMCC review rules and the 31 January 2027 PSTN switch-off."
      />

      {/* Editorial Hero + Live Search Bar */}
      <section className="hero-editorial-wash border-b border-[var(--emtrc-border)] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal immediate>
                <KickerRule>{t.blogPage.kicker}</KickerRule>
              </Reveal>
              <EditorialHeading
                as="h1"
                immediate
                delay={0.05}
                line1={t.blogPage.headlineLine1}
                line2={t.blogPage.headlineLine2}
                line2Tone="accent"
                className="mt-4 font-editorial text-[clamp(2.5rem,5.4vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[var(--emtrc-ink)]"
              />
              <Reveal immediate delay={0.12}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--emtrc-muted)] sm:text-lg">
                  {t.blogPage.subheadline}
                </p>
              </Reveal>
            </div>

            {/* Instant Keyword & Title Search Bar */}
            <div className="lg:col-span-5">
              <Reveal immediate delay={0.16}>
                <label htmlFor="blog-search-input" className="block font-mono-data text-[11px] font-semibold uppercase tracking-wider text-[var(--emtrc-muted)]">
                  Search articles by title or keyword
                </label>
                <div className="relative mt-2">
                  <Search
                    className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[var(--emtrc-muted)]"
                    aria-hidden="true"
                  />
                  <input
                    id="blog-search-input"
                    type="search"
                    data-testid="blog-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Try PSTN, Google Maps, ChatGPT, 020, domain…"
                    className="w-full rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] py-3.5 pr-11 pl-11 text-sm text-[var(--emtrc-ink)] placeholder:text-[var(--emtrc-muted)] shadow-xs focus:border-[var(--emtrc-accent)] focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      data-testid="blog-search-clear"
                      aria-label="Clear article search"
                      onClick={() => setSearchQuery('')}
                      className="absolute top-1/2 right-3.5 -translate-y-1/2 text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
                <p className="mt-2 font-mono-data text-[11px] text-[var(--emtrc-muted)]">
                  Showing {filtered.length} of {BLOG_ARTICLES.length} static Markdown guides
                </p>
              </Reveal>
            </div>
          </div>

          {/* Animated underline category filter tabs */}
          <div
            role="tablist"
            aria-label="Filter journal guides by category"
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[var(--emtrc-border)] pt-5 text-sm"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'all'}
              data-testid="blog-filter-all"
              onClick={() => setSelectedCategory('all')}
              className={`relative pb-1.5 font-semibold transition-colors ${
                selectedCategory === 'all'
                  ? 'text-[var(--emtrc-ink)]'
                  : 'text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]'
              }`}
            >
              <span>
                {t.blogPage.allCategories} ({BLOG_ARTICLES.length})
              </span>
              {selectedCategory === 'all' && (
                <motion.span
                  layoutId="blog-cat-underline"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  className="absolute right-0 bottom-0 left-0 h-[2px] bg-[var(--emtrc-accent)]"
                />
              )}
            </button>
            {BLOG_CATEGORIES.map((category) => {
              const count = BLOG_ARTICLES.filter((a) => a.category === category).length;
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  data-testid={`blog-filter-${category}`}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative pb-1.5 font-semibold transition-colors ${
                    active
                      ? 'text-[var(--emtrc-ink)]'
                      : 'text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]'
                  }`}
                >
                  <span>
                    {category} ({count})
                  </span>
                  {active && (
                    <motion.span
                      layoutId="blog-cat-underline"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute right-0 bottom-0 left-0 h-[2px] bg-[var(--emtrc-accent)]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Lead Story + Editorial Grid */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          {filtered.length === 0 ? (
            <div
              data-testid="blog-empty-state"
              className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-12 text-center"
            >
              <p className="font-editorial text-2xl font-bold">
                No articles matched “{searchQuery}”
              </p>
              <p className="mt-2 text-sm text-[var(--emtrc-muted)]">
                Try another keyword like “PSTN”, “Google Maps”, “missed call” or “domain”, or browse our{' '}
                <Link to="/training" className="font-semibold text-[var(--emtrc-accent)] underline">
                  Owner Training Centre
                </Link>
                .
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-5 rounded-lg bg-[var(--emtrc-accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
              >
                Reset search &amp; filters
              </button>
            </div>
          ) : (
            <>
              {featured && (
                <Reveal>
                  <article
                    data-testid={`blog-card-${featured.slug}`}
                    className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] transition-colors hover:border-[var(--emtrc-ink)] lg:grid-cols-12"
                  >
                    <Link
                      to={`/blog/${featured.slug}`}
                      className="block overflow-hidden lg:col-span-6"
                    >
                      <ParallaxFrame offset={18} className="h-full min-h-[280px] w-full">
                        <SafeImage
                          src={featured.image}
                          alt={featured.imageAlt}
                          width={1200}
                          height={900}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </ParallaxFrame>
                    </Link>
                    <div className="flex flex-col justify-between p-7 sm:p-10 lg:col-span-6">
                      <div>
                        <p className="font-mono-data text-xs font-semibold text-[var(--emtrc-accent)]">
                          {featured.category} · {featured.readTime} · {featured.publishedDate}
                        </p>
                        <h2 className="mt-3 font-editorial text-2xl font-bold leading-tight tracking-[-0.02em] text-[var(--emtrc-ink)] group-hover:text-[var(--emtrc-accent)] sm:text-3xl">
                          <Link to={`/blog/${featured.slug}`}>{featured.title}</Link>
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-base">
                          {featured.excerpt}
                        </p>
                      </div>
                      <div className="mt-7 flex items-center justify-between border-t border-[var(--emtrc-border)] pt-5">
                        <span className="text-xs text-[var(--emtrc-muted)]">{featured.author}</span>
                        <Link
                          to={`/blog/${featured.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--emtrc-accent)] hover:underline"
                        >
                          <span>{t.blogPage.readArticle}</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              )}

              {rest.length > 0 && (
                <StaggerContainer className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((article) => (
                    <StaggerItem key={article.slug}>
                      <article
                        data-testid={`blog-card-${article.slug}`}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] transition-colors hover:border-[var(--emtrc-ink)]"
                      >
                        <Link to={`/blog/${article.slug}`} className="block overflow-hidden">
                          <SafeImage
                            src={article.image}
                            alt={article.imageAlt}
                            width={1200}
                            height={900}
                            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col justify-between p-6">
                          <div>
                            <p className="font-mono-data text-[11px] font-medium text-[var(--emtrc-accent)]">
                              {article.category} · {article.readTime}
                            </p>
                            <h3 className="mt-2 font-editorial text-xl font-bold leading-snug text-[var(--emtrc-ink)] group-hover:text-[var(--emtrc-accent)]">
                              <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                            </h3>
                            <p className="mt-2.5 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                              {article.excerpt}
                            </p>
                          </div>
                          <div className="mt-5 flex items-center justify-between border-t border-[var(--emtrc-border)] pt-4 text-xs">
                            <span className="font-mono-data text-[var(--emtrc-muted)]">
                              {article.publishedDate}
                            </span>
                            <Link
                              to={`/blog/${article.slug}`}
                              className="inline-flex items-center gap-1 font-semibold text-[var(--emtrc-accent)] hover:underline"
                            >
                              <span>{t.blogPage.readArticle}</span>
                              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </>
          )}
        </div>
      </section>
    </EmtrcLayout>
  );
}
