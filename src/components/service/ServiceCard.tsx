import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star } from 'lucide-react';
import StarRatingDisplay from '@/components/ui/StarRatingDisplay';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/getDictionary'; // For the "View Details" text


interface ServiceCardProps {
  service: Service;
  lang: Locale;
  dictionary: Pick<Dictionary, 'dashboardViewProjects'>; // Reusing 'View Projects' for 'View Details' for now
}

export default function ServiceCard({ service, lang, dictionary }: ServiceCardProps) {
  // Service title, description, tags etc. would ideally come from a translated source.
  // For now, using static values from sampleServices.
  const localizedPath = (path: string) => `/${lang}${path}`;

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0">
        <div className="aspect-[16/10] relative w-full">
          <Image
            src={service.imageUrl}
            alt={service.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={service.imageHint || "technology service"}
            className="rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="text-xl font-semibold mb-2 text-primary">{service.title}</CardTitle>
        <CardDescription className="text-sm text-foreground/80 mb-4 min-h-[40px] line-clamp-2">{service.shortDescription}</CardDescription>
        
        {service.averageRating && service.numberOfRatings && (
          <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
            <StarRatingDisplay rating={service.averageRating} />
            <span>({service.numberOfRatings} ratings)</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {service.tags && service.tags.slice(0, 3).map((tag) => ( 
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 bg-secondary/30 rounded-b-lg border-t">
        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={localizedPath(`/services/${service.id}`)}>
            {dictionary.dashboardViewProjects} {/* Using 'View Projects' as a placeholder for 'View Details' */}
            <ArrowRight className="ms-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}