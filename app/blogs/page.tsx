import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Blogs from '../../components/sections/Blogs';
import Footer from '../../components/sections/Footer';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../components/types';

const pageData = pages.blogs;

export const metadata: Metadata = {
  title: pageData?.metadata?.title || 'Journal & Editorial — Fashion Trends | CAVÉLOR Paris',
  description:
    pageData?.metadata?.description ||
    'Read our latest editorial pieces on timeless wardrobe building, couture silhouettes, and luxury lifestyle trends.',
};

export default function BlogsPage() {
  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={sections.breadcrumb}
        currentPage={pageData?.pageName || 'Our Blogs'}
      />
    ),
    Blogs: <Blogs data={sections.blogs} />,
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

