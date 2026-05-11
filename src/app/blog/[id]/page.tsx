"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Link as LinkIcon,
  ChevronRight,
} from "lucide-react";
import { FaLinkedinIn, FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { blogData } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import BlogCard from "@/components/blog/BlogCard";

const contentParagraphs = [
  "In the ever-evolving landscape of luxury real estate, staying ahead of market trends is essential for both buyers and sellers. The current market dynamics present unique opportunities for those who understand the nuances of premium property transactions.",
  "The demand for luxury properties continues to surge, driven by a combination of factors including low interest rates, increasing wealth concentration, and a growing appreciation for exceptional living spaces. High-net-worth individuals are increasingly looking beyond traditional markets, exploring emerging destinations that offer both lifestyle benefits and investment potential.",
  "Technology has fundamentally transformed how luxury properties are marketed and sold. From AI-powered property matching algorithms that connect buyers with their ideal homes, to immersive 3D virtual tours that allow international buyers to explore properties remotely, innovation is reshaping every aspect of the industry.",
  "Sustainability has emerged as a key consideration for luxury buyers. Modern luxury is no longer just about opulence; it is about responsible opulence. Properties that incorporate sustainable features, energy-efficient systems, and environmentally conscious design are commanding premium prices in the market.",
  "The concept of luxury living has evolved significantly. Today's discerning buyers seek properties that offer not just physical space, but also wellness amenities, smart home technology, and seamless indoor-outdoor living. The integration of biophilic design principles, natural materials, and abundant natural light has become a hallmark of contemporary luxury architecture.",
  "Location remains paramount in luxury real estate, but the definition of prime location is expanding. While traditional prestige addresses continue to hold value, we are seeing increased interest in secondary markets, coastal retreats, and lifestyle destinations that offer a higher quality of life and greater value for money.",
  "As we look to the future, the luxury real estate market will continue to evolve. The most successful agents and firms will be those who embrace innovation, prioritize client experience, and maintain an unwavering commitment to excellence in every transaction.",
];

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const post = blogData.find((p) => p.id === params.id);

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Post Not Found</h1>
          <Button variant="outline" onClick={() => router.push("/blog")}>Back to Blog</Button>
        </div>
      </main>
    );
  }

  const related = blogData.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <main className="min-h-screen">
      <div className="container-luxury pt-28 pb-6">
        <button
          onClick={() => router.push("/blog")}
          className="flex items-center gap-2 text-white/40 hover:text-gold-400 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </button>
      </div>

      <article className="container-luxury pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="gold">{post.category}</Badge>
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-num">{post.readTime}</span> min read
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 pb-8 mb-8 border-b border-white/5">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{post.author}</p>
              <p className="text-xs text-white/40">Author</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            {contentParagraphs.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-white/60 leading-relaxed text-lg"
              >
                {text}
              </motion.p>
            ))}
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 mt-10 pt-8 border-t border-white/5">
              <Tag className="w-4 h-4 text-white/40" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/40"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/5">
            <span className="text-sm text-white/40 flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Share:
            </span>
            {[
              { icon: <FaXTwitter className="w-4 h-4" />, href: "#", label: "Twitter" },
              { icon: <FaFacebookF className="w-4 h-4" />, href: "#", label: "Facebook" },
              { icon: <FaLinkedinIn className="w-4 h-4" />, href: "#", label: "LinkedIn" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold-400 hover:border-gold-400/30 transition-colors"
              >
                {social.icon}
              </a>
            ))}
            <button
              onClick={copyToClipboard}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold-400 hover:border-gold-400/30 transition-colors"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </article>

      {related.length > 0 && (
        <section className="section-padding pt-0">
          <div className="container-luxury">
            <SectionHeading
              title="Related Articles"
              subtitle="Continue reading insights from our experts."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <BlogCard post={p} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
