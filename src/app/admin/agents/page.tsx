"use client";

import { useState } from "react";
import { Users, Plus, Edit3, Trash2, Search, X, Save } from "lucide-react";
import { agentsData } from "@/lib/constants";
import ImageUpload from "@/components/admin/ImageUpload";
import { GalleryUpload } from "@/components/admin/ImageUpload";

interface AgentForm {
  name: string;
  slug: string;
  title: string;
  email: string;
  phone: string;
  whatsapp: string;
  image: string;
  bio: string;
  specialties: string;
  rating: string;
  isFeatured: boolean;
  gallery: string[];
}

const emptyForm: AgentForm = {
  name: "",
  slug: "",
  title: "",
  email: "",
  phone: "",
  whatsapp: "",
  image: "",
  bio: "",
  specialties: "",
  rating: "5",
  isFeatured: false,
  gallery: [],
};

export default function AgentsPage() {
  const [agents, setAgents] = useState(agentsData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AgentForm>(emptyForm);

  const filtered = agents.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (id: string) => {
    const agent = agents.find((a) => a.id === id);
    if (!agent) return;
    setEditingId(id);
    setForm({
      name: agent.name,
      slug: agent.slug,
      title: agent.title,
      email: agent.email,
      phone: agent.phone,
      whatsapp: agent.whatsapp,
      image: agent.image,
      bio: agent.bio,
      specialties: agent.specialties.join(", "),
      rating: String(agent.rating),
      isFeatured: agent.isFeatured,
      gallery: (agent as any).gallery || [],
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this agent?")) {
      setAgents((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setAgents((prev) =>
        prev.map((a) =>
          a.id === editingId
            ? {
                ...a,
                ...form,
                specialties: form.specialties.split(",").map((s) => s.trim()),
                rating: Number(form.rating),
              }
            : a
        )
      );
    } else {
      const newAgent = {
        id: String(Date.now()),
        ...form,
        specialties: form.specialties.split(",").map((s) => s.trim()),
        rating: Number(form.rating),
        reviewCount: 0,
        socialLinks: [],
        properties: [],
        createdAt: new Date().toISOString(),
      };
      setAgents((prev) => [newAgent as unknown as typeof agentsData[0], ...prev]);
    }
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Agents</h1>
          <p className="text-[#888] mt-1">Manage your real estate agents</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#C8A46B] text-black rounded-lg hover:bg-[#D6B98C] transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          Add Agent
        </button>
      </div>

      <div className="glass rounded-xl p-4 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <input
            type="text"
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#C8A46B]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((agent) => (
          <div key={agent.id} className="glass rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#1a1a1a] overflow-hidden flex-shrink-0">
                <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{agent.name}</p>
                <p className="text-xs text-[#888] truncate">{agent.title}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(agent.id)} className="p-1.5 rounded-lg hover:bg-[#222] text-[#888] hover:text-white transition-colors">
                  <Edit3 size={14} />
                </button>
                <button onClick={() => handleDelete(agent.id)} className="p-1.5 rounded-lg hover:bg-[#222] text-[#888] hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="text-xs text-[#666] line-clamp-2 mb-3">{agent.bio}</p>
            <div className="flex items-center justify-between text-xs text-[#888]">
              <span>★ {agent.rating} ({agent.reviewCount} reviews)</span>
              {agent.isFeatured && <span className="text-[#C8A46B]">Featured</span>}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[#666]">No agents found</div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setShowModal(false)} />
          <div className="relative bg-[#111] border border-[#222] rounded-xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-[#888] hover:text-white">
              <X size={18} />
            </button>
            <h2 className="text-lg font-semibold text-white mb-4">
              {editingId ? "Edit Agent" : "Add Agent"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[#888] mb-1">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#C8A46B]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-1">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#C8A46B]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-[#888] mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#C8A46B]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#888] mb-1">Phone</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#C8A46B]"
                  />
                </div>
              </div>
              <ImageUpload
                currentImage={form.image}
                onUpload={(url) => setForm((prev) => ({ ...prev, image: url }))}
                label="Agent Photo"
              />
              <GalleryUpload
                images={form.gallery}
                onImagesChange={(images) => setForm((prev) => ({ ...prev, gallery: images }))}
                label="Gallery Images"
              />
              <div>
                <label className="block text-sm text-[#888] mb-1">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#C8A46B] resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-1">Specialties (comma separated)</label>
                <input
                  type="text"
                  value={form.specialties}
                  onChange={(e) => setForm((prev) => ({ ...prev, specialties: e.target.value }))}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#C8A46B]"
                />
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <label className="block text-sm text-[#888] mb-1">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={form.rating}
                    onChange={(e) => setForm((prev) => ({ ...prev, rating: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#C8A46B]"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer pt-5">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                    className="w-4 h-4 rounded border-[#333] bg-[#1a1a1a] text-[#C8A46B] focus:ring-[#C8A46B]"
                  />
                  <span className="text-sm text-white">Featured</span>
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border border-[#333] text-[#888] hover:text-white text-sm">
                  Cancel
                </button>
                <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-[#C8A46B] text-black rounded-lg hover:bg-[#D6B98C] text-sm font-medium">
                  <Save size={14} />
                  {editingId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
