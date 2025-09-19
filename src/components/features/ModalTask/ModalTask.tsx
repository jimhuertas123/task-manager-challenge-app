import { createPortal } from 'react-dom';
import { useEffect } from 'react';

export const ModalTask = ({
  isOpen,
  onClose,
  children,
  className,
  backgroundStyle,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className: string;
  // TODO: search about a type that make lint tailwind styles
  backgroundStyle?: string;
} & React.HTMLAttributes<HTMLDialogElement>) => {
  //for reset the validation field messages

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  return createPortal(
    <dialog
      open={isOpen}
      className={`${backgroundStyle ? backgroundStyle : ''} w-full h-full fixed inset-0 flex items-center justify-center p-4 transition-colors duration-300 z-1`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={className}>{children}</div>
    </dialog>,
    document.body
  );
};
