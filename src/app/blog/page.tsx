"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { blogData, blogCategories } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedText from "@/components/ui/AnimatedText";
import BlogCard from "@/components/blog/BlogCard";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...blogCategories];

  const filtered = useMemo(() => {
    if (activeCategory === "All") return blogData;
    return blogData.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="min-h-screen">
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-900/20 via-transparent to-[#0c0c0c]" />
        <div className="container-luxury relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <AnimatedText
              text="Our Blog"
              className="text-5xl md:text-7xl font-bold gold-gradient mb-6"
            />
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Insights, trends, and stories from the world of luxury real estate.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-luxury">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "gold-gradient-bg text-white"
                    : "border border-white/10 text-white/50 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-white/40">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
