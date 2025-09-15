import type { NewTaskData } from '@/schema/schemaNewTask';
import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import type { useForm } from 'react-hook-form';

export const EditableLabel = ({
  register,
  value,
}: {
  register: ReturnType<typeof useForm<NewTaskData>>['register'];
  value: string;
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLabelClick = () => {
    flushSync(() => {
      setEditing(true);
    });
    inputRef.current?.focus();
  };

  return editing ? (
    <input
      className="text-nav-bar-l flex w-full h-[30px] text-neutro-1 focus:outline-none focus:ring-0 focus:border-none"
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
        setEditing(false);
      }}
    />
  ) : (
    <span
      className={`text-neutro-1 text-nav-bar-l flex w-full items-center h-[30px] ${!value ? 'text-neutro-2 font-semibold' : ''}`}
      onClick={handleLabelClick}
    >
      {value || 'Task Title'}
    </span>
  );
};
