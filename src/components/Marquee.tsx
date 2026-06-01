// Marquee.tsx
import "./Marquee.css";

interface MarqueeProps {
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Marquee({
  reverse = false,
  pauseOnHover = false,
  children,
  className = "",
}: MarqueeProps) {
  return (
    <div className={`marquee ${className}`} aria-live="off">
      <div
        className={`marquee__track ${
          reverse ? "marquee__track--reverse" : ""
        } ${pauseOnHover ? "marquee__track--pause" : ""}`}
      >
        <div className="marquee__content">{children}</div>
        <div className="marquee__content" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
