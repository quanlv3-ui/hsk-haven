import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { radicals } from "@/data/mockData";

const categories = ["Tất cả", "Con người", "Cơ thể", "Tự nhiên", "Vật liệu", "Giao tiếp", "Hành động", "Đời sống"];

const RadicalsLearn = () => {
  const navigate = useNavigate();
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
      <div className="container max-w-2xl py-6 space-y-5">
        <div className="flex items-center gap-3 animate-fade-in">
          <button onClick={() => navigate("/learn")} className="min-w-[44px] min-h-[44px] rounded-xl hover:bg-muted flex items-center justify-center transition-all duration-300 active:scale-95">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Bộ thủ 部首</h1>
            <p className="text-sm text-muted-foreground">{radicals.length} bộ thủ cơ bản thường gặp</p>
          </div>
        </div>

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
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 active:scale-95 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          {filtered.map((r, i) => (
            <motion.button
              key={r.id}
              onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
              className={`bg-card rounded-2xl border p-4 text-left shadow-soft hover:shadow-soft-lg active:scale-[0.97] transition-all duration-300 ${
                expandedId === r.id ? "border-primary col-span-2" : "border-border"
              }`}
              whileHover={{ y: -2 }}
              layout
            >
              <div className="flex items-center gap-3">
                <span className="hanzi-small text-foreground">{r.radical}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{r.meaning}</p>
                  <p className="text-xs text-muted-foreground">{r.pinyin} · {r.strokeCount} nét</p>
                </div>
              </div>

              <AnimatePresence>
                {expandedId === r.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2">Ví dụ chữ chứa bộ {r.radical}:</p>
                      <div className="flex gap-2 flex-wrap">
                        {r.examples.map((ex) => (
                          <span key={ex} className="hanzi-display text-lg px-3 py-1 rounded-xl bg-primary/10 text-primary">{ex}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RadicalsLearn;
