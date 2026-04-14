import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import Preloader from "@/components/Preloader/Preloader";

export default function MainLayout({ children }) {
  return (
    <>
      <Preloader />
      <SmoothScroll>
        <Navbar />
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
