"use client";

import { motion } from "framer-motion";
import { agentsData } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedText from "@/components/ui/AnimatedText";
import AgentCard from "@/components/agents/AgentCard";

export default function AgentsPage() {
  return (
    <main className="min-h-screen">
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-900/20 via-transparent to-[#0c0c0c]" />
        <div className="container-luxury relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <AnimatedText
              text="Our Team"
              className="text-5xl md:text-7xl font-bold gold-gradient mb-6"
            />
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Meet our elite team of luxury real estate professionals dedicated to exceptional service.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentsData.map((agent, i) => (
              <AgentCard key={agent.id} agent={agent} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
