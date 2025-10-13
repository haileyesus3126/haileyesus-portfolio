import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useTheme } from "../theme/ThemeProvider";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { theme, toggle } = useTheme();

  const menuBtnRef = useRef(null);
  const dialogRef = useRef(null);
  const firstLinkRef = useRef(null);

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

  // Desktop resize -> close mobile menu
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const handleChange = (e) => { if (!e.matches) setOpen(false); };

    if (mq.addEventListener) mq.addEventListener("change", handleChange);
    else mq.addListener?.(handleChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handleChange);
      else mq.removeListener?.(handleChange);
    };
  }, []);

  // Prevent body scroll when mobile menu is open (and avoid layout shift)
  useEffect(() => {
    if (typeof document === "undefined") return;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    if (open) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
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

  // Scrollspy (intersection observer)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ids = ["home", "about", "projects", "skills", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, rootMargin: "-40% 0px -55% 0px", threshold: [0.2, 0.4, 0.6] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Smooth scroll for in-page links (respect reduced motion)
  const prefersReduced = typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const scrollToId = useCallback((id) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (!el) return;

    // Let CSS on sections set scroll-margin-top to account for fixed navbar height
    el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    // Update hash without immediate jump
    history.replaceState(null, "", `#${id}`);
  }, [prefersReduced]);

  const handleAnchorClick = useCallback((e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
    // return focus to the newly focused section for SRs (optional):
    // el.setAttribute('tabindex','-1'); el.focus(); then remove tabindex if needed.
  }, [scrollToId]);

  // Focus management for mobile dialog
  useEffect(() => {
    if (!open) return;
    // focus first link when opening
    firstLinkRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtnRef.current?.focus();
      }
      if (e.key === "Tab" && dialogRef.current) {
        // basic focus trap
        const focusables = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const toggleMenu = useCallback(() => setOpen((v) => !v), []);
  const closeAndGo = useCallback(() => setOpen(false), []);

  return (
    <nav className="navbar" role="navigation" aria-label="Primary">
      {/* Left: Brand */}
      <a className="brand" href="#home" aria-label="Go to Home" onClick={(e) => handleAnchorClick(e, "home")}>
        ኃ/የሱስ
      </a>

      {/* Center: Desktop links */}
      <ul className="nav-links" role="menubar">
        {links.map(({ id, icon, label }) => {
          const isActive = active === id;
          return (
            <li role="none" key={id}>
              <a
                role="menuitem"
                href={`#${id}`}
                className={`nav-link ${isActive ? "is-active" : ""}`}
                data-active={isActive || undefined}
                aria-current={isActive ? "page" : undefined}
                title={label}
                onClick={(e) => handleAnchorClick(e, id)}
              >
                <i className={icon} aria-hidden="true" />
                <span className="label">{label}</span>
              </a>
            </li>
          );
        })}
        <li role="none" className="desktop-only">
          <a
            role="menuitem"
            href="/resume.pdf"
            className="btn resume-btn"
            target="_blank"
            rel="noopener noreferrer"
            title="Open resume (PDF)"
          >
            Resume
          </a>
        </li>
      </ul>

      {/* Right: Theme toggle */}
      <button
        ref={menuBtnRef} // reused ref for return focus if needed
        className="theme-toggle"
        aria-label="Toggle theme"
        aria-pressed={theme === "dark"}
        onClick={toggle}
        title={theme === "dark" ? "Switch to light" : "Switch to dark"}
      >
        <span className={`icon ${theme}`} aria-hidden="true" />
      </button>

      {/* Hamburger (mobile) */}
      <button
        ref={menuBtnRef}
        className={`menu-btn ${open ? "open" : ""}`}
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={toggleMenu}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      {/* Mobile drawer as modal dialog */}
      <aside
        id="mobile-menu"
        ref={dialogRef}
        className={`mobile-menu ${open ? "show" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <h2 id="mobile-menu-title" className="sr-only">Navigation</h2>

        {links.map(({ id, icon, label }, idx) => (
          <a
            key={id}
            href={`#${id}`}
            className="mobile-link"
            onClick={(e) => handleAnchorClick(e, id)}
            ref={idx === 0 ? firstLinkRef : undefined}
          >
            <i className={icon} aria-hidden="true" /> {label}
          </a>
        ))}
        <a
          href="/resume.pdf"
          className="btn mobile-resume"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeAndGo}
          title="Open resume (PDF)"
        >
          Resume
        </a>
        <button className="mobile-close" onClick={() => { setOpen(false); menuBtnRef.current?.focus(); }}>
          Close
        </button>
      </aside>
    </nav>
  );
}
