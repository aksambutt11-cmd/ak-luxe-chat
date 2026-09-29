import React from "react";

export function MarketTicker() {
  return (
    <header className="relative z-20 w-full apple-glass border-b border-white/60 py-1.5 px-4 overflow-hidden flex items-center shrink-0">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 pr-4 border-r border-slate-300/40 shrink-0 z-10 bg-white/30 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Telemetry
      </div>
      <div className="overflow-hidden w-full relative">
        <div className="animate-marquee flex gap-8 text-xs font-medium text-slate-700 dark:text-slate-200 items-center">
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="font-bold text-slate-900 dark:text-white">BTC/USD</span> $98,420.50{" "}
            <span className="text-emerald-600 font-semibold text-[11px] bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
              +3.4%
            </span>
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="font-bold text-slate-900 dark:text-white">ETH/USD</span> $3,450.20{" "}
            <span className="text-emerald-600 font-semibold text-[11px] bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
              +1.8%
            </span>
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="font-bold text-slate-900 dark:text-white">SOL/USD</span> $212.80{" "}
            <span className="text-rose-500 font-semibold text-[11px] bg-rose-500/10 px-1.5 py-0.5 rounded-full">
              -0.6%
            </span>
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="font-bold text-slate-900 dark:text-white">Gas Fee</span> 12 Gwei{" "}
            <span className="text-slate-500 text-[11px]">(Optimal)</span>
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="font-bold text-slate-900 dark:text-white">Fear & Greed</span> 82{" "}
            <span className="text-emerald-700 font-semibold text-[11px] bg-amber-400/20 px-1.5 py-0.5 rounded-full">
              Extreme Greed
            </span>
          </span>
          {/* Duplicate for seamless loop */}
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="font-bold text-slate-900 dark:text-white">BTC/USD</span> $98,420.50{" "}
            <span className="text-emerald-600 font-semibold text-[11px] bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
              +3.4%
            </span>
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="font-bold text-slate-900 dark:text-white">ETH/USD</span> $3,450.20{" "}
            <span className="text-emerald-600 font-semibold text-[11px] bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
              +1.8%
            </span>
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="font-bold text-slate-900 dark:text-white">SOL/USD</span> $212.80{" "}
            <span className="text-rose-500 font-semibold text-[11px] bg-rose-500/10 px-1.5 py-0.5 rounded-full">
              -0.6%
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}
