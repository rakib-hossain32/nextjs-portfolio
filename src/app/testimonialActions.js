"use server";

import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { revalidatePath } from "next/cache";

// Add a new testimonial (from user frontend)
export async function addTestimonialAction(data) {
  await dbConnect();
  try {
    const testimonial = await Testimonial.create(data);
    revalidatePath("/testimonials");
    revalidatePath("/dashboard/testimonials");
    return { success: true, testimonial: JSON.parse(JSON.stringify(testimonial)) };
  } catch (error) {
    console.error("Add Testimonial Error:", error);
    return { success: false, error: error.message };
  }
}

// Get only approved testimonials for the frontend
export async function getApprovedTestimonialsAction() {
  await dbConnect();
  try {
    const testimonials = await Testimonial.find({ isApproved: true }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(testimonials));
  } catch (error) {
    console.error("Fetch Approved Testimonials Error:", error);
    return [];
  }
}

// Get all testimonials for the admin dashboard
export async function getAllTestimonialsAction() {
  await dbConnect();
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(testimonials));
  } catch (error) {
    console.error("Fetch All Testimonials Error:", error);
    return [];
  }
}

// Approve or reject a testimonial
export async function updateTestimonialStatusAction(id, isApproved) {
  await dbConnect();
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(id, { isApproved }, { new: true });
    revalidatePath("/testimonials");
    revalidatePath("/dashboard/testimonials");
    return { success: true, testimonial: JSON.parse(JSON.stringify(testimonial)) };
  } catch (error) {
    console.error("Update Testimonial Status Error:", error);
    return { success: false, error: error.message };
  }
}

// Delete a testimonial
export async function deleteTestimonialAction(id) {
  await dbConnect();
  try {
    await Testimonial.findByIdAndDelete(id);
    revalidatePath("/testimonials");
    revalidatePath("/dashboard/testimonials");
    return { success: true };
  } catch (error) {
    console.error("Delete Testimonial Error:", error);
    return { success: false, error: error.message };
  }
}
