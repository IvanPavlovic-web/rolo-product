"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";
import "./Gallery.css";

const PAGE_SIZE = 6;
const GALLERY_IMAGE_SIZES =
  "(max-width: 640px) 92vw, (max-width: 1200px) 30vw, 24vw";

const GALLERY_IMAGES = [
  "/galerija/galerija-1.webp",
  "/galerija/galerija-2.webp",
  "/galerija/galerija-3.webp",
  "/galerija/galerija-4.webp",
  "/galerija/galerija-5.webp",
  "/galerija/galerija-6.webp",
  "/galerija/galerija-7.webp",
  "/galerija/galerija-8.webp",
  "/galerija/galerija-10.webp",
  "/galerija/galerija-11.webp",
  "/galerija/galerija-12.webp",
  "/galerija/galerija-13.webp",
  "/galerija/galerija-14.webp",
  "/galerija/galerija-15.webp",
  "/galerija/galerija-16.webp",
  "/galerija/IMG-004ff2501c67718f3361c5927817ead2-V.webp",
  "/galerija/IMG-05ce310fe86c194ca83d3ce14dcbeabe-V.webp",
  "/galerija/IMG-072e3e2916bdd2924667bff852799ac5-V.webp",
  "/galerija/IMG-08e5debcfa753a500a7a37d414e67889-V.webp",
  "/galerija/IMG-09eca4f0587a463687c73982f3a1b2ff-V.webp",
  "/galerija/IMG-0baea80f197a4b125b5f717630360435-V.webp",
  "/galerija/IMG-11b8a4ff1ab186d245c3e5de432231e2-V.webp",
  "/galerija/IMG-135e8ffb10c852f1f183a449276c8ce7-V.webp",
  "/galerija/IMG-16ae9cfcd19530aef66ab0a081bbd11d-V.webp",
  "/galerija/IMG-19337f83dcaa15d7524bd89a227c01b6-V.webp",
  "/galerija/IMG-1b43be5e0d0d651cd4e61193177bf37b-V.webp",
  "/galerija/IMG-1fca80135dfedd8bf3f3924e901adc43-V.webp",
  "/galerija/IMG-2405a7a3422c4897719fcd834d144932-V.webp",
  "/galerija/IMG-25cff48c6a5cd595437f9a4ba9154201-V.webp",
  "/galerija/IMG-2c6ea989300cef18dc5c00071d4c1a4a-V.webp",
  "/galerija/IMG-2d19a9f4a1e8d55094df6ba907c8cf38-V.webp",
  "/galerija/IMG-34c70dc05ae5b4745b42ef020d129dd5-V.webp",
  "/galerija/IMG-3abe8d9fec564b1107d7bb0a026b425c-V.webp",
  "/galerija/IMG-465efb6141a304e7bad6546feedb0bea-V.webp",
  "/galerija/IMG-48b6a468ed4ce40b0e9b4d32d12b6399-V.webp",
  "/galerija/IMG-4b06fdd0a115e014d81cae0dbddd338b-V.webp",
  "/galerija/IMG-582ddad968cb03eb05d3705d7edd47be-V.webp",
  "/galerija/IMG-5a0e8db10ec4c459d86947d58a44a38a-V.webp",
  "/galerija/IMG-5a1789995bd5b1887e46c4e75f021dce-V.webp",
  "/galerija/IMG-601d3a1f746ea92f169ca974d4c4188e-V.webp",
  "/galerija/IMG-60718972ac2bcf0065e2cb96ad81cbb7-V.webp",
  "/galerija/IMG-621d44f04c8d629dfe68fcc3c96af0c1-V.webp",
  "/galerija/IMG-65e5129af9f61d7ad2037f6cb9effa06-V.webp",
  "/galerija/IMG-6d47a34a0cb44b8cb177bc975932c4a6-V.webp",
  "/galerija/IMG-6defa70659dec4218927db13eeb322e2-V.webp",
  "/galerija/IMG-7f03dd00ac1361c9beec5638d54946d1-V.webp",
  "/galerija/IMG-8262a08d6a7f4cd32fa9cf4d187ff0aa-V.webp",
  "/galerija/IMG-8456e48ed975a5fdde6535c7dde4a766-V.webp",
  "/galerija/IMG-84a4296db892d354414109a3b391c55c-V.webp",
  "/galerija/IMG-86c5d544993353094e58950ffa86141b-V.webp",
  "/galerija/IMG-89d76928c64d2bf3e71191b7e1070d3e-V.webp",
  "/galerija/IMG-9235c70457234d62213e579761bd5bda-V.webp",
  "/galerija/IMG-9c1953e98addaf15c1ee9ada7384a082-V.webp",
  "/galerija/IMG-9c403590f38aa3f3bacf4b265a1abaaa-V.webp",
  "/galerija/IMG-a01be7b99ef23b6d8d55b392ad16fb6c-V.webp",
  "/galerija/IMG-ad3367b69247d4db2a626a48b411c3d9-V.webp",
  "/galerija/IMG-c3e2ab03bdd1c33aa3e1e084125bf5ea-V.webp",
  "/galerija/IMG-d124e815eda6ddd898e577159f6b9019-V.webp",
  "/galerija/IMG-da1103cb431bef11ddefd4eaad47356b-V.webp",
  "/galerija/IMG-e0e081fcf54bfd4ba5b8fbd56378c4f4-V.webp",
  "/galerija/IMG-f60e7d91e1aed12422563aacd8f17313-V.webp",
  "/galerija/IMG-f8a8581fc93bf2e7133d2033dc57b3d0-V.webp",
];

