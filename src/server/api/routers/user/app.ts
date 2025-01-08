//src/server/api/routers/user/app.ts
import { createTRPCRouter } from "~/server/api/trpc";
import { register } from "./register";
import { credentialsRouter } from "./credentials";
import { editProfileRouter } from "./editProfile";

export const userRouter = createTRPCRouter({
  register,
  credentials:credentialsRouter,
  editprofile:editProfileRouter,
});
