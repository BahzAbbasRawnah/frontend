import { sampleServices } from '@/data/sample-services';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StarRatingDisplay from '@/components/ui/StarRatingDisplay';
import StarRatingInput from '@/components/ui/StarRatingInput';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Clock, DollarSign, Tag, Users, ListChecks } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/getDictionary';
import type { Dictionary } from '@/lib/getDictionary';


type Props = {
  params: { serviceId: string; lang: Locale };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Use Promise.resolve to await the params object
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams.lang;
  const serviceId = resolvedParams.serviceId;

  const service = sampleServices.find((s) => s.id === serviceId);
  const dictionary = await getDictionary(lang);

  if (!service) {
    return {
      title: `Service Not Found - ${dictionary.siteName}`,
      description: 'The service you are looking for could not be found.',
    };
  }

  return {
    title: `${service.title} - ${dictionary.siteName} ${dictionary.navServices}`,
    description: service.shortDescription, // This should be translated if service data is translated
    openGraph: {
      title: service.title,
      description: service.shortDescription,
      images: [service.imageUrl],
    },
  };
}

export async function generateStaticParams() {
  // Need to generate params for each locale
  const locales = ['en', 'ar']; // from i18n-config
  const params = [];
  for (const lang of locales) {
    for (const service of sampleServices) {
      params.push({ lang, serviceId: service.id });
    }
  }
  return params;
}


export default async function ServiceDetailPage({ params }: Props) {
  // Use Promise.resolve to await the params object
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams.lang;
  const serviceId = resolvedParams.serviceId;

  const service = sampleServices.find((s) => s.id === serviceId);
  const dictionary = await getDictionary(lang);

  if (!service) {
    notFound();
  }

  // For a real multi-language app, service details (title, description etc.) would also come from a translated source.
  // Here, we're using static sampleServices, so their content isn't translated yet.
  // Only UI text around the service details will be translated.

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card className="overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[16/10] md:aspect-auto w-full h-64 md:h-full">
            <Image
              src={service.imageUrl}
              alt={service.title} // Should be translated if service data is translated
              layout="fill"
              objectFit="cover"
              data-ai-hint={service.imageHint || "technology service detail"}
              priority
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-3xl lg:text-4xl font-bold text-primary mb-2">{service.title}</CardTitle>
              {service.averageRating && service.numberOfRatings && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <StarRatingDisplay rating={service.averageRating} size={20} />
                  <span>({service.numberOfRatings} ratings)</span>
                </div>
              )}
              <CardDescription className="text-lg text-foreground/80">{service.shortDescription}</CardDescription>
            </CardHeader>

            <div className="space-y-3 text-sm text-foreground/90">
                {service.priceModel && (
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-accent" />
                        <span><strong>Pricing:</strong> {service.priceModel}</span>
                    </div>
                )}
                {service.estimatedTimeframe && (
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-accent" />
                        <span><strong>Timeline:</strong> {service.estimatedTimeframe}</span>
                    </div>
                )}
            </div>
          </div>
        </div>

        <Separator />

        <CardContent className="p-6 md:p-8">
            <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-foreground/90">
                <h2 className="text-2xl font-semibold text-primary mb-4">{dictionary.serviceDetailPageServiceOverview}</h2>
                <p>{service.longDescription}</p>
            </div>

            {service.features && service.features.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-primary mb-3 flex items-center"><CheckCircle className="mr-2 rtl:ml-2 h-5 w-5 text-accent"/>{dictionary.serviceDetailPageKeyFeatures}</h3>
                    <ul className="list-disc list-inside space-y-1 ps-5 text-foreground/80">
                        {service.features.map((feature, index) => <li key={index}>{feature}</li>)}
                    </ul>
                </div>
            )}

            {service.deliverables && service.deliverables.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-primary mb-3 flex items-center"><ListChecks className="mr-2 rtl:ml-2 h-5 w-5 text-accent"/>{dictionary.serviceDetailPageWhatYouGet}</h3>
                    <ul className="list-disc list-inside space-y-1 ps-5 text-foreground/80">
                        {service.deliverables.map((deliverable, index) => <li key={index}>{deliverable}</li>)}
                    </ul>
                </div>
            )}

            {service.technologies && service.technologies.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-primary mb-3">{dictionary.serviceDetailPageTechnologies}</h3>
                    <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">{tech}</Badge>
                    ))}
                    </div>
                </div>
            )}

            {service.tags && service.tags.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-primary mb-3 flex items-center"><Tag className="mr-2 rtl:ml-2 h-5 w-5 text-accent" />{dictionary.serviceDetailPageRelatedTags}</h3>
                    <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-sm px-3 py-1">{tag}</Badge>
                    ))}
                    </div>
                </div>
            )}

            <Separator className="my-8" />

            <div>
                <h3 className="text-xl font-semibold text-primary mb-4">{dictionary.serviceDetailPageRateThisService}</h3>
                <StarRatingInput
                    serviceId={service.id}
                    lang={lang}
                    dictionary={{
                        starRatingInputLoginPrompt: dictionary.starRatingInputLoginPrompt,
                        starRatingInputSubmitButton: dictionary.starRatingInputSubmitButton,
                        starRatingInputCommentPlaceholder: dictionary.starRatingInputCommentPlaceholder,
                        toastAuthRequiredTitle: dictionary.toastAuthRequiredTitle,
                        toastAuthRequiredDescription: dictionary.toastAuthRequiredDescription,
                        toastRatingRequiredTitle: dictionary.toastRatingRequiredTitle,
                        toastRatingRequiredDescription: dictionary.toastRatingRequiredDescription,
                        toastRatingSubmittedTitle: dictionary.toastRatingSubmittedTitle,
                        // toastRatingSubmittedDescription: dictionary.toastRatingSubmittedDescription, // this will come from action
                        toastRatingSubmitFailed: dictionary.toastRatingSubmitFailed,
                        toastUnexpectedError: dictionary.toastUnexpectedError,
                        navLogin: dictionary.navLogin // for the login link
                    }}
                />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}