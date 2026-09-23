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
import { Check, Copy, MessageSquarePlus, RefreshCw, Settings2, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

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
      { title: "AK — Intelligent Conversation" },
      {
        name: "description",
        content: "A focused, premium AI conversation experience with AK.",
      },
      { property: "og:title", content: "AK — Intelligent Conversation" },
      {
        property: "og:description",
        content: "A focused, premium AI conversation experience with AK.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AKChat,
});

function AKMark({ active = false }: { active?: boolean }) {
  return (
    <div className={`ak-mark ${active ? "ak-mark-active" : ""}`} aria-hidden="true">
      <span>AK</span>
    </div>
  );
}

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

function AKChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

  const handleSubmit = async ({ text }: PromptInputMessage) => {
    const prompt = text.trim();
    if (!prompt || isSending) return;
    setMessages((current) => [...current, { id: newId(), role: "user", content: prompt }]);
    setInput("");
    await requestReply(prompt);
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
        <div className="ambient-light ambient-light-one" />
        <div className="ambient-light ambient-light-two" />

        <header className="ak-header" aria-label="AK chat header">
          <div className="flex min-w-0 items-center gap-3">
            <AKMark active={isSending} />
            <div className="min-w-0">
              <h1 className="text-[17px] font-semibold leading-none text-foreground">AK</h1>
              <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="status-dot" />
                <span>Ready to assist</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
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
                  <AKMark />
                  <h2>How can I help?</h2>
                  <p>Ask anything. I’ll keep the answer focused and clear.</p>
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
                          <MessageActions className="mt-2 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
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
            <PromptInput className="ak-composer" onSubmit={handleSubmit}>
              <PromptInputTextarea
                aria-label="Message AK"
                autoFocus
                className="min-h-20 px-4 pb-1 pt-4 text-[15px] leading-6 placeholder:text-muted-foreground/80 sm:min-h-24 sm:px-5 sm:pt-5"
                disabled={isSending}
                maxLength={20_000}
                onChange={(event) => setInput(event.currentTarget.value)}
                placeholder="Message AK…"
                ref={textareaRef}
                value={input}
              />
              <PromptInputFooter className="px-3 pb-3 sm:px-4 sm:pb-4">
                <span className="hidden text-[11px] text-muted-foreground sm:inline">
                  Shift + Enter for a new line
                </span>
                <PromptInputSubmit
                  className="send-button size-10 rounded-lg"
                  disabled={!input.trim() || isSending}
                  status={isSending ? "submitted" : "ready"}
                  variant="send"
                />
              </PromptInputFooter>
            </PromptInput>
            <p className="mt-2.5 text-center text-[11px] text-muted-foreground/70">
              AK can make mistakes. Check important information.
            </p>
          </div>
        </section>
      </main>
    </TooltipProvider>
  );
}
