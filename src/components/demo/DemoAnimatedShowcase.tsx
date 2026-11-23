import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Check,
  Clock,
  Coffee,
  Flame,
  Scissors,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Barber Interactive Grooming Planner & Chair Craft Visualiser
 */
function BarberAnimatedIllustration() {
  const { site, theme } = useSite();
  const prefersReduced = useReducedMotion();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const cuts = [
    {
      label: 'Skin Fade',
      duration: '40 min',
      price: site.services[0]?.price ?? '£28',
      stages: [
        { name: 'Consultation & parting', mins: 5, pct: 16 },
        { name: 'Zero foil blend & taper', mins: 18, pct: 56 },
        { name: 'Scissor texture on top', mins: 10, pct: 84 },
        { name: 'Hot towel & razor finish', mins: 7, pct: 100 },
      ],
      finishNote: 'Matte clay or natural salt spray · lasts 2–3 weeks sharp',
    },
    {
      label: 'Scissor Cut',
      duration: '45 min',
      price: site.services[1]?.price ?? '£30',
      stages: [
        { name: 'Growth direction check', mins: 6, pct: 15 },
        { name: 'Full scissor sectioning', mins: 24, pct: 68 },
        { name: 'Tapered neckline detail', mins: 8, pct: 86 },
        { name: 'Blow-dry & steam towel', mins: 7, pct: 100 },
      ],
      finishNote: 'Clean tailored silhouette designed for effortless grow-out',
    },
    {
      label: 'Cut & Beard',
      duration: '60 min',
      price: site.services[2]?.price ?? '£42',
      stages: [
        { name: 'Hair & beard framing plan', mins: 6, pct: 12 },
        { name: 'Precision cut or fade', mins: 28, pct: 58 },
        { name: 'Beard sculpt & razor line', mins: 16, pct: 85 },
        { name: 'Cedar oil & eucalyptus press', mins: 10, pct: 100 },
      ],
      finishNote: 'Complete grooming reset with two hot towels and cold compress',
    },
  ];

  const active = cuts[selectedIdx];

  return (
    <div
      data-testid="demo-animated-showcase"
      className={`border border-[var(--site-border)] bg-[var(--site-surface)] p-6 sm:p-7 ${theme.cardRadius}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--site-border)] pb-4">
        <div className="flex items-center gap-2.5">
          <Scissors className="h-4 w-4 text-[var(--site-accent-text)]" aria-hidden="true" />
          <span className="font-mono-data text-xs font-semibold text-[var(--site-ink)]">
            Chair Timing &amp; Craft Planner
          </span>
        </div>
        <span className="font-mono-data text-xs text-[var(--site-muted)]">
          {site.borough} · Walk-ins &amp; Booked
        </span>
      </div>

      {/* Interactive Cut Selector */}
      <div
        role="tablist"
        aria-label="Preview grooming service timeline"
        className="mt-5 grid grid-cols-3 gap-1.5 bg-[var(--site-surface-alt)] p-1 rounded-lg"
      >
        {cuts.map((cut, idx) => {
          const isSelected = idx === selectedIdx;
          return (
            <button
              key={cut.label}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedIdx(idx)}
              className={`relative rounded-md px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                isSelected ? 'text-[var(--site-accent-ink)]' : 'text-[var(--site-muted)] hover:text-[var(--site-ink)]'
              }`}
            >
              {isSelected && (
                <motion.span
                  layoutId="barber-cut-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-md bg-[var(--site-accent)]"
                />
              )}
              <span className="relative z-10">{cut.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.label}
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="mt-6 space-y-5"
        >
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-xs text-[var(--site-muted)]">Chair allocation</p>
              <p className="font-display mt-0.5 text-2xl font-bold tabular-nums text-[var(--site-ink)]">
                {active.duration}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[var(--site-muted)]">Fixed menu rate</p>
              <p className="font-display mt-0.5 text-2xl font-bold tabular-nums text-[var(--site-accent-text)]">
                {active.price}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {active.stages.map((stage, i) => (
              <div key={stage.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[var(--site-ink)]">
                    0{i + 1}. {stage.name}
                  </span>
                  <span className="font-mono-data text-[var(--site-muted)]">{stage.mins} min</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--site-surface-alt)]">
                  <motion.div
                    initial={prefersReduced ? false : { scaleX: 0 }}
                    animate={{ scaleX: stage.pct / 100 }}
                    transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                    style={{ transformOrigin: 'left' }}
                    className="h-full w-full rounded-full bg-[var(--site-accent)]"
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="border-t border-[var(--site-border)] pt-4 text-xs leading-relaxed text-[var(--site-muted)]">
            {active.finishNote}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * Salon Interactive Colour Palette & Botanical Ritual Studio
 */
function SalonAnimatedIllustration() {
  const { site, theme } = useSite();
  const prefersReduced = useReducedMotion();
  const [toneIdx, setToneIdx] = useState(0);

  const palettes = [
    {
      name: 'Honey Lived-In Balayage',
      swatches: ['#4C3629', '#8B6548', '#C69D70', '#E8CEAA'],
      duration: '150 min',
      gloss: 94,
      maintenance: '12–16 weeks',
      ritual: 'Hand-painted sunlit ribbons, vegan bond protection, custom gloss toner & bouncy blow-dry.',
    },
    {
      name: 'Espresso Mirror Gloss',
      swatches: ['#1A120E', '#2D1D16', '#4E3124', '#7C543E'],
      duration: '75 min',
      gloss: 98,
      maintenance: '6–8 weeks',
      ritual: 'Ammonia-free demi-permanent colour melt for liquid shine and zero harsh regrowth line.',
    },
    {
      name: 'Warm Copper Botanical',
      swatches: ['#4F2417', '#873C23', '#BE5D37', '#DF8E64'],
      duration: '120 min',
      gloss: 91,
      maintenance: '8–10 weeks',
      ritual: 'Multi-tonal dimensional copper formulated with botanical scalp oils and colour-lock seal.',
    },
  ];

  const active = palettes[toneIdx];

  return (
    <div
      data-testid="demo-animated-showcase"
      className={`border border-[var(--site-border)] bg-[var(--site-surface)] p-6 sm:p-7 ${theme.cardRadius}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--site-border)] pb-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-4 w-4 text-[var(--site-accent-text)]" aria-hidden="true" />
          <span className="font-mono-data text-xs font-semibold text-[var(--site-ink)]">
            Colour &amp; Gloss Formulation Studio
          </span>
        </div>
        <span className="font-mono-data text-xs text-[var(--site-muted)]">
          {site.borough} · Ammonia-Free
        </span>
      </div>

      <div
        role="tablist"
        aria-label="Preview salon colour finishes"
        className="mt-5 flex flex-wrap gap-2"
      >
        {palettes.map((p, idx) => {
          const selected = idx === toneIdx;
          return (
            <button
              key={p.name}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setToneIdx(idx)}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                selected
                  ? 'border-[var(--site-accent)] bg-[var(--site-accent)] text-[var(--site-accent-ink)]'
                  : 'border-[var(--site-border)] bg-[var(--site-bg)] text-[var(--site-muted)] hover:text-[var(--site-ink)]'
              }`}
            >
              {p.name.split(' ').slice(0, 2).join(' ')}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.name}
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="mt-6 space-y-5"
        >
          {/* Animated 4-tone tonal ribbon preview */}
          <div className="grid grid-cols-4 gap-2.5">
            {active.swatches.map((hex, i) => (
              <motion.div
                key={hex}
                initial={prefersReduced ? false : { scaleY: 0.65, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                style={{ backgroundColor: hex, transformOrigin: 'bottom' }}
                className="h-20 rounded-lg border border-black/10"
                aria-hidden="true"
              />
            ))}
          </div>

          <div>
            <h4 className="font-display text-lg font-bold text-[var(--site-ink)]">{active.name}</h4>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--site-muted)]">{active.ritual}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-[var(--site-border)] pt-4">
            <div>
              <p className="text-[11px] text-[var(--site-muted)]">Studio time</p>
              <p className="font-mono-data mt-0.5 text-sm font-bold text-[var(--site-ink)]">
                {active.duration}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-[var(--site-muted)]">Refresh cadence</p>
              <p className="font-mono-data mt-0.5 text-sm font-bold text-[var(--site-ink)]">
                {active.maintenance}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-[var(--site-muted)]">Gloss index</p>
              <p className="font-mono-data mt-0.5 text-sm font-bold text-[var(--site-accent-text)]">
                {active.gloss}%
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * Trades Interactive London Dispatch & Safety Diagnostic Schematic
 */
function TradesAnimatedIllustration() {
  const { site, theme } = useSite();
  const prefersReduced = useReducedMotion();
  const [modeIdx, setModeIdx] = useState(0);

  const diagnostics = [
    {
      tab: 'Boiler & CP12',
      eta: 'Same-day',
      rate: site.services[0]?.price ?? '£90 fixed',
      checks: [
        'Flue combustion & CO ratio analysis',
        'Operating gas burner pressure & seal test',
        'Expansion vessel & magnetic filter inspection',
        'Instant digital CP12 PDF certificate emailed',
      ],
    },
    {
      tab: 'EICR & Fuse Board',
      eta: '24–48 hrs',
      rate: site.services[3]?.price ?? 'From £145',
      checks: [
        'Full 18th Edition BS 7671 dead & live testing',
        'RCD / RCBO trip-time millisecond calibration',
        'Earthing & main protective bonding check',
        'NICEIC digital report & Part P notification',
      ],
    },
    {
      tab: 'Emergency Dispatch',
      eta: '60–90 min',
      rate: 'Upfront quote',
      checks: [
        'Direct call straight to local duty engineer',
        'Van stocked with valves, pumps & RCBOs',
        'Safe isolation & fault diagnostic report',
        '12-month written workmanship guarantee',
      ],
    },
  ];

  const active = diagnostics[modeIdx];

  return (
    <div
      data-testid="demo-animated-showcase"
      className={`border border-[var(--site-border)] bg-[var(--site-surface)] p-6 sm:p-7 ${theme.cardRadius}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--site-border)] pb-4">
        <div className="flex items-center gap-2.5">
          <Wrench className="h-4 w-4 text-[var(--site-accent-text)]" aria-hidden="true" />
          <span className="font-mono-data text-xs font-semibold text-[var(--site-ink)]">
            Dispatch &amp; Safety Inspection Scope
          </span>
        </div>
        <span className="font-mono-data text-xs text-[var(--site-muted)]">
          {site.borough} · Certified
        </span>
      </div>

      <div
        role="tablist"
        aria-label="Inspect engineering scopes"
        className="mt-5 grid grid-cols-3 gap-1.5 bg-[var(--site-surface-alt)] p-1 rounded-lg"
      >
        {diagnostics.map((item, idx) => {
          const selected = idx === modeIdx;
          return (
            <button
              key={item.tab}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setModeIdx(idx)}
              className={`relative rounded-md px-2.5 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                selected ? 'text-[var(--site-accent-ink)]' : 'text-[var(--site-muted)] hover:text-[var(--site-ink)]'
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="trades-scope-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-md bg-[var(--site-accent)]"
                />
              )}
              <span className="relative z-10">{item.tab}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.tab}
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.24, ease: EASE }}
          className="mt-6 space-y-5"
        >
          <div className="grid grid-cols-2 gap-4 rounded-lg border border-[var(--site-border)] bg-[var(--site-bg)] p-4">
            <div>
              <p className="text-[11px] text-[var(--site-muted)]">Typical arrival</p>
              <p className="font-mono-data mt-1 text-lg font-bold text-[var(--site-ink)]">
                {active.eta}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-[var(--site-muted)]">Pricing structure</p>
              <p className="font-mono-data mt-1 text-lg font-bold text-[var(--site-accent-text)]">
                {active.rate}
              </p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {active.checks.map((check, idx) => (
              <motion.li
                key={check}
                initial={prefersReduced ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05, ease: EASE }}
                className="flex items-start gap-2.5 text-xs leading-relaxed text-[var(--site-ink)]"
              >
                <ShieldCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-[var(--site-accent-text)]"
                  aria-hidden="true"
                />
                <span>{check}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * Cleaner Interactive Room-by-Room Price & Checklist Estimator
 */
function CleanerAnimatedIllustration() {
  const { site, theme } = useSite();
  const prefersReduced = useReducedMotion();
  const [bedrooms, setBedrooms] = useState<1 | 2 | 3>(2);
  const [includeOven, setIncludeOven] = useState(true);
  const [includeCarpets, setIncludeCarpets] = useState(false);

  const basePrices: Record<1 | 2 | 3, number> = { 1: 145, 2: 195, 3: 255 };
  const baseHours: Record<1 | 2 | 3, number> = { 1: 3, 2: 4.5, 3: 6 };
  const estimatedPrice = basePrices[bedrooms] + (includeOven ? 45 : 0) + (includeCarpets ? 65 : 0);
  const estimatedHours = baseHours[bedrooms] + (includeOven ? 1 : 0) + (includeCarpets ? 1 : 0);
  const checkpoints = 28 + bedrooms * 6 + (includeOven ? 8 : 0) + (includeCarpets ? 6 : 0);

  return (
    <div
      data-testid="demo-animated-showcase"
      className={`border border-[var(--site-border)] bg-[var(--site-surface)] p-6 sm:p-7 ${theme.cardRadius}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--site-border)] pb-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-4 w-4 text-[var(--site-accent-text)]" aria-hidden="true" />
          <span className="font-mono-data text-xs font-semibold text-[var(--site-ink)]">
            Instant London Clean Guide Estimator
          </span>
        </div>
        <span className="font-mono-data text-xs text-[var(--site-muted)]">
          {site.borough} · 72h Guarantee
        </span>
      </div>

      {/* Bedroom Selector */}
      <div className="mt-5">
        <p className="text-xs font-semibold text-[var(--site-ink)]">Property size</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {([1, 2, 3] as const).map((bed) => (
            <button
              key={bed}
              type="button"
              onClick={() => setBedrooms(bed)}
              className={`rounded-md border px-3 py-2 text-xs font-semibold transition-colors ${
                bedrooms === bed
                  ? 'border-[var(--site-accent)] bg-[var(--site-accent)] text-[var(--site-accent-ink)]'
                  : 'border-[var(--site-border)] bg-[var(--site-bg)] text-[var(--site-muted)] hover:text-[var(--site-ink)]'
              }`}
            >
              {bed} {bed === 1 ? 'Bed Flat' : 'Bed Home'}
            </button>
          ))}
        </div>
      </div>

      {/* Optional Add-ons */}
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => setIncludeOven((prev) => !prev)}
          aria-pressed={includeOven}
          className={`flex items-center justify-between rounded-md border px-3.5 py-2.5 text-left text-xs font-medium transition-colors ${
            includeOven
              ? 'border-[var(--site-accent)] bg-[var(--site-surface-alt)] text-[var(--site-ink)]'
              : 'border-[var(--site-border)] bg-[var(--site-bg)] text-[var(--site-muted)]'
          }`}
        >
          <span>Deep oven clean</span>
          <Check
            className={`h-3.5 w-3.5 ${includeOven ? 'text-[var(--site-accent-text)] opacity-100' : 'opacity-25'}`}
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          onClick={() => setIncludeCarpets((prev) => !prev)}
          aria-pressed={includeCarpets}
          className={`flex items-center justify-between rounded-md border px-3.5 py-2.5 text-left text-xs font-medium transition-colors ${
            includeCarpets
              ? 'border-[var(--site-accent)] bg-[var(--site-surface-alt)] text-[var(--site-ink)]'
              : 'border-[var(--site-border)] bg-[var(--site-bg)] text-[var(--site-muted)]'
          }`}
        >
          <span>Steam carpets</span>
          <Check
            className={`h-3.5 w-3.5 ${includeCarpets ? 'text-[var(--site-accent-text)] opacity-100' : 'opacity-25'}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Live Output */}
      <motion.div
        key={`${bedrooms}-${includeOven}-${includeCarpets}`}
        initial={prefersReduced ? false : { opacity: 0.7, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: EASE }}
        className="mt-5 grid grid-cols-3 gap-3 rounded-lg border border-[var(--site-border)] bg-[var(--site-bg)] p-4"
      >
        <div>
          <p className="text-[11px] text-[var(--site-muted)]">Guide price</p>
          <p className="font-mono-data mt-1 text-xl font-bold text-[var(--site-accent-text)]">
            £{estimatedPrice}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-[var(--site-muted)]">Team hours</p>
          <p className="font-mono-data mt-1 text-xl font-bold text-[var(--site-ink)]">
            {estimatedHours}h
          </p>
        </div>
        <div>
          <p className="text-[11px] text-[var(--site-muted)]">Checklist</p>
          <p className="font-mono-data mt-1 text-xl font-bold text-[var(--site-ink)]">
            {checkpoints} pts
          </p>
        </div>
      </motion.div>

      <p className="mt-4 text-xs leading-relaxed text-[var(--site-muted)]">
        Includes HEPA vacuuming, eco surface care and 72-hour landlord inventory re-clean cover.
      </p>
    </div>
  );
}

/**
 * Café Interactive Espresso Roast Profile & Morning Bake Dial
 */
function CafeAnimatedIllustration() {
  const { site, theme } = useSite();
  const prefersReduced = useReducedMotion();
  const [brewIdx, setBrewIdx] = useState(0);

  const roasts = [
    {
      name: 'House Espresso',
      origin: 'Brazil & Kenya · Washed',
      notes: 'Dark chocolate, roasted hazelnut, blood orange',
      recipe: '18.5g in · 38g out · 28s',
      bars: [
        { label: 'Body', value: 88 },
        { label: 'Sweetness', value: 84 },
        { label: 'Brightness', value: 62 },
      ],
      bakeTime: 'Almond croissants warm at 07:15 & 09:30',
    },
    {
      name: 'Filter Batch',
      origin: 'Ethiopia Guji · Natural',
      notes: 'Ripe peach, jasmine blossom, wild honey',
      recipe: '93°C brew · 1:16 ratio',
      bars: [
        { label: 'Body', value: 58 },
        { label: 'Sweetness', value: 92 },
        { label: 'Brightness', value: 86 },
      ],
      bakeTime: 'Cardamom & pistachio buns fresh at 07:30',
    },
    {
      name: '18h Cold Brew',
      origin: 'Colombia Huila · Steeped',
      notes: 'Molasses, cacao nib, crisp citrus finish',
      recipe: '18-hour cold steep · Served over ice',
      bars: [
        { label: 'Body', value: 80 },
        { label: 'Sweetness', value: 90 },
        { label: 'Brightness', value: 54 },
      ],
      bakeTime: 'Sourdough brunch kitchen open until 15:00',
    },
  ];

  const active = roasts[brewIdx];

  return (
    <div
      data-testid="demo-animated-showcase"
      className={`border border-[var(--site-border)] bg-[var(--site-surface)] p-6 sm:p-7 ${theme.cardRadius}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--site-border)] pb-4">
        <div className="flex items-center gap-2.5">
          <Coffee className="h-4 w-4 text-[var(--site-accent-text)]" aria-hidden="true" />
          <span className="font-mono-data text-xs font-semibold text-[var(--site-ink)]">
            Today on the Bar &amp; Bake Schedule
          </span>
        </div>
        <span className="font-mono-data text-xs text-[var(--site-muted)]">
          {site.borough} · Zero Oat Surcharge
        </span>
      </div>

      <div
        role="tablist"
        aria-label="Inspect coffee bar roasts"
        className="mt-5 grid grid-cols-3 gap-1.5 bg-[var(--site-surface-alt)] p-1 rounded-lg"
      >
        {roasts.map((roast, idx) => {
          const selected = idx === brewIdx;
          return (
            <button
              key={roast.name}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setBrewIdx(idx)}
              className={`relative rounded-md px-2.5 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                selected ? 'text-[var(--site-accent-ink)]' : 'text-[var(--site-muted)] hover:text-[var(--site-ink)]'
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="cafe-roast-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-md bg-[var(--site-accent)]"
                />
              )}
              <span className="relative z-10">{roast.name}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.name}
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="mt-6 space-y-4"
        >
          <div>
            <p className="font-mono-data text-xs text-[var(--site-accent-text)]">{active.origin}</p>
            <p className="mt-1 text-sm font-semibold text-[var(--site-ink)]">{active.notes}</p>
            <p className="font-mono-data mt-1 text-[11px] text-[var(--site-muted)]">
              {active.recipe}
            </p>
          </div>

          <div className="space-y-3 pt-1">
            {active.bars.map((bar, i) => (
              <div key={bar.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--site-muted)]">{bar.label}</span>
                  <span className="font-mono-data font-semibold text-[var(--site-ink)]">
                    {bar.value}/100
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--site-surface-alt)]">
                  <motion.div
                    initial={prefersReduced ? false : { scaleX: 0 }}
                    animate={{ scaleX: bar.value / 100 }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                    style={{ transformOrigin: 'left' }}
                    className="h-full w-full rounded-full bg-[var(--site-accent)]"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-[var(--site-border)] pt-4 text-xs text-[var(--site-muted)]">
            <Flame className="h-3.5 w-3.5 shrink-0 text-[var(--site-accent-text)]" aria-hidden="true" />
            <span>{active.bakeTime}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function DemoAnimatedShowcase() {
  const { site } = useSite();

  switch (site.niche) {
    case 'barber':
      return <BarberAnimatedIllustration />;
    case 'salon':
      return <SalonAnimatedIllustration />;
    case 'trades':
      return <TradesAnimatedIllustration />;
    case 'cleaner':
      return <CleanerAnimatedIllustration />;
    case 'cafe':
    default:
      return <CafeAnimatedIllustration />;
  }
}

export function DemoClockBadge({ label, detail }: { label: string; detail: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--site-muted)]">
      <Clock className="h-3.5 w-3.5 text-[var(--site-accent-text)]" aria-hidden="true" />
      <span className="font-semibold text-[var(--site-ink)]">{label}</span>
      <span aria-hidden="true">·</span>
      <span className="tabular-nums">{detail}</span>
    </span>
  );
}
