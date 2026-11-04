'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { HeroSectionData } from '../../types';

interface HeroProps {
  data: HeroSectionData;
}

export default function Hero({ data }: HeroProps) {
  if (!data) return null;

  return (
    <section id="home" className="w-full bg-[#FAF7F2] py-0 overflow-hidden">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch w-full">
          {/* Editorial Photo: Shows on Bottom on Mobile (order-2), Left on Desktop (lg:order-1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-2 lg:order-1 relative w-full aspect-[16/10.5] sm:aspect-[16/10] lg:aspect-auto min-h-[300px] sm:min-h-[400px] lg:min-h-[540px] xl:min-h-[580px] overflow-hidden group"
          >
            <Image
              src={data.left_image || '/hero/hero-left.webp'}
              alt={data.left_image_alt || 'CAVÉLOR Haute Couture Model on Steps'}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </motion.div>

          {/* Deep Burgundy Block with Model & Content: Shows on Top on Mobile (order-1), Right on Desktop (lg:order-2) */}
          <div className="order-1 lg:order-2 relative w-full min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] xl:min-h-[580px] bg-gradient-to-b from-[#5C272C] via-[#4D1B23] to-[#3A1417] flex flex-col justify-center overflow-hidden">
            {/* Model Portrait on Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="absolute right-0 bottom-0 top-0 w-[58%] sm:w-[56%] lg:w-[58%] xl:w-[54%] max-w-[560px] xl:max-w-[640px] h-full pointer-events-none flex items-end justify-end z-0"
            >
              <div className="relative w-full h-full">
                <Image
                  src={data.right_portrait_image || '/hero/hero-model.webp'}
                  alt={data.right_portrait_alt || 'CAVÉLOR Haute Couture Model'}
                  fill
                  priority
                  sizes="(max-width: 1024px) 65vw, 35vw"
                  className="object-contain object-bottom-right"
                />
              </div>
            </motion.div>

            {/* Left Content Layer matching mobile design screenshot */}
            <div className="relative z-10 py-10 sm:py-12 lg:py-14 px-6 sm:px-10 lg:px-12 xl:pl-16 xl:pr-6 flex flex-col justify-center max-w-[215px] sm:max-w-[320px] lg:max-w-[48%]">
              {/* Tagline / Eyebrow: — NEW COLLECTION */}
              {data.right_tagline && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                  className="flex items-center gap-2.5 mb-3 sm:mb-4 whitespace-nowrap"
                >
                  <span className="w-6 sm:w-8 h-[1px] bg-[#CEAE9A] shrink-0" />
                  <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-light text-[#CEAE9A] whitespace-nowrap">
                    {data.right_tagline}
                  </span>
                </motion.div>
              )}

              {/* Headings: Timeless Elegance */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="font-serif text-[38px] leading-[1.08] sm:text-5xl lg:text-[44px] xl:text-[52px] font-normal tracking-tight mb-3.5 sm:mb-5"
              >
                <span className="block text-[#FAF7F2]">
                  {data.right_heading}
                </span>
                {data.right_heading_highlight && (
                  <span className="block text-[#CEAE9A]">
                    {data.right_heading_highlight}
                  </span>
                )}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                className="font-sans font-light text-xs sm:text-[13px] lg:text-[14px] leading-relaxed text-[#FAF7F2]/85 max-w-[195px] sm:max-w-[260px] mb-5 sm:mb-7"
              >
                {data.right_description}
              </motion.p>

              {/* CTA Button matching screenshot */}
              {data.right_button_text && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
                  className="pt-0.5"
                >
                  <Link
                    href={data.right_button_link || '/collections'}
                    className="inline-flex items-center justify-between gap-4 sm:gap-5 bg-[#CEAE99] hover:bg-[#DFC5B5] active:scale-95 text-[#481E24] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold px-5 sm:px-6 py-3 transition-all duration-300 shadow-xs hover:shadow-md rounded-none group w-fit whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span className="whitespace-nowrap">{data.right_button_text}</span>
                    <svg
                      className="w-7 sm:w-8 h-3 stroke-current shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 32 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="0" y1="6" x2="30" y2="6" strokeWidth="1.2" />
                      <polyline
                        points="25,2 30,6 25,10"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
