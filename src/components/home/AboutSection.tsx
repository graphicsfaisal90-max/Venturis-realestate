"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import LazyImage from "@/components/ui/LazyImage";
import { cn } from "@/lib/utils";

const aboutStats = [
  { value: 25, suffix: "+", label: "Years Experience" },
  { value: 5000, suffix: "+", label: "Properties Sold" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 50, suffix: "+", label: "Industry Awards" },
];

function AnimatedCounter({
  value,
  suffix = "",
  label,
  index,
}: {
  value: number;
  suffix?: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
        className="text-3xl md:text-4xl font-bold gold-gradient mb-1 font-num"
      >
        {value.toLocaleString()}{suffix}
      </motion.div>
      <div className="text-xs uppercase tracking-[0.15em] text-[#7D8590]">
        {label}
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section className="section-padding">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <LazyImage
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop"
                alt="Luxury living room"
                className="h-[500px] md:h-[600px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 gold-gradient-bg rounded-2xl -z-10 opacity-50 blur-2xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#ffffff08] rounded-2xl -z-10 opacity-80 blur-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <SectionHeading
              title="Redefining Luxury Real Estate"
              subtitle="With decades of experience and an unwavering commitment to excellence, we connect discerning clients with the world's most extraordinary properties."
              align="left"
            />

            <div className="space-y-4 text-[#B8BDC7] leading-relaxed text-sm md:text-base mb-8">
              <p>
                Venturis Realtors was founded on a simple belief: that the
                experience of finding and owning a luxury property should be as
                exceptional as the property itself. We combine deep market
                expertise with a concierge-level approach to deliver
                unparalleled service.
              </p>
              <p>
                Our team of elite agents brings together decades of experience
                in luxury real estate across the world&apos;s most sought-after
                markets. From beachfront estates in Malibu to penthouses in
                Manhattan, every listing in our portfolio meets the highest
                standards of quality and exclusivity.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {aboutStats.map((stat, i) => (
                <AnimatedCounter
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  index={i}
                />
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[#C8A46B] hover:text-[#D6B98C] font-medium text-sm tracking-wide transition-colors group"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
