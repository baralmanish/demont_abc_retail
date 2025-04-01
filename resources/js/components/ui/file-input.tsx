import * as React from "react"

import { cn } from "@/lib/utils"

function FileInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type="file"
      data-slot="input"
      className={cn(
        "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent pr-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "file:mr-2 file:py-1 file:px-3 file:text-foreground file:h-9 file:border-0 file:text-sm file:font-medium dark:file:bg-gray-700 file:bg-gray-300",
        className
      )}
      {...props}
    />
  )
}

export { FileInput }
