import type { DayOfWeek, OpeningHoursEntry } from '../types/site';

export const DAYS_ORDER: readonly DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export interface OpenNowStatus {
  isOpen: boolean;
  label: string;
  detail: string;
  todayDay: DayOfWeek;
}

export function isClosedEntry(entry: OpeningHoursEntry | undefined): boolean {
  if (!entry) return true;
  if (entry.status === 'closed') return true;
  const open = (entry.open ?? '').trim().toLowerCase();
  const close = (entry.close ?? '').trim().toLowerCase();
  return !open || !close || open === 'closed' || close === 'closed';
}

export function parseTimeToMinutes(hhmm: string): number {
  const match = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!match) return -1;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return -1;
  return hours * 60 + minutes;
}

export function formatDisplayTime(hhmm: string): string {
  const mins = parseTimeToMinutes(hhmm);
  if (mins < 0) return hhmm;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function getLondonNowParts(now: Date = new Date()): {
  day: DayOfWeek;
  minutesSinceMidnight: number;
} {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const weekdayPart = parts.find((p) => p.type === 'weekday')?.value ?? 'Monday';
  const hourPart = Number(parts.find((p) => p.type === 'hour')?.value ?? '0');
  const minutePart = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');

  const normalizedHour = hourPart === 24 ? 0 : hourPart;
  const day = (DAYS_ORDER.find((d) => d.toLowerCase() === weekdayPart.toLowerCase()) ??
    'Monday') as DayOfWeek;

  return {
    day,
    minutesSinceMidnight: normalizedHour * 60 + minutePart,
  };
}

export function getOpenStatus(
  openingHours: readonly OpeningHoursEntry[],
  now: Date = new Date()
): OpenNowStatus {
  const { day: todayDay, minutesSinceMidnight } = getLondonNowParts(now);
  const todayIndex = DAYS_ORDER.indexOf(todayDay);
  const byDay = new Map<DayOfWeek, OpeningHoursEntry>();
  for (const entry of openingHours) {
    byDay.set(entry.day, entry);
  }

  const todayEntry = byDay.get(todayDay);

  if (todayEntry && !isClosedEntry(todayEntry)) {
    const openMins = parseTimeToMinutes(todayEntry.open!);
    const closeMins = parseTimeToMinutes(todayEntry.close!);
    if (openMins >= 0 && closeMins > openMins) {
      if (minutesSinceMidnight >= openMins && minutesSinceMidnight < closeMins) {
        return {
          isOpen: true,
          label: 'Open now',
          detail: `Closes at ${formatDisplayTime(todayEntry.close!)}`,
          todayDay,
        };
      }
      if (minutesSinceMidnight < openMins) {
        return {
          isOpen: false,
          label: 'Closed now',
          detail: `Opens today at ${formatDisplayTime(todayEntry.open!)}`,
          todayDay,
        };
      }
    }
  }

  // Find next open day over the next 7 days
  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDay = DAYS_ORDER[(todayIndex + offset) % 7];
    const nextEntry = byDay.get(nextDay);
    if (nextEntry && !isClosedEntry(nextEntry)) {
      const dayLabel = offset === 1 ? 'tomorrow' : nextDay.slice(0, 3);
      return {
        isOpen: false,
        label: 'Closed now',
        detail: `Opens ${dayLabel} at ${formatDisplayTime(nextEntry.open!)}`,
        todayDay,
      };
    }
  }

  return {
    isOpen: false,
    label: 'Closed',
    detail: 'Check phone for hours',
    todayDay,
  };
}

export function formatHoursRange(entry: OpeningHoursEntry): string {
  if (isClosedEntry(entry)) {
    return 'Closed';
  }
  return `${formatDisplayTime(entry.open!)} – ${formatDisplayTime(entry.close!)}`;
}
