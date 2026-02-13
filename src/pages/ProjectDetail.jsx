import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectBySlug } from "../data/projectsData";
import "./ProjectDetail.css";

const SECTION_LIST = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "features", label: "Key Features" },
  { id: "screens", label: "Screenshots" },
  { id: "architecture", label: "Architecture" },
  { id: "database", label: "Database Design" },
  { id: "rbac", label: "Auth & RBAC" },
  { id: "improvements", label: "Improvements" },
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  const [activeId, setActiveId] = useState("overview");
  const [lightbox, setLightbox] = useState(null);

  const doc = project?.doc || {};
  const gallery = project?.gallery || [];

  const hasLive = project?.live && project.live !== "#";
  const hasCode = project?.code && project.code !== "#";

  const sections = useMemo(() => SECTION_LIST, []);

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const observers = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(id);
          });
        },
        { rootMargin: "-25% 0px -65% 0px", threshold: 0.1 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!project) {
    return (
      <section className="cs">
        <div className="cs-wrap">
          <h1 className="cs-title">Project not found</h1>
          <p className="cs-muted">The URL is invalid or the project data is missing.</p>
          <Link className="cs-backlink" to="/">← Back to Home</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cs">
      <div className="cs-wrap">
        <div className="cs-top">
          <Link className="cs-backlink" to="/">← Back to Home</Link>

          <div className="cs-top-actions">
            {hasLive ? (
              <a className="cs-btn primary" href={project.live} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            ) : (
              <button className="cs-btn primary disabled" disabled>Live Demo</button>
            )}

            {hasCode ? (
              <a className="cs-btn ghost" href={project.code} target="_blank" rel="noreferrer">
                Source Code
              </a>
            ) : (
              <button className="cs-btn ghost disabled" disabled>Source Code</button>
            )}
          </div>
        </div>

        <header className="cs-hero" id="overview">
          <div className="cs-hero-left">
            <div className="cs-badge">Case Study</div>
            <h1 className="cs-title">{project.title}</h1>
            <p className="cs-sub">{project.desc}</p>

            {project.stack?.length ? (
              <div className="cs-tags">
                {project.stack.map((t) => (
                  <span key={t} className="cs-tag">{t}</span>
                ))}
              </div>
            ) : null}

            <div className="cs-kpis">
              <div className="cs-kpi">
                <div className="cs-kpi-label">Focus</div>
                <div className="cs-kpi-val">Architecture + RBAC</div>
              </div>
              <div className="cs-kpi">
                <div className="cs-kpi-label">Quality</div>
                <div className="cs-kpi-val">Production Mindset</div>
              </div>
               
            </div>
          </div>

          <div className="cs-hero-right">
            <div className="cs-media">
              <img src={project.image} alt={project.title} loading="lazy" />
            </div>
          </div>
        </header>

        <div className="cs-layout">
          <aside className="cs-side">
            <div className="cs-side-card">
              <div className="cs-side-title">Documentation</div>
              <nav className="cs-nav">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`cs-nav-link ${activeId === s.id ? "active" : ""}`}
                  >
                    {s.label}
                  </a>
                ))}
              </nav>

              <div className="cs-side-divider" />

              <div className="cs-mini">
                <div className="cs-mini-title">Highlights</div>
                <ul className="cs-mini-list">
                  {(doc.keyFeatures || []).slice(0, 5).map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <main className="cs-main">
            <section className="cs-card" id="problem">
              <h2 className="cs-h2">Problem</h2>
              <ul className="cs-list">
                {(doc.problem || []).map((x) => <li key={x}>{x}</li>)}
              </ul>
            </section>

            <section className="cs-card" id="solution">
              <h2 className="cs-h2">Solution</h2>
              <ul className="cs-list">
                {(doc.solution || []).map((x) => <li key={x}>{x}</li>)}
              </ul>
            </section>

            <section className="cs-card" id="features">
              <h2 className="cs-h2">Key Features</h2>
              <div className="cs-grid2">
                {(doc.keyFeatures || []).map((x) => (
                  <div key={x} className="cs-pill">
                    <span className="cs-pill-dot" />
                    <span>{x}</span>
                  </div>
                ))}
              </div>
            </section>

            {gallery.length > 0 && (
              <section className="cs-card" id="screens">
                <h2 className="cs-h2">Screenshots</h2>
                <p className="cs-muted">Click any screenshot to view it larger.</p>

                <div className="cs-gallery">
                  {gallery.map((img, i) => (
                    <button
                      key={img.src + i}
                      className="cs-shot"
                      onClick={() => setLightbox(img)}
                      aria-label={`Open screenshot: ${img.alt || "Project screenshot"}`}
                    >
                      <img src={img.src} alt={img.alt || project.title} loading="lazy" />
                      <span className="cs-shot-overlay" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </section>
            )}

            <section className="cs-card" id="architecture">
              <h2 className="cs-h2">Architecture</h2>
              <p className="cs-muted">{doc.architecture?.overview}</p>

              <div className="cs-arch">
                {(doc.architecture?.components || []).map((c) => (
                  <div key={c.name} className="cs-arch-row">
                    <div className="cs-arch-k">{c.name}</div>
                    <div className="cs-arch-v">{c.detail}</div>
                  </div>
                ))}
              </div>

              <div className="cs-subcard">
                <h3 className="cs-h3">Core Flows</h3>
                <ul className="cs-list">
                  {(doc.architecture?.flows || []).map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            </section>

            <section className="cs-card" id="database">
              <h2 className="cs-h2">Database Design</h2>

              <div className="cs-table">
                <div className="cs-table-head">
                  <div>Collection</div>
                  <div>Key Fields</div>
                </div>

                {(doc.database?.collections || []).map((c) => (
                  <div key={c.name} className="cs-table-row">
                    <div className="cs-td strong">{c.name}</div>
                    <div className="cs-td">{c.fields}</div>
                  </div>
                ))}
              </div>

              <div className="cs-subcard">
                <h3 className="cs-h3">Notes</h3>
                <ul className="cs-list">
                  {(doc.database?.notes || []).map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            </section>

            <section className="cs-card" id="rbac">
              <h2 className="cs-h2">Auth & RBAC</h2>

              <div className="cs-rbac">
                {(doc.rbac?.roles || []).map((r) => (
                  <div key={r.role} className="cs-rbac-row">
                    <div className="cs-rbac-role">{r.role}</div>
                    <div className="cs-rbac-access">{r.access}</div>
                  </div>
                ))}
              </div>

              <div className="cs-subcard">
                <h3 className="cs-h3">Guards</h3>
                <ul className="cs-list">
                  {(doc.rbac?.guards || []).map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            </section>

            <section className="cs-card" id="improvements">
              <h2 className="cs-h2">Improvements</h2>
              <ul className="cs-list">
                {(doc.improvements || []).map((x) => <li key={x}>{x}</li>)}
              </ul>
            </section>

            <div className="cs-footer">
              <Link className="cs-btn ghost" to="/#projects">← Back to Projects</Link>
              <Link className="cs-btn primary" to="/">Home</Link>
            </div>
          </main>
        </div>

        {lightbox && (
          <div
            className="cs-lightbox"
            role="dialog"
            aria-modal="true"
            onClick={() => setLightbox(null)}
          >
            <div className="cs-lightbox-inner" onClick={(e) => e.stopPropagation()}>
              <button className="cs-lightbox-close" onClick={() => setLightbox(null)}>
                ✕
              </button>
              <img src={lightbox.src} alt={lightbox.alt || project.title} />
              {lightbox.alt ? <p className="cs-lightbox-cap">{lightbox.alt}</p> : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
