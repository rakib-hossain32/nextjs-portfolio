"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";

// Animation Variants for staggered text reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each child animation
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-10 overflow-hidden bg-[#050a05] max-md:py-24 ">
     
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Glowing Orbs/Mesh linear Effect */}
      <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] rounded-full bg-green-600/20 blur-[120px] mix-blend-screen animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[150px] mix-blend-screen" />

      {/* Subtle texture overlay (optional noise) */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay z-[1] pointer-events-none"></div>

      {/* ==================== CONTENT WRAPPER ==================== */}
      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-12 gap-10 items-center">
        {/* LEFT TEXT CONTENT */}
        <motion.div
          className="md:col-span-7 space-y-8 text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Small Tagline */}
          <motion.div variants={itemVariants}>
            <span className="inline-block py-1 px-3 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 text-sm font-medium tracking-wider">
              AVAILABLE FOR FREELANCE
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold leading-tight text-white tracking-tight"
          >
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-linear-to-r from-green-400 via-emerald-400 to-cyan-500 bg-clip-text">
              Rakib Hossain
            </span>
            <br />
            <span className="text-3xl md:text-5xl font-bold text-gray-300 mt-2 block">
              MERN Stack Developer.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto md:mx-0 leading-relaxed"
          >
            I architect and build modern, scalable web applications designed for
            performance and delivering premium user experiences.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            {/* Primary Button with Glow Shadow */}
            <a
              href="/projects"
              className="group relative px-8 py-4 rounded-full font-semibold text-white bg-linear-to-r from-green-600 to-emerald-700 overflow-hidden shadow-lg shadow-green-500/25 transition-all hover:scale-105 hover:shadow-green-500/40 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects{" "}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
              {/* Button internal shine effect */}
              <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:left-full transition-all duration-700 ease-in-out" />
            </a>

            {/* Secondary Glass Button */}
            <a
              href="/resume.pdf"
              download
              // Assuming you might want a resume download
              className="px-8 py-4 rounded-full font-semibold text-white border border-white/10 backdrop-blur-md bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all flex items-center gap-2 active:scale-95"
            >
              Download CV <Download size={18} />
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT PROFILE IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          className="md:col-span-5 relative w-full flex justify-center"
        >
          {/* The Floating Container */}
          <motion.div
            animate={{
              y: [-10, 10, -10], // Floating effect up and down
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-80 h-80 md:w-[450px] md:h-[450px]"
          >
            {/* Behind image glow blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-linear-to-tr from-green-600/60 to-cyan-500/60 rounded-full blur-[60px] animate-pulse-slow z-0" />

            {/* Spinning subtle ring (optional tech feel) */}
            <div className="absolute inset-0 border-2 border-dashed border-green-500/20 rounded-full animate-[spin_20s_linear_infinite] z-10"></div>

            {/* Image Container with Glass border */}
            <div className="relative z-20 w-full h-full rounded-full overflow-hidden border-[6px] border-white/10 backdrop-blur-sm shadow-2xl shadow-green-900/30">
              <Image
                src="/about.jpg" // Ensure this path is correct in your public folder
                alt="Rakib Hossain Profile"
                fill
                priority
                className="object-cover scale-105 hover:scale-110 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom Tailwind styles for specific animations if needed in global.css, 
          but standard tailwind utilities used here. 
          Ensure you have 'animate-pulse' in tailwind config or use custom CSS below */}
      <style jsx global>{`
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </section>
  );
}
