'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const LogoMark = () => (
  <div className="grid grid-cols-2 grid-rows-2 gap-[2px] w-[18px] h-[18px]">
    <div className="bg-brand-crimson w-2 h-2" />
    <div className="bg-brand-blue w-2 h-2" />
    <div className="bg-brand-teal w-2 h-2" />
    <div className="bg-brand-yellow w-2 h-2" />
  </div>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(13, 13, 15, 0)', 'rgba(13, 13, 15, 0.85)']
  );

  const navBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(12px)']
  );

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.getElementById(targetId.replace('#', ''));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
        style={{ backgroundColor: navBackground, backdropFilter: navBlur }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="#home" onClick={(e) => handleScroll(e, '#home')} className="flex items-center gap-3 relative z-50">
            <LogoMark />
            <span className="font-syne font-bold text-xl tracking-tight text-white">Brandworks</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-sm font-dm-sans text-gray-300 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <a 
              href="#contact" 
              onClick={(e) => handleScroll(e, '#contact')}
              className="px-5 py-2.5 rounded-full border border-brand-crimson text-brand-crimson text-sm font-space-grotesk font-medium hover:bg-brand-crimson hover:text-white transition-all duration-300"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden relative z-50 p-2 text-white" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 md:hidden bg-brand-surface/95 backdrop-blur-xl pt-24 px-6 pb-6 flex flex-col"
          >
            <div className="flex flex-col gap-6 items-center w-full">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-2xl font-syne font-medium text-white p-2"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={(e) => handleScroll(e, '#contact')}
                className="mt-6 w-full max-w-xs text-center px-6 py-4 rounded-full bg-brand-crimson text-white font-space-grotesk font-medium text-lg"
              >
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
