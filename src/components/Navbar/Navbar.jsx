"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  Github,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Scroll Detection to change navbar style
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  // Mobile Menu Animation Variants
  const menuVariants = {
    closed: {
      opacity: 0,
      clipPath: "circle(0% at 100% 0%)",
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    open: {
      opacity: 1,
      clipPath: "circle(150% at 100% 0%)",
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
          scrolled ? "pt-4" : "pt-6"
        }`}
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`relative w-[95%] md:max-w-5xl transition-all duration-500 ease-in-out ${
            scrolled
              ? "bg-[#050a05]/70 backdrop-blur-xl border-white/5 py-2 px-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
              : "bg-transparent border-transparent py-3 px-6"
          } border rounded-full flex items-center justify-between`}
        >
          {/* Glass Noise Texture (Optional) */}
          {scrolled && (
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none rounded-full" />
          )}

          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 z-20 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-linear-to-tr from-green-500 to-cyan-500 rounded-xl blur-md opacity-40 group-hover:opacity-80 transition-opacity" />
              <div className="relative w-full h-full bg-[#0a100a] border border-white/10 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-95 transition-transform">
                R.
              </div>
            </div>
            <span
              className={`hidden sm:block text-lg font-bold tracking-tight transition-colors ${
                scrolled ? "text-white" : "text-white"
              }`}
            >
              Rakib<span className="text-green-400">.dev</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
            <ul
              className={`flex items-center gap-1 p-1 rounded-full border transition-all duration-300 ${
                scrolled
                  ? "bg-white/5 border-white/5"
                  : "bg-[#0a100a]/50 border-white/10 backdrop-blur-md shadow-lg"
              }`}
            >
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href} className="relative">
                    <Link
                      href={link.href}
                      className={`relative z-10 block px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-green-400"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>

                    {/* Active State Glass Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/5 border border-green-500/30 rounded-full shadow-[0_0_15px_rgba(74,222,128,0.1)]"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* CTA Button */}
            <Link href="/contact" className="hidden md:block">
              <button
                className={`group relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all overflow-hidden bg-linear-to-r from-green-500 to-cyan-500 text-[#050a05]`}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                <span className="flex items-center gap-1">
                  Hire Me{" "}
                  <ArrowUpRight
                    size={16}
                    className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                  />
                </span>
              </button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className={`md:hidden p-3 rounded-full transition-colors z-50 relative ${
                open
                  ? "bg-white text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </nav>

      {/* ==================== FULL SCREEN MOBILE MENU ==================== */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-[#050a05] md:hidden flex flex-col justify-center items-center"
          >
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
            </div>

            {/* Menu Links */}
            <ul className="flex flex-col items-center gap-8 relative z-10">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-5xl font-bold tracking-tighter transition-all duration-300 ${
                      pathname === link.href
                        ? "text-transparent bg-clip-text bg-linear-to-r from-green-400 to-cyan-400"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Mobile Footer Area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-10 flex flex-col items-center gap-6"
            >
              <Link href="/contact" onClick={() => setOpen(false)}>
                <button className="px-8 py-3 rounded-full bg-white/10 border border-white/10 text-white font-medium hover:bg-green-500 hover:text-black hover:border-green-500 transition-all">
                  Start a Project
                </button>
              </Link>

              <div className="flex gap-6">
                <a
                  target="_blank"
                  href="https://github.com/rakib-hossain32"
                  className="text-gray-400 hover:text-green-400"
                >
                  <Github size={24} />
                </a>
                <a
                  target="_blank"
                  href="https://www.facebook.com/rakibmahmud32"
                  className="text-gray-400 hover:text-cyan-400"
                >
                  <Facebook size={24} />
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/rakib-hossain-md/"
                  className="text-gray-400 hover:text-white"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
