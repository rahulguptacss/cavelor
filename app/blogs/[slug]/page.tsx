import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import BlogDetail from '../../../components/sections/BlogDetail';
import Footer from '../../../components/sections/Footer';
import BackToTop from '../../../components/ui/BackToTop';
import { common, pages, sections, toSlug, type PageComponent } from '../../../components/types';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const items = sections.blog_detail?.items || sections.blogs?.items || [];
  return items.map((item) => ({
    slug: item.slug || toSlug(item.title),
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const items = sections.blog_detail?.items || sections.blogs?.items || [];
  const post = items.find(
    (b) => (b.slug && b.slug === slug) || toSlug(b.title) === slug || b.id === slug
  );

  if (!post) {
    return {
      title: 'Article Not Found | CAVÉLOR Paris',
    };
  }

  return {
    title: `${post.title} | CAVÉLOR Paris Journal`,
    description: post.intro || `Read the latest editorial feature from CAVÉLOR Paris on ${post.title}.`,
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const items = sections.blog_detail?.items || sections.blogs?.items || [];
  const post = items.find(
    (b) => (b.slug && b.slug === slug) || toSlug(b.title) === slug || b.id === slug
  );

  if (!post) {
    notFound();
  }

  const pageData = pages.blog_detail;
  const homeLinkName = common.Header.links[0]?.name || 'Home';
  const blogsLinkName = pages.blogs?.pageName || 'Blogs';
  const pageTitle = pageData?.pageName || 'Blog Detail';

  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={sections.breadcrumb}
        currentPage={pageTitle.toUpperCase()}
        items={[
          { name: homeLinkName, href: '/' },
          { name: blogsLinkName, href: '/blogs' },
          { name: pageTitle, href: '#' },
        ]}
      />
    ),
    BlogDetail: <BlogDetail data={post || (sections.blog_detail as any)} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2] font-sans selection:bg-[#4A0E17] selection:text-[#FAF7F2]">
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
              currentPage="BLOG DETAIL"
              items={[
                { name: 'Home', href: '/' },
                { name: 'Blog Detail', href: '#' },
              ]}
            />
            <BlogDetail data={post} />
          </>
        )}
      </main>

      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}
