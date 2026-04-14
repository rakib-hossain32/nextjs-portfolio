"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { createPortal } from "react-dom";

export default function ProjectDetailsModal({ isOpen, onClose, project }) {
    // If not open, don't render anything (handled by AnimatePresence in parent usually, but good safeguard)

    // Mounted state to ensure we are on client for createPortal
    const [mounted, setMounted] = useState(false);

    // Carousel State
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Safeguard for images
    const images = project?.images && project.images.length > 0 ? project.images : [project?.img];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Lock body scroll when modal is open
    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden"; // Also lock html for some browsers/smooth scroll
        } else {
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4 md:p-8"
            style={{ zIndex: 9999 }}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Content */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative w-full max-w-6xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white/10 text-white rounded-full transition-colors backdrop-blur-sm cursor-pointer border border-white/10"
                >
                    <X size={20} />
                </button>

                {/* Left Side: Image Carousel */}
                <div className="w-full md:w-3/5 relative bg-[#000000] min-h-[300px] md:h-auto flex items-center justify-center overflow-hidden group">

                    {/* Main Image Display with Drag */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-full h-full"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = swipePower(offset.x, velocity.x);

                                    if (swipe < -swipeConfidenceThreshold) {
                                        nextImage();
                                    } else if (swipe > swipeConfidenceThreshold) {
                                        prevImage();
                                    }
                                }}
                            >
                                <Image
                                    src={images[currentImageIndex]}
                                    alt={`Project screenshot ${currentImageIndex + 1}`}
                                    fill
                                    className="object-contain object-center"
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Overlay */}
                        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-all hover:scale-110 cursor-pointer"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-all hover:scale-110 cursor-pointer"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        {/* Pagination Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${idx === currentImageIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Details */}
                <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col bg-[#0a0a0a] h-full overflow-y-auto custom-scrollbar">

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold rounded-full uppercase tracking-wider">
                            {project.tag}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                        {project.title}
                    </h2>

                    {/* Description */}
                    <div className="prose prose-invert prose-sm text-gray-400 mb-8 leading-relaxed">
                        <p>{project.desc}</p>
                        <p className="mt-4">
                            This project showcases advanced implementations of modern web technologies.
                            Features include responsive design, optimized performance, and a seamless user experience.
                        </p>
                    </div>

                    <div className="mt-auto space-y-4">
                        {/* Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <Link
                                href={project.git}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white font-medium group"
                            >
                                <Github size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                                <span>GitHub</span>
                            </Link>
                            <Link
                                href={project.live}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl transition-all font-medium shadow-lg shadow-green-900/20"
                            >
                                <span>Live Demo</span>
                                <ExternalLink size={18} />
                            </Link>
                        </div>
                    </div>

                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
}


// Framer Motion Swipe Helpers
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};
