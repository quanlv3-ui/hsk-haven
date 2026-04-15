import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Search, BookOpen, LibraryBig, PenTool, Lightbulb, Network, Puzzle, Volume2, Gamepad2, CheckCircle2, XCircle, RotateCcw, Trophy, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { radicals, phoneticMatrices, ideogramEquations } from "@/data/mockData";
import { useBeginnerProgress } from "@/hooks/useBeginnerProgress";

// Simple wrapper to load CDN hanzi-writer and render animated strokes
const AnimatedHanzi = ({ character, size = 48 }: { character: string, size?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initWriter = () => {
      try {
        // @ts-ignore
        if (mounted && containerRef.current && window.HanziWriter && !writerRef.current && !hasError) {
          // Clear any existing SVGs from previous characters
          containerRef.current.innerHTML = '';
          
          // @ts-ignore
          writerRef.current = window.HanziWriter.create(containerRef.current, character, {
            width: size,
            height: size,
            padding: 2,
            strokeColor: '#0f172a',
            outlineColor: '#e2e8f0',
            drawingColor: '#2563eb',
            showOutline: true,
            delayBetweenStrokes: 100,
            onLoadCharDataError: function() {
              if (mounted) setHasError(true);
            }
          });
        }
      } catch (err) {
        console.warn("HanziWriter initialization error:", err);
        if (mounted) setHasError(true);
      }
    };

    // @ts-ignore
    if (!window.HanziWriter && !hasError) {
      if (!document.getElementById('hanzi-writer-script')) {
        const script = document.createElement("script");
        script.id = 'hanzi-writer-script';
        script.src = "https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js";
        script.async = true;
        document.head.appendChild(script);
      }
      
      const checkInterval = setInterval(() => {
        // @ts-ignore
        if (window.HanziWriter) {
          clearInterval(checkInterval);
          initWriter();
        }
      }, 100);

      return () => {
        mounted = false;
        clearInterval(checkInterval);
        if (writerRef.current) {
          writerRef.current = null;
        }
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      };
    } else {
      initWriter();
    }

    return () => {
      mounted = false;
      if (writerRef.current) {
        writerRef.current = null;
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [character, size, hasError]);

  useEffect(() => {
    if (isHovered && writerRef.current) {
      writerRef.current.animateCharacter();
    }
  }, [isHovered]);

  if (hasError) {
    return (
      <div className="flex items-center justify-center p-2 rounded-xl" style={{ width: size, height: size }}>
        <span className="hanzi-display leading-none" style={{ fontSize: size * 0.8, color: '#0f172a' }}>{character}</span>
      </div>
    );
  }

  return (
    <div 
      className="cursor-pointer flex items-center justify-center p-2 rounded-xl hover:bg-primary/5 transition-colors relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: size + 16, height: size + 16 }}
    >
      <div ref={containerRef}></div>
    </div>
  );
};


const categories = ["Tất cả", "Con người", "Cơ thể", "Tự nhiên", "Vật liệu", "Giao tiếp", "Hành động", "Đời sống"];

const RadicalsLearn = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"guide" | "assemble" | "matrix" | "dictionary" | "practice">("guide");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = radicals.filter((r) => {

    const matchSearch = !search || r.radical.includes(search) || r.meaning.includes(search) || r.pinyin.includes(search);
    const matchCat = activeCategory === "Tất cả" || r.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-6xl py-6 space-y-5 mx-auto">
        <div className="flex items-center gap-3 animate-fade-in">
          <button onClick={() => navigate("/learn")} className="min-w-[44px] min-h-[44px] rounded-xl hover:bg-muted flex items-center justify-center transition-all duration-300 active:scale-95">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Chữ Hán & Bộ thủ</h1>
            <p className="text-sm text-muted-foreground">Hiểu cấu tạo mặt chữ tiếng Trung</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-muted rounded-2xl animate-fade-in max-w-4xl mx-auto overflow-x-auto no-scrollbar" style={{ animationDelay: "0.05s" }}>
          <button
            onClick={() => setActiveTab("guide")}
            className={`flex-1 min-w-[120px] py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "guide"
                ? "bg-card text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Lightbulb size={16} /> Nhập Môn
          </button>
          <button
            onClick={() => setActiveTab("dictionary")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "dictionary"
                ? "bg-card text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LibraryBig size={16} /> Từ điển 214 Bộ
          </button>
          <button
            onClick={() => setActiveTab("assemble")}
            className={`flex-1 min-w-[170px] py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "assemble"
                ? "bg-card text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Puzzle size={16} /> Công Thức Hội Ý
          </button>
          <button
            onClick={() => setActiveTab("matrix")}
            className={`flex-1 min-w-[170px] py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "matrix"
                ? "bg-card text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Network size={16} /> Ma Trận Hình Thanh
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "guide" && (
            <motion.div
              key="guide"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-8 animate-fade-in max-w-3xl mx-auto"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="text-center space-y-3 mb-8">
                 <h2 className="text-2xl font-black text-foreground tracking-tight">Nguyên Lý Cấu Tạo Chữ (Lục Thư)</h2>
                 <p className="text-base font-medium text-foreground/90 max-w-2xl mx-auto">Để không phải "Học vẹt", bạn bắt buộc phải hiểu quy luật tạo chữ thần thánh của người xưa. Tiếng Trung được tạo ra dựa trên 4 nguyên lý chính (Lục Thư):</p>
              </div>

              {/* Step 1: Nét Cơ Bản */}
              <div className="bg-card rounded-3xl border border-border p-6 shadow-soft hover:shadow-xl transition-all duration-300 relative overflow-hidden group mb-8">
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-500">
                   <PenTool size={40} className="text-primary/20" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-primary text-white text-sm font-black rounded-xl">1</span>
                    Khởi Nguyên: Nhận biết "Mặt Chữ" (Các Nét Cơ Bản)
                  </h3>
                  <div className="text-base font-medium text-foreground/90 mb-6 leading-relaxed space-y-2">
                    <p>Tiếng Việt dùng 29 chữ cái (a,b,c...) ghép thành từ. Nhưng <b>Tiếng Trung KHÔNG CÓ BẢNG CHỮ CÁI</b>.</p>
                    <p>Để học "mặt chữ", bạn bắt buộc phải làm quen với <b>"Nét Viết" (Strokes)</b> trước. Mọi chữ Hán dù phức tạp đến đâu đều được dệt từ 8 nét xương sống cơ bản dưới đây (Quy tắc <i>Vĩnh Tự Bát Pháp</i>):</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { s: "一", n: "Ngang (Héng)", p: "Từ trái sang phải" },
                      { s: "丨", n: "Sổ (Shù)", p: "Từ trên xuống dưới" }, 
                      { s: "丿", n: "Phẩy (Piě)", p: "Cong nhẹ từ phải sang trái" }, 
                      { s: "丶", n: "Chấm (Diǎn)", p: "Một chấm dứt khoát" },
                      { s: "乀", n: "Mác (Nà)", p: "Vuốt từ trái sang phải dưới" }, 
                      { s: "㇀", n: "Hất (Tí)", p: "Từ dưới hất chéo lên" },
                      { s: "乛", n: "Gập (Zhé)", p: "Đổi hướng đột ngột (Vuông góc)" }, 
                      { s: "亅", n: "Móc (Gōu)", p: "Có móc nhọn ở cuối" }
                    ].map((stroke, i) => (
                      <div key={stroke.n} className="flex flex-col p-4 bg-muted/50 border border-border/50 rounded-2xl cursor-pointer hover:scale-[1.03] hover:shadow-md transition-all duration-300">
                        <div className="flex justify-center mb-2">
                           <AnimatedHanzi character={stroke.s} size={50} />
                        </div>
                        <span className="text-sm font-bold text-foreground text-center mb-1">{stroke.n}</span>
                        <span className="text-[10px] text-muted-foreground text-center leading-tight">{stroke.p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2: Bút Thuận */}
              <div className="bg-card rounded-3xl border border-border p-6 shadow-soft hover:shadow-xl transition-all duration-300 relative overflow-hidden group mb-8">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-primary text-white text-sm font-black rounded-xl">2</span>
                  Quy Tắc Bút Thuận (Thứ tự viết nét)
                </h3>
                <div className="text-base font-medium text-foreground/90 mb-6 leading-relaxed space-y-2">
                  <p>Khi có nét vẽ, bạn không thể tùy tiện vẽ bừa. Bạn cần tuân thủ <b>7 quy tắc "Bút Thuận"</b> để nét chữ mượt mà, đúng tỷ lệ, và có hình khối thăng bằng nhất:</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { r: "Ngang trước Sổ sau", e: "十", d: "Viết nét ngang (一) rồi mới nét sổ (丨)" },
                    { r: "Phẩy trước Mác sau", e: "八", d: "Bên trái phẩy (丿) trước, mác (乀) sau" },
                    { r: "Trên trước Dưới sau", e: "三", d: "Viết tuần tự từ vị trí cao xuống thấp" },
                    { r: "Trái trước Phải sau", e: "川", d: "Viết từ ngoài cùng bên trái sang" },
                    { r: "Ngoài trước Trong sau", e: "月", d: "Viết phần khung bao ngoài trước" },
                    { r: "Vào nhà rồi Đóng cửa", e: "回", d: "Vẽ khung (冂), nhét ruột (口) vào, cuối cùng đóng đáy (一)" },
                    { r: "Giữa trước Hai bên", e: "小", d: "Sổ dọc ở chính giữa trước, rồi mới trái/phải" }
                  ].map((rule, i) => (
                    <div key={rule.r} className="flex flex-col p-4 bg-muted/30 border border-border/50 rounded-2xl group/rule cursor-pointer hover:scale-[1.03] hover:shadow-md transition-all duration-300">
                      <div className="flex justify-center mb-2">
                         <AnimatedHanzi character={rule.e} size={50} />
                      </div>
                      <span className="text-sm font-bold text-foreground text-center mb-1">{rule.r}</span>
                      <span className="text-[10px] text-muted-foreground text-center leading-tight">{rule.d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Bộ Thủ */}
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-3xl p-6 shadow-inner transition-all duration-300 mb-8">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-primary text-white text-sm font-black rounded-xl shadow-md">3</span>
                  Bộ Thủ (Radicals): Sự Phân Loại Hệ Thống
                </h3>
                <div className="text-base font-medium text-foreground/90 mb-6 leading-relaxed space-y-3">
                  <p>Từ các nét ở trên, người xưa gom chúng lại thành <b>214 khối xếp hình cơ bản</b>. 214 khối này gọi là <b>BỘ THỦ</b>.</p>
                  <p className="bg-foreground/5 p-4 rounded-xl border border-border text-foreground font-bold">💡 Tầm Quan Trọng Của Bộ Thủ: Nó đóng vai trò "chỉ nghĩa" (ý nghĩa cốt lõi) của chữ Hán!</p>
                </div>
                <div className="bg-card rounded-2xl p-6 flex flex-col items-center justify-center border shadow-sm text-center">
                  <LibraryBig size={48} className="text-muted-foreground mb-4 opacity-50" />
                  <h4 className="font-bold text-lg mb-2">Bảng Chữ Cái Của Chữ Hán</h4>
                  <p className="text-sm text-muted-foreground mb-4 max-w-lg">Có tổng cộng 214 bộ thủ gốc. Để học thuộc và ghi nhớ mặt chữ, bạn PHẢI nắm vững chúng.</p>
                  <button onClick={() => { setActiveTab('dictionary'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="px-8 py-3 bg-foreground text-background rounded-xl font-bold flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform shadow-md">
                    Mở Từ Điển 214 Bộ <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* Step 4: Lục Thư */}
              <div className="bg-card p-8 rounded-3xl border border-border shadow-sm mb-8">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-primary text-white text-sm font-black rounded-xl shadow-md">4</span>
                  Nguyên Lý Lắp Ráp Chữ (Lục Thư)
                </h3>
                <div className="text-base font-medium text-foreground/90 mb-6 leading-relaxed space-y-3">
                  <p>Sau khi đã có Nét Viết và Bộ Thủ, người xưa làm thế nào để tạo ra hàng vạn chữ Hán phức tạp? Hãy tìm hiểu 4 nguyên lý (Lục Thư) dưới đây để khỏi phải "học vẹt":</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 1. Tượng Hình */}
                <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                    <h3 className="font-bold text-lg">Chữ Tượng Hình</h3>
                  </div>
                  <p className="text-sm font-medium text-foreground/90 mb-4">Nhìn sự vật ngoài đời thế nào, vẽ (tượng) lại hình dáng thế ấy. Hầu hết các <strong>Bộ Thủ (Tab 4)</strong> như bộ Nhật, Nguyệt, Sơn, Thủy đều xuất phát từ đây.</p>
                  <div className="flex justify-between items-center bg-muted/30 p-4 rounded-xl">
                    <div className="flex flex-col items-center"><span className="text-4xl font-hanzi font-bold text-foreground">日</span><span className="text-xs font-bold text-muted-foreground mt-2">Mặt trời</span></div>
                    <div className="flex flex-col items-center"><span className="text-4xl font-hanzi font-bold text-foreground">月</span><span className="text-xs font-bold text-muted-foreground mt-2">Mặt trăng</span></div>
                    <div className="flex flex-col items-center"><span className="text-4xl font-hanzi font-bold text-foreground">山</span><span className="text-xs font-bold text-muted-foreground mt-2">Ngọn núi</span></div>
                  </div>
                </div>

                {/* 2. Chỉ Sự */}
                <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                    <h3 className="font-bold text-lg">Chữ Chỉ Sự</h3>
                  </div>
                  <p className="text-sm font-medium text-foreground/90 mb-4">Các khái niệm vô hình (như không gian trên dưới, gốc rễ) không vẽ được. Người xưa mượn nét ngang làm chuẩn, thêm nét "Chỉ định" sự vật.</p>
                  <div className="flex justify-between items-center bg-muted/30 p-4 rounded-xl">
                    <div className="flex flex-col items-center"><span className="text-4xl font-hanzi font-bold text-foreground">上</span><span className="text-[10px] font-bold text-muted-foreground mt-2">Chấm bên Trên...</span></div>
                    <div className="flex flex-col items-center"><span className="text-4xl font-hanzi font-bold text-foreground">下</span><span className="text-[10px] font-bold text-muted-foreground mt-2">Chấm bên Dưới...</span></div>
                    <div className="flex flex-col items-center pl-2 border-l border-border/50"><span className="text-4xl font-hanzi font-bold text-foreground">本</span><span className="text-[10px] font-bold text-muted-foreground mt-2">Chỉ rễ...</span></div>
                  </div>
                </div>

                {/* 3. Hội Ý */}
                <div className="bg-card p-6 flex flex-col justify-between rounded-3xl border border-border bg-gradient-to-br from-card to-muted/50 transition-colors shadow-sm">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                      <h3 className="font-bold text-lg text-foreground">Chữ Hội Ý</h3>
                    </div>
                    <p className="text-sm font-medium text-foreground/90 mb-4">Ghép 2 (hoặc 3) chữ Tượng Hình lại với nhau, để tạo ra một <strong>nghĩa mới hoàn toàn</strong> dựa trên sự suy diễn logic.</p>
                  </div>
                  <button onClick={() => { setActiveTab('assemble'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-full py-3 mt-4 bg-muted text-foreground border border-border rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-foreground hover:text-background transition-colors">
                    Vào xưởng ghép chữ <Puzzle size={16} />
                  </button>
                </div>

                {/* 4. Hình Thanh */}
                <div className="bg-card p-6 flex flex-col justify-between rounded-3xl border border-border bg-gradient-to-br from-card to-muted/50 transition-colors shadow-sm">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">4</div>
                      <h3 className="font-bold text-lg text-foreground">Chữ Hình Thanh</h3>
                    </div>
                    <p className="text-sm font-medium text-foreground/90 mb-4">Chiếm tới <strong>80%</strong> khối lượng chữ Hán! Ghép 1 phần <strong>chỉ NGHĨA</strong> (Bộ thủ) + 1 phần <strong>mượn ÂM</strong> (Chữ mượn).</p>
                  </div>
                  <button onClick={() => { setActiveTab('matrix'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-full py-3 mt-4 bg-muted text-foreground border border-border rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-foreground hover:text-background transition-colors">
                    Mở ma trận 80% từ vựng <Network size={16} />
                  </button>
                </div>

              </div> {/* End Grid Lục Thư */}
            </div> {/* End Step 3 */}

            {/* Actionable Note */}
            <div className="bg-primary/5 p-6 rounded-3xl border border-primary/20 mb-8">
              <h3 className="font-bold text-lg text-foreground mb-3 flex items-center gap-2"><Lightbulb size={20} /> Lộ trình học thông minh:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex gap-3">
                  <span className="text-foreground font-black mt-0.5">1.</span>
                  <p className="text-sm text-foreground/80 leading-relaxed">Cày biểu tượng nền tảng trong <strong>Từ Điển 214 Bộ</strong> (Tab thứ 4).</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-foreground font-black mt-0.5">2.</span>
                  <p className="text-sm text-foreground/80 leading-relaxed">Vượt qua thử thách <strong>Công Thức Hội Ý</strong> (Tab thứ 2) và luyện tư duy đoán nghĩa chữ lạ.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-foreground font-black mt-0.5">3.</span>
                  <p className="text-sm text-foreground/80 leading-relaxed">Chinh phục <strong>Ma Trận Hình Thanh</strong> để mở khóa 80% vốn từ vựng x10 với quy luật tự đoán âm.</p>
                </div>
              </div>
            </div>

          </motion.div>
          )}

          {activeTab === "assemble" && (
            <motion.div
              key="assemble"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-12 animate-fade-in max-w-4xl mx-auto"
            >
              <div className="text-center space-y-3 mb-6">
                 <h2 className="text-2xl font-black text-foreground tracking-tight">Cộng nghĩa - Công Thức Hội Ý</h2>
                 <p className="text-base text-muted-foreground max-w-2xl mx-auto">Kiểu cấu tạo chữ "Logic" nhất: Lấy 2 hoặc 3 chữ đơn giản có nghĩa ghép lại với nhau để tượng trưng cho một ý nghĩa mới phức tạp hơn.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ideogramEquations.map((equation) => (
                    <div key={equation.id} className="bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-soft transition-all group">
                      
                      {/* Visual Equation */}
                      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2 sm:gap-4 mb-8 h-28 px-2">
                        
                        {/* Vế trái (Các chữ thành phần) */}
                        <div className={`flex items-center justify-center min-w-0 ${equation.parts.length > 2 ? 'gap-1 sm:gap-2' : 'gap-3 sm:gap-6'}`}>
                          {equation.parts.map((p, pIdx) => (
                            <div key={pIdx} className={`flex items-center shrink-0 ${equation.parts.length > 2 ? 'gap-1 sm:gap-2' : 'gap-3 sm:gap-6'}`}>
                              <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl shadow-sm border border-border/50 bg-muted/60">
                                <span className="text-2xl sm:text-3xl font-hanzi font-bold text-foreground">{p.character}</span>
                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-foreground/80 px-2 py-0.5 bg-muted rounded-full shadow-sm max-w-[60px] sm:max-w-[70px] text-center truncate whitespace-nowrap">{p.meaning}</span>
                              </div>
                              {pIdx < equation.parts.length - 1 && (
                                <span className="text-foreground/60 font-black text-xl sm:text-2xl">+</span>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        {/* Dấu Bằng (Trục chính giữa) */}
                        <div className="flex items-center justify-center shrink-0 w-4 sm:w-6">
                          <span className="text-primary/50 font-bold text-2xl sm:text-3xl">=</span>
                        </div>
                        
                        {/* Vế phải (Kết quả) */}
                        <div className="flex items-center justify-center shrink-0">
                          <div className="relative flex-shrink-0 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl border-2 border-primary/20">
                            <span className="text-4xl sm:text-5xl font-hanzi font-bold text-primary">{equation.result}</span>
                            
                            {/* Pinyin with speaker info icon inside the pill */}
                            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 cursor-pointer hover:bg-primary/90 transition-colors whitespace-nowrap">
                              <Volume2 size={12} className="opacity-80" />
                              {equation.pinyin}
                            </span>
                          </div>
                        </div>
                        
                      </div>

                      {/* Explanation */}
                      <div className="pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2 mb-2">
                           <Lightbulb className="w-4 h-4 text-primary" />
                           <span className="text-sm font-bold text-foreground">{equation.meaning}</span>
                        </div>
                        <p className="text-sm text-muted-foreground italic leading-relaxed">
                          "{equation.explanation}"
                        </p>
                      </div>

                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {activeTab === "matrix" && (
            <motion.div
              key="matrix"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-12 animate-fade-in max-w-4xl mx-auto"
            >
              <div className="text-center space-y-3 mb-4">
                 <h2 className="text-2xl font-black text-foreground tracking-tight">Ma Trận Từ Vựng Hình Thanh</h2>
                 <p className="text-base text-muted-foreground max-w-2xl mx-auto">Chỉ cần nhớ 1 chữ gốc làm mượn âm, thay đổi bộ thủ đi kèm để sinh ra hàng loạt từ mới có nghĩa liên quan. Đây là cách "cày" từ vựng nhàn nhất!</p>
              </div>

              {phoneticMatrices.map((matrix, idx) => (
                <div key={matrix.id} className="relative bg-card rounded-3xl border border-border p-6 md:p-8 shadow-sm">
                  {/* Base phonetic core */}
                  <div className="flex flex-col items-center mb-8 relative z-10">
                     <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border-4 border-card shadow-sm mb-3 relative">
                       <span className="text-5xl text-primary font-bold font-hanzi">{matrix.baseRadical}</span>
                       <div className="absolute -bottom-2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-0.5 rounded-full shadow-sm">{matrix.basePinyin}</div>
                     </div>
                     <p className="text-sm font-bold text-foreground text-center">Gốc mượn âm</p>
                     <p className="text-xs text-muted-foreground text-center">({matrix.baseMeaning})</p>
                  </div>

                  {/* Branches */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                    {matrix.derivatives.map((derived, i) => (
                      <div key={i} className="flex bg-muted/30 rounded-2xl border border-border/50 p-4 hover:border-primary/30 transition-all hover:bg-card hover:shadow-soft group">
                        {/* Word Result */}
                        <div className="w-20 border-r border-border/50 pr-4 flex flex-col items-center justify-center shrink-0">
                          <span className="text-4xl text-foreground font-hanzi font-bold group-hover:text-primary transition-colors">{derived.character}</span>
                          <span className="text-xs font-bold text-muted-foreground mt-1">{derived.pinyin}</span>
                        </div>
                        {/* Logic */}
                        <div className="pl-4 flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-md">{derived.radical}</span>
                          </div>
                          <p className="text-sm text-foreground font-medium">{derived.meaning}</p>
                          <p className="text-[11px] text-muted-foreground mt-1 opacity-80">Do ghép bộ thủ chỉ nghĩa với âm {matrix.basePinyin}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Background connecting lines for aesthetics (hidden on mobile) */}
                  <div className="hidden md:block absolute left-1/2 top-32 bottom-12 w-px bg-gradient-to-b from-primary/20 to-transparent -translate-x-1/2 z-0"></div>
                </div>
              ))}
            </motion.div>
          )}



          {activeTab === "dictionary" && (
            <motion.div
              key="dictionary"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-5"
            >
              {/* Search */}
              <div className="relative animate-fade-in" style={{ animationDelay: "0.05s" }}>
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm bộ thủ..."
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                />
              </div>

              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-1 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm active:scale-95 ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Master / Detail Split Layout */}
              <div className="flex flex-col lg:flex-row gap-6 items-start animate-fade-in" style={{ animationDelay: "0.15s" }}>
                
                {/* Left Side: Master Grid */}
                <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-3 gap-3 self-start">
                  {filtered.map((r) => (
                    <motion.div
                      layout
                      key={r.id}
                      className="w-full"
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setExpandedId(r.id)}
                        className={`w-full bg-card rounded-2xl border p-4 text-left shadow-sm hover:shadow-md hover:-translate-y-1 active:scale-95 transition-all duration-300 ${
                          expandedId === r.id ? "border-primary ring-2 ring-primary/20 bg-primary/5" : "border-border"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-4xl text-foreground font-hanzi">{r.radical}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">{r.meaning}</p>
                            <p className="text-xs text-muted-foreground">{r.pinyin} · {r.strokeCount} nét</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Right Side: Detail Panel */}
                <div className="sticky top-20 w-full lg:w-[350px] flex-shrink-0">
                  {(() => {
                    const activeRadical = radicals.find(r => r.id === expandedId);
                    if (!activeRadical) {
                      return (
                        <div className="bg-muted/30 rounded-3xl border border-dashed border-border/60 p-8 text-center flex flex-col items-center justify-center h-[350px] text-muted-foreground">
                          <BookOpen size={48} className="opacity-20 mb-4" />
                          <p className="font-medium">Chọn một bộ thủ bên trái</p>
                          <p className="text-sm mt-1">để xem chi tiết giải thích và ví dụ</p>
                        </div>
                      );
                    }
                    return (
                      <motion.div 
                        key={activeRadical.id}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-card rounded-3xl border-2 border-primary/20 p-6 shadow-xl relative overflow-hidden group"
                      >
                         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                           <span className="text-9xl font-hanzi">{activeRadical.radical}</span>
                         </div>
                         
                         <div className="relative z-10">
                           <div className="flex justify-center mb-6">
                              <div className="w-32 h-32 bg-primary/10 rounded-full flex flex-col items-center justify-center border border-primary/20 shadow-inner">
                                <span className="text-7xl text-primary font-hanzi font-bold drop-shadow-sm">{activeRadical.radical}</span>
                              </div>
                           </div>
                           
                           <div className="space-y-5">
                             <div className="bg-muted/50 p-4 rounded-2xl border border-border/50 text-center">
                               <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mb-1">Ý NGHĨA BỘ THỦ</p>
                               <p className="text-2xl font-bold text-foreground">{activeRadical.meaning}</p>
                             </div>
                             
                             <div className="grid grid-cols-2 gap-3">
                               <div className="bg-card border border-border p-3 rounded-2xl text-center shadow-sm">
                                 <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Phiên âm</p>
                                 <p className="font-bold text-foreground">{activeRadical.pinyin}</p>
                               </div>
                               <div className="bg-card border border-border p-3 rounded-2xl text-center shadow-sm">
                                 <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Số nét viết</p>
                                 <p className="font-bold text-foreground">{activeRadical.strokeCount} nét</p>
                               </div>
                             </div>

                             <div>
                               <div className="flex items-center gap-2 mb-3">
                                 <div className="h-px bg-border flex-1"></div>
                                 <p className="text-[10px] text-muted-foreground uppercase font-bold whitespace-nowrap">Ví dụ chứa bộ {activeRadical.radical}</p>
                                 <div className="h-px bg-border flex-1"></div>
                               </div>
                               <div className="flex flex-wrap justify-center gap-2">
                                 {activeRadical.examples.map(ex => (
                                    <div key={ex} className="w-14 h-14 rounded-2xl bg-primary/5 hover:bg-primary/10 text-primary flex justify-center items-center text-3xl font-hanzi shadow-sm border border-primary/10 transition-colors cursor-default">
                                      {ex}
                                    </div>
                                 ))}
                               </div>
                             </div>
                           </div>
                         </div>
                      </motion.div>
                    );
                  })()}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cụm điều hướng Bài Trước / Bài Sau */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          {(() => {
            const tabOrder = ["guide", "dictionary", "assemble", "matrix"];
            const tabTitles: Record<string, string> = {
              guide: "Nhập Môn Lục Thư",
              dictionary: "Từ Điển 214 Bộ",
              assemble: "Công Thức Hội Ý",
              matrix: "Ma Trận Hình Thanh"
            };
            const currentIndex = tabOrder.indexOf(activeTab);
            const prevTab = currentIndex > 0 ? tabOrder[currentIndex - 1] : null;
            const nextTab = currentIndex < tabOrder.length - 1 ? tabOrder[currentIndex + 1] : null;

            return (
              <>
                {prevTab ? (
                  <button
                    onClick={() => { setActiveTab(prevTab as any); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all font-medium group"
                  >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Quay lại: {tabTitles[prevTab]}
                  </button>
                ) : <div className="hidden sm:block flex-1" />}

                {nextTab ? (
                  <button
                    onClick={() => { setActiveTab(nextTab as any); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-3 transition-all font-bold group"
                  >
                    Tiếp tục: {tabTitles[nextTab]}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : <div className="hidden sm:block flex-1" />}
              </>
            );
          })()}
        </div>

        {/* Complete step button */}
        <RadicalsCompleteButton />
      </div>
    </div>
  );
};

const RadicalsCompleteButton = () => {
  const navigate = useNavigate();
  const { completedSteps, completeStep } = useBeginnerProgress();
  if (completedSteps.includes(1)) return null;
  return (
    <div className="text-center py-4">
      <button
        onClick={() => { completeStep(1); navigate("/learn"); }}
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300"
      >
        <Sparkles size={18} /> Hoàn thành bước 2
      </button>
    </div>
  );
};

export default RadicalsLearn;
