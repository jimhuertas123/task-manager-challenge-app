import { useState } from 'react';
import { CircleXIcon, SearchIcon } from '@/assets/icons';
import { SuggestionNavigation } from './SuggestionNavigation';

export const InputSearch = ({
  search,
  setSearch,
  popoverSuggestions,
  handleSuggestionClick,
}: {
  search: string;
  setSearch: (value: string) => void;
  popoverSuggestions: string[];
  handleSuggestionClick: (s: string) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex rounded-[16px] relative bg-neutro-4 sm:bg-transparent items-center pl-6.5 h-full w-full justify-start flex-1">
      <SearchIcon className="fill-neutro-2 mr-3" />
      <label htmlFor="search-tasks" className="sr-only text-neutro-2">
        Search tasks
      </label>
      <div
        className="relative flex-1"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <input
          id="search-tasks"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-neutro-2 placeholder-neutro-2 border-none outline-none w-full pl-3.5 pr-8 focus:placeholder-transparent"
          placeholder="Search"
          autoComplete="off"
        />
        {search && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setSearch('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-neutro-2 hover:text-primary-4 focus:outline-none"
          >
            <CircleXIcon className="w-4.5 h-4.5 fill-neutro-2" />
          </button>
        )}
        {/* Suggestions */}
        {popoverSuggestions.length > 0 && isFocused && (
          <SuggestionNavigation
            handleSuggestionClick={handleSuggestionClick}
            popoverSuggestions={popoverSuggestions}
          />
        )}
      </div>
    </div>
  );
};
