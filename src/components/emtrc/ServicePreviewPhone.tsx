import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { ServicePhoneTab } from '../../content/services';

interface ServicePreviewPhoneProps {
  appTitle: string;
  tabs: readonly ServicePhoneTab[];
}

export function ServicePreviewPhone({ appTitle, tabs }: ServicePreviewPhoneProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const prefersReduced = useReducedMotion();
  const active = tabs[activeIdx] ?? tabs[0];

  if (!active) return null;

  return (
    <div
      data-testid="service-preview-phone"
      className="mx-auto w-full max-w-[400px] rounded-[2rem] border border-[#262D3B] bg-[#0D1014] p-4 text-[#F5F6F8] shadow-2xl"
    >
      {/* Top chrome */}
      <div className="flex items-center justify-between px-2 pt-1 pb-3 font-mono-data text-[11px] font-medium text-[#9BA3B4]">
        <span className="font-semibold text-white">09:41</span>
        <span className="h-1.5 w-14 rounded-full bg-[#1C222E]" aria-hidden="true" />
        <span className="truncate max-w-[155px] text-right">{appTitle}</span>
      </div>

      {/* Screen card */}
      <div className="min-h-[300px] rounded-2xl border border-[#262D3B] bg-[#151921] p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono-data text-[11px] font-semibold tracking-wider text-[var(--emtrc-brass-light)]">
              {active.headerSub}
            </p>
            <h3 className="mt-1.5 font-editorial text-xl font-bold leading-snug text-white">
              {active.title}
            </h3>
            <p className="mt-1 text-xs text-[#9BA3B4]">{active.subtitle}</p>

            <div className="mt-4 divide-y divide-[#262D3B] border-y border-[#262D3B]">
              {active.rows.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-3 py-2.5 text-xs">
                  <span className="text-[#B4BCCB]">{row.label}</span>
                  <span
                    className={`font-mono-data font-semibold text-right ${
                      row.highlight ? 'text-[var(--emtrc-brass-light)]' : 'text-white'
                    }`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-3.5 text-[11px] leading-relaxed text-[#9BA3B4]">{active.footnote}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive 4-tab switcher */}
      <div
        role="tablist"
        aria-label="Service live preview screens"
        className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4"
      >
        {tabs.map((tab, idx) => {
          const selected = idx === activeIdx;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              data-testid={`service-phone-tab-${tab.id}`}
              onClick={() => setActiveIdx(idx)}
              className={`rounded-lg px-2 py-2 text-[11px] font-semibold transition-colors ${
                selected
                  ? 'bg-[var(--emtrc-accent)] text-white'
                  : 'bg-[#151921] text-[#9BA3B4] hover:bg-[#1F2532] hover:text-white'
              }`}
            >
              {tab.tabLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
