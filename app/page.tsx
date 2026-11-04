import React from 'react';
import type { Metadata } from 'next';
import Header from '../components/sections/Header';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Collections from '../components/sections/Collections';
import Testimonials from '../components/sections/Testimonials';
import Blogs from '../components/sections/Blogs';
import Footer from '../components/sections/Footer';
import BackToTop from '../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../components/types';

const pageData = pages.home;

export const metadata: Metadata = {
  title: pageData?.metadata?.title || 'CAVÉLOR — Timeless Elegance & Haute Couture',
  description:
    pageData?.metadata?.description ||
    'Experience haute couture and contemporary tailoring at CAVÉLOR. Discover our exclusive women\'s, men\'s, footwear, and accessories collections.',
};

export default function Home() {
  const sectionMap: Record<string, React.ReactNode> = {
    Hero: <Hero data={sections.hero} />,
    About: <About data={sections.about} />,
    Collections: <Collections data={sections.collections} layout="home" />,
    Testimonials: <Testimonials data={sections.testimonials} />,
    Blogs: <Blogs data={sections.blogs} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2] font-sans selection:bg-[#4A0E17] selection:text-[#FAF7F2]">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pageData.components.map((block: PageComponent) => (
          <React.Fragment key={block.key}>
            {sectionMap[block.component] ?? null}
          </React.Fragment>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}
