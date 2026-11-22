import test from 'node:test';
import assert from 'node:assert/strict';
import {
  postStaticForm,
  validateFreeDemoForm,
  validateNewsletterForm,
  validatePdfDownloadForm,
} from './marketingForms';

test('validateFreeDemoForm catches missing required fields and consent', () => {
  const errs = validateFreeDemoForm({
    businessName: '',
    trade: '',
    borough: '',
    profileUrl: 'not a link',
    name: 'A',
    email: 'bad-email',
    phone: '',
    notes: '',
    consentContact: false,
    consentMarketing: false,
    websiteHoneypot: '',
  });
  assert.ok(errs.businessName);
  assert.ok(errs.trade);
  assert.ok(errs.borough);
  assert.ok(errs.name);
  assert.ok(errs.email);
  assert.ok(errs.profileUrl);
  assert.ok(errs.consentContact);
});

test('validatePdfDownloadForm validates email, name and consent cleanly', () => {
  const invalid = validatePdfDownloadForm({
    guideId: 'website-checklist',
    name: '',
    email: 'nope',
    businessType: 'barber',
    consent: false,
    websiteHoneypot: '',
  });
  assert.ok(invalid.name);
  assert.ok(invalid.email);
  assert.ok(invalid.consent);

  const valid = validatePdfDownloadForm({
    guideId: 'website-checklist',
    name: 'Kieran',
    email: 'owner@hackneybarbers.co.uk',
    businessType: 'barber',
    consent: true,
    websiteHoneypot: '',
  });
  assert.deepEqual(valid, {});
});

test('validateNewsletterForm rejects invalid email and accepts valid email', () => {
  assert.ok(validateNewsletterForm({ email: 'bad', websiteHoneypot: '' }).email);
  assert.deepEqual(
    validateNewsletterForm({ email: 'hello@shop.co.uk', websiteHoneypot: '' }),
    {}
  );
});

test('postStaticForm drops honeypot spam and succeeds in dry-run when endpoint empty', async () => {
  const spam = await postStaticForm('https://example.com', {
    email: 'bot@spam.test',
    websiteHoneypot: 'http://spam',
  });
  assert.equal(spam.mode, 'spam-dropped');

  const dry = await postStaticForm('', {
    email: 'owner@shop.co.uk',
    websiteHoneypot: '',
  });
  assert.equal(dry.ok, true);
  assert.equal(dry.mode, 'dry-run');
});
