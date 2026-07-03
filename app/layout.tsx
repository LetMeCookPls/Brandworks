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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://brandworkskwt.com'),
  title: {
    default: 'Brandworks Advertising | Premium Signage & Retail Design in Kuwait',
    template: '%s | Brandworks Advertising Kuwait',
  },
  description: 'Brandworks is a premium international agency in Kuwait specializing in bespoke signage, luxury retail mall pop-ups, exhibition stands, and interior design across the GCC.',
  keywords: ['Brandworks Kuwait', 'Advertising Agency Kuwait', 'Custom Signage Kuwait', 'Retail Design GCC', 'Exhibition Stands Kuwait', 'Mall Pop-ups', 'Acrylic Fabrication', 'Interior Design'],
  authors: [{ name: 'Brandworks Advertising' }],
  creator: 'Brandworks Advertising',
  openGraph: {
    type: 'website',
    locale: 'en_KW',
    url: '/',
    title: 'Brandworks Advertising | Premium Signage & Retail Design in Kuwait',
    description: 'Brandworks is a premium international agency in Kuwait specializing in bespoke signage, luxury retail mall pop-ups, exhibition stands, and interior design across the GCC.',
    siteName: 'Brandworks Advertising',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brandworks Advertising | Premium Signage & Retail Design in Kuwait',
    description: 'Brandworks is a premium international agency in Kuwait specializing in bespoke signage, luxury retail mall pop-ups, exhibition stands, and interior design across the GCC.',
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
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
