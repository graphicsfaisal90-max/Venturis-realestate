"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogCard from "@/components/blog/BlogCard";
import { blogData } from "@/lib/constants";

export default function BlogSection() {
  const latestPosts = blogData.filter((p) => p.isFeatured).slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-[#111315]">
      <div className="container-luxury">
        <SectionHeading
          title="Latest Insights"
          subtitle="Expert perspectives on luxury real estate markets, investment strategies, and lifestyle trends"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {latestPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#C8A46B] hover:text-[#D6B98C] font-medium text-sm tracking-wide transition-colors group"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
