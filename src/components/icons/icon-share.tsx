import { SVGProps } from 'react'

export const ShareIcon = (props: SVGProps<SVGSVGElement>) => (
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
        d="M8 9c.874 0 1.661-.374 2.21-.97l4.922 3.087a3.002 3.002 0 0 0 0 1.766l-4.923 3.088a3 3 0 1 0 .708 1.327l5.001-3.138a3 3 0 1 0 0-4.32l-5-3.137A3 3 0 1 0 8 9Zm0-1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM19.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)
