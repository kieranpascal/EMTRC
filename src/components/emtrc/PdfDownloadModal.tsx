import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Download, FileText, X } from 'lucide-react';
import { SITE, type PdfGuideItem } from '../../content/site';
import {
  postStaticForm,
  validatePdfDownloadForm,
  type PdfDownloadFormData,
} from '../../utils/marketingForms';

interface PdfDownloadModalProps {
  guide: PdfGuideItem | null;
  onClose: () => void;
}

export function PdfDownloadModal({ guide, onClose }: PdfDownloadModalProps) {
  const [form, setForm] = useState<PdfDownloadFormData>({
    guideId: guide?.id ?? '',
    name: '',
    email: '',
    businessType: '',
    consent: false,
    websiteHoneypot: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PdfDownloadFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (guide) {
      setForm({
        guideId: guide.id,
        name: '',
        email: '',
        businessType: '',
        consent: false,
        websiteHoneypot: '',
      });
      setErrors({});
      setSubmitError('');
      setUnlocked(false);
    }
  }, [guide]);

  useEffect(() => {
    if (!guide) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [guide, onClose]);

  if (!guide) return null;

  const triggerBrowserDownload = (item: PdfGuideItem) => {
    const a = document.createElement('a');
    a.href = item.pdfUrl;
    a.download = item.fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const validation = validatePdfDownloadForm(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    const result = await postStaticForm(SITE.endpoints.pdfDownloadEndpoint, form);
    setSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.error ?? 'Something went wrong. Please try again.');
      return;
    }

    setUnlocked(true);
    triggerBrowserDownload(guide);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B132B]/75 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        data-testid="pdf-download-modal"
        className="relative w-full max-w-lg rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] p-6 sm:p-8 text-[var(--emtrc-ink)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close download modal"
          className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--emtrc-border)] text-[var(--emtrc-muted)] transition-colors hover:text-[var(--emtrc-ink)]"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="pr-10">
          <p className="text-xs font-semibold text-[var(--emtrc-brass)]">
            {guide.category} · {guide.pages}
          </p>
          <h2 id="pdf-modal-title" className="mt-1.5 text-2xl font-bold leading-snug">
            {guide.title}
          </h2>
        </div>

        {unlocked ? (
          <div data-testid="pdf-download-success" className="mt-6 space-y-5">
            <div className="rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--emtrc-accent)]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold">Your PDF guide is ready.</p>
                  <p className="mt-1 text-sm text-[var(--emtrc-muted)]">
                    Your download should start automatically. You can also open or save it directly below.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={guide.pdfUrl}
                download={guide.fileName}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>Download PDF again</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-[var(--emtrc-border)] px-4 py-3 text-sm font-semibold text-[var(--emtrc-ink)] transition-colors hover:bg-[var(--emtrc-canvas)]"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
            <p className="text-sm leading-relaxed text-[var(--emtrc-muted)]">
              Enter your name and business email to unlock the instant PDF download.
            </p>

            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="pdf-website">Website</label>
              <input
                id="pdf-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.websiteHoneypot}
                onChange={(e) => setForm({ ...form, websiteHoneypot: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="pdf-name" className="block text-xs font-semibold">
                  Your name *
                </label>
                <input
                  id="pdf-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Alex Patel"
                  className="mt-1.5 w-full rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] px-3.5 py-2.5 text-sm text-[var(--emtrc-ink)]"
                />
                {errors.name && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="pdf-email" className="block text-xs font-semibold">
                  Email address *
                </label>
                <input
                  id="pdf-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@yourbusiness.co.uk"
                  className="mt-1.5 w-full rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] px-3.5 py-2.5 text-sm text-[var(--emtrc-ink)]"
                />
                {errors.email && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="pdf-trade" className="block text-xs font-semibold">
                Business type (optional)
              </label>
              <select
                id="pdf-trade"
                value={form.businessType}
                onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-[var(--emtrc-border)] bg-[var(--emtrc-canvas)] px-3.5 py-2.5 text-sm text-[var(--emtrc-ink)]"
              >
                <option value="">Select trade or sector</option>
                {SITE.tradesList.map((trade) => (
                  <option key={trade} value={trade}>
                    {trade}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-start gap-2.5 text-xs leading-relaxed text-[var(--emtrc-muted)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded border-[var(--emtrc-border)] accent-[var(--emtrc-accent)]"
                />
                <span>
                  Send me this PDF and occasional practical tips from emtrc. One-click unsubscribe anytime. Read our{' '}
                  <Link to="/privacy" onClick={onClose} className="underline text-[var(--emtrc-ink)]">
                    privacy policy
                  </Link>
                  .
                </span>
              </label>
              {errors.consent && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.consent}</p>}
            </div>

            {submitError && <p className="text-xs font-medium text-red-600 dark:text-red-400">{submitError}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)] disabled:opacity-60"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>{submitting ? 'Preparing PDF…' : 'Unlock & download free PDF'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
