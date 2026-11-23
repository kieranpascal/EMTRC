import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Calendar,
  Check,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SITE } from '../../content/site';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { PageHeader } from '../../components/emtrc/PageHeader';
import { AnimatedSectionHeader } from '../../components/emtrc/SectionSeparator';
import { MagneticLink } from '../../components/emtrc/MagneticLink';
import { ParallaxFrame, Reveal, SpotlightCard } from '../../components/emtrc/Reveal';
import { ScrollReveal, ScrollRevealItem } from '../../components/emtrc/ScrollReveal';
import { SafeImage } from '../../components/SafeImage';

const OPERATING_PRINCIPLES = [
  {
    number: '01',
    title: 'Plain English over agency jargon',
    body: 'You should never need to decode “omnichannel funnel synergy” to know whether your website and AI tools are bringing in local calls. We tell you what we are doing, what it costs, and what rang your phone.',
  },
  {
    number: '02',
    title: 'AI does the legwork; London craft standards do the judging',
    body: 'We pair practical Personal AI Agents, lead workflows and competitor trackers with strict human design review — so every website, email setup and social post looks bespoke, never generic.',
  },
  {
    number: '03',
    title: 'Built for the London high street, not Silicon Valley',
    body: 'A Hackney barber, a Greenwich heating engineer and a Peckham bakery have completely different realities from a venture-funded software startup. We design around what neighbours check first: open now, clear prices, real photos and tap-to-call.',
  },
  {
    number: '04',
    title: 'Clean ownership and zero nasty surprises',
    body: 'Your domain is registered in your own name, pricing is published openly on every page, and after 12 months your plan rolls cleanly on 30 days’ notice. No hostage domains, no surprise renewal invoices.',
  },
] as const;

const LONDON_ZONES = [
  {
    zone: 'East London',
    boroughs: 'Hackney E8 · Shoreditch E2 · Canary Wharf E14 · Walthamstow E17 · Stratford E15',
  },
  {
    zone: 'North London',
    boroughs: 'Islington N1 · Camden NW1 · Hampstead NW3 · Crouch End N8 · Muswell Hill N10',
  },
  {
    zone: 'South London',
    boroughs: 'Greenwich SE10 · Peckham SE15 · Brixton SW9 · Wandsworth SW11 · Clapham SW4',
  },
  {
    zone: 'West & Central',
    boroughs: 'Marylebone W1U · South Kensington SW7 · Hammersmith W6 · Ealing W5 · Richmond TW9',
  },
] as const;

