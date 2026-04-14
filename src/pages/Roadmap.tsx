import { useNavigate } from "react-router-dom";
import { Star, Lock, CheckCircle2, Play, BookOpen, Trophy } from "lucide-react";

// Mock data items for the roadmap
const roadmapNodes = [
  { id: 1, type: "concept", title: "Pinyin & Thanh điệu", desc: "Nền tảng phát âm", status: "completed", icon: "🗣️" },
  { id: 2, type: "concept", title: "Các nét cơ bản", desc: "Nhập môn viết chữ", status: "completed", icon: "✍️" },
  { id: 3, type: "lesson", title: "HSK 1 - Bài 1", desc: "Xin chào!", status: "current", icon: "👋" },
  { id: 4, type: "lesson", title: "HSK 1 - Bài 2", desc: "Hỏi tên & Quốc tịch", status: "locked", icon: "🌍" },
  { id: 5, type: "game", title: "Ghép từ thần tốc", desc: "Ôn tập Bài 1 & 2", status: "locked", icon: "⚡" },
  { id: 6, type: "lesson", title: "HSK 1 - Bài 3", desc: "Gia đình tôi", status: "locked", icon: "👨‍👩‍👧" },
  { id: 7, type: "exam", title: "Đánh giá HSK 1 Chặng 1", desc: "Thi thử mini", status: "locked", icon: "🏆" }
];

const Roadmap = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 bg-background overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border p-4 flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-foreground">Lộ trình học</h1>
        <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full border border-border">
          <span className="text-orange-500 font-bold">🔥 12</span>
          <span className="text-yellow-500 font-bold">⭐ 345</span>
        </div>
      </div>

      <div className="max-w-md mx-auto py-8 px-4 flex flex-col items-center relative">
        {/* Background vertical line */}
        <div className="absolute top-8 bottom-8 w-3 bg-muted rounded-full overflow-hidden left-1/2 -translate-x-1/2 -z-10 shadow-inner">
          <div className="w-full bg-primary" style={{ height: "35%" }}></div>
        </div>

        {roadmapNodes.map((node, i) => {
          const isCompleted = node.status === "completed";
          const isCurrent = node.status === "current";
          const isLocked = node.status === "locked";

          // Winding path effect: alternate left and right offset
          const offsetClass = i % 2 === 0 ? "max-md:translate-x-0 md:-translate-x-16" : "max-md:translate-x-0 md:translate-x-16";
          // We will use slight translation on mobile too to zig-zag
          const mobileOffset = i % 2 === 0 ? "-translate-x-10" : "translate-x-10";

          let btnColor = "bg-muted text-muted-foreground border-border";
          if (isCompleted) btnColor = "bg-success border-success-foreground text-primary-foreground";
          if (isCurrent) btnColor = "bg-primary border-primary-foreground text-primary-foreground ring-4 ring-primary/30 shadow-[0_0_20px_rgba(var(--primary),0.4)]";

          return (
            <div key={node.id} className={`relative flex flex-col items-center my-6 group cursor-pointer ${mobileOffset} ${offsetClass}`}
                 onClick={() => {
                   if (isLocked) return;
                   if (node.type === "concept") navigate("/learn/radicals"); // Example route
                   else if (node.type === "lesson") navigate("/study/flashcard");
                   else if (node.type === "game") navigate("/games/speed");
                   else if (node.type === "exam") navigate("/exam");
                 }}
            >
              {/* Tooltip-like popup for current node */}
              {isCurrent && (
                <div className="absolute -top-14 bg-background border-2 border-primary rounded-xl px-4 py-2 font-bold text-sm text-primary shadow-lg animate-bounce-slight whitespace-nowrap z-20">
                  Học tiếp nào!
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-background border-b-2 border-r-2 border-primary transform rotate-45"></div>
                </div>
              )}

              {/* Action Button Node */}
              <div className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center border-b-[6px] active:border-b-0 active:translate-y-[6px] transition-all duration-200 shadow-md ${btnColor}`}>
                {isCompleted ? <CheckCircle2 size={36} /> : isLocked ? <Lock size={32} /> : <Play size={36} className="ml-1" />}
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-lg border border-border">
                  {node.icon}
                </div>
              </div>

              {/* Node Title Details */}
              <div className="mt-3 text-center bg-card/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-border shadow-sm max-w-[200px]">
                <p className={`font-black text-sm uppercase ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>{node.title}</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">{node.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;
