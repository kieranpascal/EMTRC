import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, ShieldCheck } from 'lucide-react';
import { SITE } from '../../content/site';
import { SERVICE_DETAILS, type ServiceDetail } from '../../content/services';
import { useLanguage } from '../../context/LanguageContext';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { PageHeader } from '../../components/emtrc/PageHeader';
import { KickerRule } from '../../components/emtrc/Reveal';
import { ScrollReveal, ScrollRevealItem } from '../../components/emtrc/ScrollReveal';
import { AnimatedSectionHeader } from '../../components/emtrc/SectionSeparator';
import { SafeImage } from '../../components/SafeImage';

const SERVICE_GROUPS: readonly {
  index: string;
  title: string;
  accentWord: string;
  subtitle: string;
  category: ServiceDetail['category'];
  tone: 'coral' | 'amber' | 'emerald';
  bandClass: string;
  isDarkBand: boolean;
}[] = [
  {
    index: '01',
    title: 'Websites &',
    accentWord: 'foundations.',
    subtitle:
      'Your fast mobile-first website, domain registered in your own name, professional email, 24-hour edits and PSTN-ready 020 Cloud VoIP.',
    category: 'Websites & foundations',
    tone: 'coral',
    bandClass: 'border-b border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] text-[var(--emtrc-ink)]',
    isDarkBand: false,
  },
  {
    index: '02',
    title: 'AI agents &',
    accentWord: 'automation.',
    subtitle:
      'Personal AI owner assistants, exclusive London B2B & local sales pipelines, 8-second missed-call text-back and 24/7 British voice reception.',
    category: 'AI agents & automation',
    tone: 'amber',
    bandClass: 'border-b border-white/10 bg-[#0B0D12] text-white',
    isDarkBand: true,
  },
  {
    index: '03',
    title: 'Growth, SEO &',
    accentWord: 'intelligence.',
    subtitle:
      'Consistent local social management, live London competitor price benchmarking, Google Maps 3-Pack rank tracking and DMCC-compliant reviews.',
    category: 'Growth, SEO & reviews',
    tone: 'emerald',
    bandClass: 'border-b border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] text-[var(--emtrc-ink)]',
    isDarkBand: false,
  },
];

