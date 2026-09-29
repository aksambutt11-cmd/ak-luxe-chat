import { useState } from "react";
import { Check, Copy, Download, Share2, Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ShareCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messageContent: string;
  userPrompt?: string;
}

export function ShareCardDialog({
  open,
  onOpenChange,
  messageContent,
  userPrompt,
}: ShareCardDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const formatted = `AK Crypto Intelligence Report\nQuery: ${userPrompt || "Market Research"}\n\n${messageContent}\n\nGenerated via AK Luxe Intelligence`;
    await navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = `=====================================\nAK LUXE INTELLIGENCE REPORT\nDate: ${new Date().toUTCString()}\nQuery: ${userPrompt || "Market Analysis"}\n=====================================\n\n${messageContent}\n\nDisclaimer: Informational analysis only. Not financial advice.`;
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `AK-Analysis-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg overflow-hidden border border-white/20 bg-slate-950/85 p-0 backdrop-blur-2xl text-foreground shadow-2xl">
        <DialogHeader className="p-5 pb-3 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
                <Sparkles className="size-4" />
              </div>
              <DialogTitle className="text-base font-semibold">Share Intelligence Card</DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-xs text-muted-foreground mt-1">
            Export a high-contrast executive snapshot of this crypto analysis.
          </DialogDescription>
        </DialogHeader>

        {/* Card Snapshot Preview */}
        <div className="p-5">
          <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/[0.03] p-5 shadow-inner backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-foreground text-background font-bold text-xs">
                  AK
                </span>
                <span className="text-xs font-semibold tracking-wide">AK LUXE RESEARCH</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">
                {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>

            {/* Prompt */}
            {userPrompt && (
              <div className="my-3 rounded-lg bg-white/5 p-2.5 border border-white/10 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground/90">Query: </span>
                {userPrompt}
              </div>
            )}

            {/* Content snippet */}
            <div className="max-h-48 overflow-y-auto pr-2 text-xs leading-relaxed text-foreground/90 whitespace-pre-wrap font-sans">
              {messageContent}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] text-muted-foreground">
              <span>Verified On-Chain Intelligence</span>
              <span className="font-mono">t.me/ak_crypto</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 bg-white/[0.03] p-4 border-t border-white/10">
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-foreground hover:bg-white/10 active:scale-95 transition-all"
          >
            <Download className="size-3.5" />
            Download (.txt)
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background hover:opacity-90 active:scale-95 transition-all shadow-md"
          >
            {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy Snapshot"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
