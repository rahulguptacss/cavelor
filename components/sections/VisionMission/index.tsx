'use client';

import React from 'react';
import Image from 'next/image';
import type { VisionMissionData } from '../../types';

interface VisionMissionProps {
  data?: VisionMissionData;
}

export default function VisionMission({ data }: VisionMissionProps) {
  const items = data?.items;
  if (!items || items.length === 0) return null;

  return (
    <section id="vision-mission" className="w-full bg-[#FAF7F2] py-8 sm:py-12 md:py-14 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#DDD6CE]">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center px-4 sm:px-8 lg:px-10 py-8 md:py-4 group"
            >
              {/* Icon Container */}
              <div className="relative w-14 sm:w-16 h-12 sm:h-14 mb-4 sm:mb-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={64}
                  height={54}
                  className="object-contain max-h-12 w-auto"
                />
              </div>

              {/* Title: Cormorant Garamond Italic Serif */}
              <h3 className="font-serif italic text-3xl sm:text-[34px] font-normal text-[#5A1620] mb-2 sm:mb-2.5 tracking-normal">
                {item.title}
              </h3>

              {/* Centered Burgundy Accent Line Under Title */}
              <div className="w-14 sm:w-[68px] h-[1.5px] bg-[#5A1620] mx-auto mb-4 sm:mb-5 shrink-0" />

              {/* Description Paragraph */}
              <p className="font-sans font-normal text-xs sm:text-[13.5px] leading-[1.65] text-[#333333] max-w-[270px] mx-auto">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
