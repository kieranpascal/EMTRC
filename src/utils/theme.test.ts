import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildThemeTokens,
  getContrastRatio,
  getReadableTextOnColor,
  resolveThemeMode,
} from './theme';

test('getReadableTextOnColor always chooses WCAG AA compliant ink on accent colours', () => {
  for (const hex of ['#D49B45', '#1D4ED8', '#8C4A3E', '#0E7490', '#111317', '#F59E0B']) {
    const ink = getReadableTextOnColor(hex);
    const ratio = getContrastRatio(hex, ink);
    assert.ok(ratio >= 4.5, `Expected contrast >= 4.5 for ${ink} on ${hex}, got ${ratio.toFixed(2)}`);
  }
});

test('resolveThemeMode defaults barber to dark and other niches to light when mode omitted', () => {
  const base = { primaryColour: '#111317', accentColour: '#D49B45', font: 'athletic' as const, style: 'bold' as const };
  assert.equal(resolveThemeMode('barber', base), 'dark');
  assert.equal(resolveThemeMode('salon', base), 'light');
  assert.equal(resolveThemeMode('trades', base), 'light');
  assert.equal(resolveThemeMode('cleaner', base), 'light');
  assert.equal(resolveThemeMode('cafe', base), 'light');
});

test('buildThemeTokens produces distinct visual tokens for bold, elegant and minimal styles', () => {
  const bold = buildThemeTokens('barber', {
    primaryColour: '#12141A',
    accentColour: '#D49B45',
    font: 'athletic',
    style: 'bold',
    mode: 'dark',
  });
  const elegant = buildThemeTokens('salon', {
    primaryColour: '#2C1E1B',
    accentColour: '#8C4A3E',
    font: 'editorial',
    style: 'elegant',
    mode: 'light',
  });
  const minimal = buildThemeTokens('cleaner', {
    primaryColour: '#0F4C5C',
    accentColour: '#0E7490',
    font: 'modern',
    style: 'minimal',
    mode: 'light',
  });

  assert.equal(bold.headingTransform, 'uppercase');
  assert.ok(bold.cssVars['--font-display'].includes('Oswald'));
  assert.ok(elegant.cssVars['--font-display'].includes('Playfair Display'));
  assert.equal(minimal.cardRadius, 'rounded-none');
  assert.ok(getContrastRatio(bold.cssVars['--site-ink'], bold.cssVars['--site-bg']) >= 10);
  assert.ok(getContrastRatio(elegant.cssVars['--site-ink'], elegant.cssVars['--site-bg']) >= 10);
  assert.ok(getContrastRatio(minimal.cssVars['--site-ink'], minimal.cssVars['--site-bg']) >= 10);
});
