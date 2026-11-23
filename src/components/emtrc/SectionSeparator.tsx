import { motion, useReducedMotion } from 'framer-motion';

interface AnimatedSectionHeaderProps {
  index?: string;
  kicker: string;
  headline: string;
  accentWord?: string;
  subtitle?: string;
  tone?: 'coral' | 'amber' | 'emerald' | 'blue';
  light?: boolean;
  className?: string;
}

const HEADER_TONE_CLASSES: Record<
  'coral' | 'amber' | 'emerald' | 'blue',
  { bar: string; kicker: string; accent: string; pill: string }
> = {
  coral: {
    bar: 'bg-[#E03528]',
    kicker: 'text-[#E03528] dark:text-[#FF8C73]',
    accent: 'text-[#E03528] dark:text-[#FF8C73]',
    pill: 'bg-[#E03528]/12 text-[#C82419] dark:bg-[#FF6B5B]/15 dark:text-[#FF8C73]',
  },
  amber: {
    bar: 'bg-[#D97706]',
    kicker: 'text-[#B45309] dark:text-[#FBBF24]',
    accent: 'text-[#B45309] dark:text-[#FBBF24]',
    pill: 'bg-[#D97706]/12 text-[#92400E] dark:bg-[#F59E0B]/15 dark:text-[#FCD34D]',
  },
  emerald: {
    bar: 'bg-[#059669]',
    kicker: 'text-[#047857] dark:text-[#34D399]',
    accent: 'text-[#047857] dark:text-[#34D399]',
    pill: 'bg-[#059669]/12 text-[#065F46] dark:bg-[#10B981]/15 dark:text-[#6EE7B7]',
  },
  blue: {
    bar: 'bg-[#2563EB]',
    kicker: 'text-[#1D4ED8] dark:text-[#60A5FA]',
    accent: 'text-[#1D4ED8] dark:text-[#93C5FD]',
    pill: 'bg-[#2563EB]/12 text-[#1E40AF] dark:bg-[#3B82F6]/15 dark:text-[#93C5FD]',
  },
};

/**
 * Animated colour-differentiated section block header so consecutive sections
 * never blur together into flat text on white backgrounds.
 */
export function AnimatedSectionHeader({
  index,
  kicker,
  headline,
  accentWord,
  subtitle,
  tone = 'coral',
  light = false,
  className = '',
}: AnimatedSectionHeaderProps) {
  const prefersReduced = useReducedMotion();
  const palette = HEADER_TONE_CLASSES[tone];

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div className="flex items-center gap-3">
        {index && (
          <span
            className={`inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 font-mono-data text-[11px] font-bold ${
              light ? 'bg-white/12 text-white' : palette.pill
            }`}
          >
            {index}
          </span>
        )}
        <motion.span
          initial={prefersReduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left' }}
          className={`h-[2px] w-7 shrink-0 ${palette.bar}`}
        />
        <span
          className={`font-mono-data text-[11px] font-semibold uppercase tracking-[0.14em] ${
            light ? 'text-[#FF9D85]' : palette.kicker
          }`}
        >
          {kicker}
        </span>
      </div>

      <h2
        className={`mt-3 font-editorial text-3xl font-bold leading-[1.06] tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem] ${
          light ? 'text-white' : 'text-[var(--emtrc-ink)]'
        }`}
      >
        {headline}{' '}
        {accentWord && (
          <span
            className={`font-editorial-italic font-normal ${
              light ? 'text-[#FF9D85]' : palette.accent
            }`}
          >
            {accentWord}
          </span>
        )}
      </h2>

      {subtitle && (
        <p
          className={`mt-3 max-w-2xl text-sm leading-relaxed sm:text-base ${
            light ? 'text-[#BAC5DC]' : 'text-[var(--emtrc-muted)]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
