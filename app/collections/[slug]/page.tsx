import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import CollectionsDetail from '../../../components/sections/CollectionsDetail';
import Footer from '../../../components/sections/Footer';
import BackToTop from '../../../components/ui/BackToTop';
import { common, pages, sections, toSlug, type PageComponent } from '../../../components/types';

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const items = sections.collections_detail?.items || sections.collections?.items || [];
  return items.map((item) => ({
    slug: item.slug || toSlug(item.title) || item.id,
  }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const items = sections.collections_detail?.items || sections.collections?.items || [];
  const product = items.find(
    (p) => (p.slug && p.slug === slug) || toSlug(p.title) === slug || p.id === slug
  );

  if (!product) {
    return {
      title: 'Product Not Found | CAVÉLOR Paris',
    };
  }

  return {
    title: `${product.title} — Collections Detail | CAVÉLOR Paris`,
    description:
      product.short_description ||
      `Explore ${product.title} handcrafted in Paris with finest fabrics and timeless silhouette.`,
  };
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const items = sections.collections_detail?.items || sections.collections?.items || [];
  const product = items.find(
    (p) => (p.slug && p.slug === slug) || toSlug(p.title) === slug || p.id === slug
  );

  if (!product) {
    notFound();
  }

  const pageData = pages.collections_detail;
  const homeLinkName = common.Header.links[0]?.name || 'Home';
  const pageTitle = pageData?.pageName || 'Collections Detail';

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
    CollectionsDetail: (
      <CollectionsDetail
        product={product}
        allProducts={items}
        config={sections.collections_detail}
      />
    ),
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFFFF] font-sans selection:bg-[#4A0E17] selection:text-[#FAF7F2]">
      <Header data={common.Header} />

      <main className="w-full flex-1">
        {pageData?.components ? (
          pageData.components.map((block: PageComponent) => (
            <React.Fragment key={block.key}>
              {sectionMap[block.component] ?? null}
            </React.Fragment>
          ))
        ) : (
          <>
            <Breadcrumb
              data={sections.breadcrumb}
              currentPage="COLLECTIONS DETAIL"
              items={[
                { name: 'Home', href: '/' },
                { name: 'Collections Detail', href: '/collections' },
              ]}
            />
            <CollectionsDetail
              product={product}
              allProducts={items}
              config={sections.collections_detail}
            />
          </>
        )}
      </main>

      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}
