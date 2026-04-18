import { useNavigate } from "react-router-dom";
import { Lock, BookOpen, Calendar } from "lucide-react";
import { hskLevels } from "@/data/mockData";
import { hskCourses, getCourse } from "@/data/hskCourseData";
import { useHskProgress } from "@/hooks/useHskProgress";

const StudyLevels = () => {
  const navigate = useNavigate();
  const { getLevelProgress } = useHskProgress();

  const renderCard = (l: typeof hskLevels[0]) => {
    const locked = !l.unlocked;
    const course = getCourse(l.level as number);
    const allLessonIds = course?.weeks.flatMap((w) => w.lessons.map((ls) => ls.id)) ?? [];
    const prog = getLevelProgress(allLessonIds);
    const hasCourse = !!course;

    return (
      <div
        key={String(l.level)}
        onClick={() => !locked && hasCourse && navigate(`/study/hsk/${l.level}`)}
        className={`bg-card rounded-2xl border border-border p-5 relative transition-all duration-300 ${locked ? "opacity-50" : "hover:shadow-xl hover:-translate-y-1 hover:border-primary/40 cursor-pointer"}`}
      >
        {locked && <div className="absolute inset-0 flex items-center justify-center z-10"><Lock size={24} className="text-muted-foreground" /></div>}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: l.color }}>HSK {l.level}</span>
          {hasCourse && !locked && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">Giáo trình ✨</span>}
          {locked && <span className="text-xs text-muted-foreground">Plus plan</span>}
        </div>
        <p className="text-sm text-muted-foreground mt-2">{l.words.toLocaleString()} từ</p>
        {hasCourse && (
          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar size={11} /> {course.totalWeeks} tuần</span>
            <span className="flex items-center gap-1"><BookOpen size={11} /> {allLessonIds.length} bài</span>
          </div>
        )}
        <div className="h-2 rounded-full bg-muted mt-3 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ backgroundColor: l.color, width: `${hasCourse ? prog.percent : l.progress}%` }} />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">{hasCourse ? `${prog.done}/${prog.total} bài` : `${l.progress}%`}</span>
          {!locked && (
            <span className="text-xs font-semibold text-primary">{hasCourse ? "Vào học →" : "Học tiếp →"}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6">
        <h1 className="text-2xl font-bold text-foreground">Chọn cấp độ học</h1>

        <section className="mt-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Sơ cấp</h2>
          <div className="grid gap-4 mt-3 sm:grid-cols-3">{hskLevels.slice(0, 3).map(renderCard)}</div>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Trung cấp</h2>
          <div className="grid gap-4 mt-3 sm:grid-cols-3">{hskLevels.slice(3, 6).map(renderCard)}</div>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Cao cấp</h2>
          <div className="mt-3">
            <div className="bg-card rounded-2xl border border-border p-5 opacity-50 relative">
              <div className="absolute inset-0 flex items-center justify-center z-10"><Lock size={24} className="text-muted-foreground" /></div>
              <span className="text-white text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary">HSK 7-9</span>
              <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">Pro</span>
              <p className="text-sm text-muted-foreground mt-2">10,896 từ · Dành cho người học nâng cao</p>
              <button onClick={() => navigate("/subscription")} className="mt-3 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">Nâng cấp Pro</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudyLevels;
