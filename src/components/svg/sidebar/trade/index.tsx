interface TradeIconProps {
  width?: number;
  height?: number;
  color?: string;
  key?: string
}

export const TradeIcon = ({
  width = 24,
  height = 24,
  color,
  ...props
}: TradeIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      stroke={color ? color : "#32bd91"}
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-xl text-muted"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line x1="12" x2="12" y1="2" y2="22"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );
};
