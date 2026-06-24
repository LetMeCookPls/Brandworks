import type { Metadata } from 'next';
import { Syne, DM_Sans, Space_Grotesk, Bebas_Neue, Playfair_Display, Cinzel } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoBackground from '@/components/VideoBackground';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['500', '600', '700', '800'] });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', weight: ['400', '500'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', weight: ['500'] });
const bebasNeue = Bebas_Neue({ subsets: ['latin'], variable: '--font-bebas', weight: ['400'] });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', weight: ['400', '500', '600', '700', '800', '900'] });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel', weight: ['400', '500', '600', '700', '800', '900'] });

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
    <html lang="en" className={`scroll-smooth bg-brand-black ${syne.variable} ${dmSans.variable} ${spaceGrotesk.variable} ${bebasNeue.variable} ${playfair.variable} ${cinzel.variable}`}>
      <body className="font-sans antialiased text-white bg-transparent min-h-screen flex flex-col font-dm-sans">
        {/* Fixed looping video — sits behind all non-Hero, non-Footer sections */}
        <VideoBackground />
        <CustomCursor />
        <Navbar />
        <main className="flex-grow">{children}</main>
        {/* Seamless transition fade from global background to the Footer */}
        <div className="w-full h-48 sm:h-64 bg-gradient-to-b from-transparent to-[#050508] pointer-events-none z-0" aria-hidden="true" />
        <Footer />
      </body>
    </html>
  );
}
