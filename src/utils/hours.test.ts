import test from 'node:test';
import assert from 'node:assert/strict';
import type { OpeningHoursEntry } from '../types/site';
import { formatHoursRange, getOpenStatus, isClosedEntry, parseTimeToMinutes } from './hours';

const SAMPLE_HOURS: OpeningHoursEntry[] = [
  { day: 'Monday', status: 'closed' },
  { day: 'Tuesday', open: '09:00', close: '19:30' },
  { day: 'Wednesday', open: '09:00', close: '19:30' },
  { day: 'Thursday', open: '09:00', close: '20:00' },
  { day: 'Friday', open: '09:00', close: '19:30' },
  { day: 'Saturday', open: '09:00', close: '18:00' },
  { day: 'Sunday', status: 'closed' },
];

test('parseTimeToMinutes handles valid and invalid HH:MM strings', () => {
  assert.equal(parseTimeToMinutes('09:30'), 570);
  assert.equal(parseTimeToMinutes('20:00'), 1200);
  assert.equal(parseTimeToMinutes('25:00'), -1);
  assert.equal(parseTimeToMinutes('closed'), -1);
});

test('getOpenStatus detects open during London business hours (GMT winter)', () => {
  // Tuesday 12:00 UTC == Tuesday 12:00 Europe/London in January
  const tuesdayMidday = new Date('2026-01-13T12:00:00Z');
  const status = getOpenStatus(SAMPLE_HOURS, tuesdayMidday);
  assert.equal(status.isOpen, true);
  assert.equal(status.label, 'Open now');
  assert.equal(status.detail, 'Closes at 19:30');
  assert.equal(status.todayDay, 'Tuesday');
});

test('getOpenStatus detects closed before opening and reports opening time today', () => {
  const tuesdayMorning = new Date('2026-01-13T07:30:00Z');
  const status = getOpenStatus(SAMPLE_HOURS, tuesdayMorning);
  assert.equal(status.isOpen, false);
  assert.equal(status.label, 'Closed now');
  assert.equal(status.detail, 'Opens today at 09:00');
});

test('getOpenStatus skips closed days (Sunday + Monday) to report Tuesday opening', () => {
  // Sunday 14:00 UTC -> Monday closed -> opens Tue at 09:00
  const sundayAfternoon = new Date('2026-01-18T14:00:00Z');
  const status = getOpenStatus(SAMPLE_HOURS, sundayAfternoon);
  assert.equal(status.isOpen, false);
  assert.equal(status.detail, 'Opens Tue at 09:00');
});

test('formatHoursRange and isClosedEntry handle closed days cleanly', () => {
  assert.equal(isClosedEntry(SAMPLE_HOURS[0]), true);
  assert.equal(formatHoursRange(SAMPLE_HOURS[0]), 'Closed');
  assert.equal(formatHoursRange(SAMPLE_HOURS[1]), '09:00 – 19:30');
});
