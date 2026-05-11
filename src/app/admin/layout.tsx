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
    <div className="min-h-screen bg-[#0c0c0c] flex">
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#111] border-r border-[#222] flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-[#222]">
          <Link href="/admin" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Venturis" className="h-7 w-auto" />
            <span className="text-[#666] text-lg font-bold">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                  isActive
                    ? "text-[#988060] bg-[#988060]/10 border-r-2 border-[#988060]"
                    : "text-[#888] hover:text-white hover:bg-[#1a1a1a]"
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#222]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 text-sm text-[#666] hover:text-[#ff4444] transition-colors rounded-lg hover:bg-[#1a1a1a] w-full"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-[#0c0c0c]/80 backdrop-blur-xl border-b border-[#222] px-6 py-4 flex items-center justify-between lg:justify-end">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-[#888] hover:text-white"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-sm text-[#666]">
            Welcome to <span className="text-white">Venturis</span> Admin
          </h1>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
