'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import type { FooterData } from '../../types';

interface FooterProps {
  data: FooterData;
}

export default function Footer({ data }: FooterProps) {
  if (!data) return null;

  return (
    <footer className="w-full bg-[#4A0E17] text-[#FAF7F2] pt-10 sm:pt-12 pb-6 sm:pb-7 border-t border-[#3A0811]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12"
      >
        {/* Main 4-Column Layout with Vertical Dividing Lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
          {/* Column 1: Brand Logo & Tagline (Col span 4) */}
          <div className="lg:col-span-4 lg:pr-8 xl:pr-10 lg:border-r lg:border-white/20 flex flex-col items-start space-y-3">
            <Link href="/" className="inline-block focus:outline-hidden">
              <div className="relative h-16 w-64 sm:h-20 sm:w-80 lg:h-[90px] lg:w-[344px]">
                <Image
                  src={data.logo || '/logo/logo-w.webp'}
                  alt={data.logo_text || 'CAVÉLOR'}
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            <p className="text-xs sm:text-[13px] font-normal leading-relaxed text-[#FAF7F2]/90 max-w-[280px] pt-0.5 whitespace-pre-line">
              {data.tagline}
            </p>
          </div>

          {/* Column 2 & 3: Quick Links & Support (Col span 5) */}
          <div className="lg:col-span-5 lg:px-8 xl:px-12 grid grid-cols-2 gap-6 sm:gap-8">
            {/* Quick Links */}
            <div className="flex flex-col items-start">
              <h4 className="font-serif text-[17px] sm:text-[18px] text-[#FFFFFF] font-normal tracking-wide">
                {data.quick_links_title || 'Quick Links'}
              </h4>
              {/* Short Accent Underline */}
              <div className="w-8 h-[1px] bg-white/70 mt-1.5 mb-2.5" />

              <ul className="space-y-1.5 sm:space-y-2">
                {data.quick_links?.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-[13px] font-normal text-[#FAF7F2]/90 hover:text-white transition-colors duration-200 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="flex flex-col items-start">
              <h4 className="font-serif text-[17px] sm:text-[18px] text-[#FFFFFF] font-normal tracking-wide">
                {data.support_title || 'Support'}
              </h4>
              {/* Short Accent Underline */}
              <div className="w-8 h-[1px] bg-white/70 mt-1.5 mb-2.5" />

              <ul className="space-y-1.5 sm:space-y-2">
                {data.support_links?.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-[13px] font-normal text-[#FAF7F2]/90 hover:text-white transition-colors duration-200 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Get in Touch (Col span 3) */}
          <div className="lg:col-span-3 lg:pl-8 xl:pl-10 lg:border-l lg:border-white/20 flex flex-col items-start space-y-2.5">
            <div>
              <h4 className="font-serif text-[17px] sm:text-[18px] text-[#FFFFFF] font-normal tracking-wide">
                {data.contact_title || 'Get in Touch'}
              </h4>
              {/* Short Accent Underline */}
              <div className="w-8 h-[1px] bg-white/70 mt-1.5 mb-2.5" />
            </div>

            <ul className="space-y-2 sm:space-y-2.5">
              {data.contact_phone && (
                <li>
                  <a
                    href={data.contact_phone_href || `tel:${data.contact_phone}`}
                    className="flex items-center gap-2.5 text-xs sm:text-[13px] font-normal text-[#FAF7F2]/90 hover:text-white transition-colors duration-200 group"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0 text-white/90 stroke-[1.5]" />
                    <span>{data.contact_phone}</span>
                  </a>
                </li>
              )}

              {data.contact_email && (
                <li>
                  <a
                    href={data.contact_email_href || `mailto:${data.contact_email}`}
                    className="flex items-center gap-2.5 text-xs sm:text-[13px] font-normal text-[#FAF7F2]/90 hover:text-white transition-colors duration-200 group"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0 text-white/90 stroke-[1.5]" />
                    <span>{data.contact_email}</span>
                  </a>
                </li>
              )}

              {(data.contact_address || data.contact_address_line1) && (
                <li className="flex items-start gap-2.5 text-xs sm:text-[13px] font-normal text-[#FAF7F2]/90 leading-snug">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-white/90 stroke-[1.5] mt-0.5" />
                  <div>
                    {data.contact_address_line1 ? (
                      <>
                        <p>{data.contact_address_line1}</p>
                        <p>{data.contact_address_line2}</p>
                      </>
                    ) : (
                      <p>{data.contact_address}</p>
                    )}
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Full-Width Horizontal Divider Line */}
        <div className="w-full h-[1px] bg-white/20 mt-8 sm:mt-9 mb-4 sm:mb-5" />

        {/* Bottom Copyright Text (Left-Aligned) */}
        <div className="text-left text-xs sm:text-[12.5px] font-normal text-[#FAF7F2]/80">
          <p>{data.copyright || '© 2026 CAVÉLOR. All Rights Reserved.'}</p>
        </div>
      </motion.div>
    </footer>
  );
}
