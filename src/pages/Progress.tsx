import { user } from "@/data/mockData";
import ProgressBar from "@/components/shared/ProgressBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const heatmapData = Array.from({ length: 91 }, (_, i) => Math.random() > 0.3 ? Math.floor(Math.random() * 4) : 0);
const intensities = ["bg-muted", "bg-success/20", "bg-success/40", "bg-success/70", "bg-success"];

const Progress = () => {
  const navigate = useNavigate();
  const [showSRS, setShowSRS] = useState(false);

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-6">
        <div className="animate-fade-in">
          <p className="text-4xl font-extrabold text-foreground">{user.wordsLearned} <span className="text-lg font-normal text-muted-foreground">từ đã học</span></p>
          <div className="flex items-center gap-3 mt-2">
            <span className="bg-success/10 text-success text-sm font-semibold px-3 py-1 rounded-full">↑ {user.wordsThisWeek} từ so với tuần trước</span>
            <span className="text-sm text-muted-foreground">Chính xác {user.accuracy}% · {user.streakDays} ngày streak 🔥</span>
          </div>
        </div>

        {/* Heatmap */}
        <div className="bg-card rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold text-foreground mb-3">Hoạt động 90 ngày</h2>
          <div className="grid grid-cols-[repeat(13,1fr)] gap-1">
            {heatmapData.map((v, i) => (
              <div key={i} className={`w-full aspect-square rounded-sm ${intensities[v]}`} />
            ))}
          </div>
        </div>

        {/* Words by Level */}
        <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Từ theo cấp độ</h2>
          {[
            { label: "HSK 1", current: 300, total: 300, color: "#22C55E" },
            { label: "HSK 2", current: 150, total: 197, color: "#3B82F6" },
            { label: "HSK 3", current: 100, total: 491, color: "#8B5CF6" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-3">
              <span className="text-xs font-semibold text-foreground w-12">{l.label}</span>
              <div className="flex-1"><ProgressBar value={l.current} max={l.total} color={l.color} /></div>
              <span className="text-xs text-muted-foreground w-20 text-right">{l.current}/{l.total} ({Math.round(l.current / l.total * 100)}%)</span>
            </div>
          ))}
        </div>

        {/* SRS Stats */}
        <div className="bg-card rounded-2xl border border-border">
          <button onClick={() => setShowSRS(!showSRS)} className="w-full p-4 flex justify-between items-center min-h-[44px]">
            <span className="text-sm font-semibold text-foreground">SRS Stats</span>
            <span className="text-xs text-muted-foreground">{showSRS ? "Ẩn" : "Hiện"}</span>
          </button>
          {showSRS && (
            <div className="px-4 pb-4 grid grid-cols-2 gap-3">
              {[{ label: "Đến hạn hôm nay", value: "20" }, { label: "Đang học", value: "150" }, { label: "Thành thạo", value: "300" }, { label: "Interval TB", value: "12 ngày" }].map((s) => (
                <div key={s.label} className="bg-muted rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Weak words */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Điểm yếu — từ hay quên</h2>
          {[
            { hanzi: "旅游", accuracy: 40 },
            { hanzi: "健康", accuracy: 55 },
            { hanzi: "学习", accuracy: 60 },
          ].map((w) => (
            <div key={w.hanzi} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
              <span className="hanzi-small text-foreground">{w.hanzi}</span>
              <span className="text-sm text-muted-foreground flex-1">Chính xác {w.accuracy}%</span>
              <button onClick={() => navigate("/study/flashcard")} className="text-sm font-semibold text-primary">Ôn ngay</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;
