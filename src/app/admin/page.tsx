"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Users, MessageSquare, Mail, TrendingUp, FileText, ArrowUpRight } from "lucide-react";

interface Stats { totalProperties: number; totalAgents: number; totalInquiries: number; totalMessages: number; featuredProperties: number; unreadInquiries: number; unreadMessages: number; }

export default function AdminDashboard() {
  const [stats] = useState<Stats>({
    totalProperties: 6, totalAgents: 6, totalInquiries: 12, totalMessages: 8,
    featuredProperties: 4, unreadInquiries: 3, unreadMessages: 2,
  });

  const statCards = [
    { label: "Total Properties", value: stats.totalProperties, icon: Building2, growth: "+2 this month" },
    { label: "Total Agents", value: stats.totalAgents, icon: Users, growth: "+1 this month" },
    { label: "Inquiries", value: stats.totalInquiries, icon: MessageSquare, growth: "+5 this month" },
    { label: "Messages", value: stats.totalMessages, icon: Mail, growth: "+3 this month" },
    { label: "Featured", value: stats.featuredProperties, icon: TrendingUp, growth: "80% of all" },
  ];

  const recentInquiries = [
    { id: 1, name: "John Smith", property: "Modern Beachfront Villa", email: "john@example.com", date: "2026-05-11" },
    { id: 2, name: "Sarah Johnson", property: "Beverly Hills Penthouse", email: "sarah@example.com", date: "2026-05-10" },
    { id: 3, name: "Michael Chen", property: "Manhattan Luxury Apartment", email: "michael@example.com", date: "2026-05-09" },
    { id: 4, name: "Emily Davis", property: "Miami Waterfront Mansion", email: "emily@example.com", date: "2026-05-08" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white font-heading">Dashboard</h1>
        <p className="text-[#7D8590] mt-1 text-sm">Overview of your real estate platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="group relative bg-[#17191C] rounded-2xl border border-[#ffffff0a] p-5 hover:border-[#C8A46B]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#C8A46B]/5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#C8A46B]/10 flex items-center justify-center group-hover:bg-[#C8A46B]/20 transition-colors">
                  <Icon size={20} className="text-[#C8A46B]" />
                </div>
                <span className="text-[10px] text-emerald-400/80 bg-emerald-400/5 px-2 py-0.5 rounded-full border border-emerald-400/10 flex items-center gap-1">
                  <ArrowUpRight size={10} />
                  {card.growth}
                </span>
              </div>
              <p className="text-3xl font-bold text-white font-num">{card.value}</p>
              <p className="text-xs text-[#7D8590] mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#17191C] rounded-2xl border border-[#ffffff0a] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white font-heading">Recent Inquiries</h2>
            <span className="text-[10px] text-[#7D8590] bg-[#ffffff08] px-2 py-1 rounded-full">Today</span>
          </div>
          <div className="space-y-1">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-[#ffffff08] transition-colors -mx-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#C8A46B]/10 flex items-center justify-center text-xs text-[#C8A46B] font-medium">
                    {inq.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{inq.name}</p>
                    <p className="text-xs text-[#7D8590]">{inq.property}</p>
                  </div>
                </div>
                <span className="text-[11px] text-[#7D8590]">{inq.date}</span>
              </div>
            ))}
          </div>
          <Link href="/admin/inquiries" className="inline-flex items-center gap-1.5 mt-4 text-sm text-[#C8A46B] hover:text-[#D6B98C] transition-colors">
            View all inquiries <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="bg-[#17191C] rounded-2xl border border-[#ffffff0a] p-6">
          <h2 className="text-lg font-semibold text-white font-heading mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/properties/new" className="group p-5 rounded-xl bg-[#C8A46B]/5 border border-[#C8A46B]/15 hover:bg-[#C8A46B]/10 hover:border-[#C8A46B]/30 transition-all">
              <Building2 size={22} className="text-[#C8A46B] mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-white block">Add Property</span>
              <span className="text-[10px] text-[#7D8590] mt-1 block">New listing</span>
            </Link>
            <Link href="/admin/properties" className="group p-5 rounded-xl bg-[#ffffff05] border border-[#ffffff0a] hover:bg-[#ffffff0a] hover:border-[#ffffff15] transition-all">
              <Building2 size={22} className="text-[#B8BDC7] mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-white block">Manage Properties</span>
              <span className="text-[10px] text-[#7D8590] mt-1 block">Edit listings</span>
            </Link>
            <Link href="/admin/blogs" className="group p-5 rounded-xl bg-[#ffffff05] border border-[#ffffff0a] hover:bg-[#ffffff0a] hover:border-[#ffffff15] transition-all">
              <FileText size={22} className="text-[#B8BDC7] mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-white block">Manage Blogs</span>
              <span className="text-[10px] text-[#7D8590] mt-1 block">Content</span>
            </Link>
            <Link href="/admin/agents" className="group p-5 rounded-xl bg-[#ffffff05] border border-[#ffffff0a] hover:bg-[#ffffff0a] hover:border-[#ffffff15] transition-all">
              <Users size={22} className="text-[#B8BDC7] mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-white block">Manage Agents</span>
              <span className="text-[10px] text-[#7D8590] mt-1 block">Team</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
