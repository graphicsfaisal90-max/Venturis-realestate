"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useStore } from "@/store/useStore";

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

function MobileSubmenu({
  link,
  onClose,
}: {
  link: (typeof navLinks)[number] & { submenu: NonNullable<(typeof navLinks)[number]["submenu"]> };
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-3 text-[#7D8590] hover:text-white hover:bg-[#ffffff08] rounded-xl transition-all text-sm"
      >
        {link.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-4 border-l border-[#ffffff0a] pl-3 space-y-1 py-1">
              {link.submenu.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  className="block px-4 py-2.5 text-[#7D8590] hover:text-white hover:bg-[#ffffff08] rounded-xl transition-all text-sm"
                  onClick={onClose}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { isMobileMenuOpen, setMobileMenuOpen } = useStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0B0B0C]/80 backdrop-blur-2xl border-b border-[#ffffff0a] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxury">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link href="/" className="relative z-10">
            <img src="/images/logo.png" alt="Venturis Realtors" className="h-10 md:h-12 w-auto brightness-0 invert" />
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
                  className="group relative flex items-center gap-1 px-4 py-2 text-sm text-[#B8BDC7] hover:text-white transition-colors duration-300 rounded-xl hover:bg-[#ffffff08]"
                >
                  {link.label}
                  {link.submenu && <ChevronDown className="w-3 h-3" />}
                  <span className="absolute inset-x-4 -bottom-0 h-[2px] bg-gradient-to-r from-[#C8A46B] to-[#D6B98C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </Link>
                {link.submenu && openSubmenu === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-56 bg-[#111315] rounded-2xl p-2 luxury-shadow border border-[#ffffff0a] backdrop-blur-2xl"
                  >
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="group flex items-center justify-between px-4 py-2.5 text-sm text-[#B8BDC7] hover:text-white hover:bg-[#ffffff08] rounded-xl transition-all duration-200"
                      >
                        {sub.label}
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8A46B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden lg:flex items-center gap-2 px-5 py-2.5 text-sm bg-gradient-to-r from-[#C8A46B] to-[#D6B98C] text-[#0B0B0C] rounded-xl hover:opacity-90 hover:shadow-[0_0_30px_rgba(200,164,107,0.3)] transition-all duration-300 font-semibold">
              Schedule a Tour
            </button>

            <button
              className="lg:hidden relative z-10 w-10 h-10 rounded-xl flex items-center justify-center text-[#B8BDC7] hover:text-white hover:bg-[#ffffff08] transition-all duration-300"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-[#0B0B0C]/95 backdrop-blur-2xl border-t border-[#ffffff0a] overflow-hidden"
          >
            <div className="container-luxury py-4 space-y-0.5">
              {navLinks.map((link) =>
                link.submenu ? (
                  <MobileSubmenu
                    key={link.href}
                    link={link as typeof link & { submenu: NonNullable<typeof link["submenu"]> }}
                    onClose={() => setMobileMenuOpen(false)}
                  />
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-[#B8BDC7] hover:text-white hover:bg-[#ffffff08] rounded-xl transition-all text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-4 px-4">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-[#C8A46B] to-[#D6B98C] text-[#0B0B0C] rounded-xl text-sm font-semibold hover:shadow-[0_0_30px_rgba(200,164,107,0.3)] transition-all duration-300"
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
