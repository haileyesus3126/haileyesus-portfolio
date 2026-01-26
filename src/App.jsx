import React from "react";

// COMPONENTS
import Navbar from "./components/Navbar";
import NovaHero from "./sections/NovaHero";
import About from "./sections/About";
import Services from "./sections/Services";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Testimonials from "./sections/Testimonials";
import Process from "./sections/Process";
import Journey from "./sections/Journey";
import CallToAction from "./sections/CallToAction";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";


function App() {
  return (
    <>
      <Navbar />
      <NovaHero />

      <About />
      
      
      <Projects />
      
      
       
      <Contact />
      <BackToTop />
      <Footer />
    </>
  );
}

export default App;
