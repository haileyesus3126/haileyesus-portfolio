import { useEffect, useRef, useState } from "react";
import { useReducedMotion, motion } from "framer-motion";
import "./NovaHero.css";
import myphoto from "../assets/myphoto.jpg";

const ROLES = [
  "Full-Stack JavaScript Developer",
  "React & Next.js Developer",
  "Problem Solver & Builder",
];

const MARQUEE_TEXT =
  "HTML • CSS • JavaScript • React • Next.js • Node • Express • MongoDB • REST APIs • Vercel •";

// Framer Motion variants (defined outside for performance)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 14 },
  },
};

// Enhanced typewriter with optional reduced motion
function useTypewriter(
  words,
  { pause = 1200, typingSpeed = 60, deletingSpeed = 35, enabled = true } = {}
) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    if (!enabled) {
      setTxt(words[i]);
      return;
    }

    let t;
    const full = words[i];
    const speed = del ? deletingSpeed : typingSpeed;

    const step = () => {
      if (!del) {
        const next = full.slice(0, txt.length + 1);
        setTxt(next);
        if (next === full) {
          t = setTimeout(() => setDel(true), pause);
        } else {
          t = setTimeout(step, speed);
        }
      } else {
        const next = full.slice(0, txt.length - 1);
        setTxt(next);
        if (!next.length) {
          setDel(false);
          setI((v) => (v + 1) % words.length);
        } else {
          t = setTimeout(step, speed);
        }
      }
    };

    t = setTimeout(step, speed);
    return () => clearTimeout(t);
  }, [txt, del, i, words, pause, typingSpeed, deletingSpeed, enabled]);

  return txt;
}

