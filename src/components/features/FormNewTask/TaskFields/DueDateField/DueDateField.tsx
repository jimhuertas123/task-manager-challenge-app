import { CalendarIcon } from '@/assets/icons';
import { Popover } from '@/components/ui';
import type { NewTaskData } from '@/schema/schemaNewTask';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CalendarPicker } from './CalendarPicker';

export const DueDateField = () => {
  const [isDueDatePopoverClose, setIsDueDatePopoverClose] = useState(false);
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<NewTaskData>();

  const dueDateInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Popover
        open={isDueDatePopoverClose}
        onOpenChange={setIsDueDatePopoverClose}
        key={'dueDate'}
        side="bottom"
        button={
          <div
            data-cy="due-date-trigger"
            className="flex h-[32px] w-full justify-center items-center rounded-[4px] cursor-pointer"
            style={{
              backgroundColor: 'rgba(148, 151, 154, 0.1)',
            }}
            onClick={() => dueDateInputRef.current?.click()}
          >
            <CalendarIcon className="fill-neutro-1" />
            <h2 className="text-neutro-1 ml-2 font-[500] text-nav-bar-m">
              {watch('dueDate') || 'Due Date'}
            </h2>
          </div>
        }
      >
        <CalendarPicker
          closeAction={setIsDueDatePopoverClose}
          watch={watch}
          setValue={setValue}
        />
      </Popover>
      <div className="w-full">
        <span key={'dueDateError'} className="text-primary-4 text-nav-bar-s">
          {errors.dueDate?.message}
        </span>
      </div>
    </>
  );
};
