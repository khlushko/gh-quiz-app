import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { StoreHydration } from '@/src/shared/store/store-hydration';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Quiz App',
  description: 'Personalized health quiz for every brand',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 font-sans">
        <StoreHydration />
        {children}
      </body>
    </html>
  );
}
