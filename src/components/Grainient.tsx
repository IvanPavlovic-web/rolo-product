import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import "./Grainient.css";

interface GrainientProps {
  color1?: string;
  color2?: string;
  color3?: string;
  className?: string;
}

const vertex = `
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;

uniform float iTime;
uniform vec2 iResolution;

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

float random(vec2 st) {
  return fract(sin(dot(st.xy,
      vec2(12.9898,78.233)))*
      43758.5453123);
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;

  vec3 color = mix(uColor1, uColor2, uv.y);

  color = mix(
    color,
    uColor3,
    sin(uv.x * 5.0 + iTime * 0.2) * 0.5 + 0.5
  );

  float grain = random(uv + iTime * 0.01) * 0.08;

  gl_FragColor = vec4(color + grain, 1.0);
}
`;

const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex.replace("#", ""), 16);

  return [
    ((bigint >> 16) & 255) / 255,
    ((bigint >> 8) & 255) / 255,
    (bigint & 255) / 255,
  ];
};

export default function Grainient({
  color1 = "#050505",
  color2 = "#111111",
  color3 = "#1a1a1a",
  className = "",
}: GrainientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer();
    const gl = renderer.gl;

    containerRef.current.appendChild(gl.canvas);

    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: [0, 0] },
        uColor1: { value: hexToRgb(color1) },
        uColor2: { value: hexToRgb(color2) },
        uColor3: { value: hexToRgb(color3) },
      },
    });

    const mesh = new Mesh(gl, {
      geometry,
      program,
    });

    const resize = () => {
      if (!containerRef.current) return;

      renderer.setSize(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight,
      );

      program.uniforms.iResolution.value = [gl.canvas.width, gl.canvas.height];
    };

    window.addEventListener("resize", resize);

    resize();

    let frame = 0;

    const update = (t: number) => {
      frame = requestAnimationFrame(update);

      program.uniforms.iTime.value = t * 0.001;

      renderer.render({ scene: mesh });
    };

    update(0);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);

      if (containerRef.current?.contains(gl.canvas)) {
        containerRef.current.removeChild(gl.canvas);
      }
    };
  }, [color1, color2, color3]);

  return <div ref={containerRef} className={`grainient ${className}`} />;
}
