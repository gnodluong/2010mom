import { useEffect, useRef, useState } from "react";

// Nhạc nền: thử tự phát, nếu trình duyệt chặn thì phát ở lần chạm/bấm đầu tiên
export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.5;

    const events = ["pointerdown", "keydown", "touchstart"];
    const removeListeners = () =>
      events.forEach((e) => window.removeEventListener(e, startOnInteract));

    function startOnInteract() {
      audio.play().then(removeListeners).catch(() => {});
    }

    audio.play().catch(() => {
      events.forEach((e) => window.addEventListener(e, startOnInteract));
    });

    return removeListeners;
  }, []);

  function toggle(e) {
    e.stopPropagation();
    const audio = audioRef.current;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/meditation.mp3"
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className={`music-toggle ${playing ? "is-playing" : ""}`}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={toggle}
        aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
        title={playing ? "Tắt nhạc" : "Bật nhạc"}
      >
        <span className="bars" aria-hidden="true">
          <i /><i /><i /><i />
        </span>
      </button>
    </>
  );
}
