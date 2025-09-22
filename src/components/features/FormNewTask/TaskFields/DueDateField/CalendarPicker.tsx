import { DayPicker } from 'react-day-picker';
import type { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { NewTaskData } from '@/schema/schemaNewTask';
import { CalendarNavbar } from './CalendarNavbar';
import { normalizeDate, parseLocalDate } from '@/utils';

export const CalendarPicker = ({
  watch,
  setValue,
  closeAction,
}: {
  watch: UseFormWatch<NewTaskData>;
  setValue: UseFormSetValue<NewTaskData>;
  closeAction: (open: boolean) => void;
}) => {
  return (
    <div className="ml-1 mt-2 w-[266px] pt-2 bg-neutro-5 rounded-[8px] focus:ring-1 border-[1px] border-neutro-2">
      <DayPicker
        mode="single"
        selected={
          watch('dueDate') ? parseLocalDate(watch('dueDate')) : undefined
        }
        defaultMonth={
          watch('dueDate') ? parseLocalDate(watch('dueDate')) : new Date()
        }
        classNames={{
          month:
            'grid grid-rows-[30px_1fr] text-neutro-1 bg-neutro-5 rounded-lg px-4 mb-3',
          day: 'w-8 h-8',
          day_button:
            'rounded-[2px] hover:bg-primary-4 border-transparent text-white text-center flex w-full h-full justify-center items-center',
          selected: 'rounded-[2px] border-[2px] border-primary-4',
          day_today: 'border-primary-4',
        }}
        onSelect={(date) => {
          if (!date) {
            setValue('dueDate', '');
            closeAction(false);
            return;
          }
          const formatted = normalizeDate(date);
          setValue('dueDate', formatted, { shouldValidate: true });
          closeAction(false);
        }}
        components={{
          MonthCaption: CalendarNavbar,
          Footer: () => (
            <div className="w-full border-t border-neutro-2 p-0">
              <button
                className="w-full text-primary-4 text-nav-bar-m rounded-bl-[2px] rounded-br-[2px] hover:bg-primary-4 hover:text-neutro-1 py-2 active:scale-95 transition-all duration-200"
                onClick={() => {
                  const today = new Date();
                  const monthShort = today.toLocaleString('default', {
                    month: 'short',
                  });
                  const day = String(today.getDate()).padStart(2, '0');
                  const year = today.getFullYear();
                  const formatted = `${monthShort}. ${day} ${year}`;
                  setValue('dueDate', formatted);
                  closeAction(false);
                }}
              >
                Today
              </button>
            </div>
          ),
        }}
        hideNavigation={true}
        footer={true}
      />
    </div>
  );
};
