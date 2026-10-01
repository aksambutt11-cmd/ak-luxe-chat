import React, { useEffect, useState, useId } from "react";
import { TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

export interface CryptoMarketItem {
  id: "BTC" | "ETH" | "SOL" | "BNB" | "XRP";
  symbol: string;
  name: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  basePrice: number;
  decimals: number;
  change24h: number;
  points: number[];
}

const initialMarketData: CryptoMarketItem[] = [
  {
    id: "BTC",
    symbol: "BTC",
    name: "Bitcoin",
    badge: "₿",
    badgeBg: "bg-amber-500/15",
    badgeText: "text-amber-600",
    badgeBorder: "border-amber-300/80",
    basePrice: 93840.0,
    decimals: 2,
    change24h: 3.42,
    points: [91200, 91800, 91500, 92400, 92100, 92900, 92600, 93400, 93100, 93840],
  },
  {
    id: "ETH",
    symbol: "ETH",
    name: "Ethereum",
    badge: "Ξ",
    badgeBg: "bg-indigo-500/15",
    badgeText: "text-indigo-600",
    badgeBorder: "border-indigo-300/80",
    basePrice: 3385.2,
    decimals: 2,
    change24h: 4.18,
    points: [3240, 3260, 3250, 3310, 3290, 3340, 3320, 3370, 3350, 3385],
  },
  {
    id: "SOL",
    symbol: "SOL",
    name: "Solana",
    badge: "◎",
    badgeBg: "bg-emerald-500/15",
    badgeText: "text-emerald-600",
    badgeBorder: "border-emerald-300/60",
    basePrice: 188.4,
    decimals: 2,
    change24h: 8.65,
    points: [173, 175, 174, 178, 177, 182, 180, 185, 184, 188.4],
  },
  {
    id: "BNB",
    symbol: "BNB",
    name: "BNB",
    badge: "Ⓑ",
    badgeBg: "bg-amber-400/15",
    badgeText: "text-amber-500",
    badgeBorder: "border-amber-300/70",
    basePrice: 642.5,
    decimals: 2,
    change24h: 1.85,
    points: [630, 632, 631, 635, 634, 638, 636, 640, 639, 642.5],
  },
  {
    id: "XRP",
    symbol: "XRP",
    name: "Ripple",
    badge: "✕",
    badgeBg: "bg-sky-500/15",
    badgeText: "text-sky-600",
    badgeBorder: "border-sky-300/80",
    basePrice: 2.42,
    decimals: 4,
    change24h: -1.15,
    points: [2.49, 2.48, 2.47, 2.46, 2.47, 2.45, 2.44, 2.43, 2.44, 2.42],
  },
];

/**
 * Generates an SVG path with smooth cubic Bézier curves for a sparkline
 */
function createSparklinePaths(
  points: number[],
  width: number,
  height: number,
  padding: number = 2
) {
  if (points.length < 2) return { linePath: "", areaPath: "", lastX: 0, lastY: 0 };

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const innerW = width - padding * 2;
  const innerH = height - padding * 2;

  const coords = points.map((p, i) => {
    const x = padding + (i / (points.length - 1)) * innerW;
    const y = padding + innerH - ((p - min) / range) * innerH;
    return { x, y };
  });

  // Build smooth bezier line
  let linePath = `M ${coords[0]!.x.toFixed(1)} ${coords[0]!.y.toFixed(1)}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const current = coords[i]!;
    const next = coords[i + 1]!;
    const cpX1 = current.x + (next.x - current.x) * 0.45;
    const cpY1 = current.y;
    const cpX2 = next.x - (next.x - current.x) * 0.45;
    const cpY2 = next.y;
    linePath += ` C ${cpX1.toFixed(1)} ${cpY1.toFixed(1)}, ${cpX2.toFixed(1)} ${cpY2.toFixed(1)}, ${next.x.toFixed(1)} ${next.y.toFixed(1)}`;
  }

  const last = coords[coords.length - 1]!;
  const first = coords[0]!;

  // Area path closes at bottom
  const areaPath = `${linePath} L ${last.x.toFixed(1)} ${(height).toFixed(1)} L ${first.x.toFixed(1)} ${(height).toFixed(1)} Z`;

  return { linePath, areaPath, lastX: last.x, lastY: last.y };
}

interface SparklineProps {
  points: number[];
  isPositive: boolean;
  width?: number;
  height?: number;
}

function MiniSparkline({
  points,
  isPositive,
  width = 62,
  height = 24,
}: SparklineProps) {
  const rawId = useId();
  const gradId = `spark-grad-${rawId.replace(/:/g, "")}`;
  const strokeColor = isPositive ? "#10b981" : "#f43f5e";
  const fillColorTop = isPositive ? "rgba(16, 185, 129, 0.3)" : "rgba(244, 63, 94, 0.3)";

  const { linePath, areaPath, lastX, lastY } = createSparklinePaths(points, width, height, 3);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className="overflow-visible shrink-0"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillColorTop} />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </linearGradient>
      </defs>

      {/* Area fill */}
      <path d={areaPath} fill={`url(#${gradId})`} />

      {/* Main sparkline curve */}
      <path
        d={linePath}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Trailing live pulse beacon */}
      <circle
        cx={lastX}
        cy={lastY}
        r="2.2"
        fill={strokeColor}
        className="animate-pulse"
      />
      <circle
        cx={lastX}
        cy={lastY}
        r="4.5"
        fill="none"
        stroke={strokeColor}
        strokeWidth="0.8"
        opacity="0.5"
      />
    </svg>
  );
}

