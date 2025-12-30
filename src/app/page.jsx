import Hero from "@/components/Hero/Hero";
import ProjectsPage from "./projects/ProjectsClient";
import About from "./about/AboutClient";
import Contact from "./contact/ContactClient";
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
