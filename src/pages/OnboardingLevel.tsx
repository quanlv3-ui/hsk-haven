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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg animate-fade-in">
        <p className="text-sm text-muted-foreground text-center">Bước 1/2</p>
        <h1 className="text-2xl font-bold text-foreground text-center mt-2">Bạn đang ở cấp độ nào?</h1>

        <div className="grid gap-3 mt-8">
          {options.map((o, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`bg-card rounded-2xl border-2 p-5 flex items-center gap-4 transition-all min-h-[72px] text-left ${selected === i ? "border-primary shadow-sm" : "border-border hover:border-muted-foreground/30"}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selected === i ? "bg-primary/10" : "bg-muted"}`}>
                <o.icon size={24} className={selected === i ? "text-primary" : "text-muted-foreground"} />
              </div>
              <div>
                <p className="font-semibold text-foreground">{o.title}</p>
                <p className="text-sm text-muted-foreground">{o.desc}</p>
              </div>
              {selected === i && <div className="ml-auto w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">✓</div>}
            </button>
          ))}
        </div>

        {selected !== null && (
          <button onClick={() => navigate("/onboarding/goal")} className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity min-h-[44px]">
            Tiếp tục
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingLevel;
