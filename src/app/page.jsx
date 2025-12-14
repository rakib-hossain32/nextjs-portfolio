import Hero from "@/components/Hero/Hero";
import ProjectsPage from "./projects/page";
import About from "./about/page";
import Contact from "./contact/page";
import EducationPage from "@/components/Education/Education";
import ServicesPage from "@/components/Services/services";
import Testimonials from "@/components/Testimonials/page";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <ProjectsPage />
      <EducationPage />
      <ServicesPage />
      <Testimonials />
      <Contact />
    </main>
  );
}
