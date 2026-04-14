import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-8 w-full max-w-md animate-fade-in text-center">
          <div className="text-5xl mb-4">📬</div>
          <h1 className="text-xl font-bold text-foreground">Kiểm tra hộp thư của bạn</h1>
          <p className="text-sm text-muted-foreground mt-2">Chúng tôi đã gửi link đặt lại mật khẩu đến email của bạn.</p>
          <Link to="/login" className="mt-6 inline-block text-primary font-medium text-sm">← Quay lại đăng nhập</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl border border-border shadow-sm p-8 w-full max-w-md animate-fade-in">
        <h1 className="text-xl font-bold text-foreground">Quên mật khẩu?</h1>
        <p className="text-sm text-muted-foreground mt-1">Nhập email, chúng tôi sẽ gửi link đặt lại mật khẩu</p>
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 space-y-4">
          <input type="email" required className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Email của bạn" />
          <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold min-h-[44px]">Gửi link</button>
        </form>
        <Link to="/login" className="mt-4 inline-block text-sm text-muted-foreground">← Quay lại đăng nhập</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
