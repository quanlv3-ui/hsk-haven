import { Home, BookOpen, Target, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { icon: Home, label: "Trang chủ", path: "/dashboard" },
  { icon: BookOpen, label: "Học", path: "/study" },
  { icon: Target, label: "Luyện tập", path: "/practice/quiz/setup" },
  { icon: User, label: "Hồ sơ", path: "/settings" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on certain routes
  const hiddenRoutes = ["/", "/login", "/register", "/forgot-password", "/reset-password", "/onboarding", "/study/flashcard", "/study/complete", "/practice/quiz/", "/practice/writing", "/milestone"];
  if (hiddenRoutes.some(r => location.pathname === r || (r.endsWith("/") && location.pathname.startsWith(r)) || location.pathname.startsWith(r) && r.includes("onboarding"))) {
    // More precise check
    const hide = location.pathname === "/" || 
      location.pathname === "/login" || 
      location.pathname === "/register" ||
      location.pathname.startsWith("/forgot-password") ||
      location.pathname.startsWith("/reset-password") ||
      location.pathname.startsWith("/onboarding") ||
      location.pathname === "/study/flashcard" ||
      location.pathname === "/study/complete" ||
      location.pathname.startsWith("/practice/quiz/") && location.pathname !== "/practice/quiz/setup" ||
      location.pathname === "/practice/writing" ||
      location.pathname.startsWith("/milestone");
    if (hide) return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16">
        {tabs.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path || (path !== "/dashboard" && location.pathname.startsWith(path));
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon size={22} />
              <span className="text-[11px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
