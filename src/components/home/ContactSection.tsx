"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/constants";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    label: "Address",
    value: siteConfig.address,
    href: "#",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: siteConfig.officeHours,
    href: "#",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="section-padding bg-[#111315]">
      <div className="container-luxury">
        <SectionHeading
          title="Get In Touch"
          subtitle="Ready to begin your luxury real estate journey? Our team is here to assist you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-[#7D8590] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your full name"
                    className="w-full bg-[#111315] border border-[#ffffff1a] rounded-xl px-4 py-3 text-sm text-white placeholder-[#7D8590] focus:outline-none focus:border-[#C8A46B]/50 focus:ring-1 focus:ring-[#C8A46B]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-[#7D8590] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    className="w-full bg-[#111315] border border-[#ffffff1a] rounded-xl px-4 py-3 text-sm text-white placeholder-[#7D8590] focus:outline-none focus:border-[#C8A46B]/50 focus:ring-1 focus:ring-[#C8A46B]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-[#7D8590] mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-[#111315] border border-[#ffffff1a] rounded-xl px-4 py-3 text-sm text-white placeholder-[#7D8590] focus:outline-none focus:border-[#C8A46B]/50 focus:ring-1 focus:ring-[#C8A46B]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-[#7D8590] mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us about your requirements..."
                  className="w-full bg-[#111315] border border-[#ffffff1a] rounded-xl px-4 py-3 text-sm text-white placeholder-[#7D8590] focus:outline-none focus:border-[#C8A46B]/50 focus:ring-1 focus:ring-[#C8A46B]/20 transition-all resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="gold"
                size="lg"
                icon={<Send className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                {submitted ? "Message Sent!" : "Send Message"}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-xl luxury-shadow p-6 md:p-8">
              <h3 className="text-lg font-semibold text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-5">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg gold-gradient-bg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.15em] text-[#7D8590] mb-0.5">
                          {item.label}
                        </div>
                        <a
                          href={item.href}
                          className="text-sm text-[#B8BDC7] hover:text-[#C8A46B] transition-colors"
                        >
                          {item.value}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass rounded-xl luxury-shadow p-6 md:p-8">
              <h3 className="text-lg font-semibold text-white mb-3">
                Prefer to Call?
              </h3>
              <p className="text-sm text-[#7D8590] leading-relaxed mb-4">
                Our luxury concierge team is available during business hours to
                assist you with any inquiries.
              </p>
              <a
                href={`tel:${siteConfig.phone}`}
                className="bg-gradient-to-r from-[#C8A46B] to-[#D6B98C] text-[#0B0B0C] px-6 py-3 rounded-xl text-sm font-semibold tracking-wide inline-flex items-center gap-2 hover:opacity-90 hover:shadow-[0_0_30px_rgba(200,164,107,0.3)] transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                {siteConfig.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
