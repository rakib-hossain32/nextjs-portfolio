"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function ProjectCard({ title, desc, img, live, git, tag }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position for Spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement for 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      
      const mouseXVal = e.clientX - rect.left;
      const mouseYVal = e.clientY - rect.top;

      // Calculate percentage for 3D rotate (-0.5 to 0.5)
      const xPct = mouseXVal / width - 0.5;
      const yPct = mouseYVal / height - 0.5;

      x.set(xPct);
      y.set(yPct);
      
      // Set pixel values for Spotlight
      mouseX.set(mouseXVal);
      mouseY.set(mouseYVal);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-2xl bg-[#0a100a] border border-white/10 overflow-hidden cursor-pointer h-full flex flex-col"
    >
      
      {/* ==================== SPOTLIGHT EFFECT ==================== */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-linear(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(74, 222, 128, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* ==================== IMAGE SECTION ==================== */}
      <div className="relative w-full h-56 overflow-hidden">
        {/* Overlay linear on Image */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0a100a] via-transparent to-transparent z-10 opacity-60" />
        
        <Image
          src={img}
          alt={title}
          fill
          
          className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />

        {/* Floating Tag on Image */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 text-xs font-semibold tracking-wide text-green-300 bg-black/60 backdrop-blur-md border border-green-500/30 rounded-full">
            {tag}
          </span>
        </div>
      </div>

      {/* ==================== CONTENT SECTION ==================== */}
      <div className="relative p-6 flex flex-col grow z-20">
        <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-6 grow">
          {desc}
        </p>

        {/* Divider */}
        <div className="h-px w-full bg-white/10 mb-5 group-hover:bg-green-500/20 transition-colors" />

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <a
            href={live}
            target="_blank"
            className="flex items-center gap-2 text-sm font-semibold text-white bg-linear-to-r from-green-600 to-emerald-600 px-4 py-2 rounded-lg hover:shadow-[0_0_15px_rgba(74,222,128,0.4)] hover:scale-105 transition-all duration-300"
          >
            Live Demo <ArrowUpRight size={16} />
          </a>

          <a
            href={git}
            target="_blank"
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group/git"
          >
            <Github size={18} className="group-hover/git:text-green-400 transition-colors" />
            Source Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}