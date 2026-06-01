import React from "react";
import { useInView } from "../hooks/useInView";
import { SERVICES } from "../types/data";
import {
  Carousel,
  Slider,
  SliderContainer,
  SliderDotButton,
  SliderNextButton,
  SliderPrevButton,
} from "../components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Services.css";

const IMAGES = [
  "karusel/slika-1.webp",
  "karusel/slika-2.webp",
  "karusel/slika-3.webp",
  "karusel/slika-4.webp",
];

export default function Services() {
  const [ref, inView] = useInView();

  return (
    <section
      id="usluge"
      className="services"
      ref={ref as React.RefObject<HTMLElement>}
      aria-labelledby="services-title"
    >
      <h2 id="services-title" className="services__heading">
        Kako radimo?
      </h2>

      <Carousel
        options={{ loop: false }}
        className="services__carousel"
        role="region"
        aria-label="Karusel usluga"
      >
        <SliderContainer className="services__slider-container">
          {SERVICES.map((s, i) => (
            <Slider key={s.id} className="services__slide">
              {/* Slika */}
              <img
                src={IMAGES[i % IMAGES.length]}
                alt={s.title}
                className="services__slide-img"
              />

              {/* Tamni overlay */}
              <div className="services__overlay" />

              {/* Donji lijevi ugao — liquid glass kartica */}
              <div
                className={`services__glass ${inView ? "animate-in" : ""}`}
                style={{ animationDelay: `${0.2 + i * 0.05}s` }}
              >
                <span className="services__glass-tag">Kako radimo</span>
                <h3 className="services__glass-title">
                  {s.icon} {s.title}
                </h3>
                <p className="services__glass-desc">{s.description}</p>
                <ul className="services__glass-features" role="list">
                  {s.features.map((f) => (
                    <li key={f}>
                      <span className="services__check" aria-hidden="true">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Slider>
          ))}
        </SliderContainer>

        {/* Nav dugmad */}
        <SliderPrevButton
          className="services__nav services__nav--prev"
          aria-label="Prethodna usluga"
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </SliderPrevButton>
        <SliderNextButton
          className="services__nav services__nav--next"
          aria-label="Sljedeća usluga"
        >
          <ChevronRight size={22} aria-hidden="true" />
        </SliderNextButton>

        {/* Dot indikatori */}
        <div className="services__dots">
          <SliderDotButton />
        </div>
      </Carousel>
    </section>
  );
}
