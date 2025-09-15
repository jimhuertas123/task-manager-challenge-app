import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { FormNewTask } from '../FormNewTask';
import type { GetAllUsersQuery, Task } from '@/types/__generated__/graphql';
import { useFormContext } from 'react-hook-form';
import type { NewTaskData } from '@/schema/schemaNewTask';

// import { useForm } from 'react-hook-form';
// import { newTaskDataSchema } from '@/schema/schemaNewTask';
// import { zodResolver } from '@hookform/resolvers/zod';

export const ModalTask = ({
  usersData,
  task,
  isOpen,
  onClose,
}: {
  usersData: GetAllUsersQuery['users'] | undefined;
  task?: Task | null;
  isOpen: boolean;
  onClose: () => void;
} & React.HTMLAttributes<HTMLDialogElement>) => {
  //for reset the validation field messages
  const { reset } = useFormContext<NewTaskData>();
  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  return createPortal(
    <dialog
      open={isOpen}
      className="backdrop-blur-[20px] bg-black/5 w-full h-full fixed inset-0 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-neutro-3  w-[572px] relative max-w-4xl mx-4 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-5">
          <FormNewTask usersData={usersData ?? []} onClose={onClose} />
          {task?.name}
        </div>
      </div>
    </dialog>,
    document.getElementById('main-layout')!
  );
};
