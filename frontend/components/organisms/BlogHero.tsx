"use client";

import React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/api/blog";
import { format } from "date-fns";

export function BlogHero({ post }: { post: BlogPost }) {
  return (
    <section className="mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Text Content */}
        <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-5">
            {post.category && (
              <span className="text-sm font-semibold tracking-wide text-gradient-primary uppercase">
                {post.category.name}
              </span>
            )}
            {post.category && <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>}
            <span className="text-sm font-medium text-gray-500">
              {post.publish_date ? format(new Date(post.publish_date), 'dd MMM yyyy') : 'No Date'}
            </span>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#171512] leading-[1.1] mb-6 hover:text-gradient-primary transition-colors">
              {post.title}
            </h2>
          </Link>

          <p className="text-[#6B6860] text-lg font-medium leading-relaxed mb-8 max-w-lg line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4">
            {post.author?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold border-2 border-white shadow-sm">
                {post.author?.name?.charAt(0) || '?'}
              </div>
            )}
            <div>
              <p className="text-[#171512] font-bold text-sm">{post.author?.name || 'Unknown Author'}</p>
              <p className="text-gray-500 text-xs font-medium">{post.author?.bio || 'Author'}</p>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <Link href={`/blog/${post.slug}`} className="block relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-2xl group shadow-sm bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={post.featured_image || post.thumbnail || '/placeholder-image.jpg'} 
              alt={post.title} 
              className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
