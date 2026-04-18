import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Type, Layers, PenTool, MessageCircle, Map, Gamepad2, Headphones, GraduationCap, ChevronRight, Lock, Sparkles, CheckCircle2, FolderHeart } from "lucide-react";
import { useBeginnerProgress } from "@/hooks/useBeginnerProgress";
import DailyWordsCard from "@/components/shared/DailyWordsCard";

const beginnerSteps = [
  { icon: Type, label: "Học Pinyin", desc: "Thanh điệu, phụ âm, nguyên âm", path: "/learn/pinyin", color: "text-primary" },
  { icon: Layers, label: "Bộ thủ", desc: "50 bộ thủ thường gặp nhất", path: "/learn/radicals", color: "text-primary" },
  { icon: PenTool, label: "Tập viết chữ Hán", desc: "Stroke order từng nét", path: "/practice/writing", color: "text-primary" },
  { icon: BookOpen, label: "Từ vựng cơ bản", desc: "20 chữ Hán đầu tiên cho người mới", path: "/learn/basic-vocab", color: "text-primary" },
];

const advancedSections = [
  {
    title: "Lộ trình học 📚",
    items: [
      { icon: FolderHeart, label: "Học theo chủ đề", desc: "Gia đình, đồ ăn, du lịch... 8 chủ đề", path: "/learn/topics", color: "text-primary", badge: "Mới ✨" },
      { icon: BookOpen, label: "Flashcard thông minh", desc: "SRS ôn tập theo chu kỳ", path: "/study", color: "text-primary" },
      { icon: GraduationCap, label: "Ngữ pháp", desc: "Cấu trúc câu theo cấp độ", path: "/learn/grammar", color: "text-warning" },
      { icon: MessageCircle, label: "Tình huống thực tế", desc: "Nhà hàng, du lịch, mua sắm...", path: "/learn/scenarios", color: "text-success" },
    ],
  },
  {
    title: "Luyện tập 💪",
    items: [
      { icon: Headphones, label: "Luyện nghe", desc: "Nghe từ & câu, chọn đáp án", path: "/practice/listening", color: "text-easy" },
      { icon: Gamepad2, label: "Mini Games", desc: "Ghép đôi, tốc độ, xếp câu", path: "/games", color: "text-destructive" },
      { icon: Map, label: "Thi thử HSK", desc: "Đề thi theo format HSK thật", path: "/exam/hsk", color: "text-primary", badge: "Hot 🔥" },
    ],
  },
];

const LearnHub = () => {
  const navigate = useNavigate();
  const { completedSteps, currentStep, progressPercent } = useBeginnerProgress();
  const isUnlocked = completedSteps.length >= beginnerSteps.length;

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-2xl font-bold text-foreground">Khám phá 🌸</h1>
          <p className="text-sm text-muted-foreground mt-1">Chọn hình thức học phù hợp với bạn</p>
        </motion.div>

        {/* Hero Card — Beginner Path */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 rounded-3xl border border-primary/20 p-5 shadow-soft"
        >
          <Sparkles className="absolute top-3 right-3 text-primary/20" size={48} />
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-bold text-foreground">Bắt đầu từ đây</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground">4 bước</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Hoàn thành lần lượt để mở khoá toàn bộ nội dung</p>

          {/* Progress bar */}
          <div className="h-2 rounded-full bg-muted mb-4 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="space-y-2">
            {beginnerSteps.map((step, i) => {
              const isDone = completedSteps.includes(i);
              const isCurrent = i === currentStep;
              const canClick = isCurrent || isDone; // Can click current or completed steps
              return (
                <motion.button
                  key={step.path}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => canClick && navigate(step.path)}
                  disabled={!canClick}
                  className={`w-full rounded-2xl p-3.5 flex items-center gap-3.5 transition-all duration-300 group disabled:cursor-not-allowed
                    ${isCurrent
                      ? "bg-primary/15 border-2 border-primary shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-[0.98]"
                      : isDone
                        ? "bg-card/60 border border-border/50 hover:shadow-md hover:-translate-y-1 active:scale-[0.98]"
                        : "bg-card/60 border border-border/50 opacity-60"
                    }
                    `}
                >
                  {/* Step icon */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300
                    ${isCurrent ? "bg-primary text-primary-foreground group-hover:scale-110" : "bg-muted text-muted-foreground"}`}>
                    <step.icon size={18} />
                  </div>

                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-semibold ${isCurrent ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground animate-pulse">
                          Làm trước
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                  </div>
                  <ChevronRight size={16} className={`flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${isCurrent ? "text-primary" : "text-muted-foreground/50"}`} />
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Advanced Sections — locked/unlocked */}
        {advancedSections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + si * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 relative"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{section.title}</h2>
              {!isUnlocked && (
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground/70 font-medium">
                  <Lock size={12} /> Mở khoá sau bước 1
                </span>
              )}
            </div>

            <div className={`space-y-2 transition-all duration-500 ${!isUnlocked ? "opacity-40 blur-[2px] pointer-events-none select-none" : ""}`}>
              {section.items.map((item) => (
                <button
                  key={item.path}
                  onClick={() => isUnlocked && navigate(item.path)}
                  disabled={!isUnlocked}
                  className="w-full bg-card rounded-2xl border border-border p-4 flex items-center gap-4 shadow-soft hover:shadow-xl hover:-translate-y-1.5 hover:border-primary/40 active:scale-[0.98] transition-all duration-300 group disabled:cursor-not-allowed"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    <item.icon size={22} className={item.color} />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{item.label}</p>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">{item.badge}</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                  {isUnlocked ? (
                    <ChevronRight size={16} className="text-muted-foreground flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                  ) : (
                    <Lock size={16} className="text-muted-foreground/50 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LearnHub;