export interface MarketSnapshotProps {
  onSelectAsset?: (asset: "BTC" | "ETH" | "SOL" | "BNB" | "XRP") => void;
  className?: string;
}

export function MarketSnapshot({ onSelectAsset, className = "" }: MarketSnapshotProps) {
  const [marketItems, setMarketItems] = useState<CryptoMarketItem[]>(initialMarketData);
  const [tickFlash, setTickFlash] = useState<Record<string, "up" | "down" | null>>({});

  // Real-time subtle live price simulation for the top 5 cryptocurrencies
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly pick one or two assets to tick
      const targetIndices = [
        Math.floor(Math.random() * marketItems.length),
        Math.floor(Math.random() * marketItems.length),
      ];

      setMarketItems((prev) =>
        prev.map((item, idx) => {
          if (!targetIndices.includes(idx)) return item;

          // Micro volatility swing (±0.08% to ±0.2%)
          const pctDelta = (Math.random() - 0.48) * 0.003;
          const deltaPrice = item.basePrice * pctDelta;
          const nextPrice = Math.max(item.basePrice * 0.5, item.basePrice + deltaPrice);
          const nextChange = item.change24h + (pctDelta > 0 ? 0.02 : -0.02);

          // Update sparkline points array (keep last 10 points)
          const nextPoints = [...item.points.slice(1), nextPrice];

          // Flash trigger
          setTickFlash((f) => ({
            ...f,
            [item.id]: deltaPrice >= 0 ? "up" : "down",
          }));

          setTimeout(() => {
            setTickFlash((f) => ({ ...f, [item.id]: null }));
          }, 800);

          return {
            ...item,
            basePrice: nextPrice,
            change24h: Number(nextChange.toFixed(2)),
            points: nextPoints,
          };
        })
      );
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`rounded-2xl p-3 bg-white/50 backdrop-blur-2xl border border-white/90 shadow-[0_4px_16px_rgba(255,255,255,0.4)] space-y-2.5 select-none ${className}`}
    >
      {/* Header with Title and Live Badge */}
      <div className="flex items-center justify-between px-0.5">
        <span className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-blue-600" /> Market Snapshot
        </span>
        <span className="text-[9px] text-emerald-700 font-extrabold bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-300/60 shadow-2xs flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live 24h
        </span>
      </div>

      {/* Top 5 Cryptocurrencies with Simplified Sparklines */}
      <div className="space-y-1.5">
        {marketItems.map((item) => {
          const isPositive = item.change24h >= 0;
          const flash = tickFlash[item.id];
          const formattedPrice = item.basePrice >= 100
            ? `$${item.basePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            : `$${item.basePrice.toFixed(item.decimals)}`;

          return (
            <div
              key={item.id}
              onClick={() => onSelectAsset?.(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSelectAsset?.(item.id);
                }
              }}
              title={`View ${item.name} (${item.symbol}) live chart telemetry`}
              className="group/row flex items-center justify-between gap-1.5 p-2 rounded-xl bg-white/45 hover:bg-white/90 border border-white/70 hover:border-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-xs transition-all duration-200 cursor-pointer hover:scale-[1.015] active:scale-[0.98]"
            >
              {/* Asset Identity */}
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`w-6 h-6 rounded-lg ${item.badgeBg} border ${item.badgeBorder} flex items-center justify-center font-extrabold ${item.badgeText} text-xs shadow-2xs shrink-0 group-hover/row:scale-105 transition-transform`}
                >
                  {item.badge}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold text-slate-900 text-xs leading-none">
                      {item.symbol}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium truncate block leading-tight mt-0.5">
                    {item.name}
                  </span>
                </div>
              </div>

              {/* Simplified Sparkline Chart */}
              <div className="px-1 flex items-center justify-center">
                <MiniSparkline
                  points={item.points}
                  isPositive={isPositive}
                  width={56}
                  height={22}
                />
              </div>

              {/* Price & 24h Change */}
              <div className="text-right shrink-0">
                <div
                  className={`font-mono font-bold text-xs leading-none transition-colors duration-300 ${
                    flash === "up"
                      ? "text-emerald-600"
                      : flash === "down"
                      ? "text-rose-600"
                      : "text-slate-900"
                  }`}
                >
                  {formattedPrice}
                </div>
                <div
                  className={`text-[9.5px] font-mono font-extrabold flex items-center justify-end gap-0.5 mt-0.5 ${
                    isPositive ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {isPositive ? (
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  ) : (
                    <ArrowDownRight className="w-2.5 h-2.5" />
                  )}
                  <span>
                    {isPositive ? "+" : ""}
                    {item.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
