import React from "react";

/**
 * Floating Bitcoins, Ethereum, Solana, and other major crypto coins
 * flowing smoothly across the UI with 3D metallic rendering and ambient glow.
 */
const coinTypes = [
  { symbol: "₿", name: "Bitcoin", face: "#FCE7B2", mid: "#E0A546", dark: "#8A5A1C", rim: "#FFF1CC", glow: "rgba(245, 158, 11, 0.45)" },
  { symbol: "Ξ", name: "Ethereum", face: "#E2E8F0", mid: "#818CF8", dark: "#312E81", rim: "#C7D2FE", glow: "rgba(99, 102, 241, 0.45)" },
  { symbol: "◎", name: "Solana", face: "#D1FAE5", mid: "#10B981", dark: "#065F46", rim: "#A7F3D0", glow: "rgba(16, 185, 129, 0.45)" },
  { symbol: "₮", name: "Tether", face: "#CCFBF1", mid: "#14B8A6", dark: "#134E4A", rim: "#99F6E4", glow: "rgba(20, 184, 166, 0.45)" },
  { symbol: "Ⓑ", name: "BNB", face: "#FEF3C7", mid: "#F59E0B", dark: "#78350F", rim: "#FDE68A", glow: "rgba(245, 158, 11, 0.45)" },
  { symbol: "Ð", name: "Dogecoin", face: "#FEF08A", mid: "#CA8A04", dark: "#713F12", rim: "#FEF08A", glow: "rgba(234, 179, 8, 0.45)" },
  { symbol: "₳", name: "Cardano", face: "#E0F2FE", mid: "#0284C7", dark: "#075985", rim: "#BAE6FD", glow: "rgba(2, 132, 199, 0.45)" },
  { symbol: "🔺", name: "Avalanche", face: "#FEE2E2", mid: "#EF4444", dark: "#991B1B", rim: "#FECACA", glow: "rgba(239, 68, 68, 0.45)" },
  { symbol: "⬡", name: "Chainlink", face: "#DBEAFE", mid: "#2563EB", dark: "#1E40AF", rim: "#BFDBFE", glow: "rgba(37, 99, 235, 0.45)" },
  { symbol: "✕", name: "XRP", face: "#F1F5F9", mid: "#475569", dark: "#0F172A", rim: "#E2E8F0", glow: "rgba(71, 85, 105, 0.45)" },
] as const;

const coins = [
  { typeIndex: 0, left: 4, size: 42, dur: 28, delay: -2, depth: "near", direction: "fall" },
  { typeIndex: 1, left: 16, size: 54, dur: 32, delay: -14, depth: "near", direction: "rise" },
  { typeIndex: 2, left: 27, size: 30, dur: 38, delay: -8, depth: "far", direction: "fall" },
  { typeIndex: 3, left: 36, size: 46, dur: 26, delay: -19, depth: "mid", direction: "fall" },
  { typeIndex: 4, left: 45, size: 36, dur: 42, delay: -5, depth: "far", direction: "rise" },
  { typeIndex: 5, left: 55, size: 58, dur: 24, delay: -11, depth: "near", direction: "fall" },
  { typeIndex: 6, left: 64, size: 32, dur: 36, delay: -22, depth: "mid", direction: "rise" },
  { typeIndex: 7, left: 73, size: 48, dur: 30, delay: -16, depth: "near", direction: "fall" },
  { typeIndex: 8, left: 83, size: 34, dur: 40, delay: -9, depth: "far", direction: "fall" },
  { typeIndex: 9, left: 91, size: 50, dur: 29, delay: -25, depth: "near", direction: "rise" },
  { typeIndex: 0, left: 20, size: 38, dur: 34, delay: -18, depth: "mid", direction: "fall" },
  { typeIndex: 1, left: 60, size: 40, dur: 31, delay: -7, depth: "mid", direction: "rise" },
  { typeIndex: 2, left: 80, size: 28, dur: 44, delay: -30, depth: "far", direction: "fall" },
  { typeIndex: 5, left: 96, size: 36, dur: 35, delay: -12, depth: "far", direction: "fall" },
] as const;

function CoinItem({ typeIndex, size }: { typeIndex: number; size: number }) {
  const coin = coinTypes[typeIndex % coinTypes.length]!;
  const gradId = `coin-face-${typeIndex}-${size}`;
  const rimId = `coin-rim-${typeIndex}-${size}`;
  const glowId = `coin-glow-${typeIndex}-${size}`;

  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className="overflow-visible">
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
        <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer ambient glow ring */}
      <circle cx="32" cy="32" r="31" fill={coin.glow} opacity="0.35" />

      {/* Minted metallic coin body */}
      <circle cx="32" cy="32" r="29" fill={`url(#${rimId})`} filter={`url(#${glowId})`} />
      <circle cx="32" cy="32" r="25" fill={`url(#${gradId})`} />
      <circle cx="32" cy="32" r="21.5" fill="none" stroke={coin.rim} strokeOpacity="0.5" strokeWidth="1" />

      {/* Symbol in center */}
      <text
        x="32"
        y="41"
        textAnchor="middle"
        fontSize="25"
        fontWeight="800"
        fontFamily="Space Grotesk, sans-serif"
        fill="#FFFFFF"
        fillOpacity="0.98"
        style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))" }}
      >
        {coin.symbol}
      </text>

      {/* Glass specular glare curve */}
      <ellipse cx="23" cy="17" rx="11" ry="4.5" fill="#FFFFFF" opacity="0.4" />
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
          className={`btc-coin btc-${c.depth} btc-dir-${c.direction}`}
          style={{
            left: `${c.left}%`,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <span className="btc-spin" style={{ animationDuration: `${c.dur / 3.5}s` }}>
            <CoinItem typeIndex={c.typeIndex} size={c.size} />
          </span>
        </span>
      ))}
    </div>
  );
}
