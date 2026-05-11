/* 
  Admin Seed Script
  Run with: npx ts-node --compiler-options '{"module":"commonjs"}' scripts/seed.ts
  Or: npx tsx scripts/seed.ts
*/

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/venturis";

const AdminUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "superadmin"], default: "admin" },
    image: { type: String },
  },
  { timestamps: true }
);

const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const bcrypt = await import("bcryptjs");

    const existing = await AdminUser.findOne({ email: "admin@venturisrealtors.com" });
    if (existing) {
      console.log("Admin user already exists:");
      console.log("  Email: admin@venturisrealtors.com");
      console.log("  Password: admin123");
      await mongoose.disconnect();
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    await AdminUser.create({
      name: "Admin",
      email: "admin@venturisrealtors.com",
      password: hashedPassword,
      role: "superadmin",
      image: "",
    });

    console.log("Admin user created successfully!");
    console.log("  Email: admin@venturisrealtors.com");
    console.log("  Password: admin123");
    console.log("  Role: superadmin");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();
