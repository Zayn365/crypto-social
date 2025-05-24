export const ProfileIcon = ({
  width = 16,
  height = 16,
  color = "#32bd91",
  ...props
}: {
  width?: number;
  height?: number;
  color?: string;
  key?: string;
}) => {
  return (
    <svg
      stroke={color ? color : "#32bd91"}
      fill="none"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-xl text-muted"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={12} cy={8} r={5} />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  );
};
