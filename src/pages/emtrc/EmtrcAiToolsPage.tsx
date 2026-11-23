import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { SITE } from '../../content/site';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { KickerRule, Reveal } from '../../components/emtrc/Reveal';
import { OrnamentalDivider } from '../../components/emtrc/OrnamentalDivider';
import { AiCallCaptureIllustration } from '../../components/emtrc/AnimatedIllustrations';

export function EmtrcAiToolsPage() {
  return (
    <EmtrcLayout>
      <EmtrcHead
        title="AI Tools & Business Phone — emtrc | Lead Catcher & AI Receptionist London"
        description="Review Engine, Lead Catcher (AI chat + missed-call text-back), 24/7 AI Receptionist and UK cloud Business Phones ahead of the 31 January 2027 PSTN switch-off."
      />

      <section className="hero-editorial-wash border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 pt-14 pb-16 sm:px-8 sm:pt-20 sm:pb-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <KickerRule>AI front desk &amp; business comms</KickerRule>
              <h1 className="mt-4 font-editorial text-4xl font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-5xl">
                {SITE.aiTools.headline}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--emtrc-muted)]">
                {SITE.aiTools.subheadline}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href={SITE.brand.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span>Book a call</span>
                </a>
                <Link
                  to="/resources#guide-pstn-2027"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-5 py-3.5 text-sm font-semibold text-[var(--emtrc-ink)]"
                >
                  <span>Free PSTN Jan 2027 PDF</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <AiCallCaptureIllustration />
            </div>
          </div>
        </div>
      </section>

      <OrnamentalDivider
        pattern="barbican-grid"
        from="surface"
        to="canvas"
        label="FOUR AI & CLOUD COMMS MODULES"
        accentColor="coral"
      />

      {/* AI Tool Cards with Clean HTML/CSS Workflow Diagrams */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] space-y-8 px-5 sm:px-8">
          {SITE.aiTools.cards.map((tool, index) => {
            const isDarkHighlight = tool.id === 'business-phone';
            return (
              <Reveal key={tool.id} delay={index * 0.04}>
                <article
                  id={tool.id}
                  className={`rounded-2xl border p-6 sm:p-10 ${
                    isDarkHighlight
                      ? 'border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] text-[#F5F3EE]'
                      : 'border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] text-[var(--emtrc-ink)]'
                  }`}
                >
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
                    <div className="lg:col-span-6">
                      <p
                        className={`text-xs font-semibold ${
                          isDarkHighlight ? 'text-[var(--emtrc-brass-light)]' : 'text-[var(--emtrc-brass)]'
                        }`}
                      >
                        {tool.status}
                      </p>
                      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-3">
                        <h2 className="font-editorial text-2xl font-extrabold sm:text-3xl">
                          {tool.name}
                        </h2>
                        <span className="font-editorial text-xl font-bold tabular-nums text-[var(--emtrc-accent)] dark:text-[#6B8AFF]">
                          {tool.price}
                          {SITE.flags.showExVat && tool.price.startsWith('£') ? ' ex VAT' : ''}
                        </span>
                      </div>

                      <div className="mt-5 space-y-4 text-sm leading-relaxed">
                        <div>
                          <p
                            className={`text-xs font-bold ${
                              isDarkHighlight ? 'text-white' : 'text-[var(--emtrc-ink)]'
                            }`}
                          >
                            What it does
                          </p>
                          <p
                            className={`mt-1 ${
                              isDarkHighlight ? 'text-[#C7D0E4]' : 'text-[var(--emtrc-muted)]'
                            }`}
                          >
                            {tool.whatItDoes}
                          </p>
                        </div>
                        <div>
                          <p
                            className={`text-xs font-bold ${
                              isDarkHighlight ? 'text-white' : 'text-[var(--emtrc-ink)]'
                            }`}
                          >
                            Who it’s for
                          </p>
                          <p
                            className={`mt-1 ${
                              isDarkHighlight ? 'text-[#C7D0E4]' : 'text-[var(--emtrc-muted)]'
                            }`}
                          >
                            {tool.whoItsFor}
                          </p>
                        </div>
                      </div>

                      <div className="mt-7 flex flex-wrap items-center gap-3.5">
                        <a
                          href={SITE.brand.calendlyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                        >
                          <Calendar className="h-4 w-4" aria-hidden="true" />
                          <span>Book a call</span>
                        </a>
                        <Link
                          to={`/services/${tool.id}`}
                          className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline ${
                            isDarkHighlight ? 'text-[var(--emtrc-brass-light)]' : 'text-[var(--emtrc-accent)]'
                          }`}
                        >
                          <span>Full service details</span>
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>

                    {/* HTML/CSS How-It-Works Flow Diagram */}
                    <div className="lg:col-span-6">
                      <div
                        className={`rounded-xl border p-5 sm:p-6 ${
                          isDarkHighlight
                            ? 'border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy-surface)]'
                            : 'border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)]'
                        }`}
                      >
                        <p
                          className={`text-xs font-bold ${
                            isDarkHighlight ? 'text-[var(--emtrc-brass-light)]' : 'text-[var(--emtrc-muted)]'
                          }`}
                        >
                          How it works
                        </p>
                        <ol className="mt-4 space-y-3">
                          {tool.flowSteps.map((s, sIdx) => (
                            <li key={s.step} className="relative">
                              <div
                                className={`flex items-center gap-4 rounded-lg border px-4 py-3.5 ${
                                  isDarkHighlight
                                    ? 'border-[#253663] bg-[#0B132B]'
                                    : 'border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]'
                                }`}
                              >
                                <span className="font-editorial text-sm font-extrabold tabular-nums text-[var(--emtrc-accent)] dark:text-[#6B8AFF]">
                                  {s.step}
                                </span>
                                <div className="min-w-0">
                                  <p className="text-sm font-bold">{s.label}</p>
                                  <p
                                    className={`text-xs ${
                                      isDarkHighlight ? 'text-[#A9B5CE]' : 'text-[var(--emtrc-muted)]'
                                    }`}
                                  >
                                    {s.detail}
                                  </p>
                                </div>
                              </div>
                              {sIdx < tool.flowSteps.length - 1 && (
                                <div
                                  aria-hidden="true"
                                  className="ml-6 h-3 w-px bg-[var(--emtrc-accent)]/50"
                                />
                              )}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </EmtrcLayout>
  );
}
