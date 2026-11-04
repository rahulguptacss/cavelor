import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Contact from '../../components/sections/Contact';
import Footer from '../../components/sections/Footer';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../components/types';

const pageData = pages.contact;

export const metadata: Metadata = {
  title: pageData?.metadata?.title || 'Contact Us — Private Appointments & Customer Care | CAVÉLOR Paris',
  description:
    pageData?.metadata?.description ||
    'Connect with CAVÉLOR’s Parisian atelier for private styling appointments, inquiries, and customer concierge.',
};

export default function ContactPage() {
  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={{
          ...sections.breadcrumb,
          background_image: '/about/about-hero-banner.webp',
        }}
        currentPage={pageData?.pageName || 'Contact Us'}
      />
    ),
    Contact: sections.contact ? <Contact data={sections.contact} /> : null,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2] font-sans selection:bg-[#4A0E17] selection:text-[#FAF7F2]">
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

