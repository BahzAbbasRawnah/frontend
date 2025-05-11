import type { Metadata } from 'next';
import { Geist } from 'next/font/google'; // Corrected import for Geist Sans
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/contexts/AuthContext'; // Import AuthProvider

const geistSans = Geist({ // Corrected instantiation
  variable: '--font-geist-sans',
  subsets: ['latin'],
});


export const metadata: Metadata = {
  title: 'CodeCanvas - Your Programming Partner',
  description: 'Showcasing services, projects, and offering expert programming solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(geistSans.variable, "min-h-screen flex flex-col antialiased")}>
        <AuthProvider> {/* Wrap with AuthProvider */}
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
