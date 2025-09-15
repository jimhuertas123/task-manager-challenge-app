import { GridCard } from '@/components/features';
import {
  GetAllTasksDocument,
  Status,
  useDeleteTaskMutation,
  type GetAllTasksQuery,
} from '@/types/__generated__/graphql';

export const GridCards = ({ tasks }: { tasks: GetAllTasksQuery['tasks'] }) => {
  const allStatuses = Object.values(Status);
  const endStatuses = [Status.Done, Status.Cancelled];
  const statusOrder = [
    ...allStatuses.filter((status) => !endStatuses.includes(status)),
    ...endStatuses.filter((status) => allStatuses.includes(status)),
  ];

  const [deleteTask] = useDeleteTaskMutation();

  //TODO EDIT OPEN IN MODAL FORM WITH THE TASK DATA
  // const handleEdit = (taskId: string) => {

  // };

  const handleDelete = async (taskId: string) => {
    await deleteTask({
      variables: { input: { id: taskId } },
      update: (cache, { data }) => {
        if (!data?.deleteTask?.id) return;
        const existing = cache.readQuery<GetAllTasksQuery>({
          query: GetAllTasksDocument,
        });
        if (existing && existing.tasks) {
          cache.writeQuery<GetAllTasksQuery>({
            query: GetAllTasksDocument,
            data: {
              tasks: existing.tasks.filter(
                (task) => task.id !== data.deleteTask.id
              ),
            },
          });
        }
      },
    });
  };

  return (
    <div className="w-full overflow-x-auto">
      <div
        className={`grid grid-flow-col auto-cols-[minmax(338px,1fr)] sm:auto-cols-[minmax(348px,1fr)] gap-4 md:gap-x-[2.02rem] max-w-[3000px] md:m-auto`}
      >
        {statusOrder.map((status) => (
          <div
            key={status}
            className=" w-full h-[calc(100vh-220px)] flex flex-col pt-1"
          >
            <h3 className="text-lg font-bold tracking-wide pb-5">
              {status.charAt(0) +
                status.slice(1).toLowerCase().replace('_', ' ')}
              {` (0${tasks.filter((task) => task.status === status).length})`}
            </h3>
            <div className="flex-1 overflow-y-auto">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <GridCard
                    key={task.id}
                    task={task}
                    onDelete={() => handleDelete(task.id)}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
