"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/constants";
import { ArrowUpRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import { FaInstagram, FaFacebookF, FaXTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa6";

const footerLinks = {
  properties: {
    title: "Properties",
    links: [
      { label: "All Properties", href: "/properties" },
      { label: "Luxury Villas", href: "/properties?type=villa" },
      { label: "Penthouses", href: "/properties?type=penthouse" },
      { label: "Apartments", href: "/properties?type=apartment" },
      { label: "Commercial", href: "/properties?type=commercial" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Services", href: "/services" },
      { label: "Meet the Team", href: "/agents" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "#" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Sitemap", href: "#" },
    ],
  },
};

const socialIcons = [
  { icon: FaInstagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: FaFacebookF, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: FaXTwitter, href: siteConfig.social.twitter, label: "Twitter" },
  { icon: FaLinkedinIn, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: FaYoutube, href: siteConfig.social.youtube, label: "YouTube" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#988060]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#9D8653]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-luxury pt-20 pb-10 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8"
        >
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6 group">
              <img src="/images/logo.png" alt="Venturis Realtors" className="h-10 w-auto brightness-0 invert" />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-6">
              {siteConfig.description}
            </p>
            <div className="space-y-3 mb-8">
              <a
                href={`tel:${siteConfig.phone}`}
                className="group flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-[#988060]/10 flex items-center justify-center group-hover:bg-[#988060]/20 transition-colors">
                  <Phone className="w-4 h-4 text-[#988060]" />
                </span>
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-[#988060]/10 flex items-center justify-center group-hover:bg-[#988060]/20 transition-colors">
                  <Mail className="w-4 h-4 text-[#988060]" />
                </span>
                {siteConfig.email}
              </a>
              <div className="group flex items-start gap-3 text-sm text-white/50">
                <span className="w-8 h-8 rounded-lg bg-[#988060]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#988060] mt-0.5" />
                </span>
                <span className="pt-1.5">{siteConfig.address}</span>
              </div>
              <div className="group flex items-center gap-3 text-sm text-white/50">
                <span className="w-8 h-8 rounded-lg bg-[#988060]/10 flex items-center justify-center group-hover:bg-[#988060]/20 transition-colors">
                  <Clock className="w-4 h-4 text-[#988060]" />
                </span>
                <span>{siteConfig.officeHours}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-[#988060] hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(152,128,96,0.3)]"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {Object.values(footerLinks).map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
                <span className="inline-block w-6 h-[2px] bg-gradient-to-r from-[#988060] to-[#9D8653] rounded-full mb-2" />
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group text-sm text-white/40 hover:text-white transition-colors duration-300 inline-flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#988060] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="group text-xs text-white/30 hover:text-white/50 transition-colors flex items-center gap-1.5">
              Privacy Policy
              <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link href="#" className="group text-xs text-white/30 hover:text-white/50 transition-colors flex items-center gap-1.5">
              Terms of Service
              <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link href="#" className="group text-xs text-white/30 hover:text-white/50 transition-colors flex items-center gap-1.5">
              Cookie Policy
              <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
