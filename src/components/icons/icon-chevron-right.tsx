import { SVGProps } from 'react'

export const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 16 17"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.22 3.714a.767.767 0 0 1 1.063 0l4.497 4.269a.717.717 0 0 1 0 1.034l-4.497 4.269a.767.767 0 0 1-1.063 0 .717.717 0 0 1 0-1.034L9.185 8.5 5.22 4.748a.717.717 0 0 1 0-1.034Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <rect x={0} y={0} width={16} height={17} fill="white" />
      </clipPath>
    </defs>
  </svg>
)
