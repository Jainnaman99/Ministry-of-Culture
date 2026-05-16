import { cn } from "../components/ui/utils";
import { User, ExternalLink, ShieldCheck, ShieldAlert, Shield } from "lucide-react";
import { SaathiAvatar } from "./saathi-avatar";

interface ChatBubbleProps {
  text?: string;
  message?: string;
  isUser: boolean;
  timestamp?: string;
  sources?: { title: string; url: string }[];
  confidence?: "High" | "Medium" | "Low";
  id?: string;
}

function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function ChatBubble({ text, message, isUser, timestamp, sources, confidence }: ChatBubbleProps) {
  const content = text || message || "";

  // Confidence badges — palette-matched (cream/maroon for High, amber for Medium, red for Low)
  const confidenceConfig = {
    High: { icon: ShieldCheck, color: "var(--maroon)", bg: "#FFF6E5", border: "var(--maroon)", label: "High Confidence" },
    Medium: { icon: Shield, color: "#92400e", bg: "#fef3c7", border: "#92400e", label: "Medium Confidence" },
    Low: { icon: ShieldAlert, color: "#991b1b", bg: "#fee2e2", border: "#991b1b", label: "Low Confidence" },
  };

  return (
    <div className={cn("flex w-full mb-5 gap-3", isUser ? "justify-end" : "justify-start")}>
      {/* Avatar for AI — Sanskriti Saathi (Indian character SVG) */}
      {!isUser && (
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-1 overflow-hidden"
          style={{ backgroundColor: '#FFF6E5', border: '2px solid #C9A961' }}
        >
          <SaathiAvatar size={36} />
        </div>
      )}

      <div className={cn("max-w-[75%]", isUser ? "ml-auto" : "")}>
        <div
          className={cn(
            "rounded-2xl px-5 py-3.5",
            isUser ? "rounded-br-md" : "rounded-bl-md"
          )}
          style={{
            backgroundColor: isUser ? 'var(--maroon)' : 'white',
            color: isUser ? '#FFF6E5' : 'var(--navy)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)'
          }}
        >
          <p className="whitespace-pre-wrap leading-relaxed text-[14px]">{renderFormattedText(content)}</p>

          {/* Confidence Badge */}
          {!isUser && confidence && (
            <div className="mt-2.5 pt-2.5 border-t flex items-center gap-2" style={{ borderColor: 'var(--border)' }}>
              {(() => {
                const config = confidenceConfig[confidence];
                const Icon = config.icon;
                return (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                    style={{ backgroundColor: config.bg, color: config.color, borderColor: config.border }}
                  >
                    <Icon className="h-2.5 w-2.5" />
                    {config.label}
                  </span>
                );
              })()}
              <span className="text-[9px] opacity-70 italic" style={{ color: 'var(--navy)' }}>✓ RAG-verified response</span>
            </div>
          )}

          {/* Sources */}
          {!isUser && sources && sources.length > 0 && (
            <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <details className="cursor-pointer group">
                <summary className="text-xs font-semibold mb-2 select-none" style={{ color: 'var(--maroon)' }}>
                  View Sources ({sources.length})
                </summary>
                <div className="space-y-1.5 mt-2">
                  {sources.map((source, index) => (
                    <a
                      key={index}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
                      style={{ color: 'var(--navy)' }}
                    >
                      <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-50" />
                      <span className="truncate">{source.title}</span>
                    </a>
                  ))}
                </div>
              </details>
            </div>
          )}
        </div>

        {timestamp && (
          <p className={cn("text-[10px] opacity-40 mt-1 px-1", isUser ? "text-right" : "")} style={{ color: 'var(--navy)' }}>
            {timestamp}
          </p>
        )}
      </div>

      {/* Avatar for User */}
      {isUser && (
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
          style={{ backgroundColor: '#C9A961', border: '2px solid var(--maroon)' }}
        >
          <User className="h-4 w-4" style={{ color: 'var(--maroon)' }} />
        </div>
      )}
    </div>
  );
}
