import { motion, useReducedMotion } from "framer-motion";
import "./Testimonials.css";

const TESTIMONIALS = [
  {
    name: "Project Mentor",
    role: "Web Development Mentor",
    quote:
      "Haileyesus is learning fast and writes clean code. He builds projects step by step and pays attention to details.",
    context: "Feedback on small personal projects",
    avatarInitials: "PM",
  },
  {
    name: "Classmate / Collaborator",
    role: "Fellow Developer",
    quote:
      "Working on coding exercises and small apps together, Haileyesus always tries new ideas and learns quickly.",
    context: "Group coding projects and practice apps",
    avatarInitials: "CC",
  },
  {
    name: "Self Project Review",
    role: "Self-Evaluation",
    quote:
      "I have completed personal MERN and Next.js projects. They are simple but functional, and I learned a lot from each one.",
    context: "Personal learning projects",
    avatarInitials: "SP",
  },
];

export default function Testimonials() {
  const reduce = useReducedMotion();

  const sectionVariants = reduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.45 } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.15,
          },
        },
      };

  const cardVariants = reduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.35 } },
      }
    : {
        hidden: { opacity: 0, y: 18, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.45, ease: "easeOut" },
        },
      };

  return (
    <motion.section
      id="testimonials"
      className="testimonials"
      aria-labelledby="testimonials-title"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="testimonials-aurora" aria-hidden="true" />

      <div className="testimonials-inner">
        {/* Header */}
        <motion.header className="testimonials-header" variants={cardVariants}>
          <p className="testimonials-eyebrow">People who gave feedback</p>
          <h2 className="testimonials-title" id="testimonials-title">
            What others say about{" "}
            <span className="testimonials-gradient-text">my coding projects</span>
          </h2>
          <p className="testimonials-lead">
            Feedback from mentors, classmates, and my own project reviews about the work I have done in learning and building apps.
          </p>
        </motion.header>

        {/* Cards */}
        <motion.div
          className="testimonials-grid"
          variants={sectionVariants}
          aria-label="Testimonials"
        >
          {TESTIMONIALS.map((t, index) => (
            <motion.article
              key={t.name + t.role}
              className="testimonial-card"
              variants={cardVariants}
              whileHover={
                reduce
                  ? {}
                  : {
                      y: -6,
                      scale: 1.02,
                      transition: {
                        type: "spring",
                        stiffness: 230,
                        damping: 18,
                      },
                    }
              }
              whileTap={reduce ? {} : { scale: 0.99 }}
            >
              <div className="testimonial-glow" aria-hidden="true" />
              <span className="testimonial-border" aria-hidden="true" />

              <header className="testimonial-head">
                <div className="testimonial-avatar">
                  <span>{t.avatarInitials}</span>
                </div>
                <div className="testimonial-meta">
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-role">{t.role}</p>
                </div>
              </header>

              <p className="testimonial-quote">
                <span className="quote-mark" aria-hidden="true">
                  “
                </span>
                {t.quote}
                <span className="quote-mark closing" aria-hidden="true">
                  ”
                </span>
              </p>

              <p className="testimonial-context">{t.context}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
