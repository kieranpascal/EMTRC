import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { KickerRule } from './Reveal';

export interface PageHeaderMetric {
  value: string;
  label: string;
}

interface PageHeaderProps {
  kicker: string;
  headlineLine1: string;
  headlineLine2?: string;
  description: string;
  backdropImage?: string;
  backdropAlt?: string;
  metrics?: readonly PageHeaderMetric[];
  actions?: ReactNode;
  bottomBar?: ReactNode;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Architectural editorial page header with subtle photographic depth,
 * Playfair Display headlines, IBM Plex Mono metrics strip and clean dark scrim.
 */
export function PageHeader({
  kicker,
  headlineLine1,
  headlineLine2,
  description,
  backdropImage = '/src/assets/images/london_studio_dusk_header_1795426202168.jpg',
  backdropAlt = 'East London independent studio and high street at dusk',
  metrics,
  actions,
  bottomBar,
}: PageHeaderProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-[var(--emtrc-navy-border)] bg-[#090B10] text-[#F5F4F0]">
      {/* Subtle full-bleed photographic architectural backdrop with measured contrast scrim */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.img
          src={backdropImage}
          alt={backdropAlt}
          initial={prefersReduced ? false : { scale: 1.07, opacity: 0.24 }}
          animate={{ scale: 1.01, opacity: 0.3 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090C]/95 via-[#08090C]/85 to-[#08090C]/72" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-[#08090C]/40" />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '68px 68px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 pt-10 pb-10 sm:px-8 sm:pt-14 sm:pb-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <KickerRule light>{kicker}</KickerRule>
            </motion.div>

            <motion.h1
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
              className="mt-3 font-editorial text-[clamp(2.25rem,4.8vw,3.85rem)] font-bold leading-[1.03] tracking-[-0.02em] text-white"
            >
              <span className="block">{headlineLine1}</span>
              {headlineLine2 && (
                <span className="mt-1 block font-editorial-italic font-normal text-[#FF8C73]">
                  {headlineLine2}
                </span>
              )}
            </motion.h1>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
              className="mt-4 max-w-2xl text-sm leading-relaxed text-[#C2C9D9] sm:text-base"
            >
              {description}
            </motion.p>
          </div>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
            className="flex flex-col gap-4 lg:col-span-4 lg:items-end"
          >
            {actions}
            {metrics && metrics.length > 0 && (
              <div className="grid w-full grid-cols-2 gap-3 rounded-xl border border-white/12 bg-white/[0.04] p-3.5 backdrop-blur-sm sm:grid-cols-3 lg:grid-cols-2">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-mono-data text-lg font-semibold text-white">{m.value}</p>
                    <p className="text-[11px] leading-snug text-[#9BA3B5]">{m.label}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {bottomBar && (
          <div className="mt-8 border-t border-white/12 pt-5">{bottomBar}</div>
        )}
      </div>
    </section>
  );
}
