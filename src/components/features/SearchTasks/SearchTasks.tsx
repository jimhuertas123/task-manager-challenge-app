import { SearchIcon, NotificationIcon, CircleXIcon } from '@/assets/icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import Avatar1 from '@/assets/avatar1.png';
import { useTasks } from '@/hooks/useTasks';
import { SuggestionNavigation } from './SuggestionNavigation';
import { useLocation } from 'react-router-dom';
import { InputCustomKeyTrigger } from './InputCustomKeyTrigger';

export const SearchTasks = () => {
  const [search, setSearch] = useState('');
  const [showPopover, setShowPopover] = useState(false);
  const { tasks, setFilter, refetchTasks } = useTasks();
  const location = useLocation();

  const filterKeys = [
    ':name:',
    ':dueDate:',
    ':status:',
    ':tags:',
    ':assignee:',
    ':estimate:',
  ];

  let popoverSuggestions: string[] = [];
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const match = search.match(/^:([a-zA-Z]+):(.*)$/);
  const filterKey = match ? `${match[1]}:` : '';
  const valuePart = match ? match[2] : search;

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (search === '') {
        if (location.pathname === '/mytasks') {
          setFilter({ assigneeId: '2c69a930-16ed-41c0-afb3-a7564471d307' });
        } else {
          setFilter({});
        }
      } else if (!search.startsWith(':')) {
        setFilter({ name: search });
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, location.pathname, setFilter]);

  useEffect(() => {
    if (search.startsWith(':')) {
      const match = search.match(/^:([a-zA-Z]+):(.*)$/);
      if (match && match[1] && match[2]) {
        const key = match[1];
        const value = match[2].trim();
        if (value) {
          refetchTasks({ [key]: value });
        }
      }
    }
  }, [search, refetchTasks]);

  const suggestions = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.name))),
    [tasks]
  );

  if (!search.includes(':')) {
    popoverSuggestions = filterKeys.filter(
      (k) => k.startsWith(search) && search
    );
    if (popoverSuggestions.length === 0 && search) {
      popoverSuggestions = suggestions.filter((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      );
    }
  } else if (search.includes(':')) {
    console.log('filtering by key');
    popoverSuggestions = filterKeys.filter(
      (k) => k.startsWith(search) && search.length > 1
    );

    //show all the filterKeys if the user has only typed the trigger ':'
    if (popoverSuggestions.length === 0 && search) {
      popoverSuggestions = filterKeys.filter((k) =>
        k.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  const handleSuggestionClick = (s: string) => {
    if (filterKeys.includes(s)) {
      setSearch(s);
    } else if (search.includes(':')) {
      const [key] = search.split(':');
      setSearch(`:${key}:${s}`);
      setFilter({ [key.trim()]: s });
    } else {
      setSearch(s);
      setFilter({ name: s });
    }
    setShowPopover(false);
  };

  return (
    <header className="rounded-[16px] bg-transparent sm:bg-neutro-4 text-neutro-2 flex items-center pr-4 sm:pr-6 py-2">
      <div className="flex relative bg-neutro-4 sm:bg-transparent items-center pl-6.5 h-full w-full rounded-[16px] justify-start">
        <SearchIcon className="fill-neutro-2 mr-3" />
        <label htmlFor="search-tasks" className="sr-only text-neutro-2">
          Search tasks
        </label>
        <div className="relative flex-1">
          <InputCustomKeyTrigger
            id="search-tasks"
            type="text"
            value={search}
            onFocus={() => setShowPopover(true)}
            onBlur={() => setTimeout(() => setShowPopover(false), 150)}
            onChange={(e) =>
              setSearch(
                filterKey ? `:${filterKey}${e.target.value}` : e.target.value
              )
            }
            className="text-neutro-2 placeholder-neutro-2 border-none outline-none w-full pl-3.5 pr-8 focus:placeholder-transparent"
            placeholder="Search"
            autoComplete="off"
            filterKey={filterKey}
            valuePart={valuePart}
          />
          {search && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setSearch('');
                setFilter({});
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutro-2 hover:text-primary-4 focus:outline-none"
            >
              <CircleXIcon className="w-4.5 h-4.5 fill-neutro-2" />
            </button>
          )}

          {/* list of suggestions */}
          {showPopover && popoverSuggestions.length > 0 && (
            <SuggestionNavigation
              handleSuggestionClick={handleSuggestionClick}
              popoverSuggestions={popoverSuggestions}
            />
          )}
        </div>
      </div>
      <div className="flex items-center h-full w-28 justify-between">
        {/* TODO: if there's time create a popover and a context using localstorage for notifications when create/edit/delete tasks */}
        <NotificationIcon className="fill-neutro-2 ml-4" />
        <img
          src={Avatar1}
          alt="User Avatar"
          className="sm:w-10 sm:h-10 w-8 h-8 rounded-full bg-amber-400"
        />
      </div>
    </header>
  );
};
