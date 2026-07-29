"use client";

import React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/api/blog";
import { motion } from "framer-motion";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block w-full">
      <motion.div 
        whileHover={{ y: -5 }}
        className="flex flex-col h-full bg-transparent"
      >
        <div className="relative aspect-video overflow-hidden rounded-xl mb-4 bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={post.thumbnail || post.featured_image || '/placeholder-image.jpg'} 
            alt={post.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
        
        <div className="flex flex-col flex-1">
          <h3 className="text-base font-bold text-[#171512] mb-2 line-clamp-2 group-hover:text-gradient-primary transition-colors">
            {post.title}
          </h3>
          
          <p className="text-[#6B6860] text-sm line-clamp-4 flex-1 font-medium">
            {post.excerpt}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
