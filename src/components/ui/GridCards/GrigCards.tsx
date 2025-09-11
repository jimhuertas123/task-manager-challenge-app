import { GridCard } from '@/components/features';
import { Status, type GetAllTasksQuery } from '@/types/__generated__/graphql';

export const GridCards = ({ tasks }: { tasks: GetAllTasksQuery['tasks'] }) => {
  const statusOrder: Status[] = [
    Status.Backlog,
    Status.Todo,
    Status.InProgress,
    Status.Done,
    Status.Cancelled,
  ];
  const totalStatuses = statusOrder.length;

  return (
    <div className="w-full overflow-x-auto">
      <div
        className={`grid gap-4 md:gap-9 max-w-[3000px] md:m-auto`}
        style={{
          gridTemplateColumns: `repeat(${totalStatuses}, minmax(348px, 1fr))`,
        }}
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
                  <GridCard key={task.id} task={task} />
                ))}
            </div>
          </div>
        ))}

        {/* <div className="w-full h-[calc(100vh-200px)] flex flex-col pt-1 bg-red-500">
          <h3 className="text-lg font-bold tracking-wide pb-5">Working (03)</h3>
          <div className="flex-1 overflow-y-auto pb-4 w-full">
            <GridCard task={tasks.length > 0 ? tasks[0] : undefined} />
            {[
              'bg-gradient-to-r from-green-400 to-blue-500',
              'bg-gradient-to-r from-pink-500 to-yellow-500',
              'bg-gradient-to-r from-purple-400 to-pink-600',
              'bg-gradient-to-r from-yellow-400 to-red-500',
              'bg-gradient-to-r from-blue-400 to-indigo-600',
            ].map((gradient, idx) => (
              <div key={idx} className={`w-full h-[208px] mb-3 ${gradient}`} />
            ))}
          </div>
        </div>
        <div className="w-full h-[calc(100vh-200px)] bg-yellow-500 flex flex-col">
          <h3 className="text-lg font-bold tracking-wide pb-5">In Progress</h3>
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {[
              'bg-gradient-to-r from-green-400 to-blue-500',
              'bg-gradient-to-r from-pink-500 to-yellow-500',
              'bg-gradient-to-r from-purple-400 to-pink-600',
              'bg-gradient-to-r from-yellow-400 to-red-500',
              'bg-gradient-to-r from-blue-400 to-indigo-600',
            ].map((gradient, idx) => (
              <div key={idx} className={`w-full h-[208px] mb-3 ${gradient}`} />
            ))}
          </div>
        </div>
        <div className="w-full h-[calc(100vh-200px)] bg-gray-500 flex flex-col">
          <h3 className="text-lg font-bold tracking-wide pb-5">Completed</h3>
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {[
              'bg-gradient-to-r from-green-400 to-blue-500',
              'bg-gradient-to-r from-pink-500 to-yellow-500',
              'bg-gradient-to-r from-purple-400 to-pink-600',
              'bg-gradient-to-r from-yellow-400 to-red-500',
              'bg-gradient-to-r from-blue-400 to-indigo-600',
            ].map((gradient, idx) => (
              <div key={idx} className={`w-full h-[208px] mb-3 ${gradient}`} />
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};
