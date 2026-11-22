import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Download } from 'lucide-react';
import { BLOG_ARTICLES, getBlogArticleBySlug } from '../../content/blog';
import { SITE, type PdfGuideItem } from '../../content/site';
import { getServiceBySlug } from '../../content/services';
import { useLanguage } from '../../context/LanguageContext';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { PdfDownloadModal } from '../../components/emtrc/PdfDownloadModal';
import { KickerRule, Reveal } from '../../components/emtrc/Reveal';
import { SafeImage } from '../../components/SafeImage';

export function EmtrcBlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getBlogArticleBySlug(slug);
  const { t } = useLanguage();
  const [selectedGuide, setSelectedGuide] = useState<PdfGuideItem | null>(null);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const relatedGuide =
    SITE.pdfGuides.find((g) => g.id === article.relatedGuideId) ?? SITE.pdfGuides[0];
  const relatedService = getServiceBySlug(article.relatedServiceSlug);
  const otherArticles = BLOG_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <EmtrcLayout>
      <EmtrcHead
        title={`${article.title} | emtrc Journal`}
        description={article.excerpt}
      />

      <article className="pb-20">
        {/* Article Header */}
        <header className="hero-editorial-wash border-b border-[var(--emtrc-border)] pt-10 pb-12 sm:pt-14 sm:pb-16">
          <div className="mx-auto max-w-[820px] px-5 sm:px-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.blogPage.backToBlog}</span>
            </Link>

            <div className="mt-6">
              <KickerRule>
                {article.category} · {article.readTime} · {article.publishedDate}
              </KickerRule>
            </div>

            <h1 className="mt-4 font-editorial text-[clamp(2rem,4.6vw,3.35rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-[var(--emtrc-ink)]">
              {article.title}
            </h1>

            <p className="mt-5 text-base leading-relaxed text-[var(--emtrc-muted)] sm:text-lg">
              {article.excerpt}
            </p>

            <p className="mt-5 text-xs font-medium text-[var(--emtrc-muted)]">
              By {article.author}
            </p>
          </div>
        </header>

        {/* Hero Photo */}
        <div className="mx-auto max-w-[960px] px-5 pt-10 sm:px-8">
          <div className="overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)]">
            <SafeImage
              src={article.image}
              alt={article.imageAlt}
              width={1200}
              height={800}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </div>

        {/* Main Editorial Body */}
        <div className="mx-auto max-w-[780px] px-5 pt-12 sm:px-8">
          {/* Key Takeaways Box */}
          <Reveal>
            <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6 sm:p-8">
              <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
                {t.blogPage.keyTakeaways}
              </p>
              <ul className="mt-4 space-y-3">
                {article.keyTakeaways.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm leading-relaxed text-[var(--emtrc-ink)] sm:text-base"
                  >
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-[var(--emtrc-accent)]"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Sections */}
          <div className="mt-12 space-y-11">
            {article.sections.map((section) => (
              <Reveal key={section.heading}>
                <section>
                  <h2 className="font-editorial text-2xl font-extrabold leading-snug tracking-[-0.02em] text-[var(--emtrc-ink)] sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-[1.75] text-[var(--emtrc-muted)]">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-5 space-y-2.5 rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-5 text-sm leading-relaxed text-[var(--emtrc-ink)]">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emtrc-accent)]"
                            aria-hidden="true"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}
          </div>

          {/* Contextual Companion PDF + Related Service */}
          <div className="mt-14 grid grid-cols-1 gap-6 border-t border-[var(--emtrc-border)] pt-12 md:grid-cols-2">
            <div className="flex flex-col justify-between rounded-2xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] p-6 text-[#F5F3EE]">
              <div>
                <p className="text-xs font-semibold text-[var(--emtrc-brass-light)]">
                  Free companion PDF · {relatedGuide.pages}
                </p>
                <h3 className="mt-2 font-editorial text-xl font-bold text-white">
                  {relatedGuide.shortTitle}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#BAC5DC]">
                  {relatedGuide.summary}
                </p>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setSelectedGuide(relatedGuide)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Download free PDF</span>
                </button>
              </div>
            </div>

            {relatedService && (
              <div className="flex flex-col justify-between rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6">
                <div>
                  <p className="text-xs font-semibold text-[var(--emtrc-brass)]">
                    Want emtrc to handle this for you?
                  </p>
                  <h3 className="mt-2 font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                    {relatedService.shortTitle}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--emtrc-muted)]">
                    {relatedService.menuDescription} — {relatedService.priceTag}.
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    to={`/services/${relatedService.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--emtrc-accent)] hover:underline"
                  >
                    <span>Explore {relatedService.shortTitle}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Keep Reading Strip */}
        <div className="mx-auto mt-16 max-w-[1200px] border-t border-[var(--emtrc-border)] px-5 pt-14 sm:px-8">
          <KickerRule>{t.blogPage.relatedArticles}</KickerRule>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {otherArticles.map((other) => (
              <Link
                key={other.slug}
                to={`/blog/${other.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6 transition-transform duration-200 hover:-translate-y-0.5 hover:border-[var(--emtrc-accent)]"
              >
                <div>
                  <p className="text-xs font-medium text-[var(--emtrc-brass)]">
                    {other.category} · {other.readTime}
                  </p>
                  <h3 className="mt-2 font-editorial text-xl font-bold leading-snug text-[var(--emtrc-ink)] group-hover:text-[var(--emtrc-accent)]">
                    {other.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--emtrc-muted)]">{other.excerpt}</p>
                </div>
                <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--emtrc-accent)]">
                  <span>{t.blogPage.readArticle}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </article>

      <PdfDownloadModal guide={selectedGuide} onClose={() => setSelectedGuide(null)} />
    </EmtrcLayout>
  );
}
