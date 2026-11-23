import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ExternalLink, MapPin } from 'lucide-react';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { KickerRule, Reveal } from '../../components/emtrc/Reveal';
import { SafeImage } from '../../components/SafeImage';
import { CASE_STUDIES, getCaseStudyBySlug } from '../../content/caseStudies';

export function EmtrcCaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return <Navigate to="/case-studies" replace />;
  }

  const others = CASE_STUDIES.filter((c) => c.slug !== study.slug).slice(0, 2);

  return (
    <EmtrcLayout>
      <EmtrcHead
        title={`${study.businessName} Case Study (${study.postcode}) | emtrc`}
        description={study.summary}
      />
      {/* Hero */}
      <section className="hero-editorial-wash border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 pt-10 pb-14 sm:px-8 sm:pt-14 sm:pb-18">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to all London Case Studies</span>
          </Link>

          <div className="mt-6 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal immediate>
                <div className="flex flex-wrap items-center gap-3 font-mono-data text-xs text-[var(--emtrc-accent)]">
                  <span>{study.trade.toUpperCase()}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 text-[var(--emtrc-muted)]">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {study.borough} {study.postcode}
                  </span>
                </div>
                <h1 className="mt-4 font-editorial text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                  {study.businessName}
                </h1>
                <p className="mt-4 text-lg font-medium leading-snug text-[var(--emtrc-ink)]">
                  {study.headline}
                </p>
                <p className="mt-4 text-base leading-relaxed text-[var(--emtrc-muted)]">
                  {study.summary}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to={`/demos/${study.demoPresetId}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                  >
                    <span>Open live interactive demo</span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/free-demo"
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-5 py-3 text-sm font-semibold text-[var(--emtrc-ink)] transition-colors hover:border-[var(--emtrc-ink)]"
                  >
                    <span>Build one for my business</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal immediate delay={0.1}>
                <div className="overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-navy)] shadow-lg">
                  <SafeImage
                    src={study.image}
                    alt={study.imageAlt}
                    width={900}
                    height={680}
                    priority
                    className="h-[320px] w-full object-cover sm:h-[380px]"
                  />
                  <div className="flex items-center justify-between border-t border-[var(--emtrc-navy-border)] px-5 py-4 text-xs text-white">
                    <div>
                      <p className="font-mono-data text-lg font-bold text-[var(--emtrc-brass-light)]">
                        {study.heroStat}
                      </p>
                      <p className="text-[#B4BCCB]">{study.heroStatLabel}</p>
                    </div>
                    <div className="text-right font-mono-data text-[11px] text-[#9BA3B4]">
                      <p>{study.planUsed}</p>
                      <p className="mt-0.5 text-white">{study.turnaround}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Comparison Table + Narrative */}
      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-7">
            <Reveal>
              <KickerRule>01 · The High-Street Bottleneck</KickerRule>
              <h2 className="mt-3 font-editorial text-2xl font-bold sm:text-3xl">
                What was holding enquiries back
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--emtrc-muted)]">
                {study.challenge}
              </p>
            </Reveal>

            <Reveal>
              <KickerRule>02 · The emtrc Build</KickerRule>
              <h2 className="mt-3 font-editorial text-2xl font-bold sm:text-3xl">
                Exactly what we built &amp; configured
              </h2>
              <ul className="mt-5 space-y-3.5">
                {study.whatWeBuilt.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--emtrc-ink)] sm:text-base">
                    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[var(--emtrc-accent)]/12 text-[var(--emtrc-accent)]">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-[var(--emtrc-muted)]">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <KickerRule>03 · Practical Result</KickerRule>
              <h2 className="mt-3 font-editorial text-2xl font-bold sm:text-3xl">
                Faster calls, zero technical fuss
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--emtrc-muted)]">
                {study.outcome}
              </p>
              <p className="mt-6 rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] p-4 text-xs leading-relaxed text-[var(--emtrc-muted)]">
                {study.ownerNote}
              </p>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <Reveal>
              <div className="sticky top-24 rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6 sm:p-7">
                <p className="font-mono-data text-xs font-semibold text-[var(--emtrc-accent)]">
                  BEFORE &amp; AFTER SCORECARD
                </p>
                <div className="mt-4 divide-y divide-[var(--emtrc-border)]">
                  {study.metrics.map((m) => (
                    <div key={m.label} className="py-3.5">
                      <p className="text-xs font-semibold text-[var(--emtrc-ink)]">{m.label}</p>
                      <div className="mt-1.5 grid grid-cols-2 gap-3 text-xs">
                        <div className="rounded-md bg-[var(--emtrc-sand)] px-2.5 py-2 text-[var(--emtrc-muted)]">
                          <span className="block font-mono-data text-[10px] uppercase">Before</span>
                          <span className="mt-0.5 block font-medium">{m.before}</span>
                        </div>
                        <div className="rounded-md bg-[var(--emtrc-accent)]/10 px-2.5 py-2 text-[var(--emtrc-ink)]">
                          <span className="block font-mono-data text-[10px] uppercase text-[var(--emtrc-accent)]">
                            After emtrc
                          </span>
                          <span className="mt-0.5 block font-semibold">{m.after}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/free-demo"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <span>Request a similar demo free</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>

        {/* More Case Studies */}
        <div className="mt-20 border-t border-[var(--emtrc-border)] pt-12">
          <h2 className="font-editorial text-2xl font-bold">More London builds</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {others.map((item) => (
              <Link
                key={item.slug}
                to={`/case-studies/${item.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6 transition-colors hover:border-[var(--emtrc-ink)]"
              >
                <div>
                  <p className="font-mono-data text-xs text-[var(--emtrc-accent)]">
                    {item.trade} · {item.borough} {item.postcode}
                  </p>
                  <h3 className="mt-2 font-editorial text-xl font-bold group-hover:text-[var(--emtrc-accent)]">
                    {item.businessName}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--emtrc-muted)]">{item.headline}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--emtrc-ink)]">
                  <span>View breakdown</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </EmtrcLayout>
  );
}
