import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Bookmark, Users, UtensilsCrossed, Plane, Briefcase, ShoppingBag, CloudSun, HeartPulse, Hash, type LucideIcon } from "lucide-react";
import { topics } from "@/data/topicsData";
import { useTopicProgress } from "@/hooks/useTopicProgress";
import { useBookmarks } from "@/hooks/useBookmarks";

const topicIcons: Record<string, LucideIcon> = {
  family: Users,
  food: UtensilsCrossed,
  travel: Plane,
  work: Briefcase,
  shopping: ShoppingBag,
  weather: CloudSun,
  body: HeartPulse,
  numbers: Hash,
};

const TopicsHub = () => {
  const navigate = useNavigate();
  const { getTopicStats } = useTopicProgress();
  const { bookmarks } = useBookmarks();

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <button
            onClick={() => navigate(-1)}
            className="min-w-[40px] min-h-[40px] rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Quay lại"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Học theo chủ đề 🌸</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Chia nhỏ từ vựng theo tình huống đời sống</p>
          </div>
        </motion.div>

        {/* Bookmarks shortcut */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          onClick={() => navigate("/learn/bookmarks")}
          className="w-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-3 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <Bookmark size={18} className="text-primary fill-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-foreground">Từ đã đánh dấu</p>
            <p className="text-xs text-muted-foreground">{bookmarks.length} từ trong danh sách</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </motion.button>

        {/* Topics grid */}
        <div className="grid sm:grid-cols-2 gap-3">
          {topics.map((t, i) => {
            const stats = getTopicStats(t.id, t.words.length);
            const completed = stats.percent === 100 && stats.quizScore !== undefined;
            return (
              <motion.button
                key={t.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.06 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => navigate(`/learn/topics/${t.id}`)}
            const Icon = topicIcons[t.id];
            return (
              <motion.button
                key={t.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.06 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => navigate(`/learn/topics/${t.id}`)}
                className={`relative ${t.color} rounded-2xl border border-border p-4 text-left hover:shadow-xl hover:-translate-y-1.5 hover:border-primary/40 active:scale-[0.98] transition-all duration-300 group overflow-hidden`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-background/70 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {Icon ? <Icon size={22} className="text-primary" /> : <span className="text-2xl">{t.emoji}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
                  </div>
                  {completed && <span className="text-xs">✅</span>}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-background/60 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${stats.percent}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-muted-foreground tabular-nums">
                    {stats.learnedCount}/{t.words.length}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopicsHub;
