import type {Metadata} from 'next';
import './globals.css';
import {ThemeProvider} from '@/hooks/use-theme';

export const metadata: Metadata = {
  title: 'Dogão do Pastor - Delivery',
  description: 'Sistema de entrega em tempo real',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className="antialiased selection:bg-yellow-400 selection:text-black">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
