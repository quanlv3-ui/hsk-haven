import { useState, useMemo, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Puzzle, CheckCircle2, XCircle, RotateCcw, Trophy, Lightbulb, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { radicals, ideogramEquations, phoneticMatrices } from "../data/mockData";

const AnimatedHanzi = ({ character, size = 60 }: { character: string, size?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<any>(null);

  useEffect(() => {
    // Cleanup any existing SVG inside the container before rendering
    if (containerRef.current) {
       containerRef.current.innerHTML = '';
    }
    
    // @ts-ignore
    if (containerRef.current && character && window.HanziWriter) {
      // @ts-ignore
      writerRef.current = window.HanziWriter.create(containerRef.current, character, {
        width: size,
        height: size,
        padding: 5,
        strokeAnimationSpeed: 1.5,
        delayBetweenStrokes: 50,
        showOutline: true,
        strokeColor: '#3b82f6', // Tailwind blue-500
        outlineColor: '#e2e8f0', // Tailwind slate-200
      });
      writerRef.current.animateCharacter();
    }
    return () => {
      if (writerRef.current) {
        writerRef.current.cancelAnimation();
      }
    };
  }, [character, size]);

  return <div ref={containerRef} className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => writerRef.current?.animateCharacter()} />;
};

const HanziGamesPlay = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  
  // Convert URL param to strictly typed state (fallback to assemble if invalid)
  const initialType = (type === "meaning" || type === "phonetic") ? type : "assemble";
  const [gameType, setGameType] = useState<"assemble"|"meaning"|"phonetic">(initialType);
  const [gameStage, setGameStage] = useState<"intro"|"playing"|"result">("intro");
  const [score, setScore] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Sync state if URL changes
  useEffect(() => {
    if (type && type !== gameType) {
       const mappedType = (type === "meaning" || type === "phonetic") ? type : "assemble";
       setGameType(mappedType);
       setGameStage("intro");
    }
  }, [type, gameType]);

  const gameQuestions = useMemo(() => {
    if (gameType === "assemble") {
      return [...ideogramEquations].sort(() => Math.random() - 0.5).slice(0, 10).map((eq) => {
        const correctChar = eq.result;
        const wrongAnswers = ideogramEquations
          .filter(e => e.id !== eq.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(e => e.result);
        const options = [correctChar, ...wrongAnswers].sort(() => Math.random() - 0.5);
        return { type: "assemble", data: eq, options, answer: correctChar };
      });
    } else if (gameType === "meaning") {
      return [...radicals].sort(() => Math.random() - 0.5).slice(0, 10).map((rad) => {
        const wrongAnswers = radicals.filter(r => r.id !== rad.id).sort(() => Math.random() - 0.5).slice(0, 3).map(r => r.meaning);
        const options = [rad.meaning, ...wrongAnswers].sort(() => Math.random() - 0.5);
        return { type: "meaning", data: rad, options, answer: rad.meaning };
      });
    } else if (gameType === "phonetic") {
      const allDerived = phoneticMatrices.flatMap(m => m.derivatives.map(d => ({...d, baseRadical: m.baseRadical, basePinyin: m.basePinyin, baseMeaning: m.baseMeaning})));
      return allDerived.sort(() => Math.random() - 0.5).slice(0, 10).map(derived => {
        const wrongAnswers = phoneticMatrices
          .filter(m => m.baseRadical !== derived.baseRadical)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(m => m.baseRadical);
        const options = [derived.baseRadical, ...wrongAnswers].sort(() => Math.random() - 0.5);
        return { type: "phonetic", data: derived, options, answer: derived.baseRadical };
      });
    }
    return [];
  }, [gameType, gameStage]); // Regenerates on replay (when gameStage cycles intro -> playing)

  const handleAnswer = (ans: string) => {
    if (selectedOption) return;
    setSelectedOption(ans);
    // @ts-ignore
    if (ans === gameQuestions[qIndex]?.answer) {
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
          <button onClick={() => navigate("/games")} className="min-w-[44px] min-h-[44px] rounded-xl hover:bg-muted flex items-center justify-center transition-all duration-300 active:scale-95 border border-border bg-card shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mini Games 🎮</h1>
            <p className="text-sm text-muted-foreground">Luyện thẻ chữ và phản xạ</p>
          </div>
        </div>

        <motion.div
            key={gameType + gameStage}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full"
        >
            <div className="bg-card rounded-3xl border border-border p-6 sm:p-10 shadow-sm">
               {gameStage === "intro" && (
                 <div className="text-center py-10">
                   <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-primary/10">
                     {gameType === "assemble" && <Puzzle size={48} className="text-blue-500" />}
                     {gameType === "meaning" && <Lightbulb size={48} className="text-amber-500" />}
                     {gameType === "phonetic" && <Volume2 size={48} className="text-emerald-500" />}
                   </div>
                   <h2 className="text-3xl font-black mb-4">
                     {gameType === "assemble" ? "Thợ Mộc Ghép Chữ" : gameType === "meaning" ? "Phản Xạ Bộ Thủ" : "Bắt Mạch Hình Thanh"}
                   </h2>
                   <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg leading-relaxed">
                     {gameType === "assemble" && "Kiểm tra khả năng tư duy thợ thủ công của bạn. Hãy chọn đúng chữ Hán được tạo ra từ các thành phần (bộ thủ) đã cho!"}
                     {gameType === "meaning" && "Mỗi giây đều quý giá! Nhìn nhanh một bộ thủ và chọn đúng ý nghĩa tiếng Việt của nó trong 4 phương án."}
                     {gameType === "phonetic" && "Bạn có thể nhìn thấu một chữ Hán? Hãy chỉ ra bộ thủ mượn âm (gốc phát âm) của chữ Hán cho trước!"}
                   </p>
                   <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <button onClick={() => navigate("/games")} className="px-6 py-4 bg-muted hover:bg-muted/80 text-foreground font-bold rounded-2xl transition-colors border border-border/50">
                       Về Menu Games
                     </button>
                     <button onClick={() => { setGameStage("playing"); setQIndex(0); setScore(0); setSelectedOption(null); }} className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                       Bắt đầu ngay <ArrowRight size={20} />
                     </button>
                   </div>
                 </div>
               )}

               {gameStage === "playing" && gameQuestions[qIndex] && (
                 <div className="space-y-8">
                   <div className="flex justify-between items-center bg-muted/50 p-4 rounded-2xl border border-border/50 relative">
                     <button onClick={() => { setGameStage("intro"); setSelectedOption(null); }} className="text-sm font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors z-10 w-24">
                       <ArrowLeft size={16}/> Hủy
                     </button>
                     <span className="font-bold text-foreground absolute left-1/2 -translate-x-1/2 w-full text-center">Câu {qIndex + 1}/{gameQuestions.length}</span>
                     <span className="font-bold text-primary flex items-center justify-end gap-1 z-10 w-24"><Trophy size={16}/> {score} Điểm</span>
                   </div>
                   
                   <div className="bg-muted/30 p-8 rounded-3xl border border-border/50 flex flex-col items-center shadow-inner relative overflow-hidden">
                     {/* Decorative element */}
                     <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                     <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

                     {gameQuestions[qIndex].type === "assemble" && (
                       <div className="relative z-10 flex flex-col items-center">
                         <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8 bg-card px-4 py-1.5 rounded-full border border-border">Chữ gì được tạo ra từ đây?</p>
                         {/* @ts-ignore */}
                         <div className={`flex items-center justify-center mb-6 ${gameQuestions[qIndex].data.parts.length === 2 ? 'gap-6 sm:gap-16' : 'gap-3 sm:gap-6'}`}>
                           {/* @ts-ignore */}
                           {gameQuestions[qIndex].data.parts.map((p: any, pIdx: number) => (
                             /* @ts-ignore */
                             <div key={pIdx} className={`flex items-center shrink-0 ${gameQuestions[qIndex].data.parts.length === 2 ? 'gap-6 sm:gap-16' : 'gap-3 sm:gap-6'}`}>
                               <div className="flex flex-col items-center">
                                 <div className="w-20 h-20 sm:w-24 sm:h-24 bg-card rounded-3xl shadow-sm border-2 border-primary/20 flex items-center justify-center mb-3">
                                   <AnimatedHanzi character={p.character} size={60} />
                                 </div>
                                 <span className="text-sm font-bold text-muted-foreground bg-muted/80 px-3 py-1 rounded-full">{p.meaning}</span>
                               </div>
                               {/* @ts-ignore */}
                               {pIdx < gameQuestions[qIndex].data.parts.length - 1 && (
                                 <span className="text-muted-foreground/60 font-black text-3xl sm:text-4xl drop-shadow-sm">+</span>
                               )}
                             </div>
                           ))}
                         </div>
                       </div>
                     )}

                     {gameQuestions[qIndex].type === "meaning" && (
                       <div className="relative z-10 flex flex-col items-center">
                         <p className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-8 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">Bộ thủ này có nghĩa là gì?</p>
                         <div className="w-36 h-36 bg-card rounded-3xl shadow-md border-2 border-border flex items-center justify-center mb-6 hover:scale-105 transition-transform duration-500">
                           {/* @ts-ignore */}
                           <AnimatedHanzi character={gameQuestions[qIndex].data.radical} size={90} />
                         </div>
                         {/* @ts-ignore */}
                         <span className="font-bold text-2xl text-foreground bg-background px-6 py-2 rounded-2xl border border-border/50 shadow-sm">{gameQuestions[qIndex].data.pinyin}</span>
                       </div>
                     )}

                     {gameQuestions[qIndex].type === "phonetic" && (
                       <div className="relative z-10 flex flex-col items-center">
                         <p className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-8 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">Đâu là phần "chỉ âm" của chữ này?</p>
                         <div className="flex flex-col items-center">
                           <div className="w-36 h-36 bg-card rounded-3xl shadow-md border-2 border-border flex items-center justify-center mb-6 hover:scale-105 transition-transform duration-500">
                             {/* @ts-ignore */}
                             <span className="text-8xl font-hanzi text-foreground drop-shadow-sm">{gameQuestions[qIndex].data.character}</span>
                           </div>
                           <div className="flex items-center gap-3">
                             {/* @ts-ignore */}
                             <span className="font-bold text-2xl text-primary bg-primary/10 px-4 py-1.5 rounded-2xl border border-primary/20">{gameQuestions[qIndex].data.pinyin}</span>
                             {/* @ts-ignore */}
                             <span className="text-base font-medium text-muted-foreground bg-muted/60 px-4 py-1.5 rounded-2xl border border-border/60">{gameQuestions[qIndex].data.meaning}</span>
                           </div>
                         </div>
                       </div>
                     )}
                   </div>

                   <div className="grid grid-cols-2 gap-4 sm:gap-6">
                     {gameQuestions[qIndex].options.map((opt, i) => {
                       const isSelected = selectedOption === opt;
                       // @ts-ignore
                       const isCorrect = opt === gameQuestions[qIndex].answer;
                       const showStatus = selectedOption !== null;
                       
                       let stateClass = "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground hover:shadow-md hover:-translate-y-1";
                       if (showStatus) {
                         if (isCorrect) stateClass = "bg-green-500/10 border-green-500 text-green-600 scale-[1.02] shadow-sm";
                         else if (isSelected && !isCorrect) stateClass = "bg-red-500/10 border-red-500 text-red-600 scale-[0.98]";
                         else stateClass = "bg-card border-border opacity-50 scale-[0.98]";
                       }

                       return (
                         <button 
                           key={i}
                           disabled={showStatus}
                           onClick={() => handleAnswer(opt)}
                           className={`p-6 sm:p-8 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center relative shadow-sm ${stateClass}`}
                         >
                           <span className={`${gameType === 'meaning' ? 'text-xl sm:text-2xl font-bold' : 'text-5xl sm:text-7xl font-hanzi font-bold'} mb-1 text-center drop-shadow-sm`}>{opt}</span>
                           {showStatus && isCorrect && <CheckCircle2 className="absolute top-4 right-4 text-green-500 bg-white rounded-full" size={28} />}
                           {showStatus && isSelected && !isCorrect && <XCircle className="absolute top-4 right-4 text-red-500 bg-white rounded-full" size={28} />}
                         </button>
                       );
                     })}
                   </div>
                 </div>
               )}

               {gameStage === "result" && (
                 <div className="text-center py-12">
                   <div className="w-28 h-28 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative border-4 border-yellow-500/20 shadow-xl">
                     <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 rounded-full animate-pulse"></div>
                     <Trophy size={64} className="text-yellow-500 relative z-10 drop-shadow-md" />
                   </div>
                   <h2 className="text-4xl font-black mb-3">Hoàn Thành!</h2>
                   <p className="text-xl font-medium text-muted-foreground mb-10">Bạn đạt được <span className="text-primary font-bold text-2xl mx-1">{score}/{gameQuestions.length}</span> điểm.</p>
                   
                   <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                     <button onClick={() => navigate("/games")} className="flex-1 py-4 bg-muted hover:bg-muted/80 text-foreground font-bold rounded-2xl transition-colors border border-border/50">
                       Về Menu
                     </button>
                     <button onClick={() => setGameStage("intro")} className="flex-1 py-4 bg-foreground text-background border border-border font-bold rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                       <RotateCcw size={20} /> Chơi lại lần nữa
                     </button>
                   </div>
                 </div>
               )}
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HanziGamesPlay;
