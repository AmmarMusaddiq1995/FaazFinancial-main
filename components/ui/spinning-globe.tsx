"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe, { Globe } from "cobe";

export type ServedCountry = {
  name: string;
  flag: string;
  lat: number;
  lng: number;
  services: string[];
};

type Props = {
  countries: ServedCountry[];
};

// Brand orange (#f97316) as normalized RGB for cobe
const GLOW_COLOR: [number, number, number] = [0.976, 0.451, 0.086];
const BASE_COLOR: [number, number, number] = [0.32, 0.36, 0.44];

// Fraction of the canvas half-width that the rendered sphere occupies.
// If overlay markers ever drift from the sphere surface, calibrate here.
const SPHERE_RADIUS_FACTOR = 0.8;

const BASE_SPEED = 0.0032; // idle auto-rotation (radians / frame)

/** lat/lng -> rotated unit-sphere coords for the current phi/theta */
function projectToSphere(lat: number, lng: number, phi: number, theta: number) {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  const x = Math.cos(latRad) * Math.sin(lngRad);
  const y = Math.sin(latRad);
  const z = Math.cos(latRad) * Math.cos(lngRad);
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const x1 = x * cosPhi + z * sinPhi;
  const z1 = -x * sinPhi + z * cosPhi;
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);
  return {
    x: x1,
    y: y * cosTheta - z1 * sinTheta,
    z: y * sinTheta + z1 * cosTheta,
  };
}

