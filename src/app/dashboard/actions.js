"use server";

export async function loginAction(password) {
  const adminPassword = process.env.DASHBOARD_PASSWORD;
  if (!adminPassword) {
    return { success: false, error: "Dashboard password not configured." };
  }
  if (password === adminPassword) {
    return { success: true };
  }
  return { success: false, error: "Invalid password. Please try again." };
}
