import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SITE_INFO } from "../site";
import "./Contact.css";

export default function Contact() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id="kontakt" className="contact" aria-labelledby="contact-title">
      <AnimatePresence mode="wait">
        {showDetails ? (
          <motion.div
            key="details"
            className="contact__details"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -32 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className="contact__back"
              onClick={() => setShowDetails(false)}
              aria-label="Vrati se na kontakt uvod"
            >
              ← Nazad
            </button>

            <div className="contact__details-inner">
              <div className="contact__details-left">
                <span className="contact__kicker">/ KONTAKT DETALJI</span>
                <h2 className="contact__details-title">
                  Telefon, email
                  <br />i lokacija
                </h2>
                <div className="contact__info-list">
                  <div className="contact__info-row">
                    <span className="contact__info-label">/ TELEFON</span>
                    <a
                      href={SITE_INFO.phoneHref}
                      className="contact__info-value"
                      aria-label={`Pozovite ${SITE_INFO.phoneDisplay}`}
                    >
                      {SITE_INFO.phoneDisplay}
                    </a>
                  </div>
                  <div className="contact__info-row">
                    <span className="contact__info-label">/ EMAIL</span>
                    <a
                      href={SITE_INFO.emailHref}
                      className="contact__info-value"
                      aria-label={`Pošaljite email na ${SITE_INFO.email}`}
                    >
                      {SITE_INFO.email}
                    </a>
                  </div>
                  <div className="contact__info-row">
                    <span className="contact__info-label">/ ADRESA</span>
                    <a
                      href={SITE_INFO.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="contact__info-value"
                      aria-label={`Otvori lokaciju ${SITE_INFO.fullAddress} na Google Maps`}
                    >
                      {SITE_INFO.addressLine1}, Zelenika
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact__details-map">
                <iframe
                  title={`Lokacija ${SITE_INFO.brandName}`}
                  src={SITE_INFO.mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="hero"
            className="contact__hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Top bar */}
            <div className="contact__topbar">
              <span>/ KONTAKT</span>
            </div>

            {/* Main layout */}
            <div className="contact__layout">
              {/* Left column */}
              <div className="contact__left">
                <h1 className="contact__headline">
                  <span id="contact-title">
                  Spremni za
                  <br />
                  novi projekat?
                  </span>
                </h1>

                <div className="contact__info-block">
                  <span className="contact__info-label">
                    / UPITI I INFORMACIJE
                  </span>
                  <a
                    href={SITE_INFO.emailHref}
                    className="contact__email"
                    aria-label={`Pošaljite email na ${SITE_INFO.email}`}
                  >
                    {SITE_INFO.email}
                  </a>
                  <a
                    href={SITE_INFO.phoneHref}
                    className="contact__phone"
                    aria-label={`Pozovite ${SITE_INFO.phoneDisplay}`}
                  >
                    {SITE_INFO.phoneDisplay}
                  </a>
                </div>

                <div className="contact__info-block">
                  <span className="contact__info-label">/ ADRESA</span>
                  <address className="contact__address">
                    {SITE_INFO.businessName}
                    <br />
                    {SITE_INFO.addressLine1}
                    <br />
                    {SITE_INFO.addressLine2}
                  </address>
                </div>

                {/* Arrow + button group */}
                <div className="contact__arrow-group">
                  <div className="contact__arrow">
                    <svg
                      viewBox="0 0 40 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <line
                        x1="20"
                        y1="0"
                        x2="20"
                        y2="48"
                        stroke="#111"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <polyline
                        points="6,34 20,50 34,34"
                        stroke="#111"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <button
                    type="button"
                    className="contact__cta-btn"
                    onClick={() => setShowDetails(true)}
                    aria-label="Prikaži kontakt detalje i mapu"
                  >
                    Pogledaj na mapi
                  </button>
                </div>
              </div>

              {/* Right — image area */}
              <div className="contact__right">
                {/* Main big image */}
                <div className="contact__img-main">
                  <img src="/kontakt/kontakt-2.webp" alt="Kontakt" />
                  <div className="contact__img-label contact__img-label--left">
                    ROLO PRODUCT, CRNA GORA
                  </div>
                  <div className="contact__img-label contact__img-label--right">
                    ZELENIKA, HERCEG NOVI
                  </div>
                  <div className="contact__img-gradient" />
                </div>

                {/* Small image bottom-right */}
                <div className="contact__img-small">
                  <img src="/kontakt/kontakt-1.webp" alt="Detalj" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
