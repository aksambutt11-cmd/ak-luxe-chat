import React from "react";

export interface UserBubbleProps {
  content: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Apple-style Glassmorphic Premium User Bubble from Gemini Shared Artifact.
 *
 * Specifications:
 * - Background: linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(240, 243, 250, 0.6) 100%)
 * - Backdrop filter: blur(30px) saturate(210%)
 * - Border: 1px solid rgba(255, 255, 255, 0.85)
 * - Text: Deep charcoal/black (#0F172A) for high contrast readability
 * - Shadow: 0 10px 28px -5px rgba(0, 0, 0, 0.1), inset 0 1.5px 0.5px rgba(255, 255, 255, 0.95)
 * - Border radius: 18px
 */
export function UserBubble({ content, className = "", children }: UserBubbleProps) {
  return (
    <div
      className={`user-glass-bubble group relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(240, 243, 250, 0.6) 100%)",
        backdropFilter: "blur(30px) saturate(210%)",
        WebkitBackdropFilter: "blur(30px) saturate(210%)",
        border: "1px solid rgba(255, 255, 255, 0.85)",
        boxShadow: "0 10px 28px -5px rgba(0, 0, 0, 0.1), inset 0 1.5px 0.5px rgba(255, 255, 255, 0.95)",
        borderRadius: "18px",
        color: "#0F172A",
      }}
    >
      {/* Specular top light reflex */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90"
        aria-hidden="true"
      />
      <div className="relative z-10">
        <p className="whitespace-pre-wrap text-[15px] leading-relaxed font-semibold tracking-[-0.01em] text-[#0F172A] selection:bg-slate-300">
          {content}
        </p>
        {children}
      </div>
    </div>
  );
}
