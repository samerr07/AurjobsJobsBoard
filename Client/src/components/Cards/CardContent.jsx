import * as React from "react"
import { cn } from "@/lib/utils"

const CardContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    className={cn("p-6 pt-0", className)}
    {...props}
    ref={ref}
  >
    {children}
  </div>
))
CardContent.displayName = "CardContent"

export default CardContent;
