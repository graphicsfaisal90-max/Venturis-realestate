"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Heart, ChevronDown } from "lucide-react";
import { useStore } from "@/store/useStore";
import { siteConfig } from "@/lib/constants";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Properties",
    href: "/properties",
    submenu: [
      { label: "All Properties", href: "/properties" },
      { label: "Villas", href: "/properties?type=villa" },
      { label: "Penthouses", href: "/properties?type=penthouse" },
      { label: "Apartments", href: "/properties?type=apartment" },
      { label: "Commercial", href: "/properties?type=commercial" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Agents", href: "/agents" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { isMobileMenuOpen, setMobileMenuOpen, savedProperties } = useStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0c0c0c]/90 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxury">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link href="/" className="relative z-10">
            <span className="text-xl md:text-2xl font-bold tracking-tight">
              <span className="text-white">VENTURIS</span>
              <span className="gold-gradient">.</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.submenu && setOpenSubmenu(link.label)}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5"
                >
                  {link.label}
                  {link.submenu && (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </Link>
                {link.submenu && openSubmenu === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-56 glass rounded-xl p-2 luxury-shadow"
                  >
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden lg:flex items-center gap-2 px-5 py-2.5 text-sm gold-gradient-bg text-white rounded-lg hover:opacity-90 transition-all duration-300 font-medium">
              Schedule a Tour
            </button>

            <button
              className="lg:hidden relative z-10 p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0c0c0c]/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="container-luxury py-6 space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.submenu?.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-8 py-2.5 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="pt-4 px-4">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 gold-gradient-bg text-white rounded-lg text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Schedule a Tour
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
