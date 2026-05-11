"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Bed, Bath, Maximize, MapPin } from "lucide-react";
import LazyImage from "@/components/ui/LazyImage";
import Badge from "@/components/ui/Badge";
import {
  formatPrice,
  formatArea,
  propertyTypeLabels,
  propertyPurposeLabels,
  cn,
} from "@/lib/utils";

interface PropertyCardProps {
  property: any;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const imageUrl = property.featuredImage?.startsWith("http")
    ? property.featuredImage
    : `https://images.unsplash.com/${property.featuredImage}&w=600&h=400&fit=crop`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="glass rounded-xl luxury-shadow card-hover overflow-hidden group"
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <div className="relative overflow-hidden">
        <LazyImage
          src={imageUrl}
          alt={property.title}
          className="h-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex gap-2">
          {property.isFeatured && <Badge variant="gold">Featured</Badge>}
          <Badge variant="white">
            {propertyPurposeLabels[property.purpose] || property.purpose}
          </Badge>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorited(!isFavorited);
          }}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
            isFavorited
              ? "bg-red-500/20 text-red-400"
              : "bg-[#ffffff1a] text-gray-300 hover:bg-[#ffffff30] hover:text-white"
          )}
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-all duration-300",
              isFavorited && "fill-red-400"
            )}
          />
        </button>

        <motion.div
          initial={false}
          animate={{ opacity: showOverlay ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-[#0B0B0C]/60 flex items-center justify-center"
        >
          <Link
            href={`/properties/${property.slug}`}
            className={cn(
              "border border-white/30 text-white px-6 py-2.5 rounded-lg text-sm font-medium tracking-wide",
              "hover:bg-white hover:text-black transition-all duration-300",
              "opacity-0 group-hover:opacity-100"
            )}
          >
            View Details
          </Link>
        </motion.div>
      </div>

      <Link href={`/properties/${property.slug}`}>
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-base font-semibold text-white leading-snug line-clamp-1">
                {property.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-[#7D8590] mt-1">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">
                  {property.location.city}, {property.location.state}
                </span>
              </div>
            </div>
          </div>

          <div className="gold-gradient text-lg font-bold mb-3">
            <span className="font-num">{formatPrice(property.price, property.currency)}</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#7D8590] border-t border-[#ffffff08] pt-3">
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" />
              <span className="font-num">{property.bedrooms}</span> Beds
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              <span className="font-num">{property.bathrooms}</span> Baths
            </span>
            <span className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5" />
              <span className="font-num">{formatArea(property.area, property.areaUnit)}</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {property.amenities.slice(0, 3).map((amenity: string) => (
              <span
                key={amenity}
                className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffffff08] text-[#7D8590]"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 text-[#7D8590]">
                +{property.amenities.length - 3}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
