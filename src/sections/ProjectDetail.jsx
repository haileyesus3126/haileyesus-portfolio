import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProjectDetail.css";

// ✅ IMPORTANT: import your PROJECTS from one place
// Best: move PROJECTS into its own file (example below).
import { PROJECTS } from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();

  const project = useMemo(
    () => PROJECTS.find((p) => p.slug === slug),
    [slug]
  );

  if (!project) {
    return (
      <section className="project-detail">
        <h1>Project not found</h1>
        <p>The project link may be wrong or removed.</p>
        <Link to="/" className="btn primary">Back Home</Link>
      </section>
    );
  }

  const hasLive = project.live && project.live !== "#";
  const hasCode = project.code && project.code !== "#";

  return (
    <section className="project-detail">
      <div className="project-detail-inner">
        <Link to="/" className="back-link">← Back to Home</Link>

        <header className="pd-header">
          <h1 className="pd-title">{project.title}</h1>
          <p className="pd-desc">{project.desc}</p>

          <div className="pd-actions">
            {hasLive ? (
              <a className="btn primary" href={project.live} target="_blank" rel="noreferrer">
                Live
              </a>
            ) : (
              <button className="btn primary disabled" disabled>Live</button>
            )}

            {hasCode ? (
              <a className="btn ghost" href={project.code} target="_blank" rel="noreferrer">
                Code
              </a>
            ) : (
              <button className="btn ghost disabled" disabled>Code</button>
            )}
          </div>
        </header>

        <div className="pd-hero">
          <img src={project.image} alt={project.title} />
        </div>

        {project.overview && (
          <section className="pd-section">
            <h2>Overview</h2>
            <p>{project.overview}</p>
          </section>
        )}

        {project.features?.length > 0 && (
          <section className="pd-section">
            <h2>Key Features</h2>
            <ul>
              {project.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </section>
        )}

        {project.screenshots?.length > 0 && (
          <section className="pd-section">
            <h2>Screenshots</h2>
            <div className="pd-shots">
              {project.screenshots.map((img, i) => (
                <img key={i} src={img} alt={`${project.title} screenshot ${i + 1}`} />
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
