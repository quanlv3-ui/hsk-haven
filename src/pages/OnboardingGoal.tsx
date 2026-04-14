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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg animate-fade-in">
        <p className="text-sm text-muted-foreground text-center">Bước 2/2</p>
        <h1 className="text-2xl font-bold text-foreground text-center mt-2">Mỗi ngày bạn muốn học bao nhiêu từ?</h1>

        <div className="grid gap-3 mt-8">
          {goals.map((g, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`bg-card rounded-2xl border-2 p-4 flex items-center justify-between transition-all min-h-[56px] ${selected === i ? "border-primary" : "border-border"}`}
            >
              <div className="text-left">
                <p className="font-semibold text-foreground">{g.words}</p>
                <p className="text-sm text-muted-foreground">{g.desc}</p>
              </div>
              {g.time && <span className="text-xs text-muted-foreground">{g.time}</span>}
              {i === 3 && selected === 3 && (
                <input
                  type="number"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-16 px-2 py-1 rounded-lg border border-input bg-background text-sm text-foreground text-center"
                  placeholder="15"
                  min={1}
                  max={50}
                />
              )}
            </button>
          ))}
        </div>

        <button onClick={() => navigate("/dashboard")} className="w-full mt-8 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity min-h-[44px]">
          Bắt đầu học 🚀
        </button>
      </div>
    </div>
  );
};

export default OnboardingGoal;
