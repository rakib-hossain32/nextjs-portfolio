"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ArrowUp, Mail, Send, Facebook } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com/rakib-hossain32" },
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/rakib-hossain-md/",
    },
    { icon: <Facebook size={20} />, href: "https://www.facebook.com/rakibmahmud32" },
    { icon: <Mail size={20} />, href: "mailto:dev.rakibhossain32@gmail.com" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Education", href: "/education" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    "Web Development",
    "MERN Stack",
    "UI/UX Design",
    "API Integration",
    "SaaS Applications"
  ];

  return (
    <footer className="relative bg-[#050a05] pt-20 pb-10 border-t border-white/10 overflow-hidden">
      
      {/* ==================== AMBIENT GLOW ==================== */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 bg-linear-to-tr from-green-500 to-cyan-500 rounded-lg flex items-center justify-center text-[#050a05] font-bold text-lg">
                R
              </div>
              <span className="text-xl font-bold text-white tracking-tight group-hover:text-green-400 transition-colors">
                Rakib.dev
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting scalable, high-performance web applications with modern technologies and pixel-perfect design.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-green-500 hover:text-black hover:border-green-500 hover:scale-110 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-green-400 text-sm flex items-center gap-2 group transition-all"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-green-400 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Services (Visual filler) */}
          <div>
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-gray-400 text-sm hover:text-cyan-400 transition-colors cursor-default">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Newsletter / CTA */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold">Stay Updated</h3>
            <p className="text-gray-400 text-sm">
              Subscribe to get the latest updates on my projects and tech articles.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all"
              />
              <button className="absolute right-1 top-1 p-2 bg-linear-to-r from-green-500 to-cyan-500 rounded-md text-[#050a05] hover:opacity-90 transition-opacity">
                <Send size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Rakib Hossain. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
            
            {/* Back to Top Button */}
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-green-400 hover:border-green-500/50 transition-all ml-4"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}