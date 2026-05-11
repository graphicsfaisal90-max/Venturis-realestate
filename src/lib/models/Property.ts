import mongoose, { Schema, Document } from "mongoose";

export interface IProperty extends Document {
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
  agent: mongoose.Types.ObjectId;
  virtualTour?: string;
  videoUrl?: string;
  nearbyPlaces: { name: string; distance: string; type: string }[];
  isFeatured: boolean;
  isLuxury: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    type: {
      type: String,
      enum: ["apartment", "villa", "penthouse", "commercial", "office", "land"],
      required: true,
    },
    purpose: {
      type: String,
      enum: ["buy", "rent"],
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "sold", "pending", "under_construction"],
      default: "available",
    },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    area: { type: Number, required: true },
    areaUnit: { type: String, default: "sqft" },
    images: [{ type: String }],
    featuredImage: { type: String, required: true },
    amenities: [{ type: String }],
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    features: [{ type: String }],
    yearBuilt: { type: Number },
    agent: { type: Schema.Types.ObjectId, ref: "Agent" },
    virtualTour: { type: String },
    videoUrl: { type: String },
    nearbyPlaces: [
      {
        name: { type: String },
        distance: { type: String },
        type: { type: String },
      },
    ],
    isFeatured: { type: Boolean, default: false },
    isLuxury: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

PropertySchema.index({ slug: 1 });
PropertySchema.index({ type: 1, purpose: 1, status: 1 });
PropertySchema.index({ isFeatured: 1 });
PropertySchema.index({ "location.city": 1, "location.state": 1 });

export default mongoose.models.Property || mongoose.model<IProperty>("Property", PropertySchema);
