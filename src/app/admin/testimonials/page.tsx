"use client";

import { useState } from "react";
import { Star, Plus, Edit3, Trash2, Search, X, Save } from "lucide-react";
import { testimonialsData } from "@/lib/constants";

interface TestimonialForm {
  clientName: string;
  clientTitle: string;
  clientImage: string;
  content: string;
  rating: string;
  propertyType: string;
  isFeatured: boolean;
}

const emptyForm: TestimonialForm = {
  clientName: "",
  clientTitle: "",
  clientImage: "",
  content: "",
  rating: "5",
  propertyType: "",
  isFeatured: false,
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(testimonialsData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TestimonialForm>(emptyForm);

  const filtered = testimonials.filter((t) =>
    t.clientName.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (id: string) => {
    const testimonial = testimonials.find((t) => t.id === id);
    if (!testimonial) return;
    setEditingId(id);
    setForm({
      clientName: testimonial.clientName,
      clientTitle: testimonial.clientTitle,
      clientImage: testimonial.clientImage,
      content: testimonial.content,
      rating: String(testimonial.rating),
      propertyType: testimonial.propertyType,
      isFeatured: testimonial.isFeatured,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this testimonial?")) {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form,
      rating: Number(form.rating),
    };
    if (editingId) {
      setTestimonials((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, ...data } : t))
      );
    } else {
      setTestimonials((prev) => [
        { id: String(Date.now()), ...data } as unknown as typeof testimonialsData[0],
        ...prev,
      ]);
    }
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <p className="text-[#888] mt-1">Manage client testimonials</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#b8942e] text-black rounded-lg hover:bg-[#d4a843] transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          Add Testimonial
        </button>
      </div>

      <div className="glass rounded-xl p-4 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <input
            type="text"
            placeholder="Search testimonials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#b8942e]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((t) => (
          <div key={t.id} className="glass rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] overflow-hidden flex-shrink-0">
                  <img src={t.clientImage} alt={t.clientName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.clientName}</p>
                  <p className="text-xs text-[#888]">{t.clientTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(t.id)} className="p-1.5 rounded-lg hover:bg-[#222] text-[#888] hover:text-white transition-colors">
                  <Edit3 size={14} />
                </button>
                <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg hover:bg-[#222] text-[#888] hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="text-sm text-[#999] italic mb-3 line-clamp-3">&ldquo;{t.content}&rdquo;</p>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < t.rating ? "text-[#b8942e] fill-[#b8942e]" : "text-[#333]"}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#888]">{t.propertyType}</span>
                {t.isFeatured && <span className="text-[#b8942e]">Featured</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[#666]">No testimonials found</div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setShowModal(false)} />
          <div className="relative bg-[#111] border border-[#222] rounded-xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-[#888] hover:text-white">
              <X size={18} />
            </button>
            <h2 className="text-lg font-semibold text-white mb-4">
              {editingId ? "Edit Testimonial" : "Add Testimonial"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[#888] mb-1">Client Name</label>
                <input
                  type="text"
                  value={form.clientName}
                  onChange={(e) => setForm((prev) => ({ ...prev, clientName: e.target.value }))}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-1">Client Title</label>
                <input
                  type="text"
                  value={form.clientTitle}
                  onChange={(e) => setForm((prev) => ({ ...prev, clientTitle: e.target.value }))}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
                  placeholder="e.g. Luxury Villa Buyer, Beverly Hills"
                />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-1">Client Image URL</label>
                <input
                  type="url"
                  value={form.clientImage}
                  onChange={(e) => setForm((prev) => ({ ...prev, clientImage: e.target.value }))}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-1">Testimonial</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                  rows={4}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e] resize-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-[#888] mb-1">Rating</label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm((prev) => ({ ...prev, rating: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[#888] mb-1">Property Type</label>
                  <input
                    type="text"
                    value={form.propertyType}
                    onChange={(e) => setForm((prev) => ({ ...prev, propertyType: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8942e]"
                    placeholder="e.g. Villa, Penthouse"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                  className="w-4 h-4 rounded border-[#333] bg-[#1a1a1a] text-[#b8942e] focus:ring-[#b8942e]"
                />
                <span className="text-sm text-white">Featured Testimonial</span>
              </label>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border border-[#333] text-[#888] hover:text-white text-sm">
                  Cancel
                </button>
                <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-[#b8942e] text-black rounded-lg hover:bg-[#d4a843] text-sm font-medium">
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
