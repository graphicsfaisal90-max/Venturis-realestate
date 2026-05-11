"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import LazyImage from "@/components/ui/LazyImage";
import Badge from "@/components/ui/Badge";
import { truncate, getTimeAgo } from "@/lib/utils";

interface BlogCardProps {
  post: any;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="glass rounded-xl luxury-shadow card-hover overflow-hidden group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative overflow-hidden">
          <LazyImage
            src={post.image}
            alt={post.title}
            className="h-48"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <Badge variant="gold">{post.category}</Badge>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 mb-2 group-hover:text-[#C8A46B] transition-colors">
            {post.title}
          </h3>

          <p className="text-xs text-[#7D8590] leading-relaxed line-clamp-2 mb-4">
            {truncate(post.excerpt, 100)}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-[#ffffff08]">
            <div className="flex items-center gap-2">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-[11px] text-[#7D8590]">{post.author}</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-[#7D8590]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {getTimeAgo(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span className="font-num">{post.readTime}</span> min
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
