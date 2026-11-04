'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { TestimonialsSectionData, TestimonialItem } from '../../types';

interface TestimonialsProps {
  data: TestimonialsSectionData;
  layout?: 'grid' | 'slider';
}

export default function Testimonials({ data, layout = 'slider' }: TestimonialsProps) {
  const items = data?.items || [];
  const itemCount = items.length;

  // Cloned items array for seamless infinite sliding (3 repetitions)
  const clonedItems = React.useMemo(() => {
    if (itemCount === 0) return [];
    return [...items, ...items, ...items];
  }, [items, itemCount]);

  // Start at the middle set (index = itemCount)
  const [currentIndex, setCurrentIndex] = useState(itemCount);
  const [withTransition, setWithTransition] = useState(true);
  const [isSliding, setIsSliding] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive breakpoint tracking
  useEffect(() => {
    const handleResize = () => {
      setWithTransition(false);
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sliding conditions:
  // Desktop: Only slides if > 3 items
  // Mobile: Only slides if > 1 items
  const canSlideDesktop = itemCount > 3;
  const canSlideMobile = itemCount > 1;
  const canSlide = isDesktop ? canSlideDesktop : canSlideMobile;

  // State ref for rock-solid un-interrupted auto-slide intervals
  const slideStateRef = useRef({ canSlide, isPaused, isSliding });
  useEffect(() => {
    slideStateRef.current = { canSlide, isPaused, isSliding };
  }, [canSlide, isPaused, isSliding]);

  // Restore transition after instantaneous infinite jumps
  useEffect(() => {
    if (!withTransition) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithTransition(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [withTransition]);

  // Slide 1 by 1 Next
  const handleNext = useCallback(() => {
    if (!canSlide || isSliding) return;
    setIsSliding(true);
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  }, [canSlide, isSliding]);

  // Slide 1 by 1 Previous
  const handlePrev = useCallback(() => {
    if (!canSlide || isSliding) return;
    setIsSliding(true);
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  }, [canSlide, isSliding]);

  // Handle seamless infinite reset on transition end
  const handleTransitionEnd = () => {
    setIsSliding(false);

    if (itemCount <= 0) return;

    if (currentIndex >= 2 * itemCount) {
      // Reached or passed right clone boundary -> snap to middle clone
      setWithTransition(false);
      setCurrentIndex((prev) => prev - itemCount);
    } else if (currentIndex < itemCount) {
      // Reached or passed left clone boundary -> snap to middle clone
      setWithTransition(false);
      setCurrentIndex((prev) => prev + itemCount);
    }
  };

  // Rock-solid Auto-slide timer: slides smoothly 1-by-1 every 4.0 seconds
  useEffect(() => {
    if (layout !== 'slider') return;

    const timer = setInterval(() => {
      const { canSlide: canRun, isPaused: paused, isSliding: sliding } = slideStateRef.current;
      if (canRun && !paused && !sliding) {
        setIsSliding(true);
        setWithTransition(true);
        setCurrentIndex((prev) => prev + 1);
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [layout]);

  if (!items || itemCount === 0) return null;

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current || !canSlideMobile) return;
    const distance = touchStartX.current - touchEndX.current;
    const isSwipe = Math.abs(distance) > 40;

    if (isSwipe) {
      if (distance > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Active dot index mapped to original items
  const activeDotIndex = ((currentIndex % itemCount) + itemCount) % itemCount;

  const handleDotClick = (dotIdx: number) => {
    if (!canSlide || isSliding) return;
    setIsSliding(true);
    setWithTransition(true);
    setCurrentIndex(itemCount + dotIdx);
  };

  // Controls visibility:
  // - If items > 3: visible on both desktop & mobile ('flex')
  // - If 1 < items <= 3: visible on mobile, hidden on desktop ('flex md:hidden')
  // - If items <= 1: hidden everywhere
  const hasControls = canSlideMobile;
  const controlsVisibilityClass = canSlideDesktop ? 'flex' : 'flex md:hidden';

  // Reusable Single Card Component matching reference mockup
  const renderCard = (item: TestimonialItem, index: number) => {
    const rating = item.rating || 5;

    return (
      <div
        key={item.id || index}
        className="w-full bg-[#FFFFFF] rounded-2xl border border-[#EADBDF] p-6 sm:p-7 md:p-8 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between group text-left h-full select-none"
      >
        <div>
          {/* Burgundy Double Quote Marks */}
          <span
            aria-hidden="true"
            className="block font-serif text-[#5F1722] text-3xl sm:text-4xl font-bold leading-none mb-3 select-none"
          >
            “
          </span>

          {/* Review Text */}
          <p className="text-[14px] sm:text-[15px] text-[#333333] leading-relaxed mb-4 min-h-[68px]">
            {item.quote}
          </p>

          {/* 5 Filled Burgundy Stars */}
          <div className="flex items-center gap-1 mb-6">
            {[0, 1, 2, 3, 4].map((starIdx) => {
              const isFilled = starIdx < Math.floor(rating);
              return (
                <Star
                  key={starIdx}
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                    isFilled
                      ? 'fill-[#5F1722] text-[#5F1722]'
                      : 'fill-[#EADBDF] text-[#EADBDF]'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Author Row with Divider and HD Avatar */}
        <div className="flex items-center pt-2 mt-auto">
          {/* Circular HD Avatar */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 min-w-12 min-h-12 sm:min-w-14 sm:min-h-14 rounded-full overflow-hidden shrink-0 border border-[#EADBDF] bg-[#FAF1F6]">
            {item.image ? (
              <img
                src={item.image}
                alt={item.image_alt || item.author_name}
                width={56}
                height={56}
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover object-center block"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-serif text-[#5F1722] font-bold text-lg">
                {item.author_name?.charAt(0) || 'C'}
              </div>
            )}
          </div>

          {/* Thin Vertical Divider */}
          <div className="w-[1px] h-9 bg-[#EADBDF] mx-3 sm:mx-4 shrink-0" />

          {/* Author Name & Location */}
          <div className="flex flex-col">
            <h4 className="font-serif font-bold text-[15px] sm:text-[16px] text-[#1A1A1A] leading-tight tracking-tight">
              {item.author_name}
            </h4>
            <span className="text-xs sm:text-[13px] text-[#666666] leading-tight mt-0.5 font-sans">
              {item.location || item.author_role || 'Verified Patron'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="testimonials"
      className="w-full bg-[#FFFFFF] py-14 sm:py-18 lg:py-20 selection:bg-[#5F1722] selection:text-white"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Block */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
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
            {data.heading_main || 'What Our '}
            <span className="italic font-serif font-light text-[#5F1722]">
              {data.heading_highlight || 'Customers Say'}
            </span>
          </h2>

          {data.subtitle && (
            <p className="text-sm sm:text-[15px] font-normal text-[#666666] max-w-lg mx-auto mt-3 leading-relaxed">
              {data.subtitle}
            </p>
          )}
        </motion.div>

        {/* GRID MODE: Rendered on /testimonials page */}
        {layout === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-[1100px] mx-auto">
            {items.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                className="h-full"
              >
                {renderCard(item, index)}
              </motion.div>
            ))}
          </div>
        ) : (
          /* SLIDER MODE: Rendered on Homepage & About Page with continuous smooth 1-by-1 sliding */
          <div
            className="relative px-8 sm:px-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* If 3 or fewer items on desktop, render static 3-column row */}
            {itemCount <= 3 && isDesktop ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {items.map((item, idx) => (
                  <div key={item.id || idx} className="h-full">
                    {renderCard(item, idx)}
                  </div>
                ))}
              </div>
            ) : (
              /* Continuous Smooth Sliding Track Viewport */
              <div className="overflow-hidden w-full py-1">
                <div
                  className="flex gap-6 items-stretch will-change-transform [--slide-step:calc(100%+24px)] md:[--slide-step:calc((100%+24px)/3)]"
                  style={{
                    transform: `translateX(calc(-1 * ${currentIndex} * var(--slide-step)))`,
                    transition: withTransition
                      ? 'transform 700ms cubic-bezier(0.25, 1, 0.5, 1)'
                      : 'none',
                  }}
                  onTransitionEnd={handleTransitionEnd}
                >
                  {clonedItems.map((item, index) => (
                    <div
                      key={`slide-${index}`}
                      className="shrink-0 h-full flex w-full md:w-[calc((100%-48px)/3)]"
                    >
                      {renderCard(item, index % itemCount)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Previous Arrow Button */}
            {hasControls && (
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#EADBDF] shadow-sm items-center justify-center text-[#5F1722] hover:bg-[#5F1722] hover:text-white transition-colors duration-200 cursor-pointer z-20 ${controlsVisibilityClass}`}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              </button>
            )}

            {/* Next Arrow Button */}
            {hasControls && (
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className={`absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#EADBDF] shadow-sm items-center justify-center text-[#5F1722] hover:bg-[#5F1722] hover:text-white transition-colors duration-200 cursor-pointer z-20 ${controlsVisibilityClass}`}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              </button>
            )}

            {/* Slider Dots */}
            {hasControls && (
              <div className={`items-center justify-center gap-2 mt-8 ${controlsVisibilityClass}`}>
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDotClick(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      idx === activeDotIndex
                        ? 'w-6 h-1.5 bg-[#5F1722]'
                        : 'w-1.5 h-1.5 bg-[#5F1722]/25 hover:bg-[#5F1722]/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
