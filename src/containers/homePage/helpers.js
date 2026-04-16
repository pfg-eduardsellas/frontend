export const POLL_INTERVAL_MS = 3000;

export const DAYS = [
  { key: 'mon', label: 'Mon' },
  { key: 'tue', label: 'Tue' },
  { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' },
  { key: 'fri', label: 'Fri' },
  { key: 'sat', label: 'Sat' },
  { key: 'sun', label: 'Sun' },
];

export const DEFAULT_WEEK_SCHEDULE = Object.fromEntries(DAYS.map(({ key }) => [key, false]));

export function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatScheduleBadge(p) {
  if (!p.schedule_days || p.schedule_days.length === 0) return '';
  const dayLabels = DAYS
    .filter(({ key }) => p.schedule_days.includes(key))
    .map(({ label }) => label)
    .join(', ');
  const time = p.schedule_time ? ` at ${p.schedule_time}` : '';
  const repeat = p.repeat_weekly ? ' · Weekly' : '';
  return `${dayLabels}${time}${repeat}`;
}
