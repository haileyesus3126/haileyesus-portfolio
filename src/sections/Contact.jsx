import { useRef } from "react";
import emailjs from "@emailjs/browser"; // make sure to install: npm install @emailjs/browser
import "./Contact.css";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_7m6ul1n",         // your EmailJS service ID
        "template_90fhvs3",       // your template ID
        form.current,
        "8yDueQJ3qutZgZRIP"       // your public key
      )
      .then(
        () => {
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          alert("Failed to send message. Please try again.");
          console.error(error.text);
        }
      );
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <h2 className="contact-title">Contact</h2>
        <p className="contact-lead">
          Have a project or question? Send me a message and I’ll get back to you.
        </p>

        <div className="contact-grid">
          {/* Contact Form */}
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <label>
              <span>Name</span>
              <input type="text" name="user_name" placeholder="Your name" required />
            </label>

            <label>
              <span>Email</span>
              <input type="email" name="user_email" placeholder="you@email.com" required />
            </label>

            <label className="full">
              <span>Message</span>
              <textarea name="message" rows="5" placeholder="Tell me about your idea…" required />
            </label>

            <button type="submit" className="btn primary">Send</button>
          </form>

          {/* Social Links */}
          <aside className="contact-side">
            <div className="contact-card">
              <h3>Find me</h3>
              <ul className="socials">
                <li>
                  <a href="mailto:Haileyesus2024@gmail.com">
                    <i className="fa-solid fa-envelope"></i> Email
                  </a>
                </li>
                <li>
                  <a href="https://github.com/yourname" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-github"></i> GitHub
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/haileyesus3126" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin"></i> LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
