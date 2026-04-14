"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const container = useRef(null);
  const progressBarRef = useRef(null);
  const counterRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(true);

  useGSAP(
    () => {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          setShowPreloader(false);
          document.body.style.overflow = "";
        },
      });

      // --- Initial States ---
      gsap.set(".pl-logo", { autoAlpha: 0, scale: 0.8 });
      gsap.set(".pl-logo-ring", { scale: 0, autoAlpha: 0 });
      gsap.set(".pl-greeting", { autoAlpha: 0, y: 10, filter: "blur(8px)" });
      gsap.set(".pl-tagline", { autoAlpha: 0, y: 16 });
      gsap.set(".pl-counter", { autoAlpha: 0 });
      gsap.set(".pl-bar-track", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".pl-curtain-top", { yPercent: 0 });
      gsap.set(".pl-curtain-bottom", { yPercent: 0 });

      // --- Step 1: Logo pop in with ring ---
      tl.to(".pl-logo", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
        .to(
          ".pl-logo-ring",
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.4"
        )
        // Greeting fades in
        .to(
          ".pl-greeting",
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.3"
        )
        // Hold greeting briefly
        .to({}, { duration: 0.9 })
        // Greeting fades out, tagline fades in
        .to(".pl-greeting", {
          autoAlpha: 0,
          y: -10,
          filter: "blur(8px)",
          duration: 0.5,
          ease: "power3.in",
        })
        .to(
          ".pl-tagline",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .to(
          ".pl-counter",
          {
            autoAlpha: 1,
            duration: 0.4,
          },
          "-=0.4"
        );

      // --- Step 2: Progress Bar & Counter ---
      const counterObj = { value: 0 };
      tl.to(
        counterObj,
        {
          value: 100,
          duration: 2.2,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = Math.floor(counterObj.value) + "%";
            }
          },
        },
        "-=0.2"
      ).to(
        ".pl-bar-track",
        {
          scaleX: 1,
          duration: 2.2,
          ease: "power2.inOut",
        },
        "<"
      );

      // --- Step 3: Hold briefly ---
      tl.to({}, { duration: 0.3 });

      // --- Step 4: Logo flash & fade out center content ---
      tl.to(".pl-logo-ring", {
        scale: 1.5,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.in",
      })
        .to(
          ".pl-center-content",
          {
            autoAlpha: 0,
            scale: 1.05,
            duration: 0.5,
            ease: "power2.in",
          },
          "<"
        );

      // --- Step 5: Curtain split exit ---
      tl.to(
        ".pl-curtain-top",
        {
          yPercent: -100,
          duration: 1.0,
          ease: "expo.inOut",
        },
        "-=0.1"
      ).to(
        ".pl-curtain-bottom",
        {
          yPercent: 100,
          duration: 1.0,
          ease: "expo.inOut",
        },
        "<"
      );
    },
    { scope: container }
  );

  if (!showPreloader) return null;

  return (
    <div
      ref={container}
      className="fixed inset-0 z-9999 cursor-wait"
    >
      {/* Top Curtain */}
      <div className="pl-curtain-top absolute top-0 left-0 w-full h-[50vh] bg-[#030703] z-20 overflow-hidden">
        {/* Green glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-500/8 rounded-full blur-[100px]" />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Bottom Curtain */}
      <div className="pl-curtain-bottom absolute bottom-0 left-0 w-full h-[50vh] bg-[#030703] z-20 overflow-hidden">
        {/* Cyan glow */}
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px]" />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Seam glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-green-500/40 to-transparent" />
      </div>

      {/* Center Content Layer */}
      <div className="pl-center-content absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none px-6">
        {/* Logo with ring */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Animated Ring */}
          <div className="pl-logo-ring absolute w-28 h-28 rounded-full border border-green-500/30"
            style={{ boxShadow: "0 0 40px rgba(34,197,94,0.15), inset 0 0 40px rgba(34,197,94,0.05)" }}
          />
          <div className="pl-logo-ring absolute w-20 h-20 rounded-full border border-green-400/20"
            style={{ animationDelay: "0.1s" }}
          />
          
          {/* Logo Badge */}
          <div
            className="pl-logo w-16 h-16 rounded-2xl flex items-center justify-center relative z-10 select-none"
            style={{
              background: "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(6,182,212,0.1))",
              border: "1px solid rgba(34,197,94,0.3)",
              boxShadow: "0 0 30px rgba(34,197,94,0.2), 0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <span className="text-3xl font-black text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
            >
              R
            </span>
          </div>
        </div>

        {/* Greeting - Assalamu Alaikum */}
        <div className="pl-greeting absolute text-center select-none" style={{ opacity: 0, visibility: "hidden" }}>
          <p className="text-sm tracking-[0.5em] uppercase text-green-400/60 mb-1">
            &#x200E;السَّلَامُ عَلَيْكُمْ
          </p>
          <p className="text-2xl sm:text-3xl font-light tracking-widest text-white/80">
            Assalamu Alaikum
          </p>
        </div>

        {/* Name & Tagline */}
        <div className="pl-tagline text-center mb-12" style={{ opacity: 0, visibility: "hidden" }}>
          <p className="text-white font-bold text-xl tracking-widest uppercase mb-1">
            Rakib Hossain
          </p>
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.35em] uppercase">
            <span className="w-8 h-[1px] bg-green-500/50" />
            <span className="text-green-400/70">MERN Stack Developer</span>
            <span className="w-8 h-[1px] bg-green-500/50" />
          </div>
        </div>

        {/* Progress Section */}
        <div className="pl-counter w-full max-w-xs flex flex-col items-center gap-3" style={{ opacity: 0, visibility: "hidden" }}>
          {/* Counter number */}
          <div className="flex justify-between items-baseline w-full mb-1">
            <span className="text-xs text-gray-600 tracking-widest uppercase">Initializing</span>
            <span
              ref={counterRef}
              className="text-2xl font-light tabular-nums text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #4ade80, #22d3ee)" }}
            >
              0%
            </span>
          </div>

          {/* Sleek progress bar */}
          <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
            {/* Glowing track */}
            <div
              ref={progressBarRef}
              className="pl-bar-track h-full w-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #4ade80, #22d3ee)",
                boxShadow: "0 0 10px rgba(74, 222, 128, 0.5)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
