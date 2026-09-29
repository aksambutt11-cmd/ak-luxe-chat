import React, { useState, useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { sendToN8nWebhook } from '../n8nApi';
import { 
  TrendingUp, TrendingDown, Zap, MessageSquarePlus, Sparkles, Database, 
  ShieldAlert, BarChart3, Layers, Settings, Activity, ArrowUpRight, Cpu, 
  Send, Plus, FileText, Image, Code, Globe, Bot, User, Loader2 
} from 'lucide-react';

export const Route = createFileRoute('/')({
  component: Index,
});

/* ==================== 1. PARTICLE CANVAS ==================== */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000, radius: 180 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const symbols = ['₿', 'Ξ', '◎', '₳', '✕'];
    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      symbol: Math.random() > 0.65 ? symbols[Math.floor(Math.random() * symbols.length)] : null,
      alpha: Math.random() * 0.4 + 0.2,
      color: Math.random() > 0.5 ? '#3B82F6' : Math.random() > 0.5 ? '#8B5CF6' : '#06B6D4'
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force * 3;
          p.y -= Math.sin(angle) * force * 3;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        if (p.symbol) {
          ctx.font = '12px "Plus Jakarta Sans", sans-serif';
          ctx.fillStyle = p.color;
          ctx.fillText(p.symbol, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
        ctx.restore();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 120) {
            ctx.save();
            ctx.globalAlpha = (1 - cdist / 120) * 0.12;
            ctx.strokeStyle = '#3B82F6';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

/* ==================== 2. TELEMETRY MARQUEE ==================== */
function TelemetryMarquee() {
  const tickerItems = [
    { coin: 'BTC/USD', price: '$68,420.50', change: '+3.42%', isUp: true },
    { coin: 'ETH/USD', price: '$3,540.12', change: '+2.18%', isUp: true },
    { coin: 'SOL/USD', price: '$188.75', change: '-1.05%', isUp: false },
    { coin: 'BNB/USD', price: '$592.30', change: '+0.84%', isUp: true },
    { coin: 'AVAX/USD', price: '$42.10', change: '+5.12%', isUp: true },
    { coin: 'GAS (GWEI)', price: '14 Gwei', change: 'Optimal', isUp: true },
    { coin: 'FEAR & GREED', price: '74 (Greed)', change: 'High Vol', isUp: true },
  ];

  return (
    <div className="w-full bg-[#0D1017]/80 border-b border-white/5 backdrop-blur-md py-1.5 px-4 overflow-hidden z-20 flex items-center gap-4 text-xs font-mono select-none">
      <div className="flex items-center gap-1.5 text-blue-400 font-semibold uppercase tracking-wider shrink-0 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
        <Zap className="w-3 h-3 text-blue-400 animate-pulse" />
        Live Telemetry
      </div>

      <div className="flex items-center gap-8 animate-[marquee_25s_linear_infinite] whitespace-nowrap">
        {tickerItems.concat(tickerItems).map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-2">
            <span className="text-slate-400 font-medium">{item.coin}</span>
            <span className="text-slate-200 font-bold">{item.price}</span>
            <span className={`flex items-center text-[11px] font-semibold ${item.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
              {item.isUp ? <TrendingUp className="w-3 h-3 mr-0.5 inline" /> : <TrendingDown className="w-3 h-3 mr-0.5 inline" />}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==================== 3. SIDEBAR ==================== */
function Sidebar({ onNewChat, activeCategory, setActiveCategory }: { onNewChat: () => void; activeCategory: string; setActiveCategory: (c: string) => void }) {
  const categories = [
    { id: 'all', label: 'All Models & Chats', icon: MessageSquarePlus },
    { id: 'market', label: 'Market Structure', icon: BarChart3 },
    { id: 'onchain', label: 'On-Chain Activity', icon: Database },
    { id: 'risk', label: 'Risk & Audit', icon: ShieldAlert },
    { id: 'protocols', label: 'L1/L2 Protocols', icon: Layers },
  ];

  return (
    <aside className="w-64 h-full apple-glass border-r border-white/10 flex flex-col justify-between shrink-0 z-20 hidden md:flex">
      <div className="p-4 space-y-4">
        <button
          onClick={onNewChat}
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-2.5 px-4 rounded-xl shadow-lg shadow-blue-900/30 border border-white/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="w-4 h-4 text-blue-200" />
          <span>New Intelligence Session</span>
        </button>

        <div className="space-y-1 pt-2">
          <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-3 py-1">
            Research Modules
          </div>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-2 flex-1 overflow-y-auto space-y-2">
        <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-3">
          Recent Signals
        </div>
        <div className="space-y-1">
          {['BTC Liquidation Heatmap', 'ETH Layer 2 Gas Profiling', 'Solana DeFi Flow Audit'].map((item, i) => (
            <div key={i} className="px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-white/5 cursor-pointer truncate transition-colors">
              💬 {item}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white ring-2 ring-blue-400/30">
            AK
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-200">Luxe Member</span>
            <span className="text-[10px] text-emerald-400 font-mono">● Pro Active</span>
          </div>
        </div>
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}

/* ==================== 4. SIDE PANEL ==================== */
function SidePanel({ onSelectPrompt }: { onSelectPrompt: (prompt: string) => void }) {
  const quickActions = [
    { title: 'Market Structure Breakdown', icon: Activity, desc: 'Order flow & orderbook liquidity' },
    { title: 'On-Chain Risk Profiler', icon: ShieldAlert, desc: 'Smart contract vulnerability scan' },
    { title: 'Protocol Revenue Metric', icon: Zap, desc: 'L1/L2 daily fee analysis' },
    { title: 'Whale Movements Track', icon: Layers, desc: 'Large wallet transfers & alerts' },
  ];

  return (
    <aside className="w-80 h-full apple-glass border-l border-white/10 p-4 space-y-4 flex-col shrink-0 z-20 hidden lg:flex overflow-y-auto">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Cpu className="w-4 h-4 text-blue-400" />
          Live Analytics
        </span>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
          Connected
        </span>
      </div>

      <div className="apple-glass-card rounded-2xl p-4 border border-white/10 space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-200">BTC/USD Live Volatility</span>
          <span className="text-emerald-400 font-mono font-bold">+3.42%</span>
        </div>

        <div className="h-28 w-full pt-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path d="M 0 30 Q 15 5, 30 22 T 60 12 T 80 28 T 100 8" fill="none" stroke="#3B82F6" strokeWidth="2.5" />
            <path d="M 0 30 Q 15 5, 30 22 T 60 12 T 80 28 T 100 8 L 100 40 L 0 40 Z" fill="url(#chartGrad)" />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px] font-mono text-slate-400">
          <div>24h High: <span className="text-slate-200 font-bold">$69,120</span></div>
          <div>24h Low: <span className="text-slate-200 font-bold">$66,800</span></div>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-white/10">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
          Quick Intelligence Prompts
        </div>

        <div className="space-y-2">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                onClick={() => onSelectPrompt(action.title)}
                className="w-full text-left apple-glass-card hover:bg-white/10 p-3 rounded-xl transition-all border border-white/5 group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-200 group-hover:text-blue-300 transition-colors">
                      {action.title}
                    </div>
                    <div className="text-[10px] text-slate-400">{action.desc}</div>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

/* ==================== 5. CHAT INTERFACE ==================== */
function ChatInterface({ messages, onSendMessage, isLoading }: { messages: Array<{ role: 'user' | 'assistant'; content: string }>; onSendMessage: (t: string) => void; isLoading: boolean }) {
  const [input, setInput] = useState('');
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  const plusMenuOptions = [
    { label: 'Upload Research Documents', desc: 'PDF, CSV, TXT files', icon: FileText, color: 'text-blue-400' },
    { label: 'Add Charts & Screenshots', desc: 'Visual market telemetry', icon: Image, color: 'text-purple-400' },
    { label: 'Smart Contract Audit', desc: 'Solidity / Rust code', icon: Code, color: 'text-amber-400' },
    { label: 'Live Web Telemetry', desc: 'Search current on-chain state', icon: Globe, color: 'text-emerald-400' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/40 border border-white/20 animate-float">
                <span className="text-3xl font-extrabold tracking-tighter text-white">AK</span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-white/10 p-1.5 rounded-lg shadow-lg">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
            </div>

            <div className="space-y-2 max-w-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Digital Asset Intelligence</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Clarity across crypto markets.
              </h1>
              <p className="text-sm text-slate-400">
                Research market structure, protocols, on-chain activity, and digital asset risk with real-time AI reasoning.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-4 max-w-3xl mx-auto ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-blue-400" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 rounded-br-none'
                    : 'apple-glass-card text-slate-200 rounded-bl-none'
                }`}
              >
                {msg.content}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-purple-400" />
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex gap-4 max-w-3xl mx-auto justify-start">
            <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-blue-400 animate-pulse" />
            </div>
            <div className="apple-glass-card p-4 rounded-2xl rounded-bl-none text-slate-400 text-xs flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
              <span>Querying Pinecone & AI Agent via n8n...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="p-4 md:p-6 max-w-4xl w-full mx-auto relative">
        {showPlusMenu && (
          <div className="absolute bottom-24 left-6 apple-glass border border-white/10 rounded-2xl p-2 w-72 shadow-2xl z-30 space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {plusMenuOptions.map((opt, i) => {
              const Icon = opt.icon;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setShowPlusMenu(false)}
                  className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 text-left transition-all"
                >
                  <Icon className={`w-5 h-5 ${opt.color} shrink-0 mt-0.5`} />
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{opt.label}</div>
                    <div className="text-[10px] text-slate-400">{opt.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <form onSubmit={handleSubmit} className="input-ambient-glow rounded-2xl relative">
          <div className="apple-glass rounded-2xl p-2.5 flex items-center gap-2 border border-white/15 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowPlusMenu(!showPlusMenu)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            >
              <Plus className={`w-5 h-5 transition-transform duration-200 ${showPlusMenu ? 'rotate-45 text-blue-400' : ''}`} />
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AK Luxe AI anything about markets, contracts, or risk..."
              disabled={isLoading}
              className="w-full bg-transparent border-none outline-none text-sm text-slate-100 placeholder-slate-500 px-2 disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 disabled:hover:bg-blue-600 transition-all shadow-lg shadow-blue-600/30 shrink-0"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ==================== MAIN PAGE COMPONENT ==================== */
function Index() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => 'session_' + Math.random().toString(36).substring(2, 9));

  const handleSendMessage = async (text: string) => {
    if (!text || !text.trim()) return;

    const userMsg = { role: 'user' as const, content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const aiReplyText = await sendToN8nWebhook(text, sessionId);
      const aiMsg = { role: 'assistant' as const, content: aiReplyText };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Webhook execution failed:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant' as const, content: 'An unexpected error occurred while communicating with the AI agent.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[#0A0C10] text-slate-100 overflow-hidden relative">
      <ParticleCanvas />
      <TelemetryMarquee />

      <div className="flex-1 flex overflow-hidden relative z-10">
        <Sidebar
          onNewChat={handleNewChat}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />

        <SidePanel
          onSelectPrompt={(promptText) => handleSendMessage(promptText)}
        />
      </div>
    </div>
  );
}