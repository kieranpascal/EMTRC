import type { BusinessNiche, SiteConfig } from '../types/site';
import { isClosedEntry } from './hours';

const NICHE_SCHEMA_TYPE: Record<BusinessNiche, string> = {
  barber: 'BarberShop',
  salon: 'BeautySalon',
  trades: 'HomeAndConstructionBusiness',
  cleaner: 'HousekeepingService',
  cafe: 'CafeOrCoffeeShop',
};

export function resolveSchemaType(site: SiteConfig): string {
  if (site.seo.schemaType && site.seo.schemaType.trim().length > 0) {
    return site.seo.schemaType.trim();
  }
  return NICHE_SCHEMA_TYPE[site.niche] ?? 'LocalBusiness';
}

export function normalizeTelHref(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '');
  return `tel:${cleaned}`;
}

export function normalizeWhatsappHref(whatsapp: string, businessName: string): string {
  const digitsOnly = whatsapp.replace(/[^\d]/g, '');
  const intl = digitsOnly.startsWith('0') ? `44${digitsOnly.slice(1)}` : digitsOnly;
  const text = encodeURIComponent(`Hi ${businessName}, I found your website and have a quick question.`);
  return `https://wa.me/${intl}?text=${text}`;
}

export function buildMapsLink(site: SiteConfig): string {
  const query = site.address?.trim()
    ? `${site.businessName}, ${site.address.trim()}`
    : `${site.businessName}, ${site.borough}, London`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function buildPageMeta(
  site: SiteConfig,
  pageKey: 'home' | 'services' | 'gallery' | 'about' | 'contact'
): { title: string; description: string } {
  if (pageKey === 'home') {
    return {
      title: site.seo.title,
      description: site.seo.description,
    };
  }

  const servicesWord = site.niche === 'cafe' ? 'Menu' : 'Services';
  const labels: Record<Exclude<typeof pageKey, 'home'>, string> = {
    services: servicesWord,
    gallery: 'Gallery',
    about: 'About',
    contact: 'Contact',
  };

  return {
    title: `${labels[pageKey]} — ${site.businessName} (${site.borough})`,
    description: `${labels[pageKey]} for ${site.businessName} in ${site.borough}, London. ${site.tagline}`,
  };
}

export function buildLocalBusinessJsonLd(site: SiteConfig): Record<string, unknown> {
  const schemaType = resolveSchemaType(site);
  const openingHoursSpecification = site.openingHours
    .filter((entry) => !isClosedEntry(entry))
    .map((entry) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.open,
      closes: entry.close,
    }));

  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: site.businessName,
    description: site.seo.description || site.tagline,
    telephone: site.phone,
    areaServed: site.areasServed.map((area) => ({
      '@type': 'Place',
      name: area,
    })),
    openingHoursSpecification,
  };

  if (site.seo.siteUrl) {
    ld.url = site.seo.siteUrl;
  }

  if (site.email?.trim()) {
    ld.email = site.email.trim();
  }

  if (site.address?.trim()) {
    ld.address = {
      '@type': 'PostalAddress',
      streetAddress: site.address.trim(),
      addressLocality: site.borough,
      addressRegion: 'London',
      addressCountry: 'GB',
    };
  }

  const primaryPhoto = site.heroImage ?? site.gallery[0];
  if (primaryPhoto?.url) {
    ld.image = primaryPhoto.url;
  }

  if (site.instagramUrl?.trim()) {
    ld.sameAs = [site.instagramUrl.trim()];
  }

  if (site.reviews.length > 0) {
    const avg =
      site.reviews.reduce((sum, item) => sum + item.rating, 0) / site.reviews.length;
    ld.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: Number(avg.toFixed(1)),
      reviewCount: site.reviews.length,
    };
  }

  return ld;
}
