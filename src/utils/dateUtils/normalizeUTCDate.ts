//TODO: this must be the unique fuction to normalize the date in future
export function normalizeUTCDate(date: string) {
  const dateParsed = new Date(date);
  const year = dateParsed.getUTCFullYear();
  const monthShort = dateParsed.toLocaleString('default', {
    month: 'short',
    timeZone: 'UTC',
  });
  const day = String(dateParsed.getUTCDate()).padStart(2, '0');
  return `${monthShort}. ${day} ${year}`;
}
