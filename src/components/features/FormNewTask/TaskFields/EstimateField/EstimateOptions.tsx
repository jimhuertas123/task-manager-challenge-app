import { PointEstimate } from '@/__generated__/graphql';
import { PlusMinusIcon } from '@/assets/icons';
import { pointEstimateToNumber } from '@/components/features/FormNewTask/TaskFields/EstimateField/pointEstimate';
import type { NewTaskData } from '@/schema/schemaNewTask';
import type { UseFormSetValue } from 'react-hook-form';

export const EstimateOptions = ({
  setValue,
  closeAction,
}: {
  setValue: UseFormSetValue<NewTaskData>;
  closeAction: (open: boolean) => void;
}) => {
  return (
    <div className="text-neutro-1 ml-1 mt-2 w-[118px] py-2 bg-neutro-3 rounded-[8px] focus:ring-1 border-[1px] border-neutro-2">
      <span className="text-neutro-2 text-nav-bar-xl pl-3">Estimate</span>
      {Object.values(PointEstimate).map((point) => (
        <button
          key={point}
          className="flex w-[calc(100%-11px)] ml-1.5 px-1.5 gap-x-2 items-center py-1 rounded cursor-pointer text-nav-bar-m hover:bg-neutro-2"
          onClick={() => {
            setValue('estimate', pointEstimateToNumber(point), {
              shouldValidate: true,
            });
            closeAction(false);
          }}
        >
          <PlusMinusIcon className="fill-neutro-1 flex" />
          {pointEstimateToNumber(point)} Points
        </button>
      ))}
    </div>
  );
};
