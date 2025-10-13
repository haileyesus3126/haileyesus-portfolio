import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="copy">
  Crafted with ❤️ by Haileyesus | MERN & Next.js Developer
</p>

        <ul className="footer-socials">
          <li>
            <a href="mailto:you@example.com" aria-label="Email">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </li>
          <li>
            <a href="https://github.com/yourname" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/yourname" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
