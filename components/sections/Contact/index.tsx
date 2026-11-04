'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle2, ExternalLink } from 'lucide-react';
import type { ContactSectionData } from '../../types';

interface ContactProps {
  data: ContactSectionData;
}

export default function Contact({ data }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  if (!data) return null;

  // Icon mapping
  const getIcon = (type: string) => {
    const iconClass = "w-5 h-5 text-[#5F1722] transition-colors duration-200";
    switch (type) {
      case 'MapPin':
      case 'address':
        return <MapPin className={iconClass} />;
      case 'Phone':
      case 'phone':
        return <Phone className={iconClass} />;
      case 'Mail':
      case 'email':
        return <Mail className={iconClass} />;
      case 'Clock':
      case 'hours':
      default:
        return <Clock className={iconClass} />;
    }
  };

  // Structured contact info items from data.json
  const infoItems = data.items && data.items.length > 0
    ? data.items
    : [
        {
          id: 'address',
          icon: 'MapPin',
          title: data.address_title || '',
          line1: data.address_line1 || '',
          line2: data.address_line2 || '',
        },
        {
          id: 'phone',
          icon: 'Phone',
          title: data.phone_title || '',
          line1: data.phone || '',
          line2: '',
        },
        {
          id: 'email',
          icon: 'Mail',
          title: data.email_title || '',
          line1: data.email || '',
          line2: '',
        },
        {
          id: 'hours',
          icon: 'Clock',
          title: data.hours_title || '',
          line1: data.hours_line1 || '',
          line2: data.hours_line2 || '',
        },
      ];

  return (
    <section id="contact" className="w-full bg-[#FFFFFF] py-14 sm:py-18 lg:py-20 selection:bg-[#5F1722] selection:text-white">
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
            {data.heading_main || 'Get in '}
            <span className="italic font-serif font-light text-[#5F1722]">
              {data.heading_highlight || 'Touch'}
            </span>
          </h2>

          {data.subtitle && (
            <p className="text-sm sm:text-[15px] font-normal text-[#666666] max-w-lg mx-auto mt-3 leading-relaxed">
              {data.subtitle}
            </p>
          )}
        </motion.div>

        {/* 2-Column Grid: Left Info & Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Contact Information Items */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col justify-start"
          >
            <div className="space-y-6 sm:space-y-7">
              {infoItems.map((item, index) => {
                const isLast = index === infoItems.length - 1;
                const isPhone = item.id === 'phone' || item.icon === 'Phone';
                const isEmail = item.id === 'email' || item.icon === 'Mail';

                return (
                  <div
                    key={item.id || index}
                    className={`flex items-start gap-4 sm:gap-5 group transition-all duration-200 ${
                      !isLast ? 'border-b border-[#F0EAE4] pb-6 sm:pb-7' : 'pb-2'
                    }`}
                  >
                    {/* Rounded Blush Icon Container */}
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FAF1F6] flex items-center justify-center shrink-0 border border-[#F2E5EC] transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#F5E6EF]">
                      {getIcon(item.icon)}
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 pt-0.5">
                      <h3 className="text-[15px] sm:text-base font-semibold text-[#5F1722] mb-1 tracking-tight">
                        {item.title}
                      </h3>

                      {isPhone ? (
                        <a
                          href={`tel:${item.line1.replace(/[^0-9+]/g, '')}`}
                          className="text-sm text-[#555555] hover:text-[#5F1722] transition-colors leading-relaxed block"
                        >
                          {item.line1}
                        </a>
                      ) : isEmail ? (
                        <a
                          href={`mailto:${item.line1}`}
                          className="text-sm text-[#555555] hover:text-[#5F1722] transition-colors leading-relaxed block"
                        >
                          {item.line1}
                        </a>
                      ) : (
                        <div className="text-sm text-[#555555] leading-relaxed">
                          <p>{item.line1}</p>
                          {item.line2 && <p className="mt-0.5">{item.line2}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Contact Form Box */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-7 bg-[#FAF1F6] p-6 sm:p-8 md:p-9 rounded-2xl border border-[#F2E5EC] shadow-2xs"
          >
            <h3 className="font-serif text-2xl sm:text-[28px] font-normal text-[#1A1A1A] mb-6 sm:mb-7 tracking-tight">
              {data.form_title_prefix || 'Send Us a '}
              <span className="italic font-serif font-light text-[#5F1722]">
                {data.form_title_highlight || 'Message'}
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
                  {data.success_title || 'Thank You for Your Message'}
                </h4>
                <p className="text-sm text-[#666666] max-w-md mb-6 leading-relaxed">
                  {data.success_message || 'Your inquiry has been received. Our team will get back to you shortly.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="bg-[#5F1722] hover:bg-[#4A0E17] text-white text-xs uppercase tracking-[0.2em] font-medium px-6 py-3 rounded-md cursor-pointer transition-colors duration-200"
                >
                  {data.send_another_text || 'Send Another Message'}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Row 1: Name and Email */}
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

                {/* Row 2: Subject */}
                <div>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={data.form_subject_placeholder || 'Subject'}
                    className="w-full bg-[#FFFFFF] border border-[#EADBDF] focus:border-[#5F1722] focus:ring-1 focus:ring-[#5F1722] rounded-md px-4 py-3 sm:py-3.5 text-sm text-[#1A1A1A] placeholder:text-[#888888] outline-none transition-all duration-200 shadow-2xs"
                  />
                </div>

                {/* Row 3: Message Textarea */}
                <div>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={data.form_message_placeholder || 'Your Message *'}
                    className="w-full bg-[#FFFFFF] border border-[#EADBDF] focus:border-[#5F1722] focus:ring-1 focus:ring-[#5F1722] rounded-md px-4 py-3 sm:py-3.5 text-sm text-[#1A1A1A] placeholder:text-[#888888] outline-none transition-all duration-200 resize-none shadow-2xs"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5F1722] hover:bg-[#4A0E17] text-white font-medium text-sm sm:text-base py-3.5 sm:py-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm group disabled:opacity-75"
                >
                  <span>{isSubmitting ? 'Sending...' : data.form_button_text || 'Send Message →'}</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Normal Google Map Section with Interactive Embed */}
        <div className="mt-12 sm:mt-16 w-full relative rounded-2xl overflow-hidden shadow-xs border border-[#EADBDF] h-[280px] sm:h-[340px] md:h-[380px] group bg-[#E5E3DF]">
          <iframe
            title="Google Map location for CAVÉLOR Atelier"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(data.map_address || data.address || '123 Education Lane, New York, NY 10001')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            className="w-full h-full border-0 filter grayscale-[25%] contrast-[1.05] hover:grayscale-0 transition-all duration-700"
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Floating Location Badge matching screenshot */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(data.map_address || data.address || '123 Education Lane, New York, NY 10001')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/95 backdrop-blur-md rounded-xl shadow-md hover:shadow-xl border border-[#EADBDF] px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-3 sm:gap-3.5 transition-all duration-300 hover:scale-[1.02] group/card"
            >
              {/* Burgundy Map Pin Icon Badge */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#5F1722] text-white flex items-center justify-center shrink-0 shadow-xs group-hover/card:bg-[#4A0E17] transition-colors">
                <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" />
              </div>

              {/* Location Text */}
              <div className="flex flex-col pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-bold text-sm sm:text-base text-[#1A1A1A] leading-tight tracking-wide">
                    {data.map_pin_title || 'Cavélor'}
                  </span>
                  <ExternalLink className="w-3 h-3 text-[#5F1722] opacity-60 group-hover/card:opacity-100 transition-opacity" />
                </div>
                <span className="text-xs sm:text-[13px] text-[#666666] leading-tight mt-0.5">
                  {data.map_pin_subtitle || 'New York, NY 10001'}
                </span>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
