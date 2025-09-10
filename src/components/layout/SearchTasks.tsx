import { SearchIcon, NotificationIcon } from '@/assets/icons';
import Avatar1 from '@/assets/avatar1.png';

export const SearchTasks = () => {
  return (
    <header className="rounded-[16px] bg-transparent sm:bg-neutro-4 text-neutro-2 flex items-center sm:pr-6 py-2">
      <div className="flex bg-neutro-4 sm:bg-transparent items-center pl-6.5 h-full w-full rounded-[16px] justify-start">
        <SearchIcon className="fill-neutro-2 mr-3" />
        <label
          htmlFor="search-tasks"
          className="sr-only text-neutro-2 !min-w-[2px]"
        >
          Search tasks
        </label>
        <input
          id="search-tasks"
          type="text"
          className="bg-color !min-w-[30px] w-full text-neutro-2 placeholder-neutro-2 border-none outline-none pl-3.5 focus:placeholder-transparent"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center h-full w-30 sm:w-28 justify-between">
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
