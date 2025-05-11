
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
import { Switch } from '@/components/ui/switch';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: `${dictionary.dashboardSettingsTitle} - ${dictionary.siteName}`,
    description: dictionary.dashboardSettingsSubtitle,
  };
}

export default async function WebsiteSettingsPage({ params }: { params: { lang: Locale } }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  return (
    <ProtectedRoute lang={lang}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">{dictionary.dashboardSettingsTitle}</h1>
          <p className="text-lg text-muted-foreground mt-1">{dictionary.dashboardSettingsSubtitle}</p>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="siteNameInput">Site Name ({lang.toUpperCase()})</Label>
              <Input id="siteNameInput" defaultValue={dictionary.siteName} disabled />
              <p className="text-xs text-muted-foreground mt-1">To change the site name, edit the common.json files in /src/locales.</p>
            </div>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Switch id="maintenance-mode" disabled />
              <Label htmlFor="maintenance-mode">Maintenance Mode (Placeholder)</Label>
            </div>

             <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Switch id="enable-dark-mode-toggle" defaultChecked disabled />
              <Label htmlFor="enable-dark-mode-toggle">Enable Dark Mode Toggle for Users</Label>
            </div>

            <Button disabled className="mt-4">
              <Save className="me-2 rtl:ms-2 h-5 w-5" />
              Save Settings (Placeholder)
            </Button>
             <div className="mt-6 p-4 text-center bg-secondary/50 rounded-md">
                <p className="text-sm text-muted-foreground">{dictionary.dashboardComingSoon} Full settings management is under development.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
