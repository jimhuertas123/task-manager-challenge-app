import { SearchIcon, NotificationIcon, CircleXIcon } from '@/assets/icons';
import { useState, useMemo, useEffect } from 'react';
import Avatar1 from '@/assets/avatar1.png';
import { useTasks } from '@/hooks/useTasks';
import { useLocation } from 'react-router-dom';

const filterKeys = [
  'name:',
  'dueDate:',
  'status:',
  'tags:',
  'assignee:',
  'estimate:',
];

export const SearchTasks = () => {
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [showPopover, setShowPopover] = useState(false);
  const { tasks, setFilter } = useTasks();

  useEffect(() => {
    //empty case
    if (search === '') {
      if (location.pathname === '/mytasks') {
        setFilter({ assigneeId: '2c69a930-16ed-41c0-afb3-a7564471d307' });
      } else {
        setFilter({});
      }
    }
  }, [search]);

  const suggestions = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.name))),
    [tasks]
  );

  let popoverSuggestions: string[] = [];

  if (!search.includes(':')) {
    popoverSuggestions = filterKeys.filter(
      (k) => k.startsWith(search) && search
    );
    if (popoverSuggestions.length === 0 && search) {
      popoverSuggestions = suggestions.filter((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      );
    }
  } else {
    const [key, value] = search.split(':');
    if (key.trim() === 'name') {
      popoverSuggestions = suggestions.filter((s) =>
        s.toLowerCase().includes(value.trim().toLowerCase())
      );
    }
    //TODO: add more filter logic for other keys if needed
  }

  const handleSuggestionClick = (s: string) => {
    if (filterKeys.includes(s)) {
      setSearch(s);
    } else if (search.includes(':')) {
      const [key] = search.split(':');
      setSearch(`${key}:${s}`);
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
          <input
            id="search-tasks"
            type="text"
            value={search}
            onFocus={() => setShowPopover(true)}
            onBlur={() => setTimeout(() => setShowPopover(false), 150)}
            onChange={(e) => setSearch(e.target.value)}
            className="text-neutro-2 placeholder-neutro-2 border-none outline-none w-full pl-3.5 pr-8 focus:placeholder-transparent"
            placeholder="Search"
            autoComplete="off"
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
            <div className="absolute left-0 right-0 mt-2 bg-white border rounded shadow-lg z-10">
              {popoverSuggestions.map((s, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 hover:bg-neutro-4 cursor-pointer"
                  onMouseDown={() => handleSuggestionClick(s)}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center h-full w-28 justify-between">
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
