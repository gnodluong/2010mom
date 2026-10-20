import { useEffect, useRef, useState } from "react";
import FadeLine from "./FadeLine";
import BackgroundMusic from "./BackgroundMusic";
import Garden from "./garden/Garden";
import CloudTransition from "./garden/CloudTransition";
import { CLOUDS, WISPS } from "./garden/assets";
import { letter } from "./content";
import "./garden/garden.css";
import "./App.css";

// Dải mây dày ngăn trời bình minh và trời nắng
const BANK = Array.from({ length: 19 }, (_, i) => {
  const row = i < 6 ? 0 : i < 12 ? 1 : 2;
  const n = row === 2 ? 7 : 6;
  const k = row === 0 ? i : row === 1 ? i - 6 : i - 12;
  const jitter = ((i * 37) % 10) / 10;
  return {
    src: CLOUDS[(i * 5) % CLOUDS.length],
    x: (k / (n - 1)) * 110 - 5 + (row === 1 ? 8 : 0) + jitter * 5,
    y: [34, 55, 78][row] + ((i * 13) % 7) - 3,
    w: [34, 52, 70][row] + jitter * 14,
    flip: i % 2 === 1,
    dur: 16 + ((i * 7) % 12),
    delay: -((i * 3) % 12),
    row,
  };
});

const PETAL_COLORS = ["#f6b8c6", "#fbefe2", "#c8306f", "#f2b73a", "#ef7fa0", "#ffffff"];

function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({ length: 22 }, (_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 37) % 100}%`,
            background: PETAL_COLORS[i % PETAL_COLORS.length],
            animationDuration: `${10 + ((i * 7) % 8)}s, ${2.8 + (i % 4) * 0.6}s`,
            animationDelay: `${-((i * 13) % 15)}s, ${-(i % 5) * 0.4}s`,
            "--size": `${10 + ((i * 5) % 9)}px`,
            "--drift": `${((i * 29) % 120) - 60}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [cloudPhase, setCloudPhase] = useState("idle");
  const bodyRef = useRef(null);

  // chỉ cho cánh hoa rơi khi đang ở trong phần vườn hoa
  useEffect(() => {
    const el = bodyRef.current;
    const obs = new IntersectionObserver(([e]) => el.classList.toggle("petals-on", e.isIntersecting));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // bấm nút: bay xuyên qua đám mây rồi hiện ra giữa vườn hoa
  function openGift() {
    if (cloudPhase !== "idle") return;
    const jump = () => {
      const el = document.getElementById("vuon-hoa");
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      jump();
      return;
    }
    setCloudPhase("in");
    setTimeout(() => {
      jump();
      setCloudPhase("out");
    }, 1250);
    setTimeout(() => setCloudPhase("idle"), 2600);
  }

  return (
    <div className="app">
      <BackgroundMusic />

      <header className="dawn">
        <div className="sky-wisps" aria-hidden="true" style={{ backgroundImage: `url(${WISPS})` }} />
        <div className="dawn-sun" aria-hidden="true" />
        <div className="sky-clouds" aria-hidden="true">
          {[1, 3, 0, 4].map((c, i) => (
            <img key={i} src={CLOUDS[c]} alt="" />
          ))}
        </div>
        <p className="dawn-date">20 · 10</p>
        <h1 className="dawn-title">
          Gửi Mẹ yêu
        </h1>
        <p className="dawn-sub">Ngày Phụ nữ Việt Nam</p>
        <button type="button" className="open-gift" onClick={openGift}>
          Mở quà cho Mẹ
        </button>
        <p className="dawn-hint">hoặc cuộn xuống từ từ</p>
      </header>

      <section className="spring">
        <div className="cloud-bank" aria-hidden="true">
          <div className="bank-clouds">
            {BANK.map((c, i) => (
              <img
                key={i}
                src={c.src}
                alt=""
                className={`bank-cloud row-${c.row}`}
                style={{
                  left: `${c.x}%`,
                  top: `${c.y}%`,
                  width: `${c.w}vmax`,
                  "--flip": c.flip ? -1 : 1,
                  animationDuration: `${c.dur}s`,
                  animationDelay: `${c.delay}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div ref={bodyRef} className="spring-body">
          <div className="sky" id="vuon-hoa">
            <div className="sky-wisps" aria-hidden="true" style={{ backgroundImage: `url(${WISPS})` }} />
            <div className="sky-wisps far" aria-hidden="true" style={{ backgroundImage: `url(${WISPS})` }} />
            <div className="sun" aria-hidden="true" />
            <div className="sky-clouds" aria-hidden="true">
              {[2, 4, 0, 5].map((c, i) => (
                <img key={i} src={CLOUDS[c]} alt="" />
              ))}
            </div>
            <h2 className="spring-title">
              Vườn hoa
              <span>con tặng Mẹ</span>
            </h2>
          </div>

          <Garden />

          <div className="meadow">
            <article className="spring-card letter">
              {letter.map((l, i) => (
                <FadeLine key={i} text={l.text} size={l.size} special={l.special} gold={l.gold} />
              ))}
              <div className="signature">
                <p>Con của Mẹ,</p>
                <p className="sign-name">Đông</p>
                <p className="sign-date">20 - 10 - 2026</p>
              </div>
            </article>
          </div>

          <Petals />
        </div>
      </section>

      <CloudTransition phase={cloudPhase} />
    </div>
  );
}
