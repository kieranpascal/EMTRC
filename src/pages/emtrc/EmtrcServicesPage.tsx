import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, ShieldCheck } from 'lucide-react';
import { SITE } from '../../content/site';
import { SERVICE_DETAILS } from '../../content/services';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import {
  EditorialHeading,
  KickerRule,
  Reveal,
  StaggerContainer,
  StaggerItem,
} from '../../components/emtrc/Reveal';
import { SafeImage } from '../../components/SafeImage';

const SERVICE_GROUPS: readonly {
  title: string;
  subtitle: string;
  category: 'Websites & foundations' | 'AI front desk' | 'Get found locally';
}[] = [
  {
    title: 'Websites & foundations',
    subtitle: 'Your fast mobile-first website, domain registered in your own name, professional email and ongoing monthly edits.',
    category: 'Websites & foundations',
  },
  {
    title: 'AI front desk & cloud phones',
    subtitle: 'Catch missed calls in 8 seconds, build 5-star Google reviews, answer enquiries 24/7 and move off copper landlines ahead of 31 January 2027.',
    category: 'AI front desk',
  },
  {
    title: 'Get found locally',
    subtitle: 'Google Business Profile alignment, LocalBusiness schema and London borough pages so both Google Maps and AI search recommend you first.',
    category: 'Get found locally',
  },
];

export function EmtrcServicesPage() {
  return (
    <EmtrcLayout>
      <EmtrcHead
        title="Services — Websites, Email, Local SEO & AI Tools | emtrc London"
        description="Explore all 8 emtrc services for London small businesses: managed websites, domains & email, local SEO, review engine, lead catcher, AI receptionist, cloud VoIP and monthly care."
      />

      {/* Editorial Hero */}
      <section className="hero-editorial-wash border-b border-[var(--emtrc-border)] pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <KickerRule>8 dedicated services · Everything under one London roof</KickerRule>
              <EditorialHeading
                as="h1"
                immediate
                line1="Everything your business needs online."
                line2="Each with its own plain-English plan."
                line2Tone="brass"
                className="mt-4 font-editorial text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-[var(--emtrc-ink)] sm:text-6xl"
              />
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--emtrc-muted)] sm:text-lg">
                Start with a fast website that turns Google Maps searches into phone calls. Add
                professional email, automated review requests, missed-call text-back, a 24/7 AI
                receptionist or cloud VoIP whenever your business is ready.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Link
                to="/free-demo"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
              >
                <span>Get my free demo</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-5 py-3 text-sm font-semibold text-[var(--emtrc-ink)] transition-colors hover:border-[var(--emtrc-ink)]"
              >
                <span>View pricing</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Grouped Directory of all 8 Dedicated Service Pages */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] space-y-20 px-5 sm:px-8">
          {SERVICE_GROUPS.map((group) => {
            const items = SERVICE_DETAILS.filter((s) => s.category === group.category);
            return (
              <div key={group.title}>
                <Reveal>
                  <div className="max-w-2xl">
                    <KickerRule>{group.category}</KickerRule>
                    <h2 className="mt-3 font-editorial text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                      {group.title}
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-base">
                      {group.subtitle}
                    </p>
                  </div>
                </Reveal>

                <StaggerContainer
                  className={`mt-8 grid grid-cols-1 gap-6 ${
                    items.length === 1 ? 'md:grid-cols-1 lg:grid-cols-12' : 'md:grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {items.map((service) => (
                    <StaggerItem
                      key={service.slug}
                      className={items.length === 1 ? 'lg:col-span-8' : ''}
                    >
                      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-[var(--emtrc-accent)]">
                        <Link to={`/services/${service.slug}`} className="block overflow-hidden">
                          <SafeImage
                            src={service.heroImage}
                            alt={service.heroAlt}
                            width={1200}
                            height={900}
                            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col justify-between p-6">
                          <div>
                            <p className="text-xs font-semibold text-[var(--emtrc-brass)]">
                              {service.priceTag}
                            </p>
                            <h3 className="mt-1.5 font-editorial text-2xl font-bold leading-snug text-[var(--emtrc-ink)] group-hover:text-[var(--emtrc-accent)]">
                              <Link to={`/services/${service.slug}`}>{service.shortTitle}</Link>
                            </h3>
                            <p className="mt-2.5 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                              {service.subheadline}
                            </p>
                          </div>

                          <div className="mt-6 flex items-center justify-between border-t border-[var(--emtrc-border)] pt-4 text-xs font-semibold">
                            <span className="text-[var(--emtrc-muted)]">
                              {service.pains.length} pains solved · Interactive demo
                            </span>
                            <Link
                              to={`/services/${service.slug}`}
                              className="inline-flex items-center gap-1 text-[var(--emtrc-accent)] hover:underline"
                            >
                              <span>Explore service</span>
                              <ArrowRight
                                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                                aria-hidden="true"
                              />
                            </Link>
                          </div>
                        </div>
                      </article>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            );
          })}
        </div>
      </section>

      {/* Deep Midnight Promises Band */}
      <section className="border-t border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] py-16 text-[#F5F3EE] sm:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <KickerRule light>Zero risk to get started</KickerRule>
              <h2 className="mt-3 font-editorial text-3xl font-extrabold leading-[1.06] tracking-[-0.03em] text-white sm:text-5xl">
                See a working demo for your business before paying a penny.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#BAC5DC]">
                Tell us your London borough, trade and prices. We build a real working demo within
                2 working days so you can test it on your phone before deciding anything.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/free-demo"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <span>Get my free demo</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={SITE.brand.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy-soft)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[var(--emtrc-brass-light)]"
                >
                  <Calendar className="h-4 w-4 text-[var(--emtrc-brass-light)]" aria-hidden="true" />
                  <span>Book a 15-minute call</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy-soft)] p-6 sm:p-7">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-[var(--emtrc-brass-light)]">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  <span>Our four plain-English promises</span>
                </div>
                <ul className="mt-5 divide-y divide-[var(--emtrc-navy-border)]">
                  {SITE.guarantees.map((g) => (
                    <li key={g.number} className="py-3.5 first:pt-0 last:pb-0">
                      <p className="font-editorial text-sm font-bold text-white">
                        {g.number} · {g.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[#A9B5CE]">{g.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </EmtrcLayout>
  );
}
