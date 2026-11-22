import { useState } from 'react';
import { Check, ChevronDown, Download } from 'lucide-react';
import { SITE, type PdfGuideItem } from '../../content/site';
import { EmtrcHead } from '../../components/emtrc/EmtrcHead';
import { EmtrcLayout } from '../../components/emtrc/EmtrcLayout';
import { PdfDownloadModal } from '../../components/emtrc/PdfDownloadModal';
import { Reveal } from '../../components/emtrc/Reveal';
import { SafeImage } from '../../components/SafeImage';

export function EmtrcResourcesPage() {
  const [selectedGuide, setSelectedGuide] = useState<PdfGuideItem | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <EmtrcLayout>
      <EmtrcHead
        title="Free PDF Guides & Newsletter — emtrc Resources for London Businesses"
        description="Download free plain-English PDF playbooks for London local businesses: Website Checklist, UK PSTN Jan 2027 Switch-Off Guide and Google Maps & AI Search Playbook."
      />

      {/* Hero */}
      <section className="border-b border-[var(--emtrc-border)]">
        <div className="mx-auto max-w-[1200px] px-5 pt-14 pb-16 sm:px-8 sm:pt-20 sm:pb-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-wide text-[var(--emtrc-brass)]">
                Free London small-business library
              </p>
              <h1 className="mt-3 font-editorial text-4xl font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-5xl">
                Plain-English PDF playbooks you can use this afternoon.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--emtrc-muted)]">
                No sales waffle, no US marketing jargon. Pick a guide below, enter your email, and the PDF downloads straight to your device.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-[var(--emtrc-border)]">
                <SafeImage
                  src="/src/assets/images/emtrc_editorial_guides_print_1795374293225.jpg"
                  alt="Printed linen-bound emtrc London small business playbooks"
                  width={1200}
                  height={900}
                  priority
                  className="h-[280px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free PDF Guides Library */}
      <section id="guides" className="border-b border-[var(--emtrc-border)] py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] space-y-8 px-5 sm:px-8">
          {SITE.pdfGuides.map((guide, index) => (
            <Reveal key={guide.id} delay={index * 0.05}>
              <article
                id={`guide-${guide.id}`}
                data-testid={`guide-card-${guide.id}`}
                className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)] lg:grid-cols-12"
              >
                <div className="lg:col-span-5">
                  <SafeImage
                    src={guide.coverImage}
                    alt={guide.coverAlt}
                    width={1200}
                    height={900}
                    className="h-64 w-full object-cover lg:h-full"
                  />
                </div>
                <div className="flex flex-col justify-between p-6 sm:p-9 lg:col-span-7">
                  <div>
                    <p className="text-xs font-semibold text-[var(--emtrc-brass)]">
                      {guide.category} · {guide.pages} · {guide.readTime}
                    </p>
                    <h2 className="mt-2 font-editorial text-2xl font-extrabold sm:text-3xl">
                      {guide.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--emtrc-muted)] sm:text-base">
                      {guide.summary}
                    </p>
                    <ul className="mt-5 space-y-2 text-sm">
                      {guide.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emtrc-accent)]" aria-hidden="true" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-[var(--emtrc-border)] pt-6">
                    <button
                      type="button"
                      data-testid={`download-guide-${guide.id}`}
                      onClick={() => setSelectedGuide(guide)}
                      className="inline-flex items-center gap-2 rounded-lg bg-[var(--emtrc-accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--emtrc-accent-hover)]"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      <span>Download free PDF</span>
                    </button>
                    <span className="text-xs text-[var(--emtrc-muted)]">
                      Instant PDF download · Email required
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Straight Answers FAQ Accordion */}
      <section id="faq" className="bg-[var(--emtrc-sand)] py-16 sm:py-24">
        <div className="mx-auto max-w-[900px] px-5 sm:px-8">
          <p className="text-xs font-semibold tracking-wide text-[var(--emtrc-brass)]">
            Straight answers
          </p>
          <h2 className="mt-2 font-editorial text-3xl font-extrabold sm:text-4xl">
            Every common question, answered plainly.
          </h2>

          <div className="mt-8 divide-y divide-[var(--emtrc-border)] rounded-2xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]">
            {SITE.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="p-5 sm:p-6">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="font-editorial text-base font-bold sm:text-lg">{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[var(--emtrc-muted)] transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm leading-relaxed text-[var(--emtrc-muted)]">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <PdfDownloadModal guide={selectedGuide} onClose={() => setSelectedGuide(null)} />
    </EmtrcLayout>
  );
}
