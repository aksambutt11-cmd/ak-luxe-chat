import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { A as ArrowRight, C as CodeXml, D as Bot, E as ChartColumn, M as ArrowDownUp, N as Activity, O as Bookmark, S as Copy, T as ChartLine, _ as Image, a as TrendingUp, b as FileUp, c as ShieldCheck, d as Plus, f as Paperclip, g as Layers, h as LayoutDashboard, i as Volume2, j as ArrowLeftRight, k as ArrowUp, l as ShieldAlert, m as LoaderCircle, n as Wallet, o as Trash, p as Mic, r as VolumeX, s as Sparkles, t as X, u as Settings, v as Globe, w as ChevronDown, x as Cpu, y as Flame } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { n as twMerge, t as Xa } from "../_libs/streamdown+[...].mjs";
import { t as A } from "../_libs/@streamdown/cjk+[...].mjs";
import { t as G } from "../_libs/shiki+streamdown__code.mjs";
import { t as h } from "../_libs/@streamdown/math+[...].mjs";
import { t as f } from "../_libs/@streamdown/mermaid+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DML1p-wq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ParticleEngine({ className = "network-field", physicsEnabled = true }) {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;
		let w = canvas.width = window.innerWidth;
		let h = canvas.height = window.innerHeight;
		const handleResize = () => {
			if (!canvas) return;
			w = canvas.width = window.innerWidth;
			h = canvas.height = window.innerHeight;
		};
		window.addEventListener("resize", handleResize);
		const coins = [
			{
				symbol: "₿",
				color: "#f59e0b",
				bg: "rgba(245, 158, 11, 0.14)"
			},
			{
				symbol: "Ξ",
				color: "#6366f1",
				bg: "rgba(99, 102, 241, 0.14)"
			},
			{
				symbol: "◎",
				color: "#14f195",
				bg: "rgba(20, 241, 149, 0.14)"
			},
			{
				symbol: "⬡",
				color: "#3b82f6",
				bg: "rgba(59, 130, 246, 0.14)"
			},
			{
				symbol: "⚡",
				color: "#ec4899",
				bg: "rgba(236, 72, 153, 0.14)"
			},
			{
				symbol: "🫧",
				color: "#38bdf8",
				bg: "rgba(56, 189, 248, 0.15)"
			}
		];
		const particles = [];
		for (let i = 0; i < 24; i++) {
			const coin = coins[i % coins.length];
			particles.push({
				x: Math.random() * w,
				y: Math.random() * h,
				radius: Math.random() * 15 + 13,
				symbol: coin.symbol,
				color: coin.color,
				bg: coin.bg,
				vx: (Math.random() - .5) * .45,
				vy: -Math.random() * .35 - .12,
				floatOffset: Math.random() * Math.PI * 2
			});
		}
		const meshPoints = [];
		for (let i = 0; i < 28; i++) meshPoints.push({
			x: Math.random() * w,
			y: Math.random() * h,
			vx: (Math.random() - .5) * .25,
			vy: -Math.random() * .2 - .05
		});
		const rightConstellation = [
			{
				id: "btc",
				symbol: "₿",
				color: "#f59e0b",
				baseX: 160,
				baseY: .22,
				size: 20,
				angle: 0
			},
			{
				id: "eth",
				symbol: "Ξ",
				color: "#6366f1",
				baseX: 85,
				baseY: .42,
				size: 18,
				angle: 1.2
			},
			{
				id: "sol",
				symbol: "◎",
				color: "#14f195",
				baseX: 195,
				baseY: .58,
				size: 17,
				angle: 2.4
			},
			{
				id: "pol",
				symbol: "⬡",
				color: "#3b82f6",
				baseX: 95,
				baseY: .76,
				size: 16,
				angle: 3.8
			},
			{
				id: "ai",
				symbol: "⚡",
				color: "#38bdf8",
				baseX: 155,
				baseY: .88,
				size: 15,
				angle: 5.1
			}
		];
		let mouseX = -1e3;
		let mouseY = -1e3;
		const handleMouseMove = (e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		};
		window.addEventListener("mousemove", handleMouseMove);
		let animId = 0;
		let time = 0;
		function animate() {
			if (!ctx) return;
			ctx.clearRect(0, 0, w, h);
			time += .015;
			if (physicsEnabled) {
				meshPoints.forEach((pt) => {
					pt.x += pt.vx;
					pt.y += pt.vy;
					if (pt.y < -10) {
						pt.y = h + 10;
						pt.x = Math.random() * w;
					}
					if (pt.x < -10) pt.x = w + 10;
					if (pt.x > w + 10) pt.x = -10;
				});
				ctx.lineWidth = .75;
				for (let i = 0; i < meshPoints.length; i++) for (let j = i + 1; j < meshPoints.length; j++) {
					const p1 = meshPoints[i];
					const p2 = meshPoints[j];
					const dx = p1.x - p2.x;
					const dy = p1.y - p2.y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < 120) {
						const alpha = (1 - dist / 120) * .07;
						ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
						ctx.beginPath();
						ctx.moveTo(p1.x, p1.y);
						ctx.lineTo(p2.x, p2.y);
						ctx.stroke();
					}
				}
				meshPoints.forEach((pt) => {
					ctx.beginPath();
					ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
					ctx.fillStyle = "rgba(59, 130, 246, 0.12)";
					ctx.fill();
				});
				particles.forEach((p) => {
					p.x += p.vx + Math.sin(p.floatOffset) * .3;
					p.y += p.vy;
					p.floatOffset += .015;
					if (p.y < -50) {
						p.y = h + 50;
						p.x = Math.random() * w;
					}
					if (p.x < -50) p.x = w + 50;
					if (p.x > w + 50) p.x = -50;
					const dx = mouseX - p.x;
					const dy = mouseY - p.y;
					if (Math.sqrt(dx * dx + dy * dy) < 110) {
						const angle = Math.atan2(dy, dx);
						p.x -= Math.cos(angle) * 1.8;
						p.y -= Math.sin(angle) * 1.8;
					}
					ctx.save();
					ctx.beginPath();
					ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
					ctx.fillStyle = p.bg;
					ctx.fill();
					ctx.lineWidth = 1;
					ctx.strokeStyle = p.color + "55";
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(p.x - p.radius * .3, p.y - p.radius * .3, p.radius * .35, 0, Math.PI * 2);
					ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
					ctx.fill();
					ctx.fillStyle = p.color;
					ctx.font = `bold ${Math.round(p.radius * .8)}px 'Plus Jakarta Sans', sans-serif`;
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.fillText(p.symbol, p.x, p.y);
					ctx.restore();
				});
				if (w > 1024) {
					const rightNodesPos = [];
					const parallaxX = (mouseX / w - .5) * 16;
					const parallaxY = (mouseY / h - .5) * 16;
					rightConstellation.forEach((node) => {
						const nodeX = w - node.baseX + Math.sin(time + node.angle) * 12 + parallaxX;
						const nodeY = h * node.baseY + Math.cos(time + node.angle) * 14 + parallaxY;
						rightNodesPos.push({
							x: nodeX,
							y: nodeY,
							node
						});
					});
					for (let i = 0; i < rightNodesPos.length; i++) for (let j = i + 1; j < rightNodesPos.length; j++) {
						const n1 = rightNodesPos[i];
						const n2 = rightNodesPos[j];
						const dx = n1.x - n2.x;
						const dy = n1.y - n2.y;
						const dist = Math.sqrt(dx * dx + dy * dy);
						if (dist < 260) {
							const alpha = (1 - dist / 260) * .22;
							ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
							ctx.lineWidth = 1.2;
							ctx.beginPath();
							ctx.moveTo(n1.x, n1.y);
							ctx.lineTo(n2.x, n2.y);
							ctx.stroke();
							const pulsePos = (time * .4 + i * .3) % 1;
							const px = n1.x + (n2.x - n1.x) * pulsePos;
							const py = n1.y + (n2.y - n1.y) * pulsePos;
							ctx.beginPath();
							ctx.arc(px, py, 2, 0, Math.PI * 2);
							ctx.fillStyle = "rgba(56, 189, 248, 0.6)";
							ctx.fill();
						}
					}
					rightNodesPos.forEach(({ x, y, node }) => {
						ctx.save();
						const nodeGrad = ctx.createRadialGradient(x, y, 2, x, y, node.size * 1.6);
						nodeGrad.addColorStop(0, node.color + "33");
						nodeGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
						ctx.fillStyle = nodeGrad;
						ctx.beginPath();
						ctx.arc(x, y, node.size * 1.6, 0, Math.PI * 2);
						ctx.fill();
						ctx.beginPath();
						ctx.arc(x, y, node.size, 0, Math.PI * 2);
						ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
						ctx.fill();
						ctx.lineWidth = 1.5;
						ctx.strokeStyle = node.color + "99";
						ctx.stroke();
						ctx.beginPath();
						ctx.arc(x - node.size * .3, y - node.size * .3, node.size * .35, 0, Math.PI * 2);
						ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
						ctx.fill();
						ctx.fillStyle = node.color;
						ctx.font = `bold ${Math.round(node.size * .95)}px 'Plus Jakarta Sans', sans-serif`;
						ctx.textAlign = "center";
						ctx.textBaseline = "middle";
						ctx.fillText(node.symbol, x, y);
						ctx.restore();
					});
				}
			}
			animId = requestAnimationFrame(animate);
		}
		animate();
		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [physicsEnabled]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		id: "bgCanvas",
		ref: canvasRef,
		className,
		"aria-hidden": "true"
	});
}
/** Floating Bitcoins and other crypto coins drifting specifically behind the chat interface. */
var coinTypes = [
	{
		symbol: "₿",
		name: "Bitcoin",
		face: "#FCE7B2",
		mid: "#E0A546",
		dark: "#8A5A1C",
		rim: "#FFF1CC"
	},
	{
		symbol: "Ξ",
		name: "Ethereum",
		face: "#E2E8F0",
		mid: "#818CF8",
		dark: "#312E81",
		rim: "#C7D2FE"
	},
	{
		symbol: "◎",
		name: "Solana",
		face: "#D1FAE5",
		mid: "#10B981",
		dark: "#065F46",
		rim: "#A7F3D0"
	},
	{
		symbol: "₮",
		name: "Tether",
		face: "#CCFBF1",
		mid: "#14B8A6",
		dark: "#134E4A",
		rim: "#99F6E4"
	},
	{
		symbol: "Ⓑ",
		name: "BNB",
		face: "#FEF3C7",
		mid: "#F59E0B",
		dark: "#78350F",
		rim: "#FDE68A"
	},
	{
		symbol: "Ð",
		name: "Dogecoin",
		face: "#FEF08A",
		mid: "#CA8A04",
		dark: "#713F12",
		rim: "#FEF08A"
	}
];
var coins = [
	{
		typeIndex: 0,
		left: 8,
		size: 34,
		dur: 36,
		delay: -3,
		depth: "far"
	},
	{
		typeIndex: 1,
		left: 22,
		size: 50,
		dur: 30,
		delay: -16,
		depth: "near"
	},
	{
		typeIndex: 2,
		left: 38,
		size: 26,
		dur: 44,
		delay: -10,
		depth: "far"
	},
	{
		typeIndex: 3,
		left: 54,
		size: 44,
		dur: 28,
		delay: -22,
		depth: "mid"
	},
	{
		typeIndex: 4,
		left: 68,
		size: 36,
		dur: 38,
		delay: -6,
		depth: "far"
	},
	{
		typeIndex: 5,
		left: 82,
		size: 56,
		dur: 26,
		delay: -12,
		depth: "near"
	},
	{
		typeIndex: 0,
		left: 91,
		size: 30,
		dur: 40,
		delay: -28,
		depth: "mid"
	}
];
function CoinItem({ typeIndex, size }) {
	const coin = coinTypes[typeIndex % coinTypes.length];
	const gradId = `chat-coin-face-${typeIndex}-${size}`;
	const rimId = `chat-coin-rim-${typeIndex}-${size}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		width: size,
		height: size,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
				id: gradId,
				cx: "35%",
				cy: "30%",
				r: "75%",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: coin.face
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "45%",
						stopColor: coin.mid
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: coin.dark
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: rimId,
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: coin.rim
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "55%",
						stopColor: coin.mid
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: coin.dark
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "32",
				r: "30",
				fill: `url(#${rimId})`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "32",
				r: "26",
				fill: `url(#${gradId})`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "32",
				r: "22.5",
				fill: "none",
				stroke: coin.rim,
				strokeOpacity: "0.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "32",
				y: "42",
				textAnchor: "middle",
				fontSize: "26",
				fontWeight: "700",
				fontFamily: "Space Grotesk, sans-serif",
				fill: "#FFFFFF",
				fillOpacity: "0.95",
				children: coin.symbol
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "24",
				cy: "18",
				rx: "12",
				ry: "5",
				fill: "#FFFFFF",
				opacity: "0.3"
			})
		]
	});
}
function BitcoinField({ className = "bitcoin-field" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className,
		"aria-hidden": "true",
		children: coins.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `btc-coin btc-${c.depth}`,
			style: {
				left: `${c.left}%`,
				animationDuration: `${c.dur}s`,
				animationDelay: `${c.delay}s`
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "btc-spin",
				style: { animationDuration: `${c.dur / 3}s` },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinItem, {
					typeIndex: c.typeIndex,
					size: c.size
				})
			})
		}, i))
	});
}
var tickerData = [
	{
		pair: "BTC/USD",
		price: "$98,420.50",
		change: "+3.4%",
		positive: true
	},
	{
		pair: "ETH/USD",
		price: "$3,450.20",
		change: "+1.8%",
		positive: true
	},
	{
		pair: "SOL/USD",
		price: "$212.80",
		change: "-0.6%",
		positive: false
	},
	{
		pair: "Gas Fee",
		price: "12 Gwei",
		change: "(Optimal)",
		labelOnly: true
	},
	{
		pair: "Fear & Greed",
		price: "82",
		change: "Extreme Greed",
		greed: true
	},
	{
		pair: "BNB/USD",
		price: "$645.10",
		change: "+2.1%",
		positive: true
	},
	{
		pair: "AVAX/USD",
		price: "$38.90",
		change: "+4.2%",
		positive: true
	},
	{
		pair: "SUI/USD",
		price: "$3.45",
		change: "+5.6%",
		positive: true
	}
];
function MarketTicker() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "relative z-20 w-full apple-glass border-b border-white/60 py-1.5 px-4 overflow-hidden flex items-center shrink-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 pr-4 border-r border-slate-300/40 shrink-0 z-10 bg-white/30 backdrop-blur-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }), " Telemetry"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden w-full relative",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ticker-marquee-track flex gap-8 text-xs font-medium text-slate-700 dark:text-slate-200 items-center",
				children: [tickerData.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-slate-900 dark:text-white",
							children: item.pair
						}),
						" ",
						item.price,
						" ",
						item.labelOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-500 text-[11px]",
							children: item.change
						}) : item.greed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-emerald-700 font-semibold text-[11px] bg-amber-400/20 px-1.5 py-0.5 rounded-full",
							children: item.change
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-semibold text-[11px] px-1.5 py-0.5 rounded-full ${item.positive ? "text-emerald-600 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"}`,
							children: item.change
						})
					]
				}, `t1-${index}`)), tickerData.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-slate-900 dark:text-white",
							children: item.pair
						}),
						" ",
						item.price,
						" ",
						item.labelOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-500 text-[11px]",
							children: item.change
						}) : item.greed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-emerald-700 font-semibold text-[11px] bg-amber-400/20 px-1.5 py-0.5 rounded-full",
							children: item.change
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-semibold text-[11px] px-1.5 py-0.5 rounded-full ${item.positive ? "text-emerald-600 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"}`,
							children: item.change
						})
					]
				}, `t2-${index}`))]
			})
		})]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
