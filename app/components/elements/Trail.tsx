"use client";

import { useEffect, useMemo, useRef } from "react";
import { useAnimationFrame, useMotionValue, useVelocity } from "motion/react";

export type TrailProps = {
  /** Hex color like #1E448F */
  color?: string;
  /** Size multiplier for radius/blur (0.25..3). Default 1 */
  size?: number;
  /** Strength multiplier for brightness (0..2). Default 1 */
  strength?: number;
  /** Higher = lingers longer (0.2..3). Default 1 */
  persistence?: number;
  /** Tailwind z-index class to position the canvas, e.g. 'z-50' */
  zIndexClass?: string;
};

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const h = hex.trim();
  const m3 = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(h);
  if (m3) {
    const r = parseInt(m3[1] + m3[1], 16);
    const g = parseInt(m3[2] + m3[2], 16);
    const b = parseInt(m3[3] + m3[3], 16);
    return { r, g, b };
  }
  const m6 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  if (m6) {
    const r = parseInt(m6[1], 16);
    const g = parseInt(m6[2], 16);
    const b = parseInt(m6[3], 16);
    return { r, g, b };
  }
  return null;
}

// Canvas-based glow trail that reacts to mouse speed using Framer Motion motion values.
// - Invisible at rest (canvas is cleared when intensity drops below threshold)
// - On movement, draws a blurred, additive glow that brightens with speed
export const Trail = ({
  color: colorHex = "#1E448F",
  size = 1,
  strength = 1,
  persistence = 1,
  zIndexClass = "-z-50",
}: TrailProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dprRef = useRef<number>(
    typeof window === "undefined" ? 1 : window.devicePixelRatio || 1
  );

  // Track pointer position via Motion Values, and derive velocity from them.
  const mx = useMotionValue<number>(-10_000);
  const my = useMotionValue<number>(-10_000);
  const vx = useVelocity(mx);
  const vy = useVelocity(my);

  const color = useMemo(() => {
    return (
      hexToRgb(colorHex) || {
        r: 30,
        g: 68,
        b: 143,
      }
    );
  }, [colorHex]);

  // Clamp and precompute scales
  const sizeScale = Math.max(0.25, Math.min(size, 3));
  const strengthScale = Math.max(0, Math.min(strength, 2));
  const persistenceScale = Math.max(0.2, Math.min(persistence, 3));

  // Resize canvas to device pixel ratio for crisp rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setup = () => {
      const dpr = (dprRef.current = Math.min(window.devicePixelRatio || 1, 2));
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctxRef.current = ctx;
      ctx.clearRect(0, 0, w, h);
    };

    setup();
    window.addEventListener("resize", setup);
    return () => window.removeEventListener("resize", setup);
  }, []);

  // Capture pointer movement and feed Motion Values
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const onLeave = () => {
      // Let intensity decay naturally by not updating position further
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [mx, my]);

  // Smooth intensity based on speed; keep in ref to avoid re-renders
  const intensityRef = useRef(0);

  useAnimationFrame(() => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    const w = canvas.width / dprRef.current;
    const h = canvas.height / dprRef.current;

    // Speed in px/s derived from Motion's velocity values
    const speed = Math.hypot(vx.get() || 0, vy.get() || 0);
    // Map speed (0..~1500+ px/s) to 0..1 intensity
    const target = Math.max(0, Math.min(speed / 1400, 1));
    // Keep rise responsive; make decay slower as persistence increases
    const k = target > intensityRef.current ? 0.2 : 0.06 / persistenceScale;
    intensityRef.current += (target - intensityRef.current) * k;

    const intensity = intensityRef.current;

    // At rest, don't hard-clear; let it fade naturally for a gentler disappearance
    if (intensity < 0.01) {
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${(0.02 / persistenceScale).toFixed(4)})`; // very slow fade
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
      return;
    }

    // Gently fade previous frame to create a trailing veil on a transparent canvas
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    // Lower fade overall so trail is less aggressive and lingers longer
    const fade = (0.015 + (1 - intensity) * 0.045) / persistenceScale; // ~0.015..0.06 scaled
    ctx.fillStyle = `rgba(0,0,0,${fade})`;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    // Draw glow at cursor position with additive blending and blur
    const x = mx.get();
    const y = my.get();
    if (x < -9_000 || y < -9_000) return; // haven't seen the pointer yet

    const baseRadius = 36 * sizeScale; // px
    const radius = baseRadius + intensity * (72 * sizeScale); // scaled size
    const blurPx = 8 * sizeScale + intensity * (14 * sizeScale); // reduced blur, scaled
    const alpha = (0.05 + intensity * 0.22) * strengthScale; // overall brightness

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.filter = `blur(${blurPx}px)`;

    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);
    grad.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  return (
    <div
      className={`w-full h-screen ${zIndexClass} top-0 left-0 overflow-hidden bg-none fixed`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        // Ensure it never blocks interactions
        className="pointer-events-none block w-full h-full"
      />
    </div>
  );
};