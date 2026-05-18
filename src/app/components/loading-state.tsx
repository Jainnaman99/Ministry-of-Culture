import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const HERITAGE_FACTS = [
  { emoji: "🏛️", fact: "India has 42 UNESCO World Heritage Sites — more than any other country in Asia." },
  { emoji: "📜", fact: "The Rigveda, composed around 1500 BCE, is one of the oldest known texts in any language." },
  { emoji: "🕌", fact: "Taj Mahal took 22 years and over 20,000 artisans to build — completed in 1653 CE." },
  { emoji: "🎭", fact: "Bharatanatyam is over 2,000 years old and originated in Tamil Nadu's temple traditions." },
  { emoji: "🏺", fact: "Mohenjo-daro had the world's first known urban drainage system, built 4,500 years ago." },
  { emoji: "🎨", fact: "Madhubani painting from Bihar dates back 2,500+ years — it was painted on palace walls." },
  { emoji: "🎵", fact: "India has 8 classical dance forms officially recognised by Sangeet Natak Akademi." },
  { emoji: "🌊", fact: "Kumbh Mela is the world's largest peaceful gathering, visible from space by satellite." },
  { emoji: "🪨", fact: "Ajanta Caves contain Buddhist murals painted between 2nd century BCE and 5th century CE." },
  { emoji: "📿", fact: "Sanskrit, one of the world's oldest languages, has a grammar codified by Pāṇini in 400 BCE." },
];

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Searching..." }: LoadingStateProps) {
  const [factIndex, setFactIndex] = useState(() => Math.floor(Math.random() * HERITAGE_FACTS.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((i) => (i + 1) % HERITAGE_FACTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = HERITAGE_FACTS[factIndex];

  return (
    <div className="flex flex-col items-center py-5 px-3">
      {/* Dots */}
      <div className="flex gap-1.5 mb-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "var(--gold)" }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>

      {/* Status text */}
      <p className="text-xs font-medium mb-4" style={{ color: "var(--navy)", opacity: 0.6 }}>
        {message}
      </p>

      {/* Did You Know card */}
      <div
        className="w-full rounded-xl px-3.5 py-3 relative overflow-hidden"
        style={{ backgroundColor: "#FFF6E5", border: "1px solid #e8d5a3" }}
      >
        <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: "#C9A961" }}>
          ✦ Did You Know?
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={factIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="flex items-start gap-2"
          >
            <span className="text-lg leading-none mt-0.5 flex-shrink-0">{current.emoji}</span>
            <p className="text-[11px] leading-relaxed" style={{ color: "var(--navy)" }}>
              {current.fact}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex gap-1 mt-3 justify-center">
          {HERITAGE_FACTS.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === factIndex ? "16px" : "4px",
                height: "4px",
                backgroundColor: i === factIndex ? "var(--maroon)" : "#e8d5a3",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}