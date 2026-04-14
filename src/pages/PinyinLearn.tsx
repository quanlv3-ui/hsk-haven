import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { pinyinInitials, pinyinTones } from "@/data/mockData";

const PinyinLearn = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"tones" | "initials">("tones");
  const [selectedTone, setSelectedTone] = useState<number | null>(null);
  const [selectedInitial, setSelectedInitial] = useState<string | null>(null);

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 animate-fade-in">
          <button onClick={() => navigate("/learn")} className="min-w-[44px] min-h-[44px] rounded-xl hover:bg-muted flex items-center justify-center transition-all duration-300 active:scale-95">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Học Pinyin 拼音</h1>
            <p className="text-sm text-muted-foreground">Nền tảng phát âm tiếng Trung</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-muted rounded-2xl animate-fade-in" style={{ animationDelay: "0.05s" }}>
          {[
            { key: "tones", label: "Thanh điệu" },
            { key: "initials", label: "Phụ âm đầu" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-card text-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "tones" && (
            <motion.div
              key="tones"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <p className="text-sm text-muted-foreground">Tiếng Trung có 4 thanh chính + 1 thanh nhẹ. Thanh điệu thay đổi hoàn toàn nghĩa của từ!</p>
              {pinyinTones.map((tone) => (
                <button
                  key={tone.tone}
                  onClick={() => setSelectedTone(selectedTone === tone.tone ? null : tone.tone)}
                  className="w-full bg-card rounded-2xl border border-border p-4 text-left shadow-soft hover:shadow-xl hover:-translate-y-1 hover:border-primary/40 active:scale-95 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-3xl font-bold ${tone.color}`}>{tone.symbol}</span>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{tone.name}</p>
                        <p className="text-xs text-muted-foreground">{tone.description}</p>
                      </div>
                    </div>
                    <Volume2 size={18} className="text-muted-foreground" />
                  </div>
                  <AnimatePresence>
                    {selectedTone === tone.tone && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-sm font-hanzi text-foreground">{tone.example}</p>
                          <div className="mt-2 flex gap-2">
                            <button className="px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                              🔊 Nghe phát âm
                            </button>
                            <button className="px-3 py-1.5 rounded-xl bg-muted text-muted-foreground text-xs font-medium hover:bg-accent transition-colors">
                              🎤 Luyện nói
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </motion.div>
          )}

          {activeTab === "initials" && (
            <motion.div
              key="initials"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <p className="text-sm text-muted-foreground">21 phụ âm đầu trong tiếng Trung. Nhấn để nghe và xem ví dụ.</p>
              <div className="grid grid-cols-3 gap-2">
                {pinyinInitials.map((item) => (
                  <button
                    key={item.letter}
                    onClick={() => setSelectedInitial(selectedInitial === item.letter ? null : item.letter)}
                    className={`bg-card rounded-2xl border p-3 text-center shadow-soft hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 ${
                      selectedInitial === item.letter ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <p className="text-xl font-bold text-foreground">{item.letter}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 font-hanzi">{item.example}</p>
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {selectedInitial && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-card rounded-2xl border border-primary/30 p-5 shadow-soft-lg"
                  >
                    {(() => {
                      const item = pinyinInitials.find(p => p.letter === selectedInitial);
                      if (!item) return null;
                      return (
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-4xl font-bold text-primary">{item.letter}</p>
                            <p className="hanzi-small text-foreground mt-1">{item.example}</p>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">{item.pinyin}</p>
                            <p className="text-sm font-medium text-foreground">{item.meaning}</p>
                            <button className="mt-2 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
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
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PinyinLearn;
