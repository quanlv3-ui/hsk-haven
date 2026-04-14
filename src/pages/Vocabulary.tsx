import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Volume2 } from "lucide-react";
import { vocabularyList } from "@/data/mockData";
import HSKBadge from "@/components/shared/HSKBadge";

const statusLabels: Record<string, { label: string; cls: string }> = {
  new: { label: "Mới", cls: "bg-easy/10 text-easy" },
  learning: { label: "Đang học", cls: "bg-warning/10 text-warning" },
  mastered: { label: "Thành thạo", cls: "bg-success/10 text-success" },
};

const Vocabulary = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState(0);

  const filtered = vocabularyList.filter((v) => {
    if (search && !v.hanzi.includes(search) && !v.pinyin.includes(search.toLowerCase()) && !v.meaning.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterLevel && v.hskLevel !== filterLevel) return false;
    return true;
  });

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Từ vựng</h1>
        
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm" placeholder="Tìm kiếm..." />
          </div>
          <select value={filterLevel} onChange={(e) => setFilterLevel(+e.target.value)} className="px-3 py-2 rounded-xl border border-input bg-background text-sm">
            <option value={0}>Tất cả</option>
            {[1, 2, 3].map((l) => <option key={l} value={l}>HSK {l}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          {filtered.map((v) => (
            <button key={v.id} onClick={() => navigate(`/vocabulary/${v.id}`)} className="w-full bg-card rounded-xl border border-border p-4 flex items-center gap-3 hover:shadow-sm transition-shadow text-left min-h-[56px]">
              <span className="hanzi-small text-foreground w-14">{v.hanzi}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">{v.pinyin}</p>
                <p className="text-sm text-foreground truncate">{v.meaning}</p>
              </div>
              <HSKBadge level={v.hskLevel} />
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusLabels[v.status].cls}`}>{statusLabels[v.status].label}</span>
              <Volume2 size={16} className="text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vocabulary;
