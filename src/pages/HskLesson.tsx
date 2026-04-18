import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, MessageCircle, GraduationCap, ListChecks, Volume2, CheckCircle2, RotateCcw, Trophy } from "lucide-react";
import { getLesson } from "@/data/hskCourseData";
import { useHskProgress } from "@/hooks/useHskProgress";

type Tab = "vocab" | "grammar" | "dialogue" | "quiz";

const tabs: { key: Tab; label: string; icon: typeof BookOpen }[] = [
  { key: "vocab", label: "Từ vựng", icon: BookOpen },
  { key: "grammar", label: "Ngữ pháp", icon: GraduationCap },
  { key: "dialogue", label: "Hội thoại", icon: MessageCircle },
  { key: "quiz", label: "Quiz", icon: ListChecks },
];

const speak = (text: string) => {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN";
  u.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
};

const HskLesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const data = lessonId ? getLesson(lessonId) : null;
  const { completeLesson, saveQuizScore, isLessonComplete, getQuizScore } = useHskProgress();

  const [tab, setTab] = useState<Tab>("vocab");
  const [flippedVocab, setFlippedVocab] = useState<Set<number>>(new Set());
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizDone, setQuizDone] = useState(false);

  if (!data) {
    return (
      <div className="container max-w-2xl py-10 text-center">
        <p className="text-muted-foreground">Không tìm thấy bài học.</p>
        <button onClick={() => navigate("/study")} className="mt-4 text-primary font-semibold">← Quay lại</button>
      </div>
    );
  }

  const { lesson, course, week } = data;
  const done = isLessonComplete(lesson.id);
  const bestScore = getQuizScore(lesson.id);

  const toggleFlip = (i: number) => {
    setFlippedVocab((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const handleQuizAnswer = (idx: number) => {
    if (quizSelected !== null) return;
    setQuizSelected(idx);
    const newAnswers = [...quizAnswers, idx];
    setTimeout(() => {
      if (quizIdx + 1 >= lesson.quiz.length) {
        const correct = newAnswers.filter((a, i) => a === lesson.quiz[i].answer).length;
        saveQuizScore(lesson.id, correct, lesson.quiz.length);
        if (correct >= Math.ceil(lesson.quiz.length * 0.6)) completeLesson(lesson.id);
        setQuizAnswers(newAnswers);
        setQuizDone(true);
      } else {
        setQuizAnswers(newAnswers);
        setQuizIdx((i) => i + 1);
        setQuizSelected(null);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setQuizIdx(0);
    setQuizSelected(null);
    setQuizAnswers([]);
    setQuizDone(false);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-5">
        {/* Header */}
        <div>
          <button onClick={() => navigate(`/study/hsk/${course.level}`)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> HSK {course.level} · Tuần {week.week}
          </button>
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-primary-foreground text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: course.color }}>
              HSK {course.level}
            </span>
            {done && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-success/15 text-success flex items-center gap-1">
                <CheckCircle2 size={11} /> Hoàn thành
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-foreground mt-2">{lesson.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{lesson.desc}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted/50 p-1 rounded-xl overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 min-w-[80px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${tab === t.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {tab === "vocab" && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">Nhấn để lật thẻ · 🔊 nghe phát âm</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {lesson.vocab.map((w, i) => {
                    const flipped = flippedVocab.has(i);
                    return (
                      <button
                        key={i}
                        onClick={() => toggleFlip(i)}
                        className="bg-card rounded-2xl border border-border p-4 text-left hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/40 transition-all duration-300 group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-2xl font-bold text-foreground">{w.hanzi}</p>
                            <p className="text-xs text-primary mt-1">{w.pinyin}</p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); speak(w.hanzi); }}
                            className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                        <AnimatePresence>
                          {flipped && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-sm text-muted-foreground mt-2 pt-2 border-t border-border"
                            >
                              {w.meaning}
                            </motion.p>
                          )}
                        </AnimatePresence>
                        {!flipped && <p className="text-[11px] text-muted-foreground/70 mt-2">Nhấn để xem nghĩa</p>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {tab === "grammar" && (
              <div className="space-y-4">
                {lesson.grammar.map((g, i) => (
                  <div key={i} className="bg-card rounded-2xl border border-border p-4">
                    <h3 className="text-sm font-bold text-foreground">{g.title}</h3>
                    <div className="mt-2 inline-block px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-mono">{g.pattern}</div>
                    <p className="text-sm text-muted-foreground mt-3">{g.explanation}</p>
                    <div className="mt-3 space-y-2">
                      {g.examples.map((ex, ei) => (
                        <div key={ei} className="bg-muted/40 rounded-xl p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-base font-semibold text-foreground">{ex.cn}</p>
                              <p className="text-xs text-primary mt-0.5">{ex.pinyin}</p>
                              <p className="text-xs text-muted-foreground mt-1">→ {ex.vi}</p>
                            </div>
                            <button onClick={() => speak(ex.cn)} className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                              <Volume2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "dialogue" && (
              <div className="bg-card rounded-2xl border border-border p-4">
                <p className="text-xs text-muted-foreground mb-3">💬 Tình huống: {lesson.dialogue.topic}</p>
                <div className="space-y-3">
                  {lesson.dialogue.lines.map((line, i) => (
                    <div key={i} className={`flex gap-2 ${line.speaker === "B" ? "flex-row-reverse" : ""}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${line.speaker === "A" ? "bg-primary/15 text-primary" : "bg-warning/15 text-warning"}`}>
                        {line.speaker}
                      </div>
                      <div className={`flex-1 max-w-[80%] rounded-2xl p-3 ${line.speaker === "A" ? "bg-muted/50" : "bg-primary/10"}`}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground">{line.cn}</p>
                            <p className="text-[11px] text-primary mt-0.5">{line.pinyin}</p>
                            <p className="text-xs text-muted-foreground mt-1">{line.vi}</p>
                          </div>
                          <button onClick={() => speak(line.cn)} className="w-6 h-6 rounded-full bg-card text-primary flex items-center justify-center flex-shrink-0">
                            <Volume2 size={10} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "quiz" && (
              <div>
                {!quizDone ? (
                  <div className="bg-card rounded-2xl border border-border p-5">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Câu {quizIdx + 1}/{lesson.quiz.length}</span>
                      {bestScore && <span className="flex items-center gap-1 text-warning"><Trophy size={11} /> Best: {bestScore.score}/{bestScore.total}</span>}
                    </div>
                    <div className="h-1.5 rounded-full bg-muted mt-2 overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-300" style={{ width: `${((quizIdx + 1) / lesson.quiz.length) * 100}%` }} />
                    </div>
                    <h3 className="text-base font-bold text-foreground mt-4">{lesson.quiz[quizIdx].question}</h3>
                    <div className="space-y-2 mt-3">
                      {lesson.quiz[quizIdx].options.map((opt, i) => {
                        const isCorrect = i === lesson.quiz[quizIdx].answer;
                        const isSelected = quizSelected === i;
                        const showResult = quizSelected !== null;
                        return (
                          <button
                            key={i}
                            onClick={() => handleQuizAnswer(i)}
                            disabled={showResult}
                            className={`w-full text-left p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                              showResult
                                ? isCorrect
                                  ? "border-success bg-success/10 text-success"
                                  : isSelected
                                    ? "border-destructive bg-destructive/10 text-destructive"
                                    : "border-border bg-card text-muted-foreground"
                                : "border-border bg-card hover:border-primary hover:bg-primary/5 text-foreground"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (() => {
                  const correct = quizAnswers.filter((a, i) => a === lesson.quiz[i].answer).length;
                  const passed = correct >= Math.ceil(lesson.quiz.length * 0.6);
                  return (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-card rounded-2xl border border-border p-6 text-center"
                    >
                      <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${passed ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                        {passed ? <CheckCircle2 size={32} /> : <RotateCcw size={32} />}
                      </div>
                      <h3 className="text-xl font-bold text-foreground mt-3">{passed ? "Bài đã hoàn thành!" : "Cần ôn thêm"}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Bạn trả lời đúng {correct}/{lesson.quiz.length}</p>
                      <div className="flex gap-2 mt-5">
                        <button onClick={resetQuiz} className="flex-1 py-2.5 rounded-xl border border-border font-semibold text-sm hover:bg-muted transition-colors">
                          Làm lại
                        </button>
                        <button onClick={() => navigate(`/study/hsk/${course.level}`)} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                          {passed ? "Bài tiếp →" : "Quay lại"}
                        </button>
                      </div>
                    </motion.div>
                  );
                })()}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Manual mark complete (vocab/grammar/dialogue tabs) */}
        {tab !== "quiz" && !done && (
          <button
            onClick={() => completeLesson(lesson.id)}
            className="w-full py-3 rounded-xl border-2 border-dashed border-primary/40 text-primary font-semibold text-sm hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={16} /> Đánh dấu đã học xong phần này
          </button>
        )}
      </div>
    </div>
  );
};

export default HskLesson;
