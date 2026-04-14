import { useState, useMemo, useEffect } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Trophy, Image as ImageIcon, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Mock data for Picture Guess game
const pictureData = [
  { emoji: "🐱", hanzi: "猫", pinyin: "māo", meaning: "Con mèo" },
  { emoji: "🐶", hanzi: "狗", pinyin: "gǒu", meaning: "Con chó" },
  { emoji: "🍎", hanzi: "苹果", pinyin: "píngguǒ", meaning: "Quả táo" },
  { emoji: "☕", hanzi: "咖啡", pinyin: "kāfēi", meaning: "Cà phê" },
  { emoji: "🚲", hanzi: "自行车", pinyin: "zìxíngchē", meaning: "Xe đạp" },
  { emoji: "飞机", hanzi: "飞机", pinyin: "fēijī", meaning: "Máy bay", isTextIcon: true },
  { emoji: "🌧️", hanzi: "下雨", pinyin: "xiàyǔ", meaning: "Trời mưa" },
  { emoji: "📚", hanzi: "书", pinyin: "shū", meaning: "Sách" },
  { emoji: "医院", hanzi: "医院", pinyin: "yīyuàn", meaning: "Bệnh viện", isTextIcon: true },
  { emoji: "🔥", hanzi: "火", pinyin: "huǒ", meaning: "Lửa" },
  { emoji: "💦", hanzi: "水", pinyin: "shuǐ", meaning: "Nước" },
  { emoji: "🌳", hanzi: "树", pinyin: "shù", meaning: "Cây" },
  { emoji: "🏠", hanzi: "家", pinyin: "jiā", meaning: "Nhà" },
  { emoji: "🚗", hanzi: "汽车", pinyin: "qìchē", meaning: "Ô tô" },
  { emoji: "电视", hanzi: "电视", pinyin: "diànshì", meaning: "Tivi", isTextIcon: true }
];

