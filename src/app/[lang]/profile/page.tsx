
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { getDictionary } from '@/lib/getDictionary';
import type { Locale } from '@/i18n-config';
import { User, Edit3, Shield, Bell, LogOut } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: `${dictionary.profilePageTitle} - ${dictionary.siteName}`,
    description: dictionary.profilePageSubtitle,
  };
}

export default async function ProfilePage({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);
  const localizedPath = (path: string) => `/${params.lang}${path}`;

  // Dummy user data - replace with actual data from AuthContext or backend
  const currentUser = {
    name: "Demo User",
    email: "demo.user@example.com",
    avatarUrl: "https://picsum.photos/seed/profile/200/200",
    avatarFallback: "DU",
    bio: "Passionate developer and tech enthusiast.",
    memberSince: new Date().toLocaleDateString(params.lang, { year: 'numeric', month: 'long', day: 'numeric' }),
  };

  return (
    <ProtectedRoute lang={params.lang}>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
            {dictionary.profilePageTitle}
          </h1>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            {dictionary.profilePageSubtitle}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Profile Card */}
          <Card className="md:col-span-1 shadow-xl">
            <CardHeader className="items-center text-center">
              <Avatar className="w-32 h-32 mb-4 border-4 border-primary shadow-md">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="user avatar" />
                <AvatarFallback className="text-4xl bg-muted">{currentUser.avatarFallback}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl font-semibold text-primary">{currentUser.name}</CardTitle>
              <CardDescription className="text-accent">{currentUser.email}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-foreground/80 mb-2">{currentUser.bio}</p>
              <p className="text-xs text-muted-foreground">
                {dictionary.profileMemberSince} {currentUser.memberSince}
              </p>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                <Edit3 className="me-2 rtl:ms-2 h-4 w-4" /> {dictionary.profileEditButton}
              </Button>
            </CardContent>
          </Card>

          {/* Profile Settings/Details */}
          <Card className="md:col-span-2 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary flex items-center">
                <User className="me-2 rtl:ms-2 h-5 w-5" /> {dictionary.profileAccountDetails}
              </CardTitle>
              <CardDescription>{dictionary.profileManageInfo}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{dictionary.formFullName}</Label>
                <Input id="name" defaultValue={currentUser.name} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{dictionary.formEmailAddress}</Label>
                <Input id="email" type="email" defaultValue={currentUser.email} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">{dictionary.profileBio}</Label>
                <Input id="bio" defaultValue={currentUser.bio} />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {dictionary.profileSaveChanges}
              </Button>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-primary flex items-center">
                  <Shield className="me-2 rtl:ms-2 h-5 w-5" /> {dictionary.profileSecurity}
                </h3>
                <Button variant="outline">{dictionary.profileChangePassword}</Button>
                <Button variant="outline">{dictionary.profileEnable2FA}</Button>
              </div>
              
              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-primary flex items-center">
                  <Bell className="me-2 rtl:ms-2 h-5 w-5" /> {dictionary.profileNotifications}
                </h3>
                <Link href={localizedPath('/notifications')}>
                    <Button variant="link" className="p-0 text-accent">{dictionary.profileManageNotifications}</Button>
                </Link>
              </div>

               <Separator className="my-6" />

              <div className="space-y-4">
                 <h3 className="text-lg font-medium text-primary flex items-center">
                  <LogOut className="me-2 rtl:ms-2 h-5 w-5" /> {dictionary.profileDangerZone}
                </h3>
                <Button variant="destructive" disabled>
                  {dictionary.profileDeleteAccount} (Coming Soon)
                </Button>
              </div>


            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
