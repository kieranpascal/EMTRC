import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { BandTone } from './SectionSeparator';

export type OrnamentalPattern =
  | 'georgian-fret'
  | 'art-deco-chevron'
  | 'barbican-grid'
  | 'victorian-tile';

interface OrnamentalDividerProps {
  pattern?: OrnamentalPattern;
  from?: BandTone;
  to?: BandTone;
  label?: string;
  accentColor?: 'coral' | 'amber' | 'emerald' | 'blue';
  className?: string;
}

const TONE_BG: Record<BandTone, string> = {
  canvas: 'var(--emtrc-canvas)',
  surface: 'var(--emtrc-surface)',
  sand: 'var(--emtrc-sand)',
  obsidian: '#0B0D12',
  slate: '#121826',
};

const ACCENT_HEX: Record<'coral' | 'amber' | 'emerald' | 'blue', string> = {
  coral: '#E03528',
  amber: '#D97706',
  emerald: '#059669',
  blue: '#2563EB',
};

/**
 * Straight, precision-drafted horizontal architectural frieze inspired by London metalwork
 * and masonry (Georgian ironwork frets, Art Deco chevrons, Barbican waffle grids,
 * Victorian geometric floor tiles). Zero waves or slanted diagonals.
 */
export function OrnamentalDivider({
  pattern = 'georgian-fret',
  from = 'surface',
  to = 'sand',
  label,
  accentColor = 'coral',
  className = '',
}: OrnamentalDividerProps) {
  const prefersReduced = useReducedMotion();
  const uid = useId().replace(/:/g, '');
  const patternId = `emtrc-ornament-${pattern}-${uid}`;
  const isDark = from === 'obsidian' || to === 'obsidian' || from === 'slate' || to === 'slate';
  const strokeHex = ACCENT_HEX[accentColor];
  const lineTone = isDark ? 'rgba(255,255,255,0.16)' : 'rgba(15,23,42,0.14)';
  const labelBg = isDark ? '#0B0D12' : TONE_BG[to];
  const labelText = isDark ? '#CBD5E1' : 'var(--emtrc-muted)';

  return (
    <div
      data-testid="ornamental-divider"
      data-pattern={pattern}
      style={{
        background: `linear-gradient(180deg, ${TONE_BG[from]} 0%, ${TONE_BG[from]} 50%, ${TONE_BG[to]} 50%, ${TONE_BG[to]} 100%)`,
      }}
      className={`relative w-full overflow-hidden py-3 select-none ${className}`}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="relative flex items-center justify-center">
          {/* Crisp Straight Architectural SVG Pattern Band */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scaleX: 0.92 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <svg
              className="block h-7 w-full"
              width="100%"
              height="28"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                {pattern === 'georgian-fret' && (
                  <pattern id={patternId} width="40" height="28" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="2" x2="40" y2="2" stroke={lineTone} strokeWidth="1" />
                    <line x1="0" y1="26" x2="40" y2="26" stroke={lineTone} strokeWidth="1" />
                    <path
                      d="M4 22 V6 H20 V18 H12 V12 H16 M24 6 V22 H36 V10 H30"
                      fill="none"
                      stroke={lineTone}
                      strokeWidth="1.15"
                    />
                    <rect x="19" y="13" width="2" height="2" fill={strokeHex} fillOpacity="0.85" />
                  </pattern>
                )}

                {pattern === 'art-deco-chevron' && (
                  <pattern id={patternId} width="36" height="28" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="3" x2="36" y2="3" stroke={lineTone} strokeWidth="1" />
                    <line x1="0" y1="25" x2="36" y2="25" stroke={lineTone} strokeWidth="1" />
                    <path
                      d="M0 14 L9 6 L18 14 L27 6 L36 14 M0 22 L9 14 L18 22 L27 14 L36 22"
                      fill="none"
                      stroke={lineTone}
                      strokeWidth="1.1"
                    />
                    <circle cx="18" cy="14" r="1.7" fill={strokeHex} fillOpacity="0.85" />
                  </pattern>
                )}

                {pattern === 'barbican-grid' && (
                  <pattern id={patternId} width="32" height="28" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="2" x2="32" y2="2" stroke={lineTone} strokeWidth="1" />
                    <line x1="0" y1="26" x2="32" y2="26" stroke={lineTone} strokeWidth="1" />
                    <rect
                      x="3"
                      y="6"
                      width="10"
                      height="16"
                      rx="1"
                      fill="none"
                      stroke={lineTone}
                      strokeWidth="1.1"
                    />
                    <rect
                      x="19"
                      y="6"
                      width="10"
                      height="16"
                      rx="1"
                      fill="none"
                      stroke={lineTone}
                      strokeWidth="1.1"
                    />
                    <line x1="16" y1="8" x2="16" y2="20" stroke={strokeHex} strokeWidth="1.4" strokeOpacity="0.7" />
                  </pattern>
                )}

                {pattern === 'victorian-tile' && (
                  <pattern id={patternId} width="32" height="28" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="2" x2="32" y2="2" stroke={lineTone} strokeWidth="1" />
                    <line x1="0" y1="26" x2="32" y2="26" stroke={lineTone} strokeWidth="1" />
                    <polygon
                      points="16,5 25,14 16,23 7,14"
                      fill="none"
                      stroke={lineTone}
                      strokeWidth="1.1"
                    />
                    <polygon
                      points="16,10 20,14 16,18 12,14"
                      fill={strokeHex}
                      fillOpacity="0.45"
                    />
                    <line x1="0" y1="14" x2="7" y2="14" stroke={lineTone} strokeWidth="1" />
                    <line x1="25" y1="14" x2="32" y2="14" stroke={lineTone} strokeWidth="1" />
                  </pattern>
                )}
              </defs>
              <rect width="100%" height="28" fill={`url(#${patternId})`} />
            </svg>
          </motion.div>

          {/* Optional Centred Editorial Stamp */}
          {label && (
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              style={{ backgroundColor: labelBg, color: labelText }}
              className="absolute inline-flex items-center gap-2.5 border border-[var(--emtrc-border)] px-3.5 py-1 shadow-xs"
            >
              <span
                className="h-1.5 w-1.5 shrink-0"
                style={{ backgroundColor: strokeHex }}
                aria-hidden="true"
              />
              <span className="font-mono-data text-[10px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap">
                {label}
              </span>
              <span
                className="h-1.5 w-1.5 shrink-0"
                style={{ backgroundColor: strokeHex }}
                aria-hidden="true"
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
