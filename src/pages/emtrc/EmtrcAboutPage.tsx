import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Calendar, Check, MapPin, ShieldCheck } from 'lucide-react';
import { SITE } from '../../content/site';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { Reveal } from '../../components/emtrc/Reveal';

const OPERATING_PRINCIPLES = [
  {
    number: '01',
    title: 'Plain English over agency jargon',
    body: 'You should never need to decode “omnichannel funnel synergy” to know whether your website is bringing in local calls. We tell you what we are doing, what it costs, and what rang your phone.',
  },
  {
    number: '02',
    title: 'AI does the legwork; real standards do the judging',
    body: 'We use modern automation behind the scenes to build faster and keep monthly prices fair — while every site, email setup and piece of copy is reviewed against strict speed, accessibility and London local-search standards before it goes live.',
  },
  {
    number: '03',
    title: 'Built for the London high street, not Silicon Valley',
    body: 'A Hackney barber, a Greenwich heating engineer and a Peckham bakery have completely different jobs from a software startup. We design around what neighbours actually look for: open now, clear prices, real photos and tap-to-call.',
  },
  {
    number: '04',
    title: 'Clean ownership and zero nasty surprises',
    body: 'Your domain is registered in your name, your pricing is published openly on this website, and after 12 months your plan rolls cleanly on 30 days’ notice. No hostage domains, no surprise renewal invoices.',
  },
] as const;

export function EmtrcAboutPage() {
  return (
    <EmtrcLayout>
      <EmtrcHead
        title="About emtrc — London Web Design, Hosting & AI Front Office"
        description="emtrc is a London web design, hosting and AI front-office company helping independent high-street shops and local trades look sharp online."
      />

      {/* Editorial Hero */}
      <section className="border-b border-[var(--emtrc-border)] pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
                About emtrc · Built for independent London
              </p>
              <h1 className="mt-3 font-editorial text-4xl font-extrabold leading-[1.03] tracking-[-0.035em] text-[var(--emtrc-ink)] sm:text-6xl">
                Great local businesses deserve
                <span className="block text-[var(--emtrc-muted)]">
                  a proper website — without the £2,500 bill.
                </span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-[var(--emtrc-muted)] sm:text-lg">
                Walk down any London high street and you will find brilliant barbers, salons,
                cleaners, cafés and tradespeople doing five-star work — yet losing daily enquiries
                because they only have an Instagram page, an outdated website, or missed calls while
                their hands are full.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[var(--emtrc-muted)]">
                emtrc exists to close that gap: agency-grade mobile websites, proper business email,
                local Google Maps foundations and practical AI call-handling, looked after for one
                clear monthly fee.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] shadow-sm">
                <img
                  src="/src/assets/images/emtrc_hero_london_highstreet_1795374294553.jpg"
                  alt="Independent London Victorian high street shopfronts in morning light"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Principles */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
              How we work
            </p>
            <h2 className="mt-2 font-editorial text-3xl font-extrabold tracking-[-0.03em] text-[var(--emtrc-ink)] sm:text-4xl">
              Four rules we hold ourselves to on every single client site.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {OPERATING_PRINCIPLES.map((item, idx) => (
              <Reveal key={item.number} delay={idx * 0.05}>
                <div className="h-full rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-7">
                  <p className="font-editorial text-sm font-extrabold text-[var(--emtrc-brass)]">
                    {item.number}
                  </p>
                  <h3 className="mt-2 font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Four Guarantees Strip (Midnight Band) */}
      <section className="border-y border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] py-16 text-[#F5F3EE] sm:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass-light)]">
                Zero-risk guarantees
              </p>
              <h2 className="mt-2 font-editorial text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl">
                Backed in writing, not handshakes.
              </h2>
            </div>
            <Link
              to="/free-demo"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--emtrc-brass-light)] hover:underline"
            >
              <span>Request your free 48-hour demo</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SITE.guarantees.map((g) => (
              <div
                key={g.number}
                className="rounded-xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy-soft)] p-6"
              >
                <p className="font-editorial text-xs font-bold text-[var(--emtrc-brass-light)]">
                  {g.number}
                </p>
                <h3 className="mt-2 font-editorial text-lg font-bold text-white">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#BAC5DC]">{g.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage & Company Details */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-7 lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>Service area</span>
              </div>
              <h2 className="mt-2 font-editorial text-2xl font-extrabold text-[var(--emtrc-ink)]">
                {SITE.brand.serviceArea}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                From Hackney, Shoreditch and Islington across to Kensington, Richmond, Greenwich,
                Peckham, Wandsworth and Croydon — we work exclusively with independent local
                businesses across Greater London.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-medium text-[var(--emtrc-ink)] sm:grid-cols-3">
                {[
                  'Barbers & groomers',
                  'Hair & beauty salons',
                  'Nail & lash studios',
                  'Plumbers & heating',
                  'Electricians & builders',
                  'Local cleaners & cafés',
                ].map((sector) => (
                  <p key={sector} className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 shrink-0 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    <span>{sector}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] p-7 lg:col-span-5">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                <span>Company details</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--emtrc-ink)] font-medium">
                {SITE.brand.legalLine}
              </p>
              <dl className="mt-5 space-y-2.5 border-t border-[var(--emtrc-border)] pt-4 text-xs">
                <div className="flex justify-between gap-4">
                  <dt className="text-[var(--emtrc-muted)]">Email</dt>
                  <dd className="font-semibold text-[var(--emtrc-ink)]">
                    <a href={`mailto:${SITE.brand.email}`} className="hover:underline">
                      {SITE.brand.email}
                    </a>
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
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={SITE.brand.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Book a 15-min intro call</span>
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-4 py-2.5 text-xs font-semibold text-[var(--emtrc-ink)] hover:border-[var(--emtrc-ink)]"
                >
                  <span>Contact details</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </EmtrcLayout>
  );
}
