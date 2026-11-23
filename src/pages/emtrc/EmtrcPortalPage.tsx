import { useMemo, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Check,
  CheckCheck,
  Eye,
  EyeOff,
  Info,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  MapPin,
  PhoneCall,
  Plus,
  Search,
  Send,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Target,
  TrendingUp,
} from 'lucide-react';
import { SITE } from '../../content/site';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { EmtrcLogo } from '../../components/emtrc/EmtrcLogo';
import { KickerRule, Reveal } from '../../components/emtrc/Reveal';
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
  filterSeoKeywords,
  type AgentDraftItem,
  type CompetitorPriceRow,
  type MissedCallThread,
  type ReviewReplyItem,
  type SalesLeadItem,
  type SocialPostDraft,
  type VoipRoutingMode,
} from '../../utils/ownerAppData';

type WorkspaceTab =
  | 'overview'
  | 'leads'
  | 'pricing'
  | 'seo'
  | 'reviews-social'
  | 'edits-voip';

export function EmtrcPortalPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const demoMode = searchParams.get('demo') === '1';

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  // Interactive Demo Workspace state
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('overview');
  const [missedCalls, setMissedCalls] = useState<MissedCallThread[]>([...INITIAL_MISSED_CALLS]);
  const [simCallIdx, setSimCallIdx] = useState(0);
  const [agentDrafts, setAgentDrafts] = useState<AgentDraftItem[]>([...INITIAL_AGENT_DRAFTS]);
  const [salesLeads, setSalesLeads] = useState<SalesLeadItem[]>([...INITIAL_SALES_LEADS]);
  const [leadStageFilter, setLeadStageFilter] = useState<'ALL' | SalesLeadItem['stage']>('ALL');
  const [priceRows, setPriceRows] = useState<CompetitorPriceRow[]>([...INITIAL_COMPETITOR_PRICING]);
  const [seoSearch, setSeoSearch] = useState('');
  const [reviews, setReviews] = useState<ReviewReplyItem[]>([...INITIAL_REVIEWS]);
  const [socialDrafts, setSocialDrafts] = useState<SocialPostDraft[]>([...INITIAL_SOCIAL_DRAFTS]);
  const [voipMode, setVoipMode] = useState<VoipRoutingMode>('ai-receptionist');
  const [editNote, setEditNote] = useState('');
  const [editLog, setEditLog] = useState<string[]>([
    'Bank Holiday hours updated across website & Google Business Profile · Live (2h)',
    'Added 4 new shopfront WebP photos · Live (4h)',
  ]);

  const pendingApprovals = calculatePendingApprovalsCount(agentDrafts, reviews, socialDrafts);
  const recoveredValueGbp = missedCalls.reduce((sum, item) => sum + item.valueGbp, 0);
  const filteredSeo = useMemo(
    () => filterSeoKeywords(INITIAL_SEO_KEYWORDS, seoSearch),
    [seoSearch]
  );
  const filteredLeads = useMemo(
    () =>
      leadStageFilter === 'ALL'
        ? salesLeads
        : salesLeads.filter((l) => l.stage === leadStageFilter),
    [salesLeads, leadStageFilter]
  );

  const openDemoWorkspace = () => {
    setSearchParams({ demo: '1' });
  };

  const exitDemoWorkspace = () => {
    setSearchParams({});
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setStatusMessage(
        'Please enter both your client email or username and password to continue — or launch the Interactive Demo Workspace below.'
      );
      return;
    }
    setStatusMessage(
      `Client Portal sign-in is enabled once your live site launches. We could not match an active portal session for "${identifier.trim()}" yet — email ${SITE.brand.email} or test-drive the Interactive Demo Workspace below.`
    );
  };

  const handleDispatchEdit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = editNote.trim();
    if (!cleaned) return;
    setEditLog((prev) => [`${cleaned} · Queued with London studio (ETA < 4h)`, ...prev]);
    setEditNote('');
  };

  if (demoMode) {
    return (
      <EmtrcLayout hideNewsletter>
        <EmtrcHead
          title="emtrc Owner Workspace (Interactive Demo) — London Front Office"
          description="Interactive client portal preview featuring Personal AI Agents, AI Sales Leads, Competitor Pricing Intelligence, Local SEO Rank Tracking, Reviews, Social Scheduling and Studio Edits."
        />

        <section
          data-testid="portal-demo-workspace"
          className="min-h-[calc(100vh-140px)] bg-[var(--emtrc-canvas)] py-8 sm:py-10"
        >
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            {/* Workspace Top Command Header */}
            <div className="flex flex-col justify-between gap-4 border-b border-[var(--emtrc-border)] pb-6 lg:flex-row lg:items-center">
              <div>
                <p className="font-mono-data text-[11px] font-semibold uppercase tracking-wider text-[var(--emtrc-accent)]">
                  EMTRC OWNER WORKSPACE · INTERACTIVE PREVIEW · LONDON SE10 / E8
                </p>
                <h1 className="mt-1 font-editorial text-2xl font-bold text-[var(--emtrc-ink)] sm:text-3xl">
                  Kingsland &amp; Blackheath Group — Front-Office Command
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  to="/free-demo"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--emtrc-accent)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <span>Build this for my business</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  data-testid="portal-exit-demo-btn"
                  onClick={exitDemoWorkspace}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-3.5 py-2 text-xs font-semibold text-[var(--emtrc-ink)] hover:border-[var(--emtrc-accent)]"
                >
                  <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Back to sign in</span>
                </button>
              </div>
            </div>

            {/* Top 4 KPI Summary Strip (Flat hairline borders, tabular numerals) */}
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-4">
                <p className="font-mono-data text-[10.5px] uppercase tracking-wider text-[var(--emtrc-muted)]">
                  Recovered Call Value
                </p>
                <p className="mt-1.5 font-mono-data text-2xl font-bold text-[var(--emtrc-ink)] tabular-nums">
                  £{recoveredValueGbp.toLocaleString('en-GB')}
                </p>
                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                  {missedCalls.length} missed calls saved · 8s SMS
                </p>
              </div>
              <div className="rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-4">
                <p className="font-mono-data text-[10.5px] uppercase tracking-wider text-[var(--emtrc-muted)]">
                  Approvals Waiting
                </p>
                <p
                  data-testid="portal-pending-approvals"
                  className="mt-1.5 font-mono-data text-2xl font-bold text-[var(--emtrc-accent)] tabular-nums"
                >
                  {pendingApprovals}
                </p>
                <p className="mt-1 text-xs text-[var(--emtrc-muted)]">
                  AI Agent, Reviews &amp; Social queue
                </p>
              </div>
              <div className="rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-4">
                <p className="font-mono-data text-[10.5px] uppercase tracking-wider text-[var(--emtrc-muted)]">
                  Maps Top-3 Keywords
                </p>
                <p className="mt-1.5 font-mono-data text-2xl font-bold text-[var(--emtrc-ink)] tabular-nums">
                  {INITIAL_SEO_KEYWORDS.filter((k) => k.mapsRank <= 3).length} / {INITIAL_SEO_KEYWORDS.length}
                </p>
                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                  Avg +2.4 positions this week
                </p>
              </div>
              <div className="rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-4">
                <p className="font-mono-data text-[10.5px] uppercase tracking-wider text-[var(--emtrc-muted)]">
                  Studio Edits &amp; 020 Line
                </p>
                <p className="mt-1.5 font-mono-data text-2xl font-bold text-[var(--emtrc-ink)] tabular-nums">
                  {editLog.length} logged
                </p>
                <p className="mt-1 text-xs text-[var(--emtrc-muted)]">
                  Cloudflare Edge · 99.99% uptime
                </p>
              </div>
            </div>

            {/* Clean Single-Line Operational Tabs */}
            <div
              role="tablist"
              aria-label="Owner workspace sections"
              className="mt-6 flex flex-wrap gap-2 border-b border-[var(--emtrc-border)] pb-4"
            >
              {(
                [
                  { id: 'overview', label: 'AI Agent & Calls', icon: Bot },
                  { id: 'leads', label: 'AI Sales Leads', icon: Target },
                  { id: 'pricing', label: 'Competitor Pricing', icon: TrendingUp },
                  { id: 'seo', label: 'SEO & Maps Ranks', icon: MapPin },
                  { id: 'reviews-social', label: 'Reviews & Social', icon: Star },
                  { id: 'edits-voip', label: 'Studio Edits & 020 VoIP', icon: SlidersHorizontal },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    data-testid={`portal-tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-[#0B0D12] text-white dark:bg-[var(--emtrc-accent)]'
                        : 'border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB PANELS */}
            <div className="mt-6">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                  {/* Personal AI Agent Approvals */}
                  <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6 lg:col-span-7">
                    <div className="flex items-center justify-between gap-2 border-b border-[var(--emtrc-border)] pb-4">
                      <div>
                        <p className="font-mono-data text-[10.5px] font-semibold uppercase tracking-wider text-[var(--emtrc-accent)]">
                          PERSONAL AI AGENT · 07:30 OWNER BRIEF
                        </p>
                        <h2 className="mt-1 font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                          Drafted replies &amp; quote chases waiting for 1-tap approval
                        </h2>
                      </div>
                      <Bot className="h-5 w-5 text-[var(--emtrc-accent)] shrink-0" aria-hidden="true" />
                    </div>

                    <div className="mt-4 divide-y divide-[var(--emtrc-border)]">
                      {agentDrafts.map((item) => {
                        const sent = item.status === 'Approved & sent';
                        return (
                          <div key={item.id} className="py-4 first:pt-1 last:pb-0">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="font-mono-data text-[11px] font-semibold text-[var(--emtrc-accent)]">
                                {item.category} · {item.recipient}
                              </span>
                              <span
                                className={`font-mono-data text-[11px] font-semibold ${
                                  sent
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : 'text-amber-600 dark:text-amber-400'
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>
                            <p className="mt-1 text-sm font-semibold text-[var(--emtrc-ink)]">
                              {item.subject}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-[var(--emtrc-muted)]">
                              {item.draftPreview}
                            </p>
                            {!sent && (
                              <button
                                type="button"
                                data-testid={`portal-approve-agent-${item.id}`}
                                onClick={() =>
                                  setAgentDrafts((prev) =>
                                    prev.map((a) =>
                                      a.id === item.id ? { ...a, status: 'Approved & sent' } : a
                                    )
                                  )
                                }
                                className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[var(--emtrc-accent)] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
                              >
                                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>Approve &amp; Send</span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live Missed-Call Catcher Feed */}
                  <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6 lg:col-span-5">
                    <div className="flex items-center justify-between gap-2 border-b border-[var(--emtrc-border)] pb-4">
                      <div>
                        <p className="font-mono-data text-[10.5px] font-semibold uppercase tracking-wider text-[var(--emtrc-accent)]">
                          MISSED-CALL SMS CATCHER
                        </p>
                        <h2 className="mt-1 font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                          Live recovered enquiries
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const next = createSimulatedMissedCall(simCallIdx);
                          setSimCallIdx((c) => c + 1);
                          setMissedCalls((prev) => [next, ...prev]);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] px-3 py-1.5 text-xs font-semibold text-[var(--emtrc-ink)] hover:border-[var(--emtrc-accent)]"
                      >
                        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Simulate call</span>
                      </button>
                    </div>

                    <div className="mt-4 divide-y divide-[var(--emtrc-border)]">
                      {missedCalls.map((call) => (
                        <div key={call.id} className="py-3.5 first:pt-1 last:pb-0">
                          <div className="flex items-center justify-between gap-2 font-mono-data text-xs">
                            <span className="font-bold text-[var(--emtrc-ink)]">
                              {call.caller} ({call.postcode})
                            </span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                              {call.status} · £{call.valueGbp}
                            </span>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-[var(--emtrc-muted)]">
                            {call.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'leads' && (
                <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6">
                  <div className="flex flex-col justify-between gap-4 border-b border-[var(--emtrc-border)] pb-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="font-mono-data text-[10.5px] font-semibold uppercase tracking-wider text-[var(--emtrc-accent)]">
                        AI SALES LEADS · LONDON B2B PIPELINE
                      </p>
                      <h2 className="mt-1 font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                        Local commercial contracts &amp; warm introductions
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(['ALL', 'New prospect', 'Intro sent', 'Call booked'] as const).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setLeadStageFilter(st)}
                          className={`rounded-lg px-3 py-1.5 font-mono-data text-xs font-semibold ${
                            leadStageFilter === st
                              ? 'bg-[var(--emtrc-accent)] text-white'
                              : 'border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left text-sm">
                      <thead className="border-b border-[var(--emtrc-border)] font-mono-data text-[11px] uppercase text-[var(--emtrc-muted)]">
                        <tr>
                          <th className="py-3 pr-4">Prospect &amp; Role</th>
                          <th className="py-3 pr-4">Borough</th>
                          <th className="py-3 pr-4">Buying Signal</th>
                          <th className="py-3 pr-4">Est. Value</th>
                          <th className="py-3 pr-4">Stage</th>
                          <th className="py-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--emtrc-border)] text-xs sm:text-sm">
                        {filteredLeads.map((lead) => (
                          <tr key={lead.id}>
                            <td className="py-4 pr-4">
                              <p className="font-semibold text-[var(--emtrc-ink)]">{lead.company}</p>
                              <p className="text-xs text-[var(--emtrc-muted)]">{lead.contactRole}</p>
                            </td>
                            <td className="py-4 pr-4 font-mono-data text-xs text-[var(--emtrc-muted)] whitespace-nowrap">
                              {lead.borough}
                            </td>
                            <td className="py-4 pr-4 max-w-xs text-xs text-[var(--emtrc-muted)]">
                              {lead.signal}
                            </td>
                            <td className="py-4 pr-4 font-mono-data font-bold text-[var(--emtrc-ink)] tabular-nums whitespace-nowrap">
                              £{lead.estimatedMonthlyValue}/mo
                            </td>
                            <td className="py-4 pr-4 font-mono-data text-xs font-semibold text-[var(--emtrc-accent)] whitespace-nowrap">
                              {lead.stage}
                            </td>
                            <td className="py-4 text-right whitespace-nowrap">
                              {lead.stage === 'Call booked' ? (
                                <span className="font-mono-data text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                  In diary
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSalesLeads((prev) =>
                                      prev.map((item) =>
                                        item.id === lead.id
                                          ? {
                                              ...item,
                                              stage:
                                                item.stage === 'New prospect'
                                                  ? 'Intro sent'
                                                  : 'Call booked',
                                            }
                                          : item
                                      )
                                    )
                                  }
                                  className="rounded-lg bg-[var(--emtrc-accent)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
                                >
                                  {lead.stage === 'New prospect' ? 'Send Intro' : 'Mark Booked'}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'pricing' && (
                <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6">
                  <div className="border-b border-[var(--emtrc-border)] pb-4">
                    <p className="font-mono-data text-[10.5px] font-semibold uppercase tracking-wider text-[var(--emtrc-accent)]">
                      COMPETITOR PRICING INTELLIGENCE · WEEKLY LONDON BENCHMARK
                    </p>
                    <h2 className="mt-1 font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                      Compare your service rates against nearby borough rivals
                    </h2>
                  </div>

                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[700px] text-left text-sm">
                      <thead className="border-b border-[var(--emtrc-border)] font-mono-data text-[11px] uppercase text-[var(--emtrc-muted)]">
                        <tr>
                          <th className="py-3 pr-4">Service</th>
                          <th className="py-3 pr-4">Your Price</th>
                          <th className="py-3 pr-4">Borough Median</th>
                          <th className="py-3 pr-4">Top Local Rival</th>
                          <th className="py-3 pr-4">Position</th>
                          <th className="py-3 text-right">Sync</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--emtrc-border)] text-xs sm:text-sm">
                        {priceRows.map((row) => {
                          const gap = calculatePriceGapPercent(row.yourPrice, row.boroughMedian);
                          return (
                            <tr key={row.id}>
                              <td className="py-4 pr-4 font-semibold text-[var(--emtrc-ink)]">
                                {row.service}
                              </td>
                              <td className="py-4 pr-4 font-mono-data font-bold text-[var(--emtrc-ink)] tabular-nums">
                                £{row.yourPrice}
                              </td>
                              <td className="py-4 pr-4 font-mono-data text-[var(--emtrc-muted)] tabular-nums">
                                £{row.boroughMedian}
                              </td>
                              <td className="py-4 pr-4 text-xs text-[var(--emtrc-muted)]">
                                {row.topRivalName}{' '}
                                <span className="font-mono-data font-semibold text-[var(--emtrc-ink)] tabular-nums">
                                  (£{row.topRivalPrice})
                                </span>
                              </td>
                              <td className="py-4 pr-4 font-mono-data text-xs font-semibold tabular-nums">
                                <span
                                  className={
                                    gap < 0
                                      ? 'text-amber-600 dark:text-amber-400'
                                      : 'text-emerald-600 dark:text-emerald-400'
                                  }
                                >
                                  {gap > 0 ? `+${gap}%` : `${gap}%`} vs median
                                </span>
                              </td>
                              <td className="py-4 text-right whitespace-nowrap">
                                <button
                                  type="button"
                                  disabled={Boolean(row.synced)}
                                  onClick={() => {
                                    const target = row.boroughMedian;
                                    setPriceRows((prev) =>
                                      prev.map((r) =>
                                        r.id === row.id ? { ...r, yourPrice: target, synced: true } : r
                                      )
                                    );
                                    setEditLog((prev) => [
                                      `Price sync: "${row.service}" updated to £${target} (borough median) · Queued`,
                                      ...prev,
                                    ]);
                                  }}
                                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                                    row.synced
                                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                                      : 'bg-[var(--emtrc-accent)] text-white hover:bg-[var(--emtrc-accent-hover)]'
                                  }`}
                                >
                                  {row.synced ? 'Synced to Studio' : 'Match Median'}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6">
                  <div className="flex flex-col justify-between gap-4 border-b border-[var(--emtrc-border)] pb-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="font-mono-data text-[10.5px] font-semibold uppercase tracking-wider text-[var(--emtrc-accent)]">
                        LOCAL SEO &amp; GOOGLE MAPS 3-PACK TRACKER
                      </p>
                      <h2 className="mt-1 font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                        London postcode keyword rankings
                      </h2>
                    </div>
                    <div className="relative w-full sm:w-64">
                      <Search
                        className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--emtrc-muted)]"
                        aria-hidden="true"
                      />
                      <input
                        type="search"
                        value={seoSearch}
                        onChange={(e) => setSeoSearch(e.target.value)}
                        placeholder="Filter postcode or trade…"
                        aria-label="Filter tracked SEO keywords"
                        className="w-full rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] py-2 pr-3 pl-9 text-xs text-[var(--emtrc-ink)] focus:border-[var(--emtrc-accent)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[640px] text-left text-sm">
                      <thead className="border-b border-[var(--emtrc-border)] font-mono-data text-[11px] uppercase text-[var(--emtrc-muted)]">
                        <tr>
                          <th className="py-3 pr-4">Tracked Search Phrase</th>
                          <th className="py-3 pr-4">Postcode</th>
                          <th className="py-3 pr-4">Maps Rank</th>
                          <th className="py-3 pr-4">7-Day Delta</th>
                          <th className="py-3 pr-4">Est. Monthly Searches</th>
                          <th className="py-3 text-right">Gap to #1</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--emtrc-border)] text-xs sm:text-sm">
                        {filteredSeo.map((row) => (
                          <tr key={row.id}>
                            <td className="py-3.5 pr-4 font-semibold text-[var(--emtrc-ink)]">
                              {row.keyword}
                            </td>
                            <td className="py-3.5 pr-4 font-mono-data text-xs text-[var(--emtrc-muted)]">
                              {row.postcode}
                            </td>
                            <td className="py-3.5 pr-4 font-mono-data font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                              #{row.mapsRank} in 3-Pack
                            </td>
                            <td className="py-3.5 pr-4 font-mono-data text-xs font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                              +{row.weeklyDelta} spots
                            </td>
                            <td className="py-3.5 pr-4 font-mono-data text-xs text-[var(--emtrc-muted)] tabular-nums">
                              {row.monthlySearches.toLocaleString('en-GB')}/mo
                            </td>
                            <td className="py-3.5 text-right font-mono-data text-xs text-[var(--emtrc-ink)] tabular-nums">
                              {row.reviewsBehindFirst === 0
                                ? 'Leading #1'
                                : `${row.reviewsBehindFirst} reviews`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'reviews-social' && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Google Reviews */}
                  <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6">
                    <div className="flex items-center justify-between border-b border-[var(--emtrc-border)] pb-4">
                      <div>
                        <p className="font-mono-data text-[10.5px] font-semibold uppercase tracking-wider text-[var(--emtrc-accent)]">
                          GOOGLE REVIEWS · UK DMCC COMPLIANT
                        </p>
                        <h2 className="mt-1 font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                          1-tap owner reply approvals
                        </h2>
                      </div>
                      <Star className="h-5 w-5 text-amber-500" aria-hidden="true" />
                    </div>
                    <div className="mt-4 divide-y divide-[var(--emtrc-border)]">
                      {reviews.map((rev) => {
                        const live = rev.status === 'Published on Google';
                        return (
                          <div key={rev.id} className="py-4 first:pt-1 last:pb-0">
                            <div className="flex items-center justify-between gap-2 text-xs">
                              <span className="font-semibold text-[var(--emtrc-ink)]">
                                {rev.author} · {rev.borough} (★★★★★)
                              </span>
                              <span
                                className={`font-mono-data font-semibold ${
                                  live
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : 'text-amber-600 dark:text-amber-400'
                                }`}
                              >
                                {rev.status}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-[var(--emtrc-muted)]">{rev.excerpt}</p>
                            <p className="mt-2 rounded-lg bg-[var(--emtrc-canvas)] p-2.5 text-xs text-[var(--emtrc-ink)]">
                              <span className="font-semibold">Draft reply: </span>
                              {rev.draftReply}
                            </p>
                            {!live && (
                              <button
                                type="button"
                                onClick={() =>
                                  setReviews((prev) =>
                                    prev.map((r) =>
                                      r.id === rev.id ? { ...r, status: 'Published on Google' } : r
                                    )
                                  )
                                }
                                className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-[var(--emtrc-accent)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
                              >
                                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>Approve &amp; Publish</span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* AI Social Scheduler */}
                  <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6">
                    <div className="flex items-center justify-between border-b border-[var(--emtrc-border)] pb-4">
                      <div>
                        <p className="font-mono-data text-[10.5px] font-semibold uppercase tracking-wider text-[var(--emtrc-accent)]">
                          AI SOCIAL MANAGEMENT · WEEKLY QUEUE
                        </p>
                        <h2 className="mt-1 font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                          Instagram &amp; Google Business schedule
                        </h2>
                      </div>
                      <Share2 className="h-5 w-5 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    </div>
                    <div className="mt-4 divide-y divide-[var(--emtrc-border)]">
                      {socialDrafts.map((post) => {
                        const scheduled = post.status === 'Scheduled';
                        return (
                          <div key={post.id} className="py-4 first:pt-1 last:pb-0">
                            <div className="flex items-center justify-between gap-2 font-mono-data text-xs">
                              <span className="font-semibold text-[var(--emtrc-accent)]">
                                {post.channel} · {post.scheduledFor}
                              </span>
                              <span
                                className={`font-semibold ${
                                  scheduled
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : 'text-amber-600 dark:text-amber-400'
                                }`}
                              >
                                {post.status}
                              </span>
                            </div>
                            <p className="mt-1 text-sm font-semibold text-[var(--emtrc-ink)]">
                              {post.title}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-[var(--emtrc-muted)]">
                              {post.caption}
                            </p>
                            {!scheduled && (
                              <button
                                type="button"
                                onClick={() =>
                                  setSocialDrafts((prev) =>
                                    prev.map((p) =>
                                      p.id === post.id ? { ...p, status: 'Scheduled' } : p
                                    )
                                  )
                                }
                                className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-[var(--emtrc-accent)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
                              >
                                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>Approve &amp; Schedule</span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'edits-voip' && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Studio Edits */}
                  <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6">
                    <p className="font-mono-data text-[10.5px] font-semibold uppercase tracking-wider text-[var(--emtrc-accent)]">
                      24-HOUR LONDON STUDIO EDITS
                    </p>
                    <h2 className="mt-1 font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                      Dispatch a website update
                    </h2>
                    <form onSubmit={handleDispatchEdit} className="mt-4 flex gap-2">
                      <input
                        type="text"
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                        placeholder="e.g. Add Easter Monday opening hours to header…"
                        className="flex-1 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] px-3.5 py-2.5 text-xs text-[var(--emtrc-ink)] focus:border-[var(--emtrc-accent)] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--emtrc-accent)] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
                      >
                        <Send className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Dispatch</span>
                      </button>
                    </form>
                    <div className="mt-4 space-y-2">
                      {editLog.map((item, i) => (
                        <div
                          key={`${item}-${i}`}
                          className="flex items-start gap-2 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] p-3 text-xs text-[var(--emtrc-ink)]"
                        >
                          <CheckCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--emtrc-accent)]" aria-hidden="true" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 020 VoIP Routing */}
                  <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-mono-data text-[10.5px] font-semibold uppercase tracking-wider text-[var(--emtrc-accent)]">
                          020 7946 0412 · CLOUD VOIP (PSTN 2027 READY)
                        </p>
                        <h2 className="mt-1 font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                          After-hours &amp; busy call routing
                        </h2>
                      </div>
                      <PhoneCall className="h-5 w-5 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    </div>
                    <div className="mt-4 space-y-2.5">
                      {(
                        [
                          {
                            id: 'ai-receptionist',
                            title: '24/7 AI Receptionist',
                            desc: 'Answers in natural UK English, quotes standard rates and texts summary.',
                          },
                          {
                            id: 'missed-call-sms',
                            title: '8-Second Missed-Call SMS Catcher',
                            desc: 'Sends instant branded text with direct booking/quote link after 4 rings.',
                          },
                          {
                            id: 'owner-mobile',
                            title: 'Direct Owner Mobile Divert',
                            desc: 'Rings your personal mobile with a distinct “020 Shop Line” caller tag.',
                          },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setVoipMode(opt.id)}
                          className={`w-full rounded-xl border p-4 text-left transition-colors ${
                            voipMode === opt.id
                              ? 'border-[var(--emtrc-accent)] bg-[var(--emtrc-sand)]'
                              : 'border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] hover:border-[var(--emtrc-ink)]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-[var(--emtrc-ink)]">
                              {opt.title}
                            </span>
                            <span className="font-mono-data text-[11px] font-bold text-[var(--emtrc-accent)]">
                              {voipMode === opt.id ? 'ACTIVE' : 'SWITCH'}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-[var(--emtrc-muted)]">{opt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </EmtrcLayout>
    );
  }

  return (
    <EmtrcLayout hideNewsletter>
      <EmtrcHead
        title="Client Portal Sign In — emtrc London"
        description="Sign in to the emtrc Client Portal or launch our interactive owner workspace demo covering Personal AI Agents, AI Sales Leads, Competitor Pricing, SEO Ranks and 24-hour Studio Edits."
      />

      <section className="hero-editorial-wash min-h-[calc(100vh-140px)] py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] shadow-xl lg:grid-cols-12">
            {/* Left Obsidian Studio Panel */}
            <div className="flex flex-col justify-between bg-[#0B0D12] p-8 text-white sm:p-10 lg:col-span-5">
              <div>
                <EmtrcLogo inverted size="lg" />
                <div className="mt-8">
                  <KickerRule light>emtrc Client Portal &amp; Owner OS</KickerRule>
                  <h1 className="mt-3 font-editorial text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-white sm:text-4xl">
                    Your website, AI agents, leads &amp; rankings in one place.
                  </h1>
                  <p className="mt-4 text-sm leading-relaxed text-[#A8B1C2]">
                    Active emtrc clients manage 24-hour website edits, Personal AI Agent drafts, B2B sales leads, competitor price benchmarks, Google Maps ranks and 020 Cloud VoIP routing from one clean workspace.
                  </p>
                </div>

                <ul className="mt-7 space-y-2.5 border-t border-white/10 pt-6 text-sm text-[#DCE2EC]">
                  {[
                    'Personal AI Agent 07:30 brief & 1-tap approvals',
                    'AI Sales Leads & Competitor Price Watch benchmarks',
                    'Google Maps 3-Pack SEO ranks & review reply queue',
                    '24-hour London studio edits & 020 Cloud VoIP controls',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#FF8C73]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <button
                    type="button"
                    data-testid="portal-launch-demo-btn"
                    onClick={openDemoWorkspace}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#FF8C73]/60 bg-[#FF8C73]/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent)]"
                  >
                    <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                    <span>Launch Interactive Demo Workspace</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5 text-xs text-[#98A0B2]">
                <p className="inline-flex items-center gap-1.5 font-medium text-white">
                  <ShieldCheck className="h-4 w-4 text-[#FF8C73]" aria-hidden="true" />
                  UK &amp; EU encrypted infrastructure
                </p>
                <p className="mt-2">
                  Need onboarding help? Email{' '}
                  <a
                    href={`mailto:${SITE.brand.email}`}
                    className="font-semibold text-white underline underline-offset-4 hover:text-[#FF8C73]"
                  >
                    {SITE.brand.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Right Clean Login Form */}
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-7">
              <Reveal immediate>
                <div className="mx-auto w-full max-w-[420px]">
                  <p className="font-mono-data text-[11px] font-semibold tracking-wider text-[var(--emtrc-accent)]">
                    SECURE ACCOUNT ACCESS
                  </p>
                  <h2 className="mt-2 font-editorial text-2xl font-bold text-[var(--emtrc-ink)] sm:text-3xl">
                    Sign in to Client Portal
                  </h2>
                  <p className="mt-2 text-sm text-[var(--emtrc-muted)]">
                    Enter the business email or username provided in your emtrc launch pack, or test-drive the interactive workspace preview.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    data-testid="portal-login-form"
                    className="mt-7 space-y-5"
                  >
                    <div>
                      <label
                        htmlFor="portal-username"
                        className="block text-xs font-semibold text-[var(--emtrc-ink)]"
                      >
                        Email or username
                      </label>
                      <div className="relative mt-1.5">
                        <Mail
                          className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--emtrc-muted)]"
                          aria-hidden="true"
                        />
                        <input
                          id="portal-username"
                          data-testid="portal-username-input"
                          name="username"
                          type="text"
                          autoComplete="username"
                          value={identifier}
                          onChange={(e) => {
                            setIdentifier(e.target.value);
                            if (statusMessage) setStatusMessage(null);
                          }}
                          placeholder="owner@yourbusiness.co.uk"
                          className="w-full rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] py-3 pr-4 pl-10 text-sm text-[var(--emtrc-ink)] placeholder:text-[var(--emtrc-muted)]/70 transition-colors focus:border-[var(--emtrc-accent)] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="portal-password"
                          className="block text-xs font-semibold text-[var(--emtrc-ink)]"
                        >
                          Password
                        </label>
                        <a
                          href={`mailto:${SITE.brand.email}?subject=Client%20Portal%20password%20reset`}
                          className="text-xs font-medium text-[var(--emtrc-accent)] hover:underline"
                        >
                          Reset password
                        </a>
                      </div>
                      <div className="relative mt-1.5">
                        <Lock
                          className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--emtrc-muted)]"
                          aria-hidden="true"
                        />
                        <input
                          id="portal-password"
                          data-testid="portal-password-input"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (statusMessage) setStatusMessage(null);
                          }}
                          placeholder="••••••••••••"
                          className="w-full rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] py-3 pr-11 pl-10 text-sm text-[var(--emtrc-ink)] placeholder:text-[var(--emtrc-muted)]/70 transition-colors focus:border-[var(--emtrc-accent)] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          className="absolute top-1/2 right-3 -translate-y-1/2 rounded p-1 text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <Eye className="h-4 w-4" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </div>

                    <label className="flex items-center gap-2.5 text-xs text-[var(--emtrc-muted)] cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberDevice}
                        onChange={(e) => setRememberDevice(e.target.checked)}
                        className="h-4 w-4 rounded border-[var(--emtrc-border)] accent-[var(--emtrc-accent)]"
                      />
                      <span>Keep me signed in on this device for 30 days</span>
                    </label>

                    <button
                      type="submit"
                      data-testid="portal-submit-button"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                    >
                      <span>Sign in to Client Portal</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </form>

                  {statusMessage && (
                    <motion.div
                      role="status"
                      data-testid="portal-status-notice"
                      initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-5 flex items-start gap-3 rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] p-4 text-xs leading-relaxed text-[var(--emtrc-ink)]"
                    >
                      <Info
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emtrc-accent)]"
                        aria-hidden="true"
                      />
                      <div>
                        <p>{statusMessage}</p>
                        <button
                          type="button"
                          onClick={openDemoWorkspace}
                          className="mt-2 inline-flex items-center gap-1 font-semibold text-[var(--emtrc-accent)] hover:underline"
                        >
                          <span>Try the Interactive Demo Workspace now</span>
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  <div className="mt-8 border-t border-[var(--emtrc-border)] pt-6 text-xs text-[var(--emtrc-muted)]">
                    <p>
                      Want to explore the mobile pocket app modules first?{' '}
                      <Link
                        to="/app"
                        className="font-semibold text-[var(--emtrc-ink)] underline underline-offset-4 hover:text-[var(--emtrc-accent)]"
                      >
                        Tour the 8-module emtrc App →
                      </Link>
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </EmtrcLayout>
  );
}
