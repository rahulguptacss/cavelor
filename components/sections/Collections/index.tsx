'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CollectionsSectionData, CollectionItem } from '../../types';

interface CollectionsProps {
  data: CollectionsSectionData;
  layout?: 'home' | 'grid';
}

export default function Collections({ data, layout = 'grid' }: CollectionsProps) {
  if (!data) return null;

  const [visibleCount, setVisibleCount] = React.useState(12);

  // Use home_items if available for home layout, otherwise items
  const homeCards = data.home_items && data.home_items.length > 0 ? data.home_items : data.items.slice(0, 4);
  const products = data.items || [];
  const displayedProducts = layout === 'grid' ? products.slice(0, visibleCount) : products;

  return (
    <section id="collections" className="w-full bg-[#FFFFFF] py-14 sm:py-18 lg:py-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Fade & Slide Motion */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          {data.eyebrow && (
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2.5 sm:mb-3">
              <span className="w-10 sm:w-14 h-[1.5px] bg-[#5F1722]/60" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#5F1722]">
                {data.eyebrow}
              </span>
              <span className="w-10 sm:w-14 h-[1.5px] bg-[#5F1722]/60" />
            </div>
          )}

          <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] font-normal text-[#1A1A1A] tracking-tight leading-[1.15]">
            {data.heading_main}
            <span className="italic font-serif font-light text-[#5F1722] ml-2">
              {data.heading_highlight}
            </span>
          </h2>

          {data.subtitle && (
            <p className="text-sm sm:text-[15px] font-normal text-[#666666] max-w-lg mx-auto mt-3 leading-relaxed">
              {data.subtitle}
            </p>
          )}
        </motion.div>

        {/* HOMEPAGE VARIANT: 2x2 Feature Banners with direct links to /collections */}
        {layout === 'home' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
            {homeCards.map((item, idx) => {
              const line1 = item.title_line1 || item.title.split(' ')[0] || '';
              const line2 = item.title_line2 || item.title.split(' ').slice(1).join(' ') || 'COLLECTION';

              return (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                  className="group relative w-full aspect-[1/1.06] sm:aspect-[1/1.08] overflow-hidden bg-[#FAF7F2] shadow-2xs hover:shadow-lg transition-all duration-500 rounded-sm"
                >
                  <Image
                    src={item.image}
                    alt={item.image_alt || item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={idx < 2}
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/45 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-[28%] sm:top-[30%] left-6 sm:left-9 lg:left-10 z-10 flex flex-col items-start select-none">
                    {line1 && (
                      <span className="text-[13px] sm:text-[14px] lg:text-[15px] font-bold tracking-[0.24em] uppercase text-[#5F1722] leading-tight">
                        {line1}
                      </span>
                    )}
                    {line2 && (
                      <span className="text-[13px] sm:text-[14px] lg:text-[15px] font-bold tracking-[0.24em] uppercase text-[#5F1722] leading-tight mt-1">
                        {line2}
                      </span>
                    )}

                    <div className="w-9 sm:w-11 h-[1.5px] bg-[#5F1722] my-2.5 sm:my-3" />

                    <Link
                      href={item.button_link || '/collections'}
                      className="bg-[#5F1722] hover:bg-[#471119] text-[#FAF7F2] text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase px-4 sm:px-5 py-2.5 rounded-none whitespace-nowrap inline-flex items-center gap-2 transition-all duration-300 shadow-xs hover:shadow-md group-hover:translate-x-0.5 cursor-pointer"
                    >
                      <span>{item.button_text || 'VIEW MORE →'}</span>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* COLLECTIONS / PRODUCT LISTING VARIANT: 4 Columns Grid matching mockup */
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
              {displayedProducts.map((item, idx) => {
                const productUrl = `/collections/${item.slug || item.id}`;

                return (
                  <motion.article
                    key={item.id || idx}
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: (idx % 4) * 0.08, ease: 'easeOut' }}
                    className="group flex flex-col items-center text-center"
                  >
                    {/* Portrait Card Image */}
                    <Link
                      href={productUrl}
                      className="block w-full overflow-hidden rounded-lg sm:rounded-xl bg-[#F7F3ED] shadow-2xs group-hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="relative w-full aspect-[3/4] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.image_alt || item.title}
                          loading="eager"
                          decoding="sync"
                          className="w-full h-full object-cover object-top transition-transform duration-600 ease-out group-hover:scale-105 block"
                        />
                      </div>
                    </Link>

                    {/* Product Title */}
                    <h3 className="font-serif font-bold text-lg sm:text-[19px] text-[#1A1A1A] mt-4 tracking-tight leading-snug">
                      <Link
                        href={productUrl}
                        className="hover:text-[#5F1722] transition-colors duration-200"
                      >
                        {item.title}
                      </Link>
                    </h3>

                    {/* Outlined Burgundy CTA Button */}
                    <Link
                      href={productUrl}
                      className="inline-flex items-center justify-center gap-1.5 border border-[#5F1722]/55 hover:border-[#5F1722] text-[#5F1722] hover:bg-[#5F1722] hover:text-white px-5 py-1.5 mt-2.5 rounded-md text-[12px] sm:text-[13px] font-medium font-sans transition-all duration-200 group-hover:bg-[#5F1722] group-hover:text-white shadow-2xs"
                    >
                      <span>{(item.button_text || 'View More').replace(/[\u2192\->]/g, '').trim()}</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </motion.article>
                );
              })}
            </div>

            {/* "Load More" / "View More" Button:
                Shown ONLY when products count is strictly greater than 12 AND visibleCount < products.length */}
            {products.length > 12 && visibleCount < products.length && (
              <div className="flex justify-center mt-12 sm:mt-14">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="inline-flex items-center justify-center gap-2 border border-[#5F1722]/60 hover:border-[#5F1722] bg-[#FAF8F5] hover:bg-[#5F1722] text-[#5F1722] hover:text-white px-8 py-3 rounded-md text-sm sm:text-[15px] font-medium font-sans transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer group"
                >
                  <span>{(data.load_more_text || 'View More Products').replace(/[\u2192\->]/g, '').trim()}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2] transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
