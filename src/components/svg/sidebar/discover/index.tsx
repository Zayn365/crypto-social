interface DiscoverIconProps {
  width?: number;
  height?: number;
  color?: string;
  key?: string
}

export const DiscoverIcon = ({
  color,
  ...props
}: DiscoverIconProps) => {
  return (
    <svg
      width={20}
      height={20}
      stroke={color ? color : "#77F3AF"}
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
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
