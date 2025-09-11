import { AlarmIcon } from '@/assets/icons';

export const DueDate = ({ dueDate }: { dueDate: unknown }) => {
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
    calculatedDueDate = dueDateType.toDateString();
  }

  return (
    <div
      className={'rounded-[4px] px-4 flex justify-center items-center mr-[2%]'}
      style={{
        backgroundColor: expired
          ? 'rgba(218, 88, 75, 0.1)'
          : 'rgba(148, 151, 154, 0.1)',
        color: expired ? '#da584b' : '#ffffff',
      }}
    >
      <AlarmIcon
        className={`inline-block ${expired ? 'fill-primary-4' : 'fill-neutro-1'}`}
      />
      <span className="pl-[0.6rem]">{calculatedDueDate}</span>
    </div>
  );
};
