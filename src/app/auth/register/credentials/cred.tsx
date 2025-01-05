// src/app/auth/register/credentials/cred.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
  Button,
} from "~/components/ui/form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { Toast } from "~/components/ui/toast";
import { useToast } from "~/components/hooks/useToast";

const formSchema = z.object({
  profileImage: z.instanceof(FileList).nullable(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  passwordConfirmation: z.string().min(8, {
    message: "Password confirmation must be at least 8 characters.",
  }),
});

export default function Credentials() {
  const { toaster, dismiss } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileImage: null,
      name: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const registerMutation = api.user.register.useMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toaster?.loading("Đang đăng ký...");
    if (values.password !== values.passwordConfirmation) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const profileImageFile = values.profileImage?.[0];
      let base64String;

      if (profileImageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(profileImageFile);
        await new Promise(
          (resolve) => (reader.onload = () => resolve(reader.result)),
        );
        base64String = reader.result as string;
      } else {
        toaster.error("Vui lòng chọn ảnh");
        return;
      }

      await registerMutation.mutateAsync({
        email: values.email,
        password: values.password,
        name: values.name,
        username: values.username,
        profileImage: base64String,
      });

      toaster.success("Đăng ký thành công");
      router.push("/auth/login");
    } catch (error) {
      toaster?.error("Lỗi ảnh hoặc Email đã được sử dụng");
    } finally {
      setTimeout(dismiss, 5000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
      <Toast />
      <div className="w-full max-w-2xl space-y-8 rounded-md px-8 py-6 shadow-sm">
        <div className="flex flex-col items-center">
          <Image
            src="/logo_devto.png"
            alt="Dev.to logo"
            width={100}
            height={80}
          />
          <h2 className="mt-6 bg-gradient-to-tr from-slate-600 to-red-600 bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent lg:text-4xl">
            Create your account
          </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Image */}
            <FormField
              name="profileImage"
              render={({ field }) => (
                <FormControl
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files as FileList)}
                />
              )}
            />

            {/* Name */}
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormField
                name="name"
                render={({ field }) => (
                  <FormControl type="text" placeholder="Your name" {...field} />
                )}
              />
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>

            {/* Username */}
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormField
                name="username"
                render={({ field }) => (
                  <FormControl
                    type="text"
                    placeholder="Your username"
                    {...field}
                  />
                )}
              />
              <FormMessage>
                {form.formState.errors.username?.message}
              </FormMessage>
            </FormItem>

            {/* Email */}
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormField
                name="email"
                render={({ field }) => (
                  <FormControl
                    type="email"
                    placeholder="Your email"
                    {...field}
                  />
                )}
              />
              <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            </FormItem>

            {/* Password */}
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormField
                name="password"
                render={({ field }) => (
                  <FormControl
                    type="password"
                    placeholder="Your password"
                    {...field}
                  />
                )}
              />
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
            </FormItem>

            {/* Password Confirmation */}
            <FormItem>
              <FormLabel>Password Confirmation</FormLabel>
              <FormField
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormControl
                    type="password"
                    placeholder="Confirm your password"
                    {...field}
                  />
                )}
              />
              <FormMessage>
                {form.formState.errors.passwordConfirmation?.message}
              </FormMessage>
            </FormItem>

            <Button type="submit">Create Account</Button>
          </form>
        </Form>

        {/* navigate */}
        <div className="mt-4 flex items-center justify-center space-x-4">
          <button
            className="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => router.push("/auth/register")}
          >
            <span className="ml-3 text-xl">Back to Register</span>
          </button>
        </div>
      </div>
    </div>
  );
}
