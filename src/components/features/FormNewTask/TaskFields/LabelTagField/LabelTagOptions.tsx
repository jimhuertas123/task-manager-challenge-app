import { TaskTag } from '@/__generated__/graphql';
import type { NewTaskData } from '@/schema/schemaNewTask';
import type { UseFormSetValue, UseFormWatch } from 'react-hook-form';

export const LabelTagOptions = ({
  watch,
  setValue,
}: {
  watch: UseFormWatch<NewTaskData>;
  setValue: UseFormSetValue<NewTaskData>;
}) => {
  return (
    <div className="text-neutro-1 mt-2 w-[218px] py-2 bg-neutro-3 rounded-[8px] focus:ring-1 border-[1px] border-neutro-2">
      <span className="text-neutro-2 text-nav-bar-xl pl-3">Tag Title</span>
      <div className="text-neutro-2 text-nav-bar-m pl-3 flex flex-col gap-2">
        {Object.values(TaskTag).map((tag) => (
          <label
            data-cy={`tag-option-${tag}`}
            key={tag}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              value={tag}
              checked={
                Array.isArray(watch('tags')) && watch('tags').includes(tag)
              }
              onChange={(e) => {
                const currentTags = Array.isArray(watch('tags'))
                  ? watch('tags')
                  : [];
                if (e.target.checked) {
                  setValue('tags', [...currentTags, tag], {
                    shouldValidate: true,
                  });
                } else {
                  setValue(
                    'tags',
                    currentTags.filter((t) => t !== tag),
                    { shouldValidate: true }
                  );
                }
              }}
              className="accent-primary-4"
            />
            <span>{tag}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
