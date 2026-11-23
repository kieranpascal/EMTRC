import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, MapPin, PhoneCall, Radio, Sparkles, Zap } from 'lucide-react';

const STUDIO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * 1. Interactive Animated Launch Week Illustration
 * Replaces static circle diagram in "Three steps. Live this week." (Homepage + /how-it-works).
 */
export function LaunchWeekAnimatedIllustration() {
  const prefersReduced = useReducedMotion();
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      code: 'DAY 1',
      title: 'Working demo built in 48h',
      metric: '0% upfront risk',
      detail: 'Your prices, London postcode & live phone preview ready to tap through.',
      progress: 34,
      angle: 0,
      accent: '#FF8C73',
    },
    {
      code: 'DAY 3',
      title: 'Domain, email & Maps live',
      metric: '0.9s Cloudflare LHR',
      detail: 'Domain registered in your name, @yourbusiness inbox & SSL switched on.',
      progress: 70,
      angle: 120,
      accent: '#34D399',
    },
    {
      code: 'MONTHLY',
      title: 'Edits, reviews & call reports',
      metric: '24h WhatsApp edits',
      detail: 'Text us new prices or photos anytime — plus plain-English monthly lead totals.',
      progress: 100,
      angle: 240,
      accent: '#60A5FA',
    },
  ];

  useEffect(() => {
    if (prefersReduced) return;
    const id = window.setInterval(() => {
      setActivePhase((prev) => (prev + 1) % phases.length);
    }, 3400);
    return () => window.clearInterval(id);
  }, [prefersReduced, phases.length]);

  const current = phases[activePhase];
  const circumference = 2 * Math.PI * 98;
  const dashOffset = circumference * (1 - current.progress / 100);

  return (
    <div
      data-testid="launch-week-animated-illustration"
      className="mx-auto w-full max-w-[440px] overflow-hidden rounded-2xl border border-[#232B3A] bg-[#0B0D12] p-5 text-white shadow-2xl sm:p-6"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-sm bg-[#34D399]" aria-hidden="true" />
          <span className="font-mono-data text-[10px] font-semibold uppercase tracking-[0.16em] text-[#CBD5E1]">
            LIVE LAUNCH PIPELINE · LONDON
          </span>
        </div>
        <span className="font-mono-data text-[10px] font-semibold text-[#FF8C73]">
          {current.code}
        </span>
      </div>

      {/* Animated Orbital SVG Dial */}
      <div className="relative mx-auto my-4 flex items-center justify-center">
        <svg
          viewBox="0 0 280 250"
          className="h-auto w-full max-w-[290px]"
          role="img"
          aria-label="Animated three-step emtrc launch cycle from Day 1 demo to Day 3 live domain and monthly care"
        >
          {/* Architectural Grid Reticle */}
          <line x1="140" y1="14" x2="140" y2="236" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 4" />
          <line x1="28" y1="125" x2="252" y2="125" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 4" />

          {/* Outer Subtle Track */}
          <circle
            cx="140"
            cy="125"
            r="98"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            strokeDasharray="5 5"
          />

          {/* Inner Architectural Ring */}
          <circle
            cx="140"
            cy="125"
            r="72"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="1"
          />

          {/* Animated Active Progress Arc */}
          <motion.circle
            cx="140"
            cy="125"
            r="98"
            fill="none"
            stroke={current.accent}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 0.75, ease: STUDIO_EASE }}
            transform="rotate(-90 140 125)"
          />

          {/* Pulsing Signal Halo on Active Node */}
          {[
            { cx: 140, cy: 27, label: 'D1' },
            { cx: 225, cy: 174, label: 'D3' },
            { cx: 55, cy: 174, label: 'MO' },
          ].map((node, i) => {
            const isActive = i === activePhase;
            return (
              <g
                key={node.label}
                className="cursor-pointer"
                onClick={() => setActivePhase(i)}
              >
                {isActive && !prefersReduced && (
                  <motion.circle
                    cx={node.cx}
                    cy={node.cy}
                    r="24"
                    fill="none"
                    stroke={current.accent}
                    strokeWidth="1.5"
                    initial={{ scale: 0.75, opacity: 0.9 }}
                    animate={{ scale: 1.35, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                    style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
                  />
                )}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="19"
                  fill={isActive ? current.accent : '#151B28'}
                  stroke={isActive ? '#FFFFFF' : 'rgba(255,255,255,0.22)'}
                  strokeWidth={isActive ? 2 : 1.2}
                />
                <text
                  x={node.cx}
                  y={node.cy + 4}
                  textAnchor="middle"
                  fill={isActive ? '#0B0D12' : '#E2E8F0'}
                  fontSize="10.5"
                  fontWeight="700"
                  fontFamily="IBM Plex Mono, monospace"
                >
                  {node.label}
                </text>
              </g>
            );
          })}

          {/* Center Readout */}
          <text
            x="140"
            y="109"
            textAnchor="middle"
            fill="#94A3B8"
            fontSize="9"
            fontWeight="600"
            fontFamily="IBM Plex Mono, monospace"
            letterSpacing="1.8"
          >
            LAUNCH CADENCE
          </text>
          <text
            x="140"
            y="135"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="24"
            fontWeight="700"
            fontFamily="IBM Plex Mono, monospace"
          >
            5 days
          </text>
          <text
            x="140"
            y="154"
            textAnchor="middle"
            fill={current.accent}
            fontSize="10"
            fontWeight="600"
            fontFamily="IBM Plex Mono, monospace"
          >
            {current.metric}
          </text>
        </svg>
      </div>

      {/* Interactive Step Selector & Live Phase Caption */}
      <div className="grid grid-cols-3 gap-2">
        {phases.map((p, idx) => (
          <button
            key={p.code}
            type="button"
            onClick={() => setActivePhase(idx)}
            className={`rounded-lg border px-2 py-2 text-center font-mono-data text-[10px] font-semibold transition-all ${
              idx === activePhase
                ? 'border-[#FF8C73] bg-[#E03528]/18 text-white'
                : 'border-white/10 bg-white/[0.03] text-[#94A3B8] hover:text-white'
            }`}
          >
            {p.code}
          </button>
        ))}
      </div>

      <div className="mt-3.5 min-h-[76px] rounded-xl border border-white/10 bg-[#121722] p-3.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.code}
            initial={prefersReduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <p className="font-editorial text-base font-bold text-white">{current.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-[#A8B3C8]">{current.detail}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * 2. London Cloudflare LHR Edge Speed Animated Illustration
 * Used on /services and /pricing to visually show why 0.9s loads beat bloated DIY sites.
 */
export function LondonEdgeSpeedIllustration() {
  const prefersReduced = useReducedMotion();

  const metrics = [
    { label: 'emtrc London Edge (Cloudflare LHR)', seconds: '0.9s', width: 20, highlight: true },
    { label: 'Typical Wix / Squarespace Builder', seconds: '4.4s', width: 76, highlight: false },
    { label: 'Bloated Agency WordPress Theme', seconds: '5.8s', width: 98, highlight: false },
  ];

  return (
    <div
      data-testid="london-edge-speed-illustration"
      className="overflow-hidden rounded-2xl border border-[#232B3A] bg-[#0B0D12] p-6 text-white shadow-xl"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-[#FF8C73]" aria-hidden="true" />
          <span className="font-mono-data text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FF8C73]">
            4G LONDON HIGH-STREET LOAD BENCHMARK
          </span>
        </div>
        <span className="font-mono-data text-[11px] text-[#34D399]">99 / 100 Lighthouse</span>
      </div>

      {/* Live Pulse Packets Visual */}
      <div className="mt-5 space-y-4">
        {metrics.map((m, idx) => (
          <div key={m.label}>
            <div className="flex items-center justify-between text-xs">
              <span className={m.highlight ? 'font-semibold text-white' : 'text-[#9BA6BC]'}>
                {m.label}
              </span>
              <span
                className={`font-mono-data font-bold ${
                  m.highlight ? 'text-[#34D399]' : 'text-[#94A3B8]'
                }`}
              >
                {m.seconds}
              </span>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={prefersReduced ? { width: `${m.width}%` } : { width: 0 }}
                whileInView={{ width: `${m.width}%` }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.9, delay: idx * 0.14, ease: STUDIO_EASE }}
                className={`h-full rounded-full ${
                  m.highlight
                    ? 'bg-gradient-to-r from-[#10B981] to-[#34D399]'
                    : 'bg-gradient-to-r from-[#475569] to-[#64748B]'
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2.5 border-t border-white/10 pt-4 text-center">
        <div className="rounded-lg bg-white/[0.04] p-2.5">
          <p className="font-mono-data text-sm font-bold text-white">LHR</p>
          <p className="mt-0.5 text-[10px] text-[#94A3B8]">London edge POP</p>
        </div>
        <div className="rounded-lg bg-white/[0.04] p-2.5">
          <p className="font-mono-data text-sm font-bold text-[#34D399]">100%</p>
          <p className="mt-0.5 text-[10px] text-[#94A3B8]">Auto SSL + backups</p>
        </div>
        <div className="rounded-lg bg-white/[0.04] p-2.5">
          <p className="font-mono-data text-sm font-bold text-[#FF8C73]">+41%</p>
          <p className="mt-0.5 text-[10px] text-[#94A3B8]">More tap-to-calls</p>
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Live 8-Second AI Missed-Call Capture Illustration
 * Used on /ai-tools and /free-demo to animate an incoming London 020 call turning into a booked slot.
 */
export function AiCallCaptureIllustration() {
  const prefersReduced = useReducedMotion();
  const [step, setStep] = useState(0);

  const timeline = [
    {
      time: '00:00',
      tag: 'INCOMING 020 CALL',
      title: 'Emergency boiler call in SE10',
      body: 'Owner is under a sink and cannot pick up before ring 4.',
      tone: 'text-[#FBBF24]',
    },
    {
      time: '00:08',
      tag: 'AUTO TEXT-BACK SENT',
      title: 'Instant branded SMS delivered',
      body: '“Sorry we missed your call — reply with your postcode & job for a fast quote.”',
      tone: 'text-[#FF8C73]',
    },
    {
      time: '00:42',
      tag: 'BOOKING LOCKED',
      title: 'Customer replies · Job saved (£280)',
      body: '“SE10 8EW — Vaillant pressure drop. Tomorrow 9am works.” Synced to diary.',
      tone: 'text-[#34D399]',
    },
  ];

  useEffect(() => {
    if (prefersReduced) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % timeline.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, [prefersReduced, timeline.length]);

  return (
    <div
      data-testid="ai-call-capture-illustration"
      className="overflow-hidden rounded-2xl border border-[#232B3A] bg-[#0B0D12] p-5 text-white shadow-2xl sm:p-6"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2">
          <PhoneCall className="h-4 w-4 text-[#FF8C73]" aria-hidden="true" />
          <span className="font-mono-data text-[10.5px] font-semibold uppercase tracking-[0.15em] text-[#CBD5E1]">
            LIVE LEAD CATCHER SIMULATION
          </span>
        </div>
        <span className="inline-flex items-center gap-1 font-mono-data text-[10px] text-[#34D399]">
          <Radio className="h-3 w-3" aria-hidden="true" />
          <span>8s SLA</span>
        </span>
      </div>

      {/* Animated Waveform Bars */}
      <div className="my-4 flex h-10 items-center justify-center gap-1.5 rounded-xl border border-white/8 bg-[#121722] px-4">
        {[12, 24, 18, 32, 16, 28, 36, 20, 30, 14, 26, 18].map((h, i) => (
          <motion.span
            key={i}
            animate={
              prefersReduced
                ? { height: h }
                : { height: [Math.max(8, h * 0.4), h, Math.max(8, h * 0.45)] }
            }
            transition={{
              duration: 1.1 + (i % 3) * 0.25,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.06,
            }}
            className="w-1.5 rounded-full bg-gradient-to-t from-[#E03528] to-[#FF8C73]"
          />
        ))}
      </div>

      {/* Interactive 3-Step Timeline */}
      <div className="space-y-2.5">
        {timeline.map((item, idx) => {
          const active = idx === step;
          const completed = idx < step;
          return (
            <button
              key={item.time}
              type="button"
              onClick={() => setStep(idx)}
              className={`w-full rounded-xl border p-3.5 text-left transition-all ${
                active
                  ? 'border-[#FF8C73] bg-[#161C2B]'
                  : 'border-white/8 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`font-mono-data text-[10px] font-bold ${item.tone}`}>
                  {item.time} · {item.tag}
                </span>
                {completed || active ? (
                  <Check className="h-3.5 w-3.5 text-[#34D399]" aria-hidden="true" />
                ) : null}
              </div>
              <p className="mt-1 text-xs font-bold text-white sm:text-sm">{item.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-[#9BA6BC]">{item.body}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 4. London Borough Maps 3-Pack & AI Search Radar Illustration
 * Used on /case-studies, /blog (Signals), and /work to illustrate London postcode visibility.
 */
export function MapsRankingOrbitIllustration() {
  const prefersReduced = useReducedMotion();
  const [selectedPostcode, setSelectedPostcode] = useState(0);

  const zones = [
    { postcode: 'E8 · Hackney', trade: 'Barber Shop', mapsRank: '#1 in 3-Pack', aiMention: 'Cited by ChatGPT', lift: '+162% calls' },
    { postcode: 'SE10 · Greenwich', trade: 'Heating & Plumbing', mapsRank: '#2 in 3-Pack', aiMention: 'Cited by Google AI', lift: '+£4.2k/mo' },
    { postcode: 'SW7 · Kensington', trade: 'Hair & Beauty', mapsRank: '#1 in 3-Pack', aiMention: 'Apple Maps Verified', lift: '+84% bookings' },
    { postcode: 'NW1 · Camden', trade: 'NICEIC Electrician', mapsRank: '#1 in 3-Pack', aiMention: 'Cited by Perplexity', lift: '0 missed leads' },
  ];

  useEffect(() => {
    if (prefersReduced) return;
    const id = window.setInterval(() => {
      setSelectedPostcode((p) => (p + 1) % zones.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [prefersReduced, zones.length]);

  const current = zones[selectedPostcode];

  return (
    <div
      data-testid="maps-ranking-orbit-illustration"
      className="overflow-hidden rounded-2xl border border-[#232B3A] bg-[#0B0D12] p-5 text-white shadow-xl sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#FF8C73]" aria-hidden="true" />
          <span className="font-mono-data text-[10.5px] font-semibold uppercase tracking-[0.15em] text-[#CBD5E1]">
            LONDON MAPS 3-PACK &amp; AI CITATION RADAR
          </span>
        </div>
        <span className="inline-flex items-center gap-1 font-mono-data text-[10px] text-[#FF8C73]">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          <span>Schema.org Live</span>
        </span>
      </div>

      {/* Animated Postcode Pills */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {zones.map((z, idx) => (
          <button
            key={z.postcode}
            type="button"
            onClick={() => setSelectedPostcode(idx)}
            className={`rounded-lg border px-2.5 py-2 text-left transition-all ${
              idx === selectedPostcode
                ? 'border-[#FF8C73] bg-[#E03528]/18 text-white'
                : 'border-white/10 bg-white/[0.03] text-[#94A3B8] hover:text-white'
            }`}
          >
            <p className="font-mono-data text-[10px] font-bold">{z.postcode}</p>
            <p className="mt-0.5 truncate text-[11px] opacity-80">{z.trade}</p>
          </button>
        ))}
      </div>

      {/* Animated Status Card */}
      <div className="mt-4 rounded-xl border border-white/10 bg-[#121722] p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.postcode}
            initial={prefersReduced ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReduced ? undefined : { opacity: 0, x: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            <div>
              <p className="font-mono-data text-[10px] uppercase text-[#94A3B8]">Google Maps</p>
              <p className="mt-1 font-mono-data text-base font-bold text-[#34D399]">
                {current.mapsRank}
              </p>
            </div>
            <div>
              <p className="font-mono-data text-[10px] uppercase text-[#94A3B8]">AI Search</p>
              <p className="mt-1 font-mono-data text-base font-bold text-white">
                {current.aiMention}
              </p>
            </div>
            <div>
              <p className="font-mono-data text-[10px] uppercase text-[#94A3B8]">Measured Lift</p>
              <p className="mt-1 font-mono-data text-base font-bold text-[#FF8C73]">
                {current.lift}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
