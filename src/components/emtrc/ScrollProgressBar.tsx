import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface ScrollProgressBarProps {
  /** Show a minimal floating progress ring & back-to-top telemetry control on long pages. */
  showFloatingPill?: boolean;
}

/**
 * High-end editorial scroll progress hairline pinned to the top of the viewport,
 * paired with a subtle spring-animated reading-depth ring on longer pages.
 */
export function ScrollProgressBar({ showFloatingPill = true }: ScrollProgressBarProps) {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 32,
    restDelta: 0.001,
  });

  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const pct = Math.min(100, Math.max(0, Math.round(latest * 100)));
    setPercent(pct);
    setVisible(latest > 0.12);
  });

  useEffect(() => {
    // Ensure clean initial state on mount
    if (typeof window !== 'undefined' && window.scrollY === 0) {
      setVisible(false);
      setPercent(0);
    }
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  const ringRadius = 11;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset = ringCircumference * (1 - percent / 100);

  return (
    <>
      {/* Top Viewport Editorial Progress Hairline */}
      <div
        data-testid="scroll-progress-bar"
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent"
      >
        <motion.div
          style={{
            scaleX: prefersReduced ? scrollYProgress : smoothProgress,
            transformOrigin: '0% 50%',
          }}
          className="h-full w-full bg-gradient-to-r from-[#B81E14] via-[var(--emtrc-accent)] to-[#FF8C73] shadow-[0_0_12px_rgba(226,59,45,0.65)]"
        />
      </div>

      {/* Subtle Floating Scroll Depth + Back-to-Top Studio Control */}
      {showFloatingPill && (
        <AnimatePresence>
          {visible && (
            <motion.button
              type="button"
              data-testid="scroll-progress-pill"
              onClick={handleBackToTop}
              aria-label={`Scroll progress ${percent}%. Back to top`}
              initial={prefersReduced ? false : { opacity: 0, y: 14, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReduced ? undefined : { opacity: 0, y: 12, scale: 0.94 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="group fixed right-5 bottom-5 z-40 inline-flex items-center gap-2 rounded-full border border-[var(--emtrc-border)] bg-[var(--emtrc-navy)]/90 py-1.5 pr-3 pl-2 text-white shadow-2xl backdrop-blur-md transition-colors hover:border-[var(--emtrc-accent)]"
            >
              <span className="relative flex h-7 w-7 items-center justify-center">
                <svg className="h-7 w-7 -rotate-90" viewBox="0 0 28 28" aria-hidden="true">
                  <circle
                    cx="14"
                    cy="14"
                    r={ringRadius}
                    fill="none"
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="14"
                    cy="14"
                    r={ringRadius}
                    fill="none"
                    stroke="var(--emtrc-accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={strokeDashoffset}
                  />
                </svg>
                <ArrowUp
                  className="absolute h-3 w-3 text-white transition-transform duration-200 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
              <span dir="ltr" className="font-mono-data text-[11px] font-semibold text-[#D6DEF0]">
                {percent}%
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
