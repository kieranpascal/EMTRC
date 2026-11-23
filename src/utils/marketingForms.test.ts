import test from 'node:test';
import assert from 'node:assert/strict';
import {
  postStaticForm,
  validateContactEnquiryForm,
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

test('validateContactEnquiryForm validates required enquiry fields and passes clean submissions', () => {
  const errs = validateContactEnquiryForm({
    name: 'J',
    businessName: '',
    email: 'invalid',
    phone: '',
    borough: '',
    serviceInterest: '',
    message: 'hi',
    consent: false,
    websiteHoneypot: '',
  });
  assert.ok(errs.name);
  assert.ok(errs.email);
  assert.ok(errs.serviceInterest);
  assert.ok(errs.message);
  assert.ok(errs.consent);

  const valid = validateContactEnquiryForm({
    name: 'Hannah Reid',
    businessName: 'Clapton Sourdough Co.',
    email: 'hannah@claptonsourdough.co.uk',
    phone: '020 7946 0812',
    borough: 'Hackney',
    serviceInterest: 'Personal AI Agents',
    message: 'Looking for a personal AI agent and Google Maps SEO package for our bakery.',
    consent: true,
    websiteHoneypot: '',
  });
  assert.deepEqual(valid, {});
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
