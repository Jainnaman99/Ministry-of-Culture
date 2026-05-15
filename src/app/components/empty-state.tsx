import { Search } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  suggestions?: string[];
}

export function EmptyState({ 
  title = "No Results Found",
  message = "We couldn't find exact results, but here are related insights",
  suggestions = []
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: 'var(--muted)' }}
      >
        <Search className="h-8 w-8" style={{ color: 'var(--navy)' }} />
      </div>
      
      <h3 className="mb-2" style={{ color: 'var(--navy)' }}>
        {title}
      </h3>
      
      <p className="mb-6 max-w-md" style={{ color: 'var(--muted-foreground)' }}>
        {message}
      </p>
      
      {suggestions.length > 0 && (
        <div className="space-y-2">
          <p className="font-medium mb-3" style={{ color: 'var(--navy)' }}>
            Try these instead:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="px-4 py-2 rounded-full border transition-all hover:shadow-md"
                style={{ 
                  borderColor: 'var(--border)',
                  backgroundColor: 'white',
                  color: 'var(--navy)'
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
