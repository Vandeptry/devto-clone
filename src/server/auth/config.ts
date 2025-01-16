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
import { type User } from "@prisma/client";

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
      hashedPassword: string | null;
      profile: {
        bio: string | null;
        location: string | null;
        website: string | null;
        brandColor: string | null;
      } | null;
    } & DefaultSession["user"];
    sessionToken: string;
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
        //console.log("Credentials:", credentials);
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

          // Xóa session trùng lặp
          await db.session.deleteMany({
            where: { userId: user.id },
          });

          const sessionToken = randomUUID();

          // Tạo session credentials
          const session = await db.session.create({
            data: {
              userId: user.id,
              sessionToken,
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
          });

          // Trả về user & sessionToken
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
      //console.log("User in JWT callback:", user);
      //console.log("Token in JWT callback:", token);
      if (user) {
        const prismaUser = user as User;
        const profile = await db.profile.findUnique({
          where: { userId: user.id as string },
          select: {
            bio: true,
            location: true,
            website: true,
            brandColor: true,
            //More fields
          },
        });
        token.id = typeof user.id === "string" ? user.id : user.id;
        token.name = prismaUser.name;
        token.email = prismaUser.email;
        token.picture = prismaUser.image;
        token.username = prismaUser.username;
        token.image = prismaUser.image;
        token.uploadAva = prismaUser.uploadAva;
        token.joinedAt = prismaUser.joinedAt;
        token.profile = profile;
      }
      return token;
    },
    session: async ({ session, token }) => {
      //console.log("Token object in Session callback:", token);
      //console.log("Session object in Session callback:", session);
      const profile = await db.profile.findUnique({
        where: { userId: token.id as string },
        select: {
          user: true,
          bio: true,
          location: true,
          website: true,
          brandColor: true,
        },
      });

      // Thêm thông tin user đối với credentials
      session.user = {
        ...session.user,
        id: token.id as string,
        username: profile?.user?.username ?? null,
        image: profile?.user.image ?? profile?.user.uploadAva,
        joinedAt: (profile?.user.joinedAt as Date) ?? null,
        hashedPassword: profile?.user.hashedPassword ?? null,
        profile,
      };
      session.sessionToken = token.sessionToken as string;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
    verifyRequest: "/auth/verify-request",
  },
};
