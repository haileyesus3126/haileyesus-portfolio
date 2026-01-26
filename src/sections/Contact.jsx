// src/sections/Contact.jsx
import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <section className="contactWrap" id="contact" aria-label="Contact section">
      <div className="contactInner">
        {/* Title */}
        <div className="contactHeader">
          <h1 className="contactTitle">CONTACT</h1>
          <div className="contactRule" />
        </div>

        {/* Simple row like screenshot (About typography/colors) */}
        <div className="contactRow" aria-live="polite">
          {/* Left */}
          <div className="contactCol">
            <p className="contactLabel">MAIL</p>

            <a className="contactLink" href="mailto:Haileyesus2024@gmail.com">
              <span className="contactArrow" aria-hidden="true">
                ↗
              </span>
              <span className="contactValue">Haileyesus2024@gmail.com</span>
            </a>
          </div>

          {/* Right */}
          <div className="contactCol">
            <p className="contactLabel">My links</p>

            <div className="contactStack">
              <a
                className="contactLink"
                href="https://github.com/haileyesus3126"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contactArrow" aria-hidden="true">
                  ↗
                </span>
                <span className="contactValue">github</span>
              </a>

              <a
                className="contactLink"
                href="https://www.linkedin.com/in/haileyesus3126"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contactArrow" aria-hidden="true">
                  ↗
                </span>
                <span className="contactValue">linkedin</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
