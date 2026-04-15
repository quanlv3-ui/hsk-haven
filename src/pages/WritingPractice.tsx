import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, Play, Eye, EyeOff, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { strokeData } from "@/data/mockData";
import { useBeginnerProgress } from "@/hooks/useBeginnerProgress";

const characters = ["大", "人", "中"]; // Characters to practice

// Load HanziWriter CDN (used for animation)
declare global {
  interface Window {
    HanziWriter: any;
  }
}

const WritingPractice = () => {
  const navigate = useNavigate();
  const { completeStep } = useBeginnerProgress();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const writerContainerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<any>(null);
  const referenceCanvasRef = useRef<HTMLCanvasElement>(null);
  const [charIndex, setCharIndex] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const [currentStroke, setCurrentStroke] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [practiced, setPracticed] = useState<Set<number>>(new Set());
  const [animating, setAnimating] = useState(false);
  const [validated, setValidated] = useState<Set<number>>(new Set());
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const lastPosRef = useRef({ x: 0, y: 0, time: 0 });

  const char = characters[charIndex];
  const data = strokeData[char];

  // Load HanziWriter CDN once
  useEffect(() => {
    if (!window.HanziWriter && !document.getElementById('hanzi-writer-script')) {
      const script = document.createElement("script");
      script.id = 'hanzi-writer-script';
      script.src = "https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

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

    // Set canvas size to match display
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    clearCanvas();
  }, [charIndex]);

  // Animate strokes using HanziWriter
  const animateStrokes = () => {
    if (animating) return;
    setAnimating(true);

    // Clear existing writer if any
    if (writerContainerRef.current) {
      writerContainerRef.current.innerHTML = '';
    }

    // Wait for HanziWriter to load
    const checkAndAnimate = () => {
      if (!window.HanziWriter || !writerContainerRef.current) {
        setTimeout(checkAndAnimate, 100);
        return;
      }

      writerRef.current = window.HanziWriter.create(writerContainerRef.current, char, {
        width: 300,
        height: 300,
        padding: 20,
        strokeColor: '#0f172a',
        outlineColor: '#e2e8f0',
        drawingColor: '#2563eb',
        showOutline: true,
        delayBetweenStrokes: 300,
        strokeAnimationSpeed: 1,
      });

      writerRef.current.animateCharacter({
        onComplete: () => {
          setAnimating(false);
        },
      });
    };

    checkAndAnimate();
  };

  // Free drawing with calligraphic brush (thick/thin based on stroke direction)
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
    lastPosRef.current = { x, y, time: Date.now() };
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const { x, y } = getPos(e);
    const lastPos = lastPosRef.current;
    
    // Calculate stroke direction (angle)
    const dx = x - lastPos.x;
    const dy = y - lastPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 0.5) return; // Skip very short movements
    
    // Calligraphic effect: angle determines stroke thickness
    // Horizontal/Vertical strokes = thick
    // Diagonal strokes = thin
    const angle = Math.atan2(dy, dx);
    
    // Map angle to thickness:
    // Horizontal (0°, 180°) -> thick
    // Vertical (90°, 270°) -> thick
    // Diagonal (45°, 135°, 225°, 315°) -> thin
    const normalizedAngle = Math.abs(angle % Math.PI); // 0 to PI
    const diagonalness = Math.abs(Math.sin(normalizedAngle * 2)); // 0 = aligned, 1 = diagonal
    
    const minWidth = 2;
    const maxWidth = 12;
    const lineWidth = minWidth + (maxWidth - minWidth) * (1 - diagonalness);
    
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "hsl(var(--foreground))";
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
    
    lastPosRef.current = { x, y, time: Date.now() };
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  // Normalize drawing to bounding box and resample to grid for shape comparison
  const normalizeDrawing = (imageData: ImageData): boolean[][] => {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    let minX = width, maxX = 0, minY = height, maxY = 0;

    // Find bounding box of drawn pixels
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] > 50) {
        const pixelIdx = i / 4;
        const x = pixelIdx % width;
        const y = Math.floor(pixelIdx / width);
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }

    if (minX > maxX || minY > maxY) {
      return Array(16).fill(null).map(() => Array(16).fill(false));
    }

    // Resample to 16x16 grid
    const gridSize = 16;
    const grid: boolean[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));
    const cellW = (maxX - minX + 1) / gridSize;
    const cellH = (maxY - minY + 1) / gridSize;

    for (let i = 3; i < data.length; i += 4) {
      if (data[i] > 50) {
        const pixelIdx = i / 4;
        const x = pixelIdx % width;
        const y = Math.floor(pixelIdx / width);
        
        const gridX = Math.floor((x - minX) / cellW);
        const gridY = Math.floor((y - minY) / cellH);
        
        if (gridX >= 0 && gridX < gridSize && gridY >= 0 && gridY < gridSize) {
          grid[gridY][gridX] = true;
        }
      }
    }

    return grid;
  };

  // Validate character drawing against template (shape-based, size-independent)
  const validateCharacter = () => {
    const canvas = canvasRef.current;
    if (!canvas) return false;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return false;

    // Create reference canvas with template character
    const refCanvas = referenceCanvasRef.current || document.createElement("canvas");
    if (!referenceCanvasRef.current) {
      referenceCanvasRef.current = refCanvas;
    }
    refCanvas.width = canvas.width;
    refCanvas.height = canvas.height;
    
    const refCtx = refCanvas.getContext("2d");
    if (!refCtx) return false;

    // Draw reference character
    refCtx.clearRect(0, 0, refCanvas.width, refCanvas.height);
    refCtx.font = `${Math.min(refCanvas.width, refCanvas.height) * 0.7}px sans-serif`;
    refCtx.textAlign = "center";
    refCtx.textBaseline = "middle";
    refCtx.fillStyle = "#000";
    refCtx.fillText(char, refCanvas.width / 2, refCanvas.height / 2);

    // Get image data and normalize
    const userImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const refImageData = refCtx.getImageData(0, 0, refCanvas.width, refCanvas.height);
    
    const userGrid = normalizeDrawing(userImageData);
    const refGrid = normalizeDrawing(refImageData);

    // Compare grids
    let matchCount = 0;
    let userCount = 0;
    let refCount = 0;

    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const userCell = userGrid[y][x];
        const refCell = refGrid[y][x];
        
        if (userCell) userCount++;
        if (refCell) refCount++;
        if (userCell && refCell) matchCount++;
      }
    }

    // Calculate metrics on shape similarity (not size)
    const shapeOverlap = refCount > 0 ? matchCount / refCount : 0; // How much of template shape is covered
    const cleanliness = userCount > 0 ? matchCount / userCount : 0; // How many of user's cells match template
    
    // Require:
    // - At least 45% of template shape covered
    // - At least 35% of user's drawing matches template
    const isValid = shapeOverlap >= 0.45 && cleanliness >= 0.35;

    if (isValid) {
      setValidated((prev) => new Set(prev).add(charIndex));
      setValidationMessage("✓ Tuyệt vời!");
      setTimeout(() => setValidationMessage(null), 2000);
    } else {
      const overlapPercent = Math.round(shapeOverlap * 100);
      const cleanPercent = Math.round(cleanliness * 100);
      setValidationMessage(`✏️ Vẽ gần như vậy! (${overlapPercent}% - ${cleanPercent}%)`);
      setTimeout(() => setValidationMessage(null), 2000);
    }

    return isValid;
  };

  const nextCharacter = () => {
    if (charIndex < characters.length - 1) {
      setCharIndex(charIndex + 1);
      clearCanvas();
      setValidationMessage(null);
    }
  };

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
          {/* Animation Container (HanziWriter) */}
          <div
            ref={writerContainerRef}
            className="absolute inset-0 flex items-center justify-center z-20 bg-card rounded-2xl"
            style={{ display: animating ? 'flex' : 'none' }}
          />

          {/* Free drawing Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full rounded-2xl bg-card border-2 border-border relative z-10 touch-none cursor-crosshair"
            style={{ display: animating ? 'none' : 'block' }}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={endDraw}
          />

          {/* Grid guide (only show on free draw canvas) */}
          {!animating && showGuide && (
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 border-2 border-dashed border-primary/40 rounded-2xl pointer-events-none z-0">
              <div className="border-r border-b border-dashed border-primary/30" />
              <div className="border-b border-dashed border-primary/30" />
              <div className="border-r border-dashed border-primary/30" />
              <div />
            </div>
          )}
          {/* Ghost character (only show on free draw canvas) */}
          {!animating && showGuide && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <span className="text-[160px] font-bold text-primary/25 select-none">{char}</span>
            </div>
          )}
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
        </div>

        {/* Validation status */}
        <div className="text-center space-y-2">
          {validationMessage && (
            <motion.div
              key={validationMessage}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`text-sm font-medium ${validationMessage.includes("✓") ? "text-success" : "text-warning"}`}
            >
              {validationMessage}
            </motion.div>
          )}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={validateCharacter}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg hover:-translate-y-1 active:scale-95 transition-all"
            >
              Kiểm tra
            </button>
            {validated.has(charIndex) && charIndex < characters.length - 1 && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={nextCharacter}
                className="flex items-center gap-2 bg-success/10 text-success px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-success/20 active:scale-95 transition-all"
              >
                <ChevronRight size={16} /> Tiếp theo
              </motion.button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Chữ: {charIndex + 1}/{characters.length}
          </p>
        </div>

        {/* Complete */}
        {validated.size === characters.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center pt-2"
          >
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
