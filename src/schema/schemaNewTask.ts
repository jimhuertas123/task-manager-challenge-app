import z from 'zod';

export type NewTaskData = z.infer<typeof newTaskDataSchema>;
export const newTaskDataSchema = z.object({
  name: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(20, 'Title must be at most 20 characters'),

  estimate: z.enum(['0', '1', '2', '4', '8'], {
    message: 'Estimate must be one of 0, 1, 2, 4, or 8',
  }),

  assigneeId: z.string().min(1, 'Assignee is required'),

  tags: z.array(z.string()).min(1, 'At least one tag must be selected'),

  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Due date must be a valid date',
  }),
});
