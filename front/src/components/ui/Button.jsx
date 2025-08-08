import React from "react";
import { cn } from "../../utils/cn";

const Button = React.forwardRef(
  (
    { className, variant = "primary", size = "default", children, ...props },
    ref
  ) => {
    const variants = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      icon: "bg-surface-light dark:bg-surface-dark rounded-full p-3 w-12 h-12 hover:bg-surface-light-secondary dark:hover:bg-surface-dark-secondary",
    };

    const sizes = {
      default: "px-6 py-4",
      sm: "px-4 py-2 text-body-small",
      lg: "px-8 py-5 text-body-large",
      icon: "p-3",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-medium font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          size !== "icon" && sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
