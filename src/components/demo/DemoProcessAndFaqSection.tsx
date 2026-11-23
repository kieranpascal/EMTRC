import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { Reveal } from '../emtrc/Reveal';
import { ScrollReveal, ScrollRevealItem } from '../emtrc/ScrollReveal';
import { DemoAnimatedShowcase } from './DemoAnimatedShowcase';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function DemoCraftAndProcessSection() {
  const { blueprint, theme } = useSite();
  const isReversed =
    blueprint.archetype === 'atelier-magazine' || blueprint.archetype === 'gallery-minimal';

  return (
    <section
      id="process"
      className="border-b border-[var(--site-border)] bg-[var(--site-surface-alt)] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Interactive Niche Animated Illustration */}
          <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
            <Reveal>
              <p className="font-mono-data text-xs font-semibold text-[var(--site-accent-text)]">
                {blueprint.craftKicker}
              </p>
              <h2
                className={`font-display mt-2.5 text-2xl font-bold leading-tight text-[var(--site-ink)] sm:text-3xl ${theme.headingTracking} ${theme.headingTransform}`}
              >
                {blueprint.craftHeadline}
              </h2>
              <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-[var(--site-muted)]">
                {blueprint.craftSummary}
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-6">
              <DemoAnimatedShowcase />
            </Reveal>
          </div>

          {/* 3-Step Craft & Customer Experience */}
          <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : ''}`}>
            <Reveal>
              <p className="font-mono-data text-xs font-semibold text-[var(--site-muted)]">
                How we work
              </p>
              <h2
                className={`font-display mt-2.5 text-2xl font-bold leading-tight text-[var(--site-ink)] sm:text-3xl ${theme.headingTracking} ${theme.headingTransform}`}
              >
                {blueprint.processHeading}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--site-muted)]">
                {blueprint.processSubheading}
              </p>
            </Reveal>

            <ScrollReveal autoWrapChildren={false} className="mt-7 space-y-4">
              {blueprint.processSteps.map((step) => (
                <ScrollRevealItem key={step.number}>
                  <div
                    className={`border border-[var(--site-border)] bg-[var(--site-surface)] p-5 sm:p-6 ${theme.cardRadius}`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-lg font-bold text-[var(--site-ink)]">
                        <span className="font-mono-data mr-2.5 text-sm text-[var(--site-accent-text)]">
                          {step.number}.
                        </span>
                        {step.title}
                      </h3>
                      <span className="font-mono-data text-xs text-[var(--site-muted)]">
                        {step.durationOrNote}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--site-muted)]">
                      {step.description}
                    </p>
                  </div>
                </ScrollRevealItem>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DemoLocalFaqSection() {
  const { site, blueprint, theme } = useSite();
  const prefersReduced = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="border-b border-[var(--site-border)] bg-[var(--site-bg)] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="font-mono-data text-xs font-semibold text-[var(--site-accent-text)]">
                Common questions
              </p>
              <h2
                className={`font-display mt-2.5 text-2xl font-bold leading-tight text-[var(--site-ink)] sm:text-3xl ${theme.headingTracking} ${theme.headingTransform}`}
              >
                Good to know before you visit.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--site-muted)]">
                Straight answers from {site.businessName} in {site.borough}, London. Need something specific? Call{' '}
                <span className="font-semibold tabular-nums text-[var(--site-ink)]">{site.phone}</span>.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-[var(--site-border)] border-y border-[var(--site-border)]">
              {blueprint.faqs.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={item.question} className="py-1">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    >
                      <span className="font-display text-base font-bold text-[var(--site-ink)] sm:text-lg">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-[var(--site-accent-text)] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={prefersReduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={prefersReduced ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 pr-8 text-sm leading-relaxed text-[var(--site-muted)]">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
