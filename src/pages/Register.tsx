import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl border border-border shadow-sm p-8 w-full max-w-md animate-fade-in">
        <div className="text-center mb-6">
          <span className="text-3xl">📖</span>
          <h1 className="text-xl font-bold text-foreground mt-2">Tạo tài khoản miễn phí</h1>
        </div>

        <button className="w-full border border-border rounded-xl py-3 flex items-center justify-center gap-2 font-medium text-foreground hover:bg-muted transition-colors min-h-[44px]">
          <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.49h4.84a4.14 4.14 0 01-1.8 2.71v2.26h2.92a8.78 8.78 0 002.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.83.86-3.04.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A8.99 8.99 0 009 18z"/><path fill="#FBBC05" d="M3.96 10.71A5.41 5.41 0 013.68 9c0-.6.1-1.17.28-1.71V4.96H.96A8.99 8.99 0 000 9c0 1.45.35 2.82.96 4.04l3-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59C13.46.89 11.43 0 9 0A8.99 8.99 0 00.96 4.96l3 2.33C4.67 5.16 6.66 3.58 9 3.58z"/></svg>
          Tiếp tục với Google
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">hoặc</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={(e) => { e.preventDefault(); navigate("/onboarding/level"); }} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <input type="email" required className="w-full mt-1 px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="email@example.com" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Mật khẩu</label>
            <div className="relative mt-1">
              <input type={showPw ? "text" : "password"} required className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring pr-12" placeholder="Tối thiểu 8 ký tự" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showPw ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Xác nhận mật khẩu</label>
            <input type="password" required className="w-full mt-1 px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Nhập lại mật khẩu" />
          </div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 rounded" />
            <span className="text-sm text-muted-foreground">Tôi đồng ý với điều khoản sử dụng</span>
          </label>
          <button type="submit" disabled={!agreed} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 min-h-[44px]">Tạo tài khoản</button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Đã có tài khoản? <Link to="/login" className="text-primary font-medium">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
