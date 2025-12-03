import { motion, useReducedMotion } from "framer-motion";
import "./CallToAction.css";

export default function CallToAction() {
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
          },
        },
      };

  return (
    <motion.section
      className="cta-strip"
      aria-label="Work together call to action"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={sectionVariants}
    >
      <div className="cta-aurora" aria-hidden="true" />

      <div className="cta-inner">
        <div className="cta-main">
          <p className="cta-eyebrow">Let’s make your idea real</p>
          <h2 className="cta-title">
            Ready to turn your{" "}
            <span className="cta-gradient-text">
              idea into a working web app?
            </span>
          </h2>
          <p className="cta-text">
            I help teams and businesses take an idea and turn it into a fully
            working web app with clean code, modern design, and fast
            performance.
          </p>

          <div className="cta-actions">
            <motion.a
              href="#contact"
              className="btn primary cta-btn"
              whileHover={
                reduce
                  ? {}
                  : {
                      y: -2,
                      scale: 1.03,
                      boxShadow: "0 14px 30px rgba(76,201,240,.45)",
                    }
              }
              whileTap={reduce ? {} : { scale: 0.97, y: 0 }}
            >
              Work with me
            </motion.a>

            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn ghost cta-btn"
              whileHover={
                reduce
                  ? {}
                  : {
                      y: -2,
                      scale: 1.02,
                    }
              }
              whileTap={reduce ? {} : { scale: 0.97, y: 0 }}
            >
              Download my resume
            </motion.a>
          </div>
        </div>

        <div className="cta-side">
          <div className="cta-pill">
            <span className="cta-dot" aria-hidden="true" />
            <div>
              <p className="pill-label">Typical stack</p>
              <p className="pill-value">MERN · Next.js · Stripe · APIs</p>
            </div>
          </div>

          <div className="cta-pill">
            <span className="cta-dot" aria-hidden="true" />
            <div>
              <p className="pill-label">What you get</p>
              <p className="pill-value">
                Clear communication, clean code, and a live web app.
              </p>
            </div>
          </div>

          <p className="cta-note">
            Send me a short message about your project even if it’s just an
            idea. I’ll help you figure out the best way to build it.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
