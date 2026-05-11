"use client";

import { motion } from "framer-motion";
import {
  Home,
  TrendingUp,
  BarChart3,
  Building2,
  Store,
  Shield,
  Key,
  Users,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { services, siteConfig } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import LazyImage from "@/components/ui/LazyImage";
import AnimatedText from "@/components/ui/AnimatedText";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-8 h-8" />,
  TrendingUp: <TrendingUp className="w-8 h-8" />,
  BarChart3: <BarChart3 className="w-8 h-8" />,
  Building2: <Building2 className="w-8 h-8" />,
  Store: <Store className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  Key: <Key className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
};

const serviceImages = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1600573472556-5b0d5d0b9b6f?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-900/20 via-transparent to-[#0c0c0c]" />
        <div className="container-luxury relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <AnimatedText
              text="Our Services"
              className="text-5xl md:text-7xl font-bold gold-gradient mb-6"
            />
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Comprehensive luxury real estate services tailored to the world's most discerning clients.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard className="p-6 h-full group">
                  <div className="w-14 h-14 rounded-xl gold-gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    {iconMap[service.icon] || <Home className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-xs text-white/40">
                        <CheckCircle className="w-3.5 h-3.5 text-gold-400 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury">
          <SectionHeading
            title="How We Deliver Excellence"
            subtitle="Our approach to providing world-class real estate services."
          />
          <div className="space-y-24">
            {services.slice(0, 4).map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  i % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-14 h-14 rounded-xl gold-gradient-bg flex items-center justify-center mb-5">
                    {iconMap[service.icon] || <Home className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-white/60 leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                    <LazyImage
                      src={serviceImages[i] || serviceImages[0]}
                      alt={service.title}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-luxury">
          <GlassCard className="p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 gold-gradient-bg opacity-5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Let's Work Together
              </h2>
              <p className="text-white/60 max-w-xl mx-auto mb-8">
                Ready to take the next step in your real estate journey? Our team of experts is here to help.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="gold" size="lg" icon={<ChevronRight className="w-5 h-5" />}>
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
