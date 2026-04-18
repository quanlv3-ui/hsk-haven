import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "vocab-bookmarks";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBookmarks(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const persist = (next: string[]) => {
    setBookmarks(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const toggle = useCallback(
    (id: string) => {
      setBookmarks((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const isBookmarked = useCallback((id: string) => bookmarks.includes(id), [bookmarks]);

  return { bookmarks, toggle, isBookmarked, clear: () => persist([]) };
};
