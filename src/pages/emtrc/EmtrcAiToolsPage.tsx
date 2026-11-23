import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { SITE } from '../../content/site';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { PageHeader } from '../../components/emtrc/PageHeader';
import { ScrollReveal, ScrollRevealItem } from '../../components/emtrc/ScrollReveal';
import { AiCallCaptureIllustration } from '../../components/emtrc/AnimatedIllustrations';

export function EmtrcAiToolsPage() {
  return (
    <EmtrcLayout>
      <EmtrcHead
        title="AI Agents, Sales Leads, Social, Pricing Watch & SEO — emtrc London"
        description="Explore all 8 emtrc AI and growth tools built for London businesses: Personal AI Agents, AI Sales Leads, AI Social Management, Competitor Pricing Watch, Local SEO Rank Tracking, Review Engine, Lead Catcher and 24/7 AI Receptionist."
      />

      <PageHeader
        kicker="AI Agents, Automation & Local Growth"
        headlineLine1="Practical AI built for"
        headlineLine2="independent London operators."
        description={SITE.aiTools.subheadline}
        backdropImage="/src/assets/images/service_personal_ai_agent_1795443159030.jpg"
        backdropAlt="London founder reviewing daily AI agent schedule beside sunlit Crittall studio windows"
        actions={
          <div className="flex flex-wrap gap-3">
            <a
              href={SITE.brand.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>Book a 15-min walkthrough</span>
            </a>
            <Link
              to="/app"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40"
            >
              <span>Try the interactive App</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        }
        metrics={[
          { value: '08', label: 'AI & growth modules' },
          { value: '8 sec', label: 'Missed-call SMS speed' },
          { value: '100%', label: 'Owner approval control' },
          { value: 'UK/EU', label: 'Encrypted GDPR hosting' },
        ]}
      />

      {/* Live Interactive Workflow Band */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] py-12 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="font-mono-data text-xs font-semibold uppercase tracking-[0.14em] text-[var(--emtrc-accent)]">
                Zero Agency Bloat · One Pocket App
              </p>
              <h2 className="mt-3 font-editorial text-3xl font-bold leading-tight text-[var(--emtrc-ink)] sm:text-4xl">
                Every AI tool reports into one quiet London command centre.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-base">
                No juggling six separate SaaS dashboards. Your Personal AI Agent drafts, Sales Leads pipeline, Competitor Pricing alerts, Google Maps rank changes, Review replies and missed-call texts all land cleanly inside the emtrc App.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-ink)] px-5 py-3 text-sm font-semibold text-[var(--emtrc-canvas)] transition-opacity hover:opacity-90"
                >
                  <span>Explore all 12 services</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-5 py-3 text-sm font-semibold text-[var(--emtrc-ink)] transition-colors hover:border-[var(--emtrc-ink)]"
                >
                  <span>Ask about a custom bundle</span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <AiCallCaptureIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Even 2-Column Grid of All 8 AI & Growth Modules */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <ScrollReveal autoWrapChildren={false} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {SITE.aiTools.cards.map((tool, index) => {
              const isDarkHighlight = index === 0 || index === 3 || index === 4 || index === 7;
              return (
                <ScrollRevealItem key={tool.id}>
                  <article
                    id={tool.id}
                    className={`flex h-full flex-col justify-between rounded-2xl border p-6 sm:p-8 ${
                      isDarkHighlight
                        ? 'border-white/12 bg-[#0F1219] text-[#F5F3EE]'
                        : 'border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] text-[var(--emtrc-ink)]'
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p
                          className={`font-mono-data text-[11px] font-semibold uppercase tracking-wider ${
                            isDarkHighlight ? 'text-[#FF8C73]' : 'text-[var(--emtrc-accent)]'
                          }`}
                        >
                          {tool.status}
                        </p>
                        <span className="font-mono-data text-sm font-bold tabular-nums text-[var(--emtrc-accent)]">
                          {tool.price}
                          {SITE.flags.showExVat && tool.price.startsWith('£') ? ' ex VAT' : ''}
                        </span>
                      </div>

                      <h2 className="mt-2 font-editorial text-2xl font-bold sm:text-3xl">
                        {tool.name}
                      </h2>

                      <div className="mt-4 space-y-3 text-sm leading-relaxed">
                        <p className={isDarkHighlight ? 'text-[#C7D0E4]' : 'text-[var(--emtrc-muted)]'}>
                          {tool.whatItDoes}
                        </p>
                        <p
                          className={`text-xs ${
                            isDarkHighlight ? 'text-[#9BA5BA]' : 'text-[var(--emtrc-muted)]'
                          }`}
                        >
                          <strong className={isDarkHighlight ? 'text-white' : 'text-[var(--emtrc-ink)]'}>
                            Built for:{' '}
                          </strong>
                          {tool.whoItsFor}
                        </p>
                      </div>

                      <ol className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                        {tool.flowSteps.map((s) => (
                          <li
                            key={s.step}
                            className={`rounded-lg border p-3 ${
                              isDarkHighlight
                                ? 'border-white/10 bg-white/[0.04]'
                                : 'border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)]'
                            }`}
                          >
                            <p className="font-mono-data text-[11px] font-bold text-[var(--emtrc-accent)]">
                              {s.step}
                            </p>
                            <p className="mt-1 text-xs font-bold">{s.label}</p>
                            <p
                              className={`mt-0.5 text-[11px] leading-snug ${
                                isDarkHighlight ? 'text-[#A9B5CE]' : 'text-[var(--emtrc-muted)]'
                              }`}
                            >
                              {s.detail}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div
                      className={`mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${
                        isDarkHighlight ? 'border-white/10' : 'border-[var(--emtrc-border)]'
                      }`}
                    >
                      <Link
                        to={`/services/${tool.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--emtrc-accent)] hover:underline"
                      >
                        <span>Full service page</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <Link
                        to="/contact"
                        className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
                          isDarkHighlight
                            ? 'bg-white text-[#0A0B0E] hover:bg-[#F3F4F6]'
                            : 'bg-[var(--emtrc-accent)] text-white hover:bg-[var(--emtrc-accent-hover)]'
                        }`}
                      >
                        <span>Enquire now</span>
                      </Link>
                    </div>
                  </article>
                </ScrollRevealItem>
              );
            })}
          </ScrollReveal>
        </div>
      </section>
    </EmtrcLayout>
  );
}
