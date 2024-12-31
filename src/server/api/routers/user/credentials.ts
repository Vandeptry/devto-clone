//src/server/api/routers/user/credentials.ts

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcrypt";

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

    return user;
  });
