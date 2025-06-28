import React from "react";
import clsx from "clsx";

export default function DotsLoader({
  color = "bg-blue-500",
  size = "w-3 h-3",
  count = 3,
}) {
  const delays = ["-0.3s", "-0.15s", "0s"];

  return (
    <div className="flex items-center justify-center space-x-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={clsx(size, color, "rounded-full animate-bounce")}
          style={{
            animationDelay: delays[i] || `${-0.15 + i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
