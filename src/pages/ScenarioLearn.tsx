import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, ChevronRight, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { scenarios } from "@/data/mockData";

const ScenarioLearn = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showPinyin, setShowPinyin] = useState(true);

  const scenario = scenarios.find((s) => s.id === selectedId);

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-5">
        <div className="flex items-center gap-3 animate-fade-in">
          <button
            onClick={() => selectedId ? setSelectedId(null) : navigate("/learn")}
            className="min-w-[44px] min-h-[44px] rounded-xl hover:bg-muted flex items-center justify-center transition-all duration-300 active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{selectedId ? scenario?.title : "Tình huống thực tế"}</h1>
            <p className="text-sm text-muted-foreground">{selectedId ? scenario?.description : "Học theo ngữ cảnh đời thường"}</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!selectedId ? (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-3">
              {scenarios.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className="bg-card rounded-2xl border border-border p-5 text-center shadow-soft hover:shadow-soft-lg active:scale-[0.97] transition-all duration-300"
                  whileHover={{ y: -3 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="text-4xl">{s.icon}</span>
                  <p className="text-sm font-semibold text-foreground mt-2">{s.title.replace(/\s*[^\s]+$/, "")}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.phrases.length} câu</p>
                </motion.button>
              ))}
            </motion.div>
          ) : scenario ? (
            <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{scenario.phrases.length} câu thường dùng</p>
                <button
                  onClick={() => setShowPinyin(!showPinyin)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPinyin ? <EyeOff size={14} /> : <Eye size={14} />}
                  {showPinyin ? "Ẩn pinyin" : "Hiện pinyin"}
                </button>
              </div>

              {scenario.phrases.map((phrase, i) => (
                <motion.div
                  key={i}
                  className="bg-card rounded-2xl border border-border p-4 shadow-soft hover:shadow-soft-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-hanzi text-lg text-foreground">{phrase.chinese}</p>
                      <AnimatePresence>
                        {showPinyin && (
                          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-xs text-muted-foreground">
                            {phrase.pinyin}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <p className="text-sm text-foreground mt-1">{phrase.vietnamese}</p>
                    </div>
                    <button className="min-w-[36px] min-h-[36px] rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 active:scale-90 transition-all duration-200">
                      <Volume2 size={16} className="text-primary" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ScenarioLearn;
