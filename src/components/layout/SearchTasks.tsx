import { SearchIcon, NotificationIcon } from '@/assets/icons';
import Avatar1 from '@/assets/avatar-1.png';

export const SearchTasks = () => {
  return (
    <header className="rounded-[16px] bg-neutro-4  text-neutro-2 flex items-center pl-6.5 pr-6">
      <div className="flex justify-between items-center h-full w-full">
        <SearchIcon className="fill-neutro-2 mr-3" />
        <label htmlFor="search-tasks" className="sr-only text-neutro-2">
          Search tasks
        </label>
        <input
          id="search-tasks"
          type="text"
          className="text-neutro-2 placeholder-neutro-2 border-none outline-none flex-1 pl-3.5"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center h-full w-28 justify-between">
        <NotificationIcon className="fill-neutro-2 ml-4" />
        <img
          src={Avatar1}
          alt="User Avatar"
          className="w-10 h-10 rounded-full bg-amber-400"
        />
      </div>
    </header>
  );
};
