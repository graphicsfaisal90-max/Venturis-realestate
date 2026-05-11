"use client";

import { useState } from "react";
import { MessageSquare, Search, Mail, Phone, X } from "lucide-react";
import { getTimeAgo } from "@/lib/utils";

const mockInquiries = [
  { id: "1", propertyId: "1", propertyTitle: "Modern Beachfront Villa", name: "John Smith", email: "john@example.com", phone: "+1 (555) 111-2222", message: "I'm interested in this property and would like to schedule a viewing this weekend. Please let me know availability.", preferredContact: "email", isRead: false, createdAt: "2026-05-11T10:30:00Z" },
  { id: "2", propertyId: "2", propertyTitle: "Beverly Hills Penthouse", name: "Sarah Johnson", email: "sarah@example.com", phone: "+1 (555) 222-3333", message: "Could you provide more details about the HOA fees and parking arrangements?", preferredContact: "phone", isRead: false, createdAt: "2026-05-10T14:20:00Z" },
  { id: "3", propertyId: "3", propertyTitle: "Manhattan Luxury Apartment", name: "Michael Chen", email: "michael@example.com", phone: "+1 (555) 333-4444", message: "I would like to receive the full brochure and floor plans for this apartment.", preferredContact: "email", isRead: true, createdAt: "2026-05-09T09:15:00Z" },
  { id: "4", propertyId: "4", propertyTitle: "Miami Waterfront Mansion", name: "Emily Davis", email: "emily@example.com", phone: "+1 (555) 444-5555", message: "Is this property still available? I'm interested in making an offer.", preferredContact: "email", isRead: true, createdAt: "2026-05-08T16:45:00Z" },
  { id: "5", propertyId: "1", propertyTitle: "Modern Beachfront Villa", name: "Robert Wilson", email: "robert@example.com", phone: "+1 (555) 555-6666", message: "I represent a group of investors interested in this property. Please contact me to discuss.", preferredContact: "phone", isRead: false, createdAt: "2026-05-07T11:00:00Z" },
];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState(mockInquiries);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof mockInquiries[0] | null>(null);

  const filtered = inquiries.filter(
    (inq) =>
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.propertyTitle.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRead = (id: string) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, isRead: !i.isRead } : i))
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Inquiries</h1>
          <p className="text-[#888] mt-1">
            {inquiries.filter((i) => !i.isRead).length} unread inquiries
          </p>
        </div>
      </div>

      <div className="glass rounded-xl p-4 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#C8A46B]"
          />
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        {filtered.map((inq) => (
          <div
            key={inq.id}
            className={`border-b border-[#222] last:border-0 p-4 cursor-pointer hover:bg-[#1a1a1a] transition-colors ${
              !inq.isRead ? "bg-[#C8A46B]/5" : ""
            }`}
            onClick={() => setSelected(inq)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {!inq.isRead && (
                    <span className="w-2 h-2 rounded-full bg-[#C8A46B] flex-shrink-0" />
                  )}
                  <p className="text-sm font-medium text-white truncate">{inq.name}</p>
                </div>
                <p className="text-xs text-[#C8A46B] mb-1">{inq.propertyTitle}</p>
                <p className="text-xs text-[#666] line-clamp-2">{inq.message}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-[#555]">{getTimeAgo(inq.createdAt)}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRead(inq.id);
                  }}
                  className={`p-1.5 rounded-lg transition-colors ${
                    inq.isRead ? "text-[#555] hover:text-[#888]" : "text-[#C8A46B] hover:text-[#D6B98C]"
                  }`}
                >
                  <Mail size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#666]">No inquiries found</div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSelected(null)} />
          <div className="relative bg-[#111] border border-[#222] rounded-xl w-full max-w-lg p-6">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-[#888] hover:text-white">
              <X size={18} />
            </button>
            <h2 className="text-lg font-semibold text-white mb-4">Inquiry Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-[#888]">Property</p>
                <p className="text-sm text-[#C8A46B]">{selected.propertyTitle}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-[#888]">Name</p>
                  <p className="text-sm text-white">{selected.name}</p>
                </div>
                <div>
                  <p className="text-xs text-[#888]">Preferred Contact</p>
                  <p className="text-sm text-white capitalize">{selected.preferredContact}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#888]">Email</p>
                <a href={`mailto:${selected.email}`} className="text-sm text-[#C8A46B] hover:text-[#D6B98C]">
                  {selected.email}
                </a>
              </div>
              {selected.phone && (
                <div>
                  <p className="text-xs text-[#888]">Phone</p>
                  <p className="text-sm text-white">{selected.phone}</p>
                </div>
              )}
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
                    : "bg-[#C8A46B] text-black hover:bg-[#D6B98C]"
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
