import { useSite } from '../context/SiteContext';
import { normalizeTelHref } from '../utils/seo';
import { EmtrcMark } from './emtrc/EmtrcLogo';

export function DemoBanner() {
  const { site } = useSite();

  if (!site.demoMode) {
    return null;
  }

  const emtrcPhone = site.demoBannerPhone?.trim() || '020 7946 0900';

  return (
    <div
      role="region"
      aria-label="Demo website notice"
      data-testid="demo-mode-banner"
      className="border-b border-white/15 bg-[#0A0B0E] px-4 py-2 text-center text-xs font-medium text-white"
    >
      <p className="mx-auto inline-flex max-w-[1200px] flex-wrap items-center justify-center gap-1.5 leading-snug">
        <EmtrcMark inverted className="h-4 w-4 shrink-0" />
        <span>
          This is a free demo website made for{' '}
          <span className="font-bold">{site.businessName}</span> by emtrc. Like it? Call{' '}
          <a
            href={normalizeTelHref(emtrcPhone)}
            className="font-bold underline underline-offset-2 hover:text-white/90"
          >
            {emtrcPhone}
          </a>
        </span>
      </p>
    </div>
  );
}
