import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "Rakib Hossain | MERN Stack Developer",
  description: "Personal portfolio of a MERN stack developer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
