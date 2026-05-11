import mongoose, { Schema, Document } from "mongoose";

export interface IInquiry extends Document {
  propertyId: string;
  propertyTitle: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredContact: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    propertyId: { type: String, required: true },
    propertyTitle: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    preferredContact: { type: String, default: "email" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

InquirySchema.index({ isRead: 1 });
InquirySchema.index({ propertyId: 1 });

export default mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
