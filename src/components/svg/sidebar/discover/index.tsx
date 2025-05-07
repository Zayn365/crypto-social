interface DiscoverIconProps {
  width?: number;
  height?: number;
  color?: string;
  key?: string
}

export const DiscoverIcon = ({
  width = 24,
  height = 24,
  color,
  ...props
}: DiscoverIconProps) => {
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
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
      <line x1="9" x2="9" y1="3" y2="18"></line>
      <line x1="15" x2="15" y1="6" y2="21"></line>
    </svg>
  );
};
