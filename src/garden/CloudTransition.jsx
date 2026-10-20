import { useMemo } from "react";
import { CLOUDS } from "./assets";

// Lớp mây phủ kín màn hình khi "bay" từ trời sao sang trời nắng
export default function CloudTransition({ phase }) {
  const puffs = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => {
        const a = (i / 28) * Math.PI * 2 + Math.random() * 0.5;
        const r = i % 3 === 0 ? 8 : 18 + Math.random() * 26;
        const x = 50 + Math.cos(a) * r;
        const y = 50 + Math.sin(a) * r;
        return {
          x,
          y,
          dx: (x - 50) * 1.6,
          dy: (y - 50) * 1.6,
          s: 45 + Math.random() * 55,
          d: Math.random() * 0.25,
          src: CLOUDS[i % CLOUDS.length],
          flip: Math.random() < 0.5,
        };
      }),
    []
  );

  if (phase === "idle") return null;

  return (
    <div className={`cloud-transition ${phase}`} aria-hidden="true">
      <div className="ct-wash" />
      {puffs.map((p, i) => (
        <img
          key={i}
          src={p.src}
          alt=""
          className="ct-puff"
          style={{
            "--flip": p.flip ? -1 : 1,
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.s}vmax`,
            "--dx": `${p.dx}vw`,
            "--dy": `${p.dy}vh`,
            animationDelay: `${p.d}s`,
          }}
        />
      ))}
    </div>
  );
}
