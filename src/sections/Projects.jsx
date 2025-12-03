// Projects.jsx
import { motion, useReducedMotion } from "framer-motion";
import "./Projects.css";

// ====== IMPORT IMAGES FROM ASSETS ======
import taskSystem from "../assets/projects/task-system.jpg";
import portfolio from "../assets/projects/portfolio.jpg";
import mernBlog from "../assets/projects/mern-blog.jpg";
import ecommerce from "../assets/projects/ecommerce.jpg";
import inventoryApp from "../assets/projects/inventory-app.jpg";
import socialApp from "../assets/projects/social-app.jpg";

import chatApp1 from "../assets/projects/chatApp1.jpg";
import chatApp2 from "../assets/projects/chat-app.jpg";
import chatApp3 from "../assets/projects/taskSystem1.jpg";
import chatApp4 from "../assets/projects/inventoryApp1.jpg";
import chatApp5 from "../assets/projects/portfolio1.jpg";
import chatApp6 from "../assets/projects/portfolio454.jpg";
import chatApp7 from "../assets/projects/ecommerce1.jpg";
import chatApp8 from "../assets/projects/portfolio33.jpg";
import chatApp9 from "../assets/projects/ecommerce45.jpg";
import chatApp10 from "../assets/projects/portfolio66.jpg";
import chatApp11 from "../assets/projects/mernBlogee.jpg";
import chatApp122 from "../assets/projects/2mernBlogee.jpg";

// ====== PROJECTS DATA (NO TECH STACK) ======
const PROJECTS = [
  {
    title: "Techno Delivery App",
    desc: "A complete food-delivery app with restaurants, cart, checkout, saved addresses, order tracking, and payments.",
    image: taskSystem,
    live: "#",
    code: "https://github.com/yourname/task-management-mern",
  },
  {
    title: "Personal Portfolio",
    desc: "A clean, modern portfolio site to showcase projects, experience, and contact details.",
    image: portfolio,
    live: "#",
    code: "https://github.com/yourname/portfolio-next",
  },
  {
    title: "Retail E-Commerce Website",
    desc: "A responsive online store for greeting cards and gifts, focused on a smooth shopping experience.",
    image: mernBlog,
    live: "https://www.bannershallmark.com/",
    code: "#",
  },
  {
    title: "Ruth Store",
    desc: "A full online store with product filters, wishlist, cart, checkout, admin tools, and order tracking.",
    image: ecommerce,
    live: "#",
    code: "https://github.com/yourname/ecommerce",
  },
  {
    title: "Task Management System",
    desc: "A simple system for tracking tasks, workflows, deadlines, and progress in teams.",
    image: inventoryApp,
    live: "#",
    code: "https://github.com/yourname/inventory-manager-mern",
  },
  {
    title: "Doctor Appointment Booking App",
    desc: "Patients can book appointments, create profiles, message doctors, and receive notifications.",
    image: socialApp,
    live: "#",
    code: "https://github.com/yourname/social-media-app",
  },
  {
    title: "Amazon Style E-Commerce Platform",
    desc: "A full store with products, cart, checkout, user accounts, admin tools, and live chat support.",
    image: chatApp2,
    live: "#",
    code: "https://github.com/yourname/chat-app",
  },
  {
    title: "Real-Time Support Chat App",
    desc: "A live chat system with online status, typing indicators, and saved conversation history.",
    image: chatApp1,
    live: "#",
    code: "#",
  },
  {
    title: "Project Management Dashboard",
    desc: "A dashboard for teams to manage boards, tasks, timelines, and activity logs in one place.",
    image: chatApp3,
    live: "#",
    code: "#",
  },
  {
    title: "CRM System",
    desc: "Manage customer profiles, sales pipeline, notes, reminders, and basic analytics.",
    image: chatApp4,
    live: "#",
    code: "#",
  },
  {
    title: "Job Board Platform",
    desc: "A job posting site with profiles, applications, and scheduled notifications for candidates.",
    image: chatApp5,
    live: "#",
    code: "#",
  },
  {
    title: "Online Learning Platform",
    desc: "Courses, video lessons, quizzes, progress tracking, and an admin dashboard.",
    image: chatApp6,
    live: "#",
    code: "#",
  },
  {
    title: "Hotel Booking System",
    desc: "Search rooms, check availability, book stays, pay, and manage bookings.",
    image: chatApp7,
    live: "#",
    code: "#",
  },
  {
    title: "SaaS Landing Page Builder",
    desc: "A drag-and-drop tool to create and publish landing pages using ready-made blocks.",
    image: chatApp8,
    live: "#",
    code: "#",
  },
  {
    title: "Blog CMS",
    desc: "A blog content system with admin panel, editor, tags, categories, and SEO options.",
    image: chatApp9,
    live: "#",
    code: "#",
  },
  {
    title: "Multi-Vendor Marketplace",
    desc: "Vendors can sign up, add products, track orders, and manage payouts via a single platform.",
    image: chatApp10,
    live: "#",
    code: "#",
  },
  {
    title: "Real Estate Listing Website",
    desc: "Property search with filters, image galleries, and agent pages.",
    image: chatApp11,
    live: "#",
    code: "#",
  },
  {
    title: "Movie App",
    desc: "Browse movies, view details, and explore categories and featured lists.",
    image: chatApp122,
    live: "#",
    code: "#",
  },
];

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="projects-aurora" aria-hidden="true" />
      <div className="projects-inner">
        <motion.header
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
          viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p className="eyebrow">Selected Work</p>
          <h2 className="projects-title" id="projects-title">
            Projects
          </h2>
          <p className="projects-lead">
            Real apps focused on clean design, clear structure, and a smooth user experience.
          </p>
          <div className="projects-divider" aria-hidden="true">
            <span className="line" />
            <span className="glow" />
          </div>
        </motion.header>

        <div className="projects-grid" aria-live="polite">
          {PROJECTS.map((p, idx) => {
            const hasLive = p.live && p.live !== "#";
            const hasCode = p.code && p.code !== "#";

            return (
              <motion.article
                key={p.title + idx}
                className="project-card"
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 24 }
                }
                whileInView={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.01 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                <div className="project-thumb">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                  />
                  
                  <span className="shine" aria-hidden="true" />
                </div>

                <div className="project-body">
                  <h3 className="project-name">{p.title}</h3>
                  <p className="project-desc">{p.desc}</p>
                  {/* Tech list removed for a cleaner, non-technical layout */}
                </div>

                <div className="project-actions">
                  {hasLive ? (
                    <a
                      className="btn primary"
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Live demo: ${p.title}`}
                    >
                      Live
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="btn primary disabled"
                      disabled
                      aria-disabled="true"
                    >
                      Live
                    </button>
                  )}

                  {hasCode ? (
                    <a
                      className="btn ghost"
                      href={p.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Source code: ${p.title}`}
                    >
                      Code
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="btn ghost disabled"
                      disabled
                      aria-disabled="true"
                    >
                      Code
                    </button>
                  )}
                </div>

                <span className="card-border" aria-hidden="true" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
