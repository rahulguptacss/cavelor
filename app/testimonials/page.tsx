import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Testimonials from '../../components/sections/Testimonials';
import Collections from '../../components/sections/Collections';
import Footer from '../../components/sections/Footer';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../components/types';

const pageData = pages.testimonials;

export const metadata: Metadata = {
  title: pageData?.metadata?.title || 'Client Reviews & Testimonials | CAVÉLOR Paris',
  description:
    pageData?.metadata?.description ||
    'Discover what connoisseurs and loyal patrons say about CAVÉLOR bespoke tailoring and luxury garments.',
};

export default function TestimonialsPage() {
  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={{
          ...sections.breadcrumb,
          background_image: '/about/about-hero-banner.webp',
        }}
        currentPage={pageData?.pageName || 'Testimonials'}
      />
    ),
    Testimonials: <Testimonials data={sections.testimonials} layout="grid" />,
    Collections: <Collections data={sections.collections} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFFFF] font-sans selection:bg-[#4A0E17] selection:text-[#FAF7F2]">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pageData?.components.map((block: PageComponent) => (
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

