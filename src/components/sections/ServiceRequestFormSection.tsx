import ServiceRequestForm from '@/components/forms/ServiceRequestForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ServiceRequestFormSection() {
  return (
    <section id="service-request" className="py-16 lg:py-24 bg-secondary/50">
      <div className="container max-w-4xl px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">Let's Build Something Amazing</CardTitle>
            <CardDescription className="mt-3 text-lg text-foreground/80">
              Have a project in mind? Fill out the form below, and our team will get back to you shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <ServiceRequestForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
