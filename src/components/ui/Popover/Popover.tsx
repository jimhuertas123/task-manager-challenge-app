import * as PopoverComponent from '@radix-ui/react-popover';
import './Popover.style.css';

export const Popover = ({
  button,
  children,
  side,
}: {
  button: React.ReactNode;
  children: React.ReactNode;
  side: 'top' | 'right' | 'bottom' | 'left';
}) => {
  return (
    <PopoverComponent.Root>
      <PopoverComponent.Trigger asChild>{button}</PopoverComponent.Trigger>
      <PopoverComponent.Portal>
        <PopoverComponent.Content
          side={side}
          className="PopoverContent"
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
