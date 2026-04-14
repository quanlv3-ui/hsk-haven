const hskColors: Record<number | string, string> = {
  1: "bg-[hsl(142,71%,45%)]",
  2: "bg-[hsl(217,91%,60%)]",
  3: "bg-[hsl(258,90%,66%)]",
  4: "bg-[hsl(38,92%,50%)]",
  5: "bg-[hsl(0,84%,60%)]",
  6: "bg-[hsl(330,81%,60%)]",
  "7-9": "bg-primary",
  7: "bg-primary",
};

const HSKBadge = ({ level, className = "" }: { level: number | string; className?: string }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white ${hskColors[level] || "bg-primary"} ${className}`}>
    HSK {level}
  </span>
);

export default HSKBadge;
