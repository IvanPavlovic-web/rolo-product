import { useState } from "react";
import { FOOTER_SECTIONS, LEGAL_DOCUMENTS, SITE_INFO } from "../site";
import "./Footer.css";

type LegalDocument = (typeof LEGAL_DOCUMENTS)[number];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeLegal, setActiveLegal] = useState<LegalDocument | null>(null);

  const handleNav = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__top">
            <div className="footer__brand">
              <button
                type="button"
                className="footer__wordmark"
                onClick={() => handleNav("#hero")}
                aria-label={`${SITE_INFO.brandName} - povratak na početak`}
              >
                {SITE_INFO.shortBrand}
              </button>
              <p className="footer__brand-description">
                {SITE_INFO.businessName}
              </p>
            </div>

            <div className="footer__columns">
              <div className="footer__column">
                <h3 className="footer__column-title">Navigacija</h3>
                <nav aria-label="Navigacija footera">
                  <ul className="footer__nav-list">
                    {FOOTER_SECTIONS.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className="footer__link"
                          onClick={(event) => {
                            event.preventDefault();
                            handleNav(item.href);
                          }}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="footer__column">
                <h3 className="footer__column-title">Kontakt</h3>
                <ul className="footer__contact-list">
                  <li>
                    <a href={SITE_INFO.phoneHref} className="footer__link">
                      {SITE_INFO.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a href={SITE_INFO.emailHref} className="footer__link">
                      {SITE_INFO.email}
                    </a>
                  </li>
                  <li className="footer__contact-address">
                    <p>{SITE_INFO.addressLine1}</p>
                    <p>{SITE_INFO.addressLine2}</p>
                    <a
                      href={SITE_INFO.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="footer__link footer__link--underline"
                    >
                      Google Maps
                    </a>
                  </li>
                  <li className="footer__service-area">
                    {SITE_INFO.serviceArea}
                  </li>
                </ul>
              </div>

              <div className="footer__column">
                <h3 className="footer__column-title">Pravne informacije</h3>
                <ul className="footer__legal-list">
                  {LEGAL_DOCUMENTS.map((document) => (
                    <li key={document.id}>
                      <button
                        type="button"
                        className="footer__legal-trigger"
                        onClick={() => setActiveLegal(document)}
                      >
                        {document.label}
                        <span className="footer__legal-arrow">→</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <div className="footer__bottom-left">
              <p className="footer__copyright">
                © {currentYear} {SITE_INFO.businessName}
              </p>
              <span className="footer__separator">—</span>
              <p className="footer__rights">Sva prava zadržana</p>
            </div>
            <div className="footer__bottom-right">
              <p className="footer__contact-line">
                {SITE_INFO.email} | {SITE_INFO.phoneDisplay}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {activeLegal && (
        <div
          className="footer__modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="footer-legal-title"
          aria-describedby="footer-legal-intro"
          onClick={() => setActiveLegal(null)}
        >
          <div
            className="footer__modal-dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="footer__modal-close"
              onClick={() => setActiveLegal(null)}
              aria-label="Zatvori pravni dokument"
            >
              ✕
            </button>

            <span className="footer__modal-kicker">Pravni dokument</span>
            <h2 id="footer-legal-title" className="footer__modal-title">
              {activeLegal.title}
            </h2>
            <p id="footer-legal-intro" className="footer__modal-intro">
              {activeLegal.intro}
            </p>

            <div className="footer__modal-sections">
              {activeLegal.sections.map((section) => (
                <section key={section.title} className="footer__modal-section">
                  <h3>{section.title}</h3>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
