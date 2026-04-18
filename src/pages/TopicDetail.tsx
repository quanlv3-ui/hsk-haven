import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Volume2, Bookmark, CheckCircle2, RotateCw, Trophy } from "lucide-react";
import { getTopicById, type TopicWord } from "@/data/topicsData";
import { useTopicProgress } from "@/hooks/useTopicProgress";
import { useBookmarks } from "@/hooks/useBookmarks";
import HSKBadge from "@/components/shared/HSKBadge";

type Mode = "browse" | "quiz" | "result";

const speak = (text: string) => {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN";
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
};

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

const TopicDetail = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const topic = getTopicById(topicId ?? "");
  const { getTopicStats, markLearned, setQuizScore } = useTopicProgress();
  const { isBookmarked, toggle: toggleBookmark } = useBookmarks();

  const [mode, setMode] = useState<Mode>("browse");
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setLocalQuizScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const quizQuestions = useMemo(() => {
    if (!topic) return [];
    const words = shuffle(topic.words);
    return words.map((w) => {
      const wrong = shuffle(topic.words.filter((x) => x.id !== w.id)).slice(0, 3);
      const options = shuffle([w, ...wrong]);
      return { word: w, options, correctIndex: options.findIndex((o) => o.id === w.id) };
    });
  }, [topic, mode === "quiz"]); // re-shuffle when entering quiz

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Không tìm thấy chủ đề</p>
          <button onClick={() => navigate("/learn/topics")} className="mt-3 text-primary font-semibold">Quay lại</button>
        </div>
      </div>
    );
  }

  const stats = getTopicStats(topic.id, topic.words.length);
  const allLearned = stats.learnedCount >= topic.words.length;

  const handleFlip = (w: TopicWord) => {
    setFlipped((p) => ({ ...p, [w.id]: !p[w.id] }));
    if (!flipped[w.id]) markLearned(topic.id, w.id);
  };

  const startQuiz = () => {
    setMode("quiz");
    setQuizIndex(0);
    setLocalQuizScore(0);
    setSelected(null);
  };

  const answerQuiz = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = idx === quizQuestions[quizIndex].correctIndex;
    if (isCorrect) setLocalQuizScore((s) => s + 1);
    setTimeout(() => {
      if (quizIndex + 1 >= quizQuestions.length) {
        const finalScore = Math.round(((quizScore + (isCorrect ? 1 : 0)) / quizQuestions.length) * 100);
        setQuizScore(topic.id, finalScore);
        setMode("result");
      } else {
        setQuizIndex((i) => i + 1);
        setSelected(null);
      }
    }, 900);
  };

  // ====== RESULT VIEW ======
  if (mode === "result") {
    const finalPercent = Math.round((quizScore / quizQuestions.length) * 100);
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card border border-border rounded-3xl p-8 max-w-md w-full text-center shadow-xl"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-4">
            <Trophy size={40} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            {finalPercent >= 80 ? "Tuyệt vời!" : finalPercent >= 50 ? "Khá tốt!" : "Cần ôn thêm"} 🎉
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">Chủ đề: {topic.name}</p>
          <div className="my-6">
            <div className="text-5xl font-bold text-primary tabular-nums">{finalPercent}%</div>
            <p className="text-sm text-muted-foreground mt-1">{quizScore}/{quizQuestions.length} câu đúng</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={startQuiz}
              className="bg-muted text-foreground rounded-xl py-3 font-semibold hover:bg-accent active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <RotateCw size={16} /> Làm lại
            </button>
            <button
              onClick={() => setMode("browse")}
              className="bg-primary text-primary-foreground rounded-xl py-3 font-semibold hover:opacity-90 active:scale-95 transition-all duration-300"
            >
              Xong
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ====== QUIZ VIEW ======
  if (mode === "quiz") {
    const q = quizQuestions[quizIndex];
    return (
      <div className="min-h-screen pb-20 md:pb-8">
        <div className="container max-w-2xl py-6 space-y-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMode("browse")}
              className="min-w-[40px] min-h-[40px] rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Quiz · {topic.name}</p>
              <p className="text-sm font-semibold">{quizIndex + 1}/{quizQuestions.length}</p>
            </div>
          </div>

          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <motion.div
            key={quizIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-card border border-border rounded-3xl p-8 text-center shadow-soft"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Nghĩa của từ</p>
            <p className="hanzi-large text-foreground mt-2">{q.word.hanzi}</p>
            <p className="text-muted-foreground mt-1">{q.word.pinyin}</p>
            <button
              onClick={() => speak(q.word.hanzi)}
              className="mt-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-accent transition-colors"
            >
              <Volume2 size={18} />
            </button>
          </motion.div>

          <div className="grid grid-cols-2 gap-2">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correctIndex;
              const isSelected = selected === i;
              const showState = selected !== null;
              return (
                <button
                  key={opt.id}
                  onClick={() => answerQuiz(i)}
                  disabled={selected !== null}
                  className={`min-h-[64px] rounded-2xl border p-3 text-left transition-all duration-300 disabled:cursor-not-allowed
                    ${showState && isCorrect ? "bg-success/15 border-success text-success-foreground" : ""}
                    ${showState && isSelected && !isCorrect ? "bg-destructive/15 border-destructive" : ""}
                    ${!showState ? "bg-card border-border hover:border-primary hover:-translate-y-1 hover:shadow-md active:scale-[0.98]" : ""}
                  `}
                >
                  <p className="text-sm font-semibold text-foreground">{opt.meaning}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{opt.emoji}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ====== BROWSE VIEW ======
  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <button
            onClick={() => navigate("/learn/topics")}
            className="min-w-[40px] min-h-[40px] rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{topic.emoji}</span>
              <h1 className="text-2xl font-bold text-foreground">{topic.name}</h1>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{topic.desc} · {topic.words.length} từ</p>
          </div>
        </motion.div>

        {/* Progress + Quiz CTA */}
        <div className={`${topic.color} rounded-2xl border border-border p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Tiến độ học</p>
            <span className="text-xs font-semibold text-primary tabular-nums">{stats.learnedCount}/{topic.words.length} từ</span>
          </div>
          <div className="h-2 rounded-full bg-background/60 overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${stats.percent}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <button
            onClick={startQuiz}
            disabled={!allLearned}
            className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Trophy size={16} />
            {allLearned ? "Làm Quiz cuối chủ đề" : `Học hết ${topic.words.length} từ để mở Quiz`}
            {stats.quizScore !== undefined && allLearned && (
              <span className="text-xs opacity-80">· Best: {stats.quizScore}%</span>
            )}
          </button>
        </div>

        {/* Word list */}
        <div className="space-y-2">
          <AnimatePresence>
            {topic.words.map((w, i) => {
              const isFlipped = flipped[w.id];
              const learned = stats.learnedIds.includes(w.id);
              const bookmarked = isBookmarked(w.id);
              return (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="bg-card border border-border rounded-2xl p-4 hover:shadow-md hover:border-primary/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleFlip(w)}
                      className="text-3xl hover:scale-110 active:scale-95 transition-transform duration-300"
                      aria-label="Lật thẻ"
                    >
                      {w.emoji}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="hanzi-small text-foreground">{w.hanzi}</span>
                        <HSKBadge level={w.hskLevel} />
                        {learned && <CheckCircle2 size={14} className="text-success" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{w.pinyin}</p>
                      {isFlipped && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-sm text-foreground mt-1 font-medium"
                        >
                          {w.meaning}
                        </motion.p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => speak(w.hanzi)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                        aria-label="Phát âm"
                      >
                        <Volume2 size={16} className="text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => toggleBookmark(w.id)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                        aria-label="Đánh dấu"
                      >
                        <Bookmark
                          size={16}
                          className={bookmarked ? "text-primary fill-primary" : "text-muted-foreground"}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
