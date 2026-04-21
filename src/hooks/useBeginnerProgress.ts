import { useState, useCallback } from "react";

const STORAGE_KEY = "hsk_beginner_progress";

const STEP_KEYS = ["pinyin", "radicals", "writing", "basic-vocab"] as const;
export type StepKey = (typeof STEP_KEYS)[number];

export const useBeginnerProgress = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const completeStep = useCallback((stepIndex: number) => {
    setCompletedSteps((prev) => {
      // Mark this step AND all previous steps as completed
      const set = new Set(prev);
      for (let i = 0; i <= stepIndex; i++) set.add(i);
      const next = Array.from(set).sort((a, b) => a - b);
      if (next.length === prev.length) return prev;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isAllCompleted = completedSteps.length >= STEP_KEYS.length;
  const currentStep = completedSteps.length;
  const progressPercent = (currentStep / STEP_KEYS.length) * 100;

  return { completedSteps, completeStep, isAllCompleted, currentStep, progressPercent, STEP_KEYS };
};
