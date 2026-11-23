import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BellRing,
  Check,
  CheckCheck,
  Clock,
  Globe,
  Lock,
  MessageSquare,
  PhoneCall,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Star,
  TrendingUp,
} from 'lucide-react';
import { SITE } from '../../content/site';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { EmtrcMark } from '../../components/emtrc/EmtrcLogo';
import {
  AnimatedCounter,
  EditorialHeading,
  KickerRule,
  Magnetic,
  ParallaxFrame,
  Reveal,
  SpotlightCard,
  StaggerContainer,
  StaggerItem,
} from '../../components/emtrc/Reveal';
import { SafeImage } from '../../components/SafeImage';

interface AppModule {
  id: 'calls' | 'edits' | 'reviews' | 'voip' | 'reports';
  number: string;
  label: string;
  headline: string;
  summary: string;
  metricValue: string;
  metricLabel: string;
  bullets: string[];
  screenTitle: string;
  screenSubtitle: string;
  screenItems: { primary: string; secondary: string; meta: string; highlight?: boolean }[];
}

const APP_MODULES: AppModule[] = [
  {
    id: 'calls',
    number: '01',
    label: 'Missed-Call Catcher',
    headline: 'Every missed ring turned into a live SMS conversation in 8 seconds.',
    summary:
      'When your hands are on a boiler, a haircut or an espresso machine, the emtrc App texts the caller automatically from your business number and drops their reply straight into one tidy inbox.',
    metricValue: '8 sec',
    metricLabel: 'Average missed-call SMS dispatch',
    bullets: [
      'Automatic branded text-back whenever a call goes unanswered after 4 rings',
      'Direct booking or quote link embedded so callers lock in a slot without ringing your competitor',
      'Full two-way SMS thread visible on iOS, Android and the web Client Portal',
    ],
    screenTitle: 'Recovered calls · Today',
    screenSubtitle: '3 enquiries saved while on jobs',
    screenItems: [
      { primary: '07700 900 418', secondary: '“Need emergency boiler check in E10”', meta: 'Booked · £145', highlight: true },
      { primary: '07700 900 291', secondary: '“Do you have a 4pm fade slot?”', meta: 'Booked · £36', highlight: true },
      { primary: '020 7946 0311', secondary: '“End of tenancy clean SW11 Friday”', meta: 'Quote sent' },
    ],
  },
  {
    id: 'edits',
    number: '02',
    label: 'One-Tap Studio Edits',
    headline: 'Send price changes, bank-holiday hours or new photos in 20 seconds.',
    summary:
      'Forget logging into clunky WordPress dashboards at 11pm. Snap a photo on your phone or type a quick note inside the emtrc App — our London studio formats, optimises and publishes it inside 24 hours.',
    metricValue: '< 24h',
    metricLabel: 'Guaranteed turnaround on monthly edits',
    bullets: [
      'Track your included monthly edit minutes in real time (15, 30 or 60 mins)',
      'Attach smartphone photos directly — we crop, colour-balance and convert to WebP',
      'Instant push notification the moment your update goes live across Cloudflare',
    ],
    screenTitle: 'Studio edit queue',
    screenSubtitle: '24 of 30 monthly minutes remaining',
    screenItems: [
      { primary: 'Update Bank Holiday Monday hours', secondary: 'Closed Mon · Open Tue 09:00', meta: 'Live · 2h', highlight: true },
      { primary: 'Add 4 new shopfront photos', secondary: 'Converted to WebP · alt text added', meta: 'Live · 4h' },
      { primary: 'Adjust Beard Trim to £18', secondary: 'Synced on site & Google Profile', meta: 'Live · Mon' },
    ],
  },
  {
    id: 'reviews',
    number: '03',
    label: 'Google Reviews & Replies',
    headline: 'Grow your Google Maps star count without chasing awkward favours.',
    summary:
      'Tap once after completing a job to send a polite UK DMCC-compliant review link. When a new Google review lands, the app drafts a natural human reply you can approve with a single thumb tap.',
    metricValue: '+11 / mo',
    metricLabel: 'Typical fresh Google reviews on Growth',
    bullets: [
      '1-tap SMS or WhatsApp review invite straight after an appointment or job',
      'Zero review gating — 100% compliant with UK Digital Markets, Competition and Consumers Act',
      'Instant alerts when a review posts, with one-tap owner replies synced to Google',
    ],
    screenTitle: 'Google Reputation · 4.9 ★',
    screenSubtitle: '142 verified London reviews',
    screenItems: [
      { primary: 'Daniel O. · ★★★★★', secondary: '“Sharpest fade on Kingsland Rd, booked in 30s.”', meta: 'Reply live', highlight: true },
      { primary: 'Priya S. · ★★★★★', secondary: '“Boiler fixed same afternoon, clear price upfront.”', meta: 'Approve reply', highlight: true },
      { primary: 'Tom H. · ★★★★★', secondary: '“Always spotless, never miss a slot.”', meta: 'Reply live' },
    ],
  },
  {
    id: 'voip',
    number: '04',
    label: '020 Cloud Business Phone',
    headline: 'Carry your London 020 landline cleanly inside your pocket.',
    summary:
      'Built for the 31 January 2027 UK copper PSTN switch-off. Answer your 020 shop number on your mobile with clear caller ID so you know it is a work call — and silence it automatically after closing time.',
    metricValue: '020',
    metricLabel: 'Keep your existing London landline number',
    bullets: [
      'Separate business ringtone and caller label so work never blurs with personal calls',
      'Automatic opening-hours routing to voicemail, SMS catch or 24/7 AI Receptionist',
      'Clean number porting handled end-to-end with zero dead-tone downtime',
    ],
    screenTitle: '020 7946 0412 · Cloud VoIP',
    screenSubtitle: 'Business hours active until 19:00',
    screenItems: [
      { primary: 'Simultaneous ring', secondary: 'Reception desk + Owner iPhone', meta: 'Active', highlight: true },
      { primary: 'After-hours routing (19:00+)', secondary: 'AI Receptionist + instant summary', meta: 'Scheduled' },
      { primary: 'PSTN 2027 compliance', secondary: 'Full VoIP · Zero copper dependency', meta: 'Ready', highlight: true },
    ],
  },
  {
    id: 'reports',
    number: '05',
    label: 'Plain-English Reports',
    headline: 'Know what rang your phone — without learning Google Analytics.',
    summary:
      'On the 1st of every month, open a crisp 30-second card showing tap-to-call clicks, booking taps, form enquiries, Google Maps direction requests and uptime — zero jargon, zero cookie banners.',
    metricValue: '0',
    metricLabel: 'Intrusive tracking cookies required',
    bullets: [
      'Direct count of tap-to-call clicks, WhatsApp taps and booking button conversions',
      'Month-on-month comparison across your London borough and service pages',
      'Downloadable PDF invoice & performance brief inside the Client Portal',
    ],
    screenTitle: 'Monthly Performance · March',
    screenSubtitle: 'Plain-English summary',
    screenItems: [
      { primary: 'Tap-to-call button clicks', secondary: '+24% vs February', meta: '47 calls', highlight: true },
      { primary: 'Direct booking & quote leads', secondary: 'Fresha + website form', meta: '29 leads', highlight: true },
      { primary: 'Cloudflare edge uptime & SSL', secondary: '0.9s median London 4G paint', meta: '100%' },
    ],
  },
];

