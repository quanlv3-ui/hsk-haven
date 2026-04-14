import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Đặt lại mật khẩu thành công!", description: "Bạn có thể đăng nhập với mật khẩu mới." });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl border border-border shadow-sm p-8 w-full max-w-md animate-fade-in">
        <h1 className="text-xl font-bold text-foreground">Đặt mật khẩu mới</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Mật khẩu mới</label>
            <input type="password" required value={pw} onChange={(e) => setPw(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Tối thiểu 8 ký tự" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Xác nhận mật khẩu</label>
            <input type="password" required className="w-full mt-1 px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Nhập lại mật khẩu" />
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold min-h-[44px]">Đặt lại mật khẩu</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
