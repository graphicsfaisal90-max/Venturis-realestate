import mongoose, { Schema, Document } from "mongoose";

export interface IAgent extends Document {
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
  properties: mongoose.Types.ObjectId[];
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AgentSchema = new Schema<IAgent>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    whatsapp: { type: String },
    image: { type: String },
    bio: { type: String },
    specialties: [{ type: String }],
    socialLinks: [
      {
        platform: { type: String },
        url: { type: String },
      },
    ],
    properties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

AgentSchema.index({ slug: 1 });

export default mongoose.models.Agent || mongoose.model<IAgent>("Agent", AgentSchema);
