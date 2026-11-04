'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CollectionItem, CollectionsDetailSectionData } from '../../types';
import { sections } from '../../types';

interface CollectionsDetailProps {
  product: CollectionItem;
  allProducts: CollectionItem[];
  config?: CollectionsDetailSectionData;
}

export default function CollectionsDetail({
  product,
  allProducts,
  config = sections.collections_detail,
}: CollectionsDetailProps) {
  if (!product) return null;

  // Resolve related products dynamically from related_slugs or slice remaining products
  const relatedProducts: CollectionItem[] = React.useMemo(() => {
    const pool = (config?.items && config.items.length > 0) ? config.items : allProducts;
    if (product.related_slugs && product.related_slugs.length > 0) {
      const matched = product.related_slugs
        .map((slug) => pool.find((p) => p.slug === slug || p.id === slug))
        .filter((p): p is CollectionItem => Boolean(p));
      if (matched.length > 0) return matched.slice(0, 4);
    }
    return pool.filter((p) => p.id !== product.id && p.slug !== product.slug).slice(0, 4);
  }, [product, allProducts, config]);

  // Dynamic values pulled from data.json (or config fallback)
  const eyebrowText = product.detail_tag || config?.eyebrow_default || 'COLLECTION';
  const titleMain = product.detail_title_main || product.title.split(' ')[0] + ' ';
  const titleHighlight =
    product.detail_title_highlight ||
    product.title.split(' ').slice(1).join(' ') ||
    product.title;
  const shortDescription =
    product.short_description ||
    product.description ||
    'A beautifully crafted ensemble featuring refined detailing, exquisite fabric choice, and a graceful silhouette for a timeless look.';
  const features = product.features || [];
  const productDetails = product.product_details || {};
  const longDescription = product.description || '';

  const enquireText = (config?.enquire_button_text || 'Enquire Now').replace(/[\u2192\->]/g, '').trim();
  const enquireLink = config?.enquire_button_link || '/enquire';
  const productDetailsHeading = config?.product_details_heading || 'Product Details';
  const descriptionHeading = config?.description_heading || 'Description';
  const relatedHeadingMain = config?.related_heading_main || 'You May ';
  const relatedHeadingHighlight = config?.related_heading_highlight || 'Also Like';
  const relatedButtonText = (config?.related_button_text || 'View More').replace(/[\u2192\->]/g, '').trim();

  return (
    <div className="w-full bg-[#FFFFFF] py-12 sm:py-16 lg:py-20 selection:bg-[#5F1722] selection:text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP HERO SPLIT: Left Image / Right Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 sm:mb-20">
          
          {/* Left Column: Product Image (Adjusted golden proportion matching user mockup) */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[420px] aspect-[4/4.3] max-h-[460px] overflow-hidden rounded-2xl bg-[#F7F3ED] shadow-sm border border-[#EADBDF]/60 group">
              <img
                src={product.image}
                alt={product.image_alt || product.title}
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover [object-position:center_15%] block transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Right Column: Title, Short Desc, Features, CTA with Motion */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Tag / Eyebrow */}
            <div className="flex items-center gap-3 sm:gap-4 mb-3">
              <span className="w-8 sm:w-12 h-[1px] bg-[#5F1722]/70" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[#5F1722]">
                {eyebrowText}
              </span>
              <span className="w-8 sm:w-12 h-[1px] bg-[#5F1722]/70" />
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#1A1A1A] tracking-tight leading-[1.18] mb-4">
              {titleMain}
              <span className="italic font-serif font-light text-[#5F1722]">
                {titleHighlight}
              </span>
            </h1>

            {/* Short Description */}
            <p className="text-sm sm:text-[15px] text-[#666666] leading-relaxed max-w-xl mb-6">
              {shortDescription}
            </p>

            {/* Bullet Features with Checkmarks + Interactive Hover */}
            <div className="space-y-3 sm:space-y-3.5 mb-8 w-full max-w-lg">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-left group/feat transition-transform duration-200 hover:translate-x-1"
                >
                  <div className="w-5 h-5 rounded-full border border-[#5F1722] flex items-center justify-center shrink-0 text-[#5F1722] bg-[#FAF1F6] group-hover/feat:bg-[#5F1722] group-hover/feat:text-white transition-colors duration-200 shadow-2xs">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span className="text-[14px] sm:text-[15px] text-[#222222] font-medium font-sans">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Enquire Now CTA Button */}
            <Link
              href={enquireLink}
              className="inline-flex items-center justify-center gap-2.5 bg-[#5F1722] hover:bg-[#471119] text-white px-8 py-3.5 rounded-lg text-sm sm:text-[15px] font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] group cursor-pointer"
            >
              <span>{enquireText}</span>
              <ArrowRight className="w-4 h-4 stroke-[2] transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>

        </div>

        {/* MIDDLE SPLIT: Product Details (Left Box) + Description (Right Box) */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-20 sm:mb-24"
        >
          {/* Left Box: Product Details Table */}
          <div className="bg-[#FAF7F2]/60 rounded-2xl border border-[#EADBDF] p-6 sm:p-8 hover:shadow-md transition-all duration-300">
            <h3 className="font-serif italic text-2xl sm:text-[26px] text-[#5F1722] font-normal mb-5 tracking-tight">
              {productDetailsHeading}
            </h3>

            <div className="divide-y divide-[#EADBDF]/70">
              {Object.entries(productDetails).map(([key, value]) => (
                <div
                  key={key}
                  className="py-3 flex items-center text-xs sm:text-sm font-sans"
                >
                  <span className="w-28 sm:w-36 font-bold text-[#1A1A1A] shrink-0">
                    {key}
                  </span>
                  <span className="text-[#888888] mr-3">:</span>
                  <span className="text-[#444444] font-medium leading-relaxed">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Box: In-Depth Description */}
          <div className="bg-[#FAF7F2]/60 rounded-2xl border border-[#EADBDF] p-6 sm:p-8 flex flex-col justify-start hover:shadow-md transition-all duration-300">
            <h3 className="font-serif italic text-2xl sm:text-[26px] text-[#5F1722] font-normal mb-5 tracking-tight">
              {descriptionHeading}
            </h3>
            <p className="text-sm sm:text-[15px] text-[#555555] leading-relaxed font-sans">
              {longDescription}
            </p>
          </div>
        </motion.div>

        {/* BOTTOM SECTION: "You May Also Like" */}
        <motion.section
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full"
        >
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <span className="w-10 sm:w-14 h-[1.5px] bg-[#5F1722]/60" />
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#1A1A1A] tracking-tight">
                {relatedHeadingMain}
                <span className="italic font-serif font-light text-[#5F1722]">
                  {relatedHeadingHighlight}
                </span>
              </h2>
              <span className="w-10 sm:w-14 h-[1.5px] bg-[#5F1722]/60" />
            </div>
          </div>

          {/* 4 Columns Related Products Grid with Motion */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {relatedProducts.map((relItem, idx) => {
              const relUrl = `/collections/${relItem.slug || relItem.id}`;

              return (
                <motion.div
                  key={relItem.id || idx}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: 'easeOut' }}
                  className="group flex flex-col items-center text-center"
                >
                  <Link
                    href={relUrl}
                    className="block w-full overflow-hidden rounded-lg sm:rounded-xl bg-[#F7F3ED] shadow-2xs group-hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="relative w-full aspect-[3/4] overflow-hidden">
                      <img
                        src={relItem.image}
                        alt={relItem.image_alt || relItem.title}
                        loading="eager"
                        decoding="sync"
                        className="w-full h-full object-cover object-top transition-transform duration-600 ease-out group-hover:scale-105 block"
                      />
                    </div>
                  </Link>

                  <h3 className="font-serif font-bold text-base sm:text-[17px] text-[#1A1A1A] mt-3.5 tracking-tight leading-snug">
                    <Link
                      href={relUrl}
                      className="hover:text-[#5F1722] transition-colors duration-200"
                    >
                      {relItem.title}
                    </Link>
                  </h3>

                  <Link
                    href={relUrl}
                    className="inline-flex items-center justify-center gap-1 border border-[#5F1722]/55 hover:border-[#5F1722] text-[#5F1722] hover:bg-[#5F1722] hover:text-white px-4 py-1.5 mt-2 rounded-md text-[12px] font-medium font-sans transition-all duration-200 group-hover:bg-[#5F1722] group-hover:text-white shadow-2xs"
                  >
                    <span>{relatedButtonText}</span>
                    <ArrowRight className="w-3 h-3 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

      </div>
    </div>
  );
}
