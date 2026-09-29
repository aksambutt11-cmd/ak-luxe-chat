import { useEffect, useRef } from "react";

export interface ParticleEngineProps {
  className?: string;
  physicsEnabled?: boolean;
}

export function ParticleEngine({
  className = "network-field",
  physicsEnabled = true,
}: ParticleEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const coins = [
      { symbol: "₿", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.16)" },
      { symbol: "Ξ", color: "#6366f1", bg: "rgba(99, 102, 241, 0.16)" },
      { symbol: "◎", color: "#14f195", bg: "rgba(20, 241, 149, 0.16)" },
      { symbol: "⬡", color: "#3b82f6", bg: "rgba(59, 130, 246, 0.16)" },
      { symbol: "⚡", color: "#ec4899", bg: "rgba(236, 72, 153, 0.16)" },
      { symbol: "🫧", color: "#38bdf8", bg: "rgba(56, 189, 248, 0.18)" },
    ];

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      symbol: string;
      color: string;
      bg: string;
      vx: number;
      vy: number;
      floatOffset: number;
    }> = [];

    for (let i = 0; i < 28; i++) {
      const coin = coins[i % coins.length]!;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 18 + 16,
        symbol: coin.symbol,
        color: coin.color,
        bg: coin.bg,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -Math.random() * 0.6 - 0.2,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animId = 0;
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      if (physicsEnabled) {
        particles.forEach((p) => {
          p.x += p.vx + Math.sin(p.floatOffset) * 0.4;
          p.y += p.vy;
          p.floatOffset += 0.02;

          if (p.y < -60) {
            p.y = h + 60;
            p.x = Math.random() * w;
          }
          if (p.x < -60) p.x = w + 60;
          if (p.x > w + 60) p.x = -60;

          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * 2.5;
            p.y -= Math.sin(angle) * 2.5;
          }

          ctx.save();
          // Glass circle body
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.bg;
          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = p.color + "88";
          ctx.stroke();

          // Specular highlight bubble reflex
          ctx.beginPath();
          ctx.arc(p.x - p.radius * 0.3, p.y - p.radius * 0.3, p.radius * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
          ctx.fill();

          // Centered crypto glyph
          ctx.fillStyle = p.color;
          ctx.font = `bold ${Math.round(p.radius * 0.85)}px 'Plus Jakarta Sans', sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(p.symbol, p.x, p.y);
          ctx.restore();
        });
      }

      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [physicsEnabled]);

  return <canvas id="bgCanvas" ref={canvasRef} className={className} aria-hidden="true" />;
}
