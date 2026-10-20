// Một bông hoa: thân + lá vẽ SVG, đầu hoa là ảnh dựng sẵn.
// viewBox 100 x 200: đỉnh thân ở (50, 64), gốc ở đáy.

export function FlowerDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <linearGradient id="stem-g" gradientUnits="userSpaceOnUse" x1="45" y1="0" x2="55" y2="0">
          <stop offset="0" stopColor="#23561d" />
          <stop offset="0.45" stopColor="#62b14c" />
          <stop offset="1" stopColor="#285f22" />
        </linearGradient>
        <linearGradient id="leaf-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#77c45c" />
          <stop offset="0.5" stopColor="#3a8f35" />
          <stop offset="1" stopColor="#1c5420" />
        </linearGradient>
        <linearGradient id="sepal-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d8b37" />
          <stop offset="1" stopColor="#245a20" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Leaf({ x, y, rot, len = 44 }) {
  const k = len / 44;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${k})`}>
      <path d="M0 0 C10 -12 30 -14 44 -4 C30 7 12 9 0 0Z" fill="url(#leaf-g)" />
      <path d="M2 -0.5 C16 -6 30 -6 42 -4" stroke="#c4ecb0" strokeOpacity="0.55" strokeWidth="0.8" fill="none" />
    </g>
  );
}

export default function Flower({ type, img, lean = 0 }) {
  if (type === "baby") {
    return <img className="head head-baby" src={img} alt="" draggable="false" />;
  }
  const mx = 50 + lean;
  return (
    <>
      <svg viewBox="0 0 100 200" className="flower-svg" aria-hidden="true">
        <path d={`M50 64 Q${mx} 130 50 200`} stroke="url(#stem-g)" strokeWidth="4.6" fill="none" strokeLinecap="round" />
        {type === "lily" ? (
          <>
            <Leaf x={50 + lean * 0.5} y={120} rot={-60} len={52} />
            <Leaf x={50 + lean * 0.4} y={140} rot={-125} len={50} />
            <Leaf x={50 + lean * 0.25} y={165} rot={-55} len={48} />
          </>
        ) : (
          <>
            <Leaf x={50 + lean * 0.55} y={122} rot={-36} len={50} />
            <Leaf x={50 + lean * 0.35} y={150} rot={205} len={46} />
            <Leaf x={50 + lean * 0.2} y={176} rot={-30} len={40} />
          </>
        )}
        {(type === "rose" || type === "peony") &&
          [-60, 0, 60].map((a) => (
            <path
              key={a}
              d="M0 0 C-4 6 -2 16 0 20 C2 16 4 6 0 0Z"
              fill="url(#sepal-g)"
              transform={`translate(50 52) rotate(${a + 180})`}
            />
          ))}
      </svg>
      <img className={`head head-${type}`} src={img} alt="" draggable="false" />
    </>
  );
}
