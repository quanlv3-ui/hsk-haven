import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, Play, Eye, EyeOff, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { strokeData } from "@/data/mockData";
import { useBeginnerProgress } from "@/hooks/useBeginnerProgress";

const characters = Object.keys(strokeData); // 大, 人, 中

const WritingPractice = () => {
  const navigate = useNavigate();
  const { completeStep } = useBeginnerProgress();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [charIndex, setCharIndex] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const [currentStroke, setCurrentStroke] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [practiced, setPracticed] = useState<Set<number>>(new Set());
  const [animating, setAnimating] = useState(false);

  const char = characters[charIndex];
  const data = strokeData[char];

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCurrentStroke(0);
  };

  // Draw guide lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    clearCanvas();
  }, [charIndex]);

  // Animate strokes
  const animateStrokes = () => {
    if (animating || !data) return;
    setAnimating(true);
    clearCanvas();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width / 2;
    const h = canvas.height / 2;
    const scale = Math.min(w, h) / 800;

    let strokeIdx = 0;
    const drawNext = () => {
      if (strokeIdx >= data.medians.length) {
        setAnimating(false);
        setCurrentStroke(data.medians.length);
        return;
      }

      const points = data.medians[strokeIdx];
      ctx.beginPath();
      ctx.strokeStyle = "hsl(var(--primary))";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      let ptIdx = 0;
      const animPt = () => {
        if (ptIdx >= points.length) {
          strokeIdx++;
          setTimeout(drawNext, 300);
          return;
        }
        const [x, y] = points[ptIdx];
        if (ptIdx === 0) ctx.moveTo(x * scale, y * scale);
        else ctx.lineTo(x * scale, y * scale);
        ctx.stroke();
        ptIdx++;
        requestAnimationFrame(animPt);
      };
      animPt();
    };
    drawNext();
  };

  // Free drawing
  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  };

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x * 2, y * 2);
    ctx.strokeStyle = "hsl(var(--foreground))";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x * 2, y * 2);
    ctx.stroke();
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  const markPracticed = () => {
    setPracticed((prev) => new Set(prev).add(charIndex));
  };

  const allPracticed = practiced.size >= characters.length;

  const handleComplete = () => {
    completeStep(2); // step index 2 = writing
    navigate("/learn");
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-lg py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/learn")} className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-muted transition-colors">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Tập viết chữ Hán</h1>
            <p className="text-xs text-muted-foreground">Luyện nét cơ bản</p>
          </div>
          <span className="text-sm font-semibold text-primary">{practiced.size}/{characters.length}</span>
        </div>

        {/* Character selector */}
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => setCharIndex(Math.max(0, charIndex - 1))} disabled={charIndex === 0} className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-card border border-border hover:bg-muted disabled:opacity-30 transition-all active:scale-95">
            <ChevronLeft size={20} />
          </button>
          <motion.div key={char} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
            <span className="text-5xl font-bold text-foreground">{char}</span>
            <span className="block text-xs text-muted-foreground mt-1">Nét: {data?.strokes.length || "?"}</span>
          </motion.div>
          <button onClick={() => setCharIndex(Math.min(characters.length - 1, charIndex + 1))} disabled={charIndex === characters.length - 1} className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-card border border-border hover:bg-muted disabled:opacity-30 transition-all active:scale-95">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Canvas area */}
        <div className="relative aspect-square max-w-sm mx-auto">
          {/* Grid guide */}
          {showGuide && (
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 border-2 border-dashed border-primary/20 rounded-2xl pointer-events-none z-0">
              <div className="border-r border-b border-dashed border-primary/10" />
              <div className="border-b border-dashed border-primary/10" />
              <div className="border-r border-dashed border-primary/10" />
              <div />
            </div>
          )}
          {/* Ghost character */}
          {showGuide && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <span className="text-[160px] font-bold text-primary/10 select-none">{char}</span>
            </div>
          )}
          <canvas
            ref={canvasRef}
            className="w-full h-full rounded-2xl bg-card border-2 border-border relative z-10 touch-none cursor-crosshair"
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={endDraw}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button onClick={animateStrokes} disabled={animating} className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/20 active:scale-95 transition-all disabled:opacity-50">
            <Play size={16} /> Xem animation
          </button>
          <button onClick={clearCanvas} className="flex items-center gap-2 bg-card border border-border px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted active:scale-95 transition-all">
            <RotateCcw size={16} /> Xoá
          </button>
          <button onClick={() => setShowGuide(!showGuide)} className="flex items-center gap-2 bg-card border border-border px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted active:scale-95 transition-all">
            {showGuide ? <EyeOff size={16} /> : <Eye size={16} />}
            {showGuide ? "Ẩn gợi ý" : "Hiện gợi ý"}
          </button>
          <button onClick={markPracticed} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium active:scale-95 transition-all ${practiced.has(charIndex) ? "bg-success/20 text-success" : "bg-warning/10 text-warning hover:bg-warning/20"}`}>
            {practiced.has(charIndex) ? "Đã luyện ✓" : "Đánh dấu đã luyện"}
          </button>
        </div>

        {/* Complete */}
        {allPracticed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-2">
            <button onClick={handleComplete} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300">
              <Sparkles size={18} /> Hoàn thành bước 3
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WritingPractice;
