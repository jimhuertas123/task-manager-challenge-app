import {
  PointEstimate,
  TaskTag,
  Status,
  type UserFieldsFragment,
} from '@/__generated__/graphql';
import {
  AnimatedResetIcon,
  ArrowsVertical,
  CalendarIcon,
} from '@/assets/icons';
import { useUsers } from '@/hooks/useUsers';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useLocation } from 'react-router-dom';

export const AdvancedFilters = ({
  setStatus,
  setAssigneeId,
  setPointEstimate,
  setTag,
  setDueDate,
  status,
  assigneeId,
  pointEstimate,
  tag,
  dueDate,
  handleClearFilters,
}: {
  setStatus: (status: Status | '') => void;
  setAssigneeId: (assigneeId: string) => void;
  setPointEstimate: (pointEstimate: PointEstimate | '') => void;
  setTag: (tag: TaskTag | '') => void;
  status: Status | '';
  assigneeId: string;
  pointEstimate: PointEstimate | '';
  tag: TaskTag | '';
  setDueDate: (dueDate: string) => void;
  dueDate: string;
  handleClearFilters: () => void;
}) => {
  const location = useLocation();
  const isMyTasks = location.pathname === '/mytasks';
  const { data } = useUsers();

  const isSmallDevice = useMediaQuery('(max-width: 1050px)');

  const myId = '2c69a930-16ed-41c0-afb3-a7564471d307';
  return (
    <div
      className={
        'grid gap-2 items-center bg-neutro-4 p-3 text-neutro-2-3 w-full shadow-neutro-1/30 shadow rounded-bl-[10px] mb-[2px]' +
        (isSmallDevice
          ? ' grid-rows-[repeat(2,1fr)]'
          : ' grid-cols-[repeat(5,1fr)_5%]')
      }
    >
      <div className="relative w-full h-full">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
          className="rounded px-2 py-1 border w-full"
        >
          <option value="">Status</option>
          {Object.values(Status).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <ArrowsVertical className="w-5 h-5 fill-neutro-2" />
        </span>
      </div>
      <div className="relative w-full h-full">
        <select
          value={isMyTasks ? myId : assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
          className="rounded px-2 py-1 border w-full"
          disabled={isMyTasks}
        >
          <option value="">Assignee</option>
          {(data?.users as UserFieldsFragment[]).map((a) => (
            <option key={a.id} value={a.id}>
              {a.fullName}
            </option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <ArrowsVertical className="w-5 h-5 fill-neutro-2" />
        </span>
      </div>
      <div className="relative w-full h-full">
        <select
          value={pointEstimate}
          onChange={(e) => setPointEstimate(e.target.value as PointEstimate)}
          className="rounded px-2 py-1 border w-full"
        >
          <option value="">Estimate</option>
          {Object.values(PointEstimate).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <ArrowsVertical className="w-5 h-5 fill-neutro-2" />
        </span>
      </div>
      <div className="relative w-full h-full">
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value as TaskTag)}
          className="rounded px-2 py-1 border w-full"
        >
          <option value="">Tag</option>
          {Object.values(TaskTag).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <ArrowsVertical className="w-5 h-5 fill-neutro-2" />
        </span>
      </div>
      <div className="relative flex items-center h-full w-full">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
          }}
          className=" rounded px-2 py-1 border w-[calc(100%+25px)] "
        />
        <span className="absolute right-3 pointer-events-none">
          <CalendarIcon className="w-5 h-5 fill-neutro-2 " />
        </span>
      </div>
      <div
        onClick={handleClearFilters}
        className="flex lg:justify-end justify-center lg:w-fit w-full  bg-primary-4 active:scale-95 hover:bg-primary-4/80 rounded transition-all duration-200 cursor-pointer p-1"
      >
        <AnimatedResetIcon className="lg:w-7 w-10 lg:h-7 h-10 fill-primary-1 cursor-pointer p-1.5 " />
      </div>
    </div>
  );
};
