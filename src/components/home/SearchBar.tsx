"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { propertyTypes } from "@/lib/constants";
import { cn } from "@/lib/utils";

const budgets = [
  { value: "", label: "Any Budget" },
  { value: "0-1000000", label: "Under $1M" },
  { value: "1000000-3000000", label: "$1M - $3M" },
  { value: "3000000-5000000", label: "$3M - $5M" },
  { value: "5000000-10000000", label: "$5M - $10M" },
  { value: "10000000-999999999", label: "$10M+" },
];

const bedBathOptions = [
  { value: "", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

export default function SearchBar() {
  const [purpose, setPurpose] = useState<"buy" | "rent">("buy");

  return (
    <div className="relative z-20 -mt-20 mb-16">
      <div className="container-luxury">
        <div className="glass rounded-2xl luxury-shadow p-6 md:p-8">
          <div className="flex gap-1 mb-6">
            <button
              onClick={() => setPurpose("buy")}
              className={cn(
                "px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
                purpose === "buy"
                  ? "gold-gradient-bg text-white"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              )}
            >
              Buy
            </button>
            <button
              onClick={() => setPurpose("rent")}
              className={cn(
                "px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
                purpose === "rent"
                  ? "gold-gradient-bg text-white"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              )}
            >
              Rent
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="City, address or ZIP"
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gold-400/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-2">
                Property Type
              </label>
              <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 appearance-none cursor-pointer focus:outline-none focus:border-gold-400/50 transition-colors">
                <option value="" className="bg-white">
                  Any Type
                </option>
                {propertyTypes.map((type) => (
                  <option
                    key={type.value}
                    value={type.value}
                    className="bg-white"
                  >
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-2">
                Budget
              </label>
              <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 appearance-none cursor-pointer focus:outline-none focus:border-gold-400/50 transition-colors">
                {budgets.map((budget) => (
                  <option
                    key={budget.value}
                    value={budget.value}
                    className="bg-white"
                  >
                    {budget.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-2">
                Bedrooms
              </label>
              <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 appearance-none cursor-pointer focus:outline-none focus:border-gold-400/50 transition-colors">
                {bedBathOptions.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-white"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-2">
                Bathrooms
              </label>
              <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 appearance-none cursor-pointer focus:outline-none focus:border-gold-400/50 transition-colors">
                {bedBathOptions.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-white"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button className="gold-gradient-bg text-white px-8 py-3 rounded-lg text-sm font-medium tracking-wide hover:opacity-90 transition-all duration-300 active:scale-[0.97] flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search Properties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
