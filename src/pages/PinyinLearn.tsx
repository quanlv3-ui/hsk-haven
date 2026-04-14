import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, ChevronRight, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { pinyinInitials, pinyinTones, pinyinFinals } from "@/data/mockData";

const getMarkedPinyin = (initial: string, final: string, tone: number) => {
  const vMap: Record<string, string[]> = {
    "a": ["a", "ā", "á", "ǎ", "à", "a"],
    "o": ["o", "ō", "ó", "ǒ", "ò", "o"],
    "e": ["e", "ē", "é", "ě", "è", "e"],
    "i": ["i", "ī", "í", "ǐ", "ì", "i"],
    "u": ["u", "ū", "ú", "ǔ", "ù", "u"],
    "ü": ["ü", "ǖ", "ǘ", "ǚ", "ǜ", "ü"],
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

const PinyinLearn = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"tones" | "initials" | "finals" | "combiner">("tones");
  const [selectedTone, setSelectedTone] = useState<number | null>(null);
  const [selectedInitial, setSelectedInitial] = useState<string | null>(null);

  // For combiner
  const [combI, setCombI] = useState("b");
  const [combF, setCombF] = useState("a");
  const [combT, setCombT] = useState(1);

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
        <div className="flex gap-2 p-1 bg-muted rounded-2xl animate-fade-in flex-wrap" style={{ animationDelay: "0.05s" }}>
          {[
            { key: "tones", label: "Thanh điệu" },
            { key: "initials", label: "Phụ âm" },
            { key: "finals", label: "Vận mẫu" },
            { key: "combiner", label: "Ghép vần 🪄" },
          ].map((tab) => (
            <button
               key={tab.key}
               onClick={() => setActiveTab(tab.key as any)}
               className={`flex-1 min-w-[80px] py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
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

          {activeTab === "finals" && (
            <motion.div
              key="finals"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              <p className="text-sm text-muted-foreground">36 vận mẫu (âm vần) trong tiếng Trung được chia thành các nhóm dễ nhớ.</p>
              {pinyinFinals.map((group) => (
                <div key={group.group} className="bg-card rounded-2xl border border-border p-4 shadow-soft">
                  <p className="font-bold text-foreground mb-3">{group.group}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {group.finals.map((f) => (
                      <div key={f} className="bg-muted rounded-xl py-3 text-center text-lg font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "combiner" && (
            <motion.div
              key="combiner"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
               <div className="text-center space-y-2">
                 <p className="text-sm text-muted-foreground">Bấm chọn để học cách ghép chữ giống hệt tiếng Việt</p>
               </div>

               {/* Kết quả ghép */}
               <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 flex flex-col items-center justify-center relative shadow-inner overflow-hidden">
                  <Wand2 className="absolute top-2 right-2 text-primary/20" size={80} />
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Thành Quả</p>
                  <div className="text-6xl sm:text-7xl font-extrabold text-foreground tracking-tight">
                    {getMarkedPinyin(combI, combF, combT)}
                  </div>
                  <div className="flex gap-2 mt-6">
                    {pinyinTones.slice(0, 4).map((t, idx) => (
                      <button 
                        key={t.tone} 
                        onClick={() => setCombT(t.tone)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${combT === t.tone ? "bg-primary text-white shadow-md scale-110" : "bg-card text-muted-foreground border hover:bg-primary/10 hover:text-primary"}`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                  <button className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform">
                    <Volume2 size={24} />
                  </button>
               </div>

               {/* Bàn phím chọn */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card rounded-2xl border p-4 shadow-soft h-[300px] overflow-y-auto">
                    <p className="text-xs font-bold text-muted-foreground uppercase mb-3 sticky top-0 bg-card pb-2">1. Chọn Phụ Âm</p>
                    <div className="grid grid-cols-3 gap-2">
                      {pinyinInitials.map(i => (
                        <button 
                          key={i.letter} 
                          onClick={() => setCombI(i.letter)}
                          className={`py-2 rounded-xl font-bold transition-colors ${combI === i.letter ? "bg-primary text-white shadow-soft" : "bg-muted text-foreground hover:bg-primary/20"}`}
                        >
                          {i.letter}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl border p-4 shadow-soft h-[300px] overflow-y-auto">
                    <p className="text-xs font-bold text-muted-foreground uppercase mb-3 sticky top-0 bg-card pb-2">2. Chọn Vần</p>
                    <div className="flex flex-col gap-2">
                       {pinyinFinals.map(g => (
                         <div key={g.group}>
                           <div className="grid grid-cols-3 gap-2 mt-1">
                             {g.finals.map(f => (
                               <button 
                                 key={f} 
                                 onClick={() => setCombF(f)}
                                 className={`py-2 rounded-xl font-bold transition-colors ${combF === f ? "bg-primary text-white shadow-soft" : "bg-muted text-foreground hover:bg-primary/20"}`}
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
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default PinyinLearn;
