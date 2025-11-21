import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Smartphone,
  Server,
  LayoutGrid,
  Rocket,
  Star,
  Quote,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Award,
  Briefcase,
  Palette,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import dharmaImage from "@/assets/Dharma.png";

/**
 * Dharmaraja — Premium Creative Developer Portfolio
 * Enhanced with: 3D effects, animated mesh gradients, particle effects, advanced animations
 * Design: Ultra-modern, creative, unique, top-notch visual experience
 */

// ====== Enhanced Theming ======
const bgDark = "bg-[#0A0E1A]"; // deeper, richer dark background
const textMuted = "text-zinc-400";
const glass =
  "backdrop-blur-xl bg-white/[0.08] border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]";
const glassStrong =
  "backdrop-blur-2xl bg-white/[0.12] border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]";
const ringGrad =
  "ring-1 ring-white/20 hover:ring-white/40 transition-all duration-500";
const accentGradient =
  "bg-gradient-to-br from-emerald-400 via-cyan-400 via-blue-500 to-purple-600";
const textGradient =
  "bg-gradient-to-r from-emerald-300 via-cyan-300 via-blue-300 to-purple-400 bg-clip-text text-transparent";
const textGradientAlt =
  "bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent";

// ====== Data (edit me) ======
const SOCIALS = [
  { label: "GitHub", icon: Github, href: "https://github.com/yourname" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/yourname" },
  { label: "Email", icon: Mail, href: "mailto:dharmaraja@example.com" },
];

const TECH = [
  { name: "Flutter", tag: "Mobile & Web", hint: "Dart, Riverpod/BLoC, CI/CD" },
  { name: "Kotlin Multiplatform", tag: "Android • iOS • Desktop • Web", hint: "Compose Multiplatform" },
  { name: "React.js", tag: "Frontend", hint: "Vite/Next.js, Hooks, RTK" },
  { name: "FastAPI", tag: "Backend", hint: "Async, JWT, SQL/NoSQL" },
  { name: "Firebase", tag: "Infra", hint: "Auth, Firestore, Hosting" },
  { name: "CI/CD", tag: "DevOps", hint: "GitHub Actions, Fastlane" },
];

const PROJECTS = [
  {
    title: "Cross‑Platform Mastery",
    spotlight: true,
    description:
      "A unified app suite built with Kotlin Multiplatform (shared domain+data), Compose Multiplatform UI, Flutter companion app, and a FastAPI backend. Single source of truth, multi‑device delivery.",
    tech: ["KMP", "Compose", "Flutter", "FastAPI", "Postgres", "Docker"],
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop",
    live: "#",
    code: "#",
  },
  {
    title: "Realtime POS Dashboard",
    description:
      "Tablet‑first POS with offline sync, role‑based access, and live analytics.",
    tech: ["Flutter", "Riverpod", "Firebase"],
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1400&auto=format&fit=crop",
    live: "#",
    code: "#",
  },
  {
    title: "AI Knowledge Portal",
    description:
      "React + FastAPI platform for embeddings search, docs Q&A, and team notes.",
    tech: ["React", "FastAPI", "OpenAI", "Docker"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
    live: "#",
    code: "#",
  },
  {
    title: "Fitness Tracker",
    description:
      "KMP shared business logic with native Android/iOS UIs, health APIs, charts.",
    tech: ["KMP", "Android", "SwiftUI", "Ktor"],
    image: "https://images.unsplash.com/photo-1546484959-f9a53db89f9e?q=80&w=1400&auto=format&fit=crop",
    live: "#",
    code: "#",
  },
  {
    title: "Commerce Web App",
    description:
      "React storefront with SSR, edge caching, and checkout integration.",
    tech: ["React", "Next.js", "Stripe"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop",
    live: "#",
    code: "#",
  },
  {
    title: "Team Retro Board",
    description:
      "Realtime retro board using Flutter Web + Firebase with presence and votes.",
    tech: ["Flutter", "Firebase", "Web"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop",
    live: "#",
    code: "#",
  },
];

const EXPERIENCE = [
  {
    role: "Freelance Multiplatform Engineer",
    org: "Independent",
    period: "2023 — Present",
    bullets: [
      "Delivered cross‑platform apps using KMP + Flutter",
      "Built FastAPI backends with JWT + CI/CD",
      "Scaled frontends with React and SSR",
    ],
  },
  {
    role: "Mobile Developer",
    org: "Tech Studio",
    period: "2021 — 2023",
    bullets: [
      "Architected modular Flutter apps (BLoC/Riverpod)",
      "Implemented analytics, A/B tests, and feature flags",
      "Optimized build pipelines and release automation",
    ],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Dharmaraja ships fast and sweats the details. Our multi‑platform rollout was seamless.",
    from: "Product Lead, Fintech Co.",
    stat: { icon: Star, label: "Play Store rating", value: "4.8★" },
  },
  {
    quote:
      "He designed a clean KMP architecture that cut our duplicate code by 60%.",
    from: "Engineering Manager, HealthTech",
    stat: { icon: Rocket, label: "Ship speed", value: "2× faster" },
  },
];

// ====== Reusable UI ======
const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`scroll-mt-24 ${className}`}>{children}</section>
);

const SectionTitle = ({ kicker, title, desc }) => (
  <motion.div
    className="max-w-4xl mx-auto text-center mb-16"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {kicker && (
      <motion.p
        className="text-xs tracking-[0.2em] uppercase mb-4 inline-flex items-center gap-2"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <Sparkles size={12} className="text-emerald-400" />
        <span className={textGradient}>{kicker}</span>
      </motion.p>
    )}
    <motion.h2
      className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${textGradient}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      {title}
    </motion.h2>
    {desc && (
      <motion.p
        className={`mt-4 text-lg ${textMuted} max-w-2xl mx-auto leading-relaxed`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {desc}
      </motion.p>
    )}
  </motion.div>
);

// ====== Animated Mesh Gradient Background ======
const AnimatedMeshGradient = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const gradientX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const gradientY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${gradientX} ${gradientY}, 
            rgba(16, 185, 129, 0.15) 0%, 
            rgba(6, 182, 212, 0.12) 25%, 
            rgba(59, 130, 246, 0.1) 50%, 
            rgba(147, 51, 234, 0.15) 75%, 
            rgba(236, 72, 153, 0.1) 100%)
        `,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.12),transparent_50%)]" />
    </motion.div>
  );
};

// ====== Floating Particles ======
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 });
  
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(${Math.random() > 0.5 ? '16, 185, 129' : '147, 51, 234'}, ${Math.random() * 0.5 + 0.3})`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const Glow = ({ className = "" }) => (
  <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
    <motion.div
      className="absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.6, 0.4],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        background: "radial-gradient(circle, rgba(16, 185, 129, 0.4), transparent 70%)",
      }}
    />
    <motion.div
      className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl"
      animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        background: "radial-gradient(circle, rgba(147, 51, 234, 0.4), transparent 70%)",
      }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-3xl"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        background: "radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent 70%)",
      }}
    />
  </div>
);

