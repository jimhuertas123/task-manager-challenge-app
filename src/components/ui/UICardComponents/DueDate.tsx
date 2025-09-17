import { AlarmIcon } from '@/assets/icons';

export const DueDate = ({
  dueDate,
  showIcon = true,
  showBgColor = true,
  capitalize = true,
}: {
  dueDate: unknown;
  showIcon?: boolean;
  showBgColor?: boolean;
  capitalize?: boolean;
}) => {
  const dueDateType = new Date(dueDate as string | number | Date);
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

  const isToday = isSameUTCDay(dueDateType, now);

  const yesterdayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1)
  );
  const isYesterday = isSameUTCDay(dueDateType, yesterdayUTC);

  const todayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  const expired = dueDateType.getTime() < todayUTC.getTime();

  let calculatedDueDate: string;
  if (isToday) {
    calculatedDueDate = 'TODAY';
  } else if (isYesterday) {
    calculatedDueDate = 'YESTERDAY';
  } else {
    // Always use UTC for display
    const day = dueDateType.getUTCDate();
    const month = dueDateType.toLocaleString('default', {
      month: 'short',
      timeZone: 'UTC',
    });
    const year = dueDateType.getUTCFullYear();
    calculatedDueDate = `${day} ${month}, ${year}`;
  }

  return (
    <div
      className={`rounded-[4px] ${showBgColor ? 'px-4' : 'px-0'} flex justify-center items-center mr-[2%]`}
      style={{
        backgroundColor: showBgColor
          ? expired
            ? 'rgba(218, 88, 75, 0.1)'
            : 'rgba(148, 151, 154, 0.1)'
          : 'transparent',
        color: expired ? '#da584b' : '#ffffff',
      }}
    >
      {showIcon && (
        <AlarmIcon
          className={`inline-block ${expired ? 'fill-primary-4' : 'fill-neutro-1'}`}
        />
      )}
      <span
        className={`${capitalize ? 'capitalize' : 'tracking-[0px] text-nav-bar-m'}  pl-[0.6rem]`}
      >
        {calculatedDueDate}
      </span>
    </div>
  );
};
