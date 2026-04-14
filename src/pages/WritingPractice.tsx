import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { user } from "@/data/mockData";

const WritingPractice = () => {
  const navigate = useNavigate();
  const isLocked = (user.plan as string) !== "pro";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-4 flex items-center gap-3 border-b border-border">
        <button onClick={() => navigate(-1)} className="min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground">← Quay lại</button>
        <div className="flex-1">
          <span className="hanzi-small text-foreground">学</span>
          <span className="text-sm text-muted-foreground ml-2">xué · Học</span>
        </div>
        <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">Pro</span>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className={`w-full max-w-sm aspect-square border-2 border-dashed border-border rounded-2xl bg-card relative ${isLocked ? "blur-sm" : ""}`}>
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            <div className="border-r border-b border-border/30" />
            <div className="border-b border-border/30" />
            <div className="border-r border-border/30" />
            <div />
          </div>
        </div>

        {isLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm">
            <Lock size={32} className="text-muted-foreground" />
            <p className="text-lg font-semibold text-foreground mt-3">Tính năng Pro</p>
            <p className="text-sm text-muted-foreground mt-1">Nâng cấp để luyện viết chữ</p>
            <button onClick={() => navigate("/subscription")} className="mt-4 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm">Xem Pro</button>
          </div>
        )}
      </div>

      {!isLocked && (
        <div className="p-4 pb-8 flex gap-3 justify-center">
          {["▶ Xem animation", "Kiểm tra", "Xóa", "Gợi ý"].map((b) => (
            <button key={b} className="bg-card border border-border px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted hover:shadow-md hover:-translate-y-1 active:scale-95 transition-all duration-300">{b}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export default WritingPractice;
