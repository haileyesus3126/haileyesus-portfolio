import { useEffect, useMemo, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import "./NovaHero.css";

export default function NovaHero() {
  const prefersReducedMotion = useReducedMotion();

  // --- Mouse-driven parallax / 3D tilt ---
  const visualRef = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const mxSpring = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.2 });
  const mySpring = useSpring(my, { stiffness: 120, damping: 18, mass: 0.2 });

  // tilt range
  const rotateY = useTransform(mxSpring, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(mySpring, [-0.5, 0.5], [10, -10]);

  // inner parallax offsets
  const innerX = useTransform(mxSpring, [-0.5, 0.5], [-14, 14]);
  const innerY = useTransform(mySpring, [-0.5, 0.5], [-10, 10]);

  // glow follow
  const glowX = useTransform(mxSpring, [-0.5, 0.5], ["25%", "75%"]);
  const glowY = useTransform(mySpring, [-0.5, 0.5], ["30%", "70%"]);

  const onMouseMove = (e) => {
    if (prefersReducedMotion) return;
    if (!visualRef.current) return;

    const r = visualRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;   // 0..1
    const py = (e.clientY - r.top) / r.height;  // 0..1

    // normalize to -0.5..0.5
    mx.set(px - 0.5);
    my.set(py - 0.5);
  };

  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // --- Scroll-driven motion (reveal / depth) ---
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -28]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const visualY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -42]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 0.98]);

  const enter = useMemo(
    () => ({
      hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
      show: (d = 0) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: d },
      }),
    }),
    [prefersReducedMotion]
  );

  // Optional: respect reduced motion by resetting transforms
  useEffect(() => {
    if (!prefersReducedMotion) return;
    mx.set(0);
    my.set(0);
  }, [prefersReducedMotion, mx, my]);

  return (
    <header
      ref={heroRef}
      id="home"
      className="nova-hero"
      aria-label="Portfolio hero section"
    >
      <div className="nova-inner">
        {/* TEXT */}
        <motion.div className="nova-text" style={{ y: textY, opacity: textOpacity }}>
          <motion.p className="kicker" variants={enter} initial="hidden" animate="show" custom={0.05}>
            Selam, I&apos;m
          </motion.p>

          <motion.h1 className="name" aria-label="Haileyesus" variants={enter} initial="hidden" animate="show" custom={0.12}>
            <span className="stroke">Haileyesus.</span>
          </motion.h1>

          <motion.p className="role" variants={enter} initial="hidden" animate="show" custom={0.20}>
            But you can call me Haile
          </motion.p>

          <motion.p className="blurb" variants={enter} initial="hidden" animate="show" custom={0.28}>
            I make websites. I build them to look nice, work fast, and be easy for people to use. I like making things simple, clean, and fun for everyone.
          </motion.p>

          <motion.div className="cta-row" variants={enter} initial="hidden" animate="show" custom={0.36}>
            <a href="#projects" className="btn primary" aria-label="View selected work">
              <span className="btn-text">View My Work</span>
              <span className="btn-shine" aria-hidden="true" />
            </a>

            <a href="#contact" className="btn ghost" aria-label="Contact me">
              <span className="btn-text">Let&apos;s Work Together</span>
            </a>
          </motion.div>

          <motion.div className="mini-proof" aria-label="Quick highlights" variants={enter} initial="hidden" animate="show" custom={0.44}>
            <div className="proof-item">
              <span className="proof-dot green" aria-hidden="true" />
            </div>
            <div className="proof-item">
              <span className="proof-dot gold" aria-hidden="true" />
            </div>
            <div className="proof-item">
              <span className="proof-dot red" aria-hidden="true" />
            </div>
          </motion.div>
        </motion.div>

        {/* VISUAL (LIVE) */}
        <motion.div
          className="nova-visual"
          ref={visualRef}
          aria-hidden="true"
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{
            y: visualY,
            scale: visualScale,
          }}
        >
          {/* mouse-follow glow */}
          <motion.div
            className="visual-live-glow"
            style={{
              left: glowX,
              top: glowY,
            }}
            aria-hidden="true"
          />

          <div className="visual-bg-glow" />
          <div className="visual-tibeb" />

          {/* 3D tilt wrapper */}
          <motion.div
            className="visual-tilt"
            style={
              prefersReducedMotion
                ? undefined
                : {
                    rotateX,
                    rotateY,
                  }
            }
          >
            {/* floating layer */}
            <motion.div
              className="visual-float"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, -8, 0], rotateZ: [0, 0.6, 0] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 4.6, repeat: Infinity, ease: "easeInOut" }
              }
            >
              {/* inner parallax for depth */}
              <motion.div
                className="visual-depth"
                style={
                  prefersReducedMotion
                    ? undefined
                    : {
                        x: innerX,
                        y: innerY,
                      }
                }
              >
                {/* SVG Illustration */}
                <div className="illustration">
                  <svg
                    viewBox="0 0 820 820"
                    width="100%"
                    height="100%"
                    role="img"
                    aria-label="Developer standing and coding with passion"
                  >
                    <defs>
                      {/* ✅ If you already updated these to your resume colors earlier, keep them.
                          If not, you can update later in your SVG. */}
                      <radialGradient id="g1" cx="50%" cy="35%" r="70%">
                        <stop offset="0%" stopColor="rgba(242,201,76,0.22)" />
                        <stop offset="50%" stopColor="rgba(11,107,58,0.10)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                      </radialGradient>
                      <radialGradient id="g2" cx="60%" cy="70%" r="75%">
                        <stop offset="0%" stopColor="rgba(214,69,69,0.16)" />
                        <stop offset="60%" stopColor="rgba(107,74,43,0.10)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                      </radialGradient>
                      <linearGradient id="screenGlow" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="rgba(14, 146, 151, 0.35)" />
                        <stop offset="50%" stopColor="rgba(76, 195, 242, 0.3)" />
                        <stop offset="100%" stopColor="rgba(214,69,69,0.25)" />
                      </linearGradient>
                      <linearGradient id="desk" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="rgba(11,18,32,0.08)" />
                        <stop offset="100%" stopColor="rgba(11,18,32,0.03)" />
                      </linearGradient>
                    </defs>

                    <circle cx="420" cy="320" r="330" fill="url(#g1)" />
                    <circle cx="420" cy="520" r="320" fill="url(#g2)" />

                    <rect x="120" y="600" width="580" height="18" rx="9" fill="url(#desk)" />
                    <rect x="160" y="618" width="500" height="16" rx="8" fill="rgba(11,18,32,0.05)" />

                    <rect x="370" y="250" width="300" height="210" rx="18" fill="rgba(255,255,255,0.55)" stroke="rgba(11,18,32,0.10)" />
                    <rect x="388" y="268" width="264" height="160" rx="14" fill="rgba(7,10,16,0.75)" />
                    <rect x="388" y="268" width="264" height="160" rx="14" fill="url(#screenGlow)" opacity="0.7" />
                    <rect x="500" y="462" width="40" height="48" rx="10" fill="rgba(11,18,32,0.08)" />
                    <rect x="460" y="508" width="120" height="14" rx="7" fill="rgba(11,18,32,0.07)" />

                    <g opacity="0.95">
                      <rect x="406" y="292" width="140" height="10" rx="5" fill="rgba(255,255,255,0.70)" />
                      <rect x="406" y="314" width="200" height="10" rx="5" fill="rgba(255,255,255,0.55)" />
                      <rect x="406" y="336" width="170" height="10" rx="5" fill="rgba(255,255,255,0.62)" />
                      <rect x="406" y="358" width="220" height="10" rx="5" fill="rgba(255,255,255,0.48)" />
                      <rect x="406" y="380" width="150" height="10" rx="5" fill="rgba(255,255,255,0.60)" />
                    </g>

                    <rect x="170" y="470" width="250" height="145" rx="18" fill="rgba(255,255,255,0.55)" stroke="rgba(11,18,32,0.10)" />
                    <rect x="190" y="490" width="210" height="92" rx="14" fill="rgba(7,10,16,0.70)" />
                    <rect x="190" y="490" width="210" height="92" rx="14" fill="url(#screenGlow)" opacity="0.55" />
                    <rect x="170" y="605" width="250" height="16" rx="8" fill="rgba(11,18,32,0.07)" />

                    <circle cx="300" cy="330" r="46" fill="rgba(255,255,255,0.70)" stroke="rgba(11,18,32,0.10)" />
                    <path d="M270 330c10-30 48-42 70-16 0-30-25-48-50-48-26 0-46 16-50 44 10-8 18-4 30 20z" fill="rgba(11,18,32,0.14)"/>

                    <path
                      d="M250 400c10-24 30-36 50-36s42 12 52 36l18 60c6 18-4 34-22 34H254c-18 0-28-16-22-34l18-60z"
                      fill="rgba(255,255,255,0.62)"
                      stroke="rgba(11,18,32,0.10)"
                    />

                    <path
                      d="M250 430c-30 10-52 34-58 62-4 18 14 28 28 18 18-14 34-34 54-44"
                      fill="rgba(255,255,255,0.55)"
                      stroke="rgba(11,18,32,0.10)"
                    />
                    <path
                      d="M350 430c30 10 52 34 58 62 4 18-14 28-28 18-18-14-34-34-54-44"
                      fill="rgba(255,255,255,0.55)"
                      stroke="rgba(11,18,32,0.10)"
                    />

                    <path
                      d="M275 494l-26 150c-2 10 6 18 16 18h32c8 0 14-6 16-14l16-86 16 86c2 8 8 14 16 14h32c10 0 18-8 16-18l-26-150"
                      fill="rgba(255,255,255,0.56)"
                      stroke="rgba(11,18,32,0.10)"
                    />

                    <g opacity="0.6">
                      <path d="M560 210c26-14 52-16 78-4" stroke="rgba(211, 164, 23, 0.55)" strokeWidth="8" strokeLinecap="round"/>
                      <path d="M584 186c30-12 60-10 86 6" stroke="rgba(211, 164, 23, 0.55)" strokeWidth="7" strokeLinecap="round"/>
                      <path d="M542 236c22-12 46-12 70 0" stroke="rgba(211, 164, 23, 0.55)" strokeWidth="7" strokeLinecap="round"/>
                    </g>
                  </svg>
                </div>

                <div className="visual-caption">
                  <span className="cap-dot" aria-hidden="true" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="hero-divider" aria-hidden="true" />

      <div className="scroll-indicator" aria-hidden="true">
        <span>Scroll down</span>
        <div className="chevron" />
      </div>
    </header>
  );
}
