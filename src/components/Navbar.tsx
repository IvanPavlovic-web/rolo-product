import { useState, useEffect, useCallback } from "react";
import { SITE_INFO, SITE_SECTIONS } from "../site";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = useCallback((href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  }, []);

  return (
    <nav
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      role="navigation"
      aria-label="Glavna navigacija"
    >
      <div className="navbar__inner">
        <a
          href="#hero"
          className="navbar__logo"
          onClick={() => handleNav("#hero")}
          aria-label={`${SITE_INFO.brandName} - početna`}
        >
          <span className="navbar__logo-accent">PVC</span>
          <span className="navbar__logo-name">{SITE_INFO.brandName}</span>
        </a>

        <button
          type="button"
          className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Zatvori meni" : "Otvori meni"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <ul
          id="primary-navigation"
          className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
          role="list"
        >
          {SITE_SECTIONS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`navbar__link ${
                  activeSection === item.href.replace("#", "")
                    ? "navbar__link--active"
                    : ""
                }`}
                onClick={(event) => {
                  event.preventDefault();
                  handleNav(item.href);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#kontakt"
              className="navbar__cta"
              onClick={(event) => {
                event.preventDefault();
                handleNav("#kontakt");
              }}
            >
              Upit
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
