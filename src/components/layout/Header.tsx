import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, CodeXml } from 'lucide-react'; // Changed Code to CodeXml for a more specific icon
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#projects', label: 'Projects' },
  { href: '#value-ai', label: 'Value AI' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <CodeXml className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-primary">CodeCanvas</span>
        </Link>
        
        <nav className="hidden md:flex gap-2">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
          <Button asChild className="ml-2 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="#service-request">Request Service</Link>
          </Button>
        </nav>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Button key={item.label} variant="ghost" asChild className="justify-start text-lg">
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
              <Button asChild className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3">
                <Link href="#service-request">Request Service</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
