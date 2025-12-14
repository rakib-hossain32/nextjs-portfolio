"use client";

import { MessageSquareQuote, Star, User, Building2 } from "lucide-react";

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "CEO, TechStart",
      content:
        "Rakib is an exceptional developer. He transformed our outdated website into a modern, high-performance platform.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Marketing Director",
      content:
        "Working with Rakib was a breeze. He understood our vision perfectly and delivered a product that exceeded expectations.",
      rating: 5,
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Founder, E-Shopify",
      content:
        "I hired Rakib for a complex MERN stack e-commerce project. He handled the backend logic and frontend design flawlessly.",
      rating: 5,
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Product Manager",
      content:
        "Professional, timely, and incredibly skilled. Rakib suggested improvements that made our app faster and more user-friendly.",
      rating: 5,
    },
    {
      id: 5,
      name: "David Wilson",
      role: "CTO, DataSystems",
      content:
        "We needed a dashboard with real-time data visualization. Rakib delivered a solution that is both beautiful and highly functional.",
      rating: 5,
    },
    {
      id: 6,
      name: "Jessica Martinez",
      role: "Owner, Boutique Style",
      content:
        "Rakib helped me launch my online store. He was patient, responsive, and technical support was excellent.",
      rating: 5,
    },
  ];

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
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See what people are saying about working with me.
          </p>
        </div>

        {/* ==================== SCROLL ROWS ==================== */}
        <div className="flex flex-col gap-10">
          {/* --- ROW 1: Scroll Left --- */}
          {/* Added 'gap-6' here to fix the joining issue */}
          <div className="relative flex overflow-hidden scroller-container gap-6">
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-linear-to-r from-[#050a05] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-linear-to-l from-[#050a05] to-transparent pointer-events-none" />

            <div className="flex min-w-full shrink-0 gap-6 animate-marquee py-4">
              {testimonials.map((item, idx) => (
                <TestimonialCard key={idx} data={item} />
              ))}
            </div>
            <div
              className="flex min-w-full shrink-0 gap-6 animate-marquee py-4"
              aria-hidden="true"
            >
              {testimonials.map((item, idx) => (
                <TestimonialCard key={idx} data={item} />
              ))}
            </div>
          </div>

          {/* --- ROW 2: Scroll Right --- */}
          {/* Added 'gap-6' here too */}
          <div className="relative flex overflow-hidden scroller-container gap-6">
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-linear-to-r from-[#050a05] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-linear-to-l from-[#050a05] to-transparent pointer-events-none" />

            <div className="flex min-w-full shrink-0 gap-6 animate-marquee-reverse py-4">
              {testimonialsReversed.map((item, idx) => (
                <TestimonialCard key={idx} data={item} />
              ))}
            </div>
            <div
              className="flex min-w-full shrink-0 gap-6 animate-marquee-reverse py-4"
              aria-hidden="true"
            >
              {testimonialsReversed.map((item, idx) => (
                <TestimonialCard key={idx} data={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center px-6">
          <a
            href="/contact"
            className="inline-block px-8 py-3 rounded-full bg-white/10 border border-white/10 text-white font-semibold hover:bg-green-500 hover:text-black hover:border-green-500 transition-all hover:scale-105"
          >
            Start a Project
          </a>
        </div>
      </div>

      {/* ==================== CSS LOGIC ==================== */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% - 24px));
          } /* 24px = gap-6 */
        }
        @keyframes marquee-reverse {
          0% {
            transform: translateX(calc(-100% - 24px));
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 50s linear infinite;
        }

        /* Hover Pause Logic */
        .scroller-container:hover .animate-marquee,
        .scroller-container:hover .animate-marquee-reverse {
          animation-play-state: paused !important;
        }
      `}</style>
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
        {[...Array(data.rating)].map((_, i) => (
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
          <h4 className="text-white font-bold text-sm group-hover/card:text-green-400 transition-colors">
            {data.name}
          </h4>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Building2 size={10} />
            <span>{data.role}</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-br from-green-500/5 to-cyan-500/5 opacity-0 group-hover/card:opacity-100 rounded-3xl pointer-events-none transition-opacity duration-500" />
    </div>
  );
}
