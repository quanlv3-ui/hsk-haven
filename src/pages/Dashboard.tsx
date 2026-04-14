import { useNavigate } from "react-router-dom";
import { Flame, BookOpen, Target, PenTool, AlertTriangle, ArrowRight, Sparkles, Trophy, Users, Star, Medal } from "lucide-react";
import { user, todayStats, recentActivities } from "@/data/mockData";
import ProgressBar from "@/components/shared/ProgressBar";
import { useState } from "react";

const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const streakDots = [true, true, true, true, true, true, true];

const quickActions = [
  { icon: BookOpen, label: "Học từ mới", path: "/study", color: "text-success" },
  { icon: Target, label: "Làm quiz", path: "/practice/quiz/setup", color: "text-easy" },
  { icon: PenTool, label: "Luyện viết", path: "/practice/writing", color: "text-primary" },
  { icon: AlertTriangle, label: "Điểm yếu", path: "/progress", color: "text-warning" },
];

const friends = [
  { name: "Mai Anh", level: "HSK 3", avatar: "MA", isOnline: true },
  { name: "Minh Đức", level: "HSK 4", avatar: "MĐ", isOnline: false },
  { name: "Bảo Ngọc", level: "HSK 2", avatar: "BN", isOnline: true },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [showActivity, setShowActivity] = useState(false);
  const greeting = new Date().getHours() < 12 ? "Chào buổi sáng" : new Date().getHours() < 18 ? "Chào buổi chiều" : "Chào buổi tối";

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Container 7xl (Cực rộng) và Grid 12 cột cho Layout 3 cột */}
      <div className="container max-w-7xl mx-auto py-6 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-8 space-y-6 lg:space-y-0">
        
        {/* ================= CỘT TRÁI (Profile & Social - 3 cột) ================= */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Card */}
          <div className="bg-card rounded-3xl border border-border p-6 shadow-soft text-center relative overflow-hidden animate-fade-in group hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/30 to-[#ff6b9d]/20"></div>
            <div className="relative mx-auto w-24 h-24 rounded-full bg-white p-1 shadow-md mb-4 mt-4 transition-transform duration-500 group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center border-2 border-dashed border-primary/40 group-hover:border-primary/60 transition-colors">
                <span className="text-4xl text-primary animate-bounce-slight">🐱</span>
              </div>
              <div className="absolute -bottom-2 right-0 bg-warning text-warning-foreground text-xs font-black px-3 py-1 rounded-full border-2 border-background shadow-sm">
                Lvl. 12
              </div>
            </div>
            <h2 className="text-xl font-extrabold text-foreground">{user.name}</h2>
            <p className="text-primary font-bold text-sm mb-5 opacity-90">{user.level}</p>
            <div className="flex justify-center gap-6 items-center bg-muted/40 rounded-2xl p-4 border border-border/50">
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Đang theo dõi</p>
                <p className="font-black text-foreground text-lg">128</p>
              </div>
              <div className="w-[1px] h-10 bg-border"></div>
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Người theo dõi</p>
                <p className="font-black text-foreground text-lg">342</p>
              </div>
            </div>
          </div>

          {/* Social / Friends */}
          <div className="bg-card rounded-3xl border border-border p-5 shadow-soft hidden lg:block animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Users size={18} className="text-primary" /> Bạn bè đang học
            </h3>
            <div className="space-y-4">
              {friends.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-xl cursor-pointer transition-colors">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {f.avatar}
                    </div>
                    {f.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card"></div>}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.level}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= CỘT GIỮA (Main Feed/Action - 6 cột) ================= */}
        <div className="lg:col-span-6 space-y-6">
          {/* Greeting */}
          <div className="animate-fade-in bg-card border border-border rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-foreground">{greeting}!</h1>
              <p className="text-muted-foreground mt-1">Sẵn sàng để chinh phục bài học hôm nay chưa?</p>
            </div>
            <span className="text-4xl animate-float">👋</span>
          </div>

          {/* Hero card - Thẻ chính */}
          <div
            className="relative overflow-hidden bg-gradient-to-br from-primary to-[#ff6b9d] rounded-[2.5rem] p-8 text-primary-foreground shadow-glow animate-fade-in"
            style={{ animationDelay: "0.05s" }}
          >
            <div className="absolute top-4 right-4 opacity-30">
              <Sparkles size={80} />
            </div>
            <div className="absolute -bottom-6 -right-6 opacity-20">
              <Target size={120} />
            </div>
            
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/30">
              Nhiệm vụ ưu tiên
            </span>
            <p className="text-5xl font-black mt-1 mb-2 tracking-tight">{todayStats.cardsDue} thẻ</p>
            <p className="text-base opacity-90 font-medium mb-8">
              {todayStats.newCards} thẻ mới + {todayStats.cardsDue - todayStats.newCards} thẻ ôn lại · ~{todayStats.studyMinutes} phút
            </p>
            
            <button
              onClick={() => navigate("/study/flashcard")}
              className="bg-background text-primary font-bold px-8 py-4 rounded-2xl flex items-center gap-3 shadow-soft hover:shadow-xl active:scale-[0.97] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto justify-center text-lg"
            >
              Bắt đầu học ngay <ArrowRight size={22} className="animate-pulse" />
            </button>
          </div>

          {/* Quick actions (Lưới chức năng) */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: "0.15s" }}>
            {quickActions.map(({ icon: Icon, label, path, color }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="bg-card rounded-3xl border border-border p-5 flex items-center gap-4 shadow-soft hover:shadow-soft-lg active:scale-[0.97] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Icon size={24} className={color} />
                </div>
                <div className="text-left">
                  <span className="block font-bold text-foreground">{label}</span>
                  <span className="block text-xs text-muted-foreground mt-0.5">Bấm để học</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ================= CỘT PHẢI (Stats & Gamification - 3 cột) ================= */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* League / Rank */}
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-5 shadow-lg text-white animate-fade-in group hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Trophy size={20} className="text-yellow-100" />
              </div>
              <div>
                <p className="text-xs font-bold text-orange-100 uppercase">Giải đấu</p>
                <p className="font-black text-lg">Bạch Kim</p>
              </div>
            </div>
            <div className="bg-black/20 rounded-xl p-3 flex justify-between items-center backdrop-blur-sm">
              <span className="text-sm font-medium">Hạng 4</span>
              <span className="text-sm font-bold flex items-center gap-1"><ArrowRight size={14}/> Lên Ruby</span>
            </div>
          </div>

          {/* Streak */}
          <div className="bg-card rounded-3xl border border-border p-5 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">Chuỗi ngày (Streak)</h3>
              <div className="flex items-center gap-1 font-black text-warning bg-warning/10 px-3 py-1 rounded-full">
                <Flame size={16} /> {user.streakDays}
              </div>
            </div>
            <div className="flex justify-between mt-2">
              {weekDays.map((d, i) => (
                <div key={d} className="flex flex-col items-center gap-1.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${streakDots[i] ? "bg-warning shadow-sm text-white" : "bg-muted text-muted-foreground"}`}>
                    {streakDots[i] && <Flame size={14} />}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-card rounded-3xl border border-border p-5 shadow-soft hover:shadow-soft-lg transition-all duration-300">
            <div className="flex justify-between items-end mb-2">
              <p className="text-sm font-bold text-foreground uppercase tracking-wider">{user.level}</p>
              <p className="font-black text-primary text-xl">45%</p>
            </div>
            <ProgressBar value={45} color="var(--primary)" className="h-3 my-3" />
            <p className="text-xs text-muted-foreground font-medium text-center">Đã học {user.wordsLearned} / 988 từ</p>
          </div>

          {/* Daily Quests */}
          <div className="bg-card rounded-3xl border border-border shadow-soft animate-fade-in hover:shadow-soft-lg transition-all" style={{ animationDelay: "0.2s" }}>
            <div className="p-5 border-b border-border">
               <h3 className="font-bold text-foreground flex items-center gap-2">
                <Medal size={18} className="text-warning" /> Nhiệm vụ hôm nay
              </h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-4 border-primary/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent origin-center rotate-45"></div>
                  <Star size={14} className="text-primary"/>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">Học 20 từ mới</p>
                  <p className="text-xs text-muted-foreground mt-0.5">14/20 từ</p>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <div className="w-10 h-10 rounded-full border-4 border-muted flex items-center justify-center">
                  <Target size={14} className="text-muted-foreground"/>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">Làm 1 bài Quiz</p>
                  <p className="text-xs text-muted-foreground mt-0.5">0/1 bài</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
