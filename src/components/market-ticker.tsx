import { Flame, TrendingUp, TrendingDown, Gauge, Zap } from "lucide-react";

interface TickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  type?: "crypto" | "gas" | "index";
}

const TICKER_DATA: TickerItem[] = [
  { symbol: "BTC", name: "Bitcoin", price: "$68,420", change: "+2.84%", isPositive: true },
  { symbol: "ETH", name: "Ethereum", price: "$3,540", change: "+1.92%", isPositive: true },
  { symbol: "SOL", name: "Solana", price: "$154.60", change: "+5.12%", isPositive: true },
  { symbol: "BNB", name: "BNB", price: "$592.10", change: "-0.45%", isPositive: false },
  { symbol: "AVAX", name: "Avalanche", price: "$30.25", change: "+4.18%", isPositive: true },
  { symbol: "GAS", name: "Ethereum Gas", price: "12 Gwei", change: "Optimal", isPositive: true, type: "gas" },
  { symbol: "F&G", name: "Sentiment", price: "74", change: "Greed", isPositive: true, type: "index" },
];

export function MarketTicker() {
  return (
    <div
      className="market-ticker-banner border-b border-white/[0.08] bg-slate-950/40 backdrop-blur-md overflow-hidden select-none py-1.5 px-3 z-30"
      aria-label="Live Market Pulse"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-[11px]">
        {/* Left Pulse Tag */}
        <div className="flex items-center gap-1.5 shrink-0 text-emerald-400 font-medium">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="tracking-wider uppercase text-[10px] text-muted-foreground font-semibold">
            Market Pulse
          </span>
        </div>

        {/* Scrolling / Marquee items */}
        <div className="ticker-scroll-container flex items-center gap-5 sm:gap-7 overflow-x-auto no-scrollbar py-0.5">
          {TICKER_DATA.map((item, idx) => (
            <div
              key={`${item.symbol}-${idx}`}
              className="flex items-center gap-2 shrink-0 transition-opacity hover:opacity-100 opacity-90 cursor-default"
            >
              <span className="font-semibold text-foreground/90">{item.symbol}</span>
              <span className="font-mono text-foreground/80">{item.price}</span>
              <span
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-medium ${
                  item.type === "gas"
                    ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                    : item.type === "index"
                    ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                    : item.isPositive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
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
  );
}
