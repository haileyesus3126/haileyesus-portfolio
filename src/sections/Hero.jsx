// src/sections/Hero.jsx
import "./Hero.css";

const Hero = () => {
  return (
    <header id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <p className="hero-tag">Full-Stack Developer (MERN & Next.js)</p>

          <h1 className="hero-title">
            Hi, I’m <span className="accent">Haileyesus Mesfin</span>.
          </h1>

          <p className="hero-sub">
            I build <strong>fast, scalable, and user-friendly web applications</strong> 
            using <strong>React, Next.js, Node.js</strong>, and <strong>MongoDB</strong>. 
            Passionate about <strong>clean code</strong>, <strong>performance</strong>, 
            and creating <strong>real-world solutions</strong>.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn primary" aria-label="View my projects">
              View Projects
            </a>
            <a href="#contact" className="btn ghost" aria-label="Contact me">
              Contact Me
            </a>
          </div>

          {/* Scroll indicator */}
          <a href="#about" className="scroll-indicator" aria-label="Scroll to About section">
            <span className="dot" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Hero;