type GalleryImageItem = {
  alt: string;
  src: string;
};

function GalleryThumb({
  image,
  index,
  onOpen,
}: {
  image: GalleryImageItem;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.button
      ref={ref}
      type="button"
      className="gallery__thumb"
      onClick={onOpen}
      initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
      animate={visible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      whileTap={{ scale: 0.985 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % 3) * 0.08,
      }}
      aria-label={`Otvori ${image.alt}`}
    >
      <picture>
        <source
          srcSet={image.src}
          sizes={GALLERY_IMAGE_SIZES}
          type="image/webp"
        />
        <img
          src={image.src}
          alt={image.alt}
          className="gallery__img"
          width={900}
          height={1600}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </motion.button>
  );
}

export default function Gallery() {
  const images = useMemo(
    () =>
      GALLERY_IMAGES.map((src, index) => ({
        src,
        alt: `Galerija slika ${index + 1}`,
      })),
    [],
  );
  const [count, setCount] = useState(PAGE_SIZE);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const visibleImages = useMemo(() => images.slice(0, count), [count, images]);
  const hasMore = count < images.length;

  useEffect(() => {
    if (activeIndex === null) {
      document.body.style.overflow = "";
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? 0 : (current + 1) % images.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? images.length - 1
            : (current - 1 + images.length) % images.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images]);

  const activeImage = activeIndex === null ? null : images[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === null
        ? images.length - 1
        : (current - 1 + images.length) % images.length,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? 0 : (current + 1) % images.length,
    );
  };

  return (
    <section id="galerija" className="gallery" aria-labelledby="gallery-title">
      <div className="gallery__inner">
        <div className="section-header">
          <span className="section-tag">Radovi</span>
          <h2 id="gallery-title" className="section-title">Galerija</h2>
          <p className="gallery__lead">
            Slike sa nasih posljednjih projekata
          </p>
        </div>

        <div className="gallery__masonry">
          {visibleImages.map((image, index) => (
            <GalleryThumb
              key={image.src}
              image={image}
              index={index}
              onOpen={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {hasMore && (
          <div className="gallery__more-wrap">
            <motion.button
              type="button"
              className="gallery__more-btn"
              onClick={() =>
                setCount((current) => Math.min(current + PAGE_SIZE, images.length))
              }
              whileTap={{ scale: 0.985 }}
              aria-label="Prikaži još slika iz galerije"
            >
              Prikazi Jos
            </motion.button>
          </div>
        )}
      </div>

      {activeImage && (
        <div
          className="gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Pregled galerije"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="gallery__lightbox-dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="gallery__lightbox-meta">
              <span className="sr-only">Slika </span>
              {activeIndex !== null ? activeIndex + 1 : 0} / {images.length}
            </div>

            <button
              type="button"
              className="gallery__lightbox-close"
              onClick={() => setActiveIndex(null)}
              aria-label="Zatvori galeriju"
            >
              X
            </button>

            <button
              type="button"
              className="gallery__lightbox-nav gallery__lightbox-nav-left"
              onClick={showPrevious}
              aria-label="Prethodna slika"
            >
              {"<"}
            </button>

            <div className="gallery__lightbox-frame">
              <img src={activeImage.src} alt={activeImage.alt} />
            </div>

            <button
              type="button"
              className="gallery__lightbox-nav gallery__lightbox-nav-right"
              onClick={showNext}
              aria-label="Sljedeca slika"
            >
              {">"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
