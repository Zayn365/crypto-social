"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const COLORS = [
  "#000000",
  "#ffffff",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#00ffff",
  "#ff00ff",
  "#ff9900",
  "#9900ff",
  "#0099ff",
  "#ff0099",
  "#99ff00",
  "#00ff99",
  "#ff6600",
  "#6666ff",
  "#66ff66",
  "#ff6666",
  "#3366ff",
  "#33ff66",
];

interface ColorPickerProps {
  onChange: (color: string) => void;
  currentColor?: string;
}

export function ColorPicker({ onChange, currentColor }: ColorPickerProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {COLORS.map((color) => (
        <Button
          key={color}
          type="button"
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0 rounded-full border",
            currentColor === color && "ring-2 ring-offset-2 ring-primary"
          )}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        />
      ))}
    </div>
  );
}
