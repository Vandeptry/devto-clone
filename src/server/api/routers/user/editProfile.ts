// src/server/api/routers/user/editProfile.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const editProfileSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email(),
  username: z.string().optional(),
  image: z.string().nullable().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  brandColor: z.string().optional(),
});

export const editProfileRouter = createTRPCRouter({
  updateProfile: publicProcedure
    .input(editProfileSchema.partial())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;

      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      try {
        await prisma.$transaction(
          async (tx) => {
            let avatarUrl = null;

            // Xử lý ảnh
            if (input.image) {
              const serverSupabase = createClient(
                process.env.SUPABASE_URL!,
                process.env.SUPABASE_SERVICE_ROLE_KEY!,
              );

              // Xóa ảnh cũ
              await serverSupabase.storage
                .from("avatars")
                .remove([`${userId}/avatar.png`]);

              // Upload ảnh mới
              const base64Data = input.image.replace(
                /^data:image\/\w+;base64,/,
                "",
              );
              try {
                const buffer = Buffer.from(base64Data, "base64");

                await serverSupabase.storage
                  .from("avatars")
                  .upload(`${userId}/avatar.png`, buffer, {
                    upsert: true,
                    contentType: "image/png",
                  });

                // Lấy public URL
                const { data } = serverSupabase.storage
                  .from("avatars")
                  .getPublicUrl(`${userId}/avatar.png`);

                avatarUrl = data?.publicUrl;

                if (!avatarUrl) {
                  throw new Error(
                    "Unable to generate public URL for the avatar.",
                  );
                }
              } catch (error) {
                console.error("Error converting image to buffer:", error);
                throw new TRPCError({
                  code: "BAD_REQUEST",
                  message: "Invalid image data",
                });
              }
            }

            // Cập nhật User
            await tx.user.update({
              where: { id: userId },
              data: {
                name: input.name,
                email: input.email,
                username: input.username,
                // Chỉ cập nhật avatarUrl nếu có ảnh mới
                ...(avatarUrl && { image: avatarUrl, uploadAva: avatarUrl }),
              },
            });

            // Cập nhật Profile
            await tx.profile.upsert({
              where: { userId: userId },
              update: {
                bio: input.bio,
                location: input.location,
                website: input.website,
                brandColor: input.brandColor,
              },
              create: {
                userId: userId,
                bio: input.bio,
                location: input.location,
                website: input.website,
                brandColor: input.brandColor,
              },
            });
            if (ctx.session) {
              const updatedUser = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                  uploadAva: true,
                  username: true,
                  joinedAt: true,
                  profile: {
                    select: {
                      bio: true,
                      location: true,
                      website: true,
                      brandColor: true,
                    },
                  },
                },
              });
              if (updatedUser) {
                ctx.session.user = updatedUser;
              } else {
                throw new TRPCError({
                  code: "INTERNAL_SERVER_ERROR",
                  message: "Failed to update session",
                });
              }
            }
          },
          { timeout: 10000 },
        );
      } catch (error) {
        console.error(error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
