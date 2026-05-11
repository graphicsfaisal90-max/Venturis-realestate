"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/lib/constants";

function StatItem({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold gold-gradient mb-2 font-num">
        {isInView ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
          >
            {value}
          </motion.span>
        ) : (
          "0"
        )}
      </div>
      <div className="text-sm uppercase tracking-[0.2em] text-[#7D8590]">
        {label}
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 md:py-28 bg-[#111315]">
      <div className="container-luxury">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              label={stat.label}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
