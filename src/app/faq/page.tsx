"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, ChevronRight } from "lucide-react";
import { faqs } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/ui/AnimatedText";

function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 px-6 text-left transition-colors hover:bg-white/[0.02]"
      >
        <span className="text-sm md:text-base font-medium text-white pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-gold-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">
              <p className="text-sm text-white/50 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return faqs;
    const q = search.toLowerCase();
    return faqs.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [search]);

  return (
    <main className="min-h-screen">
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-900/20 via-transparent to-[#0c0c0c]" />
        <div className="container-luxury relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <AnimatedText
              text="Frequently Asked Questions"
              className="text-4xl md:text-6xl font-bold gold-gradient mb-6"
            />
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Everything you need to know about Venturis Realtors and our services.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setOpenIndex(null);
                }}
                className="w-full glass rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 border border-white/5"
              />
            </div>

            <GlassCard className="divide-y divide-white/5 overflow-hidden">
              {filtered.length > 0 ? (
                filtered.map((faq, i) => (
                  <FAQItem
                    key={i}
                    question={faq.q}
                    answer={faq.a}
                    isOpen={openIndex === i}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  />
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-white/10 flex items-center justify-center">
                    <Search className="w-5 h-5 text-white/30" />
                  </div>
                  <p className="text-white/60 mb-2">No results found</p>
                  <p className="text-sm text-white/30">Try a different search term</p>
                </div>
              )}
            </GlassCard>

            <GlassCard className="mt-12 p-8 md:p-10 text-center">
              <h3 className="text-xl font-bold text-white mb-3">Still Have Questions?</h3>
              <p className="text-white/50 mb-6 max-w-md mx-auto">
                Our team is ready to provide personalized assistance for any inquiry you may have.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="gold" icon={<ChevronRight className="w-4 h-4" />}>
                  Contact Us
                </Button>
                <Button variant="outline">
                  Call {">"}+1 (555) 123-4567
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </main>
  );
}
