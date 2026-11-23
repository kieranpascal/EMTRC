import { ShieldCheck } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { getNicheLabels } from '../../utils/niche';
import { SafeImage } from '../SafeImage';
import { ParallaxFrame, Reveal } from '../emtrc/Reveal';

interface AboutSectionProps {
  isStandalonePage?: boolean;
}

export function AboutSection({ isStandalonePage = false }: AboutSectionProps) {
  const { site, theme, blueprint } = useSite();
  const labels = getNicheLabels(site.niche);
  const HeadingTag = isStandalonePage ? 'h1' : 'h2';
  const badges = site.badges?.filter((b) => b.label.trim().length > 0) ?? [];
  const featurePhoto = blueprint.gallery[1] ?? blueprint.gallery[0] ?? blueprint.heroImage;
  const archetype = blueprint.archetype;

  // ── ARCHETYPE 1: SWISS GRID — Framed Architectural Split & Hairline Ledger ──
  if (archetype === 'swiss-grid') {
    return (
      <section
        id="about"
        className={`border-b border-[var(--site-border)] bg-[var(--site-bg)] ${theme.sectionPadding}`}
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 border border-[var(--site-border)] bg-[var(--site-surface)] lg:grid-cols-12">
            <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-7 lg:border-r lg:border-[var(--site-border)]">
              <Reveal>
                <p className="font-mono-data text-xs font-semibold uppercase tracking-wider text-[var(--site-accent-text)]">
                  Practice &amp; Standards · {site.borough}
                </p>
                <HeadingTag
                  className={`font-display mt-3 font-bold text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform} ${
                    isStandalonePage
                      ? 'text-[clamp(2.25rem,4.2vw,3.5rem)] leading-[1.06]'
                      : 'text-2xl sm:text-4xl leading-[1.08]'
                  }`}
                >
                  {labels.aboutHeading}
                </HeadingTag>

                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--site-ink)] sm:text-lg">
                  {site.about}
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--site-muted)]">
                  {blueprint.craftSummary}
                </p>
              </Reveal>

              {badges.length > 0 && (
                <dl className="mt-8 grid grid-cols-1 divide-y divide-[var(--site-border)] border-t border-[var(--site-border)] pt-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  {badges.map((badge) => (
                    <div
                      key={`${badge.type}-${badge.label}`}
                      className="py-3 first:pt-0 sm:px-4 sm:py-0 sm:first:pl-0"
                    >
                      <dt className="text-xs font-bold uppercase tracking-wider text-[var(--site-ink)]">
                        {badge.label}
                      </dt>
                      {badge.registrationNumber && (
                        <dd className="font-mono-data mt-1 text-xs tabular-nums text-[var(--site-accent-text)]">
                          {badge.registrationNumber}
                        </dd>
                      )}
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <div className="flex flex-col border-t border-[var(--site-border)] lg:col-span-5 lg:border-t-0">
              <div className="flex-1 overflow-hidden">
                <ParallaxFrame offset={14}>
                  <SafeImage
                    src={featurePhoto.url}
                    alt={featurePhoto.alt}
                    width={featurePhoto.width}
                    height={featurePhoto.height}
                    className="h-full min-h-[280px] w-full object-cover"
                  />
                </ParallaxFrame>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-[var(--site-border)] px-5 py-3.5 text-xs text-[var(--site-muted)]">
                <span className="font-semibold text-[var(--site-ink)]">{site.businessName}</span>
                <span className="font-mono-data">{site.borough}, London</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── ARCHETYPE 2: ATELIER MAGAZINE — Editorial Pull-Quote Lead & Studio Portrait ──
  if (archetype === 'atelier-magazine') {
    return (
      <section
        id="about"
        className={`border-b border-[var(--site-border)] bg-[var(--site-bg)] ${theme.sectionPadding}`}
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="font-mono-data text-xs font-semibold uppercase tracking-[0.14em] text-[var(--site-accent-text)]">
                  House Note · {site.borough}
                </p>
                <HeadingTag
                  className={`font-display mt-3 font-bold text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform} ${
                    isStandalonePage
                      ? 'text-[clamp(2.25rem,4.2vw,3.5rem)] leading-[1.06]'
                      : 'text-2xl sm:text-4xl leading-[1.08]'
                  }`}
                >
                  {labels.aboutHeading}
                </HeadingTag>

                <p className="font-display mt-6 border-l-2 border-[var(--site-accent)] pl-5 text-lg leading-relaxed text-[var(--site-ink)] sm:text-xl">
                  {site.about}
                </p>

                <p className="mt-5 text-sm leading-relaxed text-[var(--site-muted)]">
                  {blueprint.craftSummary}
                </p>

                {badges.length > 0 && (
                  <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--site-border)] pt-5 text-xs">
                    {badges.map((badge) => (
                      <li
                        key={`${badge.type}-${badge.label}`}
                        className="flex items-center gap-2 text-[var(--site-ink)]"
                      >
                        <ShieldCheck
                          className="h-4 w-4 shrink-0 text-[var(--site-accent-text)]"
                          aria-hidden="true"
                        />
                        <span className="font-semibold">{badge.label}</span>
                        {badge.registrationNumber && (
                          <span className="font-mono-data text-[var(--site-muted)]">
                            ({badge.registrationNumber})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={0.08}>
                <figure className="space-y-3">
                  <div
                    className={`overflow-hidden border border-[var(--site-border)] bg-[var(--site-surface)] ${theme.imageRadius}`}
                  >
                    <ParallaxFrame offset={16}>
                      <SafeImage
                        src={featurePhoto.url}
                        alt={featurePhoto.alt}
                        width={featurePhoto.width}
                        height={featurePhoto.height}
                        className="aspect-[5/4] w-full object-cover"
                      />
                    </ParallaxFrame>
                  </div>
                  <figcaption className="flex items-center justify-between gap-3 text-xs text-[var(--site-muted)]">
                    <span>{featurePhoto.caption || site.businessName}</span>
                    <span className="font-mono-data">{site.borough}, London</span>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── ARCHETYPE 3, 4 & 5: GALLERY MINIMAL, EDITORIAL CINEMA & ENGINEERING COMMAND ──
  const imageFirst = archetype === 'editorial-cinema' || archetype === 'engineering-command';

  return (
    <section
      id="about"
      className={`border-b border-[var(--site-border)] bg-[var(--site-bg)] ${theme.sectionPadding}`}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className={`lg:col-span-5 ${imageFirst ? 'lg:order-1' : 'lg:order-2'}`}>
            <Reveal>
              <figure
                className={`overflow-hidden border border-[var(--site-border)] bg-[var(--site-surface)] ${theme.imageRadius}`}
              >
                <ParallaxFrame offset={18}>
                  <SafeImage
                    src={featurePhoto.url}
                    alt={featurePhoto.alt}
                    width={featurePhoto.width}
                    height={featurePhoto.height}
                    className={`${
                      archetype === 'gallery-minimal' ? 'aspect-[4/5] sm:aspect-[5/4]' : 'aspect-[4/3]'
                    } w-full object-cover`}
                  />
                </ParallaxFrame>
                <figcaption className="flex items-center justify-between gap-3 border-t border-[var(--site-border)] px-4 py-3 text-xs text-[var(--site-muted)]">
                  <span>{site.businessName}</span>
                  <span className="font-mono-data">{site.borough}, London</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className={`lg:col-span-7 ${imageFirst ? 'lg:order-2' : 'lg:order-1'}`}>
            <Reveal delay={0.06}>
              <p className="font-mono-data text-xs font-semibold text-[var(--site-accent-text)]">
                Our Story · {site.borough}
              </p>
              <HeadingTag
                className={`font-display mt-2 font-bold text-[var(--site-ink)] ${theme.headingTracking} ${theme.headingTransform} ${
                  isStandalonePage
                    ? 'text-[clamp(2.25rem,4.2vw,3.5rem)] leading-[1.06]'
                    : 'text-2xl sm:text-4xl leading-[1.08]'
                }`}
              >
                {labels.aboutHeading}
              </HeadingTag>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--site-ink)] sm:text-lg">
                {site.about}
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--site-muted)]">
                {blueprint.craftSummary}
              </p>

              {badges.length > 0 && (
                <dl className="mt-8 grid grid-cols-1 divide-y divide-[var(--site-border)] border-y border-[var(--site-border)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  {badges.map((badge) => (
                    <div
                      key={`${badge.type}-${badge.label}`}
                      className="py-4 sm:px-5 sm:first:pl-0 sm:last:pr-0"
                    >
                      <dt className="flex items-center gap-2 text-sm font-bold text-[var(--site-ink)]">
                        <ShieldCheck
                          className="h-4 w-4 shrink-0 text-[var(--site-accent-text)]"
                          aria-hidden="true"
                        />
                        <span>{badge.label}</span>
                      </dt>
                      {badge.registrationNumber && (
                        <dd className="font-mono-data mt-1 pl-6 text-xs tabular-nums text-[var(--site-muted)]">
                          {badge.registrationNumber}
                        </dd>
                      )}
                    </div>
                  ))}
                </dl>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
