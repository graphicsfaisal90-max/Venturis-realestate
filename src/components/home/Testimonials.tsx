"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonialsData } from "@/lib/constants";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating
              ? "text-gold-400 fill-gold-400"
              : "text-white/10"
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section-padding">
      <div className="container-luxury">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Hear from the discerning clients who have trusted us with their luxury real estate journey"
        />

        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-none">
          {testimonialsData
            .filter((t) => t.isFeatured)
            .map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-xl luxury-shadow p-6 md:p-8 min-w-[340px] md:min-w-[420px] snap-start flex-shrink-0"
              >
                <StarRating rating={testimonial.rating} />

                <p className="text-sm md:text-base text-white/60 leading-relaxed mt-4 mb-6 line-clamp-3">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <img
                    src={testimonial.clientImage}
                    alt={testimonial.clientName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-white">
                      {testimonial.clientName}
                    </div>
                    <div className="text-xs text-white/40">
                      {testimonial.clientTitle}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
