import type { Metadata } from 'next';
import { Syne, DM_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['700', '800'] });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', weight: ['400', '500'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', weight: ['500'] });

export const metadata: Metadata = {
  title: 'Brandworks Advertising | Kuwait',
  description: 'A premium international agency specializing in signage, shop installation, interiors, and branding/design.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${syne.variable} ${dmSans.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased text-white bg-brand-black min-h-screen flex flex-col font-dm-sans">
        <CustomCursor />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
