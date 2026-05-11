"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Eye, Award, ChevronRight } from "lucide-react";
import { stats, agentsData, siteConfig } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import LazyImage from "@/components/ui/LazyImage";
import AnimatedText from "@/components/ui/AnimatedText";
import AgentCard from "@/components/agents/AgentCard";

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const num = parseInt(value.replace(/\D/g, ""));
  const hasPlus = value.includes("+");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(num / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, num]);

  return (
    <div ref={ref}>
      <span className="text-4xl md:text-5xl font-bold gold-gradient">
        {count.toLocaleString()}{hasPlus ? "+" : ""}{suffix}
      </span>
    </div>
  );
}

const timeline = [
  { year: "2008", title: "Foundation", description: "Venturis Realtors was founded by Isabella Venturis with a vision to redefine luxury real estate." },
  { year: "2011", title: "International Expansion", description: "Opened offices in London and Dubai, establishing a global presence in luxury markets." },
  { year: "2014", title: "Billions in Sales", description: "Surpassed $1 billion in cumulative sales, becoming a dominant force in luxury real estate." },
  { year: "2017", title: "Tech Innovation", description: "Launched AI-powered property matching and immersive 3D virtual tour technology." },
  { year: "2021", title: "Global Recognition", description: "Named 'World's Best Luxury Real Estate Agency' by International Property Awards." },
  { year: "2024", title: "Portfolio Expansion", description: "Expanded into property management, investment advisory, and commercial real estate." },
  { year: "2026", title: "The Future", description: "Continuing to innovate and set new standards in luxury real estate worldwide." },
];

const featuredAgents = agentsData.filter((a) => a.isFeatured);

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-900/20 via-transparent to-[#0c0c0c]" />
        <div className="container-luxury relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <AnimatedText
              text={siteConfig.name}
              className="text-5xl md:text-7xl lg:text-8xl font-bold gold-gradient mb-6"
            />
            <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto">{siteConfig.tagline}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                title="Our Story"
                subtitle="A legacy of excellence in luxury real estate since 2008."
                align="left"
              />
              <p className="text-white/60 leading-relaxed mb-6">
                Venturis Realtors was born from a simple yet powerful vision: to transform the luxury real estate
                experience through unparalleled service, deep market expertise, and an unwavering commitment to excellence.
              </p>
              <p className="text-white/60 leading-relaxed mb-6">
                Founded by Isabella Venturis, a visionary with over two decades of experience in the world's most
                prestigious property markets, our firm has grown from a boutique agency into a global powerhouse
                representing the world's finest properties and most discerning clientele.
              </p>
              <p className="text-white/60 leading-relaxed">
                Today, with offices in Beverly Hills, Manhattan, London, Dubai, and Singapore, we continue to set
                the standard for luxury real estate services worldwide.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <LazyImage
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop"
                  alt="Luxury property"
                  className="w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-xl gold-gradient-bg flex items-center justify-center">
                <Award className="w-12 h-12 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard className="p-8 md:p-10">
              <div className="w-14 h-14 rounded-xl gold-gradient-bg flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-white/60 leading-relaxed">
                To provide an unparalleled real estate experience by combining deep market intelligence, 
                innovative technology, and white-glove service to help our clients acquire, sell, and 
                invest in the world's most exceptional properties.
              </p>
            </GlassCard>
            <GlassCard className="p-8 md:p-10">
              <div className="w-14 h-14 rounded-xl gold-gradient-bg flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-white/60 leading-relaxed">
                To be the world's most trusted name in luxury real estate, setting the standard for 
                excellence, innovation, and integrity in every market we serve, while transforming 
                the way people experience premium properties.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-luxury">
          <SectionHeading
            title="By the Numbers"
            subtitle="Our track record speaks for itself."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <AnimatedCounter value={stat.value} />
                <p className="text-sm text-white/50 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {featuredAgents.length > 0 && (
        <section className="section-padding pt-0">
          <div className="container-luxury">
            <SectionHeading
              title="Our Leadership"
              subtitle="Meet the visionaries behind Venturis Realtors."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAgents.slice(0, 3).map((agent, i) => (
                <AgentCard key={agent.id} agent={agent} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding pt-0">
        <div className="container-luxury">
          <SectionHeading
            title="Our Journey"
            subtitle="Milestones that shaped who we are today."
          />
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-gold-500 via-gold-500/50 to-transparent" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-14"
                >
                  <div className="absolute left-2.5 top-1 w-8 h-8 rounded-full glass flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full gold-gradient-bg" />
                  </div>
                  <span className="text-xs text-gold-400 font-medium">{item.year}</span>
                  <h4 className="text-lg font-bold text-white mt-1">{item.title}</h4>
                  <p className="text-sm text-white/50 mt-1">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury">
          <GlassCard className="p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 gold-gradient-bg opacity-5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Experience Luxury?
              </h2>
              <p className="text-white/60 max-w-xl mx-auto mb-8">
                Let us help you find the perfect property or market your prestigious asset to the right audience.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="gold" size="lg" icon={<ChevronRight className="w-5 h-5" />}>
                  Schedule a Consultation
                </Button>
                <Button variant="outline" size="lg">
                  Explore Properties
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
