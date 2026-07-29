"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { BlogCard } from "@/components/molecules/BlogCard";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronRight, Link2, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getPublicBlogPost, getPublicBlogPosts, BlogPost } from "@/lib/api/blog";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogDetailClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await getPublicBlogPost(slug);
        const postData = response.data || response;
        setPost(postData);

        // Fetch related posts (could be based on category or just latest)
        const relatedRes = await getPublicBlogPosts({
          per_page: 3,
          category_id: postData.blog_category_id
        });
        const fetchedRelated = relatedRes.data || relatedRes || [];
        // Filter out current post
        setRelatedPosts(fetchedRelated.filter((p: BlogPost) => p.id !== postData.id).slice(0, 3));
      } catch (error: any) {
        console.error("Failed to fetch post", error);
        console.error("Error details:", error.response?.status, error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Reading progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (loading) {
    return (
      <div className="bg-[#FAF8F4] min-h-screen pt-32 pb-24">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb Skeleton */}
            <Skeleton className="h-6 w-48 mb-10 bg-gray-200" />

            {/* Title & Meta Skeleton */}
            <div className="mb-12 max-w-4xl">
              <Skeleton className="h-14 w-full mb-4 bg-gray-200" />
              <Skeleton className="h-14 w-3/4 mb-8 bg-gray-200" />
              <div className="flex justify-between items-center py-6 border-y border-gray-200">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-gray-200" />
                    <Skeleton className="h-3 w-24 bg-gray-200" />
                  </div>
                </div>
                <Skeleton className="h-6 w-48 rounded-full bg-gray-200" />
              </div>
            </div>

            {/* Hero Image Skeleton */}
            <Skeleton className="w-full aspect-[21/9] rounded-3xl mb-16 bg-gray-200" />

            {/* Content & Sidebar Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              <div className="lg:col-span-8 space-y-4">
                <Skeleton className="h-6 w-full bg-gray-200" />
                <Skeleton className="h-6 w-full bg-gray-200" />
                <Skeleton className="h-6 w-5/6 bg-gray-200" />
                <Skeleton className="h-6 w-full mt-8 bg-gray-200" />
                <Skeleton className="h-6 w-4/5 bg-gray-200" />
              </div>
              <div className="lg:col-span-4">
                <Skeleton className="h-64 w-full rounded-3xl bg-gray-200" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-[#FAF8F4] min-h-screen pt-32 pb-24 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-serif text-[#171512] mb-4">Artikel tidak ditemukan</h1>
        <Link href="/blog" className="text-amber-600 hover:underline">Kembali ke Blog</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F4] min-h-screen pt-28 pb-24 relative">

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-primary origin-left z-50"
        style={{ scaleX }}
      />

      <Container>
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumbs */}
          <div className="mb-10">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/" />}>Beranda</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/blog" />}>Blog</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="max-w-[200px] truncate">{post.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Article Header */}
          <div className="mb-12 max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#171512] leading-tight mb-8">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-gray-200">
              <div className="flex items-center gap-4">
                {post.author?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold border-2 border-white shadow-sm">
                    {post.author?.name?.charAt(0) || '?'}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-[#171512]">Written by {post.author?.name || 'Unknown Author'}</span>
                  <span className="text-xs text-gray-500">{post.author?.bio || 'Author'}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                {post.category && (
                  <span className="px-3 py-1 bg-gradient-primary/10 text-gradient-primary rounded-full text-xs uppercase tracking-wider">
                    {post.category.name}
                  </span>
                )}
                <span>Published on {post.publish_date ? format(new Date(post.publish_date), 'dd MMM yyyy') : 'No Date'}</span>
                <span>•</span>
                <span>{post.reading_time || 5} min read</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          {(post.featured_image || post.thumbnail) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-[21/9] rounded-3xl overflow-hidden bg-gray-200 mb-16 shadow-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.featured_image || post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
            </motion.div>
          )}

          {/* Layout: Content & Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

            {/* Left: Article Content */}
            <div className="lg:col-span-8">
              <article
                className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#171512] prose-p:text-gray-700 prose-a:text-gradient-primary prose-blockquote:border-l-[#004A8F] prose-blockquote:bg-gradient-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:font-serif prose-blockquote:italic"
                dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag.id} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Share & Navigation */}
              <div className="mt-16 pt-8 border-t border-gray-200">
                <div className="flex justify-between items-center gap-4">
                  <Link href="/blog" className="flex-1 p-6 rounded-2xl bg-white border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all group">
                    <span className="flex items-center gap-2 text-xs text-gray-500 mb-2 uppercase tracking-wider"><ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Kembali</span>
                    <span className="font-serif font-bold text-[#171512] line-clamp-2">Lihat Artikel Lainnya</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Sticky Sidebar */}
            <div className="lg:col-span-4 sticky top-32">

              {/* Dynamic CTA Widget */}
              {post.cta ? (
                <div className="bg-white rounded-3xl p-8 border border-[#EFEADD] shadow-sm mb-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary/5 rounded-bl-full -z-0"></div>
                  <h3 className="font-serif text-2xl font-bold text-gradient-secondary mb-4 relative z-10">{post.cta.title}</h3>
                  {post.cta.description && (
                    <p className="text-sm text-gray-600 mb-6 relative z-10">{post.cta.description}</p>
                  )}
                  <Link href={post.cta.button_link} className="inline-block w-full py-3 bg-gradient-primary hover:bg-[#c27a00] text-white font-bold rounded-full transition-colors relative z-10">
                    {post.cta.button_text}
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 border border-[#EFEADD] shadow-sm mb-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary/5 rounded-bl-full -z-0"></div>
                  <h3 className="font-serif text-2xl font-bold text-gradient-secondary mb-4 relative z-10">Punya naskah yang siap diterbitkan?</h3>
                  <p className="text-sm text-gray-600 mb-6 relative z-10">Wujudkan impian Anda menjadi penulis yang karyanya dibaca ribuan orang bersama Aksara Nusa.</p>
                  <Link href="/publishing" className="inline-block w-full py-3 bg-gradient-primary hover:bg-[#c27a00] text-white font-bold rounded-full transition-colors relative z-10">
                    Terbitkan Buku Anda
                  </Link>
                </div>
              )}

            </div>
          </div>
        </div>
      </Container>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="mt-24 pt-20 border-t border-gray-200">
          <Container>
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-serif text-[#171512] mb-10 text-center">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </Container>
        </div>
      )}

    </div>
  );
}