export function EmtrcAboutPage() {
  return (
    <EmtrcLayout>
      <EmtrcHead
        title="About emtrc — London Web Design, Hosting & AI Front Office"
        description="emtrc is a London web design, hosting and practical AI studio helping independent high-street shops, salons, cafés and local trades win more bookings."
      />

      <PageHeader
        kicker="About emtrc · Clerkenwell & Greater London Studio"
        headlineLine1="Built for independent London."
        headlineLine2="Without the £2,500 agency bill."
        description="Walk down any London high street and you will find brilliant barbers, salons, tradespeople, cleaners and cafés doing five-star work — yet losing daily enquiries to slow websites, missed calls and unmanaged Google Maps listings. emtrc exists to close that gap."
        backdropImage="/src/assets/images/emtrc_london_studio_team_1795422461958.jpg"
        backdropAlt="Sunlit Clerkenwell London design studio with dark Crittall factory windows and oak workbenches"
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <MagneticLink
              to="/free-demo"
              strength={0.24}
              maxOffset={8}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-[var(--emtrc-accent-hover)]"
            >
              <span>Request a free demo</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </MagneticLink>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:border-[#FF8C73]"
            >
              <span>Contact our team</span>
            </Link>
          </div>
        }
        metrics={[
          { value: '32', label: 'London boroughs + City' },
          { value: '12', label: 'Web & AI services' },
          { value: '48h', label: 'Free demo turnaround' },
          { value: '0%', label: 'Domain lock-in' },
        ]}
      />

      {/* Studio Story + Documentary London Trade Triptych */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <AnimatedSectionHeader
                  index="01"
                  kicker="Why We Built emtrc"
                  headline="Websites, business phones & practical AI"
                  accentWord="looked after under one roof."
                  tone="coral"
                />
                <p className="mt-5 text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-base">
                  Small business owners across London told us the same story: agencies charged thousands up front, vanished after launch, and left them juggling five separate subscriptions for hosting, email, reviews, social posts and phone lines.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-base">
                  We rebuilt the entire model from the ground up. We build a real working demo of your new website in 48 hours before asking for a penny — then pair Cloudflare-fast hosting with Personal AI Agents, AI Sales Leads, Competitor Pricing Intelligence, Local SEO &amp; Rank Tracking, and a UK 020 Cloud Phone ready for the 2027 copper switch-off.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-[var(--emtrc-ink)]">
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    12 modular services, one point of contact
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    Cookieless &amp; UK GDPR aligned
                  </span>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={0.08}>
                <div className="overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] shadow-xl">
                  <ParallaxFrame offset={14} className="aspect-[4/3] w-full">
                    <SafeImage
                      src="/src/assets/images/emtrc_london_studio_team_1795422461958.jpg"
                      alt="emtrc London digital studio workspace in Clerkenwell"
                      width={1200}
                      height={900}
                      className="h-full w-full object-cover"
                    />
                  </ParallaxFrame>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Documentary London Trade Triptych (Even 3-col row) */}
          <ScrollReveal autoWrapChildren={false} className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              {
                src: '/src/assets/images/emtrc_london_barber_craft_1795422463841.jpg',
                alt: 'Independent East London barber finishing a precision fade',
                caption: 'East London Barbers & Groomers',
              },
              {
                src: '/src/assets/images/emtrc_london_plumber_van_1795422464729.jpg',
                alt: 'London heating engineer inspecting precision copper manifold',
                caption: 'London Plumbers, Heating & Electrical',
              },
              {
                src: '/src/assets/images/emtrc_london_cafe_owner_1795422462836.jpg',
                alt: 'Independent London café owner pouring a flat white by green timber shopfront',
                caption: 'Neighbourhood Cafés, Bakeries & Salons',
              },
            ].map((photo) => (
              <ScrollRevealItem key={photo.caption}>
                <figure className="overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)]">
                  <SafeImage
                    src={photo.src}
                    alt={photo.alt}
                    width={800}
                    height={560}
                    className="h-48 w-full object-cover"
                  />
                  <figcaption className="border-t border-[var(--emtrc-border)] px-4 py-3 font-mono-data text-[11px] font-semibold text-[var(--emtrc-muted)]">
                    {photo.caption}
                  </figcaption>
                </figure>
              </ScrollRevealItem>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Operating Principles (Even 2x2 Grid) */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-sand)]">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <AnimatedSectionHeader
            index="02"
            kicker="Studio Standards"
            headline="Four rules we hold ourselves to"
            accentWord="on every single client build."
            tone="amber"
            className="max-w-2xl"
          />

          <ScrollReveal autoWrapChildren={false} className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2">
            {OPERATING_PRINCIPLES.map((item) => (
              <ScrollRevealItem key={item.number}>
                <SpotlightCard className="h-full rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-7">
                  <p className="font-mono-data text-xs font-bold text-[var(--emtrc-accent)]">
                    PRINCIPLE {item.number}
                  </p>
                  <h3 className="mt-2 font-editorial text-xl font-bold text-[var(--emtrc-ink)] sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                    {item.body}
                  </p>
                </SpotlightCard>
              </ScrollRevealItem>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Four Written Guarantees (Obsidian Band, Even 4-Col Grid) */}
      <section className="border-b border-[var(--emtrc-navy-border)] bg-[#0B0D12] py-14 text-[#F5F3EE] sm:py-18">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <AnimatedSectionHeader
              index="03"
              kicker="Zero-Risk Guarantees"
              headline="Backed in writing,"
              accentWord="never vague handshakes."
              tone="emerald"
              light
            />
            <Link
              to="/free-demo"
              className="inline-flex items-center gap-2 font-mono-data text-xs font-semibold text-[#FF8C73] whitespace-nowrap hover:text-white"
            >
              <span>Request your free 48-hour demo</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SITE.guarantees.map((g) => (
              <div
                key={g.number}
                className="rounded-2xl border border-[#232A38] bg-[#131722] p-6"
              >
                <p className="font-mono-data text-xs font-bold text-[#34D399]">{g.number}</p>
                <h3 className="mt-2 font-editorial text-lg font-bold text-white">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#BAC5DC]">{g.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Greater London Coverage + Company Details */}
      <section className="bg-[var(--emtrc-surface)] py-12 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] p-7 lg:col-span-7">
              <div className="flex items-center gap-2 font-mono-data text-xs font-bold uppercase tracking-wider text-[var(--emtrc-accent)]">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>Greater London Coverage</span>
              </div>
              <h2 className="mt-2 font-editorial text-2xl font-bold text-[var(--emtrc-ink)] sm:text-3xl">
                {SITE.brand.serviceArea}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                We work remotely for speed and price — paired with street-level knowledge of London postcodes, local search competition and commuter habits.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {LONDON_ZONES.map((z) => (
                  <div
                    key={z.zone}
                    className="rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-4"
                  >
                    <p className="font-mono-data text-[11px] font-bold uppercase tracking-wider text-[var(--emtrc-accent)]">
                      {z.zone}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--emtrc-muted)]">
                      {z.boroughs}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2 border-t border-[var(--emtrc-border)] pt-5 text-xs font-medium text-[var(--emtrc-ink)] sm:grid-cols-3">
                {[
                  'Barbers & groomers',
                  'Hair & beauty salons',
                  'Plumbers & heating',
                  'Electricians & trades',
                  'Local cleaners',
                  'Cafés & bakeries',
                ].map((sector) => (
                  <p key={sector} className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 shrink-0 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    <span>{sector}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] p-7 lg:col-span-5">
              <div>
                <div className="flex items-center gap-2 font-mono-data text-xs font-bold uppercase tracking-wider text-[var(--emtrc-accent)]">
                  <Building2 className="h-4 w-4" aria-hidden="true" />
                  <span>Company Details</span>
                </div>
                <h2 className="mt-2 font-editorial text-2xl font-bold text-[var(--emtrc-ink)]">
                  Direct, accountable London studio.
                </h2>
                <p className="mt-3 text-sm leading-relaxed font-medium text-[var(--emtrc-ink)]">
                  {SITE.brand.legalLine}
                </p>

                <dl className="mt-5 space-y-3 border-t border-[var(--emtrc-border)] pt-4 text-xs">
                  <div className="flex justify-between gap-4">
                    <dt className="text-[var(--emtrc-muted)]">Direct email</dt>
                    <dd className="font-mono-data font-semibold text-[var(--emtrc-ink)]">
                      <a href={`mailto:${SITE.brand.email}`} className="hover:text-[var(--emtrc-accent)] hover:underline">
                        {SITE.brand.email}
                      </a>
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[var(--emtrc-muted)]">Response SLA</dt>
                    <dd className="font-mono-data font-semibold text-[var(--emtrc-ink)]">
                      Within 1 working day
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[var(--emtrc-muted)]">Privacy standard</dt>
                    <dd className="inline-flex items-center gap-1 font-semibold text-[var(--emtrc-ink)]">
                      <ShieldCheck className="h-3.5 w-3.5 text-[var(--emtrc-accent)]" aria-hidden="true" />
                      <span>Zero cookies / UK GDPR</span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-7 flex flex-wrap gap-3 border-t border-[var(--emtrc-border)] pt-5">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <span>Send an enquiry</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <a
                  href={SITE.brand.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-4 py-2.5 text-xs font-semibold text-[var(--emtrc-ink)] transition-colors hover:border-[var(--emtrc-accent)]"
                >
                  <Calendar className="h-3.5 w-3.5 text-[var(--emtrc-accent)]" aria-hidden="true" />
                  <span>Book 15-min intro call</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </EmtrcLayout>
  );
}
