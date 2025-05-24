import { SVGProps } from 'react'

export const MinusCircleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    viewBox="0 0 28 28"
    fill="none"
    {...props}
  >
    <rect width={24} height={24} x={2} y={2} stroke="currentColor" rx={12} />

    <g clipPath="url(#a)">
      <path
        fill="currentColor"
        d="M18 14a.75.75 0 0 1-.75.75h-6.5a.75.75 0 1 1 0-1.5h6.5A.75.75 0 0 1 18 14Z"
      />
    </g>

    <defs>
      <clipPath id="a">
        <rect width={24} height={24} x={2} y={2} rx={12} fill="#fff" />
      </clipPath>
    </defs>
  </svg>
)
