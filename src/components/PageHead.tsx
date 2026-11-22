import { useLayoutEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { buildLocalBusinessJsonLd, buildPageMeta } from '../utils/seo';

interface PageHeadProps {
  pageKey: 'home' | 'services' | 'gallery' | 'about' | 'contact';
}

function upsertMeta(selector: string, attrs: Record<string, string>, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, v);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function PageHead({ pageKey }: PageHeadProps) {
  const { site } = useSite();

  useLayoutEffect(() => {
    const meta = buildPageMeta(site, pageKey);
    document.title = meta.title;

    upsertMeta('meta[name="description"]', { name: 'description' }, meta.description);
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, meta.title);
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, meta.description);
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, site.businessName);
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, meta.title);
    upsertMeta(
      'meta[name="twitter:description"]',
      { name: 'twitter:description' },
      meta.description
    );

    // Demo mode noindex handling
    const existingRobots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (site.demoMode) {
      upsertMeta('meta[name="robots"]', { name: 'robots' }, 'noindex, nofollow');
    } else if (existingRobots) {
      existingRobots.remove();
    }

    // LocalBusiness JSON-LD (exact niche subtype)
    const ldId = 'local-business-jsonld';
    let script = document.getElementById(ldId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = ldId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(buildLocalBusinessJsonLd(site));
  }, [site, pageKey]);

  return null;
}
