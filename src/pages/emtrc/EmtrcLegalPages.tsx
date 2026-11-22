import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { SITE } from '../../content/site';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';

function DraftBanner() {
  if (!SITE.flags.showLegalDraftBanner) return null;
  return (
    <div
      data-testid="legal-draft-banner"
      role="note"
      className="mb-8 flex items-start gap-3 rounded-xl border border-[var(--emtrc-brass)]/40 bg-[var(--emtrc-sand)] p-4 text-xs leading-relaxed text-[var(--emtrc-ink)]"
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emtrc-brass)]" aria-hidden="true" />
      <p>
        <strong className="font-bold">Draft, under review:</strong> {SITE.legal.draftBannerText}
      </p>
    </div>
  );
}

export function EmtrcPrivacyPage() {
  return (
    <EmtrcLayout hideNewsletter>
      <EmtrcHead
        title="Privacy Policy (UK GDPR) | emtrc"
        description="Privacy policy for World Finance Global Limited trading as emtrc — how we handle form submissions, public business outreach, data retention and your UK GDPR rights."
      />

      <article className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[820px] px-5 sm:px-8">
          <DraftBanner />

          <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
            Legal · Last updated {SITE.legal.lastUpdated}
          </p>
          <h1 className="mt-2 font-editorial text-4xl font-extrabold tracking-[-0.03em] text-[var(--emtrc-ink)] sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--emtrc-muted)]">
            This notice explains how <strong className="text-[var(--emtrc-ink)]">World Finance Global Limited trading as emtrc</strong>{' '}
            (&ldquo;emtrc&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses and protects personal data under
            the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
          </p>

          <div className="mt-10 space-y-9 border-t border-[var(--emtrc-border)] pt-9 text-sm leading-relaxed text-[var(--emtrc-muted)]">
            <section>
              <h2 className="font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                1. Data controller
              </h2>
              <p className="mt-2.5">
                The data controller responsible for your personal data is{' '}
                <strong className="text-[var(--emtrc-ink)]">World Finance Global Limited trading as emtrc</strong>,
                registered in England and Wales.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>
                  Contact email:{' '}
                  <a href={`mailto:${SITE.brand.email}`} className="font-semibold text-[var(--emtrc-accent)] underline">
                    {SITE.brand.email}
                  </a>
                </li>
                <li>Company number: {SITE.brand.companyNumber}</li>
                <li>Registered office: {SITE.brand.registeredOffice}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                2. What personal data we collect &amp; lawful basis
              </h2>
              <ul className="mt-3 list-disc space-y-2.5 pl-5">
                <li>
                  <strong className="text-[var(--emtrc-ink)]">Website forms &amp; enquiries (Contract / Consent):</strong>{' '}
                  When you request a free demo, download a free PDF playbook, subscribe to our fortnightly
                  newsletter or contact us, we collect the details you enter — such as your name, business name,
                  London borough, trade, email address, phone number (if supplied) and any notes you include.
                </li>
                <li>
                  <strong className="text-[var(--emtrc-ink)]">Public business data for B2B outreach (Legitimate Interests):</strong>{' '}
                  We occasionally contact London businesses that do not yet have a working website or have
                  outdated online listings, using publicly available business information sourced from Google Maps,
                  business directories and Companies House. We rely on legitimate interests for relevant B2B
                  introductions and honour opt-out requests immediately.
                </li>
                <li>
                  <strong className="text-[var(--emtrc-ink)]">Clients &amp; billing (Contract / Legal Obligation):</strong>{' '}
                  When you become a client, we store contact, domain registration, invoicing and support details
                  needed to deliver and maintain your website, email and AI tools.
                </li>
                <li>
                  <strong className="text-[var(--emtrc-ink)]">Cookies &amp; trackers:</strong>{' '}
                  This website sets no marketing cookies, no third-party advertising pixels and no Google Analytics
                  trackers. Theme preference (light or dark mode) is stored locally in your browser only.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                3. How long we keep your data
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-[var(--emtrc-ink)]">Prospective leads &amp; demo requests:</strong>{' '}
                  Deleted automatically after <strong className="text-[var(--emtrc-ink)]">90 days of no response</strong>,
                  unless you ask us to stay in touch or subscribe to our newsletter.
                </li>
                <li>
                  <strong className="text-[var(--emtrc-ink)]">Newsletter &amp; PDF guide subscribers:</strong>{' '}
                  Kept until you click unsubscribe or email us to be removed.
                </li>
                <li>
                  <strong className="text-[var(--emtrc-ink)]">Active clients &amp; accounting records:</strong>{' '}
                  Retained for the duration of our contract plus 6 years for UK tax and accounting records
                  required by HMRC.
                </li>
                <li>
                  <strong className="text-[var(--emtrc-ink)]">Suppression list:</strong>{' '}
                  If you opt out of B2B outreach, we retain your email address on a minimal do-not-contact list so
                  we do not message you again by mistake.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                4. Data processors we use
              </h2>
              <p className="mt-2.5">
                We never sell personal data. We share data only with trusted infrastructure providers needed to run
                our service, each bound by data processing agreements:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li><strong className="text-[var(--emtrc-ink)]">Cloudflare:</strong> static website hosting, DNS and security edge network.</li>
                <li><strong className="text-[var(--emtrc-ink)]">Supabase:</strong> client records and form submission storage where applicable.</li>
                <li><strong className="text-[var(--emtrc-ink)]">Brevo:</strong> transactional emails, PDF guide delivery and fortnightly newsletter mailings.</li>
                <li><strong className="text-[var(--emtrc-ink)]">Stripe:</strong> payment processing and recurring plan billing.</li>
                <li><strong className="text-[var(--emtrc-ink)]">Zoho:</strong> business email hosting and client support correspondence.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                5. Your rights under UK GDPR
              </h2>
              <p className="mt-2.5">
                You have the right to access the personal data we hold about you, ask us to correct inaccurate
                details, request erasure, restrict or object to processing (including B2B outreach under legitimate
                interests), withdraw consent at any time, and request data portability. To exercise any right, email{' '}
                <a href={`mailto:${SITE.brand.email}`} className="font-semibold text-[var(--emtrc-accent)] underline">
                  {SITE.brand.email}
                </a>{' '}
                and we will respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                6. Complaints &amp; the ICO
              </h2>
              <p className="mt-2.5">
                If you are unhappy with how we have handled your personal data, please contact us first so we can
                put it right. You also have the right to lodge a complaint with the UK supervisory authority, the{' '}
                <strong className="text-[var(--emtrc-ink)]">Information Commissioner’s Office (ICO)</strong>, at{' '}
                <a
                  href="https://ico.org.uk/make-a-complaint/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--emtrc-accent)] underline"
                >
                  ico.org.uk/make-a-complaint
                </a>{' '}
                or by calling 0303 123 1113.
              </p>
            </section>
          </div>
        </div>
      </article>
    </EmtrcLayout>
  );
}

export function EmtrcTermsPage() {
  return (
    <EmtrcLayout hideNewsletter>
      <EmtrcHead
        title="Terms of Service | emtrc"
        description="Plain-English terms of service for websites, domains, email and AI tools supplied by World Finance Global Limited trading as emtrc."
      />

      <article className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[820px] px-5 sm:px-8">
          <DraftBanner />

          <p className="text-xs font-bold tracking-wide text-[var(--emtrc-brass)]">
            Legal · Last updated {SITE.legal.lastUpdated}
          </p>
          <h1 className="mt-2 font-editorial text-4xl font-extrabold tracking-[-0.03em] text-[var(--emtrc-ink)] sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--emtrc-muted)]">
            These terms govern web design, hosting, domain registration, business email and AI front-office
            services provided by{' '}
            <strong className="text-[var(--emtrc-ink)]">World Finance Global Limited trading as emtrc</strong>{' '}
            to business clients in the United Kingdom.
          </p>

          <div className="mt-10 space-y-9 border-t border-[var(--emtrc-border)] pt-9 text-sm leading-relaxed text-[var(--emtrc-muted)]">
            <section>
              <h2 className="font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                1. Free demo websites
              </h2>
              <p className="mt-2.5">
                Free demos are provided with zero obligation to purchase. Demo sites remain hosted on a temporary
                emtrc preview address and may be removed if you decide not to proceed. No payment details are
                taken to create a demo.
              </p>
            </section>

            <section>
              <h2 className="font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                2. Plans, setup fees &amp; minimum term
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-[var(--emtrc-ink)]">Monthly plans (Starter, Business, Growth):</strong>{' '}
                  Subject to a one-off setup fee and a 12-month minimum term, rolling monthly thereafter on 30 days’
                  written notice. Annual prepayment includes 2 months free.
                </li>
                <li>
                  <strong className="text-[var(--emtrc-ink)]">One-off build + Care plan:</strong>{' '}
                  £595 one-off build fee plus £25/month Care Plan covering hosting, SSL, security updates and
                  backups. Additional edits are billed at £45/hour in 15-minute increments.
                </li>
                <li>
                  <strong className="text-[var(--emtrc-ink)]">30-day launch guarantee:</strong>{' '}
                  If you cancel within 30 calendar days of your site going live because you are not satisfied, we
                  refund your setup fee in full.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                3. Domain ownership &amp; portability
              </h2>
              <p className="mt-2.5">
                Any domain registered on your behalf is registered in your business name. Provided invoices due to
                date are settled, we will never withhold your domain and will supply IPS tag changes or EPP/auth
                transfer codes within 5 working days of a written request.
              </p>
            </section>

            <section>
              <h2 className="font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                4. Monthly edits &amp; client content
              </h2>
              <p className="mt-2.5">
                Monthly edit allowances (15 minutes on Starter, 30 minutes on Business, 60 minutes on Growth) cover
                routine text, price, opening-hour and photo updates and do not roll over between months. You
                confirm that any logos, photographs, certifications (such as Gas Safe or NICEIC numbers) and text
                you supply are accurate and licensed for use on your site.
              </p>
            </section>

            <section>
              <h2 className="font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                5. AI tools, telephony &amp; UK compliance
              </h2>
              <p className="mt-2.5">
                Where you enable Lead Catcher, Review Engine, AI Receptionist or Business Phone (Cloud VoIP),
                automated messages and voice assistants will clearly identify themselves where required by UK
                guidance. Review requests follow UK Digital Markets, Competition and Consumers (DMCC) Act rules —
                we never purchase, fabricate or gate reviews.
              </p>
            </section>

            <section>
              <h2 className="font-editorial text-xl font-bold text-[var(--emtrc-ink)]">
                6. Liability &amp; governing law
              </h2>
              <p className="mt-2.5">
                We use reputable global infrastructure (including Cloudflare) and aim for high availability, but we
                cannot guarantee uninterrupted third-party network access. Our total aggregate liability under any
                contract is capped at the fees paid by you in the preceding 12 months, except where liability cannot
                be excluded by English law. These terms are governed by the laws of England and Wales.
              </p>
              <p className="mt-4">
                Questions about these terms? Email{' '}
                <a href={`mailto:${SITE.brand.email}`} className="font-semibold text-[var(--emtrc-accent)] underline">
                  {SITE.brand.email}
                </a>{' '}
                or visit our{' '}
                <Link to="/contact" className="font-semibold text-[var(--emtrc-accent)] underline">
                  contact page
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </article>
    </EmtrcLayout>
  );
}
