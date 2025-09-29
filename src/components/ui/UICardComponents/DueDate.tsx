import { AlarmIcon } from '@/assets/icons';
import { formatDueDate } from '@/utils/dateUtils/formatDuedate';

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
  const { calculatedDueDate, expired, soon } = formatDueDate(
    dueDate as string | number | Date
  );

  const colorBg = expired
    ? 'rgba(218, 88, 75, 0.1)'
    : soon
      ? 'rgba(229, 180, 84, 0.1)'
      : 'rgba(148, 151, 154, 0.1)';

  const colorText = expired ? '#da584b' : soon ? '#e5b454' : '#ffffff';

  return (
    <div
      data-cy="due-date-label"
      className={`rounded-[4px] ${showBgColor ? 'px-4' : 'px-0'} flex justify-center items-center mr-[2%]`}
      style={{
        backgroundColor: showBgColor ? colorBg : 'transparent',
        color: colorText,
      }}
    >
      {showIcon && (
        <AlarmIcon style={{ fill: colorText }} className={`inline-block `} />
      )}
      <span
        className={`${capitalize ? 'capitalize' : 'tracking-[0px] text-nav-bar-m'}  pl-[0.6rem]`}
      >
        {capitalize ? calculatedDueDate.toUpperCase() : calculatedDueDate}
      </span>
    </div>
  );
};
