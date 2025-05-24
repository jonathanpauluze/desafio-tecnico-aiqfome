import { SVGProps } from 'react'

export const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.228 8.235a.816.816 0 0 0 0 1.13l6.222 6.4a.762.762 0 0 0 1.1 0l6.222-6.4a.816.816 0 0 0 0-1.13.763.763 0 0 0-1.1 0L12 14.069 6.328 8.235a.763.763 0 0 0-1.1 0Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
