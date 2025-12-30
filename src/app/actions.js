"use server";

import nodemailer from "nodemailer";

export async function sendEmail(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Validate inputs
  if (!name || !email || !message) {
    return { success: false, error: "Missing required fields" };
  }

  console.log("Debug: Checking Credentials...");
  console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
  console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Error: Credentials validation failed in Action.");
    return { success: false, error: "Server configuration error: Missing email credentials." };
  }

  // Create Transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Send Email
    await transporter.sendMail({
      from: `"${name}" <${email}>`, // Show sender's name
      to: "rakibulhasanmd678@gmail.com", // Your email
      replyTo: email, // Allow replying to the user
      subject: `Portfolio Contact: ${subject || "New Message"}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #22c55e;">New Project Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <h3>Message:</h3>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 8px;">${message}</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false, error: "Failed to send email. Please try again." };
  }
}