const NavLink = ({ href, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.a
      href={href}
      className={`relative px-3 py-2 text-sm ${textMuted} hover:text-white transition-colors`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

const Badge = ({ children }) => (
  <motion.span
    whileHover={{ scale: 1.1, y: -2 }}
    className="px-3 py-1 text-[10px] rounded-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 backdrop-blur-sm font-medium text-white/90"
  >
    {children}
  </motion.span>
);

const ProjectCard = ({ p }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  return (
  <motion.div
      ref={cardRef}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -12, scale: 1.02 }}
      className={`group relative ${glassStrong} ${ringGrad} rounded-3xl overflow-hidden cursor-pointer`}
      style={{
        perspective: "1000px",
      }}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(147, 51, 234, 0.3))",
          padding: "2px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      
    <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img
          src={p.image}
          alt={p.title}
          className="h-full w-full object-cover"
          animate={{
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      {p.spotlight && (
          <motion.div
            className="absolute top-4 left-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <span className="text-[10px] px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 text-white font-medium shadow-lg flex items-center gap-1">
              <Sparkles size={10} /> Spotlight
            </span>
          </motion.div>
        )}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          animate={{
            opacity: isHovered ? 0.6 : 0.5,
          }}
        />
        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{
            x: isHovered ? "200%" : "-100%",
          }}
          transition={{ duration: 0.8 }}
        />
    </div>
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between gap-4 mb-3">
          <motion.h3
            className="text-xl font-bold text-white"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
          >
            {p.title}
          </motion.h3>
        <div className="flex gap-2">
            <motion.a
              href={p.live}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 border border-emerald-500/30 text-white backdrop-blur-sm transition-all"
            >
              Live <ExternalLink size={12} />
            </motion.a>
            <motion.a
              href={p.code}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30 text-white backdrop-blur-sm transition-all"
            >
              Code <Code2 size={12} />
            </motion.a>
          </div>
        </div>
        <p className={`${textMuted} text-sm leading-relaxed mb-4`}>{p.description}</p>
        <div className="flex flex-wrap gap-2">
          {p.tech.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Badge>{t}</Badge>
            </motion.div>
        ))}
      </div>
    </CardContent>
  </motion.div>
);
};

