import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, Wand2, Music, BookOpen, Puzzle, CheckCircle2, XCircle, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { pinyinInitials, pinyinTones, pinyinFinals } from "@/data/mockData";
import { useBeginnerProgress } from "@/hooks/useBeginnerProgress";

/* ——— helpers ——— */
const getMarkedPinyin = (initial: string, final: string, tone: number) => {
  const vMap: Record<string, string[]> = {
    a: ["a", "ā", "á", "ǎ", "à", "a"],
    o: ["o", "ō", "ó", "ǒ", "ò", "o"],
    e: ["e", "ē", "é", "ě", "è", "e"],
    i: ["i", "ī", "í", "ǐ", "ì", "i"],
    u: ["u", "ū", "ú", "ǔ", "ù", "u"],
    ü: ["ü", "ǖ", "ǘ", "ǚ", "ǜ", "ü"],
  };
  let res = initial + final;
  let target = "";
  if (final.includes("a")) target = "a";
  else if (final.includes("o")) target = "o";
  else if (final.includes("e")) target = "e";
  else if (final.includes("iu")) target = "u";
  else if (final.includes("ui")) target = "i";
  else if (final.includes("i")) target = "i";
  else if (final.includes("u")) target = "u";
  else if (final.includes("ü")) target = "ü";
  if (target && tone >= 1 && tone <= 4) {
    res = res.replace(target, vMap[target][tone]);
  }
  return res;
};

const toneContours: Record<number, string> = {
  1: "━━━━━", // flat high
  2: "╱",     // rising
  3: "╲╱",    // dip
  4: "╲",     // falling
};

/* ——— tab config ——— */
const tabs = [
  { key: "tones" as const, label: "Thanh điệu", icon: Music },
  { key: "initials" as const, label: "Phụ âm", icon: BookOpen },
  { key: "finals" as const, label: "Vận mẫu", icon: BookOpen },
  { key: "combiner" as const, label: "Ghép vần", icon: Puzzle },
];

/* ——— mini quiz data ——— */
const toneQuizzes = [
  { pinyin: "mā", meaning: "mẹ", tone: 1 },
  { pinyin: "má", meaning: "tê", tone: 2 },
  { pinyin: "mǎ", meaning: "ngựa", tone: 3 },
  { pinyin: "mà", meaning: "mắng", tone: 4 },
];

type TabKey = "tones" | "initials" | "finals" | "combiner";

