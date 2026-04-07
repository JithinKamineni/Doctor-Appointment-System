import { Star } from 'lucide-react';

export default function RatingStars({ rating = 0 }) {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={`h-4 w-4 ${index < Math.round(rating) ? 'fill-current' : ''}`} />
      ))}
      <span className="ml-1 text-sm font-medium text-slate-600">{rating.toFixed(1)}</span>
    </div>
  );
}
