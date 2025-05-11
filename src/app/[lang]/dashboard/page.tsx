import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, MessageSquare, Bell, Settings, Users, PlusCircle } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/getDictionary';


export default async function DashboardPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const localizedPath = (path: string) => `/${lang}${path}`;

  return (
    <ProtectedRoute lang={lang}>
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary">{dictionary.dashboardTitle}</h1>
            <p className="text-lg text-muted-foreground mt-1">{dictionary.dashboardWelcome}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{dictionary.dashboardActiveProjects}</CardTitle>
              <Briefcase className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 since last week</p>
            </CardContent>
            <CardFooter>
                <Button size="sm" asChild variant="outline">
                    <Link href={localizedPath('/dashboard/projects')}>{dictionary.dashboardViewProjects}</Link>
                </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{dictionary.dashboardTeamChat}</CardTitle>
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 Unread</div>
               <p className="text-xs text-muted-foreground">New messages in #general</p>
               <p className="text-sm text-accent mt-2">(Chat feature coming soon!)</p>
            </CardContent>
             <CardFooter>
                <Button size="sm" variant="outline" disabled>{dictionary.dashboardOpenChat}</Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{dictionary.dashboardNotifications}</CardTitle>
              <Bell className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 New</div>
              <p className="text-xs text-muted-foreground">Project milestones updated</p>
              <p className="text-sm text-accent mt-2">(Notifications feature coming soon!)</p>
            </CardContent>
            <CardFooter>
                <Button size="sm" variant="outline" disabled>{dictionary.dashboardViewNotifications}</Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="shadow-xl">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">{dictionary.dashboardQuickActions}</CardTitle>
                <CardDescription>Perform common tasks quickly.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
                <Button variant="default" className="bg-primary hover:bg-primary/90">
                    <PlusCircle className="mr-2 h-4 w-4" /> {dictionary.dashboardCreateNewProject}
                </Button>
                <Button variant="outline">
                    <Users className="mr-2 h-4 w-4" /> {dictionary.dashboardManageTeam}
                </Button>
                <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" /> {dictionary.dashboardAccountSettings}
                </Button>
            </CardContent>
        </Card>

        <div className="mt-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-primary">{dictionary.dashboardProjectOverview}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{dictionary.dashboardProjectOverviewPlaceholder}</p>
                     <div className="mt-4 p-8 text-center bg-secondary/50 rounded-md">
                        <p className="text-lg font-medium">{dictionary.dashboardAnalyticsComingSoon}</p>
                    </div>
                </CardContent>
            </Card>
        </div>

      </div>
    </ProtectedRoute>
  );
}