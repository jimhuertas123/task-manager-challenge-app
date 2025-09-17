import { XIcon } from '@/assets/icons';
import type { NewTaskData } from '@/schema/schemaNewTask';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const MobileModalTask = ({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}) => {
  const [translateY, setTranslateY] = useState(0);
  const startYRef = useRef<number | null>(null);
  const draggingRef = useRef(false);

  const { reset } = useFormContext<NewTaskData>();

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
    draggingRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (draggingRef.current && startYRef.current !== null) {
      const deltaY = e.touches[0].clientY - startYRef.current;
      if (deltaY > 0) setTranslateY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (translateY > 100) {
      setOpen(false);
    }
    setTranslateY(0);
    startYRef.current = null;
    draggingRef.current = false;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startYRef.current = e.clientY;
    draggingRef.current = true;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggingRef.current && startYRef.current !== null) {
      const deltaY = e.clientY - startYRef.current;
      if (deltaY > 0) setTranslateY(deltaY);
    }
  };

  const handleMouseUp = () => {
    if (translateY > 100) {
      setOpen(false);
    }
    setTranslateY(0);
    startYRef.current = null;
    draggingRef.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 backdrop-blur-[20px] bg-black/5 bg-opacity-40"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`
          fixed left-0 right-0 bottom-0
          bg-neutro-5 rounded-t-2xl p-4
          transition-transform duration-500 ease-in
          min-h-full
        `}
        style={{
          transform: open ? `translateY(${translateY}px)` : 'translateY(100%)',
          transition: translateY ? 'none' : undefined,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        <div className="w-12 h-1 bg-gray-400 rounded-full mx-auto mb-4" />
        <button
          className="absolute top-7 left-5 text-2xl text-neutro-1 p-1.5 rounded-full hover:bg-white/10 active:bg-neutro-5 transition-colors duration-200"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          <XIcon className="fill-neutro-2  w-6 h-6" />
        </button>
        {children}
      </div>
    </>
  );
};
