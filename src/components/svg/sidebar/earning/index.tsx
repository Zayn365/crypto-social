export const EarningIcon = ({
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
      className="text-xl text-muted"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line x1="3" x2="21" y1="22" y2="22"></line>
      <line x1="6" x2="6" y1="18" y2="11"></line>
      <line x1="10" x2="10" y1="18" y2="11"></line>
      <line x1="14" x2="14" y1="18" y2="11"></line>
      <line x1="18" x2="18" y1="18" y2="11"></line>
      <polygon points="12 2 20 7 4 7"></polygon>
    </svg>
  );
};
