import type { ReactNode } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import DashboardPageHeader from '@/components/layout/DashboardPageHeader'; // New Header for Dashboard
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/getDictionary';
import type { Dictionary } from '@/lib/getDictionary';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  // Pick only necessary dictionary keys for DashboardSidebar, DashboardPageHeader and layout
  const necessaryDictKeys: Pick<Dictionary,
    'dashboardNavOverview' |
    'dashboardNavProjects' |
    'dashboardNavServices' |
    'dashboardNavUsers' |
    'dashboardNavTeam' |
    'dashboardNavCMS' |
    'dashboardNavCMSContact' |
    'dashboardNavCMSAbout' |
    'dashboardNavSettings' |
    'siteName' |
    'dashboardTitle' |
    'navLogout' |
    'navLogin' |
    'navProfile' |
    'navChat' |
    'navNotifications' |
    'themeToggleDark' |
    'themeToggleLight' |
    'themeToggleSystem' |
    'language' |
    'english' |
    'arabic' |
    'toggleMenu'
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
    dashboardTitle: dictionary.dashboardTitle,
    navLogout: dictionary.navLogout,
    navLogin: dictionary.navLogin,
    navProfile: dictionary.navProfile,
    navChat: dictionary.navChat,
    navNotifications: dictionary.navNotifications,
    themeToggleDark: dictionary.themeToggleDark,
    themeToggleLight: dictionary.themeToggleLight,
    themeToggleSystem: dictionary.themeToggleSystem,
    language: dictionary.language,
    english: dictionary.english,
    arabic: dictionary.arabic,
    toggleMenu: dictionary.toggleMenu || "Toggle Menu", // Add a fallback for toggleMenu
  };


  return (
    <ProtectedRoute lang={lang}>
      <SidebarProvider defaultOpen>
        <div className="flex min-h-screen bg-background">
          <DashboardSidebar lang={lang} dictionary={necessaryDictKeys} />
          <SidebarInset className="flex-1 flex flex-col overflow-hidden"> {/* Added overflow-hidden */}
            <DashboardPageHeader lang={lang} dictionary={necessaryDictKeys} />
            <main className="flex-1 p-4 sm:p-6 overflow-auto">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}