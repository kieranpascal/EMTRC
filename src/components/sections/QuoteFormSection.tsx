import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import {
  hasQuoteErrors,
  submitQuoteRequest,
  validateQuoteForm,
  type QuoteRequestInput,
  type QuoteValidationErrors,
} from '../../utils/quoteForm';
import { Reveal } from '../emtrc/Reveal';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function createInitialQuote(defaultService: string): QuoteRequestInput {
  return {
    name: '',
    phone: '',
    email: '',
    postcode: '',
    serviceType: defaultService,
    propertySize: '',
    notes: '',
    honeypot: '',
  };
}

export function QuoteFormSection() {
  const { site, theme } = useSite();
  const prefersReduced = useReducedMotion();
  const cfg = site.quoteForm;

  const serviceOptions =
    cfg?.serviceTypes && cfg.serviceTypes.length > 0
      ? cfg.serviceTypes
      : site.services.map((s) => s.name);

  const [form, setForm] = useState<QuoteRequestInput>(() => createInitialQuote(''));
  const [errors, setErrors] = useState<QuoteValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!cfg?.enabled) {
    return null;
  }

  const errorTextClass = theme.mode === 'dark' ? 'text-[#FCA5A5]' : 'text-[#B91C1C]';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    const nextErrors = validateQuoteForm(form);
    setErrors(nextErrors);
    if (hasQuoteErrors(nextErrors)) {
      return;
    }

    setSubmitting(true);
    const result = await submitQuoteRequest(form, cfg.endpoint);
    setSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.errorMessage ?? `Could not send request. Please call ${site.phone}.`);
      return;
    }

    setSubmitted(true);
  };

  const clearError = (field: keyof QuoteRequestInput) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section
      id="quote-form"
      data-testid="quote-form-section"
      className={`border-b border-[var(--site-border)] bg-[var(--site-surface)] ${theme.sectionPadding}`}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono-data text-xs font-semibold text-[var(--site-accent-text)]">
                Written Estimate · No Obligation
              </p>
              <h2
                className={`font-display mt-2 text-2xl font-bold text-[var(--site-ink)] sm:text-4xl ${theme.headingTracking} ${theme.headingTransform}`}
              >
                {cfg.heading || 'Request a free quote'}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--site-muted)]">
                {cfg.subtext ||
                  `Share your postcode and what you need done. ${site.businessName} will reply promptly with a clear price.`}
              </p>

              <div className="mt-6 space-y-2.5 border-t border-[var(--site-border)] pt-5 text-sm text-[var(--site-muted)]">
                <p className="flex items-center gap-2 text-[var(--site-ink)] font-medium">
                  <ShieldCheck
                    className="h-4 w-4 shrink-0 text-[var(--site-accent-text)]"
                    aria-hidden="true"
                  />
                  <span>Clear itemised pricing before any booking is confirmed</span>
                </p>
                <p>
                  Prefer to speak directly? Call{' '}
                  <span className="font-semibold tabular-nums text-[var(--site-ink)]">
                    {site.phone}
                  </span>
                  .
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.06}>
              <div
                className={`border border-[var(--site-border)] bg-[var(--site-bg)] p-6 sm:p-8 ${theme.cardRadius}`}
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="quote-success"
                      role="status"
                      aria-live="polite"
                      data-testid="quote-form-success"
                      initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReduced ? undefined : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="space-y-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2
                          className="h-6 w-6 shrink-0 text-[var(--site-accent-text)]"
                          aria-hidden="true"
                        />
                        <h3 className="font-display text-xl font-bold text-[var(--site-ink)]">
                          Quote request received.
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-[var(--site-muted)]">
                        Thanks,{' '}
                        <span className="font-semibold text-[var(--site-ink)]">{form.name}</span>. We
                        have noted your request for{' '}
                        <span className="font-semibold text-[var(--site-ink)]">
                          {form.serviceType}
                        </span>{' '}
                        in{' '}
                        <span className="font-semibold uppercase text-[var(--site-ink)]">
                          {form.postcode}
                        </span>{' '}
                        and will reply shortly on{' '}
                        <span className="font-semibold tabular-nums text-[var(--site-ink)]">
                          {form.phone}
                        </span>
                        .
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setForm(createInitialQuote(''));
                          setErrors({});
                        }}
                        className="text-sm font-semibold text-[var(--site-accent-text)] underline underline-offset-4"
                      >
                        Send another quote request
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="quote-form"
                      initial={prefersReduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={prefersReduced ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-4"
                    >
                      {/* Honeypot field */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
                      >
                        <label htmlFor="quote-hp">Leave blank</label>
                        <input
                          id="quote-hp"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={form.honeypot}
                          onChange={(e) => setForm((p) => ({ ...p, honeypot: e.target.value }))}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="quote-name"
                            className="block text-sm font-semibold text-[var(--site-ink)]"
                          >
                            Your name
                          </label>
                          <input
                            id="quote-name"
                            type="text"
                            required
                            autoComplete="name"
                            value={form.name}
                            onChange={(e) => {
                              setForm((p) => ({ ...p, name: e.target.value }));
                              clearError('name');
                            }}
                            aria-invalid={Boolean(errors.name)}
                            placeholder="e.g. Alex Morgan"
                            className={`mt-1.5 block w-full border border-[var(--site-border)] bg-[var(--site-surface)] px-3.5 py-2.5 text-sm text-[var(--site-ink)] placeholder:text-[var(--site-muted)] focus:border-[var(--site-accent)] focus:outline-none ${theme.buttonRadius}`}
                          />
                          {errors.name && (
                            <p role="alert" className={`mt-1 text-xs font-medium ${errorTextClass}`}>
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="quote-phone"
                            className="block text-sm font-semibold text-[var(--site-ink)]"
                          >
                            Phone number
                          </label>
                          <input
                            id="quote-phone"
                            type="tel"
                            required
                            autoComplete="tel"
                            value={form.phone}
                            onChange={(e) => {
                              setForm((p) => ({ ...p, phone: e.target.value }));
                              clearError('phone');
                            }}
                            aria-invalid={Boolean(errors.phone)}
                            placeholder="e.g. 07700 900123"
                            className={`mt-1.5 block w-full border border-[var(--site-border)] bg-[var(--site-surface)] px-3.5 py-2.5 text-sm text-[var(--site-ink)] placeholder:text-[var(--site-muted)] focus:border-[var(--site-accent)] focus:outline-none ${theme.buttonRadius}`}
                          />
                          {errors.phone && (
                            <p role="alert" className={`mt-1 text-xs font-medium ${errorTextClass}`}>
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="quote-postcode"
                            className="block text-sm font-semibold text-[var(--site-ink)]"
                          >
                            London postcode
                          </label>
                          <input
                            id="quote-postcode"
                            type="text"
                            required
                            autoComplete="postal-code"
                            value={form.postcode}
                            onChange={(e) => {
                              setForm((p) => ({ ...p, postcode: e.target.value }));
                              clearError('postcode');
                            }}
                            aria-invalid={Boolean(errors.postcode)}
                            placeholder="e.g. SW11 1AA"
                            className={`mt-1.5 block w-full border border-[var(--site-border)] bg-[var(--site-surface)] px-3.5 py-2.5 text-sm uppercase text-[var(--site-ink)] placeholder:normal-case placeholder:text-[var(--site-muted)] focus:border-[var(--site-accent)] focus:outline-none ${theme.buttonRadius}`}
                          />
                          {errors.postcode && (
                            <p role="alert" className={`mt-1 text-xs font-medium ${errorTextClass}`}>
                              {errors.postcode}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="quote-email"
                            className="block text-sm font-semibold text-[var(--site-ink)]"
                          >
                            Email{' '}
                            <span className="font-normal text-[var(--site-muted)]">(optional)</span>
                          </label>
                          <input
                            id="quote-email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={(e) => {
                              setForm((p) => ({ ...p, email: e.target.value }));
                              clearError('email');
                            }}
                            aria-invalid={Boolean(errors.email)}
                            placeholder="you@example.co.uk"
                            className={`mt-1.5 block w-full border border-[var(--site-border)] bg-[var(--site-surface)] px-3.5 py-2.5 text-sm text-[var(--site-ink)] placeholder:text-[var(--site-muted)] focus:border-[var(--site-accent)] focus:outline-none ${theme.buttonRadius}`}
                          />
                          {errors.email && (
                            <p role="alert" className={`mt-1 text-xs font-medium ${errorTextClass}`}>
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="quote-service"
                            className="block text-sm font-semibold text-[var(--site-ink)]"
                          >
                            Service needed
                          </label>
                          <select
                            id="quote-service"
                            required
                            value={form.serviceType}
                            onChange={(e) => {
                              setForm((p) => ({ ...p, serviceType: e.target.value }));
                              clearError('serviceType');
                            }}
                            aria-invalid={Boolean(errors.serviceType)}
                            className={`mt-1.5 block w-full border border-[var(--site-border)] bg-[var(--site-surface)] px-3.5 py-2.5 text-sm text-[var(--site-ink)] focus:border-[var(--site-accent)] focus:outline-none ${theme.buttonRadius}`}
                          >
                            <option value="">Choose a service...</option>
                            {serviceOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          {errors.serviceType && (
                            <p role="alert" className={`mt-1 text-xs font-medium ${errorTextClass}`}>
                              {errors.serviceType}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="quote-size"
                            className="block text-sm font-semibold text-[var(--site-ink)]"
                          >
                            Property size{' '}
                            <span className="font-normal text-[var(--site-muted)]">(optional)</span>
                          </label>
                          <select
                            id="quote-size"
                            value={form.propertySize}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, propertySize: e.target.value }))
                            }
                            className={`mt-1.5 block w-full border border-[var(--site-border)] bg-[var(--site-surface)] px-3.5 py-2.5 text-sm text-[var(--site-ink)] focus:border-[var(--site-accent)] focus:outline-none ${theme.buttonRadius}`}
                          >
                            <option value="">Select size...</option>
                            <option value="Studio / 1-bed flat">Studio / 1-bed flat</option>
                            <option value="2-bed flat / house">2-bed flat / house</option>
                            <option value="3-bed house">3-bed house</option>
                            <option value="4+ bed house / commercial">
                              4+ bed house / commercial
                            </option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="quote-notes"
                          className="block text-sm font-semibold text-[var(--site-ink)]"
                        >
                          Details or preferred date{' '}
                          <span className="font-normal text-[var(--site-muted)]">(optional)</span>
                        </label>
                        <textarea
                          id="quote-notes"
                          rows={3}
                          value={form.notes}
                          onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                          placeholder="Preferred day, oven or carpets included, parking notes..."
                          className={`mt-1.5 block w-full border border-[var(--site-border)] bg-[var(--site-surface)] px-3.5 py-2.5 text-sm text-[var(--site-ink)] placeholder:text-[var(--site-muted)] focus:border-[var(--site-accent)] focus:outline-none ${theme.buttonRadius}`}
                        />
                      </div>

                      {submitError && (
                        <p role="alert" className={`text-xs font-medium ${errorTextClass}`}>
                          {submitError}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className={`inline-flex w-full items-center justify-center bg-[var(--site-accent)] px-6 py-3 text-sm font-semibold text-[var(--site-accent-ink)] whitespace-nowrap transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto ${theme.buttonRadius}`}
                      >
                        {submitting ? 'Sending...' : 'Request my free quote'}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
