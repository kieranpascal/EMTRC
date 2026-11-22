import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePlanPricing, formatGbp } from './pricing';

test('calculatePlanPricing computes monthly and annual (2 months free) accurately', () => {
  const monthly = calculatePlanPricing(69, 'monthly', false);
  assert.equal(monthly.displayMonthly, 69);
  assert.equal(monthly.annualTotal, 690);
  assert.equal(monthly.annualSavings, 138);
  assert.equal(monthly.dailyEquivalent, '£2.27');
  assert.equal(monthly.vatSuffix, '');

  const annual = calculatePlanPricing(69, 'annual', true);
  assert.equal(annual.displayMonthly, 57.5);
  assert.equal(annual.annualTotal, 690);
  assert.equal(annual.vatSuffix, ' ex VAT');
});

test('formatGbp formats whole numbers without decimals and fractional amounts cleanly', () => {
  assert.equal(formatGbp(69), '£69');
  assert.equal(formatGbp(57.5), '£57.50');
});
