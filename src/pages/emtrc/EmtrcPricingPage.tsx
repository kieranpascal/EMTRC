import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Check, Minus, ShieldCheck, Sparkles } from 'lucide-react';
import { SITE } from '../../content/site';
import { calculatePlanPricing, formatGbp, type BillingCycle } from '../../utils/pricing';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { PageHeader } from '../../components/emtrc/PageHeader';
import { MagneticLink } from '../../components/emtrc/MagneticLink';
import { Reveal, SpotlightCard } from '../../components/emtrc/Reveal';
import { ScrollReveal, ScrollRevealItem } from '../../components/emtrc/ScrollReveal';
import { AnimatedSectionHeader } from '../../components/emtrc/SectionSeparator';
import { LondonEdgeSpeedIllustration } from '../../components/emtrc/AnimatedIllustrations';

interface MatrixGroup {
  groupTitle: string;
  accentClass: string;
  rows: readonly {
    feature: string;
    detail: string;
    starter: string | boolean;
    business: string | boolean;
    growth: string | boolean;
  }[];
}

const COMPARISON_GROUPS: readonly MatrixGroup[] = [
  {
    groupTitle: 'Website Architecture & Speed',
    accentClass: 'text-[#FF8C73]',
    rows: [
      {
        feature: 'Custom pages included',
        detail: 'Mobile-first design tailored to your London trade',
        starter: '1 page',
        business: 'Up to 5 pages',
        growth: 'Up to 10 pages',
      },
      {
        feature: 'Dedicated London borough SEO pages',
        detail: 'Individual pages targeting neighbouring postcodes',
        starter: false,
        business: '1 core borough',
        growth: '3 local area pages',
      },
      {
        feature: 'Cloudflare global edge hosting & SSL',
        detail: 'Sub-second 4G load time with 99.99% uptime',
        starter: true,
        business: true,
        growth: true,
      },
      {
        feature: 'Online booking & tap-to-call integration',
        detail: 'Fresha, Booksy, Calendly, WhatsApp & phone links',
        starter: true,
        business: true,
        growth: true,
      },
    ],
  },
  {
    groupTitle: 'Domains, Business Email & Monthly Care',
    accentClass: 'text-amber-400',
    rows: [
      {
        feature: '.co.uk or .com domain in your name',
        detail: 'Zero lock-in — full Nominet / EPP transfer freedom',
        starter: '£15/yr add-on',
        business: 'Included free',
        growth: 'Included free',
      },
      {
        feature: 'Branded @yourbusiness email mailbox',
        detail: 'Configured with SPF, DKIM & DMARC anti-spam records',
        starter: '£3/mo add-on',
        business: '1 mailbox incl.',
        growth: '2 mailboxes incl.',
      },
      {
        feature: 'Monthly studio edits & photo swaps',
        detail: 'WhatsApp or email changes live inside 24 hours',
        starter: '15 mins / mo',
        business: '30 mins / mo',
        growth: '60 mins / mo',
      },
      {
        feature: 'emtrc Pocket App & Client Portal',
        detail: 'Track enquiries, DNS vault & request edits on iOS/Android',
        starter: 'Portal access',
        business: 'Full App + Portal',
        growth: 'Full App + Priority',
      },
    ],
  },
  {
    groupTitle: 'Google Maps, Reviews & AI Search',
    accentClass: 'text-emerald-400',
    rows: [
      {
        feature: 'LocalBusiness Schema.org JSON-LD',
        detail: 'Structured data read by Google, ChatGPT & Apple Maps',
        starter: 'Core schema',
        business: 'Full trade schema',
        growth: 'Multi-borough schema',
      },
      {
        feature: 'Google Business Profile optimisation',
        detail: 'Category audit, hours sync & service price alignment',
        starter: false,
        business: 'Initial setup',
        growth: 'Ongoing monthly care',
      },
      {
        feature: 'Cookieless monthly call & click report',
        detail: 'Plain-English summary — zero cookie popups',
        starter: 'Quarterly',
        business: 'Monthly brief',
        growth: 'Monthly + strategy',
      },
      {
        feature: 'AI Front-Desk bolt-ons (Lead Catcher / Reviews / AI Voice)',
        detail: 'Add 8-second missed-call SMS or 24/7 AI Receptionist anytime',
        starter: 'Available',
        business: 'Available',
        growth: 'Priority onboarding',
      },
    ],
  },
];

