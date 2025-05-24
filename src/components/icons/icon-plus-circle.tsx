import { SVGProps } from 'react'

export const PlusCircleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    viewBox="0 0 28 28"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="currentColor"
        d="M18 14a.75.75 0 0 0-.75-.75h-2.5v-2.527a.75.75 0 0 0-1.5 0v2.527h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.501 0v-2.5h2.5a.75.75 0 0 0 .75-.75Z"
      />
    </g>
    <rect
      width={23}
      height={23}
      x={2.5}
      y={2.5}
      stroke="currentColor"
      rx={11.5}
    />
    <defs>
      <clipPath id="a">
        <rect width={24} height={24} x={2} y={2} fill="#fff" rx={12} />
      </clipPath>
    </defs>
  </svg>
)