(0, import_react.createContext)(null);
var streamdownPlugins = {
	cjk: A,
	code: G,
	math: h,
	mermaid: f
};
var MessageResponse = (0, import_react.memo)(({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Xa, {
	className: cn("size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", className),
	plugins: streamdownPlugins,
	...props
}), (prevProps, nextProps) => prevProps.children === nextProps.children && nextProps.isAnimating === prevProps.isAnimating);
MessageResponse.displayName = "MessageResponse";
function AntigravityHero({ onQuickPrompt }) {
	const canvasRef = (0, import_react.useRef)(null);
	const containerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;
		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;
		let w = canvas.width = container.clientWidth;
		let h = canvas.height = container.clientHeight;
		const handleResize = () => {
			if (!container || !canvas) return;
			w = canvas.width = container.clientWidth;
			h = canvas.height = container.clientHeight;
		};
		window.addEventListener("resize", handleResize);
		const nodes = [
			{
				symbol: "₿",
				color: "#f59e0b",
				glow: "rgba(245, 158, 11, 0.35)",
				size: 19,
				baseRelX: .12,
				baseRelY: .28
			},
			{
				symbol: "Ξ",
				color: "#6366f1",
				glow: "rgba(99, 102, 241, 0.35)",
				size: 18,
				baseRelX: .88,
				baseRelY: .24
			},
			{
				symbol: "◎",
				color: "#14f195",
				glow: "rgba(20, 241, 149, 0.35)",
				size: 16,
				baseRelX: .08,
				baseRelY: .72
			},
			{
				symbol: "⬡",
				color: "#3b82f6",
				glow: "rgba(59, 130, 246, 0.35)",
				size: 16,
				baseRelX: .92,
				baseRelY: .76
			},
			{
				symbol: "₮",
				color: "#22c55e",
				glow: "rgba(34, 197, 94, 0.35)",
				size: 15,
				baseRelX: .22,
				baseRelY: .88
			},
			{
				symbol: "⚡",
				color: "#ec4899",
				glow: "rgba(236, 72, 153, 0.35)",
				size: 15,
				baseRelX: .82,
				baseRelY: .86
			},
			{
				symbol: "🔺",
				color: "#ef4444",
				glow: "rgba(239, 68, 68, 0.35)",
				size: 14,
				baseRelX: .18,
				baseRelY: .14
			},
			{
				symbol: "🔗",
				color: "#0ea5e9",
				glow: "rgba(14, 165, 233, 0.35)",
				size: 14,
				baseRelX: .84,
				baseRelY: .12
			}
		].map((cfg) => ({
			symbol: cfg.symbol,
			color: cfg.color,
			glow: cfg.glow,
			size: cfg.size,
			x: cfg.baseRelX * w,
			y: cfg.baseRelY * h,
			baseX: cfg.baseRelX,
			baseY: cfg.baseRelY,
			vx: 0,
			vy: 0,
			pulsePhase: Math.random() * Math.PI * 2,
			ringAngle: Math.random() * Math.PI * 2
		}));
		const meshPoints = [];
		for (let i = 0; i < 22; i++) meshPoints.push({
			x: Math.random() * w,
			y: Math.random() * h,
			vx: (Math.random() - .5) * .35,
			vy: (Math.random() - .5) * .35
		});
		let mouseX = -1e3;
		let mouseY = -1e3;
		const handleMouseMove = (e) => {
			if (!container) return;
			const rect = container.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
		};
		const handleMouseLeave = () => {
			mouseX = -1e3;
			mouseY = -1e3;
		};
		container.addEventListener("mousemove", handleMouseMove);
		container.addEventListener("mouseleave", handleMouseLeave);
		let animId = 0;
		let time = 0;
		function render() {
			if (!ctx) return;
			ctx.clearRect(0, 0, w, h);
			time += .02;
			meshPoints.forEach((pt) => {
				pt.x += pt.vx;
				pt.y += pt.vy;
				if (pt.x < 0 || pt.x > w) pt.vx *= -1;
				if (pt.y < 0 || pt.y > h) pt.vy *= -1;
			});
			ctx.lineWidth = .8;
			for (let i = 0; i < meshPoints.length; i++) for (let j = i + 1; j < meshPoints.length; j++) {
				const p1 = meshPoints[i];
				const p2 = meshPoints[j];
				const dx = p1.x - p2.x;
				const dy = p1.y - p2.y;
				const dist = Math.hypot(dx, dy);
				if (dist < 95) {
					const alpha = (1 - dist / 95) * .15;
					ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
					ctx.beginPath();
					ctx.moveTo(p1.x, p1.y);
					ctx.lineTo(p2.x, p2.y);
					ctx.stroke();
				}
			}
			nodes.forEach((node, idx) => {
				const targetX = node.baseX * w + Math.sin(time + idx * 1.3) * 14;
				const targetY = node.baseY * h + Math.cos(time + idx * 1.5) * 11;
				node.pulsePhase += .03;
				node.ringAngle += .015;
				node.x += (targetX - node.x) * .05;
				node.y += (targetY - node.y) * .05;
				const dx = mouseX - node.x;
				const dy = mouseY - node.y;
				const dist = Math.hypot(dx, dy);
				if (dist < 110) {
					const force = (1 - dist / 110) * 2.8;
					const angle = Math.atan2(dy, dx);
					node.x -= Math.cos(angle) * force;
					node.y -= Math.sin(angle) * force;
				}
			});
			for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
				const n1 = nodes[i];
				const n2 = nodes[j];
				const dx = n1.x - n2.x;
				const dy = n1.y - n2.y;
				const dist = Math.hypot(dx, dy);
				if (dist < 230) {
					const alpha = (1 - dist / 230) * .28;
					ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
					ctx.lineWidth = 1.1;
					ctx.beginPath();
					ctx.moveTo(n1.x, n1.y);
					ctx.lineTo(n2.x, n2.y);
					ctx.stroke();
					const pulseT = (time * .6 + i * .3) % 1;
					const px = n1.x + (n2.x - n1.x) * pulseT;
					const py = n1.y + (n2.y - n1.y) * pulseT;
					ctx.beginPath();
					ctx.arc(px, py, 2.2, 0, Math.PI * 2);
					ctx.fillStyle = "rgba(56, 189, 248, 0.85)";
					ctx.fill();
				}
			}
			nodes.forEach((node) => {
				ctx.save();
				const pulse = 1 + Math.sin(node.pulsePhase) * .06;
				const curSize = node.size * pulse;
				const glowGrad = ctx.createRadialGradient(node.x, node.y, 2, node.x, node.y, curSize * 2.3);
				glowGrad.addColorStop(0, node.glow);
				glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
				ctx.fillStyle = glowGrad;
				ctx.beginPath();
				ctx.arc(node.x, node.y, curSize * 2.3, 0, Math.PI * 2);
				ctx.fill();
				ctx.save();
				ctx.translate(node.x, node.y);
				ctx.rotate(node.ringAngle);
				ctx.strokeStyle = node.color + "55";
				ctx.lineWidth = 1;
				ctx.setLineDash([3, 4]);
				ctx.beginPath();
				ctx.arc(0, 0, curSize * 1.45, 0, Math.PI * 2);
				ctx.stroke();
				ctx.restore();
				const sphereGrad = ctx.createRadialGradient(node.x - curSize * .3, node.y - curSize * .3, 1, node.x, node.y, curSize);
				sphereGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
				sphereGrad.addColorStop(.5, "rgba(255, 255, 255, 0.65)");
				sphereGrad.addColorStop(1, "rgba(235, 245, 255, 0.45)");
				ctx.beginPath();
				ctx.arc(node.x, node.y, curSize, 0, Math.PI * 2);
				ctx.fillStyle = sphereGrad;
				ctx.fill();
				ctx.lineWidth = 1.4;
				ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(node.x - curSize * .35, node.y - curSize * .35, curSize * .32, 0, Math.PI * 2);
				ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
				ctx.fill();
				ctx.fillStyle = node.color;
				ctx.font = `bold ${Math.round(curSize * .92)}px 'Plus Jakarta Sans', sans-serif`;
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillText(node.symbol, node.x, node.y + .5);
				ctx.restore();
			});
			animId = requestAnimationFrame(render);
		}
		render();
		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener("resize", handleResize);
			if (container) {
				container.removeEventListener("mousemove", handleMouseMove);
				container.removeEventListener("mouseleave", handleMouseLeave);
			}
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		className: "rounded-2xl sm:rounded-3xl p-3 sm:p-6 text-slate-800 text-xs sm:text-sm leading-relaxed max-w-2xl w-full relative overflow-hidden select-none transition-all duration-300 backdrop-blur-3xl bg-white/45 border border-white/80 shadow-[0_20px_50px_rgba(8,_112,_184,_0.08)] ring-1 ring-white/70 group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-white/40 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-400/15 blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-indigo-400/15 blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "absolute inset-0 w-full h-full pointer-events-none z-0 opacity-95"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 opacity-90 shadow-sm" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex flex-col items-center text-center space-y-2 sm:space-y-3 pt-0.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap sm:flex-nowrap items-center justify-center gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/60 backdrop-blur-2xl border border-white/90 shadow-[0_4px_16px_rgba(255,255,255,0.6)] ring-1 ring-white/60 max-w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-4 h-4 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "w-2.5 h-2.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[9.5px] sm:text-[11px] font-extrabold text-slate-900 tracking-tight flex items-center gap-1 sm:gap-1.5",
								children: [
									"AK Luxe ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-400 font-normal",
										children: "•"
									}),
									" Crypto Neural Engine"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-[8px] sm:text-[9px] font-extrabold text-emerald-700 bg-emerald-500/15 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-300/60 shadow-2xs shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" }), "Neural Sync Active"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1 sm:space-y-1.5 max-w-xl px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-base sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-[1.25] sm:leading-[1.2] drop-shadow-2xs",
							children: [
								"Experience institutional intelligence with the",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-600 bg-clip-text text-transparent",
									children: "crypto agent platform"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10.5px] sm:text-xs text-slate-600 font-medium",
							children: "Real-time on-chain telemetry, order book liquidation clusters, and risk audits."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full pt-2 sm:pt-3 mt-0.5 sm:mt-1 border-t border-white/50 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void onQuickPrompt("Analyze Bitcoin (BTC) liquidation clusters"),
								className: "px-2.5 sm:px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-bold text-blue-700 bg-white/55 hover:bg-white/80 border border-white/90 backdrop-blur-xl flex items-center gap-1 sm:gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-transform hover:scale-[1.02] active:scale-[0.98]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600 shrink-0" }), " BTC Liquidation Clusters"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void onQuickPrompt("Ethereum (ETH) staking yield telemetry"),
								className: "px-2.5 sm:px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-bold text-indigo-700 bg-white/55 hover:bg-white/80 border border-white/90 backdrop-blur-xl flex items-center gap-1 sm:gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-transform hover:scale-[1.02] active:scale-[0.98]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-500 shrink-0" }), " ETH Staking Yields"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void onQuickPrompt("Audit whale order flows and counterparty risk"),
								className: "px-2.5 sm:px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-bold text-slate-800 bg-white/55 hover:bg-white/80 border border-white/90 backdrop-blur-xl flex items-center gap-1 sm:gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-transform hover:scale-[1.02] active:scale-[0.98]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" }), " Whale Flow & Risk"]
							})
						]
					})
				]
			})
		]
	});
}
function LiveCryptoChart({ asset, timeframe, onPriceUpdate }) {
	const canvasRef = (0, import_react.useRef)(null);
	const containerRef = (0, import_react.useRef)(null);
	const [chartType, setChartType] = (0, import_react.useState)("area");
	const [showEMA, setShowEMA] = (0, import_react.useState)(true);
	const [showVolume, setShowVolume] = (0, import_react.useState)(true);
	const [hoverData, setHoverData] = (0, import_react.useState)({
		candle: null,
		x: -1,
		y: -1
	});
	const assetConfig = (0, import_react.useMemo)(() => {
		switch (asset) {
			case "BTC": return {
				basePrice: 93840,
				volatility: 85,
				decimals: 2,
				color: "#f59e0b",
				fillGrad: "rgba(245, 158, 11, 0.25)",
				name: "Bitcoin"
			};
			case "ETH": return {
				basePrice: 3385,
				volatility: 5.5,
				decimals: 2,
				color: "#6366f1",
				fillGrad: "rgba(99, 102, 241, 0.25)",
				name: "Ethereum"
			};
			case "SOL": return {
				basePrice: 188.4,
				volatility: .85,
				decimals: 2,
				color: "#10b981",
				fillGrad: "rgba(16, 185, 129, 0.25)",
				name: "Solana"
			};
		}
	}, [asset]);
	const candlesRef = (0, import_react.useRef)([]);
	const latestPriceRef = (0, import_react.useRef)(assetConfig.basePrice);
	const [currentLivePrice, setCurrentLivePrice] = (0, import_react.useState)(assetConfig.basePrice);
	const [priceFlash, setPriceFlash] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const count = timeframe === "1D" ? 48 : timeframe === "1W" ? 42 : 36;
		const now = Date.now();
		const intervalMs = timeframe === "1D" ? 18e5 : timeframe === "1W" ? 144e5 : 864e5;
		let price = assetConfig.basePrice * (timeframe === "1M" ? .82 : timeframe === "1W" ? .91 : .97);
		const generated = [];
		for (let i = count; i >= 0; i--) {
			const t = now - i * intervalMs;
			const date = new Date(t);
			const timeLabel = timeframe === "1D" ? `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}` : timeframe === "1W" ? date.toLocaleDateString("en-US", {
				weekday: "short",
				hour: "2-digit"
			}) : date.toLocaleDateString("en-US", {
				month: "short",
				day: "numeric"
			});
			const drift = (Math.random() - .46) * assetConfig.volatility * (timeframe === "1M" ? 2.8 : 1.2);
			const open = price;
			const close = Math.max(price * .5, open + drift);
			const high = Math.max(open, close) + Math.random() * assetConfig.volatility * .9;
			const low = Math.min(open, close) - Math.random() * assetConfig.volatility * .9;
			const volume = Math.floor(Math.random() * 800 + 150);
			generated.push({
				time: t,
				timeLabel,
				open,
				high,
				low,
				close,
				volume
			});
			price = close;
		}
		candlesRef.current = generated;
		latestPriceRef.current = price;
		setCurrentLivePrice(price);
	}, [
		asset,
		timeframe,
		assetConfig
	]);
	(0, import_react.useEffect)(() => {
		const tickInterval = setInterval(() => {
			if (candlesRef.current.length === 0) return;
			const delta = (Math.random() - .48) * (assetConfig.volatility * .28);
			const lastCandle = candlesRef.current[candlesRef.current.length - 1];
			const newClose = Math.round((lastCandle.close + delta) * 100) / 100;
			lastCandle.close = newClose;
			lastCandle.high = Math.max(lastCandle.high, newClose);
			lastCandle.low = Math.min(lastCandle.low, newClose);
			lastCandle.volume += Math.floor(Math.random() * 8 + 1);
			latestPriceRef.current = newClose;
			setCurrentLivePrice(newClose);
			setPriceFlash(delta >= 0 ? "up" : "down");
			setTimeout(() => setPriceFlash(null), 400);
			if (onPriceUpdate) {
				const sign = delta >= 0 ? "+" : "";
				onPriceUpdate(`$${newClose.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, `${sign}${delta.toFixed(2)}`);
			}
		}, 750);
		return () => clearInterval(tickInterval);
	}, [assetConfig, onPriceUpdate]);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;
		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;
		let animId = 0;
		const render = () => {
			const w = canvas.width = container.clientWidth;
			const h = canvas.height = container.clientHeight;
			ctx.clearRect(0, 0, w, h);
			const candles = candlesRef.current;
			if (candles.length < 2) {
				animId = requestAnimationFrame(render);
				return;
			}
			const padRight = 65;
			const padBottom = 26;
			const padTop = 22;
			const padLeft = 14;
			const chartW = w - padLeft - padRight;
			const chartH = h - padTop - padBottom;
			let minPrice = Infinity;
			let maxPrice = -Infinity;
			let maxVol = 0;
			candles.forEach((c) => {
				if (c.low < minPrice) minPrice = c.low;
				if (c.high > maxPrice) maxPrice = c.high;
				if (c.volume > maxVol) maxVol = c.volume;
			});
			const priceRange = maxPrice - minPrice || 1;
			minPrice -= priceRange * .04;
			maxPrice += priceRange * .04;
			const finalRange = maxPrice - minPrice;
			const getY = (priceVal) => {
				return padTop + chartH - (priceVal - minPrice) / finalRange * chartH;
			};
			const getX = (idx) => {
				return padLeft + chartW / (candles.length - 1) * idx;
			};
			const gridSteps = 5;
			ctx.lineWidth = .8;
			ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
			ctx.setLineDash([3, 3]);
			for (let i = 0; i <= gridSteps; i++) {
				const pVal = minPrice + finalRange / gridSteps * i;
				const y = getY(pVal);
				ctx.beginPath();
				ctx.moveTo(padLeft, y);
				ctx.lineTo(w - padRight, y);
				ctx.stroke();
				ctx.fillStyle = "rgba(148, 163, 184, 0.75)";
				ctx.font = "10px 'JetBrains Mono', monospace";
				ctx.textAlign = "left";
				ctx.textBaseline = "middle";
				ctx.fillText(`$${pVal.toLocaleString("en-US", { maximumFractionDigits: assetConfig.decimals })}`, w - padRight + 6, y);
			}
			ctx.setLineDash([]);
			const timeSteps = 6;
			ctx.fillStyle = "rgba(148, 163, 184, 0.75)";
			ctx.font = "10px 'JetBrains Mono', monospace";
			ctx.textAlign = "center";
			ctx.textBaseline = "top";
			for (let i = 0; i < timeSteps; i++) {
				const candleIdx = Math.floor((candles.length - 1) * (i / 5));
				const candle = candles[candleIdx];
				if (candle) {
					const x = getX(candleIdx);
					ctx.fillText(candle.timeLabel, x, h - padBottom + 6);
				}
			}
			if (showVolume && maxVol > 0) {
				const volAreaH = chartH * .22;
				const candleW = Math.max(2, chartW / candles.length * .65);
				candles.forEach((c, idx) => {
					const x = getX(idx);
					const barH = c.volume / maxVol * volAreaH;
					const y = padTop + chartH - barH;
					const isGreen = c.close >= c.open;
					ctx.fillStyle = isGreen ? "rgba(16, 185, 129, 0.22)" : "rgba(239, 68, 68, 0.22)";
					ctx.fillRect(x - candleW / 2, y, candleW, barH);
				});
			}
			if (showEMA && candles.length > 5) {
				const k = 2 / 15;
				let ema = candles[0].close;
				const emaPoints = [];
				candles.forEach((c, idx) => {
					ema = c.close * k + ema * .8666666666666667;
					emaPoints.push({
						x: getX(idx),
						y: getY(ema)
					});
				});
				ctx.beginPath();
				ctx.moveTo(emaPoints[0].x, emaPoints[0].y);
				for (let i = 1; i < emaPoints.length; i++) ctx.lineTo(emaPoints[i].x, emaPoints[i].y);
				ctx.strokeStyle = "rgba(245, 158, 11, 0.55)";
				ctx.lineWidth = 1.4;
				ctx.stroke();
			}
			if (chartType === "candlestick") {
				const candleW = Math.max(3, chartW / candles.length * .7);
				candles.forEach((c, idx) => {
					const x = getX(idx);
					const isUp = c.close >= c.open;
					const strokeCol = isUp ? "#10b981" : "#ef4444";
					const fillCol = isUp ? "rgba(16, 185, 129, 0.85)" : "rgba(239, 68, 68, 0.85)";
					ctx.beginPath();
					ctx.moveTo(x, getY(c.high));
					ctx.lineTo(x, getY(c.low));
					ctx.strokeStyle = strokeCol;
					ctx.lineWidth = 1.2;
					ctx.stroke();
					const yOpen = getY(c.open);
					const yClose = getY(c.close);
					const topY = Math.min(yOpen, yClose);
					const bodyH = Math.max(2, Math.abs(yOpen - yClose));
					ctx.fillStyle = fillCol;
					ctx.fillRect(x - candleW / 2, topY, candleW, bodyH);
					ctx.strokeStyle = strokeCol;
					ctx.strokeRect(x - candleW / 2, topY, candleW, bodyH);
				});
			} else {
				const points = candles.map((c, idx) => ({
					x: getX(idx),
					y: getY(c.close)
				}));
				const grad = ctx.createLinearGradient(0, padTop, 0, padTop + chartH);
				grad.addColorStop(0, assetConfig.fillGrad);
				grad.addColorStop(.7, "rgba(59, 130, 246, 0.05)");
				grad.addColorStop(1, "rgba(0, 0, 0, 0)");
				ctx.beginPath();
				ctx.moveTo(points[0].x, points[0].y);
				for (let i = 1; i < points.length; i++) {
					const cpX = (points[i - 1].x + points[i].x) / 2;
					const cpY = (points[i - 1].y + points[i].y) / 2;
					ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, cpX, cpY);
				}
				const lastP = points[points.length - 1];
				ctx.lineTo(lastP.x, lastP.y);
				ctx.lineTo(lastP.x, padTop + chartH);
				ctx.lineTo(points[0].x, padTop + chartH);
				ctx.closePath();
				ctx.fillStyle = grad;
				ctx.fill();
				ctx.beginPath();
				ctx.moveTo(points[0].x, points[0].y);
				for (let i = 1; i < points.length; i++) {
					const cpX = (points[i - 1].x + points[i].x) / 2;
					const cpY = (points[i - 1].y + points[i].y) / 2;
					ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, cpX, cpY);
				}
				ctx.lineTo(lastP.x, lastP.y);
				ctx.strokeStyle = assetConfig.color;
				ctx.lineWidth = 2.4;
				ctx.lineCap = "round";
				ctx.lineJoin = "round";
				ctx.stroke();
			}
			const lastCandle = candles[candles.length - 1];
			const lastX = getX(candles.length - 1);
			const lastY = getY(lastCandle.close);
			ctx.beginPath();
			ctx.setLineDash([2, 2]);
			ctx.moveTo(padLeft, lastY);
			ctx.lineTo(w - padRight, lastY);
			ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
			ctx.lineWidth = 1;
			ctx.stroke();
			ctx.setLineDash([]);
			ctx.fillStyle = lastCandle.close >= lastCandle.open ? "#10b981" : "#ef4444";
			ctx.beginPath();
			ctx.roundRect(w - padRight + 2, lastY - 9, 59, 18, 4);
			ctx.fill();
			ctx.fillStyle = "#ffffff";
			ctx.font = "bold 9.5px 'JetBrains Mono', monospace";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText(`$${lastCandle.close.toLocaleString("en-US", { maximumFractionDigits: assetConfig.decimals })}`, w - padRight + 2 + 59 / 2, lastY);
			ctx.beginPath();
			ctx.arc(lastX, lastY, 4.5, 0, Math.PI * 2);
			ctx.fillStyle = "#10b981";
			ctx.fill();
			ctx.strokeStyle = "#ffffff";
			ctx.lineWidth = 1.5;
			ctx.stroke();
			if (hoverData.candle && hoverData.x >= padLeft && hoverData.x <= w - padRight) {
				ctx.save();
				ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
				ctx.lineWidth = 1;
				ctx.setLineDash([4, 4]);
				ctx.beginPath();
				ctx.moveTo(hoverData.x, padTop);
				ctx.lineTo(hoverData.x, h - padBottom);
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(padLeft, hoverData.y);
				ctx.lineTo(w - padRight, hoverData.y);
				ctx.stroke();
				ctx.restore();
			}
			animId = requestAnimationFrame(render);
		};
		render();
		return () => cancelAnimationFrame(animId);
	}, [
		chartType,
		showEMA,
		showVolume,
		hoverData,
		assetConfig
	]);
	const handleMouseMove = (e) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const candles = candlesRef.current;
		if (candles.length === 0) return;
		const padLeft = 14;
		const chartW = canvas.width - padLeft - 65;
		const relX = x - padLeft;
		const candle = candles[Math.max(0, Math.min(candles.length - 1, Math.round(relX / chartW * (candles.length - 1))))] || null;
		setHoverData({
			candle,
			x,
			y
		});
	};
	const handleMouseLeave = () => {
		setHoverData({
			candle: null,
			x: -1,
			y: -1
		});
	};
	const handleTouchMove = (e) => {
		const canvas = canvasRef.current;
		if (!canvas || !e.touches[0]) return;
		const rect = canvas.getBoundingClientRect();
		const touch = e.touches[0];
		const x = touch.clientX - rect.left;
		const y = touch.clientY - rect.top;
		const candles = candlesRef.current;
		if (candles.length === 0) return;
		const padLeft = 14;
		const chartW = canvas.width - padLeft - 65;
		const relX = x - padLeft;
		const candle = candles[Math.max(0, Math.min(candles.length - 1, Math.round(relX / chartW * (candles.length - 1))))] || null;
		setHoverData({
			candle,
			x,
			y
		});
	};
	const handleTouchEnd = () => {
		setHoverData({
			candle: null,
			x: -1,
			y: -1
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full flex flex-col space-y-2.5 sm:space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2 px-0.5 sm:px-1 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 sm:gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `text-lg sm:text-xl font-mono font-extrabold transition-colors duration-200 ${priceFlash === "up" ? "text-emerald-400" : priceFlash === "down" ? "text-rose-400" : "text-white"}`,
						children: ["$", currentLivePrice.toLocaleString("en-US", {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" }), "Live Feed (750ms)"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 sm:gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-700/60 shadow-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setChartType("area"),
							className: `px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all ${chartType === "area" ? "bg-blue-600 text-white shadow-xs" : "text-slate-400 hover:text-white"}`,
							children: "Line"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setChartType("candlestick"),
							className: `px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all ${chartType === "candlestick" ? "bg-blue-600 text-white shadow-xs" : "text-slate-400 hover:text-white"}`,
							children: "Candles"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-[1px] h-3.5 bg-slate-700 mx-0.5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowEMA(!showEMA),
							className: `px-1.5 sm:px-2 py-1 rounded-lg text-[9.5px] sm:text-[10px] font-bold transition-all ${showEMA ? "text-amber-400 bg-amber-500/10" : "text-slate-400 hover:text-white"}`,
							children: "EMA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowVolume(!showVolume),
							className: `px-1.5 sm:px-2 py-1 rounded-lg text-[9.5px] sm:text-[10px] font-bold transition-all ${showVolume ? "text-emerald-400 bg-emerald-500/10" : "text-slate-400 hover:text-white"}`,
							children: "Vol"
						})
					]
				})]
			}),
			hoverData.candle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-1.5 sm:gap-3 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900/95 border border-slate-700 text-[10px] sm:text-[11px] font-mono text-slate-300 shadow-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-slate-400",
						children: hoverData.candle.timeLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["O: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "text-white",
						children: ["$", hoverData.candle.open.toFixed(2)]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["H: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "text-emerald-400",
						children: ["$", hoverData.candle.high.toFixed(2)]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["L: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "text-rose-400",
						children: ["$", hoverData.candle.low.toFixed(2)]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["C: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "text-white",
						children: ["$", hoverData.candle.close.toFixed(2)]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-slate-400",
						children: ["Vol: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: hoverData.candle.volume })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: containerRef,
				className: "relative bg-slate-950/95 rounded-2xl h-60 sm:h-80 border border-slate-800 shadow-inner overflow-hidden cursor-crosshair select-none touch-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
					ref: canvasRef,
					onMouseMove: handleMouseMove,
					onMouseLeave: handleMouseLeave,
					onTouchStart: handleTouchMove,
					onTouchMove: handleTouchMove,
					onTouchEnd: handleTouchEnd,
					className: "w-full h-full"
				})
			})
		]
	});
}
var newId = () => typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
var conversionRates = {
	BTC: {
		USD: 98420.5,
		ETH: 28.52,
		SOL: 462.5,
		USDT: 98420.5
	},
	ETH: {
		USD: 3450.2,
		ETH: 1,
		SOL: 16.2,
		USDT: 3450.2
	},
	SOL: {
		USD: 212.8,
		ETH: .061,
		SOL: 1,
		USDT: 212.8
	}
};
function AKChat() {
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [input, setInput] = (0, import_react.useState)("");
	const [isSending, setIsSending] = (0, import_react.useState)(false);
	const [copiedId, setCopiedId] = (0, import_react.useState)(null);
	const [speakingId, setSpeakingId] = (0, import_react.useState)(null);
	const [savedBookmarks, setSavedBookmarks] = (0, import_react.useState)([]);
	const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = (0, import_react.useState)(false);
	const [activeLayer, setActiveLayer] = (0, import_react.useState)("Market structure");
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("Markets Overview");
	const [activeModel, setActiveModel] = (0, import_react.useState)("AK-Crypto v4");
	const [activeModelDesc, setActiveModelDesc] = (0, import_react.useState)("Pro Crypto Model");
	const [modelDropdownOpen, setModelDropdownOpen] = (0, import_react.useState)(false);
	const [authModalOpen, setAuthModalOpen] = (0, import_react.useState)(false);
	const [getStartedModalOpen, setGetStartedModalOpen] = (0, import_react.useState)(false);
	const [chartModalOpen, setChartModalOpen] = (0, import_react.useState)(false);
	const [converterModalOpen, setConverterModalOpen] = (0, import_react.useState)(false);
	const [settingsModalOpen, setSettingsModalOpen] = (0, import_react.useState)(false);
	const [welcomePopupOpen, setWelcomePopupOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") {
			if (!sessionStorage.getItem("ak_welcome_dismissed")) setWelcomePopupOpen(true);
		}
	}, []);
	const dismissWelcomePopup = () => {
		setWelcomePopupOpen(false);
		if (typeof window !== "undefined") sessionStorage.setItem("ak_welcome_dismissed", "true");
		showToast("Welcome to AK Luxe Terminal");
	};
	const [showPlusMenu, setShowPlusMenu] = (0, import_react.useState)(false);
	const [attachedFile, setAttachedFile] = (0, import_react.useState)(null);
	const [isWebSearchActive, setIsWebSearchActive] = (0, import_react.useState)(false);
	const [isListening, setIsListening] = (0, import_react.useState)(false);
	const [physicsEnabled, setPhysicsEnabled] = (0, import_react.useState)(true);
	const [convertAmount, setConvertAmount] = (0, import_react.useState)(1);
	const [convertFrom, setConvertFrom] = (0, import_react.useState)("BTC");
	const [convertTo, setConvertTo] = (0, import_react.useState)("USD");
	const [chartAsset, setChartAsset] = (0, import_react.useState)("BTC");
	const [chartTimeframe, setChartTimeframe] = (0, import_react.useState)("1D");
	const [chartPrices, setChartPrices] = (0, import_react.useState)({
		BTC: "$93,840.00",
		ETH: "$3,385.00",
		SOL: "$188.40"
	});
	const timeframeStats = {
		BTC: {
			"1D": {
				change: "+3.42%",
				isPositive: true,
				high: "$94,820",
				low: "$91,450"
			},
			"1W": {
				change: "+11.85%",
				isPositive: true,
				high: "$95,100",
				low: "$84,200"
			},
			"1M": {
				change: "+28.60%",
				isPositive: true,
				high: "$95,400",
				low: "$72,150"
			}
		},
		ETH: {
			"1D": {
				change: "+4.18%",
				isPositive: true,
				high: "$3,490",
				low: "$3,310"
			},
			"1W": {
				change: "+9.40%",
				isPositive: true,
				high: "$3,520",
				low: "$3,080"
			},
			"1M": {
				change: "+24.15%",
				isPositive: true,
				high: "$3,560",
				low: "$2,690"
			}
		},
		SOL: {
			"1D": {
				change: "+8.65%",
				isPositive: true,
				high: "$198.50",
				low: "$179.20"
			},
			"1W": {
				change: "+21.30%",
				isPositive: true,
				high: "$202.00",
				low: "$158.40"
			},
			"1M": {
				change: "+46.80%",
				isPositive: true,
				high: "$205.00",
				low: "$129.00"
			}
		}
	};
	const [telemetrySpeed, setTelemetrySpeed] = (0, import_react.useState)("Realtime");
	const [temperature, setTemperature] = (0, import_react.useState)(.7);
	const [speechRate, setSpeechRate] = (0, import_react.useState)(1);
	const [soundEffects, setSoundEffects] = (0, import_react.useState)(true);
	const [autoScroll, setAutoScroll] = (0, import_react.useState)(true);
	const [isComposerGlowing, setIsComposerGlowing] = (0, import_react.useState)(false);
	const [toasts, setToasts] = (0, import_react.useState)([]);
	const [typedWelcome, setTypedWelcome] = (0, import_react.useState)("");
	const fullWelcomeText = "AK Luxe Intelligence Engine • Synthesizing institutional on-chain telemetry, order book liquidation clusters, and protocol risk context in real time. How can I assist your crypto research today?";
	const chatContainerRef = (0, import_react.useRef)(null);
	const userInputRef = (0, import_react.useRef)(null);
	const miniChartBTCRef = (0, import_react.useRef)(null);
	const miniChartETHRef = (0, import_react.useRef)(null);
	const cursorGlowRef = (0, import_react.useRef)(null);
	const recognitionRef = (0, import_react.useRef)(null);
	const showToast = (0, import_react.useCallback)((msg) => {
		const id = Date.now() + Math.random();
		setToasts((prev) => [...prev, {
			id,
			text: msg
		}]);
		window.setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id));
		}, 3e3);
	}, []);
	(0, import_react.useEffect)(() => {
		const handleMouseMove = (e) => {
			if (cursorGlowRef.current) {
				cursorGlowRef.current.style.left = `${e.clientX}px`;
				cursorGlowRef.current.style.top = `${e.clientY}px`;
			}
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);
	(0, import_react.useEffect)(() => {
		let index = 0;
		const interval = setInterval(() => {
			if (index <= 194) {
				setTypedWelcome(fullWelcomeText.slice(0, index));
				index++;
			} else clearInterval(interval);
		}, 14);
		return () => clearInterval(interval);
	}, []);
	(0, import_react.useEffect)(() => {
		let animId = 0;
		let phase = 0;
		const basePtsBTC = [
			22,
			28,
			25,
			36,
			32,
			44,
			40,
			50,
			47,
			56
		];
		const basePtsETH = [
			34,
			30,
			40,
			37,
			48,
			44,
			54,
			47,
			58,
			56
		];
		function drawFlowingSparkline(canvas, basePts, strokeColor, fillColor, phaseOffset) {
			if (!canvas) return;
			const ctx = canvas.getContext("2d");
			if (!ctx || !canvas.parentElement) return;
			const rect = canvas.parentElement.getBoundingClientRect();
			if (canvas.width !== rect.width - 24 || canvas.height !== 64) {
				canvas.width = Math.max(120, rect.width - 24);
				canvas.height = 64;
			}
			const w = canvas.width;
			const h = canvas.height;
			ctx.clearRect(0, 0, w, h);
			ctx.strokeStyle = "rgba(0, 0, 0, 0.04)";
			ctx.lineWidth = 1;
			ctx.setLineDash([3, 3]);
			ctx.beginPath();
			ctx.moveTo(0, h * .35);
			ctx.lineTo(w, h * .35);
			ctx.moveTo(0, h * .7);
			ctx.lineTo(w, h * .7);
			ctx.stroke();
			ctx.setLineDash([]);
			const pts = basePts.map((val, i) => val + Math.sin(phase + phaseOffset + i * .6) * 3.8 + Math.cos(phase * 1.3 + i * .4) * 1.5);
			const max = Math.max(...pts) + 4;
			const min = Math.min(...pts) - 4;
			const coords = [];
			for (let i = 0; i < pts.length; i++) {
				const x = w / (pts.length - 1) * i;
				const y = h - (pts[i] - min) / (max - min || 1) * (h - 20) - 6;
				coords.push({
					x,
					y
				});
			}
			ctx.fillStyle = fillColor;
			for (let i = 0; i < coords.length; i++) {
				const barH = 4 + Math.abs(Math.sin(phase + i)) * 8;
				ctx.fillRect(coords[i].x - 2, h - barH, 4, barH);
			}
			ctx.beginPath();
			ctx.moveTo(coords[0].x, coords[0].y);
			for (let i = 0; i < coords.length - 1; i++) {
				const cpX = (coords[i].x + coords[i + 1].x) / 2;
				const cpY = (coords[i].y + coords[i + 1].y) / 2;
				ctx.quadraticCurveTo(coords[i].x, coords[i].y, cpX, cpY);
			}
			const lastCoord = coords[coords.length - 1];
			ctx.lineTo(lastCoord.x, lastCoord.y);
			ctx.save();
			const fillPath = new Path2D();
			fillPath.moveTo(coords[0].x, coords[0].y);
			for (let i = 0; i < coords.length - 1; i++) {
				const cpX = (coords[i].x + coords[i + 1].x) / 2;
				const cpY = (coords[i].y + coords[i + 1].y) / 2;
				fillPath.quadraticCurveTo(coords[i].x, coords[i].y, cpX, cpY);
			}
			fillPath.lineTo(lastCoord.x, lastCoord.y);
			fillPath.lineTo(w, h);
			fillPath.lineTo(0, h);
			fillPath.closePath();
			const grad = ctx.createLinearGradient(0, 0, 0, h);
			grad.addColorStop(0, fillColor);
			grad.addColorStop(1, "rgba(255, 255, 255, 0)");
			ctx.fillStyle = grad;
			ctx.fill(fillPath);
			ctx.restore();
			ctx.strokeStyle = strokeColor;
			ctx.lineWidth = 2.4;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.stroke();
			const pulsePhase = phase * 2 % (Math.PI * 2);
			const ringRadius = 4 + Math.sin(pulsePhase) * 5;
			const ringAlpha = Math.max(0, .4 - ringRadius / 9 * .4);
			ctx.beginPath();
			ctx.arc(lastCoord.x - 2, lastCoord.y, ringRadius + 2, 0, Math.PI * 2);
			ctx.strokeStyle = strokeColor;
			ctx.lineWidth = 1;
			ctx.fillStyle = `rgba(255, 255, 255, ${ringAlpha})`;
			ctx.fill();
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(lastCoord.x - 2, lastCoord.y, 3, 0, Math.PI * 2);
			ctx.fillStyle = strokeColor;
			ctx.fill();
		}
		function renderGraphs() {
			phase += .038;
			drawFlowingSparkline(miniChartBTCRef.current, basePtsBTC, "#f59e0b", "rgba(245, 158, 11, 0.2)", 0);
			drawFlowingSparkline(miniChartETHRef.current, basePtsETH, "#6366f1", "rgba(99, 102, 241, 0.2)", Math.PI / 2);
			animId = requestAnimationFrame(renderGraphs);
		}
		renderGraphs();
		return () => {
			cancelAnimationFrame(animId);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (autoScroll && chatContainerRef.current) chatContainerRef.current.scrollTo({
			top: chatContainerRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [
		messages,
		isSending,
		autoScroll
	]);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (SpeechRecognition) {
			const recognition = new SpeechRecognition();
			recognition.continuous = false;
			recognition.interimResults = false;
			recognition.lang = "en-US";
			recognition.onresult = (event) => {
				const transcript = event.results[0]?.[0]?.transcript;
				if (transcript) {
					setInput((prev) => prev ? `${prev} ${transcript}` : transcript);
					showToast("Voice transcription captured");
				}
				setIsListening(false);
			};
			recognition.onerror = () => setIsListening(false);
			recognition.onend = () => setIsListening(false);
			recognitionRef.current = recognition;
		}
	}, [showToast]);
	const toggleVoiceInput = () => {
		if (isSending) return;
		if (isListening) {
			recognitionRef.current?.stop();
			setIsListening(false);
		} else if (recognitionRef.current) try {
			recognitionRef.current.start();
			setIsListening(true);
			showToast("Listening... Speak now");
		} catch {
			setIsListening(false);
		}
		else {
			setIsListening(true);
			showToast("Listening... Speak now");
			setTimeout(() => {
				setInput((prev) => prev ? `${prev} Analyze BTC market structure & liquidations` : "Analyze BTC market structure & liquidations");
				setIsListening(false);
				showToast("Voice transcription captured");
			}, 1600);
		}
	};
	const requestReply = (0, import_react.useCallback)(async (promptText, replaceId) => {
		setIsSending(true);
		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "text/plain; charset=utf-8" },
				body: promptText
			});
			const data = await response.json();
			if (!response.ok || !data.reply) throw new Error(data.error || "AK could not complete that request.");
			const assistantMsg = {
				id: replaceId ?? newId(),
				role: "assistant",
				content: data.reply,
				prompt: promptText
			};
			setMessages((current) => replaceId ? current.map((m) => m.id === replaceId ? assistantMsg : m) : [...current, assistantMsg]);
			if (soundEffects && typeof Audio !== "undefined") {}
		} catch (error) {
			const content = error instanceof Error ? error.message : "AK is temporarily unavailable. Please try again.";
			const failedMsg = {
				id: replaceId ?? newId(),
				role: "assistant",
				content,
				prompt: promptText,
				error: true
			};
			setMessages((current) => replaceId ? current.map((m) => m.id === replaceId ? failedMsg : m) : [...current, failedMsg]);
		} finally {
			setIsSending(false);
			requestAnimationFrame(() => userInputRef.current?.focus());
		}
	}, [soundEffects]);
	const sendMessage = async () => {
		const text = input.trim();
		if (!text && !attachedFile) return;
		setIsComposerGlowing(true);
		window.setTimeout(() => setIsComposerGlowing(false), 900);
		const fullPrompt = attachedFile ? `[Attached: ${attachedFile.name}] ${isWebSearchActive ? "[Live Web Search Enabled] " : ""}${text}` : isWebSearchActive ? `[Live Web Search Enabled] ${text}` : text;
		const userMsg = {
			id: newId(),
			role: "user",
			content: text || `Uploaded attachment: ${attachedFile?.name}`,
			attachedFile: attachedFile?.name
		};
		setMessages((current) => [...current, userMsg]);
		setInput("");
		setAttachedFile(null);
		setShowPlusMenu(false);
		await requestReply(fullPrompt);
	};
	const sendQuickPrompt = (prompt) => {
		setIsComposerGlowing(true);
		window.setTimeout(() => setIsComposerGlowing(false), 900);
		setInput(prompt);
		requestReply(prompt);
	};
	const clearChat = () => {
		setMessages([]);
		setInput("");
		setAttachedFile(null);
		if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
		setSpeakingId(null);
		showToast("Chat history cleared");
	};
	const toggleSpeech = (message) => {
		if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
		if (speakingId === message.id) {
			window.speechSynthesis.cancel();
			setSpeakingId(null);
			return;
		}
		window.speechSynthesis.cancel();
		const cleanText = message.content.replace(/[*#_`]/g, "");
		const utterance = new SpeechSynthesisUtterance(cleanText);
		utterance.rate = speechRate;
		utterance.pitch = 1;
		utterance.onend = () => setSpeakingId(null);
		utterance.onerror = () => setSpeakingId(null);
		setSpeakingId(message.id);
		window.speechSynthesis.speak(utterance);
		showToast("Reading aloud...");
	};
	const copyToClipboard = async (text) => {
		await navigator.clipboard.writeText(text);
		showToast("Copied to clipboard!");
	};
	const bookmarkMessage = (content) => {
		if (!savedBookmarks.includes(content)) {
			setSavedBookmarks((prev) => [...prev, content]);
			showToast("Saved insight to bookmarks!");
		} else showToast("Insight is already bookmarked");
	};
	const removeBookmark = (index) => {
		setSavedBookmarks((prev) => prev.filter((_, i) => i !== index));
		showToast("Removed bookmark");
	};
	const clearAllBookmarks = () => {
		setSavedBookmarks([]);
		showToast("Bookmarks cleared");
	};
	const handleFileUpload = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			setAttachedFile(file);
			showToast(`Attached file: ${file.name}`);
			setShowPlusMenu(false);
		}
	};
	const triggerPlusAction = (actionType) => {
		setShowPlusMenu(false);
		if (actionType === "photos") {
			showToast("Photo & Chart Inspector Ready");
			setInput("Analyze this chart pattern for liquidation zones: ");
		} else if (actionType === "code") {
			showToast("Smart Contract & Code Audit Mode Ready");
			setInput("Audit this smart contract for reentrancy & risk: ");
		} else if (actionType === "canvas") {
			showToast("Canvas Telemetry Report Initialized");
			sendQuickPrompt("Generate a comprehensive market canvas telemetry report.");
		} else if (actionType === "web") setIsWebSearchActive((prev) => {
			const next = !prev;
			showToast(next ? "Live Web Telemetry Search Enabled" : "Live Web Search Disabled");
			return next;
		});
	};
	const filterMarketCategory = (categoryName) => {
		setActiveCategory(categoryName);
		sendQuickPrompt(`Show market breakdown for ${categoryName}`);
	};
	const calculatedConversionResult = (() => {
		const rate = conversionRates[convertFrom]?.[convertTo] ?? 1;
		const res = (convertAmount * rate).toLocaleString(void 0, { maximumFractionDigits: 4 });
		return (convertTo === "USD" || convertTo === "USDT" ? "$" : "") + res;
	})();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full min-h-[100dvh] h-[100dvh] flex flex-col bg-[#f0f3f8] text-slate-800 overflow-hidden relative font-sans select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "cursorGlow",
				ref: cursorGlowRef
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleEngine, { physicsEnabled }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "toastContainer",
				children: toasts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "toast-msg apple-glass px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-900 shadow-xl flex items-center gap-2 border border-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-blue-600 animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.text })]
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketTicker, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex-1 flex overflow-hidden p-1.5 sm:p-3 gap-1.5 sm:gap-3 w-full h-[calc(100dvh-37px)] max-w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "w-72 rounded-3xl flex flex-col justify-between p-4 shrink-0 hidden lg:flex overflow-y-auto backdrop-blur-3xl bg-white/45 border border-white/80 shadow-[0_20px_50px_rgba(8,_112,_184,_0.08)] ring-1 ring-white/70 relative overflow-hidden group select-none transition-all duration-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/40 pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-16 -left-16 w-44 h-44 rounded-full bg-blue-400/15 blur-2xl pointer-events-none animate-pulse" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-16 -right-16 w-44 h-44 rounded-full bg-indigo-400/15 blur-2xl pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 opacity-90 shadow-sm" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 relative z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 cursor-pointer group/logo",
									onClick: () => showToast("AK Luxe Crypto Intelligence Active"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-11 h-11 ak-glass-badge shrink-0 shadow-md group-hover/logo:scale-105 group-hover/logo:shadow-blue-500/20 transition-all duration-300 border border-white/90",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											className: "w-7 h-7 ak-svg-icon",
											viewBox: "0 0 100 100",
											fill: "none",
											xmlns: "http://www.w3.org/2000/svg",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
												id: "akGoldGradient",
												x1: "0%",
												y1: "0%",
												x2: "100%",
												y2: "100%",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
														offset: "0%",
														stopColor: "#1e40af"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
														offset: "50%",
														stopColor: "#3b82f6"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
														offset: "100%",
														stopColor: "#f59e0b"
													})
												]
											}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M18 78 L42 22 L54 22 L36 60 L62 22 L78 22 L50 62 L80 78 L63 78 L42 66 L30 78 Z",
												fill: "url(#akGoldGradient)"
											})]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "font-extrabold text-slate-900 text-base leading-none tracking-tight",
											children: "AK Luxe"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-slate-500 font-bold tracking-wide flex items-center gap-1 mt-0.5",
										children: "Crypto Neural Core"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 rounded-2xl bg-white/50 backdrop-blur-2xl border border-white/90 shadow-[0_4px_16px_rgba(255,255,255,0.4)] space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] uppercase font-extrabold text-slate-500 tracking-wider block px-1 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "w-3.5 h-3.5 text-blue-600" }), " Intelligence Layers"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] font-bold text-blue-600 bg-blue-500/10 px-1.5 py-0.5 rounded-full border border-blue-300/40",
											children: "Active"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
										className: "space-y-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => {
													setActiveLayer("Market structure");
													showToast("Switched active layer to Market structure");
													sendQuickPrompt("Give me an overview of the current crypto market structure.");
												},
												className: `w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all duration-200 cursor-pointer ${activeLayer === "Market structure" ? "text-blue-700 bg-white/95 border border-blue-300 shadow-sm translate-x-0.5 ring-1 ring-blue-400/30" : "text-slate-700 bg-white/40 hover:bg-white/80 hover:translate-x-0.5 border border-transparent hover:border-white/80"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLine, { className: "w-3.5 h-3.5 text-blue-600" }), " Market structure"]
												}), activeLayer === "Market structure" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "relative flex h-2 w-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-blue-600" })]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => {
													setActiveLayer("On-chain signals");
													showToast("Switched active layer to On-chain signals");
													sendQuickPrompt("What are the most important on-chain signals to watch right now?");
												},
												className: `w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all duration-200 cursor-pointer ${activeLayer === "On-chain signals" ? "text-indigo-700 bg-white/95 border border-indigo-300 shadow-sm translate-x-0.5 ring-1 ring-indigo-400/30" : "text-slate-700 bg-white/40 hover:bg-white/80 hover:translate-x-0.5 border border-transparent hover:border-white/80"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-3.5 h-3.5 text-indigo-500" }), " On-chain signals"]
												}), activeLayer === "On-chain signals" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "relative flex h-2 w-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-indigo-600" })]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => {
													setActiveLayer("Risk context");
													showToast("Switched active layer to Risk context");
													sendQuickPrompt("Summarize the current risk context for crypto investors.");
												},
												className: `w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all duration-200 cursor-pointer ${activeLayer === "Risk context" ? "text-amber-700 bg-white/95 border border-amber-300 shadow-sm translate-x-0.5 ring-1 ring-amber-400/30" : "text-slate-700 bg-white/40 hover:bg-white/80 hover:translate-x-0.5 border border-transparent hover:border-white/80"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-3.5 h-3.5 text-amber-500" }), " Risk context"]
												}), activeLayer === "Risk context" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "relative flex h-2 w-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-amber-600" })]
												})]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 pt-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between px-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] uppercase font-extrabold text-slate-500 tracking-wider flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "w-3.5 h-3.5 text-blue-600" }), " Live Crypto Markets"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[9px] text-emerald-700 font-extrabold bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-300/60 shadow-2xs flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" }), " Real-time"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											onClick: () => {
												setChartAsset("BTC");
												setChartModalOpen(true);
											},
											className: "p-3 rounded-2xl bg-white/55 hover:bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_4px_16px_rgba(255,255,255,0.4)] space-y-2 relative overflow-hidden group/btc cursor-pointer transition-all duration-200 hover:scale-[1.015] hover:shadow-md",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "w-7 h-7 rounded-xl bg-amber-500/15 border border-amber-300/80 flex items-center justify-center font-extrabold text-amber-600 text-xs shadow-2xs group-hover/btc:scale-105 transition-transform",
														children: "₿"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "font-bold text-slate-900 text-xs",
														children: "Bitcoin Depth"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-emerald-600 font-mono font-extrabold",
														children: "$93,840.00"
													})] })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-extrabold text-emerald-700 bg-emerald-500/15 border border-emerald-300/60 px-2 py-0.5 rounded-full",
													children: "+3.42%"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "relative h-16 w-full",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
													ref: miniChartBTCRef,
													className: "w-full h-full"
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											onClick: () => {
												setChartAsset("ETH");
												setChartModalOpen(true);
											},
											className: "p-3 rounded-2xl bg-white/55 hover:bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_4px_16px_rgba(255,255,255,0.4)] space-y-2 relative overflow-hidden group/eth cursor-pointer transition-all duration-200 hover:scale-[1.015] hover:shadow-md",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "w-7 h-7 rounded-xl bg-indigo-500/15 border border-indigo-300/80 flex items-center justify-center font-extrabold text-indigo-600 text-xs shadow-2xs group-hover/eth:scale-105 transition-transform",
														children: "Ξ"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "font-bold text-slate-900 text-xs",
														children: "Ethereum Staking"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-indigo-600 font-mono font-extrabold",
														children: "3.4% APY"
													})] })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-extrabold text-emerald-700 bg-emerald-500/15 border border-emerald-300/60 px-2 py-0.5 rounded-full",
													children: "12 Gwei"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "relative h-16 w-full",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
													ref: miniChartETHRef,
													className: "w-full h-full"
												})
											})]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-3 mt-3 border-t border-white/60 flex items-center justify-between text-xs text-slate-500 font-medium shrink-0 relative z-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-300/60 text-emerald-700 text-[10px] font-extrabold shadow-2xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative flex h-2 w-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })]
								}), "Engine Active"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSettingsModalOpen(true),
								className: "p-2 rounded-xl text-slate-700 hover:text-blue-600 bg-white/50 hover:bg-white/80 border border-white/80 shadow-2xs flex items-center gap-1 font-semibold transition-all hover:rotate-45 duration-300",
								title: "Crypto Settings",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-4 h-4" })
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 flex flex-col rounded-2xl sm:rounded-3xl relative apple-glass p-1 sm:p-2 min-w-0 max-w-full overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full h-full flex flex-col rounded-[0.85rem] sm:rounded-[1rem] overflow-hidden relative bg-[#f0f3f8]/80 backdrop-blur-md p-1.5 sm:p-3 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BitcoinField, { className: "absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-45" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "apple-glass rounded-xl sm:rounded-2xl p-2 sm:p-3 mb-1.5 sm:mb-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 sm:gap-3 shadow-xs shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between md:justify-start gap-2 sm:gap-3 min-w-0 w-full md:w-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 sm:gap-3 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-8 h-8 sm:w-9.5 sm:h-9.5 ak-glass-badge shrink-0 p-1 sm:p-1.5 shadow-xs",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												className: "w-5 h-5 sm:w-6 sm:h-6 ak-svg-icon",
												viewBox: "0 0 100 100",
												fill: "none",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M18 78 L42 22 L54 22 L36 60 L62 22 L78 22 L50 62 L80 78 L63 78 L42 66 L30 78 Z",
													fill: "url(#akGoldGradient)"
												})
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5 sm:gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "font-bold text-slate-900 text-xs sm:text-sm truncate",
													children: "AK Intelligence"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[8.5px] sm:text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" }), " Live"]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] sm:text-[11px] text-slate-500 font-medium block truncate",
												children: "Real-time crypto market intelligence & risk engine"
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setSettingsModalOpen(true),
										className: "lg:hidden p-1.5 rounded-xl text-slate-600 hover:text-blue-600 apple-glass-interactive shrink-0",
										title: "Settings",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-4 h-4" })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-wrap justify-between md:justify-end w-full md:w-auto",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: clearChat,
											className: "apple-glass-interactive px-2 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-slate-800 hover:text-blue-600 transition-all flex items-center gap-1 sm:gap-1.5 font-bold text-[10.5px] sm:text-xs shadow-xs shrink-0",
											title: "Start a fresh conversation",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "New Chat" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-px bg-slate-300/60 mx-0.5 hidden md:block" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setAuthModalOpen(true),
											className: "btn-glass-signin text-white font-bold text-[10.5px] sm:text-xs px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow-md transition-all active:scale-95 shrink-0",
											children: "Sign in"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setGetStartedModalOpen(true),
											className: "btn-glass-getstarted text-white font-bold text-[10.5px] sm:text-xs px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-md transition-all flex items-center gap-1 active:scale-95 shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pro" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3 sm:w-3.5 sm:h-3.5" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-px bg-slate-300/60 mx-0.5 hidden sm:block" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setChartModalOpen(true),
											className: "apple-glass-interactive p-1.5 sm:p-2 rounded-xl text-slate-700 hover:text-blue-600 transition-all flex items-center gap-1 font-bold text-[10.5px] sm:text-xs shrink-0",
											title: "Live Price Charts",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLine, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden sm:inline",
												children: "Charts"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setConverterModalOpen(true),
											className: "apple-glass-interactive p-1.5 sm:p-2 rounded-xl text-slate-700 hover:text-blue-600 transition-all flex items-center gap-1 font-bold text-[10.5px] sm:text-xs shrink-0",
											title: "Crypto Converter",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden sm:inline",
												children: "Swap"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setBookmarksDrawerOpen((prev) => !prev),
											className: "apple-glass-interactive p-1.5 sm:p-2 rounded-xl text-slate-700 hover:text-blue-600 transition-all flex items-center gap-1 font-bold text-[10.5px] sm:text-xs relative shrink-0",
											title: "Saved Insights",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" }), savedBookmarks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full",
												children: savedBookmarks.length
											})]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								id: "chatContainer",
								ref: chatContainerRef,
								className: "flex-1 overflow-y-auto space-y-3 sm:space-y-4 pr-1.5 sm:pr-2 pl-0.5 mb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-center max-w-4xl mx-auto welcome-fade-in w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AntigravityHero, {
											onQuickPrompt: (prompt) => void sendQuickPrompt(prompt),
											typedWelcome,
											fullWelcomeText
										})
									}),
									messages.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: msg.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "user-glass-bubble rounded-2xl px-4 py-3 text-sm font-semibold max-w-lg shadow-md",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "whitespace-pre-wrap",
												children: msg.content
											}), msg.attachedFile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1 text-[10px] text-blue-600 flex items-center gap-1 font-bold",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "w-3 h-3" }),
													" ",
													msg.attachedFile
												]
											})]
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-3 max-w-3xl",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bot-glass-bubble rounded-2xl p-4 text-slate-800 text-sm leading-relaxed max-w-2xl w-full",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between mb-1.5 pb-1 border-b border-slate-200/30",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-bold text-slate-900 text-xs flex items-center gap-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-blue-600 animate-pulse" }), "AK Intelligence"]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-slate-400",
														children: "Just now"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "bot-content space-y-2",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageResponse, { children: msg.content })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-3 pt-2 border-t border-slate-200/40 flex items-center justify-between",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex gap-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => toggleSpeech(msg),
																className: "apple-glass-interactive p-1.5 sm:px-2 sm:py-1 rounded-lg text-slate-600 hover:text-blue-600 transition-colors flex items-center justify-center",
																title: speakingId === msg.id ? "Stop voice" : "Read aloud",
																children: speakingId === msg.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "w-3.5 h-3.5 text-rose-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5 text-blue-600" })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																type: "button",
																onClick: () => bookmarkMessage(msg.content),
																className: "apple-glass-interactive px-2 py-1 rounded-lg text-[11px] text-slate-500 flex items-center gap-1 font-semibold",
																title: "Bookmark Insight",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "w-3.5 h-3.5 text-amber-500" }), " Save"]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => void copyToClipboard(msg.content),
																className: "apple-glass-interactive px-2 py-1 rounded-lg text-[11px] text-slate-500",
																title: "Copy",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" })
															})
														]
													})
												})
											]
										})
									}) }, msg.id)),
									isSending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-3 max-w-3xl thinking-msg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "thinking-bubble rounded-2xl px-4 py-2.5 text-slate-700 text-xs font-bold flex items-center gap-2 shadow-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-blue-600 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Thinking" })]
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 sm:mt-2 space-y-1.5 sm:space-y-2 shrink-0 w-full max-w-full",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none touch-pan-x -mx-1 px-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => filterMarketCategory("Markets Overview"),
												className: `market-top-btn px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-extrabold flex items-center gap-1.5 shrink-0 ${activeCategory === "Markets Overview" ? "bg-blue-600 text-white shadow-xs" : "apple-glass-interactive text-slate-800"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-3.5 h-3.5 text-blue-500" }), " Markets"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => filterMarketCategory("On-Chain Signals"),
												className: `market-top-btn px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1.5 shrink-0 ${activeCategory === "On-Chain Signals" ? "bg-blue-600 text-white shadow-xs" : "apple-glass-interactive text-slate-800"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-3.5 h-3.5 text-indigo-500" }), " On-Chain"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => filterMarketCategory("Liquidity Heatmap"),
												className: `market-top-btn px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1.5 shrink-0 ${activeCategory === "Liquidity Heatmap" ? "bg-blue-600 text-white shadow-xs" : "apple-glass-interactive text-slate-800"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-3.5 h-3.5 text-amber-500" }), " Heatmap"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => filterMarketCategory("Risk Audit"),
												className: `market-top-btn px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1.5 shrink-0 ${activeCategory === "Risk Audit" ? "bg-blue-600 text-white shadow-xs" : "apple-glass-interactive text-slate-800"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-500" }), " Risk Radar"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => filterMarketCategory("AI Arbitrage"),
												className: `market-top-btn px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1.5 shrink-0 ${activeCategory === "AI Arbitrage" ? "bg-blue-600 text-white shadow-xs" : "apple-glass-interactive text-slate-800"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "w-3.5 h-3.5 text-cyan-500" }), " AI Arbitrage"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => void sendQuickPrompt("BTC Price Outlook"),
												className: "apple-glass-interactive px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold text-slate-800 shrink-0",
												children: "BTC Outlook"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => void sendQuickPrompt("ETH Staking Yields"),
												className: "apple-glass-interactive px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold text-slate-800 shrink-0",
												children: "ETH Staking"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => void sendQuickPrompt("DeFi Liquidity Trends"),
												className: "apple-glass-interactive px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold text-slate-800 shrink-0",
												children: "DeFi Trends"
											})
										]
									}),
									attachedFile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 bg-white/90 border border-slate-200 px-3 py-1.5 rounded-xl text-xs w-fit shadow-sm animate-in fade-in",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "w-3.5 h-3.5 text-blue-600" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-slate-700",
												children: attachedFile.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setAttachedFile(null),
												className: "text-slate-400 hover:text-rose-500",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-3.5 h-3.5" })
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative group w-full max-w-full",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 opacity-40 blur-lg group-hover:opacity-80 transition duration-500 pointer-events-none chat-box-halo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `relative apple-glass rounded-2xl p-1.5 sm:p-2 flex flex-col gap-1.5 sm:gap-2 border border-white/90 shadow-xl bg-white/80 w-full max-w-full transition-all duration-300 ${isComposerGlowing ? "composer-glow-active border-blue-500 shadow-blue-500/30" : ""}`,
											children: [showPlusMenu && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "absolute bottom-14 left-0 z-50 w-60 sm:w-64 max-w-[calc(100vw-32px)] apple-glass rounded-2xl p-2 border border-white/90 shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-150",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] font-extrabold uppercase text-slate-400 px-3 py-1.5 block",
														children: "Add to conversation"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
														className: "w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50 flex items-center gap-2.5 cursor-pointer transition-all",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "p-1.5 rounded-lg bg-blue-100 text-blue-600 shrink-0",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "w-4 h-4" })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "min-w-0",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "block leading-tight",
																	children: "Upload Documents"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[10px] font-normal text-slate-500 truncate block",
																	children: "PDF, CSV, TXT telemetry audit"
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "file",
																onChange: handleFileUpload,
																className: "hidden"
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: () => triggerPlusAction("photos"),
														className: "w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50 flex items-center gap-2.5 transition-all",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "p-1.5 rounded-lg bg-indigo-100 text-indigo-600 shrink-0",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "w-4 h-4" })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "min-w-0",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "block leading-tight",
																children: "Add Photos & Charts"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] font-normal text-slate-500 truncate block",
																children: "Analyze screenshots & diagrams"
															})]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: () => triggerPlusAction("code"),
														className: "w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50 flex items-center gap-2.5 transition-all",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "p-1.5 rounded-lg bg-amber-100 text-amber-600 shrink-0",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "w-4 h-4" })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "min-w-0",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "block leading-tight",
																children: "Smart Contract & Code"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] font-normal text-slate-500 truncate block",
																children: "Solidity, Rust, or Python snippet"
															})]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: () => triggerPlusAction("canvas"),
														className: "w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50 flex items-center gap-2.5 transition-all",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "p-1.5 rounded-lg bg-emerald-100 text-emerald-600 shrink-0",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "w-4 h-4" })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "min-w-0",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "block leading-tight",
																children: "Create Canvas Report"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] font-normal text-slate-500 truncate block",
																children: "Structured telemetry report"
															})]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t border-slate-200/60 my-1 pt-1" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: () => triggerPlusAction("web"),
														className: "w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-4 h-4 text-blue-500 shrink-0" }), " Search Live Web"]
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1 sm:gap-2 w-full min-w-0",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setShowPlusMenu((prev) => !prev),
														className: "apple-glass-interactive p-1.5 sm:p-2.5 rounded-xl text-slate-600 hover:text-blue-600 transition-all flex items-center justify-center shrink-0",
														title: "Add Content",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => {
															setIsWebSearchActive((prev) => {
																const next = !prev;
																showToast(next ? "Live Web Telemetry Search Enabled" : "Live Web Search Disabled");
																return next;
															});
														},
														className: `p-1.5 sm:p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 ${isWebSearchActive ? "apple-glass-interactive text-blue-600 bg-blue-100 border border-blue-300" : "apple-glass-interactive text-slate-500 hover:text-blue-600"}`,
														title: "Toggle Live Web Telemetry Search",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "relative shrink-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															type: "button",
															onClick: () => setModelDropdownOpen((prev) => !prev),
															className: "apple-glass-interactive text-[10px] sm:text-[11px] font-bold text-blue-700 bg-blue-500/10 border border-blue-300/80 px-1.5 py-1 sm:px-2.5 sm:py-1.5 rounded-xl flex items-center gap-1 sm:gap-1.5 shadow-xs transition-all hover:bg-blue-500/20",
															title: "Select AI Model",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-semibold hidden sm:inline",
																	children: activeModel
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-semibold sm:hidden",
																	children: activeModel.split(" ")[0]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-3 h-3 text-blue-600 shrink-0" })
															]
														}), modelDropdownOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "absolute bottom-12 left-0 z-50 w-56 sm:w-60 max-w-[calc(100vw-32px)] apple-model-dropdown rounded-2xl p-2.5 border border-white/95 shadow-2xl space-y-1",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[10px] font-extrabold uppercase text-slate-500 px-2 py-1 block tracking-wider",
																	children: "Select AI Engine"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																	type: "button",
																	onClick: () => {
																		setActiveModel("AK-Crypto v4");
																		setActiveModelDesc("Pro Crypto Model");
																		setModelDropdownOpen(false);
																		showToast("Switched active AI engine to AK-Crypto v4");
																	},
																	className: `w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${activeModel === "AK-Crypto v4" ? "bg-blue-600 text-white shadow-xs" : "text-slate-800 hover:bg-blue-50/80"}`,
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AK-Crypto v4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: `text-[9px] px-1.5 py-0.5 rounded font-mono ${activeModel === "AK-Crypto v4" ? "bg-white/20 text-white" : "bg-blue-100 text-blue-700"}`,
																		children: "Fast"
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																	type: "button",
																	onClick: () => {
																		setActiveModel("GPT-4o Crypto");
																		setActiveModelDesc("OpenAI Telemetry");
																		setModelDropdownOpen(false);
																		showToast("Switched active AI engine to GPT-4o Crypto");
																	},
																	className: `w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${activeModel === "GPT-4o Crypto" ? "bg-blue-600 text-white shadow-xs" : "text-slate-800 hover:bg-blue-50/80"}`,
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "GPT-4o Crypto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: `text-[9px] px-1.5 py-0.5 rounded font-mono ${activeModel === "GPT-4o Crypto" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"}`,
																		children: "Smart"
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																	type: "button",
																	onClick: () => {
																		setActiveModel("Claude 3.5 Sonnet");
																		setActiveModelDesc("Anthropic Reasoning");
																		setModelDropdownOpen(false);
																		showToast("Switched active AI engine to Claude 3.5 Sonnet");
																	},
																	className: `w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${activeModel === "Claude 3.5 Sonnet" ? "bg-blue-600 text-white shadow-xs" : "text-slate-800 hover:bg-blue-50/80"}`,
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Claude 3.5 Sonnet" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: `text-[9px] px-1.5 py-0.5 rounded font-mono ${activeModel === "Claude 3.5 Sonnet" ? "bg-white/20 text-white" : "bg-purple-100 text-purple-700"}`,
																		children: "Deep"
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																	type: "button",
																	onClick: () => {
																		setActiveModel("DeepSeek R1");
																		setActiveModelDesc("Reasoning Engine");
																		setModelDropdownOpen(false);
																		showToast("Switched active AI engine to DeepSeek R1");
																	},
																	className: `w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${activeModel === "DeepSeek R1" ? "bg-blue-600 text-white shadow-xs" : "text-slate-800 hover:bg-blue-50/80"}`,
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "DeepSeek R1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: `text-[9px] px-1.5 py-0.5 rounded font-mono ${activeModel === "DeepSeek R1" ? "bg-white/20 text-white" : "bg-amber-100 text-amber-700"}`,
																		children: "Math"
																	})]
																})
															]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														ref: userInputRef,
														type: "text",
														value: input,
														onChange: (e) => setInput(e.target.value),
														onKeyDown: (e) => {
															if (e.key === "Enter") {
																e.preventDefault();
																sendMessage();
															}
														},
														placeholder: "Ask AK about markets...",
														className: "flex-1 bg-transparent px-1 sm:px-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium min-w-0"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: toggleVoiceInput,
														className: "apple-glass-interactive px-1.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-slate-600 flex items-center gap-1.5 shrink-0",
														title: "Voice Search",
														children: isListening ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-0.5 h-4 sm:h-5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "w-1 bg-blue-600 rounded-full siri-wave-bar",
																	style: { animationDelay: "0.1s" }
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "w-1 bg-indigo-600 rounded-full siri-wave-bar",
																	style: { animationDelay: "0.25s" }
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "w-1 bg-amber-500 rounded-full siri-wave-bar",
																	style: { animationDelay: "0.4s" }
																})
															]
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														disabled: isSending || !input.trim() && !attachedFile,
														onClick: () => void sendMessage(),
														className: `w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 ${input.trim() || attachedFile ? "bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/30 hover:scale-105 active:scale-95 cursor-pointer ring-1 ring-white/60" : "bg-slate-200/70 dark:bg-slate-800/60 text-slate-400 cursor-not-allowed opacity-60"}`,
														title: "Send message",
														children: isSending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin text-white" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" })
													})
												]
											})]
										})]
									})
								]
							})
						]
					})
				})]
			}),
			welcomePopupOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 welcome-popup-backdrop flex items-center justify-center p-4 transition-all",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "welcome-popup-card w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl relative space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-12 h-12 ak-glass-badge p-2 shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "w-8 h-8 ak-svg-icon",
										viewBox: "0 0 100 100",
										fill: "none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M18 78 L42 22 L54 22 L36 60 L62 22 L78 22 L50 62 L80 78 L63 78 L42 66 L30 78 Z",
											fill: "url(#akGoldGradient)"
										})
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-100/90 px-2 py-0.5 rounded-full",
										children: "Next-Gen Crypto Intelligence"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight mt-0.5",
									children: "Welcome to AK Luxe"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: dismissWelcomePopup,
								className: "apple-glass-interactive p-2 rounded-xl text-slate-500 hover:text-slate-900 transition-colors",
								title: "Dismiss",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs sm:text-sm text-slate-600 font-medium leading-relaxed",
							children: "Institutional-grade digital asset research, real-time market telemetry, on-chain signal analysis, and portfolio risk intelligence powered by CME Community AI Agents & Pinecone."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 rounded-2xl bg-white/70 border border-white/90 shadow-xs space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 text-blue-600 font-bold text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Market Depth" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-slate-500 leading-tight",
										children: "Liquidation clusters & order book telemetry"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 rounded-2xl bg-white/70 border border-white/90 shadow-xs space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 text-indigo-600 font-bold text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "On-Chain" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-slate-500 leading-tight",
										children: "Whale flow tracking & staking yield audits"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 rounded-2xl bg-white/70 border border-white/90 shadow-xs space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 text-amber-600 font-bold text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Risk Radar" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-slate-500 leading-tight",
										children: "Protocol vulnerabilities & volatility context"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-2 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-slate-500 font-medium hidden sm:inline",
								children: "Session memory initialized"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: dismissWelcomePopup,
								className: "w-full sm:w-auto btn-glass-getstarted px-6 py-3 rounded-2xl font-extrabold text-xs text-white shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Launch Crypto Terminal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })]
							})]
						})
					]
				})
			}),
			authModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 transition-all",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "apple-glass w-full max-w-sm rounded-3xl p-6 shadow-2xl relative border border-white/80 space-y-4 animate-in fade-in zoom-in-95 duration-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-slate-200/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-8 h-8 ak-glass-badge p-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "w-5 h-5 ak-svg-icon",
									viewBox: "0 0 100 100",
									fill: "none",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M18 78 L42 22 L54 22 L36 60 L62 22 L78 22 L50 62 L80 78 L63 78 L42 66 L30 78 Z",
										fill: "url(#akGoldGradient)"
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-extrabold text-slate-900 text-base",
								children: "Sign In to AK Luxe"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setAuthModalOpen(false),
							className: "apple-glass-interactive p-1.5 rounded-xl text-slate-500 hover:text-slate-900",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setAuthModalOpen(false);
									showToast("Successfully authenticated via Google");
								},
								className: "w-full apple-glass-interactive py-3 px-4 rounded-xl font-bold text-xs text-slate-800 flex items-center justify-center gap-2.5 shadow-sm border border-slate-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									className: "w-4 h-4",
									viewBox: "0 0 24 24",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#4285F4",
											d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#34A853",
											d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#FBBC05",
											d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#EA4335",
											d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Continue with Google" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setAuthModalOpen(false);
									showToast("Successfully authenticated via Web3 Wallet");
								},
								className: "w-full btn-glass-signin py-3 px-4 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-2.5 shadow-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "w-4 h-4 text-blue-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Connect Web3 Wallet" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center my-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 border-t border-slate-200" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-2 text-[10px] font-extrabold uppercase text-slate-400",
										children: "or email"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 border-t border-slate-200" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								placeholder: "name@domain.com",
								className: "w-full apple-glass-interactive px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 outline-none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setAuthModalOpen(false);
									showToast("Successfully authenticated via Email");
								},
								className: "w-full btn-glass-getstarted py-2.5 rounded-xl font-bold text-xs text-white shadow-md",
								children: "Sign In with Email"
							})
						]
					})]
				})
			}),
			getStartedModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 transition-all",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "apple-glass w-full max-w-md rounded-3xl p-6 shadow-2xl relative border border-white/80 space-y-4 animate-in fade-in zoom-in-95 duration-200",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-slate-200/50 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-5 h-5 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-extrabold text-slate-900 text-base",
									children: "Get Started with AK Pro"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setGetStartedModalOpen(false),
								className: "apple-glass-interactive p-1.5 rounded-xl text-slate-500 hover:text-slate-900",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-600 font-medium",
							children: "Unlock sub-second AI telemetry signals, automated arbitrage detection, and unlimited deep portfolio audits."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 bg-white/80 rounded-2xl border border-blue-200 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-extrabold text-slate-900 text-xs",
									children: "AK Intelligence Pro"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-slate-500",
									children: "Full telemetry & unlimited voice streaming"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-extrabold text-blue-600",
									children: "$29/mo"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setGetStartedModalOpen(false);
								showToast("14-Day Free Trial Activated!");
							},
							className: "w-full btn-glass-getstarted py-3 rounded-xl font-extrabold text-xs text-white shadow-md flex items-center justify-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Start 14-Day Free Trial" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })]
						})
					]
				})
			}),
			chartModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 transition-all",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "apple-glass w-full max-w-3xl rounded-3xl p-6 shadow-2xl relative border border-white/80 space-y-4 animate-in fade-in zoom-in-95 duration-200",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-slate-200/50 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-2.5 rounded-xl bg-blue-600 text-white shadow-md",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLine, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-bold text-slate-900 text-base flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [chartAsset, "/USD Live Telemetry Chart"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200",
										children: timeframeStats[chartAsset][chartTimeframe].change
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-slate-500 font-medium",
									children: [
										chartTimeframe,
										" Market Depth • High: ",
										timeframeStats[chartAsset][chartTimeframe].high,
										" • Low: ",
										timeframeStats[chartAsset][chartTimeframe].low
									]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setChartModalOpen(false),
								className: "apple-glass-interactive p-2 rounded-xl text-slate-500 hover:text-slate-900",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setChartAsset("BTC"),
										className: `apple-glass-interactive px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${chartAsset === "BTC" ? "text-amber-800 bg-amber-500/15 border border-amber-300" : "text-slate-700 hover:text-slate-900"}`,
										children: "Bitcoin (BTC)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setChartAsset("ETH"),
										className: `apple-glass-interactive px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${chartAsset === "ETH" ? "text-indigo-800 bg-indigo-500/15 border border-indigo-300" : "text-slate-700 hover:text-slate-900"}`,
										children: "Ethereum (ETH)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setChartAsset("SOL"),
										className: `apple-glass-interactive px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${chartAsset === "SOL" ? "text-emerald-800 bg-emerald-500/15 border border-emerald-300" : "text-slate-700 hover:text-slate-900"}`,
										children: "Solana (SOL)"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1 bg-slate-200/60 p-1 rounded-xl border border-slate-300/40",
								children: [
									"1D",
									"1W",
									"1M"
								].map((tf) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setChartTimeframe(tf),
									className: `px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${chartTimeframe === tf ? "text-blue-700 bg-white shadow-xs scale-100" : "text-slate-600 hover:text-slate-900 hover:bg-white/50"}`,
									children: tf
								}, tf))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveCryptoChart, {
							asset: chartAsset,
							timeframe: chartTimeframe,
							onPriceUpdate: (price) => {
								setChartPrices((prev) => ({
									...prev,
									[chartAsset]: price
								}));
							}
						})
					]
				})
			}),
			converterModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 transition-all",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "apple-glass w-full max-w-md rounded-3xl p-6 shadow-2xl relative border border-white/80 space-y-4 animate-in fade-in zoom-in-95 duration-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-slate-200/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2.5 rounded-xl bg-indigo-600 text-white shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, { className: "w-5 h-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-slate-900 text-sm",
								children: "Crypto Telemetry Converter"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-slate-500 font-medium",
								children: "Real-time token swap calculations & gas costs"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setConverterModalOpen(false),
							className: "apple-glass-interactive p-1.5 rounded-xl text-slate-500 hover:text-slate-900",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 bg-white/70 rounded-2xl border border-slate-200/60 space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase text-slate-400",
									children: "You Pay"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: convertAmount,
										onChange: (e) => setConvertAmount(parseFloat(e.target.value) || 0),
										className: "bg-transparent text-lg font-bold text-slate-900 outline-none w-1/2"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: convertFrom,
										onChange: (e) => setConvertFrom(e.target.value),
										className: "apple-glass-interactive px-2.5 py-1 rounded-xl text-xs font-bold text-slate-800",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "BTC",
												children: "BTC"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "ETH",
												children: "ETH"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "SOL",
												children: "SOL"
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center -my-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-1.5 rounded-full apple-glass border border-white shadow-md text-slate-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownUp, { className: "w-4 h-4" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 bg-white/70 rounded-2xl border border-slate-200/60 space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase text-slate-400",
									children: "You Receive (Est.)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg font-extrabold text-blue-600",
										children: calculatedConversionResult
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: convertTo,
										onChange: (e) => setConvertTo(e.target.value),
										className: "apple-glass-interactive px-2.5 py-1 rounded-xl text-xs font-bold text-slate-800",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "USD",
												children: "USD ($)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "ETH",
												children: "ETH"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "SOL",
												children: "SOL"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "USDT",
												children: "USDT"
											})
										]
									})]
								})]
							})
						]
					})]
				})
			}),
			settingsModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 transition-all",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "apple-glass w-full max-w-md rounded-3xl p-6 shadow-2xl relative border border-white/80 space-y-4 animate-in fade-in zoom-in-95 duration-200",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-slate-200/50 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-5 h-5 text-slate-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-extrabold text-slate-900 text-base",
									children: "Crypto Preferences & Settings"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSettingsModalOpen(false),
								className: "apple-glass-interactive p-1.5 rounded-xl text-slate-500 hover:text-slate-900",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 max-h-[60vh] overflow-y-auto pr-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between p-3 bg-white/70 rounded-2xl border border-slate-200/60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-bold text-slate-900 text-xs",
										children: "Anti-Gravity Particle Bubbles"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-slate-500",
										children: "Floating 3D crypto coins & glass bubbles background"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: physicsEnabled,
										onChange: (e) => {
											setPhysicsEnabled(e.target.checked);
											showToast(`Background floating bubbles ${e.target.checked ? "enabled" : "paused"}`);
										},
										className: "w-4 h-4 accent-blue-600 cursor-pointer"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 bg-white/70 rounded-2xl border border-slate-200/60 space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-bold text-slate-900 text-xs",
											children: "Telemetry Refresh Frequency"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md",
											children: telemetrySpeed
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: telemetrySpeed,
										onChange: (e) => {
											setTelemetrySpeed(e.target.value);
											showToast(`Telemetry refresh rate set to ${e.target.value}`);
										},
										className: "w-full apple-glass-interactive px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-800",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Realtime",
												children: "Real-time Stream (Sub-second)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "5s",
												children: "Every 5 Seconds"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "15s",
												children: "Every 15 Seconds"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 bg-white/70 rounded-2xl border border-slate-200/60 space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-bold text-slate-900 text-xs",
											children: "AI Model Creativity (Temperature)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] font-bold text-blue-600",
											children: [
												temperature,
												" ",
												temperature < .4 ? "(Precise)" : temperature > .8 ? "(Creative)" : "(Balanced)"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: "0.1",
										max: "1.0",
										step: "0.1",
										value: temperature,
										onChange: (e) => setTemperature(parseFloat(e.target.value)),
										className: "w-full accent-blue-600 cursor-pointer"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 bg-white/70 rounded-2xl border border-slate-200/60 space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-bold text-slate-900 text-xs",
											children: "Speech Synthesis Voice Speed"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] font-bold text-slate-600",
											children: [speechRate, "x"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: speechRate,
										onChange: (e) => setSpeechRate(parseFloat(e.target.value)),
										className: "w-full apple-glass-interactive px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-800",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: .8,
												children: "0.8x Smooth Pace"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: 1,
												children: "1.0x Standard"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: 1.25,
												children: "1.25x Fast Telemetry"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between p-3 bg-white/70 rounded-2xl border border-slate-200/60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-bold text-slate-900 text-xs",
										children: "Audio Feedback & Tone FX"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-slate-500",
										children: "Chime sounds on message receipt and alerts"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: soundEffects,
										onChange: (e) => {
											setSoundEffects(e.target.checked);
											showToast("Audio feedback toggled");
										},
										className: "w-4 h-4 accent-blue-600 cursor-pointer"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between p-3 bg-white/70 rounded-2xl border border-slate-200/60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-bold text-slate-900 text-xs",
										children: "Auto-Scroll to New Messages"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-slate-500",
										children: "Automatically stick scrollbar to latest response"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: autoScroll,
										onChange: (e) => {
											setAutoScroll(e.target.checked);
											showToast("Auto-scroll setting saved");
										},
										className: "w-4 h-4 accent-blue-600 cursor-pointer"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setSettingsModalOpen(false);
								showToast("Preferences saved successfully!");
							},
							className: "w-full btn-glass-getstarted py-2.5 rounded-xl font-bold text-xs text-white shadow-md",
							children: "Save Preferences"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: "bookmarksDrawer",
				className: `fixed top-0 right-0 h-full w-80 z-50 apple-glass border-l border-white/80 shadow-2xl p-5 transform transition-transform duration-300 ease-in-out flex flex-col justify-between ${bookmarksDrawerOpen ? "translate-x-0" : "translate-x-full"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-slate-200/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "w-5 h-5 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-slate-900 text-sm",
								children: "Saved Intelligence"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setBookmarksDrawerOpen(false),
							className: "apple-glass-interactive p-1.5 rounded-xl text-slate-500 hover:text-slate-900",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						id: "bookmarksList",
						className: "space-y-2.5 max-h-[75vh] overflow-y-auto pr-1",
						children: savedBookmarks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-400 font-medium text-center py-8",
							children: "No saved insights yet. Click Save on any response to store it here!"
						}) : savedBookmarks.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 bg-white/80 rounded-2xl border border-white shadow-sm space-y-1.5 relative group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-slate-800 line-clamp-3",
								children: item
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-2 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => void copyToClipboard(item),
									className: "text-[10px] font-bold text-blue-600 hover:underline",
									children: "Copy"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => removeBookmark(idx),
									className: "text-[10px] font-bold text-rose-500 hover:underline",
									children: "Remove"
								})]
							})]
						}, idx))
					})]
				}), savedBookmarks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: clearAllBookmarks,
					className: "w-full apple-glass-interactive py-2 rounded-xl text-xs font-bold text-rose-600 flex items-center justify-center gap-1 border-rose-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, { className: "w-3.5 h-3.5" }), " Clear All Bookmarks"]
				})]
			})
		]
	});
}
//#endregion
export { AKChat as component };
