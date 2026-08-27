export const POLL_INTERVAL_MS = 3000;

export const DAYS = [
  { key: 'mon', label: 'Mon', num: 1 },
  { key: 'tue', label: 'Tue', num: 2 },
  { key: 'wed', label: 'Wed', num: 3 },
  { key: 'thu', label: 'Thu', num: 4 },
  { key: 'fri', label: 'Fri', num: 5 },
  { key: 'sat', label: 'Sat', num: 6 },
  { key: 'sun', label: 'Sun', num: 7 },
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

function utcHourToLocal(h) {
  const d = new Date();
  d.setUTCHours(Number(h), 0, 0, 0);
  return d.getHours();
}

export function formatScheduleBadge(p) {
  if (!p.days_of_week) return '';
  const nums = p.days_of_week.split(',').map(Number).filter(Boolean);
  if (nums.length === 0) return '';
  const dayLabels = DAYS
    .filter(({ num }) => nums.includes(num))
    .map(({ label }) => label)
    .join(', ');
  const hours = p.hours
    ? ` · ${p.hours
      .split(',')
      .filter((h) => h !== '')
      .map((h) => `${String(utcHourToLocal(h)).padStart(2, '0')}:00`)
      .join(', ')}`
    : '';
  return `${dayLabels}${hours}`;
}