// Magnetic button component
const MagneticButton = ({ children, className, ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.08, y: middleY * 0.08 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default function NovaHero() {
  const prefersReducedMotion = useReducedMotion();
  const typed = useTypewriter(ROLES, { enabled: !prefersReducedMotion });

  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const textRef = useRef(null);

  // Enhanced constellation with interactive particles
  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let w, h, rafId;
    let particles = [];
    const MAX_PARTICLES = 90;
    const LINK_DIST = 140;
    const MOUSE_FORCE = 85;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      w = Math.floor(rect.width);
      h = Math.floor(rect.height);
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const rand = (a, b) => Math.random() * (b - a) + a;

    const createParticles = () => {
      particles = Array.from({ length: MAX_PARTICLES }, () => {
        const r = rand(1.2, 2.8);
        return {
          x: rand(0, w),
          y: rand(0, h),
          vx: rand(-0.3, 0.3),
          vy: rand(-0.3, 0.3),
          r,
          originalR: r,
          pulsePhase: Math.random() * Math.PI * 2,
        };
      });
    };

    const mouse = { x: -9999, y: -9999, active: false };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;

      const host = wrapperRef.current;
      if (host) {
        host.style.setProperty("--spot-x", `${mouse.x}px`);
        host.style.setProperty("--spot-y", `${mouse.y}px`);
      }
    };

    const onLeave = () => {
      mouse.active = false;
    };

    const drawAurora = () => {
      const time = Date.now() * 0.0005;

      const g1 = ctx.createRadialGradient(
        w * 0.7 + Math.cos(time) * 20,
        h * 0.3 + Math.sin(time) * 15,
        50,
        w * 0.5,
        h * 0.4,
        Math.max(w, h)
      );
      g1.addColorStop(0, "rgba(76, 201, 240, 0.4)");
      g1.addColorStop(0.4, "rgba(72, 149, 239, 0.3)");
      g1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(
        w * 0.3 + Math.sin(time) * 25,
        h * 0.7 + Math.cos(time * 0.7) * 20,
        30,
        w * 0.5,
        h * 0.6,
        Math.max(w, h)
      );
      g2.addColorStop(0, "rgba(100, 223, 223, 0.35)");
      g2.addColorStop(0.5, "rgba(72, 191, 227, 0.22)");
      g2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      drawAurora();

      const time = Date.now() * 0.002;

      // Particles
      for (const p of particles) {
        p.r = p.originalR * (1 + 0.3 * Math.sin(time + p.pulsePhase));

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;

        if (d2 < MOUSE_FORCE * MOUSE_FORCE) {
          const d = Math.sqrt(d2) || 1;
          const force = mouse.active ? 0.4 : 0.1;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
          p.r = p.originalR * 1.8;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30;
        if (p.y > h + 30) p.y = -30;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.fill();

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.r * 3
        );
        gradient.addColorStop(
          0,
          `rgba(100, 223, 223, ${0.4 * (p.r / p.originalR)})`
        );
        gradient.addColorStop(1, "rgba(100, 223, 223, 0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Links
      ctx.lineWidth = 1.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < LINK_DIST) {
            const alpha = 1 - dist / LINK_DIST;
            const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            gradient.addColorStop(
              0,
              `rgba(160, 220, 255, ${alpha * 0.6})`
            );
            gradient.addColorStop(
              1,
              `rgba(100, 223, 223, ${alpha * 0.4})`
            );

            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(step);
    };

    const init = () => {
      resize();
      createParticles();
      step();
    };

    const parent = canvas.parentElement;
    const ro =
      parent && "ResizeObserver" in window
        ? new ResizeObserver(() => {
            resize();
            createParticles();
          })
        : null;

    if (ro && parent) {
      ro.observe(parent);
    } else {
      resize();
      createParticles();
    }

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    init();

    return () => {
      cancelAnimationFrame(rafId);
      if (ro && parent) ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <header
      id="home"
      className="nova-hero"
      ref={wrapperRef}
      aria-label="Portfolio hero section"
      data-reduced={prefersReducedMotion ? "true" : "false"}
    >
      <div className="nova-inner">
        {/* TEXT */}
        <motion.div
          className="nova-text"
          ref={textRef}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.p className="kicker" variants={itemVariants}>
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            className="name"
            variants={itemVariants}
            aria-label="Haileyesus"
          >
            <span className="stroke">Haileyesus.</span>
           
          </motion.h1>

          <motion.p
            className="role"
            variants={itemVariants}
            role="status"
            aria-live="polite"
          >
            <span className="cursor">{typed}</span>
          </motion.p>

          <motion.p className="blurb" variants={itemVariants}>
            I&apos;m a full-stack developer.  I build web apps using
            <strong>React</strong>, <strong>Next.js</strong>,{" "}
            <strong>Node.js</strong>, and <strong>MongoDB</strong>.
             I make sure my apps are easy to use, well-organized, and solve real problems.
          </motion.p>

          <motion.div className="cta-row" variants={itemVariants}>
            <MagneticButton>
              <a
                href="#projects"
                className="btn primary"
                aria-label="View selected work"
              >
                <span className="btn-text">View My Work</span>
                <div className="btn-shine" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#contact"
                className="btn ghost"
                aria-label="Contact me"
              >
                <span className="btn-text">Let&apos;s Work Together</span>
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* VISUAL */}
        <motion.div
          className="nova-canvas-wrap"
          initial={{ scale: 0.9, opacity: 0, rotate: -3 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 50, delay: 0.5 }}
          whileHover={{
            scale: 1.02,
            transition: { type: "spring", stiffness: 350, damping: 18 },
          }}
        >
          <canvas ref={canvasRef} className="nova-canvas" />
          <img
            src={myphoto}
            alt="Haileyesus — Full-Stack Developer"
            className="nova-photo"
            width="6000"
            height="60000"
            loading="eager"
            decoding="async"
          />
          <div className="nova-overlay" />
          <div className="halo" />
          <div className="floating-elements">
            <div className="floating-element el-1">⚡</div>
            <div className="floating-element el-2">🚀</div>
            <div className="floating-element el-3">💻</div>
      

          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="marquee-wrapper" aria-hidden="true">
        <div className="marquee">
          <div className="track">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>{MARQUEE_TEXT}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <div className="chevron" />
      </div>
    </header>
  );
}
