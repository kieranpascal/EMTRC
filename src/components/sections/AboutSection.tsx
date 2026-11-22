import { ShieldCheck } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { getNicheLabels } from '../../utils/niche';

interface AboutSectionProps {
  isStandalonePage?: boolean;
}

export function AboutSection({ isStandalonePage = false }: AboutSectionProps) {
  const { site, theme } = useSite();
  const labels = getNicheLabels(site.niche);
  const HeadingTag = isStandalonePage ? 'h1' : 'h2';
  const badges = site.badges?.filter((b) => b.label.trim().length > 0) ?? [];

  return (
    <section
      id="about"
      className={`border-b border-[var(--site-border)] ${theme.sectionPadding}`}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <HeadingTag
              className={`font-display font-bold text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform} ${
                isStandalonePage
                  ? 'text-[clamp(2.15rem,4vw,3.35rem)] leading-[1.1]'
                  : 'text-2xl sm:text-3xl'
              }`}
            >
              {labels.aboutHeading}
            </HeadingTag>
            <p className="mt-2.5 text-sm text-[var(--site-muted)]">
              {site.businessName} · {site.borough}, London
            </p>
          </div>

          <div className="lg:col-span-8">
            <p className="max-w-2xl text-base leading-relaxed text-[var(--site-ink)] sm:text-lg">
              {site.about}
            </p>

            {badges.length > 0 && (
              <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-[var(--site-border)] pt-6 sm:grid-cols-3">
                {badges.map((badge) => (
                  <div key={`${badge.type}-${badge.label}`}>
                    <dt className="flex items-center gap-1.5 text-sm font-bold text-[var(--site-ink)]">
                      <ShieldCheck
                        className="h-4 w-4 shrink-0 text-[var(--site-accent-text)]"
                        aria-hidden="true"
                      />
                      <span>{badge.label}</span>
                    </dt>
                    {badge.registrationNumber && (
                      <dd className="mt-1 pl-5.5 text-xs tabular-nums text-[var(--site-muted)]">
                        {badge.registrationNumber}
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
