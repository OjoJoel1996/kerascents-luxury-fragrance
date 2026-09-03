import { Star } from "lucide-react";

export function Rating({
  value,
  reviews,
  className = "",
}: {
  value: number;
  reviews?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex" aria-label={`Rated ${value} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              i <= Math.round(value)
                ? "fill-gold text-gold"
                : "text-muted-foreground/40"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {value.toFixed(1)}
        {reviews !== undefined ? ` (${reviews})` : ""}
      </span>
    </div>
  );
}
