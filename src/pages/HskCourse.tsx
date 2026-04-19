import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, BookOpen, CheckCircle2, ChevronRight, Lock, Trophy,
  MessagesSquare, Hash, Users, UtensilsCrossed, Clock, Heart, Bike,
  Stethoscope, Plane, GraduationCap, Briefcase, CloudSun, PartyPopper,
  Smartphone, Sparkles, type LucideIcon,
} from "lucide-react";

// Map week title keywords → contextual icon
const getWeekIcon = (title: string): LucideIcon => {
  const t = title.toLowerCase();
  if (t.includes("chào") || t.includes("bản thân")) return MessagesSquare;
  if (t.includes("số") || t.includes("tuổi")) return Hash;
  if (t.includes("gia đình") || t.includes("bạn")) return Users;
  if (t.includes("ăn") || t.includes("mua sắm")) return UtensilsCrossed;
  if (t.includes("thời gian") || t.includes("lịch")) return Clock;
  if (t.includes("sở thích") || t.includes("hoạt động")) return Heart;
  if (t.includes("đi lại") || t.includes("phương hướng")) return Bike;
  if (t.includes("sức khỏe") || t.includes("cảm xúc")) return Stethoscope;
  if (t.includes("du lịch") || t.includes("khách sạn")) return Plane;
  if (t.includes("học tập") || t.includes("trường")) return GraduationCap;
  if (t.includes("công việc") || t.includes("văn phòng")) return Briefcase;
  if (t.includes("thời tiết") || t.includes("môi trường")) return CloudSun;
  if (t.includes("văn hóa") || t.includes("lễ hội")) return PartyPopper;
  if (t.includes("internet") || t.includes("công nghệ")) return Smartphone;
  return Sparkles;
};
import { getCourse } from "@/data/hskCourseData";
import { useHskProgress } from "@/hooks/useHskProgress";

const HskCourse = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const lvl = Number(level);
  const course = getCourse(lvl);
  const { isLessonComplete, getLevelProgress, getQuizScore } = useHskProgress();

  if (!course) {
    return (
      <div className="container max-w-2xl py-10 text-center">
        <p className="text-muted-foreground">Không tìm thấy giáo trình.</p>
        <button onClick={() => navigate("/study")} className="mt-4 text-primary font-semibold">← Quay lại</button>
      </div>
    );
  }

  const allLessonIds = course.weeks.flatMap((w) => w.lessons.map((l) => l.id));
  const progress = getLevelProgress(allLessonIds);

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container max-w-2xl py-6 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <button onClick={() => navigate("/study")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Cấp độ
          </button>
          <div className="mt-3 flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-primary-foreground text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: course.color }}>
                  HSK {course.level}
                </span>
                <span className="text-xs text-muted-foreground">{course.totalWeeks} tuần · {course.totalWords} từ</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground mt-2">{course.description}</h1>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4 bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-foreground">Tiến độ tổng</span>
              <span className="text-muted-foreground">{progress.done}/{progress.total} bài</span>
            </div>
            <div className="h-2 rounded-full bg-muted mt-2 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: course.color }}
                initial={{ width: 0 }}
                animate={{ width: `${progress.percent}%` }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </motion.div>

        {/* Weeks */}
        <div className="space-y-4">
          {course.weeks.map((week, wi) => {
            const weekLessonIds = week.lessons.map((l) => l.id);
            const weekProgress = getLevelProgress(weekLessonIds);
            const previousWeekDone = wi === 0 || course.weeks[wi - 1].lessons.every((l) => isLessonComplete(l.id));
            const weekUnlocked = previousWeekDone;

            return (
              <motion.section
                key={week.week}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: wi * 0.05 }}
                className={`bg-card rounded-2xl border border-border overflow-hidden ${!weekUnlocked ? "opacity-60" : ""}`}
              >
                <div className="p-4 border-b border-border bg-muted/30">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${course.color}1f`, color: course.color }}>
                        {(() => { const WIcon = getWeekIcon(week.title); return <WIcon size={18} />; })()}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold text-muted-foreground">Tuần {week.week}</span>
                        <h2 className="text-sm font-bold text-foreground truncate">{week.title}</h2>
                      </div>
                    </div>
                    {!weekUnlocked && <Lock size={14} className="text-muted-foreground flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">🎯 {week.goal}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${weekProgress.percent}%` }} />
                    </div>
                    <span className="text-[11px] text-muted-foreground">{weekProgress.done}/{weekProgress.total}</span>
                  </div>
                </div>

                <div className="divide-y divide-border">
                  {week.lessons.map((lesson, li) => {
                    const done = isLessonComplete(lesson.id);
                    const quizScore = getQuizScore(lesson.id);
                    const previousLessonDone = li === 0 || isLessonComplete(week.lessons[li - 1].id);
                    const lessonUnlocked = weekUnlocked && previousLessonDone;
                    return (
                      <button
                        key={lesson.id}
                        disabled={!lessonUnlocked}
                        onClick={() => navigate(`/study/lesson/${lesson.id}`)}
                        className="w-full p-4 flex items-center gap-3 hover:bg-muted/40 transition-colors disabled:cursor-not-allowed disabled:hover:bg-transparent group text-left"
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${done ? "bg-success/15 text-success" : lessonUnlocked ? "bg-primary/10 text-primary group-hover:scale-110" : "bg-muted text-muted-foreground"}`}>
                          {done ? <CheckCircle2 size={18} /> : lessonUnlocked ? <BookOpen size={18} /> : <Lock size={16} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{lesson.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{lesson.desc}</p>
                          {quizScore && (
                            <div className="flex items-center gap-1 mt-1 text-[11px] text-warning">
                              <Trophy size={11} /> {quizScore.score}/{quizScore.total}
                            </div>
                          )}
                        </div>
                        <ChevronRight size={16} className="text-muted-foreground flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                      </button>
                    );
                  })}
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HskCourse;
