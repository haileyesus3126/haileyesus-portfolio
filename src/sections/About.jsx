import "./About.css";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

const STATS = [
  { number: 3, label: "Years Making Websites", suffix: "+" },
  { number: 15, label: "Projects Done", suffix: "+" },
  { number: 12, label: "Main Tools I Use", suffix: "+" },
];

// Smooth Counter with reduced-motion support
const SimpleCounter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    let start = 0;
    const duration = 2200;
    const frameDuration = 16;
    const increment = value / (duration / frameDuration);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [isInView, value, prefersReducedMotion]);

  return (
    <motion.span ref={ref} aria-live="polite">
      {count}
      {suffix}
    </motion.span>
  );
};

export default function About() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for floating orbs (soft, disabled on reduced motion)
  const y1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-80, 120]);

  const inView = useInView(sectionRef, { once: true, margin: "-150px" });

  const parallaxOrY = (motionValue) =>
    prefersReducedMotion ? undefined : motionValue;

  return (
    <section
      id="about"
      className="about"
      ref={sectionRef}
      aria-label="About me section"
    >
      {/* Background Effects with Parallax */}
      <motion.div
        className="background-animation"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="floating-shapes">
          <motion.div
            className="shape shape-1"
            style={{ y: parallaxOrY(y1) }}
          />
          <motion.div
            className="shape shape-2"
            style={{ y: parallaxOrY(y2) }}
          />
          <motion.div
            className="shape shape-3"
            style={{ y: parallaxOrY(y3) }}
          />
          <motion.div
            className="shape shape-4"
            style={{ y: parallaxOrY(y1) }}
          />
        </div>

        <div className="gradient-orbs">
          <motion.div
            className="orb orb-1"
            style={{ y: parallaxOrY(y2) }}
          />
          <motion.div
            className="orb orb-2"
            style={{ y: parallaxOrY(y3) }}
          />
          <motion.div
            className="orb orb-3"
            style={{ y: parallaxOrY(y1) }}
          />
        </div>
      </motion.div>

      <div className="about-container">
        {/* Header */}
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <motion.span
            className="section-label"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 140 }}
          >
            About Me
          </motion.span>

          <h2 className="about-title">
            I build websites{" "}
            <motion.span
              className="gradient-text inline-block"
              initial={
                prefersReducedMotion
                  ? {}
                  : { backgroundPosition: "0% 50%" }
              }
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      backgroundPosition: [
                        "0% 50%",
                        "100% 50%",
                        "0% 50%",
                      ],
                    }
              }
              transition={
                prefersReducedMotion
                  ? {}
                  : { duration: 8, repeat: Infinity, ease: "linear" }
              }
            >
             good and work fast.
            </motion.span>
          </h2>

          <motion.p
            className="about-description"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            I&apos;a full-stack JavaScript developer using MERN and Next.js.I focus on making websites easy to use, fast, and simple to maintain. 
            I like writing clean code and creating websites that people enjoy using.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={
                inView
                  ? { opacity: 1, scale: 1, y: 0 }
                  : {}
              }
              transition={{
                delay: 0.3 + i * 0.18,
                type: "spring",
                stiffness: 120,
                damping: 16,
              }}
              whileHover={{ scale: 1.06, y: -10 }}
            >
              <div className="stat-content">
                <h3 className="stat-number">
                  <SimpleCounter
                    value={stat.number}
                    suffix={stat.suffix}
                  />
                </h3>
                <p className="stat-label">{stat.label}</p>
              </div>
              <div className="stat-glow" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="cta-section"
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          whileHover={{
            boxShadow: "0 30px 60px rgba(0, 212, 255, 0.25)",
            transition: { duration: 0.4 },
          }}
        >
          <motion.p
            className="cta-text"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    backgroundPosition: [
                      "0% 50%",
                      "100% 50%",
                      "0% 50%",
                    ],
                  }
            }
            transition={
              prefersReducedMotion
                ? {}
                : { duration: 10, repeat: Infinity, ease: "linear" }
            }
          >
            Let&apos;s make something great together!
          </motion.p>

          <div className="cta-buttons">
            <motion.a
              href="#projects"
              className="btn btn-primary about-btn-primary"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              See My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="btn btn-secondary about-btn-secondary"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Project
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
