export const GridCards = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="grid grid-cols-3 gap-4 md:gap-9 max-w-[1400px] min-w-[1050px] md:m-auto">
        {/* Working */}
        <div className="w-full h-[calc(100vh-200px)] flex flex-col pt-1 bg-red-500">
          <h3 className="text-lg font-bold tracking-wide pb-5">Working (03)</h3>
          <div className="flex-1 overflow-y-auto pb-4 w-full">
            {[
              'bg-gradient-to-r from-green-400 to-blue-500',
              'bg-gradient-to-r from-pink-500 to-yellow-500',
              'bg-gradient-to-r from-purple-400 to-pink-600',
              'bg-gradient-to-r from-yellow-400 to-red-500',
              'bg-gradient-to-r from-blue-400 to-indigo-600',
            ].map((gradient, idx) => (
              <div key={idx} className={`w-full h-[208px] mb-3 ${gradient}`} />
            ))}
          </div>
        </div>
        {/* In Progress */}
        <div className="w-full h-[calc(100vh-200px)] bg-yellow-500 flex flex-col">
          <h3 className="text-lg font-bold tracking-wide pb-5">In Progress</h3>
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {/* Cards go here */}
          </div>
        </div>
        {/* Completed */}
        <div className="w-full h-[calc(100vh-200px)] bg-gray-500 flex flex-col">
          <h3 className="text-lg font-bold tracking-wide pb-5">Completed</h3>
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {/* Cards go here */}
          </div>
        </div>
      </div>
    </div>
  );
};
