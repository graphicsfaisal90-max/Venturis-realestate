"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Plus, Edit3, Trash2, Search } from "lucide-react";
import { propertyData } from "@/lib/constants";
import { formatPrice, propertyTypeLabels, propertyStatusLabels } from "@/lib/utils";

export default function PropertiesPage() {
  const [properties, setProperties] = useState(propertyData);
  const [search, setSearch] = useState("");

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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Properties</h1>
          <p className="text-[#888] mt-1">Manage your property listings</p>
        </div>
        <Link
          href="/admin/properties/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#b8942e] text-black rounded-lg hover:bg-[#d4a843] transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          Add New Property
        </Link>
      </div>

      <div className="glass rounded-xl p-4 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <input
            type="text"
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#b8942e]"
          />
        </div>
      </div>

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
                <tr key={property.id} className="border-b border-[#222] hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] overflow-hidden flex-shrink-0">
                        <img
                          src={`https://images.unsplash.com/${property.featuredImage}&w=80&h=80&fit=crop`}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{property.title}</p>
                        <p className="text-xs text-[#666]">{property.location.city}, {property.location.state}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#888]">
                    {propertyTypeLabels[property.type] || property.type}
                  </td>
                  <td className="px-4 py-4 text-sm text-white font-medium">
                    {formatPrice(property.price, property.currency)}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      property.status === "available"
                        ? "bg-green-400/10 text-green-400"
                        : property.status === "sold"
                        ? "bg-red-400/10 text-red-400"
                        : property.status === "pending"
                        ? "bg-yellow-400/10 text-yellow-400"
                        : "bg-blue-400/10 text-blue-400"
                    }`}>
                      {propertyStatusLabels[property.status] || property.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => toggleFeatured(property.id)}
                      className={`text-sm font-medium transition-colors ${
                        property.isFeatured ? "text-[#b8942e]" : "text-[#555] hover:text-[#888]"
                      }`}
                    >
                      {property.isFeatured ? "★ Featured" : "☆ Not Featured"}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/properties/edit/${property.id}`}
                        className="p-2 rounded-lg hover:bg-[#222] text-[#888] hover:text-white transition-colors"
                      >
                        <Edit3 size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="p-2 rounded-lg hover:bg-[#222] text-[#888] hover:text-red-400 transition-colors"
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
          <div className="text-center py-12 text-[#666]">No properties found</div>
        )}
      </div>
    </div>
  );
}
