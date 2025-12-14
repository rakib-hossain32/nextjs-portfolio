"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers } from "lucide-react";
// === এই অংশটি যুক্ত করুন ===
import dynamic from "next/dynamic";

// ProjectCard-কে ডাইনামিকভাবে এবং SSR ছাড়া লোড করুন
const ProjectCard = dynamic(
  () => import("@/components/ProjectCard/ProjectCard"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-white/5 animate-pulse rounded-xl"></div>
    ), // ঐচ্ছিক: লোডিং স্টেটের জন্য
  }
);
// ==========================

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  // Sample Data (You can keep yours)
  const allProjects = [
    {
      title: "Food Delivery App",
      desc: "Full MERN Stack food delivery with admin, payments, riders.",
      img: "https://i.ibb.co.com/sd0tJMD7/Screenshot-2025-12-14-094453.png", // Ensure these images exist
      live: "https://zap-shift-4ed89.web.app/",
      git: "https://github.com/rakib-hossain32/Zap-Shift-Client",
      tag: "MERN",
    },
    {
      title: "E-Commerce Platform",
      desc: "Modern e-commerce with Stripe, Admin dashboard, filters.",
      img: "https://i.ibb.co.com/Df00XNJx/image.png",
      live: "https://rakib-hossain32.github.io/khichurighorbd/",
      git: "https://github.com/rakib-hossain32/khichurighorbd",
      tag: "Frontend",
    },
    {
      title: "MoviesMaster Pro",
      desc: "A modern movie discovery platform where users can explore  films.",
      img: "https://i.ibb.co.com/nN4bn3Cp/Screenshot-2025-12-14-095509.png",
      live: "https://movies-master-pro.web.app/",
      git: "https://github.com/rakib-hossain32/Movie-Master-Pro",
      tag: "Web-App",
    },
    // Added one more to show grid better
    {
      title: "ContestHub",
      desc: "A dynamic platform for creators to explore and compete in design, coding, and writing contests.",
      img: "https://i.ibb.co.com/PvMDxLwC/Screenshot-2025-12-14-093914.png",
      live: "https://contest-hub-c7402.web.app/",
      git: "https://github.com/rakib-hossain32/Contest-Hub",
      tag: "MERN",
    },
    {
      title: "GreenNest - Plant Shop",
      desc: "An e-commerce platform for indoor plants dedicated to green living.",
      img: "https://i.ibb.co.com/mnwvQ24/Screenshot-2025-12-14-094152.png",
      live: "https://greennest-2feeb.web.app/",
      git: "https://github.com/rakib-hossain32/Green-Nest",
      tag: "E-commerce",
    },
  ];

  const filters = [
    "All",
    "MERN",
    "Frontend",
    "Dashboard",
    "Web-App",
    "E-commerce",
  ];

  const filteredProjects =
    filter === "All"
      ? allProjects
      : allProjects.filter((p) => p.tag === filter);

  // Motion variants for container staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <section className="relative py-24 md:py-32 min-h-screen overflow-hidden bg-[#050a05] text-white">
      {/* ==================== AMBIENT GLOW (Consistent with other pages) ==================== */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-green-400 font-medium tracking-widest text-sm uppercase border border-green-500/20 bg-green-500/5 px-4 py-1 rounded-full mb-2">
            <Layers size={16} /> Portfolio
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-cyan-400">
              {" "}
              Work
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A curated selection of my best web applications, showcasing scalable
            backend systems and modern frontend experiences.
          </p>
        </motion.div>

        {/* Filters Buttons (Tech Pills Style) */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filters.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border backdrop-blur-sm overflow-hidden group
                ${
                  filter === cat
                    ? "border-green-500/50 text-green-400 bg-green-500/10 shadow-[0_0_15px_rgba(74,222,128,0.15)]"
                    : "border-white/10 text-gray-400 bg-white/5 hover:border-green-500/30 hover:text-green-300"
                }
              `}
            >
              <span className="relative z-10">{cat}</span>
              {/* Subtle active state glow behind text */}
              {filter === cat && (
                <div className="absolute inset-0 bg-linear-to-r from-green-500/20 to-cyan-500/20 blur-md z-0" />
              )}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid with AnimatePresence for smooth filtering */}
        <motion.div
          layout // Enables smooth layout transitions when items reorder
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, i) => (
              // Wrap ProjectCard in motion.div to handle filter enter/exit animations
              <motion.div
                key={p.title + i} // Unique key crucial for AnimatePresence
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {/* Assuming ProjectCard handles its own internal styling well */}
                <ProjectCard {...p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-10"
          >
            No projects found in this category.
          </motion.p>
        )}
      </div>
    </section>
  );
}
