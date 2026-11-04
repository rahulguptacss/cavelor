'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BackToTopData } from '../types';

export default function BackToTop({ data }: { data?: BackToTopData }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.25 }}
          aria-label={data?.aria_label || 'Back to top'}
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#4A0E17] text-[#FAF7F2] shadow-lg transition-all duration-300 hover:bg-[#370A10] hover:-translate-y-1 hover:shadow-xl focus:outline-hidden focus:ring-2 focus:ring-[#4A0E17]/30 cursor-pointer"
        >
          <ArrowUp className="h-5 w-5 stroke-[2]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