export function EmtrcServicesPage() {
  const { t } = useLanguage();

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="Services — 12 Website, AI Agent, SEO & Growth Services | emtrc London"
        description="Explore all 12 emtrc services for London small businesses: managed websites, Personal AI Agents, AI Sales Leads, AI Social Management, Competitor Pricing Intelligence, Local SEO Rank Tracking, Reviews and Cloud VoIP."
      />

      <PageHeader
        kicker={t.servicesPage.kicker}
        headlineLine1={t.servicesPage.headlineLine1}
        headlineLine2={t.servicesPage.headlineLine2}
        description="Twelve focused services built for independent London businesses — from fast mobile websites and 020 Cloud VoIP to Personal AI Agents, AI Sales Leads, Social Management, Competitor Pricing Intelligence, SEO Ranking and Reviews."
        backdropImage="/src/assets/images/london_studio_dusk_header_1795426202168.jpg"
        backdropAlt="East London independent workshop and studio storefront at dusk"
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              to="/free-demo"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
            >
              <span>{t.hero.primaryCta}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40"
            >
              <span>{t.servicesPage.viewPricing}</span>
            </Link>
          </div>
        }
        metrics={[
          { value: '12', label: 'Dedicated London services' },
          { value: '£39/mo', label: 'Starting managed plan' },
          { value: '8 sec', label: 'Missed-call SMS speed' },
          { value: '100%', label: 'Client-owned domain' },
        ]}
      />

      {/* Three Balanced Service Chapters (4 Services Each = 2x2 Even Rows, Zero Orphan Cards) */}
      {SERVICE_GROUPS.map((group) => {
        const items = SERVICE_DETAILS.filter((s) => s.category === group.category);

        return (
          <section key={group.title} className={`py-12 sm:py-16 ${group.bandClass}`}>
            <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
              <AnimatedSectionHeader
                index={group.index}
                kicker={group.category}
                headline={group.title}
                accentWord={group.accentWord}
                subtitle={group.subtitle}
                tone={group.tone}
                light={group.isDarkBand}
              />

              <ScrollReveal
                autoWrapChildren={false}
                className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2"
              >
                {items.map((service) => (
                  <ScrollRevealItem key={service.slug}>
                    <article
                      data-testid={`service-card-${service.slug}`}
                      className={`group flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:border-[var(--emtrc-accent)] hover:shadow-xl ${
                        group.isDarkBand
                          ? 'border-white/12 bg-[#131722] text-white'
                          : 'border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] text-[var(--emtrc-ink)]'
                      }`}
                    >
                      <Link
                        to={`/services/${service.slug}`}
                        className="relative block overflow-hidden bg-[#08090C]"
                      >
                        <SafeImage
                          src={service.heroImage}
                          alt={service.heroAlt}
                          width={1200}
                          height={900}
                          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090C]/85 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-4 font-mono-data text-xs font-semibold text-[#FF8C73]">
                          {service.priceTag}
                        </span>
                      </Link>
                      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                        <div>
                          <h3
                            className={`font-editorial text-2xl font-bold leading-snug transition-colors group-hover:text-[var(--emtrc-accent)] ${
                              group.isDarkBand ? 'text-white' : 'text-[var(--emtrc-ink)]'
                            }`}
                          >
                            <Link to={`/services/${service.slug}`}>{service.shortTitle}</Link>
                          </h3>
                          <p
                            className={`mt-2 text-sm leading-relaxed ${
                              group.isDarkBand ? 'text-[#B4BCCB]' : 'text-[var(--emtrc-muted)]'
                            }`}
                          >
                            {service.subheadline}
                          </p>
                        </div>

                        <div
                          className={`mt-5 flex items-center justify-between border-t pt-3.5 text-xs font-semibold ${
                            group.isDarkBand ? 'border-white/10' : 'border-[var(--emtrc-border)]'
                          }`}
                        >
                          <span
                            className={`font-mono-data ${
                              group.isDarkBand ? 'text-[#8E96A8]' : 'text-[var(--emtrc-muted)]'
                            }`}
                          >
                            {service.pains.length} pains solved · Interactive walkthrough
                          </span>
                          <Link
                            to={`/services/${service.slug}`}
                            className="inline-flex items-center gap-1 text-[var(--emtrc-accent)] hover:underline whitespace-nowrap"
                          >
                            <span>{t.servicesPage.exploreService}</span>
                            <ArrowRight
                              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </ScrollRevealItem>
                ))}
              </ScrollReveal>
            </div>
          </section>
        );
      })}

      {/* Deep Obsidian Promises Band */}
      <section className="bg-[#0B0D12] py-12 text-[#F5F3EE] sm:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <KickerRule light>Zero risk to get started</KickerRule>
              <h2 className="mt-3 font-editorial text-3xl font-bold leading-[1.06] text-white sm:text-5xl">
                See a working demo for your business before paying a penny.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#BAC5DC]">
                Tell us your London borough, trade and prices. We build a real working demo within
                2 working days so you can test it on your phone before deciding anything.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/free-demo"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <span>{t.hero.primaryCta}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={SITE.brand.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40"
                >
                  <Calendar className="h-4 w-4 text-[#FF8C73]" aria-hidden="true" />
                  <span>{t.hero.footnoteLink}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/12 bg-[#131722] p-6">
                <div className="flex items-center gap-2 font-mono-data text-xs font-semibold uppercase tracking-wider text-[#FF8C73]">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  <span>Our four plain-English promises</span>
                </div>
                <ul className="mt-4 divide-y divide-white/10">
                  {SITE.guarantees.map((g) => (
                    <li key={g.number} className="py-3 first:pt-0 last:pb-0">
                      <p className="font-editorial text-sm font-bold text-white">
                        <span className="font-mono-data text-[#FF8C73] mr-2">{g.number}</span>
                        {g.title}
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
