import ServiceRequestForm from '@/components/forms/ServiceRequestForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/getDictionary';

interface ServiceRequestFormSectionProps {
  lang: Locale;
  dictionary: Pick<Dictionary, 
    'serviceRequestTitle' | 
    'serviceRequestSubtitle' |
    'formFullName' | 'formEmailAddress' | 'formCompanyOptional' | 'formProjectDescription' |
    'formProjectDescriptionHint' | 'formBudgetOptional' | 'formTimelineOptional' |
    'formSendRequestButton' | 'formSubmittingButton' |
    'toastRequestSubmittedTitle' | 'toastSubmissionFailedTitle' | 'toastUnexpectedError'
  > & { navLogin: string }; // Added navLogin for StarRatingInput's login link
}


export default function ServiceRequestFormSection({ lang, dictionary }: ServiceRequestFormSectionProps) {
  return (
    <section id="service-request" className="py-16 lg:py-24 bg-secondary/50">
      <div className="container max-w-4xl px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">{dictionary.serviceRequestTitle}</CardTitle>
            <CardDescription className="mt-3 text-lg text-foreground/80">
              {dictionary.serviceRequestSubtitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <ServiceRequestForm dictionary={dictionary} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}