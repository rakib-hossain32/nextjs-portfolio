import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";

import Preloader from "@/components/Preloader/Preloader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://rakibhossain.com'), // Replace with actual domain
  title: {
    default: "Rakib Hossain | MERN Stack Developer",
    template: "%s | Rakib Hossain"
  },
  description: "Portfolio of Rakib Hossain, a MERN Stack Developer specializing in building modern web applications.",
  keywords: ["MERN Stack", "Web Developer", "React", "Next.js", "Portfolio", "Rakib Hossain"],
  authors: [{ name: "Rakib Hossain" }],
  creator: "Rakib Hossain",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rakibhossain.com",
    siteName: "Rakib Hossain Portfolio",
    title: "Rakib Hossain | MERN Stack Developer",
    description: "Professional portfolio of Rakib Hossain, showcasing projects and skills in MERN stack development.",
    images: [
      {
        url: "/og-image.jpg", // Needs to be added to public
        width: 1200,
        height: 630,
        alt: "Rakib Hossain Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakib Hossain | MERN Stack Developer",
    description: "MERN Stack Developer portfolio. Check out my latest projects and skills.",
    creator: "@rakibhossain", // Update with actual handle if known
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: 'black',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Preloader />
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen flex flex-col">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
