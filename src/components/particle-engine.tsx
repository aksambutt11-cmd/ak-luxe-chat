import { useEffect, useRef } from "react";

export interface ParticleEngineProps {
  className?: string;
  particleCount?: number;
  repulsionRadius?: number;
  attractionRadius?: number;
  repulsionStrength?: number;
  attractionStrength?: number;
  connectDistance?: number;
  enableConnections?: boolean;
}

interface Particle {
  ox: number; // Equilibrium anchor X
  oy: number; // Equilibrium anchor Y
  x: number; // Current physical X
  y: number; // Current physical Y
  vx: number; // Physical velocity X
  vy: number; // Physical velocity Y
  z: number; // Parallax depth factor (0.35 to 1.15)
  baseRadius: number;
  radius: number;
  intensity: number; // 0 (quiescent) to 1 (fully excited)
  pulsePhase: number; // Individual breathing cycle phase
  pulseSpeed: number;
  isAccent: boolean; // Specially illuminated star node
  baseHue: number;
}

/**
 * High-performance React-based Particle Engine.
 *
 * Implements hydrodynamic dual-force physics:
 * - Fluid Repulsion Core: Near-cursor particles are pushed outward with fluid curling forces.
 * - Gravitational Attraction Ring: Mid-range particles are gently pulled inward toward the cursor's wake.
 * - Fluid Draft Impulse: Cursor swipe momentum drags particles in the gesture direction.
 * - Multi-Plane Parallax Depth & Ambient Harmonic Currents.
 * - Optimized dual-batch 60fps canvas rendering.
 */
