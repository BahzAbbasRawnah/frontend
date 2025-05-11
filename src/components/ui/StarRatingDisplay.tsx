import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingDisplayProps {
  rating: number;
  maxRating?: number;
  size?: number; // size of the star icon
  className?: string;
  starClassName?: string;
}

export default function StarRatingDisplay({
  rating,
  maxRating = 5,
  size = 16, // Default size 16px
  className,
  starClassName,
}: StarRatingDisplayProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`Rating: ${rating} out of ${maxRating} stars`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className={cn("text-yellow-400 fill-yellow-400", starClassName)}
          size={size}
          aria-hidden="true"
        />
      ))}
      {hasHalfStar && (
        <StarHalf
          key="half"
          className={cn("text-yellow-400 fill-yellow-400", starClassName)}
          size={size}
          aria-hidden="true"
        />
      )}
      {[...Array(Math.max(0, emptyStars))].map((_, i) => ( // Ensure emptyStars is not negative
        <Star
          key={`empty-${i}`}
          className={cn("text-gray-300 fill-gray-300", starClassName)}
          size={size}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
