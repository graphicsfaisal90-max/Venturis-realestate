import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdminUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "superadmin";
  image: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
    },
    image: { type: String },
  },
  { timestamps: true }
);

AdminUserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

AdminUserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.AdminUser || mongoose.model<IAdminUser>("AdminUser", AdminUserSchema);
