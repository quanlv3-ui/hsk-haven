import { useNavigate, useParams } from "react-router-dom";
import { Volume2, X } from "lucide-react";
import { vocabularyList, flashcards } from "@/data/mockData";
import HSKBadge from "@/components/shared/HSKBadge";

const VocabularyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const word = vocabularyList.find((v) => v.id === id);
  const card = flashcards.find((f) => f.hanzi === word?.hanzi);

  if (!word) return <div className="p-8 text-center text-muted-foreground">Không tìm thấy từ</div>;

  return (
    <div className="min-h-screen bg-background/80 flex items-end md:items-center justify-center">
      <div className="bg-card rounded-t-3xl md:rounded-2xl border border-border shadow-xl p-6 w-full max-w-md animate-slide-up md:animate-scale-in">
        <div className="flex justify-between items-start">
          <div>
            <p className="hanzi-card text-foreground">{word.hanzi}</p>
            <p className="text-lg text-muted-foreground">{word.pinyin}</p>
          </div>
          <button onClick={() => navigate(-1)} className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-muted"><X size={20} /></button>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <HSKBadge level={word.hskLevel} />
          <button className="min-w-[44px] min-h-[44px] rounded-full bg-primary/10 flex items-center justify-center"><Volume2 size={18} className="text-primary" /></button>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-foreground">Nghĩa</h3>
          <p className="text-foreground mt-1">{word.meaning}</p>
        </div>

        {card && (
          <>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-foreground">Ví dụ</h3>
              <p className="text-sm text-foreground mt-1 font-hanzi">{card.example}</p>
              <p className="text-sm text-muted-foreground">{card.exampleTranslation}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">{card.context}</span>
            </div>
          </>
        )}

        <div className="mt-4 bg-muted rounded-xl p-3 text-sm text-muted-foreground">
          Ôn tiếp trong 3 ngày · Độ chính xác 80% · 8 nét
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button className="bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm">Thêm vào ôn tập</button>
          <button className="border border-border text-foreground py-3 rounded-xl font-semibold text-sm">Đánh dấu thành thạo</button>
        </div>
      </div>
    </div>
  );
};

export default VocabularyDetail;
