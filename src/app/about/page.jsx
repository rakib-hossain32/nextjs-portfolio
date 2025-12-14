"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code2, Users, Briefcase, Zap } from "lucide-react";

export default function About() {
  // Skills with categories for a cleaner look
  const skills = [
    "React.js", "Next.js", "Node.js", "Express.js", 
    "MongoDB", "Tailwind CSS", "Framer Motion", "Firebase"
  ];

 const stats = [
   { label: "Projects Completed", value: "15+", icon: <Code2 size={20} /> },
   {
     label: "Learning Journey",
     value: "6+ Month",
     icon: <Briefcase size={20} />,
   },
   { label: "Tech Stack", value: "MERN", icon: <Users size={20} /> },
 ];


  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#050a05] text-white">
      
      {/* ==================== AMBIENT BACKGROUND GLOW (Matches Banner) ==================== */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />


      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* ==================== LEFT: IMAGE WITH LAYERS ==================== */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full flex justify-center md:justify-start"
        >
          {/* Decorative Back Box */}
          <div className="absolute top-4 left-4 md:left-4 w-72 h-80 md:w-96 md:h-[420px] rounded-2xl border border-green-500/30 z-0 opacity-60" />
          
          {/* Main Image Container */}
          <div className="relative z-10 w-72 h-80 md:w-96 md:h-[420px] rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/40 group">
            {/* Glass Overlay on Hover */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 z-10" />
            
            <Image
              src="/about.jpg"
              alt="Rakib Hossain"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Floating Badge (Example: Certified) */}
            <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-white">Open for Work</span>
            </div>
          </div>
        </motion.div>


        {/* ==================== RIGHT: TEXT CONTENT ==================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 text-green-400 font-medium mb-2 tracking-widest text-sm uppercase">
               <Zap size={16} /> Who I am
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              About <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-cyan-400">Rakib Hossain</span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-gray-400 text-lg leading-relaxed">
            I am a passionate <span className="text-gray-200 font-semibold">MERN Stack Developer</span> dedicated to building digital products that look beautiful and perform flawlessly. 
            <br /><br />
            With a strong foundation in modern web technologies, I bridge the gap between design and engineering—creating scalable, high-performance applications that solve real-world problems.
          </motion.p>

          {/* Skills Tags */}
          <motion.div variants={itemVariants}>
             <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
               Tech Stack
             </h3>
             <div className="flex flex-wrap gap-3">
               {skills.map((skill, i) => (
                 <div
                   key={i}
                   className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm hover:border-green-500/50 hover:text-green-400 hover:bg-green-500/10 transition-colors cursor-default"
                 >
                   {skill}
                 </div>
               ))}
             </div>
          </motion.div>

          {/* Stats Row (Glassmorphism) */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-1">
                <div className="text-green-400 mb-1 opacity-80">{s.icon}</div>
                <p className="text-3xl font-bold text-white tracking-tight">{s.value}</p>
                <p className="text-xs text-gray-500 uppercase font-medium tracking-wider">{s.label}</p>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}