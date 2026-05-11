"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, DollarSign, Clock, Shield } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { investmentPlans } from "@/lib/constants";
import { formatPrice, cn } from "@/lib/utils";

const riskColors: Record<string, string> = {
  "Moderate": "text-yellow-400",
  "High": "text-red-400",
  "Low-Moderate": "text-emerald-400",
};

const riskBgColors: Record<string, string> = {
  "Moderate": "bg-yellow-400/10",
  "High": "bg-red-400/10",
  "Low-Moderate": "bg-emerald-400/10",
};

export default function InvestmentSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-luxury">
        <SectionHeading
          title="Investment Opportunities"
          subtitle="Strategic real estate investment solutions designed for sophisticated investors"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {investmentPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-xl luxury-shadow card-hover overflow-hidden"
            >
              <div className="relative h-40">
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <div className="text-2xl font-bold text-white">
                    {plan.expectedROI}%
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-gold-400">
                    Expected ROI
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  {plan.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed mb-4 line-clamp-2">
                  {plan.description}
                </p>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-white/40">
                      <DollarSign className="w-3.5 h-3.5" />
                      Investment Range
                    </span>
                    <span className="text-white/70 font-num">
                      {formatPrice(plan.minInvestment)} -{" "}
                      {formatPrice(plan.maxInvestment)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-white/40">
                      <Clock className="w-3.5 h-3.5" />
                      Duration
                    </span>
                    <span className="text-white/70">{plan.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-white/40">
                      <Shield className="w-3.5 h-3.5" />
                      Risk Level
                    </span>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-medium",
                        riskBgColors[plan.riskLevel] || "bg-white/5",
                        riskColors[plan.riskLevel] || "text-white/70"
                      )}
                    >
                      {plan.riskLevel}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/investments/${plan.id}`}
                  className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-xs font-medium tracking-wide transition-colors group"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
