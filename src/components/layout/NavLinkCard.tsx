import type { JSX, SVGProps } from 'react';
import { NavLink } from 'react-router-dom';
export const NavLinkCard = ({
  icon,
  to,
  title,
}: {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  to: string;
  title: string;
}) => {
  const styleOnIsActive =
    'bg-[linear-gradient(90deg,_#BA252500_10%,_#D24D4D1A_100%)] text-primary-4 border-r-4 border-primary-4';

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `font-[500] text-nav-bar-m flex items-center mb-2.5 gap-2 px-5 py-[7%] transition-colors duration-200 
        hover:text-primary-4 text-neutro-2

      ${isActive && styleOnIsActive}`
      }
    >
      {icon({ fill: 'currentColor', className: '' })}
      <span className="ml-2.5 tracking-[1px]">{title.toUpperCase()}</span>
    </NavLink>
  );
};
