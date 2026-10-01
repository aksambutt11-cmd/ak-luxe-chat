import React, { useState, useEffect, useRef } from "react";
import { TickerFlyoutChart, tickerAssetMetadata } from "./ticker-flyout-chart";
import type { AssetSymbol } from "./live-crypto-chart";

interface TickerItem {
  symbol?: AssetSymbol;
  pair: string;
  price: string;
  change: string;
  positive?: boolean;
  labelOnly?: boolean;
  greed?: boolean;
}

const tickerData: TickerItem[] = [
  { symbol: "BTC", pair: "BTC/USD", price: "$93,840.00", change: "+3.42%", positive: true },
  { symbol: "ETH", pair: "ETH/USD", price: "$3,385.20", change: "+4.18%", positive: true },
  { symbol: "SOL", pair: "SOL/USD", price: "$188.40", change: "+8.65%", positive: true },
  { symbol: "BNB", pair: "BNB/USD", price: "$642.50", change: "+1.85%", positive: true },
  { pair: "Gas Fee", price: "14 Gwei", change: "(Optimal)", labelOnly: true },
  { symbol: "XRP", pair: "XRP/USD", price: "$2.420", change: "-1.15%", positive: false },
  { pair: "Fear & Greed", price: "79", change: "Extreme Greed", greed: true },
  { symbol: "SUI", pair: "SUI/USD", price: "$3.450", change: "+12.8%", positive: true },
  { symbol: "AVAX", pair: "AVAX/USD", price: "$38.60", change: "+7.32%", positive: true },
  { symbol: "DOGE", pair: "DOGE/USD", price: "$0.284", change: "+6.91%", positive: true },
  { symbol: "ADA", pair: "ADA/USD", price: "$0.842", change: "+5.24%", positive: true },
  { symbol: "LINK", pair: "LINK/USD", price: "$18.25", change: "+3.12%", positive: true },
  { symbol: "NEAR", pair: "NEAR/USD", price: "$5.80", change: "+4.88%", positive: true },
  { symbol: "DOT", pair: "DOT/USD", price: "$8.20", change: "-0.85%", positive: false },
];

export interface MarketTickerProps {
  onOpenProChart?: (symbol: AssetSymbol) => void;
  onQuickSwap?: (symbol: AssetSymbol) => void;
}

export function MarketTicker({ onOpenProChart, onQuickSwap }: MarketTickerProps) {
  const [selectedAsset, setSelectedAsset] = useState<AssetSymbol | null>(null);
  const flyoutRef = useRef<HTMLDivElement | null>(null);

  // Close flyout on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedAsset(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleAssetClick = (symbol?: AssetSymbol) => {
    if (!symbol) return;
    setSelectedAsset((current) => (current === symbol ? null : symbol));
  };

  const renderTickerItem = (item: TickerItem, keyPrefix: string, index: number) => {
    const isClickable = Boolean(item.symbol);
    const isSelected = selectedAsset === item.symbol;

    return (
      <span
        key={`${keyPrefix}-${index}`}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onClick={() => handleAssetClick(item.symbol)}
        onKeyDown={(e) => {
          if (isClickable && (e.key === "Enter" || e.key === " ")) {
            handleAssetClick(item.symbol);
          }
        }}
        title={isClickable ? `Click to inspect ${item.symbol} real-time mini-chart` : undefined}
        className={`flex items-center gap-1.5 shrink-0 transition-all select-none ${
          isClickable
            ? `cursor-pointer px-2 py-0.5 rounded-xl border ${
                isSelected
                  ? "bg-blue-600/10 border-blue-400 text-blue-900 shadow-xs"
                  : "hover:bg-white/80 hover:border-white/90 border-transparent hover:shadow-2xs active:scale-95"
              }`
            : ""
        }`}
      >
        <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
          {item.symbol && tickerAssetMetadata[item.symbol] && (
            <span className="text-[10px] opacity-75 font-normal">
              {tickerAssetMetadata[item.symbol]!.badge}
            </span>
          )}
          <span>{item.pair}</span>
        </span>
        <span className="font-mono text-slate-800">{item.price}</span>
        {item.labelOnly ? (
          <span className="text-slate-500 text-[10.5px] font-medium">{item.change}</span>
        ) : item.greed ? (
          <span className="text-emerald-700 font-semibold text-[10.5px] bg-amber-400/20 px-1.5 py-0.5 rounded-full border border-amber-300/40">
            {item.change}
          </span>
        ) : (
          <span
            className={`font-semibold text-[10.5px] font-mono px-1.5 py-0.5 rounded-full ${
              item.positive
                ? "text-emerald-600 bg-emerald-500/10 border border-emerald-300/40"
                : "text-rose-500 bg-rose-500/10 border border-rose-300/40"
            }`}
          >
            {item.change}
          </span>
        )}
      </span>
    );
  };

  return (
    <header className="relative z-30 w-full apple-glass border-b border-white/60 py-1.5 px-3 sm:px-4 flex items-center shrink-0">
      {/* Telemetry Indicator Label */}
      <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 pr-3 sm:pr-4 border-r border-slate-300/40 shrink-0 z-10 bg-white/40 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="hidden sm:inline">Telemetry</span>
      </div>

      {/* Marquee Ticker Track */}
      <div className="overflow-hidden w-full relative">
        <div
          className={`ticker-marquee-track flex gap-6 sm:gap-8 text-xs font-medium text-slate-700 items-center ${
            selectedAsset ? "[animation-play-state:paused]" : "hover:[animation-play-state:paused]"
          }`}
        >
          {tickerData.map((item, index) => renderTickerItem(item, "t1", index))}
          {tickerData.map((item, index) => renderTickerItem(item, "t2", index))}
        </div>
      </div>

      {/* Real-Time Mini-Chart Recharts Flyout Detail Modal / Popover */}
      {selectedAsset && (
        <>
          {/* Subtle click-outside backdrop */}
          <div
            className="fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-[2px]"
            onClick={() => setSelectedAsset(null)}
            aria-hidden="true"
          />

          {/* Floating Detail Card anchored under the Ticker Header */}
          <div
            ref={flyoutRef}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 px-2 w-full max-w-[430px]"
          >
            <TickerFlyoutChart
              symbol={selectedAsset}
              onClose={() => setSelectedAsset(null)}
              onOpenProChart={onOpenProChart}
              onQuickSwap={onQuickSwap}
            />
          </div>
        </>
      )}
    </header>
  );
}
