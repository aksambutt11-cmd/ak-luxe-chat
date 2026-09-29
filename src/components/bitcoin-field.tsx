/** Floating Bitcoins and other crypto coins drifting specifically behind the chat interface. */
const coinTypes = [
  { symbol: "₿", name: "Bitcoin", face: "#FCE7B2", mid: "#E0A546", dark: "#8A5A1C", rim: "#FFF1CC" },
  { symbol: "Ξ", name: "Ethereum", face: "#E2E8F0", mid: "#818CF8", dark: "#312E81", rim: "#C7D2FE" },
  { symbol: "◎", name: "Solana", face: "#D1FAE5", mid: "#10B981", dark: "#065F46", rim: "#A7F3D0" },
  { symbol: "₮", name: "Tether", face: "#CCFBF1", mid: "#14B8A6", dark: "#134E4A", rim: "#99F6E4" },
  { symbol: "Ⓑ", name: "BNB", face: "#FEF3C7", mid: "#F59E0B", dark: "#78350F", rim: "#FDE68A" },
  { symbol: "Ð", name: "Dogecoin", face: "#FEF08A", mid: "#CA8A04", dark: "#713F12", rim: "#FEF08A" },
] as const;

const coins = [
  { typeIndex: 0, left: 8, size: 34, dur: 36, delay: -3, depth: "far" },
  { typeIndex: 1, left: 22, size: 50, dur: 30, delay: -16, depth: "near" },
  { typeIndex: 2, left: 38, size: 26, dur: 44, delay: -10, depth: "far" },
  { typeIndex: 3, left: 54, size: 44, dur: 28, delay: -22, depth: "mid" },
  { typeIndex: 4, left: 68, size: 36, dur: 38, delay: -6, depth: "far" },
  { typeIndex: 5, left: 82, size: 56, dur: 26, delay: -12, depth: "near" },
  { typeIndex: 0, left: 91, size: 30, dur: 40, delay: -28, depth: "mid" },
] as const;

function CoinItem({ typeIndex, size }: { typeIndex: number; size: number }) {
  const coin = coinTypes[typeIndex % coinTypes.length]!;
  const gradId = `chat-coin-face-${typeIndex}-${size}`;
  const rimId = `chat-coin-rim-${typeIndex}-${size}`;

  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={gradId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor={coin.face} />
          <stop offset="45%" stopColor={coin.mid} />
          <stop offset="100%" stopColor={coin.dark} />
        </radialGradient>
        <linearGradient id={rimId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={coin.rim} />
          <stop offset="55%" stopColor={coin.mid} />
          <stop offset="100%" stopColor={coin.dark} />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill={`url(#${rimId})`} />
      <circle cx="32" cy="32" r="26" fill={`url(#${gradId})`} />
      <circle cx="32" cy="32" r="22.5" fill="none" stroke={coin.rim} strokeOpacity="0.4" />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontSize="26"
        fontWeight="700"
        fontFamily="Space Grotesk, sans-serif"
        fill="#FFFFFF"
        fillOpacity="0.95"
      >
        {coin.symbol}
      </text>
      <ellipse cx="24" cy="18" rx="12" ry="5" fill="#FFFFFF" opacity="0.3" />
    </svg>
  );
}

export interface BitcoinFieldProps {
  className?: string;
}

export function BitcoinField({ className = "bitcoin-field" }: BitcoinFieldProps) {
  return (
    <div className={className} aria-hidden="true">
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
            <CoinItem typeIndex={c.typeIndex} size={c.size} />
          </span>
        </span>
      ))}
    </div>
  );
}
