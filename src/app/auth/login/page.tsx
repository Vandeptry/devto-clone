// src/app/auth/login/Login.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AccountButton,providers } from "~/components/ui/Provider";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  Button,
} from "~/components/ui/form";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const methods = useForm();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          {/* <Logo /> */}
          <Image
            src="/logo_devto.png"
            alt="Dev.to logo"
            width={100}
            height={80}
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {/* Continue */}
        <div className="flex flex-col gap-4">
          {providers.map((provider, index) => (
            <AccountButton key={index} provider={provider.provider}>
              Continue with {provider.text}
            </AccountButton>
          ))}
        </div>
        {/* Login */}
        <div>
          <Form {...methods}>
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
            {/* (Remember, Forgot pass) */}
            <Button type="submit">Log in</Button>
          </Form>
        </div>
        {/* Other */}
        <div className="mt-6 text-center text-sm text-gray-500">
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
          <a
            href="/"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Back to Home
          </a>
          <a
            href="/auth/register"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
}
