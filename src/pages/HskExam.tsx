import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Headphones, BookOpen, PenTool, Play, ChevronRight, Check, X, Globe, Mic } from "lucide-react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { hskExamSections } from "@/data/mockData";
import ProgressBar from "@/components/shared/ProgressBar";

type ExamPhase = "setup" | "listening" | "reading" | "writing" | "translation" | "speaking" | "results";

const HskExam = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<ExamPhase>("setup");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timer] = useState(30 * 60); // 30 min
  const [writingAnswers, setWritingAnswers] = useState<string[]>([]);
  const [writingInput, setWritingInput] = useState<number[][]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const totalQuestions = hskExamSections.listening.length +
    hskExamSections.reading.reduce((a, r) => a + r.questions.length, 0) +
    hskExamSections.writing.length + hskExamSections.translation.length + hskExamSections.speaking.length;

  const getScore = () => {
    let correct = 0;
    let total = 0;
    // Listening
    hskExamSections.listening.forEach((q) => {
      total++;
      if (answers[`l-${q.id}`] === q.correct) correct++;
    });
    // Reading
    hskExamSections.reading.forEach((r) => {
      r.questions.forEach((q, qi) => {
        total++;
        if (answers[`r-${r.id}-${qi}`] === q.correct) correct++;
      });
    });
    // Writing
    hskExamSections.writing.forEach((w, wi) => {
      total++;
      if (writingAnswers[wi] === w.correct) correct++;
    });
    // Translation
    hskExamSections.translation.forEach((t) => {
      total++;
      if (answers[`t-${t.id}`] === t.correct) correct++;
    });
    // Speaking
    hskExamSections.speaking.forEach((s) => {
      total++;
      if (answers[`s-${s.id}`] !== undefined) correct++;
    });
    return { correct, total };
  };

  const handleAnswer = (key: string, answer: number, correctAnswer: number) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    setAnswers((prev) => ({ ...prev, [key]: answer }));
    setTimeout(() => {
      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-5">
        {/* Setup */}
        {phase === "setup" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate("/learn")} className="min-w-[44px] min-h-[44px] rounded-xl hover:bg-muted flex items-center justify-center transition-all duration-300 active:scale-95">
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Thi thử HSK 🎯</h1>
                <p className="text-sm text-muted-foreground">Đề thi theo format HSK chuẩn</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 text-primary-foreground shadow-glow">
              <p className="text-sm opacity-80">HSK Level 1-2</p>
              <p className="text-2xl font-bold mt-1">Bài thi thử</p>
              <div className="flex gap-4 mt-4 text-sm opacity-80">
                <span className="flex items-center gap-1"><Clock size={14} /> 30 phút</span>
                <span className="flex items-center gap-1"><BookOpen size={14} /> {totalQuestions} câu</span>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: Headphones, label: "Nghe hiểu (听力)", count: hskExamSections.listening.length, desc: "Nghe audio → chọn đáp án" },
                { icon: BookOpen, label: "Đọc hiểu (阅读)", count: hskExamSections.reading.reduce((a, r) => a + r.questions.length, 0), desc: "Đọc đoạn văn → trả lời" },
                { icon: PenTool, label: "Viết (书写)", count: hskExamSections.writing.length, desc: "Sắp xếp từ thành câu" },
                { icon: Globe, label: "Dịch thuật (翻译)", count: hskExamSections.translation.length, desc: "Dịch từ vựng/câu" },
                { icon: Mic, label: "Nói (口语)", count: hskExamSections.speaking.length, desc: "Kiểm tra phát âm" },
              ].map((section, i) => (
                <motion.div
                  key={section.label}
                  className="bg-card rounded-2xl border border-border p-4 flex items-center gap-4 shadow-soft"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <section.icon size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{section.label}</p>
                    <p className="text-xs text-muted-foreground">{section.desc} · {section.count} câu</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => { setPhase("listening"); setCurrentQ(0); }}
              className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-glow hover:opacity-90 active:scale-[0.98] transition-all duration-300"
            >
              <Play size={18} /> Bắt đầu thi
            </button>
          </motion.div>
        )}

        {/* Listening Section */}
        {phase === "listening" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">🎧 Nghe hiểu</span>
              <div className="flex-1"><ProgressBar value={currentQ + 1} max={hskExamSections.listening.length} /></div>
              <span className="text-xs text-muted-foreground">{currentQ + 1}/{hskExamSections.listening.length}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={currentQ} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
                <div className="bg-card rounded-2xl border border-border p-6 text-center shadow-soft">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Headphones size={28} className="text-primary" />
                  </div>
                  <p className="font-hanzi text-lg text-foreground">{hskExamSections.listening[currentQ].audioText}</p>
                  <p className="text-xs text-muted-foreground mt-1">{hskExamSections.listening[currentQ].audio}</p>
                  <button className="mt-3 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                    🔊 Nghe lại
                  </button>
                </div>

                <p className="text-sm font-semibold text-foreground">{hskExamSections.listening[currentQ].question}</p>

                <div className="space-y-2">
                  {hskExamSections.listening[currentQ].options.map((opt, i) => {
                    const key = `l-${hskExamSections.listening[currentQ].id}`;
                    const isSelected = answers[key] === i;
                    const isCorrect = hskExamSections.listening[currentQ].correct === i;
                    const showState = isSelected && showFeedback;
                    return (
                      <motion.button
                        key={i}
                        onClick={() => {
                          if (!answers[key] && answers[key] !== 0) {
                            handleAnswer(key, i, hskExamSections.listening[currentQ].correct);
                            setTimeout(() => {
                              if (currentQ < hskExamSections.listening.length - 1) setCurrentQ(currentQ + 1);
                              else setPhase("reading");
                              setCurrentQ((prev) => currentQ < hskExamSections.listening.length - 1 ? prev + 1 : 0);
                            }, 400);
                          }
                        }}
                        className={`w-full p-4 rounded-2xl border text-left text-sm transition-all duration-300 active:scale-[0.98] ${
                          showState && isCorrect ? "bg-success/10 border-success text-success" :
                          showState && !isCorrect ? "bg-destructive/10 border-destructive text-destructive" :
                          "bg-card border-border text-foreground hover:border-primary/30 hover:shadow-soft"
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + i)}. {opt}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Reading Section */}
        {phase === "reading" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">📖 Đọc hiểu</span>
            </div>

            {hskExamSections.reading.map((passage) => (
              <div key={passage.id} className="space-y-4">
                <div className="bg-card rounded-2xl border border-border p-5 shadow-soft">
                  <p className="font-hanzi text-sm text-foreground leading-relaxed">{passage.passage}</p>
                </div>
                {passage.questions.map((q, qi) => {
                  const key = `r-${passage.id}-${qi}`;
                  return (
                    <div key={qi} className="space-y-2">
                      <p className="text-sm font-semibold font-hanzi text-foreground">{q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((opt, i) => {
                          const isSelected = answers[key] === i;
                          return (
                            <motion.button
                              key={i}
                              onClick={() => {
                                if (answers[key] === undefined) handleAnswer(key, i, q.correct);
                              }}
                              className={`w-full p-3 rounded-xl border text-left text-sm transition-all duration-300 active:scale-[0.98] ${
                                isSelected && i === q.correct ? "bg-success/10 border-success" :
                                isSelected ? "bg-destructive/10 border-destructive" :
                                "bg-card border-border hover:border-primary/30"
                              }`}
                              whileHover={{ x: 4 }}
                            >
                              {String.fromCharCode(65 + i)}. {opt}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            <button
              onClick={() => { setPhase("writing"); setCurrentQ(0); setWritingInput(hskExamSections.writing.map(() => [])); }}
              className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-300"
            >
              Tiếp: Phần Viết <ChevronRight size={16} className="inline" />
            </button>
          </motion.div>
        )}

        {/* Writing Section */}
        {phase === "writing" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">✍️ Viết</span>
            </div>

            {hskExamSections.writing.map((w, wi) => (
              <div key={w.id} className="bg-card rounded-3xl border border-border p-5 shadow-soft space-y-5">
                <div>
                  <p className="text-base font-bold text-foreground">✍️ {w.instruction}</p>
                  <p className="text-sm text-muted-foreground mt-1">{w.translation}</p>
                </div>

                {/* Available Words Pool */}
                {/* Available Words Pool */}
                <div className="flex flex-wrap gap-2 min-h-[60px] p-1">
                  {w.words.map((word, idx) => {
                    if ((writingInput?.[wi] || []).includes(idx)) return null;
                    return (
                      <motion.button
                        layoutId={`exam-word-${wi}-${idx}`}
                        key={`avail-${wi}-${idx}`}
                        drag
                        dragSnapToOrigin
                        whileDrag={{ zIndex: 50, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        onDragEnd={(e, info) => {
                          if (info.offset.y > 20) {
                            const n = [...writingInput];
                            n[wi] = [...(n[wi] || []), idx];
                            setWritingInput(n);
                          }
                        }}
                        onClick={() => {
                          const n = [...writingInput];
                          n[wi] = [...(n[wi] || []), idx];
                          setWritingInput(n);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-card border-2 border-border text-foreground font-hanzi text-lg font-medium shadow-sm hover:border-primary/40 hover:-translate-y-1 hover:shadow-soft active:scale-95 transition-colors cursor-grab active:cursor-grabbing select-none"
                      >
                        {word}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Answer Pool */}
                <Reorder.Group 
                  axis="x"
                  values={(writingInput?.[wi] || [])}
                  onReorder={(newOrder) => {
                    const n = [...writingInput];
                    n[wi] = newOrder;
                    setWritingInput(n);
                  }}
                  className="min-h-[72px] p-3 rounded-2xl border-2 border-dashed border-border bg-muted/30 flex flex-wrap gap-2 items-center"
                >
                  {(writingInput?.[wi]?.length || 0) === 0 && (
                    <span className="text-muted-foreground text-sm px-2 animate-pulse absolute">
                      Nhấn hoặc kéo thả các từ bên trên xuống đây...
                    </span>
                  )}
                  {(writingInput?.[wi] || []).map((idx) => (
                    <Reorder.Item
                      value={idx}
                      key={`ans-${wi}-${idx}`}
                      onDragStart={() => setIsDragging(true)}
                      onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
                      className="cursor-grab active:cursor-grabbing select-none"
                    >
                      <motion.div
                        layoutId={`exam-word-${wi}-${idx}`}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-hanzi text-lg font-medium shadow-soft active:scale-95 transition-colors"
                        onClick={() => {
                          if (!isDragging) {
                            const n = [...writingInput];
                            n[wi] = n[wi].filter((i) => i !== idx);
                            setWritingInput(n);
                          }
                        }}
                      >
                        {w.words[idx]}
                      </motion.div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </div>
            ))}

            <button
              onClick={() => {
                const finalAnswers = writingInput.map((arr, idx) => arr.map(i => hskExamSections.writing[idx].words[i]).join(""));
                setWritingAnswers(finalAnswers); 
                setPhase("translation"); setCurrentQ(0);
              }}
              className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 shadow-soft"
            >
              Nộp bài (Chuyển sang Dịch Thuật)
            </button>
          </motion.div>
        )}

        {/* Translation Section */}
        {phase === "translation" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">🌐 Dịch thuật</span>
              <div className="flex-1"><ProgressBar value={currentQ + 1} max={hskExamSections.translation.length} /></div>
              <span className="text-xs text-muted-foreground">{currentQ + 1}/{hskExamSections.translation.length}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={currentQ} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
                <div className="bg-card rounded-2xl border border-border p-6 text-center shadow-soft">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Globe size={28} className="text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{hskExamSections.translation[currentQ].question}</p>
                  <p className="font-semibold text-lg text-primary mt-2">"{hskExamSections.translation[currentQ].source}"</p>
                </div>

                <div className="space-y-2">
                  {hskExamSections.translation[currentQ].options.map((opt, i) => {
                    const key = `t-${hskExamSections.translation[currentQ].id}`;
                    const isSelected = answers[key] === i;
                    const isCorrect = hskExamSections.translation[currentQ].correct === i;
                    const showState = isSelected && showFeedback;
                    return (
                      <motion.button
                        key={i}
                        onClick={() => {
                          if (!answers[key] && answers[key] !== 0) {
                            handleAnswer(key, i, hskExamSections.translation[currentQ].correct);
                            setTimeout(() => {
                              if (currentQ < hskExamSections.translation.length - 1) setCurrentQ(currentQ + 1);
                              else { setPhase("speaking"); setCurrentQ(0); }
                            }, 400);
                          }
                        }}
                        className={`w-full p-4 rounded-2xl border text-left text-sm transition-all duration-300 active:scale-[0.98] ${
                          showState && isCorrect ? "bg-success/10 border-success text-success" :
                          showState && !isCorrect ? "bg-destructive/10 border-destructive text-destructive" :
                          "bg-card border-border text-foreground hover:border-primary/30 hover:shadow-soft"
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + i)}. {opt}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Speaking Section */}
        {phase === "speaking" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">🗣️ Nói</span>
              <div className="flex-1"><ProgressBar value={currentQ + 1} max={hskExamSections.speaking.length} /></div>
              <span className="text-xs text-muted-foreground">{currentQ + 1}/{hskExamSections.speaking.length}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={currentQ} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
                <div className="bg-card rounded-2xl border border-border p-6 text-center shadow-soft">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Mic size={28} className="text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground mb-4">{hskExamSections.speaking[currentQ].prompt}</p>
                  <p className="font-hanzi text-2xl text-primary">{hskExamSections.speaking[currentQ].text}</p>
                  <p className="text-xs text-muted-foreground mt-2">{hskExamSections.speaking[currentQ].pinyin}</p>
                  
                  <div className="flex justify-center mt-8">
                    <button 
                       onClick={() => {
                           const key = `s-${hskExamSections.speaking[currentQ].id}`;
                           setAnswers((prev) => ({ ...prev, [key]: 1 }));
                           if (currentQ < hskExamSections.speaking.length - 1) setCurrentQ(currentQ + 1);
                           else setPhase("results");
                       }}
                       className="w-20 h-20 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 shadow-soft hover:shadow-soft-lg active:scale-95">
                      <Mic size={32} />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">Nhấn nút Micro để giả lập thu âm và qua câu</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Results */}
        {phase === "results" && (() => {
          const { correct, total } = getScore();
          const pct = Math.round((correct / total) * 100);
          return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 text-center">
              <div className="animate-bounce-in">
                <p className="text-6xl">{pct >= 80 ? "🎉" : pct >= 50 ? "👍" : "💪"}</p>
                <h1 className="text-3xl font-bold text-foreground mt-4">{correct}/{total}</h1>
                <p className="text-lg text-muted-foreground">{pct}% — {pct >= 60 ? "Đạt bài thi!" : "Cần cố gắng thêm"}</p>
              </div>

              {/* Bảng Đánh Giá Năng Lực */}
              <div className="bg-primary/5 rounded-2xl p-5 border border-primary/20 shadow-sm text-left">
                <h3 className="font-bold text-primary text-sm uppercase tracking-wider mb-2">Đánh giá trình độ</h3>
                {pct >= 90 ? (
                  <p className="text-foreground text-sm leading-relaxed">
                    🌟 <strong>Tuyệt vời!</strong> Nền tảng HSK 1 của bạn rất vững chắc. Bạn hoàn toàn đủ tự tin để bắt đầu học khối lượng kiến thức của <strong>HSK 2</strong>.
                  </p>
                ) : pct >= 60 ? (
                  <p className="text-foreground text-sm leading-relaxed">
                    ✅ <strong>Khá Tốt!</strong> Bạn đã nắm được cơ bản HSK 1. Tuy nhiên, vẫn nên ôn tập lại phần từ vựng bị sai để củng cố trước khi sang bài mới nhé.
                  </p>
                ) : pct >= 30 ? (
                  <p className="text-foreground text-sm leading-relaxed">
                    ⚠️ <strong>Cần Nỗ Lực!</strong> Bạn mới chỉ quen với một phần tiếng Trung cơ bản. Lộ trình khuyên dùng là ôn lại từ đầu <strong>giáo trình HSK 1</strong>.
                  </p>
                ) : (
                  <p className="text-foreground text-sm leading-relaxed">
                    🌱 <strong>Người Mới Bắt Đầu!</strong> Khuyên bạn nên bắt đầu từ khoá học <strong>Phát âm Pinyin</strong> và <strong>Nhận diện mặt chữ (Bộ thủ)</strong> trước khi ghép câu.
                  </p>
                )}
              </div>

              <div className="flex gap-3 justify-center">
                <div className="bg-card rounded-2xl border border-border px-5 py-3 shadow-soft">
                  <p className="text-xs text-muted-foreground">Nghe</p>
                  <p className="text-lg font-bold text-foreground">
                    {hskExamSections.listening.filter((q) => answers[`l-${q.id}`] === q.correct).length}/{hskExamSections.listening.length}
                  </p>
                </div>
                <div className="bg-card rounded-2xl border border-border px-5 py-3 shadow-soft">
                  <p className="text-xs text-muted-foreground">Đọc</p>
                  <p className="text-lg font-bold text-foreground">
                    {hskExamSections.reading.reduce((a, r) => a + r.questions.filter((q, qi) => answers[`r-${r.id}-${qi}`] === q.correct).length, 0)}/
                    {hskExamSections.reading.reduce((a, r) => a + r.questions.length, 0)}
                  </p>
                </div>
                <div className="bg-card rounded-2xl border border-border px-5 py-3 shadow-soft">
                  <p className="text-xs text-muted-foreground">Viết</p>
                  <p className="text-lg font-bold text-foreground">
                    {hskExamSections.writing.filter((w, i) => writingAnswers[i] === w.correct).length}/{hskExamSections.writing.length}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button onClick={() => { setPhase("setup"); setAnswers({}); setWritingAnswers([]); }} className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-300">
                  Thi lại
                </button>
                <button onClick={() => navigate("/learn")} className="w-full py-3 rounded-2xl border border-border text-foreground font-medium hover:bg-muted active:scale-[0.98] transition-all duration-300">
                  Về trang học
                </button>
              </div>
            </motion.div>
          );
        })()}
      </div>
    </div>
  );
};

export default HskExam;
