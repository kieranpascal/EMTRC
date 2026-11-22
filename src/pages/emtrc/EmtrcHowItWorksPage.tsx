import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Check, Clock, KeyRound, MessageSquare, ShieldCheck } from 'lucide-react';
import { SITE } from '../../content/site';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { Reveal } from '../../components/emtrc/Reveal';

const TIMELINE_DETAILS = [
  {
    day: 'Day 0',
    title: 'Send us 2 minutes of details',
    summary:
      'Fill in our short free-demo form with your business name, London borough, trade and Google Maps or Instagram link. No 30-page discovery form required.',
    ownerDoes: '2 minutes to submit the form (or a quick 15-minute phone chat if you prefer).',
    emtrcDoes: 'We review your current Google listing, prices, reviews and local competitors.',
  },
  {
    day: 'Day 1–2',
    title: 'Open your working demo on your own phone',
    summary:
      'Within 2 working days we send a private demo link built specifically for your business — complete with your services, borough coverage, opening hours and booking or quote links.',
    ownerDoes: 'Tap through it on your phone and tell us what you want tweaked — or walk away owing nothing.',
    emtrcDoes: 'We build, speed-test and tailor the layout before asking for a single penny.',
  },
  {
    day: 'Day 3–5',
    title: 'Domain, email, Google Maps & go live',
    summary:
      'Happy with the demo? We register your .co.uk or .com domain in your own name, configure @yourbusiness email with full SPF/DKIM/DMARC records, link Google Maps and publish on Cloudflare.',
    ownerDoes: 'Approve final tweaks and set up your monthly Direct Debit or annual payment.',
    emtrcDoes: 'DNS, SSL, redirects, LocalBusiness schema, email setup and live launch handled end-to-end.',
  },
  {
    day: 'Every month',
    title: 'Ongoing care, edits & straight-talking results',
    summary:
      'Need to update prices, add winter hours, swap photos or announce a new service? Email or WhatsApp us. Most routine edits go live within 24 hours.',
    ownerDoes: 'Send a quick message whenever anything in the business changes.',
    emtrcDoes: 'Hosting, security, backups, edits (15–60 mins/mo included) and monthly call/lead visibility.',
  },
] as const;

