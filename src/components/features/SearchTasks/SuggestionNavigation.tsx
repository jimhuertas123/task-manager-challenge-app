export const SuggestionNavigation = ({
  handleSuggestionClick,
  popoverSuggestions,
}: {
  handleSuggestionClick: (s: string) => void;
  popoverSuggestions: string[];
}) => {
  return (
    <div className="absolute left-0 right-0 mt-2 bg-neutro-4 border rounded shadow-lg z-49">
      {popoverSuggestions.map((s, idx) => (
        <div
          key={idx}
          className="px-4 py-2 hover:bg-neutro-3 cursor-pointer"
          onMouseDown={() => handleSuggestionClick(s)}
        >
          {s}
        </div>
      ))}
    </div>
  );
};
