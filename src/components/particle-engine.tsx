import { useEffect, useRef } from "react";

export interface ParticleEngineProps {
  className?: string;
  repulsionRadius?: number;
  repulsionStrength?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
}

interface GoldenSphere {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  wobble: number;
  opacity: number;
}

interface CryptoSymbol {
  symbol: string;
  x: number;
  y: number;
  size: number;
  speedY: number;
  wobble: number;
  opacity: number;
  color: string;
}

/**
 * Interactive Anti-Gravity Floating Particle & Golden Sphere Canvas Engine.
 *
 * Faithfully matches the Gemini shared artifact:
 * - Anti-gravity upward buoyancy with soft sinusoidal horizontal drift.
 * - Real-time soft mouse-repulsion physics on particles & golden spheres.
 * - Floating metallic golden ambient spheres with 3D radial highlights.
 * - Floating crypto currency symbols (₿, Ξ, ◎, ◈, $) with soft opacity transitions.
 * - 60 FPS Canvas rendering with DPR scaling.
 */
export function ParticleEngine({
  className = "network-field",
  repulsionRadius = 145,
  repulsionStrength = 1.8,
}: ParticleEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let animFrameId = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: repulsionRadius,
    };

    let particles: Particle[] = [];
    let goldenSpheres: GoldenSphere[] = [];
    let symbols: CryptoSymbol[] = [];

    const initScene = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 1. Anti-Gravity Floating Particles
      const particleCount = Math.min(Math.round((width * height) / 4500), 320);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.4 + 1.2,
          speedY: (Math.random() * 0.55 + 0.22) * (prefersReducedMotion ? 0 : 1),
          speedX: (Math.random() - 0.5) * 0.25,
          opacity: Math.random() * 0.45 + 0.25,
          color:
            Math.random() > 0.5
              ? "rgba(59, 130, 246, " // Electric Blue
              : Math.random() > 0.3
              ? "rgba(99, 102, 241, " // Indigo
              : "rgba(56, 189, 248, ", // Cyan
        });
      }

      // 2. Floating Metallic Golden Spheres
      goldenSpheres = [];
      const sphereCount = Math.max(3, Math.min(Math.round(width / 320), 7));
      for (let i = 0; i < sphereCount; i++) {
        goldenSpheres.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 18 + 12,
          speedY: (Math.random() * 0.22 + 0.12) * (prefersReducedMotion ? 0 : 1),
          wobble: Math.random() * Math.PI * 2,
          opacity: 0.12 + Math.random() * 0.12,
        });
      }

      // 3. Floating Crypto Symbols
      const symbolChars = ["₿", "Ξ", "◎", "◈", "$"];
      symbols = [];
      const symbolCount = Math.max(4, Math.min(Math.round(width / 240), 9));
      for (let i = 0; i < symbolCount; i++) {
        symbols.push({
          symbol: symbolChars[i % symbolChars.length]!,
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 10 + 14,
          speedY: (Math.random() * 0.25 + 0.15) * (prefersReducedMotion ? 0 : 1),
          wobble: Math.random() * Math.PI * 2,
          opacity: 0.14 + Math.random() * 0.16,
          color: i % 2 === 0 ? "rgba(245, 158, 11, " : "rgba(56, 189, 248, ",
        });
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handlePointerLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      document.documentElement.style.setProperty("--mx", "-9999px");
      document.documentElement.style.setProperty("--my", "-9999px");
    };

    const render = () => {
      // Smooth mouse tracking
      if (mouse.targetX > -900) {
        if (mouse.x < -900) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.22;
          mouse.y += (mouse.targetY - mouse.y) * 0.22;
        }
        document.documentElement.style.setProperty("--mx", `${mouse.x.toFixed(1)}px`);
        document.documentElement.style.setProperty("--my", `${mouse.y.toFixed(1)}px`);
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      ctx.clearRect(0, 0, width, height);

      // --- 1. RENDER FLOATING METALLIC GOLDEN SPHERES ---
      for (let i = 0; i < goldenSpheres.length; i++) {
        const s = goldenSpheres[i];
        if (!s) continue;

        if (!prefersReducedMotion) {
          s.y -= s.speedY;
          s.wobble += 0.012;
          s.x += Math.sin(s.wobble) * 0.35;

          // Mouse repulsion on golden spheres
          if (mouse.x > -900) {
            const dx = s.x - mouse.x;
            const dy = s.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < mouse.radius + s.radius) {
              const angle = Math.atan2(dy, dx);
              const force = (mouse.radius + s.radius - dist) / (mouse.radius + s.radius);
              s.x += Math.cos(angle) * force * 3.5;
              s.y += Math.sin(angle) * force * 3.5;
            }
          }

          // Wrap to bottom when off top screen
          if (s.y < -s.radius * 2) {
            s.y = height + s.radius * 2;
            s.x = Math.random() * width;
          }
        }

        // 3D Metallic Gold Spherical Radial Gradient
        const grad = ctx.createRadialGradient(
          s.x - s.radius * 0.35,
          s.y - s.radius * 0.35,
          s.radius * 0.08,
          s.x,
          s.y,
          s.radius
        );
        grad.addColorStop(0, `rgba(254, 240, 138, ${s.opacity * 1.8})`); // highlight
        grad.addColorStop(0.35, `rgba(245, 158, 11, ${s.opacity * 1.2})`); // gold body
        grad.addColorStop(0.8, `rgba(180, 83, 9, ${s.opacity * 0.8})`); // amber shadow
        grad.addColorStop(1, "rgba(180, 83, 9, 0)");

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // --- 2. RENDER FLOATING CRYPTO SYMBOLS ---
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < symbols.length; i++) {
        const sym = symbols[i];
        if (!sym) continue;

        if (!prefersReducedMotion) {
          sym.y -= sym.speedY;
          sym.wobble += 0.015;
          sym.x += Math.sin(sym.wobble) * 0.4;

          // Mouse deflection
          if (mouse.x > -900) {
            const dx = sym.x - mouse.x;
            const dy = sym.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < mouse.radius * 0.85) {
              const angle = Math.atan2(dy, dx);
              sym.x += Math.cos(angle) * 3;
              sym.y += Math.sin(angle) * 3;
            }
          }

          if (sym.y < -30) {
            sym.y = height + 30;
            sym.x = Math.random() * width;
          }
        }

        ctx.font = `700 ${sym.size}px "Space Grotesk", sans-serif`;
        ctx.fillStyle = `${sym.color}${sym.opacity.toFixed(3)})`;
        ctx.fillText(sym.symbol, sym.x, sym.y);
      }

      // --- 3. RENDER ANTI-GRAVITY PARTICLES WITH MOUSE REPULSION ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p) continue;

        if (!prefersReducedMotion) {
          // Anti-gravity upward drift
          p.y -= p.speedY;
          p.x += Math.sin(p.y * 0.012) * 0.35 + p.speedX;

          // Mouse Repulsion Physics
          if (mouse.x > -900) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < mouse.radius) {
              const angle = Math.atan2(dy, dx);
              const force = (mouse.radius - dist) / mouse.radius;
              p.x += Math.cos(angle) * force * (5.5 * repulsionStrength);
              p.y += Math.sin(angle) * force * (5.5 * repulsionStrength);
            }
          }

          // Reset when off top screen
          if (p.y < -20) {
            p.y = height + Math.random() * 40;
            p.x = Math.random() * width;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity.toFixed(3)})`;
        ctx.fill();
      }

      animFrameId = requestAnimationFrame(render);
    };

    initScene();
    window.addEventListener("resize", initScene);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);
    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", initScene);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [repulsionRadius, repulsionStrength]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
