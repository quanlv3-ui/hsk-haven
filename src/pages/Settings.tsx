import { user } from "@/data/mockData";
import { useState } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [dailyGoal, setDailyGoal] = useState(10);

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Cài đặt</h1>

        {/* Profile */}
        <div className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">{user.name.charAt(0)}</div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{user.name}</p>
            <p className="text-sm text-muted-foreground">minhtuanlearn@gmail.com</p>
          </div>
          <button className="text-sm text-primary font-medium">Chỉnh sửa</button>
        </div>

        {/* Goals */}
        <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Mục tiêu học tập</h2>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Số từ mỗi ngày</span>
            <select value={dailyGoal} onChange={(e) => setDailyGoal(+e.target.value)} className="px-3 py-1.5 rounded-lg border border-input bg-background text-sm">
              {[5, 10, 15, 20, 30].map((n) => <option key={n} value={n}>{n} từ</option>)}
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Thông báo</h2>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-foreground">Push notification</span>
            <button onClick={() => setNotifications(!notifications)} className={`w-11 h-6 rounded-full transition-colors ${notifications ? "bg-primary" : "bg-muted"}`}>
              <div className={`w-5 h-5 rounded-full bg-card shadow transition-transform ${notifications ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </label>
        </div>

        {/* Appearance */}
        <div className="bg-card rounded-2xl border border-border p-5">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-semibold text-foreground">Dark mode</span>
            <button onClick={toggleDark} className={`w-11 h-6 rounded-full transition-colors ${darkMode ? "bg-primary" : "bg-muted"}`}>
              <div className={`w-5 h-5 rounded-full bg-card shadow transition-transform ${darkMode ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </label>
        </div>

        {/* Account */}
        <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Tài khoản</h2>
          {["Đổi mật khẩu", "Liên kết Google", "Xuất dữ liệu"].map((a) => (
            <button key={a} className="w-full text-left text-sm text-foreground py-2 hover:text-primary transition-colors">{a}</button>
          ))}
        </div>

        {/* Danger zone */}
        <div className="bg-card rounded-2xl border border-destructive/30 p-5">
          <h2 className="text-sm font-semibold text-destructive">Vùng nguy hiểm</h2>
          <button className="mt-3 bg-destructive text-destructive-foreground px-4 py-2 rounded-xl text-sm font-semibold">Xóa tài khoản</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
