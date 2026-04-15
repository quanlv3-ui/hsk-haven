import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Volume2, CheckCircle2, ChevronRight, ArrowLeft, Sparkles } from "lucide-react";
import { useBeginnerProgress } from "@/hooks/useBeginnerProgress";

const basicWords = [
  { hanzi: "你", pinyin: "nǐ", meaning: "Bạn / Anh / Chị" },
  { hanzi: "好", pinyin: "hǎo", meaning: "Tốt, khỏe" },
  { hanzi: "我", pinyin: "wǒ", meaning: "Tôi" },
  { hanzi: "是", pinyin: "shì", meaning: "Là" },
  { hanzi: "不", pinyin: "bù", meaning: "Không" },
  { hanzi: "他", pinyin: "tā", meaning: "Anh ấy" },
  { hanzi: "她", pinyin: "tā", meaning: "Cô ấy" },
  { hanzi: "们", pinyin: "men", meaning: "(hậu tố số nhiều)" },
  { hanzi: "一", pinyin: "yī", meaning: "Một" },
  { hanzi: "二", pinyin: "èr", meaning: "Hai" },
  { hanzi: "三", pinyin: "sān", meaning: "Ba" },
  { hanzi: "大", pinyin: "dà", meaning: "To, lớn" },
  { hanzi: "小", pinyin: "xiǎo", meaning: "Nhỏ" },
  { hanzi: "人", pinyin: "rén", meaning: "Người" },
  { hanzi: "中", pinyin: "zhōng", meaning: "Giữa, trung" },
  { hanzi: "国", pinyin: "guó", meaning: "Nước, quốc gia" },
  { hanzi: "学", pinyin: "xué", meaning: "Học" },
  { hanzi: "生", pinyin: "shēng", meaning: "Sinh ra, học sinh" },
  { hanzi: "老", pinyin: "lǎo", meaning: "Già, lão" },
  { hanzi: "师", pinyin: "shī", meaning: "Thầy" },
];

const BasicVocab = () => {
  const navigate = useNavigate();
  const { completeStep } = useBeginnerProgress();
  const [learned, setLearned] = useState<Set<number>>(new Set());
  const [flipped, setFlipped] = useState<number | null>(null);

  const toggleLearn = (i: number) => {
    setLearned((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const allLearned = learned.size >= basicWords.length;

  const handleComplete = () => {
    completeStep(3); // step index 3 = basic-vocab
    navigate("/learn");
  };

  const pct = (learned.size / basicWords.length) * 100;

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/learn")} className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-muted transition-colors">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Từ vựng cơ bản</h1>
            <p className="text-xs text-muted-foreground">20 chữ Hán đầu tiên cho người mới</p>
          </div>
          <span className="text-sm font-semibold text-primary">{learned.size}/{basicWords.length}</span>
        </div>

        {/* Progress */}
        <div className="h-2.5 rounded-full bg-muted overflow-hidden">
          <motion.div className="h-full rounded-full bg-primary" animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {basicWords.map((w, i) => {
            const isLearned = learned.has(i);
            const isFlipped = flipped === i;
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                onClick={() => setFlipped(isFlipped ? null : i)}
                className={`relative rounded-2xl border p-4 text-center transition-all duration-300 group
                  ${isLearned
                    ? "bg-success/10 border-success/30"
                    : "bg-card border-border hover:border-primary/40 hover:shadow-md hover:-translate-y-1"
                  } active:scale-95`}
              >
                {isLearned && (
                  <CheckCircle2 size={14} className="absolute top-2 right-2 text-success" />
                )}
                {!isFlipped ? (
                  <>
                    <span className="text-2xl font-bold text-foreground block">{w.hanzi}</span>
                    <span className="text-xs text-muted-foreground mt-1 block">{w.pinyin}</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-semibold text-primary block">{w.meaning}</span>
                    <span className="text-xs text-muted-foreground mt-1 block">{w.pinyin}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLearn(i); }}
                      className={`mt-2 text-xs font-semibold px-3 py-1 rounded-full transition-all ${isLearned ? "bg-success/20 text-success" : "bg-primary/10 text-primary hover:bg-primary/20"}`}
                    >
                      {isLearned ? "Đã thuộc ✓" : "Đánh dấu đã thuộc"}
                    </button>
                  </>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Complete button */}
        {allLearned && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center pt-4"
          >
            <button
              onClick={handleComplete}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300"
            >
              <Sparkles size={18} />
              Hoàn thành bước 4
              <ChevronRight size={16} />
            </button>
          </motion.div>
        )}

        <p className="text-center text-xs text-muted-foreground">Nhấn vào thẻ để xem nghĩa · Đánh dấu tất cả để hoàn thành</p>
      </div>
    </div>
  );
};

export default BasicVocab;
