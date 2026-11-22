import { useEffect } from 'react';
import { SITE } from '../../content/site';

interface EmtrcHeadProps {
  title: string;
  description: string;
  includeHomeJsonLd?: boolean;
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

export function EmtrcHead({ title, description, includeHomeJsonLd = false }: EmtrcHeadProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta('meta[name="description"]', { name: 'description' }, description);
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, title);
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, description);

    // Ensure no leftover noindex tag when browsing marketing pages after viewing a demo
    const robots = document.head.querySelector('meta[name="robots"]');
    if (robots) {
      robots.remove();
    }

    const scriptId = 'emtrc-org-jsonld';
    const existing = document.getElementById(scriptId);
    if (includeHomeJsonLd) {
      const schema = {
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'ProfessionalService'],
        name: SITE.brand.name,
        legalName: 'World Finance Global Limited',
        url: SITE.brand.siteUrl,
        email: SITE.brand.email,
        description,
        areaServed: {
          '@type': 'City',
          name: 'London',
        },
        priceRange: '££',
        knowsAbout: [
          'Small business web design',
          'Managed web hosting',
          'Business email setup',
          'Local SEO for London businesses',
          'AI receptionist and missed-call text-back',
        ],
      };

      const el = existing ?? document.createElement('script');
      el.id = scriptId;
      el.setAttribute('type', 'application/ld+json');
      el.textContent = JSON.stringify(schema);
      if (!existing) {
        document.head.appendChild(el);
      }
    } else if (existing) {
      existing.remove();
    }
  }, [title, description, includeHomeJsonLd]);

  return null;
}
