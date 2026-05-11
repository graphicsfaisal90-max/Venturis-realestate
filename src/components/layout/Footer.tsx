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

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5">
      <div className="container-luxury pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-white">VENTURIS</span>
                <span className="gold-gradient">.</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-6">
              {siteConfig.description}
            </p>
            <div className="space-y-3 mb-8">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-gold-400" />
                {siteConfig.email}
              </a>
              <div className="flex items-start gap-3 text-sm text-white/50">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Clock className="w-4 h-4 text-gold-400" />
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
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-gold-500/20 hover:text-gold-400 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-300 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-white/30 hover:text-white/50 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-white/30 hover:text-white/50 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-white/30 hover:text-white/50 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
