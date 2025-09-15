import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TwoLeftArrows,
  TwoRightArrows,
} from '@/assets/icons';
import { useDayPicker } from 'react-day-picker';

export const CalendarNavbar = () => {
  const { goToMonth, nextMonth, previousMonth, months } = useDayPicker();
  const currentMonth = months[0];

  const goToPrevYear = () =>
    goToMonth(
      new Date(
        currentMonth.date.getFullYear() - 1,
        currentMonth.date.getMonth()
      )
    );
  const goToNextYear = () =>
    goToMonth(
      new Date(
        currentMonth.date.getFullYear() + 1,
        currentMonth.date.getMonth()
      )
    );

  return (
    <div className="flex items-center justify-between px-2 py-1">
      <div className="flex gap-1">
        <button
          type="button"
          onClick={goToPrevYear}
          className="p-1 rounded hover:bg-neutro-2"
          aria-label="Previous year"
        >
          <TwoLeftArrows className="fill-neutro-1" />
        </button>
        <button
          type="button"
          onClick={() => previousMonth && goToMonth(previousMonth)}
          className="p-1 rounded hover:bg-neutro-2"
          aria-label="Previous month"
        >
          <ChevronLeftIcon className="fill-neutro-1" />
        </button>
      </div>
      <span className="font-[500] text-neutro-1 text-nav-bar-m">
        {currentMonth.date.toLocaleString('default', {
          month: 'short',
          year: 'numeric',
        })}
      </span>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => nextMonth && goToMonth(nextMonth)}
          className="p-1 rounded hover:bg-neutro-2"
          aria-label="Next month"
        >
          <ChevronRightIcon className="fill-neutro-1" />
        </button>
        <button
          type="button"
          onClick={goToNextYear}
          className="p-1 rounded hover:bg-neutro-2"
          aria-label="Next year"
        >
          <TwoRightArrows className="fill-neutro-1" />
        </button>
      </div>
    </div>
  );
};
