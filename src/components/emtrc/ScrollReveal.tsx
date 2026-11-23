import { Children, type ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

const EDITORIAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  /**
   * When true (default), automatically wraps each direct child in a staggered
   * fade-in + scale motion item. Set to false when nesting explicit <ScrollRevealItem> children.
   */
  autoWrapChildren?: boolean;
  'data-testid'?: string;
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 16,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.44,
      ease: EDITORIAL_EASE,
    },
  },
};

/**
 * Staggered fade-in and scale scroll-reveal container powered by Framer Motion.
 * Designed for service card grids, portfolio mosaics and metric decks.
 */
export function ScrollReveal({
  children,
  className = '',
  staggerDelay = 0.05,
  delayChildren = 0.02,
  autoWrapChildren = true,
  'data-testid': testId = 'scroll-reveal-grid',
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div data-testid={testId} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      data-testid={testId}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.04 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {autoWrapChildren
        ? Children.map(children, (child, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="h-full will-change-transform"
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}

interface ScrollRevealItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * Explicit child item for <ScrollReveal autoWrapChildren={false}> when custom grid spans
 * (e.g. lg:col-span-2) are required on individual Bento cards.
 */
export function ScrollRevealItem({ children, className = '' }: ScrollRevealItemProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={itemVariants} className={`will-change-transform ${className}`}>
      {children}
    </motion.div>
  );
}
