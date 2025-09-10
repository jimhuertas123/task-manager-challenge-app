export const GridCards = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="grid grid-cols-3 gap-4 w-full h-full max-w-[1400px] min-w-[1050px] sm:min-w-[700px] mx-auto">
        {/* working */}
        <div className="w-full h-[calc(100vh-230px)] bg-green-500 overflow-y-auto">
          {[
            'bg-gradient-to-r from-green-400 to-blue-500',
            'bg-gradient-to-r from-pink-500 to-yellow-500',
            'bg-gradient-to-r from-purple-400 to-pink-600',
            'bg-gradient-to-r from-yellow-400 to-red-500',
            'bg-gradient-to-r from-blue-400 to-indigo-600',
          ].map((gradient, idx) => (
            <div key={idx} className={`w-full h-[300px] ${gradient}`} />
          ))}
        </div>
        {/* in progress */}
        <div className="w-full h-[calc(100vh-230px)] bg-yellow-500 overflow-y-auto"></div>
        {/* completed */}
        <div className="w-full h-[calc(100vh-230px)] bg-gray-500 overflow-y-auto"></div>
      </div>
    </div>
  );
};
