
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { getDictionary } from '@/lib/getDictionary';
import type { Locale } from '@/i18n-config';
import { Bell, CheckCheck, Settings, Trash2 } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: `${dictionary.notificationsPageTitle} - ${dictionary.siteName}`,
    description: dictionary.notificationsPageSubtitle,
  };
}

// Dummy notifications data
const dummyNotifications = [
  { id: '1', title: 'Project Alpha Update', message: 'Task "Implement Login Feature" has been completed by Alice.', time: '10 minutes ago', read: false, type: 'project' },
  { id: '2', title: 'New Message', message: 'Bob sent you a new message in "General Chat".', time: '1 hour ago', read: false, type: 'chat' },
  { id: '3', title: 'Service Request Approved', message: 'Your request for "Cloud Solutions" has been approved and assigned.', time: 'Yesterday', read: true, type: 'service' },
  { id: '4', title: 'Maintenance Scheduled', message: 'System maintenance is scheduled for tomorrow at 2 AM.', time: '2 days ago', read: true, type: 'system' },
  { id: '5', title: 'Review Needed', message: 'Charlie requested your review on the "New Landing Page Design".', time: '3 days ago', read: false, type: 'project' },
];

function NotificationIcon({ type }: { type: string }) {
    // Simple icon mapping, can be expanded
    if (type === 'project') return <Bell className="h-5 w-5 text-blue-500" />;
    if (type === 'chat') return <MessageSquare className="h-5 w-5 text-green-500" />;
    if (type === 'service') return <Briefcase className="h-5 w-5 text-purple-500" />; // Assuming Briefcase for service
    return <Bell className="h-5 w-5 text-gray-500" />;
}


export default async function NotificationsPage({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);

  return (
    <ProtectedRoute lang={params.lang}>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl flex items-center">
            <Bell className="me-3 rtl:ms-3 h-10 w-10" /> {dictionary.notificationsPageTitle}
          </h1>
          <p className="mt-3 text-lg text-foreground/80 max-w-2xl">
            {dictionary.notificationsPageSubtitle}
          </p>
        </header>

        <Card className="shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
            <div className="flex items-center gap-2">
                <CardTitle className="text-xl font-semibold text-primary">{dictionary.notificationsRecent}</CardTitle>
                <span className="text-sm bg-primary text-primary-foreground rounded-full px-2.5 py-0.5">
                    {dummyNotifications.filter(n => !n.read).length} {dictionary.notificationsUnread}
                </span>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                    <CheckCheck className="me-2 rtl:ms-2 h-4 w-4" /> {dictionary.notificationsMarkAllRead}
                </Button>
                <Button variant="ghost" size="icon" disabled>
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">{dictionary.notificationsSettings}</span>
                </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {dummyNotifications.length > 0 ? (
              <ScrollArea className="h-[calc(100vh-20rem)] md:h-[500px]">
                <ul className="divide-y divide-border">
                  {dummyNotifications.map((notification) => (
                    <li key={notification.id} className={`p-4 hover:bg-secondary/50 transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}>
                      <div className="flex items-start gap-4">
                        <div className={`mt-1 p-2 rounded-full ${!notification.read ? 'bg-accent/20' : 'bg-muted'}`}>
                           <NotificationIcon type={notification.type} />
                        </div>
                        <div className="flex-grow">
                          <h3 className={`font-semibold ${!notification.read ? 'text-primary' : 'text-foreground'}`}>{notification.title}</h3>
                          <p className="text-sm text-foreground/80">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                        <div className="flex-shrink-0">
                           {!notification.read && (
                             <Button variant="ghost" size="sm" className="text-xs text-accent hover:text-accent/80" disabled>
                               {dictionary.notificationsMarkAsRead}
                             </Button>
                           )}
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive h-8 w-8" disabled>
                               <Trash2 className="h-4 w-4" />
                               <span className="sr-only">{dictionary.notificationsDelete}</span>
                           </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            ) : (
              <div className="p-8 text-center">
                <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-primary">{dictionary.notificationsEmptyTitle}</p>
                <p className="text-sm text-muted-foreground">{dictionary.notificationsEmptySubtitle}</p>
              </div>
            )}
          </CardContent>
           {dummyNotifications.length > 0 && (
            <CardFooter className="border-t pt-4 text-center">
                <p className="text-sm text-muted-foreground">{dictionary.notificationsEndOfList}</p>
            </CardFooter>
           )}
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-8">{dictionary.notificationsFeatureComingSoon}</p>
      </div>
    </ProtectedRoute>
  );
}

// Helper icons (could be moved to a separate file if many are needed)
function MessageSquare({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
  );
}

function Briefcase({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
    );
}

