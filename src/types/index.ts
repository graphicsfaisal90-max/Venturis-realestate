export interface Property {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  type: "apartment" | "villa" | "penthouse" | "commercial" | "office" | "land";
  purpose: "buy" | "rent";
  status: "available" | "sold" | "pending" | "under_construction";
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  images: string[];
  featuredImage: string;
  amenities: string[];
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    coordinates: { lat: number; lng: number };
  };
  features: string[];
  yearBuilt: number;
  agent: Agent | string;
  virtualTour?: string;
  videoUrl?: string;
  nearbyPlaces: { name: string; distance: string; type: string }[];
  isFeatured: boolean;
  isLuxury: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  _id: string;
  name: string;
  slug: string;
  title: string;
  email: string;
  phone: string;
  whatsapp: string;
  image: string;
  bio: string;
  specialties: string[];
  socialLinks: { platform: string; url: string }[];
  properties: string[];
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  createdAt: string;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  clientTitle: string;
  clientImage: string;
  content: string;
  rating: number;
  propertyType: string;
  isFeatured: boolean;
  createdAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  category: string;
  tags: string[];
  image: string;
  readTime: number;
  isFeatured: boolean;
  publishedAt: string;
  createdAt: string;
}

export interface Inquiry {
  _id: string;
  propertyId: string;
  propertyTitle: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredContact: string;
  isRead: boolean;
  createdAt: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface InvestmentPlan {
  _id: string;
  title: string;
  description: string;
  minInvestment: number;
  maxInvestment: number;
  expectedROI: number;
  duration: string;
  riskLevel: string;
  image: string;
  isActive: boolean;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "superadmin";
  image: string;
  createdAt: string;
}

export interface SearchFilters {
  location: string;
  type: string;
  purpose: "buy" | "rent" | "";
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  minArea: string;
  maxArea: string;
}

export interface SavedProperty {
  _id: string;
  propertyId: string;
  userId: string;
  createdAt: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}
