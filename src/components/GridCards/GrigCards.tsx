export const GridCards = () => {
  return (
    <div className="grid grid-cols-3 gap-4 w-full h-full max-w-[1400px] mx-auto">
      {/* working */}
      <div className="w-full h-full bg-green-500"></div>

      {/* in progress */}
      <div className="w-full h-full bg-yellow-500"></div>

      {/* completed */}
      <div className="w-full h-full bg-gray-500"></div>
    </div>
  );
};
