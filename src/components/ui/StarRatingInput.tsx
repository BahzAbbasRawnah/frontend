'use client';

import { useState } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitServiceRating, ServiceRatingInput } from '@/lib/actions';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/getDictionary';

interface StarRatingInputProps {
  serviceId: string;
  lang: Locale;
  dictionary: Pick<Dictionary, 
    'starRatingInputLoginPrompt' | 
    'starRatingInputSubmitButton' | 
    'starRatingInputCommentPlaceholder' |
    'toastAuthRequiredTitle' |
    'toastAuthRequiredDescription' |
    'toastRatingRequiredTitle' |
    'toastRatingRequiredDescription' |
    'toastRatingSubmittedTitle' |
    // 'toastRatingSubmittedDescription' | // This comes from action
    'toastRatingSubmitFailed' |
    'toastUnexpectedError' |
    'navLogin' // For the login link text
  >;
  maxRating?: number;
  size?: number;
  className?: string;
  starClassName?: string;
  onRatingSubmitted?: (rating: number) => void;
}

export default function StarRatingInput({
  serviceId,
  lang,
  dictionary,
  maxRating = 5,
  size = 24,
  className,
  starClassName,
  onRatingSubmitted,
}: StarRatingInputProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSetRating = (newRating: number) => {
    if (!user) {
        toast({ title: dictionary.toastAuthRequiredTitle, description: dictionary.toastAuthRequiredDescription, variant: "destructive"});
        return;
    }
    setRating(newRating);
  };

  const handleSubmitRating = async () => {
    if (!user) {
        toast({ title: dictionary.toastAuthRequiredTitle, description: dictionary.toastAuthRequiredDescription, variant: "destructive"});
        return;
    }
    if (rating === 0) {
      toast({ title: dictionary.toastRatingRequiredTitle, description: dictionary.toastRatingRequiredDescription, variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    try {
      const input: ServiceRatingInput = {
        serviceId,
        userId: user.uid,
        rating,
        comment: comment.trim() || undefined,
      };
      const result = await submitServiceRating(input); // Action messages are not translated here yet
      if (result.success) {
        toast({ title: dictionary.toastRatingSubmittedTitle, description: result.message });
        if (onRatingSubmitted) {
          onRatingSubmitted(rating);
        }
      } else {
        toast({ title: dictionary.toastRatingSubmitFailed, description: result.message || dictionary.toastUnexpectedError, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: dictionary.toastErrorTitle || "Error", description: dictionary.toastUnexpectedError, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const loginLink = `/${lang}/login`;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-1">
        {[...Array(maxRating)].map((_, i) => {
          const starValue = i + 1;
          return (
            <button
              key={starValue}
              type="button"
              aria-label={`Rate ${starValue} out of ${maxRating} stars`}
              onClick={() => handleSetRating(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
              disabled={!user || isLoading}
            >
              <Star
                className={cn(
                  'transition-colors duration-150',
                  (hoverRating || rating) >= starValue ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300',
                  'hover:text-yellow-300',
                  starClassName,
                  (!user || isLoading) ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
                )}
                size={size}
              />
            </button>
          );
        })}
      </div>
       {!user && (
        <p className="text-sm text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: dictionary.starRatingInputLoginPrompt.replace(
              '<1>',
              `<a href="${loginLink}" class="underline text-accent">`
            ).replace('</1>', '</a>'),
          }}
        />
       )}
      {user && (
        <>
          <Textarea
            placeholder={dictionary.starRatingInputCommentPlaceholder}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={500}
            rows={3}
            disabled={isLoading}
            className="bg-background"
          />
          <Button onClick={handleSubmitRating} disabled={isLoading || rating === 0} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading ? <Loader2 className="mr-2 rtl:ml-2 h-4 w-4 animate-spin" /> : <Star className="mr-2 rtl:ml-2 h-4 w-4" />}
            {dictionary.starRatingInputSubmitButton}
          </Button>
        </>
      )}
    </div>
  );
}