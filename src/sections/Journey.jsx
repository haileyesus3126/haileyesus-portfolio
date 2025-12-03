import { motion, useReducedMotion } from "framer-motion";
import "./Journey.css";

const MILESTONES = [
  {
    period: "2022",
    title: "Started Learning Web",
    body: "I began learning HTML, CSS, and JavaScript. I made small projects to practice.",
  },
  {
    period: "2023",
    title: "MERN Stack",
    body: "I built full MERN apps. I learned about clean code, login systems, APIs, and dashboards.",
  },
  {
    period: "2024",
    title: "real Projects ",
    body: "I worked on real e-commerce project.",
  },
  {
    period: "2025",
    title: "Next.js ",
    body: "Focused on Next.js, Framer Motion.",
  },
  {
    period: "Now",
    title: "Building Modern, Production-Ready Apps",
    body: "Working on dashboards, e-commerce and SaaS ideas.",
  },
];

export default function Journey() {
  const reduce = useReducedMotion();

  const sectionVariants = reduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.45 } },
      }
    : {
        hidden: { opacity: 0, y: 30 },
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

  const itemVariants = reduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.35 } },
      }
    : {
        hidden: { opacity: 0, y: 20, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.45, ease: "easeOut" },
        },
      };

  return (
    <motion.section
      id="journey"
      className="journey"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
      aria-labelledby="journey-title"
    >
      <div className="journey-aurora" aria-hidden="true" />

      <div className="journey-inner">
        {/* Header */}
        <motion.header className="journey-header" variants={itemVariants}>
          <p className="journey-eyebrow">My Journey</p>
          <h2 className="journey-title" id="journey-title">
            From my first code to{" "}
            <span className="journey-gradient-text">full-stack developer</span>
          </h2>
          <p className="journey-lead">
            Every step taught me something — from simple web pages to full apps,
            real clients, and real systems.
          </p>
        </motion.header>

        {/* Timeline */}
        <div className="journey-layout">
          <motion.ol
            className="journey-timeline"
            aria-label="Timeline of my development journey"
          >
            {MILESTONES.map((item, index) => (
              <motion.li
                key={item.period + item.title}
                className="journey-item"
                variants={itemVariants}
                whileHover={
                  reduce
                    ? {}
                    : {
                        y: -4,
                        scale: 1.01,
                        transition: {
                          type: "spring",
                          stiffness: 220,
                          damping: 18,
                        },
                      }
                }
              >
                <div className="journey-node">
                  <span className="journey-dot" aria-hidden="true" />
                  <span className="journey-line" aria-hidden="true" />
                </div>

                <div className="journey-card">
                  <div className="journey-period">{item.period}</div>
                  <h3 className="journey-item-title">{item.title}</h3>
                  <p className="journey-item-body">{item.body}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          {/* Side highlight box */}
          <motion.aside
            className="journey-side"
            variants={itemVariants}
            whileHover={
              reduce
                ? {}
                : {
                    y: -4,
                    scale: 1.01,
                    transition: { type: "spring", stiffness: 220, damping: 18 },
                  }
            }
          >
            <div className="journey-side-card">
              <h3>What this means today</h3>
              <p>
                I do not only know the code. I know how to take an idea, plan
                it, and build a full product with <strong>MERN</strong> and{" "}
                <strong>Next.js</strong>.
              </p>
              <ul className="journey-points">
                <li>Real projects for real people</li>
                <li>Clean and easy-to-read code</li>
                <li>Good performance and user experience</li>
              </ul>
              <p className="journey-footnote">
                I am ready to help with your next project.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </motion.section>
  );
}
