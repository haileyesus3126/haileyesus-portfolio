// src/components/Footer.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./Footer.css";

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const EMAIL = "Haileyesus2024@gmail.com";
  const currentYear = new Date().getFullYear();

  const socials = [
    { href: `mailto:${EMAIL}`, icon: "fa-solid fa-envelope", label: "Email" },
    { href: "https://github.com/haileyesus3126", icon: "fa-brands fa-github", label: "GitHub" },
    { href: "https://www.linkedin.com/in/haileyesus3126", icon: "fa-brands fa-linkedin", label: "LinkedIn" },
  ];

  return (
    <motion.footer
      className="footer"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Footer"
    >
      {/* About-style background layers */}
      <div className="footerGrid" aria-hidden="true" />
      <div className="footerGlow" aria-hidden="true" />
      <div className="footerNoise" aria-hidden="true" />

      <div className="footerInner">
        <motion.p
          className="footerCopy"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          Made with <span className="footerHeart">❤️</span> by{" "}
          <strong>Haileyesus</strong> 
        </motion.p>

        <motion.ul
          className="footerSocials"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? {} : "visible"}
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
          }}
          aria-label="Social links"
        >
          {socials.map((social, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
              }}
              whileHover={reduceMotion ? {} : { y: -3, scale: 1.07 }}
              whileTap={reduceMotion ? {} : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 18 }}
            >
              <a
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                className="footerSocialLink"
              >
                <i className={social.icon} aria-hidden="true" />
                <span className="sr-only">{social.label}</span>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="footerBottom"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? {} : { opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
        >
          <p className="footerYear">© {currentYear} Haileyesus. All rights reserved.</p>

         
        </motion.div>
      </div>
    </motion.footer>
  );
}
