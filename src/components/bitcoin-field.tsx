/** Limited, tasteful floating Bitcoin coins drifting behind the UI. */
const coins = [
  { left: 6, size: 34, dur: 38, delay: -4, depth: "far" },
  { left: 18, size: 58, dur: 30, delay: -20, depth: "near" },
  { left: 34, size: 26, dur: 46, delay: -12, depth: "far" },
  { left: 57, size: 42, dur: 34, delay: -28, depth: "mid" },
  { left: 72, size: 24, dur: 50, delay: -6, depth: "far" },
  { left: 84, size: 64, dur: 28, delay: -15, depth: "near" },
  { left: 94, size: 32, dur: 42, delay: -33, depth: "mid" },
] as const;

function Coin({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id="btc-face" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FCE7B2" />
          <stop offset="45%" stopColor="#E0A546" />
          <stop offset="100%" stopColor="#8A5A1C" />
        </radialGradient>
        <linearGradient id="btc-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF1CC" />
          <stop offset="55%" stopColor="#B77A2A" />
          <stop offset="100%" stopColor="#5E3C12" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#btc-rim)" />
      <circle cx="32" cy="32" r="26" fill="url(#btc-face)" />
      <circle cx="32" cy="32" r="22.5" fill="none" stroke="#FFF3D6" strokeOpacity="0.35" />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontSize="28"
        fontWeight="700"
        fontFamily="Space Grotesk, sans-serif"
        fill="#FFF6E0"
        fillOpacity="0.92"
      >
        ₿
      </text>
      <ellipse cx="24" cy="18" rx="12" ry="5" fill="#FFFFFF" opacity="0.28" />
    </svg>
  );
}

export function BitcoinField() {
  return (
    <div className="bitcoin-field" aria-hidden="true">
      {coins.map((c, i) => (
        <span
          key={i}
          className={`btc-coin btc-${c.depth}`}
          style={{
            left: `${c.left}%`,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <span className="btc-spin" style={{ animationDuration: `${c.dur / 3}s` }}>
            <Coin size={c.size} />
          </span>
        </span>
      ))}
    </div>
  );
}
