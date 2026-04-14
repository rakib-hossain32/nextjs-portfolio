"use server";

import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import { revalidatePath } from "next/cache";
import { initialProjects } from "@/data/initialProjects";

export async function seedInitialProjects() {
  await dbConnect();
  try {
    // Check if projects already exist to avoid duplicates
    const count = await Project.countDocuments();
    if (count > 0) return { success: false, error: "Database is not empty" };

    await Project.insertMany(initialProjects);
    revalidatePath("/projects");
    revalidatePath("/dashboard/projects");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getProjectsAction() {
  await dbConnect();
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    // Convert Mongo objects to plain JS objects for client components
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

export async function addProjectAction(projectData) {
  await dbConnect();
  try {
    const project = await Project.create(projectData);
    revalidatePath("/projects");
    revalidatePath("/dashboard/projects");
    return { success: true, project: JSON.parse(JSON.stringify(project)) };
  } catch (error) {
    console.error("Add Error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProjectAction(id, projectData) {
  await dbConnect();
  try {
    const project = await Project.findByIdAndUpdate(id, projectData, { new: true });
    revalidatePath("/projects");
    revalidatePath("/dashboard/projects");
    return { success: true, project: JSON.parse(JSON.stringify(project)) };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProjectAction(id) {
  await dbConnect();
  try {
    await Project.findByIdAndDelete(id);
    revalidatePath("/projects");
    revalidatePath("/dashboard/projects");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: error.message };
  }
}

export async function incrementViewAction(id) {
  await dbConnect();
  try {
    await Project.findByIdAndUpdate(id, { $inc: { views: 1 } });
    revalidatePath("/projects");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
