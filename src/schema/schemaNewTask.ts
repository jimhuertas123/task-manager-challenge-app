import z from 'zod';

export type NewTaskData = z.infer<typeof newTaskDataSchema>;
export const newTaskDataSchema = z.object({
  name: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(20, 'Title must be at most 20 characters'),
  estimate: z
    .string()
    .refine((val) => ['0', '1', '2', '4', '8'].includes(val), {
      message: 'Estimate is required',
    }),
  assigneeId: z
    .string({ error: 'Assignee a valid user' })
    .min(1, 'Assignee is required'),

  tags: z
    .array(z.string(), { error: 'Insert at least 1 label' })
    .min(1, 'At least one tag must be selected'),

  dueDate: z
    .string({ error: 'Insert a valid date' })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Due date must be a valid date',
    })
    .nonempty('Due date is required'),
});
