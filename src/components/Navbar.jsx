// Navbar.jsx
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useTheme } from "../theme/ThemeProvider";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import "./Navbar.css";

// Magnetic button (desktop resume button)
const MagneticButton = ({ children, className, ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, left, top, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });
  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 160, damping: 16, mass: 0.12 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const menuBtnRef = useRef(null);
  const dialogRef = useRef(null);
  const firstLinkRef = useRef(null);

  const links = useMemo(
    () => [
      { id: "home", icon: "fa-solid fa-house", label: "Home" },
      { id: "about", icon: "fa-solid fa-user", label: "About" },
      { id: "projects", icon: "fa-solid fa-diagram-project", label: "Projects" },
      
      { id: "contact", icon: "fa-solid fa-envelope", label: "Contact" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handleChange = (e) => {
      if (!e.matches) setOpen(false);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    if (open) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    } else {
      document.body.style.overflow = originalOverflow || "";
      document.body.style.paddingRight = originalPaddingRight || "";
    }
    return () => {
      document.body.style.overflow = originalOverflow || "";
      document.body.style.paddingRight = originalPaddingRight || "";
    };
  }, [open]);

  useEffect(() => {
    const ids = links.map((l) => l.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0.1, 0.3, 0.5, 0.7],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [links]);

  const scrollToId = useCallback(
    (id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", `#${id}`);
    },
    [prefersReducedMotion]
  );

  const handleAnchorClick = useCallback(
    (e, id) => {
      e.preventDefault();
      setOpen(false);
      scrollToId(id);
    },
    [scrollToId]
  );

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtnRef.current?.focus();
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const toggleMenu = useCallback(() => {
    setOpen((v) => !v);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      role="navigation"
      aria-label="Primary"
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 130, damping: 18 }}
    >
      <div className="nav-backdrop" aria-hidden="true" />
      <div className="nav-pattern" aria-hidden="true" />

      <motion.a
        className="brand"
        href="#home"
        aria-label="Go to Home"
        onClick={(e) => handleAnchorClick(e, "home")}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="brand-tooltip" role="tooltip">
          Selam! እንኳን ደህና መጡ
        </span>
        <span className="brand-lockup">
          <span className="brand-text">ኃ/የሱስ</span>
          <span className="brand-sub">Haileyesus</span>
        </span>
        <span className="brand-accent" aria-hidden="true" />
      </motion.a>

      <ul className="nav-links">
        {links.map(({ id, icon, label }) => {
          const isActive = active === id;
          return (
            <motion.li key={id} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <a
                href={`#${id}`}
                className={`nav-link ${isActive ? "is-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => handleAnchorClick(e, id)}
              >
                <i className={icon} aria-hidden="true" />
                <span className="label">{label}</span>
                {isActive && (
                  <motion.div
                    className="active-pulse"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
              </a>
            </motion.li>
          );
        })}

        <motion.li className="desktop-only">
          <MagneticButton className="magnetic-wrap">
            <a
              href="/resume.pdf"
              className="btn resume-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume in a new tab"
            >
              <span className="btn-text">Resume</span>
              <span className="btn-shine" aria-hidden="true" />
            </a>
          </MagneticButton>
        </motion.li>

        <motion.li className="desktop-only">
          <button
            type="button"
            onClick={toggle}
            className="theme-toggle"
            aria-label="Toggle theme"
            aria-pressed={theme === "dark"}
          >
            <span className="theme-icon" aria-hidden="true">
              <i
                className={`fa-solid ${
                  theme === "light" ? "fa-sun" : "fa-moon"
                }`}
              />
            </span>
            <span className="theme-ring" aria-hidden="true" />
          </button>
        </motion.li>
      </ul>

      <motion.button
        type="button"
        ref={menuBtnRef}
        className={`menu-btn ${open ? "open" : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={toggleMenu}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              id="mobile-menu"
              ref={dialogRef}
              className="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              <div className="mobile-header">
                <h2 id="mobile-menu-title" className="mobile-title">
                  Navigation
                </h2>
                <motion.button
                  type="button"
                  className="mobile-close"
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Close menu"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true" />
                </motion.button>
              </div>

              <div className="mobile-links">
                {links.map(({ id, icon, label }, idx) => (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    className={`mobile-link ${
                      active === id ? "mobile-active" : ""
                    }`}
                    onClick={(e) => handleAnchorClick(e, id)}
                    ref={idx === 0 ? firstLinkRef : null}
                    initial={{ x: -18, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -12, opacity: 0 }}
                    transition={{ delay: idx * 0.06 }}
                  >
                    <i className={icon} aria-hidden="true" />
                    <span>{label}</span>
                    {active === id && (
                      <span className="mobile-active-indicator" />
                    )}
                  </motion.a>
                ))}

                <motion.a
                  href="/resume.pdf"
                  className="btn mobile-resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  initial={{ x: -18, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -12, opacity: 0 }}
                  transition={{ delay: links.length * 0.06 }}
                >
                  <i className="fa-solid fa-download" aria-hidden="true" />
                  Download Resume
                </motion.a>

                <motion.button
                  type="button"
                  onClick={toggle}
                  className="mobile-link theme-mobile"
                  initial={{ x: -18, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -12, opacity: 0 }}
                  transition={{ delay: (links.length + 1) * 0.06 }}
                  aria-label="Toggle theme"
                  aria-pressed={theme === "dark"}
                >
                  <i
                    className={`fa-solid ${
                      theme === "light" ? "fa-sun" : "fa-moon"
                    }`}
                    aria-hidden="true"
                  />
                  <span>{theme === "light" ? "Light" : "Dark"} Mode</span>
                </motion.button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
