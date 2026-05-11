"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { siteConfig, stats } from "@/lib/constants";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1920",
    title: "Discover",
    subtitle: "Luxury Living",
    tagline: "Curating the world's most exceptional properties",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1920",
    title: "Premium",
    subtitle: "Real Estate",
    tagline: "Where elegance meets unparalleled sophistication",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920",
    title: "Exclusive",
    subtitle: "Properties",
    tagline: "Handpicked residences for discerning clients worldwide",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920",
    title: "Your Dream",
    subtitle: "Home Awaits",
    tagline: "Expert guidance through every step of your journey",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url("${slides[current].image}")`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Slider controls */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current
                  ? "w-8 bg-gradient-to-r from-[#C8A46B] to-[#D6B98C]"
                  : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <motion.div
          key={current + "-tagline"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-12 h-px gold-gradient-bg" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-medium">
            {slides[current].tagline}
          </span>
          <span className="w-12 h-px gold-gradient-bg" />
        </motion.div>

        <motion.h1
          key={current + "-title"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4 gold-gradient"
        >
          {slides[current].title}
          <br />
          {slides[current].subtitle}
        </motion.h1>

        <motion.div
          key={current + "-divider"}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-20 h-0.5 gold-gradient-bg rounded-full mb-8"
        />

        <motion.p
          key={current + "-desc"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed"
        >
          Curating the world&apos;s most exceptional properties for
          discerning clients who demand nothing but the best.
        </motion.p>

        <motion.div
          key={current + "-cta"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/properties"
            className="gold-gradient-bg text-white px-8 py-4 rounded-lg font-medium text-base tracking-wide hover:opacity-90 hover:shadow-[0_0_30px_rgba(200,164,107,0.3)] transition-all duration-300 active:scale-[0.97]"
          >
            Explore Properties
          </Link>
          <Link
            href="/contact"
            className="border border-white/30 text-white px-8 py-4 rounded-lg font-medium text-base tracking-wide hover:bg-white/10 hover:border-white/50 transition-all duration-300 active:scale-[0.97] backdrop-blur-sm"
          >
            Schedule a Tour
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 hidden md:flex"
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
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="bg-[#0B0B0C]/80 backdrop-blur-2xl border-t border-[#ffffff0a]">
          <div className="container-luxury">
            <div className="grid grid-cols-3 divide-x divide-[#ffffff0a] py-5">
              {stats.slice(0, 3).map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-xl md:text-2xl font-bold gold-gradient font-num">
                    {stat.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-[#7D8590] mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
