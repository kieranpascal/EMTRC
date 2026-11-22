import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Calendar, Mail, MapPin } from 'lucide-react';
import { SITE } from '../../content/site';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';

export function EmtrcContactPage() {
  return (
    <EmtrcLayout>
      <EmtrcHead
        title="Contact emtrc — London Web Design, Hosting & AI Tools"
        description="Get in touch with emtrc by email or book a free 15-minute intro call. Serving small local businesses across all 32 London boroughs and the City of London."
      />

      <section className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
              Contact · Direct replies, no call-centre runaround
            </p>
            <h1 className="mt-3 font-editorial text-4xl font-extrabold leading-[1.03] tracking-[-0.035em] text-[var(--emtrc-ink)] sm:text-6xl">
              Talk to a real person.
              <span className="block text-[var(--emtrc-muted)]">Or ask for a free demo.</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[var(--emtrc-muted)] sm:text-lg">
              Whether you want a website built from scratch, need help untangling an existing
              domain and email, or want to plan ahead of the January 2027 UK phone switch-off —
              drop us an email or grab 15 minutes in the diary.
            </p>
          </div>

          {/* Primary Contact Channels — NO address map */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Email */}
            <div className="flex flex-col justify-between rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-7">
              <div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--emtrc-sand)] text-[var(--emtrc-ink)]">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-5 font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                  Email us
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                  Send your question, current website link or domain query. We reply inside one
                  working day.
                </p>
              </div>
              <p className="mt-6">
                <a
                  href={`mailto:${SITE.brand.email}`}
                  className="font-editorial text-base font-bold text-[var(--emtrc-accent)] underline underline-offset-4 hover:opacity-80"
                >
                  {SITE.brand.email}
                </a>
              </p>
            </div>

            {/* Book a call */}
            <div className="flex flex-col justify-between rounded-2xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] p-7 text-[#F5F3EE]">
              <div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--emtrc-navy-soft)] text-[var(--emtrc-brass-light)]">
                  <Calendar className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-5 font-editorial text-xl font-bold text-white">
                  Book a 15-minute call
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#BAC5DC]">
                  Pick a slot that fits around your shop floor or van schedule. Straight answers,
                  zero pushy sales script.
                </p>
              </div>
              <div className="mt-6">
                <a
                  href={SITE.brand.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <span>Book on Calendly</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Service area */}
            <div className="flex flex-col justify-between rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-7">
              <div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--emtrc-sand)] text-[var(--emtrc-ink)]">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-5 font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                  Service area
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                  {SITE.brand.serviceArea}. Built remotely for speed — with local London
                  knowledge of every postcode and high street.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  to="/free-demo"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--emtrc-accent)] hover:underline"
                >
                  <span>Request a free 48-hour demo</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Legal Company Line (matches footer) */}
          <div className="mt-10 rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--emtrc-brass)]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
                    Legal entity
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--emtrc-ink)]">
                    {SITE.brand.legalLine}
                  </p>
                </div>
              </div>
              <div className="flex gap-5 text-xs font-semibold text-[var(--emtrc-muted)]">
                <Link to="/privacy" className="hover:text-[var(--emtrc-ink)] underline underline-offset-4">
                  Privacy policy
                </Link>
                <Link to="/terms" className="hover:text-[var(--emtrc-ink)] underline underline-offset-4">
                  Terms of service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </EmtrcLayout>
  );
}
