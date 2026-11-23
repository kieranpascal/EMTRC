import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Calendar, ChevronDown, Search, X } from 'lucide-react';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { EditorialHeading, KickerRule, Reveal } from '../../components/emtrc/Reveal';
import { ALL_FAQS, FAQ_CATEGORIES, type FaqCategory } from '../../content/faqs';
import { SITE } from '../../content/site';
import { matchesSearchQuery } from '../../utils/markdown';

export function EmtrcFaqPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | FaqCategory>('All');
  const [openId, setOpenId] = useState<string>(ALL_FAQS[0].id);

  const filteredFaqs = useMemo(() => {
    return ALL_FAQS.filter((faq) => {
      const catOk = selectedCategory === 'All' || faq.category === selectedCategory;
      const searchOk = matchesSearchQuery(
        {
          title: faq.question,
          excerpt: faq.answer,
          category: faq.category,
          keywords: faq.keywords,
        },
        query
      );
      return catOk && searchOk;
    });
  }, [query, selectedCategory]);

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="Frequently Asked Questions — Plain-English Answers | emtrc"
        description="Straight answers on our free 48-hour demo, monthly pricing, domain ownership, business email, Google Maps SEO, AI tools and the UK 2027 copper phone switch-off."
      />
      <section className="hero-editorial-wash border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 pt-12 pb-14 sm:px-8 sm:pt-16 sm:pb-18">
          <Reveal immediate>
            <KickerRule>Straight Answers · {ALL_FAQS.length} Questions Covered</KickerRule>
          </Reveal>
          <EditorialHeading
            as="h1"
            immediate
            delay={0.05}
            line1="No fine print."
            line2="Every common question answered."
            line2Tone="accent"
            className="mt-5 max-w-3xl font-editorial text-4xl font-bold leading-[1.03] tracking-tight sm:text-5xl lg:text-[3.4rem]"
          />
          <Reveal immediate delay={0.14}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--emtrc-muted)] sm:text-lg">
              Search across demos, 12-month terms, domain ownership, business email, Google Maps rankings, AI call-handling and the 31 January 2027 PSTN copper switch-off.
            </p>

            {/* Instant Search Bar */}
            <div className="mt-7 relative max-w-xl">
              <Search
                className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[var(--emtrc-muted)]"
                aria-hidden="true"
              />
              <input
                type="search"
                data-testid="faq-search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search any question (e.g. domain, 12 months, ChatGPT, 020)…"
                aria-label="Search frequently asked questions"
                className="w-full rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] py-3.5 pr-11 pl-11 text-sm text-[var(--emtrc-ink)] placeholder:text-[var(--emtrc-muted)] shadow-xs focus:border-[var(--emtrc-accent)] focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear FAQ search"
                  onClick={() => setQuery('')}
                  className="absolute top-1/2 right-3.5 -translate-y-1/2 text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--emtrc-border)] pb-6">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="FAQ categories">
            {(['All', ...FAQ_CATEGORIES] as const).map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-[var(--emtrc-accent)] text-white'
                      : 'border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] text-[var(--emtrc-muted)] hover:border-[var(--emtrc-ink)] hover:text-[var(--emtrc-ink)]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <p className="font-mono-data text-xs text-[var(--emtrc-muted)]">
            {filteredFaqs.length} {filteredFaqs.length === 1 ? 'answer' : 'answers'}
          </p>
        </div>

        {/* Accordions */}
        <div className="mt-8 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-10 text-center">
              <p className="font-editorial text-xl font-bold">No answers matched “{query}”</p>
              <p className="mt-2 text-sm text-[var(--emtrc-muted)]">
                Clear the filter or book a quick 15-minute call and ask us directly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 rounded-lg bg-[var(--emtrc-accent)] px-4 py-2 text-xs font-semibold text-white"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id || Boolean(query.trim());
              return (
                <div
                  key={faq.id}
                  data-testid={`faq-item-${faq.id}`}
                  className="rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? '' : faq.id)}
                    className="flex w-full items-start justify-between gap-4 p-5 text-left"
                  >
                    <div>
                      <p className="font-mono-data text-[11px] font-medium text-[var(--emtrc-accent)]">
                        {faq.category}
                      </p>
                      <h2 className="mt-1 font-editorial text-lg font-bold text-[var(--emtrc-ink)]">
                        {faq.question}
                      </h2>
                    </div>
                    <ChevronDown
                      className={`mt-1 h-5 w-5 shrink-0 text-[var(--emtrc-muted)] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[var(--emtrc-border)] px-5 pt-4 pb-5">
                          <p className="text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-base">
                            {faq.answer}
                          </p>
                          {faq.relatedLink && (
                            <Link
                              to={faq.relatedLink.to}
                              className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--emtrc-accent)] hover:underline"
                            >
                              <span>{faq.relatedLink.label}</span>
                              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Direct Help Strip */}
        <Reveal>
          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-navy)] p-8 text-white sm:flex-row sm:items-center">
            <div>
              <p className="font-mono-data text-xs text-[var(--emtrc-brass-light)]">
                STILL HAVE A SPECIFIC QUESTION?
              </p>
              <h2 className="mt-1.5 font-editorial text-2xl font-bold">
                Ask us in 15 minutes — zero sales pressure.
              </h2>
              <p className="mt-1.5 text-sm text-[#B4BCCB]">
                Or send us your shop details and we will build your free working demo in 2 working days.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/free-demo"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
              >
                <span>Get my free demo</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={SITE.brand.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#323C4E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1A202C]"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>Book 15-min call</span>
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </EmtrcLayout>
  );
}
