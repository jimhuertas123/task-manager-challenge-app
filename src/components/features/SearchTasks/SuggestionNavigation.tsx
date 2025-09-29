import { useRef, useState } from 'react';

export const SuggestionNavigation = ({
  handleSuggestionClick,
  popoverSuggestions,
}: {
  handleSuggestionClick: (s: string) => void;
  popoverSuggestions: string[];
}) => {
  const [focusedIdx, setFocusedIdx] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (focusedIdx + 1) % popoverSuggestions.length;
      setFocusedIdx(nextIdx);
      itemRefs.current[nextIdx]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx =
        (focusedIdx - 1 + popoverSuggestions.length) %
        popoverSuggestions.length;
      setFocusedIdx(prevIdx);
      itemRefs.current[prevIdx]?.focus();
    } else if (e.key === 'Enter') {
      handleSuggestionClick(popoverSuggestions[focusedIdx]);
    } else if (e.key === 'Escape') {
      e.currentTarget.blur();
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="absolute left-0 right-0 mt-2 bg-neutro-4 border rounded shadow-lg z-49"
      data-cy="suggestion-list"
    >
      {popoverSuggestions.map((suggestion, idx) => (
        <div
          tabIndex={0}
          key={idx}
          ref={(el) => {
            itemRefs.current[idx] = el;
          }}
          className={`px-4 py-2 hover:bg-neutro-3 cursor-pointer ${
            idx === focusedIdx ? 'bg-neutro-3' : ''
          }`}
          onMouseDown={() => handleSuggestionClick(suggestion)}
          onFocus={() => setFocusedIdx(idx)}
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
};
