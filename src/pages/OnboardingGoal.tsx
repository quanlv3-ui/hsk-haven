import { useState } from "react";
import { useNavigate } from "react-router-dom";

const goals = [
  { words: "5 từ", desc: "Thư giãn", time: "~3 phút/ngày" },
  { words: "10 từ", desc: "Đều đặn", time: "~6 phút/ngày" },
  { words: "20 từ", desc: "Nghiêm túc", time: "~12 phút/ngày" },
  { words: "Tùy chỉnh", desc: "Bạn quyết định", time: "" },
];

const OnboardingGoal = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(1);
  const [custom, setCustom] = useState("");

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-orange-500/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="w-full max-w-xl animate-fade-in z-10">
        <p className="text-sm font-bold text-primary text-center tracking-widest uppercase mb-2">Bước 2/2</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground text-center mb-8">Mục tiêu hằng ngày của bạn? 🎯</h1>

        <div className="grid gap-4 mt-8">
          {goals.map((g, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`group bg-card rounded-3xl border-2 p-5 flex items-center justify-between hover:-translate-y-1 hover:shadow-soft-lg active:scale-[0.97] transition-all duration-300 min-h-[80px] text-left ${
                selected === i ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:border-primary/40"
              }`}
            >
              <div className="flex-1">
                <p className="font-bold text-foreground text-lg">{g.words}</p>
                <p className="text-sm text-muted-foreground">{g.desc}</p>
              </div>
              <div className="flex items-center gap-4">
                {g.time && <span className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1.5 rounded-lg group-hover:bg-primary/10 transition-colors">{g.time}</span>}
                {i === 3 && selected === 3 && (
                  <input
                    type="number"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-20 px-3 py-2 rounded-xl border-2 border-primary bg-background text-base font-bold text-primary text-center outline-none focus:ring-2 ring-primary/30"
                    placeholder="15"
                    min={1}
                    max={50}
                  />
                )}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${selected === i ? "border-primary bg-primary text-white" : "border-border"}`}>
                  {selected === i && <span>✓</span>}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 h-16">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 shadow-soft flex items-center justify-center gap-2"
          >
            Bắt đầu khám phá ngay! ✨
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingGoal;
