import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, Globe, MessageSquare, PhoneCall, Star } from 'lucide-react';
import { SITE } from '../../content/site';
import { SafeImage } from '../SafeImage';

export function HeroPhonePreview() {
  const screens = SITE.heroPhoneScreens;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (paused || prefersReduced) return;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % screens.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [paused, prefersReduced, screens.length]);

  const current = screens[activeIndex];
  const shortTabLabels = ['Demo', 'Calls', 'Reviews', 'Report'];

  return (
    <div
      className="relative mx-auto w-full max-w-[540px] lg:ml-auto lg:mr-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Editorial London high-street backdrop photo (offset to top-right, Klyara style) */}
      <div className="relative ml-auto w-[86%] sm:w-[82%] overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-navy)] shadow-sm">
        <SafeImage
          src={SITE.hero.backgroundPhoto}
          alt={SITE.hero.backgroundPhotoAlt}
          width={1200}
          height={900}
          priority
          className="h-[360px] w-full object-cover sm:h-[440px] brightness-[0.88] contrast-[1.06]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0B132B]/55 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Layered Interactive Phone Frame */}
      <div
        data-testid="hero-phone-preview"
        className="relative z-10 -mt-[300px] sm:-mt-[370px] w-[88%] max-w-[348px] rounded-[28px] border-[5px] border-[#0B132B] bg-[#F8F6F1] text-[#0E172A] shadow-2xl dark:border-[#243254] dark:bg-[#111829] dark:text-[#F4F5F8]"
      >
        {/* Top notch & status line */}
        <div className="flex items-center justify-between px-5 pt-3 pb-2 text-[11px] font-semibold tabular-nums text-[#4A5468] dark:text-[#9AA6BE]">
          <span>09:41</span>
          <span className="h-3.5 w-16 rounded-full bg-[#0B132B] dark:bg-[#050811]" aria-hidden="true" />
          <span>5G</span>
        </div>

        {/* Mini App Header */}
        <div className="flex items-center justify-between border-b border-[#E4DEC9] px-4 py-2.5 dark:border-[#1E2A45]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0B132B] text-xs font-extrabold text-[#F5F3EE] dark:bg-[#2347FF]">
              e
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold leading-tight">emtrc</p>
              <p className="truncate text-[10px] font-medium tracking-wide text-[#5C667A] dark:text-[#9AA6BE]">
                {current.headerSub}
              </p>
            </div>
          </div>
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2347FF] dark:text-[#5C7BFF]" aria-hidden="true" />
        </div>

        {/* Interactive 4-Column Segmented Tab Strip (zero clipping) */}
        <div
          role="tablist"
          aria-label="Preview emtrc features"
          className="grid grid-cols-4 gap-1 px-3.5 pt-3 pb-2"
        >
          {screens.map((screen, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={screen.id}
                type="button"
                role="tab"
                aria-label={screen.tabLabel}
                aria-selected={active}
                onClick={() => {
                  setActiveIndex(idx);
                  setPaused(true);
                }}
                className={`rounded-md px-1.5 py-1.5 text-center text-[11px] font-semibold ${
                  active
                    ? 'bg-[#0B132B] text-[#F5F3EE] shadow-xs dark:bg-[#2347FF] dark:text-white'
                    : 'bg-[#ECE7DB] text-[#3F495C] hover:bg-[#E1DACB] dark:bg-[#1A243D] dark:text-[#B4C0D8] dark:hover:bg-[#223050]'
                }`}
              >
                {shortTabLabels[idx] ?? screen.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Crisp Phone Screen Content */}
        <div className="min-h-[252px] px-4 pt-2 pb-3">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={current.id}
              initial={prefersReduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-editorial text-base font-bold leading-tight">{current.title}</p>
              <p className="mt-0.5 text-xs text-[#5C667A] dark:text-[#9AA6BE]">{current.subtitle}</p>

              <div className="mt-3 space-y-1.5">
                {current.rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-2 rounded-lg border border-[#E5DFD2] bg-white px-3 py-2 text-xs dark:border-[#202C47] dark:bg-[#172138]"
                  >
                    <span className="text-[#4A5468] dark:text-[#B4C0D8] truncate">{row.label}</span>
                    <span
                      className={`font-semibold tabular-nums whitespace-nowrap shrink-0 ${
                        'highlight' in row && row.highlight
                          ? 'text-[#2347FF] dark:text-[#6B8AFF]'
                          : 'text-[#0E172A] dark:text-[#F4F5F8]'
                      }`}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-[11px] leading-relaxed text-[#4A5468] dark:text-[#9AA6BE]">
                {current.footerNote}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom mini navigation bar */}
        <div
          aria-hidden="true"
          className="grid grid-cols-4 border-t border-[#E4DEC9] px-2 py-2.5 text-center text-[10px] font-medium text-[#5C667A] dark:border-[#1E2A45] dark:text-[#8E9BB5]"
        >
          <div className={`flex flex-col items-center gap-0.5 ${activeIndex === 0 ? 'text-[#2347FF] dark:text-[#6B8AFF] font-semibold' : ''}`}>
            <Globe className="h-3.5 w-3.5" />
            <span>Site</span>
          </div>
          <div className={`flex flex-col items-center gap-0.5 ${activeIndex === 1 ? 'text-[#2347FF] dark:text-[#6B8AFF] font-semibold' : ''}`}>
            <PhoneCall className="h-3.5 w-3.5" />
            <span>Calls</span>
          </div>
          <div className={`flex flex-col items-center gap-0.5 ${activeIndex === 2 ? 'text-[#2347FF] dark:text-[#6B8AFF] font-semibold' : ''}`}>
            <Star className="h-3.5 w-3.5" />
            <span>Reviews</span>
          </div>
          <div className={`flex flex-col items-center gap-0.5 ${activeIndex === 3 ? 'text-[#2347FF] dark:text-[#6B8AFF] font-semibold' : ''}`}>
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Report</span>
          </div>
        </div>
      </div>
    </div>
  );
}
