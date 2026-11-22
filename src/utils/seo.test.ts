import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import type { SiteConfig } from '../types/site';
import {
  buildLocalBusinessJsonLd,
  buildMapsLink,
  buildPageMeta,
  normalizeTelHref,
  normalizeWhatsappHref,
  resolveSchemaType,
} from './seo';

const baseBarber: SiteConfig = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'examples/barber-bold-hackney.json'), 'utf8')
);

test('resolveSchemaType maps each niche to its exact Schema.org LocalBusiness subtype', () => {
  assert.equal(resolveSchemaType({ ...baseBarber, niche: 'barber', seo: { title: 't', description: 'd' } }), 'BarberShop');
  assert.equal(resolveSchemaType({ ...baseBarber, niche: 'salon', seo: { title: 't', description: 'd' } }), 'BeautySalon');
  assert.equal(resolveSchemaType({ ...baseBarber, niche: 'cleaner', seo: { title: 't', description: 'd' } }), 'HousekeepingService');
  assert.equal(resolveSchemaType({ ...baseBarber, niche: 'cafe', seo: { title: 't', description: 'd' } }), 'CafeOrCoffeeShop');
  assert.equal(resolveSchemaType({ ...baseBarber, niche: 'trades', seo: { title: 't', description: 'd', schemaType: 'Plumber' } }), 'Plumber');
});

test('buildLocalBusinessJsonLd omits address and aggregateRating when empty', () => {
  const minimal: SiteConfig = {
    ...baseBarber,
    address: '',
    reviews: [],
    instagramUrl: '',
  };
  const ld = buildLocalBusinessJsonLd(minimal);
  assert.equal(ld['@type'], 'BarberShop');
  assert.equal('address' in ld, false);
  assert.equal('aggregateRating' in ld, false);
  assert.equal('sameAs' in ld, false);
});

test('buildLocalBusinessJsonLd includes aggregateRating and openingHoursSpecification when present', () => {
  const ld = buildLocalBusinessJsonLd(baseBarber);
  assert.equal(ld['@type'], 'BarberShop');
  assert.ok(Array.isArray(ld.openingHoursSpecification));
  assert.equal((ld.openingHoursSpecification as unknown[]).length, 7);
  assert.deepEqual(ld.aggregateRating, {
    '@type': 'AggregateRating',
    ratingValue: 5,
    reviewCount: 3,
  });
});

test('contact link normalizers format tel, WhatsApp and Google Maps links cleanly', () => {
  assert.equal(normalizeTelHref('020 7946 0821'), 'tel:02079460821');
  assert.ok(normalizeWhatsappHref('07700 900821', 'Test Shop').startsWith('https://wa.me/447700900821?text='));
  assert.ok(buildMapsLink(baseBarber).startsWith('https://www.google.com/maps/search/?api=1&query='));
  assert.equal(buildPageMeta({ ...baseBarber, niche: 'cafe' }, 'services').title.startsWith('Menu — '), true);
});
