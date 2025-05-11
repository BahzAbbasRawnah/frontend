'use client'; 

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, CodeXml, LogOut, UserCircle, LayoutDashboard, Loader2, Briefcase } from 'lucide-react'; 
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/getDictionary';

interface HeaderProps {
  lang: Locale;
  dictionary: Pick<Dictionary, 
    'siteName' | 'navServices' | 'navProjects' | 'navValueAI' | 'navContact' | 
    'navDashboard' | 'navLogin' | 'navSignup' | 'navLogout' | 'requestServiceButton' |
    'themeToggleLight' | 'themeToggleDark' | 'themeToggleSystem' | 'language' | 'english' | 'arabic'
  >;
}


export default function Header({ lang, dictionary }: HeaderProps) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname(); // This will include the locale, e.g., /en/about
  const [currentHash, setCurrentHash] = useState('');

  const baseNavItems = [
    { href: '/services', labelKey: 'navServices', icon: Briefcase }, 
    { href: '/#projects', labelKey: 'navProjects' },
    { href: '/#value-ai', labelKey: 'navValueAI' },
    { href: '/#contact', labelKey: 'navContact' },
  ];


  useEffect(() => {
    const updateHash = () => {
      if (typeof window !== 'undefined') {
        setCurrentHash(window.location.hash);
      }
    };

    updateHash(); 

    window.addEventListener('hashchange', updateHash);
    return () => {
      window.removeEventListener('hashchange', updateHash);
    };
  }, []); // Pathname is not needed here as hash is independent

  const navItems = user
    ? [{ href: '/dashboard', labelKey: 'navDashboard', icon: LayoutDashboard }, ...baseNavItems]
    : baseNavItems;

  const getLocalizedPath = (path: string) => {
    if (path.startsWith('/#')) { // For hash links on the current locale's home page
      return `/${lang}${path}`;
    }
    return `/${lang}${path}`;
  };
  
  // Pathname includes locale, e.g. /en/services. Item href is /services
  const isLinkActive = (itemHref: string) => {
    const localizedItemHref = getLocalizedPath(itemHref);
    if (itemHref.includes('#')) {
      // For hash links, check if the base path matches and then if the hash matches
      const [basePath, hash] = localizedItemHref.split('#');
      // Pathname example: /en/ or /en/#projects
      // BasePath example: /en/ or /en/#projects
      
      // If pathname is just /en or /ar (homepage) and itemHref is /en/#something
      if ((pathname === `/${lang}` || pathname === `/${lang}/`) && itemHref.startsWith('/#')) {
         return currentHash === `#${hash}`;
      }
      // If pathname is /en/somepage and itemHref is /en/#something, this should not be active
      // unless current page is homepage.
      // Check if pathname (without hash) matches basePath and then compare hash.
      return pathname.split('#')[0] === basePath && (hash ? currentHash === `#${hash}` : true);
    }
    return pathname === localizedItemHref;
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={getLocalizedPath('/')} className="flex items-center gap-2">
          <CodeXml className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-primary">{dictionary.siteName}</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button 
              key={item.labelKey} 
              variant={isLinkActive(item.href) ? "secondary" : "ghost"} 
              asChild
            >
              <Link href={getLocalizedPath(item.href)} className="flex items-center gap-2 px-3 py-2">
                {item.icon && <item.icon className="h-4 w-4" />}
                {dictionary[item.labelKey as keyof typeof dictionary]}
              </Link>
            </Button>
          ))}
          {loading ? (
            <Button variant="ghost" size="icon" disabled className="ml-2">
              <Loader2 className="h-5 w-5 animate-spin" />
            </Button>
          ) : user ? (
            <>
              <Button variant="ghost" onClick={() => logout(lang)} className="flex items-center gap-2 ml-2 px-3 py-2">
                <LogOut className="h-4 w-4" /> {dictionary.navLogout}
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="ml-2">
                <Link href={getLocalizedPath('/login')} className="flex items-center gap-2 px-3 py-2">
                  <UserCircle className="h-4 w-4" /> {dictionary.navLogin}
                </Link>
              </Button>
              <Button asChild className="ml-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href={getLocalizedPath('/signup')}>{dictionary.navSignup}</Link>
              </Button>
            </>
          )}
           {!user && ( 
             <Button asChild className="ml-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href={getLocalizedPath('/#service-request')}>{dictionary.requestServiceButton}</Link>
            </Button>
           )}
          <div className="ml-2">
            <ThemeToggle dictionary={{themeToggleDark: dictionary.themeToggleDark, themeToggleLight: dictionary.themeToggleLight, themeToggleSystem: dictionary.themeToggleSystem}} />
          </div>
          <div className="ml-1">
            <LanguageSwitcher currentLocale={lang} dictionary={{language: dictionary.language, english: dictionary.english, arabic: dictionary.arabic }} />
          </div>
        </nav>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={lang === 'ar' ? 'left' : 'right'} className="w-[300px] sm:w-[400px] p-6">
            <Link href={getLocalizedPath('/')} className="flex items-center gap-2 mb-6">
              <CodeXml className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold text-primary">{dictionary.siteName}</span>
            </Link>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                 <SheetClose asChild key={item.labelKey}>
                    <Button 
                      variant={isLinkActive(item.href) ? "secondary" : "ghost"} 
                      asChild 
                      className="justify-start text-lg w-full"
                    >
                      <Link href={getLocalizedPath(item.href)} className="flex items-center gap-3 py-3 px-2">
                        {item.icon && <item.icon className="h-5 w-5" />}
                        {dictionary[item.labelKey as keyof typeof dictionary]}
                      </Link>
                    </Button>
                 </SheetClose>
              ))}
              <hr className="my-3 border-border" />
              {loading ? (
                <div className="flex justify-start py-3 px-2">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : user ? (
                <SheetClose asChild>
                    <Button variant="ghost" onClick={() => logout(lang)} className="justify-start text-lg w-full flex items-center gap-3 py-3 px-2">
                        <LogOut className="h-5 w-5" /> {dictionary.navLogout}
                    </Button>
                </SheetClose>
              ) : (
                <>
                  <SheetClose asChild>
                    <Button variant="ghost" asChild className="justify-start text-lg w-full">
                      <Link href={getLocalizedPath('/login')} className="flex items-center gap-3 py-3 px-2">
                        <UserCircle className="h-5 w-5" /> {dictionary.navLogin}
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3 mt-2">
                        <Link href={getLocalizedPath('/signup')}>{dictionary.navSignup}</Link>
                    </Button>
                  </SheetClose>
                </>
              )}
               {!user && (
                 <SheetClose asChild>
                    <Button asChild className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3">
                        <Link href={getLocalizedPath('/#service-request')}>{dictionary.requestServiceButton}</Link>
                    </Button>
                 </SheetClose>
               )}
                <div className="mt-4 flex justify-start items-center gap-2 px-2">
                  <ThemeToggle dictionary={{themeToggleDark: dictionary.themeToggleDark, themeToggleLight: dictionary.themeToggleLight, themeToggleSystem: dictionary.themeToggleSystem}} />
                  <LanguageSwitcher currentLocale={lang} dictionary={{language: dictionary.language, english: dictionary.english, arabic: dictionary.arabic }}/>
                </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}