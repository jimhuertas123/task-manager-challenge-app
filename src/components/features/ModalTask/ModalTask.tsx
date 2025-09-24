import { createPortal } from 'react-dom';

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
  backgroundStyle?: string;
} & React.HTMLAttributes<HTMLDialogElement>) => {
  return createPortal(
    <dialog
      autoFocus
      open={isOpen}
      className={`${backgroundStyle ? backgroundStyle : ''} w-full h-full fixed inset-0 flex items-center justify-center p-4 transition-colors duration-300 z-[10]`}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={className}>{children}</div>
    </dialog>,
    document.body
  );
};
