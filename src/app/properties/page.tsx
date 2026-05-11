"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { propertyData } from "@/lib/constants";
import { propertyTypeLabels, propertyPurposeLabels } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import PropertyCard from "@/components/properties/PropertyCard";

const propertyTypes = ["", "apartment", "villa", "penthouse", "commercial", "office", "land"];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

export default function PropertiesPage() {
  const [purpose, setPurpose] = useState<"buy" | "rent" | "">("");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 9;

  const filtered = useMemo(() => {
    let result = [...propertyData];

    if (purpose) result = result.filter((p) => p.purpose === purpose);
    if (type) result = result.filter((p) => p.type === type);
    if (minPrice) result = result.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice));
    if (bedrooms) result = result.filter((p) => p.bedrooms >= Number(bedrooms));
    if (bathrooms) result = result.filter((p) => p.bathrooms >= Number(bathrooms));
    if (location)
      result = result.filter(
        (p) =>
          p.location.city.toLowerCase().includes(location.toLowerCase()) ||
          p.location.address.toLowerCase().includes(location.toLowerCase()) ||
          p.location.state.toLowerCase().includes(location.toLowerCase())
      );

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [purpose, type, minPrice, maxPrice, bedrooms, bathrooms, location, sort]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(0, currentPage * perPage);

  const clearFilters = () => {
    setPurpose("");
    setType("");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
    setBathrooms("");
    setLocation("");
    setCurrentPage(1);
  };

  const hasFilters = purpose || type || minPrice || maxPrice || bedrooms || bathrooms || location;

  return (
    <main className="min-h-screen">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-900/20 via-transparent to-[#0c0c0c]" />
        <div className="container-luxury relative z-10">
          <SectionHeading
            title="Our Properties"
            subtitle="Discover an exclusive collection of the world's finest luxury properties, meticulously curated for discerning clients."
            gold
          />
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-luxury">
          <div className="glass rounded-xl p-4 md:p-6 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex rounded-lg border border-white/10 overflow-hidden">
                <button
                  onClick={() => setPurpose(purpose === "buy" ? "" : "buy")}
                  className={`px-5 py-2 text-sm font-medium transition-colors ${
                    purpose === "buy" ? "gold-gradient-bg text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setPurpose(purpose === "rent" ? "" : "rent")}
                  className={`px-5 py-2 text-sm font-medium transition-colors ${
                    purpose === "rent" ? "gold-gradient-bg text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  Rent
                </button>
              </div>

              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
                />
              </div>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-transparent border border-white/10 rounded-lg py-2 px-4 text-sm text-white/70 focus:outline-none focus:border-gold-500/50"
              >
                <option value="">All Types</option>
                {propertyTypes.filter(Boolean).map((t) => (
                  <option key={t} value={t} className="text-black">
                    {propertyTypeLabels[t]}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors ${
                  showFilters || hasFilters
                    ? "border-gold-500/50 text-gold-400"
                    : "border-white/10 text-white/60 hover:text-white"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasFilters && <span className="w-2 h-2 rounded-full bg-gold-400" />}
              </button>

              <div className="flex-1" />

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent border border-white/10 rounded-lg py-2 px-4 text-sm text-white/70 focus:outline-none focus:border-gold-500/50"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="text-black">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pt-4 border-t border-white/5"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5">Min Price</label>
                    <input
                      type="number"
                      placeholder="$0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full bg-transparent border border-white/10 rounded-lg py-2 px-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5">Max Price</label>
                    <input
                      type="number"
                      placeholder="$999M+"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full bg-transparent border border-white/10 rounded-lg py-2 px-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5">Bedrooms</label>
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full bg-transparent border border-white/10 rounded-lg py-2 px-3 text-sm text-white/70 focus:outline-none focus:border-gold-500/50"
                    >
                      <option value="">Any</option>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n} className="text-black">
                          {n}+
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5">Bathrooms</label>
                    <select
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                      className="w-full bg-transparent border border-white/10 rounded-lg py-2 px-3 text-sm text-white/70 focus:outline-none focus:border-gold-500/50"
                    >
                      <option value="">Any</option>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n} className="text-black">
                          {n}+
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 flex items-center gap-1.5 text-xs text-white/40 hover:text-gold-400 transition-colors"
                  >
                    <X className="w-3 h-3" /> Clear all filters
                  </button>
                )}
              </motion.div>
            )}
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-white/40">
              Showing <span className="text-white">{paginated.length}</span> of{" "}
              <span className="text-white">{filtered.length}</span> properties
            </p>
          </div>

          {paginated.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((property, i) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && paginated.length < filtered.length && (
                <div className="mt-12 text-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Load More Properties
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-white/10 flex items-center justify-center">
                <Search className="w-6 h-6 text-white/30" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No properties found</h3>
              <p className="text-white/40 mb-6">Try adjusting your search filters</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
