import { motion, useReducedMotion } from "framer-motion";
import { PROJECTS } from "../data/projectsData";
import "./Projects.css";

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="projects" className="projects">
      <div className="projectsInner">
        <div className="projectsHeader">
          <h2>Some of My Work</h2>
          <div className="projectsRule" />
        </div>

        <div className="projectsList">
          {PROJECTS.map((project, index) => {
            const screenshots = project.screenshots || [];

            return (
              <motion.article
                key={project.slug}
                className={`projectShowcase ${index % 2 === 1 ? "reverse" : ""}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
                whileInView={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
              >
                <div className="projectImages">
                  <img
                    className="projectImg projectImgMain"
                    src={screenshots[0] || project.image}
                    alt={`${project.title} main screen`}
                  />

                  <img
                    className="projectImg projectImgSecond"
                    src={screenshots[1] || project.image}
                    alt={`${project.title} second screen`}
                  />

                  <img
                    className="projectImg projectImgThird"
                    src={screenshots[2] || project.image}
                    alt={`${project.title} third screen`}
                  />
                </div>

                <div className="projectContent">
                  <p className="projectCategory">{project.category}</p>

                  <h3>{project.title}</h3>

                  <p className="projectDesc">{project.desc}</p>

                  {project.longDesc && (
                    <p className="projectLongDesc">{project.longDesc}</p>
                  )}

                  <div className="projectTech">
                    {project.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  <div className="projectActions">
                    {project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="projectBtn"
                      >
                        Demo
                      </a>
                    )}

                    {project.code !== "#" && (
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noreferrer"
                        className="projectBtn"
                      >
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}