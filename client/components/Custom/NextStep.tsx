import * as React from "react";

import { cn } from "@/lib/utils";
import "@/styles/custom/NextStep.css";

export interface ButtonProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const NextStep = React.forwardRef<HTMLButtonElement, ButtonProps>(
   ({ className, type, ...props }, ref) => {
      return (
         <button
            type={type}
            className={cn("cta", className)}
            ref={ref}
            {...props}
         >
            <div className={cn("arrow", className)}>
               <div></div>
            </div>
            <span className="label"> Payment </span>
         </button>
      );
   }
);
NextStep.displayName = "NextStep";

export { NextStep };
