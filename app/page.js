import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { FeaturedProjects } from "@/components/projects/featured-projects";
import { MoreProjects } from "@/components/projects/more-projects";
import { GridField } from "@/components/grid-field";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <section id="projects" className="relative overflow-hidden px-6 py-20">
        <GridField anchor="15% 70%" />
        <div className="relative mx-auto max-w-6xl">
          <FeaturedProjects />
          <MoreProjects />
        </div>
      </section>
      <Contact />
    </main>
  );
}
