import * as React from "react";

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "glass" | "pill" | "subtle" | "glow";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
}

/**
 * Reusable Apple VisionOS Glassmorphic Button.
 *
 * Specifications:
 * - Backdrop blur: blur(12px)
 * - Hover: translateY(-2px), border glow (rgba(255, 255, 255, 0.8)), soft depth expansion
 * - Active: scale(0.97)
 */
export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className = "", variant = "glass", size = "md", children, disabled, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 px-3 text-xs gap-1.5 rounded-full",
      md: "h-9 px-4 text-xs sm:text-[13px] gap-2 rounded-full",
      lg: "h-11 px-5 text-sm gap-2.5 rounded-2xl",
      icon: "size-9 p-0 rounded-full flex items-center justify-center",
    }[size];

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`glass-btn-base ${sizeClasses} ${className}`}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-inherit font-medium">
          {children}
        </span>
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";
