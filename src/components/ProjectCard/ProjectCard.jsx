"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Sparkles, Zap, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function ProjectCard({ title, desc, img, live, git, tag, views = 0, openModal }) {
    const cardRef = useRef(null);

    // Mouse Motion Values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth Spring Config for Tilt
    const springConfig = { stiffness: 150, damping: 15, mass: 0.5 }; // More fluid/smooth than before
    const mouseXSpring = useSpring(mouseX, springConfig);
    const mouseYSpring = useSpring(mouseY, springConfig);

    // Tilt Transforms (Subtle & Professional)
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Parallax Image Effect (Image moves opposite to tilt)
    const imageX = useTransform(mouseXSpring, [-0.5, 0.5], ["-3%", "3%"]);
    const imageY = useTransform(mouseYSpring, [-0.5, 0.5], ["-3%", "3%"]);

    const handleMouseMove = (e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (rect) {
            const width = rect.width;
            const height = rect.height;
            const mouseXVal = e.clientX - rect.left;
            const mouseYVal = e.clientY - rect.top;

            // Normalize values (-0.5 to 0.5)
            const xPct = mouseXVal / width - 0.5;
            const yPct = mouseYVal / height - 0.5;

            mouseX.set(xPct);
            mouseY.set(yPct);
        }
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative h-full rounded-3xl bg-[#080c08] border border-white/5 overflow-hidden transform-gpu flex flex-col"
        >
            {/* ==================== BACKGROUND EFFECTS ==================== */}

            {/* 1. Noise Texture (The Premium Feel) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none z-0"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* 2. Spotlight Glow following mouse (Logic adjusted for this structure) */}
            <motion.div
                className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
                style={{
                    background: useMotionTemplate`
                        radial-linear(
                            600px circle at ${useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"])},
                            rgba(74, 222, 128, 0.1),
                            transparent 40%
                        )
                    `
                }}
            />

            {/* 3. Subtle Inner linear */}
            <div className="absolute inset-0 bg-linear-to-b from-white/3 to-transparent pointer-events-none z-1" />


            {/* ==================== IMAGE SECTION ==================== */}
            <div className="relative h-60 w-full overflow-hidden rounded-t-3xl bg-[#050505] shrink-0">
                {/* Image Overlay (Darkens image slightly until hover) */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />

                {/* Parallax Image */}
                <motion.div
                    className="relative w-[110%] h-[110%] -left-[5%] -top-[5%]"
                    style={{ x: imageX, y: imageY }}
                >
                    <Image
                        src={img}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </motion.div>

                {/* Tag Badge (Floating) */}
                <div className="absolute top-4 left-4 z-20 overflow-hidden rounded-full">
                    <div className="relative px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-[10px] font-bold tracking-wider text-green-200 uppercase">{tag}</span>
                    </div>
                </div>
            </div>


            {/* ==================== CONTENT SECTION ==================== */}
            <div className="relative p-6 flex flex-col grow z-20 bg-[#080c08]/90 backdrop-blur-sm">

                {/* Title */}
                <div className="mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300 flex items-center gap-2">
                        {title}
                    </h3>
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6 font-light">
                    {desc}
                </p>

                {/* Bottom Actions - Push to bottom */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-4">

                    <div className="flex items-center gap-4">
                        {/* Github Link */}
                        <Link
                            href={git}
                            target="_blank"
                            rel="noreferrer"
                            className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-medium group/link"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Github size={16} />
                            <span className="relative">
                                Code
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover/link:w-full" />
                            </span>
                        </Link>

                        {/* View Count */}
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500">
                            <Eye size={13} className="text-zinc-600" />
                            <span>{views > 999 ? `${(views / 1000).toFixed(1)}k` : views} views</span>
                        </div>
                    </div>

                    {/* View Details Button (Triggers Modal) */}
                    <button
                        onClick={openModal}
                        className="relative px-5 py-2 rounded-lg bg-white/5 hover:bg-green-500/10 border border-white/10 hover:border-green-500/50 text-white hover:text-green-400 transition-all duration-300 overflow-hidden group/btn flex items-center gap-2 cursor-pointer"
                    >
                        <div className="absolute inset-0 translate-y-full bg-linear-to-t from-green-500/20 to-transparent transition-transform duration-300 group-hover/btn:translate-y-0" />
                        <span className="relative flex items-center gap-2 text-xs font-bold tracking-wide uppercase">
                            Details <Eye size={14} className="fill-current" />
                        </span>
                    </button>
                </div>
            </div>

            {/* Bottom Glow Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
    );
}