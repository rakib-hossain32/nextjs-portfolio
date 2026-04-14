"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  MessageSquareQuote,
} from "lucide-react";
import { isAuthenticated, clearAuth } from "@/lib/auth";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/testimonials", label: "Testimonials", icon: MessageSquareQuote },
];

// ─── Sidebar component defined OUTSIDE DashboardLayout ────────────────────────
function Sidebar({ pathname, onNavClick, onLogout, mobile = false }) {
  return (
    <div className={`flex flex-col h-full ${mobile ? "p-4" : "p-6"}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-green-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-900/40">
          <span className="text-white font-bold text-sm">R</span>
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-none">Rakib Hossain</p>
          <p className="text-green-400/70 text-xs mt-0.5">Portfolio CMS</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                active
                  ? "bg-green-500/15 text-green-400 border border-green-500/25"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon
                size={18}
                className={
                  active ? "text-green-400" : "text-gray-500 group-hover:text-gray-300"
                }
              />
              <span className="text-sm font-medium">{label}</span>
              {active && (
                <ChevronRight size={14} className="ml-auto text-green-400/60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="space-y-2 pt-4 border-t border-white/5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group text-sm"
        >
          <ExternalLink size={16} className="text-gray-500 group-hover:text-gray-300" />
          View Portfolio
        </Link>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all group text-sm"
        >
          <LogOut size={16} className="text-gray-500 group-hover:text-red-400" />
          Logout
        </button>
      </div>
    </div>
  );
}

// ─── Main Layout ───────────────────────────────────────────────────────────────
export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authChecked, setAuthChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // If we are already on the login page, don't check auth or redirect
      if (pathname === "/dashboard/login") {
        setAuthChecked(true);
        return;
      }

      if (!isAuthenticated()) {
        router.replace("/dashboard/login");
      } else {
        setAuthChecked(true);
      }
    };
    checkAuth();
  }, [router, pathname]);

  function handleLogout() {
    clearAuth();
    router.push("/dashboard/login");
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#030703] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030703] flex text-white">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 flex-col bg-[#060d06]/80 border-r border-white/5 fixed top-0 left-0 h-full z-30 backdrop-blur-xl">
        <Sidebar
          pathname={pathname}
          onNavClick={closeSidebar}
          onLogout={handleLogout}
        />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-72 bg-[#060d06] border-r border-white/5 z-50 lg:hidden"
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={closeSidebar}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>
              <Sidebar
                pathname={pathname}
                onNavClick={closeSidebar}
                onLogout={handleLogout}
                mobile
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-[#030703]/80 backdrop-blur-xl border-b border-white/5 px-6 h-14 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-medium">
              {navItems.find((n) => n.href === pathname)?.label || "Dashboard"}{" "}
              &mdash; Admin Panel
            </p>
          </div>
          <div className="w-7 h-7 rounded-full bg-linear-to-br from-green-500 to-cyan-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">R</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* BG glow */}
      <div className="fixed top-0 left-60 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
    </div>
  );
}
