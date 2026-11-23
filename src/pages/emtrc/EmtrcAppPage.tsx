import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BellRing,
  Bot,
  Calendar,
  Check,
  CheckCheck,
  Clock,
  Globe,
  Lock,
  MapPin,
  PhoneCall,
  Plus,
  Send,
  Share2,
  ShieldCheck,
  Smartphone,
  Star,
  Target,
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
import {
  INITIAL_AGENT_DRAFTS,
  INITIAL_COMPETITOR_PRICING,
  INITIAL_MISSED_CALLS,
  INITIAL_REVIEWS,
  INITIAL_SALES_LEADS,
  INITIAL_SEO_KEYWORDS,
  INITIAL_SOCIAL_DRAFTS,
  calculatePendingApprovalsCount,
  calculatePriceGapPercent,
  createSimulatedMissedCall,
  type AgentDraftItem,
  type AppModuleId,
  type CompetitorPriceRow,
  type MissedCallThread,
  type ReviewReplyItem,
  type SalesLeadItem,
  type SocialPostDraft,
  type VoipRoutingMode,
} from '../../utils/ownerAppData';

interface AppModuleMeta {
  id: AppModuleId;
  number: string;
  label: string;
  shortLabel: string;
  headline: string;
  summary: string;
  metricValue: string;
  metricLabel: string;
  serviceSlug: string;
  bullets: string[];
}

const APP_MODULES: readonly AppModuleMeta[] = [
  {
    id: 'calls',
    number: '01',
    label: 'Missed-Call Catcher',
    shortLabel: 'Missed Calls',
    headline: 'Every missed ring turned into a live SMS thread in 8 seconds.',
    summary:
      'When your hands are on a boiler, a haircut or an espresso machine, the emtrc App texts the caller automatically from your business number and drops their reply into one tidy inbox.',
    metricValue: '8 sec',
    metricLabel: 'Average missed-call SMS dispatch',
    serviceSlug: 'lead-catcher',
    bullets: [
      'Automatic branded text-back whenever a call goes unanswered after 4 rings',
      'Direct booking or quote link embedded so callers never dial the next Google listing',
      'Full two-way SMS thread visible on iOS, Android and the web Client Portal',
    ],
  },
  {
    id: 'agent',
    number: '02',
    label: 'Personal AI Agent',
    shortLabel: 'AI Agent',
    headline: 'Your 7:30am owner brief with quote chases drafted and ready.',
    summary:
      'Your dedicated Personal AI Agent triages overnight enquiries, chases unconfirmed quotes, drafts supplier emails and flags urgent jobs — nothing leaves your outbox without your 1-tap approval.',
    metricValue: '6.5 hrs',
    metricLabel: 'Average weekly admin time saved',
    serviceSlug: 'personal-ai-agents',
    bullets: [
      'Crisp 7:30am summary of today’s jobs, unconfirmed quotes and priority emails',
      '1-tap Approve & Send guardrails — you stay 100% in control of your tone',
      'Trained specifically on your London prices, postcodes and opening hours',
    ],
  },
  {
    id: 'leads',
    number: '03',
    label: 'AI Sales Leads',
    shortLabel: 'Sales Leads',
    headline: 'Warm London commercial leads delivered directly to your pocket.',
    summary:
      'Target local letting agents, offices, boutique hotels and residential blocks in your borough with verified decision-maker contacts and polite, human-reviewed introductions.',
    metricValue: '15–40',
    metricLabel: 'Verified local B2B prospects monthly',
    serviceSlug: 'ai-sales-leads',
    bullets: [
      'Filtered strictly to your target London postcodes and preferred job values',
      'Buying signals surfaced automatically (new lettings, studio moves, refurb tenders)',
      '1-tap Qualify & Send Intro with UK B2B compliance built in',
    ],
  },
  {
    id: 'pricing',
    number: '04',
    label: 'Competitor Price Watch',
    shortLabel: 'Price Watch',
    headline: 'See what nearby London rivals charge before you underprice.',
    summary:
      'Weekly benchmarks of 10–15 nearby competitors in your borough across your core treatments, call-outs or packages — plus 1-tap price sync straight to your website and Google Profile.',
    metricValue: '+14%',
    metricLabel: 'Typical average order value lift',
    serviceSlug: 'competitor-pricing',
    bullets: [
      'Side-by-side comparison of your prices vs borough median and top local rivals',
      'Instant alert when nearby shops raise weekend rates or launch seasonal offers',
      'Tap once to push a revised price directly into our 24-hour Studio Edit queue',
    ],
  },
  {
    id: 'seo',
    number: '05',
    label: 'SEO & Maps Rank Tracker',
    shortLabel: 'SEO & Maps',
    headline: 'Track your exact Google Maps 3-Pack position by postcode.',
    summary:
      'Check where your shop ranks for high-intent local searches across your London postcodes, track weekly movement, and see the exact review gap needed to overtake #1.',
    metricValue: 'Top 3',
    metricLabel: 'Google Maps 3-Pack target zone',
    serviceSlug: 'local-seo',
    bullets: [
      'Postcode-level tracking for Google Maps 3-Pack, organic search and AI citations',
      'Exact review-count gap and schema health score shown in plain English',
      'Zero bloated SEO jargon or cookie banners required',
    ],
  },
  {
    id: 'reviews',
    number: '06',
    label: 'Reviews & Replies',
    shortLabel: 'Reviews',
    headline: 'Approve natural Google review replies with one thumb tap.',
    summary:
      'Send UK DMCC-compliant post-job review invites and publish thoughtful, keyword-aware owner replies the moment a customer leaves feedback.',
    metricValue: '+11 / mo',
    metricLabel: 'Typical fresh Google reviews on Growth',
    serviceSlug: 'review-engine',
    bullets: [
      '1-tap SMS or WhatsApp review invite straight after an appointment or job',
      '100% compliant with UK Digital Markets, Competition and Consumers Act (zero gating)',
      'AI drafts tailored responses you can approve or edit in seconds',
    ],
  },
  {
    id: 'social',
    number: '07',
    label: 'AI Social Scheduler',
    shortLabel: 'AI Social',
    headline: 'Approve a full week of Instagram & Google posts in 60 seconds.',
    summary:
      'Turn quick shop-floor snapshots into crisp Instagram posts, Reels hooks and Google Business updates — matched to your brand voice and published at peak local hours.',
    metricValue: '3–5x / wk',
    metricLabel: 'Consistent cross-channel posts',
    serviceSlug: 'ai-social-management',
    bullets: [
      'Zero generic AI clichés — captions written for real London neighbourhoods',
      '1-tap weekly approval queue inside the emtrc App before anything publishes',
      'Every post drives direct bookings, calls or WhatsApp enquiries',
    ],
  },
  {
    id: 'edits',
    number: '08',
    label: 'Studio Edits & 020 VoIP',
    shortLabel: 'Edits & 020',
    headline: 'Dispatch 24h website edits & switch your 020 phone routing live.',
    summary:
      'Update bank-holiday hours, swap photos or toggle your 2027-ready 020 Cloud VoIP after-hours routing straight from one control screen.',
    metricValue: '< 24h',
    metricLabel: 'Guaranteed human studio edit SLA',
    serviceSlug: 'business-phone',
    bullets: [
      'Text price changes or upload phone photos — we format and push to Cloudflare',
      'Switch 020 landline routing between AI Receptionist, Missed-Call SMS or mobile',
      'Full PSTN 2027 compliance with zero copper line dependency',
    ],
  },
];

