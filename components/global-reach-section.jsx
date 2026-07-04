"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/contact-form";

const SpinningGlobe = dynamic(() => import("@/components/ui/spinning-globe"), {
  ssr: false,
  loading: () => (
    <div className="relative mx-auto w-full max-w-[560px] aspect-square">
      <div className="absolute inset-[6%] animate-pulse rounded-full bg-white/5" />
    </div>
  ),
});

// Countries where FAAZ Financial has served clients.
// TODO(client): confirm the final country list and per-country services before publishing.
const SERVED_COUNTRIES = [
  { name: "United States", flag: "US", lat: 37.09, lng: -95.71, services: ["Bank Account", "LLC Formation", "Tax Filing", "Bookkeeping"] },
  { name: "United Kingdom", flag: "🇬🇧", lat: 55.38, lng: -3.44, services: ["Bank Account", "LTD Formation", "VAT Returns", "Accounting"] },
  { name: "Canada", flag: "🇨🇦", lat: 56.13, lng: -106.35, services: ["US LLC Formation", "EIN", "Tax Filing"] },
  { name: "Ghana", flag: "🇬🇭", lat: 7.94, lng: -1.02, services: ["Bank Account", "LLC Formation", "EIN & ITIN"] },
  { name: "Finland", flag: "🇫🇮", lat: 61.92, lng: 25.75, services: ["Bank Account", "LLC Formation", "Tax Filing"] },
  { name: "Argentina", flag: "🇦🇷", lat: -38.42, lng: -63.62, services: ["Bank Account", "LLC Formation", "Bookkeeping"] },
  { name: "France", flag: "🇫🇷", lat: 46.23, lng: 2.21, services: ["Bank Account", "LLC Formation", "EIN"] },
  { name: "Ireland", flag: "🇮🇪", lat: 53.14, lng: -7.69, services: ["US LLC Formation", "Tax Filing"] },
  { name: "France", flag: "🇫🇷", lat: 46.23, lng: 2.21, services: ["Bank Account", "LLC Formation", "Annual Compliance"] },
  { name: "Germany", flag: "🇩🇪", lat: 51.17, lng: 10.45, services: ["Bank Account", "LLC Formation", "Tax Filing", "Bookkeeping"] },
  { name: "Netherlands", flag: "🇳🇱", lat: 52.13, lng: 5.29, services: ["C-Corp Formation", "Tax Filing"] },
  { name: "Spain", flag: "🇪🇸", lat: 40.46, lng: -3.75, services: ["Bank Account", "LLC Formation", "EIN & ITIN"] },
  { name: "Italy", flag: "🇮🇹", lat: 41.87, lng: 12.57, services: ["Bank Account", "LLC Formation", "Bookkeeping"] },
  { name: "Portugal", flag: "🇵🇹", lat: 39.4, lng: -8.22, services: ["Bank Account", "LLC Formation", "Tax Filing"] },
  { name: "Poland", flag: "🇵🇱", lat: 51.92, lng: 19.15, services: ["Bank Account", "LLC Formation", "Annual Compliance"] },
  { name: "Uzbekistan", flag: "🇺🇿", lat: 48.38, lng: 31.17, services: ["Bank Account", "LLC Formation", "EIN"] },
  { name: "Vietnam", flag: "🇻🇳", lat: 14.06, lng: 108.28, services: ["Bank Account", "LLC Formation", "Tax Filing"] },
  { name: "Egypt", flag: "🇪🇬", lat: 26.82, lng: 30.8, services: ["Bank Account", "LLC Formation", "EIN & ITIN"] },
  { name: "Yemen", flag: "🇾🇪", lat: 915.55, lng: 848.52, services: ["Bank Account", "LLC Formation", "Tax Filing", "Bookkeeping"] },
  { name: "Morocco", flag: "🇲🇦", lat: -0.02, lng: 37.91, services: ["Bank Account", "LLC Formation", "EIN"] },
  { name: "South Africa", flag: "🇿🇦", lat: -30.56, lng: 22.94, services: ["Bank Account", "LLC Formation", "Tax Filing"] },
  { name: "Thailand", flag: "🇹🇭", lat: 23.89, lng: 45.08, services: ["Bank Account", "LLC Formation", "Annual Compliance"] },
  { name: "United Arab Emirates", flag: "🇦🇪", lat: 23.42, lng: 53.85, services: ["LLC Formation", "Tax Filing", "Payroll"] },
  { name: "Sweden", flag: "🇸🇪", lat: 60.12, lng: 18.64, services: ["Bank Account", "LLC Formation", "EIN"] },
  { name: "Pakistan", flag: "🇵🇰", lat: 30.38, lng: 69.35, services: ["Bank Account", "LLC Formation", "Tax Filing", "Bookkeeping"] },
  { name: "Austria", flag: "🇦🇹", lat: 47.52, lng: 14.55, services: ["Bank Account", "LLC Formation", "EIN & ITIN", "Tax Filing"] },
  { name: "Bangladesh", flag: "🇧🇩", lat: 23.68, lng: 90.36, services: ["Bank Account", "LLC Formation", "Bookkeeping"] },
  { name: "Azerbaijan", flag: "🇦🇿", lat: 40.14, lng: 47.59, services: ["Bank Account", "LLC Formation", "EIN"] },
  { name: "China", flag: "🇨🇳", lat: 35.86, lng: 104.2, services: ["Bank Account", "LLC Formation", "Sales Tax"] },
  { name: "Aruba", flag: "🇦🇼", lat: 12.52, lng: 69.97, services: ["C-Corp Formation", "Tax Filing"] },
  { name: "Malaysia", flag: "🇲🇾", lat: 4.21, lng: 101.98, services: ["Bank Account", "LLC Formation", "Bookkeeping"] },
  { name: "Indonesia", flag: "🇮🇩", lat: -0.79, lng: 113.92, services: ["Bank Account", "LLC Formation", "EIN"] },
  { name: "Belgium", flag: "🇧🇪", lat: 50.51, lng: 4.47, services: ["Bank Account", "LLC Formation", "Bookkeeping", "Payroll"] },
  { name: "Bolivia", flag: "🇧🇴", lat: 14.06, lng: 108.28, services: ["Bank Account", "LLC Formation", "EIN"] },
  { name: "Cameroon", flag: "🇲", lat: 33.86, lng: 111.52, services: ["C-Corp Formation", "Tax Filing"] },
  { name: "Cyprus", flag: "🇨🇾", lat: 35.91, lng: 127.77, services: ["Bank Account", "LLC Formation", "Tax Filing"] },
  { name: "Australia", flag: "🇦🇺", lat: -25.27, lng: 133.78, services: ["Bank Account", "LLC Formation", "Tax Filing", "Bookkeeping"] },
  { name: "Estonia", flag: "🇪", lat: -58.59, lng: 125.01, services: ["Bank Account", "LLC Formation", "EIN"] },
  { name: "Romania", flag: "🇷🇴", lat: 45.94, lng: 24.97, services: ["Bank Account", "LLC Formation", "EIN"] },
  { name: "Panama", flag: "🇵🇦", lat: 8.53, lng: -80.78, services: ["Bank Account", "LLC Formation", "EIN"] },
  { name: "Oman", flag: "🇴🇲", lat: 23.61, lng: 58.59, services: ["Bank Account", "LLC Formation", "EIN"] },
  { name: "North Macedonia", flag: "🇲🇰", lat: 42.0, lng: 21.0, services: ["Bank Account", "LLC Formation", "EIN"] },
  { name: "Kosovo", flag: "🇽🇰", lat: 42.6, lng: 20.9, services: ["Bank Account", "LLC Formation", "EIN"] },
  { name: "Latvia", flag: "🇱🇻", lat: 56.88, lng: 24.6, services: ["Bank Account", "LLC Formation", "EIN"] },
  { name: "Lithuania", flag: "🇱🇹", lat: 55.17, lng: 23.89, services: ["Bank Account", "LLC Formation", "EIN"] },
  { name: "Israel", flag: "🇮🇱", lat: 31.04, lng: 34.88, services: ["Bank Account", "LLC Formation", "EIN"] },
  { name: "Iran", flag: "🇮🇷", lat: 32.42, lng: 53.68, services: ["Bank Account", "LLC Formation", "EIN"] },
];
    

