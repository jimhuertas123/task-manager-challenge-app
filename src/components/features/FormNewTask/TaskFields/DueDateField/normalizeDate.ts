export function normalizeDate(date: Date) {
  const monthShort = date.toLocaleString('default', {
    month: 'short',
  });
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  const formatted = `${monthShort}. ${day} ${year}`;
  return formatted;
}
