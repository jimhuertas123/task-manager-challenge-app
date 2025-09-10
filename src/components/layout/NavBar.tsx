import { DashboardIcon, ListIcon, RavnIcon } from '@/assets/icons';
import { NavLinkCard } from './NavLinkCard';

export const NavBar = () => {
  return (
    <aside className="col-span-1">
      <div className="flex flex-col h-full w-full bg-neutro-4 rounded-[24px] ">
        <header className="flex h-21 mt-3 rounded-[16px]">
          <RavnIcon className="mx-auto h-10 w-auto fill-neutro-1" />
        </header>
        <NavLinkCard icon={DashboardIcon} to="/" title="Dashboard" />
        <NavLinkCard icon={ListIcon} to="/mytasks" title="My Task" />
      </div>
    </aside>
  );
};
