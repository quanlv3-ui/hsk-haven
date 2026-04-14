import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Timer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { flashcards } from "@/data/mockData";

const INITIAL_TIME = 5;

const SpeedQuiz = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [currentQ, setCurrentQ] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [answered, setAnswered] = useState<boolean | null>(null);

  const card = flashcards[currentQ % flashcards.length];

  const generateOptions = useCallback(() => {
    const correct = card.meaning;
    const wrongs = flashcards
      .filter((f) => f.meaning !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((f) => f.meaning);
    const all = [correct, ...wrongs].sort(() => Math.random() - 0.5);
    setOptions(all);
  }, [currentQ]);

  useEffect(() => {
    generateOptions();
    setTimeLeft(INITIAL_TIME);
    setAnswered(null);
  }, [currentQ, generateOptions]);

  useEffect(() => {
    if (gameOver || answered !== null) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0.1) {
          setGameOver(true);
          return 0;
        }
        return t - 0.1;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [gameOver, answered, currentQ]);

  const handleAnswer = (opt: string) => {
    if (answered !== null) return;
    const correct = opt === card.meaning;
    setAnswered(correct);
    if (correct) {
      setScore(score + 1);
      setTimeout(() => setCurrentQ(currentQ + 1), 400);
    } else {
      setTimeout(() => setGameOver(true), 600);
    }
  };

  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-5">
          <p className="text-6xl animate-bounce-in">⚡</p>
          <h1 className="text-3xl font-bold text-foreground">{score} điểm</h1>
          <p className="text-muted-foreground">Tốc độ x{score}!</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setScore(0); setCurrentQ(0); setGameOver(false); }} className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-300">Chơi lại</button>
            <button onClick={() => navigate("/games")} className="px-6 py-3 rounded-2xl border border-border font-medium hover:bg-muted active:scale-[0.98] transition-all duration-300">Quay lại</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-5">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate("/games")} className="min-w-[44px] min-h-[44px] rounded-xl hover:bg-muted flex items-center justify-center transition-all duration-300 active:scale-95">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-primary" />
            <span className="text-lg font-bold text-foreground">{score}</span>
          </div>
          <div className="flex items-center gap-1">
            <Timer size={16} className={timeLeft < 2 ? "text-destructive" : "text-muted-foreground"} />
            <span className={`text-sm font-mono font-bold ${timeLeft < 2 ? "text-destructive" : "text-foreground"}`}>
              {timeLeft.toFixed(1)}s
            </span>
          </div>
        </div>

        {/* Timer bar */}
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${timeLeft < 2 ? "bg-destructive" : "bg-primary"}`}
            animate={{ width: `${(timeLeft / INITIAL_TIME) * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentQ} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-5">
            <div className="bg-card rounded-3xl border border-border p-8 text-center shadow-soft">
              <p className="hanzi-large text-foreground">{card.hanzi}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {options.map((opt) => (
                <motion.button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className={`p-4 rounded-2xl border text-sm font-medium transition-all duration-200 active:scale-95 ${
                    answered !== null && opt === card.meaning ? "bg-success/10 border-success text-success" :
                    answered === false && opt !== card.meaning ? "opacity-50" :
                    "bg-card border-border text-foreground hover:border-primary/30 hover:shadow-soft"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SpeedQuiz;
