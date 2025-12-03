import { useReducedMotion, motion } from "framer-motion";
import "./Skills.css";

const SKILLS = {
  Frontend: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Framer Motion"],
  Backend: ["Node.js", "Express.js", "REST APIs", "Authentication (JWT)", "Stripe", "Socket.io"],
  Database: ["MongoDB", "MySQL"],
  "Tools & Platforms": ["Git", "GitHub", "VS Code", "Postman", "Vercel"],
};

export default function Skills() {
  const reduce = useReducedMotion();
  const totalSkills = Object.values(SKILLS).reduce(
    (sum, items) => sum + items.length,
    0
  );

  const containerVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
    : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut", staggerChildren: 0.12 } } };

  const cardVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.35 } } }
    : { hidden: { opacity: 0, y: 18, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } } };

  const handleSpotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    e.currentTarget.style.setProperty("--spot-x", `${x}px`);
    e.currentTarget.style.setProperty("--spot-y", `${y}px`);
  };

  const resetSpotlight = (e) => {
    e.currentTarget.style.removeProperty("--spot-x");
    e.currentTarget.style.removeProperty("--spot-y");
  };

  return (
    <motion.section
      id="skills"
      className="skills"
      aria-label="Skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="skills-aurora" aria-hidden="true" />

      <div className="skills-inner" onMouseMove={handleSpotlight} onMouseLeave={resetSpotlight}>
        {/* Header */}
        <motion.header
          className="skills-header"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="skills-header-top">
            <span className="skills-pill">Tech Stack</span>
            <span className="skills-meta">
              <span className="dot meta-dot" aria-hidden="true" />
              <span>{totalSkills} skills I’m learning and using</span>
            </span>
          </div>

          <div className="skills-title-row">
            <h2 className="skills-title">
              Skills <span className="skills-title-accent">/ MERN & Next.js</span>
            </h2>
          </div>

          <p className="skills-lead">
            These are the main tools I know as a junior full-stack developer.
            I use them to build simple web apps, from front-end pages to back-end APIs.
          </p>

          <div className="skills-divider" aria-hidden="true">
            <span className="line" />
            <span className="glow" />
          </div>
        </motion.header>

        {/* Skill Cards */}
        <motion.div className="skills-grid" role="list" aria-label="Skill categories" variants={containerVariants}>
          {Object.entries(SKILLS).map(([category, items], i) => (
            <motion.article
              key={category}
              className="skills-card"
              style={{ "--i": i }}
              role="listitem"
              aria-label={`${category} skills`}
              variants={cardVariants}
              whileHover={reduce ? {} : { y: -6, scale: 1.02, boxShadow: "0 22px 40px rgba(0,0,0,0.28)", transition: { type: "spring", stiffness: 220, damping: 18 } }}
              whileTap={reduce ? {} : { scale: 0.99 }}
            >
              <header className="skills-head">
                <div className="skills-label">
                  <span className="skills-icon" aria-hidden="true" />
                  <div className="skills-label-text">
                    <h3>{category}</h3>
                    <span className="skills-label-sub">
                      {category === "Tools & Platforms" ? "Tools I use in my workflow" : `Tools I use for ${category.toLowerCase()}`}
                    </span>
                  </div>
                </div>
                <span className="skills-count">{items.length} skills</span>
              </header>

              <ul className="skills-list">
                {items.map((skill) => (
                  <li key={skill} className="chip" title={skill}>
                    <span className="dot" aria-hidden="true" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>

              <span className="card-border" aria-hidden="true" />
            </motion.article>
          ))}
        </motion.div>

        {/* Toolbelt Marquee */}
        <div className="skills-marquee" aria-hidden="true">
          <div className="track">
            <span>
              HTML • CSS • JavaScript • React • Next.js • Node • Express • MongoDB • MySQL • JWT • Stripe • Socket.io • Git • GitHub • Vercel • Postman • REST APIs •
            </span>
            <span>
              HTML • CSS • JavaScript • React • Next.js • Node • Express • MongoDB • MySQL • JWT • Stripe • Socket.io • Git • GitHub • Vercel • Postman • REST APIs •
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