export function EmtrcHowItWorksPage() {
  return (
    <EmtrcLayout>
      <EmtrcHead
        title="How It Works — From Free Demo to Live Site in a Week | emtrc"
        description="See how emtrc takes London local businesses from a free 48-hour working demo to a live website, business email and monthly care."
      />

      {/* Editorial Header */}
      <section className="border-b border-[var(--emtrc-border)] pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
              How it works · No six-week agency theatre
            </p>
            <h1 className="mt-3 font-editorial text-4xl font-extrabold leading-[1.03] tracking-[-0.035em] text-[var(--emtrc-ink)] sm:text-6xl">
              See your site on your phone.
              <span className="block text-[var(--emtrc-muted)]">
                Then decide if you want it.
              </span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[var(--emtrc-muted)] sm:text-lg">
              Most small businesses have been burned by agencies that ask for £1,500 up front and
              take two months to deliver a template. We flipped the order: we build first, show you
              a real working demo in 2 working days, and only charge if you love it.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/free-demo"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
              >
                <span>Request my free demo</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={SITE.brand.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-5 py-3 text-sm font-semibold text-[var(--emtrc-ink)] transition-colors hover:border-[var(--emtrc-ink)]"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>Book a 15-minute call</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Structured 4-Stage Launch Timeline */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="space-y-6">
            {TIMELINE_DETAILS.map((stage, idx) => (
              <Reveal key={stage.day} delay={idx * 0.05}>
                <div className="grid grid-cols-1 gap-6 rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6 sm:p-8 lg:grid-cols-12">
                  <div className="lg:col-span-3">
                    <p className="font-editorial text-2xl font-extrabold text-[var(--emtrc-accent)] sm:text-3xl">
                      {stage.day}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-[var(--emtrc-muted)]">
                      Stage 0{idx + 1} of 04
                    </p>
                  </div>
                  <div className="lg:col-span-5">
                    <h2 className="font-editorial text-xl font-bold text-[var(--emtrc-ink)] sm:text-2xl">
                      {stage.title}
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                      {stage.summary}
                    </p>
                  </div>
                  <div className="space-y-3 border-t border-[var(--emtrc-border)] pt-4 text-xs leading-relaxed lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
                    <div>
                      <p className="font-bold text-[var(--emtrc-ink)]">What you do</p>
                      <p className="mt-0.5 text-[var(--emtrc-muted)]">{stage.ownerDoes}</p>
                    </div>
                    <div>
                      <p className="font-bold text-[var(--emtrc-brass)]">What emtrc handles</p>
                      <p className="mt-0.5 text-[var(--emtrc-muted)]">{stage.emtrcDoes}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ownership & Fair-Exit Chapter (Dark Midnight Band) */}
      <section className="border-y border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] py-16 text-[#F5F3EE] sm:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass-light)]">
              No lock-in · Fair ownership
            </p>
            <h2 className="mt-3 font-editorial text-3xl font-extrabold leading-[1.06] tracking-[-0.03em] text-white sm:text-5xl">
              Your domain stays in your name.
              <span className="block text-[#9AA8C5]">Always.</span>
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy-soft)] p-6">
              <KeyRound className="h-5 w-5 text-[var(--emtrc-brass-light)]" aria-hidden="true" />
              <h3 className="mt-4 font-editorial text-lg font-bold text-white">
                Clean domain handover
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#BAC5DC]">
                Unlike legacy directory companies that register your domain under their own name,
                your .co.uk or .com belongs to your business. If you leave, we release transfer codes
                within 5 working days.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy-soft)] p-6">
              <MessageSquare className="h-5 w-5 text-[var(--emtrc-brass-light)]" aria-hidden="true" />
              <h3 className="mt-4 font-editorial text-lg font-bold text-white">
                Fast monthly edits
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#BAC5DC]">
                Send new prices, team headshots or bank-holiday hours by email or WhatsApp. Routine
                updates are normally live inside 24 hours — included in your monthly allowance.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy-soft)] p-6">
              <Clock className="h-5 w-5 text-[var(--emtrc-brass-light)]" aria-hidden="true" />
              <h3 className="mt-4 font-editorial text-lg font-bold text-white">
                Plain 30-day rolling exit
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#BAC5DC]">
                After your initial 12 months, plans roll monthly on 30 days’ written notice — no
                sneaky auto-renewing multi-year contracts. Plus our 30-day refund promise at launch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Straight Answers + CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
                Common questions
              </p>
              <h2 className="mt-2 font-editorial text-3xl font-extrabold tracking-[-0.03em] text-[var(--emtrc-ink)]">
                Straight answers before you start.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                Still weighing up monthly vs one-off, or want to see how we handle an existing
                website? Book a quick 15-minute chat — zero sales pressure.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <span>Compare plans</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--emtrc-ink)] hover:border-[var(--emtrc-ink)]"
                >
                  <span>Explore live demos</span>
                </Link>
              </div>
            </div>

            <div className="divide-y divide-[var(--emtrc-border)] border-y border-[var(--emtrc-border)] lg:col-span-7">
              {SITE.faqs.map((faq) => (
                <div key={faq.q} className="py-5">
                  <h3 className="flex items-start gap-2.5 font-editorial text-base font-bold text-[var(--emtrc-ink)]">
                    <ShieldCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emtrc-accent)]"
                      aria-hidden="true"
                    />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="mt-2 pl-6.5 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist Strip */}
          <div className="mt-14 rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] p-6 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                  Ready to see your business online this week?
                </p>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-xs font-medium text-[var(--emtrc-muted)]">
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    Working demo in 2 working days
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    Zero obligation
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    No card details needed
                  </span>
                </div>
              </div>
              <Link
                to="/free-demo"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
              >
                <span>Get my free demo</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </EmtrcLayout>
  );
}
