'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, User, Tag } from 'lucide-react';
import type { BlogItem } from '../../types';

interface BlogDetailProps {
  data: BlogItem;
}

export default function BlogDetail({ data }: BlogDetailProps) {
  if (!data) return null;

  // Determine aspect ratio class
  const bannerAspect =
    data.image_aspect === 'aspect-[854/244] sm:aspect-[854/244]' || data.image_aspect === 'aspect-[854/244]'
      ? 'aspect-[854/244] sm:aspect-[854/244]'
      : 'aspect-[16/10] sm:aspect-[16/9]';

  // Flexible object-position resolver: supports Tailwind keywords or CSS percentages
  const resolveObjectPosition = (pos?: string, fallback: string = 'center center') => {
    if (!pos) return fallback;
    if (pos === 'object-top' || pos === 'top') return 'top center';
    if (pos === 'object-bottom' || pos === 'bottom') return 'bottom center';
    if (pos === 'object-center' || pos === 'center') return 'center center';
    return pos;
  };

  const bannerPosStyle: React.CSSProperties = {
    objectPosition: resolveObjectPosition(data.image_position, 'top center'),
  };

  const section1PosStyle: React.CSSProperties = {
    objectPosition: resolveObjectPosition(data.section_1?.image_position, 'center 65%'),
  };

  const section2PosStyle: React.CSSProperties = {
    objectPosition: resolveObjectPosition(data.section_2?.image_position, 'center 45%'),
  };

  return (
    <article className="w-full bg-[#FFFFFF] py-10 sm:py-14 lg:py-16 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Block */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-8 sm:mb-10"
        >
          {/* Eyebrow: — BLOG DETAILS — */}
          {data.eyebrow && (
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <span className="w-10 sm:w-14 h-[1.5px] bg-[#5F1722]/60" />
              <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-semibold text-[#5F1722]">
                {data.eyebrow}
              </span>
              <span className="w-10 sm:w-14 h-[1.5px] bg-[#5F1722]/60" />
            </div>
          )}

          {/* Title with Italic Highlight */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-[44px] font-normal text-[#1A1A1A] tracking-tight leading-[1.18] mb-4 sm:mb-5 max-w-3xl mx-auto">
            {data.title_prefix ? (
              <>
                <span className="block">{data.title_prefix}</span>
                <span className="italic font-serif font-light text-[#5F1722]">
                  {data.title_highlight}
                </span>{' '}
                <span>{data.title_suffix}</span>
              </>
            ) : (
              data.title
            )}
          </h1>

          {/* Meta Info Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-[13px] text-[#555555]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#5F1722] shrink-0" />
              <span>{data.date}</span>
            </span>
            <span className="text-[#DDD6CE]">|</span>
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#5F1722] shrink-0" />
              <span>By {data.author || 'Cavélor'}</span>
            </span>
            <span className="text-[#DDD6CE]">|</span>
            <span className="inline-flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#5F1722] shrink-0" />
              <span>{data.category || 'Fashion, Lifestyle'}</span>
            </span>
          </div>
        </motion.div>

        {/* Featured Banner Image */}
        <div className={`w-full ${bannerAspect} relative rounded-xs sm:rounded-sm overflow-hidden mb-6 sm:mb-8 shadow-xs bg-[#EFEAE2] transition-transform duration-500 hover:scale-[1.01]`}>
          <img
            src={data.image}
            alt={data.image_alt || data.title}
            loading="eager"
            decoding="sync"
            style={bannerPosStyle}
            className="w-full h-full object-cover block"
          />
        </div>

        {/* Intro Paragraph */}
        {data.intro && (
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="text-xs sm:text-sm md:text-[14px] font-normal leading-relaxed text-[#4A4A4A] max-w-2xl mx-auto text-center mb-10 sm:mb-14"
          >
            {data.intro}
          </motion.p>
        )}

        {/* Section 1: 2 Columns (Text on Left, Image on Right) */}
        {data.section_1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mb-10 sm:mb-14">
            {/* Left Content */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            >
              <h2 className="font-serif text-2xl sm:text-[28px] font-normal text-[#1A1A1A] leading-tight tracking-tight">
                {data.section_1.heading_main}
                <span className="block italic font-serif font-light text-[#5F1722]">
                  {data.section_1.heading_highlight}
                </span>
              </h2>
              {/* Thin Burgundy Accent Underline */}
              <div className="w-12 h-[1.5px] bg-[#5F1722] my-3.5" />
              <p className="font-sans font-light text-xs sm:text-[13.5px] text-[#4A4A4A] leading-relaxed">
                {data.section_1.description}
              </p>
            </motion.div>

            {/* Right Image */}
            <div className="w-full aspect-[500/243] relative rounded-xs sm:rounded-sm overflow-hidden shadow-xs bg-[#EFEAE2] transition-transform duration-500 hover:scale-[1.02]">
              <img
                src={data.section_1.image}
                alt={data.section_1.image_alt || data.section_1.heading_main}
                loading="eager"
                decoding="sync"
                style={section1PosStyle}
                className="w-full h-full object-cover block"
              />
            </div>
          </div>
        )}

        {/* Quote Callout Box */}
        {data.quote && (
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="bg-[#FAF1F6] px-6 py-5 sm:px-8 sm:py-6 my-10 sm:my-14 rounded-xs flex items-center gap-4 sm:gap-6 shadow-2xs"
          >
            {/* Burgundy Quote Mark */}
            <span className="font-serif text-4xl sm:text-5xl leading-none text-[#5F1722] shrink-0 select-none">
              “
            </span>
            <div className="w-[1.5px] h-10 bg-[#5F1722]/20 shrink-0 hidden sm:block" />
            <p className="font-serif italic text-sm sm:text-base md:text-[17px] text-[#2C2C2C] leading-relaxed">
              {data.quote.text}
              {data.quote.highlight && (
                <span className="text-[#5F1722] font-semibold not-italic">
                  {data.quote.highlight}
                </span>
              )}
              {data.quote.suffix}
            </p>
          </motion.div>
        )}

        {/* Section 2: 2 Columns (Image on Left, Checklist on Right) */}
        {data.section_2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mb-10 sm:mb-14">
            {/* Left Image */}
            <div className="w-full aspect-[500/223] relative rounded-xs sm:rounded-sm overflow-hidden shadow-xs bg-[#EFEAE2] order-2 md:order-1 transition-transform duration-500 hover:scale-[1.02]">
              <img
                src={data.section_2.image}
                alt={data.section_2.image_alt || data.section_2.heading}
                loading="eager"
                decoding="sync"
                style={section2PosStyle}
                className="w-full h-full object-cover block"
              />
            </div>

            {/* Right Checklist */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
              className="order-1 md:order-2"
            >
              <h3 className="font-serif italic text-xl sm:text-2xl md:text-[26px] font-normal text-[#5F1722] mb-4 sm:mb-5 tracking-tight">
                {data.section_2.heading}
              </h3>
              <ul className="space-y-2.5 sm:space-y-3">
                {data.section_2.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-[13.5px] text-[#333333]">
                    {/* Circle Checkmark Icon */}
                    <svg
                      className="w-4 h-4 text-[#5F1722] shrink-0"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="10" cy="10" r="8" strokeWidth="1.5" />
                      <path
                        d="M6.5 10L9 12.5L13.5 7.5"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}

        {/* Section 3: Full-Width Text Block */}
        {data.section_3 && (
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="mb-6"
          >
            <h3 className="font-serif italic text-xl sm:text-2xl md:text-[26px] font-normal text-[#5F1722] mb-2 sm:mb-2.5 tracking-tight">
              {data.section_3.heading}
            </h3>
            {/* Thin Burgundy Accent Underline */}
            <div className="w-12 h-[1.5px] bg-[#5F1722] mb-3.5" />
            <p className="font-sans font-light text-xs sm:text-[13.5px] text-[#4A4A4A] leading-relaxed max-w-3xl">
              {data.section_3.description}
            </p>
          </motion.div>
        )}
      </div>
    </article>
  );
}
