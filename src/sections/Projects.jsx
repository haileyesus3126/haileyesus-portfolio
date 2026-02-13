import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Projects.css";
import { PROJECTS } from "../data/projectsData";

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="projects-aurora" aria-hidden="true" />
      <div className="projects-inner">
        <motion.header
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
          viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p className="eyebrow">Selected Work</p>
          <h2 className="projects-title" id="projects-title">Projects</h2>
          <p className="projects-lead">
            A focused set of real applications highlighting system design,
            clean architecture, and production-style workflows.
          </p>
          <div className="projects-divider" aria-hidden="true">
            <span className="line" />
            <span className="glow" />
          </div>
        </motion.header>

        <div className="projects-grid" aria-live="polite">
          {PROJECTS.map((p, idx) => {
            const hasLive = p.live && p.live !== "#";
            const hasCode = p.code && p.code !== "#";

            return (
              <motion.article
                key={p.slug + idx}
                className="project-card"
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.01 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                <Link to={`/projects/${p.slug}`} className="project-click" aria-label={`Open ${p.title} details`}>
                  <div className="project-thumb">
                    <img src={p.image} alt={p.title} loading="lazy" decoding="async" />
                    <span className="shine" aria-hidden="true" />
                  </div>

                  <div className="project-body">
                    <h3 className="project-name">{p.title}</h3>
                    <p className="project-desc">{p.desc}</p>
                  </div>
                </Link>

                <div className="project-actions">
                  {hasLive ? (
                    <a
                      className="btn primary"
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Live demo: ${p.title}`}
                    >
                      Live
                    </a>
                  ) : (
                    <button className="btn primary disabled" disabled>Live</button>
                  )}

                  {hasCode ? (
                    <a
                      className="btn ghost"
                      href={p.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Source code: ${p.title}`}
                    >
                      Code
                    </a>
                  ) : (
                    <button className="btn ghost disabled" disabled>Code</button>
                  )}
                </div>

                <span className="card-border" aria-hidden="true" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
