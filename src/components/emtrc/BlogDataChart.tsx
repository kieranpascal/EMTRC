import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface BlogDataChartProps {
  chartId: string;
}

const CHART_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Interactive, Framer Motion animated editorial data visualisations embedded directly
 * inside static Markdown blog guides. Strictly uses IBM Plex Mono tabular numerals.
 */
export function BlogDataChart({ chartId }: BlogDataChartProps) {
  const prefersReduced = useReducedMotion();

  switch (chartId) {
    case 'pstn-cost-timeline':
      return <PstnCostChart prefersReduced={Boolean(prefersReduced)} />;
    case 'maps-ranking-weights':
      return <MapsRankingChart prefersReduced={Boolean(prefersReduced)} />;
    case 'missed-call-roi':
      return <MissedCallRoiChart prefersReduced={Boolean(prefersReduced)} />;
    case 'speed-conversion':
      return <SpeedConversionChart prefersReduced={Boolean(prefersReduced)} />;
    case 'ai-search-share':
      return <AiSearchShareChart prefersReduced={Boolean(prefersReduced)} />;
    case 'agency-ownership':
      return <AgencyOwnershipChart prefersReduced={Boolean(prefersReduced)} />;
    default:
      return <PstnCostChart prefersReduced={Boolean(prefersReduced)} />;
  }
}

function ChartFrame({
  kicker,
  title,
  subtitle,
  footnote,
  children,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  footnote: string;
  children: React.ReactNode;
}) {
  return (
    <figure
      data-testid="blog-interactive-chart"
      className="my-8 overflow-hidden rounded-2xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] p-6 text-[#F5F4F0] shadow-lg sm:p-7"
    >
      <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
        <p className="font-mono-data text-[11px] font-semibold uppercase tracking-wider text-[var(--emtrc-brass-light)]">
          {kicker}
        </p>
        <h3 className="font-editorial text-xl font-bold text-white sm:text-2xl">{title}</h3>
        <p className="text-xs leading-relaxed text-[#9BA3B5]">{subtitle}</p>
      </div>
      <div className="mt-5">{children}</div>
      <figcaption className="mt-5 border-t border-white/10 pt-3 font-mono-data text-[11px] text-[#8E96A8]">
        {footnote}
      </figcaption>
    </figure>
  );
}

