"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, Search, Star, StarOff,
  ExternalLink, Github, X, Save, Loader2,
  Download, RotateCcw, AlertTriangle, CheckCircle2,
  Image as ImageIcon, Tag, Link as LinkIcon,
  FolderKanban,
} from "lucide-react";
import {
  getProjectsAction,
  addProjectAction,
  updateProjectAction,
  deleteProjectAction,
  seedInitialProjects,
} from "@/app/projectActions";
import { PROJECT_TAGS } from "@/data/initialProjects";
import { Database } from "lucide-react";

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
function DeleteModal({ project, onConfirm, onCancel }) {
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
        <h3 className="text-lg font-bold text-white mb-1">Delete Project?</h3>
        <p className="text-gray-400 text-sm mb-6">
          <span className="text-white font-medium">&ldquo;{project?.title}&rdquo;</span> চিরতরে delete হয়ে যাবে।
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

// ─── Project Form Modal ───────────────────────────────────────────────────────
const EMPTY_FORM = {
  title: "", desc: "", img: "", live: "", git: "", tag: "MERN", featured: false, images: [],
};

function ProjectFormModal({ project, onSave, onClose }) {
  const isEdit = !!project?.id;
  const [form, setForm] = useState(isEdit ? { ...project } : { ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.desc.trim()) e.desc = "Description is required";
    if (!form.img.trim()) e.img = "Image URL is required";
    if (!form.live.trim()) e.live = "Live URL is required";
    if (!form.git.trim()) e.git = "GitHub URL is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    onSave(form);
    setSaving(false);
  }

  function field(key, label, placeholder, icon) {
    return (
      <div>
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
          {label}
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{icon}</div>
          <input
            type="text"
            value={form[key]}
            onChange={(e) => { setForm((f) => ({ ...f, [key]: e.target.value })); setErrors((err) => ({ ...err, [key]: "" })); }}
            placeholder={placeholder}
            className={`w-full bg-white/5 border rounded-xl pl-9 pr-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 transition-all ${
              errors[key] ? "border-red-500/50 focus:ring-red-500/30" : "border-white/10 focus:border-green-500/50 focus:ring-green-500/30"
            }`}
          />
        </div>
        {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0a110a] border border-white/10 rounded-2xl w-full max-w-lg my-8 overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div>
            <h2 className="text-lg font-bold text-white">{isEdit ? "Edit Project" : "Add New Project"}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{isEdit ? "Update project details" : "Fill in the project information"}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {field("title", "Project Title", "e.g. ContestHub", <span className="text-xs font-bold">T</span>)}
          
          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Description</label>
            <textarea
              value={form.desc}
              onChange={(e) => { setForm((f) => ({ ...f, desc: e.target.value })); setErrors((err) => ({ ...err, desc: "" })); }}
              placeholder="Short project description..."
              rows={3}
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 transition-all resize-none ${
                errors.desc ? "border-red-500/50" : "border-white/10 focus:border-green-500/50 focus:ring-green-500/30"
              }`}
            />
            {errors.desc && <p className="text-red-400 text-xs mt-1">{errors.desc}</p>}
          </div>

          {field("img", "Thumbnail URL", "https://i.ibb.co/...", <ImageIcon size={14} />)}
          {field("live", "Live Site URL", "https://myproject.web.app/", <ExternalLink size={14} />)}
          {field("git", "GitHub URL", "https://github.com/username/repo", <Github size={14} />)}

          {/* Gallery Images (Dynamic Inputs) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Gallery Images
              </label>
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, images: [...(f.images || []), ""] }))}
                className="text-xs text-green-400 hover:text-green-300 font-medium flex items-center gap-1 transition-colors"
              >
                <Plus size={12} /> Add More
              </button>
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {(form.images || []).map((img, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <ImageIcon size={14} />
                  </div>
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => {
                      const newImages = [...form.images];
                      newImages[idx] = e.target.value;
                      setForm(f => ({ ...f, images: newImages }));
                    }}
                    placeholder={`Gallery Image #${idx + 1} URL`}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-10 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = form.images.filter((_, i) => i !== idx);
                      setForm(f => ({ ...f, images: newImages }));
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              
              {(form.images || []).length === 0 && (
                <p className="text-center py-2 text-xs text-gray-600 border border-dashed border-white/5 rounded-xl">
                  No gallery images added.
                </p>
              )}
            </div>
          </div>

          {/* Tag */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Category Tag</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><Tag size={14} /></div>
              <select
                value={form.tag}
                onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
                className="w-full bg-[#0d160d] border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white text-sm focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all appearance-none"
              >
                {PROJECT_TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Featured toggle */}
          <div className="flex items-center justify-between p-4 bg-white/3 rounded-xl border border-white/5">
            <div>
              <p className="text-sm font-medium text-white">Featured Project</p>
              <p className="text-gray-500 text-xs">Show with star badge</p>
            </div>
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
              className={`relative w-11 h-6 rounded-full transition-all duration-300 ${form.featured ? "bg-green-500" : "bg-white/10"}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${form.featured ? "left-6" : "left-1"}`} />
            </button>
          </div>

          {/* Image preview */}
          {form.img && (
            <div className="rounded-xl overflow-hidden border border-white/10 h-32 bg-white/5">
              <img src={form.img} alt="preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-all text-sm">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 rounded-xl bg-linear-to-r from-green-600 to-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:from-green-500 hover:to-emerald-600 transition-all disabled:opacity-60"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? "Saving..." : isEdit ? "Update Project" : "Add Project"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ─── Project Row ──────────────────────────────────────────────────────────────
function ProjectRow({ project, onEdit, onDelete, index }) {
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
          <div
            className="w-10 h-10 rounded-lg bg-cover bg-center shrink-0 border border-white/10"
            style={{ backgroundImage: `url(${project.img})` }}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-white truncate max-w-[180px]">{project.title}</p>
              {project.featured && <Star size={12} className="text-yellow-400 fill-yellow-400 shrink-0" />}
            </div>
            <p className="text-xs text-gray-500 truncate max-w-[200px]">{project.desc}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-4">
        <span className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
          {project.tag}
        </span>
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <a href={project.live} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Live site">
            <ExternalLink size={15} />
          </a>
          <a href={project.git} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors" title="GitHub">
            <Github size={15} />
          </a>
        </div>
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(project)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            title="Edit"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(project)}
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
export default function ProjectsManagerPage() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("All");
  const [formProject, setFormProject] = useState(null); // null=closed, {}=new, {id,...}=edit
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjectsAction();
      // Map MongoDB _id to id for UI consistency
      const mappedData = data.map(p => ({ ...p, id: p._id }));
      setProjects(mappedData);
    };
    fetchProjects();
  }, []);

  function showToast(message, type = "success") {
    setToast({ message, type });
  }

  async function handleSave(formData) {
    let result;
    if (formData.id) {
      result = await updateProjectAction(formData.id, formData);
    } else {
      result = await addProjectAction(formData);
    }
    
    if (result.success) {
      const data = await getProjectsAction();
      setProjects(data.map(p => ({ ...p, id: p._id })));
      setFormProject(null);
      showToast(formData.id ? "Project updated!" : "Project added!");
    } else {
      showToast(result.error || "Operation failed", "error");
    }
  }

  async function handleDelete() {
    if (!deleteTarget?.id) return;
    const result = await deleteProjectAction(deleteTarget.id);
    if (result.success) {
      const data = await getProjectsAction();
      setProjects(data.map(p => ({ ...p, id: p._id })));
      setDeleteTarget(null);
      showToast("Project deleted.");
    } else {
      showToast(result.error || "Delete failed", "error");
    }
  }

  function handleReset() {
    const updated = resetToInitial();
    setProjects(updated);
    setShowReset(false);
    showToast("Reset to initial projects!", "success");
  }

  function handleExport() {
    const json = exportProjectsJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "projects.json";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Exported as projects.json!");
  }

  async function handleSync() {
    const result = await seedInitialProjects();
    if (result.success) {
      const data = await getProjectsAction();
      setProjects(data.map(p => ({ ...p, id: p._id })));
      showToast("Initial projects synced!");
    } else {
      showToast(result.error || "Sync failed", "error");
    }
  }

  const filtered = (projects || [])
    .filter((p) => p && (tagFilter === "All" || p.tag === tagFilter))
    .filter((p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.desc?.toLowerCase().includes(search.toLowerCase())
    );

  const allTags = ["All", ...new Set((projects || []).filter(p => p?.tag).map((p) => p.tag))];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 text-sm mt-1">{projects.length} total projects</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-all text-sm"
          >
            <Download size={15} /> Export JSON
          </button>
          <button
            onClick={() => setShowReset(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-all text-sm"
          >
            <RotateCcw size={15} /> Reset
          </button>
          <button
            onClick={handleSync}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-all text-sm"
            title="Import initial projects to database"
          >
            <Database size={15} /> Sync Data
          </button>
          <button
            onClick={() => setFormProject({})}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 hover:bg-green-500/25 transition-all text-sm font-medium"
          >
            <Plus size={16} /> Add Project
          </button>
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
            placeholder="Search projects..."
            className="w-full bg-[#080f08]/60 border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-green-500/40 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setTagFilter(tag)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                tagFilter === tag
                  ? "bg-green-500/15 border border-green-500/30 text-green-400"
                  : "bg-white/5 border border-white/8 text-gray-400 hover:text-white"
              }`}
            >
              {tag}
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
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tag</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Links</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-16 text-gray-500">
                      <FolderKanban size={36} className="mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No projects found.</p>
                      <button
                        onClick={() => setFormProject({})}
                        className="mt-3 text-green-400 text-sm hover:text-green-300 transition-colors"
                      >
                        + Add your first project
                      </button>
                    </td>
                  </tr>
                ) : (
                  filtered.map((p, i) => (
                    <ProjectRow
                      key={p?.id || i}
                      project={p}
                      index={i}
                      onEdit={(proj) => setFormProject(proj)}
                      onDelete={(proj) => setDeleteTarget(proj)}
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
              Showing {filtered.length} of {projects.length} projects
            </p>
          </div>
        )}
      </motion.div>

      {/* Reset confirm */}
      <AnimatePresence>
        {showReset && (
          <DeleteModal
            project={{ title: "ALL projects (reset to default)" }}
            onConfirm={handleReset}
            onCancel={() => setShowReset(false)}
          />
        )}
      </AnimatePresence>

      {/* Form modal */}
      <AnimatePresence>
        {formProject !== null && (
          <ProjectFormModal
            project={Object.keys(formProject).length ? formProject : null}
            onSave={handleSave}
            onClose={() => setFormProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Delete modal */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteModal
            project={deleteTarget}
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
