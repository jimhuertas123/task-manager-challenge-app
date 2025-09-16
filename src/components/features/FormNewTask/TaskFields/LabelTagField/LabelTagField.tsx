import { LabelIcon } from '@/assets/icons';
import { Popover } from '@/components/ui';
import type { NewTaskData } from '@/schema/schemaNewTask';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { LabelTagOptions } from './LabelTagOptions';

export const LabelTagField = () => {
  const [isLabelPopoverClose, setIsLabelPopoverClose] = useState(false);
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<NewTaskData>();

  return (
    <>
      <Popover
        open={isLabelPopoverClose}
        onOpenChange={setIsLabelPopoverClose}
        key={'label'}
        side="bottom"
        button={
          <div
            className="flex h-[32px] w-full justify-center items-center py-2 rounded-[4px] cursor-pointer"
            style={{
              backgroundColor: 'rgba(148, 151, 154, 0.1)',
            }}
          >
            <LabelIcon className="fill-neutro-1" />
            <h2 className="text-neutro-1 ml-2 font-[500] text-nav-bar-m">
              {watch('tags') ? watch('tags')[0] : 'Label'}
            </h2>
          </div>
        }
      >
        <LabelTagOptions watch={watch} setValue={setValue} />
      </Popover>
      <div className="w-full">
        <span className="text-primary-4 text-nav-bar-s">
          {errors.tags?.message}
        </span>
      </div>
    </>
  );
};
