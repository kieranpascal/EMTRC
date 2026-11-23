import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import type { SiteConfig } from '../types/site';
import { getDemoDesignProfile } from './demoBlueprint';
import { getContrastRatio } from './theme';

const EXAMPLES_DIR = path.join(process.cwd(), 'examples');

function loadAllExampleConfigs(): Array<{ id: string; site: SiteConfig }> {
  return fs
    .readdirSync(EXAMPLES_DIR)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => ({
      id: f.replace(/\.json$/, ''),
      site: JSON.parse(fs.readFileSync(path.join(EXAMPLES_DIR, f), 'utf-8')) as SiteConfig,
    }));
}

describe('15-demo distinct studio blueprint system', () => {
  it('gives the 3 demos inside every niche completely distinct layouts, fonts, headers and hero photography', () => {
    const all = loadAllExampleConfigs();
    assert.equal(all.length, 15, 'Expected 15 demo presets in examples/');

    const byNiche = new Map<string, ReturnType<typeof getDemoDesignProfile>[]>();
    for (const { id, site } of all) {
      const profile = getDemoDesignProfile(id, site);
      const list = byNiche.get(site.niche) ?? [];
      list.push(profile);
      byNiche.set(site.niche, list);
    }

    assert.equal(byNiche.size, 5, 'Expected 5 distinct niches');

    for (const [niche, profiles] of byNiche.entries()) {
      assert.equal(profiles.length, 3, `Niche ${niche} must have 3 demos`);

      const archetypes = new Set(profiles.map((p) => p.archetype));
      const headers = new Set(profiles.map((p) => p.headerStyle));
      const fonts = new Set(profiles.map((p) => p.fontPairId));
      const heroes = new Set(profiles.map((p) => p.heroImage.url));

      assert.equal(archetypes.size, 3, `Niche ${niche} must have 3 distinct layout archetypes`);
      assert.equal(headers.size, 3, `Niche ${niche} must have 3 distinct header styles`);
      assert.equal(fonts.size, 3, `Niche ${niche} must have 3 distinct font pairings`);
      assert.equal(heroes.size, 3, `Niche ${niche} must have 3 distinct hero photographs`);
    }
  });

  it('guarantees WCAG AA/AAA text contrast, on-disk photography and rich content depth on all 15 demos', () => {
    const all = loadAllExampleConfigs();

    for (const { id, site } of all) {
      const profile = getDemoDesignProfile(id, site);

      // Contrast checks
      const inkContrast = getContrastRatio(profile.cssVars['--site-ink'], profile.cssVars['--site-bg']);
      assert.ok(inkContrast >= 10, `${id} ink/bg contrast ${inkContrast.toFixed(2)} must be >= 10`);

      const accentBtnContrast = getContrastRatio(
        profile.cssVars['--site-accent-ink'],
        profile.cssVars['--site-accent']
      );
      assert.ok(
        accentBtnContrast >= 4.5,
        `${id} accent button contrast ${accentBtnContrast.toFixed(2)} must be >= 4.5`
      );

      // On-disk image checks
      assert.ok(profile.gallery.length >= 3, `${id} must have >= 3 curated gallery images`);
      for (const img of [profile.heroImage, ...profile.gallery]) {
        const diskPath = path.join(process.cwd(), img.url.replace(/^\//, ''));
        assert.ok(fs.existsSync(diskPath), `${id} references missing image on disk: ${img.url}`);
      }

      // Deep content checks
      assert.equal(profile.metrics.length, 4, `${id} must have 4 quantified proof metrics`);
      assert.equal(profile.processSteps.length, 3, `${id} must have 3 craft process steps`);
      assert.equal(profile.faqs.length, 4, `${id} must have 4 local trade/borough FAQs`);
    }
  });
});
