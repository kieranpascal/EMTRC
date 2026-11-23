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
import { getDemoDesignProfile, type DemoDesignProfile } from '../utils/demoBlueprint';

export interface PreviewPresetOption {
  id: string;
  label: string;
  niche: string;
  style: string;
}

const EXAMPLE_MODULES = import.meta.glob('../../examples/*.json', {
  eager: true,
}) as Record<string, { default: SiteConfig }>;

function resolveExampleSite(presetId: string): SiteConfig | null {
  const mod = EXAMPLE_MODULES[`../../examples/${presetId}.json`];
  if (!mod?.default) return null;
  return {
    ...mod.default,
    showTemplatePreview: buildSiteConfig.showTemplatePreview,
  };
}

export const PREVIEW_PRESETS: readonly PreviewPresetOption[] = [
  // Barber shops (3 boroughs × 3 styles)
  { id: 'barber-bold-hackney', label: 'Barber · Bold Cinema — Hackney (5 pages)', niche: 'Barber Shop', style: 'Bold' },
  { id: 'barber-elegant-marylebone', label: 'Barber · Atelier Magazine — Marylebone (5 pages)', niche: 'Barber Shop', style: 'Elegant' },
  { id: 'barber-minimal-brixton', label: 'Barber · Swiss Grid — Brixton (1 page)', niche: 'Barber Shop', style: 'Minimal' },
  // Hair & beauty salons (3 boroughs × 3 styles)
  { id: 'salon-elegant-kensington', label: 'Salon · Atelier Magazine — South Kensington (5 pages)', niche: 'Hair & Beauty Salon', style: 'Elegant' },
  { id: 'salon-bold-islington', label: 'Salon · Bold Cinema — Islington (5 pages)', niche: 'Hair & Beauty Salon', style: 'Bold' },
  { id: 'salon-minimal-richmond', label: 'Salon · Quiet Gallery — Richmond (1 page)', niche: 'Hair & Beauty Salon', style: 'Minimal' },
  // Plumbers & electricians (3 boroughs × 3 styles)
  { id: 'trades-bold-greenwich', label: 'Plumber & Electrician · Command — Greenwich (Gas Safe + NICEIC)', niche: 'Plumber & Electrician', style: 'Bold' },
  { id: 'trades-elegant-camden', label: 'Electrician · Dark Atelier — Camden (NICEIC)', niche: 'Plumber & Electrician', style: 'Elegant' },
  { id: 'trades-minimal-ealing', label: 'Plumber · Quiet Gallery — Ealing (1 page)', niche: 'Plumber & Electrician', style: 'Minimal' },
  // Cleaners (3 boroughs × 3 styles)
  { id: 'cleaner-minimal-wandsworth', label: 'Cleaner · Swiss Grid — Wandsworth (Quote form)', niche: 'Cleaner', style: 'Minimal' },
  { id: 'cleaner-bold-tower-hamlets', label: 'Cleaner · Dark Command — Canary Wharf E14 (Quote form)', niche: 'Cleaner', style: 'Bold' },
  { id: 'cleaner-elegant-hampstead', label: 'Cleaner · Quiet Residence — Hampstead NW3 (Quote form)', niche: 'Cleaner', style: 'Elegant' },
  // Cafés (3 boroughs × 3 styles)
  { id: 'cafe-elegant-southwark', label: 'Café · Atelier Magazine — Peckham SE15 (Menu + Food)', niche: 'Café', style: 'Elegant' },
  { id: 'cafe-bold-shoreditch', label: 'Café · Bold Roastery — Shoreditch E2 (Menu + Brunch)', niche: 'Café', style: 'Bold' },
  { id: 'cafe-minimal-hammersmith', label: 'Café · Swiss Grid — Hammersmith W6 (1-page Menu)', niche: 'Café', style: 'Minimal' },
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
  blueprint: DemoDesignProfile;
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

export function SiteProvider({
  children,
  initialPresetId,
}: {
  children: ReactNode;
  initialPresetId?: string;
}) {
  const previewEnabled = Boolean(buildSiteConfig.showTemplatePreview);
  const resolvedStartPreset =
    (initialPresetId && PREVIEW_PRESETS.some((p) => p.id === initialPresetId)
      ? initialPresetId
      : null) ??
    getInitialPresetFromUrl() ??
    'barber-bold-hackney';

  const [activePresetId, setActivePresetId] = useState<string>(resolvedStartPreset);
  const [site, setSite] = useState<SiteConfig>(
    () => resolveExampleSite(resolvedStartPreset) ?? buildSiteConfig
  );

  const loadPresetById = (presetId: string) => {
    const resolved = resolveExampleSite(presetId);
    if (resolved) {
      setSite(resolved);
      setActivePresetId(presetId);
    }
  };

  useEffect(() => {
    const target =
      (initialPresetId && PREVIEW_PRESETS.some((p) => p.id === initialPresetId)
        ? initialPresetId
        : null) ?? getInitialPresetFromUrl();
    if (target && target !== activePresetId) {
      loadPresetById(target);
    }
  }, [initialPresetId, activePresetId]);

  const blueprint = useMemo(
    () => getDemoDesignProfile(activePresetId, site),
    [activePresetId, site]
  );

  const theme = useMemo<ResolvedThemeTokens>(() => {
    const base = buildThemeTokens(site.niche, site.theme);
    return {
      ...base,
      mode: blueprint.mode,
      cardRadius: blueprint.cardRadius,
      buttonRadius: blueprint.buttonRadius,
      imageRadius: blueprint.imageRadius,
      headingTracking: blueprint.headingTracking,
      headingTransform: blueprint.headingTransform === 'uppercase' ? 'uppercase' : '',
      cssVars: {
        ...base.cssVars,
        ...blueprint.cssVars,
      },
    };
  }, [site.niche, site.theme, blueprint]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(theme.cssVars)) {
      root.style.setProperty(key, value);
    }
    root.dataset.themeMode = theme.mode;
    root.dataset.themeStyle = theme.style;
    root.dataset.niche = site.niche;
    root.dataset.demoArchetype = blueprint.archetype;
    return () => {
      delete root.dataset.themeMode;
      delete root.dataset.themeStyle;
      delete root.dataset.niche;
      delete root.dataset.demoArchetype;
    };
  }, [theme, site.niche, blueprint.archetype]);

  const selectPreset = (presetId: string) => {
    void loadPresetById(presetId);
    if (typeof window !== 'undefined' && !initialPresetId) {
      const url = new URL(window.location.href);
      url.searchParams.set('preset', presetId);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const value = useMemo<SiteContextValue>(
    () => ({
      site,
      theme,
      blueprint,
      previewEnabled,
      activePresetId,
      selectPreset,
    }),
    [site, theme, blueprint, previewEnabled, activePresetId]
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
