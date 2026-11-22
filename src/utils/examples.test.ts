import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import type { BusinessNiche, SiteConfig } from '../types/site';
import {
  getEnabledNavItems,
  groupServicesByCategory,
  resolveAccreditationBadges,
} from './niche';

const ROOT = process.cwd();
const EXAMPLE_FILES = [
  'public/site.json',
  'examples/barber-bold-hackney.json',
  'examples/barber-elegant-marylebone.json',
  'examples/barber-minimal-brixton.json',
  'examples/salon-elegant-kensington.json',
  'examples/salon-bold-islington.json',
  'examples/salon-minimal-richmond.json',
  'examples/trades-bold-greenwich.json',
  'examples/trades-elegant-camden.json',
  'examples/trades-minimal-ealing.json',
  'examples/cleaner-minimal-wandsworth.json',
  'examples/cleaner-bold-tower-hamlets.json',
  'examples/cleaner-elegant-hampstead.json',
  'examples/cafe-elegant-southwark.json',
  'examples/cafe-bold-shoreditch.json',
  'examples/cafe-minimal-hammersmith.json',
];

test('all 15 example site.json files and public/site.json satisfy required schema contract and local images', () => {
  for (const relPath of EXAMPLE_FILES) {
    const raw = fs.readFileSync(path.resolve(ROOT, relPath), 'utf8');
    const cfg = JSON.parse(raw) as SiteConfig;

    assert.ok(cfg.businessName.length > 0, `${relPath}: missing businessName`);
    assert.ok(cfg.tagline.length > 0, `${relPath}: missing tagline`);
    assert.ok(
      ['barber', 'salon', 'trades', 'cleaner', 'cafe'].includes(cfg.niche),
      `${relPath}: invalid niche`
    );
    assert.equal(cfg.openingHours.length, 7, `${relPath}: expected 7 openingHours rows`);
    assert.ok(cfg.services.length >= 1, `${relPath}: expected at least 1 service`);
    assert.ok(cfg.gallery.length >= 2, `${relPath}: expected at least 2 gallery images`);
    assert.ok(cfg.areasServed.length >= 1, `${relPath}: expected areasServed`);
    assert.ok(['athletic', 'editorial', 'modern'].includes(cfg.theme.font), `${relPath}: invalid font`);
    assert.ok(['bold', 'elegant', 'minimal'].includes(cfg.theme.style), `${relPath}: invalid style`);
    assert.equal(typeof cfg.demoMode, 'boolean', `${relPath}: demoMode must be boolean`);

    // Ensure every gallery image has explicit width/height/alt and uses local asset (no fragile external URLs)
    for (const img of [...cfg.gallery, ...(cfg.heroImage ? [cfg.heroImage] : [])]) {
      assert.ok(img.alt.trim().length > 0, `${relPath}: missing image alt`);
      assert.ok(img.width > 0 && img.height > 0, `${relPath}: missing explicit width/height`);
      assert.ok(img.url.startsWith('/src/assets/images/'), `${relPath}: image should be local asset`);
      const diskPath = path.resolve(ROOT, img.url.slice(1));
      assert.equal(fs.existsSync(diskPath), true, `${relPath}: missing local image file ${img.url}`);
    }

    // Ensure client-ready examples do not enable showTemplatePreview
    if (relPath.startsWith('examples/')) {
      assert.equal(
        Boolean(cfg.showTemplatePreview),
        false,
        `${relPath}: examples must not set showTemplatePreview`
      );
    }
  }
});

test('every niche has 3 examples covering bold, elegant and minimal styles across 3 distinct London boroughs', () => {
  const niches: BusinessNiche[] = ['barber', 'salon', 'trades', 'cleaner', 'cafe'];
  const examples = EXAMPLE_FILES.filter((f) => f.startsWith('examples/')).map((relPath) =>
    JSON.parse(fs.readFileSync(path.resolve(ROOT, relPath), 'utf8')) as SiteConfig
  );

  for (const niche of niches) {
    const forNiche = examples.filter((e) => e.niche === niche);
    assert.equal(forNiche.length, 3, `Expected 3 examples for niche ${niche}`);

    const styles = new Set(forNiche.map((e) => e.theme.style));
    assert.deepEqual(
      [...styles].sort(),
      ['bold', 'elegant', 'minimal'],
      `Niche ${niche} must include bold, elegant and minimal styles`
    );

    const boroughs = new Set(forNiche.map((e) => e.borough));
    assert.equal(boroughs.size, 3, `Niche ${niche} must span 3 distinct London boroughs`);
  }
});

test('resolveAccreditationBadges shows Gas Safe and NICEIC badges only when filled in and hides when empty', () => {
  const greenwich: SiteConfig = JSON.parse(
    fs.readFileSync(path.resolve(ROOT, 'examples/trades-bold-greenwich.json'), 'utf8')
  );
  const camden: SiteConfig = JSON.parse(
    fs.readFileSync(path.resolve(ROOT, 'examples/trades-elegant-camden.json'), 'utf8')
  );
  const ealing: SiteConfig = JSON.parse(
    fs.readFileSync(path.resolve(ROOT, 'examples/trades-minimal-ealing.json'), 'utf8')
  );

  const greenwichBadges = resolveAccreditationBadges(greenwich);
  assert.equal(greenwichBadges.length, 3);
  assert.equal(greenwichBadges[0].type, 'gas-safe');
  assert.equal(greenwichBadges[0].registrationNumber, 'No. 649281');
  assert.equal(greenwichBadges[1].type, 'niceic');
  assert.equal(greenwichBadges[1].registrationNumber, 'No. 042819');

  const camdenBadges = resolveAccreditationBadges(camden);
  assert.equal(camdenBadges.length, 1);
  assert.equal(camdenBadges[0].type, 'niceic');

  const ealingBadges = resolveAccreditationBadges(ealing);
  assert.equal(ealingBadges.length, 0);
});

test('1-page minimal examples generate anchor navigation while 5-page examples generate route navigation', () => {
  const onePage: SiteConfig = JSON.parse(
    fs.readFileSync(path.resolve(ROOT, 'examples/barber-minimal-brixton.json'), 'utf8')
  );
  const fivePage: SiteConfig = JSON.parse(
    fs.readFileSync(path.resolve(ROOT, 'examples/barber-bold-hackney.json'), 'utf8')
  );

  const onePageNav = getEnabledNavItems(onePage);
  assert.ok(onePageNav.every((i) => i.to.startsWith('/#')));

  const fivePageNav = getEnabledNavItems(fivePage);
  assert.equal(fivePageNav.length, 5);
  assert.equal(fivePageNav[1].to, '/services');
});

test('cafe examples group menu items by category cleanly', () => {
  const cafe: SiteConfig = JSON.parse(
    fs.readFileSync(path.resolve(ROOT, 'examples/cafe-elegant-southwark.json'), 'utf8')
  );
  const groups = groupServicesByCategory(cafe.services);
  assert.ok(groups.length >= 3);
  assert.equal(groups[0].category, 'Espresso & Filter');
});
