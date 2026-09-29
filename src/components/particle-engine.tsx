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

    // Background floating crypto particles
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

    for (let i = 0; i < 24; i++) {
      const coin = coins[i % coins.length]!;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 15 + 13,
        symbol: coin.symbol,
        color: coin.color,
        bg: coin.bg,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -Math.random() * 0.35 - 0.12,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }

    // Micro blockchain mesh points
    const meshPoints: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    for (let i = 0; i < 28; i++) {
      meshPoints.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.2 - 0.05,
      });
    }

    // 7. Right-Side Crypto AI Core & Blockchain Constellation Nodes
    const rightConstellation = [
      { id: "btc", symbol: "₿", color: "#f59e0b", baseX: 160, baseY: 0.22, size: 20, angle: 0 },
      { id: "eth", symbol: "Ξ", color: "#6366f1", baseX: 85, baseY: 0.42, size: 18, angle: 1.2 },
      { id: "sol", symbol: "◎", color: "#14f195", baseX: 195, baseY: 0.58, size: 17, angle: 2.4 },
      { id: "pol", symbol: "⬡", color: "#3b82f6", baseX: 95, baseY: 0.76, size: 16, angle: 3.8 },
      { id: "ai", symbol: "⚡", color: "#38bdf8", baseX: 155, baseY: 0.88, size: 15, angle: 5.1 },
    ];

    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animId = 0;
    let time = 0;

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      time += 0.015;

      if (physicsEnabled) {
        // 1. Subtle Blockchain Mesh Connections across background
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

        ctx.lineWidth = 0.75;
        for (let i = 0; i < meshPoints.length; i++) {
          for (let j = i + 1; j < meshPoints.length; j++) {
            const p1 = meshPoints[i]!;
            const p2 = meshPoints[j]!;
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              const alpha = (1 - dist / 120) * 0.07;
              ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        meshPoints.forEach((pt) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(59, 130, 246, 0.12)";
          ctx.fill();
        });

        // 2. Floating Background Crypto Particles
        particles.forEach((p) => {
          p.x += p.vx + Math.sin(p.floatOffset) * 0.3;
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
          if (dist < 110) {
            const angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * 1.8;
            p.y -= Math.sin(angle) * 1.8;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.bg;
          ctx.fill();
          ctx.lineWidth = 1;
          ctx.strokeStyle = p.color + "55";
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(p.x - p.radius * 0.3, p.y - p.radius * 0.3, p.radius * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
          ctx.fill();

          ctx.fillStyle = p.color;
          ctx.font = `bold ${Math.round(p.radius * 0.8)}px 'Plus Jakarta Sans', sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(p.symbol, p.x, p.y);
          ctx.restore();
        });

        // 3. Right-Side Crypto AI Core & Blockchain Constellation (Desktop only: w > 1024)
        if (w > 1024) {
          const rightNodesPos: Array<{ x: number; y: number; node: (typeof rightConstellation)[0] }> = [];

          // Parallax offset based on cursor
          const parallaxX = (mouseX / w - 0.5) * 16;
          const parallaxY = (mouseY / h - 0.5) * 16;

          rightConstellation.forEach((node) => {
            const nodeX = w - node.baseX + Math.sin(time + node.angle) * 12 + parallaxX;
            const nodeY = h * node.baseY + Math.cos(time + node.angle) * 14 + parallaxY;
            rightNodesPos.push({ x: nodeX, y: nodeY, node });
          });

          // Draw thin glowing blockchain constellation lines
          for (let i = 0; i < rightNodesPos.length; i++) {
            for (let j = i + 1; j < rightNodesPos.length; j++) {
              const n1 = rightNodesPos[i]!;
              const n2 = rightNodesPos[j]!;
              const dx = n1.x - n2.x;
              const dy = n1.y - n2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 260) {
                const alpha = (1 - dist / 260) * 0.22;
                ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(n1.x, n1.y);
                ctx.lineTo(n2.x, n2.y);
                ctx.stroke();

                // Micro pulse packet traveling along the blockchain line
                const pulsePos = (time * 0.4 + i * 0.3) % 1;
                const px = n1.x + (n2.x - n1.x) * pulsePos;
                const py = n1.y + (n2.y - n1.y) * pulsePos;
                ctx.beginPath();
                ctx.arc(px, py, 2, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(56, 189, 248, 0.6)";
                ctx.fill();
              }
            }
          }

          // Draw Constellation Nodes with soft glow and crypto symbols
          rightNodesPos.forEach(({ x, y, node }) => {
            ctx.save();
            // Ambient outer glow
            const nodeGrad = ctx.createRadialGradient(x, y, 2, x, y, node.size * 1.6);
            nodeGrad.addColorStop(0, node.color + "33");
            nodeGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
            ctx.fillStyle = nodeGrad;
            ctx.beginPath();
            ctx.arc(x, y, node.size * 1.6, 0, Math.PI * 2);
            ctx.fill();

            // Glass orb body
            ctx.beginPath();
            ctx.arc(x, y, node.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
            ctx.fill();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = node.color + "99";
            ctx.stroke();

            // Reflex highlight
            ctx.beginPath();
            ctx.arc(x - node.size * 0.3, y - node.size * 0.3, node.size * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
            ctx.fill();

            // Crypto Glyph
            ctx.fillStyle = node.color;
            ctx.font = `bold ${Math.round(node.size * 0.95)}px 'Plus Jakarta Sans', sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(node.symbol, x, y);
            ctx.restore();
          });
        }
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