const PinyinLearn = () => {
  const navigate = useNavigate();
  const { completeStep } = useBeginnerProgress();
  const [activeTab, setActiveTab] = useState<TabKey>("tones");
  const [selectedTone, setSelectedTone] = useState<number | null>(null);
  const [selectedInitial, setSelectedInitial] = useState<string | null>(null);

  // Progress tracking: which items user has tapped/listened to
  const [listenedTones, setListenedTones] = useState<Set<number>>(new Set());
  const [listenedInitials, setListenedInitials] = useState<Set<string>>(new Set());
  const [listenedFinals, setListenedFinals] = useState<Set<string>>(new Set());

  // Mini quiz state
  const [quizActive, setQuizActive] = useState(false);
  const [quizQ, setQuizQ] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizCorrect, setQuizCorrect] = useState<boolean | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  // Combiner
  const [combI, setCombI] = useState("b");
  const [combF, setCombF] = useState("a");
  const [combT, setCombT] = useState(1);

  const handleToneTap = useCallback((tone: number) => {
    setSelectedTone(selectedTone === tone ? null : tone);
    setListenedTones((prev) => new Set(prev).add(tone));
  }, [selectedTone]);

  const handleInitialTap = useCallback((letter: string) => {
    setSelectedInitial(selectedInitial === letter ? null : letter);
    setListenedInitials((prev) => new Set(prev).add(letter));
  }, [selectedInitial]);

  const handleFinalTap = useCallback((f: string) => {
    setListenedFinals((prev) => new Set(prev).add(f));
  }, []);

  const handleQuizAnswer = (tone: number) => {
    if (quizAnswer !== null) return;
    setQuizAnswer(tone);
    const correct = tone === toneQuizzes[quizQ].tone;
    setQuizCorrect(correct);
    if (correct) setQuizScore((s) => s + 1);
    setTimeout(() => {
      if (quizQ < toneQuizzes.length - 1) {
        setQuizQ((q) => q + 1);
        setQuizAnswer(null);
        setQuizCorrect(null);
      }
    }, 1200);
  };

  // Progress for current tab
  const getProgress = () => {
    switch (activeTab) {
      case "tones": return { done: listenedTones.size, total: pinyinTones.length };
      case "initials": return { done: listenedInitials.size, total: pinyinInitials.length };
      case "finals": {
        const totalFinals = pinyinFinals.reduce((s, g) => s + g.finals.length, 0);
        return { done: listenedFinals.size, total: totalFinals };
      }
      default: return null;
    }
  };

  const progress = getProgress();

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <button onClick={() => navigate("/learn")} className="min-w-[44px] min-h-[44px] rounded-xl hover:bg-muted flex items-center justify-center transition-all duration-300 active:scale-95">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Học Pinyin 拼音</h1>
            <p className="text-sm text-muted-foreground">Nền tảng phát âm tiếng Trung</p>
          </div>
        </motion.div>

        {/* Tabs — consistent icons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex gap-1.5 p-1 bg-muted rounded-2xl flex-wrap"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 min-w-[75px] py-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-card text-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Progress bar for content tabs */}

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* ——— TONES ——— */}
          {activeTab === "tones" && (
            <motion.div key="tones" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
              <p className="text-sm text-muted-foreground">Tiếng Trung có 4 thanh chính + 1 thanh nhẹ. Nhấn để xem chi tiết & nghe phát âm.</p>

              {pinyinTones.map((tone) => (
                <button
                  key={tone.tone}
                  onClick={() => handleToneTap(tone.tone)}
                  className="w-full bg-card rounded-2xl border border-border p-4 text-left shadow-soft hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center w-14">
                        <span className={`text-3xl font-bold ${tone.color}`}>{tone.symbol}</span>
                        {/* Tone contour visualization */}
                        <span className="text-xs text-muted-foreground font-mono mt-0.5 tracking-widest">
                          {toneContours[tone.tone] || "·"}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{tone.name}</p>
                        <p className="text-xs text-muted-foreground">{tone.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Volume2 size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedTone === tone.tone && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-sm font-hanzi text-foreground">{tone.example}</p>
                          <div className="mt-2 flex gap-2">
                            <button className="px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all">🔊 Nghe phát âm</button>
                            <button className="px-3 py-1.5 rounded-xl bg-muted text-muted-foreground text-xs font-medium hover:bg-accent hover:scale-105 active:scale-95 transition-all">🎤 Luyện nói</button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              ))}

              {/* Mini Quiz CTA */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                {!quizActive ? (
                  <button
                    onClick={() => { setQuizActive(true); setQuizQ(0); setQuizScore(0); setQuizAnswer(null); setQuizCorrect(null); }}
                    className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] transition-all duration-300"
                  >
                    🧪 Kiểm tra nhanh: Nhận diện thanh điệu
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <div className="bg-card rounded-2xl border border-primary/20 p-5 shadow-soft space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-bold text-muted-foreground uppercase">Câu {quizQ + 1}/{toneQuizzes.length}</p>
                      <p className="text-xs font-bold text-primary">Điểm: {quizScore}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-foreground font-hanzi">{toneQuizzes[quizQ].pinyin}</p>
                      <p className="text-sm text-muted-foreground mt-1">Đây là thanh mấy?</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((t) => (
                        <button
                          key={t}
                          onClick={() => handleQuizAnswer(t)}
                          disabled={quizAnswer !== null}
                          className={`py-3 rounded-xl font-bold text-lg transition-all duration-300 active:scale-95 ${
                            quizAnswer === t
                              ? quizCorrect ? "bg-success text-success-foreground scale-105" : "bg-destructive text-destructive-foreground"
                              : quizAnswer !== null && t === toneQuizzes[quizQ].tone
                                ? "bg-success/20 text-success ring-2 ring-success"
                                : "bg-muted text-foreground hover:bg-primary/10 hover:text-primary"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    {quizAnswer !== null && quizQ === toneQuizzes.length - 1 && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-2">
                        <p className="text-sm font-bold text-foreground">Kết quả: {quizScore}/{toneQuizzes.length} 🎉</p>
                        <button onClick={() => setQuizActive(false)} className="mt-2 text-xs text-primary font-medium hover:underline">Đóng</button>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* ——— INITIALS ——— */}
          {activeTab === "initials" && (
            <motion.div key="initials" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
              <p className="text-sm text-muted-foreground">21 phụ âm đầu. Nhấn để nghe và xem ví dụ.</p>
              <div className="grid grid-cols-3 gap-2">
                {pinyinInitials.map((item) => (
                  <button
                    key={item.letter}
                    onClick={() => handleInitialTap(item.letter)}
                    className={`bg-card rounded-2xl border border-border p-3 text-center shadow-soft hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 relative ${
                      selectedInitial === item.letter ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <p className="text-xl font-bold text-foreground">{item.letter}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 font-hanzi">{item.example}</p>
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {selectedInitial && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-card rounded-2xl border border-primary/30 p-5 shadow-soft-lg">
                    {(() => {
                      const item = pinyinInitials.find((p) => p.letter === selectedInitial);
                      if (!item) return null;
                      return (
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-4xl font-bold text-primary">{item.letter}</p>
                            <p className="text-sm font-hanzi text-foreground mt-1">{item.example}</p>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">{item.pinyin}</p>
                            <p className="text-sm font-medium text-foreground">{item.meaning}</p>
                            <button className="mt-2 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all">
                              <Volume2 size={14} /> Nghe
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ——— FINALS ——— */}
          {activeTab === "finals" && (
            <motion.div key="finals" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">
              <p className="text-sm text-muted-foreground">36 vận mẫu chia thành nhóm. Nhấn để đánh dấu đã học.</p>
              {pinyinFinals.map((group) => (
                <div key={group.group} className="bg-card rounded-2xl border border-border p-4 shadow-soft">
                  <p className="font-bold text-foreground mb-3">{group.group}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {group.finals.map((f) => (
                      <button
                        key={f}
                        onClick={() => handleFinalTap(f)}
                        className="rounded-xl py-3 text-center text-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 relative bg-muted text-foreground hover:bg-primary/10 hover:text-primary"
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* ——— COMBINER ——— */}
          {activeTab === "combiner" && (
            <motion.div key="combiner" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} className="space-y-6">
              <p className="text-sm text-muted-foreground text-center">Chọn phụ âm + vần + thanh để tạo pinyin hoàn chỉnh</p>

              {/* Result display */}
              <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 flex flex-col items-center justify-center relative shadow-inner overflow-hidden">
                <Wand2 className="absolute top-2 right-2 text-primary/20" size={80} />
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Thành Quả</p>
                <div className="text-6xl sm:text-7xl font-extrabold text-foreground tracking-tight">
                  {getMarkedPinyin(combI, combF, combT)}
                </div>
                <div className="flex gap-2 mt-6">
                  {[1, 2, 3, 4].map((t) => (
                    <button
                      key={t}
                      onClick={() => setCombT(t)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 active:scale-90 ${
                        combT === t ? "bg-primary text-primary-foreground shadow-md scale-110" : "bg-card text-muted-foreground border hover:bg-primary/10 hover:text-primary hover:scale-105"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <button className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform">
                  <Volume2 size={24} />
                </button>
              </div>

              {/* Selection grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card rounded-2xl border p-4 shadow-soft h-[300px] overflow-y-auto">
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-3 sticky top-0 bg-card pb-2">1. Phụ Âm</p>
                  <div className="grid grid-cols-3 gap-2">
                    {pinyinInitials.map((i) => (
                      <button
                        key={i.letter}
                        onClick={() => setCombI(i.letter)}
                        className={`py-2 rounded-xl font-bold transition-all duration-200 active:scale-90 ${
                          combI === i.letter ? "bg-primary text-primary-foreground shadow-soft scale-105" : "bg-muted text-foreground hover:bg-primary/20 hover:scale-105"
                        }`}
                      >
                        {i.letter}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-2xl border p-4 shadow-soft h-[300px] overflow-y-auto">
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-3 sticky top-0 bg-card pb-2">2. Vần</p>
                  <div className="flex flex-col gap-2">
                    {pinyinFinals.map((g) => (
                      <div key={g.group}>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          {g.finals.map((f) => (
                            <button
                              key={f}
                              onClick={() => setCombF(f)}
                              className={`py-2 rounded-xl font-bold transition-all duration-200 active:scale-90 ${
                                combF === f ? "bg-primary text-primary-foreground shadow-soft scale-105" : "bg-muted text-foreground hover:bg-primary/20 hover:scale-105"
                              }`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Complete step button */}
              <div className="text-center py-4">
                <button
                  onClick={() => { completeStep(0); navigate("/learn"); }}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300"
                >
                  <Sparkles size={18} /> Hoàn thành bước 1 <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PinyinLearn;
