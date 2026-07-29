"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/atoms/Container";
import { BlogHero } from "@/components/organisms/BlogHero";
import { BlogCard } from "@/components/molecules/BlogCard";
import { CategoryNav } from "@/components/molecules/CategoryNav";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { getPublicBlogPosts, getPublicBlogFeatured, getPublicBlogPopular, BlogPost } from "@/lib/api/blog";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogIndexPage() {
  const [latestArticles, setLatestArticles] = useState<BlogPost[]>([]);
  const [popularArticles, setPopularArticles] = useState<BlogPost[]>([]);
  const [heroPost, setHeroPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const [latestRes, popularRes, featuredRes] = await Promise.all([
          getPublicBlogPosts({ per_page: 4 }),
          getPublicBlogPopular(),
          getPublicBlogFeatured()
        ]);

        const latestData = latestRes.data || latestRes || [];
        const popularData = popularRes.data || popularRes || [];
        const featuredData = featuredRes.data || featuredRes || [];

        setLatestArticles(latestData);
        setPopularArticles(popularData);
        if (featuredData && featuredData.length > 0) {
          setHeroPost(featuredData[0]);
        } else if (latestData && latestData.length > 0) {
          setHeroPost(latestData[0]);
        }
      } catch (error) {
        console.error("Failed to fetch blog data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeUpItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const hasAnyArticles = latestArticles.length > 0 || popularArticles.length > 0 || heroPost;

  return (
    <div className="bg-[#FAF8F4] min-h-screen pt-28 md:pt-32 pb-24">
      <Container>
        <div className="max-w-7xl mx-auto">
          
          {/* Header Row: Title & Categories */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 pb-6 border-b border-gray-200">
            <div className="flex items-center">
               <h1 className="text-base md:text-lg font-bold text-white bg-[#DB8B00] px-6 py-2 rounded-full inline-block">
                 Blog
               </h1>
            </div>
            <div className="flex-1 overflow-x-auto overflow-y-hidden no-scrollbar">
              <CategoryNav />
            </div>
          </div>

          {loading ? (
            <div className="space-y-12">
              <Skeleton className="w-full h-[60vh] rounded-3xl" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="w-full h-48 rounded-2xl" />
                    <Skeleton className="w-3/4 h-6" />
                    <Skeleton className="w-full h-12" />
                    <Skeleton className="w-1/2 h-4" />
                  </div>
                ))}
              </div>
            </div>
          ) : !hasAnyArticles ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#171512] mb-2">Belum Ada Artikel</h2>
              <p className="text-gray-500 max-w-md">Saat ini belum ada artikel yang dipublikasikan. Silakan periksa kembali nanti untuk konten-konten menarik dari kami.</p>
            </div>
          ) : (
            <>
              {/* Featured Hero Post */}
              {heroPost && <BlogHero post={heroPost} />}

              {/* Latest Articles */}
              {latestArticles.length > 0 && (
                <section className="mb-24">
                  <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
                    <h2 className="text-3xl font-serif text-[#171512]">Latest articles</h2>
                    <Link href="/blog/posts" className="text-sm font-semibold text-[#171512] hover:text-[#DB8B00] transition-colors flex items-center gap-2">
                      See all <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  
                  <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {latestArticles.map((post) => (
                      <motion.div key={post.id} variants={fadeUpItem}>
                        <BlogCard post={post} />
                      </motion.div>
                    ))}
                  </motion.div>
                </section>
              )}

              {/* Popular Articles */}
              {popularArticles.length > 0 && (
                <section className="mb-12">
                  <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
                    <h2 className="text-3xl font-serif text-[#171512]">Popular articles</h2>
                    <Link href="/blog/posts" className="text-sm font-semibold text-[#171512] hover:text-[#DB8B00] transition-colors flex items-center gap-2">
                      See all <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  
                  <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {popularArticles.map((post) => (
                      <motion.div key={post.id} variants={fadeUpItem}>
                        <BlogCard post={post} />
                      </motion.div>
                    ))}
                  </motion.div>
                </section>
              )}
            </>
          )}

        </div>
      </Container>
    </div>
  );
}
