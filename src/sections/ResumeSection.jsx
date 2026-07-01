import "./ResumeSection.css";

export default function ResumeSection() {
  return (
    <section className="resumeSection">
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="resumeLink"
      >
        <i className="fa-solid fa-file-arrow-down"></i>

        <span>VIEW MY FULL RÉSUMÉ</span>
      </a>
    </section>
  );
}