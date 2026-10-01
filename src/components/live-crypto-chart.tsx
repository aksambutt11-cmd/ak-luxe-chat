import React, { useEffect, useRef, useState, useMemo } from "react";
import { BarChart3, TrendingUp, Activity, Layers, Crosshair, Zap } from "lucide-react";

export type AssetSymbol = "BTC" | "ETH" | "SOL" | "BNB" | "XRP";
export type Timeframe = "1D" | "1W" | "1M";
export type ChartType = "candlestick" | "area";

interface LiveCryptoChartProps {
  asset: AssetSymbol;
  timeframe: Timeframe;
  onPriceUpdate?: (price: string, change: string) => void;
}

interface Candle {
  time: number;
  timeLabel: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export function LiveCryptoChart({ asset, timeframe, onPriceUpdate }: LiveCryptoChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [chartType, setChartType] = useState<ChartType>("area");
  const [showEMA, setShowEMA] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [hoverData, setHoverData] = useState<{
    candle: Candle | null;
    x: number;
    y: number;
  }>({ candle: null, x: -1, y: -1 });

  // Base starting parameters per asset
  const assetConfig = useMemo(() => {
    switch (asset) {
      case "BTC":
        return {
          basePrice: 93840,
          volatility: 85,
          decimals: 2,
          color: "#f59e0b",
          fillGrad: "rgba(245, 158, 11, 0.25)",
          name: "Bitcoin",
        };
      case "ETH":
        return {
          basePrice: 3385,
          volatility: 5.5,
          decimals: 2,
          color: "#6366f1",
          fillGrad: "rgba(99, 102, 241, 0.25)",
          name: "Ethereum",
        };
      case "SOL":
        return {
          basePrice: 188.4,
          volatility: 0.85,
          decimals: 2,
          color: "#10b981",
          fillGrad: "rgba(16, 185, 129, 0.25)",
          name: "Solana",
        };
      case "BNB":
        return {
          basePrice: 642.5,
          volatility: 1.8,
          decimals: 2,
          color: "#eab308",
          fillGrad: "rgba(234, 179, 8, 0.25)",
          name: "BNB Chain",
        };
      case "XRP":
        return {
          basePrice: 2.42,
          volatility: 0.03,
          decimals: 4,
          color: "#0284c7",
          fillGrad: "rgba(2, 132, 199, 0.25)",
          name: "Ripple",
        };
    }
  }, [asset]);

  // Generate realistic historical candle data
  const candlesRef = useRef<Candle[]>([]);
  const latestPriceRef = useRef<number>(assetConfig.basePrice);
  const [currentLivePrice, setCurrentLivePrice] = useState<number>(assetConfig.basePrice);
  const [priceFlash, setPriceFlash] = useState<"up" | "down" | null>(null);

  // Initialize realistic historical series on asset or timeframe change
  useEffect(() => {
    const count = timeframe === "1D" ? 48 : timeframe === "1W" ? 42 : 36;
    const now = Date.now();
    const intervalMs =
      timeframe === "1D" ? 30 * 60 * 1000 : timeframe === "1W" ? 4 * 3600 * 1000 : 24 * 3600 * 1000;

    let price = assetConfig.basePrice * (timeframe === "1M" ? 0.82 : timeframe === "1W" ? 0.91 : 0.97);
    const generated: Candle[] = [];

    for (let i = count; i >= 0; i--) {
      const t = now - i * intervalMs;
      const date = new Date(t);
      const timeLabel =
        timeframe === "1D"
          ? `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
          : timeframe === "1W"
          ? date.toLocaleDateString("en-US", { weekday: "short", hour: "2-digit" })
          : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

      const drift = (Math.random() - 0.46) * assetConfig.volatility * (timeframe === "1M" ? 2.8 : 1.2);
      const open = price;
      const close = Math.max(price * 0.5, open + drift);
      const high = Math.max(open, close) + Math.random() * assetConfig.volatility * 0.9;
      const low = Math.min(open, close) - Math.random() * assetConfig.volatility * 0.9;
      const volume = Math.floor(Math.random() * 800 + 150);

      generated.push({ time: t, timeLabel, open, high, low, close, volume });
      price = close;
    }

    candlesRef.current = generated;
    latestPriceRef.current = price;
    setCurrentLivePrice(price);
  }, [asset, timeframe, assetConfig]);

  // Realtime Live Micro-Tick Engine (ticks every 750ms)
  useEffect(() => {
    const tickInterval = setInterval(() => {
      if (candlesRef.current.length === 0) return;

      const delta = (Math.random() - 0.48) * (assetConfig.volatility * 0.28);
      const lastCandle = candlesRef.current[candlesRef.current.length - 1]!;

      const newClose = Math.round((lastCandle.close + delta) * 100) / 100;
      lastCandle.close = newClose;
      lastCandle.high = Math.max(lastCandle.high, newClose);
      lastCandle.low = Math.min(lastCandle.low, newClose);
      lastCandle.volume += Math.floor(Math.random() * 8 + 1);

      latestPriceRef.current = newClose;
      setCurrentLivePrice(newClose);
      setPriceFlash(delta >= 0 ? "up" : "down");

      // Clear flash badge after 400ms
      setTimeout(() => setPriceFlash(null), 400);

      if (onPriceUpdate) {
        const sign = delta >= 0 ? "+" : "";
        onPriceUpdate(`$${newClose.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, `${sign}${delta.toFixed(2)}`);
      }
    }, 750);

    return () => clearInterval(tickInterval);
  }, [assetConfig, onPriceUpdate]);

  // Main Canvas Rendering Engine with 60fps smoothing
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId = 0;

    const render = () => {
      const w = (canvas.width = container.clientWidth);
      const h = (canvas.height = container.clientHeight);

      ctx.clearRect(0, 0, w, h);

      const candles = candlesRef.current;
      if (candles.length < 2) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Chart Padding
      const padRight = 65; // Price scale
      const padBottom = 26; // Time scale
      const padTop = 22;
      const padLeft = 14;

      const chartW = w - padLeft - padRight;
      const chartH = h - padTop - padBottom;

      // Calculate Min & Max Price Bounds with breathing room
      let minPrice = Infinity;
      let maxPrice = -Infinity;
      let maxVol = 0;

      candles.forEach((c) => {
        if (c.low < minPrice) minPrice = c.low;
        if (c.high > maxPrice) maxPrice = c.high;
        if (c.volume > maxVol) maxVol = c.volume;
      });

      const priceRange = maxPrice - minPrice || 1;
      minPrice -= priceRange * 0.04;
      maxPrice += priceRange * 0.04;
      const finalRange = maxPrice - minPrice;

      const getY = (priceVal: number) => {
        return padTop + chartH - ((priceVal - minPrice) / finalRange) * chartH;
      };

      const getX = (idx: number) => {
        return padLeft + (chartW / (candles.length - 1)) * idx;
      };

      // 1. Draw Professional Horizontal Gridlines and Price Labels (Y-Axis)
      const gridSteps = 5;
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
      ctx.setLineDash([3, 3]);

      for (let i = 0; i <= gridSteps; i++) {
        const pVal = minPrice + (finalRange / gridSteps) * i;
        const y = getY(pVal);

        ctx.beginPath();
        ctx.moveTo(padLeft, y);
        ctx.lineTo(w - padRight, y);
        ctx.stroke();

        // Right Y-Axis Price Label
        ctx.fillStyle = "rgba(148, 163, 184, 0.75)";
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(`$${pVal.toLocaleString("en-US", { maximumFractionDigits: assetConfig.decimals })}`, w - padRight + 6, y);
      }
      ctx.setLineDash([]);

      // 2. Draw Bottom Time Scale Labels (X-Axis)
      const timeSteps = 6;
      ctx.fillStyle = "rgba(148, 163, 184, 0.75)";
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      for (let i = 0; i < timeSteps; i++) {
        const candleIdx = Math.floor((candles.length - 1) * (i / (timeSteps - 1)));
        const candle = candles[candleIdx];
        if (candle) {
          const x = getX(candleIdx);
          ctx.fillText(candle.timeLabel, x, h - padBottom + 6);
        }
      }

      // 3. Render Volume Profile Bars (Institutional Bottom HUD)
      if (showVolume && maxVol > 0) {
        const volAreaH = chartH * 0.22;
        const candleW = Math.max(2, (chartW / candles.length) * 0.65);

        candles.forEach((c, idx) => {
          const x = getX(idx);
          const barH = (c.volume / maxVol) * volAreaH;
          const y = padTop + chartH - barH;
          const isGreen = c.close >= c.open;

          ctx.fillStyle = isGreen ? "rgba(16, 185, 129, 0.22)" : "rgba(239, 68, 68, 0.22)";
          ctx.fillRect(x - candleW / 2, y, candleW, barH);
        });
      }

      // 4. Render EMA 20 (Exponential Moving Average Curve)
      if (showEMA && candles.length > 5) {
        const k = 2 / (14 + 1);
        let ema = candles[0]!.close;
        const emaPoints: Array<{ x: number; y: number }> = [];

        candles.forEach((c, idx) => {
          ema = c.close * k + ema * (1 - k);
          emaPoints.push({ x: getX(idx), y: getY(ema) });
        });

        ctx.beginPath();
        ctx.moveTo(emaPoints[0]!.x, emaPoints[0]!.y);
        for (let i = 1; i < emaPoints.length; i++) {
          ctx.lineTo(emaPoints[i]!.x, emaPoints[i]!.y);
        }
        ctx.strokeStyle = "rgba(245, 158, 11, 0.55)";
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // 5. Render Selected Chart Mode: Candlesticks vs Area Line
      if (chartType === "candlestick") {
        const candleW = Math.max(3, (chartW / candles.length) * 0.7);

        candles.forEach((c, idx) => {
          const x = getX(idx);
          const isUp = c.close >= c.open;
          const strokeCol = isUp ? "#10b981" : "#ef4444";
          const fillCol = isUp ? "rgba(16, 185, 129, 0.85)" : "rgba(239, 68, 68, 0.85)";

          // Wick (High - Low)
          ctx.beginPath();
          ctx.moveTo(x, getY(c.high));
          ctx.lineTo(x, getY(c.low));
          ctx.strokeStyle = strokeCol;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Body (Open - Close)
          const yOpen = getY(c.open);
          const yClose = getY(c.close);
          const topY = Math.min(yOpen, yClose);
          const bodyH = Math.max(2, Math.abs(yOpen - yClose));

          ctx.fillStyle = fillCol;
          ctx.fillRect(x - candleW / 2, topY, candleW, bodyH);
          ctx.strokeStyle = strokeCol;
          ctx.strokeRect(x - candleW / 2, topY, candleW, bodyH);
        });
      } else {
        // Area Wave Mode with Liquid Gradient
        const points = candles.map((c, idx) => ({ x: getX(idx), y: getY(c.close) }));

        // Fill path
        const grad = ctx.createLinearGradient(0, padTop, 0, padTop + chartH);
        grad.addColorStop(0, assetConfig.fillGrad);
        grad.addColorStop(0.7, "rgba(59, 130, 246, 0.05)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.moveTo(points[0]!.x, points[0]!.y);
        for (let i = 1; i < points.length; i++) {
          const cpX = (points[i - 1]!.x + points[i]!.x) / 2;
          const cpY = (points[i - 1]!.y + points[i]!.y) / 2;
          ctx.quadraticCurveTo(points[i - 1]!.x, points[i - 1]!.y, cpX, cpY);
        }
        const lastP = points[points.length - 1]!;
        ctx.lineTo(lastP.x, lastP.y);
        ctx.lineTo(lastP.x, padTop + chartH);
        ctx.lineTo(points[0]!.x, padTop + chartH);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Main Stroke Line
        ctx.beginPath();
        ctx.moveTo(points[0]!.x, points[0]!.y);
        for (let i = 1; i < points.length; i++) {
          const cpX = (points[i - 1]!.x + points[i]!.x) / 2;
          const cpY = (points[i - 1]!.y + points[i]!.y) / 2;
          ctx.quadraticCurveTo(points[i - 1]!.x, points[i - 1]!.y, cpX, cpY);
        }
        ctx.lineTo(lastP.x, lastP.y);
        ctx.strokeStyle = assetConfig.color;
        ctx.lineWidth = 2.4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      // 6. Live Leading Edge Price Beacon & Horizontal Tag on Y-Axis
      const lastCandle = candles[candles.length - 1]!;
      const lastX = getX(candles.length - 1);
      const lastY = getY(lastCandle.close);

      // Horizontal dashed current price guideline
      ctx.beginPath();
      ctx.setLineDash([2, 2]);
      ctx.moveTo(padLeft, lastY);
      ctx.lineTo(w - padRight, lastY);
      ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      // Current Price Tag on right scale
      ctx.fillStyle = lastCandle.close >= lastCandle.open ? "#10b981" : "#ef4444";
      ctx.beginPath();
      ctx.roundRect(w - padRight + 2, lastY - 9, padRight - 6, 18, 4);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 9.5px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `$${lastCandle.close.toLocaleString("en-US", { maximumFractionDigits: assetConfig.decimals })}`,
        w - padRight + 2 + (padRight - 6) / 2,
        lastY
      );

      // Pulsing Beacon on last point
      ctx.beginPath();
      ctx.arc(lastX, lastY, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#10b981";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 7. Interactive Crosshair & Tooltip Overlay
      if (hoverData.candle && hoverData.x >= padLeft && hoverData.x <= w - padRight) {
        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);

        // Vertical Line
        ctx.beginPath();
        ctx.moveTo(hoverData.x, padTop);
        ctx.lineTo(hoverData.x, h - padBottom);
        ctx.stroke();

        // Horizontal Line
        ctx.beginPath();
        ctx.moveTo(padLeft, hoverData.y);
        ctx.lineTo(w - padRight, hoverData.y);
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [chartType, showEMA, showVolume, hoverData, assetConfig]);

  // Handle Mouse Hover tracking for Crosshair
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const candles = candlesRef.current;
    if (candles.length === 0) return;

    const padLeft = 14;
    const padRight = 65;
    const chartW = canvas.width - padLeft - padRight;

    const relX = x - padLeft;
    const idx = Math.max(0, Math.min(candles.length - 1, Math.round((relX / chartW) * (candles.length - 1))));
    const candle = candles[idx] || null;

    setHoverData({ candle, x, y });
  };

  const handleMouseLeave = () => {
    setHoverData({ candle: null, x: -1, y: -1 });
  };

  // Handle Touch tracking for Crosshair on Mobile
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !e.touches[0]) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const candles = candlesRef.current;
    if (candles.length === 0) return;

    const padLeft = 14;
    const padRight = 65;
    const chartW = canvas.width - padLeft - padRight;

    const relX = x - padLeft;
    const idx = Math.max(0, Math.min(candles.length - 1, Math.round((relX / chartW) * (candles.length - 1))));
    const candle = candles[idx] || null;

    setHoverData({ candle, x, y });
  };

  const handleTouchEnd = () => {
    setHoverData({ candle: null, x: -1, y: -1 });
  };

  return (
    <div className="w-full flex flex-col space-y-2.5 sm:space-y-3">
      {/* Chart Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-0.5 sm:px-1 text-xs">
        {/* Live Ticking Price Display */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div
            className={`text-lg sm:text-xl font-mono font-extrabold transition-colors duration-200 ${
              priceFlash === "up"
                ? "text-emerald-400"
                : priceFlash === "down"
                ? "text-rose-400"
                : "text-white"
            }`}
          >
            ${currentLivePrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>

          <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Feed (750ms)
          </span>
        </div>

        {/* Chart View Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-700/60 shadow-xs">
          <button
            type="button"
            onClick={() => setChartType("area")}
            className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all ${
              chartType === "area"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Line
          </button>
          <button
            type="button"
            onClick={() => setChartType("candlestick")}
            className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all ${
              chartType === "candlestick"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Candles
          </button>
          <div className="w-[1px] h-3.5 bg-slate-700 mx-0.5" />
          <button
            type="button"
            onClick={() => setShowEMA(!showEMA)}
            className={`px-1.5 sm:px-2 py-1 rounded-lg text-[9.5px] sm:text-[10px] font-bold transition-all ${
              showEMA ? "text-amber-400 bg-amber-500/10" : "text-slate-400 hover:text-white"
            }`}
          >
            EMA
          </button>
          <button
            type="button"
            onClick={() => setShowVolume(!showVolume)}
            className={`px-1.5 sm:px-2 py-1 rounded-lg text-[9.5px] sm:text-[10px] font-bold transition-all ${
              showVolume ? "text-emerald-400 bg-emerald-500/10" : "text-slate-400 hover:text-white"
            }`}
          >
            Vol
          </button>
        </div>
      </div>

      {/* Crosshair Floating HUD Tooltip */}
      {hoverData.candle && (
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900/95 border border-slate-700 text-[10px] sm:text-[11px] font-mono text-slate-300 shadow-lg">
          <span className="text-slate-400">{hoverData.candle.timeLabel}</span>
          <span>
            O: <strong className="text-white">${hoverData.candle.open.toFixed(2)}</strong>
          </span>
          <span>
            H: <strong className="text-emerald-400">${hoverData.candle.high.toFixed(2)}</strong>
          </span>
          <span>
            L: <strong className="text-rose-400">${hoverData.candle.low.toFixed(2)}</strong>
          </span>
          <span>
            C: <strong className="text-white">${hoverData.candle.close.toFixed(2)}</strong>
          </span>
          <span className="text-slate-400">
            Vol: <strong>{hoverData.candle.volume}</strong>
          </span>
        </div>
      )}

      {/* Main Canvas Container */}
      <div
        ref={containerRef}
        className="relative bg-slate-950/95 rounded-2xl h-60 sm:h-80 border border-slate-800 shadow-inner overflow-hidden cursor-crosshair select-none touch-none"
      >
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchMove}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
