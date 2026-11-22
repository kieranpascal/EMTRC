import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  immediate?: boolean;
  className?: string;
}

/**
 * Custom editorial Reveal wrapper powered by framer-motion.
 * Uses initial={{ opacity: 0, y: 20 }}, whileInView={{ opacity: 1, y: 0 }},
 * viewport={{ once: true }}, transition={{ duration: 0.6, ease: 'easeOut' }}
 * and respects prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, immediate = false, className = '' }: RevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  if (immediate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface KickerRuleProps {
  children: ReactNode;
  light?: boolean;
  className?: string;
}

/**
 * Thin brass hairline rule + editorial kicker label.
 */
export function KickerRule({ children, light = false, className = '' }: KickerRuleProps) {
  return (
    <div
      className={`inline-flex items-start gap-3 text-xs font-bold tracking-wide leading-snug ${
        light ? 'text-[var(--emtrc-brass-light)]' : 'text-[var(--emtrc-brass)]'
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`mt-[0.52em] h-[1.5px] w-7 shrink-0 ${
          light ? 'bg-[var(--emtrc-brass-light)]' : 'bg-[var(--emtrc-brass)]'
        }`}
      />
      <span>{children}</span>
    </div>
  );
}

interface EditorialHeadingProps {
  as?: 'h1' | 'h2' | 'h3';
  line1: string;
  line2?: string;
  line2Tone?: 'brass' | 'accent' | 'muted' | 'brass-underline';
  immediate?: boolean;
  delay?: number;
  className?: string;
}

/**
 * Two-tone editorial display heading with smooth framer-motion slide-up entry.
 */
export function EditorialHeading({
  as = 'h2',
  line1,
  line2,
  line2Tone = 'brass',
  immediate = false,
  delay = 0,
  className = '',
}: EditorialHeadingProps) {
  const prefersReduced = useReducedMotion();
  const Tag = as;

  const toneClass =
    line2Tone === 'accent'
      ? 'text-[var(--emtrc-accent)]'
      : line2Tone === 'muted'
      ? 'text-[var(--emtrc-muted)]'
      : line2Tone === 'brass-underline'
      ? 'text-[var(--emtrc-brass-light)] underline decoration-[#2347FF] decoration-4 underline-offset-8'
      : 'text-[var(--emtrc-brass)]';

  if (prefersReduced) {
    return (
      <Tag className={className}>
        <span className="block">{line1}</span>
        {line2 && <span className={`mt-1 block ${toneClass}`}>{line2}</span>}
      </Tag>
    );
  }

  const animateProps = immediate
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
      };

  return (
    <Tag className={className}>
      <span className="block overflow-hidden pb-0.5">
        <motion.span
          className="block"
          {...animateProps}
          transition={{ duration: 0.6, ease: 'easeOut', delay }}
        >
          {line1}
        </motion.span>
      </span>
      {line2 && (
        <span className="mt-1 block overflow-hidden pb-1.5">
          <motion.span
            className={`block ${toneClass}`}
            {...animateProps}
            transition={{ duration: 0.6, ease: 'easeOut', delay: delay + 0.08 }}
          >
            {line2}
          </motion.span>
        </span>
      )}
    </Tag>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

/**
 * Staggered grid/list container for cards, stats, and steps.
 */
export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.07,
}: StaggerContainerProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: 'easeOut' },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
