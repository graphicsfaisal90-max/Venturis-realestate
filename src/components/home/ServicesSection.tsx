"use client";

import {
  Home,
  TrendingUp,
  BarChart3,
  Building2,
  Store,
  Shield,
  Key,
  Users,
  LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { services } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  Home,
  TrendingUp,
  BarChart3,
  Building2,
  Store,
  Shield,
  Key,
  Users,
};

export default function ServicesSection() {
  return (
    <section className="section-padding bg-navy-900/30">
      <div className="container-luxury">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive luxury real estate services"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Home;

            return (
              <GlassCard key={service.title} delay={index * 0.05}>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl gold-gradient-bg flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
