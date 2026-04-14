import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { grammarLessons } from "@/data/mockData";
import HSKBadge from "@/components/shared/HSKBadge";

const GrammarLearn = () => {
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [exerciseAnswer, setExerciseAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean | null>(null);

  const lesson = grammarLessons.find((l) => l.id === selectedLesson);

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-5">
        <div className="flex items-center gap-3 animate-fade-in">
          <button
            onClick={() => selectedLesson ? setSelectedLesson(null) : navigate("/learn")}
            className="min-w-[44px] min-h-[44px] rounded-xl hover:bg-muted flex items-center justify-center transition-all duration-300 active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{selectedLesson ? "Bài học ngữ pháp" : "Ngữ pháp 语法"}</h1>
            <p className="text-sm text-muted-foreground">{selectedLesson ? lesson?.title : "Học cấu trúc câu theo cấp độ"}</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!selectedLesson ? (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              {grammarLessons.map((g, i) => (
                <motion.div
                  key={g.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => { setSelectedLesson(g.id); setShowResult(null); setExerciseAnswer(""); }}
                    className="w-full bg-card rounded-2xl border border-border p-4 text-left shadow-soft hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <HSKBadge level={g.hskLevel} />
                          <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Bài {g.id}</span>
                        </div>
                        <p className="text-sm font-semibold text-foreground">{g.title}</p>
                        <p className="text-xs text-muted-foreground font-hanzi mt-0.5">{g.structure}</p>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          ) : lesson ? (
            <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              {/* Structure */}
              <div className="bg-primary/5 rounded-2xl p-5 border border-primary/20">
                <p className="text-xs text-muted-foreground font-medium mb-1">Cấu trúc</p>
                <p className="text-lg font-bold font-hanzi text-primary">{lesson.structure}</p>
                <p className="text-sm text-muted-foreground mt-2">{lesson.explanation}</p>
              </div>

              {/* Examples */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Ví dụ:</p>
                {lesson.examples.map((ex, i) => (
                  <motion.div
                    key={i}
                    className="bg-card rounded-2xl border border-border p-4 shadow-soft"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <p className="font-hanzi text-foreground text-base">{ex.chinese}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{ex.pinyin}</p>
                    <p className="text-sm text-foreground mt-1">{ex.vietnamese}</p>
                  </motion.div>
                ))}
              </div>

              {/* Exercise */}
              {lesson.exercises.length > 0 && (
                <div className="bg-card rounded-2xl border border-border p-5 shadow-soft space-y-4">
                  <p className="text-sm font-semibold text-foreground">✏️ Bài tập: Sắp xếp thành câu</p>
                  <p className="text-xs text-muted-foreground">{lesson.exercises[0].vietnamese}</p>
                  <div className="flex flex-wrap gap-2">
                    {lesson.exercises[0].words.map((w) => (
                      <button
                        key={w}
                        onClick={() => setExerciseAnswer((prev) => prev ? prev + w : w)}
                        className="px-3 py-2 rounded-xl bg-muted text-foreground text-sm font-hanzi hover:bg-primary/10 hover:text-primary active:scale-95 transition-all duration-200"
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                  {exerciseAnswer && (
                    <div className="flex items-center gap-2">
                      <p className="font-hanzi text-foreground flex-1">{exerciseAnswer}</p>
                      <button
                        onClick={() => setExerciseAnswer("")}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => setShowResult(exerciseAnswer === lesson.exercises[0].correct)}
                    disabled={!exerciseAnswer}
                    className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-50 hover:opacity-90 active:scale-[0.98] transition-all duration-300"
                  >
                    Kiểm tra
                  </button>
                  <AnimatePresence>
                    {showResult !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3 rounded-xl flex items-center gap-2 ${showResult ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}
                      >
                        {showResult ? <Check size={18} /> : <X size={18} />}
                        <span className="text-sm font-medium">{showResult ? "Chính xác! 🎉" : `Sai rồi. Đáp án: ${lesson.exercises[0].correct}`}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GrammarLearn;
