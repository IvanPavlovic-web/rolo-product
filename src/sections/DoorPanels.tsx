import { useRef, useState, useEffect, useCallback } from "react";
import "./DoorPanels.css";

const PANEL_COUNT = 24;

const panelImages = Array.from({ length: PANEL_COUNT }, (_, i) => ({
  src: `paneli/panel-${i + 1}.webp`,
  alt: `Panel vrata ${i + 1}`,
}));

export default function DoorPanels() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const dragState = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    didDrag: false,
  });

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const scrollBy = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth =
      el.querySelector<HTMLElement>(".dp-card")?.offsetWidth ?? 480;
    const gap = 24;
    el.scrollBy({
      left: direction === "left" ? -(cardWidth + gap) : cardWidth + gap,
      behavior: "smooth",
    });
  };

  const openLightbox = (src: string) => {
    if (dragState.current.didDrag) return;
    setActiveImage(src);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => setActiveImage(null), 300);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    dragState.current.isDown = true;
    dragState.current.didDrag = false;
    dragState.current.startX = e.pageX - el.offsetLeft;
    dragState.current.scrollLeft = el.scrollLeft;
    el.style.cursor = "grabbing";
    el.style.scrollSnapType = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el || !dragState.current.isDown) return;
    e.preventDefault();
    dragState.current.didDrag = true;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.2;
    el.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const handleMouseUp = () => {
    const el = trackRef.current;
    if (!el) return;
    dragState.current.isDown = false;
    el.style.cursor = "grab";
    requestAnimationFrame(() => {
      el.style.scrollSnapType = "x mandatory";
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const el = trackRef.current;
    if (!el) return;
    dragState.current.isDown = true;
    dragState.current.didDrag = false;
    dragState.current.startX = e.touches[0].pageX - el.offsetLeft;
    dragState.current.scrollLeft = el.scrollLeft;
    el.style.scrollSnapType = "none";
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const el = trackRef.current;
    if (!el || !dragState.current.isDown) return;
    dragState.current.didDrag = true;
    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.2;
    el.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    const el = trackRef.current;
    if (!el) return;
    dragState.current.isDown = false;
    requestAnimationFrame(() => {
      el.style.scrollSnapType = "x mandatory";
    });
  };

  return (
    <>
      <section className="door-panels" id="vrata-paneli">
        <div className="door-panels__inner">
          <div className="dp-header">
            <span className="section-tag">Naša ponuda</span>
            <h2 className="section-title">
              Širok asortiman vrata
              <br />
              za svake mogućnosti
            </h2>
            <p className="dp-header__desc">
              Od klasičnih do modernih dizajna, pronađite vrata koja će savršeno
              upotpuniti vaš prostor.
            </p>
          </div>

          <div className="dp-slider-wrap">
            <button
              className="dp-arrow dp-arrow--left"
              onClick={() => scrollBy("left")}
              aria-label="Prethodna slika"
              disabled={!canScrollLeft}
              type="button"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="dp-track-outer">
              <div
                className="dp-track"
                ref={trackRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {panelImages.map((img, i) => (
                  <div
                    className="dp-card"
                    key={i}
                    onClick={() => openLightbox(img.src)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && openLightbox(img.src)
                    }
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading={i < 4 ? "eager" : "lazy"}
                      decoding="async"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
              <div className="dp-fade dp-fade--right" aria-hidden="true" />
            </div>

            <button
              className="dp-arrow dp-arrow--right"
              onClick={() => scrollBy("right")}
              aria-label="Sljedeća slika"
              disabled={!canScrollRight}
              type="button"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className="dp-mobile-indicator" aria-hidden="true">
            <div className="dp-mobile-indicator__track">
              <div
                className="dp-mobile-indicator__thumb"
                style={{
                  width: trackRef.current
                    ? `${(trackRef.current.clientWidth / trackRef.current.scrollWidth) * 100}%`
                    : "30%",
                  transform: trackRef.current
                    ? `translateX(${(trackRef.current.scrollLeft / (trackRef.current.scrollWidth - trackRef.current.clientWidth)) * (100 - (trackRef.current.clientWidth / trackRef.current.scrollWidth) * 100)}%)`
                    : "translateX(0)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <div
        className={`dp-lightbox ${lightboxOpen ? "dp-lightbox--open" : ""}`}
        onClick={closeLightbox}
        role="dialog"
        aria-modal="true"
        aria-label="Prikaz slike"
      >
        <button
          className="dp-lightbox__close"
          onClick={closeLightbox}
          aria-label="Zatvori"
          type="button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        {activeImage && (
          <img
            src={activeImage}
            alt="Prikaz panela"
            className="dp-lightbox__img"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </>
  );
}
