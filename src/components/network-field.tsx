import { useEffect, useRef } from "react";

/**
 * Antigravity-style mouse-reactive expanding dot grid.
 * Dots naturally sit across the background; when the cursor moves near them,
 * nearby dots smoothly push and expand outward from the cursor, then spring back
 * to their resting grid positions when the cursor moves away.
 */
export function NetworkField() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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
    };

    const SPACING = 30; // Refined pixel spacing for a richer, more detailed particle field
    const MAX_DIST = 175; // Influence radius in pixels
    const MAX_PUSH = 32; // Max outward displacement in pixels

    interface GridDot {
      ox: number;
      oy: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseRadius: number;
      radius: number;
      intensity: number;
    }

    let dots: GridDot[] = [];

    const buildGrid = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(w / SPACING) + 2;
      const rows = Math.ceil(h / SPACING) + 2;
      const startX = (w - (cols - 1) * SPACING) / 2;
      const startY = (h - (rows - 1) * SPACING) / 2;

      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = startX + c * SPACING;
          const oy = startY + r * SPACING;
          // Natural subtle depth variation across field
          const depthMod = (Math.sin(c * 0.4 + r * 0.4) + 1) * 0.15;
          const baseRadius = 1.15 + depthMod;
          dots.push({
            ox,
            oy,
            x: ox,
            y: oy,
            vx: 0,
            vy: 0,
            baseRadius,
            radius: baseRadius,
            intensity: 0,
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
      // Smooth interpolation for mouse cursor tracking
      mouse.x += (mouse.tx - mouse.x) * 0.25;
      mouse.y += (mouse.ty - mouse.y) * 0.25;
      if (mouse.x > -999) {
        document.documentElement.style.setProperty("--mx", `${mouse.x.toFixed(1)}px`);
        document.documentElement.style.setProperty("--my", `${mouse.y.toFixed(1)}px`);
      }

      ctx.clearRect(0, 0, w, h);

      const time = performance.now() * 0.0012;
      const resting: GridDot[] = [];
      const active: GridDot[] = [];

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        if (!d) continue;

        let targetX = d.ox;
        let targetY = d.oy;
        let targetRadius = d.baseRadius;
        let targetIntensity = 0;

        if (mouse.x > -999 && !reduce) {
          const dx = d.ox - mouse.x;
          const dy = d.oy - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < MAX_DIST) {
            // Normalized distance: 0 at mouse, 1 at MAX_DIST
            const norm = dist / MAX_DIST;
            // Smooth falloff curve
            const force = Math.pow(1 - norm, 1.6);
            const angle = Math.atan2(dy, dx);

            // Physical outward expansion/spreading away from the cursor
            targetX = d.ox + Math.cos(angle) * force * MAX_PUSH;
            targetY = d.oy + Math.sin(angle) * force * MAX_PUSH;

            // Expand radius slightly and increase glow/color intensity
            targetRadius = d.baseRadius + force * 1.5;
            targetIntensity = force;
          }
        }

        // Spring physics with damping
        d.vx += (targetX - d.x) * 0.18;
        d.vy += (targetY - d.y) * 0.18;
        d.vx *= 0.72;
        d.vy *= 0.72;
        d.x += d.vx;
        d.y += d.vy;

        d.radius += (targetRadius - d.radius) * 0.22;
        d.intensity += (targetIntensity - d.intensity) * 0.22;

        if (d.intensity > 0.01) {
          active.push(d);
        } else {
          resting.push(d);
        }
      }

      // 1. Batch draw all resting neutral dots for maximum 60fps performance
      if (resting.length > 0) {
        ctx.beginPath();
        for (let i = 0; i < resting.length; i++) {
          const d = resting[i];
          if (!d) continue;
          ctx.moveTo(d.x + d.radius, d.y);
          ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        }
        ctx.fillStyle = "rgba(100, 116, 139, 0.24)";
        ctx.fill();
      }

      // 2. Draw active/reacting dots with fluid organic color transitions across subtle premium colors
      for (let i = 0; i < active.length; i++) {
        const d = active[i];
        if (!d) continue;

        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);

        // Fluid organic continuous chromatic wave radiating from the cursor interaction
        const wave1 = Math.sin(time * 0.95 + dist * 0.026 - angle * 1.15);
        const wave2 = Math.cos(time * 0.65 + (d.ox * 0.003 - d.oy * 0.003));
        // Smoothly sweeps through cyan (~192°), sapphire (~222°), royal indigo (~252°), violet (~282°), and soft rose (~312°)
        const hue = (252 + wave1 * 46 + wave2 * 24 + 360) % 360;

        const saturation = Math.round(40 + d.intensity * 48); // Subtle to rich
        const lightness = Math.round(52 + d.intensity * 14);
        const alpha = (0.26 + d.intensity * 0.62).toFixed(3);

        // Soft subtle aura ring around reacting dots near cursor
        if (d.intensity > 0.09) {
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue.toFixed(1)}, ${saturation}%, ${lightness + 4}%, ${(d.intensity * 0.2).toFixed(3)})`;
          ctx.fill();
        }

        // Crisp individual dot
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue.toFixed(1)}, ${saturation}%, ${lightness}%, ${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    buildGrid();
    window.addEventListener("resize", buildGrid);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", buildGrid);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="network-field" aria-hidden="true" />;
}
