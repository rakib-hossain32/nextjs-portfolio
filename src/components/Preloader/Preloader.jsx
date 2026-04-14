"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const container = useRef(null);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(true);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setShowPreloader(false);
          document.body.style.overflow = "";
        },
      });

      // Lock scroll during preloader
      document.body.style.overflow = "hidden";

      // --- 0. Initial States ---
      gsap.set(".counter-wrapper", { autoAlpha: 0, y: 10 });
      gsap.set(progressBarRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(".greeting-text", {
        autoAlpha: 0,
        scale: 0.9,
        filter: "blur(12px)",
      });
      gsap.set(".word-container span", { y: "110%", rotationZ: 2 }); // Slight rotation for natural feel
      gsap.set(".overlay-panel", { yPercent: 0 });

      // --- 1. Progress Bar & Counter Animation ---
      const counterObj = { value: 0 };

      tl.to(".counter-wrapper", {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          counterObj,
          {
            value: 100,
            duration: 2, // Slightly longer for a more premium, unhurried feel
            ease: "power3.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent =
                  Math.floor(counterObj.value) + "%";
              }
            },
          },
          "<",
        )
        .to(
          progressBarRef.current,
          {
            scaleX: 1,
            duration: 2,
            ease: "power3.inOut",
          },
          "<",
        )
        .to(".counter-wrapper", {
          autoAlpha: 0,
          y: -10,
          duration: 0.6,
          ease: "power3.in",
          delay: 0.2,
        })
        .to(
          progressBarRef.current,
          {
            autoAlpha: 0,
            duration: 0.4,
          },
          "<",
        );

      // --- 2. Greeting (Assalamu Alaikum) Ethereal Reveal ---
      tl.to(
        ".greeting-text",
        {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "expo.out",
        },
        "-=0.2",
      ).to(".greeting-text", {
        autoAlpha: 0,
        scale: 1.05, // Slight scale up on exit for depth
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.in",
        delay: 0.5,
      });

      // --- 3. Main Headline Sequence (Cinematic Reveal) ---
      tl.set(".main-content", { autoAlpha: 1 });

      tl.to(".word-container span", {
        y: "0%",
        rotationZ: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
      }).to(
        ".word-container span",
        {
          color: "#ffffff", // Subtle color shift highlight
          duration: 1,
          stagger: 0.1,
        },
        "-=0.8",
      );

      // Hold for reading
      tl.to({}, { duration: 1.2 });

      // --- 4. Exit Animation (Clean Slide & Split) ---
      tl.to(".word-container span", {
        y: "-110%",
        rotationZ: -2,
        duration: 0.8,
        stagger: 0.05,
        ease: "power4.in",
      });

      // The Premium Curtain Split (Top goes up, bottom goes down)
      tl.to(
        ".overlay-panel-top",
        {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut",
        },
        "-=0.4",
      ).to(
        ".overlay-panel-bottom",
        {
          yPercent: 100,
          duration: 1.2,
          ease: "expo.inOut",
        },
        "<",
      );
    },
    { scope: container },
  );

  if (!showPreloader) return null;

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[9999] flex flex-col justify-between cursor-wait bg-transparent"
    >
      {/* Top Curtain */}
      <div className="overlay-panel-top overlay-panel absolute top-0 left-0 w-full h-[50vh] bg-[#050505] z-20 overflow-hidden origin-top">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] brightness-100 mix-blend-overlay"></div>
      </div>

      {/* Bottom Curtain */}
      <div className="overlay-panel-bottom overlay-panel absolute bottom-0 left-0 w-full h-[50vh] bg-[#050505] z-20 overflow-hidden origin-bottom">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] brightness-100 mix-blend-overlay"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="absolute inset-0 z-40 w-full h-full pointer-events-none flex flex-col items-center justify-center">
        {/* 1. Progress Bar & Counter (Centered Bottom) */}
        <div className="counter-wrapper absolute bottom-12 w-full flex flex-col items-center px-10 md:px-24">
          <div className="w-full flex justify-between items-end mb-4">
            <span className="text-xs md:text-sm font-medium tracking-[0.2em] text-zinc-500 uppercase">
              Loading
            </span>
            <h2
              ref={counterRef}
              className="text-3xl md:text-5xl font-light text-zinc-300 tabular-nums tracking-tighter"
            >
              0%
            </h2>
          </div>
          {/* Sleek Progress Line */}
          <div className="w-full h-[2px] bg-zinc-800 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="w-full h-full bg-zinc-200"
            ></div>
          </div>
        </div>

        {/* 2. Greeting */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="greeting-text text-sm sm:text-lg md:text-xl font-medium tracking-[0.4em] uppercase text-zinc-300">
            Assalamu Alaikum
          </h1>
        </div>

        {/* 3. Main Welcome Text */}
        <div className="main-content invisible absolute inset-0 flex flex-col items-center justify-center gap-1 md:gap-2 px-4">
          {/* Line 1: Crafting */}
          <div className="word-container overflow-hidden pb-2">
            <span className="block text-5xl sm:text-7xl md:text-[7rem] font-light text-zinc-400 tracking-tight leading-[1] uppercase">
              Crafting
            </span>
          </div>

          {/* Line 2: Exceptional (Italicized Serif look or sleek sans) */}
          <div className="word-container overflow-hidden pb-2">
            <span className="block text-5xl sm:text-7xl md:text-[7rem] font-medium text-zinc-400 tracking-tighter leading-[1] uppercase">
              Exceptional
            </span>
          </div>

          {/* Line 3: Experiences */}
          <div className="word-container overflow-hidden pb-2">
            <span className="block text-5xl sm:text-7xl md:text-[7rem] font-bold text-zinc-400 tracking-tighter leading-none uppercase">
              Experiences
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
