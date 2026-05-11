import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  clientName: string;
  clientTitle: string;
  clientImage: string;
  content: string;
  rating: number;
  propertyType: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true },
    clientTitle: { type: String },
    clientImage: { type: String },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    propertyType: { type: String },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
