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
    <div className="min-h-screen bg-[#0B0B0C] flex">
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#0B0B0C]/90 backdrop-blur-2xl border-r border-[#ffffff0a] flex flex-col transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-[#ffffff0a]">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-[#C8A46B]/20 group-hover:ring-[#C8A46B]/50 transition-all">
              <img src="/images/logo.png" alt="Venturis" className="w-full h-full object-contain brightness-0 invert" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight font-heading">Venturis</p>
              <p className="text-[#7D8590] text-[10px] uppercase tracking-[0.2em]">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto space-y-1 px-3">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`group relative flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-[#C8A46B]/10 to-transparent border border-[#C8A46B]/20"
                    : "text-[#7D8590] hover:text-white hover:bg-[#ffffff08] border border-transparent"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-gradient-to-b from-[#C8A46B] to-[#D6B98C] rounded-full" />
                )}
                <span className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#C8A46B]/15 text-[#C8A46B] shadow-lg shadow-[#C8A46B]/5"
                    : "text-[#7D8590] group-hover:text-white group-hover:bg-[#ffffff0a]"
                }`}>
                  <Icon size={17} />
                </span>
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#ffffff0a]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-[#7D8590] hover:text-red-400 transition-all rounded-xl hover:bg-red-500/5 group"
          >
            <span className="w-9 h-9 flex items-center justify-center rounded-lg group-hover:bg-red-500/10 transition-colors">
              <LogOut size={17} />
            </span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-[#0B0B0C]/80 backdrop-blur-2xl border-b border-[#ffffff0a] px-4 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-[#7D8590] hover:text-white hover:bg-[#ffffff08] transition-all"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-sm text-[#7D8590] hidden sm:block">
              <span className="text-white/90 font-medium">Venturis</span> Admin
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-[#7D8590] hover:text-[#C8A46B] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#C8A46B]/5"
            >
              View Site
            </Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C8A46B] to-[#D6B98C] flex items-center justify-center text-xs text-[#0B0B0C] font-bold">
              A
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
