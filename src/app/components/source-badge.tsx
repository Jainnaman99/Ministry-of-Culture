import { cn } from "../components/ui/utils";

interface SourceBadgeProps {
  source: string;
  className?: string;
}

export function SourceBadge({ source, className }: SourceBadgeProps) {
  return (
    <span
      className={cn("px-3 py-1 rounded-full text-xs inline-block", className)}
      style={{
        backgroundColor: 'var(--gold)',
        color: 'var(--navy)'
      }}
    >
      {source}
    </span>
  );
}
