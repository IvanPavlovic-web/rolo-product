// Testimonials.tsx
import { useInView } from "../hooks/useInView";
import Marquee from "../components/Marquee";
import "./Testimonials.css";

const reviews = [
  {
    id: 1,
    name: "Marko Petrović",
    location: "Herceg Novi",
    text: "Korektni, tačni, nema muljanja. Prozori odlični, montaža uredna. Ne znam šta bih više dodao.",
  },
  {
    id: 2,
    name: "Nikola Jović",
    location: "Igalo",
    text: "Nisam imao nikakvih problema. Dogovor ispoštovan, rokovi ispoštovani. Vrata su stvarno kvalitetna.",
  },
  {
    id: 3,
    name: "Milan Ilić",
    location: "Herceg Novi",
    text: "Čovjek dođe, izmjeri, ugradi i to je to. Bez komplikacija i izvlačenja para. Sve pohvale.",
  },
  {
    id: 4,
    name: "Stefan Marić",
    location: "Bijela",
    text: "Više sam očekivao neke zavrzlame ali bukvalno sve proteklo glatko. Odličan odnos cijene i kvaliteta.",
  },
  {
    id: 5,
    name: "Dragan Kovačević",
    location: "Herceg Novi",
    text: "Prezadovoljan sam. Stolarija je stvarno na nivou, vidi se da se radi kvalitetno i da nije fušeraj.",
  },
  {
    id: 6,
    name: "Aleksandar Savić",
    location: "Kumbor",
    text: "Rekli su mi za njih i stvarno nisam pogriješio. Čista desetka za sve. Topla preporuka.",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

function ReviewCard({
  name,
  location,
  text,
}: {
  name: string;
  location: string;
  text: string;
}) {
  return (
    <article className="review-card" aria-label={`Utisak klijenta ${name} iz ${location}`}>
      <div className="review-card__glow" aria-hidden="true"></div>

      <div className="review-card__top">
        <div>
          <h3>{name}</h3>
          <span>{location}</span>
        </div>
      </div>

      <p>{text}</p>
    </article>
  );
}

export default function Testimonials() {
  const [ref, inView] = useInView();

  return (
    <section
      id="utisci"
      className="testimonials"
      ref={ref as React.RefObject<HTMLElement>}
      aria-labelledby="testimonials-title"
    >
      <div className="testimonials__inner">
        <div className={`section-header ${inView ? "animate-in" : ""}`}>
          <span className="section-tag section-tag--light">
            Zadovoljni klijenti
          </span>

          <h2 id="testimonials-title" className="section-title section-title--light">
            Kvalitet koji se vidi u svakom projektu.
          </h2>
        </div>

        <div className="testimonials__marquee-wrapper">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </Marquee>

          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </Marquee>

          {/* Noise overlay (isto kao u tvom primjeru) */}
          <svg
            className="testimonials__noise"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <filter id="noise-filter">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.6"
                  numOctaves="4"
                />
              </filter>
            </defs>
            <rect width="100%" height="100%" filter="url(#noise-filter)" />
          </svg>

          {/* Fade ivice */}
          <div className="testimonials__fade testimonials__fade--left" aria-hidden="true"></div>
          <div className="testimonials__fade testimonials__fade--right" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  );
}
