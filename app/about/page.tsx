import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Breadcrumb from '../../components/sections/Breadcrumb';
import About from '../../components/sections/About';
import VisionMission from '../../components/sections/VisionMission';
import WhyChoose from '../../components/sections/WhyChoose';
import Collections from '../../components/sections/Collections';
import Testimonials from '../../components/sections/Testimonials';
import Footer from '../../components/sections/Footer';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../components/types';

const pageData = pages.about;

export const metadata: Metadata = {
  title: pageData?.metadata?.title || 'About CAVÉLOR — Heritage & Haute Couture Craftsmanship',
  description:
    pageData?.metadata?.description ||
    'Discover the heritage of CAVÉLOR Paris, where timeless tailoring meets contemporary luxury.',
};

export default function AboutPage() {
  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={sections.breadcrumb}
        currentPage={pageData?.pageName || 'About Us'}
      />
    ),
    About: <About data={sections.about} />,
    VisionMission: sections.vision_mission ? <VisionMission data={sections.vision_mission} /> : null,
    WhyChoose: sections.why_choose ? <WhyChoose data={sections.why_choose} /> : null,
    Collections: <Collections data={sections.collections} />,
    Testimonials: <Testimonials data={sections.testimonials} />,
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
