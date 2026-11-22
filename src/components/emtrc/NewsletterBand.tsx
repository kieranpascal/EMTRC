import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, CheckCircle2 } from 'lucide-react';
import { SITE } from '../../content/site';
import { useLanguage } from '../../context/LanguageContext';
import { postStaticForm, validateNewsletterForm } from '../../utils/marketingForms';

export function NewsletterBand() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const errs = validateNewsletterForm({ email, websiteHoneypot: honeypot });
    if (errs.email) {
      setError(errs.email);
      return;
    }

    setSubmitting(true);
    const res = await postStaticForm(SITE.endpoints.newsletterEndpoint, {
      email: email.trim(),
      websiteHoneypot: honeypot,
    });
    setSubmitting(false);

    if (!res.ok) {
      setError(res.error ?? 'Could not subscribe right now. Please try again.');
      return;
    }

    setJoined(true);
    setEmail('');
  };

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="border-t border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy)] text-[#F5F3EE]"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 items-center gap-10 rounded-2xl border border-[var(--emtrc-navy-border)] bg-[var(--emtrc-navy-surface)] p-6 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-wide text-[var(--emtrc-brass-light)]">
              {t.newsletter.eyebrow}
            </p>
            <h2
              id="newsletter-heading"
              className="mt-2 font-editorial text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              {t.newsletter.headline}
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm text-[#C7D0E4]">
              {SITE.newsletter.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emtrc-brass-light)]" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            {joined ? (
              <div
                data-testid="newsletter-success"
                className="rounded-xl border border-[#2D4073] bg-[#0E1833] p-6"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--emtrc-brass-light)]" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-white">Subscribed</p>
                    <p className="mt-1 text-sm text-[#C7D0E4]">{t.newsletter.successMessage}</p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate data-testid="newsletter-form">
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="newsletter-company-url">Company website</label>
                  <input
                    id="newsletter-company-url"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <label htmlFor="newsletter-email" className="block text-xs font-semibold text-[#D6DEF0]">
                  Business email address
                </label>
                <div className="mt-2 flex flex-col gap-2.5 sm:flex-row">
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.newsletter.placeholder}
                    className="min-w-0 flex-1 rounded-lg border border-[#2C3D6B] bg-[#0B132B] px-4 py-3 text-sm text-white placeholder:text-[#7E8BA8] focus:border-[#5370FF] focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#2347FF] px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#3A5BFF] disabled:opacity-60"
                  >
                    <span>{submitting ? 'Joining…' : t.newsletter.buttonLabel}</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                {error && <p className="mt-2 text-xs font-medium text-[#FCA5A5]">{error}</p>}
                <p className="mt-3 text-xs text-[#9BA7C2]">{t.newsletter.disclaimer}</p>
                <p className="mt-2 text-xs text-[#7E8BA8]">
                  Fortnightly · 2 min read · Unsubscribe anytime
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
