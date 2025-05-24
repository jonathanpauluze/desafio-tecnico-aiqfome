import { SVGProps } from 'react'

export const PencilIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <g transform="translate(3,3)">
      <path
        fill="currentColor"
        d="M12.861 3.139a1.617 1.617 0 0 0-2.283 0l-7.258 7.26a2.216 2.216 0 0 0-.653 1.574v.916a.445.445 0 0 0 .445.443h.915a2.215 2.215 0 0 0 1.577-.653l7.255-7.256a1.619 1.619 0 0 0 0-2.286l.002.002ZM4.978 12.05c-.251.25-.591.39-.946.392h-.476v-.467a1.333 1.333 0 0 1 .392-.946l5.509-5.506 1.026 1.023-5.505 5.504Zm7.255-7.258-1.121 1.119-1.026-1.024 1.114-1.12a.725.725 0 0 1 1.024 1.027l.009-.002Z"
      />
    </g>
  </svg>
)
