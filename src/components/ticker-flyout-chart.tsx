import React, { useState, useEffect, useId, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  X,
  Maximize2,
  ArrowRightLeft,
  Activity,
  Layers,
} from "lucide-react";
import type { AssetSymbol } from "./live-crypto-chart";

export interface TickerAssetDetail {
  symbol: AssetSymbol;
  pair: string;
  name: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  basePrice: number;
  decimals: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: string;
  marketCap: string;
  sector: string;
}

export const tickerAssetMetadata: Record<string, TickerAssetDetail> = {
  BTC: {
    symbol: "BTC",
    pair: "BTC/USD",
    name: "Bitcoin",
    badge: "₿",
    badgeBg: "bg-amber-500/15",
    badgeText: "text-amber-600",
    badgeBorder: "border-amber-300/80",
    basePrice: 93840.0,
    decimals: 2,
    change24h: 3.42,
    high24h: 94820.0,
    low24h: 91450.0,
    volume24h: "$38.4B",
    marketCap: "$1.85T",
    sector: "Digital Gold / PoW",
  },
  ETH: {
    symbol: "ETH",
    pair: "ETH/USD",
    name: "Ethereum",
    badge: "Ξ",
    badgeBg: "bg-indigo-500/15",
    badgeText: "text-indigo-600",
    badgeBorder: "border-indigo-300/80",
    basePrice: 3385.2,
    decimals: 2,
    change24h: 4.18,
    high24h: 3490.0,
    low24h: 3310.0,
    volume24h: "$21.6B",
    marketCap: "$408B",
    sector: "Smart Contracts L1",
  },
  SOL: {
    symbol: "SOL",
    pair: "SOL/USD",
    name: "Solana",
    badge: "◎",
    badgeBg: "bg-emerald-500/15",
    badgeText: "text-emerald-600",
    badgeBorder: "border-emerald-300/60",
    basePrice: 188.4,
    decimals: 2,
    change24h: 8.65,
    high24h: 198.5,
    low24h: 179.2,
    volume24h: "$6.8B",
    marketCap: "$89.5B",
    sector: "High-TPS Monolithic",
  },
  BNB: {
    symbol: "BNB",
    pair: "BNB/USD",
    name: "BNB Chain",
    badge: "Ⓑ",
    badgeBg: "bg-yellow-400/15",
    badgeText: "text-yellow-600",
    badgeBorder: "border-yellow-300/70",
    basePrice: 642.5,
    decimals: 2,
    change24h: 1.85,
    high24h: 648.0,
    low24h: 631.2,
    volume24h: "$1.9B",
    marketCap: "$93.2B",
    sector: "Binance Ecosystem",
  },
  XRP: {
    symbol: "XRP",
    pair: "XRP/USD",
    name: "Ripple",
    badge: "✕",
    badgeBg: "bg-sky-500/15",
    badgeText: "text-sky-600",
    badgeBorder: "border-sky-300/80",
    basePrice: 2.42,
    decimals: 4,
    change24h: -1.15,
    high24h: 2.51,
    low24h: 2.38,
    volume24h: "$8.4B",
    marketCap: "$138.4B",
    sector: "Liquidity & Payments",
  },
  ADA: {
    symbol: "ADA",
    pair: "ADA/USD",
    name: "Cardano",
    badge: "₳",
    badgeBg: "bg-blue-500/15",
    badgeText: "text-blue-600",
    badgeBorder: "border-blue-300/80",
    basePrice: 0.842,
    decimals: 4,
    change24h: 5.24,
    high24h: 0.87,
    low24h: 0.79,
    volume24h: "$1.4B",
    marketCap: "$30.2B",
    sector: "Peer-Reviewed PoS",
  },
  DOGE: {
    symbol: "DOGE",
    pair: "DOGE/USD",
    name: "Dogecoin",
    badge: "Ð",
    badgeBg: "bg-amber-400/20",
    badgeText: "text-amber-700",
    badgeBorder: "border-amber-300/90",
    basePrice: 0.284,
    decimals: 4,
    change24h: 6.91,
    high24h: 0.298,
    low24h: 0.262,
    volume24h: "$3.2B",
    marketCap: "$41.5B",
    sector: "P2P Meme Currency",
  },
  AVAX: {
    symbol: "AVAX",
    pair: "AVAX/USD",
    name: "Avalanche",
    badge: "🔺",
    badgeBg: "bg-rose-500/15",
    badgeText: "text-rose-600",
    badgeBorder: "border-rose-300/80",
    basePrice: 38.6,
    decimals: 2,
    change24h: 7.32,
    high24h: 39.8,
    low24h: 35.4,
    volume24h: "$920M",
    marketCap: "$15.8B",
    sector: "Subnets / Fast Finality",
  },
  LINK: {
    symbol: "LINK",
    pair: "LINK/USD",
    name: "Chainlink",
    badge: "⬡",
    badgeBg: "bg-blue-600/15",
    badgeText: "text-blue-700",
    badgeBorder: "border-blue-400/80",
    basePrice: 18.25,
    decimals: 2,
    change24h: 3.12,
    high24h: 18.9,
    low24h: 17.4,
    volume24h: "$640M",
    marketCap: "$11.2B",
    sector: "Oracles & CCIP RWA",
  },
  SUI: {
    symbol: "SUI",
    pair: "SUI/USD",
    name: "Sui",
    badge: "💧",
    badgeBg: "bg-cyan-500/15",
    badgeText: "text-cyan-600",
    badgeBorder: "border-cyan-300/80",
    basePrice: 3.45,
    decimals: 4,
    change24h: 12.8,
    high24h: 3.62,
    low24h: 3.05,
    volume24h: "$1.8B",
    marketCap: "$10.1B",
    sector: "Move Object Execution",
  },
  NEAR: {
    symbol: "NEAR",
    pair: "NEAR/USD",
    name: "NEAR Protocol",
    badge: "Ⓝ",
    badgeBg: "bg-emerald-600/15",
    badgeText: "text-emerald-700",
    badgeBorder: "border-emerald-300/80",
    basePrice: 5.8,
    decimals: 2,
    change24h: 4.88,
    high24h: 5.95,
    low24h: 5.45,
    volume24h: "$510M",
    marketCap: "$7.1B",
    sector: "User-Owned AI / Sharded",
  },
  DOT: {
    symbol: "DOT",
    pair: "DOT/USD",
    name: "Polkadot",
    badge: "●",
    badgeBg: "bg-pink-500/15",
    badgeText: "text-pink-600",
    badgeBorder: "border-pink-300/80",
    basePrice: 8.2,
    decimals: 2,
    change24h: -0.85,
    high24h: 8.45,
    low24h: 8.12,
    volume24h: "$380M",
    marketCap: "$12.0B",
    sector: "Cross-Chain Parachains",
  },
};

