import { motion } from "framer-motion";
import "./Footer.css";

export default function Footer() {
  const EMAIL = "Haileyesus2024@gmail.com";
  const currentYear = new Date().getFullYear();

  const socials = [
    { href: `mailto:${EMAIL}`, icon: "fa-solid fa-envelope", label: "Email" },
    { href: "https://github.com/haileyesus3126", icon: "fa-brands fa-github", label: "GitHub" },
    { href: "https://www.linkedin.com/in/haileyesus3126", icon: "fa-brands fa-linkedin", label: "LinkedIn" },
    // Add more later if you want (Twitter, etc.)
  ];

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="footer-glow" aria-hidden="true" />
      <div className="footer-aurora" aria-hidden="true" />

      <div className="footer-inner">
        <motion.p
          className="copy"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Made with <span className="heart">❤️</span> by{" "}
          <strong>Haileyesus</strong> — I make websites using MERN & Next.js
        </motion.p>

        <motion.ul
          className="footer-socials"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.3 },
            },
          }}
        >
          {socials.map((social, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -6, scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <a
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={social.label}
                className="social-link"
              >
                <i className={social.icon}></i>
                <span className="sr-only">{social.label}</span>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="footer-year">
            © {currentYear} Haileyesus. All rights reserved.
          </p>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="back-to-top"
            aria-label="Back to top"
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </motion.div>
      </div>

     
    </motion.footer>
  );
}
