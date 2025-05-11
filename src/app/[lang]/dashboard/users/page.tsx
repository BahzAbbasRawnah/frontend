
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/getDictionary';
import type { Dictionary } from '@/lib/getDictionary';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: `${dictionary.dashboardUsersTitle} - ${dictionary.siteName}`,
    description: dictionary.dashboardUsersSubtitle,
  };
}

export default async function ManageUsersPage({ params }: { params: { lang: Locale } }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  return (
    <ProtectedRoute lang={lang}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">{dictionary.dashboardUsersTitle}</h1>
            <p className="text-lg text-muted-foreground mt-1">{dictionary.dashboardUsersSubtitle}</p>
          </div>
          <Button disabled>
            <UserPlus className="me-2 rtl:ms-2 h-5 w-5" />
            Invite User (Placeholder)
          </Button>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>User List</CardTitle>
            <CardDescription>A table of all registered users will be displayed here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-8 text-center bg-secondary/50 rounded-md">
                <p className="text-lg font-medium">{dictionary.dashboardComingSoon}</p>
                <p className="text-sm text-muted-foreground">User management features like listing users, managing roles, and viewing user details will be available here.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
