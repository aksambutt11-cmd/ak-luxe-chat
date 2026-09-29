import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowUp,
  Bot,
  Check,
  ChevronDown,
  Code,
  Copy,
  Cpu,
  FileText,
  Globe,
  Image as ImageIcon,
  LineChart,
  Loader2,
  Maximize2,
  MessageSquarePlus,
  Mic,
  PieChart,
  Plus,
  RefreshCw,
  Send,
  Settings2,
  Share2,
  ShieldAlert,
  Sparkles,
  Trash2,
  User,
  Volume2,
  VolumeX,
  Waves,
} from "lucide-react";
import { ParticleEngine } from "@/components/particle-engine";
import { MarketTicker } from "@/components/market-ticker";
import { CryptoChartCard } from "@/components/crypto-chart-card";
import { ShareCardDialog } from "@/components/share-card-dialog";
import { MessageResponse } from "@/components/ai-elements/message";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
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
      { title: "AK Luxe Chat — Next-Gen Crypto Intelligence" },
      {
        name: "description",
        content: "Institutional-grade crypto research and digital asset intelligence with AK.",
      },
      { property: "og:title", content: "AK Luxe Chat — Next-Gen Crypto Intelligence" },
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

const quickTags = [
  { label: "BTC", prompt: "BTC Market Overview and key on-chain support levels" },
  { label: "ETH", prompt: "ETH Staking Trends, gas dynamics and ETF flow update" },
  { label: "DeFi", prompt: "DeFi Yield Opportunities and top lending protocols" },
  { label: "Tokenomics", prompt: "Tokenomics Inflation Review and unlock schedule evaluation" },
  { label: "Markets", prompt: "Global Macro Markets and digital asset correlation review" },
  { label: "On-chain", prompt: "Whale Wallet On-chain tracking and exchange inflow/outflow balance" },
  { label: "Risk", prompt: "Derivative Risk Analysis, open interest and funding rate shifts" },
  { label: "Market Structure", prompt: "Market Structure Setup, liquidity clusters and liquidation map" },
];

