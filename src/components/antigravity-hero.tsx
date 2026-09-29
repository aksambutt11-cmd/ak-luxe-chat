import { useEffect, useRef } from "react";
import { Sparkles, Terminal, Flame, TrendingUp, Activity, ShieldAlert, Cpu } from "lucide-react";

interface AntigravityHeroProps {
  onQuickPrompt: (prompt: string) => void;
  typedWelcome?: string;
  fullWelcomeText?: string;
}

export function AntigravityHero({
  onQuickPrompt,
  typedWelcome,
  fullWelcomeText,
}: AntigravityHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = (canvas.width = container.clientWidth);
    let h = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      w = canvas.width = container.clientWidth;
      h = canvas.height = container.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Crypto Tokens Data
    const tokenConfigs = [
      { symbol: "₿", color: "#f59e0b", glow: "rgba(245, 158, 11, 0.25)", size: 18, baseRelX: 0.12, baseRelY: 0.28 },
      { symbol: "Ξ", color: "#6366f1", glow: "rgba(99, 102, 241, 0.25)", size: 17, baseRelX: 0.88, baseRelY: 0.24 },
      { symbol: "◎", color: "#14f195", glow: "rgba(20, 241, 149, 0.25)", size: 16, baseRelX: 0.08, baseRelY: 0.72 },
      { symbol: "⬡", color: "#3b82f6", glow: "rgba(59, 130, 246, 0.25)", size: 15, baseRelX: 0.92, baseRelY: 0.76 },
      { symbol: "₮", color: "#22c55e", glow: "rgba(34, 197, 94, 0.25)", size: 14, baseRelX: 0.22, baseRelY: 0.88 },
      { symbol: "⚡", color: "#ec4899", glow: "rgba(236, 72, 153, 0.25)", size: 14, baseRelX: 0.82, baseRelY: 0.86 },
      { symbol: "🔺", color: "#ef4444", glow: "rgba(239, 68, 68, 0.25)", size: 13, baseRelX: 0.18, baseRelY: 0.14 },
      { symbol: "🔗", color: "#0ea5e9", glow: "rgba(14, 165, 233, 0.25)", size: 13, baseRelX: 0.84, baseRelY: 0.12 },
    ];

    interface CryptoNode {
      symbol: string;
      color: string;
      glow: string;
      size: number;
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      pulsePhase: number;
      ringAngle: number;
    }

    const nodes: CryptoNode[] = tokenConfigs.map((cfg) => ({
      symbol: cfg.symbol,
      color: cfg.color,
      glow: cfg.glow,
      size: cfg.size,
      x: cfg.baseRelX * w,
      y: cfg.baseRelY * h,
      baseX: cfg.baseRelX,
      baseY: cfg.baseRelY,
      vx: 0,
      vy: 0,
      pulsePhase: Math.random() * Math.PI * 2,
      ringAngle: Math.random() * Math.PI * 2,
    }));

    // Micro Blockchain Network mesh points
    const meshPoints: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    for (let i = 0; i < 20; i++) {
      meshPoints.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    let animId = 0;
    let time = 0;

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      time += 0.02;

      // 1. Subtle Blockchain Mesh Connections
      meshPoints.forEach((pt) => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        if (pt.x < 0 || pt.x > w) pt.vx *= -1;
        if (pt.y < 0 || pt.y > h) pt.vy *= -1;
      });

      ctx.lineWidth = 0.8;
      for (let i = 0; i < meshPoints.length; i++) {
        for (let j = i + 1; j < meshPoints.length; j++) {
          const p1 = meshPoints[i]!;
          const p2 = meshPoints[j]!;
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.12;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 2. Animate Crypto Token Nodes
      nodes.forEach((node, idx) => {
        // Organic floating oscillation
        const targetX = node.baseX * w + Math.sin(time + idx * 1.3) * 12;
        const targetY = node.baseY * h + Math.cos(time + idx * 1.5) * 10;

        node.pulsePhase += 0.03;
        node.ringAngle += 0.015;

        // Smooth spring movement
        node.x += (targetX - node.x) * 0.05;
        node.y += (targetY - node.y) * 0.05;

        // Smooth mouse interactive repulsion / orbit
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 100) {
          const force = (1 - dist / 100) * 2.5;
          const angle = Math.atan2(dy, dx);
          node.x -= Math.cos(angle) * force;
          node.y -= Math.sin(angle) * force;
        }
      });

      // 3. Draw Blockchain Energy Links Between Crypto Nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i]!;
          const n2 = nodes[j]!;
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 220) {
            const alpha = (1 - dist / 220) * 0.25;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();

            // Luminous data packet traveling along blockchain wire
            const pulseT = (time * 0.6 + i * 0.3) % 1;
            const px = n1.x + (n2.x - n1.x) * pulseT;
            const py = n1.y + (n2.y - n1.y) * pulseT;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(56, 189, 248, 0.75)";
            ctx.fill();
          }
        }
      }

      // 4. Render Glowing Crypto Glass Spheres & Symbols
      nodes.forEach((node) => {
        ctx.save();
        const pulse = 1 + Math.sin(node.pulsePhase) * 0.06;
        const curSize = node.size * pulse;

        // Ambient Radial Outer Glow
        const glowGrad = ctx.createRadialGradient(node.x, node.y, 2, node.x, node.y, curSize * 2.2);
        glowGrad.addColorStop(0, node.glow);
        glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, curSize * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Orbital Blockchain Hex/Dash Ring
        ctx.save();
        ctx.translate(node.x, node.y);
        ctx.rotate(node.ringAngle);
        ctx.strokeStyle = node.color + "44";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.arc(0, 0, curSize * 1.45, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Glass sphere body
        ctx.beginPath();
        ctx.arc(node.x, node.y, curSize, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
        ctx.fill();
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = node.color + "aa";
        ctx.stroke();

        // Specular reflection reflex
        ctx.beginPath();
        ctx.arc(node.x - curSize * 0.3, node.y - curSize * 0.3, curSize * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fill();

        // High-contrast Crypto Token Symbol
        ctx.fillStyle = node.color;
        ctx.font = `bold ${Math.round(curSize * 0.92)}px 'Plus Jakarta Sans', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.symbol, node.x, node.y + 0.5);

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bot-glass-bubble rounded-3xl p-5 sm:p-7 text-slate-800 text-xs sm:text-sm leading-relaxed max-w-3xl w-full border border-white/95 shadow-xl relative overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-white/95 via-white/90 to-[#f3f6fc]/90 select-none transition-all"
    >
      {/* Real-time Crypto Network & Blockchain Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-90"
      />

      {/* Top Spectral Ambient Accent Ribbon */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 opacity-90" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-4 pt-1">
        {/* Top Centered Brand Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/70 shadow-xs">
          <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
            <Cpu className="w-2.5 h-2.5" />
          </div>
          <span className="text-[11px] font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
            AK Luxe <span className="text-slate-400 font-normal">•</span> Crypto Neural Engine
          </span>
          <span className="flex items-center gap-1 text-[9px] font-extrabold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-300/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Neural Sync Active
          </span>
        </div>

        {/* Large Executive Crypto Headline */}
        <div className="space-y-2 max-w-2xl px-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Experience institutional intelligence with the{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-600 bg-clip-text text-transparent">
              crypto agent platform
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl mx-auto">
            {typedWelcome || fullWelcomeText}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => void onQuickPrompt("Generate a comprehensive institutional crypto market canvas")}
            className="px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>Launch Deep Intelligence</span>
          </button>
          <button
            type="button"
            onClick={() => void onQuickPrompt("DeFi Liquidity Heatmap and Whale Flow Audit")}
            className="px-4 py-2.5 rounded-full bg-white/95 hover:bg-white text-slate-800 font-bold text-xs border border-slate-200/80 shadow-xs flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Explore Liquidity Heatmap</span>
          </button>
        </div>

        {/* Quick Starter Chips */}
        <div className="w-full pt-3 mt-1 border-t border-slate-200/50 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => void onQuickPrompt("Analyze Bitcoin (BTC) liquidation clusters")}
            className="apple-glass-interactive px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold text-blue-700 bg-white/90 border border-blue-200 flex items-center gap-1.5 shadow-2xs transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" /> BTC Liquidation Clusters
          </button>
          <button
            type="button"
            onClick={() => void onQuickPrompt("Ethereum (ETH) staking yield telemetry")}
            className="apple-glass-interactive px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold text-indigo-700 bg-white/90 border border-indigo-200 flex items-center gap-1.5 shadow-2xs transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Activity className="w-3.5 h-3.5 text-indigo-500" /> ETH Staking Yields
          </button>
          <button
            type="button"
            onClick={() => void onQuickPrompt("Audit whale order flows and counterparty risk")}
            className="apple-glass-interactive px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold text-slate-700 bg-white/90 border border-slate-200 flex items-center gap-1.5 shadow-2xs transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" /> Whale Flow & Risk Audit
          </button>
        </div>
      </div>
    </div>
  );
}
