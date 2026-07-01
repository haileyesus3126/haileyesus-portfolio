// src/pages/Home.jsx

import NovaHero from "../sections/NovaHero";
import About from "../sections/About";
import ResumeSection from "../sections/ResumeSection";
import Projects from "../sections/Projects";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <main>
      <section id="home">
        <NovaHero />
      </section>

      <section id="about">
        <About />
      </section>

      <ResumeSection />

      <section id="projects">
        <Projects />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}