/* 1. PSTN 2027 Switch-off Cost & Readiness Chart */
function PstnCostChart({ prefersReduced }: { prefersReduced: boolean }) {
  const [view, setView] = useState<'monthly' | 'annual'>('monthly');
  const mult = view === 'annual' ? 12 : 1;
  const rows = [
    { label: 'Out-of-contract copper PSTN (2026–27)', cost: 44 * mult, max: 52 * mult, tone: 'bg-[#FF6B5B]', tag: 'Retiring 31 Jan 2027' },
    { label: 'Legacy ISDN2 twin business line', cost: 52 * mult, max: 52 * mult, tone: 'bg-[#E23B2D]', tag: 'Stop-sell active' },
    { label: 'Cloud VoIP 020 + Mobile App (emtrc)', cost: 14 * mult, max: 52 * mult, tone: 'bg-emerald-400', tag: 'Future-proof' },
  ];

  return (
    <ChartFrame
      kicker="Interactive Cost Benchmark · UK Telecoms 2026–2027"
      title="Legacy Copper PSTN vs Cloud VoIP 020 Number"
      subtitle="Toggle monthly vs annual spend to see what London shops save by porting early."
      footnote="Source: Typical UK single-line SME tariffs (Openreach PSTN retirement deadline: 31 January 2027)."
    >
      <div className="mb-5 flex items-center gap-2">
        {(['monthly', 'annual'] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setView(mode)}
            className={`rounded-lg px-3 py-1.5 font-mono-data text-xs font-semibold transition-colors ${
              view === mode
                ? 'bg-[var(--emtrc-accent)] text-white'
                : 'border border-white/15 bg-white/5 text-[#C2C9D9] hover:bg-white/10'
            }`}
          >
            {mode === 'monthly' ? 'Monthly (£/mo)' : 'Annual (£/yr)'}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {rows.map((row, idx) => {
          const pct = Math.round((row.cost / row.max) * 100);
          return (
            <div key={row.label}>
              <div className="flex items-baseline justify-between gap-3 text-xs">
                <span className="font-medium text-white">{row.label}</span>
                <span className="font-mono-data font-semibold text-white">
                  £{row.cost.toLocaleString('en-GB')}
                  <span className="text-[#8E96A8]">/{view === 'monthly' ? 'mo' : 'yr'}</span>
                </span>
              </div>
              <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={prefersReduced ? false : { width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: CHART_EASE }}
                  className={`h-full rounded-full ${row.tone}`}
                />
              </div>
              <p className="mt-1 font-mono-data text-[10px] text-[#9BA3B5]">{row.tag}</p>
            </div>
          );
        })}
      </div>
    </ChartFrame>
  );
}

/* 2. Google Maps Local 3-Pack Ranking Signals */
function MapsRankingChart({ prefersReduced }: { prefersReduced: boolean }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const factors = [
    { name: 'Primary & Secondary Categories', weight: 32, note: 'Exact trade category match + populated Services tab is the #1 Local Pack ranking driver.' },
    { name: 'Review Recency, Velocity & Replies', weight: 24, note: '4–8 steady DMCC-compliant reviews per month beat older stagnant profiles.' },
    { name: 'Fast .co.uk Website & LocalBusiness Schema', weight: 21, note: 'Matching NAP, borough pages and sub-second mobile speed verify trust.' },
    { name: 'Proximity & Service-Area Clarity', weight: 14, note: 'Consistent postcode alignment across Google, Apple Maps and Bing.' },
    { name: 'Monthly Real Documentary Photography', weight: 9, note: 'Fresh daylight shop/work photos prove active trading to Google vision checks.' },
  ];

  const active = factors[selectedIdx];

  return (
    <ChartFrame
      kicker="Animated Signal Weighting · London Local 3-Pack"
      title="What Actually Moves a London Shop Into Google Maps Top 3"
      subtitle="Click any factor bar to inspect the specific Friday-afternoon action behind it."
      footnote="Relative weighting synthesized from UK local pack field audits across London service businesses."
    >
      <div className="space-y-3">
        {factors.map((f, idx) => (
          <button
            key={f.name}
            type="button"
            onClick={() => setSelectedIdx(idx)}
            className={`w-full rounded-xl border p-3 text-left transition-colors ${
              selectedIdx === idx
                ? 'border-[var(--emtrc-brass-light)] bg-white/[0.07]'
                : 'border-white/10 bg-white/[0.02] hover:border-white/25'
            }`}
          >
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-white">{f.name}</span>
              <span className="font-mono-data font-bold text-[var(--emtrc-brass-light)]">{f.weight}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={prefersReduced ? false : { width: 0 }}
                whileInView={{ width: `${(f.weight / 35) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: idx * 0.08, ease: CHART_EASE }}
                className="h-full rounded-full bg-gradient-to-r from-[#E23B2D] to-[#FF8C73]"
              />
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 text-xs leading-relaxed text-[#D8DFEE]">
        <span className="font-mono-data font-semibold text-[var(--emtrc-brass-light)]">Action note: </span>
        {active.note}
      </div>
    </ChartFrame>
  );
}

/* 3. Interactive Missed-Call Revenue Recovery Calculator */
function MissedCallRoiChart({ prefersReduced }: { prefersReduced: boolean }) {
  const [missedPerWeek, setMissedPerWeek] = useState(5);
  const [avgJobValue, setAvgJobValue] = useState(180);

  const monthlyMissed = missedPerWeek * 4;
  const lostMonthly = Math.round(monthlyMissed * 0.78 * avgJobValue);
  const rescuedMonthly = Math.round(monthlyMissed * 0.4 * avgJobValue);
  const rescuedPct = Math.min(100, Math.round((rescuedMonthly / Math.max(1, lostMonthly)) * 100));

  return (
    <ChartFrame
      kicker="Interactive Revenue Simulator · 8-Second SMS Recovery"
      title="Estimate Monthly Revenue Lost to Voicemail vs Rescued"
      subtitle="Adjust your missed calls per week and average London job value to see live payback maths."
      footnote="Assumes conservative 78% hang-up rate on carrier voicemail and 40% save rate via 8-second SMS text-back."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
          <div className="flex justify-between text-xs">
            <span className="text-[#C2C9D9]">Missed new calls / week</span>
            <span className="font-mono-data font-bold text-white">{missedPerWeek} calls</span>
          </div>
          <input
            type="range"
            min={2}
            max={15}
            value={missedPerWeek}
            onChange={(e) => setMissedPerWeek(Number(e.target.value))}
            className="mt-2.5 w-full accent-[#E23B2D]"
          />
        </label>

        <label className="block rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
          <div className="flex justify-between text-xs">
            <span className="text-[#C2C9D9]">Average job / booking value</span>
            <span className="font-mono-data font-bold text-white">£{avgJobValue}</span>
          </div>
          <input
            type="range"
            min={35}
            max={350}
            step={5}
            value={avgJobValue}
            onChange={(e) => setAvgJobValue(Number(e.target.value))}
            className="mt-2.5 w-full accent-[#E23B2D]"
          />
        </label>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-red-500/25 bg-red-500/10 p-4">
          <p className="font-mono-data text-[10px] uppercase tracking-wider text-[#FF8C73]">
            Lost to voicemail / month
          </p>
          <p className="mt-1 font-mono-data text-2xl font-bold text-white">
            £{lostMonthly.toLocaleString('en-GB')}
          </p>
        </div>
        <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-4">
          <p className="font-mono-data text-[10px] uppercase tracking-wider text-emerald-300">
            Rescued by 8s SMS / month
          </p>
          <p className="mt-1 font-mono-data text-2xl font-bold text-white">
            +£{rescuedMonthly.toLocaleString('en-GB')}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between font-mono-data text-[11px] text-[#9BA3B5]">
          <span>Recovery share captured</span>
          <span className="text-emerald-300">{rescuedPct}% of at-risk revenue</span>
        </div>
        <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            animate={prefersReduced ? undefined : { width: `${rescuedPct}%` }}
            style={prefersReduced ? { width: `${rescuedPct}%` } : undefined}
            transition={{ duration: 0.45, ease: CHART_EASE }}
            className="h-full rounded-full bg-emerald-400"
          />
        </div>
      </div>
    </ChartFrame>
  );
}

/* 4. Mobile 4G Load Time vs Visitor Retention Curve */
function SpeedConversionChart({ prefersReduced }: { prefersReduced: boolean }) {
  const points = [
    { sec: '0.9s', label: 'emtrc Edge Static', retain: 94, tone: 'bg-emerald-400' },
    { sec: '2.2s', label: 'Clean Modern Site', retain: 79, tone: 'bg-amber-400' },
    { sec: '4.5s', label: 'Bloated WordPress', retain: 49, tone: 'bg-orange-500' },
    { sec: '6.8s', label: 'Heavy Wix / PDF Menu', retain: 28, tone: 'bg-[#E23B2D]' },
  ];

  return (
    <ChartFrame
      kicker="Mobile 4G Field Telemetry · London High Street"
      title="Percentage of Google Maps Visitors Still on Your Site Before First Paint"
      subtitle="Every extra second over London 4G sheds high-intent neighbours straight back to Google Maps."
      footnote="Illustrative mobile retention decay curve based on Google Core Web Vitals & London 4G testing."
    >
      <div className="grid grid-cols-4 items-end gap-3 pt-4 sm:gap-5">
        {points.map((pt, idx) => (
          <div key={pt.sec} className="flex flex-col items-center">
            <span className="font-mono-data text-sm font-bold text-white">{pt.retain}%</span>
            <div className="mt-2 flex h-40 w-full items-end overflow-hidden rounded-t-lg bg-white/8 p-1">
              <motion.div
                initial={prefersReduced ? false : { height: 0 }}
                whileInView={{ height: `${pt.retain}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: idx * 0.1, ease: CHART_EASE }}
                className={`w-full rounded-t-md ${pt.tone}`}
              />
            </div>
            <p className="mt-2 font-mono-data text-xs font-bold text-[var(--emtrc-brass-light)]">{pt.sec}</p>
            <p className="mt-0.5 text-center text-[10px] leading-tight text-[#9BA3B5]">{pt.label}</p>
          </div>
        ))}
      </div>
    </ChartFrame>
  );
}

/* 5. AI Local Search Discovery Share */
function AiSearchShareChart({ prefersReduced }: { prefersReduced: boolean }) {
  const channels = [
    { name: 'Google Maps & Local Pack', pct: 58, color: '#E23B2D' },
    { name: 'ChatGPT / Perplexity Local Prompts', pct: 18, color: '#FF8C73' },
    { name: 'Apple Maps / Siri / Spotlight', pct: 15, color: '#38BDF8' },
    { name: 'Direct Word-of-Mouth & Directories', pct: 9, color: '#94A3B8' },
  ];

  return (
    <ChartFrame
      kicker="London Urban Commuter Search Mix · 2026"
      title="Where Local Service Shortlists Originate on Mobile"
      subtitle="Structured LocalBusiness JSON-LD + Apple Business Connect captures the 33% non-Google discovery slice."
      footnote="Composite mobile discovery channel estimate for Zone 1–4 London local service enquiries."
    >
      <div className="flex h-5 w-full overflow-hidden rounded-full bg-white/10">
        {channels.map((c, idx) => (
          <motion.div
            key={c.name}
            initial={prefersReduced ? false : { width: 0 }}
            whileInView={{ width: `${c.pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: CHART_EASE }}
            style={{ backgroundColor: c.color }}
            className="h-full"
            title={`${c.name}: ${c.pct}%`}
          />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {channels.map((c) => (
          <div key={c.name} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs">
            <span className="flex items-center gap-2 text-[#E5E7EB]">
              <span className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ backgroundColor: c.color }} />
              {c.name}
            </span>
            <span className="font-mono-data font-bold text-white">{c.pct}%</span>
          </div>
        ))}
      </div>
    </ChartFrame>
  );
}

/* 6. 3-Year Website & Domain Cost + Ownership Comparison */
function AgencyOwnershipChart({ prefersReduced }: { prefersReduced: boolean }) {
  const items = [
    { name: 'Traditional London Agency (£3,200 build + £120/mo)', total: 7520, ownership: 'Often agency-held domain', color: 'bg-[#FF6B5B]' },
    { name: 'emtrc Starter (£149 setup + £39/mo managed)', total: 1553, ownership: '100% client-owned domain', color: 'bg-emerald-400' },
    { name: 'emtrc Growth (£249 setup + £129/mo + AI)', total: 4893, ownership: '100% client-owned domain', color: 'bg-sky-400' },
  ];

  return (
    <ChartFrame
      kicker="36-Month Total Cost & Ownership Comparison"
      title="What a London Business Actually Pays Over 3 Years"
      subtitle="Transparent monthly studio care with client-registered Nominet domains versus agency lock-in."
      footnote="Includes 36 months of hosting, SSL, edits and renewals. Zero ransom release fees on exit."
    >
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={item.name}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs">
              <span className="font-semibold text-white">{item.name}</span>
              <span className="font-mono-data font-bold text-white">£{item.total.toLocaleString('en-GB')}</span>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={prefersReduced ? false : { width: 0 }}
                whileInView={{ width: `${Math.round((item.total / 7800) * 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: idx * 0.1, ease: CHART_EASE }}
                className={`h-full rounded-full ${item.color}`}
              />
            </div>
            <p className="mt-1 font-mono-data text-[10px] text-[#9BA3B5]">{item.ownership}</p>
          </div>
        ))}
      </div>
    </ChartFrame>
  );
}
