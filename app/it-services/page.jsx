"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Code2,
  Sparkles,
  Bot,
  Workflow,
  Globe,
  ShoppingCart,
  ExternalLink,
  ArrowRight,
  Terminal,
  Cpu,
} from "lucide-react";

import { CALENDLY_URL } from "@/components/accounting-service-template";

gsap.registerPlugin(ScrollTrigger);

// ── Data ─────────────────────────────────────────────────────────────────────
const services = [
  {
    icon: Globe,
    title: "Custom Web Development",
    description:
      "Responsive, fast-loading websites and web apps built with Next.js and React, tailored to your brand and business goals.",
    gradient: "from-blue-500 to-cyan-400",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce & Business Sites",
    description:
      "Full storefronts designed to convert visitors into customers with clean UX and built-in SEO foundations.",
    gradient: "from-purple-500 to-pink-400",
    glow: "rgba(168,85,247,0.15)",
  },
  {
    icon: Bot,
    title: "AI Chatbots & Assistants",
    description:
      "Custom AI-powered assistants for customer support, lead capture, and internal tooling, connected to your data.",
    gradient: "from-orange-500 to-amber-400",
    glow: "rgba(249,115,22,0.15)",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Automate repetitive business processes using AI and no-code integrations — forms, emails, reports, and more.",
    gradient: "from-emerald-500 to-teal-400",
    glow: "rgba(16,185,129,0.15)",
  },
];

const portfolioProjects = [
  {
    title: "Nayl Luxury Rentals",
    category: "Web Development",
    description:
      "Custom-built website for a luxury car rental company in UAE, featuring modern design and seamless booking functionality.",
    tags: ["Next.js", "Tailwind CSS", "Strapi CMS"],
    link: "https://naylrentalcardxb.com",
    accentColor: "#f97316",
    borderColor: "rgba(249,115,22,0.3)",
  },
  {
    title: "AI-Powered Lead Capture",
    category: "AI Automation",
    description:
      "An AI lead capture system that integrates with CRM and email tools to automatically qualify and nurture leads.",
    tags: ["OpenAI API", "Google Sheets", "N8N", "Gmail API"],
    link: "#",
    accentColor: "#8b5cf6",
    borderColor: "rgba(139,92,246,0.3)",
  },
  {
    title: "Future Cell & Gadgets",
    category: "E-Commerce",
    description:
      "Sleek e-commerce site for a mobile phone retailer with Next.js and PostgreSQL for inventory management.",
    tags: ["React", "Tailwind CSS", "Supabase", "PostgreSQL"],
    link: "https://futurecellandgadgets.vercel.app",
    accentColor: "#06b6d4",
    borderColor: "rgba(6,182,212,0.3)",
  },
  {
    title: "The Talent Management HUB",
    category: "Web Development",
    description:
      "Custom-built website for a finance company, featuring a modern design and seamless user experience.",
    tags: ["Next.js", "Tailwind CSS", "Supabase", "Acternity UI", "Shadcn UI"],
    link: "business.ttmhub.co",
    accentColor: "#06b6d4",
    borderColor: "rgba(6,182,212,0.3)",
  },
   {
    title: "AI-Powered Hotel Room Booking Assistant",
    category: "AI Automation",
    description:
      "Custom AI-powered hotel room booking assistant integrated with your existing systems, responsible for booking rooms, verifying payments, updating CRM, all on autopilot.",
    tags: ["Google Sheets", "N8N", "Gmail API", "Air Tables", "OpenAI Vision API"],
    link: "#",
    accentColor: "#f97316",
    borderColor: "rgba(249,115,22,0.3)",
  },
  {
    title: "AI-Powered Customer Support Chatbot",
    category: "AI Automation",
    description:
      "An AI-powered customer support chatbot that integrates with your existing systems to provide seamless assistance.",
    tags: ["OpenAI API", "Google Sheets", "N8N", "Gmail API", "Lovable AI"],
    link: "#",
    accentColor: "#8b5cf6",
    borderColor: "rgba(139,92,246,0.3)",
  },
];

const stats = [
  { value: 5, suffix: "+", label: "Projects Shipped" },
  { value: 3, suffix: "", label: "Countries Served" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "Support Available" },
];

const processSteps = [
  { n: "01", title: "Discover", body: "We learn your goals, users, and constraints through a discovery call." },
  { n: "02", title: "Design", body: "Wireframes and prototypes aligned to your brand and conversion goals." },
  { n: "03", title: "Build", body: "Production-ready code deployed to fast, secure, global infrastructure." },
  { n: "04", title: "Launch", body: "Go-live support, performance monitoring, and post-launch iterations." },
];

