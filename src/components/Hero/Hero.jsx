"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowRight, Download, MapPin, Star } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

// ── Typewriter ─────────────────────────────────────────────────────────────────
function useTypewriter(words, speed = 75, pause = 2000) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      // Wrap in timeout to avoid synchronous state update inside effect
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIdx((w) => (w + 1) % words.length);
      }, speed);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return words[wordIdx].slice(0, charIdx);
}

const ROLES = ["Full Stack Developer", "MERN Stack Engineer", "React Specialist", "Frontend Developer"];

const STATS = [
  { value: "30+", label: "Projects" },
  { value: "15+", label: "Clients" },
  { value: "2yr", label: "Experience" },
  { value: "99%", label: "Satisfaction" },
];

export default function Hero() {
  const containerRef = useRef(null);
  const role = useTypewriter(ROLES);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Word reveal — each letter of name
      tl.from(".name-first .letter", {
        y: "100%",
        opacity: 0,
        duration: 1,
        stagger: 0.06,
      })
        .from(
          ".name-last .letter",
          { y: "100%", opacity: 0, duration: 1, stagger: 0.06 },
          "-=0.7"
        )
        .from(".hero-photo-wrap", {
          scale: 0.6,
          opacity: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.7)",
        }, "-=1.4")
        .from(".hero-role-line", { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
        .from(".hero-desc", { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
        .from(".hero-btns", { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
        .from(".hero-stat", { opacity: 0, y: 16, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .from(".hero-badge", { opacity: 0, scale: 0.8, duration: 0.5 }, "-=0.5")
        .from(".hero-location", { opacity: 0, y: -10, duration: 0.5 }, "-=0.5");

      // Floating photo
      gsap.to(".hero-photo-wrap", {
        y: -14,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Slow rotation on outer ring
      gsap.to(".outer-ring", {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      // Pulsing glow
      gsap.to(".photo-glow", {
        opacity: 0.6,
        scale: 1.1,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Ambient orbs
      gsap.to(".orb-a", { x: 30, y: -20, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".orb-b", { x: -25, y: 30, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" });
    },
    { scope: containerRef }
  );

  // Split name into letter spans
  const splitLetters = (word, cls) =>
    word.split("").map((l, i) => (
      <span key={i} className="letter inline-block overflow-hidden px-1 md:px-2" style={{ lineHeight: 1.1 }}>
        <span className="letter inline-block">{l === " " ? "\u00A0" : l}</span>
      </span>
    ));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030703] px-4 pt-38 pb-20"
    >
      {/* ── Ambient background ── */}
      <div className="orb-a absolute top-[-15%] left-[-10%] w-[700px] h-[700px] rounded-full bg-green-500/10 blur-[160px] pointer-events-none" />
      <div className="orb-b absolute bottom-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full bg-cyan-500/8 blur-[180px] pointer-events-none" />

      {/* ── Noise grain ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Top availability badge ── */}
      <div className="hero-badge absolute top-32 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/25 bg-green-500/8 backdrop-blur-sm z-20">
        <span className="relative flex h-2 w-2">
          <span className="absolute animate-ping h-full w-full rounded-full bg-green-400 opacity-70" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
        </span>
        <span className="text-green-300 text-xs font-semibold tracking-[0.2em] uppercase">Open to Work</span>
      </div>

      {/* ── Location pill ── */}
      <div className="hero-location absolute top-8 right-8 md:flex hidden items-center gap-1.5 text-xs text-gray-500 z-20">
        <MapPin size={12} className="text-green-500" />
        <span>Bangladesh</span>
      </div>

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-6xl mx-auto gap-0">

        {/* ── First name — HUGE ── */}
        <div
          className="name-first flex overflow-hidden select-none leading-[1.1] font-black uppercase text-white tracking-tighter z-0"
          style={{ fontSize: "clamp(4rem, 15vw, 13rem)" }}
        >
          {splitLetters("Rakib")}
        </div>

        {/* ── Photo centered between name lines ── */}
        <div className="hero-photo-wrap relative flex items-center justify-center my-[-4vh] md:my-[-6vh] z-20">
          {/* Glow */}
          <div
            className="photo-glow absolute w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full opacity-80 blur-[50px]"
            style={{ background: "radial-gradient(circle, rgba(74,222,128,0.5), rgba(34,211,238,0.2) 60%, transparent)" }}
          />

          {/* Outer spinning decorative ring */}
          <div
            className="outer-ring absolute w-[310px] h-[310px] md:w-[370px] md:h-[370px] rounded-full pointer-events-none"
            style={{
              border: "1px dashed rgba(74,222,128,0.2)",
              backgroundImage: "none",
              "--ring-offset": "-155px",
            }}
          />

          {/* Tick marks on ring */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-green-500/40"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${i * 30}deg) translateY(var(--ring-offset))`,
              }}
            />
          ))}

          {/* Photo */}
          <div
            className="relative w-[240px] h-[240px] md:w-[290px] md:h-[290px] rounded-full overflow-hidden z-10"
            style={{
              border: "2px solid rgba(74,222,128,0.25)",
              boxShadow: "0 0 0 8px rgba(74,222,128,0.05), 0 30px 80px rgba(0,0,0,0.6)",
            }}
          >
            <Image
              src="/about.jpg"
              alt="Rakib Hossain"
              fill
              priority
              sizes="290px"
              className="object-cover object-top scale-110 hover:scale-115 transition-transform duration-700"
            />
            {/* Subtle tint overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-[#030703]/30 via-transparent to-transparent" />
          </div>

          {/* Floating tag — left */}
          <div
            className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md border border-white/10 text-xs font-semibold text-white whitespace-nowrap z-30"
            style={{ background: "rgba(8,15,8,0.85)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
          >
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            5.0 Rating
          </div>

          {/* Floating tag — right */}
          <div
            className="absolute right-[-20px] md:right-[-60px] top-1/3 -translate-y-1/2 flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md border border-white/10 text-xs font-semibold text-white whitespace-nowrap z-30"
            style={{ background: "rgba(8,15,8,0.85)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available Now
          </div>
        </div>

        {/* ── Last name — HUGE ── */}
        <div
          className="name-last flex overflow-hidden select-none leading-[1.1] font-black uppercase tracking-tighter z-0"
          style={{
            fontSize: "clamp(4rem, 15vw, 13rem)",
            WebkitTextStroke: "1px rgba(255,255,255,0.2)",
            color: "transparent",
            backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {splitLetters("Hossain")}
        </div>

        {/* ── Typewriter role ── */}
        <div className="hero-role-line mt-12 flex items-center justify-center gap-3">
          <div className="w-10 h-px bg-linear-to-r from-transparent to-green-400" />
          <p className="text-green-400 font-medium text-base md:text-lg tracking-widest min-h-6">
            {role}
            <span className="animate-pulse ml-0.5 text-green-300">|</span>
          </p>
          <div className="w-10 h-px bg-linear-to-l from-transparent to-green-400" />
        </div>

        {/* ── Short bio ── */}
        <p className="hero-desc mt-4 text-gray-400 text-sm md:text-base max-w-xl leading-relaxed">
          I architect and build{" "}
          <span className="text-white font-medium">high-performance web applications</span>{" "}
          with clean code, scalable architecture, and exceptional user experiences.
        </p>

        {/* ── CTA Buttons ── */}
        <div className="hero-btns mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/projects"
            className="group relative flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-black overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #4ade80, #22d3ee)",
              boxShadow: "0 0 35px rgba(74,222,128,0.4), 0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300" />
          </Link>

          <a
            href="/Rakib-Hossain-Frontend-Developer-Resume.pdf"
            download
            className="group flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-green-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Download size={15} className="transition-transform group-hover:-translate-y-0.5" />
            Download CV
          </a>
        </div>

        {/* ── Stats row ── */}
        <div className="mt-14 grid grid-cols-4 gap-0 w-full max-w-xl">
          {STATS.map(({ value, label }, i) => (
            <div
              key={i}
              className="hero-stat flex flex-col items-center py-4 border-l border-white/5 first:border-0"
            >
              <span
                className="text-2xl md:text-3xl font-black text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
              >
                {value}
              </span>
              <span className="text-[10px] text-gray-500 tracking-widest uppercase mt-1">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom scroll hint ── */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
          <div
            className="w-6 h-10 rounded-full border-2 border-white/10 flex items-start justify-center pt-2"
          >
            <div
              className="w-1 h-2 rounded-full bg-green-400"
              style={{ animation: "scrollDot 2s ease-in-out infinite" }}
            />
          </div>
        </div>

      <style jsx>{`
        .outer-ring {
          --ring-offset: -155px;
        }
        @media (min-width: 768px) {
          .outer-ring {
            --ring-offset: -185px;
          }
        }
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(12px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
