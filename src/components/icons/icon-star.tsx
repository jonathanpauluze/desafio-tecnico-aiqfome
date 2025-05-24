import { SVGProps } from 'react'

export const StarIcon = (props: SVGProps<SVGSVGElement>) => (
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
        d="M10.403 3.993c.653-1.324 2.54-1.324 3.194 0l1.866 3.78c.041.082.12.14.212.153l.01.002 3.795.605a1.78 1.78 0 0 1 1 3.018l-2.647 2.944-.018.018a.28.28 0 0 0-.08.248l.712 4.155c.25 1.455-1.278 2.564-2.584 1.877l-3.732-1.961a.281.281 0 0 0-.262 0l-3.732 1.961c-1.307.687-2.834-.422-2.585-1.877l.713-4.155a.28.28 0 0 0-.08-.248l-.018-.018-2.648-2.944A1.779 1.779 0 0 1 4.52 8.534l3.805-.608a.281.281 0 0 0 .212-.153l1.866-3.78Z"
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
