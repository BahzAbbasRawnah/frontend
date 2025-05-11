
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/getDictionary';
import type { Dictionary } from '@/lib/getDictionary';
import type { Metadata } from 'next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: `${dictionary.dashboardCMSContactTitle} - ${dictionary.siteName}`,
    description: dictionary.dashboardCMSContactSubtitle,
  };
}

export default async function CMSContactPage({ params }: { params: { lang: Locale } }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  return (
    <ProtectedRoute lang={lang}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">{dictionary.dashboardCMSContactTitle}</h1>
          <p className="text-lg text-muted-foreground mt-1">{dictionary.dashboardCMSContactSubtitle}</p>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Edit Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="contactEmail">{dictionary.formEmailAddress}</Label>
              <Input id="contactEmail" type="email" defaultValue="contact@codecanvas.dev" disabled />
            </div>
            <div>
              <Label htmlFor="contactPhone">{dictionary.contactCallUs}</Label>
              <Input id="contactPhone" type="tel" defaultValue="+1 (555) 123-4567" disabled />
            </div>
            <div>
              <Label htmlFor="githubLink">GitHub Link</Label>
              <Input id="githubLink" type="url" defaultValue="https://github.com/your-team" disabled />
            </div>
             <div>
              <Label htmlFor="linkedinLink">LinkedIn Link</Label>
              <Input id="linkedinLink" type="url" defaultValue="https://linkedin.com/company/your-team" disabled />
            </div>
             <div>
              <Label htmlFor="twitterLink">Twitter Link</Label>
              <Input id="twitterLink" type="url" defaultValue="https://twitter.com/your-team" disabled />
            </div>
            <Button disabled className="mt-4">
              <Save className="me-2 rtl:ms-2 h-5 w-5" />
              Save Changes (Placeholder)
            </Button>
             <div className="mt-6 p-4 text-center bg-secondary/50 rounded-md">
                <p className="text-sm text-muted-foreground">{dictionary.dashboardComingSoon} Full editing functionality is under development.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
