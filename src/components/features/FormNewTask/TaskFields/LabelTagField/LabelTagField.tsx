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
                className="absolute left-3 -top-3 w-full h-full rounded-[4px] z-0"
                style={{
                  backgroundColor: '#565a60',
                  boxShadow: '0 2px 8px 0 rgba(20, 133, 255, 0.08)',
                }}
              />
            )}
            {watch('tags') && watch('tags').length > 2 && (
              <div
                className="absolute left-2 -top-2 w-full h-full rounded-[4px] z-0"
                style={{
                  backgroundColor: '#44474d',
                  boxShadow: '0 2px 8px 0 rgba(20, 133, 255, 0.10)',
                }}
              />
            )}
            {watch('tags') && watch('tags').length > 1 && (
              <div
                className="absolute left-1 -top-1 w-full h-full rounded-[4px] z-0"
                style={{
                  background: '#3a3d42',
                  boxShadow: '0 1px 4px 0 rgba(20, 133, 255, 0.12)',
                }}
              />
            )}
            <div
              className="flex h-[32px] w-full justify-center items-center py-2 rounded-[4px] cursor-pointer relative z-10"
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
