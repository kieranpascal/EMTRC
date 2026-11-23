import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Info,
  Lock,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { SITE } from '../../content/site';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { EmtrcLogo } from '../../components/emtrc/EmtrcLogo';
import { KickerRule, Reveal } from '../../components/emtrc/Reveal';

/**
 * Static Client Portal sign-in screen (/portal).
 * Presents a polished login interface for emtrc clients without any backend API calls or stored credentials.
 */
export function EmtrcPortalPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setStatusMessage(
        'Please enter both your client email or username and password to continue.'
      );
      return;
    }
    setStatusMessage(
      `Client Portal sign-in is enabled once your live site launches. We could not match an active portal session for "${identifier.trim()}" yet — email ${SITE.brand.email} if you need an invite link resent.`
    );
  };

  return (
    <EmtrcLayout hideNewsletter>
      <EmtrcHead
        title="Client Portal Sign In — emtrc London"
        description="Sign in to the emtrc Client Portal to request website edits, inspect call and enquiry logs, review Google Maps summaries and manage billing."
      />

      <section className="hero-editorial-wash min-h-[calc(100vh-140px)] py-12 sm:py-20">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] shadow-xl lg:grid-cols-12">
            {/* Left Obsidian Studio Panel */}
            <div className="flex flex-col justify-between bg-[var(--emtrc-navy)] p-8 text-white sm:p-10 lg:col-span-5">
              <div>
                <EmtrcLogo inverted size="lg" />
                <div className="mt-8">
                  <KickerRule light>emtrc Client Portal</KickerRule>
                  <h1 className="mt-3 font-editorial text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-4xl">
                    Everything for your site, calls and domain in one place.
                  </h1>
                  <p className="mt-4 text-sm leading-relaxed text-[#A8B1C2]">
                    Active emtrc clients use the portal to dispatch 24-hour website edits, view missed-call text threads, approve Google review replies and download VAT-ready monthly invoices.
                  </p>
                </div>

                <ul className="mt-8 space-y-3 border-t border-white/10 pt-6 text-sm text-[#DCE2EC]">
                  {[
                    '24-hour studio website edit requests & photo uploads',
                    'Live tap-to-call, booking & missed-call SMS logs',
                    'Direct domain ownership records & SSL status',
                    'Monthly plain-English performance summaries',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6B5B]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 border-t border-white/10 pt-6 text-xs text-[#98A0B2]">
                <p className="inline-flex items-center gap-1.5 font-medium text-white">
                  <ShieldCheck className="h-4 w-4 text-[#FF6B5B]" aria-hidden="true" />
                  UK &amp; EU encrypted infrastructure
                </p>
                <p className="mt-2">
                  Need onboarding help? Email{' '}
                  <a
                    href={`mailto:${SITE.brand.email}`}
                    className="font-semibold text-white underline underline-offset-4 hover:text-[#FF6B5B]"
                  >
                    {SITE.brand.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Right Clean Login Form */}
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-7">
              <Reveal immediate>
                <div className="mx-auto w-full max-w-[420px]">
                  <p className="font-mono-data text-[11px] font-semibold tracking-wider text-[var(--emtrc-accent)]">
                    SECURE ACCOUNT ACCESS
                  </p>
                  <h2 className="mt-2 font-editorial text-2xl font-bold text-[var(--emtrc-ink)] sm:text-3xl">
                    Sign in to Client Portal
                  </h2>
                  <p className="mt-2 text-sm text-[var(--emtrc-muted)]">
                    Enter the business email or username provided in your emtrc launch pack.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    data-testid="portal-login-form"
                    className="mt-7 space-y-5"
                  >
                    <div>
                      <label
                        htmlFor="portal-username"
                        className="block text-xs font-semibold text-[var(--emtrc-ink)]"
                      >
                        Email or username
                      </label>
                      <div className="relative mt-1.5">
                        <Mail
                          className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--emtrc-muted)]"
                          aria-hidden="true"
                        />
                        <input
                          id="portal-username"
                          data-testid="portal-username-input"
                          name="username"
                          type="text"
                          autoComplete="username"
                          value={identifier}
                          onChange={(e) => {
                            setIdentifier(e.target.value);
                            if (statusMessage) setStatusMessage(null);
                          }}
                          placeholder="owner@yourbusiness.co.uk"
                          className="w-full rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] py-3 pr-4 pl-10 text-sm text-[var(--emtrc-ink)] placeholder:text-[var(--emtrc-muted)]/70 transition-colors focus:border-[var(--emtrc-ink)] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="portal-password"
                          className="block text-xs font-semibold text-[var(--emtrc-ink)]"
                        >
                          Password
                        </label>
                        <a
                          href={`mailto:${SITE.brand.email}?subject=Client%20Portal%20password%20reset`}
                          className="text-xs font-medium text-[var(--emtrc-accent)] hover:underline"
                        >
                          Reset password
                        </a>
                      </div>
                      <div className="relative mt-1.5">
                        <Lock
                          className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--emtrc-muted)]"
                          aria-hidden="true"
                        />
                        <input
                          id="portal-password"
                          data-testid="portal-password-input"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (statusMessage) setStatusMessage(null);
                          }}
                          placeholder="••••••••••••"
                          className="w-full rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] py-3 pr-11 pl-10 text-sm text-[var(--emtrc-ink)] placeholder:text-[var(--emtrc-muted)]/70 transition-colors focus:border-[var(--emtrc-ink)] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          className="absolute top-1/2 right-3 -translate-y-1/2 rounded p-1 text-[var(--emtrc-muted)] hover:text-[var(--emtrc-ink)]"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <Eye className="h-4 w-4" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </div>

                    <label className="flex items-center gap-2.5 text-xs text-[var(--emtrc-muted)] cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberDevice}
                        onChange={(e) => setRememberDevice(e.target.checked)}
                        className="h-4 w-4 rounded border-[var(--emtrc-border)] accent-[var(--emtrc-accent)]"
                      />
                      <span>Keep me signed in on this device for 30 days</span>
                    </label>

                    <button
                      type="submit"
                      data-testid="portal-submit-button"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                    >
                      <span>Sign in to Client Portal</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </form>

                  {statusMessage && (
                    <motion.div
                      role="status"
                      data-testid="portal-status-notice"
                      initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-5 flex items-start gap-3 rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] p-4 text-xs leading-relaxed text-[var(--emtrc-ink)]"
                    >
                      <Info
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emtrc-accent)]"
                        aria-hidden="true"
                      />
                      <div>
                        <p>{statusMessage}</p>
                        <Link
                          to="/free-demo"
                          className="mt-2 inline-flex items-center gap-1 font-semibold text-[var(--emtrc-accent)] hover:underline"
                        >
                          <span>Not a client yet? Request a free 48-hour demo</span>
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </motion.div>
                  )}

                  <div className="mt-8 border-t border-[var(--emtrc-border)] pt-6 text-xs text-[var(--emtrc-muted)]">
                    <p>
                      Want to see what is inside before signing up?{' '}
                      <Link
                        to="/app"
                        className="font-semibold text-[var(--emtrc-ink)] underline underline-offset-4 hover:text-[var(--emtrc-accent)]"
                      >
                        Tour the emtrc App →
                      </Link>
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </EmtrcLayout>
  );
}