const QUICK_EDIT_PRESETS = [
  'Change Saturday opening hours to 08:30 – 18:30',
  'Update Classic Scissor Cut price from £28 to £30',
  'Add Bank Holiday notice banner on homepage',
];

export function EmtrcAppPage() {
  const prefersReduced = useReducedMotion();

  const [activeId, setActiveId] = useState<AppModuleId>('calls');
  const [missedCalls, setMissedCalls] = useState<MissedCallThread[]>([...INITIAL_MISSED_CALLS]);
  const [simCallCount, setSimCallCount] = useState(0);
  const [agentDrafts, setAgentDrafts] = useState<AgentDraftItem[]>([...INITIAL_AGENT_DRAFTS]);
  const [salesLeads, setSalesLeads] = useState<SalesLeadItem[]>([...INITIAL_SALES_LEADS]);
  const [priceRows, setPriceRows] = useState<CompetitorPriceRow[]>([...INITIAL_COMPETITOR_PRICING]);
  const [seoPostcodeFilter, setSeoPostcodeFilter] = useState<'ALL' | 'E8' | 'SE10' | 'SW7' | 'SW11'>('ALL');
  const [reviews, setReviews] = useState<ReviewReplyItem[]>([...INITIAL_REVIEWS]);
  const [socialDrafts, setSocialDrafts] = useState<SocialPostDraft[]>([...INITIAL_SOCIAL_DRAFTS]);
  const [voipMode, setVoipMode] = useState<VoipRoutingMode>('ai-receptionist');

  const [editInput, setEditInput] = useState(QUICK_EDIT_PRESETS[0]);
  const [submittedEdits, setSubmittedEdits] = useState<string[]>([
    'Bank holiday hours published · Live on site (2h turnaround)',
  ]);

  const activeModule = APP_MODULES.find((m) => m.id === activeId) ?? APP_MODULES[0];
  const pendingApprovals = calculatePendingApprovalsCount(agentDrafts, reviews, socialDrafts);

  const handleSimulateMissedCall = () => {
    const newCall = createSimulatedMissedCall(simCallCount);
    setSimCallCount((c) => c + 1);
    setMissedCalls((prev) => [newCall, ...prev]);
  };

  const handleApproveAgentDraft = (id: string) => {
    setAgentDrafts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Approved & sent' } : item))
    );
  };

  const handleAdvanceLead = (id: string) => {
    setSalesLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== id) return lead;
        const nextStage =
          lead.stage === 'New prospect' ? 'Intro sent' : 'Call booked';
        return { ...lead, stage: nextStage };
      })
    );
  };

  const handleSyncCompetitorPrice = (row: CompetitorPriceRow) => {
    const targetPrice = Math.min(row.boroughMedian, row.topRivalPrice - 2);
    setPriceRows((prev) =>
      prev.map((r) => (r.id === row.id ? { ...r, yourPrice: targetPrice, synced: true } : r))
    );
    setSubmittedEdits((prev) => [
      `Sync "${row.service}" price to £${targetPrice} (London benchmark) · Queued for studio`,
      ...prev,
    ]);
  };

  const handlePublishReview = (id: string) => {
    setReviews((prev) =>
      prev.map((rev) =>
        rev.id === id ? { ...rev, status: 'Published on Google' } : rev
      )
    );
  };

  const handleApproveSocial = (id: string) => {
    setSocialDrafts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, status: 'Scheduled' } : post
      )
    );
  };

  const handleSimulateEdit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = editInput.trim();
    if (!cleaned) return;
    setSubmittedEdits((prev) => [`${cleaned} · Queued with London studio (ETA < 4h)`, ...prev]);
    setEditInput('');
  };

  const visibleSeoRows =
    seoPostcodeFilter === 'ALL'
      ? INITIAL_SEO_KEYWORDS
      : INITIAL_SEO_KEYWORDS.filter((k) => k.postcode === seoPostcodeFilter);

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="The emtrc App — AI Agents, Sales Leads, Price Watch, SEO & 020 Calls"
        description="Explore all 8 interactive modules inside the emtrc Owner App: Personal AI Agents, AI Sales Leads, Competitor Price Watch, Local SEO Rank Tracker, Reviews, AI Social Scheduler, Missed-Call Catcher and 24h Studio Edits."
      />

      {/* HERO SECTION */}
      <section className="hero-editorial-wash border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 pt-12 pb-14 sm:px-8 sm:pt-16 sm:pb-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal immediate>
                <KickerRule>The emtrc Owner App · 8 Live Command Modules</KickerRule>
              </Reveal>
              <EditorialHeading
                as="h1"
                immediate
                delay={0.05}
                line1="Your AI front office &amp; growth engine,"
                line2="in one quiet pocket app."
                line2Tone="accent"
                className="mt-4 font-editorial text-[clamp(2.5rem,5.2vw,4.25rem)] font-bold leading-[1.0] tracking-[-0.03em] text-[var(--emtrc-ink)] [&>span:nth-child(2)>span]:font-editorial-italic [&>span:nth-child(2)>span]:font-normal"
              />
              <Reveal immediate delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--emtrc-muted)] sm:text-lg">
                  Stop juggling eight disconnected tools. Manage your Personal AI Agent, London AI Sales Leads, Competitor Price Watch, Google Maps SEO ranks, Reviews, AI Social queue, Missed-Call SMS and 24-hour Studio Edits from one clean iOS, Android &amp; web portal.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3.5">
                  <Magnetic>
                    <Link
                      to="/portal?demo=1"
                      data-testid="app-open-workspace-cta"
                      className="group inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                    >
                      <span>Launch full interactive workspace</span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </Magnetic>
                  <Magnetic strength={0.18}>
                    <Link
                      to="/free-demo"
                      className="inline-flex items-center gap-2 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-6 py-3.5 text-sm font-semibold text-[var(--emtrc-ink)] transition-colors hover:border-[var(--emtrc-accent)]"
                    >
                      <span>Request free 48h demo</span>
                    </Link>
                  </Magnetic>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-5 border-t border-[var(--emtrc-border)] pt-5 text-xs text-[var(--emtrc-muted)]">
                  <span className="inline-flex items-center gap-1.5 font-medium text-[var(--emtrc-ink)]">
                    <Smartphone className="h-3.5 w-3.5 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    8 integrated owner modules
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-[var(--emtrc-ink)]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    1-tap human approval guardrails
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-[var(--emtrc-ink)]">
                    <Clock className="h-3.5 w-3.5 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    24h London studio edit SLA
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal immediate delay={0.16} className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[#0A0B0E] shadow-2xl">
                <SafeImage
                  src="/src/assets/images/emtrc_app_hero_mobile_1795424181857.jpg"
                  alt="Independent London business owner checking bookings and messages on the emtrc mobile app outside his shopfront"
                  width={1200}
                  height={900}
                  priority
                  className="h-[320px] w-full object-cover sm:h-[400px]"
                />
                <div className="grid grid-cols-4 divide-x divide-white/10 border-t border-white/10 bg-[#0A0B0E] px-3 py-4 text-white">
                  <div className="px-2">
                    <p className="font-mono-data text-[10px] text-[#98A0B2]">MODULES</p>
                    <p className="mt-0.5 font-mono-data text-lg font-bold tabular-nums">
                      <AnimatedCounter target={8} />
                    </p>
                  </div>
                  <div className="px-2">
                    <p className="font-mono-data text-[10px] text-[#98A0B2]">SMS CATCH</p>
                    <p className="mt-0.5 font-mono-data text-lg font-bold tabular-nums text-[#FF8C73]">
                      <AnimatedCounter target={8} suffix="s" />
                    </p>
                  </div>
                  <div className="px-2">
                    <p className="font-mono-data text-[10px] text-[#98A0B2]">ADMIN SAVED</p>
                    <p className="mt-0.5 font-mono-data text-lg font-bold tabular-nums">
                      <AnimatedCounter target={6.5} decimals={1} suffix="h" />
                    </p>
                  </div>
                  <div className="px-2">
                    <p className="font-mono-data text-[10px] text-[#98A0B2]">UPTIME</p>
                    <p className="mt-0.5 font-mono-data text-lg font-bold tabular-nums text-[#34D399]">
                      <AnimatedCounter target={99.9} decimals={1} suffix="%" />
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INTERACTIVE 8-MODULE OWNER APP SIMULATOR (Even 2x4 Grid Tab Selector) */}
      <section className="border-b border-[var(--emtrc-navy-border)] bg-[#0B0D12] text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <Reveal>
                <KickerRule light>Interactive 8-Module Pocket Simulator · Click &amp; Test Live</KickerRule>
                <h2 className="mt-3 font-editorial text-3xl font-bold leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl">
                  Eight practical screens built for owners who hate admin.
                </h2>
              </Reveal>
            </div>
            <div className="rounded-xl border border-white/12 bg-[#131722] px-4 py-2.5 font-mono-data text-xs">
              <span className="text-[#9BA3B5]">Pending approvals in demo: </span>
              <span
                data-testid="app-pending-approvals-count"
                className="font-bold text-[#FF8C73] tabular-nums"
              >
                {pendingApprovals}
              </span>
            </div>
          </div>

          {/* Even 4x2 Module Grid Selector (8 modules = 2 crisp rows of 4 on desktop, 4 rows of 2 on mobile) */}
          <div
            role="tablist"
            aria-label="emtrc App 8 modules"
            className="mt-8 grid grid-cols-2 gap-2.5 border-b border-white/10 pb-7 lg:grid-cols-4"
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
                  className={`relative rounded-xl border px-3.5 py-3 text-left transition-all ${
                    selected
                      ? 'border-[#FF8C73] bg-[#191F2E] text-white shadow-lg'
                      : 'border-white/10 bg-white/[0.025] text-[#A5AEBE] hover:border-white/25 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-mono-data text-[10px] font-bold ${
                        selected ? 'text-[#FF8C73]' : 'text-[#737C90]'
                      }`}
                    >
                      {mod.number}
                    </span>
                    <span className="font-mono-data text-[10px] text-[#34D399] tabular-nums">
                      {mod.metricValue}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs font-semibold sm:text-sm">{mod.label}</p>
                </button>
              );
            })}
          </div>

          {/* Synchronized Split: Left Module Brief / Right Working Interactive Titanium Phone */}
          <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule.id}
                  initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-mono-data text-xs font-semibold text-[#FF8C73]">
                    MODULE {activeModule.number} · {activeModule.label.toUpperCase()}
                  </p>
                  <h3 className="mt-3 font-editorial text-2xl font-bold leading-tight text-white sm:text-4xl">
                    {activeModule.headline}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#B4BCCB] sm:text-base">
                    {activeModule.summary}
                  </p>

                  <ul className="mt-6 space-y-3 border-t border-white/10 pt-5">
                    {activeModule.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-[#DCE2EC]">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#FF8C73]"
                          aria-hidden="true"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <div className="inline-flex items-baseline gap-3 rounded-xl border border-white/10 bg-[#131722] px-5 py-3.5">
                      <span className="font-mono-data text-3xl font-bold text-white tabular-nums">
                        {activeModule.metricValue}
                      </span>
                      <span className="text-xs text-[#98A0B2]">{activeModule.metricLabel}</span>
                    </div>

                    <Link
                      to={`/services/${activeModule.serviceSlug}`}
                      className="inline-flex items-center gap-1.5 font-mono-data text-xs font-semibold text-[#FF8C73] hover:text-white"
                    >
                      <span>Explore full service details</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Interactive Live Pocket Phone with Real Stateful Actions */}
            <div className="lg:col-span-6">
              <div
                data-testid="app-simulator-phone"
                className="relative mx-auto max-w-[380px] rounded-[42px] bg-gradient-to-b from-[#454A56] via-[#1B1E25] to-[#2F333E] p-[3px] shadow-[0_34px_85px_-16px_rgba(0,0,0,0.85)]"
              >
                <div className="flex min-h-[590px] flex-col justify-between overflow-hidden rounded-[39px] bg-[#0A0C10] p-4 text-white">
                  <div>
                    {/* Phone Status Header */}
                    <div className="flex items-center justify-between px-2 pb-3 font-mono-data text-[11px] text-white/80">
                      <span>09:41</span>
                      <span
                        className="flex h-[20px] w-[78px] items-center justify-end rounded-full bg-black px-2 ring-1 ring-white/10"
                        aria-hidden="true"
                      >
                        <span className="h-2 w-2 rounded-full bg-[#1C1F2B] ring-1 ring-white/15" />
                      </span>
                      <span>5G</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2.5">
                        <EmtrcMark inverted className="h-7 w-7" />
                        <div>
                          <p className="text-xs font-bold text-white">emtrc Owner App</p>
                          <p className="font-mono-data text-[10px] text-[#98A0B2]">
                            {activeModule.label}
                          </p>
                        </div>
                      </div>
                      <BellRing className="h-4 w-4 text-[#FF8C73]" aria-hidden="true" />
                    </div>

                    {/* Interactive Screen Body */}
                    <div
                      data-testid="app-simulator-screen"
                      className="min-h-[430px] pt-4"
                    >
                      {activeId === 'calls' && (
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <p className="font-editorial text-lg font-bold text-white">
                                Missed-Call Inbox
                              </p>
                              <p className="text-[11px] text-[#98A0B2]">
                                {missedCalls.length} recovered threads · 8s SMS catch
                              </p>
                            </div>
                            <button
                              type="button"
                              data-testid="simulate-missed-call-btn"
                              onClick={handleSimulateMissedCall}
                              className="inline-flex items-center gap-1 rounded-lg bg-[var(--emtrc-accent)] px-2.5 py-1.5 font-mono-data text-[10px] font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
                            >
                              <Plus className="h-3 w-3" aria-hidden="true" />
                              <span>Simulate call</span>
                            </button>
                          </div>

                          <div className="mt-3.5 space-y-2.5 max-h-[345px] overflow-y-auto pr-0.5">
                            {missedCalls.map((call) => (
                              <div
                                key={call.id}
                                className="rounded-xl border border-white/10 bg-[#141822] p-3"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-mono-data text-xs font-bold text-white">
                                    {call.caller} · {call.postcode}
                                  </span>
                                  <span className="font-mono-data text-[10px] font-semibold text-[#34D399] tabular-nums">
                                    {call.status} · £{call.valueGbp}
                                  </span>
                                </div>
                                <p className="mt-1 text-[11px] leading-snug text-[#B4BCCB]">
                                  {call.message}
                                </p>
                                <p className="mt-1.5 font-mono-data text-[9.5px] text-[#7A8499]">
                                  Auto-SMS replied in 8s · {call.timestamp}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeId === 'agent' && (
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <p className="font-editorial text-lg font-bold text-white">
                                07:30 Morning Brief
                              </p>
                              <p className="text-[11px] text-[#98A0B2]">
                                1-tap owner approval required
                              </p>
                            </div>
                            <Bot className="h-4 w-4 text-[#FF8C73]" aria-hidden="true" />
                          </div>

                          <div className="mt-3.5 space-y-2.5">
                            {agentDrafts.map((item) => {
                              const sent = item.status === 'Approved & sent';
                              return (
                                <div
                                  key={item.id}
                                  className="rounded-xl border border-white/10 bg-[#141822] p-3"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="font-mono-data text-[10px] font-semibold text-[#FF8C73]">
                                      {item.category}
                                    </span>
                                    <span
                                      className={`font-mono-data text-[10px] font-semibold ${
                                        sent ? 'text-[#34D399]' : 'text-[#FBBF24]'
                                      }`}
                                    >
                                      {item.status}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-xs font-bold text-white">{item.recipient}</p>
                                  <p className="mt-0.5 text-[11px] leading-snug text-[#A5AEBE]">
                                    {item.draftPreview}
                                  </p>
                                  {!sent && (
                                    <button
                                      type="button"
                                      data-testid={`approve-agent-${item.id}`}
                                      onClick={() => handleApproveAgentDraft(item.id)}
                                      className="mt-2.5 inline-flex items-center gap-1 rounded-md bg-[var(--emtrc-accent)] px-2.5 py-1 font-mono-data text-[10px] font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
                                    >
                                      <Check className="h-3 w-3" aria-hidden="true" />
                                      <span>Approve &amp; Send</span>
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {activeId === 'leads' && (
                        <div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-editorial text-lg font-bold text-white">
                                London B2B Pipeline
                              </p>
                              <p className="text-[11px] text-[#98A0B2]">
                                Verified commercial prospects
                              </p>
                            </div>
                            <Target className="h-4 w-4 text-[#FF8C73]" aria-hidden="true" />
                          </div>

                          <div className="mt-3.5 space-y-2.5 max-h-[345px] overflow-y-auto pr-0.5">
                            {salesLeads.map((lead) => (
                              <div
                                key={lead.id}
                                className="rounded-xl border border-white/10 bg-[#141822] p-3"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <p className="text-xs font-bold text-white truncate">
                                    {lead.company}
                                  </p>
                                  <span className="font-mono-data text-[10px] font-bold text-[#34D399] tabular-nums whitespace-nowrap">
                                    £{lead.estimatedMonthlyValue}/mo
                                  </span>
                                </div>
                                <p className="mt-0.5 font-mono-data text-[10px] text-[#98A0B2]">
                                  {lead.borough} · {lead.contactRole}
                                </p>
                                <div className="mt-2 flex items-center justify-between gap-2">
                                  <span className="font-mono-data text-[10px] text-[#FF8C73]">
                                    {lead.stage}
                                  </span>
                                  {lead.stage !== 'Call booked' && (
                                    <button
                                      type="button"
                                      data-testid={`advance-lead-${lead.id}`}
                                      onClick={() => handleAdvanceLead(lead.id)}
                                      className="rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1 font-mono-data text-[10px] font-semibold text-white hover:border-[#FF8C73]"
                                    >
                                      {lead.stage === 'New prospect' ? 'Send Intro' : 'Book Call'}
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeId === 'pricing' && (
                        <div>
                          <p className="font-editorial text-lg font-bold text-white">
                            Borough Price Watch
                          </p>
                          <p className="text-[11px] text-[#98A0B2]">
                            Compare your rates vs local rivals
                          </p>
                          <div className="mt-3.5 space-y-2.5 max-h-[345px] overflow-y-auto pr-0.5">
                            {priceRows.map((row) => {
                              const gap = calculatePriceGapPercent(row.yourPrice, row.boroughMedian);
                              return (
                                <div
                                  key={row.id}
                                  className="rounded-xl border border-white/10 bg-[#141822] p-3"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <p className="text-xs font-bold text-white truncate">
                                      {row.service}
                                    </p>
                                    <span className="font-mono-data text-[10px] font-semibold text-[#FBBF24] tabular-nums">
                                      {gap > 0 ? `+${gap}%` : `${gap}%`} vs med
                                    </span>
                                  </div>
                                  <div className="mt-1.5 flex items-center justify-between font-mono-data text-[10.5px] text-[#B4BCCB] tabular-nums">
                                    <span>You: £{row.yourPrice}</span>
                                    <span>Median: £{row.boroughMedian}</span>
                                    <span>Top: £{row.topRivalPrice}</span>
                                  </div>
                                  <div className="mt-2 flex items-center justify-between">
                                    <span className="text-[10px] text-[#7A8499] truncate">
                                      Rival: {row.topRivalName}
                                    </span>
                                    <button
                                      type="button"
                                      data-testid={`sync-price-${row.id}`}
                                      onClick={() => handleSyncCompetitorPrice(row)}
                                      disabled={Boolean(row.synced)}
                                      className={`rounded-md px-2.5 py-1 font-mono-data text-[10px] font-semibold transition-colors ${
                                        row.synced
                                          ? 'bg-emerald-500/20 text-[#34D399]'
                                          : 'bg-[var(--emtrc-accent)] text-white hover:bg-[var(--emtrc-accent-hover)]'
                                      }`}
                                    >
                                      {row.synced ? 'Synced to queue' : 'Sync to Median'}
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {activeId === 'seo' && (
                        <div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-editorial text-lg font-bold text-white">
                                Maps 3-Pack Radar
                              </p>
                              <p className="text-[11px] text-[#98A0B2]">
                                Filter by London postcode
                              </p>
                            </div>
                            <MapPin className="h-4 w-4 text-[#FF8C73]" aria-hidden="true" />
                          </div>

                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {(['ALL', 'E8', 'SE10', 'SW7', 'SW11'] as const).map((pc) => (
                              <button
                                key={pc}
                                type="button"
                                onClick={() => setSeoPostcodeFilter(pc)}
                                className={`rounded-md px-2 py-1 font-mono-data text-[10px] font-semibold ${
                                  seoPostcodeFilter === pc
                                    ? 'bg-[var(--emtrc-accent)] text-white'
                                    : 'bg-white/[0.06] text-[#98A0B2] hover:text-white'
                                }`}
                              >
                                {pc}
                              </button>
                            ))}
                          </div>

                          <div className="mt-3 space-y-2 max-h-[300px] overflow-y-auto pr-0.5">
                            {visibleSeoRows.map((row) => (
                              <div
                                key={row.id}
                                className="rounded-xl border border-white/10 bg-[#141822] p-3"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-semibold text-white truncate">
                                    {row.keyword}
                                  </span>
                                  <span className="font-mono-data text-xs font-bold text-[#34D399] tabular-nums">
                                    #{row.mapsRank}
                                  </span>
                                </div>
                                <div className="mt-1 flex items-center justify-between font-mono-data text-[10px] text-[#98A0B2] tabular-nums">
                                  <span>+{row.weeklyDelta} spots this wk</span>
                                  <span>{row.monthlySearches}/mo vol</span>
                                  <span>
                                    {row.reviewsBehindFirst === 0
                                      ? 'Leading #1'
                                      : `${row.reviewsBehindFirst} rev gap`}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeId === 'reviews' && (
                        <div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-editorial text-lg font-bold text-white">
                                Google Reviews · 4.9 ★
                              </p>
                              <p className="text-[11px] text-[#98A0B2]">
                                UK DMCC compliant · 1-tap reply
                              </p>
                            </div>
                            <Star className="h-4 w-4 text-[#FBBF24]" aria-hidden="true" />
                          </div>

                          <div className="mt-3.5 space-y-2.5">
                            {reviews.map((rev) => {
                              const live = rev.status === 'Published on Google';
                              return (
                                <div
                                  key={rev.id}
                                  className="rounded-xl border border-white/10 bg-[#141822] p-3"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-bold text-white">
                                      {rev.author} · {rev.borough}
                                    </span>
                                    <span
                                      className={`font-mono-data text-[10px] font-semibold ${
                                        live ? 'text-[#34D399]' : 'text-[#FBBF24]'
                                      }`}
                                    >
                                      {live ? 'Reply live' : 'Draft ready'}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-[11px] text-[#B4BCCB]">{rev.excerpt}</p>
                                  {!live && (
                                    <button
                                      type="button"
                                      data-testid={`approve-review-${rev.id}`}
                                      onClick={() => handlePublishReview(rev.id)}
                                      className="mt-2 inline-flex items-center gap-1 rounded-md bg-[var(--emtrc-accent)] px-2.5 py-1 font-mono-data text-[10px] font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
                                    >
                                      <Check className="h-3 w-3" aria-hidden="true" />
                                      <span>Approve &amp; Publish</span>
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {activeId === 'social' && (
                        <div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-editorial text-lg font-bold text-white">
                                Weekly Social Queue
                              </p>
                              <p className="text-[11px] text-[#98A0B2]">
                                Approve posts before publishing
                              </p>
                            </div>
                            <Share2 className="h-4 w-4 text-[#FF8C73]" aria-hidden="true" />
                          </div>

                          <div className="mt-3.5 space-y-2.5">
                            {socialDrafts.map((post) => {
                              const scheduled = post.status === 'Scheduled';
                              return (
                                <div
                                  key={post.id}
                                  className="rounded-xl border border-white/10 bg-[#141822] p-3"
                                >
                                  <div className="flex items-center justify-between gap-2 font-mono-data text-[10px]">
                                    <span className="font-semibold text-[#FF8C73]">
                                      {post.channel} · {post.scheduledFor}
                                    </span>
                                    <span className={scheduled ? 'text-[#34D399]' : 'text-[#FBBF24]'}>
                                      {post.status}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-xs font-bold text-white">{post.title}</p>
                                  <p className="mt-0.5 line-clamp-2 text-[11px] text-[#A5AEBE]">
                                    {post.caption}
                                  </p>
                                  {!scheduled && (
                                    <button
                                      type="button"
                                      data-testid={`approve-social-${post.id}`}
                                      onClick={() => handleApproveSocial(post.id)}
                                      className="mt-2 inline-flex items-center gap-1 rounded-md bg-[var(--emtrc-accent)] px-2.5 py-1 font-mono-data text-[10px] font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
                                    >
                                      <Check className="h-3 w-3" aria-hidden="true" />
                                      <span>Approve &amp; Schedule</span>
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {activeId === 'edits' && (
                        <div>
                          <p className="font-editorial text-lg font-bold text-white">
                            020 VoIP &amp; Edit Queue
                          </p>
                          <p className="text-[11px] text-[#98A0B2]">
                            Switch after-hours 020 routing live
                          </p>

                          <div className="mt-3 space-y-2">
                            {(
                              [
                                {
                                  id: 'ai-receptionist',
                                  label: '24/7 AI Receptionist',
                                  desc: 'Answers calls in natural UK English & books slots',
                                },
                                {
                                  id: 'missed-call-sms',
                                  label: '8-Second Missed-Call SMS',
                                  desc: 'Texts caller immediately with quote/booking link',
                                },
                                {
                                  id: 'owner-mobile',
                                  label: 'Ring Owner Mobile Direct',
                                  desc: 'Forwards 020 calls with work caller ID tag',
                                },
                              ] as const
                            ).map((mode) => (
                              <button
                                key={mode.id}
                                type="button"
                                onClick={() => setVoipMode(mode.id)}
                                className={`w-full rounded-xl border p-3 text-left transition-colors ${
                                  voipMode === mode.id
                                    ? 'border-[#34D399] bg-emerald-500/10'
                                    : 'border-white/10 bg-[#141822] hover:border-white/25'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-white">{mode.label}</span>
                                  <span className="font-mono-data text-[10px] text-[#34D399]">
                                    {voipMode === mode.id ? 'ACTIVE' : 'SELECT'}
                                  </span>
                                </div>
                                <p className="mt-0.5 text-[10.5px] text-[#A5AEBE]">{mode.desc}</p>
                              </button>
                            ))}
                          </div>

                          <div className="mt-3 rounded-xl border border-white/10 bg-[#141822] p-3">
                            <p className="font-mono-data text-[10px] text-[#FF8C73]">
                              LATEST STUDIO EDIT ({submittedEdits.length})
                            </p>
                            <p className="mt-1 text-[11px] text-[#DCE2EC]">{submittedEdits[0]}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-3">
                    <div className="flex items-center justify-between px-2 font-mono-data text-[10px] text-[#7D8596]">
                      <span>iOS · Android · Web</span>
                      <span className="text-[#34D399]">Cloudflare Edge Live</span>
                    </div>
                    <div className="mx-auto mt-2.5 h-1 w-24 rounded-full bg-white/25" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE STUDIO EDIT SANDBOX + MOBILE FIELD PHOTOGRAPHY */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)]">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <KickerRule>Try Studio Edits Right Here · Interactive Preview</KickerRule>
                <h2 className="mt-3 font-editorial text-3xl font-bold leading-tight tracking-[-0.025em] sm:text-4xl">
                  See how fast a website edit feels inside the app.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-base">
                  No CMS training manuals. Pick a common London shop change below or type your own to preview how our studio dispatch queue works — price updates synced from Competitor Price Watch above also appear here automatically.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {QUICK_EDIT_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setEditInput(preset)}
                      className="rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] px-3 py-1.5 text-left text-xs font-medium text-[var(--emtrc-ink)] transition-colors hover:border-[var(--emtrc-accent)]"
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
                      className="flex-1 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-4 py-3 text-sm text-[var(--emtrc-ink)] placeholder:text-[var(--emtrc-muted)] focus:border-[var(--emtrc-accent)] focus:outline-none"
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

            <div className="lg:col-span-6">
              <Reveal delay={0.1}>
                <div className="overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]">
                  <ParallaxFrame offset={16} className="h-[320px] sm:h-[390px] w-full">
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
                      ONE CHANGE · SYNCED EVERYWHERE
                    </p>
                    <h3 className="mt-1.5 font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                      83% of local customers find you on a phone while walking down the street.
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                      Every price, photo or opening-hour edit you send through the emtrc App updates your website, structured Schema.org data and Google Business Profile signals together so nothing falls out of sync.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FOUR ARCHITECTURAL PILLARS (Even 2x2 / 4-col Row) */}
      <section className="bg-[var(--emtrc-sand)]">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20">
          <Reveal>
            <KickerRule>Built Like Real Software — Not Agency Bloat</KickerRule>
            <h2 className="mt-3 max-w-2xl font-editorial text-3xl font-bold tracking-[-0.025em] sm:text-4xl">
              Every plan includes full Client Portal access from launch day.
            </h2>
          </Reveal>

          <StaggerContainer className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Globe,
                title: 'Domain & DNS Vault',
                body: 'Inspect your .co.uk or .com registration, renewal dates and DNS records anytime. Zero agency hostage domains.',
              },
              {
                icon: PhoneCall,
                title: 'Call & AI Transcripts',
                body: 'Review every missed-call SMS conversation, AI Receptionist booking transcript and B2B lead thread in one timeline.',
              },
              {
                icon: TrendingUp,
                title: 'Ranks & Price Intel',
                body: 'Weekly Google Maps 3-Pack rank checks and nearby competitor pricing alerts delivered without jargon.',
              },
              {
                icon: Calendar,
                title: 'Zero-Cookie Telemetry',
                body: 'Real London tap-to-call counts, booking clicks and 99.9% Cloudflare uptime without annoying cookie popups.',
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <StaggerItem key={card.title}>
                  <SpotlightCard className="h-full rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] text-[var(--emtrc-accent)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-editorial text-lg font-bold text-[var(--emtrc-ink)]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--emtrc-muted)] sm:text-sm">
                      {card.body}
                    </p>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <Reveal delay={0.08}>
            <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-[var(--emtrc-navy-border)] bg-[#0B0D12] p-7 text-white sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="font-mono-data text-[11px] text-[#FF8C73]">EXPLORE THE FULL WEB DASHBOARD</p>
                <h3 className="mt-1 font-editorial text-2xl font-bold text-white">
                  Test-drive the interactive emtrc Owner Workspace right now.
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  to="/portal?demo=1"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <Lock className="h-4 w-4" aria-hidden="true" />
                  <span>Open Demo Workspace</span>
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
