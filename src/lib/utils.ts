import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeSessionStorageItem<T>(key: string): T | null {
  try {
    const session = sessionStorage.getItem(key);

    if (session == null) return null;

    return JSON.parse(session);
  } catch {
    return null;
  }
}
