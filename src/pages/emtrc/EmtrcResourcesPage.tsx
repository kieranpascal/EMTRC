import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Check, ChevronDown, Download, Search, X } from 'lucide-react';
import { BLOG_ARTICLES } from '../../content/blog';
import { TRAINING_TRACKS } from '../../content/training';
import { SITE, type PdfGuideItem } from '../../content/site';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { PdfDownloadModal } from '../../components/emtrc/PdfDownloadModal';
import { EditorialHeading, KickerRule, Reveal } from '../../components/emtrc/Reveal';
import { SafeImage } from '../../components/SafeImage';
import { matchesSearchQuery } from '../../utils/markdown';

export function EmtrcResourcesPage() {
  const [selectedGuide, setSelectedGuide] = useState<PdfGuideItem | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = useMemo(
    () =>
      SITE.pdfGuides.filter((guide) =>
        matchesSearchQuery(
          {
            title: guide.title,
            excerpt: `${guide.summary} ${guide.highlights.join(' ')}`,
            category: guide.category,
          },
          searchQuery
        )
      ),
    [searchQuery]
  );

  const filteredArticles = useMemo(
    () =>
      BLOG_ARTICLES.filter((article) =>
        matchesSearchQuery(
          {
            title: article.title,
            excerpt: article.excerpt,
            category: article.category,
            keywords: article.keywords,
            rawBody: article.rawBody,
          },
          searchQuery
        )
      ),
    [searchQuery]
  );

  const filteredTracks = useMemo(
    () =>
      TRAINING_TRACKS.filter((track) =>
        matchesSearchQuery(
          {
            title: track.title,
            excerpt: `${track.subtitle} ${track.lessons.map((l) => l.title).join(' ')}`,
            category: track.code,
          },
          searchQuery
        )
      ),
    [searchQuery]
  );

  const totalMatches = filteredGuides.length + filteredArticles.length + filteredTracks.length;

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="Free PDF Guides, Training & Journal — emtrc Resources for London Businesses"
        description="Search free PDF playbooks, interactive training checklists and plain-English guides for London local businesses: Website Checklist, UK PSTN Jan 2027 Switch-Off Guide and Google Maps Playbook."
      />

      {/* Editorial Hero + Unified Resource Search Bar */}
      <section className="hero-editorial-wash border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 pt-12 pb-16 sm:px-8 sm:pt-18 sm:pb-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal immediate>
                <KickerRule>Free London Small-Business Library</KickerRule>
              </Reveal>
              <EditorialHeading
                as="h1"
                immediate
                delay={0.05}
                line1="Plain-English playbooks"
                line2="you can use this afternoon."
                line2Tone="accent"
                className="mt-4 font-editorial text-4xl font-bold leading-[1.03] tracking-[-0.03em] sm:text-5xl"
              />
              <Reveal immediate delay={0.12}>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--emtrc-muted)]">
                  Search across our free PDF guides, Markdown journal articles and interactive owner training tracks — zero sales fluff, written strictly for London high streets and local trades.
                </p>

                {/* Instant Search Bar across Resources, Blog & Training */}
                <div className="mt-7 max-w-xl">
                  <label htmlFor="resources-search-input" className="sr-only">
                    Search PDF guides, articles and training tracks
                  </label>
                  <div className="relative">
                    <Search
                      className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[var(--emtrc-muted)]"
                      aria-hidden="true"
                    />
                    <input
                      id="resources-search-input"
                      type="search"
                      data-testid="resources-search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search PDFs, articles & training (e.g. PSTN, checklist, Maps, photos)…"
                      className="w-full rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] py-3.5 pr-11 pl-11 text-sm text-[var(--emtrc-ink)] placeholder:text-[var(--emtrc-muted)] shadow-xs focus:border-[var(--emtrc-accent)] focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        data-testid="resources-search-clear"
                        aria-label="Clear resources search"
                        onClick={() => setSearchQuery('')}
                        className="absolute top-1/2 right-3.5 -translate-y-1/2 text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                  {searchQuery.trim() && (
                    <p
                      data-testid="resources-search-count"
                      className="mt-2 font-mono-data text-xs text-[var(--emtrc-accent)]"
                    >
                      Found {totalMatches} matching {totalMatches === 1 ? 'resource' : 'resources'} ({filteredGuides.length} PDFs · {filteredArticles.length} articles · {filteredTracks.length} training tracks)
                    </p>
                  )}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal immediate delay={0.14}>
                <div className="overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-navy)] shadow-lg">
                  <SafeImage
                    src="/src/assets/images/emtrc_training_workshop_1795422463963.jpg"
                    alt="Independent London business owner reviewing a printed Google Maps checklist workbook"
                    width={1200}
                    height={900}
                    priority
                    className="h-[300px] w-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Empty Search State */}
      {searchQuery.trim() && totalMatches === 0 && (
        <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-12 text-center">
            <p className="font-editorial text-2xl font-bold">
              No resources matched “{searchQuery}”
            </p>
            <p className="mt-2 text-sm text-[var(--emtrc-muted)]">
              Try searching for “PSTN”, “Google Maps”, “checklist”, “photos” or “domain”.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-5 rounded-lg bg-[var(--emtrc-accent)] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Show all resources
            </button>
          </div>
        </section>
      )}

      {/* Free PDF Guides Library */}
      {filteredGuides.length > 0 && (
        <section id="guides" className="border-b border-[var(--emtrc-border)] py-16 sm:py-22">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <KickerRule>01 · Downloadable PDF Playbooks</KickerRule>
                <h2 className="mt-2 font-editorial text-3xl font-bold">
                  Free printable guides for your counter or van
                </h2>
              </div>
              <span className="font-mono-data text-xs text-[var(--emtrc-muted)]">
                {filteredGuides.length} PDF {filteredGuides.length === 1 ? 'guide' : 'guides'}
              </span>
            </div>

            <div className="space-y-8">
              {filteredGuides.map((guide, index) => (
                <Reveal key={guide.id} delay={index * 0.05}>
                  <article
                    id={`guide-${guide.id}`}
                    data-testid={`guide-card-${guide.id}`}
                    className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] lg:grid-cols-12"
                  >
                    <div className="lg:col-span-5">
                      <SafeImage
                        src={guide.coverImage}
                        alt={guide.coverAlt}
                        width={1200}
                        height={900}
                        className="h-64 w-full object-cover lg:h-full"
                      />
                    </div>
                    <div className="flex flex-col justify-between p-6 sm:p-9 lg:col-span-7">
                      <div>
                        <p className="font-mono-data text-xs font-semibold text-[var(--emtrc-accent)]">
                          {guide.category} · {guide.pages} · {guide.readTime}
                        </p>
                        <h3 className="mt-2 font-editorial text-2xl font-bold sm:text-3xl">
                          {guide.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-base">
                          {guide.summary}
                        </p>
                        <ul className="mt-5 space-y-2 text-sm">
                          {guide.highlights.map((h) => (
                            <li key={h} className="flex items-start gap-2.5">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emtrc-accent)]" aria-hidden="true" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-[var(--emtrc-border)] pt-6">
                        <button
                          type="button"
                          data-testid={`download-guide-${guide.id}`}
                          onClick={() => setSelectedGuide(guide)}
                          className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                        >
                          <Download className="h-4 w-4" aria-hidden="true" />
                          <span>Download free PDF</span>
                        </button>
                        <span className="text-xs text-[var(--emtrc-muted)]">
                          Instant PDF download · Email required
                        </span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Owner Training Centre Spotlight */}
      {filteredTracks.length > 0 && (
        <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] py-16 sm:py-22">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <KickerRule>02 · Interactive Owner Training Centre</KickerRule>
                <h2 className="mt-2 font-editorial text-3xl font-bold">
                  Step-by-step checklists with saved browser progress
                </h2>
              </div>
              <Link
                to="/training"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--emtrc-accent)] hover:underline"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                <span>Open Training Centre</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {filteredTracks.map((track) => (
                <Link
                  key={track.id}
                  to="/training"
                  className="group flex flex-col justify-between rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] p-6 transition-colors hover:border-[var(--emtrc-ink)]"
                >
                  <div>
                    <p className="font-mono-data text-[11px] font-semibold text-[var(--emtrc-accent)]">
                      {track.code} · {track.estimatedTime}
                    </p>
                    <h3 className="mt-2 font-editorial text-lg font-bold group-hover:text-[var(--emtrc-accent)]">
                      {track.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--emtrc-muted)]">
                      {track.subtitle}
                    </p>
                  </div>
                  <p className="mt-5 font-mono-data text-xs font-semibold text-[var(--emtrc-ink)]">
                    {track.lessons.length} lessons →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Matching Journal Articles (from Static Markdown Pipeline) */}
      {filteredArticles.length > 0 && (
        <section className="border-b border-[var(--emtrc-border)] py-16 sm:py-22">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <KickerRule>03 · The emtrc Journal</KickerRule>
                <h2 className="mt-2 font-editorial text-3xl font-bold">
                  Deep-dive London guides &amp; field notes
                </h2>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--emtrc-accent)] hover:underline"
              >
                <span>Browse &amp; search all articles</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.slice(0, searchQuery.trim() ? 6 : 3).map((article) => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  data-testid={`resource-article-${article.slug}`}
                  className="group flex flex-col justify-between rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6 transition-colors hover:border-[var(--emtrc-ink)]"
                >
                  <div>
                    <p className="font-mono-data text-[11px] font-semibold text-[var(--emtrc-accent)]">
                      {article.category} · {article.readTime}
                    </p>
                    <h3 className="mt-2 font-editorial text-lg font-bold leading-snug group-hover:text-[var(--emtrc-accent)]">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--emtrc-muted)]">
                      {article.excerpt}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--emtrc-accent)]">
                    Read article <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Straight Answers FAQ Preview + Link to Full 24-Question FAQ Hub */}
      <section id="faq" className="bg-[var(--emtrc-sand)] py-16 sm:py-22">
        <div className="mx-auto max-w-[900px] px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <KickerRule>Straight answers</KickerRule>
              <h2 className="mt-2 font-editorial text-3xl font-bold sm:text-4xl">
                Every common question, answered plainly.
              </h2>
            </div>
            <Link
              to="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--emtrc-accent)] hover:underline"
            >
              <span>Search all 24 FAQs</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 divide-y divide-[var(--emtrc-border)] rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]">
            {SITE.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="p-5 sm:p-6">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="font-editorial text-base font-bold sm:text-lg">{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[var(--emtrc-muted)] transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <PdfDownloadModal guide={selectedGuide} onClose={() => setSelectedGuide(null)} />
    </EmtrcLayout>
  );
}
