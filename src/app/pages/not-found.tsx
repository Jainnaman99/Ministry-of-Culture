import { useNavigate } from "react-router";
import { Home } from "lucide-react";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-8" style={{ backgroundColor: 'var(--background)' }}>
      <div className="text-center max-w-md">
        <h1 className="text-6xl mb-4" style={{ color: 'var(--navy)' }}>
          404
        </h1>
        <h2 className="text-2xl mb-4" style={{ color: 'var(--navy)' }}>
          Page Not Found
        </h2>
        <p className="mb-8" style={{ color: 'var(--muted-foreground)' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all"
          style={{ 
            backgroundColor: 'var(--navy)',
            color: 'var(--ivory)'
          }}
        >
          <Home className="h-5 w-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
