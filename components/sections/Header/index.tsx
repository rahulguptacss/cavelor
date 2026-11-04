'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeaderData } from '../../types';

interface HeaderProps {
  data: HeaderData;
}

export default function Header({ data }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set active link from hash on mount / hashchange
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleHash = () => {
        const hash = window.location.hash || '';
        if (hash) {
          setActiveLink(hash);
        }
      };
      handleHash();
      window.addEventListener('hashchange', handleHash);
      return () => window.removeEventListener('hashchange', handleHash);
    }
  }, []);

  const isLinkActive = (href: string) => {
    if (href === '/' || href === '#home') {
      return pathname === '/' && (!activeLink || activeLink === '#home' || activeLink === '/');
    }
    if (href.startsWith('#')) {
      return activeLink === href;
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const totalLinks = data.links || [];
  // First 4 links go to the left of the logo: Home, About Us, Collections, Blogs
  const leftLinks = totalLinks.slice(0, 4);
  // Remaining links go to the right of the logo: Gallery, Testimonials, Contact Us
  const rightLinks = totalLinks.slice(4);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-[#FAF7F2] border-t border-b border-[#E8DBCF]/80 transition-all duration-300 ${
        scrolled ? 'shadow-sm bg-[#FAF7F2]/95 backdrop-blur-md' : ''
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10 xl:px-12">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-[62px] sm:h-[66px] lg:h-[68px]' : 'h-[72px] sm:h-[78px] lg:h-[80px]'
          }`}
        >
          {/* Left Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-start">
            {leftLinks.map((link, idx) => {
              const isActive = isLinkActive(link.href);
              return (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className={`group relative py-1 text-[13px] tracking-wide transition-colors inline-block whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#5F1722] font-semibold'
                      : 'text-[#2C2C2C] font-normal hover:text-[#5F1722]'
                  }`}
                >
                  <span className="whitespace-nowrap transition-transform duration-200 inline-block group-hover:-translate-y-[1px]">
                    {link.name}
                  </span>
                  {/* Animated Expanding Underline */}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-[#5F1722] transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Center Brand Identity / Logo */}
          <div className="flex items-center justify-start lg:justify-center shrink-0">
            <Link
              href="/"
              onClick={() => setActiveLink('/')}
              className="flex flex-col items-center group focus:outline-hidden"
            >
              <div
                className={`relative transition-all duration-300 group-hover:scale-[1.02] ${
                  scrolled
                    ? 'h-9 w-42 sm:h-10 sm:w-46 md:h-10.5 md:w-50 lg:h-11 lg:w-52 xl:h-12 xl:w-56'
                    : 'h-10.5 w-48 sm:h-12 sm:w-54 md:h-12.5 md:w-56 lg:h-13 lg:w-60 xl:h-14 xl:w-64'
                }`}
              >
                <Image
                  src={data.logo || '/logo/logo.webp'}
                  alt={data.logo_text || 'CAVÉLOR'}
                  fill
                  priority
                  className="object-contain object-left lg:object-center"
                />
              </div>
            </Link>
          </div>

          {/* Right Navigation Links & CTA Button (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-end">
            <nav className="flex items-center gap-6 xl:gap-8">
              {rightLinks.map((link, idx) => {
                const isActive = isLinkActive(link.href);
                return (
                  <Link
                    key={idx}
                    href={link.href}
                    onClick={() => setActiveLink(link.href)}
                    className={`group relative py-1 text-[13px] tracking-wide transition-colors inline-block whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'text-[#5F1722] font-semibold'
                        : 'text-[#2C2C2C] font-normal hover:text-[#5F1722]'
                    }`}
                  >
                    <span className="whitespace-nowrap transition-transform duration-200 inline-block group-hover:-translate-y-[1px]">
                      {link.name}
                    </span>
                    {/* Animated Expanding Underline */}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] bg-[#5F1722] transition-all duration-300 ease-out ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {data.button_text && (
              <Link
                href={data.button_link || '#enquire'}
                className={`bg-[#5F1B24] hover:bg-[#4A121A] active:scale-95 text-[#FAF7F2] font-normal transition-all duration-300 shadow-xs hover:shadow-md shrink-0 rounded-none ml-2 xl:ml-4 inline-flex items-center justify-center whitespace-nowrap ${
                  scrolled ? 'px-4 py-2 text-[12px]' : 'px-5 py-2.5 text-[13px]'
                }`}
              >
                {data.button_text}
              </Link>
            )}
          </div>

          {/* Mobile Bar Elements: Enquire Button + Hamburger Menu */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2.5 shrink-0">
            {data.button_text && (
              <Link
                href={data.button_link || '#enquire'}
                className="bg-[#5F1B24] hover:bg-[#4A121A] active:scale-95 text-[#FAF7F2] text-[10.5px] sm:text-xs font-normal px-2.5 sm:px-3 py-1.5 rounded-none whitespace-nowrap shadow-2xs transition-all"
              >
                {data.button_text}
              </Link>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 sm:p-1.5 text-[#2C2C2C] hover:text-[#5F1722] focus:outline-hidden transition-colors shrink-0 cursor-pointer"
              aria-label={mobileMenuOpen ? data.close_aria_label || 'Close menu' : data.menu_aria_label || 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-6 w-6 stroke-[2]" /> : <Menu className="h-6 w-6 stroke-[2]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Animated Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            {/* Backdrop Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            {/* Slide Down Drawer Menu */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`absolute left-0 right-0 bg-[#FAF7F2] border-b border-[#E8DBCF] p-6 shadow-2xl overflow-y-auto ${
                scrolled
                  ? 'top-[62px] sm:top-[66px] lg:top-[68px] max-h-[calc(100vh-62px)] sm:max-h-[calc(100vh-66px)]'
                  : 'top-[72px] sm:top-[78px] lg:top-[80px] max-h-[calc(100vh-72px)] sm:max-h-[calc(100vh-78px)]'
              }`}
            >
              <nav className="flex flex-col space-y-1">
                {totalLinks.map((link, idx) => {
                  const isActive = isLinkActive(link.href);
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => {
                          setActiveLink(link.href);
                          setMobileMenuOpen(false);
                        }}
                        className={`group py-3 px-2 border-b border-[#E8DBCF]/40 flex items-center justify-between transition-colors ${
                          isActive
                            ? 'text-[#5F1722] font-semibold bg-[#5F1722]/5'
                            : 'text-[#2C2C2C] font-normal hover:text-[#5F1722] hover:bg-[#5F1722]/5'
                        }`}
                      >
                        <span className="text-sm uppercase tracking-wider">{link.name}</span>
                        <ArrowRight
                          className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 ${
                            isActive ? 'text-[#5F1722]' : 'text-[#8C6D4F]/50'
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}

                {data.button_text && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: totalLinks.length * 0.04 + 0.05, duration: 0.2 }}
                    className="pt-5"
                  >
                    <Link
                      href={data.button_link || '#enquire'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center w-full bg-[#5F1B24] hover:bg-[#4A121A] active:scale-[0.98] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium py-3.5 rounded-none shadow-md transition-all"
                    >
                      {data.button_text}
                    </Link>
                  </motion.div>
                )}

                {/* Footer Brand Mark inside Mobile Drawer */}
                <div className="pt-6 text-center text-[10px] tracking-[0.25em] uppercase text-[#8C6D4F]/60">
                  PARIS • LUXURY FASHION HOUSE
                </div>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
