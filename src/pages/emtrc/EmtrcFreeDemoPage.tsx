import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Calendar, Check, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { SITE } from '../../content/site';
import {
  postStaticForm,
  validateFreeDemoForm,
  type FreeDemoFormData,
} from '../../utils/marketingForms';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';

export function EmtrcFreeDemoPage() {
  const [searchParams] = useSearchParams();
  const initialPlan = searchParams.get('plan')?.trim() || '';

  const [form, setForm] = useState<FreeDemoFormData>({
    businessName: '',
    trade: '',
    borough: '',
    profileUrl: '',
    name: '',
    email: '',
    phone: '',
    notes: initialPlan ? `Interested in the ${initialPlan} plan.` : '',
    consentContact: false,
    consentMarketing: false,
    websiteHoneypot: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FreeDemoFormData, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = <K extends keyof FreeDemoFormData>(key: K, value: FreeDemoFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const validation = validateFreeDemoForm(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setSubmitting(true);
    const result = await postStaticForm(SITE.endpoints.freeDemoEndpoint, form);
    setSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.error ?? 'Something went wrong. Please email hello@emtrc.com.');
      return;
    }

    setSubmitted(true);
  };

  const inputBase =
    'mt-1.5 block w-full rounded-lg border bg-[var(--emtrc-canvas)] px-3.5 py-2.5 text-sm text-[var(--emtrc-ink)] placeholder:text-[var(--emtrc-muted)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--emtrc-accent)]';

  return (
    <EmtrcLayout hideNewsletter>
      <EmtrcHead
        title="Get a Free Working Demo Website in 2 Working Days | emtrc London"
        description="Request a free working demo website built for your London business before you pay a penny. Delivered to your phone in 2 working days."
      />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left Editorial Brief & Guarantees */}
            <div className="lg:col-span-5">
              <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
                Free working demo · Zero obligation
              </p>
              <h1 className="mt-3 font-editorial text-4xl font-extrabold leading-[1.04] tracking-[-0.035em] text-[var(--emtrc-ink)] sm:text-5xl">
                See your new website
                <span className="block text-[var(--emtrc-muted)]">before you pay a penny.</span>
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[var(--emtrc-muted)]">
                Tell us a few basics about your London business. Within 2 working days we will
                email you a private link to a working demo built around your services, borough and
                style — ready to test on your own phone.
              </p>

              <div className="mt-8 space-y-4 border-t border-[var(--emtrc-border)] pt-7">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emtrc-accent)]" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-[var(--emtrc-ink)]">Ready in 2 working days</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[var(--emtrc-muted)]">
                      Built with real local structure, live hours and tap-to-call — not a generic wireframe.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emtrc-accent)]" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-[var(--emtrc-ink)]">No card, no hard sell</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[var(--emtrc-muted)]">
                      If you love it, plans start at £39/month. If not, we take the demo down and part as friends.
                    </p>
                  </div>
                </div>
              </div>

              {/* Prefer a quick chat box */}
              <div className="mt-8 rounded-2xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] p-6 text-[#F5F3EE]">
                <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass-light)]">
                  Prefer to talk first?
                </p>
                <p className="mt-1.5 font-editorial text-lg font-bold text-white">
                  Book a 15-minute intro call
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#BAC5DC]">
                  Ask anything about domains, switching from an existing site, or adding AI call handling.
                </p>
                <a
                  href={SITE.brand.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-surface)] px-4 py-2 text-xs font-semibold text-[var(--emtrc-ink)] hover:opacity-90"
                >
                  <Calendar className="h-3.5 w-3.5 text-[var(--emtrc-accent)]" aria-hidden="true" />
                  <span>Open Calendly diary</span>
                </a>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6 shadow-sm sm:p-9">
                {submitted ? (
                  <div
                    data-testid="free-demo-success"
                    role="status"
                    className="py-6"
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--emtrc-accent)]/10 text-[var(--emtrc-accent)]">
                      <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h2 className="mt-4 font-editorial text-2xl font-extrabold text-[var(--emtrc-ink)] sm:text-3xl">
                      {SITE.freeDemoSuccessMessage}
                    </h2>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--emtrc-muted)]">
                      We have your details for <strong className="text-[var(--emtrc-ink)]">{form.businessName}</strong> in{' '}
                      <strong className="text-[var(--emtrc-ink)]">{form.borough}</strong>. Keep an eye on{' '}
                      <strong className="text-[var(--emtrc-ink)]">{form.email}</strong> for your private preview link.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link
                        to="/work"
                        className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--emtrc-accent-hover)]"
                      >
                        <span>Browse 15 live London demos</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <a
                        href={SITE.brand.calendlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] px-5 py-2.5 text-sm font-semibold text-[var(--emtrc-ink)] hover:border-[var(--emtrc-ink)]"
                      >
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        <span>Book a 15-minute call</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate data-testid="free-demo-form">
                    <h2 className="font-editorial text-xl font-bold text-[var(--emtrc-ink)] sm:text-2xl">
                      Tell us about your business
                    </h2>
                    <p className="mt-1 text-xs text-[var(--emtrc-muted)]">
                      Takes under 2 minutes. Fields marked * are required.
                    </p>

                    {/* Honeypot field — hidden from humans & screen readers */}
                    <div className="sr-only" aria-hidden="true">
                      <label htmlFor="demo-website-honeypot">Leave this field empty</label>
                      <input
                        id="demo-website-honeypot"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.websiteHoneypot}
                        onChange={(e) => updateField('websiteHoneypot', e.target.value)}
                      />
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {/* Business name */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="demo-business-name"
                          className="block text-xs font-bold text-[var(--emtrc-ink)]"
                        >
                          Business name *
                        </label>
                        <input
                          id="demo-business-name"
                          name="businessName"
                          type="text"
                          required
                          placeholder="e.g. Kingsland Blade & Fade"
                          value={form.businessName}
                          onChange={(e) => updateField('businessName', e.target.value)}
                          aria-invalid={Boolean(errors.businessName)}
                          className={`${inputBase} ${
                            errors.businessName ? 'border-red-600' : 'border-[var(--emtrc-border)]'
                          }`}
                        />
                        {errors.businessName && (
                          <p role="alert" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                            {errors.businessName}
                          </p>
                        )}
                      </div>

                      {/* Trade */}
                      <div>
                        <label
                          htmlFor="demo-trade"
                          className="block text-xs font-bold text-[var(--emtrc-ink)]"
                        >
                          Trade / sector *
                        </label>
                        <select
                          id="demo-trade"
                          name="trade"
                          required
                          value={form.trade}
                          onChange={(e) => updateField('trade', e.target.value)}
                          aria-invalid={Boolean(errors.trade)}
                          className={`${inputBase} ${
                            errors.trade ? 'border-red-600' : 'border-[var(--emtrc-border)]'
                          }`}
                        >
                          <option value="">Select your trade…</option>
                          {SITE.tradesList.map((trade) => (
                            <option key={trade} value={trade}>
                              {trade}
                            </option>
                          ))}
                        </select>
                        {errors.trade && (
                          <p role="alert" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                            {errors.trade}
                          </p>
                        )}
                      </div>

                      {/* London borough */}
                      <div>
                        <label
                          htmlFor="demo-borough"
                          className="block text-xs font-bold text-[var(--emtrc-ink)]"
                        >
                          London borough *
                        </label>
                        <select
                          id="demo-borough"
                          name="borough"
                          required
                          value={form.borough}
                          onChange={(e) => updateField('borough', e.target.value)}
                          aria-invalid={Boolean(errors.borough)}
                          className={`${inputBase} ${
                            errors.borough ? 'border-red-600' : 'border-[var(--emtrc-border)]'
                          }`}
                        >
                          <option value="">Select your borough…</option>
                          {SITE.londonBoroughs.map((borough) => (
                            <option key={borough} value={borough}>
                              {borough}
                            </option>
                          ))}
                        </select>
                        {errors.borough && (
                          <p role="alert" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                            {errors.borough}
                          </p>
                        )}
                      </div>

                      {/* Google Maps or Instagram link */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="demo-profile-url"
                          className="block text-xs font-bold text-[var(--emtrc-ink)]"
                        >
                          Google Maps or Instagram link{' '}
                          <span className="font-normal text-[var(--emtrc-muted)]">(optional)</span>
                        </label>
                        <input
                          id="demo-profile-url"
                          name="profileUrl"
                          type="url"
                          placeholder="https://maps.google.com/... or https://instagram.com/yourshop"
                          value={form.profileUrl}
                          onChange={(e) => updateField('profileUrl', e.target.value)}
                          aria-invalid={Boolean(errors.profileUrl)}
                          className={`${inputBase} ${
                            errors.profileUrl ? 'border-red-600' : 'border-[var(--emtrc-border)]'
                          }`}
                        />
                        {errors.profileUrl && (
                          <p role="alert" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                            {errors.profileUrl}
                          </p>
                        )}
                      </div>

                      {/* Your name */}
                      <div>
                        <label
                          htmlFor="demo-name"
                          className="block text-xs font-bold text-[var(--emtrc-ink)]"
                        >
                          Your name *
                        </label>
                        <input
                          id="demo-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="e.g. Samira Patel"
                          value={form.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          aria-invalid={Boolean(errors.name)}
                          className={`${inputBase} ${
                            errors.name ? 'border-red-600' : 'border-[var(--emtrc-border)]'
                          }`}
                        />
                        {errors.name && (
                          <p role="alert" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="demo-email"
                          className="block text-xs font-bold text-[var(--emtrc-ink)]"
                        >
                          Email address *
                        </label>
                        <input
                          id="demo-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="you@yourbusiness.co.uk"
                          value={form.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          aria-invalid={Boolean(errors.email)}
                          className={`${inputBase} ${
                            errors.email ? 'border-red-600' : 'border-[var(--emtrc-border)]'
                          }`}
                        />
                        {errors.email && (
                          <p role="alert" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="demo-phone"
                          className="block text-xs font-bold text-[var(--emtrc-ink)]"
                        >
                          Phone number{' '}
                          <span className="font-normal text-[var(--emtrc-muted)]">(optional)</span>
                        </label>
                        <input
                          id="demo-phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="020 or 07..."
                          value={form.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          className={`${inputBase} border-[var(--emtrc-border)]`}
                        />
                      </div>

                      {/* Anything else */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="demo-notes"
                          className="block text-xs font-bold text-[var(--emtrc-ink)]"
                        >
                          Anything else?{' '}
                          <span className="font-normal text-[var(--emtrc-muted)]">(optional)</span>
                        </label>
                        <textarea
                          id="demo-notes"
                          name="notes"
                          rows={3}
                          placeholder="Booking link (Fresha/Booksy), preferred colours, existing domain, or services you want highlighted…"
                          value={form.notes}
                          onChange={(e) => updateField('notes', e.target.value)}
                          className={`${inputBase} border-[var(--emtrc-border)]`}
                        />
                      </div>
                    </div>

                    {/* Consent checkboxes */}
                    <div className="mt-6 space-y-3 border-t border-[var(--emtrc-border)] pt-5">
                      <div>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            id="demo-consent-contact"
                            type="checkbox"
                            checked={form.consentContact}
                            onChange={(e) => updateField('consentContact', e.target.checked)}
                            aria-invalid={Boolean(errors.consentContact)}
                            className="mt-0.5 h-4 w-4 rounded border-[var(--emtrc-border)] text-[var(--emtrc-accent)] focus:ring-[var(--emtrc-accent)]"
                          />
                          <span className="text-xs leading-relaxed text-[var(--emtrc-ink)]">
                            I agree emtrc can contact me about my demo. Read our{' '}
                            <Link
                              to="/privacy"
                              className="font-semibold text-[var(--emtrc-accent)] underline underline-offset-2"
                            >
                              privacy policy
                            </Link>
                            . *
                          </span>
                        </label>
                        {errors.consentContact && (
                          <p role="alert" className="mt-1 pl-7 text-xs font-medium text-red-600 dark:text-red-400">
                            {errors.consentContact}
                          </p>
                        )}
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          id="demo-consent-marketing"
                          type="checkbox"
                          checked={form.consentMarketing}
                          onChange={(e) => updateField('consentMarketing', e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-[var(--emtrc-border)] text-[var(--emtrc-accent)] focus:ring-[var(--emtrc-accent)]"
                        />
                        <span className="text-xs leading-relaxed text-[var(--emtrc-muted)]">
                          Send me occasional tips and offers (optional — one click to unsubscribe).
                        </span>
                      </label>
                    </div>

                    {submitError && (
                      <p
                        role="alert"
                        className="mt-4 rounded-lg border border-red-300 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
                      >
                        {submitError}
                      </p>
                    )}

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="submit"
                        disabled={submitting}
                        data-testid="free-demo-submit"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)] disabled:opacity-60"
                      >
                        <span>{submitting ? 'Sending…' : 'Request my free demo'}</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <p className="inline-flex items-center gap-1.5 text-xs text-[var(--emtrc-muted)]">
                        <Check className="h-3.5 w-3.5 text-[var(--emtrc-accent)]" aria-hidden="true" />
                        <span>No cookies · Leads deleted after 90 days if inactive</span>
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </EmtrcLayout>
  );
}
