import { motion } from "framer-motion";
import "./Projects.css";

// ====== IMPORT IMAGES FROM ASSETS ======
import taskSystem from "../assets/projects/task-system.jpg";
import portfolio from "../assets/projects/portfolio.jpg";
import mernBlog from "../assets/projects/mern-blog.jpg";
import ecommerce from "../assets/projects/ecommerce.jpg";
import inventoryApp from "../assets/projects/inventory-app.jpg";
import socialApp from "../assets/projects/social-app.jpg";
import chatApp from "../assets/projects/chat-app.jpg";

// ====== DATA (MERN & Next.js only) ======
const PROJECTS = [
  {
    title: "Techno Delivery — Food Delivery (MERN)",
    desc: "End-to-end food delivery app: restaurant menus, cart & checkout, address management, order tracking, and secure payments.",
    tech: ["MongoDB", "Express", "React", "Node", "Stripe"],
    image: taskSystem,
    live: "#", // add your live demo when ready
    code: "https://github.com/yourname/task-management-mern", // replace with your real repo
  },
  {
    title: "Haileyesus.dev — Portfolio (Next.js)",
    desc: "Developer portfolio with SSR/ISR, animated sections, and image optimization. Deployed on Vercel.",
    tech: ["Next.js", "React", "CSS", "Vercel"],
    image: portfolio,
    live: "#", // e.g. https://haile-portfolio.vercel.app
    code: "https://github.com/yourname/portfolio-next",
  },
  {
    title: "Banners Hallmark — Retail Website",
    desc: "Responsive, SEO-friendly retail website for greeting cards & gifts with clean navigation and fast performance.",
    tech: ["Next.js", "React", "CSS", "Vercel"],
    image: mernBlog,
    live: "https://www.bannershallmark.com/",
    code: "#", // add repo if public, otherwise keep '#'
  },
  {
    title: "StripeShop — E-Commerce (MERN + Stripe)",
    desc: "Product catalog with filters, cart/wishlist, Stripe checkout, admin dashboard, and order management.",
    tech: ["MongoDB", "Express", "React", "Node", "Stripe"],
    image: ecommerce,
    live: "#",
    code: "https://github.com/yourname/ecommerce",
  },
  {
    title: "Task Managment System",
    desc: "Task managment system for banners hallmark.",
    tech: ["MongoDB", "Express", "React", "Node"],
    image: inventoryApp,
    live: "#",
    code: "https://github.com/yourname/inventory-manager-mern",
  },
  {
    title: "ConnectHub — Social App (MERN + Socket.io)",
    desc: "Profiles, posts, likes, comments, and real-time chat/notifications.",
    tech: ["MongoDB", "Express", "React", "Node", "Socket.io"],
    image: socialApp,
    live: "#",
    code: "https://github.com/yourname/social-media-app",
  },
  {
    title: "QuickChat — Real-Time Chat (MERN + WebSockets)",
    desc: "Secure chat with JWT auth, private/group conversations, online presence, and file sharing.",
    tech: ["MongoDB", "Express", "React", "Node", "WebSockets"],
    image: chatApp,
    live: "#",
    code: "https://github.com/yourname/chat-app",
  },
];

// ====== ANIMATION VARIANTS ======
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="projects-aurora" aria-hidden="true" />
      <div className="projects-inner">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="eyebrow">Selected Work</p>
          <h2 className="projects-title" id="projects-title">
            MERN & <span className="grad">Next.js</span> Projects
          </h2>
          <p className="projects-lead">
            Real-world apps focused on clean architecture, performance, and great UX.
          </p>
          <div className="projects-divider" aria-hidden="true">
            <span className="line" />
            <span className="glow" />
          </div>
        </motion.header>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          aria-live="polite"
        >
          {PROJECTS.map((p, idx) => (
            <motion.article
              key={p.title + idx}
              className="project-card"
              variants={cardVariants}
              whileHover={{ scale: 1.02, rotateX: 1.5, rotateY: -1.5 }}
              whileTap={{ scale: 0.995 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
            >
              {/* thumb */}
              <div className="project-thumb">
                <img src={p.image} alt={p.title} loading="lazy" decoding="async" />
                <span className="badge" aria-hidden="true">{p.tech[0]}</span>
                <span className="shine" aria-hidden="true" />
              </div>

              {/* body */}
              <div className="project-body">
                <h3 className="project-name">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>

                <ul className="project-tech" aria-label={`${p.title} technologies`}>
                  {p.tech.map((t) => (
                    <li key={t} className="pill">{t}</li>
                  ))}
                </ul>
              </div>

              {/* actions */}
              <div className="project-actions">
                <a
                  className="btn primary"
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live demo: ${p.title}`}
                >
                  Live
                </a>
                <a
                  className="btn ghost"
                  href={p.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Source code: ${p.title}`}
                >
                  Code
                </a>
              </div>

              {/* animated border gradient */}
              <span className="card-border" aria-hidden="true" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
