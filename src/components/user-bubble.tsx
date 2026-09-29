import React from "react";

export interface UserBubbleProps {
  content: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Apple-style Glassmorphic Premium User Bubble.
 *
 * Specifications:
 * - Background: Semi-transparent frosted glass (rgba(255, 255, 255, 0.52))
 * - Backdrop filter: blur(20px) saturate(180%)
 * - Border: 1px solid rgba(255, 255, 255, 0.65)
 * - Text: Deep charcoal/black (#0F172A) for high contrast readability
 * - Shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.08)
 * - Border radius: 18px
 */
export function UserBubble({ content, className = "", children }: UserBubbleProps) {
  return (
    <div
      className={`user-bubble-glass group relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.52)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.65)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.85)",
        borderRadius: "18px",
        color: "#0F172A",
      }}
    >
      {/* Subtle top specular glass reflection */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10">
        <p className="whitespace-pre-wrap text-[15px] leading-relaxed font-medium tracking-[-0.01em] text-[#0F172A] selection:bg-slate-200">
          {content}
        </p>
        {children}
      </div>
    </div>
  );
}
