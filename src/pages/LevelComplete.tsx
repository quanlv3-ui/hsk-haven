import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const confettiColors = ["#22C55E", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444", "#EC4899", "#6366F1"];

const LevelComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {confettiColors.map((c, i) => (
        <motion.div key={i} className="absolute w-3 h-3 rounded-full" style={{ backgroundColor: c, left: `${10 + i * 12}%`, top: "-10px" }}
          animate={{ y: ["0vh", "110vh"], rotate: [0, 720], opacity: [1, 0] }}
          transition={{ duration: 3 + i * 0.2, delay: i * 0.1, ease: "easeIn" }}
        />
      ))}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-center max-w-md">
        <div className="w-24 h-24 rounded-full bg-[hsl(258,90%,66%)] mx-auto flex items-center justify-center text-4xl text-white">🎉</div>
        <h1 className="text-2xl font-bold text-foreground mt-6">HSK 3 hoàn thành!</h1>
        <p className="text-muted-foreground mt-2">Bạn đã học 491 từ trong 23 ngày</p>

        <div className="mt-8 bg-card rounded-2xl border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground">Bước tiếp theo: HSK 4 — Intermediate</h3>
          <div className="flex justify-center gap-4 mt-4">
            {["经济", "环境", "发展"].map((w) => (
              <span key={w} className="text-2xl font-hanzi text-foreground/30 blur-[2px]">{w}</span>
            ))}
          </div>
          <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">Plus</span>
        </div>

        <div className="mt-6 space-y-3">
          <button onClick={() => navigate("/subscription")} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold">Mở khóa HSK 4 — Dùng thử Plus</button>
          <button onClick={() => navigate("/dashboard")} className="w-full border border-border text-foreground py-3 rounded-xl font-semibold text-sm">Về Dashboard</button>
          <button className="text-sm text-primary font-medium">Chia sẻ thành tích</button>
        </div>
      </motion.div>
    </div>
  );
};

export default LevelComplete;
