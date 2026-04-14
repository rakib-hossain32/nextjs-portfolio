"use client";

const AUTH_KEY = "dashboard_auth";

export function setAuth(token) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(AUTH_KEY, token);
  }
}

export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return !!sessionStorage.getItem(AUTH_KEY);
}

export function clearAuth() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(AUTH_KEY);
  }
}
