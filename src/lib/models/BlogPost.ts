import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
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
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    author: { type: String, required: true },
    authorImage: { type: String },
    category: { type: String },
    tags: [{ type: String }],
    image: { type: String },
    readTime: { type: Number },
    isFeatured: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ category: 1 });

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
