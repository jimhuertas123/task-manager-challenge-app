export function formatDueDate(date: string | number | Date): {
  calculatedDueDate: string;
  expired: boolean;
  soon: boolean;
} {
  const dueDateType = new Date(date as string | number | Date);
  const now = new Date();

  const getUTCDateParts = (date: Date) => [
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  ];

  const isSameUTCDay = (a: Date, b: Date) => {
    const [ay, am, ad] = getUTCDateParts(a);
    const [by, bm, bd] = getUTCDateParts(b);
    return ay === by && am === bm && ad === bd;
  };

  const yesterdayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1)
  );
  const todayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  const tomorrowUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
  );

  const isToday = isSameUTCDay(dueDateType, now);
  const isYesterday = isSameUTCDay(dueDateType, yesterdayUTC);
  const isTomorrow = isSameUTCDay(dueDateType, tomorrowUTC);

  //date is older than current day
  const expired = dueDateType.getTime() < todayUTC.getTime();
  //less than 2 days left
  const soon = isTomorrow || isToday;

  let calculatedDueDate: string;
  if (isToday) {
    calculatedDueDate = 'Today';
  } else if (isYesterday) {
    calculatedDueDate = 'Yesterday';
  } else {
    const day = dueDateType.getUTCDate();
    const month = dueDateType.toLocaleString('default', {
      month: 'short',
      timeZone: 'UTC',
    });
    const year = dueDateType.getUTCFullYear();
    calculatedDueDate = `${day} ${month}, ${year}`;
  }

  return { calculatedDueDate, expired, soon };
}
