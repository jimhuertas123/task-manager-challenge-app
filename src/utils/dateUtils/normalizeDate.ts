export function normalizeDate(date: Date) {
  //check first the format Shortmonth. Day, Year

  if (!date) {
    return '';
  }

  const monthShort = date.toLocaleString('default', {
    month: 'short',
  });
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  if (!day || !monthShort || !year) {
    return '';
  }

  const formatted = `${monthShort}. ${day} ${year}`;
  return formatted;
}
