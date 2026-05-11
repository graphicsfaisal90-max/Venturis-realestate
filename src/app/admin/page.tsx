"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Building2, Users, MessageSquare, Mail, TrendingUp, FileText } from "lucide-react";

interface Stats {
  totalProperties: number;
  totalAgents: number;
  totalInquiries: number;
  totalMessages: number;
  featuredProperties: number;
  unreadInquiries: number;
  unreadMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProperties: 6,
    totalAgents: 6,
    totalInquiries: 12,
    totalMessages: 8,
    featuredProperties: 4,
    unreadInquiries: 3,
    unreadMessages: 2,
  });

  const statCards = [
    { label: "Total Properties", value: stats.totalProperties, icon: Building2, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Total Agents", value: stats.totalAgents, icon: Users, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Inquiries", value: stats.totalInquiries, icon: MessageSquare, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { label: "Messages", value: stats.totalMessages, icon: Mail, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Featured Properties", value: stats.featuredProperties, icon: TrendingUp, color: "text-[#988060]", bg: "bg-[#988060]/10" },
  ];

  const recentInquiries = [
    { id: 1, name: "John Smith", property: "Modern Beachfront Villa", email: "john@example.com", date: "2026-05-11" },
    { id: 2, name: "Sarah Johnson", property: "Beverly Hills Penthouse", email: "sarah@example.com", date: "2026-05-10" },
    { id: 3, name: "Michael Chen", property: "Manhattan Luxury Apartment", email: "michael@example.com", date: "2026-05-09" },
    { id: 4, name: "Emily Davis", property: "Miami Waterfront Mansion", email: "emily@example.com", date: "2026-05-08" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-[#888] mt-1">Overview of your real estate platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="glass rounded-xl p-5">
              <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center mb-3`}>
                <Icon size={20} className={card.color} />
              </div>
              <p className="text-2xl font-bold text-white">{card.value}</p>
              <p className="text-sm text-[#888] mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Inquiries</h2>
          <div className="space-y-3">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="flex items-center justify-between py-2 border-b border-[#222] last:border-0">
                <div>
                  <p className="text-sm font-medium text-white">{inq.name}</p>
                  <p className="text-xs text-[#666]">{inq.property}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#888]">{inq.email}</p>
                  <p className="text-xs text-[#555]">{inq.date}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/admin/inquiries"
            className="inline-block mt-4 text-sm text-[#988060] hover:text-[#9D8653] transition-colors"
          >
            View all inquiries →
          </Link>
        </div>

        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/properties/new"
              className="p-4 rounded-lg bg-[#988060]/10 border border-[#988060]/20 hover:bg-[#988060]/20 transition-colors text-center"
            >
              <Building2 size={20} className="mx-auto mb-2 text-[#988060]" />
              <span className="text-sm text-white">Add Property</span>
            </Link>
            <Link
              href="/admin/properties"
              className="p-4 rounded-lg bg-[#1a1a1a] border border-[#222] hover:bg-[#222] transition-colors text-center"
            >
              <Building2 size={20} className="mx-auto mb-2 text-[#888]" />
              <span className="text-sm text-white">Manage Properties</span>
            </Link>
            <Link
              href="/admin/blogs"
              className="p-4 rounded-lg bg-[#1a1a1a] border border-[#222] hover:bg-[#222] transition-colors text-center"
            >
              <FileText size={20} className="mx-auto mb-2 text-[#888]" />
              <span className="text-sm text-white">Manage Blogs</span>
            </Link>
            <Link
              href="/admin/agents"
              className="p-4 rounded-lg bg-[#1a1a1a] border border-[#222] hover:bg-[#222] transition-colors text-center"
            >
              <Users size={20} className="mx-auto mb-2 text-[#888]" />
              <span className="text-sm text-white">Manage Agents</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
