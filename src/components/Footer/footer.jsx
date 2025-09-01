import "./footer.css";
import { Link } from "react-router-dom";
import gitHubLogo from "../../assets/gitHub_Icon.svg";
import linkedInLogo from "../../assets/LinkedIn-Icon-Black-Logo.wine.svg";

function Footer({ handleHomeClick }) {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © 2025 Alex Reznik, Powered by News API
      </p>
      <nav className="footer__nav-group">
        <div className="footer__leftGroup">
          <Link to="/" className="footer__nav-home" onClick={handleHomeClick}>
            Home
          </Link>
          <a
            href="https://tripleten.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__nav-tripleTen"
          >
            TripleTen
          </a>
        </div>
        <div className="footer__rightGroup">
          <a
            href="https://github.com/rezelution"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <img
              className="footer__nav-gitHubLogo"
              src={gitHubLogo}
              alt="gitHub Logo"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/alexreznikseniordirector"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <img
              className="footer__nav-LinkedInLogo"
              src={linkedInLogo}
              alt="LinkedIn Logo"
            />
          </a>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
