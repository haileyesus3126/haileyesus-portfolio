// src/sections/About.jsx

import "./About.css";
import profileImg from "../assets/myphoto.jpg";
import { useLanguage } from "../theme/LanguageProvider";

export default function AboutSection() {
  const { text, language } = useLanguage();

  const about = {
    en: {
      hello: "Hey, I’m Haileyesus.",
      lead:
        "I’m a detail oriented Full Stack MERN Developer passionate about building clean, scalable, and user-friendly web applications.",
      p1:
        "I build modern web applications using React, Next.js, Node.js, Express, and MongoDB. I enjoy turning ideas into real products with clean UI, secure APIs, and responsive design.",
      p2:
        "My goal is to write code that works well, looks professional, and gives users a smooth experience. I’m always learning better ways to build, improve performance, and organize real world applications.",
      
      
    },
    am: {
      hello: "ሰላም፣ እኔ ሃይለየሱስ ነኝ።",
      lead:
        "እኔ Full Stack MERN Developer ነኝ። clean, scalable እና user-friendly web applications መገንባት እወዳለሁ።",
      p1:
        "React, Next.js, Node.js, Express እና MongoDB በመጠቀም ዘመናዊ web applications እገነባለሁ።",
      p2:
        "ግቤ clean UI, secure APIs እና smooth user experience ያለው ሶፍትዌር መገንባት ነው።",
      
     
    },
  };

  const t = about[language] || about.en;

  return (
    <section className="aboutWrap" id="about" aria-label="About section">
      <div className="aboutInner">
        <div className="aboutLeft">
          <h2 className="aboutTitle">{t.hello}</h2>

          <p className="aboutLead">{t.lead}</p>

          <div className="aboutRule" />

          <div className="aboutText">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <p>{t.p3}</p>
          </div>

         
        </div>

        <div className="aboutRight">
          <div className="aboutPhotoCircle">
            <img
              className="aboutPhoto"
              src={profileImg}
              alt="Haileyesus Mesfin"
            />
          </div>
        </div>
      </div>
    </section>
  );
}