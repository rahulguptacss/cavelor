'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import type { AboutSectionData } from '../../types';

interface AboutProps {
  data: AboutSectionData;
  isAboutPage?: boolean;
}

export default function About({ data, isAboutPage }: AboutProps) {
  const pathname = usePathname();
  if (!data) return null;

  const onAboutPage = isAboutPage ?? (pathname === '/about' || pathname?.startsWith('/about'));

  return (
    <section id="about" className="w-full bg-[#FAF7F2] pt-12 sm:pt-16 pb-6 sm:pb-8 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow: — ABOUT US — */}
        {data.eyebrow && (
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <span className="w-8 sm:w-12 h-[1px] bg-[#5F1722]/60" />
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-semibold text-[#5F1722]">
              {data.eyebrow}
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#5F1722]/60" />
          </div>
        )}

        {/* Heading: The Essence of Modern Luxury */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#1A1A1A] tracking-tight leading-[1.15] mb-4 sm:mb-5">
          {data.heading_main}
          {data.heading_highlight && (
            <span className="italic font-serif font-light text-[#5F1722] ml-1.5 sm:ml-2">
              {data.heading_highlight}
            </span>
          )}
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm lg:text-[14px] font-light leading-relaxed text-[#555555] max-w-2xl mx-auto mb-6 sm:mb-8">
          {data.description}
        </p>

        {/* Read More Button (rendered only when on Home Page) */}
        {!onAboutPage && data.button_text && (
          <div className="mb-4">
            <Link
              href={data.button_link || '/about'}
              className="inline-flex items-center gap-2.5 bg-[#5F1722] hover:bg-[#4A101A] text-[#FAF7F2] text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium px-7 py-3 rounded-none transition-all duration-300 shadow-xs hover:shadow-md hover:translate-x-0.5 active:translate-x-0 cursor-pointer"
            >
              <span>{data.button_text.replace(/→|->/g, '').trim()}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
