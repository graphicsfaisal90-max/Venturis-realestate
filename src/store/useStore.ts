import { create } from "zustand";
import type { SearchFilters } from "@/types";

interface AppState {
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  savedProperties: string[];
  searchFilters: SearchFilters;
  isDarkMode: boolean;
  setSearchOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleSavedProperty: (id: string) => void;
  isPropertySaved: (id: string) => boolean;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  resetSearchFilters: () => void;
  toggleDarkMode: () => void;
}

const defaultFilters: SearchFilters = {
  location: "",
  type: "",
  purpose: "",
  minPrice: "",
  maxPrice: "",
  bedrooms: "",
  bathrooms: "",
  minArea: "",
  maxArea: "",
};

export const useStore = create<AppState>((set, get) => ({
  isSearchOpen: false,
  isMobileMenuOpen: false,
  savedProperties: [],
  searchFilters: defaultFilters,
  isDarkMode: false,
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  toggleSavedProperty: (id) => {
    const saved = get().savedProperties;
    if (saved.includes(id)) {
      set({ savedProperties: saved.filter((p) => p !== id) });
    } else {
      set({ savedProperties: [...saved, id] });
    }
  },
  isPropertySaved: (id) => get().savedProperties.includes(id),
  setSearchFilters: (filters) =>
    set((state) => ({
      searchFilters: { ...state.searchFilters, ...filters },
    })),
  resetSearchFilters: () => set({ searchFilters: defaultFilters }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
