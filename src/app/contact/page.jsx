"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
  Facebook,
} from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState("idle"); // idle, submitting, success

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: "Email Me",
      value: "dev.rakibhossain32@gmail.com", // Replace with real email
      link: "mailto:dev.rakibhossain32@gmail.com",
    },
    {
      icon: <Phone size={20} />,
      label: "Call Me",
      value: "+880 164 8202 601",
      link: "tel:+8801648202601",
    },
    {
      icon: <MapPin size={20} />,
      label: "Location",
      value: "Shibchar, Madaripur, Bangladesh",
      link: "#",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("submitting");
    // Simulate submission
    setTimeout(() => setFormState("success"), 1500);
  };

  return (
    <section className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-[#050a05] text-white">
      {/* ==================== AMBIENT GLOW ==================== */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        {/* ==================== LEFT: CONTACT INFO ==================== */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-green-400 font-medium tracking-widest text-sm uppercase border border-green-500/20 bg-green-500/5 px-4 py-1 rounded-full">
              <Send size={14} /> Get in touch
            </div>
            <h1 className="">
              Let’s Build Something <br />
              <span className="">Extraordinary.</span>
            </h1>
            <p className="">
              I’m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
          </div>

          {/* Info Cards */}
          <div className="space-y-5">
            {contactInfo.map((item, i) => (
              <a key={i} href={item.link} className="">
                <div className="sm:flex  max-sm:space-y-2 w-full  items-center sm:gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-green-500/30 transition-all duration-300 group">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-linear-to-br from-green-500/20 to-cyan-500/20 text-green-400 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">
                      {item.label}
                    </p>
                    <p className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors">
                      {item.value}
                    </p>
                  </div>
                </div>
                <div className="ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-green-400">
                  <ArrowUpRight />
                </div>
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="pt-4">
            <p className="text-gray-400 text-sm mb-4">
              Connect with me on social media
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/rakib-hossain32"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-green-600 hover:border-green-600 hover:scale-110 transition-all duration-300"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.facebook.com/rakibmahmud32"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-green-600 hover:border-green-600 hover:scale-110 transition-all duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/rakib-hossain-md/"
                target="_blank"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-green-600 hover:border-green-600 hover:scale-110 transition-all duration-300"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ==================== RIGHT: CONTACT FORM ==================== */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Form Container with Glow Border Effect */}
          <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-green-500/20 to-cyan-500/20 blur-lg opacity-50" />

          <form
            onSubmit={handleSubmit}
            className="relative bg-[#0a100a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/10 focus:ring-1 focus:ring-green-500/50 transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/10 focus:ring-1 focus:ring-green-500/50 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">
                Subject
              </label>
              <input
                type="text"
                placeholder="Project Inquiry"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/10 focus:ring-1 focus:ring-green-500/50 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">
                Message
              </label>
              <textarea
                placeholder="Tell me about your project..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/10 focus:ring-1 focus:ring-green-500/50 transition-all duration-300 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={formState === "submitting" || formState === "success"}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden relative group cursor-pointer
                ${
                  formState === "success"
                    ? "bg-green-600 hover:bg-green-600 cursor-default"
                    : "bg-linear-to-r from-green-600 to-emerald-700 hover:scale-[1.02] hover:shadow-green-500/25"
                }
              `}
            >
              {formState === "submitting" ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : formState === "success" ? (
                "Message Sent!"
              ) : (
                <>
                  <span className="relative z-10">Send Message</span>
                  <Send
                    size={18}
                    className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
