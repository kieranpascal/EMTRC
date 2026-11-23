import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Copy,
  Download,
  Printer,
  RotateCcw,
  Search,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { PageHeader } from '../../components/emtrc/PageHeader';
import { Reveal } from '../../components/emtrc/Reveal';
import { AnimatedSectionHeader, SectionSeparator } from '../../components/emtrc/SectionSeparator';
import { SafeImage } from '../../components/SafeImage';
import {
  LONDON_MARKETING_CALENDAR,
  OWNER_SCRIPTS_VAULT,
  TRAINING_TRACKS,
} from '../../content/training';
import { matchesSearchQuery } from '../../utils/markdown';

const STORAGE_KEY = 'emtrc-training-progress-v1';

export function EmtrcTrainingPage() {
  const [activeTrackId, setActiveTrackId] = useState<string>(TRAINING_TRACKS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [openLessonId, setOpenLessonId] = useState<string>(TRAINING_TRACKS[0].lessons[0].id);
  const [activeQuarter, setActiveQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4'>('Q1');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.filter((v): v is string => typeof v === 'string');
      }
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds));
    } catch {
      // Ignore storage errors
    }
  }, [completedIds]);

  const totalLessons = useMemo(
    () => TRAINING_TRACKS.reduce((acc, track) => acc + track.lessons.length, 0),
    []
  );

  const completionPct = Math.round((completedIds.length / Math.max(1, totalLessons)) * 100);

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedIds((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  const handleCopyScript = async (id: string, text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      // Fallback gracefully in restricted preview iframes
    }
    setCopiedId(id);
    window.setTimeout(() => {
      setCopiedId((current) => (current === id ? null : current));
    }, 2200);
  };

  const activeTrack =
    TRAINING_TRACKS.find((t) => t.id === activeTrackId) ?? TRAINING_TRACKS[0];

  const activeQuarterData =
    LONDON_MARKETING_CALENDAR.find((q) => q.quarter === activeQuarter) ??
    LONDON_MARKETING_CALENDAR[0];

  const filteredTracks = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return [activeTrack];
    return TRAINING_TRACKS.map((track) => ({
      ...track,
      lessons: track.lessons.filter((lesson) =>
        matchesSearchQuery(
          {
            title: lesson.title,
            excerpt: `${lesson.summary} ${lesson.whyItMatters} ${lesson.commonMistake} ${lesson.proTip} ${lesson.steps.join(' ')}`,
            category: track.title,
          },
          q
        )
      ),
    })).filter((track) => track.lessons.length > 0);
  }, [activeTrack, searchQuery]);

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="London Owner Training Centre — 6 Practical Tracks, Scripts & Calendar | emtrc"
        description="Free practical training centre for London local business owners: 6 step-by-step tracks (18 checklists), copy-paste SMS/review scripts, and a 12-month London marketing calendar."
      />

      <PageHeader
        kicker="Owner Training Centre · Free Practical London Curriculum"
        headlineLine1="Practical field playbooks you can"
        headlineLine2="finish between customers."
        description="Zero 45-minute marketing fluff. Six focused London high-street tracks (18 checklists), a copy-paste SMS & review scripts vault, and a 12-month London seasonal marketing calendar. Tick off lessons as you go — your progress saves automatically in your browser."
        backdropImage="/src/assets/images/emtrc_training_workshop_1795422463963.jpg"
        backdropAlt="Independent London shop owner photographing fresh pastries beside a printed Google Maps checklist workbook"
        metrics={[
          { value: String(TRAINING_TRACKS.length), label: 'London field tracks' },
          { value: String(totalLessons), label: 'Detailed checklists' },
          { value: String(OWNER_SCRIPTS_VAULT.length), label: 'Copy-paste owner scripts' },
          { value: `${completionPct}%`, label: 'Your saved progress' },
        ]}
        bottomBar={
          <div
            data-testid="training-progress-card"
            className="rounded-xl border border-white/12 bg-white/[0.04] p-4 backdrop-blur-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-mono-data font-semibold text-white">
                YOUR CURRICULUM PROGRESS · {completedIds.length} / {totalLessons} LESSONS COMPLETED
              </span>
              <div className="flex items-center gap-4">
                <span className="font-mono-data font-bold text-[#FF8C73]">{completionPct}%</span>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1 font-semibold text-[#C2C9D9] hover:text-white"
                >
                  <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Print</span>
                </button>
                {completedIds.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCompletedIds([])}
                    className="inline-flex items-center gap-1 font-semibold text-[#9BA3B5] hover:text-white"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>
            <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-white/12">
              <motion.div
                initial={false}
                animate={{ width: `${completionPct}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="h-full rounded-full bg-[var(--emtrc-accent)]"
              />
            </div>
          </div>
        }
      />

      <SectionSeparator variant="angle" from="obsidian" to="sand" accentColor="coral" />

      {/* SECTION 1: Visual 6-Track Curriculum Selector + Deep Interactive Checklists */}
      <section className="bg-[var(--emtrc-sand)]">
        <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <AnimatedSectionHeader
              index="01"
              kicker="INTERACTIVE CURRICULUM · 6 TRACKS · 18 LESSONS"
              headline="Choose a London growth track"
              accentWord="& tick off every step."
              subtitle="Every lesson explains why it matters on London high streets, the measurable impact, exact numbered steps, and the #1 local mistake to avoid."
              tone="coral"
              className="max-w-2xl"
            />
            <div className="relative w-full lg:max-w-sm">
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--emtrc-muted)]"
                aria-hidden="true"
              />
              <input
                type="search"
                data-testid="training-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 18 lessons (Maps, 020, Apple, prices)…"
                aria-label="Search training centre lessons"
                className="w-full rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] py-3 pr-10 pl-10 text-sm text-[var(--emtrc-ink)] placeholder:text-[var(--emtrc-muted)] focus:border-[var(--emtrc-accent)] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear training search"
                  onClick={() => setSearchQuery('')}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Photo-Backed 6-Track Grid Selector */}
          {!searchQuery.trim() && (
            <div
              role="tablist"
              aria-label="Training tracks"
              className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {TRAINING_TRACKS.map((track) => {
                const active = track.id === activeTrackId;
                const doneInTrack = track.lessons.filter((l) => completedIds.includes(l.id)).length;
                return (
                  <button
                    key={track.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    data-testid={`training-track-tab-${track.id}`}
                    onClick={() => {
                      setActiveTrackId(track.id);
                      setOpenLessonId(track.lessons[0]?.id ?? '');
                    }}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border text-left transition-all ${
                      active
                        ? 'border-[var(--emtrc-accent)] bg-[#0B0D12] text-white shadow-xl ring-1 ring-[var(--emtrc-accent)]/40'
                        : 'border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] text-[var(--emtrc-ink)] hover:-translate-y-0.5 hover:border-[var(--emtrc-ink)]/40'
                    }`}
                  >
                    <div className="relative h-28 w-full overflow-hidden bg-[#0A0C10]">
                      <SafeImage
                        src={track.coverImage}
                        alt={track.coverAlt}
                        width={640}
                        height={360}
                        className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                          active ? 'opacity-80' : 'opacity-90'
                        }`}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0D12]/90 via-[#0B0D12]/35 to-transparent" />
                      <div className="absolute right-3 bottom-2.5 left-3 flex items-center justify-between font-mono-data text-[11px]">
                        <span className="font-bold text-[#FF8C73]">{track.code}</span>
                        <span className="rounded bg-black/55 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-xs">
                          {doneInTrack}/{track.lessons.length} done
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="font-editorial text-lg font-bold leading-snug">{track.title}</p>
                      <p
                        className={`mt-1.5 line-clamp-2 text-xs leading-relaxed ${
                          active ? 'text-[#BAC5DC]' : 'text-[var(--emtrc-muted)]'
                        }`}
                      >
                        {track.subtitle}
                      </p>
                      <div
                        className={`mt-3 flex items-center justify-between border-t pt-2.5 font-mono-data text-[11px] ${
                          active ? 'border-white/10 text-[#9DA9C2]' : 'border-[var(--emtrc-border)] text-[var(--emtrc-muted)]'
                        }`}
                      >
                        <span>{track.estimatedTime}</span>
                        <span className={active ? 'font-semibold text-[#FF8C73]' : 'text-[var(--emtrc-accent)]'}>
                          {active ? 'Active track' : 'Open track →'}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Active Track Lessons Detail Area */}
          <div className="mt-10 space-y-10">
            {filteredTracks.length === 0 ? (
              <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-10 text-center">
                <p className="font-editorial text-2xl font-bold">No training lessons matched “{searchQuery}”</p>
                <p className="mt-2 text-sm text-[var(--emtrc-muted)]">
                  Try searching for “Google Maps”, “Apple”, “photos”, “prices”, “DMCC”, or “020”.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-4 rounded-lg bg-[var(--emtrc-accent)] px-5 py-2.5 text-xs font-semibold text-white"
                >
                  Show all 6 tracks
                </button>
              </div>
            ) : (
              filteredTracks.map((track) => (
                <div key={track.id} className="space-y-4">
                  {/* Track Banner Header */}
                  <div className="overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-5 sm:p-6">
                    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                      <div className="max-w-2xl">
                        <p className="font-mono-data text-xs font-semibold uppercase tracking-wider text-[var(--emtrc-accent)]">
                          {track.code} · {track.estimatedTime} · {track.lessons.length} ACTION CHECKLISTS
                        </p>
                        <h2 className="mt-1 font-editorial text-2xl font-bold sm:text-3xl">
                          {track.title}
                        </h2>
                        <p className="mt-1.5 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                          <strong className="font-semibold text-[var(--emtrc-ink)]">Track outcome: </strong>
                          {track.outcome}
                        </p>
                      </div>
                      <Link
                        to={`/services/${track.relatedServiceSlug}`}
                        className="inline-flex items-center gap-2 self-start rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] px-4 py-2.5 text-xs font-semibold text-[var(--emtrc-ink)] whitespace-nowrap transition-colors hover:border-[var(--emtrc-accent)] hover:text-[var(--emtrc-accent)] lg:self-center"
                      >
                        <span>Or let emtrc handle this</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>

                  {/* Lesson Accordion Cards */}
                  <div className="space-y-3.5">
                    {track.lessons.map((lesson, idx) => {
                      const isOpen = openLessonId === lesson.id || Boolean(searchQuery.trim());
                      const isDone = completedIds.includes(lesson.id);

                      return (
                        <article
                          key={lesson.id}
                          className={`overflow-hidden rounded-2xl border transition-all ${
                            isDone
                              ? 'border-[#059669]/55 bg-[var(--emtrc-surface)]'
                              : isOpen
                                ? 'border-[var(--emtrc-accent)]/55 bg-[var(--emtrc-surface)] shadow-md'
                                : 'border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]'
                          }`}
                        >
                          <div className="flex items-start gap-3.5 p-5 sm:p-6">
                            <button
                              type="button"
                              role="checkbox"
                              aria-checked={isDone}
                              aria-label={`Mark "${lesson.title}" as complete`}
                              data-testid={`training-check-${lesson.id}`}
                              onClick={() => toggleLessonComplete(lesson.id)}
                              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors ${
                                isDone
                                  ? 'border-[#059669] bg-[#059669] text-white'
                                  : 'border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] text-transparent hover:border-[var(--emtrc-accent)]'
                              }`}
                            >
                              <Check className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setOpenLessonId(isOpen ? '' : lesson.id)}
                              aria-expanded={isOpen}
                              className="flex flex-1 items-start justify-between gap-4 text-left"
                            >
                              <div>
                                <div className="flex flex-wrap items-center gap-2.5 font-mono-data text-[11px] text-[var(--emtrc-muted)]">
                                  <span className="font-bold text-[var(--emtrc-ink)]">
                                    LESSON {String(idx + 1).padStart(2, '0')}
                                  </span>
                                  <span aria-hidden="true">·</span>
                                  <span className="inline-flex items-center gap-1">
                                    <Clock className="h-3 w-3" aria-hidden="true" />
                                    {lesson.duration}
                                  </span>
                                  <span aria-hidden="true">·</span>
                                  <span className="font-semibold text-[var(--emtrc-accent)]">
                                    {lesson.difficulty}
                                  </span>
                                  <span aria-hidden="true">·</span>
                                  <span className="inline-flex items-center gap-1 font-semibold text-[#059669] dark:text-[#34D399]">
                                    <TrendingUp className="h-3 w-3" aria-hidden="true" />
                                    {lesson.impactMetric}
                                  </span>
                                </div>
                                <h3
                                  className={`mt-1.5 font-editorial text-lg font-bold sm:text-xl ${
                                    isDone ? 'line-through decoration-[#059669]/60 opacity-80' : ''
                                  }`}
                                >
                                  {lesson.title}
                                </h3>
                                <p className="mt-1 text-sm text-[var(--emtrc-muted)]">{lesson.summary}</p>
                              </div>
                              <ChevronDown
                                className={`mt-1 h-5 w-5 shrink-0 text-[var(--emtrc-muted)] transition-transform duration-200 ${
                                  isOpen ? 'rotate-180' : ''
                                }`}
                                aria-hidden="true"
                              />
                            </button>
                          </div>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.24, ease: 'easeOut' }}
                                className="overflow-hidden"
                              >
                                <div className="border-t border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)]/55 px-5 pt-5 pb-6 sm:pl-15 sm:pr-6 space-y-5">
                                  {/* Why It Matters */}
                                  <div className="rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-4">
                                    <p className="font-mono-data text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--emtrc-accent)]">
                                      WHY THIS MATTERS IN LONDON
                                    </p>
                                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--emtrc-ink)]">
                                      {lesson.whyItMatters}
                                    </p>
                                  </div>

                                  {/* Actionable Numbered Steps */}
                                  <div>
                                    <p className="font-mono-data text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--emtrc-muted)]">
                                      STEP-BY-STEP ACTION CHECKLIST
                                    </p>
                                    <ol className="mt-3 space-y-2.5 text-sm">
                                      {lesson.steps.map((step, stepIdx) => (
                                        <li key={step} className="flex items-start gap-3">
                                          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[var(--emtrc-accent)]/12 font-mono-data text-[11px] font-bold text-[var(--emtrc-accent)]">
                                            {stepIdx + 1}
                                          </span>
                                          <span className="leading-relaxed text-[var(--emtrc-ink)]">
                                            {step}
                                          </span>
                                        </li>
                                      ))}
                                    </ol>
                                  </div>

                                  {/* Two-Column Mistake Warning + Field Tip */}
                                  <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
                                    <div className="flex items-start gap-2.5 rounded-xl border border-[#D97706]/30 bg-[#D97706]/[0.06] p-3.5 text-xs">
                                      <AlertTriangle
                                        className="mt-0.5 h-4 w-4 shrink-0 text-[#D97706] dark:text-[#FBBF24]"
                                        aria-hidden="true"
                                      />
                                      <p className="leading-relaxed text-[var(--emtrc-ink)]">
                                        <strong className="font-semibold text-[#B45309] dark:text-[#FCD34D]">
                                          Common mistake to avoid:{' '}
                                        </strong>
                                        {lesson.commonMistake}
                                      </p>
                                    </div>
                                    <div className="flex items-start gap-2.5 rounded-xl border border-[#059669]/30 bg-[#059669]/[0.06] p-3.5 text-xs">
                                      <Sparkles
                                        className="mt-0.5 h-4 w-4 shrink-0 text-[#059669] dark:text-[#34D399]"
                                        aria-hidden="true"
                                      />
                                      <p className="leading-relaxed text-[var(--emtrc-ink)]">
                                        <strong className="font-semibold text-[#047857] dark:text-[#6EE7B7]">
                                          London field tip:{' '}
                                        </strong>
                                        {lesson.proTip}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Optional Inline Copyable Script */}
                                  {lesson.copyTemplate && (
                                    <div className="rounded-xl border border-[#232A38] bg-[#0B0D12] p-4 text-white">
                                      <div className="flex items-center justify-between gap-2">
                                        <span className="font-mono-data text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FF8C73]">
                                          READY-TO-SEND TEMPLATE · {lesson.copyTemplate.label}
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleCopyScript(
                                              `lesson-${lesson.id}`,
                                              lesson.copyTemplate!.text
                                            )
                                          }
                                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1.5 font-mono-data text-[11px] font-semibold text-white transition-colors hover:border-[#FF8C73]"
                                        >
                                          {copiedId === `lesson-${lesson.id}` ? (
                                            <>
                                              <Check className="h-3.5 w-3.5 text-[#34D399]" aria-hidden="true" />
                                              <span className="text-[#34D399]">Copied</span>
                                            </>
                                          ) : (
                                            <>
                                              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                                              <span>Copy text</span>
                                            </>
                                          )}
                                        </button>
                                      </div>
                                      <p className="mt-2.5 font-mono-data text-xs leading-relaxed text-[#CBD4E6]">
                                        {lesson.copyTemplate.text}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <SectionSeparator variant="wave" from="sand" to="obsidian" accentColor="amber" />

      {/* SECTION 2: Copy-Paste London Owner Scripts & Templates Vault (Obsidian Contrast Band) */}
      <section className="bg-[#0B0D12] text-white" data-testid="scripts-vault-section">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <AnimatedSectionHeader
              index="02"
              kicker="COPY-PASTE OWNER VAULT · 6 FIELD-TESTED SCRIPTS"
              headline="Word-for-word scripts for missed calls,"
              accentWord="reviews & 2027 audits."
              subtitle="Stop writing customer texts from scratch at 9pm. Tap Copy on any template below, swap the square brackets for your shop details, and save it as a phone shortcut."
              tone="amber"
              light
              className="max-w-2xl"
            />
            <Link
              to="/resources#guides"
              className="inline-flex items-center gap-2 font-mono-data text-xs font-semibold text-[#FBBF24] hover:text-white whitespace-nowrap"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Download printable PDF handbooks →</span>
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {OWNER_SCRIPTS_VAULT.map((tpl) => {
              const isCopied = copiedId === tpl.id;
              return (
                <article
                  key={tpl.id}
                  data-testid={`script-card-${tpl.id}`}
                  className="flex h-full flex-col justify-between rounded-2xl border border-[#232A38] bg-[#131722] p-5 transition-colors hover:border-[#FBBF24]/55"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 font-mono-data text-[10px]">
                      <span className="font-semibold uppercase tracking-[0.14em] text-[#FBBF24]">
                        {tpl.category}
                      </span>
                      <span className="text-[#8E9AB2]">{tpl.channel}</span>
                    </div>
                    <h3 className="mt-2 font-editorial text-xl font-bold leading-snug text-white">
                      {tpl.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#9DA9C2]">{tpl.whenToUse}</p>

                    <div className="mt-4 rounded-xl border border-white/10 bg-[#0A0C10] p-3.5 font-mono-data text-[11px] leading-relaxed text-[#D8E0F0] whitespace-pre-line">
                      {tpl.script}
                    </div>
                  </div>

                  <div className="mt-4 pt-2">
                    <button
                      type="button"
                      data-testid={`copy-script-${tpl.id}`}
                      onClick={() => handleCopyScript(tpl.id, tpl.script)}
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors ${
                        isCopied
                          ? 'bg-[#059669] text-white'
                          : 'border border-white/15 bg-white/[0.06] text-white hover:border-[#FBBF24] hover:bg-[#FBBF24] hover:text-[#0B0D12]'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Copied to clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Copy script</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <SectionSeparator variant="architectural-ribbon" from="obsidian" to="surface" accentColor="emerald" flip />

      {/* SECTION 3: 12-Month London Local Business Marketing Calendar */}
      <section className="bg-[var(--emtrc-surface)]" data-testid="london-marketing-calendar">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <AnimatedSectionHeader
              index="03"
              kicker="ANNUAL OPERATING RHYTHM · 12 MONTHS"
              headline="The 12-Month London Local"
              accentWord="Marketing Calendar."
              subtitle="Never get caught out by UK Bank Holiday warnings, autumn boiler call spikes, or the 31 January 2027 copper switch-off deadline. Spend 20 minutes once a month and stay ahead of your street."
              tone="emerald"
              className="max-w-2xl"
            />

            {/* Quarter Switcher */}
            <div
              role="tablist"
              aria-label="Marketing calendar quarters"
              className="inline-flex rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] p-1 self-start lg:self-end"
            >
              {LONDON_MARKETING_CALENDAR.map((q) => {
                const active = q.quarter === activeQuarter;
                return (
                  <button
                    key={q.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveQuarter(q.quarter)}
                    className={`rounded-lg px-4 py-2 font-mono-data text-xs font-bold transition-colors ${
                      active
                        ? 'bg-[#059669] text-white shadow-xs'
                        : 'text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]'
                    }`}
                  >
                    {q.quarter}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeQuarterData.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="mt-8"
            >
              <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--emtrc-border)] pb-4">
                  <div>
                    <p className="font-mono-data text-xs font-bold text-[#059669] dark:text-[#34D399]">
                      {activeQuarterData.quarter} · {activeQuarterData.months}
                    </p>
                    <h3 className="mt-1 font-editorial text-2xl font-bold text-[var(--emtrc-ink)]">
                      {activeQuarterData.theme}
                    </h3>
                  </div>
                  <span className="font-mono-data text-xs text-[var(--emtrc-muted)]">
                    {activeQuarterData.focusStat}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
                  {activeQuarterData.tasks.map((task) => (
                    <div
                      key={task.month}
                      className="flex flex-col justify-between rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-5"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 font-mono-data text-[11px]">
                          <span className="inline-flex items-center gap-1.5 font-bold uppercase text-[var(--emtrc-accent)]">
                            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                            {task.month}
                          </span>
                          <span className="text-[var(--emtrc-muted)]">20-min check</span>
                        </div>
                        <h4 className="mt-2.5 font-editorial text-lg font-bold leading-snug text-[var(--emtrc-ink)]">
                          {task.headline}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                          {task.detail}
                        </p>
                      </div>
                      <p className="mt-4 border-t border-[var(--emtrc-border)] pt-3 font-mono-data text-[11px] font-semibold text-[#059669] dark:text-[#34D399]">
                        Priority: {task.tradeFocus}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <SectionSeparator variant="angle" from="surface" to="obsidian" accentColor="coral" />

      {/* SECTION 4: Closing "Rather We Handle All 6 Tracks?" Studio Conversion Band */}
      <section className="bg-[#0B0D12] text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="font-mono-data text-xs font-semibold uppercase tracking-[0.14em] text-[#FF8C73]">
                  PREFER HANDS-OFF EXECUTION?
                </p>
                <h2 className="mt-2 font-editorial text-3xl font-bold leading-tight sm:text-4xl">
                  We handle every track above — while you stay on the shop floor.
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-[#BAC5DC] sm:text-base">
                  Send us your business name, London borough and trade. We build a free working demo in 2 working days with sub-second speed, transparent pricing tables, and clean LocalBusiness schema built in.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  to="/free-demo"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--emtrc-accent)] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <span>Get my free 48-hour demo</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/faq"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#FF8C73]"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  <span>Read all 30 FAQs</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </EmtrcLayout>
  );
}
