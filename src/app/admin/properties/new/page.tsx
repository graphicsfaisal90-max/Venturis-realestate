"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { amenitiesList } from "@/lib/constants";
import ImageUpload from "@/components/admin/ImageUpload";
import { GalleryUpload } from "@/components/admin/ImageUpload";

const propertyTypes = ["apartment", "villa", "penthouse", "commercial", "office", "land"];
const purposes = ["buy", "rent"];
const statuses = ["available", "sold", "pending", "under_construction"];

interface NearbyPlace {
  name: string;
  distance: string;
  type: string;
}

export default function NewPropertyPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    currency: "USD",
    type: "apartment",
    purpose: "buy",
    status: "available",
    bedrooms: "",
    bathrooms: "",
    area: "",
    areaUnit: "sqft",
    featuredImage: "",
    images: [""],
    amenities: [] as string[],
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    lat: "",
    lng: "",
    features: [""],
    yearBuilt: "",
    isFeatured: false,
    isLuxury: false,
    tags: "",
    nearbyPlaces: [] as NearbyPlace[],
  });
  const [saving, setSaving] = useState(false);

  const update = (field: string, value: unknown) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleTitleChange = (title: string) => {
    update("title", title);
    update("slug", slugify(title));
  };

  const toggleAmenity = (amenity: string) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const addFeature = () => setForm((prev) => ({ ...prev, features: [...prev.features, ""] }));
  const removeFeature = (i: number) => setForm((prev) => ({ ...prev, features: prev.features.filter((_, idx) => idx !== i) }));
  const updateFeature = (i: number, val: string) => {
    const features = [...form.features];
    features[i] = val;
    update("features", features);
  };

  const addNearbyPlace = () =>
    setForm((prev) => ({
      ...prev,
      nearbyPlaces: [...prev.nearbyPlaces, { name: "", distance: "", type: "" }],
    }));
  const updateNearbyPlace = (i: number, field: string, val: string) => {
    const places = [...form.nearbyPlaces];
    (places[i] as unknown as Record<string, string>)[field] = val;
    update("nearbyPlaces", places);
  };
  const removeNearbyPlace = (i: number) =>
    setForm((prev) => ({ ...prev, nearbyPlaces: prev.nearbyPlaces.filter((_, idx) => idx !== i) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      slug: form.slug,
      description: form.description,
      price: Number(form.price),
      currency: form.currency,
      type: form.type,
      purpose: form.purpose,
      status: form.status,
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      area: Number(form.area),
      areaUnit: form.areaUnit,
      featuredImage: form.featuredImage,
      images: form.images.filter(Boolean),
      amenities: form.amenities,
      location: {
        address: form.address,
        city: form.city,
        state: form.state,
        country: form.country,
        zipCode: form.zipCode,
        coordinates: { lat: Number(form.lat), lng: Number(form.lng) },
      },
      features: form.features.filter(Boolean),
      yearBuilt: Number(form.yearBuilt),
      isFeatured: form.isFeatured,
      isLuxury: form.isLuxury,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      nearbyPlaces: form.nearbyPlaces.filter((p) => p.name),
    };

    console.log("Property payload:", payload);
    alert("Property created! (API integration pending)");
    setSaving(false);
    router.push("/admin/properties");
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/properties" className="p-2 rounded-lg hover:bg-[#1a1a1a] text-[#888] hover:text-white transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Add New Property</h1>
          <p className="text-[#888] mt-1">Create a new luxury property listing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-[#888] mb-1">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-[#888] mb-1">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => update("slug", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-[#888] mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={4}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060] resize-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Price</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Currency</label>
              <select
                value={form.currency}
                onChange={(e) => update("currency", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="AED">AED</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => update("type", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
              >
                {propertyTypes.map((t) => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Purpose</label>
              <select
                value={form.purpose}
                onChange={(e) => update("purpose", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
              >
                {purposes.map((p) => (
                  <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{s.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Bedrooms</label>
              <input
                type="number"
                value={form.bedrooms}
                onChange={(e) => update("bedrooms", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Bathrooms</label>
              <input
                type="number"
                step="0.5"
                value={form.bathrooms}
                onChange={(e) => update("bathrooms", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Area</label>
              <input
                type="number"
                value={form.area}
                onChange={(e) => update("area", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Area Unit</label>
              <select
                value={form.areaUnit}
                onChange={(e) => update("areaUnit", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
              >
                <option value="sqft">Sq Ft</option>
                <option value="sqm">Sq Meters</option>
                <option value="acre">Acres</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Year Built</label>
              <input
                type="number"
                value={form.yearBuilt}
                onChange={(e) => update("yearBuilt", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
              />
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-[#888] mb-1">Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">State</label>
              <input
                type="text"
                value={form.state}
                onChange={(e) => update("state", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Country</label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Zip Code</label>
              <input
                type="text"
                value={form.zipCode}
                onChange={(e) => update("zipCode", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Latitude</label>
              <input
                type="number"
                step="any"
                value={form.lat}
                onChange={(e) => update("lat", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Longitude</label>
              <input
                type="number"
                step="any"
                value={form.lng}
                onChange={(e) => update("lng", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
              />
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">Media</h2>
          <ImageUpload
            currentImage={form.featuredImage}
            onUpload={(url) => update("featuredImage", url)}
            label="Featured Image"
          />
          <GalleryUpload
            images={form.images.filter(Boolean)}
            onImagesChange={(images) => update("images", images.length > 0 ? images : [""])}
            label="Gallery Images"
          />
        </div>

        <div className="glass rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {amenitiesList.map((amenity) => (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                  form.amenities.includes(amenity)
                    ? "bg-[#988060]/20 border-[#988060]/40 text-[#988060]"
                    : "bg-[#1a1a1a] border-[#333] text-[#888] hover:border-[#555]"
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">Features</h2>
          {form.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(i, e.target.value)}
                className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
                placeholder="e.g. Ocean views from every room"
              />
              {form.features.length > 1 && (
                <button type="button" onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-300 text-xs">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addFeature} className="text-sm text-[#988060] hover:text-[#9D8653]">
            + Add Feature
          </button>
        </div>

        <div className="glass rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">Nearby Places</h2>
          {form.nearbyPlaces.map((place, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={place.name}
                onChange={(e) => updateNearbyPlace(i, "name", e.target.value)}
                className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
                placeholder="Name"
              />
              <input
                type="text"
                value={place.distance}
                onChange={(e) => updateNearbyPlace(i, "distance", e.target.value)}
                className="w-24 bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
                placeholder="0.5 mi"
              />
              <input
                type="text"
                value={place.type}
                onChange={(e) => updateNearbyPlace(i, "type", e.target.value)}
                className="w-28 bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
                placeholder="type"
              />
              <button type="button" onClick={() => removeNearbyPlace(i)} className="text-red-400 hover:text-red-300 text-xs">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addNearbyPlace} className="text-sm text-[#988060] hover:text-[#9D8653]">
            + Add Nearby Place
          </button>
        </div>

        <div className="glass rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">Additional Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#888] mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => update("tags", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#988060]"
                placeholder="luxury, beachfront, pool"
              />
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => update("isFeatured", e.target.checked)}
                  className="w-4 h-4 rounded border-[#333] bg-[#1a1a1a] text-[#988060] focus:ring-[#988060]"
                />
                <span className="text-sm text-white">Featured Property</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isLuxury}
                  onChange={(e) => update("isLuxury", e.target.checked)}
                  className="w-4 h-4 rounded border-[#333] bg-[#1a1a1a] text-[#988060] focus:ring-[#988060]"
                />
                <span className="text-sm text-white">Luxury Property</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/admin/properties"
            className="px-6 py-2.5 rounded-lg border border-[#333] text-[#888] hover:text-white hover:border-[#555] transition-colors text-sm"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#988060] text-black rounded-lg hover:bg-[#9D8653] transition-colors text-sm font-medium disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Create Property"}
          </button>
        </div>
      </form>
    </div>
  );
}
