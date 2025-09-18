import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  filterKey?: string;
  valuePart?: string;
};

export const InputCustomKeyTrigger = React.forwardRef<HTMLInputElement, Props>(
  ({ filterKey, valuePart, ...props }, ref) => (
    <div className="relative w-full">
      {filterKey && (
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-primary-2 text-white rounded px-2 py-0.5 text-xs font-semibold pointer-events-none"
          style={{ zIndex: 2 }}
        >
          {filterKey}
        </span>
      )}
      <input
        ref={ref}
        {...props}
        className={`w-full pl-${filterKey ? '20' : '3.5'} pr-8 border-none outline-none text-neutro-2 placeholder-neutro-2 focus:placeholder-transparent ${props.className || ''}`}
        value={valuePart ?? props.value}
        style={filterKey ? { paddingLeft: '80px' } : undefined}
      />
    </div>
  )
);
