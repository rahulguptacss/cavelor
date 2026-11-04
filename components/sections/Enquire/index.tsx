'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headphones,
  ShieldCheck,
  Layers,
  ChevronDown,
  Check,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import type { EnquireSectionData } from '../../types';

interface EnquireProps {
  data: EnquireSectionData;
}

export default function Enquire({ data }: EnquireProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const defaultOptions = [
    'Bespoke Tailoring',
    'Bulk Orders & Corporate',
    'Styling & Private Salon',
    'Runway Capsule Pre-Order',
    'General Inquiries',
  ];

  const dropdownOptions =
    data?.dropdown_options && data.dropdown_options.length > 0
      ? data.dropdown_options
      : defaultOptions;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  if (!data) return null;

  // Features list from data.json or fallback
  const features =
    data.features && data.features.length > 0
      ? data.features
      : [
          {
            id: 'quick-response',
            icon: 'Headphones',
            title: 'Quick Response',
            description: "We'll get back to you shortly",
          },
          {
            id: 'trusted-support',
            icon: 'ShieldCheck',
            title: 'Trusted Support',
            description: 'Get the right guidance',
          },
          {
            id: 'custom-assistance',
            icon: 'Layers',
            title: 'Custom Assistance',
            description: 'Solutions tailored to your needs',
          },
        ];

  const getFeatureIcon = (iconName: string) => {
    const iconClass = 'w-5 h-5 text-[#5F1722]';
    switch (iconName) {
      case 'Headphones':
      case 'Headset':
        return <Headphones className={iconClass} />;
      case 'ShieldCheck':
        return <ShieldCheck className={iconClass} />;
      case 'Layers':
      default:
        return <Layers className={iconClass} />;
    }
  };

  return (
    <section
      id="enquire"
      className="w-full bg-[#FFFFFF] py-14 sm:py-18 lg:py-20 selection:bg-[#5F1722] selection:text-white"
    >
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        
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
            {data.heading_main || 'Request '}
            <span className="italic font-serif font-light text-[#5F1722]">
              {data.heading_highlight || 'More Details'}
            </span>
          </h2>

          {data.subtitle && (
            <p className="text-sm sm:text-[15px] font-normal text-[#666666] max-w-lg mx-auto mt-3 leading-relaxed">
              {data.subtitle}
            </p>
          )}
        </motion.div>

        {/* Main 2-Column Section: Left Image & Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Vertical Fashion Rack Image */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xs border border-[#EADBDF] min-h-[380px] sm:min-h-[480px] lg:min-h-[540px] group"
          >
            <Image
              src={data.image || '/enquire/enquire-fashion.webp'}
              alt={data.image_alt || 'CAVÉLOR luxury atelier wardrobe rack'}
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover object-center w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            {/* Subtle Vignette Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Right Column: Enquiry Form Card */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-7 bg-[#FAF1F6] p-6 sm:p-8 md:p-10 rounded-2xl border border-[#F2E5EC] shadow-2xs flex flex-col justify-center"
          >
            <h3 className="font-serif text-2xl sm:text-[30px] font-normal text-[#1A1A1A] mb-6 sm:mb-7 tracking-tight">
              {data.form_title_prefix || 'Enquiry '}
              <span className="italic font-serif font-light text-[#5F1722]">
                {data.form_title_highlight || 'Form'}
              </span>
            </h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center flex flex-col items-center bg-white rounded-xl p-8 border border-[#EADBDF]"
              >
                <div className="w-14 h-14 rounded-full bg-[#FAF1F6] flex items-center justify-center mb-4 text-[#5F1722]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl text-[#1A1A1A] font-normal mb-2">
                  {data.success_title || 'Enquiry Successfully Submitted'}
                </h4>
                <p className="text-sm text-[#666666] max-w-md mb-6 leading-relaxed">
                  {data.success_message ||
                    'Thank you for reaching out to CAVÉLOR. Our bespoke advisor will review your requirements and get in touch with you shortly.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setSelectedEnquiry('');
                    setFormData({ name: '', email: '', phone: '', message: '' });
                  }}
                  className="bg-[#5F1722] hover:bg-[#4A0E17] text-white text-xs uppercase tracking-[0.2em] font-medium px-6 py-3 rounded-md cursor-pointer transition-colors duration-200"
                >
                  {data.submit_another_text || 'Submit Another Enquiry'}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                
                {/* Row 1: Your Name & Your Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={data.form_name_placeholder || 'Your Name *'}
                      className="w-full bg-[#FFFFFF] border border-[#EADBDF] focus:border-[#5F1722] focus:ring-1 focus:ring-[#5F1722] rounded-md px-4 py-3 sm:py-3.5 text-sm text-[#1A1A1A] placeholder:text-[#888888] outline-none transition-all duration-200 shadow-2xs"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={data.form_email_placeholder || 'Your Email *'}
                      className="w-full bg-[#FFFFFF] border border-[#EADBDF] focus:border-[#5F1722] focus:ring-1 focus:ring-[#5F1722] rounded-md px-4 py-3 sm:py-3.5 text-sm text-[#1A1A1A] placeholder:text-[#888888] outline-none transition-all duration-200 shadow-2xs"
                    />
                  </div>
                </div>

                {/* Row 2: Phone Number & Custom Styled Dropdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={data.form_phone_placeholder || 'Phone Number *'}
                      className="w-full bg-[#FFFFFF] border border-[#EADBDF] focus:border-[#5F1722] focus:ring-1 focus:ring-[#5F1722] rounded-md px-4 py-3 sm:py-3.5 text-sm text-[#1A1A1A] placeholder:text-[#888888] outline-none transition-all duration-200 shadow-2xs"
                    />
                  </div>

                  {/* Custom Animated Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full bg-[#FFFFFF] border ${
                        isDropdownOpen ? 'border-[#5F1722] ring-1 ring-[#5F1722]' : 'border-[#EADBDF]'
                      } rounded-md px-4 py-3 sm:py-3.5 text-sm text-left flex items-center justify-between transition-all duration-200 shadow-2xs cursor-pointer`}
                      aria-haspopup="listbox"
                      aria-expanded={isDropdownOpen}
                    >
                      <span className={selectedEnquiry ? 'text-[#1A1A1A] font-medium' : 'text-[#888888]'}>
                        {selectedEnquiry || data.form_dropdown_placeholder || 'Enquiry For *'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#5F1722] transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </button>

                    {/* Animated Dropdown Menu Popup */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className="absolute top-full left-0 right-0 mt-1.5 z-40 bg-white rounded-xl shadow-xl border border-[#EADBDF] overflow-hidden py-1.5 backdrop-blur-md"
                          role="listbox"
                        >
                          {dropdownOptions.map((option) => {
                            const isSelected = selectedEnquiry === option;
                            return (
                              <button
                                type="button"
                                key={option}
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => {
                                  setSelectedEnquiry(option);
                                  setIsDropdownOpen(false);
                                }}
                                className={`w-full px-4 py-2.5 text-sm text-left flex items-center justify-between transition-colors duration-150 cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#FAF1F6] text-[#5F1722] font-semibold'
                                    : 'text-[#333333] hover:bg-[#FAF1F6] hover:text-[#5F1722]'
                                }`}
                              >
                                <span>{option}</span>
                                {isSelected && <Check className="w-4 h-4 text-[#5F1722]" />}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Row 3: Requirements / Message Textarea */}
                <div>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={data.form_message_placeholder || 'Your Requirements / Message *'}
                    className="w-full bg-[#FFFFFF] border border-[#EADBDF] focus:border-[#5F1722] focus:ring-1 focus:ring-[#5F1722] rounded-md px-4 py-3 sm:py-3.5 text-sm text-[#1A1A1A] placeholder:text-[#888888] outline-none transition-all duration-200 resize-none shadow-2xs"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5F1722] hover:bg-[#4A0E17] text-white font-medium text-sm sm:text-base py-3.5 sm:py-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm group disabled:opacity-75"
                >
                  <span>{isSubmitting ? 'Submitting...' : data.button_text || 'Submit Enquiry →'}</span>
                  {!isSubmitting && !data.button_text?.includes('→') && (
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Bottom 3-Column Features Section with Vertical Dividers */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="mt-14 sm:mt-18 pt-10 sm:pt-12 border-t border-[#F0EAE4]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 items-center">
            {features.map((item, index) => {
              const isLast = index === features.length - 1;
              return (
                <div
                  key={item.id || index}
                  className={`flex flex-col items-center text-center px-4 sm:px-8 group ${
                    !isLast ? 'md:border-r border-[#EADBDF]' : ''
                  }`}
                >
                  {/* Rounded Blush Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-[#FAF1F6] flex items-center justify-center border border-[#F2E5EC] mb-3.5 transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#F5E6EF]">
                    {getFeatureIcon(item.icon)}
                  </div>

                  {/* Title */}
                  <h4 className="text-[16px] sm:text-[17px] font-semibold text-[#1A1A1A] mb-1 tracking-tight">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#666666] leading-relaxed max-w-xs">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
