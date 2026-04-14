import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { grammarLessons } from "@/data/mockData";
import HSKBadge from "@/components/shared/HSKBadge";

const GrammarLearn = () => {
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [answerIndexes, setAnswerIndexes] = useState<number[]>([]);
  const [showResult, setShowResult] = useState<boolean | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const lesson = grammarLessons.find((l) => l.id === selectedLesson);

  const checkAnswer = () => {
    if (!lesson) return;
    const currentAnswer = answerIndexes.map((i) => lesson.exercises[0].words[i]).join("");
    setShowResult(currentAnswer === lesson.exercises[0].correct);
  };

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
                    onClick={() => { setSelectedLesson(g.id); setShowResult(null); setAnswerIndexes([]); }}
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
                <div className="bg-card rounded-3xl border border-border p-5 shadow-soft space-y-5">
                  <div>
                    <p className="text-base font-bold text-foreground">✏️ Sắp xếp thành câu</p>
                    <p className="text-sm text-muted-foreground mt-1">{lesson.exercises[0].vietnamese}</p>
                  </div>
                  
                  {/* Available Words Pool (TOP) */}
                  <div className="flex flex-wrap gap-2 min-h-[60px] p-1">
                    {lesson.exercises[0].words.map((w, idx) => {
                      if (answerIndexes.includes(idx)) return null;
                      return (
                        <motion.button
                          layoutId={`grammar-word-${idx}`}
                          key={`avail-${idx}`}
                          drag
                          dragSnapToOrigin
                          whileDrag={{ zIndex: 50, scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 200, damping: 25 }}
                          onDragEnd={(e, info) => {
                            if (info.offset.y > 20) {
                              setAnswerIndexes((prev) => [...prev, idx]);
                            }
                          }}
                          onClick={() => setAnswerIndexes((prev) => [...prev, idx])}
                          className="px-4 py-2.5 rounded-xl bg-card border-2 border-border text-foreground font-hanzi text-lg font-medium shadow-sm hover:border-primary/40 hover:-translate-y-1 hover:shadow-soft active:scale-95 transition-colors cursor-grab active:cursor-grabbing select-none"
                        >
                          {w}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Answer Pool (BOTTOM) */}
                  <Reorder.Group 
                    axis="x" 
                    values={answerIndexes} 
                    onReorder={setAnswerIndexes} 
                    className="min-h-[72px] p-3 rounded-2xl border-2 border-dashed border-border bg-muted/30 flex flex-wrap gap-2 items-center"
                  >
                    {answerIndexes.length === 0 && (
                      <span className="text-muted-foreground text-sm px-2 animate-pulse absolute">
                        Nhấn hoặc kéo thả các từ bên trên xuống đây...
                      </span>
                    )}
                    {answerIndexes.map((idx) => (
                      <Reorder.Item
                        value={idx}
                        key={`ans-${idx}`}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
                        className="cursor-grab active:cursor-grabbing select-none"
                      >
                        <motion.div 
                          layoutId={`grammar-word-${idx}`}
                          transition={{ type: "spring", stiffness: 200, damping: 25 }}
                          onClick={() => {
                            if (!isDragging) {
                              setAnswerIndexes((prev) => prev.filter((i) => i !== idx));
                            }
                          }}
                          className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-hanzi text-lg font-medium shadow-soft active:scale-95 transition-colors"
                        >
                          {lesson.exercises[0].words[idx]}
                        </motion.div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>

                  <div className="pt-2 border-t border-border">
                    <button
                      onClick={checkAnswer}
                      disabled={answerIndexes.length === 0}
                      className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-lg disabled:opacity-50 disabled:active:scale-100 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Kiểm tra <Check size={20} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {showResult !== null && (
                      <motion.div
                        initial={{ opacity: 0, h: 0, y: 10 }}
                        animate={{ opacity: 1, h: "auto", y: 0 }}
                        className={`p-4 rounded-2xl flex items-start gap-3 mt-4 ${showResult ? "bg-success/15 text-success-foreground border border-success/30" : "bg-destructive/15 text-destructive-foreground border border-destructive/30"}`}
                      >
                        <div className={`mt-0.5 rounded-full p-1 bg-background shadow-sm ${showResult ? "text-success" : "text-destructive"}`}>
                          {showResult ? <Check size={16} /> : <X size={16} />}
                        </div>
                        <div>
                          <p className="font-bold text-base">{showResult ? "Chính xác! Cực kỳ xuất sắc! 🎉" : "Chưa đúng mất rồi."}</p>
                          {!showResult && (
                            <p className="text-sm mt-1 opacity-90">
                              Đáp án đúng: <span className="font-hanzi font-bold text-base ml-1">{lesson.exercises[0].correct}</span>
                            </p>
                          )}
                        </div>
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