function AuthDialog({ mode }: { mode: "signin" | "signup" }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const signin = mode === "signin";

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setDone(false);
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          className={
            signin
              ? "bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-3.5 py-1.5 rounded-xl shadow-md transition-all active:scale-95"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs px-3.5 py-1.5 rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-95"
          }
        >
          {signin ? "Sign in" : "Get started"}
        </button>
      </DialogTrigger>
      <DialogContent className="glass-dialog sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{signin ? "Welcome back to AK" : "Create your AK account"}</DialogTitle>
          <DialogDescription>
            {signin
              ? "Sign in to continue your institutional crypto research."
              : "Get started with next-gen crypto intelligence."}
          </DialogDescription>
        </DialogHeader>
        {done ? (
          <p className="text-sm text-muted-foreground">
            Accounts are coming soon. You can continue chatting with AK in the meantime.
          </p>
        ) : (
          <form
            className="grid gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            {!signin && (
              <label className="auth-field">
                Name
                <input autoComplete="name" required />
              </label>
            )}
            <label className="auth-field">
              Email
              <input autoComplete="email" required type="email" />
            </label>
            <label className="auth-field">
              Password
              <input
                autoComplete={signin ? "current-password" : "new-password"}
                minLength={8}
                required
                type="password"
              />
            </label>
            <button
              className="mt-2 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all"
              type="submit"
            >
              {signin ? "Sign in" : "Create account"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function AKChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState<ChatMessage | null>(null);
  const [activeLayer, setActiveLayer] = useState("Market structure");
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  const focusComposer = useCallback(() => {
    requestAnimationFrame(() => textareaRef.current?.focus());
  }, []);

  useEffect(() => {
    focusComposer();
  }, [focusComposer]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isSending]);

  // Speech Recognition (Web Speech API)
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
        }
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleVoice = () => {
    if (isSending) return;
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch {
          setIsListening(false);
        }
      } else {
        // Fallback simulation
        setIsListening(true);
        setTimeout(() => {
          setInput((prev) =>
            prev
              ? `${prev} Analyze Bitcoin market structure and key liquidation levels for today`
              : "Analyze Bitcoin market structure and key liquidation levels for today"
          );
          setIsListening(false);
        }, 1800);
      }
    }
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
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(message.id);
    window.speechSynthesis.speak(utterance);
  };

  // Production n8n AI Webhook connection via /api/chat
  const requestReply = useCallback(
    async (prompt: string, replaceId?: string) => {
      setIsSending(true);
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "text/plain; charset=utf-8" },
          body: prompt,
        });
        const data = (await response.json()) as { reply?: string; error?: string };
        if (!response.ok || !data.reply) {
          throw new Error(data.error || "AK could not complete that request.");
        }

        const assistantMessage: ChatMessage = {
          id: replaceId ?? newId(),
          role: "assistant",
          content: data.reply,
          prompt,
        };
        setMessages((current) =>
          replaceId
            ? current.map((message) => (message.id === replaceId ? assistantMessage : message))
            : [...current, assistantMessage]
        );
      } catch (error) {
        const content =
          error instanceof Error
            ? error.message
            : "AK is temporarily unavailable. Please try again.";
        const failedMessage: ChatMessage = {
          id: replaceId ?? newId(),
          role: "assistant",
          content,
          prompt,
          error: true,
        };
        setMessages((current) =>
          replaceId
            ? current.map((message) => (message.id === replaceId ? failedMessage : message))
            : [...current, failedMessage]
        );
      } finally {
        setIsSending(false);
        focusComposer();
      }
    },
    [focusComposer]
  );

  const sendPrompt = async (raw: string) => {
    const prompt = raw.trim();
    if (!prompt || isSending) return;
    setMessages((current) => [...current, { id: newId(), role: "user", content: prompt }]);
    setInput("");
    setShowPlusMenu(false);
    await requestReply(prompt);
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendPrompt(input);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
    focusComposer();
  };

  const copyMessage = async (message: ChatMessage) => {
    await navigator.clipboard.writeText(message.content);
    setCopiedId(message.id);
    window.setTimeout(() => setCopiedId(null), 1600);
  };

  const plusMenuOptions = [
    {
      label: "Upload Research Documents",
      desc: "PDF, CSV, TXT files",
      icon: FileText,
      color: "text-blue-500",
      prefix: "Analyze research document for: ",
    },
    {
      label: "Add Charts & Screenshots",
      desc: "Visual market telemetry",
      icon: ImageIcon,
      color: "text-purple-500",
      prefix: "Chart & telemetry analysis for: ",
    },
    {
      label: "Smart Contract Audit",
      desc: "Solidity / Rust security check",
      icon: Code,
      color: "text-amber-500",
      prefix: "Smart contract security audit for: ",
    },
    {
      label: "Live Web Telemetry",
      desc: "Search current on-chain state",
      icon: Globe,
      color: "text-emerald-500",
      prefix: "Live on-chain telemetry query for: ",
    },
  ];

  return (
    <TooltipProvider delayDuration={300}>
      <div className="w-screen h-screen flex flex-col bg-[#f2f4f8] dark:bg-[#0A0C10] text-slate-800 dark:text-slate-100 overflow-hidden relative font-sans">
        {/* Anti-Gravity Floating Particle & Golden Sphere Canvas */}
        <ParticleEngine />

        {/* TOP CRYPTO TICKER MARQUEE */}
        <MarketTicker />

        {/* MAIN INTERFACE LAYOUT */}
        <div className="relative z-10 flex-1 flex overflow-hidden p-3 gap-3 w-full h-[calc(100vh-37px)]">
          {/* SIDEBAR */}
          <aside className="w-64 apple-glass rounded-2xl flex flex-col justify-between p-4 shrink-0 hidden md:flex">
            <div className="space-y-6">
              {/* Branding */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20 ring-2 ring-white/80">
                  AK
                </div>
                <div>
                  <h1 className="font-bold text-slate-900 dark:text-white text-base leading-none">
                    AK Luxe
                  </h1>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Crypto Intelligence
                  </span>
                </div>
              </div>

              {/* Intelligence Layers (Kept Highlight Styles as requested) */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 block px-2">
                  Intelligence Layers
                </span>
                <nav className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveLayer("Market structure");
                      void sendPrompt("Give me an overview of the current crypto market structure.");
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all ${
                      activeLayer === "Market structure"
                        ? "text-blue-700 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200/80 dark:border-blue-700/50 shadow-sm"
                        : "text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <LineChart className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      Market structure
                    </span>
                    {activeLayer === "Market structure" && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveLayer("On-chain signals");
                      void sendPrompt(
                        "What are the most important on-chain signals to watch right now?"
                      );
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all ${
                      activeLayer === "On-chain signals"
                        ? "text-blue-700 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200/80 dark:border-blue-700/50 shadow-sm"
                        : "text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Activity className="w-4 h-4 text-slate-500" />
                      On-chain signals
                    </span>
                    {activeLayer === "On-chain signals" && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveLayer("Risk context");
                      void sendPrompt("Summarize the current risk context for crypto investors.");
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all ${
                      activeLayer === "Risk context"
                        ? "text-blue-700 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200/80 dark:border-blue-700/50 shadow-sm"
                        : "text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <ShieldAlert className="w-4 h-4 text-slate-500" />
                      Risk context
                    </span>
                    {activeLayer === "Risk context" && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                    )}
                  </button>
                </nav>
              </div>

              {/* Secondary Tools (Apple Glass Interactive Style) */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 block px-2">
                  Analysis Engine
                </span>
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      void sendPrompt("Analyze current crypto market sentiment and social volume.")
                    }
                    className="w-full apple-glass-interactive text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2"
                  >
                    <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                    Deep Sentiment
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      void sendPrompt(
                        "Show me current crypto liquidity heatmap and key orderbook clusters."
                      )
                    }
                    className="w-full apple-glass-interactive text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2"
                  >
                    <Waves className="w-3.5 h-3.5 text-cyan-500" />
                    Liquidity Heatmap
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      void sendPrompt(
                        "Perform an institutional crypto portfolio risk and allocation audit."
                      )
                    }
                    className="w-full apple-glass-interactive text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2"
                  >
                    <PieChart className="w-3.5 h-3.5 text-emerald-500" />
                    Portfolio Audit
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="pt-4 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Online v3.2
              </span>
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="apple-glass-interactive p-1.5 rounded-lg text-slate-600 dark:text-slate-300"
                title="Settings"
              >
                <Settings2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </aside>

          {/* CHAT MAIN AREA */}
          <main className="flex-1 flex flex-col rounded-2xl overflow-hidden relative">
            {/* Top Control Bar inside Chat Area (Apple Glass Buttons) */}
            <div className="apple-glass rounded-2xl p-3 mb-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    AK
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 dark:text-white text-sm">AK Agent</h2>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Intelligence Online
                  </span>
                </div>
              </div>

              {/* Top Right Header Action Buttons */}
              <div className="flex items-center gap-2">
                <AuthDialog mode="signin" />
                <AuthDialog mode="signup" />

                <button
                  type="button"
                  onClick={resetChat}
                  className="apple-glass-interactive p-2 rounded-xl text-slate-700 dark:text-slate-200"
                  title="New Chat"
                >
                  <MessageSquarePlus className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (document.fullscreenElement) {
                      document.exitFullscreen().catch(() => {});
                    } else {
                      document.documentElement.requestFullscreen().catch(() => {});
                    }
                  }}
                  className="apple-glass-interactive p-2 rounded-xl text-slate-700 dark:text-slate-200"
                  title="Maximize"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const lastMsg = messages[messages.length - 1];
                    if (lastMsg) setShareMessage(lastMsg);
                  }}
                  disabled={messages.length === 0}
                  className="apple-glass-interactive p-2 rounded-xl text-slate-700 dark:text-slate-200 disabled:opacity-40"
                  title="Share Conversation"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      type="button"
                      disabled={messages.length === 0}
                      className="apple-glass-interactive p-2 rounded-xl text-slate-700 dark:text-slate-200 disabled:opacity-40"
                      title="Clear Chat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="glass-dialog">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear this conversation?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This removes all messages from the current research session.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={resetChat}>Clear chat</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {/* CHAT MESSAGES SCROLL AREA */}
            <div ref={chatScrollRef} className="flex-1 overflow-y-auto pr-1 space-y-4 pb-4">
              {messages.length === 0 ? (
                /* Welcome Banner */
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-10 px-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/40 border border-white/20 animate-float">
                      <span className="text-3xl font-extrabold tracking-tighter text-white">AK</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-white/10 p-1.5 rounded-lg shadow-lg">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>

                  <div className="space-y-2 max-w-lg">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-500">
                      Digital Asset Intelligence
                    </p>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Clarity across crypto markets.
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Research market structure, protocols, on-chain activity, and digital asset
                      risk with real-time AI reasoning.
                    </p>
                  </div>

                  {/* Starter Prompt Cards (Apple Glass Interactive) */}
                  <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl pt-2">
                    {[
                      {
                        label: "📊 Analyze BTC Liquidity",
                        prompt: "Analyze Bitcoin Liquidity and key market depth levels.",
                      },
                      {
                        label: "⚡ ETH Gas Forecast",
                        prompt: "What is the Ethereum Gas forecast and staking context?",
                      },
                      {
                        label: "🌊 DeFi Yields",
                        prompt: "What are the top DeFi yield opportunities right now?",
                      },
                      {
                        label: "🐋 Whale Inflows",
                        prompt: "What are the largest on-chain whale inflows this week?",
                      },
                    ].map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => void sendPrompt(chip.prompt)}
                        className="apple-glass-interactive px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message.id}>
                    {message.role === "assistant" ? (
                      /* Bot Message (Gemini Build bot-glass-bubble) */
                      <div className="flex gap-3 max-w-3xl">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md">
                          AK
                        </div>
                        <div className="bot-glass-bubble rounded-2xl p-4 text-slate-900 dark:text-slate-100 text-sm leading-relaxed max-w-2xl w-full">
                          <div className="flex items-center justify-between mb-2 border-b border-slate-200/50 dark:border-white/10 pb-1.5">
                            <span className="font-bold text-slate-900 dark:text-white text-xs">
                              AK Intelligence
                            </span>
                            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                              Grounded Live
                            </span>
                          </div>

                          <MessageResponse>{message.content}</MessageResponse>

                          {/* Interactive Chart Card */}
                          {/(btc|bitcoin|eth|ethereum|sol|solana|price|chart|candle|bull|bear|technical|breakout)/i.test(
                            message.content + (message.prompt || "")
                          ) && (
                            <CryptoChartCard
                              symbol={
                                /eth|ethereum/i.test(message.content)
                                  ? "ETH/USDT"
                                  : /sol|solana/i.test(message.content)
                                  ? "SOL/USDT"
                                  : "BTC/USDT"
                              }
                            />
                          )}

                          {/* Bot Audio / Action Toolbar */}
                          <div className="mt-3 pt-2 border-t border-slate-200/40 dark:border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => toggleSpeech(message)}
                                className="apple-glass-interactive px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1"
                              >
                                {speakingId === message.id ? (
                                  <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                                ) : (
                                  <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                                )}
                                {speakingId === message.id ? "Stop Voice" : "Read Aloud"}
                              </button>
                              <button
                                type="button"
                                onClick={() => void copyMessage(message)}
                                className="apple-glass-interactive px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1"
                              >
                                {copiedId === message.id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                                {copiedId === message.id ? "Copied" : "Copy"}
                              </button>
                              <button
                                type="button"
                                onClick={() => setShareMessage(message)}
                                className="apple-glass-interactive px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1"
                              >
                                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                                Share
                              </button>
                            </div>
                          </div>

                          {/* Contextual Follow-up Pills */}
                          {!isSending && (
                            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 pt-1">
                              <span className="text-[10px] text-muted-foreground mr-1 flex items-center gap-1 font-semibold uppercase tracking-wider">
                                <Sparkles className="size-2.5 text-sky-400" />
                                Follow-up:
                              </span>
                              {[
                                "Analyze Liquidation Heatmap",
                                "Show Token Distribution",
                                "BTC Funding Rates",
                                "On-Chain Whales",
                              ].map((pill) => (
                                <button
                                  key={pill}
                                  type="button"
                                  disabled={isSending}
                                  onClick={() => void sendPrompt(pill)}
                                  className="followup-pill"
                                >
                                  {pill}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* User Message (Gemini Build user-glass-bubble) */
                      <div className="flex justify-end">
                        <div className="user-glass-bubble rounded-2xl rounded-tr-sm px-5 py-3.5 max-w-xl text-slate-900 font-semibold text-[15px] leading-relaxed shadow-lg">
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}

              {/* Loading Indicator for n8n AI Agent / Pinecone */}
              {isSending && (
                <div className="flex gap-3 max-w-3xl">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md">
                    <Bot className="w-4 h-4 text-white animate-pulse" />
                  </div>
                  <div className="bot-glass-bubble p-4 rounded-2xl rounded-bl-none text-slate-700 dark:text-slate-300 text-xs flex items-center gap-2.5">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    <span>Querying Pinecone & AI Agent via n8n...</span>
                  </div>
                </div>
              )}
            </div>

            {/* PROMPT INPUT CONTAINER */}
            <div className="space-y-2 mt-auto">
              {/* Quick Tags Toolbar (Apple Glass Buttons) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {quickTags.map((tag) => (
                  <button
                    key={tag.label}
                    type="button"
                    disabled={isSending}
                    onClick={() => void sendPrompt(tag.prompt)}
                    className="shortcut-btn shrink-0"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>

              {/* Plus Popup Menu */}
              {showPlusMenu && (
                <div className="apple-glass rounded-2xl p-2 w-72 shadow-2xl mb-2 space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  {plusMenuOptions.map((opt, i) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setInput(opt.prefix);
                          setShowPlusMenu(false);
                          focusComposer();
                        }}
                        className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 text-left transition-all"
                      >
                        <Icon className={`w-5 h-5 ${opt.color} shrink-0 mt-0.5`} />
                        <div>
                          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                            {opt.label}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            {opt.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Input Box (Apple Glass container) */}
              <div className="apple-glass rounded-2xl p-2.5 relative flex flex-col gap-2 input-ambient-glow">
                <textarea
                  ref={textareaRef}
                  id="userInput"
                  rows={2}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleTextareaKeyDown}
                  placeholder="Ask AK about crypto markets, protocols, or risk..."
                  disabled={isSending}
                  className="w-full bg-transparent resize-none outline-none text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 px-2 py-1 disabled:opacity-50"
                />

                <div className="flex items-center justify-between pt-1 border-t border-slate-200/40 dark:border-white/10">
                  {/* Left Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowPlusMenu(!showPlusMenu)}
                      className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-white/20 transition-colors"
                      title="Attach Research"
                    >
                      <Plus
                        className={`w-4 h-4 transition-transform duration-200 ${
                          showPlusMenu ? "rotate-45 text-blue-500" : ""
                        }`}
                      />
                    </button>
                    <button
                      type="button"
                      className="apple-glass-interactive px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-600" /> AK Crypto{" "}
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                      Shift + Enter for line
                    </span>
                  </div>

                  {/* Right Action Buttons (Voice & Send) */}
                  <div className="flex items-center gap-2">
                    {/* Voice Input with Siri Wave Visualizer */}
                    <div className="relative flex items-center">
                      {isListening && (
                        <div
                          id="voiceWave"
                          className="absolute right-12 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-blue-300 dark:border-blue-700 shadow-lg z-20"
                        >
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mr-1 animate-pulse">
                            Listening...
                          </span>
                          <div
                            className="w-1 bg-blue-500 rounded-full voice-wave-bar"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-1 bg-indigo-500 rounded-full voice-wave-bar"
                            style={{ animationDelay: "0.3s" }}
                          />
                          <div
                            className="w-1 bg-cyan-500 rounded-full voice-wave-bar"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <div
                            className="w-1 bg-blue-600 rounded-full voice-wave-bar"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={toggleVoice}
                        disabled={isSending}
                        className={`apple-glass-interactive p-2.5 rounded-xl transition-all ${
                          isListening
                            ? "text-blue-600 bg-blue-500/20 ring-2 ring-blue-500/50"
                            : "text-slate-700 dark:text-slate-300 hover:text-blue-600"
                        }`}
                        title="Voice Input"
                      >
                        <Mic className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Send Button */}
                    <button
                      type="button"
                      disabled={!input.trim() || isSending}
                      onClick={() => void sendPrompt(input)}
                      className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-40 disabled:hover:bg-blue-600"
                      title="Send"
                    >
                      {isSending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ArrowUp className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-center text-[11px] text-slate-400 font-medium">
                AI-generated research is informational and may contain errors.
              </p>
            </div>
          </main>
        </div>

        {/* Share Dialog */}
        <ShareCardDialog
          open={Boolean(shareMessage)}
          onOpenChange={(open) => !open && setShareMessage(null)}
          messageContent={shareMessage?.content || ""}
          userPrompt={shareMessage?.prompt}
        />

        {/* Settings Dialog */}
        <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
          <DialogContent className="glass-dialog">
            <DialogHeader>
              <DialogTitle>Session Settings</DialogTitle>
              <DialogDescription>
                Live connection to CME Community n8n AI Agent and Pinecone vector database.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="font-semibold">AI Workflow Engine</span>
                <span className="text-emerald-500 font-mono">n8n / Pinecone Active</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="font-semibold">Contextual Model</span>
                <span className="text-blue-500 font-mono">AK Crypto Agent</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="font-semibold">Session State</span>
                <span className="text-slate-400">Memory Isolated</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
