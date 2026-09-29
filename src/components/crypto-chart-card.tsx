import { useState } from "react";
import { TrendingUp, BarChart2, Maximize2, Activity } from "lucide-react";

interface CryptoChartCardProps {
  symbol?: string;
  price?: string;
  change24h?: string;
}

export function CryptoChartCard({
  symbol = "BTC/USDT",
  price = "$68,420.00",
  change24h = "+2.84%",
}: CryptoChartCardProps) {
  const [timeframe, setTimeframe] = useState<"1H" | "24H" | "7D" | "1M">("24H");
  const [activePoint, setActivePoint] = useState<number | null>(null);

  // Smooth realistic price points based on selected timeframe
  const dataPoints = {
    "1H": [68120, 68180, 68140, 68250, 68290, 68310, 68420],
    "24H": [66450, 66800, 67100, 66950, 67600, 67900, 68420],
    "7D": [64200, 65100, 64900, 66300, 67200, 67800, 68420],
    "1M": [59800, 61200, 63400, 62900, 65400, 67100, 68420],
  }[timeframe];

  const min = Math.min(...dataPoints);
  const max = Math.max(...dataPoints);
  const range = max - min || 1;

  const width = 360;
  const height = 110;
  const paddingX = 16;
  const paddingY = 14;

  const points = dataPoints.map((val, idx) => {
    const x = paddingX + (idx / (dataPoints.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((val - min) / range) * (height - paddingY * 2);
    return { x, y, val };
  });

  // Build SVG smooth path
  const pathD = points.reduce((acc, curr, idx, arr) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = arr[idx - 1]!;
    const cx = (prev.x + curr.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1]!.x} ${height} L ${points[0]!.x} ${height} Z`;

  return (
    <div className="crypto-chart-card mt-3.5 mb-2 overflow-hidden rounded-2xl border border-white/[0.12] bg-slate-900/60 p-3.5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.24)]">
      {/* Header Info */}
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] pb-2.5">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-xs">
            ₿
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs text-foreground">{symbol}</span>
              <span className="text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                {change24h}
              </span>
            </div>
            <p className="font-mono text-[13px] font-bold text-foreground">
              {activePoint !== null ? `$${dataPoints[activePoint]?.toLocaleString()}.00` : price}
            </p>
          </div>
        </div>

        {/* Timeframe pills */}
        <div className="flex items-center gap-1 rounded-lg bg-white/[0.05] p-1 border border-white/[0.08]">
          {(["1H", "24H", "7D", "1M"] as const).map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => {
                setTimeframe(tf);
                setActivePoint(null);
              }}
              className={`rounded px-1.5 py-0.5 text-[10px] font-medium transition-all ${
                timeframe === tf
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Interactive Line Chart */}
      <div className="relative mt-2 h-[115px] w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="size-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="85%" stopColor="#38bdf8" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path d={areaD} fill="url(#chartGradient)" />

          {/* Stroke path */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Interactive Points */}
          {points.map((pt, idx) => (
            <g
              key={idx}
              className="cursor-pointer group"
              onMouseEnter={() => setActivePoint(idx)}
              onMouseLeave={() => setActivePoint(null)}
            >
              <circle
                cx={pt.x}
                cy={pt.y}
                r={activePoint === idx ? 5 : 3}
                className={`transition-all duration-200 ${
                  activePoint === idx
                    ? "fill-white stroke-sky-400 stroke-2 filter drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                    : "fill-sky-400 opacity-60 group-hover:opacity-100"
                }`}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Footer Quick Metrics */}
      <div className="mt-2 grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-2 text-[10px] text-muted-foreground">
        <div>
          <span>24h High: </span>
          <span className="font-mono text-foreground font-medium">$68,910</span>
        </div>
        <div className="text-center">
          <span>24h Low: </span>
          <span className="font-mono text-foreground font-medium">$66,240</span>
        </div>
        <div className="text-right">
          <span>24h Vol: </span>
          <span className="font-mono text-foreground font-medium">$28.4B</span>
        </div>
      </div>
    </div>
  );
}
