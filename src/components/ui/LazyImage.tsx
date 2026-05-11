"use client";

import { useState, useRef, useEffect } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function LazyImage({ src, alt, className = "", width, height }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {inView ? (
        <>
          {!loaded && (
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
          )}
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-all duration-700 ${
              loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            onLoad={() => setLoaded(true)}
            loading="lazy"
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-white/5" />
      )}
    </div>
  );
}
