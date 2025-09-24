import type { NewTaskData } from '@/schema/schemaNewTask';
import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import { useFormContext } from 'react-hook-form';

export const TitleLabelField = () => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<NewTaskData>();

  const handleLabelClick = () => {
    flushSync(() => {
      setEditing(true);
    });
    inputRef.current?.focus();
  };

  return (
    <>
      {editing ? (
        <input
          role="textbox"
          className="text-nav-bar-xl flex w-full h-[30px] text-neutro-1 focus:outline-none focus:ring-0 focus:border-none"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Escape') {
              setEditing(false);
            }
          }}
          {...register('name')}
          ref={(e) => {
            register('name').ref(e);
            inputRef.current = e;
          }}
          onBlur={(e) => {
            register('name').onBlur(e);
            setTimeout(() => setEditing(false), 0);
          }}
        />
      ) : (
        <span
          role="button"
          tabIndex={1}
          aria-label="Task title"
          className={`text-neutro-1 text-nav-bar-xl flex w-full items-center h-[30px] ${!watch('name') ? 'text-neutro-2 font-normal' : ''}`}
          onClick={handleLabelClick}
        >
          {watch('name') || 'Task Title'}
        </span>
      )}
      <span
        id="title-error"
        aria-label="Title error message"
        className="text-primary-4 text-nav-bar-s text-start"
      >
        {errors.name?.message}
      </span>
    </>
  );
};
