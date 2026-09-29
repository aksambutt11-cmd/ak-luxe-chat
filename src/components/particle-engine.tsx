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
      { symbol: "₿", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.14)" },
      { symbol: "Ξ", color: "#6366f1", bg: "rgba(99, 102, 241, 0.14)" },
      { symbol: "◎", color: "#14f195", bg: "rgba(20, 241, 149, 0.14)" },
      { symbol: "⬡", color: "#3b82f6", bg: "rgba(59, 130, 246, 0.14)" },
      { symbol: "⚡", color: "#ec4899", bg: "rgba(236, 72, 153, 0.14)" },
      { symbol: "🫧", color: "#38bdf8", bg: "rgba(56, 189, 248, 0.15)" },
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

    // Crypto nodes & particles
    for (let i = 0; i < 26; i++) {
      const coin = coins[i % coins.length]!;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 16 + 14,
        symbol: coin.symbol,
        color: coin.color,
        bg: coin.bg,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 0.4 - 0.15,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }

    // Micro blockchain mesh points for subtle background texture
    const meshPoints: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    for (let i = 0; i < 30; i++) {
      meshPoints.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.25 - 0.05,
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
        // 1. Subtle Blockchain Mesh Connections
        meshPoints.forEach((pt) => {
          pt.x += pt.vx;
          pt.y += pt.vy;
          if (pt.y < -10) {
            pt.y = h + 10;
            pt.x = Math.random() * w;
          }
          if (pt.x < -10) pt.x = w + 10;
          if (pt.x > w + 10) pt.x = -10;
        });

        // Draw faint blockchain connection lines between close mesh points
        ctx.lineWidth = 0.75;
        for (let i = 0; i < meshPoints.length; i++) {
          for (let j = i + 1; j < meshPoints.length; j++) {
            const p1 = meshPoints[i]!;
            const p2 = meshPoints[j]!;
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130) {
              const alpha = (1 - dist / 130) * 0.08;
              ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        // Draw faint micro blockchain nodes
        meshPoints.forEach((pt) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(59, 130, 246, 0.15)";
          ctx.fill();
        });

        // 2. Floating Anti-Gravity Crypto Glass Spheres
        particles.forEach((p) => {
          p.x += p.vx + Math.sin(p.floatOffset) * 0.35;
          p.y += p.vy;
          p.floatOffset += 0.015;

          if (p.y < -50) {
            p.y = h + 50;
            p.x = Math.random() * w;
          }
          if (p.x < -50) p.x = w + 50;
          if (p.x > w + 50) p.x = -50;

          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * 2;
            p.y -= Math.sin(angle) * 2;
          }

          ctx.save();
          // Glass circle body
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.bg;
          ctx.fill();
          ctx.lineWidth = 1.2;
          ctx.strokeStyle = p.color + "66";
          ctx.stroke();

          // Specular highlight bubble reflex
          ctx.beginPath();
          ctx.arc(p.x - p.radius * 0.3, p.y - p.radius * 0.3, p.radius * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
          ctx.fill();

          // Centered crypto glyph
          ctx.fillStyle = p.color;
          ctx.font = `bold ${Math.round(p.radius * 0.8)}px 'Plus Jakarta Sans', sans-serif`;
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
