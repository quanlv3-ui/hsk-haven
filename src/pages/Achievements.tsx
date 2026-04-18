import { achievements } from "@/data/mockData";


const Achievements = () => {
  const unlocked = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6">
        <h1 className="text-2xl font-bold text-foreground">Thành tích của bạn</h1>
        <p className="text-sm text-muted-foreground mt-1">{unlocked}/{achievements.length} huy hiệu đã đạt</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
          {achievements.map((a) => (
            <div key={a.id} className={`bg-card rounded-2xl border border-border p-4 text-center transition-opacity ${a.unlocked ? "" : "opacity-40 grayscale"}`}>
              <div className="text-3xl">{a.unlocked ? a.emoji : "🔒"}</div>
              <p className="text-sm font-semibold text-foreground mt-2">{a.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
              {!a.unlocked && a.condition && <p className="text-xs text-muted-foreground mt-2 italic">{a.condition}</p>}
              {a.unlocked && (
                <button className="mt-2 text-xs text-primary font-medium">Chia sẻ</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
