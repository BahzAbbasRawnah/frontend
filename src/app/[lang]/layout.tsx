import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import '../globals.css'; // Adjusted path
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/getDictionary';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// export const metadata: Metadata = { // Metadata will be generated dynamically based on lang
//   title: 'CodeCanvas - Your Programming Partner',
//   description: 'Showcasing services, projects, and offering expert programming solutions.',
// };

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.siteName + " - Your Programming Partner",
    description: dictionary.heroSubtitle,
  };
}


export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const dictionary = await getDictionary(params.lang);
  return (
    <html lang={params.lang} dir={params.lang === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={cn(geistSans.variable, "min-h-screen flex flex-col antialiased")}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <AuthProvider>
            <Header lang={params.lang} dictionary={dictionary} />
            <main className="flex-grow">
              {children}
            </main>
            <Footer lang={params.lang} dictionary={dictionary} />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}