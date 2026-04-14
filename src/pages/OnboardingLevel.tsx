import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, BookOpen, Target } from "lucide-react";

const options = [
  { icon: User, title: "Mới hoàn toàn", desc: "Tôi chưa biết tiếng Trung" },
  { icon: BookOpen, title: "Đã biết chút", desc: "Tôi đã học HSK 1-2 rồi" },
  { icon: Target, title: "Làm bài kiểm tra", desc: "Tự đánh giá chính xác hơn" },
];

const OnboardingLevel = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="w-full max-w-xl animate-fade-in z-10">
        <p className="text-sm font-bold text-primary text-center tracking-widest uppercase mb-2">Bước 1/2</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground text-center mb-8">Bạn đang ở cấp độ nào? 🤔</h1>

        <div className="grid gap-4 mt-8">
          {options.map((o, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`group bg-card rounded-3xl border-2 p-5 flex items-center gap-4 hover:-translate-y-1 hover:shadow-soft-lg active:scale-[0.97] transition-all duration-300 min-h-[80px] text-left ${
                selected === i ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:border-primary/40"
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 flex-shrink-0 ${selected === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"}`}>
                <o.icon size={28} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground text-lg">{o.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{o.desc}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selected === i ? "border-primary bg-primary text-white" : "border-border"}`}>
                {selected === i && <span>✓</span>}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 h-16">
          {selected !== null ? (
            <button
              onClick={() => navigate("/onboarding/goal")}
              className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 shadow-soft animate-fade-in flex items-center justify-center gap-2"
            >
              Tiếp tục 🚀
            </button>
          ) : (
            <button disabled className="w-full bg-muted text-muted-foreground py-4 rounded-2xl font-bold text-lg cursor-not-allowed opacity-50">
              Chọn 1 để tiếp tục
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingLevel;
