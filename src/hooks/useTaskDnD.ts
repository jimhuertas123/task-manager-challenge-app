import type { Status, TaskFieldsFragment } from '@/__generated__/graphql';
import { EDIT_STATUS_TASK } from '@/graphql/mutations/editStatusTask';
import { useMutation } from '@apollo/client/react';
import type {
  DragStartEvent,
  DragMoveEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { useState } from 'react';

export const useTaskDnD = (
  tasks: TaskFieldsFragment[],
  statusOrder: Status[]
) => {
  const [activeTask, setActiveTask] = useState<TaskFieldsFragment | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const [editStatusTask] = useMutation(EDIT_STATUS_TASK);

  const updateTaskStatus = async (
    taskId: string,
    newStatus: Status,
    newPosition: number
  ) => {
    await editStatusTask({
      variables: {
        input: {
          id: taskId,
          status: newStatus,
          position: newPosition,
        },
      },
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    console.log(event);
    const task = (tasks as TaskFieldsFragment[]).find(
      (t) => t.id === event.active.id
    );
    setActiveTask(task || null);
  };

  const handleDragOver = (event: DragMoveEvent) => {
    setOverId(event.over?.id != null ? String(event.over.id) : null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    setOverId(null);

    const { active, over } = event;
    if (!over) return;

    const activeTaskObj = (tasks as TaskFieldsFragment[]).find(
      (t) => t.id === active.id
    );
    if (!activeTaskObj) return;

    const overTask = (tasks as TaskFieldsFragment[]).find(
      (t) => t.id === over.id
    );

    let newStatus = activeTaskObj.status;
    let newPosition = activeTaskObj.position;

    if (overTask) {
      newStatus = overTask.status;
      const columnTasks = (tasks as TaskFieldsFragment[])
        .filter((t) => t.status === newStatus && t.id !== activeTaskObj.id)
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
      const overIdx = columnTasks.findIndex((t) => t.id === overTask.id);
      const before = columnTasks[overIdx - 1];
      const after = columnTasks[overIdx];
      if (before && after) {
        newPosition = (before.position + after.position) / 2;
      } else if (before) {
        newPosition = before.position + 1;
      } else if (after) {
        newPosition = after.position - 1;
      } else {
        newPosition = 0;
      }
    } else if (statusOrder.includes(over.id as Status)) {
      newStatus = over.id as Status;
      const columnTasks = (tasks as TaskFieldsFragment[])
        .filter((t) => t.status === newStatus && t.id !== activeTaskObj.id)
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
      newPosition = (columnTasks[columnTasks.length - 1]?.position ?? 0) + 1;
    }

    if (
      activeTaskObj &&
      (newStatus !== activeTaskObj.status ||
        newPosition !== activeTaskObj.position)
    ) {
      updateTaskStatus(activeTaskObj.id, newStatus, newPosition);
    }
  };

  const handleDragMove = (event: DragMoveEvent) => {
    console.log(event);
  };

  return {
    handleDragEnd,
    handleDragMove,
    handleDragOver,
    handleDragStart,
    overId,
    activeTask,
  };
};
