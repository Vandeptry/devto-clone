//src/server/api/routers/user/credentials.ts

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const credentialsRouter = publicProcedure
  .input(loginSchema)
  .mutation(async ({ ctx, input }) => {
    const { email, password } = input;

    const user = await ctx.db.user.findUnique({
      where: { email },
    });

    if (!user?.hashedPassword) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.hashedPassword
    );

    if (!isPasswordValid) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid password",
      });
    }
    // // Init session for credentials login
    // if (!ctx.session) {
    //   ctx.session = {
    //     user: {
    //       id: '', 
    //       email: null,
    //       name: null,
    //       image: null,
    //       uploadAva: null,
    //       username: null,
    //       joinedAt: null,
    //       profile: {
    //         bio: null,
    //         location: null,
    //         website: null,
    //         brandColor: null
    //       }
    //     },
    //     expires: new Date().toString(),
    //   };
    // }


    if (ctx.session) {
      const updatedUser = await ctx.db.user.findUnique({
        where: { email },
        include: { profile: true },
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

    return user;
  });