export function ParticleEngine({
  className = "network-field",
  repulsionRadius = 95,
  attractionRadius = 240,
  repulsionStrength = 1.35,
  attractionStrength = 0.45,
  connectDistance = 42,
  enableConnections = true,
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
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      speed: 0,
      active: false,
    };

    const SPACING = 27; // Grid density
    let particles: Particle[] = [];

    const initParticles = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;
      const startX = (width - (cols - 1) * SPACING) / 2;
      const startY = (height - (rows - 1) * SPACING) / 2;

      particles = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Quasi-crystal jitter for organic celestial dispersion
          const jitterX = Math.sin(c * 1.83 + r * 2.71) * 4.2;
          const jitterY = Math.cos(c * 2.21 + r * 1.67) * 4.2;
          const ox = startX + c * SPACING + jitterX;
          const oy = startY + r * SPACING + jitterY;

          // Parallax depth assigned across harmonic gradient
          const z = 0.35 + (Math.sin(c * 0.38 + r * 0.46) * 0.5 + 0.5) * 0.75;
          const baseRadius = 0.75 + z * 0.65;
          const isAccent = (c * 19 + r * 37) % 17 === 0;
          const baseHue = 220 + Math.sin(c * 0.15 + r * 0.15) * 35; // Royal blue to sapphire/violet

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
            pulsePhase: (c * 0.45 + r * 0.65) % (Math.PI * 2),
            pulseSpeed: 0.7 + ((c + r) % 7) * 0.12,
            isAccent,
            baseHue,
          });
        }
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
      mouse.active = false;
      document.documentElement.style.setProperty("--mx", "-9999px");
      document.documentElement.style.setProperty("--my", "-9999px");
    };

    const render = () => {
      const time = performance.now() * 0.001;

      // --- Cursor Physics & Velocity Smoothing ---
      if (mouse.active && mouse.targetX > -999) {
        if (mouse.x < -999) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
          mouse.prevX = mouse.targetX;
          mouse.prevY = mouse.targetY;
        } else {
          mouse.prevX = mouse.x;
          mouse.prevY = mouse.y;
          // Fluid low-pass filter
          mouse.x += (mouse.targetX - mouse.x) * 0.24;
          mouse.y += (mouse.targetY - mouse.y) * 0.24;
          mouse.vx = mouse.x - mouse.prevX;
          mouse.vy = mouse.y - mouse.prevY;
          mouse.speed = Math.min(Math.hypot(mouse.vx, mouse.vy), 45);
        }

        // Sync CSS ambient glow coordinates
        document.documentElement.style.setProperty("--mx", `${mouse.x.toFixed(1)}px`);
        document.documentElement.style.setProperty("--my", `${mouse.y.toFixed(1)}px`);
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
        mouse.vx = 0;
        mouse.vy = 0;
        mouse.speed = 0;
      }

      ctx.clearRect(0, 0, width, height);

      const restingParticles: Particle[] = [];
      const activeParticles: Particle[] = [];
      const isInteracting = mouse.x > -999 && !prefersReducedMotion;

      // Pre-calculate squared boundaries
      const rRepulse2 = repulsionRadius * repulsionRadius;
      const rAttract2 = attractionRadius * attractionRadius;

      // --- PARTICLE UPDATE LOOP ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p) continue;

        // 1. Ambient Harmonic Hydrodynamic Drift
        const ambientDriftX = Math.sin(time * 0.42 + p.oy * 0.0035) * (1.6 * p.z);
        const ambientDriftY = Math.cos(time * 0.36 + p.ox * 0.0035) * (1.6 * p.z);

        // 2. Individual Harmonic Breathing Pulse
        const breath = Math.sin(time * p.pulseSpeed + p.pulsePhase);
        const equilibriumRadius = p.baseRadius + breath * 0.22;

        let targetX = p.ox + ambientDriftX;
        let targetY = p.oy + ambientDriftY;
        let targetRadius = equilibriumRadius;
        let targetIntensity = 0;

        if (isInteracting) {
          const dx = (p.ox + ambientDriftX) - mouse.x;
          const dy = (p.oy + ambientDriftY) - mouse.y;
          const dist2 = dx * dx + dy * dy;

          if (dist2 < rAttract2) {
            const dist = Math.sqrt(dist2) || 1;
            const normX = dx / dist;
            const normY = dy / dist;

            if (dist < repulsionRadius) {
              // --- ZONE 1: FLUID REPULSION CORE ---
              // Particles push radially outward away from the cursor
              const repulseNorm = dist / repulsionRadius;
              const repulseForce = Math.pow(1 - repulseNorm, 1.7) * repulsionStrength * 26 * p.z;

              // Perpendicular curl creates natural liquid parting around cursor
              const curlX = -normY * 0.28 * repulseForce;
              const curlY = normX * 0.28 * repulseForce;

              targetX += normX * repulseForce + curlX;
              targetY += normY * repulseForce + curlY;

              targetRadius = equilibriumRadius + (1 - repulseNorm) * 1.5;
              targetIntensity = Math.min(1, 1 - repulseNorm + 0.2);
            } else {
              // --- ZONE 2: GRAVITATIONAL ATTRACTION & ORBITAL WAKE ---
              // Mid-distance particles are pulled into the wake of the cursor
              const attractRange = attractionRadius - repulsionRadius;
              const attractProgress = (dist - repulsionRadius) / attractRange;
              // Smooth bell-curve peaking mid-way
              const attractBell = Math.sin(attractProgress * Math.PI);
              const attractForce = attractBell * attractionStrength * 16 * p.z;

              // Pull toward mouse with gentle trailing vortex
              const swirlX = -normY * 0.45 * attractForce;
              const swirlY = normX * 0.45 * attractForce;

              targetX -= normX * attractForce - swirlX;
              targetY -= normY * attractForce - swirlY;

              targetRadius = equilibriumRadius + attractBell * 0.7;
              targetIntensity = Math.min(1, attractBell * 0.65);
            }

            // Fluid Swipe Momentum: moving cursor drags particles along its wake
            if (mouse.speed > 2) {
              const draftFactor = (1 - dist / attractionRadius) * (mouse.speed / 45) * 0.45 * p.z;
              targetX += mouse.vx * draftFactor;
              targetY += mouse.vy * draftFactor;
            }
          }
        }

        // Spring-damping physics integration
        p.vx += (targetX - p.x) * 0.17;
        p.vy += (targetY - p.y) * 0.17;
        p.vx *= 0.73;
        p.vy *= 0.73;
        p.x += p.vx;
        p.y += p.vy;

        p.radius += (targetRadius - p.radius) * 0.22;
        p.intensity += (targetIntensity - p.intensity) * 0.22;

        if (p.intensity > 0.02) {
          activeParticles.push(p);
        } else {
          restingParticles.push(p);
        }
      }

      // --- LAYER 1: Hairline Fluid Filaments (Active Constellation) ---
      if (enableConnections && activeParticles.length > 1) {
        ctx.lineWidth = 0.65;
        const maxDist2 = connectDistance * connectDistance;

        for (let i = 0; i < activeParticles.length; i++) {
          const a = activeParticles[i];
          if (!a || a.intensity < 0.08) continue;

          for (let j = i + 1; j < activeParticles.length; j++) {
            const b = activeParticles[j];
            if (!b) continue;

            const ldx = a.x - b.x;
            const ldy = a.y - b.y;
            const d2 = ldx * ldx + ldy * ldy;

            if (d2 < maxDist2) {
              const dist = Math.sqrt(d2);
              const lineAlpha = (1 - dist / connectDistance) * 0.16 * Math.min(a.intensity, b.intensity);
              if (lineAlpha > 0.006) {
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

      // --- LAYER 2: High-Performance Single-Path Batch for Resting Particles ---
      if (restingParticles.length > 0) {
        // Standard resting dots
        ctx.beginPath();
        for (let i = 0; i < restingParticles.length; i++) {
          const p = restingParticles[i];
          if (!p) continue;
          ctx.moveTo(p.x + p.radius, p.y);
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        }
        ctx.fillStyle = "rgba(148, 163, 184, 0.26)"; // Subtle elegant platinum-slate
        ctx.fill();

        // Shimmering accent nodes
        ctx.beginPath();
        for (let i = 0; i < restingParticles.length; i++) {
          const p = restingParticles[i];
          if (p && p.isAccent) {
            ctx.moveTo(p.x + p.radius * 1.15, p.y);
            ctx.arc(p.x, p.y, p.radius * 1.15, 0, Math.PI * 2);
          }
        }
        ctx.fillStyle = "rgba(199, 210, 254, 0.38)";
        ctx.fill();
      }

      // --- LAYER 3: Dynamic Chromatic Active / Reacting Particles ---
      for (let i = 0; i < activeParticles.length; i++) {
        const p = activeParticles[i];
        if (!p) continue;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);

        // Fluid organic continuous chromatic wave radiating from the cursor interaction
        // Cycles smoothly across Sapphire (~215°), Royal Indigo (~245°), Soft Violet (~270°), and Platinum-Cyan (~190°)
        const wave = Math.sin(time * 1.1 + dist * 0.022 - angle * 0.95);
        const hue = (p.baseHue + wave * 42 + 360) % 360;

        const saturation = Math.round(50 + p.intensity * 45);
        const lightness = Math.round(58 + p.intensity * 24);
        const alpha = Math.min(0.28 + p.intensity * 0.68, 0.96).toFixed(3);

        // Soft aura halo for peak interacting nodes
        if (p.intensity > 0.14) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue.toFixed(1)}, ${saturation}%, ${lightness + 6}%, ${(p.intensity * 0.16).toFixed(3)})`;
          ctx.fill();
        }

        // Crisp particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue.toFixed(1)}, ${saturation}%, ${lightness}%, ${alpha})`;
        ctx.fill();
      }

      animFrameId = requestAnimationFrame(render);
    };

    initParticles();
    window.addEventListener("resize", initParticles);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);
    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", initParticles);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [
    repulsionRadius,
    attractionRadius,
    repulsionStrength,
    attractionStrength,
    connectDistance,
    enableConnections,
  ]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
