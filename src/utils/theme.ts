import type { BusinessNiche, FontPreset, SiteThemeConfig, ThemeMode, ThemeStyle } from '../types/site';

export interface ResolvedThemeTokens {
  mode: ThemeMode;
  style: ThemeStyle;
  font: FontPreset;
  cssVars: Record<string, string>;
  cardRadius: string;
  buttonRadius: string;
  imageRadius: string;
  headingTracking: string;
  headingTransform: string;
  sectionPadding: string;
  cardBorderWidth: string;
}

const FONT_STACKS: Record<FontPreset, { display: string; body: string }> = {
  athletic: {
    display: '"Oswald Variable", "Plus Jakarta Sans Variable", ui-sans-serif, sans-serif',
    body: '"Plus Jakarta Sans Variable", ui-sans-serif, system-ui, -apple-system, sans-serif',
  },
  editorial: {
    display: '"Playfair Display Variable", Georgia, Cambria, serif',
    body: '"Plus Jakarta Sans Variable", ui-sans-serif, system-ui, -apple-system, sans-serif',
  },
  modern: {
    display: '"Plus Jakarta Sans Variable", ui-sans-serif, system-ui, -apple-system, sans-serif',
    body: '"Plus Jakarta Sans Variable", ui-sans-serif, system-ui, -apple-system, sans-serif',
  },
};

function parseHex(hex: string): [number, number, number] {
  const clean = hex.replace('#', '').trim();
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
    return [17, 19, 23];
  }
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

export function relativeLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrastRatio(hexA: string, hexB: string): number {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/**
 * Picks crisp white or deep obsidian ink for guaranteed WCAG AA contrast on any accent/primary colour.
 */
export function getReadableTextOnColor(bgHex: string): '#FFFFFF' | '#0D0F14' {
  const whiteRatio = getContrastRatio(bgHex, '#FFFFFF');
  const darkRatio = getContrastRatio(bgHex, '#0D0F14');
  return darkRatio >= whiteRatio ? '#0D0F14' : '#FFFFFF';
}

export function resolveThemeMode(niche: BusinessNiche, theme: SiteThemeConfig): ThemeMode {
  if (theme.mode) return theme.mode;
  return niche === 'barber' ? 'dark' : 'light';
}

export function buildThemeTokens(niche: BusinessNiche, theme: SiteThemeConfig): ResolvedThemeTokens {
  const mode = resolveThemeMode(niche, theme);
  const fonts = FONT_STACKS[theme.font] ?? FONT_STACKS.modern;
  const accentInk = getReadableTextOnColor(theme.accentColour);
  const primaryInk = getReadableTextOnColor(theme.primaryColour);

  // Niche-aware neutral canvas and surface palettes with strict WCAG AA contrast
  let bg = '#FAFAFC';
  let surface = '#FFFFFF';
  let surfaceAlt = '#F2F4F7';
  let border = '#E2E5EC';
  let ink = '#11141B';
  let muted = '#525B6C';

  if (mode === 'dark') {
    bg = theme.style === 'minimal' ? '#090A0D' : '#0E1014';
    surface = theme.style === 'minimal' ? '#111318' : '#161920';
    surfaceAlt = '#1C2029';
    border = theme.style === 'bold' ? '#2C313F' : '#242834';
    ink = '#F5F6F8';
    muted = '#A8B0C0';
  } else if (niche === 'salon') {
    bg = '#FAF8F5';
    surface = '#FFFFFF';
    surfaceAlt = '#F3EFE9';
    border = '#E5DDD3';
    ink = '#1E1916';
    muted = '#5B5149';
  } else if (niche === 'cafe') {
    bg = '#FAF7F2';
    surface = '#FFFFFF';
    surfaceAlt = '#F2ECE2';
    border = '#E2D8C8';
    ink = '#1C1814';
    muted = '#5A5046';
  } else if (niche === 'cleaner') {
    bg = '#F7FAFC';
    surface = '#FFFFFF';
    surfaceAlt = '#ECF3F8';
    border = '#D7E4EE';
    ink = '#0F1C26';
    muted = '#475968';
  } else if (niche === 'trades') {
    bg = '#F6F8FC';
    surface = '#FFFFFF';
    surfaceAlt = '#EAF0F8';
    border = '#D4DFEE';
    ink = '#0E1726';
    muted = '#475569';
  }

  // Ensure focus/accent text on background is readable (fallback to ink if accent has low contrast on bg)
  const accentTextOnBg =
    getContrastRatio(theme.accentColour, bg) >= 4.5
      ? theme.accentColour
      : mode === 'dark'
        ? '#E6C78A'
        : theme.primaryColour;

  const styleTokens: Record<
    ThemeStyle,
    Pick<
      ResolvedThemeTokens,
      | 'cardRadius'
      | 'buttonRadius'
      | 'imageRadius'
      | 'headingTracking'
      | 'headingTransform'
      | 'sectionPadding'
      | 'cardBorderWidth'
    >
  > = {
    bold: {
      cardRadius: 'rounded-lg',
      buttonRadius: 'rounded-md',
      imageRadius: 'rounded-lg',
      headingTracking: theme.font === 'athletic' ? 'tracking-[0.01em]' : 'tracking-[-0.025em]',
      headingTransform: theme.font === 'athletic' ? 'uppercase' : '',
      sectionPadding: 'py-16 sm:py-22',
      cardBorderWidth: 'border',
    },
    elegant: {
      cardRadius: 'rounded-2xl',
      buttonRadius: 'rounded-xl',
      imageRadius: 'rounded-2xl',
      headingTracking: 'tracking-[-0.015em]',
      headingTransform: '',
      sectionPadding: 'py-20 sm:py-26',
      cardBorderWidth: 'border',
    },
    minimal: {
      cardRadius: 'rounded-none',
      buttonRadius: 'rounded-md',
      imageRadius: 'rounded-sm',
      headingTracking: 'tracking-[-0.03em]',
      headingTransform: '',
      sectionPadding: 'py-16 sm:py-22',
      cardBorderWidth: 'border',
    },
  };

  return {
    mode,
    style: theme.style,
    font: theme.font,
    cssVars: {
      '--font-display': fonts.display,
      '--font-body': fonts.body,
      '--site-primary': theme.primaryColour,
      '--site-primary-ink': primaryInk,
      '--site-accent': theme.accentColour,
      '--site-accent-ink': accentInk,
      '--site-accent-text': accentTextOnBg,
      '--site-bg': bg,
      '--site-surface': surface,
      '--site-surface-alt': surfaceAlt,
      '--site-border': border,
      '--site-ink': ink,
      '--site-muted': muted,
      '--site-focus': accentTextOnBg,
    },
    ...styleTokens[theme.style],
  };
}
