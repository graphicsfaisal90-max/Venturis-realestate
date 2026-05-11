"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  gold?: boolean;
}

export default function SectionHeading({ title, subtitle, align = "center", gold }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl mx-auto mb-16 ${align === "left" ? "text-left ml-0" : "text-center"}`}
    >
      <div className={`inline-flex items-center gap-2 mb-4 ${align === "left" ? "" : "mx-auto"}`}>
        <span className="w-8 h-px gold-gradient-bg" />
        <span className="text-xs uppercase tracking-[0.2em] text-gold-400 font-medium">
          Venturis Realtors
        </span>
        <span className="w-8 h-px gold-gradient-bg" />
      </div>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${
          gold ? "gold-gradient" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
