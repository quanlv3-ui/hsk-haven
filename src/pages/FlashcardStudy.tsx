import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Volume2, Eye, EyeOff, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { flashcards } from "@/data/mockData";
import ProgressBar from "@/components/shared/ProgressBar";

const ratings = [
  { label: "Lại", interval: "<1 ngày", bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/20" },
  { label: "Khó", interval: "3 ngày", bg: "bg-warning/10", text: "text-warning", border: "border-warning/20" },
  { label: "Được", interval: "7 ngày", bg: "bg-success/10", text: "text-success", border: "border-success/20" },
  { label: "Dễ", interval: "14 ngày", bg: "bg-easy/10", text: "text-easy", border: "border-easy/20" },
];

const FlashcardStudy = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPinyin, setShowPinyin] = useState(false);
  const totalCards = Math.min(flashcards.length, 5);
  const card = flashcards[currentIndex % flashcards.length];

  const handleRate = () => {
    if (currentIndex + 1 >= totalCards) {
      navigate("/study/complete");
    } else {
      setIsFlipped(false);
      setShowPinyin(false);
      setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-3 p-4">
        <button onClick={() => navigate(-1)} className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-muted">
          <X size={22} />
        </button>
        <div className="flex-1"><ProgressBar value={currentIndex + 1} max={totalCards} /></div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Flame size={16} className="text-warning" />
          <span className="text-xs font-medium">{currentIndex + 1}/{totalCards}</span>
        </div>
      </div>

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center px-4 pb-4">
        <div className="perspective-1000 w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="relative w-full cursor-pointer"
                style={{ minHeight: "360px" }}
                onClick={() => !isFlipped && setIsFlipped(true)}
              >
                <motion.div
                  className="w-full bg-card rounded-3xl border border-border shadow-lg p-8"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ transformStyle: "preserve-3d", minHeight: "360px" }}
                >
                  {/* Front */}
                  <div className={`${isFlipped ? "invisible" : ""} backface-hidden flex flex-col items-center justify-center h-full`}>
                    <p className="hanzi-large text-foreground">{card.hanzi}</p>
                    {showPinyin && <p className="mt-3 text-lg text-muted-foreground">{card.pinyin}</p>}
                    <div className="flex gap-3 mt-6">
                      <button onClick={(e) => { e.stopPropagation(); setShowPinyin(!showPinyin); }} className="min-w-[44px] min-h-[44px] rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors">
                        {showPinyin ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button onClick={(e) => e.stopPropagation()} className="min-w-[44px] min-h-[44px] rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors">
                        <Volume2 size={18} />
                      </button>
                    </div>
                    <p className="mt-6 text-sm text-muted-foreground">Nhấn để xem nghĩa</p>
                  </div>
                  {/* Back */}
                  <div className={`${!isFlipped ? "invisible" : ""} absolute inset-0 backface-hidden rotate-y-180 p-8 flex flex-col items-center justify-center`}>
                    <p className="hanzi-medium text-foreground">{card.hanzi}</p>
                    <p className="text-muted-foreground mt-1">{card.pinyin}</p>
                    <p className="text-xl font-semibold text-foreground mt-4">{card.meaning}</p>
                    <div className="mt-4 text-center">
                      <p className="text-sm text-muted-foreground font-hanzi">{card.example}</p>
                      <p className="text-sm text-muted-foreground mt-1">{card.exampleTranslation}</p>
                    </div>
                    <span className="mt-4 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">{card.context}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Rating buttons */}
      {isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 pb-8 grid grid-cols-4 gap-2 max-w-md mx-auto w-full"
        >
          {ratings.map((r) => (
            <button key={r.label} onClick={handleRate} className={`${r.bg} ${r.text} border ${r.border} rounded-xl py-3 flex flex-col items-center gap-1 min-h-[56px] hover:opacity-80 transition-opacity`}>
              <span className="text-sm font-semibold">{r.label}</span>
              <span className="text-[10px] opacity-60">{r.interval}</span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default FlashcardStudy;
