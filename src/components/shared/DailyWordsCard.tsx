import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Volume2, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import { allTopicWords } from "@/data/topicsData";
import { useBookmarks } from "@/hooks/useBookmarks";

const speak = (text: string) => {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN";
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
};

// Stable daily seed → same 5 words each day
const getDailyWords = () => {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  // Simple deterministic pick
  const start = seed % allTopicWords.length;
  const picks: typeof allTopicWords = [];
  for (let i = 0; i < 5; i++) {
    picks.push(allTopicWords[(start + i * 17) % allTopicWords.length]);
  }
  return picks;
};

const DailyWordsCard = () => {
  const words = useMemo(getDailyWords, []);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const { isBookmarked, toggle } = useBookmarks();
  const w = words[index];

  const next = () => {
    setRevealed(false);
    setIndex((i) => (i + 1) % words.length);
  };
  const prev = () => {
    setRevealed(false);
    setIndex((i) => (i - 1 + words.length) % words.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent/30 via-card to-primary/10 p-5 shadow-soft"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-primary" />
          <p className="text-sm font-bold text-foreground">5 từ mỗi ngày</p>
        </div>
        <span className="text-[11px] text-muted-foreground font-medium tabular-nums">{index + 1}/{words.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.button
          key={w.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          onClick={() => setRevealed((r) => !r)}
          className="w-full bg-card/70 backdrop-blur rounded-2xl border border-border/60 p-5 flex items-center gap-4 hover:shadow-md transition-all duration-300 text-left"
        >
          <span className="text-4xl flex-shrink-0">{w.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="hanzi-small text-foreground">{w.hanzi}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{w.pinyin}</p>
            {revealed ? (
              <p className="text-sm font-semibold text-primary mt-1">{w.meaning}</p>
            ) : (
              <p className="text-[11px] text-muted-foreground/70 mt-1 italic">Nhấn để xem nghĩa</p>
            )}
          </div>
        </motion.button>
      </AnimatePresence>

      <div className="flex items-center justify-between mt-3">
        <button
          onClick={prev}
          className="w-9 h-9 rounded-full bg-card/60 border border-border/50 flex items-center justify-center hover:bg-card transition-colors"
          aria-label="Trước"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); speak(w.hanzi); }}
            className="w-9 h-9 rounded-full bg-card/60 border border-border/50 flex items-center justify-center hover:bg-card transition-colors"
            aria-label="Phát âm"
          >
            <Volume2 size={16} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); toggle(w.id); }}
            className="w-9 h-9 rounded-full bg-card/60 border border-border/50 flex items-center justify-center hover:bg-card transition-colors"
            aria-label="Đánh dấu"
          >
            <Bookmark size={16} className={isBookmarked(w.id) ? "text-primary fill-primary" : ""} />
          </button>
        </div>
        <button
          onClick={next}
          className="w-9 h-9 rounded-full bg-card/60 border border-border/50 flex items-center justify-center hover:bg-card transition-colors"
          aria-label="Sau"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default DailyWordsCard;
