export type BusinessNiche = 'barber' | 'salon' | 'trades' | 'cleaner' | 'cafe';

export type ThemeStyle = 'bold' | 'elegant' | 'minimal';

export type FontPreset = 'athletic' | 'editorial' | 'modern';

export type ThemeMode = 'dark' | 'light';

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export type OpeningHoursEntry =
  | {
      day: DayOfWeek;
      open: string;
      close: string;
      status?: 'open';
    }
  | {
      day: DayOfWeek;
      status: 'closed';
      open?: undefined;
      close?: undefined;
    };

export interface ServiceItem {
  name: string;
  description: string;
  price?: string;
  duration?: string;
  /** Optional category heading (especially useful for cafés and salons). */
  category?: string;
  /** Optional dietary or note labels (e.g. ["V", "GF"] for cafés). */
  dietary?: string[];
}

export interface GalleryImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface ReviewItem {
  author: string;
  text: string;
  rating: number;
  source: string;
}

export interface TradeBadge {
  type: 'gas-safe' | 'niceic' | 'napit' | 'trustmark' | 'insured' | 'custom';
  label: string;
  registrationNumber?: string;
}

export interface EmergencyCallout {
  headline: string;
  subtext: string;
  responseTime?: string;
}

export interface QuoteFormConfig {
  enabled: boolean;
  heading?: string;
  subtext?: string;
  /** Optional static form endpoint (e.g. Cloudflare Pages Function or Tally). Dry-run success when empty. */
  endpoint?: string;
  serviceTypes?: string[];
}

export interface SiteThemeConfig {
  primaryColour: string;
  accentColour: string;
  font: FontPreset;
  style: ThemeStyle;
  /** Optional override. Defaults to "dark" for barber and "light" for salon, trades, cleaner and cafe. */
  mode?: ThemeMode;
}

export interface SiteSeoConfig {
  title: string;
  description: string;
  /** Optional live canonical base URL (e.g. "https://kingslandblade.co.uk"). */
  siteUrl?: string;
  /** Optional Schema.org LocalBusiness subtype override (e.g. "Plumber", "Electrician"). */
  schemaType?: string;
}

export interface EnabledPagesConfig {
  home: boolean;
  services: boolean;
  gallery: boolean;
  about: boolean;
  contact: boolean;
}

export interface SiteConfig {
  $schema?: string;
  businessName: string;
  tagline: string;
  niche: BusinessNiche;
  borough: string;
  /** Optional street address. Section/fields hide automatically when empty or omitted. */
  address?: string;
  phone: string;
  /** Optional WhatsApp number in international digits or UK format (e.g. "+447700900123"). */
  whatsapp?: string;
  email?: string;
  bookingUrl?: string;
  bookingLabel?: string;
  instagramUrl?: string;
  /** Optional hero photograph. Falls back to gallery[0] if omitted. */
  heroImage?: GalleryImage;
  openingHours: OpeningHoursEntry[];
  services: ServiceItem[];
  gallery: GalleryImage[];
  /** Reviews section hides automatically if empty. */
  reviews: ReviewItem[];
  about: string;
  areasServed: string[];
  theme: SiteThemeConfig;
  seo: SiteSeoConfig;
  pages: EnabledPagesConfig;
  demoMode: boolean;
  /** Phone number shown in the emtrc demo banner when demoMode is true. */
  demoBannerPhone?: string;
  /** Optional emergency call-out banner (primarily for trades: plumbers & electricians). */
  emergencyCallout?: EmergencyCallout;
  /** Optional Gas Safe registration number (e.g. "649281"). Badge hides automatically unless filled in. */
  gasSafeNumber?: string;
  /** Optional NICEIC registration number (e.g. "042819"). Badge hides automatically unless filled in. */
  niceicNumber?: string;
  /** Optional accreditation badges (e.g. Gas Safe, NICEIC, Insured). Hides completely when empty/omitted. */
  badges?: TradeBadge[];
  /** Optional quote-request form (primarily for cleaners & trades). */
  quoteForm?: QuoteFormConfig;
  /** Internal template-showcase flag: set true only when previewing multiple starter examples. Omit for live client builds. */
  showTemplatePreview?: boolean;
}
