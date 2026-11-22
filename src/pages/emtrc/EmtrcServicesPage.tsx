import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  Check,
  Globe,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { SITE } from '../../content/site';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { Reveal } from '../../components/emtrc/Reveal';

const SERVICE_CHAPTERS = [
  {
    id: 'websites',
    number: '01',
    kicker: 'Websites & hosting',
    headline: 'Mobile-first websites built to make your phone ring.',
    body: 'Most London customers find you on their phone while walking down the high street or standing in a leaky kitchen. We build crisp, fast-loading sites with clear services, upfront prices, live opening hours and one-tap call or booking buttons — then host them on Cloudflare’s global edge with automatic SSL and daily backups.',
    bullets: [
      'Tailored 1-page or 5-page build using real photography and plain-English copy',
      'Live UK opening status, tap-to-call, WhatsApp and Fresha / Booksy / Treatwell links',
      '95+ mobile speed target — zero bloated WordPress plugins or broken updates',
      'Working demo built and sent to your phone before you pay a penny',
    ],
    image: '/src/assets/images/emtrc_editorial_desk_craft_1795374293989.jpg',
    imageAlt: 'Walnut studio desk with matte laptop, espresso cup and architectural grid notebook',
    ctaLabel: 'See 15 live London demos',
    ctaTo: '/work',
    icon: Globe,
  },
  {
    id: 'foundations',
    number: '02',
    kicker: 'Domains & business email',
    headline: 'Your own domain, in your own name — plus proper email.',
    body: 'Quoting a £1,200 boiler job or a wedding hair booking from a personal Gmail or Hotmail address costs trust before you even arrive. We register your .co.uk or .com domain directly in your name and set up @yourbusiness email with full SPF, DKIM and DMARC records so your quotes land in inboxes, not junk folders.',
    bullets: [
      'Domain registered in your name — auth code handed over within 5 working days if you ever leave',
      '1 standard @yourbusiness mailbox included on Business and Growth plans',
      'Extra mailboxes £3/user/month, or Google Workspace / Microsoft 365 at list price + £2/month',
      'Clean email migration from Gmail, Outlook or an old provider from £49 one-off',
    ],
    image: '/src/assets/images/emtrc_editorial_phone_studio_1795374293354.jpg',
    imageAlt: 'London reception counter with wireless business handset and brass lamp',
    ctaLabel: 'Compare plans & add-ons',
    ctaTo: '/pricing',
    icon: Mail,
  },
  {
    id: 'local-seo',
    number: '03',
    kicker: 'Google Maps & AI search',
    headline: 'Show up when neighbours search — on Google Maps and ChatGPT.',
    body: 'Being buried on page two is the same as being closed. Every emtrc website is wired straight into your Google Business Profile with matching borough coverage, structured LocalBusiness Schema.org data, and clean service descriptions that both Google Maps and AI search engines understand immediately.',
    bullets: [
      'Google Business Profile categories, hours, booking links and services aligned',
      'LocalBusiness + ProfessionalService JSON-LD structured data baked in from day one',
      'Optional 3 dedicated London area pages on Growth to capture neighbouring postcodes',
      'Automated Google review requests available to lift you into the Maps top three',
    ],
    image: '/src/assets/images/emtrc_hero_london_highstreet_1795374294553.jpg',
    imageAlt: 'Independent London Victorian high street shops in warm morning sun',
    ctaLabel: 'Download our Maps & AI Playbook',
    ctaTo: '/resources#guide-maps-ai',
    icon: MapPin,
  },
  {
    id: 'care',
    number: '04',
    kicker: 'Ongoing care & monthly edits',
    headline: 'Need a price changed? Just text or email us.',
    body: 'Small business owners should not spend Sunday evening wrestling with a page builder just to update bank-holiday opening hours or swap a menu photo. Every monthly plan includes hands-on edit time, uptime monitoring, security care and straight-talking results reporting.',
    bullets: [
      '15 mins/month on Starter, 30 mins on Business, 60 mins on Growth — most edits done in 24 hours',
      'Privacy-friendly visitor and tap-to-call tracking (zero cookie banners, zero trackers)',
      'Plain-English monthly results PDF on Growth showing calls, enquiries and top pages',
      'Prefer to pay once? One-off build (£595) + £25/month Care Plan covers hosting, SSL & backups',
    ],
    image: '/src/assets/images/emtrc_editorial_guides_print_1795374293225.jpg',
    imageAlt: 'Printed linen business playbooks on stone desk beside spectacles and espresso',
    ctaLabel: 'See how a launch works',
    ctaTo: '/how-it-works',
    icon: Wrench,
  },
] as const;

