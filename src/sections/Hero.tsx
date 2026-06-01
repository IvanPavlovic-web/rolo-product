import { useCallback, useState } from "react";
import { Phone } from "lucide-react";
import { SITE_INFO, SITE_SECTIONS } from "../site";
import "./Hero.css";

const people = [
  {
    id: 1,
    name: "Marko Majstorović",
    designation: "Tivat",
    image: "/recenzije/marko-majstorovic.webp",
  },
  {
    id: 2,
    name: "Mihajlo Jokić",
    designation: "Herceg Novi",
    image: "/recenzije/mihajlo-jokic.webp",
  },
  {
    id: 3,
    name: "Ivan Pavlović",
    designation: "Igalo",
    image: "/recenzije/ivan-pavlovic.webp",
  },
  {
    id: 4,
    name: "Danilo Jovanović",
    designation: "Budva",
    image: "/recenzije/danilo-jovanovic.webp",
  },
];

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback((href: string) => {
    setMenuOpen(false);

    document
      .getElementById(href.replace("#", ""))
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="hero"
      className="hero hero--agency"
      aria-labelledby="hero-title"
    >
      <div className="hero__media" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="hero__video"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        <div className="hero__overlay" />
        <div className="hero__fade" />
      </div>

      <div className="hero__shell">
        <header className="hero__topbar">
          <button
            className="hero__brand"
            type="button"
            onClick={() => handleScroll("#hero")}
            aria-label={`${SITE_INFO.brandName} početna sekcija`}
          >
            {SITE_INFO.shortBrand}
          </button>

          <nav className="hero__nav" aria-label="Navigacija kroz sekcije">
            {SITE_SECTIONS.map((item) => (
              <button
                key={item.label}
                className="hero__nav-link"
                type="button"
                onClick={() => handleScroll(item.href)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hero__top-actions">
            <a
              href={SITE_INFO.phoneHref}
              className="hero__icon-button"
              aria-label={`Pozovite ${SITE_INFO.phoneDisplay}`}
            >
              <Phone aria-hidden="true" />
            </a>

            <button
              className="hero__call-button"
              type="button"
              onClick={() => handleScroll("#kontakt")}
            >
              Kontaktirajte nas
            </button>

            <button
              className="hero__menu-button"
              type="button"
              aria-label={menuOpen ? "Zatvori meni" : "Otvori meni"}
              aria-expanded={menuOpen}
              aria-controls="hero-mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </header>

        <div
          id="hero-mobile-menu"
          className={`hero__mobile-panel ${
            menuOpen ? "hero__mobile-panel--open" : ""
          }`}
        >
          {SITE_SECTIONS.map((item) => (
            <button
              key={item.label}
              className="hero__mobile-link"
              type="button"
              onClick={() => handleScroll(item.href)}
            >
              {item.label}
            </button>
          ))}

          <button
            className="hero__mobile-cta"
            type="button"
            onClick={() => handleScroll("#kontakt")}
          >
            Kontaktirajte nas
          </button>
        </div>

        <div className="hero__content">
          <div className="hero__copy">
            <div className="hero__metric">
              <span className="hero__metric-dot" aria-hidden="true" />

              <span>
                Kvalitetna PVC i ALU stolarija za domove i poslovne objekte
              </span>
            </div>

            <h1 id="hero-title" className="hero__headline">
              Prozori, vrata i PVC rješenja po mjeri za objekte širom Crne Gore
            </h1>

            <p className="hero__description">
              Izrada i montaža PVC i ALU stolarije za kuće, stanove, apartmane i
              poslovne prostore. Pouzdana izrada, kvalitetni materijali i
              profesionalna montaža.
            </p>

            <button
              className="hero__strategy-button"
              type="button"
              onClick={() => handleScroll("#kontakt")}
            >
              Kontaktirajte nas
            </button>
          </div>

          <aside className="hero__testimonial-card">
            <div className="hero__testimonial-top">
              <div
                className="hero__avatar-row"
                aria-label="Klijenti koji su ostavili utiske"
              >
                {people.map((person) => (
                  <img
                    key={person.id}
                    className="hero__avatar"
                    src={person.image}
                    alt={`${person.name}, ${person.designation}`}
                  />
                ))}
              </div>

              <span className="hero__trusted-copy">
                Klijenti širom Crne Gore vjeruju našem kvalitetu
              </span>
            </div>

            <div className="hero__quote-box">
              <blockquote className="hero__quote">
                "Od prvog dogovora do završne montaže sve je urađeno
                profesionalno i uredno. Prozori i vrata su vrhunskog kvaliteta,
                a rokovi ispoštovani."
              </blockquote>

              <cite className="hero__quote-author">
                — Vlasnik privatnog objekta u Budvi
              </cite>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
