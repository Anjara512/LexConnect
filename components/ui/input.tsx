"use client"
import * as React from "react";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const { theme } = useTheme()
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground  text-white focus:ring-blue-500 focus:outline-none selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className, {
        "text-zinc-800": theme !== "dark"
      }
      )}
      {...props}
    />
  );
}

export { Input };
