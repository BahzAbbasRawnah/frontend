'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { CodeXml, LogOut, User, Settings, Bell, MessageSquare, PanelLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/getDictionaryClient'; // Use client dictionary

interface DashboardPageHeaderProps {
  lang: Locale;
  dictionary: Pick<Dictionary,
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
  >;
}

export default function DashboardPageHeader({ lang, dictionary }: DashboardPageHeaderProps) {
  const { user, loading, logout } = useAuth();
  const localizedPath = (path: string) => `/${lang}${path}`;

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-card px-4 sm:px-6 shrink-0">
      {/* Left side: Mobile trigger and/or Title */}
      <div className="flex items-center gap-2">
        <SidebarTrigger asChild className="md:hidden">
          <Button size="icon" variant="outline">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">{dictionary.toggleMenu}</span>
          </Button>
        </SidebarTrigger>
        <Link href={localizedPath('/dashboard')} className="flex items-center gap-2">
          <CodeXml className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-primary hidden md:inline-block">{dictionary.siteName}</span>
        </Link>
      </div>

      {/* Right side: Auth, Theme, Lang */}
      <div className="flex items-center gap-2 md:gap-3">
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        ) : user ? (
          <>
            <Button variant="ghost" size="icon" asChild className="hidden md:inline-flex">
                <Link href={localizedPath('/chat')}>
                    <MessageSquare className="h-5 w-5"/>
                    <span className="sr-only">{dictionary.navChat}</span>
                </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hidden md:inline-flex">
                <Link href={localizedPath('/notifications')}>
                    <Bell className="h-5 w-5"/>
                    <span className="sr-only">{dictionary.navNotifications}</span>
                </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || 'User avatar'} />
                    <AvatarFallback>{user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={lang === 'ar' ? 'start' : 'end'} className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || user.email}</p>
                    {user.displayName && <p className="text-xs leading-none text-muted-foreground">{user.email}</p>}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={localizedPath('/profile')} className="w-full">
                    <User className="me-2 rtl:ms-2 h-4 w-4" />
                    <span>{dictionary.navProfile}</span>
                  </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild className="md:hidden">
                  <Link href={localizedPath('/chat')} className="w-full">
                    <MessageSquare className="me-2 rtl:ms-2 h-4 w-4" />
                    <span>{dictionary.navChat}</span>
                  </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild className="md:hidden">
                  <Link href={localizedPath('/notifications')} className="w-full">
                    <Bell className="me-2 rtl:ms-2 h-4 w-4" />
                    <span>{dictionary.navNotifications}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout(lang)}>
                  <LogOut className="me-2 rtl:ms-2 h-4 w-4" />
                  <span>{dictionary.navLogout}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button asChild size="sm">
            <Link href={localizedPath('/login')}>{dictionary.navLogin}</Link>
          </Button>
        )}
        <div className="hidden sm:flex"> {/* Hide on very small screens if space is tight */}
            <ThemeToggle dictionary={{
                themeToggleDark: dictionary.themeToggleDark,
                themeToggleLight: dictionary.themeToggleLight,
                themeToggleSystem: dictionary.themeToggleSystem
            }} />
        </div>
        <div className="hidden sm:flex">
            <LanguageSwitcher
            currentLocale={lang}
            dictionary={{
                language: dictionary.language,
                english: dictionary.english,
                arabic: dictionary.arabic
            }}
            />
        </div>
      </div>
    </header>
  );
}