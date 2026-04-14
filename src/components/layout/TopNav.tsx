import { BookOpen, Home, Target, BarChart3, Trophy, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { user } from "@/data/mockData";

const links = [
  { icon: Home, label: "Trang chủ", path: "/dashboard" },
  { icon: BookOpen, label: "Học", path: "/study" },
  { icon: Target, label: "Luyện tập", path: "/practice/quiz/setup" },
  { icon: BarChart3, label: "Tiến độ", path: "/progress" },
  { icon: Trophy, label: "Thành tích", path: "/achievements" },
];

const TopNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hidePaths = ["/", "/login", "/register", "/forgot-password", "/reset-password", "/onboarding", "/study/flashcard", "/study/complete", "/practice/writing", "/milestone"];
  const shouldHide = hidePaths.some(p => location.pathname === p || location.pathname.startsWith(p + "/") || (p === "/onboarding" && location.pathname.startsWith(p)));
  // Also hide for quiz in progress
  const isQuizInProgress = location.pathname.startsWith("/practice/quiz/") && location.pathname !== "/practice/quiz/setup";
  if (shouldHide || isQuizInProgress) return null;

  return (
    <header className="sticky top-0 z-50 hidden md:block bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
          <span className="text-2xl">📖</span>
          <span className="text-lg font-bold text-foreground">HSK Master</span>
        </div>
        <nav className="flex items-center gap-1">
          {links.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path || location.pathname.startsWith(path + "/");
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            );
          })}
        </nav>
        <button onClick={() => navigate("/settings")} className="flex items-center gap-2 min-h-[44px] min-w-[44px] justify-center rounded-full hover:bg-muted transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
            {user.name.charAt(0)}
          </div>
        </button>
      </div>
    </header>
  );
};

export default TopNav;
