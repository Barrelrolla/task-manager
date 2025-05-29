import { SVGIconProps } from "@barrelrolla/react-components-library";

export default function PlusIcon({ strokeWidth = 6, ...rest }: SVGIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...rest}
    >
      <path
        fill="currentColor"
        d="M220 128a4 4 0 0 1-4 4h-84v84a4 4 0 0 1-8 0v-84H40a4 4 0 0 1 0-8h84V40a4 4 0 0 1 8 0v84h84a4 4 0 0 1 4 4"
        strokeWidth={strokeWidth}
        stroke="currentColor"
      ></path>
    </svg>
  );
}
