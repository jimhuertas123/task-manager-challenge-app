import * as PopoverComponent from '@radix-ui/react-popover';
import './Popover.style.css';

export const Popover = ({
  open,
  onOpenChange,
  button,
  children,
  side,
}: {
  button: React.ReactNode;
  children: React.ReactNode;
  side: 'top' | 'right' | 'bottom' | 'left';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  return (
    <PopoverComponent.Root open={open} onOpenChange={onOpenChange} modal={true}>
      <PopoverComponent.Trigger asChild>{button}</PopoverComponent.Trigger>
      <PopoverComponent.Portal>
        <PopoverComponent.Content
          side={side}
          className="PopoverContent flex z-[100]"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
          onEscapeKeyDown={(event) => {
            event.preventDefault();
          }}
        >
          {children}
        </PopoverComponent.Content>
      </PopoverComponent.Portal>
    </PopoverComponent.Root>
  );
};
