import type { HTMLAttributes, ReactNode, CSSProperties } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type GlowIntensity = "none" | "sm" | "md" | "lg";
type ShadowIntensity = "none" | "xs" | "sm" | "md" | "lg";

interface LiquidGlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  borderRadius?: string;
  glowIntensity?: GlowIntensity;
  shadowIntensity?: ShadowIntensity;
  blur?: number;
  saturation?: number;
  backgroundOpacity?: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const glowMap: Record<GlowIntensity, string> = {
  none: "none",
  sm: "0 0 12px rgba(255,255,255,0.15)",
  md: "0 0 24px rgba(255,255,255,0.22)",
  lg: "0 0 40px rgba(255,255,255,0.3)",
};

const shadowMap: Record<ShadowIntensity, string> = {
  none: "none",
  xs: "0 2px 12px rgba(0,0,0,0.15)",
  sm: "0 4px 20px rgba(0,0,0,0.2)",
  md: "0 8px 32px rgba(0,0,0,0.28)",
  lg: "0 16px 48px rgba(0,0,0,0.38)",
};

// ─── LiquidGlassCard ─────────────────────────────────────────────────────────

export function LiquidGlassCard({
  children,
  borderRadius = "14px",
  glowIntensity = "none",
  shadowIntensity = "sm",
  blur = 20,
  saturation = 180,
  backgroundOpacity = 0.12,
  style,
  ...props
}: LiquidGlassCardProps) {
  const cardStyle: CSSProperties = {
    position: "relative",
    backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    background: `rgba(255, 255, 255, ${backgroundOpacity})`,
    border: "1px solid rgba(255, 255, 255, 0.25)",
    borderRadius,
    boxShadow: [
      shadowMap[shadowIntensity],
      glowMap[glowIntensity],
      "inset 0 1px 0 rgba(255,255,255,0.28)",
    ]
      .filter((s) => s !== "none")
      .join(", "),
    ...style,
  };

  return (
    <div style={cardStyle} {...props}>
      {children}
    </div>
  );
}

// ─── LiquidGlassButton ───────────────────────────────────────────────────────

interface LiquidGlassButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  borderRadius?: string;
  disabled?: boolean;
}

export function LiquidGlassButton({
  children,
  borderRadius = "9999px",
  style,
  disabled,
  ...props
}: LiquidGlassButtonProps) {
  const btnStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.3 : 1,
    backdropFilter: "blur(10px) saturate(160%)",
    WebkitBackdropFilter: "blur(10px) saturate(160%)",
    background: "rgba(255, 255, 255, 0.15)",
    border: "1.5px solid rgba(255, 255, 255, 0.4)",
    borderRadius,
    color: "#fff",
    padding: "10px 20px",
    fontSize: "0.875rem",
    fontWeight: 500,
    transition: "background 0.2s ease, transform 0.15s ease",
    ...style,
  };

  return (
    <button
      type="button"
      disabled={disabled}
      style={btnStyle}
      onMouseEnter={(e) => {
        if (!disabled)
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(255,255,255,0.24)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "rgba(255,255,255,0.15)";
      }}
      {...props}
    >
      {children}
    </button>
  );
}

// ─── LiquidGlassTag ──────────────────────────────────────────────────────────

interface LiquidGlassTagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export function LiquidGlassTag({
  children,
  style,
  ...props
}: LiquidGlassTagProps) {
  return (
    <span
      style={{
        display: "inline-block",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        background: "rgba(255,255,255,0.15)",
        border: "1px solid rgba(255,255,255,0.28)",
        borderRadius: "9999px",
        padding: "3px 12px",
        fontSize: "0.7rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.85)",
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
