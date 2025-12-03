import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { useTheme } from "../theme/ThemeProvider";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
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

  // Single source of truth for section links
  const links = useMemo(
    () => [
      { id: "home", icon: "fa-solid fa-house", label: "Home" },
      { id: "about", icon: "fa-solid fa-user", label: "About" },
      { id: "projects", icon: "fa-solid fa-diagram-project", label: "Projects" },
      { id: "skills", icon: "fa-solid fa-gears", label: "Skills" },
      { id: "contact", icon: "fa-solid fa-envelope", label: "Contact" },
      

    ],
    []
  );

  // Scroll shadow / background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");

    const handleChange = (e) => {
      if (!e.matches) setOpen(false);
    };

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;

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

  // Highlight active section based on scroll (IntersectionObserver)
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    const ids = links.map((link) => link.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
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

      if (window.history.replaceState) {
        window.history.replaceState(null, "", `#${id}`);
      }
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

  // Focus trapping and Escape key for mobile dialog
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

  const closeAndGo = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      role="navigation"
      aria-label="Primary"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 130, damping: 18 }}
    >
      <div className="nav-backdrop" />

      {/* Brand */}
      <motion.a
        className="brand"
        href="#home"
        aria-label="Go to Home"
        onClick={(e) => handleAnchorClick(e, "home")}
        whileHover={{ scale: 1.08, rotate: 3 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="brand-text">ኃ/የሱስ</span>
        <div className="brand-glow" />
      </motion.a>

      {/* Desktop Links */}
      <ul className="nav-links">
        {links.map(({ id, icon, label }) => {
          const isActive = active === id;
          return (
            <motion.li
              key={id}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
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
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </motion.li>
          );
        })}

        {/* Resume Button */}
        <motion.li className="desktop-only">
          <MagneticButton>
            <a
              href="/resume.pdf"
              className="btn resume-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume in a new tab"
            >
              <span className="btn-text">Resume</span>
              <div className="btn-shine" />
            </a>
          </MagneticButton>
        </motion.li>

        {/* Theme Toggle (Desktop) */}
        <motion.li className="desktop-only">
          <button
            type="button"
            onClick={toggle}
            className="theme-toggle"
            aria-label="Toggle theme"
            aria-pressed={theme === "dark"}
          >
            <div className={`icon ${theme === "light" ? "light" : "dark"}`}>
              <i
                className={`fa-solid ${
                  theme === "light" ? "fa-sun" : "fa-moon"
                }`}
                aria-hidden="true"
              />
            </div>
            <div className="theme-glow" />
          </button>
        </motion.li>
      </ul>

      {/* Mobile Hamburger */}
      <motion.button
        type="button"
        ref={menuBtnRef}
        className={`menu-btn ${open ? "open" : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={toggleMenu}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
        <div className="menu-glow" />
      </motion.button>

      {/* Mobile Menu */}
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
              initial={{ scale: 0.92, opacity: 0, y: -30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: -30 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              <div className="mobile-header">
                <h2 id="mobile-menu-title" className="mobile-title">
                  Menu
                </h2>
                <motion.button
                  type="button"
                  className="mobile-close"
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
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
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    <i className={icon} aria-hidden="true" />
                    <span>{label}</span>
                    {active === id && (
                      <div className="mobile-active-indicator" />
                    )}
                  </motion.a>
                ))}

                <motion.a
                  href="/resume.pdf"
                  className="btn mobile-resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeAndGo}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ delay: links.length * 0.08 }}
                  aria-label="Download resume"
                >
                  <i className="fa-solid fa-download" aria-hidden="true" />{" "}
                  Download Resume
                </motion.a>

                {/* Theme Toggle (Mobile) */}
                <motion.button
                  type="button"
                  onClick={toggle}
                  className="mobile-link theme-mobile"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ delay: (links.length + 1) * 0.08 }}
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
