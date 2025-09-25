const ColumnLoading = ({ keyIndex }: { keyIndex: number }) => {
  return (
    <div
      key={keyIndex}
      className="grid grid-rows-auto h-full bg-transparent rounded-2xl gap-y-4"
    >
      <div
        key={`title-${keyIndex}`}
        className="bg-neutro-4 p-4 grid grid-rows-4 h-full animate-pulse "
        style={{
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
      />
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`loading-skeleton-${keyIndex}-${i}`}
          className="bg-neutro-4 p-4 grid grid-rows-4 h-full animate-pulse "
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div
            className="h-6 rounded w-[55%] bg-"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
            }}
          />
          <div
            className="h-10 rounded w-full"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
            }}
          />
          <div className="flex items-center gap-2 pt-1">
            <div
              className="w-[25%] h-7 rounded-[8px]"
              style={{ background: 'rgba(255, 255, 255, 0.08)' }}
            />
            <div
              className="w-[25%] h-7 rounded-[8px]"
              style={{ background: 'rgba(255, 255, 255, 0.08)' }}
            />
            <div
              className="w-8 h-7 rounded-[8px]"
              style={{ background: 'rgba(255, 255, 255, 0.08)' }}
            />
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <div
              className="w-10 h-10 rounded-full"
              style={{ background: 'rgba(255, 255, 255, 0.08)' }}
            />
            <div
              className="w-[50%] h-6 rounded"
              style={{ background: 'rgba(255, 255, 255, 0.08)' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export const GridCardsLoading = () => {
  return (
    <div className="w-full overflow-x-auto overflow-hidden max-h-[72dvh]">
      <div
        className={`grid pt-[120px] grid-flow-col auto-cols-[338px] sm:auto-cols-[348px] gap-4 md:gap-x-[2.02rem] max-w-[3000px] md:m-auto`}
        style={{ padding: '1rem 0' }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <ColumnLoading key={i} keyIndex={i} />
        ))}
      </div>
    </div>
  );
};
