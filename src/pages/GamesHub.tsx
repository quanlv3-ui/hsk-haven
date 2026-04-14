import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, Zap, Puzzle, ChevronRight, Hammer, Lightbulb, Volume2 } from "lucide-react";

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
  {
    id: "assemble",
    icon: Hammer,
    emoji: "🔨",
    title: "Thợ Mộc Ghép Chữ",
    desc: "Ghép các bộ thủ nhỏ thành chữ Hán theo nguyên tắc Hội Ý",
    path: "/games/hanzi/assemble",
    color: "text-blue-500",
  },
  {
    id: "meaning",
    icon: Lightbulb,
    emoji: "💡",
    title: "Phản Xạ Bộ Thủ",
    desc: "Nhìn chữ hoặc bộ thủ và rèn luyện phản xạ nhanh ý nghĩa",
    path: "/games/hanzi/meaning",
    color: "text-amber-500",
  },
  {
    id: "phonetic",
    icon: Volume2,
    emoji: "🔊",
    title: "Bắt Mạch Hình Thanh",
    desc: "Khám phá bộ thủ mượn âm tạo ra phát âm cho chữ Hán",
    path: "/games/hanzi/phonetic",
    color: "text-emerald-500",
  },
  {
    id: "sentence",
    icon: Puzzle,
    emoji: "📝",
    title: "Xếp Câu (Thợ Xây Ngữ Pháp)",
    desc: "Sắp xếp từ Hán thành câu chuẩn ngữ pháp",
    path: "/games/sentence",
    color: "text-indigo-500",
  },
  {
    id: "picture",
    icon: Lightbulb,
    emoji: "🖼️",
    title: "Đuổi Hình Bắt Chữ",
    desc: "Nhìn hình đoán từ vựng tiếng Trung",
    path: "/games/picture",
    color: "text-pink-500",
  },
  {
    id: "dictation",
    icon: Volume2,
    emoji: "🎧",
    title: "Nghe Tã (Dictation)",
    desc: "Luyện nghe nói siêu tốc và nhận mặt chữ",
    path: "/games/dictation",
    color: "text-violet-500",
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

        <div className="space-y-3 pb-8">
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
      </div>
    </div>
  );
};

export default GamesHub;
