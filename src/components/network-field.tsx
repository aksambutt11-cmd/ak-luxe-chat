import { useEffect, useRef } from "react";

/**
 * Antigravity-style organic particle field.
 *
 * Features:
 * - Naturally distributed particles with multi-plane depth (parallax).
 * - Gentle continuous harmonic drift and organic breathing pulses.
 * - Buttery-smooth cursor interaction: physical radial repulsion + acoustic ripple wave.
 * - Minimal, hairline neural connecting filaments between nearby active particles.
 * - Dynamic, slow chromatic transitions across royal sapphire, cyan, violet, and platinum.
 * - High-performance dual-batch canvas rendering maintaining consistent 60fps.
 */
export function NetworkField() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = {
      x: -9999,
      y: -9999,
      tx: -9999,
      ty: -9999,
      speed: 0,
      lastX: -9999,
      lastY: -9999,
    };

    const SPACING = 28; // Rich particle density
    const MAX_DIST = 185; // Cursor influence radius
    const MAX_PUSH = 36; // Maximum radial repulsion displacement

    interface Particle {
      ox: number; // Resting origin X
      oy: number; // Resting origin Y
      x: number; // Current physical X
      y: number; // Current physical Y
      vx: number; // Velocity X
      vy: number; // Velocity Y
      z: number; // Depth factor (0.4 to 1.1)
      baseRadius: number;
      radius: number;
      intensity: number; // 0 (quiescent) to 1 (fully excited)
      pulsePhase: number; // Individual breathing cycle
      pulseSpeed: number;
      isFocal: boolean; // Subtle sparkling node
      hueShift: number; // Minor individual chromatic nuance
    }

    let particles: Particle[] = [];

    const buildField = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(w / SPACING) + 2;
      const rows = Math.ceil(h / SPACING) + 2;
      const startX = (w - (cols - 1) * SPACING) / 2;
      const startY = (h - (rows - 1) * SPACING) / 2;

      particles = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Natural quasi-crystal jitter so the field doesn't look like a rigid spreadsheet
          const jitterX = Math.sin(c * 1.7 + r * 3.1) * 3.8;
          const jitterY = Math.cos(c * 2.3 + r * 1.9) * 3.8;
          const ox = startX + c * SPACING + jitterX;
          const oy = startY + r * SPACING + jitterY;

          // Parallax depth assigned across continuous harmonic gradient
          const z = 0.45 + (Math.sin(c * 0.35 + r * 0.42) * 0.5 + 0.5) * 0.65;
          const baseRadius = 0.85 + z * 0.55;
          const isFocal = (c * 17 + r * 31) % 13 === 0;

          particles.push({
            ox,
            oy,
            x: ox,
            y: oy,
            vx: 0,
            vy: 0,
            z,
            baseRadius,
            radius: baseRadius,
            intensity: 0,
            pulsePhase: (c * 0.5 + r * 0.7) % (Math.PI * 2),
            pulseSpeed: 0.8 + ((c + r) % 5) * 0.15,
            isFocal,
            hueShift: Math.sin(c * 0.2 + r * 0.2) * 18,
          });
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };

    const onLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
      document.documentElement.style.setProperty("--mx", "-9999px");
      document.documentElement.style.setProperty("--my", "-9999px");
    };

    const draw = () => {
      const time = performance.now() * 0.001;

      // Smooth cursor interpolation with momentum tracking
      if (mouse.tx > -999) {
        const dmx = mouse.tx - (mouse.x > -999 ? mouse.x : mouse.tx);
        const dmy = mouse.ty - (mouse.y > -999 ? mouse.y : mouse.ty);
        mouse.speed = Math.min(Math.hypot(dmx, dmy), 40);

        if (mouse.x < -999) {
          mouse.x = mouse.tx;
          mouse.y = mouse.ty;
        } else {
          mouse.x += dmx * 0.22;
          mouse.y += dmy * 0.22;
        }

        // Keep existing CSS radial glow in sync
        document.documentElement.style.setProperty("--mx", `${mouse.x.toFixed(1)}px`);
        document.documentElement.style.setProperty("--my", `${mouse.y.toFixed(1)}px`);
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
        mouse.speed = 0;
      }

      ctx.clearRect(0, 0, w, h);

      const resting: Particle[] = [];
      const active: Particle[] = [];

      const cursorActive = mouse.x > -999 && !reduce;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p) continue;

        // 1. Organic harmonic ambient drift (subtle micro-sway)
        const driftX = Math.sin(time * 0.45 + p.oy * 0.004) * (1.8 * p.z);
        const driftY = Math.cos(time * 0.38 + p.ox * 0.004) * (1.8 * p.z);

        // 2. Individual breathing pulse
        const breath = Math.sin(time * p.pulseSpeed + p.pulsePhase);
        const currentRestRadius = p.baseRadius + breath * 0.22;

        let targetX = p.ox + driftX;
        let targetY = p.oy + driftY;
        let targetRadius = currentRestRadius;
        let targetIntensity = 0;

        if (cursorActive) {
          const dx = (p.ox + driftX) - mouse.x;
          const dy = (p.oy + driftY) - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < MAX_DIST) {
            const norm = dist / MAX_DIST;
            // Smooth falloff curve
            const force = Math.pow(1 - norm, 1.7);
            const angle = Math.atan2(dy, dx);

            // Antigravity acoustic wave ripple travelling outward
            const ripple = Math.sin(dist * 0.055 - time * 4.2) * (force * 6.5);

            // Outward physical repulsion boosted by depth
            const push = (force * MAX_PUSH + ripple) * p.z;
            targetX += Math.cos(angle) * push;
            targetY += Math.sin(angle) * push;

            targetRadius = currentRestRadius + force * 1.6;
            targetIntensity = Math.min(force + (p.isFocal ? 0.2 : 0), 1);
          }
        }

        // Spring damping physics
        p.vx += (targetX - p.x) * 0.16;
        p.vy += (targetY - p.y) * 0.16;
        p.vx *= 0.74;
        p.vy *= 0.74;
        p.x += p.vx;
        p.y += p.vy;

        p.radius += (targetRadius - p.radius) * 0.2;
        p.intensity += (targetIntensity - p.intensity) * 0.2;

        if (p.intensity > 0.015) {
          active.push(p);
        } else {
          resting.push(p);
        }
      }

      // --- LAYER 1: Hairline Connecting Filaments Between Active Neighbors ---
      // Creates an elegant, high-tech Antigravity neural constellation effect without visual clutter
      if (active.length > 1) {
        ctx.lineWidth = 0.65;
        const lineMaxDist = 38;
        for (let i = 0; i < active.length; i++) {
          const a = active[i];
          if (!a || a.intensity < 0.08) continue;
          for (let j = i + 1; j < active.length; j++) {
            const b = active[j];
            if (!b) continue;
            const ldx = a.x - b.x;
            const ldy = a.y - b.y;
            const d2 = ldx * ldx + ldy * ldy;
            if (d2 < lineMaxDist * lineMaxDist) {
              const d = Math.sqrt(d2);
              const lineAlpha = (1 - d / lineMaxDist) * 0.18 * Math.min(a.intensity, b.intensity);
              if (lineAlpha > 0.008) {
                ctx.strokeStyle = `rgba(147, 197, 253, ${lineAlpha.toFixed(3)})`;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      // --- LAYER 2: High-Performance Single-Path Batch For Resting Dots ---
      if (resting.length > 0) {
        ctx.beginPath();
        for (let i = 0; i < resting.length; i++) {
          const p = resting[i];
          if (!p) continue;
          ctx.moveTo(p.x + p.radius, p.y);
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        }
        // Subtle, elegant neutral slate with soft ambient illumination
        ctx.fillStyle = "rgba(148, 163, 184, 0.26)";
        ctx.fill();

        // Occasional focal resting particles with gentle shimmer
        ctx.beginPath();
        for (let i = 0; i < resting.length; i++) {
          const p = resting[i];
          if (p && p.isFocal) {
            ctx.moveTo(p.x + p.radius * 1.1, p.y);
            ctx.arc(p.x, p.y, p.radius * 1.1, 0, Math.PI * 2);
          }
        }
        ctx.fillStyle = "rgba(199, 210, 254, 0.38)";
        ctx.fill();
      }

      // --- LAYER 3: Chromatic Active / Reacting Dots ---
      for (let i = 0; i < active.length; i++) {
        const p = active[i];
        if (!p) continue;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);

        // Fluid organic continuous chromatic wave radiating from the cursor interaction
        // Cycles gracefully across Sapphire (~215°), Royal Indigo (~245°), Violet (~270°), and Soft Cyan/Platinum (~190°)
        const wave = Math.sin(time * 0.95 + dist * 0.024 - angle * 0.9);
        const hue = (240 + wave * 48 + p.hueShift + 360) % 360;

        const saturation = Math.round(48 + p.intensity * 44);
        const lightness = Math.round(56 + p.intensity * 22);
        const alpha = Math.min(0.3 + p.intensity * 0.65, 0.95).toFixed(3);

        // Soft subtle aura glow around peak interacting nodes
        if (p.intensity > 0.12) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue.toFixed(1)}, ${saturation}%, ${lightness + 6}%, ${(p.intensity * 0.18).toFixed(3)})`;
          ctx.fill();
        }

        // Crisp individual particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue.toFixed(1)}, ${saturation}%, ${lightness}%, ${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    buildField();
    window.addEventListener("resize", buildField);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", buildField);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="network-field" aria-hidden="true" />;
}
