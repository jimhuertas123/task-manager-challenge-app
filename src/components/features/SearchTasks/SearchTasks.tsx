import { FilterCloseIcon, FilterIcon, NotificationIcon } from '@/assets/icons';
import { useEffect, useMemo, useRef, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { Popover } from '@/components/ui';
import { CircleAvatar } from '@/components/ui/UICardComponents/CircleAvatar';

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
  const [openAccordion, setOpenAccordion] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

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
    <header className="flex header-search rounded-t-[16px] rounded-br-[16px] bg-transparent sm:bg-neutro-4 text-neutro-2 flex-col gap-2 pr-4 py-2 z-1">
      <Accordion.Root type="single" collapsible className="w-full">
        <Accordion.Item value="item-1">
          <Accordion.Header className="grid grid-cols-[1fr_90px] md:grid-cols-[1fr_120px] gap-x-2 sm:gap-0 items-center h-full ">
            <div className="flex items-center w-full h-[50px]">
              <InputSearch
                search={search}
                setSearch={setSearch}
                popoverSuggestions={popoverSuggestions}
                handleSuggestionClick={handleSuggestionClick}
              />
            </div>
            <div className="grid grid-cols-[1fr_1fr_1fr] items-center w-full h-full justify-between gap-x-1">
              <Accordion.Trigger
                aria-label="Toggle Filters"
                id="filter-toggle-button"
                role="button"
                tabIndex={0}
                className="AccordionTrigger flex w-full h-full justify-center items-center "
                onClick={() => {
                  setOpenAccordion(!openAccordion);
                }}
              >
                <div
                  className={`relative w-full h-full rounded hover:cursor-pointer ${openAccordion ? 'open' : ''}`}
                >
                  <FilterIcon
                    id="filter-icon"
                    className="filter-toggle-icon filter-open-rotate fill-neutro-2 active:fill-neutro-1"
                    aria-label="Filter"
                  />
                  <FilterCloseIcon
                    id="filter-close-icon"
                    className="filter-toggle-icon filter-close-rotate fill-neutro-2"
                    aria-label="Close filter"
                  />
                </div>
              </Accordion.Trigger>
              <NotificationIcon
                id="notification-bell-icon"
                tabIndex={0}
                role="button"
                aria-label="Notifications"
                className="fill-neutro-2 flex self-center w-full h-full hover:fill-neutro-1 p-2"
              />

              <Popover
                button={
                  <button
                    role="button"
                    aria-label="User Avatar"
                    type="button"
                    id="user-avatar-button"
                    className="sm:w-10 sm:h-10 w-8 h-8 rounded-full bg-neutro-2/50 hover:scale-105 active:scale-95 cursor-pointer flex justify-center items-center"
                  >
                    <CircleAvatar
                      userId="2c69a930-16ed-41c0-afb3-a7564471d307"
                      size={38}
                    />
                  </button>
                }
                side="bottom"
              >
                <div className="p-1 bg-neutro-4 rounded-[8px] border-[1px] border-neutro-2 shadow mt-2 gap-y-1 flex flex-col w-40">
                  <button
                    id="user-profile-button"
                    aria-label="View Profile"
                    role="button"
                    type="button"
                    tabIndex={0}
                    onClick={() => {
                      navigate('/settings');
                    }}
                    className="hover:bg-neutro-3 active:bg-neutro-3 active:scale-95 rounded-[4px] px-2 py-1 text-nav-bar-m text-neutro-2 cursor-pointer transition-all duration-200"
                  >
                    View Profile
                  </button>
                </div>
              </Popover>
            </div>
          </Accordion.Header>
          <Accordion.Content className="search AccordionContent w-full sm:pr-1 sm:mt-1 -mt-2.5 pr-24">
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
