import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { SITE } from '../../content/site';
import { SERVICE_DETAILS } from '../../content/services';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { PageHeader } from '../../components/emtrc/PageHeader';
import { AnimatedSectionHeader } from '../../components/emtrc/SectionSeparator';
import { Reveal } from '../../components/emtrc/Reveal';
import {
  postStaticForm,
  validateContactEnquiryForm,
  type ContactEnquiryFormData,
} from '../../utils/marketingForms';

const LONDON_BOROUGHS = [
  'Hackney',
  'Islington',
  'Camden',
  'Greenwich',
  'Southwark / Peckham',
  'Lambeth / Brixton',
  'Wandsworth / Battersea',
  'Kensington & Chelsea',
  'Westminster / Marylebone',
  'Tower Hamlets / Canary Wharf',
  'Hammersmith & Fulham',
  'Ealing',
  'Richmond upon Thames',
  'Waltham Forest',
  'Lewisham',
  'Croydon',
  'City of London',
  'Other Greater London borough',
] as const;

const INITIAL_FORM: ContactEnquiryFormData = {
  name: '',
  businessName: '',
  email: '',
  phone: '',
  borough: 'Hackney',
  serviceInterest: 'Personal AI Agents',
  message: '',
  consent: false,
  websiteHoneypot: '',
};

