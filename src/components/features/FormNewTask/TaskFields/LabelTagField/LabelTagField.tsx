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
          <div className="relative">
            {watch('tags') && watch('tags').length > 3 && (
              <div
                className="absolute left-3 -top-4.5 w-full h-full rounded-[4px] z-0"
                style={{
                  backgroundColor: '#585e64',
                }}
              />
            )}
            {watch('tags') && watch('tags').length > 2 && (
              <div
                className="absolute left-2 -top-3 w-full h-full rounded-[4px] z-0"
                style={{
                  backgroundColor: '#474c51',
                }}
              />
            )}
            {watch('tags') && watch('tags').length > 1 && (
              <div
                className="absolute left-1 -top-1.5 w-full h-full rounded-[4px] z-0"
                style={{
                  background: '#2f3337',
                }}
              />
            )}
            <div
              className="flex h-[32px] w-full justify-center items-center py-1 rounded-[4px] cursor-pointer relative z-10"
              style={{
                backgroundColor: 'rgba(66, 70, 74, 1)',
              }}
            >
              <LabelIcon className="fill-neutro-1" />
              <h2 className="text-neutro-1 ml-2 font-[500] text-nav-bar-m">
                {watch('tags')
                  ? watch('tags').length > 0
                    ? watch('tags')[0]
                    : 'Label'
                  : 'Label'}
              </h2>
            </div>
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
