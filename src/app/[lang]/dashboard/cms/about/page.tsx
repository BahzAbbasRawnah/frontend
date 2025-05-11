
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/getDictionary';
import type { Dictionary } from '@/lib/getDictionary';
import type { Metadata } from 'next';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: `${dictionary.dashboardCMSAboutTitle} - ${dictionary.siteName}`,
    description: dictionary.dashboardCMSAboutSubtitle,
  };
}

export default async function CMSAboutPage({ params }: { params: { lang: Locale } }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  return (
    <ProtectedRoute lang={lang}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">{dictionary.dashboardCMSAboutTitle}</h1>
          <p className="text-lg text-muted-foreground mt-1">{dictionary.dashboardCMSAboutSubtitle}</p>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Edit About Page Sections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="ourStory">{dictionary.aboutUsOurStoryTitle}</Label>
              <Textarea id="ourStory" defaultValue={dictionary.aboutUsOurStoryContent.substring(0,150) + "..."} rows={5} disabled />
            </div>
            <div>
              <Label htmlFor="ourMission">{dictionary.aboutUsOurMissionTitle}</Label>
              <Textarea id="ourMission" defaultValue={dictionary.aboutUsOurMissionContent.substring(0,150) + "..."} rows={5} disabled />
            </div>
            {/* Add more fields for values, team members etc. as needed */}
            <Button disabled className="mt-4">
              <Save className="me-2 rtl:ms-2 h-5 w-5" />
              Save Changes (Placeholder)
            </Button>
            <div className="mt-6 p-4 text-center bg-secondary/50 rounded-md">
                <p className="text-sm text-muted-foreground">{dictionary.dashboardComingSoon} Full editing functionality for all 'About Us' sections is under development.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
