// ...existing imports...

import type { TaskFieldsFragment, Status } from '@/__generated__/graphql';
import { EDIT_STATUS_TASK } from '@/graphql/mutations/editStatusTask';
import { useMutation } from '@apollo/client/react';
import {
  useSensors,
  useSensor,
  PointerSensor,
  TouchSensor,
  type DragStartEvent,
  type DragMoveEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { useState } from 'react';

export const useTaskDnD = (
  tasks: TaskFieldsFragment[],
  statusOrder: Status[]
) => {
  const [activeTask, setActiveTask] = useState<TaskFieldsFragment | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const [editStatusTask] = useMutation(EDIT_STATUS_TASK);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 350,
        tolerance: 15,
      },
    })
  );

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
    const task = tasks.find((t) => t.id === event.active.id);
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

    const activeTaskObj = tasks.find((t) => t.id === active.id);
    if (!activeTaskObj) return;

    const overTask = tasks.find((t) => t.id === over.id);

    let newStatus = activeTaskObj.status;
    let newPosition = activeTaskObj.position;

    if (overTask) {
      newStatus = overTask.status;
      const columnTasks = tasks
        .filter((t) => t.status === newStatus && t.id !== activeTaskObj.id)
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
      const overIdx = columnTasks.findIndex((t) => t.id === overTask.id);

      if (overIdx === 0) {
        newPosition = 1;
      } else if (overIdx > 0) {
        newPosition = overIdx + 1;
      } else {
        newPosition = columnTasks.length + 1;
      }
    } else if (statusOrder.includes(over.id as Status)) {
      newStatus = over.id as Status;
      const columnTasks = tasks
        .filter((t) => t.status === newStatus && t.id !== activeTaskObj.id)
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
      newPosition = columnTasks.length + 1;
    }

    newPosition = Math.max(1, Math.round(newPosition));

    if (
      activeTaskObj &&
      (newStatus !== activeTaskObj.status ||
        newPosition !== activeTaskObj.position)
    ) {
      updateTaskStatus(activeTaskObj.id, newStatus, newPosition);
    }
  };

  return {
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    sensors,
    overId,
    activeTask,
  };
};
