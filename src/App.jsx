 import React from 'react'
 import Navbar from "./components/Navbar";
import NovaHero from "./sections/NovaHero";
import './App.css'
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
       <NovaHero />
 <About /> 
 <Projects/>
 <Skills/>
 <Contact/>
 <Footer/>
    </div>
  );
}
export default App
