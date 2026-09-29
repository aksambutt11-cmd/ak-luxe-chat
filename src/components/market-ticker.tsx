import { TrendingUp, TrendingDown, Gauge, Zap } from "lucide-react";

interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
  type?: "crypto" | "gas" | "index";
}

const TICKER_DATA: TickerItem[] = [
  { symbol: "BTC/USD", price: "$98,420.50", change: "+3.4%", isPositive: true },
  { symbol: "ETH/USD", price: "$3,450.20", change: "+1.8%", isPositive: true },
  { symbol: "SOL/USD", price: "$212.80", change: "-0.6%", isPositive: false },
  { symbol: "Gas Fee", price: "12 Gwei", change: "Optimal", isPositive: true, type: "gas" },
  { symbol: "Fear & Greed Index", price: "82", change: "Extreme Greed", isPositive: true, type: "index" },
  { symbol: "BNB/USD", price: "$645.10", change: "+2.1%", isPositive: true },
  { symbol: "AVAX/USD", price: "$34.80", change: "+4.2%", isPositive: true },
];

export function MarketTicker() {
  return (
    <div
      className="market-ticker-banner border-b border-white/[0.12] bg-slate-950/60 backdrop-blur-xl overflow-hidden select-none py-1.5 px-3 z-30"
      aria-label="Live Market Pulse"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-[11px]">
        {/* Left Pulse Tag */}
        <div className="flex items-center gap-2 shrink-0 text-emerald-400 font-semibold pr-3 border-r border-white/10">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="tracking-wider uppercase text-[10px] text-foreground/90 font-bold">
            Live Pulse
          </span>
        </div>

        {/* Marquee items */}
        <div className="ticker-scroll-wrapper relative flex-1 overflow-hidden">
          <div className="ticker-marquee flex items-center gap-7 whitespace-nowrap">
            {[...TICKER_DATA, ...TICKER_DATA].map((item, idx) => (
              <div
                key={`${item.symbol}-${idx}`}
                className="flex items-center gap-2 shrink-0 transition-opacity hover:opacity-100 opacity-90 cursor-default"
              >
                <span className="font-bold text-foreground">{item.symbol}</span>
                <span className="font-mono text-foreground/90">{item.price}</span>
                <span
                  className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                    item.type === "gas"
                      ? "bg-sky-500/15 text-sky-300 border border-sky-500/25"
                      : item.type === "index"
                      ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                      : item.isPositive
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25"
                      : "bg-rose-500/15 text-rose-300 border border-rose-500/25"
                  }`}
                >
                  {item.type === "gas" ? (
                    <Zap className="size-2.5" />
                  ) : item.type === "index" ? (
                    <Gauge className="size-2.5" />
                  ) : item.isPositive ? (
                    <TrendingUp className="size-2.5" />
                  ) : (
                    <TrendingDown className="size-2.5" />
                  )}
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
