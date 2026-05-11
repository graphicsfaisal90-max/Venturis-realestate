"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export default function AnimatedText({ text, className = "", delay = 0, once = true }: AnimatedTextProps) {
  const letters = text.split("");

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      className={`inline-block ${className}`}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: delay + i * 0.03,
                duration: 0.4,
                ease: "easeOut",
              },
            },
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
