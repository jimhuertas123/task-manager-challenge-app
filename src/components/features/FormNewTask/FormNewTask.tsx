import { EditableLabel } from './EditabaleLabel';
// import { useFormContext } from 'react-hook-form';
import { newTaskDataSchema, type NewTaskData } from '@/schema/schemaNewTask';
import { zodResolver } from '@hookform/resolvers/zod';
import { Popover } from '@/components/ui';

import {
  CalendarIcon,
  LabelIcon,
  PlusMinusIcon,
  ProfileIcon,
} from '@/assets/icons';
import { useForm } from 'react-hook-form';

// import { NavigationForm } from '@/components/ui/NavigationForm/NavigationForm';

export const FormNewTask = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NewTaskData>({
    mode: 'onSubmit',
    resolver: zodResolver(newTaskDataSchema),
  });

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors, isSubmitting },
  // } = useFormContext();

  const onSubmit = (data: NewTaskData) => {
    try {
      const validatedData = newTaskDataSchema.parse(data);
      console.log('Form submitted with valid data:', validatedData);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <div className="flex w-full focus:outline-none focus:ring-0">
      <form
        className="flex w-full flex-col"
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full h-[50px] flex flex-col">
          <EditableLabel register={register} value={watch('name') || ''} />
          <span className="text-primary-4 text-nav-bar-s text-start">
            {errors.name?.message}
          </span>
        </div>

        <div className="grid grid-cols-[auto_23%_23%_23%] w-full gap-x-4">
          <Popover
            side="bottom"
            button={
              <div
                className="flex h-full w-full bg-neutro-4 justify-center items-center py-2 rounded-[4px] cursor-pointer"
                style={{ backgroundColor: 'rgba(148, 151, 154, 0.1)' }}
              >
                <PlusMinusIcon className="fill-neutro-1 flex" />
                <h2 className="text-neutro-1 ml-2 font-[500] text-nav-bar-m">
                  {watch('estimate') || 'Estimate'}
                </h2>
              </div>
            }
          >
            <div className="ml-1 mt-2 w-[118px] p-4 bg-neutro-3 rounded-[4px] focus:ring-1 border-[1px] border-neutro-2">
              <select
                className="w-full bg-neutro-3 text-neutro-1 rounded-[4px] p-2 focus:outline-none"
                {...register('estimate')}
                defaultValue=""
              >
                <h2>xddd</h2>
                <option value="" disabled>
                  Select estimate
                </option>
                <option value="ZERO">Zero</option>
                <option value="ONE">One</option>
                <option value="TWO">Two</option>
                <option value="FOUR">Four</option>
                <option value="EIGHT">Eight</option>
              </select>
              <span className="text-primary-4 text-nav-bar-s text-start">
                {errors.estimate?.message}
              </span>
            </div>
          </Popover>
          <Popover
            side="bottom"
            button={
              <div
                className="flex h-full w-full bg-neutro-4 justify-center items-center py-2 rounded-[4px] cursor-pointer"
                style={{ backgroundColor: 'rgba(148, 151, 154, 0.1)' }}
              >
                <ProfileIcon className="fill-neutro-1" />
                <h2 className="text-neutro-1 ml-2 font-[500] text-nav-bar-m">
                  {watch('assigneeId') || 'Assignee'}
                </h2>
              </div>
            }
          >
            <div className="ml-1 mt-2 w-[118px] p-4 bg-neutro-3 rounded-[4px] focus:ring-1 border-[1px] border-neutro-2"></div>
          </Popover>
          <Popover
            side="bottom"
            button={
              <div
                className="flex h-full w-full bg-neutro-4 justify-center items-center py-2 rounded-[4px] cursor-pointer"
                style={{ backgroundColor: 'rgba(148, 151, 154, 0.1)' }}
              >
                <LabelIcon className="fill-neutro-1" />
                <h2 className="text-neutro-1 ml-2 font-[500] text-nav-bar-m">
                  {watch('tags') || 'Label'}
                </h2>
              </div>
            }
          >
            <div className="ml-1 mt-2 w-[118px] p-4 bg-neutro-3 rounded-[4px] focus:ring-1 border-[1px] border-neutro-2"></div>
          </Popover>
          <Popover
            side="bottom"
            button={
              <div
                className="flex h-full w-full bg-neutro-4 justify-center items-center py-2 rounded-[4px] cursor-pointer"
                style={{ backgroundColor: 'rgba(148, 151, 154, 0.1)' }}
              >
                <CalendarIcon className="fill-neutro-1" />
                <h2 className="text-neutro-1 ml-2 font-[500] text-nav-bar-m">
                  {watch('dueDate') || 'Due Date'}
                </h2>
              </div>
            }
          >
            <div className="ml-1 mt-2 w-[118px] p-4 bg-neutro-3 rounded-[4px] focus:ring-1 border-[1px] border-neutro-2"></div>
          </Popover>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="hover:bg-white/10 hover:bg-opacity-80 py-2 px-4 rounded text-neutro-1"
            type="button"
          >
            cancel
          </button>
          <button
            className="bg-primary-4 text-white py-2 px-4 rounded"
            type="submit"
            disabled={isSubmitting}
          >
            create
          </button>
        </div>
      </form>
    </div>
  );
};
