import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Type, Layers, PenTool, MessageCircle, Map, Gamepad2, Headphones, GraduationCap, ChevronRight } from "lucide-react";

const sections = [
  {
    title: "Người mới bắt đầu 🌱",
    items: [
      { icon: Type, label: "Học Pinyin", desc: "Thanh điệu, phụ âm, nguyên âm", path: "/learn/pinyin", color: "text-success", badge: "Cơ bản" },
      { icon: Layers, label: "Bộ thủ (Radicals)", desc: "50 bộ thủ thường gặp nhất", path: "/learn/radicals", color: "text-easy", badge: "Cơ bản" },
      { icon: PenTool, label: "Tập viết chữ Hán", desc: "Stroke order từng nét", path: "/practice/writing", color: "text-primary", badge: "Cơ bản" },
    ],
  },
  {
    title: "Lộ trình học 📚",
    items: [
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

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">Khám phá 🌸</h1>
          <p className="text-sm text-muted-foreground mt-1">Chọn hình thức học phù hợp với bạn</p>
        </div>

        {sections.map((section, si) => (
          <div key={section.title} className="space-y-3 animate-fade-in" style={{ animationDelay: `${si * 0.08}s` }}>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{section.title}</h2>
            <div className="space-y-2">
              {section.items.map((item) => (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="w-full bg-card rounded-2xl border border-border p-4 flex items-center gap-4 shadow-soft hover:shadow-soft-lg active:scale-[0.98] transition-all duration-300"
                  whileHover={{ y: -2, x: 2 }}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
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
                  <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnHub;
