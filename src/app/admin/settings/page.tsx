"use client";

import { useState } from "react";
import { Settings, Save } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export default function SettingsPage() {
  const [form, setForm] = useState({
    siteName: siteConfig.name,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    email: siteConfig.email,
    phone: siteConfig.phone,
    whatsapp: siteConfig.whatsapp,
    address: siteConfig.address,
    officeHours: siteConfig.officeHours,
    metaTitle: "Venturis Realtors | Luxury Real Estate",
    metaDescription: siteConfig.description,
    metaKeywords: "luxury real estate, premium properties, villas, penthouses, commercial real estate, Venturis Realtors",
    instagram: siteConfig.social.instagram,
    facebook: siteConfig.social.facebook,
    twitter: siteConfig.social.twitter,
    linkedin: siteConfig.social.linkedin,
    youtube: siteConfig.social.youtube,
  });
  const [saving, setSaving] = useState(false);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    console.log("Settings saved:", form);
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    alert("Settings saved! (API integration pending)");
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-[#888] mt-1">Manage your website configuration</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="glass rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Settings size={18} className="text-[#b8942e]" />
            General Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#888] mb-1">Site Name</label>
              <input
                type="text"
                value={form.siteName}
                onChange={(e) => update("siteName", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => update("tagline", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-[#888] mb-1">Site Description</label>
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={3}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e] resize-none"
              />
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#888] mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">WhatsApp</label>
              <input
                type="text"
                value={form.whatsapp}
                onChange={(e) => update("whatsapp", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Office Hours</label>
              <input
                type="text"
                value={form.officeHours}
                onChange={(e) => update("officeHours", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-[#888] mb-1">Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
              />
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">SEO Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[#888] mb-1">Meta Title</label>
              <input
                type="text"
                value={form.metaTitle}
                onChange={(e) => update("metaTitle", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Meta Description</label>
              <textarea
                value={form.metaDescription}
                onChange={(e) => update("metaDescription", e.target.value)}
                rows={3}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e] resize-none"
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Meta Keywords</label>
              <input
                type="text"
                value={form.metaKeywords}
                onChange={(e) => update("metaKeywords", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
                placeholder="luxury real estate, premium properties, ..."
              />
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#888] mb-1">Instagram</label>
              <input
                type="url"
                value={form.instagram}
                onChange={(e) => update("instagram", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Facebook</label>
              <input
                type="url"
                value={form.facebook}
                onChange={(e) => update("facebook", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Twitter / X</label>
              <input
                type="url"
                value={form.twitter}
                onChange={(e) => update("twitter", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">LinkedIn</label>
              <input
                type="url"
                value={form.linkedin}
                onChange={(e) => update("linkedin", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">YouTube</label>
              <input
                type="url"
                value={form.youtube}
                onChange={(e) => update("youtube", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-2.5 bg-[#b8942e] text-black rounded-lg hover:bg-[#d4a843] transition-colors text-sm font-medium disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
