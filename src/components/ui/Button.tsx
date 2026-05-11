"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", loading, icon, children, disabled, ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-white text-black hover:bg-gray-100 active:scale-[0.97]",
      secondary:
        "bg-navy-800 text-white hover:bg-navy-700 active:scale-[0.97]",
      gold:
        "gold-gradient-bg text-white hover:opacity-90 active:scale-[0.97]",
      outline:
        "border border-white/20 text-white hover:bg-white/5 active:scale-[0.97]",
      ghost: "text-white/70 hover:text-white hover:bg-white/5",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs gap-1.5 rounded",
      md: "h-11 px-6 text-sm gap-2 rounded-md",
      lg: "h-14 px-8 text-base gap-2.5 rounded-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || loading}
        {...(props as any)}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
