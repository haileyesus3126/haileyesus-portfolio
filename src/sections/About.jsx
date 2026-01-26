import React from "react";
import "./about.css";

// ✅ Use your real image (recommended)
import profileImg from "../assets/myphoto.jpg";

export default function AboutSection() {
  return (
    <section className="aboutWrap" id="about" aria-label="About section">
      {/* Top-left logo (keep or remove) */}
      

      <div className="aboutInner">
        {/* Left content */}
        <div className="aboutLeft">
          <h1 className="aboutTitle">ABOUT</h1>
          <div className="aboutRule" />

          <p className="aboutText">
            Selam, my name is <strong>Haileyesus</strong>. I’m a{" "}
            <strong>Web Developer</strong> focused on building modern, clean and
            fast websites. I work with <strong>React</strong>,{" "}
            <strong>Next.js</strong>, <strong>Node.js</strong> and{" "}
            <strong>MongoDB</strong>. I care about performance, good UI, and
            writing code that stays simple and easy to maintain.
          </p>

          <a
            className="aboutResume"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <span className="aboutResumeIcon" aria-hidden="true">
              ↓
            </span>
            <span>resume</span>
          </a>
        </div>

        {/* Right image */}
        <div className="aboutRight" aria-hidden="true">
          <div className="aboutPhotoCard">
            <img className="aboutPhoto" src={profileImg} alt="Haileyesus" />
          </div>
        </div>
      </div>
    </section>
  );
}
