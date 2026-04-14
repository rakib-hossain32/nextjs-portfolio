import { initialProjects } from "@/data/initialProjects";

const PROJECTS_KEY = "portfolio_projects";
const AUTH_KEY = "dashboard_auth";

// ─── Projects CRUD ────────────────────────────────────────────────────────────

export function getProjects() {
  if (typeof window === "undefined") return initialProjects;
  try {
    const stored = localStorage.getItem(PROJECTS_KEY);
    if (stored) return JSON.parse(stored);
    // First run: seed localStorage with initial data
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(initialProjects));
    return initialProjects;
  } catch {
    return initialProjects;
  }
}

export function saveProjects(projects) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function addProject(projectData) {
  const projects = getProjects();
  const newProject = {
    ...projectData,
    id: `proj_${Date.now()}`,
    images: projectData.images?.length
      ? projectData.images
      : [projectData.img, projectData.img, projectData.img],
  };
  const updated = [...projects, newProject];
  saveProjects(updated);
  return updated;
}

export function updateProject(id, updates) {
  const projects = getProjects();
  const updated = projects.map((p) =>
    p.id === id
      ? {
          ...p,
          ...updates,
          images: updates.images?.length
            ? updates.images
            : [updates.img || p.img, updates.img || p.img, updates.img || p.img],
        }
      : p
  );
  saveProjects(updated);
  return updated;
}

export function deleteProject(id) {
  const projects = getProjects();
  const updated = projects.filter((p) => p.id !== id);
  saveProjects(updated);
  return updated;
}

export function resetToInitial() {
  saveProjects(initialProjects);
  return initialProjects;
}

export function exportProjectsJSON() {
  const projects = getProjects();
  return JSON.stringify(projects, null, 2);
}

// ─── Auth Helpers ─────────────────────────────────────────────────────────────

export function setAuth(token) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(AUTH_KEY, token);
}

export function getAuth() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(AUTH_KEY);
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
  return getAuth() === "authenticated";
}
