import React, { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowDownUp,
  ArrowLeftRight,
  ArrowRight,
  ArrowUp,
  BarChart3,
  Bookmark,
  Bot,
  Check,
  ChevronDown,
  Code2,
  Copy,
  FileUp,
  Flame,
  Globe,
  Image as ImageIcon,
  Layers,
  LayoutDashboard,
  LineChart,
  Loader2,
  Mic,
  Paperclip,
  Plus,
  Radar,
  Send,
  Settings,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Trash,
  Trash2,
  TrendingUp,
  User,
  Volume2,
  VolumeX,
  Wallet,
  X,
} from "lucide-react";
import { ParticleEngine } from "@/components/particle-engine";
import { MarketTicker } from "@/components/market-ticker";
import { MessageResponse } from "@/components/ai-elements/message";
import { AntigravityHero } from "@/components/antigravity-hero";
import { LiveCryptoChart } from "@/components/live-crypto-chart";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  attachedFile?: string;
  prompt?: string;
  error?: boolean;
};

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AK Luxe Chat - Next-Gen Crypto Intelligence" },
      {
        name: "description",
        content: "Institutional-grade crypto research and digital asset intelligence with AK.",
      },
      { property: "og:title", content: "AK Luxe Chat - Next-Gen Crypto Intelligence" },
      {
        property: "og:description",
        content: "Institutional-grade crypto research and digital asset intelligence with AK.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AKChat,
});

const conversionRates: Record<string, Record<string, number>> = {
  BTC: { USD: 98420.5, ETH: 28.52, SOL: 462.5, USDT: 98420.5 },
  ETH: { USD: 3450.2, ETH: 1, SOL: 16.2, USDT: 3450.2 },
  SOL: { USD: 212.8, ETH: 0.061, SOL: 1, USDT: 212.8 },
};

function AKChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [savedBookmarks, setSavedBookmarks] = useState<string[]>([]);
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState(false);

  // Active layer & filters
  const [activeLayer, setActiveLayer] = useState("Market structure");
  const [activeCategory, setActiveCategory] = useState("Markets Overview");
  const [activeModel, setActiveModel] = useState("AK-Crypto v4");
  const [activeModelDesc, setActiveModelDesc] = useState("Pro Crypto Model");
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [getStartedModalOpen, setGetStartedModalOpen] = useState(false);
  const [chartModalOpen, setChartModalOpen] = useState(false);
  const [converterModalOpen, setConverterModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [welcomePopupOpen, setWelcomePopupOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("ak_welcome_dismissed");
      if (!seen) {
        setWelcomePopupOpen(true);
      }
    }
  }, []);

  const dismissWelcomePopup = () => {
    setWelcomePopupOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ak_welcome_dismissed", "true");
    }
    showToast("Welcome to AK Luxe Terminal");
  };

  // Attachments & Extras
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isWebSearchActive, setIsWebSearchActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [physicsEnabled, setPhysicsEnabled] = useState(true);

  // Converter state
  const [convertAmount, setConvertAmount] = useState(1);
  const [convertFrom, setConvertFrom] = useState("BTC");
  const [convertTo, setConvertTo] = useState("USD");
  const [chartAsset, setChartAsset] = useState<"BTC" | "ETH" | "SOL">("BTC");
  const [chartTimeframe, setChartTimeframe] = useState<"1D" | "1W" | "1M">("1D");
  const [chartPrices, setChartPrices] = useState<Record<string, string>>({
    BTC: "$93,840.00",
    ETH: "$3,385.00",
    SOL: "$188.40",
  });

  const timeframeStats: Record<"BTC" | "ETH" | "SOL", Record<"1D" | "1W" | "1M", { change: string; isPositive: boolean; high: string; low: string }>> = {
    BTC: {
      "1D": { change: "+3.42%", isPositive: true, high: "$94,820", low: "$91,450" },
      "1W": { change: "+11.85%", isPositive: true, high: "$95,100", low: "$84,200" },
      "1M": { change: "+28.60%", isPositive: true, high: "$95,400", low: "$72,150" },
    },
    ETH: {
      "1D": { change: "+4.18%", isPositive: true, high: "$3,490", low: "$3,310" },
      "1W": { change: "+9.40%", isPositive: true, high: "$3,520", low: "$3,080" },
      "1M": { change: "+24.15%", isPositive: true, high: "$3,560", low: "$2,690" },
    },
    SOL: {
      "1D": { change: "+8.65%", isPositive: true, high: "$198.50", low: "$179.20" },
      "1W": { change: "+21.30%", isPositive: true, high: "$202.00", low: "$158.40" },
      "1M": { change: "+46.80%", isPositive: true, high: "$205.00", low: "$129.00" },
    },
  };

  // Settings
  const [telemetrySpeed, setTelemetrySpeed] = useState("Realtime");
  const [temperature, setTemperature] = useState(0.7);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);

  // Toast alerts
  const [toasts, setToasts] = useState<Array<{ id: number; text: string }>>([]);

  // Typewriter welcome text
  const [typedWelcome, setTypedWelcome] = useState("");
  const fullWelcomeText =
    "AK Luxe Intelligence Engine • Synthesizing institutional on-chain telemetry, order book liquidation clusters, and protocol risk context in real time. How can I assist your crypto research today?";

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const miniChartBTCRef = useRef<HTMLCanvasElement | null>(null);
  const miniChartETHRef = useRef<HTMLCanvasElement | null>(null);
  const cursorGlowRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  const showToast = useCallback((msg: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, text: msg }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // Ambient Cursor Glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Typewriter effect on load
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullWelcomeText.length) {
        setTypedWelcome(fullWelcomeText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 14);
    return () => clearInterval(interval);
  }, []);

  // 4. Live Real-Time Flowing Crypto Graphs Animation (Minimal & Premium)
  useEffect(() => {
    let animId = 0;
    let phase = 0;

    const basePtsBTC = [22, 28, 25, 36, 32, 44, 40, 50, 47, 56];
    const basePtsETH = [34, 30, 40, 37, 48, 44, 54, 47, 58, 56];

    function drawFlowingSparkline(
      canvas: HTMLCanvasElement | null,
      basePts: number[],
      strokeColor: string,
      fillColor: string,
      phaseOffset: number
    ) {
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

      // 1. Subtle Institutional Micro-Grid Lines
      ctx.strokeStyle = "rgba(0, 0, 0, 0.04)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(0, h * 0.35);
      ctx.lineTo(w, h * 0.35);
      ctx.moveTo(0, h * 0.7);
      ctx.lineTo(w, h * 0.7);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Compute smooth oscillating real-time data points
      const pts = basePts.map(
        (val, i) =>
          val +
          Math.sin(phase + phaseOffset + i * 0.6) * 3.8 +
          Math.cos(phase * 1.3 + i * 0.4) * 1.5
      );

      const max = Math.max(...pts) + 4;
      const min = Math.min(...pts) - 4;

      const coords: Array<{ x: number; y: number }> = [];
      for (let i = 0; i < pts.length; i++) {
        const x = (w / (pts.length - 1)) * i;
        const y = h - ((pts[i]! - min) / (max - min || 1)) * (h - 20) - 6;
        coords.push({ x, y });
      }

      // 3. Faint Baseline Volume Bars
      ctx.fillStyle = fillColor;
      for (let i = 0; i < coords.length; i++) {
        const barH = 4 + Math.abs(Math.sin(phase + i)) * 8;
        ctx.fillRect(coords[i]!.x - 2, h - barH, 4, barH);
      }

      // 4. Smooth Bézier Curve Path
      ctx.beginPath();
      ctx.moveTo(coords[0]!.x, coords[0]!.y);
      for (let i = 0; i < coords.length - 1; i++) {
        const cpX = (coords[i]!.x + coords[i + 1]!.x) / 2;
        const cpY = (coords[i]!.y + coords[i + 1]!.y) / 2;
        ctx.quadraticCurveTo(coords[i]!.x, coords[i]!.y, cpX, cpY);
      }
      const lastCoord = coords[coords.length - 1]!;
      ctx.lineTo(lastCoord.x, lastCoord.y);

      // Area Fill
      ctx.save();
      const fillPath = new Path2D();
      fillPath.moveTo(coords[0]!.x, coords[0]!.y);
      for (let i = 0; i < coords.length - 1; i++) {
        const cpX = (coords[i]!.x + coords[i + 1]!.x) / 2;
        const cpY = (coords[i]!.y + coords[i + 1]!.y) / 2;
        fillPath.quadraticCurveTo(coords[i]!.x, coords[i]!.y, cpX, cpY);
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

      // Glowing Stroke Line
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // 5. Leading Edge Pulse Beacon & Expanding Radar Wave
      const pulsePhase = (phase * 2) % (Math.PI * 2);
      const ringRadius = 4 + Math.sin(pulsePhase) * 5;
      const ringAlpha = Math.max(0, 0.4 - (ringRadius / 9) * 0.4);

      // Radar ring
      ctx.beginPath();
      ctx.arc(lastCoord.x - 2, lastCoord.y, ringRadius + 2, 0, Math.PI * 2);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;
      ctx.fillStyle = `rgba(255, 255, 255, ${ringAlpha})`;
      ctx.fill();
      ctx.stroke();

      // Center solid beacon
      ctx.beginPath();
      ctx.arc(lastCoord.x - 2, lastCoord.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = strokeColor;
      ctx.fill();
    }

    function renderGraphs() {
      phase += 0.038;
      drawFlowingSparkline(
        miniChartBTCRef.current,
        basePtsBTC,
        "#f59e0b",
        "rgba(245, 158, 11, 0.2)",
        0
      );
      drawFlowingSparkline(
        miniChartETHRef.current,
        basePtsETH,
        "#6366f1",
        "rgba(99, 102, 241, 0.2)",
        Math.PI / 2
      );
      animId = requestAnimationFrame(renderGraphs);
    }

    renderGraphs();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (autoScroll && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isSending, autoScroll]);

  // Speech Recognition setup
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
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
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
          showToast("Listening... Speak now");
        } catch {
          setIsListening(false);
        }
      } else {
        setIsListening(true);
        showToast("Listening... Speak now");
        setTimeout(() => {
          setInput((prev) =>
            prev
              ? `${prev} Analyze BTC market structure & liquidations`
              : "Analyze BTC market structure & liquidations"
          );
          setIsListening(false);
          showToast("Voice transcription captured");
        }, 1600);
      }
    }
  };

  // Webhook execution with real n8n backend
  const requestReply = useCallback(
    async (promptText: string, replaceId?: string) => {
      setIsSending(true);
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "text/plain; charset=utf-8" },
          body: promptText,
        });

        const data = (await response.json()) as { reply?: string; error?: string };
        if (!response.ok || !data.reply) {
          throw new Error(data.error || "AK could not complete that request.");
        }

        const assistantMsg: ChatMessage = {
          id: replaceId ?? newId(),
          role: "assistant",
          content: data.reply,
          prompt: promptText,
        };

        setMessages((current) =>
          replaceId
            ? current.map((m) => (m.id === replaceId ? assistantMsg : m))
            : [...current, assistantMsg]
        );

        if (soundEffects && typeof Audio !== "undefined") {
          // Subtle tone chime
        }
      } catch (error) {
        const content =
          error instanceof Error
            ? error.message
            : "AK is temporarily unavailable. Please try again.";
        const failedMsg: ChatMessage = {
          id: replaceId ?? newId(),
          role: "assistant",
          content,
          prompt: promptText,
          error: true,
        };
        setMessages((current) =>
          replaceId
            ? current.map((m) => (m.id === replaceId ? failedMsg : m))
            : [...current, failedMsg]
        );
      } finally {
        setIsSending(false);
        requestAnimationFrame(() => userInputRef.current?.focus());
      }
    },
    [soundEffects]
  );

  const sendMessage = async () => {
    const text = input.trim();
    if (!text && !attachedFile) return;

    const fullPrompt = attachedFile ? `[Attached: ${attachedFile.name}] ${text}` : text;

    const userMsg: ChatMessage = {
      id: newId(),
      role: "user",
      content: text || `Uploaded attachment: ${attachedFile?.name}`,
      attachedFile: attachedFile?.name,
    };

    setMessages((current) => [...current, userMsg]);
    setInput("");
    setAttachedFile(null);
    setShowPlusMenu(false);

    await requestReply(fullPrompt);
  };

  const sendQuickPrompt = (prompt: string) => {
    setInput(prompt);
    void requestReply(prompt);
  };

  const clearChat = () => {
    setMessages([]);
    setInput("");
    setAttachedFile(null);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
    showToast("Chat history cleared");
  };

  const toggleSpeech = (message: ChatMessage) => {
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
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(message.id);
    window.speechSynthesis.speak(utterance);
    showToast("Reading aloud...");
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    showToast("Copied to clipboard!");
  };

  const bookmarkMessage = (content: string) => {
    if (!savedBookmarks.includes(content)) {
      setSavedBookmarks((prev) => [...prev, content]);
      showToast("Saved insight to bookmarks!");
    } else {
      showToast("Insight is already bookmarked");
    }
  };

  const removeBookmark = (index: number) => {
    setSavedBookmarks((prev) => prev.filter((_, i) => i !== index));
    showToast("Removed bookmark");
  };

  const clearAllBookmarks = () => {
    setSavedBookmarks([]);
    showToast("Bookmarks cleared");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
      showToast(`Attached file: ${file.name}`);
      setShowPlusMenu(false);
    }
  };

  const triggerPlusAction = (actionType: string) => {
    setShowPlusMenu(false);
    if (actionType === "photos") {
      showToast("Photo & Chart Inspector Ready");
      setInput("Analyze this chart pattern for liquidation zones: ");
    } else if (actionType === "code") {
      showToast("Smart Contract & Code Audit Mode Ready");
      setInput("Audit this smart contract for reentrancy & risk: ");
    } else if (actionType === "canvas") {
      showToast("Canvas Telemetry Report Initialized");
      void sendQuickPrompt("Generate a comprehensive market canvas telemetry report.");
    } else if (actionType === "web") {
      setIsWebSearchActive((prev) => {
        const next = !prev;
        showToast(next ? "Live Web Telemetry Search Enabled" : "Live Web Search Disabled");
        return next;
      });
    }
  };

  const filterMarketCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
    void sendQuickPrompt(`Show market breakdown for ${categoryName}`);
  };

  // Convert calculation
  const calculatedConversionResult = (() => {
    const rate = conversionRates[convertFrom]?.[convertTo] ?? 1;
    const res = (convertAmount * rate).toLocaleString(undefined, { maximumFractionDigits: 4 });
    return (convertTo === "USD" || convertTo === "USDT" ? "$" : "") + res;
  })();

  return (
    <div className="w-screen h-screen flex flex-col bg-[#f0f3f8] text-slate-800 h-screen overflow-hidden relative flex flex-col font-sans select-none">
      {/* Ambient Cursor Glow Halo */}
      <div id="cursorGlow" ref={cursorGlowRef} />

      {/* Floating Anti-Gravity Background Canvas */}
      <ParticleEngine physicsEnabled={physicsEnabled} />

      {/* Toast Notification Container */}
      <div id="toastContainer">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="toast-msg apple-glass px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-900 shadow-xl flex items-center gap-2 border border-white"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span>{t.text}</span>
          </div>
        ))}
      </div>

      {/* TOP CRYPTO TICKER MARQUEE */}
      <MarketTicker />

      {/* MAIN INTERFACE LAYOUT */}
      <div className="relative z-10 flex-1 flex overflow-hidden p-2 sm:p-3 gap-2 sm:gap-3 w-full h-[calc(100dvh-37px)] max-w-full">
        {/* SIDEBAR NAVIGATION & PREMIUM APPLE GLASS CHARTS */}
        <aside className="w-72 rounded-3xl flex flex-col justify-between p-4 shrink-0 hidden lg:flex overflow-y-auto backdrop-blur-3xl bg-white/45 border border-white/80 shadow-[0_20px_50px_rgba(8,_112,_184,_0.08)] ring-1 ring-white/70 relative overflow-hidden group select-none transition-all duration-300">
          {/* Liquid Glass Ambient Reflections */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/40 pointer-events-none" />
          <div className="absolute -top-16 -left-16 w-44 h-44 rounded-full bg-blue-400/15 blur-2xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-16 -right-16 w-44 h-44 rounded-full bg-indigo-400/15 blur-2xl pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 opacity-90 shadow-sm" />

          <div className="space-y-4 relative z-10">
            {/* AK Monogram Logo Badge */}
            <div
              className="flex items-center gap-3 cursor-pointer group/logo"
              onClick={() => showToast("AK Luxe Crypto Intelligence Active")}
            >
              <div className="w-11 h-11 ak-glass-badge shrink-0 shadow-md group-hover/logo:scale-105 group-hover/logo:shadow-blue-500/20 transition-all duration-300 border border-white/90">
                <svg
                  className="w-7 h-7 ak-svg-icon"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="akGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e40af" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M18 78 L42 22 L54 22 L36 60 L62 22 L78 22 L50 62 L80 78 L63 78 L42 66 L30 78 Z"
                    fill="url(#akGoldGradient)"
                  />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-extrabold text-slate-900 text-base leading-none tracking-tight">
                    AK Luxe
                  </h1>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <span className="text-[11px] text-slate-500 font-bold tracking-wide flex items-center gap-1 mt-0.5">
                  Crypto Neural Core
                </span>
              </div>
            </div>

            {/* Intelligence Layers Section */}
            <div className="p-3 rounded-2xl bg-white/50 backdrop-blur-2xl border border-white/90 shadow-[0_4px_16px_rgba(255,255,255,0.4)] space-y-2">
              <span className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider block px-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-600" /> Intelligence Layers
                </span>
                <span className="text-[9px] font-bold text-blue-600 bg-blue-500/10 px-1.5 py-0.5 rounded-full border border-blue-300/40">
                  Active
                </span>
              </span>
              <nav className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveLayer("Market structure");
                    showToast("Switched active layer to Market structure");
                    void sendQuickPrompt("Give me an overview of the current crypto market structure.");
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all duration-200 cursor-pointer ${
                    activeLayer === "Market structure"
                      ? "text-blue-700 bg-white/95 border border-blue-300 shadow-sm translate-x-0.5 ring-1 ring-blue-400/30"
                      : "text-slate-700 bg-white/40 hover:bg-white/80 hover:translate-x-0.5 border border-transparent hover:border-white/80"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <LineChart className="w-3.5 h-3.5 text-blue-600" /> Market structure
                  </span>
                  {activeLayer === "Market structure" && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveLayer("On-chain signals");
                    showToast("Switched active layer to On-chain signals");
                    void sendQuickPrompt(
                      "What are the most important on-chain signals to watch right now?"
                    );
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all duration-200 cursor-pointer ${
                    activeLayer === "On-chain signals"
                      ? "text-indigo-700 bg-white/95 border border-indigo-300 shadow-sm translate-x-0.5 ring-1 ring-indigo-400/30"
                      : "text-slate-700 bg-white/40 hover:bg-white/80 hover:translate-x-0.5 border border-transparent hover:border-white/80"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-indigo-500" /> On-chain signals
                  </span>
                  {activeLayer === "On-chain signals" && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveLayer("Risk context");
                    showToast("Switched active layer to Risk context");
                    void sendQuickPrompt("Summarize the current risk context for crypto investors.");
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all duration-200 cursor-pointer ${
                    activeLayer === "Risk context"
                      ? "text-amber-700 bg-white/95 border border-amber-300 shadow-sm translate-x-0.5 ring-1 ring-amber-400/30"
                      : "text-slate-700 bg-white/40 hover:bg-white/80 hover:translate-x-0.5 border border-transparent hover:border-white/80"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-500" /> Risk context
                  </span>
                  {activeLayer === "Risk context" && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600" />
                    </span>
                  )}
                </button>
              </nav>
            </div>

            {/* LIVE CRYPTO CHARTS BELOW INTELLIGENCE LAYERS */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-blue-600" /> Live Crypto Markets
                </span>
                <span className="text-[9px] text-emerald-700 font-extrabold bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-300/60 shadow-2xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Real-time
                </span>
              </div>

              {/* Mini Chart Card 1: BTC Depth */}
              <div
                onClick={() => {
                  setChartAsset("BTC");
                  setChartModalOpen(true);
                }}
                className="p-3 rounded-2xl bg-white/55 hover:bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_4px_16px_rgba(255,255,255,0.4)] space-y-2 relative overflow-hidden group/btc cursor-pointer transition-all duration-200 hover:scale-[1.015] hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-amber-500/15 border border-amber-300/80 flex items-center justify-center font-extrabold text-amber-600 text-xs shadow-2xs group-hover/btc:scale-105 transition-transform">
                      ₿
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">Bitcoin Depth</h4>
                      <span className="text-[10px] text-emerald-600 font-mono font-extrabold">$93,840.00</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-500/15 border border-emerald-300/60 px-2 py-0.5 rounded-full">
                    +3.42%
                  </span>
                </div>
                <div className="relative h-16 w-full">
                  <canvas
                    ref={miniChartBTCRef}
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Mini Chart Card 2: ETH Staking */}
              <div
                onClick={() => {
                  setChartAsset("ETH");
                  setChartModalOpen(true);
                }}
                className="p-3 rounded-2xl bg-white/55 hover:bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_4px_16px_rgba(255,255,255,0.4)] space-y-2 relative overflow-hidden group/eth cursor-pointer transition-all duration-200 hover:scale-[1.015] hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-indigo-500/15 border border-indigo-300/80 flex items-center justify-center font-extrabold text-indigo-600 text-xs shadow-2xs group-hover/eth:scale-105 transition-transform">
                      Ξ
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">Ethereum Staking</h4>
                      <span className="text-[10px] text-indigo-600 font-mono font-extrabold">3.4% APY</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-500/15 border border-emerald-300/60 px-2 py-0.5 rounded-full">
                    12 Gwei
                  </span>
                </div>
                <div className="relative h-16 w-full">
                  <canvas
                    ref={miniChartETHRef}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="pt-3 mt-3 border-t border-white/60 flex items-center justify-between text-xs text-slate-500 font-medium shrink-0 relative z-10">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-300/60 text-emerald-700 text-[10px] font-extrabold shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Engine Active
            </span>
            <button
              type="button"
              onClick={() => setSettingsModalOpen(true)}
              className="p-2 rounded-xl text-slate-700 hover:text-blue-600 bg-white/50 hover:bg-white/80 border border-white/80 shadow-2xs flex items-center gap-1 font-semibold transition-all hover:rotate-45 duration-300"
              title="Crypto Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* CHAT MAIN WORKSPACE */}
        <main className="flex-1 flex flex-col rounded-2xl relative apple-glass p-1.5 sm:p-2 min-w-0 max-w-full">
          <div className="w-full h-full flex flex-col rounded-[1rem] overflow-hidden relative bg-[#f0f3f8]/80 backdrop-blur-md p-2 sm:p-3 min-w-0">
            {/* Top Glass Header */}
            <div className="apple-glass rounded-2xl p-2.5 sm:p-3 mb-2 flex flex-wrap items-center justify-between gap-2 sm:gap-3 shadow-sm shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-9.5 sm:h-9.5 ak-glass-badge shrink-0 p-1 sm:p-1.5">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 ak-svg-icon" viewBox="0 0 100 100" fill="none">
                    <path
                      d="M18 78 L42 22 L54 22 L36 60 L62 22 L78 22 L50 62 L80 78 L63 78 L42 66 L30 78 Z"
                      fill="url(#akGoldGradient)"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <h2 className="font-bold text-slate-900 text-xs sm:text-sm truncate">AK Intelligence</h2>
                    <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block truncate">
                    Real-time crypto market intelligence & risk engine
                  </span>
                </div>
              </div>

              {/* Action Controls Header Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                {/* 1. Clean, Premium New Chat Button */}
                <button
                  type="button"
                  onClick={clearChat}
                  className="apple-glass-interactive px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-slate-800 hover:text-blue-600 transition-all flex items-center gap-1 sm:gap-1.5 font-bold text-[11px] sm:text-xs shadow-xs"
                  title="Start a fresh conversation"
                >
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                  <span>New Chat</span>
                </button>

                <div className="h-4 w-px bg-slate-300/60 mx-0.5 hidden md:block" />

                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="btn-glass-signin text-white font-bold text-[11px] sm:text-xs px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow-md transition-all active:scale-95"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => setGetStartedModalOpen(true)}
                  className="btn-glass-getstarted text-white font-bold text-[11px] sm:text-xs px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-md transition-all flex items-center gap-1 active:scale-95"
                >
                  <span>Get started</span>
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>

                <div className="h-4 w-px bg-slate-300/60 mx-0.5 hidden sm:block" />

                <button
                  type="button"
                  onClick={() => setChartModalOpen(true)}
                  className="apple-glass-interactive p-1.5 sm:p-2 rounded-xl text-slate-700 hover:text-blue-600 transition-all flex items-center gap-1 font-bold text-[11px] sm:text-xs"
                  title="Live Price Charts"
                >
                  <LineChart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                  <span className="hidden sm:inline">Charts</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConverterModalOpen(true)}
                  className="apple-glass-interactive p-1.5 sm:p-2 rounded-xl text-slate-700 hover:text-blue-600 transition-all flex items-center gap-1 font-bold text-[11px] sm:text-xs"
                  title="Crypto Converter"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
                  <span className="hidden sm:inline">Swap</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBookmarksDrawerOpen((prev) => !prev)}
                  className="apple-glass-interactive p-1.5 sm:p-2 rounded-xl text-slate-700 hover:text-blue-600 transition-all flex items-center gap-1 font-bold text-[11px] sm:text-xs relative"
                  title="Saved Insights"
                >
                  <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                  {savedBookmarks.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                      {savedBookmarks.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* CHAT MESSAGES SCROLL CONTAINER */}
            <div
              id="chatContainer"
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 pr-1.5 sm:pr-2 pl-0.5 mb-2"
            >
              {/* 2. Google Antigravity Inspired Dual-Color Particle Hero Welcome */}
              <div className="flex justify-center max-w-4xl mx-auto welcome-fade-in w-full">
                <AntigravityHero
                  onQuickPrompt={(prompt) => void sendQuickPrompt(prompt)}
                  typedWelcome={typedWelcome}
                  fullWelcomeText={fullWelcomeText}
                />
              </div>

              {/* Message List */}
              {messages.map((msg) => (
                <div key={msg.id}>
                  {msg.role === "user" ? (
                    <div className="flex justify-end">
                      <div className="user-glass-bubble rounded-2xl px-4 py-3 text-sm font-semibold max-w-lg shadow-md">
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                        {msg.attachedFile && (
                          <div className="mt-1 text-[10px] text-blue-600 flex items-center gap-1 font-bold">
                            <Paperclip className="w-3 h-3" /> {msg.attachedFile}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3 max-w-3xl">
                      <div className="bot-glass-bubble rounded-2xl p-4 text-slate-800 text-sm leading-relaxed max-w-2xl w-full">
                        <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-200/30">
                          <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                            AK Intelligence
                          </span>
                          <span className="text-[10px] text-slate-400">Just now</span>
                        </div>
                        <div className="bot-content space-y-2">
                          <MessageResponse>{msg.content}</MessageResponse>
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-200/40 flex items-center justify-between">
                          <div className="flex gap-1.5">
                            {/* 6. Speaker Icon Button without text */}
                            <button
                              type="button"
                              onClick={() => toggleSpeech(msg)}
                              className="apple-glass-interactive p-1.5 sm:px-2 sm:py-1 rounded-lg text-slate-600 hover:text-blue-600 transition-colors flex items-center justify-center"
                              title={speakingId === msg.id ? "Stop voice" : "Read aloud"}
                            >
                              {speakingId === msg.id ? (
                                <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                              ) : (
                                <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => bookmarkMessage(msg.content)}
                              className="apple-glass-interactive px-2 py-1 rounded-lg text-[11px] text-slate-500 flex items-center gap-1 font-semibold"
                              title="Bookmark Insight"
                            >
                              <Bookmark className="w-3.5 h-3.5 text-amber-500" /> Save
                            </button>
                            <button
                              type="button"
                              onClick={() => void copyToClipboard(msg.content)}
                              className="apple-glass-interactive px-2 py-1 rounded-lg text-[11px] text-slate-500"
                              title="Copy"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Thinking Bubble */}
              {isSending && (
                <div className="flex gap-3 max-w-3xl thinking-msg">
                  <div className="thinking-bubble rounded-2xl px-4 py-2.5 text-slate-700 text-xs font-bold flex items-center gap-2 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    <span>Thinking</span>
                  </div>
                </div>
              )}
            </div>

            {/* BOTTOM CONTROLS & CHAT INPUT */}
            <div className="mt-2 space-y-2 shrink-0">
              {/* Combined Quick Suggestion & Market Filter Pills Below Chat */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  type="button"
                  onClick={() => filterMarketCategory("Markets Overview")}
                  className={`market-top-btn px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shrink-0 ${
                    activeCategory === "Markets Overview"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "apple-glass-interactive text-slate-800"
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" /> Markets Overview
                </button>
                <button
                  type="button"
                  onClick={() => filterMarketCategory("On-Chain Signals")}
                  className={`market-top-btn px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 ${
                    activeCategory === "On-Chain Signals"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "apple-glass-interactive text-slate-800"
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-indigo-500" /> On-Chain Signals
                </button>
                <button
                  type="button"
                  onClick={() => filterMarketCategory("Liquidity Heatmap")}
                  className={`market-top-btn px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 ${
                    activeCategory === "Liquidity Heatmap"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "apple-glass-interactive text-slate-800"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" /> Heatmap
                </button>
                <button
                  type="button"
                  onClick={() => filterMarketCategory("Risk Audit")}
                  className={`market-top-btn px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 ${
                    activeCategory === "Risk Audit"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "apple-glass-interactive text-slate-800"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Risk Context
                </button>
                <button
                  type="button"
                  onClick={() => filterMarketCategory("Whale Alert")}
                  className={`market-top-btn px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 ${
                    activeCategory === "Whale Alert"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "apple-glass-interactive text-slate-800"
                  }`}
                >
                  <Radar className="w-3.5 h-3.5 text-purple-500" /> Whale Alert
                </button>
                <button
                  type="button"
                  onClick={() => filterMarketCategory("AI Arbitrage")}
                  className={`market-top-btn px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 ${
                    activeCategory === "AI Arbitrage"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "apple-glass-interactive text-slate-800"
                  }`}
                >
                  <Bot className="w-3.5 h-3.5 text-cyan-500" /> AI Arbitrage
                </button>

                <button
                  type="button"
                  onClick={() => void sendQuickPrompt("BTC Price Outlook")}
                  className="apple-glass-interactive px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 shrink-0"
                >
                  BTC Outlook
                </button>
                <button
                  type="button"
                  onClick={() => void sendQuickPrompt("ETH Staking Yields")}
                  className="apple-glass-interactive px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 shrink-0"
                >
                  ETH Staking
                </button>
                <button
                  type="button"
                  onClick={() => void sendQuickPrompt("DeFi Liquidity Trends")}
                  className="apple-glass-interactive px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 shrink-0"
                >
                  DeFi Trends
                </button>
                <button
                  type="button"
                  onClick={() => void sendQuickPrompt("Solana Ecosystem Speed")}
                  className="apple-glass-interactive px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 shrink-0"
                >
                  Solana Speed
                </button>
                <button
                  type="button"
                  onClick={() => void sendQuickPrompt("Risk Assessment Mode")}
                  className="apple-glass-interactive px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 shrink-0"
                >
                  Risk Audit
                </button>
              </div>

              {/* Attachment Preview Tag */}
              {attachedFile && (
                <div className="flex items-center gap-2 bg-white/90 border border-slate-200 px-3 py-1.5 rounded-xl text-xs w-fit shadow-sm animate-in fade-in">
                  <Paperclip className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-medium text-slate-700">{attachedFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setAttachedFile(null)}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Chat Input Bar with Exclusive Ambient Glow Halo */}
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-400 opacity-30 blur-md group-hover:opacity-60 transition duration-500 pointer-events-none" />

                <div className="relative apple-glass rounded-2xl p-2 flex flex-col gap-2 border border-white/90 shadow-xl bg-white/80">
                  {/* ChatGPT-Style Plus Menu Dropdown */}
                  {showPlusMenu && (
                    <div className="absolute bottom-14 left-0 z-50 w-64 apple-glass rounded-2xl p-2 border border-white/90 shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-150">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 px-3 py-1.5 block">
                        Add to conversation
                      </span>

                      <label className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50 flex items-center gap-2.5 cursor-pointer transition-all">
                        <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600">
                          <FileUp className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block leading-tight">Upload Documents</span>
                          <span className="text-[10px] font-normal text-slate-500">
                            PDF, CSV, TXT telemetry audit
                          </span>
                        </div>
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => triggerPlusAction("photos")}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50 flex items-center gap-2.5 transition-all"
                      >
                        <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-600">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block leading-tight">Add Photos & Charts</span>
                          <span className="text-[10px] font-normal text-slate-500">
                            Analyze screenshots & diagrams
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => triggerPlusAction("code")}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50 flex items-center gap-2.5 transition-all"
                      >
                        <div className="p-1.5 rounded-lg bg-amber-100 text-amber-600">
                          <Code2 className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block leading-tight">Smart Contract & Code</span>
                          <span className="text-[10px] font-normal text-slate-500">
                            Solidity, Rust, or Python snippet
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => triggerPlusAction("canvas")}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50 flex items-center gap-2.5 transition-all"
                      >
                        <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600">
                          <LayoutDashboard className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block leading-tight">Create Canvas Report</span>
                          <span className="text-[10px] font-normal text-slate-500">
                            Structured telemetry report
                          </span>
                        </div>
                      </button>

                      <div className="border-t border-slate-200/60 my-1 pt-1" />

                      <button
                        type="button"
                        onClick={() => triggerPlusAction("web")}
                        className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 flex items-center gap-2"
                      >
                        <Globe className="w-4 h-4 text-blue-500" /> Search Live Web Telemetry
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 sm:gap-2 w-full min-w-0">
                    {/* Plus Menu Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setShowPlusMenu((prev) => !prev)}
                      className="apple-glass-interactive p-2 sm:p-2.5 rounded-xl text-slate-600 hover:text-blue-600 transition-all flex items-center justify-center shrink-0"
                      title="Add Content"
                    >
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>

                    {/* Web Search Toggle Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsWebSearchActive((prev) => {
                          const next = !prev;
                          showToast(
                            next
                              ? "Live Web Telemetry Search Enabled"
                              : "Live Web Search Disabled"
                          );
                          return next;
                        });
                      }}
                      className={`p-2 sm:p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 ${
                        isWebSearchActive
                          ? "apple-glass-interactive text-blue-600 bg-blue-100 border border-blue-300"
                          : "apple-glass-interactive text-slate-500 hover:text-blue-600"
                      }`}
                      title="Toggle Live Web Telemetry Search"
                    >
                      <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>

                    {/* 2. Compact Glassy Model Selector inside Input Bar */}
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() => setModelDropdownOpen((prev) => !prev)}
                        className="apple-glass-interactive text-[10px] sm:text-[11px] font-bold text-blue-700 bg-blue-500/10 border border-blue-300/80 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-xl flex items-center gap-1 sm:gap-1.5 shadow-xs transition-all hover:bg-blue-500/20"
                        title="Select AI Model"
                      >
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-semibold hidden xs:inline">{activeModel}</span>
                        <span className="font-semibold xs:hidden">{activeModel.split(" ")[0]}</span>
                        <ChevronDown className="w-3 h-3 text-blue-600" />
                      </button>

                      {modelDropdownOpen && (
                        <div className="absolute bottom-12 left-0 z-50 w-60 apple-model-dropdown rounded-2xl p-2.5 border border-white/95 shadow-2xl space-y-1">
                          <span className="text-[10px] font-extrabold uppercase text-slate-500 px-2 py-1 block tracking-wider">
                            Select AI Engine
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveModel("AK-Crypto v4");
                              setActiveModelDesc("Pro Crypto Model");
                              setModelDropdownOpen(false);
                              showToast("Switched active AI engine to AK-Crypto v4");
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                              activeModel === "AK-Crypto v4"
                                ? "bg-blue-600 text-white shadow-xs"
                                : "text-slate-800 hover:bg-blue-50/80"
                            }`}
                          >
                            <span>AK-Crypto v4</span>
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                                activeModel === "AK-Crypto v4"
                                  ? "bg-white/20 text-white"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              Fast
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveModel("GPT-4o Crypto");
                              setActiveModelDesc("OpenAI Telemetry");
                              setModelDropdownOpen(false);
                              showToast("Switched active AI engine to GPT-4o Crypto");
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                              activeModel === "GPT-4o Crypto"
                                ? "bg-blue-600 text-white shadow-xs"
                                : "text-slate-800 hover:bg-blue-50/80"
                            }`}
                          >
                            <span>GPT-4o Crypto</span>
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                                activeModel === "GPT-4o Crypto"
                                  ? "bg-white/20 text-white"
                                  : "bg-emerald-100 text-emerald-700"
                              }`}
                            >
                              Smart
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveModel("Claude 3.5 Sonnet");
                              setActiveModelDesc("Anthropic Reasoning");
                              setModelDropdownOpen(false);
                              showToast("Switched active AI engine to Claude 3.5 Sonnet");
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                              activeModel === "Claude 3.5 Sonnet"
                                ? "bg-blue-600 text-white shadow-xs"
                                : "text-slate-800 hover:bg-blue-50/80"
                            }`}
                          >
                            <span>Claude 3.5 Sonnet</span>
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                                activeModel === "Claude 3.5 Sonnet"
                                  ? "bg-white/20 text-white"
                                  : "bg-purple-100 text-purple-700"
                              }`}
                            >
                              Deep
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveModel("DeepSeek R1");
                              setActiveModelDesc("Reasoning Engine");
                              setModelDropdownOpen(false);
                              showToast("Switched active AI engine to DeepSeek R1");
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                              activeModel === "DeepSeek R1"
                                ? "bg-blue-600 text-white shadow-xs"
                                : "text-slate-800 hover:bg-blue-50/80"
                            }`}
                          >
                            <span>DeepSeek R1</span>
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                                activeModel === "DeepSeek R1"
                                  ? "bg-white/20 text-white"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              Math
                            </span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Text Input Box */}
                    <input
                      ref={userInputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          void sendMessage();
                        }
                      }}
                      placeholder="Ask AK Intelligence about markets, protocols, or risk..."
                      className="flex-1 bg-transparent px-1.5 sm:px-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium min-w-0"
                    />

                    {/* Voice Waveform Button */}
                    <button
                      type="button"
                      onClick={toggleVoiceInput}
                      className="apple-glass-interactive px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl text-slate-600 flex items-center gap-1.5 shrink-0"
                      title="Voice Search"
                    >
                      {isListening ? (
                        <div className="flex items-center gap-0.5 h-4 sm:h-5">
                          <span
                            className="w-1 bg-blue-600 rounded-full siri-wave-bar"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <span
                            className="w-1 bg-indigo-600 rounded-full siri-wave-bar"
                            style={{ animationDelay: "0.25s" }}
                          />
                          <span
                            className="w-1 bg-amber-500 rounded-full siri-wave-bar"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                      ) : (
                        <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
                      )}
                    </button>

                    {/* 3. Gemini-Style Send Button */}
                    <button
                      type="button"
                      disabled={isSending || (!input.trim() && !attachedFile)}
                      onClick={() => void sendMessage()}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 ${
                        input.trim() || attachedFile
                          ? "bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/30 hover:scale-105 active:scale-95 cursor-pointer ring-1 ring-white/60"
                          : "bg-slate-200/70 dark:bg-slate-800/60 text-slate-400 cursor-not-allowed opacity-60"
                      }`}
                      title="Send message"
                    >
                      {isSending ? (
                        <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin text-white" />
                      ) : (
                        <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 1. FIRST-VISIT ANTIGRAVITY WELCOME POPUP */}
      {welcomePopupOpen && (
        <div className="fixed inset-0 z-50 welcome-popup-backdrop flex items-center justify-center p-4 transition-all">
          <div className="welcome-popup-card w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl relative space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 ak-glass-badge p-2 shrink-0">
                  <svg className="w-8 h-8 ak-svg-icon" viewBox="0 0 100 100" fill="none">
                    <path
                      d="M18 78 L42 22 L54 22 L36 60 L62 22 L78 22 L50 62 L80 78 L63 78 L42 66 L30 78 Z"
                      fill="url(#akGoldGradient)"
                    />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-100/90 px-2 py-0.5 rounded-full">
                      Next-Gen Crypto Intelligence
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight mt-0.5">
                    Welcome to AK Luxe
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={dismissWelcomePopup}
                className="apple-glass-interactive p-2 rounded-xl text-slate-500 hover:text-slate-900 transition-colors"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Institutional-grade digital asset research, real-time market telemetry, on-chain signal
              analysis, and portfolio risk intelligence powered by CME Community AI Agents & Pinecone.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 rounded-2xl bg-white/70 border border-white/90 shadow-xs space-y-1">
                <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xs">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Market Depth</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Liquidation clusters & order book telemetry
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white/70 border border-white/90 shadow-xs space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-xs">
                  <Activity className="w-3.5 h-3.5" />
                  <span>On-Chain</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Whale flow tracking & staking yield audits
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white/70 border border-white/90 shadow-xs space-y-1">
                <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Risk Radar</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Protocol vulnerabilities & volatility context
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                Session memory initialized
              </span>
              <button
                type="button"
                onClick={dismissWelcomePopup}
                className="w-full sm:w-auto btn-glass-getstarted px-6 py-3 rounded-2xl font-extrabold text-xs text-white shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Launch Crypto Terminal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIGN IN MODAL */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 transition-all">
          <div className="apple-glass w-full max-w-sm rounded-3xl p-6 shadow-2xl relative border border-white/80 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200/50 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 ak-glass-badge p-1">
                  <svg className="w-5 h-5 ak-svg-icon" viewBox="0 0 100 100" fill="none">
                    <path
                      d="M18 78 L42 22 L54 22 L36 60 L62 22 L78 22 L50 62 L80 78 L63 78 L42 66 L30 78 Z"
                      fill="url(#akGoldGradient)"
                    />
                  </svg>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">Sign In to AK Luxe</h3>
              </div>
              <button
                type="button"
                onClick={() => setAuthModalOpen(false)}
                className="apple-glass-interactive p-1.5 rounded-xl text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  setAuthModalOpen(false);
                  showToast("Successfully authenticated via Google");
                }}
                className="w-full apple-glass-interactive py-3 px-4 rounded-xl font-bold text-xs text-slate-800 flex items-center justify-center gap-2.5 shadow-sm border border-slate-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthModalOpen(false);
                  showToast("Successfully authenticated via Web3 Wallet");
                }}
                className="w-full btn-glass-signin py-3 px-4 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-2.5 shadow-md"
              >
                <Wallet className="w-4 h-4 text-blue-400" />
                <span>Connect Web3 Wallet</span>
              </button>

              <div className="flex items-center my-2">
                <div className="flex-1 border-t border-slate-200" />
                <span className="px-2 text-[10px] font-extrabold uppercase text-slate-400">
                  or email
                </span>
                <div className="flex-1 border-t border-slate-200" />
              </div>

              <input
                type="email"
                placeholder="name@domain.com"
                className="w-full apple-glass-interactive px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 outline-none"
              />

              <button
                type="button"
                onClick={() => {
                  setAuthModalOpen(false);
                  showToast("Successfully authenticated via Email");
                }}
                className="w-full btn-glass-getstarted py-2.5 rounded-xl font-bold text-xs text-white shadow-md"
              >
                Sign In with Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GET STARTED PRO MODAL */}
      {getStartedModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 transition-all">
          <div className="apple-glass w-full max-w-md rounded-3xl p-6 shadow-2xl relative border border-white/80 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200/50 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-slate-900 text-base">
                  Get Started with AK Pro
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setGetStartedModalOpen(false)}
                className="apple-glass-interactive p-1.5 rounded-xl text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              Unlock sub-second AI telemetry signals, automated arbitrage detection, and unlimited
              deep portfolio audits.
            </p>

            <div className="space-y-2">
              <div className="p-3 bg-white/80 rounded-2xl border border-blue-200 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs">AK Intelligence Pro</h4>
                  <span className="text-[10px] text-slate-500">
                    Full telemetry & unlimited voice streaming
                  </span>
                </div>
                <span className="text-sm font-extrabold text-blue-600">$29/mo</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setGetStartedModalOpen(false);
                showToast("14-Day Free Trial Activated!");
              }}
              className="w-full btn-glass-getstarted py-3 rounded-xl font-extrabold text-xs text-white shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Start 14-Day Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* LIVE INTERACTIVE PRICE CHART MODAL */}
      {chartModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 transition-all">
          <div className="apple-glass w-full max-w-3xl rounded-3xl p-6 shadow-2xl relative border border-white/80 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200/50 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md">
                  <LineChart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <span>{chartAsset}/USD Live Telemetry Chart</span>
                    <span className="text-xs text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {timeframeStats[chartAsset][chartTimeframe].change}
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {chartTimeframe} Market Depth • High: {timeframeStats[chartAsset][chartTimeframe].high} • Low: {timeframeStats[chartAsset][chartTimeframe].low}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChartModalOpen(false)}
                className="apple-glass-interactive p-2 rounded-xl text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setChartAsset("BTC")}
                  className={`apple-glass-interactive px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    chartAsset === "BTC"
                      ? "text-amber-800 bg-amber-500/15 border border-amber-300"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  Bitcoin (BTC)
                </button>
                <button
                  type="button"
                  onClick={() => setChartAsset("ETH")}
                  className={`apple-glass-interactive px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    chartAsset === "ETH"
                      ? "text-indigo-800 bg-indigo-500/15 border border-indigo-300"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  Ethereum (ETH)
                </button>
                <button
                  type="button"
                  onClick={() => setChartAsset("SOL")}
                  className={`apple-glass-interactive px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    chartAsset === "SOL"
                      ? "text-emerald-800 bg-emerald-500/15 border border-emerald-300"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  Solana (SOL)
                </button>
              </div>
              <div className="flex gap-1 bg-slate-200/60 p-1 rounded-xl border border-slate-300/40">
                {(["1D", "1W", "1M"] as const).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setChartTimeframe(tf)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      chartTimeframe === tf
                        ? "text-blue-700 bg-white shadow-xs scale-100"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Realistic Pro Live Financial Chart Engine */}
            <LiveCryptoChart
              asset={chartAsset}
              timeframe={chartTimeframe}
              onPriceUpdate={(price) => {
                setChartPrices((prev) => ({ ...prev, [chartAsset]: price }));
              }}
            />
          </div>
        </div>
      )}

      {/* CRYPTO CONVERTER MODAL */}
      {converterModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 transition-all">
          <div className="apple-glass w-full max-w-md rounded-3xl p-6 shadow-2xl relative border border-white/80 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200/50 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md">
                  <ArrowLeftRight className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Crypto Telemetry Converter</h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Real-time token swap calculations & gas costs
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setConverterModalOpen(false)}
                className="apple-glass-interactive p-1.5 rounded-xl text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-white/70 rounded-2xl border border-slate-200/60 space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">You Pay</label>
                <div className="flex items-center justify-between">
                  <input
                    type="number"
                    value={convertAmount}
                    onChange={(e) => setConvertAmount(parseFloat(e.target.value) || 0)}
                    className="bg-transparent text-lg font-bold text-slate-900 outline-none w-1/2"
                  />
                  <select
                    value={convertFrom}
                    onChange={(e) => setConvertFrom(e.target.value)}
                    className="apple-glass-interactive px-2.5 py-1 rounded-xl text-xs font-bold text-slate-800"
                  >
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                    <option value="SOL">SOL</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center -my-1">
                <div className="p-1.5 rounded-full apple-glass border border-white shadow-md text-slate-600">
                  <ArrowDownUp className="w-4 h-4" />
                </div>
              </div>

              <div className="p-3 bg-white/70 rounded-2xl border border-slate-200/60 space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">
                  You Receive (Est.)
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-extrabold text-blue-600">
                    {calculatedConversionResult}
                  </span>
                  <select
                    value={convertTo}
                    onChange={(e) => setConvertTo(e.target.value)}
                    className="apple-glass-interactive px-2.5 py-1 rounded-xl text-xs font-bold text-slate-800"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="ETH">ETH</option>
                    <option value="SOL">SOL</option>
                    <option value="USDT">USDT</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PREFERENCES & SETTINGS MODAL */}
      {settingsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 transition-all">
          <div className="apple-glass w-full max-w-md rounded-3xl p-6 shadow-2xl relative border border-white/80 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200/50 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-slate-700" />
                <h3 className="font-extrabold text-slate-900 text-base">
                  Crypto Preferences & Settings
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSettingsModalOpen(false)}
                className="apple-glass-interactive p-1.5 rounded-xl text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {/* Floating Physics Option */}
              <div className="flex items-center justify-between p-3 bg-white/70 rounded-2xl border border-slate-200/60">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">
                    Anti-Gravity Particle Bubbles
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Floating 3D crypto coins & glass bubbles background
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={physicsEnabled}
                  onChange={(e) => {
                    setPhysicsEnabled(e.target.checked);
                    showToast(
                      `Background floating bubbles ${e.target.checked ? "enabled" : "paused"}`
                    );
                  }}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Telemetry Feeds Refresh Rate */}
              <div className="p-3 bg-white/70 rounded-2xl border border-slate-200/60 space-y-1.5">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-xs">
                    Telemetry Refresh Frequency
                  </h4>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">
                    {telemetrySpeed}
                  </span>
                </div>
                <select
                  value={telemetrySpeed}
                  onChange={(e) => {
                    setTelemetrySpeed(e.target.value);
                    showToast(`Telemetry refresh rate set to ${e.target.value}`);
                  }}
                  className="w-full apple-glass-interactive px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-800"
                >
                  <option value="Realtime">Real-time Stream (Sub-second)</option>
                  <option value="5s">Every 5 Seconds</option>
                  <option value="15s">Every 15 Seconds</option>
                </select>
              </div>

              {/* AI Temperature Slider */}
              <div className="p-3 bg-white/70 rounded-2xl border border-slate-200/60 space-y-1.5">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-xs">
                    AI Model Creativity (Temperature)
                  </h4>
                  <span className="text-[10px] font-bold text-blue-600">
                    {temperature}{" "}
                    {temperature < 0.4
                      ? "(Precise)"
                      : temperature > 0.8
                      ? "(Creative)"
                      : "(Balanced)"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Speech Synthesis Speed */}
              <div className="p-3 bg-white/70 rounded-2xl border border-slate-200/60 space-y-1.5">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-xs">
                    Speech Synthesis Voice Speed
                  </h4>
                  <span className="text-[10px] font-bold text-slate-600">{speechRate}x</span>
                </div>
                <select
                  value={speechRate}
                  onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                  className="w-full apple-glass-interactive px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-800"
                >
                  <option value={0.8}>0.8x Smooth Pace</option>
                  <option value={1.0}>1.0x Standard</option>
                  <option value={1.25}>1.25x Fast Telemetry</option>
                </select>
              </div>

              {/* Sound Effects Toggle */}
              <div className="flex items-center justify-between p-3 bg-white/70 rounded-2xl border border-slate-200/60">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Audio Feedback & Tone FX</h4>
                  <p className="text-[10px] text-slate-500">
                    Chime sounds on message receipt and alerts
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={soundEffects}
                  onChange={(e) => {
                    setSoundEffects(e.target.checked);
                    showToast("Audio feedback toggled");
                  }}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Auto-Scroll Chat */}
              <div className="flex items-center justify-between p-3 bg-white/70 rounded-2xl border border-slate-200/60">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">
                    Auto-Scroll to New Messages
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Automatically stick scrollbar to latest response
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={autoScroll}
                  onChange={(e) => {
                    setAutoScroll(e.target.checked);
                    showToast("Auto-scroll setting saved");
                  }}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSettingsModalOpen(false);
                showToast("Preferences saved successfully!");
              }}
              className="w-full btn-glass-getstarted py-2.5 rounded-xl font-bold text-xs text-white shadow-md"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {/* BOOKMARKS DRAWER */}
      <div
        id="bookmarksDrawer"
        className={`fixed top-0 right-0 h-full w-80 z-50 apple-glass border-l border-white/80 shadow-2xl p-5 transform transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          bookmarksDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/50 pb-3">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-sm">Saved Intelligence</h3>
            </div>
            <button
              type="button"
              onClick={() => setBookmarksDrawerOpen(false)}
              className="apple-glass-interactive p-1.5 rounded-xl text-slate-500 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div id="bookmarksList" className="space-y-2.5 max-h-[75vh] overflow-y-auto pr-1">
            {savedBookmarks.length === 0 ? (
              <p className="text-xs text-slate-400 font-medium text-center py-8">
                No saved insights yet. Click Save on any response to store it here!
              </p>
            ) : (
              savedBookmarks.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white/80 rounded-2xl border border-white shadow-sm space-y-1.5 relative group"
                >
                  <p className="text-xs font-medium text-slate-800 line-clamp-3">{item}</p>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => void copyToClipboard(item)}
                      className="text-[10px] font-bold text-blue-600 hover:underline"
                    >
                      Copy
                    </button>
                    <button
                      type="button"
                      onClick={() => removeBookmark(idx)}
                      className="text-[10px] font-bold text-rose-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {savedBookmarks.length > 0 && (
          <button
            type="button"
            onClick={clearAllBookmarks}
            className="w-full apple-glass-interactive py-2 rounded-xl text-xs font-bold text-rose-600 flex items-center justify-center gap-1 border-rose-200"
          >
            <Trash className="w-3.5 h-3.5" /> Clear All Bookmarks
          </button>
        )}
      </div>
    </div>
  );
}
