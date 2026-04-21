'use client';

const LogoMark = () => (
  <div className="grid grid-cols-2 grid-rows-2 gap-[2px] w-4 h-4">
    <div className="bg-brand-crimson w-full h-full" />
    <div className="bg-brand-blue w-full h-full" />
    <div className="bg-brand-teal w-full h-full" />
    <div className="bg-brand-yellow w-full h-full" />
  </div>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.65-3.8A9 9 0 1 1 20 18.94a9 9 0 0 1-12.8 0L3 21z"/>
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full py-12 md:py-16 bg-brand-dark border-t border-white/5 flex flex-col items-center">
      <div className="flex items-center gap-3 mb-6">
        <LogoMark />
        <span className="font-syne font-bold text-xl tracking-tight text-white">Brandworks Advertising</span>
      </div>
      
      <div className="flex gap-6 mb-8">
        <a href="#" className="text-gray-400 hover:text-brand-crimson transition-colors">
          <InstagramIcon />
        </a>
        <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
          <LinkedinIcon />
        </a>
        <a href="#" className="text-gray-400 hover:text-brand-teal transition-colors">
          <WhatsAppIcon />
        </a>
      </div>
      
      <p className="text-gray-500 text-sm font-dm-sans text-center">
        Kuwait City, Kuwait <span className="mx-2">·</span> &copy; {new Date().getFullYear()} Brandworks. All rights reserved.
      </p>
    </footer>
  );
}