export default function SpinningGlobe({ countries }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const markerEls = useRef<(HTMLButtonElement | null)[]>([]);
  const globeRef = useRef<Globe | null>(null);

  // Rotation state lives in refs — mutated every frame without re-rendering React
  const phiRef = useRef(0.4);
  const thetaRef = useRef(0.25);
  const speedRef = useRef(0);
  const velocityRef = useRef(0);
  const dragRef = useRef<{ lastX: number; lastY: number } | null>(null);
  const activeRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);
  const sizeRef = useRef(0);
  const countriesRef = useRef(countries);
  countriesRef.current = countries;

  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  activeRef.current = active;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotionRef.current = mq.matches;
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Track the wrapper size; create the globe once, then keep its resolution in sync
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      if (w <= 0) return;
      sizeRef.current = w;
      setReady(true);
      globeRef.current?.update({ width: w * 2, height: w * 2 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // cobe v2 has no internal animation loop — we drive it with our own rAF,
  // pushing phi/theta each frame and repositioning the marker overlays.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!ready || !canvas) return;

    const positionTooltip = (x: number, y: number) => {
      const tip = tooltipRef.current;
      if (!tip) return;
      const size = sizeRef.current;
      const clampedX = Math.min(Math.max(x, 90), size - 90);
      const flipBelow = y < 130; // near the top edge, show the tooltip under the marker
      tip.style.left = `${clampedX}px`;
      tip.style.top = flipBelow ? `${y + 22}px` : `${y - 18}px`;
      tip.style.transform = flipBelow ? "translate(-50%, 0)" : "translate(-50%, -100%)";
    };

    const updateMarkers = () => {
      const size = sizeRef.current;
      const radius = (size / 2) * SPHERE_RADIUS_FACTOR;
      const center = size / 2;
      const list = countriesRef.current;
      for (let i = 0; i < list.length; i++) {
        const el = markerEls.current[i];
        if (!el) continue;
        const p = projectToSphere(list[i].lat, list[i].lng, phiRef.current, thetaRef.current);
        const screenX = center + p.x * radius;
        const screenY = center - p.y * radius;
        // Fade markers out as they rotate past the horizon
        const visibility = Math.max(0, Math.min(1, (p.z - 0.05) / 0.3));
        const scale = 0.6 + 0.4 * Math.max(0, p.z);
        el.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%) scale(${scale})`;
        el.style.opacity = String(visibility);
        el.style.pointerEvents = visibility > 0.35 ? "auto" : "none";
        el.setAttribute("aria-hidden", visibility > 0.35 ? "false" : "true");
        el.tabIndex = visibility > 0.35 ? 0 : -1;
        if (activeRef.current === i) {
          if (visibility <= 0.35) {
            activeRef.current = null;
            setActive(null);
          } else {
            positionTooltip(screenX, screenY);
          }
        }
      }
    };

    const size = sizeRef.current;
    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 20000,
      mapBrightness: 6,
      mapBaseBrightness: 0.12,
      baseColor: BASE_COLOR,
      markerColor: GLOW_COLOR,
      glowColor: GLOW_COLOR,
      markers: [],
    });
    globeRef.current = globe;

    let raf = 0;
    const frame = () => {
      const interacting = dragRef.current !== null || activeRef.current !== null;
      const targetSpeed = interacting || reducedMotionRef.current ? 0 : BASE_SPEED;
      // Ease the auto-rotation speed so pause/resume never snaps
      speedRef.current += (targetSpeed - speedRef.current) * 0.045;
      phiRef.current += speedRef.current + velocityRef.current;
      velocityRef.current *= 0.93; // drag inertia decay
      globe.update({ phi: phiRef.current, theta: thetaRef.current });
      updateMarkers();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      globeRef.current = null;
      globe.destroy();
    };
  }, [ready]);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    dragRef.current = { lastX: e.clientX, lastY: e.clientY };
    velocityRef.current = 0;
    setActive(null);
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.style.cursor = "grabbing";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = e.clientX - drag.lastX;
    const dy = e.clientY - drag.lastY;
    drag.lastX = e.clientX;
    drag.lastY = e.clientY;
    phiRef.current += dx / 160;
    thetaRef.current = Math.min(0.6, Math.max(-0.15, thetaRef.current + dy / 400));
    velocityRef.current = dx / 400;
  };

  const endDrag = (e: React.PointerEvent<HTMLCanvasElement>) => {
    dragRef.current = null;
    e.currentTarget.style.cursor = "grab";
  };

  const activeCountry = active !== null ? countries[active] : null;

  return (
    <div ref={wrapperRef} className="relative mx-auto w-full max-w-[560px] aspect-square select-none">
      {/* Atmospheric halo behind the sphere */}
      <div
        aria-hidden="true"
        className="absolute inset-[6%] rounded-full bg-orange-500/20 blur-3xl"
      />
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        aria-label="Interactive globe showing countries served by FAAZ Financial Group. Drag to rotate."
        role="img"
        className="relative h-full w-full cursor-grab [contain:layout_paint_size]"
        style={{ touchAction: "pan-y" }}
      />

      {/* Country markers — positioned every frame from the render loop */}
      {ready &&
        countries.map((country, i) => (
          <button
            key={country.name}
            ref={(el) => {
              markerEls.current[i] = el;
            }}
            type="button"
            aria-label={`${country.name}: ${country.services.join(", ")}`}
            aria-describedby={active === i ? "globe-tooltip" : undefined}
            className="absolute left-0 top-0 grid h-7 w-7 cursor-pointer place-items-center rounded-full opacity-0 focus:outline-none"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
            onFocus={() => setActive(i)}
            onBlur={() => setActive((cur) => (cur === i ? null : cur))}
            /* Plain set (not toggle): touch fires mouseenter before click,
               and a toggle would immediately close the tooltip it just opened.
               Tapping the globe background dismisses it instead. */
            onClick={() => setActive(i)}
          >
            <span
              aria-hidden="true"
              className="absolute h-4 w-4 rounded-full bg-orange-500/60 animate-ping [animation-duration:2.4s] motion-reduce:animate-none"
            />
            <span
              aria-hidden="true"
              className={`relative h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                active === i
                  ? "scale-150 bg-orange-400 shadow-[0_0_18px_5px_rgba(249,115,22,0.85)]"
                  : "bg-orange-500 shadow-[0_0_10px_2px_rgba(249,115,22,0.6)]"
              }`}
            />
          </button>
        ))}

      {/* Glassmorphism tooltip */}
      <div
        ref={tooltipRef}
        id="globe-tooltip"
        role="tooltip"
        className={`pointer-events-none absolute z-10 min-w-[170px] rounded-xl border border-white/20 bg-white/10 px-4 py-3 shadow-2xl backdrop-blur-md transition-opacity duration-200 ${
          activeCountry ? "opacity-100" : "opacity-0"
        }`}
      >
        {activeCountry && (
          <>
            <p className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-white">
              <span aria-hidden="true">{activeCountry.flag}</span>
              {activeCountry.name}
            </p>
            <ul className="space-y-0.5">
              {activeCountry.services.map((service) => (
                <li key={service} className="flex items-center gap-1.5 text-xs text-gray-300">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-orange-500" />
                  {service}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
