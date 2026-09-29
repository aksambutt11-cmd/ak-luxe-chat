import { useEffect, useRef } from "react";
import { Sparkles, Terminal, Flame, TrendingUp, Activity, ShieldAlert } from "lucide-react";

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

    // Color palettes matching the Google Antigravity screenshot:
    // Left: vibrant royal blue / sapphire / sky blue / indigo
    const leftColors = ["#2563eb", "#3b82f6", "#1d4ed8", "#60a5fa", "#4f46e5", "#0284c7"];
    // Right: vibrant rose / coral / crimson / amber / magenta
    const rightColors = ["#e11d48", "#f43f5e", "#fb7185", "#ea580c", "#f97316", "#be185d"];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      len: number;
      width: number;
      angle: number;
      angularSpeed: number;
      color: string;
      side: "left" | "right";
      life: number;
      maxLife: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    const count = 140;

    for (let i = 0; i < count; i++) {
      const isLeft = i < count / 2;
      const palette = isLeft ? leftColors : rightColors;
      const color = palette[Math.floor(Math.random() * palette.length)]!;

      // Spawn from near center-edges radiating outward
      const side = isLeft ? "left" : "right";
      const startX = isLeft
        ? Math.random() * (w * 0.48)
        : w * 0.52 + Math.random() * (w * 0.48);
      const startY = Math.random() * h;

      particles.push({
        x: startX,
        y: startY,
        vx: isLeft ? -Math.random() * 0.6 - 0.2 : Math.random() * 0.6 + 0.2,
        vy: (Math.random() - 0.5) * 0.5,
        len: Math.random() * 7 + 4,
        width: Math.random() * 2.2 + 1.2,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.04,
        color,
        side,
        life: Math.random() * 200,
        maxLife: 200 + Math.random() * 150,
        opacity: Math.random() * 0.7 + 0.3,
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
    let t = 0;

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      t += 0.015;

      particles.forEach((p) => {
        p.life += 1;
        if (p.life > p.maxLife) {
          p.life = 0;
          p.x = p.side === "left" ? w * 0.45 + (Math.random() - 0.5) * 40 : w * 0.55 + (Math.random() - 0.5) * 40;
          p.y = h * 0.5 + (Math.random() - 0.5) * (h * 0.8);
          p.vx = p.side === "left" ? -Math.random() * 0.7 - 0.2 : Math.random() * 0.7 + 0.2;
          p.vy = (Math.random() - 0.5) * 0.6;
        }

        // Slight vortex curvature
        const centerX = w * 0.5;
        const centerY = h * 0.5;
        const distCenter = Math.hypot(p.x - centerX, p.y - centerY);
        const curveForce = Math.sin(t + distCenter * 0.02) * 0.15;
        p.vy += curveForce;

        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.angularSpeed;

        // Wrap or repel
        if (p.x < -20) p.x = w * 0.48;
        if (p.x > w + 20) p.x = w * 0.52;
        if (p.y < -20) p.y = h + 10;
        if (p.y > h + 20) p.y = -10;

        // Antigravity mouse repulsion
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distMouse = Math.hypot(dx, dy);
        if (distMouse < 110) {
          const force = (1 - distMouse / 110) * 3.5;
          const ang = Math.atan2(dy, dx);
          p.x -= Math.cos(ang) * force;
          p.y -= Math.sin(ang) * force;
        }

        // Draw elongated pill / dash with rounded caps oriented along motion
        const moveAngle = Math.atan2(p.vy, p.vx) + p.angle * 0.3;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(moveAngle);

        ctx.globalAlpha = p.opacity * Math.sin((p.life / p.maxLife) * Math.PI);
        ctx.fillStyle = p.color;

        ctx.beginPath();
        const r = p.width / 2;
        const halfL = p.len / 2;
        ctx.roundRect(-halfL, -r, p.len, p.width, r);
        ctx.fill();

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
      {/* Google Antigravity Dual-Color Particle Dispersion Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-85"
      />

      {/* Top Spectral Ambient Accent Ribbon */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-indigo-500 to-rose-500 opacity-90" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-4 pt-1">
        {/* Top Centered Brand Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/70 shadow-xs">
          <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-600 to-rose-500 flex items-center justify-center text-white">
            <Sparkles className="w-2.5 h-2.5" />
          </div>
          <span className="text-[11px] font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
            AK Luxe <span className="text-slate-400 font-normal">•</span> Antigravity Intelligence
          </span>
          <span className="flex items-center gap-1 text-[9px] font-extrabold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-300/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Neural Sync
          </span>
        </div>

        {/* Antigravity Inspired Large Hero Typography */}
        <div className="space-y-2 max-w-2xl px-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Experience liftoff with the{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 bg-clip-text text-transparent">
              institutional crypto agent
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl mx-auto">
            {typedWelcome || fullWelcomeText}
          </p>
        </div>

        {/* Primary Call-to-Actions matching Google Antigravity */}
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
            className="px-4 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 font-bold text-xs border border-slate-200/80 shadow-xs flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>Explore Liquidity Heatmap</span>
          </button>
        </div>

        {/* Quick Suggestion Chips */}
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
