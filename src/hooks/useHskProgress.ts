import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "hsk_course_progress_v1";

interface ProgressState {
  completedLessons: string[];
  quizScores: Record<string, { score: number; total: number }>;
}

const load = (): ProgressState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completedLessons: [], quizScores: {} };
};

const save = (s: ProgressState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {}
};

export const useHskProgress = () => {
  const [state, setState] = useState<ProgressState>(load);

  useEffect(() => {
    const handler = () => setState(load());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    setState((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const next = { ...prev, completedLessons: [...prev.completedLessons, lessonId] };
      save(next);
      return next;
    });
  }, []);

  const saveQuizScore = useCallback((lessonId: string, score: number, total: number) => {
    setState((prev) => {
      const existing = prev.quizScores[lessonId];
      // Keep best score
      if (existing && existing.score >= score) return prev;
      const next = { ...prev, quizScores: { ...prev.quizScores, [lessonId]: { score, total } } };
      save(next);
      return next;
    });
  }, []);

  const isLessonComplete = useCallback(
    (lessonId: string) => state.completedLessons.includes(lessonId),
    [state.completedLessons]
  );

  const getQuizScore = useCallback(
    (lessonId: string) => state.quizScores[lessonId],
    [state.quizScores]
  );

  const getLevelProgress = useCallback(
    (lessonIds: string[]) => {
      const done = lessonIds.filter((id) => state.completedLessons.includes(id)).length;
      return { done, total: lessonIds.length, percent: lessonIds.length ? Math.round((done / lessonIds.length) * 100) : 0 };
    },
    [state.completedLessons]
  );

  return { completeLesson, saveQuizScore, isLessonComplete, getQuizScore, getLevelProgress, completedLessons: state.completedLessons };
};
