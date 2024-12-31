//src/server/auth/config.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "~/server/db";
import {z} from "zod";

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
    } & DefaultSession["user"];
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
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
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

        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

        if (!isPasswordValid) {
          console.log("Invalid password");
          return null;
        }
        console.log("Thông tin cred: ",user.id,
          user.email,
          user.name,
          user.uploadAva,)

        //localStorage.setItem('user',user)

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          uploadAva: user.uploadAva,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.uploadAva = user.image;
      }
      return token;
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
};
