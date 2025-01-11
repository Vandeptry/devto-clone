// src/server/auth/config.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "~/server/db";
import { z } from "zod";
import { randomUUID } from "crypto";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      uploadAva: string | null;
      username: string | null;
      joinedAt: Date | null;
      profile: {
        bio: string | null;
        location: string | null;
        website: string | null;
        brandColor: string | null;
      } | null;
    } & DefaultSession["user"];
    sessionToken: string; // Thêm sessionToken vào interface Session
  }
}

const credentialsSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const authConfig: NextAuthConfig = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const result = credentialsSchema.safeParse(credentials);

          if (!result.success) {
            console.log("Invalid credentials:", result.error.errors);
            return null;
          }

          const { email, password } = result.data;

          const user = await db.user.findUnique({
            where: { email },
          });

          if (!user?.hashedPassword) {
            console.log("User not found or no password set.");
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            password,
            user.hashedPassword,
          );

          if (!isPasswordValid) {
            console.log("Invalid password");
            return null;
          }

          const sessionToken = randomUUID();

          // Tạo session mới khi đăng nhập bằng credentials
          const session = await db.session.create({
            data: {
              userId: user.id,
              sessionToken,
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
          });

          // Trả về user object với sessionToken
          return {
            ...user,
            sessionToken: session.sessionToken,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        // ... thêm các thông tin user khác cần thiết
      }
      return token;
    },
    session: async ({ session, token }) => {
      const profile = await db.profile.findUnique({
        where: { userId: token.id as string },
        select: {
          bio: true,
          location: true,
          website: true,
          brandColor: true,
        },
      });

      // Thêm thông tin user và sessionToken vào session
      session.user = {
        ...session.user,
        id: token.id as string,
        profile,
      };
      session.sessionToken = token.sessionToken as string; // Gán sessionToken vào session

      return session;
    },
  },
  session:{
    strategy:"jwt",
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
    verifyRequest: "/auth/verify-request",
  },
};
