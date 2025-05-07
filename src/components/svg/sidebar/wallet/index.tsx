export const WalletIcon = ({
  width = 16,
  height = 16,
  color = "#5F6C7D",
  ...props
}: {
  width?: number;
  height?: number;
  color?: string;
  key?: string;
}) => {
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
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
    </svg>
  );
};
