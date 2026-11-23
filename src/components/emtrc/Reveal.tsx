import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  immediate?: boolean;
  className?: string;
}

/**
 * Reusable Framer Motion editorial reveal component.
 * Applies fade-in + slide-up entrance animation:
 * initial={{ opacity: 0, y: 20 }}, whileInView={{ opacity: 1, y: 0 }},
 * viewport={{ once: true }}, transition={{ duration: 0.6, ease: 'easeOut' }}
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

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Tactile spring-physics magnetic interaction for primary hero CTAs & studio controls.
 * Subtly attracts the wrapped element towards the pointer and springs cleanly back to rest.
 */
export function Magnetic({ children, strength = 0.24, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 260, damping: 20, mass: 0.5 });

  if (prefersReduced) {
    return <div className={`inline-block ${className}`}>{children}</div>;
  }

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    rawX.set(Math.max(-14, Math.min(14, dx * strength)));
    rawY.set(Math.max(-10, Math.min(10, dy * strength)));
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      data-testid="magnetic-element"
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface HeroParallaxContextValue {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}

const HeroParallaxContext = createContext<HeroParallaxContextValue | null>(null);

interface HeroParallaxStageProps {
  children: ReactNode;
  className?: string;
}

/**
 * Mouse-tracking 3D depth parallax stage for the homepage hero.
 * Smoothly interpolates pointer position across child <ParallaxLayer> planes at 60fps.
 */
export function HeroParallaxStage({ children, className = '' }: HeroParallaxStageProps) {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 120, damping: 24, mass: 0.6 });
  const pointerY = useSpring(rawY, { stiffness: 120, damping: 24, mass: 0.6 });

  const handleMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    rawX.set(Math.max(-1, Math.min(1, normX)));
    rawY.set(Math.max(-1, Math.min(1, normY)));
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <HeroParallaxContext.Provider value={{ pointerX, pointerY }}>
      <section
        ref={ref}
        data-testid="hero-parallax-stage"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </section>
    </HeroParallaxContext.Provider>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  depth?: number;
  tilt?: number;
  className?: string;
}

/**
 * Child depth layer driven by its ancestor <HeroParallaxStage> pointer motion values.
 */
export function ParallaxLayer({ children, depth = 12, tilt = 0, className = '' }: ParallaxLayerProps) {
  const ctx = useContext(HeroParallaxContext);
  const prefersReduced = useReducedMotion();
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);

  const px = ctx?.pointerX ?? fallbackX;
  const py = ctx?.pointerY ?? fallbackY;

  const x = useTransform(px, [-1, 1], [-depth, depth]);
  const y = useTransform(py, [-1, 1], [-depth * 0.75, depth * 0.75]);
  const rotateY = useTransform(px, [-1, 1], [-tilt, tilt]);
  const rotateX = useTransform(py, [-1, 1], [tilt, -tilt]);

  if (prefersReduced || !ctx) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      data-testid="parallax-layer"
      style={{
        x,
        y,
        rotateX: tilt ? rotateX : undefined,
        rotateY: tilt ? rotateY : undefined,
        transformPerspective: tilt ? 1100 : undefined,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  darkSurface?: boolean;
}

/**
 * Studio interactive surface card with subtle pointer-tracking radial sheen and micro-elevation.
 */
export function SpotlightCard({ children, className = '', darkSurface = false }: SpotlightCardProps) {
  const prefersReduced = useReducedMotion();
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, ${
    darkSurface ? 'rgba(255, 255, 255, 0.065)' : 'rgba(200, 36, 25, 0.055)'
  }, transparent 75%)`;

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleLeave = () => {
    mouseX.set(-300);
    mouseY.set(-300);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={prefersReduced ? undefined : { y: -3 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden ${className}`}
    >
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 z-10 opacity-100 transition-opacity duration-300"
        />
      )}
      {children}
    </motion.div>
  );
}

export { ScrollProgressBar } from './ScrollProgressBar';

interface ParallaxFrameProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

/**
 * Subtle scroll-linked parallax wrapper for documentary photography.
 */
export function ParallaxFrame({ children, offset = 28, className = '' }: ParallaxFrameProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  if (prefersReduced) {
    return <div className={`overflow-hidden ${className}`}>{children}</div>;
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="h-full w-full scale-[1.06]">
        {children}
      </motion.div>
    </div>
  );
}

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

/**
 * Smooth frame-interpolated numeric counter triggered once on viewport entry.
 */
export function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(prefersReduced ? target : 0);

  useEffect(() => {
    if (!inView || prefersReduced) {
      setDisplay(target);
      return;
    }
    const duration = 900;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(target * eased);
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, prefersReduced, target]);

  return (
    <span ref={ref} className={`font-mono-data ${className}`}>
      {prefix}
      {decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString('en-GB')}
      {suffix}
    </span>
  );
}

interface KickerRuleProps {
  children: ReactNode;
  light?: boolean;
  className?: string;
}

/**
 * Architectural hairline rule + mono kicker label.
 */
export function KickerRule({ children, light = false, className = '' }: KickerRuleProps) {
  return (
    <div
      className={`inline-flex items-start gap-3 font-mono-data text-[11px] font-medium tracking-wider leading-snug ${
        light ? 'text-[var(--emtrc-brass-light)]' : 'text-[var(--emtrc-accent)]'
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`mt-[0.58em] h-[1.5px] w-7 shrink-0 ${
          light ? 'bg-[var(--emtrc-brass-light)]' : 'bg-[var(--emtrc-accent)]'
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
 * Two-tone masked architectural display headline with smooth framer-motion slide-up.
 */
export function EditorialHeading({
  as = 'h2',
  line1,
  line2,
  line2Tone = 'accent',
  immediate = false,
  delay = 0,
  className = '',
}: EditorialHeadingProps) {
  const prefersReduced = useReducedMotion();
  const Tag = as;

  const toneClass =
    line2Tone === 'muted'
      ? 'text-[var(--emtrc-muted)]'
      : line2Tone === 'brass-underline'
      ? 'text-[var(--emtrc-brass-light)] underline decoration-[var(--emtrc-brass-light)]/45 decoration-2 underline-offset-8'
      : line2Tone === 'brass'
      ? 'text-[var(--emtrc-accent)]'
      : 'text-[var(--emtrc-accent)]';

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

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.075,
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
