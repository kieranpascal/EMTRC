import type { BusinessNiche, ServiceItem, SiteConfig, TradeBadge } from '../types/site';

export interface NavItem {
  key: 'home' | 'services' | 'gallery' | 'about' | 'contact';
  label: string;
  to: string;
}

export interface NicheCopyLabels {
  servicesNavLabel: string;
  servicesHeading: string;
  servicesSubheading: string;
  defaultBookingLabel: string;
  galleryHeading: string;
  aboutHeading: string;
  areasHeading: string;
  contactHeading: string;
}

const NICHE_LABELS: Record<BusinessNiche, NicheCopyLabels> = {
  barber: {
    servicesNavLabel: 'Services',
    servicesHeading: 'Cuts, fades & grooming',
    servicesSubheading: 'Clear prices with zero surprises. Walk-ins welcome or book your chair ahead.',
    defaultBookingLabel: 'Book a chair',
    galleryHeading: 'Inside the shop',
    aboutHeading: 'Our craft',
    areasHeading: 'Serving local neighbourhoods',
    contactHeading: 'Visit or get in touch',
  },
  salon: {
    servicesNavLabel: 'Treatments',
    servicesHeading: 'Hair & beauty treatments',
    servicesSubheading: 'Tailored cuts, colour and treatments with transparent pricing.',
    defaultBookingLabel: 'Book appointment',
    galleryHeading: 'The salon',
    aboutHeading: 'About the studio',
    areasHeading: 'Clients visit us from',
    contactHeading: 'Book or visit us',
  },
  trades: {
    servicesNavLabel: 'Services',
    servicesHeading: 'Services & call-out rates',
    servicesSubheading: 'Fixed upfront quotes, qualified local engineers and tidy workmanship.',
    defaultBookingLabel: 'Book an engineer',
    galleryHeading: 'Recent work',
    aboutHeading: 'Why local homeowners call us',
    areasHeading: 'London areas we cover',
    contactHeading: 'Call or message us',
  },
  cleaner: {
    servicesNavLabel: 'Services',
    servicesHeading: 'Cleaning services & rates',
    servicesSubheading: 'Vetted local cleaners, checklists included and straightforward pricing.',
    defaultBookingLabel: 'Book a clean',
    galleryHeading: 'Spotless results',
    aboutHeading: 'Our standards',
    areasHeading: 'Postcodes & areas we cover',
    contactHeading: 'Get in touch',
  },
  cafe: {
    servicesNavLabel: 'Menu',
    servicesHeading: 'Daily menu',
    servicesSubheading: 'Freshly baked each morning alongside house-roasted speciality coffee.',
    defaultBookingLabel: 'Order ahead',
    galleryHeading: 'Coffee, bakes & plates',
    aboutHeading: 'Our kitchen & roastery',
    areasHeading: 'Find us in the neighbourhood',
    contactHeading: 'Visit the café',
  },
};

export function getNicheLabels(niche: BusinessNiche): NicheCopyLabels {
  return NICHE_LABELS[niche] ?? NICHE_LABELS.barber;
}

export function isSinglePageMode(site: SiteConfig): boolean {
  const { services, gallery, about, contact } = site.pages;
  return !services && !gallery && !about && !contact;
}

export function getEnabledNavItems(site: SiteConfig): NavItem[] {
  const labels = getNicheLabels(site.niche);
  const singlePage = isSinglePageMode(site);

  if (singlePage) {
    const items: NavItem[] = [
      { key: 'services', label: labels.servicesNavLabel, to: '/#services' },
    ];
    if (site.gallery.length > 0) {
      items.push({ key: 'gallery', label: 'Gallery', to: '/#gallery' });
    }
    items.push({ key: 'about', label: 'About', to: '/#about' });
    items.push({ key: 'contact', label: 'Contact', to: '/#contact' });
    return items;
  }

  const items: NavItem[] = [];
  if (site.pages.home) {
    items.push({ key: 'home', label: 'Home', to: '/' });
  }
  if (site.pages.services) {
    items.push({ key: 'services', label: labels.servicesNavLabel, to: '/services' });
  }
  if (site.pages.gallery && site.gallery.length > 0) {
    items.push({ key: 'gallery', label: 'Gallery', to: '/gallery' });
  }
  if (site.pages.about) {
    items.push({ key: 'about', label: 'About', to: '/about' });
  }
  if (site.pages.contact) {
    items.push({ key: 'contact', label: 'Contact', to: '/contact' });
  }
  return items;
}

export interface ServiceCategoryGroup {
  category: string;
  items: ServiceItem[];
}

export function groupServicesByCategory(services: readonly ServiceItem[]): ServiceCategoryGroup[] {
  const hasCategories = services.some((s) => Boolean(s.category?.trim()));
  if (!hasCategories) {
    return [{ category: '', items: [...services] }];
  }

  const order: string[] = [];
  const map = new Map<string, ServiceItem[]>();
  for (const item of services) {
    const cat = item.category?.trim() || 'Other';
    if (!map.has(cat)) {
      order.push(cat);
      map.set(cat, []);
    }
    map.get(cat)!.push(item);
  }

  return order.map((category) => ({
    category,
    items: map.get(category)!,
  }));
}

export function resolveAccreditationBadges(
  site: Pick<SiteConfig, 'gasSafeNumber' | 'niceicNumber' | 'badges'>
): TradeBadge[] {
  const result: TradeBadge[] = [];
  const customBadges = (site.badges ?? []).filter((b) => b.label.trim().length > 0);
  const hasGasSafe = customBadges.some((b) => b.type === 'gas-safe');
  const hasNiceic = customBadges.some((b) => b.type === 'niceic');

  const gasSafe = site.gasSafeNumber?.trim();
  if (gasSafe && !hasGasSafe) {
    result.push({
      type: 'gas-safe',
      label: 'Gas Safe Registered',
      registrationNumber: gasSafe.toLowerCase().startsWith('no.') ? gasSafe : `No. ${gasSafe}`,
    });
  }

  const niceic = site.niceicNumber?.trim();
  if (niceic && !hasNiceic) {
    result.push({
      type: 'niceic',
      label: 'NICEIC Approved Contractor',
      registrationNumber: niceic.toLowerCase().startsWith('no.') ? niceic : `No. ${niceic}`,
    });
  }

  return [...result, ...customBadges];
}
