//src/app/auth/login/Login.tsx
"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { AccountButton, providers } from "~/components/ui/Provider";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  Button,
} from "~/components/ui/form";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Toast } from "~/components/ui/toast";
import { useToast } from "~/components/hooks/useToast";
import { useSession } from "next-auth/react";
import { IUser } from "~/app/props/interface";

const LoginForm: React.FC = () => {
  const { toaster, dismiss } = useToast();
  const { data: session } = useSession();
  const methods = useForm<z.infer<typeof credentialsSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const loginMutation = api.user.credentials.useMutation();

  useGSAP(() => {
    gsap.fromTo(
      "#signin",
      {
        opacity: 0,
      },
      {
        delay: 1,
        opacity: 1,
        duration: 3,
        ease: "bounce.inOut",
      },
    );
  });

  const credentialsSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  });

  const onSubmit = async (data: z.infer<typeof credentialsSchema>) => {
    if (!data.email) {
      toaster?.error("Vui lòng nhập email!");
      return;
    }

    if (!data.password) {
      toaster?.error("Vui lòng nhập mật khẩu!");
      return;
    }

    toaster?.loading("Đang đăng nhập...");
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/",
        redirect: false,
      });

      if (result?.error) {
        toaster?.error("Email/mật khẩu không chính xác");
      } else {
        const user = await loginMutation.mutateAsync({
          email: data.email,
          password: data.password,
        });
        //fix credentials session

        toaster?.success("Đăng nhập thành công!");
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/");
      }
    } catch (error) {
      toaster?.error("Đăng nhập thất bại!");
    } finally {
      setTimeout(dismiss, 2000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
      <Toast />
      <div className="w-full max-w-2xl space-y-8 rounded-md px-8 py-6 shadow-sm">
        <div className="flex flex-col items-center">
          {/* <Logo /> */}
          <Image
            src="/logo_devto.png"
            alt="Dev.to logo"
            width={100}
            height={80}
          />
          <h2
            id="signin"
            className="mt-6 bg-clip-text text-center text-3xl font-bold lg:text-4xl"
          >
            Sign in to your account
          </h2>
        </div>
        {/* Continue */}
        <div className="flex flex-col gap-4">
          {providers.map((provider, index) => (
            <AccountButton
              key={index}
              provider={provider.provider}
              onClick={() =>
                void signIn(provider.provider.id, { callbackUrl: "/" })
              }
            >
              <span className="text-xl"> Continue with {provider.text}</span>
            </AccountButton>
          ))}
        </div>
        {/* Login */}
        <div>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {" "}
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormControl type="email" id="email" {...field} />
                  )}
                />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormControl type="password" id="password" {...field} />
                  )}
                />
              </FormItem>
              <Button type="submit">Log in</Button>
            </form>
          </Form>
        </div>
        {/* Other */}
        <div className="mt-6 text-center text-sm text-gray-500 lg:text-xl">
          By signing in, you are agreeing to our{" "}
          <Link
            href="/policy/PP"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            privacy policy
          </Link>
          ,{" "}
          <Link
            href="/policy/ToU"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            terms of use
          </Link>{" "}
          and{" "}
          <Link
            href="/policy/CoC"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            code of conduct
          </Link>
          .
        </div>
        {/* navigate */}
        <div className="mt-4 flex items-center justify-center space-x-4">
          <Link href="/">
            <span className="text-xl font-medium text-indigo-500 transition-all duration-100 ease-linear hover:text-indigo-700">
              Back to Home
            </span>
          </Link>
          <Link href="/auth/register">
            <span className="text-xl font-medium text-slate-500 transition-all duration-100 ease-linear hover:text-red-700">
              Sign up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
