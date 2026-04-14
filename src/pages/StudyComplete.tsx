import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, BookOpen, Target, AlertTriangle } from "lucide-react";
import { user } from "@/data/mockData";

const confettiColors = ["#22C55E", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444", "#EC4899"];

const StudyComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Confetti */}
      {confettiColors.map((c, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-sm"
          style={{ backgroundColor: c, left: `${15 + i * 13}%`, top: "-10px" }}
          animate={{ y: ["0vh", "100vh"], rotate: [0, 720], opacity: [1, 0] }}
          transition={{ duration: 2.5 + i * 0.3, delay: i * 0.15, ease: "easeIn" }}
        />
      ))}

      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }} className="text-center max-w-md">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-foreground">Hoàn thành!</h1>
        
        <div className="flex justify-center gap-3 mt-6">
          {[{ label: "20 thẻ", icon: "📖" }, { label: "85% chính xác", icon: "🎯" }, { label: "8 phút", icon: "⏱" }].map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border px-4 py-2 text-center">
              <span className="text-lg">{s.icon}</span>
              <p className="text-sm font-semibold text-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-warning/10 text-warning rounded-xl px-4 py-3 text-sm font-medium">
          🔥 Streak {user.streakDays} ngày — tiếp tục ngày mai!
        </div>

        <div className="mt-8 space-y-3">
          {[
            { icon: BookOpen, label: "Học 5 từ mới", path: "/study/flashcard" },
            { icon: Target, label: "Làm quiz HSK 3", path: "/practice/quiz/setup" },
            { icon: AlertTriangle, label: "Xem từ hay quên", path: "/progress" },
          ].map(({ icon: Icon, label, path }) => (
            <button key={path} onClick={() => navigate(path)} className="w-full bg-card rounded-xl border border-border p-4 flex items-center gap-3 hover:shadow-sm transition-shadow">
              <Icon size={20} className="text-primary" />
              <span className="text-sm font-medium text-foreground">{label}</span>
            </button>
          ))}
        </div>

        <button onClick={() => navigate("/dashboard")} className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mx-auto">
          <Home size={16} /> Về trang chủ
        </button>

        {user.plan === "free" && (
          <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm">
            <p className="font-semibold text-foreground">Bạn đã hoàn thành HSK 3! 🎉</p>
            <p className="text-muted-foreground mt-1">Khám phá HSK 4 với Plus plan</p>
            <button onClick={() => navigate("/subscription")} className="mt-3 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">Xem Plus</button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default StudyComplete;
