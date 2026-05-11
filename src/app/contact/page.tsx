"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Check,
} from "lucide-react";
import { FaInstagram, FaXTwitter, FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { siteConfig } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/ui/AnimatedText";

const socialLinks = [
  { icon: <FaInstagram className="w-5 h-5" />, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: <FaXTwitter className="w-5 h-5" />, href: siteConfig.social.twitter, label: "Twitter" },
  { icon: <FaFacebookF className="w-5 h-5" />, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: <FaLinkedinIn className="w-5 h-5" />, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: <FaYoutube className="w-5 h-5" />, href: siteConfig.social.youtube, label: "YouTube" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="min-h-screen">
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-900/20 via-transparent to-[#0c0c0c]" />
        <div className="container-luxury relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <AnimatedText
              text="Contact Us"
              className="text-5xl md:text-7xl font-bold gold-gradient mb-6"
            />
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Get in touch with our team of luxury real estate experts.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <GlassCard className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-6">Send Us a Message</h3>
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                    <p className="text-white/50">Thank you for reaching out. We will respond within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-white/40 mb-1.5">Name *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                          className="w-full bg-transparent border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/40 mb-1.5">Email *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                          className="w-full bg-transparent border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-white/40 mb-1.5">Phone</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                          className="w-full bg-transparent border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/40 mb-1.5">Subject *</label>
                        <input
                          type="text"
                          required
                          value={form.subject}
                          onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))}
                          className="w-full bg-transparent border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
                          placeholder="Property Inquiry"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5">Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                        className="w-full bg-transparent border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
                        placeholder="Tell us about your requirements..."
                      />
                    </div>
                    <Button type="submit" variant="gold" size="lg" className="w-full" icon={<Send className="w-4 h-4" />}>
                      Send Message
                    </Button>
                  </form>
                )}
              </GlassCard>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <GlassCard className="p-6 space-y-5">
                <h3 className="text-lg font-bold text-white">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-gold-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40">Address</p>
                      <p className="text-sm text-white">{siteConfig.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-gold-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40">Phone</p>
                      <p className="text-sm text-white">{siteConfig.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-gold-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40">Email</p>
                      <p className="text-sm text-white">{siteConfig.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-gold-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40">Office Hours</p>
                      <p className="text-sm text-white">{siteConfig.officeHours}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold-400 hover:border-gold-400/30 transition-colors"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </GlassCard>

              <div className="rounded-xl overflow-hidden h-[250px]">
                <iframe
                  title="Office Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed/v1/place?key=&q=Beverly+Hills+California&center=34.0736,-118.4004&zoom=14"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
