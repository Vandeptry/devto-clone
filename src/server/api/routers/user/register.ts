// src/server/api/routers/user/register.ts
import { z } from "zod";
import { hash } from "bcrypt";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "~/server/api/trpc";
import { createClient } from "@supabase/supabase-js";
import { randomUUID, randomBytes } from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    try {
      // Transaction
      const user = await prisma.$transaction(
        async (tx) => {
          const existingUserCount = await tx.user.count({
            where: {
              OR: [
                { username: input.username },
                ...(input.email ? [{ email: input.email }] : []),
              ],
            },
          });

          if (existingUserCount > 0) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Username or email already exists",
            });
          }

          const hashedPassword = await hash(input.password, 10);

          // Tạo user
          const createdUser = await tx.user.create({
            data: {
              username: input.username,
              hashedPassword,
              ...(input.email && { email: input.email }),
              ...(input.name && { name: input.name }),
            },
          });

          // Tải avatar
          if (input.profileImage) {
            const serverSupabase = createClient(
              process.env.SUPABASE_URL!,
              process.env.SUPABASE_SERVICE_ROLE_KEY!,
            );

            const base64Data = input.profileImage.replace(
              /^data:image\/\w+;base64,/,
              "",
            );
            try {
              const buffer = Buffer.from(base64Data, "base64");

              const { data, error } = await serverSupabase.storage
                .from("avatars")
                .upload(`${createdUser.id}/avatar.png`, buffer, {
                  upsert: true,
                  contentType: "image/png",
                });

              // if (error) {
              //   throw new Error(`Error uploading avatar: ${error.message}`);
              // }
            } catch (error) {
              console.error("Error converting image to buffer:", error);
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Invalid image data",
              });
            }

            const { data: publicUrlData } = serverSupabase.storage
              .from("avatars")
              .getPublicUrl(`${createdUser.id}/avatar.png`);

            if (!publicUrlData) {
              throw new Error("Unable to generate public URL for the avatar.");
            }

            await tx.user.update({
              where: { id: createdUser.id },
              data: { uploadAva: publicUrlData.publicUrl },
            });
          }

          // Tạo account
          await tx.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: "credentials",
                providerAccountId: createdUser.email!,
              },
            },
            update: {},
            create: {
              userId: createdUser.id,
              type: "credentials",
              provider: "credentials",
              providerAccountId: createdUser.email!,
              access_token: randomBytes(32).toString("hex"),
              refresh_token: randomBytes(32).toString("hex"),
              token_type: "Bearer",
              expires_at: Math.floor(Date.now() / 1000) + 3600,
              scope: "identify email",
              id_token: randomBytes(32).toString("hex"),
            },
          });

          // Tạo session
          await tx.session.create({
            data: {
              userId: createdUser.id,
              sessionToken: randomUUID(),
              expires: new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000),
            },
          });

          return createdUser;
        },
        { timeout: 10000 },
      );

      return user;
    } catch (error) {
      console.error("Error during registration:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to register user",
        cause: error,
      });
    }
  });
