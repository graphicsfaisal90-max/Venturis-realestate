"use client";

import { useState } from "react";
import { Mail, Search, X } from "lucide-react";
import { getTimeAgo } from "@/lib/utils";

const mockMessages = [
  { id: "1", name: "David Brown", email: "david@example.com", phone: "+1 (555) 777-8888", subject: "Partnership Opportunity", message: "We are a luxury interior design firm interested in partnering with Venturis Realtors. Would love to discuss potential collaboration.", isRead: false, createdAt: "2026-05-11T08:00:00Z" },
  { id: "2", name: "Lisa Anderson", email: "lisa@example.com", phone: "", subject: "Property Valuation Request", message: "I would like to request a valuation for my property in Beverly Hills. Please contact me at your earliest convenience.", isRead: false, createdAt: "2026-05-10T15:30:00Z" },
  { id: "3", name: "Thomas Mueller", email: "thomas@example.com", phone: "+1 (555) 888-9999", subject: "International Buyer Inquiry", message: "I am relocating from Germany and looking for luxury properties in the Miami area. Could you assist with my search?", isRead: true, createdAt: "2026-05-09T12:00:00Z" },
  { id: "4", name: "Jennifer Lee", email: "jennifer@example.com", phone: "+1 (555) 999-0000", subject: "Website Feedback", message: "I love the website! Just wanted to mention that the search filter on mobile could be improved. Otherwise, a fantastic experience.", isRead: true, createdAt: "2026-05-08T10:15:00Z" },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof mockMessages[0] | null>(null);

  const filtered = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: !m.isRead } : m))
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
          <p className="text-[#888] mt-1">
            {messages.filter((m) => !m.isRead).length} unread messages
          </p>
        </div>
      </div>

      <div className="glass rounded-xl p-4 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#b8942e]"
          />
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        {filtered.map((msg) => (
          <div
            key={msg.id}
            className={`border-b border-[#222] last:border-0 p-4 cursor-pointer hover:bg-[#1a1a1a] transition-colors ${
              !msg.isRead ? "bg-[#b8942e]/5" : ""
            }`}
            onClick={() => setSelected(msg)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {!msg.isRead && (
                    <span className="w-2 h-2 rounded-full bg-[#b8942e] flex-shrink-0" />
                  )}
                  <p className="text-sm font-medium text-white truncate">{msg.name}</p>
                </div>
                <p className="text-xs text-[#b8942e] mb-1">{msg.subject}</p>
                <p className="text-xs text-[#666] line-clamp-2">{msg.message}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-[#555]">{getTimeAgo(msg.createdAt)}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRead(msg.id);
                  }}
                  className={`p-1.5 rounded-lg transition-colors ${
                    msg.isRead ? "text-[#555] hover:text-[#888]" : "text-[#b8942e] hover:text-[#d4a843]"
                  }`}
                >
                  <Mail size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#666]">No messages found</div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSelected(null)} />
          <div className="relative bg-[#111] border border-[#222] rounded-xl w-full max-w-lg p-6">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-[#888] hover:text-white">
              <X size={18} />
            </button>
            <h2 className="text-lg font-semibold text-white mb-4">Message Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-[#888]">Subject</p>
                <p className="text-sm text-[#b8942e] font-medium">{selected.subject}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-[#888]">Name</p>
                  <p className="text-sm text-white">{selected.name}</p>
                </div>
                <div>
                  <p className="text-xs text-[#888]">Phone</p>
                  <p className="text-sm text-white">{selected.phone || "N/A"}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#888]">Email</p>
                <a href={`mailto:${selected.email}`} className="text-sm text-[#b8942e] hover:text-[#d4a843]">
                  {selected.email}
                </a>
              </div>
              <div>
                <p className="text-xs text-[#888]">Message</p>
                <p className="text-sm text-[#ccc] bg-[#1a1a1a] rounded-lg p-3 mt-1">{selected.message}</p>
              </div>
              <div>
                <p className="text-xs text-[#888]">Date</p>
                <p className="text-sm text-white">{new Date(selected.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  toggleRead(selected.id);
                  setSelected({ ...selected, isRead: !selected.isRead });
                }}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  selected.isRead
                    ? "border border-[#333] text-[#888] hover:text-white"
                    : "bg-[#b8942e] text-black hover:bg-[#d4a843]"
                }`}
              >
                {selected.isRead ? "Mark as Unread" : "Mark as Read"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
