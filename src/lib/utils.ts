import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function jsonParse(data: string, defaultValue: unknown = null) {
  try {
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.warn(error);
    return defaultValue;
  }
}
