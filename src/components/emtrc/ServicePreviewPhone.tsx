import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Wifi } from 'lucide-react';
import type { ServicePhoneTab } from '../../content/services';
import { EmtrcMark } from './EmtrcLogo';

interface ServicePreviewPhoneProps {
  appTitle: string;
  tabs: readonly ServicePhoneTab[];
}

/**
 * Tall realistic smartphone device frame (~19.5:9 aspect ratio) with anodized bezel,
 * machined side buttons, Dynamic Island and animated live service preview screens.
 */
export function ServicePreviewPhone({ appTitle, tabs }: ServicePreviewPhoneProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const prefersReduced = useReducedMotion();
  const active = tabs[activeIdx] ?? tabs[0];

  if (!active) return null;

  return (
    <div
      data-testid="service-preview-phone"
      className="relative mx-auto w-full max-w-[310px] rounded-[44px] bg-gradient-to-b from-[#454A56] via-[#1B1E25] to-[#2F333E] p-[3px] text-[#F5F6F8] shadow-[0_34px_80px_-14px_rgba(0,0,0,0.75)]"
    >
      {/* Hardware Side Buttons */}
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

      <div className="flex min-h-[565px] flex-col justify-between overflow-hidden rounded-[41px] bg-[#0A0C10]">
        <div>
          {/* iOS Status Bar + Dynamic Island */}
          <div className="flex items-center justify-between px-6 pt-3.5 pb-2 font-mono-data text-[11px] font-medium text-white/85">
            <span>09:41</span>
            <span
              aria-hidden="true"
              className="flex h-[22px] w-[82px] items-center justify-end rounded-full bg-black px-2 ring-1 ring-white/10"
            >
              <span className="h-2 w-2 rounded-full bg-[#1C1F2B] ring-1 ring-white/15" />
            </span>
            <span className="inline-flex items-center gap-1">
              <Wifi className="h-3 w-3" aria-hidden="true" />
              <span className="text-[10px]">5G</span>
            </span>
          </div>

          {/* App Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 pt-1 pb-3">
            <div className="flex items-center gap-2 min-w-0">
              <EmtrcMark inverted className="h-6 w-6 shrink-0" />
              <span className="truncate text-xs font-bold text-white">{appTitle}</span>
            </div>
            <span className="font-mono-data text-[10px] font-semibold text-[#FF8C73]">LIVE</span>
          </div>

          {/* Tall Screen Content */}
          <div className="min-h-[395px] p-4">
            <div className="h-full rounded-2xl border border-white/10 bg-[#141720] p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-mono-data text-[10px] font-semibold uppercase tracking-wider text-[#FF8C73]">
                    {active.headerSub}
                  </p>
                  <h3 className="mt-1.5 font-editorial text-xl font-bold leading-snug text-white">
                    {active.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#9BA3B4]">{active.subtitle}</p>

                  <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
                    {active.rows.map((row) => (
                      <div key={row.label} className="flex items-center justify-between gap-3 py-3 text-xs">
                        <span className="text-[#C2C9D9]">{row.label}</span>
                        <span
                          className={`font-mono-data font-semibold text-right ${
                            row.highlight ? 'text-[#FF8C73]' : 'text-white'
                          }`}
                        >
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 rounded-xl bg-white/[0.04] p-3 text-[11px] leading-relaxed text-[#A9B5CE]">
                    {active.footnote}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Dock + Home Bar */}
        <div className="border-t border-white/10 bg-[#0F1219] px-3 pt-2.5 pb-2.5">
          <div
            role="tablist"
            aria-label="Service live preview screens"
            className="grid grid-cols-2 gap-1.5 sm:grid-cols-4"
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
                  className={`rounded-lg px-1.5 py-2 text-[10px] font-semibold transition-colors ${
                    selected
                      ? 'bg-[var(--emtrc-accent)] text-white'
                      : 'bg-[#171B26] text-[#9BA3B4] hover:bg-[#222838] hover:text-white'
                  }`}
                >
                  {tab.tabLabel}
                </button>
              );
            })}
          </div>
          <div className="mx-auto mt-2.5 h-1 w-24 rounded-full bg-white/25" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
