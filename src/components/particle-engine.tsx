import { useEffect, useRef } from "react";

export interface ParticleEngineProps {
  className?: string;
  repulsionRadius?: number;
  repulsionStrength?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  z: number; // Parallax depth factor (0.4 to 1.2)
  radius: number;
  upSpeed: number;
  sineAmp: number;
  sineFreq: number;
  phase: number;
  intensity: number;
  baseHue: number;
  isAccent: boolean;
}

interface AmbientSphere {
  x: number;
  y: number;
  radius: number;
  upSpeed: number;
  phase: number;
  opacity: number;
}

interface FloatingSymbol {
  symbol: string;
  x: number;
  y: number;
  size: number;
  upSpeed: number;
  phase: number;
  opacity: number;
  color: string;
}

/**
 * Interactive Anti-Gravity Floating Particle Canvas Engine.
 *
 * Implements:
 * - Anti-gravity upward buoyant lift with gentle sinusoidal horizontal waves.
 * - Soft mouse-repulsion physics (particles gently disperse when cursor hovers near).
 * - Floating golden ambient spheres with soft radial gradients.
 * - Floating crypto symbols (₿, Ξ, ◎, ◈) with slow opacity transitions.
 * - Dual-batch 60fps rendering with HiDPI support.
 */
export function ParticleEngine({
  className = "network-field",
  repulsionRadius = 140,
  repulsionStrength = 1.6,
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
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
    };

    let particles: Particle[] = [];
    let spheres: AmbientSphere[] = [];
    let symbols: FloatingSymbol[] = [];

    const initScene = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 1. Anti-Gravity Dots
      // Rich density based on screen dimensions (~250-380 particles on desktop)
      const count = Math.min(Math.round((width * height) / 4800), 450);
      particles = [];

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const z = 0.4 + Math.random() * 0.8; // Depth
        const radius = 0.85 + z * 0.95;
        const upSpeed = (0.28 + z * 0.45) * (prefersReducedMotion ? 0 : 1);
        const sineAmp = 8 + Math.random() * 22;
        const sineFreq = 0.4 + Math.random() * 0.8;
        const phase = Math.random() * Math.PI * 2;
        const isAccent = Math.random() < 0.12;
        const baseHue = 210 + Math.random() * 55; // Sapphire to violet

        particles.push({
          x,
          y,
          vx: 0,
          vy: 0,
          baseX: x,
          z,
          radius,
          upSpeed,
          sineAmp,
          sineFreq,
          phase,
          intensity: 0,
          baseHue,
          isAccent,
        });
      }

      // 2. Floating Golden Ambient Spheres (soft ambient orbs)
      spheres = [];
      const sphereCount = Math.max(3, Math.round(width / 340));
      for (let i = 0; i < sphereCount; i++) {
        spheres.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 28 + Math.random() * 42,
          upSpeed: 0.18 + Math.random() * 0.22,
          phase: Math.random() * Math.PI * 2,
          opacity: 0.05 + Math.random() * 0.06,
        });
      }

      // 3. Floating Crypto Symbols (₿, Ξ, ◎, ◈, $)
      const symbolChars = ["₿", "Ξ", "◎", "◈", "$"];
      symbols = [];
      const symbolCount = Math.max(4, Math.round(width / 260));
      for (let i = 0; i < symbolCount; i++) {
        symbols.push({
          symbol: symbolChars[i % symbolChars.length]!,
          x: Math.random() * width,
          y: Math.random() * height,
          size: 14 + Math.random() * 12,
          upSpeed: 0.2 + Math.random() * 0.25,
          phase: Math.random() * Math.PI * 2,
          opacity: 0.08 + Math.random() * 0.12,
          color: i % 2 === 0 ? "rgba(234, 179, 8, " : "rgba(56, 189, 248, ",
        });
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handlePointerLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
      document.documentElement.style.setProperty("--mx", "-9999px");
      document.documentElement.style.setProperty("--my", "-9999px");
    };

    const render = () => {
      const time = performance.now() * 0.001;

      // Cursor smoothing
      if (mouse.targetX > -999) {
        if (mouse.x < -999) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.22;
          mouse.y += (mouse.targetY - mouse.y) * 0.22;
        }
        document.documentElement.style.setProperty("--mx", `${mouse.x.toFixed(1)}px`);
        document.documentElement.style.setProperty("--my", `${mouse.y.toFixed(1)}px`);
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }

      ctx.clearRect(0, 0, width, height);

      // --- 1. RENDER FLOATING GOLDEN AMBIENT SPHERES ---
      for (let i = 0; i < spheres.length; i++) {
        const s = spheres[i];
        if (!s) continue;

        if (!prefersReducedMotion) {
          s.y -= s.upSpeed;
          if (s.y < -s.radius * 2) {
            s.y = height + s.radius * 2;
            s.x = Math.random() * width;
          }
        }

        const pulse = Math.sin(time * 0.7 + s.phase) * 0.025;
        const currentOpacity = Math.max(0.02, s.opacity + pulse);

        // Soft radial gradient
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
        grad.addColorStop(0, `rgba(234, 179, 8, ${currentOpacity * 1.6})`);
        grad.addColorStop(0.5, `rgba(217, 119, 6, ${currentOpacity * 0.8})`);
        grad.addColorStop(1, "rgba(234, 179, 8, 0)");

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
          sym.y -= sym.upSpeed;
          if (sym.y < -40) {
            sym.y = height + 40;
            sym.x = Math.random() * width;
          }
        }

        const waveX = Math.sin(time * 0.6 + sym.phase) * 12;
        const pulse = Math.sin(time * 0.9 + sym.phase) * 0.04;
        const currentAlpha = Math.max(0.04, sym.opacity + pulse);

        ctx.font = `600 ${sym.size}px "Space Grotesk", sans-serif`;
        ctx.fillStyle = `${sym.color}${currentAlpha.toFixed(3)})`;
        ctx.fillText(sym.symbol, sym.x + waveX, sym.y);
      }

      // --- 3. RENDER ANTI-GRAVITY FLOATING DOTS & MOUSE-REPULSION PHYSICS ---
      const isMouseActive = mouse.x > -999 && !prefersReducedMotion;
      const resting: Particle[] = [];
      const active: Particle[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p) continue;

        // Anti-Gravity buoyant lift upward
        if (!prefersReducedMotion) {
          p.y -= p.upSpeed;
          if (p.y < -20) {
            p.y = height + 20;
            p.baseX = Math.random() * width;
            p.x = p.baseX;
          }
        }

        // Horizontal sinusoidal anti-gravity oscillation
        const waveX = Math.sin(time * p.sineFreq + p.phase) * p.sineAmp;
        const targetNaturalX = p.baseX + waveX;

        // Mouse-Repulsion Physics
        let targetX = targetNaturalX;
        let targetY = p.y;
        let targetIntensity = 0;

        if (isMouseActive) {
          const dx = (p.x) - mouse.x;
          const dy = (p.y) - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < repulsionRadius) {
            const norm = dist / repulsionRadius;
            // Soft dispersion curve
            const force = Math.pow(1 - norm, 1.8) * (repulsionStrength * 48) * p.z;
            const angle = Math.atan2(dy, dx);

            targetX += Math.cos(angle) * force;
            targetY += Math.sin(angle) * force;
            targetIntensity = Math.min(1, 1 - norm + (p.isAccent ? 0.3 : 0));
          }
        }

        // Spring damping interpolation
        p.vx += (targetX - p.x) * 0.14;
        p.vy += (targetY - p.y) * 0.14;
        p.vx *= 0.74;
        p.vy *= 0.74;
        p.x += p.vx;
        p.y += p.vy;

        p.intensity += (targetIntensity - p.intensity) * 0.2;

        if (p.intensity > 0.02) {
          active.push(p);
        } else {
          resting.push(p);
        }
      }

      // Batch draw resting particles
      if (resting.length > 0) {
        ctx.beginPath();
        for (let i = 0; i < resting.length; i++) {
          const p = resting[i];
          if (!p) continue;
          ctx.moveTo(p.x + p.radius, p.y);
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        }
        ctx.fillStyle = "rgba(148, 163, 184, 0.28)"; // Slate-platinum
        ctx.fill();

        // Shimmering accent nodes
        ctx.beginPath();
        for (let i = 0; i < resting.length; i++) {
          const p = resting[i];
          if (p && p.isAccent) {
            ctx.moveTo(p.x + p.radius * 1.3, p.y);
            ctx.arc(p.x, p.y, p.radius * 1.3, 0, Math.PI * 2);
          }
        }
        ctx.fillStyle = "rgba(199, 210, 254, 0.42)";
        ctx.fill();
      }

      // Draw active dispersed particles with chromatic glow
      for (let i = 0; i < active.length; i++) {
        const p = active[i];
        if (!p) continue;

        const hue = (p.baseHue + time * 20) % 360;
        const currentRadius = p.radius + p.intensity * 1.8;
        const alpha = Math.min(0.35 + p.intensity * 0.6, 0.95).toFixed(3);

        // Halo aura
        if (p.intensity > 0.15) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue.toFixed(0)}, 75%, 65%, ${(p.intensity * 0.2).toFixed(3)})`;
          ctx.fill();
        }

        // Particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue.toFixed(0)}, 70%, 75%, ${alpha})`;
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
