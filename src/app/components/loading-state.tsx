import { motion } from "motion/react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Analyzing across multiple cultural repositories..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="flex gap-2 mb-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: 'var(--gold)' }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
      <p className="text-center" style={{ color: 'var(--navy)' }}>
        {message}
      </p>
      <div className="w-64 h-1 bg-[var(--muted)] rounded-full mt-4 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: 'var(--gold)' }}
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
