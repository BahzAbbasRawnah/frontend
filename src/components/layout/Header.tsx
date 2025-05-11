'use client'; // Add this because we use useAuth hook

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, CodeXml, LogOut, UserCircle, LayoutDashboard, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const baseNavItems = [
  { href: '/#projects', label: 'Projects' },
  { href: '/#value-ai', label: 'Value AI' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header() {
  const { user, loading, logout } = useAuth();

  const navItems = user
    ? [{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }, ...baseNavItems]
    : baseNavItems;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <CodeXml className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-primary">CodeCanvas</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild>
              <Link href={item.href} className="flex items-center gap-2 px-3 py-2"> {/* Added padding for better spacing */}
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
              </Link>
            </Button>
          ))}
          {loading ? (
            <Button variant="ghost" size="icon" disabled className="ml-2">
              <Loader2 className="h-5 w-5 animate-spin" />
            </Button>
          ) : user ? (
            <>
              <Button variant="ghost" onClick={logout} className="flex items-center gap-2 ml-2 px-3 py-2">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="ml-2">
                <Link href="/login" className="flex items-center gap-2 px-3 py-2">
                  <UserCircle className="h-4 w-4" /> Login
                </Link>
              </Button>
              <Button asChild className="ml-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
           {!user && ( // Show "Request Service" only if not logged in, or adjust logic as needed
             <Button asChild className="ml-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/#service-request">Request Service</Link>
            </Button>
           )}
        </nav>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] p-6">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <CodeXml className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold text-primary">CodeCanvas</span>
            </Link>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                 <SheetClose asChild key={item.label}>
                    <Button variant="ghost" asChild className="justify-start text-lg w-full">
                      <Link href={item.href} className="flex items-center gap-3 py-3 px-2">
                        {item.icon && <item.icon className="h-5 w-5" />}
                        {item.label}
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
                    <Button variant="ghost" onClick={logout} className="justify-start text-lg w-full flex items-center gap-3 py-3 px-2">
                        <LogOut className="h-5 w-5" /> Logout
                    </Button>
                </SheetClose>
              ) : (
                <>
                  <SheetClose asChild>
                    <Button variant="ghost" asChild className="justify-start text-lg w-full">
                      <Link href="/login" className="flex items-center gap-3 py-3 px-2">
                        <UserCircle className="h-5 w-5" /> Login
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3 mt-2">
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                  </SheetClose>
                </>
              )}
               {!user && (
                 <SheetClose asChild>
                    <Button asChild className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3">
                        <Link href="/#service-request">Request Service</Link>
                    </Button>
                 </SheetClose>
               )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
