// src/sections/About.jsx
import "./About.css";
import { motion, useReducedMotion } from "framer-motion";

const STATS = [
  { num: "3+", label: "Years Coding" },
  { num: "7+", label: "Real Projects" },
  { num: "10+", label: "Tech Stack" },
];

const HIGHLIGHTS = [
  {
    title: "Frontend",
    text: "React & Next.js apps with clean UX, responsive layouts, and accessible components.",
    tags: ["React", "Next.js", "CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    text: "Fast, secure APIs with Node.js & Express, authentication, and role-based access.",
    tags: ["Node.js", "Express", "JWT", "REST APIs"],
  },
  {
    title: "Data & Deploy",
    text: "MongoDB modeling, optimization, and modern CI/CD with Vercel.",
    tags: ["MongoDB", "Mysql", "Vercel", "GitHub"],
  },
];

const STACK = [
  "HTML", "CSS", "JavaScript", "React", "Next.js",
  "Node.js", "Express", "MongoDB", "Mongoose",
  "REST APIs", "Vercel", "Git", "Postman",
];

const parent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const itemIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      {/* Soft animated background */}
      <div className="about-aurora" aria-hidden="true" />

      <div className="about-inner">
        {/* Headline block */}
        <header className="about-head">
          <p className="eyebrow">About Me</p>
          <h2 className="about-title" id="about-title">
            Building <span className="grad">fast, scalable</span> products with{" "}
            <span className="grad alt">MERN &amp; Next.js</span>
          </h2>
          <p className="about-lead">
            I’m <strong>Haileyesus</strong>, a <strong>Full-Stack JavaScript Developer</strong> focused on
            delivering real business impact. I design modern UIs, craft reliable APIs, and ship production-ready apps
            using <strong>React</strong>, <strong>Next.js</strong>, <strong>Node.js</strong>, <strong>Express</strong>,
            and <strong>MongoDB</strong>. I care about clean architecture, performance, and developer experience.
          </p>

          {/* animated divider */}
          <div className="about-divider" aria-hidden="true">
            <span className="line" />
            <span className="glow" />
          </div>
        </header>

        {/* Stats */}
        <motion.ul
          className="about-stats"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reduce ? undefined : parent}
          aria-label="Key statistics"
        >
          {STATS.map((s) => (
            <motion.li
              key={s.label}
              className="stat"
              variants={reduce ? undefined : itemIn}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="num" aria-hidden="true">{s.num}</span>
              <span className="label">{s.label}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Highlights grid */}
        <motion.div
          className="about-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reduce ? undefined : parent}
          role="list"
          aria-label="Core capabilities"
        >
          {HIGHLIGHTS.map((card) => (
            <motion.article
              key={card.title}
              className="about-card"
              variants={reduce ? undefined : itemUp}
              transition={{ duration: 0.45, ease: "easeOut" }}
              role="listitem"
            >
              <h3 className="card-title">{card.title}</h3>
              <p className="card-text">{card.text}</p>
              <ul className="tags" aria-label={`${card.title} tags`}>
                {card.tags.map((t) => (
                  <li key={t} className="tag">{t}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>

        {/* Tech stack marquee */}
        <div className="stack-block" aria-label="Tech stack">
          <div className="stack-track">
            {[...STACK, ...STACK].map((t, i) => (
              <span key={`${t}-${i}`} className="stack-pill">{t}</span>
            ))}
          </div>
        </div>

       
      </div>
    </section>
  );
}