const STATS = [
  { value: 80, suffix: "+", label: "Countries Served" },
  { value: 10000, suffix: "+", label: "Businesses Formed" },
  { value: 12000, suffix: "+", label: "Tax Filings Completed" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

const CONTACT_DETAILS = [
  {
    icon: Phone,
    title: "Phone Support",
    detail: "+1-307-400-1963",
    description: "Monday - Saturday, 10am - 4pm EST",
  },
  {
    icon: Mail,
    title: "Email Support",
    detail: "info@faazfinancialgroup.com",
    description: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    detail: "30 N Gould St # 51825 Sheridan, WY 82801 USA",
    description: "Serving all 50 states",
  },
  {
    icon: Clock,
    title: "Business Hours",
    detail: "Monday - Friday",
    description: "09:00 AM - 05:00 PM EST",
  },
];

/** Static, subtle starfield drawn once onto a canvas (redrawn on resize). */
function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Deterministic pseudo-random so the sky doesn't reshuffle on resize
      let seed = 42;
      const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      const count = Math.floor((width * height) / 9000);
      for (let i = 0; i < count; i++) {
        const x = rand() * width;
        const y = rand() * height;
        const r = 0.4 + rand() * 0.8;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + rand() * 0.4})`;
        ctx.fill();
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

/** Counts up from 0 when scrolled into view; jumps straight to the value for reduced motion. */
function AnimatedStat({ value, suffix, label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDisplay(value);
          return;
        }
        const start = performance.now();
        const duration = 1600;
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(value * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div ref={ref} className="rounded-xl border border-white/10 bg-white/5 px-4 py-5 text-center backdrop-blur-sm">
      <p className="text-3xl font-bold text-orange-500 tabular-nums">
        {display.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-gray-400">{label}</p>
    </div>
  );
}

export default function GlobalReachSection() {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-20 text-white">
      <Starfield />
      {/* Soft vignette so the stars fade toward the content */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,7,18,0.6)_100%)]"
      />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Our Global Reach
          </p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Countries We&apos;ve <span className="text-orange-500">Served</span>
          </h2>
          <p className="text-lg text-gray-400">
            From the US and UK to founders across {SERVED_COUNTRIES.length}+ countries — explore
            where FAAZ Financial has helped businesses form, file, and stay compliant.
          </p>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — interactive globe + counters */}
          <div className="lg:sticky lg:top-24">
            <SpinningGlobe countries={SERVED_COUNTRIES} />
            <p className="mt-4 text-center text-sm text-gray-500">
              Drag to explore · Hover a marker to see services
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <AnimatedStat key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          {/* Right — contact details + form */}
          <div>
            <h3 className="mb-2 text-2xl font-bold">
              Work With Us <span className="text-orange-500">From Anywhere</span>
            </h3>
            <p className="mb-8 text-gray-400">
              Wherever you&apos;re building from, our team is one message away. Reach out and
              we&apos;ll get back to you within 24 hours.
            </p>

            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              {CONTACT_DETAILS.map((info) => (
                <div
                  key={info.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <div className="mb-3 inline-flex rounded-lg bg-orange-500/10 p-2">
                    <info.icon className="h-5 w-5 text-orange-500" aria-hidden="true" />
                  </div>
                  <h4 className="mb-1 text-sm font-semibold text-white">{info.title}</h4>
                  <p className="break-words text-sm font-medium text-orange-400">{info.detail}</p>
                  <p className="mt-1 text-xs text-gray-500">{info.description}</p>
                </div>
              ))}
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