const TimelineItem = ({ role, org, period, bullets }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      className="relative pl-8"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute left-0 top-2 h-4 w-4 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-400 to-purple-500 shadow-lg"
        animate={{
          scale: isHovered ? 1.5 : 1,
          boxShadow: isHovered
            ? "0 0 20px rgba(16, 185, 129, 0.6)"
            : "0 0 10px rgba(16, 185, 129, 0.3)",
        }}
      />
      <motion.div
        className={`${glassStrong} rounded-2xl p-6 cursor-pointer`}
        whileHover={{ x: 8, scale: 1.02 }}
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-white font-bold text-lg">{role}</h4>
          <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 font-medium">{period}</span>
      </div>
        <p className="text-white/80 text-sm mb-4 font-medium">{org}</p>
        <ul className="space-y-2">
        {bullets.map((b, i) => (
            <motion.li
              key={i}
              className="text-sm text-white/70 flex items-start gap-2"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-emerald-400 mt-1.5">▸</span>
              <span>{b}</span>
            </motion.li>
        ))}
      </ul>
      </motion.div>
    </motion.div>
  );
};

const Testimonial = ({ t }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative ${glassStrong} rounded-3xl p-8 h-full overflow-hidden`}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        animate={{
          opacity: isHovered ? 0.1 : 0,
        }}
        style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(147, 51, 234, 0.2))",
        }}
      />
      <motion.div
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <Quote className="mb-4 opacity-60 text-emerald-400" size={32} />
      </motion.div>
      <p className="text-white/90 text-lg leading-relaxed relative z-10">"{t.quote}"</p>
      <div className="mt-6 flex items-center justify-between relative z-10">
        <span className="text-sm font-medium text-white/70">{t.from}</span>
        <motion.span
          whileHover={{ scale: 1.1 }}
          className="text-xs inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-white backdrop-blur-sm"
        >
        <t.stat.icon size={14} /> {t.stat.value}
        </motion.span>
    </div>
  </motion.div>
);
};

// ====== Page component ======
export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.2 });

  const [sending, setSending] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const message = form.get("message");

    // Demo submission: open mail client. Replace with your API endpoint later.
    const mailto = `mailto:dharmaraja@example.com?subject=Portfolio%20Contact%20—%20${encodeURIComponent(
      String(name)
    )}&body=${encodeURIComponent(String(message))}%0A%0AFrom:%20${encodeURIComponent(
      String(email)
    )}`;
    window.location.href = mailto;
    setTimeout(() => setSending(false), 600);
  };

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className={`${bgDark} text-white min-h-screen font-sans relative`}> 
      {/* Top progress bar */}
      <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 h-1 origin-left bg-gradient-to-r from-teal-400 via-cyan-400 to-purple-500 z-50" />

      {/* Enhanced Nav */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 backdrop-blur-2xl supports-[backdrop-filter]:bg-black/40 border-b border-white/20 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.a
            href="#home"
            className="font-bold text-xl tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            <span className={textGradient}>dharmaraja.dev</span>
          </motion.a>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#stack">Tech</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            {SOCIALS.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-all"
              >
                <s.icon size={18} className="text-white/80" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Enhanced HERO */}
      <Section id="home" className="relative overflow-hidden min-h-screen flex items-center">
        <AnimatedMeshGradient />
        <FloatingParticles />
        <Glow />
        
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs tracking-[0.2em] uppercase mb-6 inline-flex items-center gap-2"
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={14} className="text-emerald-400" />
              </motion.span>
              <span className={textGradient}>Flutter • Kotlin Multiplatform • React • FastAPI</span>
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block mr-3 text-6xl"
              >
                👋
              </motion.span>
              <span className="text-white">Hi, I'm </span>
              <br />
              <span className={textGradient}>Dharmaraja</span>
              <br />
              <span className="text-white">I Build </span>
              <motion.span
                className={textGradientAlt}
                animate={{
                  backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  backgroundSize: "200% auto",
                }}
              >
                Scalable, Beautiful,
              </motion.span>
              <br />
              <span className={textGradient}>Cross‑Platform Experiences</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`${textMuted} mt-6 max-w-xl text-lg leading-relaxed`}
            >
              Multiplatform engineer focused on performance, DX, and delightful UI. I ship mobile, web, desktop, and backend systems with clean architecture.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className={`px-8 py-6 text-base ${accentGradient} text-white font-semibold border-0 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all`}>
                  View My Work <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className={`px-8 py-6 text-base ${ringGrad} border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm`}>
                  Get in Touch
                </Button>
              </motion.a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-12 grid grid-cols-3 gap-4"
            >
              {[
                { icon: Smartphone, label: "Mobile/Web", color: "from-emerald-500 to-cyan-500" },
                { icon: LayoutGrid, label: "Multi‑Device", color: "from-cyan-500 to-blue-500" },
                { icon: Server, label: "API/Infra", color: "from-blue-500 to-purple-500" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className={`${glassStrong} rounded-2xl p-4 flex flex-col items-center gap-2 cursor-pointer group`}
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                    <item.icon size={20} className="text-white" />
            </div>
                  <span className="text-xs text-white/80 font-medium text-center">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Enhanced Photo card */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ y: -12, rotateY: 5 }}
            className="relative"
            style={{ perspective: "1000px" }}
          >
            <div className="absolute -inset-1 rounded-3xl blur-2xl opacity-50 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 -z-10 animate-pulse" />
            <div className={`relative rounded-3xl p-6 ${glassStrong} overflow-hidden`}>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500"
              />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                <motion.img
                  src={dharmaImage}
                  alt="Dharmaraja"
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="relative z-10">
                <motion.div
                  className="flex items-center gap-2 mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <Palette className="text-emerald-400" size={18} />
                  <p className="text-sm font-semibold text-white">About me</p>
                </motion.div>
                <p className={`${textMuted} text-sm leading-relaxed`}>
                I love turning complex requirements into elegant, performant apps. Strong believer in typed APIs, design systems, and automated QA.
              </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Enhanced ABOUT */}
      <Section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            kicker="About"
            title="Crafting cross‑platform products with care"
            desc="From Kotlin Multiplatform and Flutter to React and FastAPI, I design clean architecture and robust delivery pipelines so features ship fast and safely."
          />
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {[
              {
                icon: Target,
                title: "Focus",
                desc: "Clean architecture, state management, testability, and performance budgets.",
                gradient: "from-emerald-500 to-cyan-500",
              },
              {
                icon: Zap,
                title: "Tooling",
                desc: "CI/CD, codegen, conventions, and dev‑ex optimizations that scale teams.",
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                icon: Award,
                title: "Impact",
                desc: "Shipped apps with thousands of users, strong reliability, and crisp UX.",
                gradient: "from-blue-500 to-purple-500",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative ${glassStrong} rounded-3xl p-8 overflow-hidden group cursor-pointer`}
              >
                {/* Animated gradient background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <div className="relative z-10">
                  <motion.div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.gradient} mb-6 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon size={28} className="text-white" />
                  </motion.div>
                  <h4 className="font-bold text-xl text-white mb-3">{item.title}</h4>
                  <p className={`${textMuted} leading-relaxed`}>{item.desc}</p>
                </div>
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Enhanced STACK */}
      <Section id="stack" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            kicker="Stack"
            title="Tech I work with"
            desc="Hover to explore — 3D tilt effects and interactive tooltips."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {TECH.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{
                  rotateX: 8,
                  rotateY: -8,
                  y: -8,
                  scale: 1.05,
                  z: 50,
                }}
                className={`group relative ${glassStrong} ${ringGrad} rounded-3xl p-6 text-center cursor-pointer overflow-hidden`}
                style={{ transformStyle: "preserve-3d" }}
                title={`${t.name} — ${t.hint}`}
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-base font-bold text-white mb-2">{t.name}</div>
                  <div className={`text-[10px] ${textMuted} leading-tight`}>{t.tag}</div>
                </motion.div>
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Enhanced PROJECTS */}
      <Section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            kicker="Work"
            title="Selected Projects"
            desc="A mix of client and self‑initiated builds, optimized for speed, quality, and maintainability."
          />
          <motion.div
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.title}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <ProjectCard p={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Enhanced EXPERIENCE */}
      <Section id="experience" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle kicker="Experience" title="Journey & Impact" />
          <div className="relative">
            <motion.div
              className="absolute left-2 top-0 bottom-0 w-0.5"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{
                background: "linear-gradient(to bottom, rgba(16, 185, 129, 0.6), rgba(6, 182, 212, 0.4), rgba(147, 51, 234, 0.6))",
              }}
            />
            <div className="space-y-8">
              {EXPERIENCE.map((e, i) => (
                <motion.div
                  key={e.role}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                >
                  <TimelineItem {...e} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Enhanced TESTIMONIALS */}
      <Section id="testimonials" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle kicker="Social Proof" title="Testimonials & Achievements" />
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
              >
                <Testimonial t={t} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Enhanced CONTACT */}
      <Section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            kicker="Contact"
            title="Let's build something great"
            desc="I'm open to freelance, consulting, and full‑time opportunities."
          />
          <motion.div
            className="grid lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
              className={`lg:col-span-2 ${glassStrong} rounded-3xl p-8`}
            >
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input
                      name="name"
                      placeholder="Your name"
                      required
                      className={`${ringGrad} bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-emerald-500/50 focus:ring-emerald-500/20`}
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your email"
                      required
                      className={`${ringGrad} bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-emerald-500/50 focus:ring-emerald-500/20`}
                    />
                  </motion.div>
                </div>
                <motion.div whileFocus={{ scale: 1.01 }}>
                  <Textarea
                    name="message"
                    placeholder="Tell me about your project…"
                    rows={6}
                    required
                    className={`${ringGrad} bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-emerald-500/50 focus:ring-emerald-500/20 resize-none`}
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    disabled={sending}
                    className={`${accentGradient} text-white font-semibold w-full md:w-auto px-8 py-6 text-base shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all`}
                  >
                    {sending ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="inline-block mr-2"
                        >
                          <Zap size={18} />
                        </motion.span>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                </Button>
                </motion.div>
              </form>
            </motion.div>
            <div className="space-y-6">
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <Card className={`${glassStrong} border-white/20 rounded-3xl overflow-hidden`}>
                  <CardHeader className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10">
                    <CardTitle className="text-white flex items-center gap-2">
                      <Briefcase size={20} className="text-emerald-400" />
                      Connect
                    </CardTitle>
                  <CardDescription className="text-white/70">Find me online</CardDescription>
                </CardHeader>
                  <CardContent className="p-6 space-y-2">
                  {SOCIALS.map((s) => (
                      <motion.a
                        key={s.label}
                        href={s.href}
                        whileHover={{ x: 4, scale: 1.02 }}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                      >
                        <s.icon size={18} className="text-emerald-400 group-hover:text-cyan-400 transition-colors" />
                        <span className="text-white/80 group-hover:text-white">{s.label}</span>
                      </motion.a>
                  ))}
                </CardContent>
              </Card>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <Card className={`${glassStrong} border-white/20 rounded-3xl overflow-hidden`}>
                  <CardHeader className="bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target size={20} className="text-purple-400" />
                      Availability
                    </CardTitle>
                  <CardDescription className="text-white/70">New projects welcome</CardDescription>
                </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-sm text-white/70 leading-relaxed">
                  I typically reply within 24–48 hours. Share goals, scope, timeline, and budget to get started quickly.
                    </p>
                    <motion.div
                      className="mt-4 flex items-center gap-2 text-emerald-400"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <TrendingUp size={16} />
                      <span className="text-xs font-medium">Open for new opportunities</span>
                    </motion.div>
                </CardContent>
              </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Enhanced FOOTER */}
      <footer className="mt-32 border-t border-white/20 relative">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-white/60"
          >
            © {year} <span className={textGradient}>Dharmaraja</span>. All rights reserved.
          </motion.div>
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {["Home", "Projects", "Contact"].map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                whileHover={{ y: -2, scale: 1.1 }}
                className="text-sm text-white/60 hover:text-white transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.a>
            ))}
          </motion.div>
          </div>
        <div className="text-center py-4 border-t border-white/10">
          <motion.p
            className="text-xs text-white/40"
            animate={{ opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Built with ❤️ using React, Framer Motion & Tailwind CSS
          </motion.p>
        </div>
      </footer>
    </main>
  );
}

