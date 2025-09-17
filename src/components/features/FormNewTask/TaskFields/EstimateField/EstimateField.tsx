import { PlusMinusIcon } from '@/assets/icons';
import { Popover } from '@/components/ui';
import type { NewTaskData } from '@/schema/schemaNewTask';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { EstimateOptions } from './EstimateOptions';

export const EstimateField = () => {
  const [isEstimatedPopoverClose, setIsEstimatedPopoverClose] = useState(false);

  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<NewTaskData>();

  return (
    <>
      <Popover
        open={isEstimatedPopoverClose}
        onOpenChange={setIsEstimatedPopoverClose}
        key={'estimate'}
        side="bottom"
        button={
          <div
            className="flex h-[32px] w-full justify-center items-center py-2 rounded-[4px] cursor-pointer"
            style={{
              backgroundColor: !watch('estimate')
                ? 'rgba(148, 151, 154, 0.1)'
                : '',
            }}
          >
            <PlusMinusIcon className="fill-neutro-1 flex" />
            <h2 className="text-neutro-1 ml-2 font-[500] text-nav-bar-m">
              {watch('estimate') ? `${watch('estimate')} Points` : 'Estimate'}
            </h2>
          </div>
        }
      >
        <EstimateOptions
          setValue={setValue}
          closeAction={setIsEstimatedPopoverClose}
        />
      </Popover>
      <div className="w-full">
        <span className="text-primary-4 text-nav-bar-s">
          {errors.estimate?.message}
        </span>
      </div>
    </>
  );
};
