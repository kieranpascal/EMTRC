import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { PageHeader } from '../../components/emtrc/PageHeader';
import { Reveal } from '../../components/emtrc/Reveal';
import { AnimatedSectionHeader } from '../../components/emtrc/SectionSeparator';
import { ALL_FAQS, FAQ_CATEGORIES, type FaqCategory } from '../../content/faqs';
import { SITE } from '../../content/site';
import { matchesSearchQuery } from '../../utils/markdown';

const CATEGORY_TONES: Record<FaqCategory, string> = {
  'Free Demo & Launch': 'text-[#E03528] dark:text-[#FF8C73]',
  'Pricing & Contracts': 'text-[#059669] dark:text-[#34D399]',
  'Domains & Email': 'text-[#2563EB] dark:text-[#60A5FA]',
  'Google Maps & Local SEO': 'text-[#D97706] dark:text-[#FBBF24]',
  'AI Tools & Calls': 'text-[#E03528] dark:text-[#FF8C73]',
  'UK PSTN 2027 Switch-Off': 'text-[#D97706] dark:text-[#FBBF24]',
};

export function EmtrcFaqPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | FaqCategory>('All');
  const [openIds, setOpenIds] = useState<string[]>([ALL_FAQS[0].id, ALL_FAQS[1].id]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: ALL_FAQS.length };
    for (const cat of FAQ_CATEGORIES) {
      counts[cat] = ALL_FAQS.filter((f) => f.category === cat).length;
    }
    return counts;
  }, []);

  const filteredFaqs = useMemo(() => {
    return ALL_FAQS.filter((faq) => {
      const catOk = selectedCategory === 'All' || faq.category === selectedCategory;
      const searchOk = matchesSearchQuery(
        {
          title: faq.question,
          excerpt: `${faq.answer} ${faq.deepDive} ${faq.keyPoints.join(' ')}`,
          category: faq.category,
          keywords: faq.keywords,
        },
        query
      );
      return catOk && searchOk;
    });
  }, [query, selectedCategory]);

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const expandAllVisible = () => {
    setOpenIds(filteredFaqs.map((f) => f.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="Frequently Asked Questions — Plain-English Answers | emtrc"
        description="30 thorough plain-English answers on our free 48-hour demo, monthly pricing, domain ownership, business email, Google Maps SEO, AI tools and the UK 2027 copper phone switch-off."
      />

      <PageHeader
        kicker={`Plain-English Knowledge Base · ${ALL_FAQS.length} Detailed Answers`}
        headlineLine1="No fine print."
        headlineLine2="Every detail answered properly."
        description="Straight, thorough answers covering free 48-hour demos, 12-month contracts, Nominet domain ownership, SPF/DKIM email deliverability, Google Maps Top 3 rankings, UK DMCC-compliant reviews, and the 31 January 2027 copper switch-off."
        backdropImage="/src/assets/images/emtrc_london_studio_team_1795422461958.jpg"
        backdropAlt="emtrc London web studio reviewing website builds and client documentation"
        metrics={[
          { value: String(ALL_FAQS.length), label: 'Detailed London FAQs' },
          { value: String(FAQ_CATEGORIES.length), label: 'Core topic chapters' },
          { value: '0', label: 'Hidden renewal clauses' },
          { value: '48 hrs', label: 'Free demo turnaround' },
        ]}
        bottomBar={
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-xl">
              <Search
                className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#9BA6BC]"
                aria-hidden="true"
              />
              <input
                type="search"
                data-testid="faq-search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search any topic (e.g. domain, Fresha, 12 months, ChatGPT, 020, WordPress)…"
                aria-label="Search frequently asked questions"
                className="w-full rounded-xl border border-white/15 bg-white/[0.06] py-3.5 pr-11 pl-11 text-sm text-white placeholder:text-[#98A4BC] backdrop-blur-sm focus:border-[#FF8C73] focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear FAQ search"
                  onClick={() => setQuery('')}
                  className="absolute top-1/2 right-3.5 -translate-y-1/2 text-[#98A4BC] hover:text-white"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <p className="font-mono-data text-xs text-[#C4CDE0] whitespace-nowrap">
              Showing {filteredFaqs.length} of {ALL_FAQS.length} answers
            </p>
          </div>
        }
      />

      {/* Main 2-Column Editorial Knowledge Base */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-sand)]">
        <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 sm:py-14">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            {/* Sticky Left Sidebar: Topic Chapters + Written Guarantees */}
            <aside className="lg:sticky lg:top-24 lg:col-span-4 space-y-5">
              <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-5 shadow-xs">
                <p className="font-mono-data text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--emtrc-accent)]">
                  BROWSE BY CHAPTER
                </p>
                <div className="mt-3.5 space-y-1.5" role="tablist" aria-label="FAQ categories">
                  {(['All', ...FAQ_CATEGORIES] as const).map((cat) => {
                    const active = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold transition-all ${
                          active
                            ? 'bg-[#0B0D12] text-white shadow-sm dark:bg-[var(--emtrc-accent)]'
                            : 'text-[var(--emtrc-ink)] hover:bg-[var(--emtrc-canvas)]'
                        }`}
                      >
                        <span>{cat}</span>
                        <span
                          className={`font-mono-data text-[11px] ${
                            active ? 'text-[#FF9D85] dark:text-white/90' : 'text-[var(--emtrc-muted)]'
                          }`}
                        >
                          {categoryCounts[cat]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Written Studio Guarantees Card */}
              <div className="rounded-2xl border border-[#232A38] bg-[#0B0D12] p-5 text-white">
                <div className="flex items-center gap-2 text-[#34D399]">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  <span className="font-mono-data text-[11px] font-semibold uppercase tracking-[0.14em]">
                    IN WRITING ON EVERY PLAN
                  </span>
                </div>
                <ul className="mt-3.5 space-y-2.5 text-xs leading-relaxed text-[#CBD4E6]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#34D399]" aria-hidden="true" />
                    <span>Your .co.uk/.com domain stays legally registered in your business name.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#34D399]" aria-hidden="true" />
                    <span>Free working demo in 48 hours before you spend a single pound.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#34D399]" aria-hidden="true" />
                    <span>30-day rolling notice after year one — zero auto-renewing lock-ins.</span>
                  </li>
                </ul>
                <Link
                  to="/training"
                  className="mt-4 inline-flex items-center gap-1.5 font-mono-data text-[11px] font-semibold text-[#FF8C73] hover:text-white"
                >
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Open Owner Training Centre →</span>
                </Link>
              </div>
            </aside>

            {/* Right Column: Deep Multi-Paragraph Accordion Cards */}
            <div className="lg:col-span-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono-data text-xs font-semibold uppercase tracking-[0.12em] text-[var(--emtrc-accent)]">
                    {selectedCategory === 'All' ? 'ALL 6 CHAPTERS' : selectedCategory}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--emtrc-muted)]">
                    Click any question to read the full plain-English breakdown and practical London takeaways.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={expandAllVisible}
                    className="rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-3 py-1.5 font-mono-data text-[11px] font-semibold text-[var(--emtrc-ink)] transition-colors hover:border-[var(--emtrc-accent)]"
                  >
                    Expand all
                  </button>
                  <button
                    type="button"
                    onClick={collapseAll}
                    className="rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-3 py-1.5 font-mono-data text-[11px] font-semibold text-[var(--emtrc-muted)] transition-colors hover:text-[var(--emtrc-ink)]"
                  >
                    Collapse
                  </button>
                </div>
              </div>

              <div className="space-y-3.5">
                {filteredFaqs.length === 0 ? (
                  <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-10 text-center">
                    <HelpCircle className="mx-auto h-8 w-8 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    <p className="mt-3 font-editorial text-2xl font-bold">No answers matched “{query}”</p>
                    <p className="mt-2 text-sm text-[var(--emtrc-muted)]">
                      Clear the search filter or book a quick 15-minute call and ask our London team directly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('');
                        setSelectedCategory('All');
                      }}
                      className="mt-5 rounded-lg bg-[var(--emtrc-accent)] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
                    >
                      Reset all filters
                    </button>
                  </div>
                ) : (
                  filteredFaqs.map((faq, idx) => {
                    const isOpen = openIds.includes(faq.id) || Boolean(query.trim());
                    return (
                      <article
                        key={faq.id}
                        data-testid={`faq-item-${faq.id}`}
                        className={`overflow-hidden rounded-2xl border transition-all ${
                          isOpen
                            ? 'border-[var(--emtrc-accent)]/55 bg-[var(--emtrc-surface)] shadow-md'
                            : 'border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] hover:border-[var(--emtrc-ink)]/35'
                        }`}
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => toggleOpen(faq.id)}
                          className="flex w-full items-start justify-between gap-4 p-5 sm:p-6 text-left"
                        >
                          <div>
                            <div className="flex flex-wrap items-center gap-2 font-mono-data text-[11px]">
                              <span className="font-bold text-[var(--emtrc-muted)]">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                              <span aria-hidden="true" className="text-[var(--emtrc-border)]">/</span>
                              <span className={`font-semibold uppercase tracking-wider ${CATEGORY_TONES[faq.category]}`}>
                                {faq.category}
                              </span>
                            </div>
                            <h2 className="mt-1.5 font-editorial text-lg font-bold leading-snug text-[var(--emtrc-ink)] sm:text-xl">
                              {faq.question}
                            </h2>
                          </div>
                          <span
                            className={`mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                              isOpen
                                ? 'border-[var(--emtrc-accent)] bg-[var(--emtrc-accent)] text-white'
                                : 'border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] text-[var(--emtrc-muted)]'
                            }`}
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                              aria-hidden="true"
                            />
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.24, ease: 'easeOut' }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)]/45 px-5 pt-5 pb-6 sm:px-6">
                                <p className="text-sm font-medium leading-relaxed text-[var(--emtrc-ink)] sm:text-[15px]">
                                  {faq.answer}
                                </p>
                                <p className="mt-3.5 text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-[15px]">
                                  {faq.deepDive}
                                </p>

                                {/* Key Practical Takeaways */}
                                <div className="mt-5 rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-4">
                                  <p className="font-mono-data text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--emtrc-muted)]">
                                    KEY TAKEAWAYS FOR LONDON OWNERS
                                  </p>
                                  <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-[var(--emtrc-ink)] sm:text-sm">
                                    {faq.keyPoints.map((point) => (
                                      <li key={point} className="flex items-start gap-2.5">
                                        <CheckCircle2
                                          className="mt-0.5 h-4 w-4 shrink-0 text-[#059669] dark:text-[#34D399]"
                                          aria-hidden="true"
                                        />
                                        <span>{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {faq.relatedLink && (
                                  <div className="mt-4 flex items-center justify-end">
                                    <Link
                                      to={faq.relatedLink.to}
                                      className="inline-flex items-center gap-1.5 font-mono-data text-xs font-semibold text-[var(--emtrc-accent)] hover:underline"
                                    >
                                      <span>{faq.relatedLink.label}</span>
                                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                                    </Link>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </article>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Contrast Closing Help Band */}
      <section className="bg-[#0B0D12] text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <AnimatedSectionHeader
                index="FAQ"
                kicker="STILL HAVE A SPECIFIC QUESTION ABOUT YOUR SHOP OR TRADE?"
                headline="Ask us directly in 15 minutes —"
                accentWord="zero sales pressure."
                subtitle="Or send us your business name, London borough and trade right now. We build a real working demo in 2 working days so you can judge everything firsthand on your phone."
                tone="emerald"
                light
              />
            </div>
            <Reveal delay={0.08} className="lg:col-span-5 lg:flex lg:justify-end">
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/free-demo"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--emtrc-accent)] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <span>Get my free demo</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={SITE.brand.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#34D399]"
                >
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span>Book 15-min call</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </EmtrcLayout>
  );
}
