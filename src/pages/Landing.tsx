import { useNavigate } from "react-router-dom";
import { BookOpen, PenTool, Target, Check, ArrowRight } from "lucide-react";
import { hskLevels } from "@/data/mockData";

const features = [
  { icon: BookOpen, title: "Flashcard thông minh", desc: "SRS tự điều chỉnh lịch ôn tập theo trình độ của bạn" },
  { icon: PenTool, title: "Luyện viết chữ", desc: "Stroke order animation + canvas vẽ tương tác" },
  { icon: Target, title: "Quiz đa dạng", desc: "5 loại câu hỏi, feedback tức thì sau mỗi câu" },
];

const plans = [
  { name: "Free", price: "$0", period: "/mãi mãi", features: ["HSK 1-3", "SRS không giới hạn", "Flashcard cơ bản"], cta: "Bắt đầu miễn phí", popular: false },
  { name: "Plus", price: "$7.99", period: "/tháng", features: ["HSK 1-6", "Audio phát âm", "Stats nâng cao", "Tất cả loại quiz"], cta: "Dùng thử 7 ngày", popular: true },
  { name: "Pro", price: "$12.99", period: "/tháng", features: ["HSK 1-9", "Luyện viết chữ", "Custom decks", "Chế độ offline"], cta: "Dùng thử 7 ngày", popular: false },
];

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📖</span>
            <span className="text-lg font-bold">HSK Master</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Tính năng</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Bảng giá</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/login")} className="text-sm font-medium text-muted-foreground hover:text-foreground min-h-[44px] px-3">Đăng nhập</button>
            <button onClick={() => navigate("/register")} className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">Đăng ký</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-foreground">
              Chinh phục tiếng Trung<br />với <span className="text-primary">HSK 3.0</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Nền tảng học từ vựng thông minh — 10,896 từ, 9 cấp độ, spaced repetition tối ưu
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <button onClick={() => navigate("/onboarding/try")} className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
                Học thử miễn phí <ArrowRight size={18} />
              </button>
              <button onClick={() => navigate("/onboarding/try")} className="border border-primary text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary/5 transition-colors">
                Xem demo
              </button>
            </div>
            <div className="flex flex-wrap gap-4 mt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Check size={14} className="text-success" /> HSK 3.0 Ready</span>
              <span className="flex items-center gap-1"><Check size={14} className="text-success" /> Không cần cài đặt</span>
              <span className="flex items-center gap-1"><Check size={14} className="text-success" /> Miễn phí đến HSK 3</span>
            </div>
          </div>
          <div className="animate-fade-in flex justify-center" style={{ animationDelay: "0.15s" }}>
            <div className="bg-card rounded-3xl border border-border shadow-lg p-8 w-72 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="text-center">
                <p className="hanzi-large text-foreground">学习</p>
                <p className="mt-3 text-muted-foreground font-medium">xué xí</p>
                <div className="mt-4 h-px bg-border" />
                <p className="mt-4 text-lg font-semibold text-foreground">học tập, nghiên cứu</p>
                <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold bg-[hsl(258,90%,66%)] text-white">HSK 3</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground">Học thông minh, nhớ lâu hơn</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {features.map((f, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border p-6 hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <f.icon size={24} className="text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HSK Levels */}
      <section className="container py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground">9 cấp độ HSK 3.0</h2>
        <p className="mt-2 text-center text-muted-foreground">Từ 300 từ cơ bản đến 10,896 từ thành thạo</p>
        <div className="flex gap-3 mt-8 overflow-x-auto pb-4 justify-center flex-wrap">
          {hskLevels.map((l) => (
            <span key={String(l.level)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white whitespace-nowrap" style={{ backgroundColor: l.color }}>
              HSK {l.level} <span className="opacity-80 text-xs">{l.words.toLocaleString()} từ</span>
            </span>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground">Bảng giá</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          {plans.map((p) => (
            <div key={p.name} className={`bg-card rounded-2xl border-2 p-6 relative ${p.popular ? "border-primary shadow-lg scale-105" : "border-border"}`}>
              {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">Phổ biến nhất</span>}
              <h3 className="text-lg font-bold text-foreground">{p.name}</h3>
              <div className="mt-2">
                <span className="text-3xl font-extrabold text-foreground">{p.price}</span>
                <span className="text-muted-foreground text-sm">{p.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground"><Check size={16} className="text-success flex-shrink-0" /> {f}</li>
                ))}
              </ul>
              <button onClick={() => navigate("/register")} className={`w-full mt-6 py-3 rounded-xl font-semibold transition-all ${p.popular ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-primary text-primary hover:bg-primary/5"}`}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><span className="text-xl">📖</span> HSK Master</div>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-foreground">Tính năng</a>
            <a href="#pricing" className="hover:text-foreground">Bảng giá</a>
          </div>
          <p>© 2026 HSK Master. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
