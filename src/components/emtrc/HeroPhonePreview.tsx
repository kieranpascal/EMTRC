import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  CheckCheck,
  MessageSquare,
  PhoneIncoming,
  SlidersHorizontal,
  Sparkles,
  Star,
  TrendingUp,
  Wifi,
} from 'lucide-react';
import { EmtrcMark } from './EmtrcLogo';
import { ParallaxLayer } from './Reveal';
import { SafeImage } from '../SafeImage';

type AppTabId = 'overview' | 'calls' | 'reviews' | 'edits';

const TABS: { id: AppTabId; label: string; ariaLabel: string }[] = [
  { id: 'overview', label: 'Today', ariaLabel: 'Today overview' },
  { id: 'calls', label: 'Calls', ariaLabel: 'Missed-call text-back' },
  { id: 'reviews', label: 'Reviews', ariaLabel: 'Google reviews' },
  { id: 'edits', label: 'Edits', ariaLabel: 'Studio edits' },
];

const SPARKLINE_BARS = [34, 48, 42, 61, 55, 78, 86];
const SPARKLINE_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

/**
 * Interactive titanium iOS-grade emtrc Owner App preview layered inside a mouse-parallax stage.
 * Showcases real mobile conversion metrics, 8-second missed-call SMS recovery, one-tap review replies,
 * and instant studio edit dispatch — built with crisp real UI rather than blurry static mockups.
 */