export function EmtrcContactPage() {
  const [form, setForm] = useState<ContactEnquiryFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactEnquiryFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContactEnquiryForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setSubmitting(true);

    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined;
    const res = await postStaticForm(endpoint, form);

    setSubmitting(false);
    if (!res.ok) {
      setSubmitError(res.error ?? 'Could not send enquiry. Please email hello@emtrc.com directly.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="Contact emtrc — Speak With Our London Web & AI Studio"
        description="Send a direct enquiry, email hello@emtrc.com or book a free 15-minute intro call. Serving independent businesses across all 32 London boroughs and the City of London."
      />

      <PageHeader
        kicker="Contact emtrc · Direct Replies, Zero Call-Centre Runaround"
        headlineLine1="Talk to our London studio."
        headlineLine2="Or send a direct enquiry below."
        description="Whether you want a website built from scratch, Personal AI Agents, AI Sales Leads, Competitor Pricing Intelligence, Local SEO & Rank Tracking or help ahead of the 2027 UK phone switch-off — message us below or grab 15 minutes in the diary."
        backdropImage="/src/assets/images/london_studio_dusk_header_1795426202168.jpg"
        backdropAlt="East London studio street at dusk"
        metrics={[
          { value: '< 1 day', label: 'Human reply SLA' },
          { value: '15 min', label: 'Free intro video/phone call' },
          { value: '32 + 1', label: 'London boroughs served' },
          { value: '48 hrs', label: 'Working website demo' },
        ]}
      />

      {/* Main Split: Interactive Direct Enquiry Form + Studio Channels */}
      <section className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] py-12 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left 7 Cols: Validated Direct Enquiry Form */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6 shadow-sm sm:p-8">
                  <AnimatedSectionHeader
                    index="01"
                    kicker="Direct Studio Enquiry"
                    headline="Tell us what you want to build"
                    accentWord="or automate."
                    tone="coral"
                  />

                  {submitted ? (
                    <div
                      role="status"
                      data-testid="contact-enquiry-success"
                      className="mt-7 rounded-2xl border border-emerald-500/35 bg-emerald-500/[0.08] p-6"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2
                          className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600 dark:text-emerald-400"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="font-mono-data text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                            Enquiry Received · London Studio
                          </p>
                          <h3 className="mt-1 font-editorial text-2xl font-bold text-[var(--emtrc-ink)]">
                            Thanks, {form.name.trim()}. We will reply inside 1 working day.
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                            We have logged your note regarding{' '}
                            <strong className="text-[var(--emtrc-ink)]">{form.serviceInterest}</strong>{' '}
                            {form.borough ? `(${form.borough})` : ''} and will reply to{' '}
                            <span className="font-mono-data text-[var(--emtrc-ink)]">{form.email}</span>.
                          </p>
                          <div className="mt-5 flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                setSubmitted(false);
                                setForm(INITIAL_FORM);
                              }}
                              className="rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] px-4 py-2 text-xs font-semibold text-[var(--emtrc-ink)] hover:border-[var(--emtrc-accent)]"
                            >
                              Send another message
                            </button>
                            <Link
                              to="/free-demo"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--emtrc-accent)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
                            >
                              <span>Or request a free 48-hour site demo</span>
                              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      data-testid="contact-enquiry-form"
                      className="mt-7 space-y-5"
                    >
                      {/* Spam honeypot */}
                      <div className="hidden" aria-hidden="true">
                        <label htmlFor="contact-website-hp">Website</label>
                        <input
                          id="contact-website-hp"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={form.websiteHoneypot}
                          onChange={(e) => setForm({ ...form, websiteHoneypot: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="block text-xs font-semibold text-[var(--emtrc-ink)]"
                          >
                            Your name *
                          </label>
                          <input
                            id="contact-name"
                            data-testid="contact-name-input"
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="e.g. Hannah Reid"
                            className="mt-1.5 w-full rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] px-3.5 py-2.5 text-sm text-[var(--emtrc-ink)] placeholder:text-[var(--emtrc-muted)]/70 focus:border-[var(--emtrc-accent)] focus:outline-none"
                          />
                          {errors.name && (
                            <p className="mt-1 text-xs font-medium text-[var(--emtrc-accent)]">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="contact-business"
                            className="block text-xs font-semibold text-[var(--emtrc-ink)]"
                          >
                            Business name
                          </label>
                          <input
                            id="contact-business"
                            data-testid="contact-business-input"
                            type="text"
                            value={form.businessName}
                            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                            placeholder="e.g. Kingsland Blade & Fade"
                            className="mt-1.5 w-full rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] px-3.5 py-2.5 text-sm text-[var(--emtrc-ink)] placeholder:text-[var(--emtrc-muted)]/70 focus:border-[var(--emtrc-accent)] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="contact-email"
                            className="block text-xs font-semibold text-[var(--emtrc-ink)]"
                          >
                            Email address *
                          </label>
                          <input
                            id="contact-email"
                            data-testid="contact-email-input"
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="owner@yourbusiness.co.uk"
                            className="mt-1.5 w-full rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] px-3.5 py-2.5 text-sm text-[var(--emtrc-ink)] placeholder:text-[var(--emtrc-muted)]/70 focus:border-[var(--emtrc-accent)] focus:outline-none"
                          />
                          {errors.email && (
                            <p className="mt-1 text-xs font-medium text-[var(--emtrc-accent)]">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="contact-phone"
                            className="block text-xs font-semibold text-[var(--emtrc-ink)]"
                          >
                            UK phone or WhatsApp (optional)
                          </label>
                          <input
                            id="contact-phone"
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="020 or 07..."
                            className="mt-1.5 w-full rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] px-3.5 py-2.5 text-sm text-[var(--emtrc-ink)] placeholder:text-[var(--emtrc-muted)]/70 focus:border-[var(--emtrc-accent)] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="contact-borough"
                            className="block text-xs font-semibold text-[var(--emtrc-ink)]"
                          >
                            London borough
                          </label>
                          <select
                            id="contact-borough"
                            value={form.borough}
                            onChange={(e) => setForm({ ...form, borough: e.target.value })}
                            className="mt-1.5 w-full rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] px-3.5 py-2.5 text-sm text-[var(--emtrc-ink)] focus:border-[var(--emtrc-accent)] focus:outline-none"
                          >
                            {LONDON_BOROUGHS.map((b) => (
                              <option key={b} value={b}>
                                {b}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="contact-service"
                            className="block text-xs font-semibold text-[var(--emtrc-ink)]"
                          >
                            Primary interest *
                          </label>
                          <select
                            id="contact-service"
                            data-testid="contact-service-select"
                            value={form.serviceInterest}
                            onChange={(e) => setForm({ ...form, serviceInterest: e.target.value })}
                            className="mt-1.5 w-full rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] px-3.5 py-2.5 text-sm text-[var(--emtrc-ink)] focus:border-[var(--emtrc-accent)] focus:outline-none"
                          >
                            {SERVICE_DETAILS.map((srv) => (
                              <option key={srv.slug} value={srv.shortTitle}>
                                {srv.shortTitle} ({srv.priceTag})
                              </option>
                            ))}
                            <option value="Full Website + AI Growth Bundle">
                              Full Website + AI Growth Bundle
                            </option>
                            <option value="General enquiry">General enquiry</option>
                          </select>
                          {errors.serviceInterest && (
                            <p className="mt-1 text-xs font-medium text-[var(--emtrc-accent)]">
                              {errors.serviceInterest}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-xs font-semibold text-[var(--emtrc-ink)]"
                        >
                          How can we help? *
                        </label>
                        <textarea
                          id="contact-message"
                          data-testid="contact-message-input"
                          rows={4}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell us about your shop or trade, what is currently costing you time or bookings, or drop your current website/Google Maps link…"
                          className="mt-1.5 w-full rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] px-3.5 py-2.5 text-sm text-[var(--emtrc-ink)] placeholder:text-[var(--emtrc-muted)]/70 focus:border-[var(--emtrc-accent)] focus:outline-none"
                        />
                        {errors.message && (
                          <p className="mt-1 text-xs font-medium text-[var(--emtrc-accent)]">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="flex items-start gap-2.5 text-xs text-[var(--emtrc-muted)] cursor-pointer select-none">
                          <input
                            type="checkbox"
                            data-testid="contact-consent-checkbox"
                            checked={form.consent}
                            onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                            className="mt-0.5 h-4 w-4 rounded border-[var(--emtrc-border)] accent-[var(--emtrc-accent)]"
                          />
                          <span>
                            I agree that emtrc can reply to this enquiry by email or phone. Zero spam or third-party sharing — see our{' '}
                            <Link to="/privacy" className="underline hover:text-[var(--emtrc-ink)]">
                              privacy policy
                            </Link>
                            .
                          </span>
                        </label>
                        {errors.consent && (
                          <p className="mt-1 text-xs font-medium text-[var(--emtrc-accent)]">
                            {errors.consent}
                          </p>
                        )}
                      </div>

                      {submitError && (
                        <p role="alert" className="text-xs font-semibold text-[var(--emtrc-accent)]">
                          {submitError}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        data-testid="contact-submit-button"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)] disabled:opacity-60 sm:w-auto"
                      >
                        <Send className="h-4 w-4" aria-hidden="true" />
                        <span>{submitting ? 'Sending enquiry…' : 'Send enquiry to London studio'}</span>
                      </button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>

            {/* Right 5 Cols: Direct Contact Channels (Even 2x2 Stack / Clean Hierarchy) */}
            <div className="space-y-5 lg:col-span-5">
              {/* Book 15-min Call (Obsidian Highlight Card) */}
              <div className="rounded-2xl border border-[var(--emtrc-navy-border)] bg-[#0B0D12] p-6 text-white sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#FF8C73]">
                    <Calendar className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono-data text-[11px] font-semibold text-[#34D399]">
                    Fastest option
                  </span>
                </div>
                <h2 className="mt-4 font-editorial text-2xl font-bold text-white">
                  Book a 15-minute intro call
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#BAC5DC]">
                  Pick a slot between appointments or after closing. Straight answers on pricing, websites, AI agents and the 2027 phone switch-off — zero sales script.
                </p>
                <a
                  href={SITE.brand.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                >
                  <span>Book on Calendly</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              {/* Direct Email + Studio Hours */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6">
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    <p className="font-mono-data text-xs font-bold uppercase tracking-wider text-[var(--emtrc-muted)]">
                      Direct Email
                    </p>
                  </div>
                  <p className="mt-2.5">
                    <a
                      href={`mailto:${SITE.brand.email}`}
                      className="font-editorial text-xl font-bold text-[var(--emtrc-ink)] underline underline-offset-4 hover:text-[var(--emtrc-accent)]"
                    >
                      {SITE.brand.email}
                    </a>
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--emtrc-muted)]">
                    Send your website URL, domain question or AI brief. Mon–Fri 08:30–18:30 London time.
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6">
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="h-4 w-4 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    <p className="font-mono-data text-xs font-bold uppercase tracking-wider text-[var(--emtrc-muted)]">
                      Free 48-Hour Working Demo
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                    Prefer to see your own website rebuilt first? Send us your business name and borough — we build a clickable demo before asking for a penny.
                  </p>
                  <Link
                    to="/free-demo"
                    className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--emtrc-accent)] hover:underline"
                  >
                    <span>Request free working demo</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Studio Coverage & Legal */}
              <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6">
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[var(--emtrc-ink)]">Service Area</p>
                      <p className="mt-0.5 text-[var(--emtrc-muted)]">{SITE.brand.serviceArea}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[var(--emtrc-ink)]">Support &amp; Edit Turnaround</p>
                      <p className="mt-0.5 text-[var(--emtrc-muted)]">
                        Routine website edits live within 24 hours · Direct enquiries answered inside 1 working day.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[var(--emtrc-ink)]">Registered Entity</p>
                      <p className="mt-0.5 text-[var(--emtrc-muted)]">{SITE.brand.legalLine}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emtrc-accent)]" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[var(--emtrc-ink)]">UK GDPR &amp; Zero-Cookie Site</p>
                      <p className="mt-0.5 text-[var(--emtrc-muted)]">
                        Read our{' '}
                        <Link to="/privacy" className="underline hover:text-[var(--emtrc-ink)]">
                          Privacy Policy
                        </Link>{' '}
                        and{' '}
                        <Link to="/terms" className="underline hover:text-[var(--emtrc-ink)]">
                          Terms of Service
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </EmtrcLayout>
  );
}
