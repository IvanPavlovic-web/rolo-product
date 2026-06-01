// carousel.tsx
"use client";

import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
  type ReactNode,
  type HTMLAttributes,
} from "react";

// ─── Context ────────────────────────────────────────────────────────────────

type CarouselContextType = {
  emblaRef: ReturnType<typeof useEmblaCarousel>[0];
  emblaApi: EmblaCarouselType | undefined;
};

const CarouselContext = createContext<CarouselContextType | null>(null);

function useCarousel() {
  const ctx = useContext(CarouselContext);
  if (!ctx) throw new Error("useCarousel must be used inside <Carousel>");
  return ctx;
}

// ─── Carousel (root) ────────────────────────────────────────────────────────

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  options?: EmblaOptionsType;
  children: ReactNode;

  autoPlay?: boolean;
  autoPlayDelay?: number;
}

export function Carousel({
  options,
  children,
  style,
  autoPlay = false,
  autoPlayDelay = 10000,
  ...props
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!emblaApi || !autoPlay) return;

    const startAutoplay = () => {
      stopAutoplay();
      autoplayRef.current = setInterval(() => {
        if (emblaApi) emblaApi.scrollNext();
      }, autoPlayDelay);
    };

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    // start autoplay
    startAutoplay();

    // pauziraj dok korisnik dira slider
    emblaApi.on("pointerDown", stopAutoplay);
    emblaApi.on("pointerUp", startAutoplay);
    emblaApi.on("settle", startAutoplay);

    return () => {
      stopAutoplay();
      emblaApi.off("pointerDown", stopAutoplay);
      emblaApi.off("pointerUp", startAutoplay);
      emblaApi.off("settle", startAutoplay);
    };
  }, [emblaApi, autoPlay, autoPlayDelay]);

  return (
    <CarouselContext.Provider value={{ emblaRef, emblaApi }}>
      <div style={{ position: "relative", width: "100%", ...style }} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

// ─── SliderContainer ────────────────────────────────────────────────────────

interface SliderContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function SliderContainer({
  children,
  style,
  ...props
}: SliderContainerProps) {
  const { emblaRef } = useCarousel();

  return (
    <div
      ref={emblaRef}
      style={{ overflow: "hidden", width: "100%", ...style }}
      {...props}
    >
      <div style={{ display: "flex", height: "100%" }}>{children}</div>
    </div>
  );
}

// ─── Slider ────────────────────────────────────────────────────────────────

interface SliderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Slider({ children, style, ...props }: SliderProps) {
  return (
    <div
      style={{
        flex: "0 0 100%",
        minWidth: 0,
        position: "relative",
        height: "100%",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Prev Button ───────────────────────────────────────────────────────────

interface SliderButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function SliderPrevButton({
  children,
  onClick,
  ...props
}: SliderButtonProps) {
  const { emblaApi } = useCarousel();
  const [disabled, setDisabled] = useState(true);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setDisabled(!api.canScrollPrev());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      emblaApi?.scrollPrev();
      onClick?.(e);
    },
    [emblaApi, onClick],
  );

  return (
    <button disabled={disabled} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

// ─── Next Button ───────────────────────────────────────────────────────────

export function SliderNextButton({
  children,
  onClick,
  ...props
}: SliderButtonProps) {
  const { emblaApi } = useCarousel();
  const [disabled, setDisabled] = useState(true);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      emblaApi?.scrollNext();
      onClick?.(e);
    },
    [emblaApi, onClick],
  );

  return (
    <button disabled={disabled} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

// ─── Dots ──────────────────────────────────────────────────────────────────

interface SliderDotButtonProps extends HTMLAttributes<HTMLDivElement> {
  activeDotClass?: string;
  dotClass?: string;
}

export function SliderDotButton({
  activeDotClass,
  dotClass,
  style,
  ...props
}: SliderDotButtonProps) {
  const { emblaApi } = useCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onInit = useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onInit);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return (
    <div
      style={{ display: "flex", gap: "6px", alignItems: "center", ...style }}
      {...props}
    >
      {scrollSnaps.map((_, i) => {
        const isActive = i === selectedIndex;

        return (
          <button
            key={i}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Prikaži slajd ${i + 1}`}
            aria-current={isActive ? "true" : undefined}
            className={isActive ? activeDotClass : dotClass}
            style={{
              padding: 0,
              border: "none",
              cursor: "pointer",
              borderRadius: "9999px",
              transition: "all 0.25s ease",
              width: isActive ? "20px" : "8px",
              height: "8px",
              background: isActive
                ? "rgba(255,255,255,0.9)"
                : "rgba(255,255,255,0.4)",
            }}
          />
        );
      })}
    </div>
  );
}
