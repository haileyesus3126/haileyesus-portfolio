import { motion, useReducedMotion } from "framer-motion";
import "./Process.css";

const STEPS = [
  {
    label: "Step 01",
    title: "Understand & Plan",
    icon: "💡",
    summary:
      "We start by talking about your idea so I know what you need and what the project should do.",
    details: [
      "Short call or chat about the project",
      "Write down the main features",
      "Choose simple tools and a basic timeline",
    ],
  },
  {
    label: "Step 02",
    title: "Design & Build",
    icon: "⚙️",
    summary:
      "I design the pages and start building the app, step by step, using clean and simple code.",
    details: [
      "Responsive pages with React / Next.js",
      "APIs and database with Node, Express, MongoDB",
      "Share updates often so you can see the progress",
    ],
  },
  {
    label: "Step 03",
    title: "Launch & Improve",
    icon: "🚀",
    summary:
      "We put the app online and make small improvements based on how people use it.",
    details: [
      "Deploy to Vercel or another host",
      "Basic checks after launch",
      "Add small new features when needed",
    ],
  },
];


export default function Process() {
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
      id="process"
      className="process"
      aria-labelledby="process-title"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="process-aurora" aria-hidden="true" />

      <div className="process-inner">
        {/* Header */}
        <motion.header className="process-header" variants={cardVariants}>
          <p className="process-eyebrow">How I work</p>
          <h2 className="process-title" id="process-title">
             A simple process for{" "}
            <span className="process-gradient-text">building real projects</span>
          </h2>
          <p className="process-lead">
             As a developer, I follow a clear and easy process from idea to launch.
  This helps you always know what I am doing and what comes next.
          </p>
        </motion.header>

        {/* Steps */}
        <motion.ol
          className="process-grid"
          variants={sectionVariants}
          aria-label="Project workflow steps"
        >
          {STEPS.map((step, index) => (
            <motion.li
              key={step.title}
              className="process-card"
              variants={cardVariants}
              whileHover={
                reduce
                  ? {}
                  : {
                      y: -6,
                      scale: 1.02,
                      rotateX: 1.5,
                      rotateY: -1.5,
                      transition: {
                        type: "spring",
                        stiffness: 230,
                        damping: 18,
                      },
                    }
              }
              whileTap={reduce ? {} : { scale: 0.99 }}
            >
              <div className="process-glow" aria-hidden="true" />
              <span className="process-border" aria-hidden="true" />

              <header className="process-head">
                <div className="process-icon-wrap" aria-hidden="true">
                  <span className="process-icon">{step.icon}</span>
                </div>
                <div className="process-meta">
                  <p className="process-step">{step.label}</p>
                  <h3 className="process-name">{step.title}</h3>
                </div>
              </header>

              <p className="process-summary">{step.summary}</p>

              <ul className="process-list">
                {step.details.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="process-footer">
                <span className="process-index">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </motion.section>
  );
}
