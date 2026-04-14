import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, Check, X, Headphones } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { listeningExercises } from "@/data/mockData";
import ProgressBar from "@/components/shared/ProgressBar";

const ListeningPractice = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = listeningExercises[currentQ];

  const handleSelect = (i: number) => {
    if (showResult) return;
    setSelected(i);
    setShowResult(true);
    if (i === q.correct) setScore(score + 1);
    setTimeout(() => {
      if (currentQ < listeningExercises.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        setDone(true);
      }
    }, 1500);
  };

  if (done) {
    const pct = Math.round((score / listeningExercises.length) * 100);
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-5">
          <p className="text-6xl animate-bounce-in">{pct >= 80 ? "🎉" : "💪"}</p>
          <h1 className="text-3xl font-bold text-foreground">{score}/{listeningExercises.length}</h1>
          <p className="text-muted-foreground">{pct}% chính xác</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setCurrentQ(0); setScore(0); setDone(false); setSelected(null); setShowResult(false); }} className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-300">Làm lại</button>
            <button onClick={() => navigate("/learn")} className="px-6 py-3 rounded-2xl border border-border font-medium hover:bg-muted active:scale-[0.98] transition-all duration-300">Quay lại</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/learn")} className="min-w-[44px] min-h-[44px] rounded-xl hover:bg-muted flex items-center justify-center transition-all duration-300 active:scale-95">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1"><ProgressBar value={currentQ + 1} max={listeningExercises.length} /></div>
          <span className="text-xs text-muted-foreground">{currentQ + 1}/{listeningExercises.length}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentQ} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
            <div className="bg-card rounded-3xl border border-border p-8 text-center shadow-soft">
              <button
                className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 hover:scale-110 hover:shadow-lg active:scale-95 transition-all duration-300 group"
              >
                <Headphones size={32} className="text-primary group-hover:scale-110 transition-transform duration-300" />
              </button>
              <p className="text-sm text-muted-foreground mt-4">
                {q.type === "word" ? "Nghe từ và chọn chữ Hán đúng" : "Nghe câu và chọn nghĩa đúng"}
              </p>
              <p className="font-hanzi text-lg text-foreground mt-2">{q.pinyin}</p>
            </div>

            <div className="space-y-2">
              {q.options.map((opt, i) => {
                const isCorrect = q.correct === i;
                const isSelected = selected === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 active:scale-[0.98] ${
                      showResult && isCorrect ? "bg-success/10 border-success shadow-soft" :
                      showResult && isSelected && !isCorrect ? "bg-destructive/10 border-destructive" :
                      "bg-card border-border hover:border-primary/40 hover:shadow-md hover:-translate-y-1 hover:scale-[1.01]"
                    }`}
                  >
                    <span className={`text-sm font-medium ${q.type === "word" ? "font-hanzi text-lg" : ""}`}>{opt}</span>
                    {showResult && isCorrect && <Check size={18} className="inline ml-2 text-success" />}
                    {showResult && isSelected && !isCorrect && <X size={18} className="inline ml-2 text-destructive" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ListeningPractice;
