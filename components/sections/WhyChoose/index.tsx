'use client';

import React from 'react';
import Image from 'next/image';
import type { WhyChooseData } from '../../types';

interface WhyChooseProps {
  data?: WhyChooseData;
}

export default function WhyChoose({ data }: WhyChooseProps) {
  if (!data) return null;

  return (
    <section id="why-choose" className="w-full bg-[#FAF7F2] pt-4 sm:pt-6 pb-16 sm:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow: — WHY CHOOSE CAVÉLOR — */}
        {data.eyebrow && (
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-3.5">
            <span className="w-12 sm:w-16 h-[1.5px] bg-[#5A1620] shrink-0" />
            <span className="text-[11px] sm:text-xs tracking-[0.28em] uppercase font-semibold text-[#5A1620]">
              {data.eyebrow}
            </span>
            <span className="w-12 sm:w-16 h-[1.5px] bg-[#5A1620] shrink-0" />
          </div>
        )}

        {/* Heading: A Refined Fashion Experience */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] font-normal text-[#1A1A1A] tracking-tight leading-tight mb-2 sm:mb-2.5">
          {data.heading_main}
          {data.heading_highlight && (
            <span className="italic font-serif font-light text-[#5A1620] ml-1.5 sm:ml-2">
              {data.heading_highlight}
            </span>
          )}
        </h2>

        {/* Subtitle: Built on quality, design, and trust. */}
        {data.subtitle && (
          <p className="font-sans font-normal text-sm sm:text-base text-[#3A3A3A] mb-12 sm:mb-16">
            {data.subtitle}
          </p>
        )}

        {/* 4 Feature Columns with Vertical Dividers */}
        {data.features && data.features.length > 0 && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[#DDD6CE]">
            {data.features.map((feat) => (
              <div
                key={feat.id}
                className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-7 py-6 lg:py-2 group"
              >
                {/* Icon Container */}
                <div className="relative w-14 h-14 mb-4 sm:mb-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={feat.icon}
                    alt={feat.title}
                    width={56}
                    height={56}
                    className="object-contain max-h-12 w-auto"
                  />
                </div>

                {/* Title */}
                <h4 className="font-serif text-xl sm:text-[22px] font-normal text-[#5A1620] mb-2 tracking-normal">
                  {feat.title}
                </h4>

                {/* Description */}
                <p className="font-sans font-normal text-xs sm:text-[13.5px] leading-[1.65] text-[#333333] max-w-[200px] mx-auto">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
