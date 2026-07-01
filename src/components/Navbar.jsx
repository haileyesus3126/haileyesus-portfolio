import { useState } from "react";
import { useLanguage } from "../theme/LanguageProvider";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { language, toggleLanguage, text } = useLanguage();

  const links = [
    { id: "home", label: text.nav.home },
    { id: "about", label: text.nav.about },
    { id: "projects", label: text.nav.projects },
    { id: "contact", label: text.nav.contact },
  ];

  return (
    <header className="navbar">
      <a href="#home" className="navLogo" onClick={() => setOpen(false)}>
        HMK<span>.</span>
      </a>

      <nav className={`navLinks ${open ? "open" : ""}`}>
        {links.map((link) => (
          <a key={link.id} href={`#${link.id}`} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="navActions">
        
        <button
          className={`menuBtn ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}