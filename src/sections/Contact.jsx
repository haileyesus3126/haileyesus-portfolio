import "./Contact.css";

export default function Contact() {
  return (
    <section className="contactWrap" id="contact">
      <div className="contactOverlay" />

      <div className="contactInner">
        <h2 className="contactTitle">Get In Touch</h2>

        <div className="contactRule" />

        <p className="contactText">
          Have a project in mind or just want to say hi?
          <br />
          Feel free to send me a message!
        </p>

        <form
          className="contactForm"
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
        >
          <label>
            Name
            <input type="text" name="name" required />
          </label>

          <label>
            Email
            <input type="email" name="email" required />
          </label>

          <label>
            Subject
            <input type="text" name="subject" required />
          </label>

          <label>
            Message
            <textarea name="message" rows="4" required />
          </label>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
}