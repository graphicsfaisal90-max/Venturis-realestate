"use client";

import { useState } from "react";
import { FileText, Plus, Edit3, Trash2, Search, X, Save } from "lucide-react";
import { blogData, blogCategories } from "@/lib/constants";
import ImageUpload from "@/components/admin/ImageUpload";
import { GalleryUpload } from "@/components/admin/ImageUpload";

interface BlogForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  category: string;
  tags: string;
  image: string;
  readTime: string;
  isFeatured: boolean;
  publishedAt: string;
  gallery: string[];
}

const emptyForm: BlogForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  author: "",
  authorImage: "",
  category: "Market Insights",
  tags: "",
  image: "",
  readTime: "5",
  isFeatured: false,
  publishedAt: new Date().toISOString().split("T")[0],
  gallery: [],
};

export default function BlogsPage() {
  const [posts, setPosts] = useState(blogData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogForm>(emptyForm);

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (id: string) => {
    const post = posts.find((p) => p.id === id);
    if (!post) return;
    setEditingId(id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      authorImage: post.authorImage,
      category: post.category,
      tags: post.tags.join(", "),
      image: post.image,
      readTime: String(post.readTime),
      isFeatured: post.isFeatured,
      publishedAt: post.publishedAt,
      gallery: (post as any).gallery || [],
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this post?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                ...form,
                tags: form.tags.split(",").map((t) => t.trim()),
                readTime: Number(form.readTime),
              }
            : p
        )
      );
    } else {
      const newPost = {
        id: String(Date.now()),
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()),
        readTime: Number(form.readTime),
      };
      setPosts((prev) => [newPost as unknown as typeof blogData[0], ...prev]);
    }
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-[#888] mt-1">Manage your blog content</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#988060] text-black rounded-lg hover:bg-[#9D8653] transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          Add Post
        </button>
      </div>

      <div className="glass rounded-xl p-4 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#988060]"
          />
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#222]">
                <th className="text-left px-4 py-3 text-xs font-medium text-[#666] uppercase tracking-wider">Title</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#666] uppercase tracking-wider">Author</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#666] uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#666] uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#666] uppercase tracking-wider">Featured</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-[#666] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post.id} className="border-b border-[#222] hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] overflow-hidden flex-shrink-0">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate max-w-[300px]">{post.title}</p>
                        <p className="text-xs text-[#666]">{post.readTime} min read</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#888]">{post.author}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs bg-[#1a1a1a] text-[#888]">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#888]">{post.publishedAt}</td>
                  <td className="px-4 py-4">
                    <span className={`text-sm ${post.isFeatured ? "text-[#988060]" : "text-[#555]"}`}>
                      {post.isFeatured ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(post.id)} className="p-2 rounded-lg hover:bg-[#222] text-[#888] hover:text-white transition-colors">
                        <Edit3 size={14} />
                      </button>
                      <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg hover:bg-[#222] text-[#888] hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#666]">No blog posts found</div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setShowModal(false)} />
          <div className="relative bg-[#111] border border-[#222] rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-[#888] hover:text-white">
              <X size={18} />
            </button>
            <h2 className="text-lg font-semibold text-white mb-4">
              {editingId ? "Edit Post" : "New Blog Post"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[#888] mb-1">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-[#888] mb-1">Slug</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#888] mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
                  >
                    {blogCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-1">Excerpt</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                  rows={2}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060] resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-1">Content</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                  rows={6}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060] resize-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-[#888] mb-1">Author</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#888] mb-1">Read Time (min)</label>
                  <input
                    type="number"
                    value={form.readTime}
                    onChange={(e) => setForm((prev) => ({ ...prev, readTime: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
                  />
                </div>
              </div>
              <ImageUpload
                currentImage={form.image}
                onUpload={(url) => setForm((prev) => ({ ...prev, image: url }))}
                label="Cover Image"
              />
              <ImageUpload
                currentImage={form.authorImage}
                onUpload={(url) => setForm((prev) => ({ ...prev, authorImage: url }))}
                label="Author Photo"
              />
              <div className="col-span-2">
                <GalleryUpload
                  images={form.gallery}
                  onImagesChange={(images) => setForm((prev) => ({ ...prev, gallery: images }))}
                  label="Blog Gallery Images"
                />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
                  placeholder="luxury, real-estate, trends"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-[#888] mb-1">Published Date</label>
                  <input
                    type="date"
                    value={form.publishedAt}
                    onChange={(e) => setForm((prev) => ({ ...prev, publishedAt: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={(e) => setForm((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                      className="w-4 h-4 rounded border-[#333] bg-[#1a1a1a] text-[#988060] focus:ring-[#988060]"
                    />
                    <span className="text-sm text-white">Featured Post</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border border-[#333] text-[#888] hover:text-white text-sm">
                  Cancel
                </button>
                <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-[#988060] text-black rounded-lg hover:bg-[#9D8653] text-sm font-medium">
                  <Save size={14} />
                  {editingId ? "Update" : "Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