export function HeroPhonePreview() {
  const [activeTab, setActiveTab] = useState<AppTabId>('overview');
  const [paused, setPaused] = useState(false);
  const [reviewPublished, setReviewPublished] = useState(false);
  const [editSent, setEditSent] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (paused || prefersReduced) return;
    const id = window.setInterval(() => {
      setActiveTab((prev) => {
        const idx = TABS.findIndex((t) => t.id === prev);
        return TABS[(idx + 1) % TABS.length].id;
      });
    }, 6800);
    return () => window.clearInterval(id);
  }, [paused, prefersReduced]);

  return (
    <div
      className="relative mx-auto w-full max-w-[560px] lg:ml-auto lg:mr-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Depth Plane: Authentic East London Owner Holding Smartphone Outside Shopfront */}
      <ParallaxLayer depth={-10} tilt={2} className="relative ml-auto w-[80%] sm:w-[76%]">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[#0A0B0E] shadow-xl">
          <SafeImage
            src="/src/assets/images/emtrc_app_hero_mobile_1795424181857.jpg"
            alt="East London independent business owner checking live bookings on a smartphone outside his brick shopfront"
            width={1200}
            height={900}
            priority
            className="h-[460px] w-full object-cover object-center sm:h-[550px] brightness-[0.88] contrast-[1.04]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0A0B0E]/80 via-[#0A0B0E]/20 to-transparent"
          />
          <div className="pointer-events-none absolute right-4 bottom-4 hidden rounded-lg border border-white/15 bg-[#0A0B0E]/84 px-3 py-2 backdrop-blur-md sm:block">
            <p className="font-mono-data text-[10px] tracking-wider text-white/65">LONDON E8 · LIVE</p>
            <p className="mt-0.5 text-xs font-semibold text-white">0.9s mobile paint · 4G</p>
          </div>
        </div>
      </ParallaxLayer>

      {/* Foreground Depth Plane: Tall Sleek Anodized Titanium Smartphone (~19.5:9 aspect) */}
      <ParallaxLayer
        depth={16}
        tilt={3.5}
        className="relative z-20 -mt-[420px] sm:-mt-[515px] w-[282px] sm:w-[304px]"
      >
        <div
          dir="ltr"
          data-testid="hero-phone-preview"
          className="relative rounded-[44px] bg-gradient-to-b from-[#454A56] via-[#1B1E25] to-[#2F333E] p-[3px] shadow-[0_36px_80px_-14px_rgba(6,8,12,0.62)]"
        >
          {/* Machined Titanium Side Hardware Buttons */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-[104px] -left-[3px] h-7 w-[3px] rounded-l-sm bg-[#4A505E]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-[146px] -left-[3px] h-11 w-[3px] rounded-l-sm bg-[#4A505E]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-[198px] -left-[3px] h-11 w-[3px] rounded-l-sm bg-[#4A505E]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-[156px] -right-[3px] h-16 w-[3px] rounded-r-sm bg-[#4A505E]"
          />

          <div className="flex min-h-[555px] sm:min-h-[585px] flex-col justify-between overflow-hidden rounded-[41px] bg-[#0A0C10] text-white">
            <div>
              {/* iOS Status Bar + Dynamic Island */}
              <div className="flex items-center justify-between px-6 pt-3.5 pb-2 text-[11px] font-semibold tracking-tight text-white/90">
                <span className="font-mono-data">09:41</span>
                <span
                  aria-hidden="true"
                  className="flex h-[22px] w-[84px] items-center justify-end rounded-full bg-black px-2 ring-1 ring-white/10"
                >
                  <span className="h-2 w-2 rounded-full bg-[#1C1F2B] ring-1 ring-white/15" />
                </span>
                <span className="inline-flex items-center gap-1.5 text-white/85">
                  <Wifi className="h-3 w-3" aria-hidden="true" />
                  <span className="font-mono-data text-[10px]">5G</span>
                </span>
              </div>

              {/* App Top Bar */}
              <div className="flex items-center justify-between px-4 pt-1.5 pb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <EmtrcMark inverted className="h-7 w-7 shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-bold leading-tight text-white">
                      Kingsland Blade
                    </p>
                    <p className="truncate font-mono-data text-[10px] text-[#98A0B2]">
                      emtrc App · Hackney E8
                    </p>
                  </div>
                </div>
                <span className="rounded-md bg-white/[0.08] px-2 py-1 font-mono-data text-[10px] font-semibold text-[#FF6B5B]">
                  LIVE
                </span>
              </div>

              {/* Animated Segmented Control */}
              <div
                role="tablist"
                aria-label="Preview emtrc mobile app"
                className="mx-3.5 grid grid-cols-4 gap-1 rounded-xl bg-[#151821] p-1 ring-1 ring-white/[0.07]"
              >
                {TABS.map((tab) => {
                  const selected = tab.id === activeTab;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-label={tab.ariaLabel}
                      aria-selected={selected}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setPaused(true);
                      }}
                      className={`relative rounded-lg py-1.5 text-[11px] font-semibold transition-colors ${
                        selected ? 'text-[#0A0B0E]' : 'text-[#98A0B2] hover:text-white'
                      }`}
                    >
                      {selected && (
                        <motion.span
                          layoutId="hero-phone-tab-indicator"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-lg bg-white shadow-sm"
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tall Smartphone Screen Viewport */}
              <div className="min-h-[378px] px-3.5 pt-3.5 pb-3">
                <AnimatePresence mode="wait" initial={false}>
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-2.5"
                    >
                    {/* Hero KPI Card with Crisp Bar Sparkline */}
                    <div className="rounded-2xl bg-[#141720] p-4 ring-1 ring-white/[0.08]">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-mono-data text-[10px] tracking-wider text-[#98A0B2]">
                            CALLS &amp; BOOKINGS · 7 DAYS
                          </p>
                          <div className="mt-1 flex items-baseline gap-2">
                            <span className="font-editorial text-3xl font-bold tracking-tight text-white tabular-nums">
                              47
                            </span>
                            <span className="inline-flex items-center gap-0.5 font-mono-data text-[11px] font-semibold text-[#FF6B5B]">
                              <TrendingUp className="h-3 w-3" aria-hidden="true" />
                              +28%
                            </span>
                          </div>
                        </div>
                        <span className="font-mono-data text-[10px] text-white/60">
                          99/100 Speed
                        </span>
                      </div>

                      {/* 7-day bar chart */}
                      <div className="mt-4 grid grid-cols-7 items-end gap-1.5 h-16">
                        {SPARKLINE_BARS.map((height, i) => (
                          <div key={i} className="flex h-full flex-col items-center justify-end gap-1">
                            <motion.div
                              initial={prefersReduced ? false : { scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{
                                duration: 0.45,
                                delay: i * 0.04,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              style={{ height: `${height}%`, transformOrigin: 'bottom' }}
                              className={`w-full rounded-t-[4px] ${
                                i === SPARKLINE_BARS.length - 1
                                  ? 'bg-[#E03528]'
                                  : 'bg-white/20'
                              }`}
                            />
                            <span className="font-mono-data text-[9px] text-[#7D8596]">
                              {SPARKLINE_DAYS[i]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Two Compact Bento Tiles */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="rounded-xl bg-[#141720] p-3 ring-1 ring-white/[0.08]">
                        <p className="font-mono-data text-[10px] text-[#98A0B2]">AUTO-SAVED</p>
                        <p className="mt-1 font-editorial text-lg font-bold text-white tabular-nums">
                          £1,140
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#98A0B2]">9 missed calls rescued</p>
                      </div>
                      <div className="rounded-xl bg-[#141720] p-3 ring-1 ring-white/[0.08]">
                        <p className="font-mono-data text-[10px] text-[#98A0B2]">GOOGLE MAPS</p>
                        <p className="mt-1 font-editorial text-lg font-bold text-white tabular-nums">
                          4.9 ★
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#FF6B5B]">Top 3 in Hackney E8</p>
                      </div>
                    </div>

                    {/* Live Activity Lines */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-xl bg-white/[0.05] px-3 py-2 text-[11px]">
                        <span className="truncate text-white/90">Fresha booking · Skin Fade</span>
                        <span className="font-mono-data text-[10px] font-semibold text-[#FF6B5B] shrink-0">
                          14:30 · £36
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2 text-[11px]">
                        <span className="truncate text-white/80">Missed call SMS · E8</span>
                        <span className="font-mono-data text-[10px] font-semibold text-emerald-400 shrink-0">
                          Replied 8s
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'calls' && (
                  <motion.div
                    key="calls"
                    initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-2.5"
                  >
                    <div className="flex items-center justify-between rounded-xl bg-[#141720] px-3.5 py-2.5 ring-1 ring-white/[0.08]">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E03528]/15 text-[#FF6B5B]">
                          <PhoneIncoming className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-white">07700 900 418</p>
                          <p className="font-mono-data text-[10px] text-[#98A0B2]">
                            Missed at 14:22 · SMS in 8s
                          </p>
                        </div>
                      </div>
                      <span className="font-mono-data text-[10px] font-semibold text-[#FF6B5B]">
                        RECOVERED
                      </span>
                    </div>

                    {/* Realistic SMS Thread */}
                    <div className="space-y-2 rounded-2xl bg-[#141720] p-3.5 ring-1 ring-white/[0.08]">
                      <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-sm bg-white px-3 py-2 text-[11px] leading-snug text-[#0A0B0E]">
                        <p>
                          Sorry we missed your call at Kingsland Blade — hands are on a cut. Reply here or tap to book a chair today:
                        </p>
                        <p className="mt-1 flex items-center justify-end gap-1 font-mono-data text-[9px] text-[#525866]">
                          <span>14:22</span>
                          <CheckCheck className="h-3 w-3 text-[#C82419]" aria-hidden="true" />
                        </p>
                      </div>

                      <div className="mr-auto max-w-[84%] rounded-2xl rounded-bl-sm bg-[#222633] px-3 py-2 text-[11px] leading-snug text-white">
                        <p>No worries mate — got anything around 5pm for a skin fade?</p>
                        <p className="mt-1 font-mono-data text-[9px] text-[#98A0B2]">14:23</p>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-[#E03528] px-3 py-2 text-[11px] font-semibold text-white">
                        <span>Slot held · Today 17:15</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    key="reviews"
                    initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-3"
                  >
                    <div className="rounded-2xl bg-[#141720] p-4 ring-1 ring-white/[0.08]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-0.5 text-[#FF6B5B]" aria-label="5 out of 5 stars">
                          {[0, 1, 2, 3, 4].map((s) => (
                            <Star key={s} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                          ))}
                        </div>
                        <span className="font-mono-data text-[10px] text-[#98A0B2]">Google · 12m ago</span>
                      </div>
                      <p className="mt-2.5 text-xs leading-relaxed text-white">
                        “Booked on my phone walking up Kingsland Road, zero wait, sharpest fade in E8.”
                      </p>
                      <p className="mt-2 font-mono-data text-[10px] text-[#98A0B2]">
                        Daniel O. · Verified Local Guide
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#141720] p-3.5 ring-1 ring-white/[0.08]">
                      <p className="font-mono-data text-[10px] text-[#98A0B2]">DRAFTED OWNER REPLY</p>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-white/85">
                        “Thanks Daniel — glad the walk-in slot worked smoothly. See you next month!”
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setReviewPublished(true);
                          setPaused(true);
                        }}
                        className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-colors ${
                          reviewPublished
                            ? 'bg-white text-[#0A0B0E]'
                            : 'bg-[#E03528] text-white hover:bg-[#F04438]'
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{reviewPublished ? 'Published to Google Maps' : 'Approve & publish reply'}</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'edits' && (
                  <motion.div
                    key="edits"
                    initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-3"
                  >
                    <div className="rounded-2xl bg-[#141720] p-4 ring-1 ring-white/[0.08]">
                      <div className="flex items-center justify-between">
                        <p className="font-mono-data text-[10px] text-[#98A0B2]">STUDIO CONCIERGE</p>
                        <span className="font-mono-data text-[10px] text-white/75">24 min left</span>
                      </div>
                      <p className="mt-1.5 text-sm font-semibold text-white">
                        Request a website update
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed text-[#98A0B2]">
                        Tap a quick change — our London studio publishes it inside 24 hours.
                      </p>

                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between rounded-lg bg-white/[0.05] px-3 py-2 text-[11px]">
                          <span className="text-white/90">Bank holiday hours live</span>
                          <span className="font-mono-data text-[10px] text-[#98A0B2]">Done · 2h</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setEditSent(true);
                            setPaused(true);
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[11px] font-semibold transition-colors ${
                            editSent
                              ? 'bg-white text-[#0A0B0E]'
                              : 'bg-[#E03528] text-white hover:bg-[#F04438]'
                          }`}
                        >
                          <span>
                            {editSent
                              ? 'Queued: Update Skin Fade to £38'
                              : 'Tap to queue: Update Skin Fade to £38'}
                          </span>
                          <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3.5 py-2.5 font-mono-data text-[10px] text-[#98A0B2]">
                      <span>Domain: kingslandblade.co.uk</span>
                      <span className="text-white">SSL Active</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            </div>

            {/* Bottom iOS Tab Dock + Home Bar */}
            <div className="border-t border-white/[0.08] bg-[#0F1117] px-4 pt-2.5 pb-2">
              <div className="grid grid-cols-4 text-center text-[10px] font-medium">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('overview');
                    setPaused(true);
                  }}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    activeTab === 'overview' ? 'text-white' : 'text-[#7D8596] hover:text-white'
                  }`}
                >
                  <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Today</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('calls');
                    setPaused(true);
                  }}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    activeTab === 'calls' ? 'text-white' : 'text-[#7D8596] hover:text-white'
                  }`}
                >
                  <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Calls</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('reviews');
                    setPaused(true);
                  }}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    activeTab === 'reviews' ? 'text-white' : 'text-[#7D8596] hover:text-white'
                  }`}
                >
                  <Star className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Reviews</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('edits');
                    setPaused(true);
                  }}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    activeTab === 'edits' ? 'text-white' : 'text-[#7D8596] hover:text-white'
                  }`}
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Edits</span>
                </button>
              </div>
              <div className="mx-auto mt-2.5 h-1 w-24 rounded-full bg-white/25" aria-hidden="true" />
            </div>
          </div>
        </div>
      </ParallaxLayer>
    </div>
  );
}
