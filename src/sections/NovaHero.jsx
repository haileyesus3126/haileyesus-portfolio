import { motion } from "framer-motion";
import { useLanguage } from "../theme/LanguageProvider";
import "./NovaHero.css";

export default function NovaHero() {
  const { language } = useLanguage();

  const text = {
    en: {
      name: "Haileyesus Mesfin",
      role: "Full Stack MERN Developer",
      intro:
        "I build modern, responsive, and scalable web applications with clean UI, secure APIs, and strong user experience.",
      work: "View My Work",
      contact: "Get In Touch",
      scroll: "Scroll Down",
    },
    am: {
      name: "ሃይለየሱስ መስፍን",
      role: "Full Stack MERN Developer",
      intro:
        "ዘመናዊ፣ responsive እና scalable web applications በ clean UI እና secure APIs እገነባለሁ።",
      work: "ስራዎቼን ይመልከቱ",
      contact: "ያግኙኝ",
      scroll: "ወደታች",
    },
  };

  const t = text[language] || text.en;

  return (
    <section id="home" className="hero">
      <div className="heroOverlay" />

      <motion.div
        className="heroContent"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1>{t.name}</h1>

        <p className="heroRole">{t.role}</p>

        <p className="heroIntro">{t.intro}</p>

        <div className="heroActions">
          <a href="#projects" className="heroPrimaryBtn">
            {t.work}
          </a>

          <a href="#contact" className="heroSecondaryBtn">
            {t.contact}
          </a>
        </div>
      </motion.div>

      <a href="#about" className="scrollDown" aria-label="Scroll to about">
        <span>{t.scroll}</span>
        <i className="fa-solid fa-chevron-down" />
      </a>
    </section>
  );
}