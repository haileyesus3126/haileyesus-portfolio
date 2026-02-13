// src/pages/Home.jsx
import React from "react";

import NovaHero from "../sections/NovaHero";
import About from "../sections/About";
import Projects from "../sections/Projects";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <NovaHero />
      <About />
      <Projects />
      <Contact />
    </>
  );
}
