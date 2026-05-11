"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  onClick?: () => void;
}

export default function GlassCard({ children, className = "", hover = true, delay = 0, onClick }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : undefined}
      onClick={onClick}
      className={`glass rounded-xl luxury-shadow ${hover ? "card-hover cursor-pointer" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
