import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Eye, EyeOff } from "lucide-react";
import { flashcards } from "@/data/mockData";

const OnboardingTry = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showPinyin, setShowPinyin] = useState(false);
  const [done, setDone] = useState(false);
  const total = 5;
  const card = flashcards[index % flashcards.length];

  const handleRate = () => {
    if (index + 1 >= total) {
      setDone(true);
    } else {
      setFlipped(false);
      setShowPinyin(false);
      setIndex(index + 1);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-sm">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-foreground">Bạn vừa học 5 từ đầu tiên!</h1>
          <p className="text-muted-foreground mt-2">Tạo tài khoản để lưu tiến độ và tiếp tục hành trình.</p>
          <button onClick={() => navigate("/register")} className="mt-6 w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold min-h-[44px]">Tạo tài khoản để lưu tiến độ</button>
          <button onClick={() => navigate("/login")} className="mt-3 w-full text-sm text-muted-foreground">Đã có tài khoản? Đăng nhập</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-4 text-center">
        <p className="text-sm text-muted-foreground">Thử 5 thẻ đầu tiên — không cần tài khoản</p>
        <div className="flex justify-center gap-2 mt-3">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i <= index ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.div key={index} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="w-full max-w-md">
            <div className="bg-card rounded-3xl border border-border shadow-lg p-8 min-h-[320px] flex flex-col items-center justify-center cursor-pointer" onClick={() => !flipped && setFlipped(true)}>
              {!flipped ? (
                <>
                  <p className="hanzi-large text-foreground">{card.hanzi}</p>
                  {showPinyin && <p className="mt-2 text-lg text-muted-foreground">{card.pinyin}</p>}
                  <div className="flex gap-3 mt-4">
                    <button onClick={(e) => { e.stopPropagation(); setShowPinyin(!showPinyin); }} className="min-w-[44px] min-h-[44px] rounded-full bg-muted flex items-center justify-center">
                      {showPinyin ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <button onClick={(e) => e.stopPropagation()} className="min-w-[44px] min-h-[44px] rounded-full bg-muted flex items-center justify-center">
                      <Volume2 size={18} />
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">Nhấn để xem nghĩa</p>
                </>
              ) : (
                <>
                  <p className="hanzi-medium text-foreground">{card.hanzi}</p>
                  <p className="text-muted-foreground">{card.pinyin}</p>
                  <p className="text-xl font-semibold text-foreground mt-4">{card.meaning}</p>
                  <p className="text-sm text-muted-foreground mt-3 font-hanzi text-center">{card.example}</p>
                  <p className="text-sm text-muted-foreground">{card.exampleTranslation}</p>
                  <span className="mt-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">{card.context}</span>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {flipped && (
        <div className="p-4 pb-8 grid grid-cols-4 gap-2 max-w-md mx-auto w-full">
          {[
            { label: "Lại", cls: "bg-destructive/10 text-destructive border-destructive/20" },
            { label: "Khó", cls: "bg-warning/10 text-warning border-warning/20" },
            { label: "Được", cls: "bg-success/10 text-success border-success/20" },
            { label: "Dễ", cls: "bg-easy/10 text-easy border-easy/20" },
          ].map((r) => (
            <button key={r.label} onClick={handleRate} className={`${r.cls} border rounded-xl py-3 text-sm font-semibold min-h-[44px]`}>{r.label}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OnboardingTry;
