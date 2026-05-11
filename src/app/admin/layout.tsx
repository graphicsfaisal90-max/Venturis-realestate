"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  MessageSquare,
  Mail,
  FileText,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/agents", label: "Agents", icon: Users },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("venturis_admin_logged_in");
    if (!loggedIn && pathname !== "/admin/login") {
      router.replace("/admin/login");
    } else {
      setChecked(true);
    }
  }, [pathname, router]);

  if (pathname === "/admin/login" || !checked) {
    return <>{children}</>;
  }

  const handleLogout = () => {
    sessionStorage.removeItem("venturis_admin_logged_in");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] flex">
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-gradient-to-b from-[#111] to-[#0d0d0d] border-r border-[#222] flex flex-col transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-[#222] bg-gradient-to-r from-[#988060]/5 to-transparent">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-[#988060]/20 group-hover:ring-[#988060]/40 transition-all">
              <img src="/images/logo.png" alt="Venturis" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Venturis</p>
              <p className="text-[#666] text-[10px] uppercase tracking-wider">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto space-y-0.5 px-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-[#988060]/15 to-transparent border border-[#988060]/20"
                    : "text-[#666] hover:text-white hover:bg-[#ffffff08] border border-transparent"
                }`}
              >
                <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                  isActive ? "bg-[#988060]/15 text-[#988060]" : "text-[#555] group-hover:text-[#888]"
                }`}>
                  <Icon size={16} />
                </span>
                <span className="flex-1">{link.label}</span>
                {isActive && <ChevronRight size={14} className="text-[#988060]" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#222]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[#555] hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/5 group"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-lg group-hover:bg-red-500/10 transition-colors">
              <LogOut size={16} />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-[#0c0c0c]/80 backdrop-blur-xl border-b border-[#222] px-4 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#666] hover:text-white hover:bg-[#ffffff08] transition-all"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-sm text-[#555] hidden sm:block">
              <span className="text-white/80 font-medium">Venturis</span> Admin
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-[#555] hover:text-[#988060] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#988060]/5"
            >
              View Site
            </Link>
            <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-xs text-[#988060] font-medium">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
