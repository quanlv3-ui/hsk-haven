import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Volume2, Bookmark, BookmarkX } from "lucide-react";
import { allTopicWords } from "@/data/topicsData";
import { useBookmarks } from "@/hooks/useBookmarks";
import HSKBadge from "@/components/shared/HSKBadge";

const speak = (text: string) => {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN";
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
};

const Bookmarks = () => {
  const navigate = useNavigate();
  const { bookmarks, toggle, clear } = useBookmarks();
  const items = allTopicWords.filter((w) => bookmarks.includes(w.id));

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <button
            onClick={() => navigate(-1)}
            className="min-w-[40px] min-h-[40px] rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Từ đã đánh dấu 🔖</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{items.length} từ trong danh sách</p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clear}
              className="text-xs text-destructive font-semibold hover:underline"
            >
              Xoá tất cả
            </button>
          )}
        </motion.div>

        {items.length === 0 ? (
          <div className="bg-card border border-dashed border-border rounded-2xl p-10 text-center">
            <BookmarkX size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm font-semibold text-foreground">Chưa có từ nào</p>
            <p className="text-xs text-muted-foreground mt-1">Nhấn icon dấu trang khi học từ vựng để lưu lại</p>
            <button
              onClick={() => navigate("/learn/topics")}
              className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
            >
              Khám phá chủ đề
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 hover:shadow-md hover:border-primary/40 transition-all duration-300"
              >
                <span className="text-2xl">{w.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="hanzi-small text-foreground">{w.hanzi}</span>
                    <HSKBadge level={w.hskLevel} />
                  </div>
                  <p className="text-xs text-muted-foreground">{w.pinyin}</p>
                  <p className="text-sm text-foreground">{w.meaning}</p>
                </div>
                <button
                  onClick={() => speak(w.hanzi)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Volume2 size={16} className="text-muted-foreground" />
                </button>
                <button
                  onClick={() => toggle(w.id)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Bookmark size={16} className="text-primary fill-primary" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
