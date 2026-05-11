"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import PropertyCard from "@/components/properties/PropertyCard";
import { propertyData } from "@/lib/constants";

export default function FeaturedProperties() {
  const featured = propertyData.filter((p) => p.isFeatured);

  return (
    <section className="py-20 md:py-28">
      <div className="container-luxury">
        <SectionHeading
          title="Featured Properties"
          subtitle="Curated selection of the world's most exceptional luxury estates and residences"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.slice(0, 6).map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
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
            href="/properties"
            className="inline-flex items-center gap-2 text-[#C8A46B] hover:text-[#D6B98C] font-medium text-sm tracking-wide transition-colors group"
          >
            View All Properties
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
