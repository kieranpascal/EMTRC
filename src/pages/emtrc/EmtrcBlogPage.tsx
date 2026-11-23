import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Image as ImageIcon, Search, X } from 'lucide-react';
import { BLOG_ARTICLES, BLOG_CATEGORIES, type BlogCategory } from '../../content/blog';
import { useLanguage } from '../../context/LanguageContext';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { PageHeader } from '../../components/emtrc/PageHeader';
import { OrnamentalDivider } from '../../components/emtrc/OrnamentalDivider';
import { MapsRankingOrbitIllustration } from '../../components/emtrc/AnimatedIllustrations';
import { Reveal } from '../../components/emtrc/Reveal';
import { ScrollReveal } from '../../components/emtrc/ScrollReveal';
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

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="emtrc Signals — Websites, Google Maps, AI & UK Phones | London"
        description="Plain-English London field intelligence covering mobile websites, Google Maps rankings, missed-call text-back, DMCC review rules and the 31 January 2027 PSTN switch-off."
      />

      <PageHeader
        kicker={t.blogPage.kicker}
        headlineLine1={t.blogPage.headlineLine1}
        headlineLine2={t.blogPage.headlineLine2}
        description={t.blogPage.subheadline}
        backdropImage="/src/assets/images/emtrc_mobile_maps_search_1795424180037.jpg"
        backdropAlt="London commuter reading local business listings on a Victorian high street"
        actions={
          <div className="w-full">
            <label
              htmlFor="blog-search-input"
              className="block font-mono-data text-[10px] font-semibold uppercase tracking-wider text-[#9BA3B5]"
            >
              {t.blogPage.searchLabel}
            </label>
            <div className="relative mt-2">
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#8E96A8]"
                aria-hidden="true"
              />
              <input
                id="blog-search-input"
                type="search"
                data-testid="blog-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.blogPage.searchPlaceholder}
                className="w-full rounded-xl border border-white/15 bg-white/[0.06] py-3 pr-10 pl-10 text-sm text-white placeholder:text-[#8E96A8] backdrop-blur-sm focus:border-[#FF7B63] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  data-testid="blog-search-clear"
                  aria-label="Clear article search"
                  onClick={() => setSearchQuery('')}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[#9BA3B5] hover:text-white"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <p className="mt-1.5 font-mono-data text-[11px] text-[#8E96A8]">
              {filtered.length} / {BLOG_ARTICLES.length} long-form guides · 3 photos + interactive chart each
            </p>
          </div>
        }
        bottomBar={
          <div
            role="tablist"
            aria-label="Filter journal guides by category"
            className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'all'}
              data-testid="blog-filter-all"
              onClick={() => setSelectedCategory('all')}
              className={`relative pb-2 font-semibold transition-colors ${
                selectedCategory === 'all' ? 'text-white' : 'text-[#9BA3B5] hover:text-white'
              }`}
            >
              <span>
                {t.blogPage.allCategories}{' '}
                <span className="font-mono-data text-xs text-[#8E96A8]">({BLOG_ARTICLES.length})</span>
              </span>
              {selectedCategory === 'all' && (
                <motion.span
                  layoutId="blog-cat-underline"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#FF7B63]"
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
                  className={`relative pb-2 font-semibold transition-colors ${
                    active ? 'text-white' : 'text-[#9BA3B5] hover:text-white'
                  }`}
                >
                  <span>
                    {category}{' '}
                    <span className="font-mono-data text-xs text-[#8E96A8]">({count})</span>
                  </span>
                  {active && (
                    <motion.span
                      layoutId="blog-cat-underline"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#FF7B63]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        }
      />

      <OrnamentalDivider
        pattern="barbican-grid"
        from="obsidian"
        to="canvas"
        label="SIGNALS FIELD INTELLIGENCE · 6 BRIEFINGS"
        accentColor="coral"
      />

      {/* Symmetrical 3x2 Signals Grid (Zero Orphan Boxes) */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          {filtered.length === 0 ? (
            <div
              data-testid="blog-empty-state"
              className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-12 text-center"
            >
              <p className="font-editorial text-2xl font-bold">
                No briefings matched “{searchQuery}”
              </p>
              <p className="mt-2 text-sm text-[var(--emtrc-muted)]">
                Try another keyword like “PSTN”, “Google Maps”, “missed call” or “domain”, or browse our{' '}
                <Link to="/training" className="font-semibold text-[var(--emtrc-accent)] underline">
                  {t.nav.training}
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
            <ScrollReveal
              className={`grid grid-cols-1 gap-6 ${
                filtered.length === 1
                  ? 'max-w-2xl'
                  : filtered.length === 2 || filtered.length === 4
                    ? 'md:grid-cols-2'
                    : 'md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {filtered.map((article, idx) => (
                <article
                  key={article.slug}
                  data-testid={`blog-card-${article.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--emtrc-accent)] hover:shadow-xl"
                >
                  <Link to={`/blog/${article.slug}`} className="relative block overflow-hidden bg-[var(--emtrc-navy)]">
                    <SafeImage
                      src={article.image}
                      alt={article.imageAlt}
                      width={1200}
                      height={900}
                      priority={idx < 3}
                      className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090C]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 right-3.5 left-3.5 flex items-center justify-between font-mono-data text-[10px] font-semibold uppercase tracking-wider">
                      <span className="inline-flex items-center gap-1 text-[#FF8C73]">
                        <BarChart3 className="h-3 w-3" aria-hidden="true" />
                        Interactive chart
                      </span>
                      <span className="inline-flex items-center gap-1 text-white/85">
                        <ImageIcon className="h-3 w-3" aria-hidden="true" />
                        4 photos
                      </span>
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <p className="font-mono-data text-[11px] font-medium text-[var(--emtrc-accent)]">
                        {article.category} · {article.readTime}
                      </p>
                      <h2 className="mt-2 font-editorial text-xl font-bold leading-snug text-[var(--emtrc-ink)] group-hover:text-[var(--emtrc-accent)]">
                        <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-[var(--emtrc-border)] pt-3.5 text-xs">
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
              ))}
            </ScrollReveal>
          )}
        </div>
      </section>

      <OrnamentalDivider
        pattern="victorian-tile"
        from="canvas"
        to="sand"
        label="LIVE LONDON VISIBILITY TELEMETRY"
        accentColor="amber"
      />

      {/* Live Animated London Radar Illustration Band */}
      <section className="bg-[var(--emtrc-sand)] py-11 sm:py-14">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="font-mono-data text-xs font-semibold uppercase tracking-[0.15em] text-[var(--emtrc-accent)]">
                Why we publish field data
              </p>
              <h2 className="mt-2.5 font-editorial text-3xl font-bold leading-tight text-[var(--emtrc-ink)]">
                Built from real London borough audits, not generic SEO fluff.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                Every Signals briefing translates what moves London barbers, salons, plumbers, cleaners and cafés into Google Maps top 3 and AI search recommendations.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-7">
              <MapsRankingOrbitIllustration />
            </Reveal>
          </div>
        </div>
      </section>
    </EmtrcLayout>
  );
}
