import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import buildSiteConfig from 'virtual:site-config';
import type { SiteConfig } from '../types/site';
import { buildThemeTokens, type ResolvedThemeTokens } from '../utils/theme';

export interface PreviewPresetOption {
  id: string;
  label: string;
  niche: string;
  style: string;
}

const EXAMPLE_LOADERS = import.meta.glob('../../examples/*.json') as Record<
  string,
  () => Promise<{ default: SiteConfig }>
>;

export const PREVIEW_PRESETS: readonly PreviewPresetOption[] = [
  // Barber shops (3 boroughs × 3 styles)
  { id: 'barber-bold-hackney', label: 'Barber · Bold — Hackney (5 pages)', niche: 'Barber Shop', style: 'Bold' },
  { id: 'barber-elegant-marylebone', label: 'Barber · Elegant — Marylebone (5 pages)', niche: 'Barber Shop', style: 'Elegant' },
  { id: 'barber-minimal-brixton', label: 'Barber · Minimal — Brixton (1 page)', niche: 'Barber Shop', style: 'Minimal' },
  // Hair & beauty salons (3 boroughs × 3 styles)
  { id: 'salon-elegant-kensington', label: 'Salon · Elegant — South Kensington (5 pages)', niche: 'Hair & Beauty Salon', style: 'Elegant' },
  { id: 'salon-bold-islington', label: 'Salon · Bold — Islington (5 pages)', niche: 'Hair & Beauty Salon', style: 'Bold' },
  { id: 'salon-minimal-richmond', label: 'Salon · Minimal — Richmond (1 page)', niche: 'Hair & Beauty Salon', style: 'Minimal' },
  // Plumbers & electricians (3 boroughs × 3 styles)
  { id: 'trades-bold-greenwich', label: 'Plumber & Electrician · Bold — Greenwich (Gas Safe + NICEIC)', niche: 'Plumber & Electrician', style: 'Bold' },
  { id: 'trades-elegant-camden', label: 'Electrician · Elegant — Camden (NICEIC only)', niche: 'Plumber & Electrician', style: 'Elegant' },
  { id: 'trades-minimal-ealing', label: 'Plumber · Minimal — Ealing (1 page, badges hidden)', niche: 'Plumber & Electrician', style: 'Minimal' },
  // Cleaners (3 boroughs × 3 styles)
  { id: 'cleaner-minimal-wandsworth', label: 'Cleaner · Minimal — Wandsworth (Quote form)', niche: 'Cleaner', style: 'Minimal' },
  { id: 'cleaner-bold-tower-hamlets', label: 'Cleaner · Bold — Canary Wharf E14 (Quote form)', niche: 'Cleaner', style: 'Bold' },
  { id: 'cleaner-elegant-hampstead', label: 'Cleaner · Elegant — Hampstead NW3 (Quote form)', niche: 'Cleaner', style: 'Elegant' },
  // Cafés (3 boroughs × 3 styles)
  { id: 'cafe-elegant-southwark', label: 'Café · Elegant — Peckham SE15 (Menu + Food)', niche: 'Café', style: 'Elegant' },
  { id: 'cafe-bold-shoreditch', label: 'Café · Bold Dark — Shoreditch E2 (Menu + Brunch)', niche: 'Café', style: 'Bold' },
  { id: 'cafe-minimal-hammersmith', label: 'Café · Minimal — Hammersmith W6 (1-page Menu)', niche: 'Café', style: 'Minimal' },
];

export const PREVIEW_PRESET_GROUPS: readonly { group: string; options: readonly PreviewPresetOption[] }[] = [
  'Barber Shop',
  'Hair & Beauty Salon',
  'Plumber & Electrician',
  'Cleaner',
  'Café',
].map((group) => ({
  group,
  options: PREVIEW_PRESETS.filter((p) => p.niche === group),
}));

interface SiteContextValue {
  site: SiteConfig;
  theme: ResolvedThemeTokens;
  previewEnabled: boolean;
  activePresetId: string;
  selectPreset: (presetId: string) => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

function getInitialPresetFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const preset = params.get('preset')?.trim();
  return preset && PREVIEW_PRESETS.some((p) => p.id === preset) ? preset : null;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const previewEnabled = Boolean(buildSiteConfig.showTemplatePreview);
  const [site, setSite] = useState<SiteConfig>(buildSiteConfig);
  const [activePresetId, setActivePresetId] = useState<string>(
    () => getInitialPresetFromUrl() ?? 'barber-bold-hackney'
  );

  const loadPresetById = async (presetId: string) => {
    const key = `../../examples/${presetId}.json`;
    const loader = EXAMPLE_LOADERS[key];
    if (!loader) return;
    try {
      const mod = await loader();
      if (mod?.default) {
        setSite({
          ...mod.default,
          showTemplatePreview: buildSiteConfig.showTemplatePreview,
        });
        setActivePresetId(presetId);
      }
    } catch {
      // Keep active config on load error
    }
  };

  useEffect(() => {
    const urlPreset = getInitialPresetFromUrl();
    if (urlPreset && urlPreset !== 'barber-bold-hackney') {
      void loadPresetById(urlPreset);
    }
  }, []);

  const theme = useMemo(() => buildThemeTokens(site.niche, site.theme), [site.niche, site.theme]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(theme.cssVars)) {
      root.style.setProperty(key, value);
    }
    root.dataset.themeMode = theme.mode;
    root.dataset.themeStyle = theme.style;
    root.dataset.niche = site.niche;
  }, [theme, site.niche]);

  const selectPreset = (presetId: string) => {
    void loadPresetById(presetId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('preset', presetId);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const value = useMemo<SiteContextValue>(
    () => ({
      site,
      theme,
      previewEnabled,
      activePresetId,
      selectPreset,
    }),
    [site, theme, previewEnabled, activePresetId]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) {
    throw new Error('useSite must be used inside SiteProvider');
  }
  return ctx;
}