const QUICK_EDIT_PRESETS = [
  'Change Saturday opening hours to 08:30 – 18:30',
  'Update Classic Scissor Cut price from £28 to £30',
  'Add Easter Bank Holiday notice banner on homepage',
];

export function EmtrcAppPage() {
  const [activeId, setActiveId] = useState<AppModule['id']>('calls');
  const [editInput, setEditInput] = useState(QUICK_EDIT_PRESETS[0]);
  const [submittedEdits, setSubmittedEdits] = useState<string[]>([
    'Bank holiday hours published · Live on site (2h turnaround)',
  ]);
  const prefersReduced = useReducedMotion();

  const activeModule = APP_MODULES.find((m) => m.id === activeId) ?? APP_MODULES[0];

  const handleSimulateEdit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = editInput.trim();
    if (!cleaned) return;
    setSubmittedEdits((prev) => [`${cleaned} · Queued with London studio (ETA < 4h)`, ...prev]);
    setEditInput('');
  };

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="The emtrc App — Manage Calls, Reviews & Website Edits From Your Pocket"
        description="See how London business owners use the emtrc App on iOS, Android and the web Client Portal to recover missed calls, approve Google reviews and request 24-hour site edits."
      />

      {/* HERO SECTION */}
      <section className="hero-editorial-wash border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 pt-14 pb-16 sm:px-8 sm:pt-20 sm:pb-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal immediate>
                <KickerRule>The emtrc App · iOS, Android &amp; Client Portal</KickerRule>
              </Reveal>
              <EditorialHeading
                as="h1"
                immediate
                delay={0.05}
                line1="Your entire front office,"
                line2="in one quiet pocket app."
                line2Tone="accent"
                className="mt-4 font-editorial text-[clamp(2.6rem,5.4vw,4.4rem)] font-bold leading-[1.0] tracking-[-0.035em] text-[var(--emtrc-ink)]"
              />
              <Reveal immediate delay={0.14}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--emtrc-muted)] sm:text-lg">
                  No bloated software dashboards or ten separate logins. Every emtrc client gets instant access to the mobile app and web Client Portal to monitor calls, reply to Google reviews, check plain-English reports and text edits straight to our London studio.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <Magnetic>
                    <Link
                      to="/free-demo"
                      className="group inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                    >
                      <span>Get my free demo first</span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </Magnetic>
                  <Magnetic strength={0.18}>
                    <Link
                      to="/portal"
                      className="inline-flex items-center gap-2 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-6 py-3.5 text-sm font-semibold text-[var(--emtrc-ink)] transition-colors hover:border-[var(--emtrc-ink)]"
                    >
                      <Lock className="h-4 w-4 text-[var(--emtrc-accent)]" aria-hidden="true" />
                      <span>Open Client Portal</span>
                    </Link>
                  </Magnetic>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-[var(--emtrc-border)] pt-6 text-xs text-[var(--emtrc-muted)]">
                  <span className="inline-flex items-center gap-1.5 font-medium text-[var(--emtrc-ink)]">
                    <Smartphone className="h-3.5 w-3.5 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    Included with Business &amp; Growth
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-[var(--emtrc-ink)]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    UK / EU encrypted data
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-[var(--emtrc-ink)]">
                    <Clock className="h-3.5 w-3.5 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    24h human edit SLA
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Right: Authentic London Owner Using Smartphone Outside Shop */}
            <Reveal immediate delay={0.16} className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[#0A0B0E] shadow-2xl">
                <SafeImage
                  src="/src/assets/images/emtrc_app_hero_mobile_1795424181857.jpg"
                  alt="Independent London business owner checking bookings and messages on the emtrc mobile app outside his shopfront"
                  width={1200}
                  height={900}
                  priority
                  className="h-[340px] w-full object-cover sm:h-[440px]"
                />
                <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-[#0A0B0E] px-4 py-4 text-white">
                  <div className="px-2">
                    <p className="font-mono-data text-[10px] text-[#98A0B2]">RESPONSE</p>
                    <p className="mt-0.5 font-editorial text-lg font-bold">
                      <AnimatedCounter target={8} suffix=" sec" />
                    </p>
                  </div>
                  <div className="px-3">
                    <p className="font-mono-data text-[10px] text-[#98A0B2]">EDIT SLA</p>
                    <p className="mt-0.5 font-editorial text-lg font-bold text-[#FF6B5B]">
                      <AnimatedCounter target={24} suffix=" hrs" />
                    </p>
                  </div>
                  <div className="px-3">
                    <p className="font-mono-data text-[10px] text-[#98A0B2]">UPTIME</p>
                    <p className="mt-0.5 font-editorial text-lg font-bold">
                      <AnimatedCounter target={99.9} decimals={1} suffix="%" />
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INTERACTIVE 5-MODULE APP SIMULATOR */}
      <section className="bg-[var(--emtrc-navy)] text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="max-w-2xl">
            <Reveal>
              <KickerRule light>Interactive App Walkthrough · Click Each Module</KickerRule>
              <h2 className="mt-3 font-editorial text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
                Five calm screens built for owners who hate admin.
              </h2>
            </Reveal>
          </div>

          {/* Interactive Module Selector Bar */}
          <div
            role="tablist"
            aria-label="emtrc App capabilities"
            className="mt-10 flex flex-wrap gap-2 border-b border-white/10 pb-6"
          >
            {APP_MODULES.map((mod) => {
              const selected = mod.id === activeId;
              return (
                <button
                  key={mod.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  data-testid={`app-module-tab-${mod.id}`}
                  onClick={() => setActiveId(mod.id)}
                  className={`relative rounded-lg px-4 py-2.5 text-xs font-semibold transition-colors sm:text-sm ${
                    selected
                      ? 'text-[#0A0B0E]'
                      : 'text-[#A5AEBE] hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="app-page-module-pill"
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-white"
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
                    <span className="font-mono-data text-[11px] opacity-65">{mod.number}</span>
                    <span>{mod.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Synchronized Split: Left Architectural Narrative / Right Interactive Titanium Device */}
          <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule.id}
                  initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-mono-data text-xs font-semibold text-[#FF6B5B]">
                    MODULE {activeModule.number} · {activeModule.label.toUpperCase()}
                  </p>
                  <h3 className="mt-3 font-editorial text-2xl font-bold leading-tight text-white sm:text-4xl">
                    {activeModule.headline}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#B4BCCB] sm:text-base">
                    {activeModule.summary}
                  </p>

                  <ul className="mt-7 space-y-3 border-t border-white/10 pt-6">
                    {activeModule.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-[#DCE2EC]">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6B5B]"
                          aria-hidden="true"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 inline-flex items-baseline gap-3 rounded-xl border border-white/10 bg-[#13151B] px-5 py-3.5">
                    <span className="font-mono-data text-3xl font-bold text-white">
                      {activeModule.metricValue}
                    </span>
                    <span className="text-xs text-[#98A0B2]">{activeModule.metricLabel}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Interactive Titanium Phone Reflecting Selected Module */}
            <div className="lg:col-span-5">
              <div className="mx-auto max-w-[360px] rounded-[42px] bg-gradient-to-b from-[#3E424D] via-[#1C1F26] to-[#2C303B] p-[2.5px] shadow-[0_32px_80px_-18px_rgba(0,0,0,0.8)]">
                <div className="overflow-hidden rounded-[40px] bg-[#0B0C10] p-5 text-white">
                  <div className="flex items-center justify-between pb-4 font-mono-data text-[11px] text-white/75">
                    <span>09:41</span>
                    <span className="h-5 w-20 rounded-full bg-black ring-1 ring-white/10" aria-hidden="true" />
                    <span>5G</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                    <div className="flex items-center gap-2.5">
                      <EmtrcMark inverted className="h-7 w-7" />
                      <div>
                        <p className="text-xs font-bold text-white">emtrc App</p>
                        <p className="font-mono-data text-[10px] text-[#98A0B2]">
                          {activeModule.label}
                        </p>
                      </div>
                    </div>
                    <BellRing className="h-4 w-4 text-[#FF6B5B]" aria-hidden="true" />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeModule.id}
                      data-testid="app-simulator-screen"
                      initial={prefersReduced ? false : { opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={prefersReduced ? undefined : { opacity: 0, x: -12 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="min-h-[300px] pt-4"
                    >
                      <p className="font-editorial text-lg font-bold text-white">
                        {activeModule.screenTitle}
                      </p>
                      <p className="mt-0.5 text-xs text-[#98A0B2]">{activeModule.screenSubtitle}</p>

                      <div className="mt-4 space-y-2.5">
                        {activeModule.screenItems.map((item) => (
                          <div
                            key={item.primary}
                            className="rounded-xl bg-[#151822] p-3.5 ring-1 ring-white/[0.08]"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-xs font-semibold text-white truncate">
                                {item.primary}
                              </p>
                              <span
                                className={`font-mono-data text-[10px] font-semibold whitespace-nowrap ${
                                  item.highlight ? 'text-[#FF6B5B]' : 'text-[#98A0B2]'
                                }`}
                              >
                                {item.meta}
                              </span>
                            </div>
                            <p className="mt-1 text-[11px] leading-snug text-[#A5AEBE]">
                              {item.secondary}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-white/25" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE STUDIO EDIT SANDBOX + MOBILE FIELD PHOTOGRAPHY */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <KickerRule>Try It Right Here · Interactive Preview</KickerRule>
                <h2 className="mt-3 font-editorial text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl">
                  See how fast a website edit feels inside the app.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-base">
                  No CMS training manuals. Pick a common London shop change below or type your own to preview how our studio dispatch queue works.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {QUICK_EDIT_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setEditInput(preset)}
                      className="rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] px-3 py-1.5 text-left text-xs font-medium text-[var(--emtrc-ink)] transition-colors hover:border-[var(--emtrc-ink)]"
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSimulateEdit} className="mt-5 space-y-3">
                  <label htmlFor="simulate-edit-input" className="block text-xs font-semibold text-[var(--emtrc-ink)]">
                    Describe your site update
                  </label>
                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <input
                      id="simulate-edit-input"
                      data-testid="app-edit-simulator-input"
                      type="text"
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                      placeholder="e.g. Change Sunday closing time to 16:00"
                      className="flex-1 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-4 py-3 text-sm text-[var(--emtrc-ink)] placeholder:text-[var(--emtrc-muted)] focus:border-[var(--emtrc-ink)] focus:outline-none"
                    />
                    <button
                      type="submit"
                      data-testid="app-edit-simulator-submit"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>Send to studio</span>
                    </button>
                  </div>
                </form>

                <div
                  data-testid="app-edit-queue-list"
                  className="mt-6 space-y-2 rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] p-4"
                >
                  <p className="font-mono-data text-[10px] font-semibold tracking-wider text-[var(--emtrc-muted)]">
                    LIVE DISPATCH LOG (PREVIEW)
                  </p>
                  {submittedEdits.map((entry, idx) => (
                    <div
                      key={`${entry}-${idx}`}
                      className="flex items-start gap-2.5 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-3.5 py-2.5 text-xs text-[var(--emtrc-ink)]"
                    >
                      <CheckCheck
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--emtrc-accent)]"
                        aria-hidden="true"
                      />
                      <span>{entry}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: Matched Street-Level Mobile Maps Photography */}
            <div className="lg:col-span-6">
              <Reveal delay={0.1}>
                <div className="overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]">
                  <ParallaxFrame offset={18} className="h-[340px] sm:h-[420px] w-full">
                    <SafeImage
                      src="/src/assets/images/emtrc_mobile_maps_search_1795424180037.jpg"
                      alt="London commuter walking down a busy high street checking a local business on mobile Google Maps"
                      width={1200}
                      height={900}
                      className="h-full w-full object-cover"
                    />
                  </ParallaxFrame>
                  <div className="p-6">
                    <p className="font-mono-data text-[11px] font-semibold text-[var(--emtrc-accent)]">
                      MOBILE-FIRST BY DEFAULT
                    </p>
                    <h3 className="mt-1.5 font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                      83% of your local customers find you on a phone while walking down the street.
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                      Every edit you tap through in the emtrc App updates both your mobile website and your structured Google Business Profile signals simultaneously — so opening hours, prices and tap-to-call numbers never fall out of sync.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* THREE ARCHITECTURAL PILLARS */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-sand)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <KickerRule>Built Like Real Software — Not Agency Bloat</KickerRule>
            <h2 className="mt-3 max-w-2xl font-editorial text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Every plan includes Client Portal access from launch day.
            </h2>
          </Reveal>

          <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: Globe,
                title: 'Domain & DNS Vault',
                body: 'Inspect your .co.uk or .com registration, renewal dates and DNS records at any time. Your domain stays in your business name — never held hostage.',
              },
              {
                icon: PhoneCall,
                title: 'Call & Enquiry History',
                body: 'Review every missed-call SMS conversation, AI Receptionist booking transcript and quote form enquiry in one searchable timeline.',
              },
              {
                icon: TrendingUp,
                title: 'Zero-Cookie Telemetry',
                body: 'See real London phone clicks, map direction taps and monthly uptime without ugly GDPR cookie popups slowing down your customers.',
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <StaggerItem key={card.title}>
                  <SpotlightCard className="h-full rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-7">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] text-[var(--emtrc-accent)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                      {card.body}
                    </p>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] p-8 text-white sm:flex-row sm:items-center">
              <div>
                <p className="font-mono-data text-[11px] text-[#FF6B5B]">ALREADY AN EMTRC CLIENT?</p>
                <h3 className="mt-1 font-editorial text-2xl font-bold text-white">
                  Sign in to your Client Portal or request a free demo first.
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  to="/portal"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#0A0B0E] transition-colors hover:bg-[#F4F5F7]"
                >
                  <Lock className="h-4 w-4" aria-hidden="true" />
                  <span>Client Portal login</span>
                </Link>
                <a
                  href={SITE.brand.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
                >
                  <span>Book 15-min call</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </EmtrcLayout>
  );
}
