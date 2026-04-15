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
      if (prev.includes(stepIndex)) return prev;
      const next = [...prev, stepIndex];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isAllCompleted = completedSteps.length >= STEP_KEYS.length;
  const currentStep = completedSteps.length;
  const progressPercent = (currentStep / STEP_KEYS.length) * 100;

  return { completedSteps, completeStep, isAllCompleted, currentStep, progressPercent, STEP_KEYS };
};
