
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, Users, Settings, BarChart3, MessageSquare, Bell } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/getDictionary';
import type { Dictionary } from '@/lib/getDictionary';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: `${dictionary.dashboardOverviewTitle} - ${dictionary.siteName}`,
    description: dictionary.dashboardOverviewSubtitle,
  };
}

export default async function DashboardOverviewPage({ params }: { params: { lang: Locale } }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  const localizedPath = (path: string) => `/${lang}${path}`;

  return (
    <ProtectedRoute lang={lang}>
      <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold text-primary">{dictionary.dashboardOverviewTitle}</h1>
            <p className="text-lg text-muted-foreground mt-1">{dictionary.dashboardOverviewSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <CardTitle className="text-sm font-medium">{dictionary.dashboardNavUsers}</CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">150</div>
              <p className="text-xs text-muted-foreground">+10 this month</p>
            </CardContent>
            <CardFooter>
                <Button size="sm" asChild variant="outline">
                    <Link href={localizedPath('/dashboard/users')}>{dictionary.dashboardGoToUsers}</Link>
                </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{dictionary.dashboardNavServices}</CardTitle>
              <Settings className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4 Core</div>
              <p className="text-xs text-muted-foreground">All services operational</p>
            </CardContent>
            <CardFooter>
                <Button size="sm" asChild variant="outline">
                    <Link href={localizedPath('/dashboard/services')}>{dictionary.dashboardGoToServices}</Link>
                </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-primary flex items-center">
                        <BarChart3 className="me-2 rtl:ms-2 h-5 w-5" />
                        {dictionary.dashboardProjectOverview}
                    </CardTitle>
                    <CardDescription>{dictionary.dashboardProjectOverviewPlaceholder}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-64 bg-secondary/30 rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">{dictionary.dashboardAnalyticsComingSoon}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{dictionary.dashboardTeamChat}</CardTitle>
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">5 Unread</div>
                <p className="text-xs text-muted-foreground">New messages in #general</p>
                </CardContent>
                <CardFooter>
                    <Button size="sm" asChild variant="outline">
                        <Link href={localizedPath('/chat')}>{dictionary.dashboardOpenChat}</Link>
                    </Button>
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
                </CardContent>
                <CardFooter>
                    <Button size="sm" asChild variant="outline">
                        <Link href={localizedPath('/notifications')}>{dictionary.dashboardViewNotifications}</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>

      </div>
    </ProtectedRoute>
  );
}
