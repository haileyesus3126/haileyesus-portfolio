import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import "./NovaHero.css";
import myphoto from "../assets/myphoto.jpg";

const ROLES = ["Full-Stack Developer"];

const MARQUEE_TEXT =
  "HTML • CSS • JavaScript • React • Next.js • Node • Express • MongoDB • REST APIs • Vercel •";

// Accessible typewriter
function useTypewriter(
  words,
  { pause = 1200, typingSpeed = 60, deletingSpeed = 35, enabled = true } = {}
) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
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
        t = next === full ? setTimeout(() => setDel(true), pause) : setTimeout(step, speed);
      } else {
        const next = full.slice(0, txt.length - 1);
        setTxt(next);
        if (!next.length) {
          setDel(false);
          setI((v) => (v + 1) % words.length);
        } else t = setTimeout(step, speed);
      }
    };
    t = setTimeout(step, speed);
    return () => clearTimeout(t);
  }, [txt, del, i, words, pause, typingSpeed, deletingSpeed, enabled]);

  return txt;
}

export default function NovaHero() {
  const prefersReducedMotion = useReducedMotion();
  const typed = useTypewriter(ROLES, { enabled: !prefersReducedMotion });

  // Canvas constellation
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let w, h, rafId;
    let particles = [];
    const MAX_PARTICLES = 90;
    const LINK_DIST = 140;
    const MOUSE_FORCE = 85;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
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
      particles = Array.from({ length: MAX_PARTICLES }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.3, 0.3),
        vy: rand(-0.3, 0.3),
        r: rand(1.2, 2.4),
      }));
    };

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;

      const host = wrapperRef.current;
      if (host) {
        host.style.setProperty("--spot-x", `${mouse.x}px`);
        host.style.setProperty("--spot-y", `${mouse.y}px`);
      }
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const drawAurora = () => {
      const g = ctx.createRadialGradient(w * 0.7, h * 0.3, 50, w * 0.5, h * 0.4, Math.max(w, h));
      g.addColorStop(0, "rgba(76, 201, 240, 0.35)");
      g.addColorStop(0.4, "rgba(72, 149, 239, 0.25)");
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(w * 0.3, h * 0.7, 30, w * 0.5, h * 0.6, Math.max(w, h));
      g2.addColorStop(0, "rgba(100, 223, 223, 0.30)");
      g2.addColorStop(0.5, "rgba(72, 191, 227, 0.18)");
      g2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      drawAurora();

      // particles
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_FORCE * MOUSE_FORCE) {
          const d = Math.sqrt(d2) || 1;
          p.vx += (dx / d) * 0.25;
          p.vy += (dy / d) * 0.25;
        }
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.fill();
      }

      // links
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = 1 - dist / LINK_DIST;
            ctx.strokeStyle = `rgba(160, 220, 255, ${alpha * 0.45})`;
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

    const ro = new ResizeObserver(() => {
      resize();
      createParticles();
    });
    ro.observe(canvas.parentElement);

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    init();
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
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
        <div className="nova-text">
          <p className="kicker">Hi, I’m</p>

          <h1 className="name" aria-label="Haileyesus Mesfin">
            <span className="stroke">Haileyesus</span>
            <span className="stroke second">Mesfin</span>
          </h1>

          <p className="role" role="status" aria-live="polite">
            <span className="cursor">{typed}</span>
          </p>

          <p className="blurb">
            I build modern, fast, and accessible web applications with{" "}
            <strong>React</strong>, <strong>Next.js</strong>,{" "}
            <strong>Node.js</strong>, and <strong>MongoDB</strong>. I focus on
            clean code, performance, and real-world impact.
          </p>

          <div className="cta-row">
            <a href="#projects" className="btn primary" aria-label="View my projects">
              View Projects
            </a>
            <a href="#contact" className="btn ghost" aria-label="Contact me">
              Contact Me
            </a>
          </div>
        </div>

        {/* ANIMATED VISUAL WITH PHOTO */}
        <div className="nova-canvas-wrap" aria-hidden="true">
          <canvas ref={canvasRef} className="nova-canvas" />
          <img
            src={myphoto}
            alt="Haileyesus Mesfin — Full-Stack Developer"
            className="nova-photo"
            width="600"
            height="600"
            loading="eager"
            decoding="async"
          />
          <div className="nova-overlay" />
          <div className="halo" />
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee" aria-hidden="true">
        <div className="track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>{MARQUEE_TEXT}</span>
          ))}
        </div>
      </div>
    </header>
  );
}
