import React from "react";

const tickerData = [
  { pair: "BTC/USD", price: "$98,420.50", change: "+3.4%", positive: true },
  { pair: "ETH/USD", price: "$3,450.20", change: "+1.8%", positive: true },
  { pair: "SOL/USD", price: "$212.80", change: "-0.6%", positive: false },
  { pair: "Gas Fee", price: "12 Gwei", change: "(Optimal)", labelOnly: true },
  { pair: "Fear & Greed", price: "82", change: "Extreme Greed", greed: true },
  { pair: "BNB/USD", price: "$645.10", change: "+2.1%", positive: true },
  { pair: "AVAX/USD", price: "$38.90", change: "+4.2%", positive: true },
  { pair: "SUI/USD", price: "$3.45", change: "+5.6%", positive: true },
];

export function MarketTicker() {
  return (
    <header className="relative z-20 w-full apple-glass border-b border-white/60 py-1.5 px-4 overflow-hidden flex items-center shrink-0">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 pr-4 border-r border-slate-300/40 shrink-0 z-10 bg-white/30 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Telemetry
      </div>
      <div className="overflow-hidden w-full relative">
        <div className="ticker-marquee-track flex gap-8 text-xs font-medium text-slate-700 dark:text-slate-200 items-center">
          {/* First set of items */}
          {tickerData.map((item, index) => (
            <span key={`t1-${index}`} className="flex items-center gap-1.5 shrink-0">
              <span className="font-bold text-slate-900 dark:text-white">{item.pair}</span>{" "}
              {item.price}{" "}
              {item.labelOnly ? (
                <span className="text-slate-500 text-[11px]">{item.change}</span>
              ) : item.greed ? (
                <span className="text-emerald-700 font-semibold text-[11px] bg-amber-400/20 px-1.5 py-0.5 rounded-full">
                  {item.change}
                </span>
              ) : (
                <span
                  className={`font-semibold text-[11px] px-1.5 py-0.5 rounded-full ${
                    item.positive
                      ? "text-emerald-600 bg-emerald-500/10"
                      : "text-rose-500 bg-rose-500/10"
                  }`}
                >
                  {item.change}
                </span>
              )}
            </span>
          ))}
          {/* Duplicate set for 100% seamless gapless loop moving Right -> Left */}
          {tickerData.map((item, index) => (
            <span key={`t2-${index}`} className="flex items-center gap-1.5 shrink-0">
              <span className="font-bold text-slate-900 dark:text-white">{item.pair}</span>{" "}
              {item.price}{" "}
              {item.labelOnly ? (
                <span className="text-slate-500 text-[11px]">{item.change}</span>
              ) : item.greed ? (
                <span className="text-emerald-700 font-semibold text-[11px] bg-amber-400/20 px-1.5 py-0.5 rounded-full">
                  {item.change}
                </span>
              ) : (
                <span
                  className={`font-semibold text-[11px] px-1.5 py-0.5 rounded-full ${
                    item.positive
                      ? "text-emerald-600 bg-emerald-500/10"
                      : "text-rose-500 bg-rose-500/10"
                  }`}
                >
                  {item.change}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
