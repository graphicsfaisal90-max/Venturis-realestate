"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { siteConfig, stats } from "@/lib/constants";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1920")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-12 h-px gold-gradient-bg" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-medium">
            {siteConfig.tagline}
          </span>
          <span className="w-12 h-px gold-gradient-bg" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 gold-gradient"
        >
          Discover
          <br />
          Luxury Living
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-20 h-0.5 gold-gradient-bg rounded-full mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed"
        >
          Curating the world&apos;s most exceptional properties for
          discerning clients who demand nothing but the best.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/properties"
            className="gold-gradient-bg text-white px-8 py-4 rounded-lg font-medium text-base tracking-wide hover:opacity-90 transition-all duration-300 active:scale-[0.97]"
          >
            Explore Properties
          </Link>
          <Link
            href="/contact"
            className="border border-white/20 text-white px-8 py-4 rounded-lg font-medium text-base tracking-wide hover:bg-white/5 transition-all duration-300 active:scale-[0.97]"
          >
            Schedule a Tour
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-gold-400" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="bg-black/60 backdrop-blur-md border-t border-white/5">
          <div className="container-luxury">
            <div className="grid grid-cols-3 divide-x divide-white/10 py-5">
              {stats.slice(0, 3).map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl md:text-2xl font-bold gold-gradient font-num">
                    {stat.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-white/40 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
