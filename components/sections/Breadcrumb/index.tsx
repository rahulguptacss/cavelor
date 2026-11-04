'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import type { BreadcrumbData, BreadcrumbItem } from '../../types';

interface BreadcrumbProps {
  data?: BreadcrumbData;
  currentPage?: string;
  items?: BreadcrumbItem[];
}

export default function Breadcrumb({ data, currentPage, items: customItems }: BreadcrumbProps) {
  const rootItem = data?.items?.[0] ?? { name: 'Home', href: '/' };
  const breadcrumbItems: BreadcrumbItem[] =
    customItems ??
    (currentPage
      ? [rootItem, { name: currentPage, href: '#' }]
      : data?.items?.length
      ? data.items
      : [rootItem, { name: 'Page', href: '#' }]);

  const pageTitle = currentPage || data?.title || 'CAVÉLOR Paris';

  return (
    <section className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] overflow-hidden flex items-center justify-center bg-[#2B0E14]">
      {/* Background Banner Image with Gradient */}
      <div className="absolute inset-0">
        <Image
          src={data?.background_image || '/hero/left.webp'}
          alt={data?.background_alt || 'CAVÉLOR Paris Haute Couture Architecture'}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-102"
        />
        {/* Luxury Burgundy Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2B0E14]/95 via-[#4A0E17]/88 to-[#1F070B]/92" />
      </div>

      {/* Content Container with Entrance Motion */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center"
      >
        {/* Page Title */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#FAF7F2] tracking-tight leading-tight mb-3 sm:mb-4 drop-shadow-xs max-w-4xl px-2">
          {pageTitle}
        </h1>

        {/* Trail Capsule */}
        <nav
          aria-label="Breadcrumb"
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-none border border-white/20 text-xs sm:text-[13px] tracking-wide font-normal text-[#FAF7F2] max-w-full overflow-hidden"
        >
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <React.Fragment key={item.name + index}>
                {index > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-[#E8DBCF]/80 shrink-0" />
                )}
                {isLast ? (
                  <span
                    aria-current="page"
                    className="text-[#E8DBCF] font-medium truncate max-w-[200px] sm:max-w-none"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors duration-200 shrink-0"
                  >
                    {index === 0 && <Home className="w-3 h-3 text-[#E8DBCF]" />}
                    <span>{item.name}</span>
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </motion.div>
    </section>
  );
}
