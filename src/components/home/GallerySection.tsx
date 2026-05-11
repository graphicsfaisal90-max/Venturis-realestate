"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import LazyImage from "@/components/ui/LazyImage";
import { galleryImages } from "@/lib/constants";

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="section-padding">
      <div className="container-luxury">
        <SectionHeading
          title="Our Gallery"
          subtitle="A visual journey through the world's most exquisite properties"
        />

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setSelectedImage(index)}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
            >
              <LazyImage
                src={image.src}
                alt={image.title}
                className="w-full"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 text-center p-4">
                  <p className="text-white font-medium text-sm">
                    {image.title}
                  </p>
                  <p className="text-white/60 text-xs mt-1">{image.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].title}
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="text-center mt-4">
                <p className="text-white font-medium">
                  {galleryImages[selectedImage].title}
                </p>
                <p className="text-white/50 text-sm">
                  {galleryImages[selectedImage].category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
