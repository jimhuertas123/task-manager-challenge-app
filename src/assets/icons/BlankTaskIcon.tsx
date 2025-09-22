import type { SVGProps } from 'react';

export const BlankTaskIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    fill="none"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>document--blank-empty</title>
    <path
      d="M25.7,9.3l-7-7A.9078.9078,0,0,0,18,2H8A2.0059,2.0059,0,0,0,6,4V28a2.0059,2.0059,0,0,0,2,2H24a2.0059,2.0059,0,0,0,2-2V10A.9078.9078,0,0,0,25.7,9.3ZM18,4.4,23.6,10H18ZM24,28H8V4h8v6a2.0059,2.0059,0,0,0,2,2h6Z"
      stroke={props.stroke}
      strokeWidth={1}
      // fill={props.fill}
    />
    <line
      x1="12"
      y1="16"
      x2="20"
      y2="24"
      stroke={props.fill}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="16"
      x2="12"
      y2="24"
      stroke={props.fill}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);