function MatrixCell({ value, featured = false }: { value: string | boolean; featured?: boolean }) {
  if (value === true) {
    return (
      <span
        aria-label="Included"
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
          featured ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-emerald-400'
        }`}
      >
        <Check className="h-4 w-4" aria-hidden="true" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span aria-label="Not included" className="inline-flex items-center justify-center text-white/25">
        <Minus className="h-4 w-4" aria-hidden="true" />
      </span>
    );
  }
  return (
    <span
      className={`font-mono-data text-xs font-semibold ${
        featured ? 'text-white' : 'text-[#CBD2E1]'
      }`}
    >
      {value}
    </span>
  );
}

export function EmtrcPricingPage() {
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  const showExVat = SITE.flags.showExVat;

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="Pricing — emtrc | Websites & Hosting for London Local Businesses"
        description="Transparent monthly plans from £39/month with 2 months free on annual prepay, plus one-off builds and add-ons for London small businesses."
      />

      {/* Architectural Editorial Page Header + Billing Toggle */}
      <PageHeader
        kicker="Transparent London Pricing"
        headlineLine1="One monthly price."
        headlineLine2="No hidden extras."
        description={SITE.pricing.termSummary}
        backdropImage="/src/assets/images/london_studio_dusk_header_1795426202168.jpg"
        backdropAlt="East London studio street at dusk"
        metrics={[
          { value: '£39', label: 'Starter monthly from' },
          { value: '2 mo', label: 'Free on annual prepay' },
          { value: '0%', label: 'Domain lock-in or fees' },
          { value: '48h', label: 'First working demo link' },
        ]}
        bottomBar={
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono-data text-xs uppercase tracking-[0.14em] text-[#9BA3B5]">
              Select billing cycle · Prices {showExVat ? 'ex VAT' : 'inc VAT'}
            </p>
            <div className="inline-flex rounded-xl border border-white/15 bg-white/[0.06] p-1">
              <button
                type="button"
                onClick={() => setCycle('monthly')}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors whitespace-nowrap ${
                  cycle === 'monthly'
                    ? 'bg-[var(--emtrc-accent)] text-white'
                    : 'text-[#C2C9D9] hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setCycle('annual')}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors whitespace-nowrap ${
                  cycle === 'annual'
                    ? 'bg-[var(--emtrc-accent)] text-white'
                    : 'text-[#C2C9D9] hover:text-white'
                }`}
              >
                Annual (2 months free)
              </button>
            </div>
          </div>
        }
      />

      {/* 3 Main Monthly Plans */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-sand)]">
        <div className="mx-auto max-w-[1200px] px-5 py-11 sm:px-8 sm:py-14">
          <ScrollReveal autoWrapChildren={false} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {SITE.pricing.plans.map((plan) => {
              const calc = calculatePlanPricing(plan.monthlyPrice, cycle, showExVat);
              const popular = Boolean(plan.badge);
              return (
                <ScrollRevealItem key={plan.id} className="flex">
                  <SpotlightCard
                    darkSurface={popular}
                    className={`flex w-full flex-col justify-between rounded-2xl border p-6 sm:p-7 ${
                      popular
                        ? 'border-[var(--emtrc-accent)] bg-[#0F1219] text-[#F5F3EE] shadow-2xl ring-1 ring-[var(--emtrc-accent)]/35'
                        : 'border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] text-[var(--emtrc-ink)]'
                    }`}
                  >
                    {popular && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[var(--emtrc-accent)] via-[#FF8C73] to-[var(--emtrc-accent)]"
                      />
                    )}
                    <article data-testid={`plan-card-${plan.id}`} className="flex h-full flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h2 className="font-editorial text-2xl font-bold">{plan.name}</h2>
                          {plan.badge && (
                            <span className="font-mono-data text-[11px] font-bold uppercase tracking-wider text-[#FF8C73]">
                              {plan.badge}
                            </span>
                          )}
                        </div>
                        <p className={`mt-2 text-sm ${popular ? 'text-[#BAC5DC]' : 'text-[var(--emtrc-muted)]'}`}>
                          {plan.summary}
                        </p>

                        <div dir="ltr" className="mt-6 inline-flex items-baseline gap-1.5">
                          <span className="font-mono-data text-4xl font-bold tabular-nums">
                            {formatGbp(calc.displayMonthly)}
                          </span>
                          <span className={`text-sm ${popular ? 'text-[#BAC5DC]' : 'text-[var(--emtrc-muted)]'}`}>
                            /month{calc.vatSuffix}
                          </span>
                        </div>

                        <p dir="ltr" className={`mt-1.5 font-mono-data text-xs tabular-nums ${popular ? 'text-[#9BA7C2]' : 'text-[var(--emtrc-muted)]'}`}>
                          {cycle === 'annual'
                            ? `${formatGbp(calc.annualTotal)} billed annually (save ${formatGbp(calc.annualSavings)}) + ${formatGbp(plan.setupFee)} setup`
                            : `+ ${formatGbp(plan.setupFee)} one-off setup · about ${calc.dailyEquivalent}/day`}
                        </p>

                      <p className={`mt-4 text-xs font-semibold ${popular ? 'text-[#FF8C73]' : 'text-[var(--emtrc-accent)]'}`}>
                        Best for: {plan.bestFor}
                      </p>

                      <ul className="mt-5 space-y-2.5 border-t border-current/15 pt-5 text-sm">
                        {plan.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5">
                            <Check
                              className={`mt-0.5 h-4 w-4 shrink-0 ${
                                popular ? 'text-[#FF8C73]' : 'text-[var(--emtrc-accent)]'
                              }`}
                              aria-hidden="true"
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <MagneticLink
                        to={plan.ctaTo}
                        strength={popular ? 0.24 : 0.18}
                        maxOffset={8}
                        wrapperClassName="w-full"
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                          popular
                            ? 'bg-[var(--emtrc-accent)] text-white shadow-[0_8px_24px_-6px_rgba(226,59,45,0.55)] hover:bg-[var(--emtrc-accent-hover)]'
                            : 'border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] text-[var(--emtrc-ink)] hover:border-[var(--emtrc-accent)] hover:text-[var(--emtrc-accent)]'
                        }`}
                      >
                        <span>{plan.ctaLabel}</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </MagneticLink>
                    </div>
                    </article>
                  </SpotlightCard>
                </ScrollRevealItem>
              );
            })}
          </ScrollReveal>

          {/* One-Off Build Card */}
          <div
            id="one-off"
            className="mt-8 rounded-2xl border border-[var(--emtrc-navy-border)] bg-[#0F1219] p-7 text-white shadow-lg sm:p-8"
          >
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="font-mono-data text-xs font-semibold uppercase tracking-wider text-[#FF8C73]">
                  Prefer to pay up front?
                </p>
                <h2 className="mt-1 font-editorial text-2xl font-bold text-white sm:text-3xl">
                  {SITE.pricing.oneOff.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#BAC5DC]">
                  {SITE.pricing.oneOff.summary}
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <p className="font-mono-data text-3xl font-bold tabular-nums text-white">
                  £{SITE.pricing.oneOff.buildPrice}
                  <span className="text-sm font-normal text-[#9BA3B5]">
                    {' '}once{showExVat ? ' ex VAT' : ''}
                  </span>
                </p>
                <p className="mt-1 font-mono-data text-xs tabular-nums text-[#9BA3B5]">
                  + £{SITE.pricing.oneOff.careMonthly}/month care plan · Edits £{SITE.pricing.oneOff.hourlyEdits}/hour
                </p>
                <div className="mt-4">
                  <Link
                    to="/free-demo?plan=one-off"
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                  >
                    <span>Request one-off quote</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Studio-Grade Visual Side-by-Side Comparison Matrix */}
      <section className="border-b border-[var(--emtrc-navy-border)] bg-[#0B0D12] text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <AnimatedSectionHeader
              index="01"
              kicker="Side-by-Side Matrix · Synced to Billing Cycle"
              headline="Compare every plan"
              accentWord="feature by feature."
              subtitle="Every tier runs on Cloudflare’s global edge with zero agency domain lock-in. Switch between Monthly and Annual above to preview exact rates."
              tone="coral"
              light
            />
            <div
              role="group"
              aria-label="Comparison table billing cycle"
              className="inline-flex items-center gap-1 rounded-xl border border-white/12 bg-white/[0.04] p-1 font-mono-data text-xs whitespace-nowrap"
            >
              <button
                type="button"
                onClick={() => setCycle('monthly')}
                className={`rounded-lg px-3 py-1.5 font-semibold transition-colors ${
                  cycle === 'monthly' ? 'bg-white text-[#0B0D12]' : 'text-[#CBD2E1] hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setCycle('annual')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition-colors ${
                  cycle === 'annual'
                    ? 'bg-[var(--emtrc-accent)] text-white'
                    : 'text-[#CBD2E1] hover:text-white'
                }`}
              >
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                <span>Annual (2 mo free)</span>
              </button>
            </div>
          </div>

          <div
            id="compare"
            data-testid="pricing-comparison-matrix"
            className="mt-9 scroll-mt-24 overflow-x-auto rounded-2xl border border-white/12 bg-[#111520] shadow-2xl"
          >
            <div className="min-w-[780px]">
              {/* Sticky Tier Column Headers */}
              <div className="grid grid-cols-[minmax(240px,1.65fr)_1fr_1.05fr_1fr] border-b border-white/12 bg-[#0D1018]">
                <div className="flex flex-col justify-end p-6">
                  <p className="font-mono-data text-[11px] font-semibold uppercase tracking-wider text-[#9BA3B5]">
                    Capability Breakdown
                  </p>
                  <p className="mt-1 font-editorial text-xl font-bold text-white">
                    Starter vs Business vs Growth
                  </p>
                </div>

                {SITE.pricing.plans.map((plan) => {
                  const calc = calculatePlanPricing(plan.monthlyPrice, cycle, showExVat);
                  const popular = Boolean(plan.badge);
                  return (
                    <div
                      key={plan.id}
                      className={`flex flex-col justify-between border-l border-white/10 p-5 text-center ${
                        popular ? 'bg-[#1D1418] ring-1 ring-inset ring-[#E03528]/50' : ''
                      }`}
                    >
                      <div>
                        <p
                          className={`font-mono-data text-[10px] font-bold uppercase tracking-widest ${
                            popular ? 'text-[#FF8C73]' : 'text-[#8E96A8]'
                          }`}
                        >
                          {popular ? 'Most Popular' : plan.id}
                        </p>
                        <p className="mt-1 font-editorial text-xl font-bold text-white">{plan.name}</p>
                        <p className="mt-2 font-mono-data text-2xl font-bold text-white tabular-nums">
                          {formatGbp(calc.displayMonthly)}
                          <span className="text-xs font-normal text-[#9BA3B5]">/mo</span>
                        </p>
                      </div>
                      <Link
                        to={plan.ctaTo}
                        className={`mt-4 inline-flex w-full items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                          popular
                            ? 'bg-[var(--emtrc-accent)] text-white hover:bg-[var(--emtrc-accent-hover)]'
                            : 'border border-white/15 bg-white/[0.04] text-white hover:border-white/40'
                        }`}
                      >
                        Choose {plan.name}
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Grouped Feature Sections */}
              {COMPARISON_GROUPS.map((group) => (
                <div key={group.groupTitle}>
                  <div className="border-y border-white/10 bg-white/[0.03] px-6 py-3">
                    <p className={`font-mono-data text-[11px] font-bold uppercase tracking-[0.14em] ${group.accentClass}`}>
                      {group.groupTitle}
                    </p>
                  </div>

                  <div className="divide-y divide-white/[0.07]">
                    {group.rows.map((row) => (
                      <div
                        key={row.feature}
                        className="grid grid-cols-[minmax(240px,1.65fr)_1fr_1.05fr_1fr] items-center transition-colors hover:bg-white/[0.025]"
                      >
                        <div className="px-6 py-4">
                          <p className="text-sm font-semibold text-white">{row.feature}</p>
                          <p className="mt-0.5 text-xs text-[#8E96A8]">{row.detail}</p>
                        </div>
                        <div className="flex h-full items-center justify-center border-l border-white/[0.08] px-4 py-4 text-center">
                          <MatrixCell value={row.starter} />
                        </div>
                        <div className="flex h-full items-center justify-center border-l border-white/[0.08] bg-[#E03528]/[0.07] px-4 py-4 text-center">
                          <MatrixCell value={row.business} featured />
                        </div>
                        <div className="flex h-full items-center justify-center border-l border-white/[0.08] px-4 py-4 text-center">
                          <MatrixCell value={row.growth} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Domains, Email & AI Add-ons Card Grid */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <AnimatedSectionHeader
            index="02"
            kicker="Modular Upgrades · Add Only What You Need"
            headline="Domains, email & AI bolt-ons"
            accentWord="with plain-English pricing."
            subtitle="Start lean with your website today and switch on extra mailboxes, Review Engine, Lead Catcher or Cloud VoIP whenever you are ready."
            tone="amber"
          />

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SITE.pricing.addOns.map((addon) => (
              <div
                key={addon.item}
                className="flex flex-col justify-between rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] p-5 transition-colors hover:border-[var(--emtrc-accent)]"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-editorial text-lg font-bold text-[var(--emtrc-ink)]">
                      {addon.item}
                    </h3>
                    <span className="font-mono-data text-sm font-bold text-[var(--emtrc-accent)] whitespace-nowrap">
                      {addon.price}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--emtrc-muted)] sm:text-sm">
                    {addon.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Monthly Explainer + Cloudflare Edge Performance Proof */}
      <section className="bg-[var(--emtrc-sand)]">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <AnimatedSectionHeader
                  index="03"
                  kicker="Built for Cashflow & Zero Technical Stress"
                  headline={SITE.pricing.whyMonthly.headline}
                  tone="emerald"
                />
              </div>
              <div className="lg:col-span-6">
                <LondonEdgeSpeedIllustration />
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {SITE.pricing.whyMonthly.points.map((pt, idx) => (
                <div
                  key={pt.title}
                  className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono-data text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      0{idx + 1}
                    </p>
                    <ShieldCheck className="h-4 w-4 text-[var(--emtrc-muted)]" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                    {pt.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--emtrc-muted)]">{pt.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/free-demo"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
              >
                <span>Get my free demo</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={SITE.brand.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-5 py-3.5 text-sm font-semibold text-[var(--emtrc-ink)] hover:border-[var(--emtrc-accent)]"
              >
                <Calendar className="h-4 w-4 text-[var(--emtrc-accent)]" aria-hidden="true" />
                <span>Book a 15-minute pricing chat</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </EmtrcLayout>
  );
}
