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
  const isToday = dueDateType.toDateString() === now.toDateString();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = dueDateType.toDateString() === yesterday.toDateString();

  const expired = dueDateType <= yesterday;

  let calculatedDueDate: string;
  if (isToday) {
    calculatedDueDate = 'TODAY';
  } else if (isYesterday) {
    calculatedDueDate = 'YESTERDAY';
  } else {
    const day = dueDateType.getDate();
    const month = dueDateType.toLocaleString('default', { month: 'short' });
    const year = dueDateType.getFullYear();
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
