import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Collections from '../../components/sections/Collections';
import Footer from '../../components/sections/Footer';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../components/types';

const pageData = pages.collections;

export const metadata: Metadata = {
  title: pageData?.metadata?.title || 'Collections — Women’s, Men’s, Footwear & Accessories | CAVÉLOR',
  description:
    pageData?.metadata?.description ||
    'Explore the curated collections of CAVÉLOR Paris: bespoke women’s suits, men’s tailoring, luxury footwear, and handcrafted leather accessories.',
};

export default function CollectionsPage() {
  const homeLinkName = common.Header.links[0]?.name || 'Home';
  const pageTitle = pageData?.pageName || 'Collections';

  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={{
          ...sections.breadcrumb,
          background_image: '/about/about-hero-banner.webp',
        }}
        currentPage={pageTitle.toUpperCase()}
        items={[
          { name: homeLinkName, href: '/' },
          { name: pageTitle, href: '/collections' },
        ]}
      />
    ),
    Collections: <Collections data={sections.collections} layout="grid" />,
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

