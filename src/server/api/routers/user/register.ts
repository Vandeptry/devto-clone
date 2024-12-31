// src/server/api/routers/user/register.ts
import { z } from "zod";
import { hash } from "bcrypt";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "~/server/api/trpc";
import { createClient } from "@supabase/supabase-js";
import { randomUUID, randomBytes } from "crypto";

const registerSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6),
  email: z.string().email().optional(),
  name: z.string().min(2).optional(),
  profileImage: z.string().nullable().optional(),
});

export const register = publicProcedure
  .input(registerSchema)
  .mutation(async ({ ctx, input }) => {
    // Check username
    const existingUser = await ctx.db.user.findFirst({
      where: {
        OR: [
          { username: input.username },
          ...(input.email ? [{ email: input.email }] : []),
        ],
      },
    });

    if (existingUser) {
      throw new TRPCError({
        code: "CONFLICT",
        message:
          existingUser.username === input.username
            ? "Username already taken"
            : "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await hash(input.password, 10);

    // Create user
    const user = await ctx.db.user.create({
      data: {
        username: input.username,
        hashedPassword: hashedPassword,
        ...(input.email && { email: input.email }),
        ...(input.name && { name: input.name }),
      },
    });

    const serverSupabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    if (input.profileImage) {
      try {
        const base64Data = input.profileImage.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, "base64");

        const { data, error } = await serverSupabase.storage
          .from("avatars")
          .upload(`${user.id}.png`, buffer, {
            upsert: true,
            contentType: "image/png",
          });

        if (error) {
          throw new Error(`Error uploading avatar: ${error.message}`);
        }

        const { data: publicUrlData } = serverSupabase.storage
          .from("avatars")
          .getPublicUrl(`${user.id}.png`);

        if (!publicUrlData) {
          throw new Error("Unable to generate public URL for the avatar.");
        }

        const publicUrl = publicUrlData.publicUrl;

        await ctx.db.user.update({
          where: { id: user.id },
          data: { uploadAva: publicUrl },
        });
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    }

    // Tạo bản ghi trong bảng Account
    const account = await ctx.db.account.create({
      data: {
        userId: user.id,
        type: "credentials",
        provider: "credentials",
        providerAccountId: user.email!,
        access_token: generateAccessToken(),
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        refresh_token: generateRefreshToken(),
        token_type: "Bearer",
        scope: "identify email",
        id_token: generateIdToken(),
      },
    });

    function generateAccessToken() {
      return randomBytes(32).toString("hex");
    }

    // Hàm tạo refresh token (chuỗi ngẫu nhiên)
    function generateRefreshToken() {
      return randomBytes(32).toString("hex");
    }

    // Hàm tạo ID token (chuỗi ngẫu nhiên)
    function generateIdToken() {
      return randomBytes(32).toString("hex");
    }

    // Tạo session cho người dùng
    const session = await ctx.db.session.create({
      data: {
        userId: user.id,
        expires: new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000),
        sessionToken: randomUUID(),
      },
    });

    return user;
  });
