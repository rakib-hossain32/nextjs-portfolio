"use client";

import { useState, useEffect } from "react";
import { MessageSquareQuote, Star, User, Building2, Plus, X, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { getApprovedTestimonialsAction, addTestimonialAction } from "@/app/testimonialActions";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "@/context/LenisContext";

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-medium ${
        type === "success"
          ? "bg-green-500/15 border-green-500/30 text-green-300"
          : "bg-red-500/15 border-red-500/30 text-red-300"
      }`}
    >
      {type === "success" ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
      {message}
    </motion.div>
  );
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const data = await getApprovedTestimonialsAction();
      setTestimonials(data);
      setLoading(false);
    };
    
    fetchTestimonials();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const testimonialsReversed = [...testimonials].reverse();

  return (
    <section className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-[#050a05] text-white flex flex-col justify-center">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-16 px-6">
          <div className="inline-flex items-center gap-2 text-green-400 font-medium tracking-widest text-sm uppercase border border-green-500/20 bg-green-500/5 px-4 py-1 rounded-full mb-4">
            <MessageSquareQuote size={16} /> Client Feedback
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Trusted by{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-cyan-400">
              Clients
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            See what people are saying about working with me.
          </p>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-linear-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 text-green-400 font-medium hover:bg-green-500/30 transition-all hover:scale-105"
          >
            <Plus size={18} /> Add Your Review
          </button>
        </div>

        {/* ==================== SCROLL ROWS ==================== */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
             <Loader2 size={40} className="animate-spin text-green-500/50" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 opacity-50 px-6 text-center">
             <MessageSquareQuote size={48} className="mb-4 text-gray-500" />
             <p className="text-gray-400 text-lg">No reviews yet. Be the first to add one!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {/* --- ROW 1: Scroll Left --- */}
            <div className="relative flex overflow-hidden scroller-container gap-6">
              <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-linear-to-r from-[#050a05] to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-linear-to-l from-[#050a05] to-transparent pointer-events-none" />

              <div className="flex min-w-full shrink-0 gap-6 animate-marquee py-4 hover:[animation-play-state:paused]">
                {testimonials.map((item, idx) => (
                  <TestimonialCard key={`r1-${item._id || idx}`} data={item} />
                ))}
              </div>
              <div
                className="flex min-w-full shrink-0 gap-6 animate-marquee py-4 hover:[animation-play-state:paused]"
                aria-hidden="true"
              >
                {testimonials.map((item, idx) => (
                  <TestimonialCard key={`r1-dup-${item._id || idx}`} data={item} />
                ))}
              </div>
            </div>

            {/* --- ROW 2: Scroll Right --- */}
            {testimonialsReversed.length > 2 && (
              <div className="relative flex overflow-hidden scroller-container gap-6 mt-4">
                <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-linear-to-r from-[#050a05] to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-linear-to-l from-[#050a05] to-transparent pointer-events-none" />

                <div className="flex min-w-full shrink-0 gap-6 animate-marquee-reverse py-4 hover:[animation-play-state:paused]">
                  {testimonialsReversed.map((item, idx) => (
                    <TestimonialCard key={`r2-${item._id || idx}`} data={item} />
                  ))}
                </div>
                <div
                  className="flex min-w-full shrink-0 gap-6 animate-marquee-reverse py-4 hover:[animation-play-state:paused]"
                  aria-hidden="true"
                >
                  {testimonialsReversed.map((item, idx) => (
                    <TestimonialCard key={`r2-dup-${item._id || idx}`} data={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 text-center px-6">
          <Link
            href="/contact"
            className="inline-block px-8 py-3 rounded-full bg-white/10 border border-white/10 text-white font-semibold hover:bg-green-500 hover:text-black hover:border-green-500 transition-all hover:scale-105"
          >
            Start a Project
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <ReviewModal 
            onClose={() => setIsModalOpen(false)} 
            showToast={showToast}
          />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function TestimonialCard({ data }) {
  return (
    <div className="group/card relative w-[350px] md:w-[450px] p-8 rounded-3xl bg-[#0a100a] border border-white/10 hover:border-green-500/30 transition-all duration-300 shrink-0 cursor-pointer h-full">
      <div className="absolute top-6 right-6 text-white/5 group-hover/card:text-green-500/10 transition-colors">
        <MessageSquareQuote size={48} />
      </div>

      <div className="flex gap-1 mb-6 text-green-400">
        {[...Array(data.rating || 5)].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" className="opacity-80" />
        ))}
      </div>

      <p className="text-gray-300 text-lg italic leading-relaxed mb-8 relative z-10 line-clamp-4 select-none">
        &#34;{data.content}&#34;
      </p>

      <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10 group-hover/card:border-green-500/20 transition-colors">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
          <User size={20} />
        </div>
        <div>
          <h4 className="text-white font-bold text-sm group-hover/card:text-green-400 transition-colors truncate max-w-[200px]">
            {data.name}
          </h4>
          <div className="flex items-center gap-1 text-xs text-gray-500 truncate max-w-[200px]">
            <Building2 size={10} />
            <span>{data.role}</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-br from-green-500/5 to-cyan-500/5 opacity-0 group-hover/card:opacity-100 rounded-3xl pointer-events-none transition-opacity duration-500" />
    </div>
  );
}

function ReviewModal({ onClose, showToast }) {
  const [form, setForm] = useState({ name: "", role: "", content: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const lenisRef = useLenis();

  useEffect(() => {
    // Stop Lenis smooth scroll when modal opens
    if (lenisRef?.current) {
      lenisRef.current.stop();
    }
    // Also lock body scroll as a fallback
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      // Restart Lenis when modal closes
      if (lenisRef?.current) {
        lenisRef.current.start();
      }
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [lenisRef]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.role.trim()) e.role = "Role/Designation is required";
    if (!form.content.trim()) e.content = "Review content is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    
    // Create new testimonial, keeping isApproved as false (default)
    const result = await addTestimonialAction(form);
    
    setSubmitting(false);
    if (result.success) {
      showToast("Review submitted successfully! It will be verified by admin.");
      onClose();
    } else {
      showToast(result.error || "Failed to submit review", "error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0a110a] border border-white/10 rounded-2xl w-full max-w-md my-8 overflow-hidden shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all">
          <X size={20} />
        </button>
        
        <div className="p-6 border-b border-white/5 text-center">
           <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 mx-auto mb-3">
             <MessageSquareQuote size={24} />
           </div>
           <h2 className="text-xl font-bold text-white">Write a Review</h2>
           <p className="text-sm text-gray-400 mt-1">Share your experience working with me.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Your Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => { setForm(f => ({ ...f, name: e.target.value })); setErrors(err => ({ ...err, name: "" })) }}
              placeholder="e.g. John Doe"
              className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 transition-all ${
                errors.name ? "border-red-500/50" : "border-white/10 focus:border-green-500/50 focus:ring-green-500/30"
              }`}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Designation / Role</label>
            <input
              type="text"
              value={form.role}
              onChange={(e) => { setForm(f => ({ ...f, role: e.target.value })); setErrors(err => ({ ...err, role: "" })) }}
              placeholder="e.g. CEO, TechStart"
              className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 transition-all ${
                errors.role ? "border-red-500/50" : "border-white/10 focus:border-green-500/50 focus:ring-green-500/30"
              }`}
            />
            {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, rating: star }))}
                  className="p-1 focus:outline-none"
                >
                  <Star 
                    size={24} 
                    fill={star <= form.rating ? "currentColor" : "none"} 
                    className={star <= form.rating ? "text-yellow-400" : "text-gray-500"} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
             <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Review</label>
             <textarea
              value={form.content}
              onChange={(e) => { setForm(f => ({ ...f, content: e.target.value })); setErrors(err => ({ ...err, content: "" })) }}
              placeholder="How was your experience?"
              rows={4}
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 transition-all resize-none ${
                errors.content ? "border-red-500/50" : "border-white/10 focus:border-green-500/50 focus:ring-green-500/30"
              }`}
             />
             {errors.content && <p className="text-red-400 text-xs mt-1">{errors.content}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-4 py-3 rounded-xl bg-linear-to-r from-green-600 to-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:from-green-500 hover:to-emerald-600 transition-all disabled:opacity-60"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <MessageSquareQuote size={16} />}
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
