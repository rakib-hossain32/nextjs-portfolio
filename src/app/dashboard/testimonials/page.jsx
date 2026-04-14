"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2, Search, CheckCircle2, AlertTriangle, MessageSquareQuote, Check, X, User
} from "lucide-react";
import {
  getAllTestimonialsAction,
  updateTestimonialStatusAction,
  deleteTestimonialAction,
} from "@/app/testimonialActions";

// ─── Toast ────────────────────────────────────────────────────────────────────
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

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteModal({ testimonial, onConfirm, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0a110a] border border-white/10 rounded-2xl p-6 w-full max-w-sm"
      >
        <div className="w-12 h-12 rounded-2xl bg-red-500/15 flex items-center justify-center mb-4">
          <AlertTriangle size={22} className="text-red-400" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">Delete Testimonial?</h3>
        <p className="text-gray-400 text-sm mb-6">
          Are you sure you want to delete this review from <span className="text-white font-medium">&ldquo;{testimonial?.name}&rdquo;</span>?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-all text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Testimonial Row ──────────────────────────────────────────────────────────────
function TestimonialRow({ testimonial, onToggleStatus, onDelete, index }) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      exit={{ opacity: 0, x: 10 }}
      className="group border-b border-white/5 hover:bg-white/2 transition-colors"
    >
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 shrink-0">
            <User size={18} />
          </div>
          <div className="min-w-0">
             <p className="text-sm font-semibold text-white truncate max-w-[180px]">{testimonial.name}</p>
             <p className="text-xs text-gray-500 truncate max-w-[200px]">{testimonial.role}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-4">
        <p className="text-xs text-gray-400 italic line-clamp-2 max-w-sm" title={testimonial.content}>
          "{testimonial.content}"
        </p>
      </td>
      <td className="px-5 py-4">
        <span className="flex items-center gap-1 text-xs text-yellow-400">
           {testimonial.rating} / 5
        </span>
      </td>
      <td className="px-5 py-4">
        <button
          onClick={() => onToggleStatus(testimonial)}
          className={`px-2.5 py-1 rounded-full border text-xs font-medium flex items-center gap-1 transition-all ${
            testimonial.isApproved 
              ? "bg-green-500/10 border-green-500/20 text-green-400 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400"
              : "bg-orange-500/10 border-orange-500/20 text-orange-400 hover:bg-green-500/10 hover:border-green-500/20 hover:text-green-400"
          }`}
          title={testimonial.isApproved ? "Click to reject and hide" : "Click to approve and show"}
        >
          {testimonial.isApproved ? (
             <><Check size={12} /> Approved</> 
          ) : (
             <><X size={12} /> Pending</>
          )}
        </button>
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onDelete(testimonial)}
            className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TestimonialsManagerPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const data = await getAllTestimonialsAction();
      setTestimonials(data.map(p => ({ ...p, id: p._id })));
    };
    fetchTestimonials();
  }, []);

  function showToast(message, type = "success") {
    setToast({ message, type });
  }

  async function handleToggleStatus(testimonial) {
    const newStatus = !testimonial.isApproved;
    const result = await updateTestimonialStatusAction(testimonial.id, newStatus);
    
    if (result.success) {
      const data = await getAllTestimonialsAction();
      setTestimonials(data.map(p => ({ ...p, id: p._id })));
      showToast(newStatus ? "Testimonial approved & published!" : "Testimonial rejected & hidden!");
    } else {
      showToast(result.error || "Update failed", "error");
    }
  }

  async function handleDelete() {
    if (!deleteTarget?.id) return;
    const result = await deleteTestimonialAction(deleteTarget.id);
    if (result.success) {
      const data = await getAllTestimonialsAction();
      setTestimonials(data.map(p => ({ ...p, id: p._id })));
      setDeleteTarget(null);
      showToast("Testimonial deleted.");
    } else {
      showToast(result.error || "Delete failed", "error");
    }
  }

  const filtered = (testimonials || [])
    .filter((t) => t && (statusFilter === "All" || (statusFilter === "Approved" ? t.isApproved : !t.isApproved)))
    .filter((t) =>
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.content?.toLowerCase().includes(search.toLowerCase())
    );

  const filterOptions = ["All", "Approved", "Pending"];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <p className="text-gray-400 text-sm mt-1">{testimonials.length} total client reviews</p>
        </div>
      </motion.div>

      {/* Search + Filter bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search testimonials by name or content..."
            className="w-full bg-[#080f08]/60 border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-green-500/40 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setStatusFilter(opt)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                statusFilter === opt
                  ? "bg-green-500/15 border border-green-500/30 text-green-400"
                  : "bg-white/5 border border-white/8 text-gray-400 hover:text-white"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-[#080f08]/60 border border-white/8 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client info</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Review Content</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-gray-500">
                      <MessageSquareQuote size={36} className="mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No testimonials found.</p>
                      <p className="mt-2 text-xs opacity-50">Users can submit reviews from the frontend.</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((t, i) => (
                    <TestimonialRow
                      key={t?.id || i}
                      testimonial={t}
                      index={i}
                      onToggleStatus={handleToggleStatus}
                      onDelete={(item) => setDeleteTarget(item)}
                    />
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-white/5">
            <p className="text-xs text-gray-500">
              Showing {filtered.length} of {testimonials.length} reviews
            </p>
          </div>
        )}
      </motion.div>

      {/* Delete modal */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteModal
            testimonial={deleteTarget}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
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
    </div>
  );
}
