import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { quizQuestions } from "@/data/mockData";
import ProgressBar from "@/components/shared/ProgressBar";

const QuizSetup = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useState(3);
  const [count, setCount] = useState(10);

  return (
    <div className="min-h-screen pb-20 md:pb-8 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl border border-border p-8 w-full max-w-md animate-fade-in">
        <h1 className="text-xl font-bold text-foreground">Tạo bài kiểm tra</h1>
        <div className="mt-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground">Cấp độ HSK</label>
            <select value={level} onChange={(e) => setLevel(+e.target.value)} className="w-full mt-1 px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm">
              {[1, 2, 3].map((l) => <option key={l} value={l}>HSK {l}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Số câu hỏi</label>
            <div className="flex gap-2 mt-2">
              {[10, 20, 30].map((n) => (
                <button key={n} onClick={() => setCount(n)} className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-colors ${count === n ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>{n} câu</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Loại câu hỏi</label>
            <div className="mt-2 space-y-2">
              {["Trắc nghiệm (Hán → nghĩa)", "Trắc nghiệm (nghĩa → Hán)", "Ghép pinyin"].map((t, i) => (
                <label key={t} className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" defaultChecked={i < 2} className="rounded" /> {t}</label>
              ))}
              {["Nghe và chọn", "Điền vào chỗ trống"].map((t) => (
                <label key={t} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" className="rounded" /> {t}</label>
              ))}
            </div>
          </div>
          <button onClick={() => navigate("/practice/quiz/1")} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold min-h-[44px]">Bắt đầu kiểm tra</button>
        </div>
      </div>
    </div>
  );
};

const QuizPlay = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const total = quizQuestions.length;
  const q = quizQuestions[current];

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const newAnswers = [...answers, i];
    setAnswers(newAnswers);
    setTimeout(() => {
      if (current + 1 >= total) {
        navigate("/practice/quiz/1/results", { state: { answers: newAnswers } });
      } else {
        setCurrent(current + 1);
        setSelected(null);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center gap-3 p-4">
        <button onClick={() => navigate(-1)} className="min-w-[44px] min-h-[44px] flex items-center justify-center"><X size={22} /></button>
        <div className="flex-1"><ProgressBar value={current + 1} max={total} /></div>
        <span className="text-xs text-muted-foreground">Câu {current + 1}/{total}</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="w-full text-center">
            <p className="text-sm text-muted-foreground">{q.question}</p>
            <p className="hanzi-medium text-foreground mt-4">{q.hanzi}</p>

            <div className="mt-8 space-y-3">
              {q.options.map((opt, i) => {
                let cls = "bg-card border-border text-foreground hover:border-muted-foreground/50";
                if (selected !== null) {
                  if (i === q.correct) cls = "bg-success/5 border-success text-success";
                  else if (i === selected && i !== q.correct) cls = "bg-destructive/5 border-destructive text-destructive";
                }
                return (
                  <button key={i} onClick={() => handleSelect(i)} disabled={selected !== null} className={`w-full border-2 rounded-xl py-3.5 px-4 text-left text-sm font-medium transition-all min-h-[44px] ${cls}`}>
                    {selected !== null && i === q.correct && "✓ "}
                    {selected === i && i !== q.correct && "✗ "}
                    {opt}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-sm text-muted-foreground bg-muted p-3 rounded-xl">
                {q.explanation}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const QuizResults = () => {
  const navigate = useNavigate();
  const correctCount = 8;
  const total = quizQuestions.length;
  const pct = Math.round((correctCount / total) * 100);
  const wrongQuestions = quizQuestions.filter((_, i) => i >= correctCount);

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-md py-8 space-y-6">
        <div className="text-center animate-fade-in">
          <div className="relative inline-flex items-center justify-center w-32 h-32">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--primary))" strokeWidth="8" strokeDasharray={`${pct * 3.27} 327`} strokeLinecap="round" />
            </svg>
            <div className="absolute text-center">
              <p className="text-2xl font-bold text-foreground">{correctCount}/{total}</p>
              <p className="text-sm text-muted-foreground">{pct}%</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          {[{ label: "6 phút", icon: "⏱" }, { label: "Streak: 5", icon: "🔥" }, { label: "+5%", icon: "📈" }].map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border px-4 py-2 text-center text-sm">
              <span>{s.icon}</span> <span className="font-semibold text-foreground">{s.label}</span>
            </div>
          ))}
        </div>

        {wrongQuestions.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">Từ trả lời sai</h2>
            <div className="space-y-2">
              {wrongQuestions.map((q, i) => (
                <div key={i} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
                  <span className="hanzi-small text-foreground">{q.hanzi}</span>
                  <div className="flex-1">
                    <p className="text-sm text-destructive">✗ {q.options[1]}</p>
                    <p className="text-sm text-success">✓ {q.options[q.correct]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button onClick={() => navigate("/study/flashcard")} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold">Ôn lại từ sai</button>
          <button onClick={() => navigate("/practice/quiz/1")} className="w-full border border-primary text-primary py-3 rounded-xl font-semibold">Làm lại</button>
          <button onClick={() => navigate("/dashboard")} className="w-full text-sm text-muted-foreground py-2">Về trang chủ</button>
        </div>
      </div>
    </div>
  );
};

export { QuizSetup, QuizPlay, QuizResults };
