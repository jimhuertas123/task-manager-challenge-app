import {
  PointEstimate,
  TaskTag,
  Status,
  type UserFieldsFragment,
} from '@/__generated__/graphql';
import { useUsers } from '@/contexts/useUsers';
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

  const myId = '2c69a930-16ed-41c0-afb3-a7564471d307';
  return (
    <div className="flex gap-2 items-center flex-wrap bg-neutro-4 p-3 rounded-bl-[20px] ml-5 w-full">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as Status)}
        className="rounded px-2 py-1 border"
      >
        <option value="">Status</option>
        {Object.values(Status).map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <select
        value={isMyTasks ? myId : assigneeId}
        onChange={(e) => setAssigneeId(e.target.value)}
        className="rounded px-2 py-1 border"
        disabled={isMyTasks}
      >
        <option value="">Assignee</option>
        {(data?.users as UserFieldsFragment[]).map((a) => (
          <option key={a.id} value={a.id}>
            {a.fullName}
          </option>
        ))}
      </select>
      <select
        value={pointEstimate}
        onChange={(e) => setPointEstimate(e.target.value as PointEstimate)}
        className="rounded px-2 py-1 border"
      >
        <option value="">Estimate</option>
        {Object.values(PointEstimate).map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <select
        value={tag}
        onChange={(e) => setTag(e.target.value as TaskTag)}
        className="rounded px-2 py-1 border"
      >
        <option value="">Tag</option>
        {Object.values(TaskTag).map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <div className=" bg-neutro-3 rounded-[8px] shadow mt-2">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
          }}
          className="rounded px-2 py-1 border"
        />
      </div>
      <button
        onClick={handleClearFilters}
        className="ml-2 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
      >
        Clear
      </button>
    </div>
  );
};

//2025-09-19T00:00:00.000Z
//2025-09-18T00:00:00.000Z
