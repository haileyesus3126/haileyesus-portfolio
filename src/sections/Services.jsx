import { motion, useReducedMotion } from "framer-motion";
import "./Services.css";

const SERVICES = [
  {
    icon: "fa-solid fa-code",
    title: "Full-Stack Web Apps",
    subtitle: "MERN & Next.js",
    body: "I build simple and clean web apps. I work on both the front-end and back-end.",
    points: [
      "Responsive UI with React / Next.js",
      "APIs with Node.js and Express",
      "Basic login, security, and user roles",
    ],
    tags: ["MERN", "Next.js", "APIs"],
  },
  {
    icon: "fa-solid fa-cart-shopping",
    title: "E-Commerce & Payments",
    subtitle: "Online shops that work well",
    body: "I make small online stores with fast pages and easy checkout.",
    points: [
      "Product pages with search and filters",
      "Cart and checkout system",
      "Stripe payments set up safely",
    ],
    tags: ["Stripe", "E-Commerce"],
  },
  {
    icon: "fa-solid fa-chart-line",
    title: "Dashboards & Internal Tools",
    subtitle: "Helpful tools for teams",
    body: "I build simple dashboards and tools to help with daily work.",
    points: [
      "Basic task and workflow tools",
      "Admin dashboards with data",
      "Different access for different users",
    ],
    tags: ["Dashboards", "Admin"],
  },
  {
    icon: "fa-solid fa-gear",
    title: "Automation & Integrations",
    subtitle: "Make work easier",
    body: "I connect apps together and automate simple tasks using APIs.",
    points: [
      "API connections and webhooks",
      "Background jobs and timers",
      "Automation with tools like n8n",
    ],
    tags: ["APIs", "Automation"],
  },
];

export default function Services() {
  const reduce = useReducedMotion();

  const sectionVariants = reduce
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.45 },
        },
      }
    : {
        hidden: { opacity: 0, y: 26 },
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

  const cardVariants = reduce
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

  return (
    <motion.section
      id="services"
      className="services"
      aria-labelledby="services-title"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="services-aurora" aria-hidden="true" />

      <div className="services-inner">
        {/* Header */}
        <motion.header className="services-header" variants={cardVariants}>
          <p className="services-eyebrow">What I Do</p>
          <h2 className="services-title" id="services-title">
            I help you build{" "}
            <span className="services-gradient-text">
              real and useful web projects
            </span>
          </h2>
          <p className="services-lead">
            I am a full-stack developer. I work with{" "}
            <strong>MERN</strong> and <strong>Next.js</strong>
            to create simple, clean, and easy-to-use web applications from start
            to finish.
          </p>
        </motion.header>

        {/* Services Grid */}
        <motion.div
          className="services-grid"
          variants={sectionVariants}
          aria-label="Offered services"
        >
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.title}
              className="service-card"
              role="listitem"
              variants={cardVariants}
              whileHover={
                reduce
                  ? {}
                  : {
                      y: -6,
                      scale: 1.02,
                      rotateX: 1.5,
                      rotateY: -1.5,
                      transition: {
                        type: "spring",
                        stiffness: 230,
                        damping: 18,
                      },
                    }
              }
              whileTap={reduce ? {} : { scale: 0.99 }}
            >
              <div className="service-glow" aria-hidden="true" />

              <header className="service-head">
                <div className="service-icon-wrap">
                  <span className="service-icon">
                    <i className={service.icon} aria-hidden="true" />
                  </span>
                </div>
                <div className="service-text">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-subtitle">{service.subtitle}</p>
                </div>
              </header>

              <p className="service-body">{service.body}</p>

              <ul className="service-points">
                {service.points.map((point) => (
                  <li key={point}>
                    <span className="service-bullet" aria-hidden="true">
                      •
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="service-tags">
                {service.tags.map((tag) => (
                  <span key={tag} className="service-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <span className="service-border" aria-hidden="true" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
