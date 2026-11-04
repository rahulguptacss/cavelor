import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Enquire from '../../components/sections/Enquire';
import Footer from '../../components/sections/Footer';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../components/types';

const pageData = pages.enquire;

export const metadata: Metadata = {
  title: pageData?.metadata?.title || 'VIP Enquiries & Appointments | CAVÉLOR Paris',
  description:
    pageData?.metadata?.description ||
    'Schedule a private consultation, reserve exclusive runway pieces, or request bespoke couture fittings.',
};

export default function EnquirePage() {
  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={{
          ...sections.breadcrumb,
          background_image: '/about/about-hero-banner.webp',
        }}
        currentPage={pageData?.pageName || 'Enquire Now'}
      />
    ),
    Enquire: sections.enquire ? <Enquire data={sections.enquire} /> : null,
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

