import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BLOG_ARTICLES, BLOG_CATEGORIES, type BlogCategory } from '../../content/blog';
import { useLanguage } from '../../context/LanguageContext';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import {
  EditorialHeading,
  KickerRule,
  Reveal,
  StaggerContainer,
  StaggerItem,
} from '../../components/emtrc/Reveal';
import { SafeImage } from '../../components/SafeImage';

export function EmtrcBlogPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'all' | BlogCategory>('all');

  const filtered =
    selectedCategory === 'all'
      ? BLOG_ARTICLES
      : BLOG_ARTICLES.filter((article) => article.category === selectedCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="The emtrc Journal — Websites, Google Maps, AI & UK Phones | London"
        description="Plain-English guides for London small businesses covering mobile websites, Google Maps rankings, missed-call text-back, DMCC review rules and the 31 January 2027 PSTN switch-off."
      />

      {/* Editorial Hero */}
      <section className="hero-editorial-wash border-b border-[var(--emtrc-border)] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="max-w-3xl">
            <KickerRule>{t.blogPage.kicker}</KickerRule>
            <EditorialHeading
              as="h1"
              immediate
              line1={t.blogPage.headlineLine1}
              line2={t.blogPage.headlineLine2}
              line2Tone="brass"
              className="mt-4 font-editorial text-[clamp(2.6rem,5.6vw,4.5rem)] font-extrabold leading-[1.01] tracking-[-0.035em] text-[var(--emtrc-ink)]"
            />
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--emtrc-muted)] sm:text-lg">
              {t.blogPage.subheadline}
            </p>
          </div>

          {/* Clean underline category filter tabs (zero pill clutter) */}
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
              className={`pb-1 font-semibold transition-colors ${
                selectedCategory === 'all'
                  ? 'border-b-2 border-[var(--emtrc-accent)] text-[var(--emtrc-ink)]'
                  : 'text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]'
              }`}
            >
              {t.blogPage.allCategories} ({BLOG_ARTICLES.length})
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
                  className={`pb-1 font-semibold transition-colors ${
                    active
                      ? 'border-b-2 border-[var(--emtrc-accent)] text-[var(--emtrc-ink)]'
                      : 'text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]'
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Lead Story + Editorial Grid */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          {featured && (
            <Reveal>
              <article className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] lg:grid-cols-12">
                <Link
                  to={`/blog/${featured.slug}`}
                  className="block overflow-hidden lg:col-span-6"
                >
                  <SafeImage
                    src={featured.image}
                    alt={featured.imageAlt}
                    width={1200}
                    height={900}
                    className="h-full min-h-[260px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </Link>
                <div className="flex flex-col justify-between p-7 sm:p-10 lg:col-span-6">
                  <div>
                    <p className="text-xs font-semibold text-[var(--emtrc-brass)]">
                      {featured.category} · {featured.readTime} · {featured.publishedDate}
                    </p>
                    <h2 className="mt-3 font-editorial text-2xl font-extrabold leading-tight tracking-[-0.025em] text-[var(--emtrc-ink)] group-hover:text-[var(--emtrc-accent)] sm:text-3xl">
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
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] transition-transform duration-200 hover:-translate-y-0.5">
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
                        <p className="text-xs font-medium text-[var(--emtrc-brass)]">
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
                        <span className="text-[var(--emtrc-muted)]">{article.publishedDate}</span>
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
        </div>
      </section>
    </EmtrcLayout>
  );
}
