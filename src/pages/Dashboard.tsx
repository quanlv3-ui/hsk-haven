import { useNavigate } from "react-router-dom";
import { Flame, BookOpen, Target, PenTool, AlertTriangle, ArrowRight } from "lucide-react";
import { user, todayStats, recentActivities } from "@/data/mockData";
import ProgressBar from "@/components/shared/ProgressBar";
import { useState } from "react";

const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const streakDots = [true, true, true, true, true, true, true]; // 7 day streak

const quickActions = [
  { icon: BookOpen, label: "Học từ mới", path: "/study", color: "text-success" },
  { icon: Target, label: "Làm quiz", path: "/practice/quiz/setup", color: "text-easy" },
  { icon: PenTool, label: "Luyện viết", path: "/practice/writing", color: "text-primary" },
  { icon: AlertTriangle, label: "Điểm yếu", path: "/progress", color: "text-warning" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [showActivity, setShowActivity] = useState(false);
  const greeting = new Date().getHours() < 12 ? "Chào buổi sáng" : new Date().getHours() < 18 ? "Chào buổi chiều" : "Chào buổi tối";

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-6">
        {/* Greeting */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">{greeting}, {user.name}! 👋</h1>
        </div>

        {/* Hero card */}
        <div className="bg-gradient-to-br from-primary/90 to-primary rounded-2xl p-6 text-primary-foreground animate-fade-in" style={{ animationDelay: "0.05s" }}>
          <p className="text-sm opacity-80">Hôm nay bạn cần ôn</p>
          <p className="text-4xl font-extrabold mt-1">{todayStats.cardsDue} thẻ</p>
          <p className="text-sm opacity-80 mt-1">{todayStats.newCards} thẻ mới + {todayStats.cardsDue - todayStats.newCards} thẻ ôn lại · ~{todayStats.studyMinutes} phút</p>
          <button onClick={() => navigate("/study/flashcard")} className="mt-4 bg-card text-primary font-semibold px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity">
            Bắt đầu ôn tập <ArrowRight size={18} />
          </button>
        </div>

        {/* Streak + Progress */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Flame size={20} className="text-warning" /> {user.streakDays} ngày liên tiếp
            </div>
            <div className="flex gap-1.5 mt-3">
              {weekDays.map((d, i) => (
                <div key={d} className="flex flex-col items-center gap-1">
                  <div className={`w-5 h-5 rounded-full ${streakDots[i] ? "bg-warning" : "bg-muted"}`} />
                  <span className="text-[10px] text-muted-foreground">{d}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-4">
            <p className="text-sm font-semibold text-foreground">{user.level} — {45}%</p>
            <ProgressBar value={45} color="#8B5CF6" className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">{user.wordsLearned}/988 từ</p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          {quickActions.map(({ icon: Icon, label, path, color }) => (
            <button key={path} onClick={() => navigate(path)} className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3 hover:shadow-sm transition-shadow min-h-[56px]">
              <Icon size={20} className={color} />
              <span className="text-sm font-medium text-foreground">{label}</span>
            </button>
          ))}
        </div>

        {/* Recent activity */}
        <div className="bg-card rounded-2xl border border-border animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <button onClick={() => setShowActivity(!showActivity)} className="w-full p-4 flex items-center justify-between min-h-[44px]">
            <span className="text-sm font-semibold text-foreground">Hoạt động gần đây</span>
            <span className="text-xs text-muted-foreground">{showActivity ? "Ẩn" : "Hiện"}</span>
          </button>
          {showActivity && (
            <div className="px-4 pb-4 space-y-3">
              {recentActivities.map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-lg">{a.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
