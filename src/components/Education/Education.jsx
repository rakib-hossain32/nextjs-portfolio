"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react";

export default function EducationPage() {
  const containerRef = useRef(null);

  // Scroll Progress Logic for the connecting line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const education = [
    {
      degree: "B.Sc. in Economics",
      institute: "National University",
      year: "2024 - Present",
      desc: "Currently studying Economics with a strong interest in data analysis, problem-solving, and technology. Actively learning web development alongside academic studies.",
      icon: <GraduationCap size={24} />,
      tags: ["Microeconomics", "Macroeconomics", "Statistics", "Data Analysis"],
    },

    {
      degree: "Higher Secondary Certificate (HSC)",
      institute: "Govt. Barhamgonj College",
      year: "2022 - 2023",
      desc: "Humanities group background with focus on social science subjects and critical thinking. Developed strong communication and analytical skills.",
      icon: <BookOpen size={24} />,
      tags: ["Logic", "Civics", "Islamic Studies"],
    },

    {
      degree: "Secondary School Certificate (SSC)",
      institute: "MadbarerChar R.M High School",
      year: "2020 - 2021",
      desc: "Completed secondary education with specialization in Accounting and Business Studies. Built a strong foundation in finance, accounting principles, and basic economics.",
      icon: <BookOpen size={24} />,
      tags: ["Accounting", "Finance", "Business Studies"],
    },
  ];

  return (
    <section className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-[#050a05] text-white">
      {/* ==================== AMBIENT BACKGROUND ==================== */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 text-green-400 font-medium tracking-widest text-sm uppercase border border-green-500/20 bg-green-500/5 px-4 py-1 rounded-full mb-4">
            <GraduationCap size={16} /> Academic Career
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            My Educational{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-cyan-400">
              Journey
            </span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            The academic foundation that shaped my technical skills and
            problem-solving abilities.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* ==================== THE DRAWING LINE ==================== */}
          {/* Static Background Line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 bg-white/10 rounded-full" />

          {/* Dynamic Animated Line (Fills on Scroll) */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-5 md:left-1/2 top-0 w-0.5 md:-translate-x-1/2 bg-linear-to-b from-green-400 via-emerald-500 to-cyan-500 rounded-full shadow-[0_0_15px_rgba(74,222,128,0.6)]"
          />

          {/* ==================== CARDS MAPPING ==================== */}
          <div className="space-y-16">
            {education.map((edu, i) => (
              <div
                key={i}
                className={`relative flex flex-col md:flex-row items-center ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* 1. Empty Half for spacing on Desktop */}
                <div className="flex-1 hidden md:block" />

                {/* 2. Center Node (The Glowing Dot) */}
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                  <div className="w-4 h-4 rounded-full bg-[#050a05] border-2 border-green-500 shadow-[0_0_20px_rgba(74,222,128,0.8)] relative">
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-30" />
                  </div>
                </div>

                {/* 3. The Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1 pl-12 md:pl-0 w-full"
                >
                  <div
                    className={`relative p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-green-500/30 transition-all duration-300 group ${
                      i % 2 === 0 ? "md:mr-12" : "md:ml-12"
                    }`}
                  >
                    {/* Floating Icon linear Blob */}
                    <div className="absolute -top-6 right-6 md:right-auto md:left-6 w-12 h-12 bg-linear-to-br from-green-500 to-cyan-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-900/50 group-hover:scale-110 transition-transform duration-300">
                      {edu.icon}
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-green-400 text-sm font-semibold tracking-wide mb-2">
                        <Calendar size={14} /> {edu.year}
                      </div>

                      <h3 className="text-2xl font-bold text-white group-hover:text-green-300 transition-colors">
                        {edu.degree}
                      </h3>

                      <p className="text-gray-300 text-lg font-medium mt-1">
                        {edu.institute}
                      </p>

                      <p className="text-gray-400 mt-4 leading-relaxed text-sm">
                        {edu.desc}
                      </p>

                      {/* Tech/Subject Tags */}
                      <div className="flex flex-wrap gap-2 mt-5">
                        {edu.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-400 group-hover:border-green-500/20 group-hover:text-green-400 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}