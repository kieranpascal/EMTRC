import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Check } from 'lucide-react';
import { SITE } from '../../content/site';
import { calculatePlanPricing, formatGbp, type BillingCycle } from '../../utils/pricing';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { Reveal } from '../../components/emtrc/Reveal';

export function EmtrcPricingPage() {
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  const showExVat = SITE.flags.showExVat;

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="Pricing — emtrc | Websites & Hosting for London Local Businesses"
        description="Transparent monthly plans from £39/month with 2 months free on annual prepay, plus one-off builds and add-ons for London small businesses."
      />

      {/* Page Hero + Billing Toggle */}
      <section className="border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 pt-14 pb-16 sm:px-8 sm:pt-20 sm:pb-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[var(--emtrc-brass)]">
                Transparent London pricing
              </p>
              <h1 className="mt-3 font-editorial text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">
                One monthly price. No hidden extras.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[var(--emtrc-muted)]">
                {SITE.pricing.termSummary}
              </p>
            </div>

            {/* Monthly / Annual Segmented Control */}
            <div className="inline-flex self-start rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-1">
              <button
                type="button"
                onClick={() => setCycle('monthly')}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors whitespace-nowrap ${
                  cycle === 'monthly'
                    ? 'bg-[var(--emtrc-navy)] text-white dark:bg-[var(--emtrc-accent)]'
                    : 'text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setCycle('annual')}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors whitespace-nowrap ${
                  cycle === 'annual'
                    ? 'bg-[var(--emtrc-navy)] text-white dark:bg-[var(--emtrc-accent)]'
                    : 'text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]'
                }`}
              >
                Annual (2 months free)
              </button>
            </div>
          </div>

          {/* 3 Main Monthly Plans */}
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {SITE.pricing.plans.map((plan) => {
              const calc = calculatePlanPricing(plan.monthlyPrice, cycle, showExVat);
              const popular = Boolean(plan.badge);
              return (
                <article
                  key={plan.id}
                  data-testid={`plan-card-${plan.id}`}
                  className={`flex flex-col justify-between rounded-2xl border p-7 ${
                    popular
                      ? 'border-[var(--emtrc-accent)] bg-[var(--emtrc-navy)] text-[#F5F3EE]'
                      : 'border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] text-[var(--emtrc-ink)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-editorial text-2xl font-bold">{plan.name}</h2>
                      {plan.badge && (
                        <span className="text-xs font-semibold text-[var(--emtrc-brass-light)]">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <p className={`mt-2 text-sm ${popular ? 'text-[#BAC5DC]' : 'text-[var(--emtrc-muted)]'}`}>
                      {plan.summary}
                    </p>

                    <div className="mt-6 flex items-baseline gap-1.5">
                      <span className="font-editorial text-4xl font-extrabold tabular-nums">
                        {formatGbp(calc.displayMonthly)}
                      </span>
                      <span className={`text-sm ${popular ? 'text-[#BAC5DC]' : 'text-[var(--emtrc-muted)]'}`}>
                        /month{calc.vatSuffix}
                      </span>
                    </div>

                    <p className={`mt-1.5 text-xs tabular-nums ${popular ? 'text-[#9BA7C2]' : 'text-[var(--emtrc-muted)]'}`}>
                      {cycle === 'annual'
                        ? `${formatGbp(calc.annualTotal)} billed annually (save ${formatGbp(calc.annualSavings)}) + ${formatGbp(plan.setupFee)} setup`
                        : `+ ${formatGbp(plan.setupFee)} one-off setup · about ${calc.dailyEquivalent}/day`}
                    </p>

                    <p className={`mt-4 text-xs font-semibold ${popular ? 'text-[var(--emtrc-brass-light)]' : 'text-[var(--emtrc-brass)]'}`}>
                      Best for: {plan.bestFor}
                    </p>

                    <ul className="mt-5 space-y-2.5 border-t border-current/15 pt-5 text-sm">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check
                            className={`mt-0.5 h-4 w-4 shrink-0 ${
                              popular ? 'text-[var(--emtrc-brass-light)]' : 'text-[var(--emtrc-accent)]'
                            }`}
                            aria-hidden="true"
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Link
                      to={plan.ctaTo}
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                        popular
                          ? 'bg-[var(--emtrc-accent)] text-white hover:bg-[var(--emtrc-accent-hover)]'
                          : 'border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] text-[var(--emtrc-ink)] hover:border-[var(--emtrc-ink)]'
                      }`}
                    >
                      <span>{plan.ctaLabel}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* One-Off Build Card */}
          <div
            id="one-off"
            className="mt-8 rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-7 sm:p-8"
          >
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="text-xs font-semibold text-[var(--emtrc-brass)]">Prefer to pay up front?</p>
                <h2 className="mt-1 font-editorial text-2xl font-bold">{SITE.pricing.oneOff.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                  {SITE.pricing.oneOff.summary}
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <p className="font-editorial text-3xl font-extrabold tabular-nums">
                  £{SITE.pricing.oneOff.buildPrice}
                  <span className="text-sm font-normal text-[var(--emtrc-muted)]">
                    {' '}once{showExVat ? ' ex VAT' : ''}
                  </span>
                </p>
                <p className="mt-1 text-xs tabular-nums text-[var(--emtrc-muted)]">
                  + £{SITE.pricing.oneOff.careMonthly}/month care plan · Edits £{SITE.pricing.oneOff.hourlyEdits}/hour
                </p>
                <div className="mt-4">
                  <Link
                    to="/free-demo?plan=one-off"
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-navy)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent)] dark:bg-[var(--emtrc-accent)]"
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

      {/* Feature Comparison Table */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-sand)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <h2 className="font-editorial text-2xl font-extrabold sm:text-3xl">
              Compare plans side by side
            </h2>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)]">
                    <th className="px-6 py-4 font-semibold">Feature</th>
                    <th className="px-5 py-4 font-semibold tabular-nums">Starter (£39/mo)</th>
                    <th className="px-5 py-4 font-semibold tabular-nums text-[var(--emtrc-accent)]">
                      Business (£69/mo)
                    </th>
                    <th className="px-5 py-4 font-semibold tabular-nums">Growth (£129/mo)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--emtrc-border)]">
                  {SITE.pricing.comparisonRows.map((row) => (
                    <tr key={row.feature}>
                      <td className="px-6 py-3.5 font-medium">{row.feature}</td>
                      <td className="px-5 py-3.5 text-[var(--emtrc-muted)]">{row.starter}</td>
                      <td className="px-5 py-3.5 font-medium">{row.business}</td>
                      <td className="px-5 py-3.5 text-[var(--emtrc-muted)]">{row.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Add-ons Table */}
      <section className="border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <h2 className="font-editorial text-2xl font-extrabold sm:text-3xl">
              Domains, email &amp; add-ons
            </h2>
            <p className="mt-2 text-sm text-[var(--emtrc-muted)]">
              Add only what you need, whenever you need it.
            </p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]">
              <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)]">
                    <th className="px-6 py-4 font-semibold">Add-on</th>
                    <th className="px-5 py-4 font-semibold">Price{showExVat ? ' (ex VAT)' : ''}</th>
                    <th className="px-6 py-4 font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--emtrc-border)]">
                  {SITE.pricing.addOns.map((addon) => (
                    <tr key={addon.item}>
                      <td className="px-6 py-3.5 font-medium">{addon.item}</td>
                      <td className="px-5 py-3.5 font-semibold tabular-nums whitespace-nowrap">
                        {addon.price}
                      </td>
                      <td className="px-6 py-3.5 text-[var(--emtrc-muted)]">{addon.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Monthly Explainer */}
      <section>
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <h2 className="font-editorial text-2xl font-extrabold sm:text-3xl">
              {SITE.pricing.whyMonthly.headline}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {SITE.pricing.whyMonthly.points.map((pt, idx) => (
                <div
                  key={pt.title}
                  className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6"
                >
                  <p className="font-editorial text-xs font-extrabold text-[var(--emtrc-brass)]">
                    0{idx + 1}
                  </p>
                  <h3 className="mt-2 font-editorial text-lg font-bold">{pt.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--emtrc-muted)]">{pt.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/free-demo"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
              >
                <span>Get my free demo</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={SITE.brand.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-5 py-3 text-sm font-semibold text-[var(--emtrc-ink)]"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>Book a 15-minute pricing chat</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </EmtrcLayout>
  );
}
