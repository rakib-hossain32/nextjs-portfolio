"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, BookOpen, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy Blog Data
  const allArticles = [
    {
      id: 1,
      title: "Mastering Server Actions in Next.js",
      excerpt:
        "An in-depth guide on how Server Actions simplify data mutations and reduce the need for traditional API routes.",
      date: "Next.js Blog",
      readTime: "5 min read",
      category: "Next.js",
      image:
        "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1200&auto=format&fit=crop",
      url: "https://nextjs.org/blog/next-14",
    },
    {
      id: 2,
      title: "Utility-First CSS: Why Tailwind Works",
      excerpt:
        "Tailwind CSS explains how utility-first styling improves development speed and maintainability.",
      date: "Tailwind Labs",
      readTime: "4 min read",
      category: "CSS",
      image:
        "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?q=80&w=1200&auto=format&fit=crop",
      url: "https://tailwindcss.com/docs/utility-first",
    },
    {
      id: 3,
      title: "Optimizing Performance in React Applications",
      excerpt:
        "Official React documentation on performance optimization techniques including memoization.",
      date: "React Docs",
      readTime: "6 min read",
      category: "React",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
      url: "https://react.dev/learn/render-and-commit",
    },
    {
      id: 4,
      title: "Best Practices for Structuring Node.js Applications",
      excerpt:
        "A community-driven guide on organizing Node.js and Express projects for scalability.",
      date: "FreeCodeCamp",
      readTime: "8 min read",
      category: "Backend",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      url: "https://www.freecodecamp.org/news/structuring-node-js-applications/",
    },
  ];


  // Search Logic
  const filteredArticles = allArticles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <section className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-[#050a05] text-white">
      {/* ==================== AMBIENT GLOW ==================== */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-green-400 font-medium tracking-widest text-sm uppercase border border-green-500/20 bg-green-500/5 px-4 py-1 rounded-full mb-2">
            <BookOpen size={16} /> The Blog
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Insights &{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-cyan-400">
              Thoughts
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sharing my journey, tutorials, and thoughts on the latest web
            technologies and software engineering patterns.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-8 relative group">
            <div className="absolute inset-0 bg-linear-to-r from-green-500/20 to-cyan-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full px-5 py-3 focus-within:border-green-500/50 focus-within:bg-white/10 transition-all">
              <Search className="text-gray-400 mr-3" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredArticles.map((article) => (
              <motion.article
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col h-full bg-[#0a100a] border border-white/10 rounded-2xl overflow-hidden hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(74,222,128,0.1)] transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-52 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a100a] to-transparent z-10 opacity-60" />
                  {/* Using a placeholder div for image if you don't have real images yet */}
                  <div className="w-full h-full bg-gray-800 group-hover:scale-110 transition-transform duration-700">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Placeholder content */}
                    <div className="flex items-center justify-center h-full text-gray-600 font-bold text-2xl">
                      {article.category} Image
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 text-xs font-bold text-black bg-green-400 rounded-full flex items-center gap-1">
                      <Tag size={12} /> {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col grow">
                  {/* Meta Data */}
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-cyan-400" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-cyan-400" />
                      {article.readTime}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-green-400 transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-gray-400 text-sm line-clamp-3 mb-6 grow">
                    {article.excerpt}
                  </p>

                  {/* Read More Link */}
                  {/* <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white group/link"
                  >
                    Read Article
                    <ArrowRight
                      size={16}
                      className="text-green-400 group-hover/link:translate-x-1 transition-transform"
                    />
                  </Link> */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white group/link"
                  >
                    Read Article
                    <ArrowRight
                      size={16}
                      className="text-green-400 group-hover/link:translate-x-1 transition-transform"
                    />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No articles found matching &quot;{searchTerm}&quot;
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-green-400 hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}