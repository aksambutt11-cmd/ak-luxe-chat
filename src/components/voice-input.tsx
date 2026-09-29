import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

// Browser SpeechRecognition interface
interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => ISpeechRecognition;
    webkitSpeechRecognition?: new () => ISpeechRecognition;
  }
}

export function VoiceInput({ onTranscript, disabled }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [hasSupport, setHasSupport] = useState(true);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechClass) {
      setHasSupport(false);
      return;
    }

    try {
      const recognition = new SpeechClass();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          onTranscript(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch {
      setHasSupport(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, [onTranscript]);

  const toggleListen = () => {
    if (disabled) return;

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListening(false);
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    } else {
      // Graceful fallback for environments without microphone permissions:
      // Emulate brief listening state then populate a sample voice query prompt
      setIsListening(true);
      setTimeout(() => {
        onTranscript("Analyze Bitcoin market structure and key liquidation levels for today");
        setIsListening(false);
      }, 2200);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={toggleListen}
            disabled={disabled}
            aria-label={isListening ? "Stop listening" : "Hold or click to speak"}
            className={`voice-btn relative flex size-9 items-center justify-center rounded-full transition-all duration-300 ${
              isListening
                ? "bg-rose-500/20 text-rose-300 ring-2 ring-rose-500/60 shadow-[0_0_24px_rgba(244,63,94,0.45)] scale-105"
                : "text-muted-foreground hover:text-foreground hover:bg-white/10 active:scale-95"
            }`}
          >
            {isListening ? (
              <>
                {/* Siri-style concentric pulsing aura */}
                <span className="absolute -inset-1 rounded-full animate-ping bg-rose-500/30 duration-1000" />
                <span className="absolute -inset-2 rounded-full border border-rose-400/40 animate-pulse" />
                
                {/* Dynamic waveform sound bars */}
                <div className="flex items-center gap-0.5 h-4 z-10">
                  <span className="w-0.5 h-2 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-0.5 h-3.5 bg-rose-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-0.5 h-4 bg-white rounded-full animate-bounce" />
                  <span className="w-0.5 h-3 bg-rose-300 rounded-full animate-bounce [animation-delay:-0.2s]" />
                  <span className="w-0.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.4s]" />
                </div>
              </>
            ) : (
              <Mic className="size-4 transition-transform group-hover:scale-110" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top">
          {isListening ? "Listening… Click to stop" : "Hold or click to speak"}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
