"use client";

import { motion } from "framer-motion";
import { Code2, Server, Layout, Smartphone, Globe, Rocket, CheckCircle2, ArrowRight } from "lucide-react";


export default function ServicesPage() {
  const services = [
    {
      title: "Frontend Development",
      desc: "Pixel-perfect, responsive interfaces using React.js and Next.js with modern animations.",
      icon: <Layout size={32} />,
      features: ["React / Next.js", "Tailwind CSS", "Framer Motion", "Responsive Design"],
    },
    {
      title: "Backend Development",
      desc: "Robust and scalable server-side logic using Node.js, Express, and secure Databases.",
      icon: <Server size={32} />,
      features: ["Node.js / Express", "MongoDB", "RESTful APIs", "Authentication"],
    },
    {
      title: "Full Stack Solution",
      desc: "Complete web applications from scratch to deployment, handling both client and server side.",
      icon: <Globe size={32} />,
      features: ["MERN Stack Architecture", "Admin Dashboard", "Payment Gateway", "Deployment (AWS/Vercel)"],
    },
    {
      title: "Performance Optimization",
      desc: "Speeding up existing websites, improving SEO, and fixing bugs for better user experience.",
      icon: <Rocket size={32} />,
      features: ["Lazy Loading", "SEO Optimization", "Code Refactoring", "Bug Fixing"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-[#050a05] text-white">
      
      {/* ==================== AMBIENT GLOW ==================== */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 text-green-400 font-medium tracking-widest text-sm uppercase border border-green-500/20 bg-green-500/5 px-4 py-1 rounded-full mb-4">
             <Code2 size={16} /> What I Offer
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            High-Quality <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-cyan-400">Services</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            I help businesses grow by crafting high-quality software solutions. 
            From simple landing pages to complex enterprise applications.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative p-8 rounded-3xl bg-[#0a100a] border border-white/10 hover:border-green-500/30 transition-all duration-300 overflow-hidden"
            >
              {/* Hover linear Background */}
              <div className="absolute inset-0 bg-linear-to-br from-green-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Icon Box */}
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-black transition-all duration-300 shadow-lg shadow-green-900/20">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.desc}
                </p>

                {/* Feature List */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle2 size={16} className="text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <a href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-green-500/50 pb-1 hover:text-green-400 hover:border-green-400 transition-all">
                  Start Project <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-24 relative rounded-3xl overflow-hidden bg-linear-to-r from-green-900/20 to-cyan-900/20 border border-white/10 p-10 md:p-16 text-center"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8 text-lg">
              Lets collaborate to create something impactful. I am currently available for freelance projects.
            </p>
            <a 
              href="/contact"
              className="inline-block px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Book a Consultation
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}