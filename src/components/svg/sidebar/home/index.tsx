export const HomeIcon = ({ width = 16, height = 16, color, ...props }: any) => {
  return (
    <svg
      width={width}
      height={height}
      stroke={color ? color : "#5F6C7D"}
      fill="none"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="text-xl text-muted"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
};
