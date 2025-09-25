import { DashboardIcon, ListIcon, AddIcon } from '@/assets/icons';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MobileModalTask } from '../features/ModalTask/MobileModalTask';
import { useEditTaskModal } from '@/hooks/useEditTaskModal';
import { MobileFormTask } from '../features/FormNewTask';

export const PhoneNavBar = () => {
  const [isMiddleActive, setIsMiddleActive] = useState(false);

  const { open, setOpen, task, setTask } = useEditTaskModal();

  return (
    <aside className="col-span-1">
      <div className="flex flex-col h-20 w-full">
        <div className="bg-neutro-4 grid grid-cols-[35%_1fr_31%] w-full h-full items-center justify-items-center text-nav-bar-s tracking-[1.5px] z-10">
          <NavLink
            to="/"
            onClick={() => {
              setIsMiddleActive(false);
              setOpen(false);
            }}
          >
            {({ isActive }) => {
              return (
                <div
                  className={`flex flex-col items-center hover:text-primary-4 ${
                    isActive && !isMiddleActive
                      ? 'text-primary-4'
                      : 'text-neutro-2'
                  }`}
                >
                  <DashboardIcon className="fill-current" />
                  <span>Dashboard</span>
                </div>
              );
            }}
          </NavLink>

          <div
            onClick={() => {
              setIsMiddleActive(true);
              setOpen(true);
              setTask(null);
            }}
            className={`flex flex-col items-center hover:text-primary-4 ${
              isMiddleActive ? 'text-primary-4' : 'text-neutro-2'
            }`}
          >
            <AddIcon className="fill-current" />
            <span>Add Project</span>
          </div>

          <NavLink
            to="/mytasks"
            onClick={() => {
              setIsMiddleActive(false);
              setOpen(false);
            }}
          >
            {({ isActive }) => {
              return (
                <div
                  className={`flex flex-col items-center hover:text-primary-4 ${
                    isActive && !isMiddleActive
                      ? 'text-primary-4'
                      : 'text-neutro-2'
                  }`}
                >
                  <ListIcon className="fill-current" />
                  <span>My Task</span>
                </div>
              );
            }}
          </NavLink>
        </div>

        <MobileModalTask
          open={open}
          setOpen={() => {
            setOpen(false);
            setIsMiddleActive(false);
            setTask(null);
          }}
        >
          <MobileFormTask
            onClose={() => {
              console.log('closing');
              setOpen(false);
            }}
            defaultValues={task}
          />
        </MobileModalTask>
      </div>
    </aside>
  );
};
