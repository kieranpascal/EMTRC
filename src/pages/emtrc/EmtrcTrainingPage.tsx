import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock,
  Printer,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { EditorialHeading, KickerRule, Reveal } from '../../components/emtrc/Reveal';
import { SafeImage } from '../../components/SafeImage';
import { TRAINING_TRACKS } from '../../content/training';
import { matchesSearchQuery } from '../../utils/markdown';

const STORAGE_KEY = 'emtrc-training-progress-v1';

export function EmtrcTrainingPage() {
  const [activeTrackId, setActiveTrackId] = useState<string>(TRAINING_TRACKS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [openLessonId, setOpenLessonId] = useState<string>(TRAINING_TRACKS[0].lessons[0].id);
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

  const activeTrack =
    TRAINING_TRACKS.find((t) => t.id === activeTrackId) ?? TRAINING_TRACKS[0];

  const filteredTracks = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return [activeTrack];
    return TRAINING_TRACKS.map((track) => ({
      ...track,
      lessons: track.lessons.filter((lesson) =>
        matchesSearchQuery(
          {
            title: lesson.title,
            excerpt: `${lesson.summary} ${lesson.proTip} ${lesson.steps.join(' ')}`,
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
        title="London Owner Training Centre — Checklists & Guides | emtrc"
        description="Free practical training tracks for London local business owners: Google Maps 3-Pack setup, 5-minute smartphone photography, DMCC-compliant reviews and PSTN 2027 readiness."
      />
      {/* Hero with Documentary Workshop Photo */}
      <section className="hero-editorial-wash border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 pt-12 pb-14 sm:px-8 sm:pt-16 sm:pb-18">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal immediate>
                <KickerRule>Owner Training Centre · Free Practical Curriculum</KickerRule>
              </Reveal>
              <EditorialHeading
                as="h1"
                immediate
                delay={0.05}
                line1="Practical checklists you can"
                line2="finish between customers."
                line2Tone="accent"
                className="mt-5 font-editorial text-4xl font-bold leading-[1.03] tracking-tight sm:text-5xl lg:text-[3.4rem]"
              />
              <Reveal immediate delay={0.14}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--emtrc-muted)] sm:text-lg">
                  Zero 45-minute marketing webinars. Four concise London high-street tracks covering Google Maps rankings, natural-light smartphone photos, UK DMCC-compliant reviews and the 31 January 2027 copper switch-off. Tick off steps as you go — your progress saves automatically in this browser.
                </p>

                {/* Live Completion Progress Card */}
                <div
                  data-testid="training-progress-card"
                  className="mt-7 rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-mono-data font-semibold text-[var(--emtrc-ink)]">
                      YOUR CHECKLIST PROGRESS · {completedIds.length} / {totalLessons} LESSONS
                    </span>
                    <span className="font-mono-data font-bold text-[var(--emtrc-accent)]">
                      {completionPct}%
                    </span>
                  </div>
                  <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-[var(--emtrc-sand)]">
                    <motion.div
                      initial={false}
                      animate={{ width: `${completionPct}%` }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="h-full rounded-full bg-[var(--emtrc-accent)]"
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--emtrc-muted)]">
                    <span>Saved locally in your browser · No account required</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1 font-semibold text-[var(--emtrc-ink)] hover:text-[var(--emtrc-accent)]"
                      >
                        <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Print</span>
                      </button>
                      {completedIds.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setCompletedIds([])}
                          className="inline-flex items-center gap-1 font-semibold text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]"
                        >
                          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Reset</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal immediate delay={0.12}>
                <div className="overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-navy)] shadow-lg">
                  <SafeImage
                    src="/src/assets/images/emtrc_training_workshop_1795422463963.jpg"
                    alt="Independent London shop owner photographing fresh pastries beside a printed Google Maps checklist workbook"
                    width={960}
                    height={720}
                    priority
                    className="h-[320px] w-full object-cover sm:h-[390px]"
                  />
                  <div className="border-t border-[var(--emtrc-navy-border)] px-5 py-4 text-xs text-[#B4BCCB]">
                    <span className="font-mono-data font-semibold text-[var(--emtrc-brass-light)]">
                      4 TRACKS · {totalLessons} STEP-BY-STEP CHECKLISTS
                    </span>
                    <p className="mt-1">
                      Want us to handle every technical step for you instead? Everything here is included in Business &amp; Growth plans.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Search + Track Tabs + Interactive Checklists */}
      <section className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
        {/* Search Input */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--emtrc-muted)]"
              aria-hidden="true"
            />
            <input
              type="search"
              data-testid="training-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lessons (e.g. Google Maps, 020, photos, DMCC)…"
              aria-label="Search training centre lessons"
              className="w-full rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] py-2.5 pr-10 pl-10 text-sm text-[var(--emtrc-ink)] placeholder:text-[var(--emtrc-muted)] focus:border-[var(--emtrc-accent)] focus:outline-none"
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
          <Link
            to="/resources#guides"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--emtrc-accent)] hover:underline"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            <span>Prefer printable PDF handbooks? Download free →</span>
          </Link>
        </div>

        {/* Track Selector Tabs (hidden while searching across all tracks) */}
        {!searchQuery.trim() && (
          <div
            role="tablist"
            aria-label="Training tracks"
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
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
                  onClick={() => {
                    setActiveTrackId(track.id);
                    setOpenLessonId(track.lessons[0]?.id ?? '');
                  }}
                  className={`relative rounded-xl border p-4 text-left transition-colors ${
                    active
                      ? 'border-[var(--emtrc-accent)] bg-[var(--emtrc-navy)] text-white'
                      : 'border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] text-[var(--emtrc-ink)] hover:border-[var(--emtrc-ink)]'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono-data text-[11px]">
                    <span className={active ? 'text-[var(--emtrc-brass-light)]' : 'text-[var(--emtrc-accent)]'}>
                      {track.code}
                    </span>
                    <span className={active ? 'text-[#9BA3B4]' : 'text-[var(--emtrc-muted)]'}>
                      {doneInTrack}/{track.lessons.length}
                    </span>
                  </div>
                  <p className="mt-2 font-editorial text-base font-bold leading-snug">
                    {track.title}
                  </p>
                  <p className={`mt-1.5 text-xs ${active ? 'text-[#B4BCCB]' : 'text-[var(--emtrc-muted)]'}`}>
                    {track.estimatedTime}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {/* Active Track Lessons */}
        <div className="mt-10 space-y-10">
          {filteredTracks.length === 0 ? (
            <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-10 text-center">
              <p className="font-editorial text-xl font-bold">No training lessons matched “{searchQuery}”</p>
              <p className="mt-2 text-sm text-[var(--emtrc-muted)]">
                Try searching for “Google Maps”, “photos”, “DMCC” or “020”.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-4 rounded-lg bg-[var(--emtrc-accent)] px-4 py-2 text-xs font-semibold text-white"
              >
                Show all tracks
              </button>
            </div>
          ) : (
            filteredTracks.map((track) => (
              <div key={track.id} className="space-y-4">
                <div className="flex flex-col justify-between gap-3 border-b border-[var(--emtrc-border)] pb-4 sm:flex-row sm:items-end">
                  <div>
                    <p className="font-mono-data text-xs font-semibold text-[var(--emtrc-accent)]">
                      {track.code} · {track.estimatedTime}
                    </p>
                    <h2 className="mt-1 font-editorial text-2xl font-bold sm:text-3xl">
                      {track.title}
                    </h2>
                    <p className="mt-1.5 text-sm text-[var(--emtrc-muted)]">{track.subtitle}</p>
                  </div>
                  <Link
                    to={`/services/${track.relatedServiceSlug}`}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-[var(--emtrc-accent)] hover:underline"
                  >
                    <span>Or let emtrc handle this</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {track.lessons.map((lesson, idx) => {
                    const isOpen = openLessonId === lesson.id || Boolean(searchQuery.trim());
                    const isDone = completedIds.includes(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        className={`rounded-xl border transition-colors ${
                          isDone
                            ? 'border-[var(--emtrc-accent)]/45 bg-[var(--emtrc-surface)]'
                            : 'border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]'
                        }`}
                      >
                        <div className="flex items-start gap-3.5 p-5">
                          <button
                            type="button"
                            role="checkbox"
                            aria-checked={isDone}
                            aria-label={`Mark "${lesson.title}" as complete`}
                            data-testid={`training-check-${lesson.id}`}
                            onClick={() => toggleLessonComplete(lesson.id)}
                            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors ${
                              isDone
                                ? 'border-[var(--emtrc-accent)] bg-[var(--emtrc-accent)] text-white'
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
                                <span>STEP {String(idx + 1).padStart(2, '0')}</span>
                                <span aria-hidden="true">·</span>
                                <span className="inline-flex items-center gap-1">
                                  <Clock className="h-3 w-3" aria-hidden="true" />
                                  {lesson.duration}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span className="font-semibold text-[var(--emtrc-accent)]">
                                  {lesson.difficulty}
                                </span>
                              </div>
                              <h3
                                className={`mt-1.5 font-editorial text-lg font-bold ${
                                  isDone ? 'line-through decoration-[var(--emtrc-accent)]/60 opacity-80' : ''
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
                              transition={{ duration: 0.22, ease: 'easeOut' }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)]/60 px-5 pt-4 pb-5 sm:pl-14">
                                <ol className="space-y-2.5 text-sm text-[var(--emtrc-ink)]">
                                  {lesson.steps.map((step, stepIdx) => (
                                    <li key={step} className="flex items-start gap-2.5">
                                      <span className="font-mono-data text-xs font-bold text-[var(--emtrc-accent)] pt-0.5">
                                        {stepIdx + 1}.
                                      </span>
                                      <span className="leading-relaxed text-[var(--emtrc-muted)]">
                                        {step}
                                      </span>
                                    </li>
                                  ))}
                                </ol>

                                <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-3.5 text-xs">
                                  <Sparkles
                                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emtrc-accent)]"
                                    aria-hidden="true"
                                  />
                                  <p className="leading-relaxed text-[var(--emtrc-ink)]">
                                    <strong className="font-semibold">London field tip: </strong>
                                    {lesson.proTip}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </EmtrcLayout>
  );
}