const techStack = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL",
  "OpenAI", "N8N", "Vercel", "Node.js", "Strapi CMS", "Framer Motion", "GSAP", "Three.js", "Stripe",
];

// ── Stat Counter ─────────────────────────────────────────────────────────────
function StatCounter({ value, suffix, label }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2200;
          let startTime = null;
          const step = (ts) => {
            if (!startTime) startTime = ts;
            const pct = Math.min((ts - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - pct, 3);
            setCount(Math.floor(ease * value));
            if (pct < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <p className="text-4xl xl:text-5xl font-black bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent tabular-nums">
        {count}{suffix}
      </p>
      <p className="text-sm text-white/40 mt-2 font-medium tracking-wide">{label}</p>
    </motion.div>
  );
}

// ── 3-D Tilt Project Card ─────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-120, 120], [10, -10]);
  const rotY = useTransform(mx, [-120, 120], [-10, 10]);

  const onMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border bg-white/[0.04] overflow-hidden cursor-default"
      style={{ borderColor: project.borderColor }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 inset-x-0 h-px opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }}
      />

      <div className="p-6 flex flex-col h-full gap-4">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: `${project.accentColor}18`, color: project.accentColor }}
          >
            {project.category}
          </span>
          {project.link !== "#" && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="text-white/30 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        <h3 className="text-xl font-bold text-white">{project.title}</h3>
        <p className="text-sm text-white/55 leading-relaxed flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded bg-white/8 text-white/50">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover inner glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 60px ${project.accentColor}12` }}
      />
    </motion.div>
  );
}

// ── Service Card ──────────────────────────────────────────────────────────────
function ServiceCard({ service, index }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative rounded-2xl border border-white/8 bg-white/[0.03] p-6 overflow-hidden cursor-default"
      style={{ "--glow": service.glow }}
    >
      {/* Animated gradient top border */}
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-400`}
      />

      {/* Icon */}
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} mb-5 opacity-90`}>
        <Icon className="h-5 w-5 text-white" />
      </div>

      <h3 className="text-base font-bold text-white mb-3 leading-snug">{service.title}</h3>
      <p className="text-sm text-white/50 leading-relaxed">{service.description}</p>

      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse at 50% 0%, var(--glow) 0%, transparent 70%)` }}
      />
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ITServicesPage() {
  const canvasRef = useRef(null);
  const processLineRef = useRef(null);
  const heroTitleRef = useRef(null);

  // ── Three.js Neural Network ─────────────────────────────────────────────────
  useEffect(() => {
    let rafId;
    let disposeThree;

    const init = async () => {
      const THREE = (await import("three")).default || (await import("three"));
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Scene
      const scene = new THREE.Scene();
      const w = canvas.clientWidth, h = canvas.clientHeight;
      const camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 100);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(w, h);

      // Particles
      const COUNT = 110;
      const pos = new Float32Array(COUNT * 3);
      const vel = [];
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 14;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
        vel.push({
          x: (Math.random() - 0.5) * 0.006,
          y: (Math.random() - 0.5) * 0.006,
          z: (Math.random() - 0.5) * 0.003,
        });
      }
      const pGeo = new THREE.BufferGeometry();
      const pAttr = new THREE.BufferAttribute(pos, 3);
      pGeo.setAttribute("position", pAttr);
      const pMat = new THREE.PointsMaterial({ color: 0xf97316, size: 0.055, transparent: true, opacity: 0.85, sizeAttenuation: true });
      scene.add(new THREE.Points(pGeo, pMat));

      // Lines
      const MAX_LINES = COUNT * 6;
      const lPos = new Float32Array(MAX_LINES * 6);
      const lGeo = new THREE.BufferGeometry();
      const lAttr = new THREE.BufferAttribute(lPos, 3);
      lAttr.setUsage(35048); // THREE.DynamicDrawUsage
      lGeo.setAttribute("position", lAttr);
      const lMat = new THREE.LineBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.12 });
      const lines = new THREE.LineSegments(lGeo, lMat);
      scene.add(lines);

      // Second (white) accent particles — smaller
      const accentPos = new Float32Array(40 * 3);
      for (let i = 0; i < 40; i++) {
        accentPos[i * 3]     = (Math.random() - 0.5) * 14;
        accentPos[i * 3 + 1] = (Math.random() - 0.5) * 9;
        accentPos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      }
      const aGeo = new THREE.BufferGeometry();
      aGeo.setAttribute("position", new THREE.BufferAttribute(accentPos, 3));
      scene.add(new THREE.Points(aGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.4 })));

      // Mouse parallax
      let mx = 0, my = 0;
      const onMouse = (e) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouse);

      const onResize = () => {
        if (!canvas) return;
        const nw = canvas.clientWidth, nh = canvas.clientHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      };
      window.addEventListener("resize", onResize);

      // Animate
      const THRESHOLD = 2.8;
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        const p = pGeo.attributes.position.array;

        for (let i = 0; i < COUNT; i++) {
          p[i * 3]     += vel[i].x;
          p[i * 3 + 1] += vel[i].y;
          p[i * 3 + 2] += vel[i].z;
          if (Math.abs(p[i * 3])     > 7)  vel[i].x *= -1;
          if (Math.abs(p[i * 3 + 1]) > 4.5) vel[i].y *= -1;
          if (Math.abs(p[i * 3 + 2]) > 2)  vel[i].z *= -1;
        }
        pGeo.attributes.position.needsUpdate = true;

        // Rebuild line segments
        let seg = 0;
        const lp = lGeo.attributes.position.array;
        for (let i = 0; i < COUNT - 1 && seg < MAX_LINES; i++) {
          for (let j = i + 1; j < COUNT && seg < MAX_LINES; j++) {
            const dx = p[i*3]   - p[j*3];
            const dy = p[i*3+1] - p[j*3+1];
            const dz = p[i*3+2] - p[j*3+2];
            if (dx*dx + dy*dy + dz*dz < THRESHOLD * THRESHOLD) {
              lp[seg*6]   = p[i*3];   lp[seg*6+1] = p[i*3+1]; lp[seg*6+2] = p[i*3+2];
              lp[seg*6+3] = p[j*3];   lp[seg*6+4] = p[j*3+1]; lp[seg*6+5] = p[j*3+2];
              seg++;
            }
          }
        }
        lGeo.setDrawRange(0, seg * 2);
        lGeo.attributes.position.needsUpdate = true;

        camera.position.x += (mx * 0.6 - camera.position.x) * 0.04;
        camera.position.y += (-my * 0.4 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };
      animate();

      disposeThree = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        pGeo.dispose(); pMat.dispose();
        lGeo.dispose(); lMat.dispose();
      };
    };

    init();
    return () => disposeThree?.();
  }, []);

  // ── GSAP Hero Title Word Reveal ─────────────────────────────────────────────
  useEffect(() => {
    const el = heroTitleRef.current;
    if (!el) return;
    const words = el.querySelectorAll(".hw");
    const ctx = gsap.context(() => {
      gsap.fromTo(words,
        { y: "105%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power4.out",
          delay: 0.3,
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  // ── GSAP Process Line Draw ──────────────────────────────────────────────────
  useEffect(() => {
    const line = processLineRef.current;
    if (!line) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(line,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.8,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: line,
            start: "top 75%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#050810] text-white overflow-x-hidden">
      <Header />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Three.js canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 0 }}
        />

        {/* Radial dark overlay so text is readable */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(5,8,16,0.55) 0%, rgba(5,8,16,0.92) 100%)",
          }}
        />
        {/* Bottom fade into next section */}
        <div
          className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
          style={{ zIndex: 1, background: "linear-gradient(to bottom, transparent, #050810)" }}
        />

        {/* Hero content */}
        <div className="relative container px-4 mx-auto text-center max-w-4xl" style={{ zIndex: 2 }}>
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 text-orange-400 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
          >
            <Sparkles className="h-4 w-4" />
            Web Development & AI Automation
          </motion.span>

          {/* Headline — each line wrapped for GSAP slide-up */}
          <h1
            ref={heroTitleRef}
            className="text-4xl md:text-6xl xl:text-7xl font-black tracking-tight leading-none mb-8 select-none"
          >
            <span className="overflow-hidden block">
              <span className="hw inline-block">Websites &amp;</span>
            </span>
            <span className="overflow-hidden block mt-1">
              <span className="hw inline-block bg-gradient-to-r from-orange-400 via-orange-500 to-amber-300 bg-clip-text text-transparent">
                AI Automation
              </span>
            </span>
            <span className="overflow-hidden block mt-3">
              <span className="hw inline-block text-2xl md:text-3xl xl:text-4xl text-white/50 font-light tracking-normal">
                Built for Your Business
              </span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="text-base md:text-xl text-white/55 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Alongside compliance and bookkeeping, we design, build, and automate the technology
            that helps your business run smarter and look professional online.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Button
                  size="lg"
                  className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-8 py-6 text-base font-semibold rounded-xl group"
                  style={{ boxShadow: "0 0 40px rgba(249,115,22,0.35)" }}
                >
                  Start a Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
            <a href="#portfolio">
              <Button
                size="lg"
                variant="outline"
                className="border-white/15 text-black cursor-pointer hover:bg-white/8 px-8 py-6 text-base font-semibold rounded-xl backdrop-blur-sm"
              >
                View Our Work
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Scroll nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/25"
          style={{ zIndex: 2 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-7 bg-gradient-to-b from-white/25 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="py-16 border-y border-white/5 bg-white/[0.015]">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((s, i) => (
              <StatCounter key={i} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section id="services" className="py-24 lg:py-32">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold tracking-[0.25em] text-orange-400 uppercase mb-3 block">
              What We Build
            </span>
            <h2 className="text-3xl lg:text-5xl font-black mb-4">
              Full-Stack{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-base lg:text-lg leading-relaxed">
              From a single landing page to a fully automated back office — we cover the full stack.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc, i) => (
              <ServiceCard key={i} service={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Marquee ─────────────────────────────────────────────────── */}
      <div className="py-8 border-y border-white/5 overflow-hidden select-none">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex gap-10 whitespace-nowrap"
        >
          {[...techStack, ...techStack].map((t, i) => (
            <span
              key={i}
              className="text-sm font-medium text-white/20 hover:text-orange-400/70 transition-colors cursor-default"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Portfolio ────────────────────────────────────────────────────── */}
      <section id="portfolio" className="py-24 lg:py-32">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold tracking-[0.25em] text-orange-400 uppercase mb-3 block">
              Our Work
            </span>
            <h2 className="text-3xl lg:text-5xl font-black mb-4">
              Recent{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-base lg:text-lg leading-relaxed">
              A sample of recent builds. Reach out for a full case study walkthrough.
            </p>
          </motion.div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ perspective: "1400px" }}
          >
            {portfolioProjects.map((p, i) => (
              <ProjectCard key={i} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 border-y border-white/5 bg-white/[0.015]">
        <div className="container px-4 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-xs font-semibold tracking-[0.25em] text-orange-400 uppercase mb-3 block">
              How We Work
            </span>
            <h2 className="text-3xl lg:text-5xl font-black">
              From Idea to{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                Launch
              </span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* GSAP-animated connecting line (desktop only) */}
            <div
              ref={processLineRef}
              className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(249,115,22,0.5) 20%, rgba(249,115,22,0.5) 80%, transparent)",
              }}
            />

            <div className="grid md:grid-cols-4 gap-8 md:gap-6">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                  className="relative text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(249,115,22,0.25)" }}
                    transition={{ duration: 0.2 }}
                    className="w-20 h-20 rounded-full border border-orange-500/30 bg-orange-500/8 flex items-center justify-center mx-auto mb-6 relative z-10 cursor-default"
                  >
                    <span className="text-2xl font-black text-orange-400">{step.n}</span>
                  </motion.div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{step.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Terminal Callout ─────────────────────────────────────────────── */}
      <section className="py-24 lg:py-28">
        <div className="container px-4 mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/8 bg-[#0d1117] overflow-hidden"
            style={{ boxShadow: "0 0 80px rgba(249,115,22,0.07)" }}
          >
            {/* Terminal bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-white/[0.03]">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-white/25 font-mono">faaz-ai-automation ~ build</span>
            </div>

            {/* Terminal body */}
            <div className="p-6 font-mono text-sm space-y-2 leading-relaxed">
              <TerminalLine delay={0.2} color="text-green-400">$ npm create next-app faaz-project</TerminalLine>
              <TerminalLine delay={0.7} color="text-white/60">✔ Framework: Next.js 15 (App Router)</TerminalLine>
              <TerminalLine delay={1.1} color="text-white/60">✔ Database: Supabase + PostgreSQL</TerminalLine>
              <TerminalLine delay={1.5} color="text-white/60">✔ AI: OpenAI + N8N workflows wired</TerminalLine>
              <TerminalLine delay={1.9} color="text-white/60">✔ CMS: Strapi headless connected</TerminalLine>
              <TerminalLine delay={2.3} color="text-orange-400">✔ Deployed: https://your-project.vercel.app</TerminalLine>
              <TerminalLine delay={2.7} color="text-white/25">▌</TerminalLine>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Background radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)" }}
          />
        </div>

        <div className="container px-4 mx-auto text-center max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <Code2 className="h-10 w-10 text-orange-500/60 mx-auto mb-6" />
            <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
              Have a Web or
              <span className="block bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                Automation Project?
              </span>
            </h2>
            <p className="text-white/45 text-base lg:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Tell us what you're trying to build or automate, and we'll get back to you with next steps.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
             
                <Button
                  size="lg"
                  className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-12 py-7 text-lg font-bold rounded-2xl group"
                  style={{ boxShadow: "0 0 60px rgba(249,115,22,0.3)" }}
                >
                  Book A Discovery Call
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ── Animated Terminal Line ────────────────────────────────────────────────────
function TerminalLine({ children, delay = 0, color = "text-white/70" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay * 1000);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -8 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35 }}
      className={`${color}`}
    >
      {children}
    </motion.div>
  );
}
