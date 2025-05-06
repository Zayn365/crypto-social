export const BuyTokenIcon = ({
  width = 16,
  height = 16,
  color,
  ...props
}: any) => {
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
      className="text-muted"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="8" cy="8" r="6"></circle>
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path>
      <path d="M7 6h1v4"></path>
      <path d="m16.71 13.88.7.71-2.82 2.82"></path>
    </svg>
  );
};
