"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Plus, Edit3, Trash2, Search, Star, LayoutGrid, List } from "lucide-react";
import { propertyData } from "@/lib/constants";
import { formatPrice, propertyTypeLabels, propertyStatusLabels } from "@/lib/utils";

export default function PropertiesPage() {
  const [properties, setProperties] = useState(propertyData);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const filtered = properties.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const toggleFeatured = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
  };

  const statusColors: Record<string, string> = {
    available: "bg-green-400/10 text-green-400 border-green-400/20",
    sold: "bg-red-400/10 text-red-400 border-red-400/20",
    pending: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    under_construction: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  };

  const stats = [
    { label: "Total", value: properties.length, icon: Building2 },
    { label: "Available", value: properties.filter((p) => p.status === "available").length, icon: Building2 },
    { label: "Featured", value: properties.filter((p) => p.isFeatured).length, icon: Star },
    { label: "Sold", value: properties.filter((p) => p.status === "sold").length, icon: Building2 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Properties</h1>
          <p className="text-[#888] text-sm mt-1">Manage your property listings</p>
        </div>
        <Link
          href="/admin/properties/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#988060] text-black rounded-lg hover:bg-[#9D8653] transition-all text-sm font-medium shadow-lg shadow-[#988060]/20"
        >
          <Plus size={16} />
          Add Property
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#988060]/10 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-[#988060]" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-[#666]">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
            <input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#988060] transition-colors"
            />
          </div>
          <div className="flex items-center gap-1 bg-[#1a1a1a] rounded-lg border border-[#333] p-0.5">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-md transition-colors ${viewMode === "table" ? "bg-[#333] text-white" : "text-[#666] hover:text-white"}`}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-[#333] text-white" : "text-[#666] hover:text-white"}`}
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {viewMode === "table" ? (
        <div className="glass rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#222]">
                  <th className="text-left px-4 py-3 text-xs font-medium text-[#666] uppercase tracking-wider">Property</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[#666] uppercase tracking-wider">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[#666] uppercase tracking-wider">Price</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[#666] uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[#666] uppercase tracking-wider">Featured</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-[#666] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((property) => (
                  <tr key={property.id} className="border-b border-[#222] hover:bg-[#ffffff04] transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] overflow-hidden flex-shrink-0 ring-1 ring-white/5">
                          <img
                            src={`https://images.unsplash.com/${property.featuredImage}&w=80&h=80&fit=crop`}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{property.title}</p>
                          <p className="text-xs text-[#555]">{property.location.city}, {property.location.state}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#888]">
                      {propertyTypeLabels[property.type] || property.type}
                    </td>
                    <td className="px-4 py-4 text-sm text-white font-medium font-num">
                      {formatPrice(property.price, property.currency)}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider border ${statusColors[property.status] || "bg-[#1a1a1a] text-[#666]"}`}>
                        {propertyStatusLabels[property.status] || property.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => toggleFeatured(property.id)}
                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                          property.isFeatured ? "text-[#988060]" : "text-[#555] hover:text-[#888]"
                        }`}
                      >
                        <Star size={14} className={property.isFeatured ? "fill-[#988060]" : ""} />
                        {property.isFeatured ? "Featured" : "Not Featured"}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/properties/edit/${property.id}`}
                          className="p-2 rounded-lg hover:bg-[#ffffff08] text-[#666] hover:text-white transition-colors"
                        >
                          <Edit3 size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-[#666] hover:text-red-400 transition-colors"
                        >
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
            <div className="text-center py-16 text-[#555]">
              <Building2 size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No properties found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((property) => (
            <div key={property.id} className="glass rounded-xl overflow-hidden group hover:border-[#988060]/20 transition-all duration-300">
              <div className="relative h-40 bg-[#1a1a1a] overflow-hidden">
                <img
                  src={`https://images.unsplash.com/${property.featuredImage}&w=400&h=300&fit=crop`}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Link
                    href={`/admin/properties/edit/${property.id}`}
                    className="p-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white/80 hover:text-white transition-colors"
                  >
                    <Edit3 size={12} />
                  </Link>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="p-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white/80 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <span className={`absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider border ${statusColors[property.status] || "bg-black/40 text-[#888]"}`}>
                  {propertyStatusLabels[property.status] || property.status}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-white truncate">{property.title}</p>
                  <button onClick={() => toggleFeatured(property.id)}>
                    <Star size={14} className={property.isFeatured ? "text-[#988060] fill-[#988060]" : "text-[#555]"} />
                  </button>
                </div>
                <p className="text-[10px] text-[#555] uppercase tracking-wider mb-2">{property.location.city}, {property.location.state}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-[#988060] font-num">{formatPrice(property.price, property.currency)}</p>
                  <span className="text-[10px] text-[#555]">{propertyTypeLabels[property.type] || property.type}</span>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-[#555]">
              <Building2 size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No properties found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