type TimeframeOption = "1H" | "24H" | "7D" | "30D";

interface ChartPoint {
  time: string;
  price: number;
}

interface TickerFlyoutChartProps {
  symbol: AssetSymbol;
  onClose: () => void;
  onOpenProChart?: (symbol: AssetSymbol) => void;
  onQuickSwap?: (symbol: AssetSymbol) => void;
}

export function TickerFlyoutChart({
  symbol,
  onClose,
  onOpenProChart,
  onQuickSwap,
}: TickerFlyoutChartProps) {
  const meta = tickerAssetMetadata[symbol] || tickerAssetMetadata.BTC!;
  const [timeframe, setTimeframe] = useState<TimeframeOption>("24H");
  const [currentPrice, setCurrentPrice] = useState<number>(meta.basePrice);
  const [priceFlash, setPriceFlash] = useState<"up" | "down" | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);

  const rawId = useId();
  const gradientId = `recharts-grad-${rawId.replace(/:/g, "")}`;

  // Generate realistic historical points for selected timeframe
  useEffect(() => {
    const pointsCount = timeframe === "1H" ? 14 : timeframe === "24H" ? 24 : timeframe === "7D" ? 28 : 30;
    const now = Date.now();
    const intervalMs =
      timeframe === "1H"
        ? (60 * 60 * 1000) / pointsCount
        : timeframe === "24H"
        ? (24 * 3600 * 1000) / pointsCount
        : timeframe === "7D"
        ? (7 * 24 * 3600 * 1000) / pointsCount
        : (30 * 24 * 3600 * 1000) / pointsCount;

    const volatility = meta.basePrice * 0.008;
    let price = meta.basePrice * (timeframe === "30D" ? 0.88 : timeframe === "7D" ? 0.94 : 0.98);
    const data: ChartPoint[] = [];

    for (let i = pointsCount; i >= 0; i--) {
      const t = new Date(now - i * intervalMs);
      const timeLabel =
        timeframe === "1H" || timeframe === "24H"
          ? `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`
          : `${t.getMonth() + 1}/${t.getDate()}`;

      const delta = (Math.random() - 0.47) * volatility;
      price = Math.max(meta.basePrice * 0.5, price + delta);
      data.push({
        time: timeLabel,
        price: Number(price.toFixed(meta.decimals)),
      });
    }

    setChartData(data);
    setCurrentPrice(price);
  }, [symbol, timeframe, meta]);

  // Real-time micro-ticks appending/updating the latest price point (every 1.6s)
  useEffect(() => {
    const tickInterval = setInterval(() => {
      const delta = (Math.random() - 0.48) * (meta.basePrice * 0.0018);
      setCurrentPrice((prev) => {
        const next = Math.max(meta.basePrice * 0.4, Number((prev + delta).toFixed(meta.decimals)));
        setPriceFlash(delta >= 0 ? "up" : "down");
        setTimeout(() => setPriceFlash(null), 600);

        setChartData((prevData) => {
          if (prevData.length === 0) return prevData;
          const copy = [...prevData];
          const last = copy[copy.length - 1]!;
          copy[copy.length - 1] = { ...last, price: next };
          return copy;
        });

        return next;
      });
    }, 1600);

    return () => clearInterval(tickInterval);
  }, [meta]);

  const isPositive = meta.change24h >= 0;
  const strokeColor = isPositive ? "#10b981" : "#f43f5e";
  const fillColor = isPositive ? "rgba(16, 185, 129, 0.25)" : "rgba(244, 63, 94, 0.25)";

  const formattedPrice =
    currentPrice >= 100
      ? `$${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : `$${currentPrice.toFixed(meta.decimals)}`;

  return (
    <div
      role="dialog"
      aria-label={`${meta.name} real-time mini chart flyout`}
      className="w-full max-w-[420px] bg-white/90 backdrop-blur-2xl rounded-3xl border border-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-4 space-y-3.5 animate-in fade-in zoom-in-95 duration-200 select-none text-slate-800 relative z-50"
    >
      {/* Header with Asset Badge, Title, Live Status & Close */}
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-8 h-8 rounded-xl ${meta.badgeBg} border ${meta.badgeBorder} flex items-center justify-center font-extrabold ${meta.badgeText} text-sm shadow-2xs shrink-0`}
          >
            {meta.badge}
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-extrabold text-slate-900 text-sm leading-none">
                {meta.name}
              </h4>
              <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200/80">
                {meta.pair}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium leading-none block mt-1">
              {meta.sector}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-300/60 flex items-center gap-1 shadow-2xs mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
          <button
            type="button"
            onClick={onClose}
            className="apple-glass-interactive p-1.5 rounded-xl text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
            title="Close flyout"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real-time Price & Timeframe Filter Pills */}
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <div
            className={`text-2xl font-mono font-extrabold leading-none transition-colors duration-200 ${
              priceFlash === "up"
                ? "text-emerald-600"
                : priceFlash === "down"
                ? "text-rose-600"
                : "text-slate-900"
            }`}
          >
            {formattedPrice}
          </div>
          <div
            className={`text-xs font-mono font-bold flex items-center gap-1 mt-1 ${
              isPositive ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>
              {isPositive ? "+" : ""}
              {meta.change24h.toFixed(2)}% (24h)
            </span>
          </div>
        </div>

        {/* Timeframe Selector Pills */}
        <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-xl border border-slate-300/40 text-[11px]">
          {(["1H", "24H", "7D", "30D"] as const).map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                timeframe === tf
                  ? "bg-white text-blue-700 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Real-Time Mini-Chart Using Recharts */}
      <div className="w-full h-36 bg-slate-950/5 rounded-2xl p-1.5 border border-slate-200/60 shadow-inner relative overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 6, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.4} />
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tick={{ fontSize: 9, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={["auto", "auto"]}
              tick={{ fontSize: 9, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(val: number) =>
                val >= 1000
                  ? `$${(val / 1000).toFixed(1)}k`
                  : val < 1
                  ? `$${val.toFixed(2)}`
                  : `$${Math.round(val)}`
              }
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const dataPoint = payload[0]!.payload as ChartPoint;
                  return (
                    <div className="bg-slate-900/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-700 text-white shadow-lg text-[10px] font-mono">
                      <div className="text-slate-400">{dataPoint.time}</div>
                      <div className="font-extrabold text-blue-400 text-xs">
                        $
                        {dataPoint.price >= 100
                          ? dataPoint.price.toLocaleString(undefined, { minimumFractionDigits: 2 })
                          : dataPoint.price.toFixed(meta.decimals)}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={strokeColor}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#${gradientId})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Key Market Metrics 4-Box Grid */}
      <div className="grid grid-cols-4 gap-1.5 text-center">
        <div className="p-2 rounded-xl bg-white/60 border border-slate-200/50">
          <div className="text-[9.5px] uppercase font-bold text-slate-400">24h High</div>
          <div className="text-[11px] font-mono font-extrabold text-slate-800 mt-0.5 truncate">
            ${meta.high24h >= 100 ? meta.high24h.toLocaleString() : meta.high24h.toFixed(meta.decimals)}
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white/60 border border-slate-200/50">
          <div className="text-[9.5px] uppercase font-bold text-slate-400">24h Low</div>
          <div className="text-[11px] font-mono font-extrabold text-slate-800 mt-0.5 truncate">
            ${meta.low24h >= 100 ? meta.low24h.toLocaleString() : meta.low24h.toFixed(meta.decimals)}
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white/60 border border-slate-200/50">
          <div className="text-[9.5px] uppercase font-bold text-slate-400">Volume</div>
          <div className="text-[11px] font-mono font-extrabold text-slate-800 mt-0.5 truncate">
            {meta.volume24h}
          </div>
        </div>
        <div className="p-2 rounded-xl bg-white/60 border border-slate-200/50">
          <div className="text-[9.5px] uppercase font-bold text-slate-400">Mkt Cap</div>
          <div className="text-[11px] font-mono font-extrabold text-slate-800 mt-0.5 truncate">
            {meta.marketCap}
          </div>
        </div>
      </div>

      {/* Action Buttons: Open Pro Chart & Quick Swap */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => {
            onOpenProChart?.(meta.symbol);
            onClose();
          }}
          className="flex-1 btn-glass-getstarted py-2 px-3 rounded-xl text-xs font-bold text-white shadow-md flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Full Pro Chart</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onQuickSwap?.(meta.symbol);
            onClose();
          }}
          className="apple-glass-interactive py-2 px-3 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-200/80 flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-blue-600" />
          <span>Swap</span>
        </button>
      </div>
    </div>
  );
}
