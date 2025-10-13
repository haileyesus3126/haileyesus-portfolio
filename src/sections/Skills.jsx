import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import "./Skills.css";

const SKILLS = {
  Frontend: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Framer Motion"],
  Backend: ["Node.js", "Express.js", "REST APIs", "Auth (JWT)", "Stripe", "Socket.io"],
  Database: ["MongoDB", "Mysql"],
  "Tools & Platforms": ["Git", "GitHub", "VS Code", "Postman", "Vercel"],
};

export default function Skills() {
  const reduce = useReducedMotion();

  // reveal-on-scroll (kept lightweight)
  useEffect(() => {
    const els = document.querySelectorAll(".sk-reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // 3D tilt (disabled for reduced motion)
  const onTilt = (e) => {
    if (reduce) return;
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    card.style.setProperty("--rx", `${(py * 4).toFixed(2)}deg`);
    card.style.setProperty("--ry", `${(-px * 4).toFixed(2)}deg`);
  };
  const resetTilt = (e) => {
    const c = e.currentTarget;
    c.style.setProperty("--rx", `0deg`);
    c.style.setProperty("--ry", `0deg`);
  };

  return (
    <section id="skills" className="skills" aria-label="Skills">
      <div
        className="skills-inner"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - r.left;
          const y = e.clientY - r.top;
          e.currentTarget.style.setProperty("--spot-x", `${x}px`);
          e.currentTarget.style.setProperty("--spot-y", `${y}px`);
        }}
      >
        <h2 className="skills-title">Skills</h2>
        <p className="skills-lead">
          A practical toolkit for building <strong>MERN</strong> and{" "}
          <strong>Next.js</strong> applications — from modern UIs to secure APIs and deploys.
        </p>

        <div className="skills-grid" role="list" aria-label="Skill categories">
          {Object.entries(SKILLS).map(([category, items], i) => (
            <article
              key={category}
              className="skills-card sk-reveal"
              style={{ "--i": i }}
              onMouseMove={onTilt}
              onMouseLeave={resetTilt}
              role="listitem"
              aria-label={`${category} skills`}
            >
              <header className="skills-head">
                <h3>{category}</h3>
                <span className="pulse" aria-hidden="true" />
              </header>

              <ul className="skills-list">
                {items.map((skill) => (
                  <li key={skill} className="chip" title={skill}>
                    <span className="dot" aria-hidden="true" />
                    {skill}
                  </li>
                ))}
              </ul>

              <span className="card-border" aria-hidden="true" />
            </article>
          ))}
        </div>

        {/* toolbelt marquee */}
        <div className="skills-marquee" aria-hidden="true">
          <div className="track">
            <span>
              HTML • CSS • JavaScript • React • Next.js • Node • Express • MongoDB • Mysql • JWT •
              Stripe • Socket.io • Git • GitHub • Vercel • Postman • REST APIs •
            </span>
            <span>
              HTML • CSS • JavaScript • React • Next.js • Node • Express • MongoDB • Mysql • JWT •
              Stripe • Socket.io • Git • GitHub • Vercel • Postman • REST APIs •
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
