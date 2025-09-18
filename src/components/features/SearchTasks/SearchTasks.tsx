import { NotificationIcon, XIcon } from '@/assets/icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import Avatar1 from '@/assets/avatar1.png';
import { useTasks } from '@/hooks/useTasks';
import './SearchTasks.style.css';
import {
  Status,
  PointEstimate,
  TaskTag,
  type FilterTaskInput,
} from '@/__generated__/graphql';
import { AdvancedFilters } from './AdvancedFilers';
import { InputSearch } from './InputSearch';

import * as Accordion from '@radix-ui/react-accordion';
import { useLocation } from 'react-router-dom';

const setFilterByRoute = (
  location: ReturnType<typeof useLocation>,
  filters: FilterTaskInput | undefined,
  dueDate: string,
  setFilter: (filter: FilterTaskInput) => void
) => {
  if (location.pathname === '/mytasks') {
    setFilter({
      ...filters,
      dueDate,
      assigneeId: '2c69a930-16ed-41c0-afb3-a7564471d307',
    });
  } else {
    setFilter({ ...filters, dueDate });
  }
};

export const SearchTasks = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<Status | ''>('');
  const [assigneeId, setAssigneeId] = useState('');
  const [pointEstimate, setPointEstimate] = useState<PointEstimate | ''>('');
  const [tag, setTag] = useState<TaskTag | ''>('');
  const [dueDate, setDueDate] = useState<string>('');
  const { tasks, setFilter, refetchTasks } = useTasks();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const location = useLocation();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (search === '') {
        setFilterByRoute(location, {}, dueDate, setFilter);
      } else {
        setFilterByRoute(location, { name: search }, dueDate, setFilter);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, setFilter, dueDate, location]);

  useEffect(() => {
    const filters: FilterTaskInput | undefined = {};
    if (status) filters.status = status;
    if (assigneeId) filters.assigneeId = assigneeId;
    if (pointEstimate) filters.pointEstimate = pointEstimate;
    if (tag) filters.tags = [tag];
    refetchTasks(filters);

    setFilterByRoute(location, filters, dueDate, setFilter);
  }, [
    status,
    assigneeId,
    pointEstimate,
    tag,
    dueDate,
    refetchTasks,
    setFilter,
    location,
  ]);

  const suggestions = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.name))),
    [tasks]
  );
  const popoverSuggestions = search
    ? suggestions.filter((s) => s.toLowerCase().includes(search.toLowerCase()))
    : [];

  const handleSuggestionClick = (s: string) => {
    setSearch(s);
    setFilterByRoute(location, { name: s }, dueDate, setFilter);
  };

  const handleClearFilters = () => {
    setStatus('');
    setAssigneeId('');
    setPointEstimate('');
    setTag('');
    setSearch('');
    setDueDate('');
    setFilter({});
    refetchTasks({});
  };

  return (
    <header className="rounded-[16px] bg-transparent sm:bg-neutro-4 text-neutro-2 flex flex-col gap-2 pr-4 sm:pr-6 py-2 z-1">
      <Accordion.Root type="single" collapsible className="w-full">
        <Accordion.Item value="item-1">
          <Accordion.Header className="flex justify-between items-center h-full">
            <div className="flex items-center w-full h-[50px]">
              <InputSearch
                search={search}
                setSearch={setSearch}
                popoverSuggestions={popoverSuggestions}
                handleSuggestionClick={handleSuggestionClick}
              />
            </div>
            <div className="flex items-center h-full w-28 justify-between">
              <Accordion.Trigger className={`AccordionTrigger`}>
                <XIcon className="fill-neutro-1" />
              </Accordion.Trigger>
              <NotificationIcon className="fill-neutro-2 ml-4" />
              <img
                src={Avatar1}
                alt="User Avatar"
                className="sm:w-10 sm:h-10 w-8 h-8 rounded-full bg-amber-400"
              />
            </div>
          </Accordion.Header>
          <Accordion.Content className="AccordionContent flex z-auto">
            {/*filters below the input */}
            <AdvancedFilters
              setStatus={setStatus}
              setDueDate={setDueDate}
              setAssigneeId={setAssigneeId}
              setPointEstimate={setPointEstimate}
              setTag={setTag}
              status={status}
              dueDate={dueDate}
              assigneeId={assigneeId}
              pointEstimate={pointEstimate}
              tag={tag}
              handleClearFilters={handleClearFilters}
            />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </header>
  );
};
