import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { memoryGameCards } from "@/data/mockData";

type Card = { id: number; content: string; type: "hanzi" | "meaning"; pairId: number };

const createDeck = (): Card[] => {
  const cards: Card[] = [];
  memoryGameCards.forEach((c) => {
    cards.push({ id: c.id * 2 - 1, content: c.hanzi, type: "hanzi", pairId: c.id });
    cards.push({ id: c.id * 2, content: c.meaning, type: "meaning", pairId: c.id });
  });
  return cards.sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>(createDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      const cardA = cards.find((c) => c.id === a);
      const cardB = cards.find((c) => c.id === b);
      if (cardA && cardB && cardA.pairId === cardB.pairId) {
        setMatched((prev) => [...prev, a, b]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) {
          setTimeout(() => setGameComplete(true), 500);
        }
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
      setMoves((m) => m + 1);
    }
  }, [flipped]);

  const handleFlip = (id: number) => {
    if (flipped.length >= 2 || flipped.includes(id) || matched.includes(id)) return;
    setFlipped((prev) => [...prev, id]);
  };

  const reset = () => {
    setCards(createDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameComplete(false);
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-5">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: 2 }}>
            <Trophy size={64} className="mx-auto text-primary" />
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground">Hoàn thành! 🎉</h1>
          <p className="text-muted-foreground">{moves} lượt lật</p>
          <div className="flex gap-3 justify-center">
            <button onClick={reset} className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-300">Chơi lại</button>
            <button onClick={() => navigate("/games")} className="px-6 py-3 rounded-2xl border border-border font-medium hover:bg-muted active:scale-[0.98] transition-all duration-300">Quay lại</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/games")} className="min-w-[44px] min-h-[44px] rounded-xl hover:bg-muted flex items-center justify-center transition-all duration-300 active:scale-95">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-foreground">Ghép đôi 🧩</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{moves} lượt</span>
            <button onClick={reset} className="p-2 rounded-xl hover:bg-muted transition-colors active:scale-95">
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {cards.map((card) => {
            const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
            const isMatched = matched.includes(card.id);
            return (
              <motion.button
                key={card.id}
                onClick={() => handleFlip(card.id)}
                className={`aspect-square rounded-2xl border flex items-center justify-center p-2 transition-all duration-300 active:scale-95 ${
                  isMatched ? "bg-success/10 border-success/30" :
                  isFlipped ? "bg-primary/10 border-primary/30 shadow-soft" :
                  "bg-card border-border hover:border-primary/20 hover:shadow-soft"
                }`}
                whileHover={!isFlipped ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.95 }}
                animate={isFlipped ? { rotateY: 0 } : { rotateY: 180 }}
              >
                {isFlipped ? (
                  <span className={`${card.type === "hanzi" ? "font-hanzi text-xl" : "text-xs"} font-medium text-foreground`}>
                    {card.content}
                  </span>
                ) : (
                  <span className="text-2xl">🌸</span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
