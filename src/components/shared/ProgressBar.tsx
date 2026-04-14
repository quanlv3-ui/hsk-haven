const ProgressBar = ({ value, max = 100, color, className = "" }: { value: number; max?: number; color?: string; className?: string }) => {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className={`h-2 rounded-full bg-muted overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, backgroundColor: color || "hsl(var(--primary))" }}
      />
    </div>
  );
};

export default ProgressBar;
