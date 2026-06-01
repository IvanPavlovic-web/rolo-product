import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: "card-1",
    image: "/servisi/servis-1.webp",
    number: "01",
    label: "PVC i ALU stolarija iz vlastitog pogona",
    color: "#2f7cff",
  },
  {
    id: "card-2",
    image: "/servisi/servis-2.webp",
    number: "02",
    label: "Ista ekipa mjeri i ugrađuje",
    color: "#333333",
  },
  {
    id: "card-3",
    image: "/servisi/servis-3.webp",
    number: "03",
    label: "Bez posrednika i bez komplikacija",
    color: "#133b86",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const header = headerRef.current;
    const container = containerRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!header || !container || cards.length === 0) return;

    let isGapAnimationCompleted = false;
    let isFlipAnimationCompleted = false;

    const mm = gsap.matchMedia();

    mm.add("(max-width: 999px)", () => {
      return {};
    });

    mm.add("(min-width: 1000px)", () => {
      ScrollTrigger.create({
        trigger: ".about-sticky",
        start: "top top",
        end: `+=${window.innerHeight * 4}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress >= 0.1 && progress <= 0.25) {
            const hp = gsap.utils.mapRange(0.1, 0.25, 0, 1, progress);
            gsap.set(header, {
              y: gsap.utils.mapRange(0, 1, 40, 0, hp),
              opacity: gsap.utils.mapRange(0, 1, 0, 1, hp),
            });
          } else if (progress < 0.1) {
            gsap.set(header, { y: 40, opacity: 0 });
          } else if (progress > 0.25) {
            gsap.set(header, { y: 0, opacity: 1 });
          }

          if (progress <= 0.25) {
            gsap.set(container, {
              width: `${gsap.utils.mapRange(0, 0.25, 75, 60, progress)}%`,
            });
          } else {
            gsap.set(container, { width: "60%" });
          }

          if (progress >= 0.35 && !isGapAnimationCompleted) {
            gsap.to(container, {
              gap: "20px",
              duration: 0.5,
              ease: "power3.out",
            });
            gsap.to(cards, {
              borderRadius: "20px",
              duration: 0.5,
              ease: "power3.out",
            });
            isGapAnimationCompleted = true;
          } else if (progress < 0.35 && isGapAnimationCompleted) {
            gsap.to(container, {
              gap: "0px",
              duration: 0.5,
              ease: "power3.out",
            });
            gsap.to(cards[0], {
              borderRadius: "20px 0 0 20px",
              duration: 0.5,
              ease: "power3.out",
            });
            gsap.to(cards[1], {
              borderRadius: "0px",
              duration: 0.5,
              ease: "power3.out",
            });
            gsap.to(cards[2], {
              borderRadius: "0 20px 20px 0",
              duration: 0.5,
              ease: "power3.out",
            });
            isGapAnimationCompleted = false;
          }

          if (progress >= 0.7 && !isFlipAnimationCompleted) {
            gsap.to(cards, {
              rotationY: 180,
              duration: 0.75,
              ease: "power3.inOut",
              stagger: 0.1,
            });
            gsap.to([cards[0], cards[2]], {
              y: 30,
              rotationZ: (i) => [-15, 15][i],
              duration: 0.75,
              ease: "power3.inOut",
            });
            isFlipAnimationCompleted = true;
          } else if (progress < 0.7 && isFlipAnimationCompleted) {
            gsap.to(cards, {
              rotationY: 0,
              duration: 0.75,
              ease: "power3.inOut",
              stagger: -0.1,
            });
            gsap.to([cards[0], cards[2]], {
              y: 0,
              rotationZ: 0,
              duration: 0.75,
              ease: "power3.inOut",
            });
            isFlipAnimationCompleted = false;
          }
        },
      });

      return () => {};
    });

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mm.revert();
    };
  }, []);

  return (
    <>
      <section id="o-nama" className="about-intro" aria-labelledby="about-title">
        <h1 id="about-title">PVC i ALU stolarija iz Zelenike. Pravimo i ugrađujemo.</h1>
      </section>

      <section
        className="about-sticky"
        ref={sectionRef}
        aria-labelledby="about-process-title"
      >
        <div className="about-sticky-header">
          <h1 id="about-process-title" ref={headerRef}>
            Kako radimo?
          </h1>
        </div>

        <div className="about-card-container" ref={containerRef}>
          {CARDS.map((card, index) => (
            <div
              key={card.id}
              id={card.id}
              className="about-card"
              aria-label={`${card.number}. ${card.label}`}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
            >
              <div className="about-card-front">
                <img src={card.image} alt={card.label} />
              </div>
              <div
                className="about-card-back"
                style={{ backgroundColor: card.color }}
              >
                <span>( {card.number} )</span>
                <p>{card.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-outro" aria-labelledby="about-outro-title">
        <h1 id="about-outro-title">Za stanove, kuće, apartmane i poslovne prostore.</h1>
      </section>
    </>
  );
}