export function EmtrcServicesPage() {
  return (
    <EmtrcLayout>
      <EmtrcHead
        title="Services — Websites, Domains, Email & Local SEO | emtrc London"
        description="Managed websites, domains in your name, business email, Google Maps local SEO and AI front-office tools for London small businesses."
      />

      {/* Editorial Hero */}
      <section className="border-b border-[var(--emtrc-border)] pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
                Services · Everything under one London roof
              </p>
              <h1 className="mt-3 font-editorial text-4xl font-extrabold leading-[1.03] tracking-[-0.035em] text-[var(--emtrc-ink)] sm:text-6xl">
                Websites, email &amp; local SEO.
                <span className="block text-[var(--emtrc-muted)]">
                  Handled properly from day one.
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--emtrc-muted)] sm:text-lg">
                Start with a fast website that turns Google Maps searches into phone calls. Add
                professional email, automated review requests, missed-call text-back or a 24/7 AI
                receptionist whenever your business is ready.
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

          {/* Quick section jump strip */}
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-2 border-t border-[var(--emtrc-border)] pt-5 text-sm font-medium text-[var(--emtrc-muted)]">
            <a href="#websites" className="hover:text-[var(--emtrc-ink)] transition-colors">
              01 · Managed websites
            </a>
            <a href="#foundations" className="hover:text-[var(--emtrc-ink)] transition-colors">
              02 · Domains &amp; email
            </a>
            <a href="#local-seo" className="hover:text-[var(--emtrc-ink)] transition-colors">
              03 · Google Maps &amp; AI search
            </a>
            <a href="#care" className="hover:text-[var(--emtrc-ink)] transition-colors">
              04 · Monthly care &amp; edits
            </a>
            <Link
              to="/ai-tools"
              className="inline-flex items-center gap-1.5 font-semibold text-[var(--emtrc-accent)] hover:underline"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>05 · AI Tools &amp; Cloud Phone →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Alternating Service Chapters */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] space-y-20 px-5 sm:space-y-28 sm:px-8">
          {SERVICE_CHAPTERS.map((chapter, index) => {
            const Icon = chapter.icon;
            const imageLeft = index % 2 === 1;
            return (
              <Reveal key={chapter.id}>
                <article
                  id={chapter.id}
                  className="scroll-mt-24 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center"
                >
                  <div className={`lg:col-span-6 ${imageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="flex items-center gap-3 text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span>
                        {chapter.number} · {chapter.kicker}
                      </span>
                    </div>
                    <h2 className="mt-3 font-editorial text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-[var(--emtrc-ink)] sm:text-4xl">
                      {chapter.headline}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-[var(--emtrc-muted)]">
                      {chapter.body}
                    </p>
                    <ul className="mt-6 space-y-3 border-t border-[var(--emtrc-border)] pt-6">
                      {chapter.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--emtrc-ink)]"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emtrc-accent)]"
                            aria-hidden="true"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7">
                      <Link
                        to={chapter.ctaTo}
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--emtrc-accent)] hover:underline"
                      >
                        <span>{chapter.ctaLabel}</span>
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>

                  <div className={`lg:col-span-6 ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] shadow-sm">
                      <img
                        src={chapter.image}
                        alt={chapter.imageAlt}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Deep Midnight AI Bridge Banner */}
      <section className="border-t border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] py-16 text-[#F5F3EE] sm:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass-light)]">
                Add when you are ready
              </p>
              <h2 className="mt-3 font-editorial text-3xl font-extrabold leading-[1.06] tracking-[-0.03em] text-white sm:text-5xl">
                Ready to add AI call handling &amp; automated reviews?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#BAC5DC]">
                Most London clients start with our Business website plan (£69/month) and bolt on
                Review Engine (£39/month), Lead Catcher (£79/month) or our 24/7 AI Receptionist
                (£149/month) once they see the calls coming in.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/ai-tools"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <span>Explore AI tools &amp; Cloud Phone</span>
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
