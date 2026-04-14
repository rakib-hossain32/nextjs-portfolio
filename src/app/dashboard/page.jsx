"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Star,
  Tag,
  TrendingUp,
  PlusCircle,
  ArrowRight,
  ExternalLink,
  Github,
} from "lucide-react";
import { getProjectsAction } from "@/app/projectActions";

function StatCard({ icon: Icon, label, value, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-[#080f08]/60 border border-white/8 rounded-2xl p-5 flex items-center gap-4 group hover:border-green-500/20 transition-all duration-300"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-3xl font-bold text-white">{value}</p>
        <p className="text-gray-400 text-sm mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

export default function DashboardOverview() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjectsAction();
      setProjects(data.map(p => ({ ...p, id: p._id })));
    };
    fetchData();
  }, []);

  const totalProjects = projects.length;
  const featuredCount = projects.filter((p) => p.featured).length;
  const categories = [...new Set(projects.map((p) => p.tag))];
  const recentProjects = [...projects].slice(-3).reverse();

  const stats = [
    {
      icon: FolderKanban,
      label: "Total Projects",
      value: totalProjects,
      color: "bg-green-500/15 text-green-400",
      delay: 0.1,
    },
    {
      icon: Star,
      label: "Featured",
      value: featuredCount,
      color: "bg-yellow-500/15 text-yellow-400",
      delay: 0.15,
    },
    {
      icon: Tag,
      label: "Categories",
      value: categories.length,
      color: "bg-cyan-500/15 text-cyan-400",
      delay: 0.2,
    },
    {
      icon: TrendingUp,
      label: "Active",
      value: totalProjects,
      color: "bg-purple-500/15 text-purple-400",
      delay: 0.25,
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Overview</h1>
          <p className="text-gray-400 text-sm mt-1">
            Welcome back! Manage your portfolio content below.
          </p>
        </div>
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 hover:bg-green-500/25 transition-all text-sm font-medium"
        >
          <PlusCircle size={16} />
          Add Project
        </Link>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Recent Projects + Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-[#080f08]/60 border border-white/8 rounded-2xl overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Recent Projects</h2>
            <Link
              href="/dashboard/projects"
              className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {recentProjects.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">No projects yet.</p>
            ) : (
              recentProjects.map((p) => (
                <div
                  key={p.id}
                  className="px-5 py-4 flex items-center gap-4 hover:bg-white/2 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-lg bg-cover bg-center shrink-0 border border-white/10"
                    style={{ backgroundImage: `url(${p.img})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{p.title}</p>
                    <p className="text-xs text-gray-500 truncate">{p.desc}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium shrink-0">
                    {p.tag}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <a href={p.live} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                      <ExternalLink size={14} />
                    </a>
                    <a href={p.git} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                      <Github size={14} />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Categories breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-[#080f08]/60 border border-white/8 rounded-2xl overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-white/5">
            <h2 className="text-sm font-semibold text-white">By Category</h2>
          </div>
          <div className="p-5 space-y-3">
            {categories.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No data yet.</p>
            ) : (
              categories.map((cat) => {
                const count = projects.filter((p) => p.tag === cat).length;
                const pct = Math.round((count / totalProjects) * 100);
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">{cat}</span>
                      <span className="text-xs font-semibold text-white">{count}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-linear-to-r from-green-500 to-cyan-500 rounded-full"
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick actions */}
          <div className="px-5 pb-5 pt-2 space-y-2">
            <Link
              href="/dashboard/projects"
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-all text-sm font-medium"
            >
              Manage Projects <ArrowRight size={15} />
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-gray-300 hover:bg-white/10 transition-all text-sm font-medium"
            >
              View Live Site <ExternalLink size={15} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
