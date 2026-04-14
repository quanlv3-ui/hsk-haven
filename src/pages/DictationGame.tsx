import { useState, useMemo, useEffect } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Trophy, Volume2, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { scenarios } from "../data/mockData";

export default function DictationGame() {
  const navigate = useNavigate();
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStage, setGameStage] = useState<"intro" | "playing" | "result">("intro");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const gameQuestions = useMemo(() => {
    const allPhrases = scenarios.flatMap((c) => c.phrases);
    return [...allPhrases].sort(() => Math.random() - 0.5).slice(0, 10).map((phrase) => {
      const wrongAnswers = allPhrases
         .filter(p => p.chinese !== phrase.chinese)
         .sort(() => Math.random() - 0.5)
         .slice(0, 3);
      const options = [phrase, ...wrongAnswers].sort(() => Math.random() - 0.5);
      return { ...phrase, options };
    });
  }, [gameStage]); // regenerate on game restart

  const currentQ = gameQuestions[qIndex];

  const playAudio = (text: string) => {
    if (!window.speechSynthesis) return;
    setIsPlayingAudio(true);
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.8; // slightly slower for dictation
    
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    
    window.speechSynthesis.speak(utterance);
  };

  // Play audio automatically when question appears
  useEffect(() => {
    if (gameStage === "playing" && currentQ) {
      setTimeout(() => playAudio(currentQ.chinese), 500);
    }
    
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
  }, [gameStage, qIndex, currentQ]);

  const handleOptionClick = (optChinese: string) => {
    if (selectedOption) return;
    setSelectedOption(optChinese);
    
    if (optChinese === currentQ.chinese) {
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
            <h1 className="text-2xl font-bold text-foreground">Nghe Tã (Dictation) 🎧</h1>
            <p className="text-sm text-muted-foreground">Luyện nghe và nhận diện chữ Hán</p>
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
                   <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-primary/10 relative">
                     <Headphones size={48} className="text-primary absolute" />
                   </div>
                   <h2 className="text-3xl font-black mb-4">Luyện Chép Chính Tả</h2>
                   <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg leading-relaxed">
                     Lắng nghe người bản xứ đọc các câu khẩu ngữ, sau đó nhanh chóng chọn đáp án đúng! Tính năng sử dụng hệ thống AI Text-To-Speech.
                   </p>
                   <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <button onClick={() => navigate("/games")} className="px-6 py-4 bg-muted hover:bg-muted/80 text-foreground font-bold rounded-2xl transition-colors border border-border/50">
                       Về Menu Games
                     </button>
                     <button onClick={() => { setGameStage("playing"); setQIndex(0); setScore(0); setSelectedOption(null); }} className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-md">
                       Vào phòng nghe <ArrowRight size={20} />
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

                    <div className="relative text-center bg-muted/20 p-8 pt-10 pb-12 rounded-3xl border border-border/60 shadow-sm flex flex-col items-center justify-center">
                       <p className="absolute top-4 left-0 right-0 text-xs font-bold text-muted-foreground uppercase tracking-widest text-center">Âm thanh đang được phát</p>
                       
                       <button 
                         onClick={() => playAudio(currentQ.chinese)}
                         className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${isPlayingAudio ? 'bg-primary/20 scale-110 shadow-lg shadow-primary/20' : 'bg-primary/10 hover:bg-primary/20'} border-4 ${isPlayingAudio ? 'border-primary/50' : 'border-transparent'}`}
                       >
                          <Volume2 size={48} className={isPlayingAudio ? 'text-primary animate-pulse' : 'text-primary/70'} />
                       </button>

                       {selectedOption !== null && (
                         <div className="absolute bottom-4 left-0 right-0 text-center animate-fade-in">
                            <span className="font-bold text-foreground text-xl bg-background/80 backdrop-blur-sm px-4 py-1.5 border border-border rounded-full">{currentQ.pinyin}</span>
                         </div>
                       )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQ.options.map((opt, i) => {
                            const isSelected = selectedOption === opt.chinese;
                            const isCorrect = opt.chinese === currentQ.chinese;
                            
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
                                   onClick={() => handleOptionClick(opt.chinese)}
                                   className={`p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center text-center gap-2 ${btnStateClass}`}
                                >
                                   <span className="text-2xl font-hanzi font-bold text-foreground max-w-[200px] truncate">{opt.chinese}</span>
                                   {selectedOption && (
                                     <span className="text-xs font-medium opacity-80 max-w-[200px] truncate">{opt.vietnamese}</span>
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
                    <h2 className="text-3xl font-black text-foreground">Lỗ Tai Vàng! 🎉</h2>
                    <p className="text-muted-foreground mt-2 mb-8 text-lg">Bạn đã nghe đúng {score}/{gameQuestions.length} câu. Quá đỉnh!</p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button onClick={() => navigate("/games")} className="px-6 py-4 bg-muted hover:bg-muted/80 text-foreground font-bold rounded-2xl transition-colors border border-border">
                        Về Menu Games
                      </button>
                      <button onClick={() => { setGameStage("intro"); }} className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-md">
                        Chơi nhanh lại <RotateCcw size={20} />
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
