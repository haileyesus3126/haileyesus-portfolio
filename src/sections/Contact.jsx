import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import "./Contact.css";

export default function Contact() {
  const formRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState({ type: null, message: "" });

  const sendEmail = (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    setStatus({ type: "loading", message: "Sending your message…" });

    emailjs
.sendForm(
        "service_7m6ul1n", //  EmailJS service ID
        "template_90fhvs3", //  EmailJS template ID
        formRef.current,
        "8yDueQJ3qutZgZRIP" // EmailJS public key
      )
      .then(
        () => {
          setStatus({
            type: "success",
            message: "Message sent! I’ll get back to you soon.",
          });
          formRef.current.reset();
        },
        (error) => {
          console.error(error?.text || error);
          setStatus({
            type: "error",
            message: "Something went wrong. Please try again in a moment.",
          });
        }
      );
  };

  const handleSpotlight = (e) => {
    const container = e.currentTarget;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    container.style.setProperty("--spot-x", `${x}px`);
    container.style.setProperty("--spot-y", `${y}px`);
  };

  const sectionVariants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.45 },
        },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.15,
          },
        },
      };

  const cardVariants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.35 } },
      }
    : {
        hidden: { opacity: 0, y: 18, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.45, ease: "easeOut" },
        },
      };

  const isSubmitting = status.type === "loading";

  return (
    <motion.section
      id="contact"
      className="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
      aria-labelledby="contact-title"
    >
      <div className="contact-aurora" aria-hidden="true" />

      <div className="contact-inner" onMouseMove={handleSpotlight}>
        {/* Header */}
        <motion.header
          className="contact-header"
          variants={
            reduceMotion
              ? undefined
              : { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="contact-eyebrow">Let&apos;s work together</p>
          <h2 className="contact-title" id="contact-title">
            Contact
          </h2>
          <p className="contact-lead">
           Want to work together or ask a question? Send me the details, and I will reply.
          </p>
        </motion.header>

        <div className="contact-grid">
          {/* Contact Form */}
          <motion.form
            ref={formRef}
            onSubmit={sendEmail}
            className="contact-form"
            variants={cardVariants}
            whileHover={
              reduceMotion
                ? {}
                : {
                    y: -4,
                    scale: 1.01,
                    transition: { type: "spring", stiffness: 220, damping: 18 },
                  }
            }
          >
            <div className="form-row">
              <label>
                <span>Name</span>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </label>

              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="user_email"
                  placeholder="you@email.com"
                  autoComplete="email"
                  required
                />
              </label>
            </div>

            <label className="full">
              <span>Message</span>
              <textarea
                name="message"
                rows="5"
                placeholder="Tell me about your project…"
                required
              />
            </label>

            {/* Status message */}
            <div
              className="status-wrapper"
              aria-live="polite"
              aria-atomic="true"
            >
              {status.message && (
                <p
                  className={`status-message ${
                    status.type === "success"
                      ? "status-success"
                      : status.type === "error"
                      ? "status-error"
                      : "status-loading"
                  }`}
                >
                  {status.message}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              className="btn primary contact-btn"
              disabled={isSubmitting}
              whileHover={
                reduceMotion || isSubmitting
                  ? {}
                  : {
                      y: -2,
                      scale: 1.02,
                      boxShadow: "0 10px 24px rgba(76,201,240,.35)",
                    }
              }
              whileTap={
                reduceMotion || isSubmitting ? {} : { scale: 0.98, y: 0 }
              }
            >
              {isSubmitting ? "Sending…" : "Send Message"}
            </motion.button>

            <span className="card-border" aria-hidden="true" />
          </motion.form>

          {/* Social Links / Side card */}
          <motion.aside
            className="contact-side"
            variants={cardVariants}
            whileHover={
              reduceMotion
                ? {}
                : {
                    y: -4,
                    scale: 1.01,
                    transition: { type: "spring", stiffness: 220, damping: 18 },
                  }
            }
          >
            <div className="contact-card">
              <h3>Find me online</h3>
             

              <ul className="socials">
                <li>
                  <a href="mailto:Haileyesus2024@gmail.com">
                    <i className="fa-solid fa-envelope" aria-hidden="true" />
                    <span>Email</span>
                     
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/haileyesus3126"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-github" aria-hidden="true" />
                    <span>GitHub</span>
                     
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/haileyesus3126"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-linkedin" aria-hidden="true" />
                    <span>LinkedIn</span>
                    
                  </a>
                </li>
              </ul>

              <div className="contact-footnote">
                <span className="dot online" aria-hidden="true" />
                <span>I am ready to work, full-time or freelance.</span>
              </div>

              <span className="card-border" aria-hidden="true" />
            </div>
          </motion.aside>
        </div>
      </div>
    </motion.section>
  );
}