export default function PictureGuessGame() {
  const navigate = useNavigate();
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStage, setGameStage] = useState<"intro" | "playing" | "result">("intro");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const gameQuestions = useMemo(() => {
    return [...pictureData].sort(() => Math.random() - 0.5).slice(0, 10).map((pic) => {
      const wrongAnswers = pictureData.filter(p => p.hanzi !== pic.hanzi).sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [pic, ...wrongAnswers].sort(() => Math.random() - 0.5);
      return { ...pic, options };
    });
  }, [gameStage]); // regenerate on game restart

  const currentQ = gameQuestions[qIndex];

  const handleOptionClick = (optHanzi: string) => {
    if (selectedOption) return;
    setSelectedOption(optHanzi);
    
    if (optHanzi === currentQ.hanzi) {
      setScore(s => s + 1);
    }
    
    setTimeout(() => {
      if (qIndex < gameQuestions.length - 1) {
        setQIndex(q => q + 1);
        setSelectedOption(null);
      } else {
        setGameStage("result");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-3xl py-6 space-y-5 mx-auto">
        <div className="flex items-center gap-3 animate-fade-in mb-6">
          <button onClick={() => navigate("/games")} className="min-w-[44px] min-h-[44px] rounded-xl hover:bg-muted flex items-center justify-center transition-all duration-300 border border-border bg-card shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Đuổi Hình Bắt Chữ 🖼️</h1>
            <p className="text-sm text-muted-foreground">Nhìn hình và đoán từ vựng tiếng Trung</p>
          </div>
        </div>

        <motion.div
            key={gameStage}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full"
        >
            <div className="bg-card rounded-3xl border border-border p-6 sm:p-10 shadow-sm">
               {gameStage === "intro" && (
                 <div className="text-center py-10">
                   <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-primary/10">
                     <ImageIcon size={48} className="text-primary" />
                   </div>
                   <h2 className="text-3xl font-black mb-4">Đuổi Hình Bắt Chữ</h2>
                   <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg leading-relaxed">
                     Luyện tư duy hình ảnh! Mỗi câu hỏi sẽ xuất hiện một hình minh hoạ (hoặc hoàn cảnh), bạn phải tìm ra đúng chữ Hán tương ứng với bức tranh đó.
                   </p>
                   <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <button onClick={() => navigate("/games")} className="px-6 py-4 bg-muted hover:bg-muted/80 text-foreground font-bold rounded-2xl transition-colors border border-border/50">
                       Về Menu Games
                     </button>
                     <button onClick={() => { setGameStage("playing"); setQIndex(0); setScore(0); setSelectedOption(null); }} className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-md">
                       Bắt đầu đoán <ArrowRight size={20} />
                     </button>
                   </div>
                 </div>
               )}

               {gameStage === "playing" && currentQ && (
                 <div className="space-y-8">
                    <div className="flex justify-between items-center bg-muted/30 p-2 pl-4 border border-border rounded-2xl">
                      <div className="flex gap-1">
                        {gameQuestions.map((_, i) => (
                           <div key={i} className={`h-2.5 w-6 rounded-full transition-colors ${i < qIndex ? "bg-primary" : i === qIndex ? "bg-primary/50 animate-pulse" : "bg-border"}`} />
                        ))}
                      </div>
                      <div className="bg-primary/10 text-primary px-3 py-1 rounded-xl font-bold font-mono text-sm">Điểm: {score * 10}</div>
                    </div>

                    <div className="relative text-center bg-muted/20 p-8 pt-10 pb-12 rounded-3xl border border-border/60 shadow-sm flex flex-col items-center justify-center min-h-[250px]">
                       <p className="absolute top-4 left-0 right-0 text-xs font-bold text-muted-foreground uppercase tracking-widest text-center">Hình ảnh diễn tả điều gì?</p>
                       <div className="text-[100px] leading-none select-none filter drop-shadow-md">
                          {currentQ.isTextIcon ? (
                             <span className="text-4xl font-black bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent px-8 py-4 rounded-3xl border border-primary/20 bg-primary/5 shadow-inner">
                                {currentQ.emoji}
                             </span>
                          ) : currentQ.emoji}
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {currentQ.options.map((opt, i) => {
                            const isSelected = selectedOption === opt.hanzi;
                            const isCorrect = opt.hanzi === currentQ.hanzi;
                            
                            let btnStateClass = "bg-card border-border hover:border-primary/50 hover:bg-muted/50";
                            if (selectedOption) {
                                if (isCorrect) btnStateClass = "bg-success/10 border-success text-success shadow-sm";
                                else if (isSelected) btnStateClass = "bg-destructive/10 border-destructive text-destructive shadow-sm animate-shake";
                                else btnStateClass = "opacity-50 grayscale bg-muted/50 border-border";
                            }
                            
                            return (
                                <button
                                   key={i}
                                   disabled={selectedOption !== null}
                                   onClick={() => handleOptionClick(opt.hanzi)}
                                   className={`p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center text-center gap-2 ${btnStateClass}`}
                                >
                                   <span className="text-3xl font-hanzi font-bold text-foreground">{opt.hanzi}</span>
                                   {selectedOption && (
                                     <span className="text-sm font-medium opacity-80">{opt.pinyin} - {opt.meaning}</span>
                                   )}
                                </button>
                            )
                        })}
                    </div>
                 </div>
               )}

               {gameStage === "result" && (
                 <div className="text-center py-10 animate-fade-in">
                    <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                      <Trophy size={48} />
                    </div>
                    <h2 className="text-3xl font-black text-foreground">Thiên Tài Nhìn Hình! 🎉</h2>
                    <p className="text-muted-foreground mt-2 mb-8 text-lg">Bạn đã đoán đúng {score}/{gameQuestions.length} ảnh. Rất tuyệt vời!</p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button onClick={() => navigate("/games")} className="px-6 py-4 bg-muted hover:bg-muted/80 text-foreground font-bold rounded-2xl transition-colors border border-border">
                        Về Menu Games
                      </button>
                      <button onClick={() => { setGameStage("intro"); }} className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-md">
                        Chơi ngay lại <RotateCcw size={20} />
                      </button>
                    </div>
                 </div>
               )}
            </div>
        </motion.div>
      </div>
    </div>
  )
}
