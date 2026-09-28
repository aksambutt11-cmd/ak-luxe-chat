import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Bitcoin,
  Blocks,
  ChartCandlestick,
  Coins,
  Layers,
  Check,
  Copy,
  DatabaseZap,
  MessageSquarePlus,
  Network,
  RefreshCw,
  Settings2,
  ShieldCheck,
  Trash2,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { NetworkField } from "@/components/network-field";
import { BitcoinField } from "@/components/bitcoin-field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
      { title: "AK — Crypto Intelligence" },
      {
        name: "description",
        content: "Institutional-grade crypto research and digital asset intelligence with AK.",
      },
      { property: "og:title", content: "AK — Crypto Intelligence" },
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

function AKMark({ active = false }: { active?: boolean }) {
  const gid = `ak-stroke-${useId().replace(/:/g, "")}`;
  return (
    <div className={`ak-mark ${active ? "ak-mark-active" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 40 40" className="ak-mark-svg">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="45%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#C4B5FD" />
          </linearGradient>
        </defs>
        {/* A: two strokes + crossbar node */}
        <path
          d="M7 30 L15 10 L21 26"
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M11 22 H18" stroke={`url(#${gid})`} strokeWidth="2" strokeLinecap="round" />
        {/* K: stem + two diverging branches */}
        <path d="M24 10 V30" stroke={`url(#${gid})`} strokeWidth="2.6" strokeLinecap="round" />
        <path
          d="M33 10 L24.5 20 L33 30"
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24.5" cy="20" r="1.9" fill="#E0F2FE" />
      </svg>
    </div>
  );
}

const prefOptions = {
  "Response style": ["Balanced", "Analytical", "Concise"],
  "Answer length": ["Short", "Medium", "Detailed"],
  "Knowledge mode": ["Research library", "General"],
} as const;

function ModelControl() {
  const [prefs, setPrefs] = useState<Record<string, string>>({
    "Response style": "Balanced",
    "Answer length": "Medium",
    "Knowledge mode": "Research library",
  });
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className="model-pill" aria-label="Assistant settings">
          <Sparkles className="size-3.5" />
          <span>AK Crypto</span>
          <ChevronDown className="size-3 opacity-70" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" side="top" sideOffset={10} className="model-pop w-80 p-2">
        <p className="px-2 pb-1.5 pt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
          AI model
        </p>
        <div className="model-row model-row-active">
          <div>
            <p className="text-sm font-medium">AK Crypto Intelligence</p>
            <p className="text-xs text-muted-foreground">Your connected AI workflow</p>
          </div>
          <Check className="size-4 text-primary" />
        </div>
        <p className="px-2 pb-1 pt-3 text-[11px] uppercase tracking-wider text-muted-foreground">
          Preferences
        </p>
        {Object.entries(prefOptions).map(([label, opts]) => (
          <div key={label} className="px-2 py-1.5">
            <p className="mb-1.5 text-xs text-muted-foreground">{label}</p>
            <div className="pref-seg" role="radiogroup" aria-label={label}>
              {opts.map((o) => (
                <button
                  key={o}
                  type="button"
                  role="radio"
                  aria-checked={prefs[label] === o}
                  className={prefs[label] === o ? "pref-opt pref-opt-on" : "pref-opt"}
                  onClick={() => setPrefs((p) => ({ ...p, [label]: o }))}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        ))}
        <p className="px-2 pb-1 pt-2 text-[11px] leading-4 text-muted-foreground/80">
          Preview settings — saved for this session only; they don't change AK's answers yet.
        </p>
      </PopoverContent>
    </Popover>
  );
}

const intelligenceLayers = [
  {
    icon: ChartCandlestick,
    label: "Market structure",
    prompt: "Give me an overview of the current crypto market structure.",
  },
  {
    icon: Network,
    label: "On-chain signals",
    prompt: "What are the most important on-chain signals to watch right now?",
  },
  {
    icon: ShieldCheck,
    label: "Risk context",
    prompt: "Summarize the current risk context for crypto investors.",
  },
];

const shortcutBar = [
  { label: "BTC", prompt: "What is the current BTC market context?" },
  { label: "ETH", prompt: "What is the current ETH market context?" },
  { label: "DeFi", prompt: "What is happening in DeFi right now?" },
  { label: "Tokenomics", prompt: "Explain the key things to evaluate in a token's tokenomics." },
  { label: "Markets", prompt: "What is the current state of the crypto markets?" },
  { label: "On-chain", prompt: "Walk me through an on-chain analysis of the crypto market." },
  { label: "Risk", prompt: "What are the key risks in crypto right now?" },
  { label: "Market Structure", prompt: "Give me an overview of the current crypto market structure." },
  { label: "On-chain Signals", prompt: "What are the most important on-chain signals to watch right now?" },
  { label: "Risk Context", prompt: "Summarize the current risk context for crypto investors." },
];

const quickPrompts = {
  markets: "What is the current state of the crypto markets?",
  onchain: "Walk me through an on-chain analysis of the crypto market.",
  risk: "What are the key risks in crypto right now?",
  btc: "What is the current BTC market context?",
  eth: "What is the current ETH market context?",
  defi: "What is happening in DeFi right now?",
  tokenomics: "Explain the key things to evaluate in a token's tokenomics.",
};

function HeaderButton({
  label,
  children,
  ...props
}: React.ComponentProps<typeof Button> & { label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button aria-label={label} size="icon" variant="glass" {...props}>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  );
}

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
        <Button
          className={signin ? "auth-signin" : ""}
          size="sm"
          variant={signin ? "glass" : "send"}
        >
          {signin ? "Sign in" : "Get started"}
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-dialog sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{signin ? "Welcome back to AK" : "Create your AK account"}</DialogTitle>
          <DialogDescription>
            {signin
              ? "Sign in to continue your crypto research."
              : "Get started with institutional-grade crypto intelligence."}
          </DialogDescription>
        </DialogHeader>
        {done ? (
          <p className="text-sm text-muted-foreground">
            Accounts are coming soon. You can keep chatting with AK in the meantime.
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
            <Button className="mt-2 h-10" type="submit" variant="send">
              {signin ? "Sign in" : "Create account"}
            </Button>
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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [pop, setPop] = useState<{ x: number; y: number; text: string; key: number } | null>(null);

  const focusComposer = useCallback(() => {
    requestAnimationFrame(() => textareaRef.current?.focus());
  }, []);

  useEffect(() => {
    focusComposer();
  }, [focusComposer]);

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
            : [...current, assistantMessage],
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
            : [...current, failedMessage],
        );
      } finally {
        setIsSending(false);
        focusComposer();
      }
    },
    [focusComposer],
  );

  const sendPrompt = async (raw: string) => {
    const prompt = raw.trim();
    if (!prompt || isSending) return;
    setMessages((current) => [...current, { id: newId(), role: "user", content: prompt }]);
    setInput("");
    await requestReply(prompt);
  };

  const handleSubmit = async ({ text }: PromptInputMessage) => sendPrompt(text);

  const fireShortcut = (event: React.MouseEvent<HTMLButtonElement>, prompt: string) => {
    const el = event.currentTarget;
    el.classList.remove("ak-chip-fired");
    void el.offsetWidth;
    el.classList.add("ak-chip-fired");
    const r = el.getBoundingClientRect();
    const key = Date.now();
    setPop({ x: r.left + r.width / 2, y: r.top, text: prompt, key });
    window.setTimeout(() => setPop((p) => (p?.key === key ? null : p)), 1800);
    void sendPrompt(prompt);
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
    focusComposer();
  };

  const copyMessage = async (message: ChatMessage) => {
    await navigator.clipboard.writeText(message.content);
    setCopiedId(message.id);
    window.setTimeout(() => setCopiedId(null), 1600);
  };

  return (
    <TooltipProvider delayDuration={350}>
      <main className="ak-shell">
        <NetworkField />
        <BitcoinField />
        <div className="ledger-grid" aria-hidden="true" />
        {pop && (
          <div className="ak-pop" key={pop.key} role="status" style={{ left: pop.x, top: pop.y }}>
            <small>Sent to AK</small>
            {pop.text}
          </div>
        )}
        <div className="market-trace" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>

        <aside className="intelligence-rail" aria-label="AK intelligence areas">
          <div className="rail-brand">
            <AKMark active={isSending} />
            <div>
              <strong>AK</strong>
              <span>Crypto intelligence</span>
            </div>
          </div>
          <div className="rail-section-label">Intelligence layers</div>
          <div className="rail-layers">
            {intelligenceLayers.map(({ icon: Icon, label, prompt }, index) => (
              <button
                className={`ak-chip ${index === 0 ? "rail-layer rail-layer-active" : "rail-layer"}`}
                disabled={isSending}
                key={label}
                onClick={(e) => fireShortcut(e, prompt)}
                type="button"
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </div>
          <div className="rail-ledger" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="rail-foot">
            <Activity aria-hidden="true" />
            <div>
              <span>Analysis engine</span>
              <strong>{isSending ? "Processing" : "Online"}</strong>
            </div>
          </div>
        </aside>

        <div className="ak-workspace">
          <header className="ak-header" aria-label="AK chat header">
            <div className="flex min-w-0 items-center gap-3">
              <div className="mobile-brand-mark">
                <AKMark active={isSending} />
              </div>
              <div className="min-w-0">
                <h1 className="text-[17px] font-semibold leading-none text-foreground">AK</h1>
                <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className="status-dot" />
                  <span>Crypto intelligence online</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="auth-actions">
                <AuthDialog mode="signin" />
                <AuthDialog mode="signup" />
              </div>
              <HeaderButton label="New chat" onClick={resetChat}>
                <MessageSquarePlus />
              </HeaderButton>
              <AlertDialog>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                      <Button
                        aria-label="Clear chat"
                        disabled={messages.length === 0}
                        size="icon"
                        variant="glass"
                      >
                        <Trash2 />
                      </Button>
                    </AlertDialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Clear chat</TooltipContent>
                </Tooltip>
                <AlertDialogContent className="glass-dialog">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear this conversation?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This removes every message from the current session.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={resetChat}>Clear chat</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Dialog>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <Button aria-label="Settings" size="icon" variant="glass">
                        <Settings2 />
                      </Button>
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Settings</TooltipContent>
                </Tooltip>
                <DialogContent className="glass-dialog">
                  <DialogHeader>
                    <DialogTitle>Session settings</DialogTitle>
                    <DialogDescription>
                      Messages stay in this session only and are not saved after refresh.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="settings-row">
                    <span>Conversation</span>
                    <span className="text-muted-foreground">Temporary</span>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          <section className="chat-stage" aria-label="Conversation with AK">
            <Conversation className="ak-conversation">
              <ConversationContent className="mx-auto min-h-full w-full max-w-3xl gap-7 px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
                {messages.length === 0 ? (
                  <div className="empty-state animate-fade-in">
                    <div className="empty-mark-wrap">
                      <AKMark />
                      <Blocks aria-hidden="true" />
                    </div>
                    <span className="empty-eyebrow">Digital asset intelligence</span>
                    <h2>Clarity across crypto markets.</h2>
                    <p>
                      Research market structure, protocols, on-chain activity, and digital asset
                      risk.
                    </p>
                    <div className="intelligence-index" aria-label="AK research coverage">
                      <button
                        className="ak-chip"
                        disabled={isSending}
                        onClick={(e) => fireShortcut(e, quickPrompts.markets)}
                        type="button"
                      >
                        <ChartCandlestick aria-hidden="true" />
                        <span>Markets</span>
                      </button>
                      <button
                        className="ak-chip"
                        disabled={isSending}
                        onClick={(e) => fireShortcut(e, quickPrompts.onchain)}
                        type="button"
                      >
                        <DatabaseZap aria-hidden="true" />
                        <span>On-chain</span>
                      </button>
                      <button
                        className="ak-chip"
                        disabled={isSending}
                        onClick={(e) => fireShortcut(e, quickPrompts.risk)}
                        type="button"
                      >
                        <ShieldCheck aria-hidden="true" />
                        <span>Risk</span>
                      </button>
                    </div>
                    <div className="crypto-ticker" aria-label="Crypto shortcuts">
                      <button
                        className="ak-chip"
                        disabled={isSending}
                        onClick={(e) => fireShortcut(e, quickPrompts.btc)}
                        type="button"
                      >
                        <Bitcoin /> BTC
                      </button>
                      <button
                        className="ak-chip"
                        disabled={isSending}
                        onClick={(e) => fireShortcut(e, quickPrompts.eth)}
                        type="button"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        >
                          <path d="M12 2 5 12l7 4 7-4-7-10Z" />
                          <path d="m5 13.5 7 8.5 7-8.5-7 4-7-4Z" />
                        </svg>
                        ETH
                      </button>
                      <button
                        className="ak-chip"
                        disabled={isSending}
                        onClick={(e) => fireShortcut(e, quickPrompts.defi)}
                        type="button"
                      >
                        <Layers /> DeFi
                      </button>
                      <button
                        className="ak-chip"
                        disabled={isSending}
                        onClick={(e) => fireShortcut(e, quickPrompts.tokenomics)}
                        type="button"
                      >
                        <Coins /> Tokenomics
                      </button>
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <Message
                      className="animate-message-in max-w-full"
                      from={message.role}
                      key={message.id}
                    >
                      {message.role === "assistant" ? (
                        <div className="flex items-start gap-3 sm:gap-4">
                          <AKMark active={isSending} />
                          <div className="min-w-0 flex-1">
                            <MessageContent
                              className={`assistant-message ${message.error ? "assistant-error" : ""}`}
                            >
                              <MessageResponse>{message.content}</MessageResponse>
                            </MessageContent>
                            <MessageActions className="assistant-actions mt-2 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                              <MessageAction
                                label="Copy response"
                                onClick={() => void copyMessage(message)}
                                tooltip={copiedId === message.id ? "Copied" : "Copy"}
                              >
                                {copiedId === message.id ? <Check /> : <Copy />}
                              </MessageAction>
                              <MessageAction
                                disabled={isSending || !message.prompt}
                                label="Regenerate response"
                                onClick={() => {
                                  if (message.prompt) void requestReply(message.prompt, message.id);
                                }}
                                tooltip="Regenerate"
                              >
                                <RefreshCw />
                              </MessageAction>
                            </MessageActions>
                          </div>
                        </div>
                      ) : (
                        <MessageContent className="user-message">
                          <p className="whitespace-pre-wrap leading-7">{message.content}</p>
                        </MessageContent>
                      )}
                    </Message>
                  ))
                )}

                {isSending && (
                  <Message className="animate-message-in max-w-full" from="assistant">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <AKMark active />
                      <MessageContent className="assistant-message py-3.5">
                        <Shimmer className="text-sm">AK is thinking…</Shimmer>
                      </MessageContent>
                    </div>
                  </Message>
                )}
              </ConversationContent>
              <ConversationScrollButton className="scroll-button" />
            </Conversation>

            <div className="composer-wrap">
              <div className="shortcut-bar" role="group" aria-label="Crypto shortcuts">
                {shortcutBar.map((s) => (
                  <button
                    className="ak-chip shortcut-btn"
                    disabled={isSending}
                    key={s.label}
                    onClick={(e) => fireShortcut(e, s.prompt)}
                    type="button"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <PromptInput className="ak-composer" onSubmit={handleSubmit}>
                <PromptInputTextarea
                  aria-label="Message AK"
                  autoFocus
                  className="min-h-20 px-4 pb-1 pt-4 text-[15px] leading-6 placeholder:text-muted-foreground/80 sm:min-h-24 sm:px-5 sm:pt-5"
                  disabled={isSending}
                  maxLength={20_000}
                  onChange={(event) => setInput(event.currentTarget.value)}
                  placeholder="Ask AK about crypto markets, protocols, or risk…"
                  ref={textareaRef}
                  value={input}
                />
                <PromptInputFooter className="px-3 pb-3 sm:px-4 sm:pb-4">
                  <div className="flex items-center gap-3">
                    <ModelControl />
                    <span className="hidden text-[11px] text-muted-foreground md:inline">
                      Shift + Enter for a new line
                    </span>
                  </div>
                  <PromptInputSubmit
                    className={`send-button ml-auto size-9 rounded-full ${input.trim() ? "is-ready" : ""}`}
                    disabled={!input.trim() || isSending}
                    status={isSending ? "submitted" : "ready"}
                    variant="send"
                  />
                </PromptInputFooter>
              </PromptInput>
              <p className="mt-2.5 text-center text-[11px] text-muted-foreground/70">
                AI-generated research is informational and may contain errors.
              </p>
            </div>
          </section>
        </div>
      </main>
    </TooltipProvider>
  );
}
