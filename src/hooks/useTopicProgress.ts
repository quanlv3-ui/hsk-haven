import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "topic-progress-v1";

type ProgressMap = Record<string, { learned: string[]; quizScore?: number }>;

export const useTopicProgress = () => {
  const [progress, setProgress] = useState<ProgressMap>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProgress(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const save = (next: ProgressMap) => {
    setProgress(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const markLearned = useCallback((topicId: string, wordId: string) => {
    setProgress((prev) => {
      const cur = prev[topicId] ?? { learned: [] };
      if (cur.learned.includes(wordId)) return prev;
      const next = { ...prev, [topicId]: { ...cur, learned: [...cur.learned, wordId] } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const setQuizScore = useCallback((topicId: string, score: number) => {
    setProgress((prev) => {
      const cur = prev[topicId] ?? { learned: [] };
      const next = { ...prev, [topicId]: { ...cur, quizScore: Math.max(score, cur.quizScore ?? 0) } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const getTopicStats = useCallback(
    (topicId: string, total: number) => {
      const cur = progress[topicId] ?? { learned: [] };
      return {
        learnedCount: cur.learned.length,
        learnedIds: cur.learned,
        percent: total ? Math.round((cur.learned.length / total) * 100) : 0,
        quizScore: cur.quizScore,
      };
    },
    [progress],
  );

  return { progress, markLearned, setQuizScore, getTopicStats, save };
};
