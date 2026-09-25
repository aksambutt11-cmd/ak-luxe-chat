import { useEffect, useRef } from "react";

/** Subtle cursor-reactive flowing lines + particles behind the chat. */
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
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const palette = ["96,165,250", "56,189,248", "129,140,248", "167,139,250"];
    const particles = Array.from({ length: 46 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.3 + Math.random() * 0.7,
      vx: (Math.random() - 0.5) * 0.00012,
      vy: (Math.random() - 0.5) * 0.00012,
    }));

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    const onLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };

    const draw = (t: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      ctx.clearRect(0, 0, w, h);
      const px = mouse.x > -999 ? (mouse.x / w - 0.5) : 0;
      const py = mouse.y > -999 ? (mouse.y / h - 0.5) : 0;

      // flowing market / data curves
      for (let i = 0; i < 6; i++) {
        const depth = 0.4 + i * 0.12;
        const baseY = h * (0.2 + i * 0.13) + py * 40 * depth;
        ctx.beginPath();
        for (let x = -20; x <= w + 20; x += 18) {
          const wave =
            Math.sin(x * 0.004 + t * 0.00025 * (1 + i * 0.2) + i) * 26 +
            Math.sin(x * 0.011 + t * 0.0004 + i * 2) * 8;
          let y = baseY + wave;
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const d2 = dx * dx + dy * dy;
          y += (dy / Math.sqrt(d2 + 1)) * 34 * Math.exp(-d2 / 26000);
          const xx = x + px * 30 * depth;
          if (x === -20) ctx.moveTo(xx, y);
          else ctx.lineTo(xx, y);
        }
        const c = palette[i % palette.length];
        ctx.strokeStyle = `rgba(${c},${0.05 + depth * 0.05})`;
        ctx.lineWidth = 1;
        ctx.shadowColor = `rgba(${c},0.5)`;
        ctx.shadowBlur = 8;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      // particles / nodes
      const pts = particles.map((p) => {
        if (!reduce) {
          p.x = (p.x + p.vx + 1) % 1;
          p.y = (p.y + p.vy + 1) % 1;
        }
        let x = p.x * w + px * 50 * p.z;
        let y = p.y * h + py * 50 * p.z;
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 160) {
          x += (dx / (d + 1)) * (160 - d) * 0.12;
          y += (dy / (d + 1)) * (160 - d) * 0.12;
        }
        return { x, y, z: p.z };
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = dx * dx + dy * dy;
          if (d < 14000) {
            ctx.strokeStyle = `rgba(129,140,248,${0.08 * (1 - d / 14000)})`;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = `rgba(147,197,253,${0.25 + p.z * 0.35})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 0.8 + p.z * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="network-field" aria-hidden="true" />;
}
