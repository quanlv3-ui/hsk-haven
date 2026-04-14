import { useState, useMemo, useEffect } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, AlertTriangle, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { scenarios } from "../data/mockData";

export default function SentenceAssembleGame() {
  const navigate = useNavigate();
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStage, setGameStage] = useState<"intro" | "playing" | "result">("intro");
  const [selectedWords, setSelectedWords] = useState<{ id: string; word: string }[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Flatten all phrases into a list of questions
  const gameQuestions = useMemo(() => {
    const allPhrases = scenarios.flatMap((c) => c.phrases);
    // Shuffle and pick 10
    return [...allPhrases].sort(() => Math.random() - 0.5).slice(0, 10).map((phrase) => {
      // Split chinese into characters/words (for simplicity, we split by characters unless it's a word, but since we don't have segmentation, splitting by characters for learning is common for short phrases)
      // Actually, splitting by characters is fine for 3-5 chars phrases.
      const words = Array.from(phrase.chinese).filter(c => c.trim() !== "" && ![... "，。！？；：", "?", "!"].includes(c));
      const jumbled = [...words].map((w, i) => ({ id: `${i}-${w}`, word: w })).sort(() => Math.random() - 0.5);
      
      return {
        ...phrase,
        wordsToSelect: jumbled,
        correctSequence: words
      };
    });
  }, []);

  const currentQ = gameQuestions[qIndex];

  const handleSelectWord = (wordObj: { id: string; word: string }) => {
    if (isChecking) return;
    setSelectedWords(prev => [...prev, wordObj]);
  };

  const handleRemoveWord = (idObj: string) => {
    if (isChecking) return;
    setSelectedWords(prev => prev.filter(w => w.id !== idObj));
  };

  const handleCheck = () => {
    if (selectedWords.length !== currentQ.correctSequence.length) return;
    setIsChecking(true);
    
    // Check if correct
    const checkIsCorrect = selectedWords.map(w => w.word).join("") === currentQ.correctSequence.join("");
    setIsCorrect(checkIsCorrect);
    
    if (checkIsCorrect) {
      setScore(s => s + 1);
    }
    
    setTimeout(() => {
      if (qIndex < gameQuestions.length - 1) {
        setQIndex(q => q + 1);
        setSelectedWords([]);
        setIsChecking(false);
        setIsCorrect(null);
      } else {
        setGameStage("result");
      }
    }, 1500);
  };

  // Auto-check when selection matches length
  useEffect(() => {
    if (gameStage === "playing" && currentQ && selectedWords.length === currentQ.correctSequence.length) {
      handleCheck();
    }
  }, [selectedWords, gameStage, currentQ]);


  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-3xl py-6 space-y-5 mx-auto">
        <div className="flex items-center gap-3 animate-fade-in mb-6">
          <button onClick={() => navigate("/games")} className="min-w-[44px] min-h-[44px] rounded-xl hover:bg-muted flex items-center justify-center transition-all duration-300 border border-border bg-card shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Xếp Câu 📝</h1>
            <p className="text-sm text-muted-foreground">Lắp ráp các nhóm từ thành câu hoàn chỉnh</p>
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
                     <span className="text-5xl">🧩</span>
                   </div>
                   <h2 className="text-3xl font-black mb-4">Xếp Câu HSK</h2>
                   <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg leading-relaxed">
                     Bạn sẽ có một câu tiếng Việt. Nhiệm vụ của bạn là chọn các khối chữ Hán bên dưới và sắp xếp chúng lại theo đúng trật tự từ vựng & ngữ pháp!
                   </p>
                   <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <button onClick={() => navigate("/games")} className="px-6 py-4 bg-muted hover:bg-muted/80 text-foreground font-bold rounded-2xl transition-colors border border-border/50">
                       Về Menu Games
                     </button>
                     <button onClick={() => { setGameStage("playing"); setQIndex(0); setScore(0); setSelectedWords([]); setIsChecking(false); }} className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-md">
                       Vào chơi ngay <ArrowRight size={20} />
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

                    <div className="text-center bg-card p-6 rounded-2xl border border-border/60 shadow-sm relative overflow-hidden">
                       <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Dịch câu này:</span>
                       <h3 className="text-2xl font-bold text-foreground mb-1">{currentQ.vietnamese}</h3>
                       {isChecking && (
                          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-lg text-primary font-medium mt-2">{currentQ.pinyin}</motion.p>
                       )}
                    </div>

                    {/* Sentence builder zone */}
                    <div className={`min-h-[100px] border-2 border-dashed ${isChecking ? (isCorrect ? 'border-success bg-success/5' : 'border-destructive bg-destructive/5') : 'border-border bg-muted/20'} rounded-2xl p-4 flex flex-wrap gap-2 items-center justify-start content-start transition-colors duration-300 relative`}>
                        <AnimatePresence>
                           {selectedWords.map((w, i) => (
                              <motion.button
                                key={w.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => handleRemoveWord(w.id)}
                                disabled={isChecking}
                                className="bg-primary text-primary-foreground text-2xl font-hanzi w-14 h-14 rounded-xl flex items-center justify-center hover:bg-primary/90 shadow-md active:scale-95"
                              >
                                {w.word}
                              </motion.button>
                           ))}
                        </AnimatePresence>
                        {selectedWords.length === 0 && !isChecking && (
                            <span className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 pointer-events-none">Bấm chọn từ bên dưới để điền vào đây</span>
                        )}
                        
                        {isChecking && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                              {isCorrect ? <CheckCircle2 size={32} className="text-success animate-bounce" /> : <XCircle size={32} className="text-destructive animate-bounce" />}
                          </div>
                        )}
                    </div>

                    {/* Available words bank */}
                    <div className="flex flex-wrap justify-center gap-3 p-4 bg-muted/40 rounded-2xl border border-border">
                        {currentQ.wordsToSelect.map(w => {
                            const isSelected = selectedWords.some(sw => sw.id === w.id);
                            return (
                                <button
                                   key={w.id}
                                   onClick={() => handleSelectWord(w)}
                                   disabled={isSelected || isChecking}
                                   className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-hanzi transition-all duration-200 ${isSelected ? 'bg-border text-transparent shadow-none scale-95 opacity-30 cursor-not-allowed' : 'bg-card text-foreground border border-border shadow-sm hover:shadow-md hover:-translate-y-1 active:scale-95 hover:border-primary/30'}`}
                                >
                                   {w.word}
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
                    <h2 className="text-3xl font-black text-foreground">Hoàn Thành! 🎉</h2>
                    <p className="text-muted-foreground mt-2 mb-8 text-lg">Bạn đã xếp đúng {score}/{gameQuestions.length} câu. Thật ấn tượng!</p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button onClick={() => navigate("/games")} className="px-6 py-4 bg-muted hover:bg-muted/80 text-foreground font-bold rounded-2xl transition-colors border border-border">
                        Về Menu Games
                      </button>
                      <button onClick={() => { setGameStage("intro"); }} className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-md">
                        Chơi lại <RotateCcw size={20} />
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
