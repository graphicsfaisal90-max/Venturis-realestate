import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import AdminUser from "@/lib/models/AdminUser";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();
        const user = await AdminUser.findOne({ email: credentials.email });
        if (!user) return null;

        const isValid = await user.comparePassword(credentials.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as Record<string, unknown>).role as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as unknown as Record<string, unknown>).id = token.id;
        (session.user as unknown as Record<string, unknown>).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin",
  },
});

export const GET = handler as unknown as (req: Request, context: { params: Promise<{ nextauth: string[] }> }) => Promise<Response>;
export const POST = handler as unknown as (req: Request, context: { params: Promise<{ nextauth: string[] }> }) => Promise<Response>;
