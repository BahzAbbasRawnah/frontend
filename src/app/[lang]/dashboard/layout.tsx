
import type { ReactNode } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/getDictionary';
import type { Dictionary } from '@/lib/getDictionary';
import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  // Pick only necessary dictionary keys for DashboardSidebar and layout
  const sidebarDictionary: Pick<Dictionary,
    'dashboardNavOverview' |
    'dashboardNavProjects' |
    'dashboardNavServices' |
    'dashboardNavUsers' |
    'dashboardNavTeam' |
    'dashboardNavCMS' |
    'dashboardNavCMSContact' |
    'dashboardNavCMSAbout' |
    'dashboardNavSettings' |
    'siteName'
  > = {
    dashboardNavOverview: dictionary.dashboardNavOverview,
    dashboardNavProjects: dictionary.dashboardNavProjects,
    dashboardNavServices: dictionary.dashboardNavServices,
    dashboardNavUsers: dictionary.dashboardNavUsers,
    dashboardNavTeam: dictionary.dashboardNavTeam,
    dashboardNavCMS: dictionary.dashboardNavCMS,
    dashboardNavCMSContact: dictionary.dashboardNavCMSContact,
    dashboardNavCMSAbout: dictionary.dashboardNavCMSAbout,
    dashboardNavSettings: dictionary.dashboardNavSettings,
    siteName: dictionary.siteName,
  };


  return (
    <ProtectedRoute lang={lang}>
      <SidebarProvider defaultOpen>
        <div className="flex min-h-screen">
          <DashboardSidebar lang={lang} dictionary={sidebarDictionary} />
          <SidebarInset className="flex-1 flex flex-col">
            <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4 md:hidden">
              {/* Mobile Sidebar Trigger - Placed inside SidebarInset for proper layout flow */}
              <SidebarTrigger asChild>
                <Button size="icon" variant="outline">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SidebarTrigger>
               <h1 className="text-lg font-semibold text-primary">{dictionary.dashboardTitle}</h1>
            </header>
            <main className="flex-1 p-4 sm:p-6 overflow-auto">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
