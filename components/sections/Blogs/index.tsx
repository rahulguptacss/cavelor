'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BlogsSectionData } from '../../types';

interface BlogsProps {
  data: BlogsSectionData;
}

export default function Blogs({ data }: BlogsProps) {
  if (!data || !data.items || data.items.length === 0) return null;

  return (
    <section id="blogs" className="w-full bg-[#FFFFFF] py-10 sm:py-12 lg:py-14">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Fade & Slide Motion */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          {data.eyebrow && (
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2.5 sm:mb-3">
              <span className="w-8 sm:w-12 h-[1px] bg-[#641C26]/70" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[#641C26]">
                {data.eyebrow}
              </span>
              <span className="w-8 sm:w-12 h-[1px] bg-[#641C26]/70" />
            </div>
          )}

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#1A1A1A] tracking-tight leading-[1.15]">
            {data.heading_main}
            <span className="italic font-serif font-light text-[#641C26] ml-2">
              {data.heading_highlight}
            </span>
          </h2>

          {data.subtitle && (
            <p className="text-xs sm:text-sm font-normal text-[#666666] max-w-lg mx-auto mt-2 sm:mt-2.5 leading-relaxed">
              {data.subtitle}
            </p>
          )}
        </motion.div>

        {/* 3 Columns Editorial Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {data.items.map((item, idx) => {
            const readMoreLabel = (item.read_more_text || 'Read More').replace(' →', '');

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: 'easeOut' }}
                className="group flex flex-col justify-between"
              >
                <div>
                  {/* Blog Image with Rounded Corners as per Screenshot */}
                  <Link
                    href={item.href || '#'}
                    className="block overflow-hidden rounded-xl sm:rounded-2xl shadow-2xs group-hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="relative w-full aspect-[16/10.5] bg-[#EFE8DF] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.image_alt || item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                      />
                    </div>
                  </Link>

                  {/* Blog Title */}
                  <h3 className="font-serif text-[18px] sm:text-[19px] lg:text-[20px] font-normal text-[#1A1A1A] group-hover:text-[#641C26] transition-colors duration-300 leading-[1.3] mt-4 sm:mt-4.5 min-h-[48px]">
                    <Link href={item.href || '#'}>
                      {item.title}
                    </Link>
                  </h3>
                </div>

                {/* Bottom Section: Divider Line + Footer Meta */}
                <div>
                  {/* Thin Divider Line */}
                  <div className="w-full h-[1px] bg-[#E8DBCF]/80 my-3 sm:my-3.5" />

                  {/* Meta Row: Read More + Date */}
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href || '#'}
                      className="inline-flex items-center gap-2 group/btn cursor-pointer py-1"
                    >
                      <span className="text-xs sm:text-[13px] font-semibold text-[#641C26] tracking-wide transition-colors">
                        {readMoreLabel}
                      </span>
                      <span className="w-5 h-5 rounded-full bg-[#641C26] group-hover/btn:bg-[#4E141E] text-white flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1 shadow-2xs">
                        <ArrowRight className="w-2.5 h-2.5 stroke-[2.5]" />
                      </span>
                    </Link>

                    {item.date && (
                      <div className="flex items-center gap-1.5 text-xs sm:text-[12.5px] font-normal text-[#777777]">
                        <Calendar className="w-3.5 h-3.5 text-[#888888] stroke-[1.5]" />
                        <span>{item.date}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
