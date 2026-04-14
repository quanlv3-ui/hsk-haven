import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, Zap, Puzzle, ChevronRight } from "lucide-react";

const games = [
  {
    id: "memory",
    icon: Puzzle,
    emoji: "🧩",
    title: "Ghép đôi (Memory)",
    desc: "Lật thẻ ghép Hán → Việt, luyện trí nhớ",
    path: "/games/memory",
    color: "text-primary",
  },
  {
    id: "speed",
    icon: Zap,
    emoji: "⚡",
    title: "Tốc độ (Speed Quiz)",
    desc: "Chọn nghĩa đúng trong X giây, tốc độ tăng dần",
    path: "/games/speed",
    color: "text-warning",
  },
];

const GamesHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">Mini Games 🎮</h1>
          <p className="text-sm text-muted-foreground mt-1">Học mà chơi, chơi mà học</p>
        </div>

        <div className="space-y-3">
          {games.map((game, i) => (
            <motion.button
              key={game.id}
              onClick={() => navigate(game.path)}
              className="w-full bg-card rounded-2xl border border-border p-5 flex items-center gap-4 shadow-soft hover:shadow-soft-lg active:scale-[0.98] transition-all duration-300"
              whileHover={{ y: -3, x: 3 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl flex-shrink-0">
                {game.emoji}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-foreground">{game.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{game.desc}</p>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </motion.button>
          ))}
        </div>

        <div className="bg-primary/5 rounded-2xl p-5 border border-primary/20 text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <p className="text-sm text-muted-foreground">🔜 Sắp ra mắt: Xếp câu, Đuổi hình bắt chữ, Dictation...</p>
        </div>
      </div>
    </div>
  );
};

export default GamesHub;
