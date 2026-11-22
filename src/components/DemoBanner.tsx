import { useSite } from '../context/SiteContext';
import { normalizeTelHref } from '../utils/seo';

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
      className="border-b border-[#2347FF]/30 bg-[#2347FF] px-4 py-2 text-center text-xs font-medium text-white"
    >
      <p className="mx-auto max-w-[1200px] leading-snug">
        This is a free demo website made for{' '}
        <span className="font-bold">{site.businessName}</span> by emtrc. Like it? Call{' '}
        <a
          href={normalizeTelHref(emtrcPhone)}
          className="font-bold underline underline-offset-2 hover:text-white/90"
        >
          {emtrcPhone}
        </a>
      </p>
    </div>
  );
}
