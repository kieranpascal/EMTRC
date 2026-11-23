import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_AGENT_DRAFTS,
  INITIAL_REVIEWS,
  INITIAL_SEO_KEYWORDS,
  INITIAL_SOCIAL_DRAFTS,
  calculatePendingApprovalsCount,
  calculatePriceGapPercent,
  createSimulatedMissedCall,
  filterSeoKeywords,
} from './ownerAppData';

test('calculatePriceGapPercent computes accurate signed percentage gap against London median', () => {
  assert.equal(calculatePriceGapPercent(95, 115), -17);
  assert.equal(calculatePriceGapPercent(120, 100), 20);
  assert.equal(calculatePriceGapPercent(50, 0), 0);
});

test('calculatePendingApprovalsCount totals pending agent drafts, review replies and social posts', () => {
  const count = calculatePendingApprovalsCount(
    INITIAL_AGENT_DRAFTS,
    INITIAL_REVIEWS,
    INITIAL_SOCIAL_DRAFTS
  );
  // 2 pending agent drafts + 2 awaiting reviews + 2 ready social drafts = 6
  assert.equal(count, 6);
});

test('filterSeoKeywords filters by London postcode or keyword phrase', () => {
  assert.equal(filterSeoKeywords(INITIAL_SEO_KEYWORDS, '').length, INITIAL_SEO_KEYWORDS.length);
  const se10 = filterSeoKeywords(INITIAL_SEO_KEYWORDS, 'SE10');
  assert.equal(se10.length, 1);
  assert.equal(se10[0].postcode, 'SE10');

  const barber = filterSeoKeywords(INITIAL_SEO_KEYWORDS, 'barber');
  assert.equal(barber.length, 1);
  assert.equal(barber[0].mapsRank, 1);
});

test('createSimulatedMissedCall cycles through London callers deterministically', () => {
  const first = createSimulatedMissedCall(0);
  const second = createSimulatedMissedCall(1);
  assert.equal(first.timestamp, 'Just now');
  assert.notEqual(first.caller, second.caller);
  assert.ok(first.valueGbp > 0);
});
