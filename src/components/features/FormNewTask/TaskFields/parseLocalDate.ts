export function parseLocalDate(dateString: string): Date | undefined {
  if (!dateString) return undefined;
  const match = dateString.match(/^(\w{3})\. (\d{2}) (\d{4})$/);
  if (!match) return undefined;
  const [monthShort, day, year] = match;
  const monthIndex = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May.',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ].indexOf(monthShort + '.');
  if (monthIndex === -1) return undefined;
  return new Date(Number(year), monthIndex, Number(day));
}
