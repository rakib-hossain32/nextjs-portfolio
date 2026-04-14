import Hero from "@/components/Hero/Hero";
import ProjectsPage from "./projects/ProjectsClient";
import About from "./about/AboutClient";
import Contact from "./contact/ContactClient";
import EducationPage from "@/components/Education/Education";
import ServicesPage from "@/components/Services/services";
import Testimonials from "@/components/Testimonials/page";
import FadeIn from "@/components/Animations/FadeIn";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <FadeIn direction="up" delay={0.2}>
        <About />
      </FadeIn>

      <FadeIn direction="up">
        <ProjectsPage />
      </FadeIn>
      
      <FadeIn direction="up">
        <ServicesPage />
      </FadeIn>

      <FadeIn direction="up">
        <EducationPage />
      </FadeIn>


      <FadeIn direction="up">
        <Testimonials />
      </FadeIn>

      <FadeIn direction="up">
        <Contact />
      </FadeIn>
    </main>
  );
}
