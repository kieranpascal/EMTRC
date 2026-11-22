import test from 'node:test';
import assert from 'node:assert/strict';
import { hasQuoteErrors, submitQuoteRequest, validateQuoteForm } from './quoteForm';

test('validateQuoteForm catches missing fields and invalid UK postcode/phone', () => {
  const errors = validateQuoteForm({
    name: 'A',
    phone: '123',
    email: 'not-an-email',
    postcode: '12345',
    serviceType: '',
    propertySize: '',
    notes: '',
    honeypot: '',
  });
  assert.equal(hasQuoteErrors(errors), true);
  assert.ok(errors.name);
  assert.ok(errors.phone);
  assert.ok(errors.email);
  assert.ok(errors.postcode);
  assert.ok(errors.serviceType);
});

test('validateQuoteForm accepts valid UK quote submission', () => {
  const errors = validateQuoteForm({
    name: 'Sophie Lin',
    phone: '07700 900123',
    email: 'sophie@example.co.uk',
    postcode: 'SW11 1AA',
    serviceType: 'End of tenancy clean',
    propertySize: '2-bed flat / house',
    notes: '',
    honeypot: '',
  });
  assert.equal(hasQuoteErrors(errors), false);
});

test('submitQuoteRequest supports dry-run mode and drops honeypot spam silently', async () => {
  const valid = {
    name: 'Sophie Lin',
    phone: '07700 900123',
    email: '',
    postcode: 'SW11 1AA',
    serviceType: 'Deep clean',
    propertySize: '',
    notes: '',
    honeypot: '',
  };
  const dry = await submitQuoteRequest(valid, '');
  assert.equal(dry.ok, true);
  assert.equal(dry.mode, 'dry-run');

  const bot = await submitQuoteRequest({ ...valid, honeypot: 'http://spam.example' }, 'https://example.invalid');
  assert.equal(bot.ok, true);
  assert.equal(bot.mode, 'honeypot-dropped');
});
