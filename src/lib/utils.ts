export function cn(...inputs: (string | boolean | undefined | null)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatPrice(price: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatArea(area: number, unit = "sqft"): string {
  return `${area.toLocaleString()} ${unit}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function getTimeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (years > 0) return `${years}y ago`;
  if (months > 0) return `${months}mo ago`;
  if (weeks > 0) return `${weeks}w ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
}

export function getImageUrl(path: string, width = 800, height = 600): string {
  return `https://images.unsplash.com/${path}?w=${width}&h=${height}&fit=crop`;
}

export const propertyTypeLabels: Record<string, string> = {
  apartment: "Apartment",
  villa: "Villa",
  penthouse: "Penthouse",
  commercial: "Commercial",
  office: "Office",
  land: "Land",
};

export const propertyPurposeLabels: Record<string, string> = {
  buy: "For Sale",
  rent: "For Rent",
};

export const propertyStatusLabels: Record<string, string> = {
  available: "Available",
  sold: "Sold",
  pending: "Pending",
  under_construction: "Under Construction",
};
