// src/app/auth/register/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { AccountButton, providers } from "~/components/ui/Provider";
import { signIn } from "next-auth/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail } from "lucide-react";

export default function Register() {
  useGSAP(() => {
    gsap.fromTo(
      "#signup",
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
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
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
            id="signup"
            className="mt-6 to-red-600 bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent lg:text-4xl"
          >
            Create to your account
          </h2>
        </div>
        {/* Sign up */}
        <div className="flex flex-col gap-4">
          {providers.map((provider, index) => (
            <AccountButton
              key={index}
              provider={provider.provider}
              onClick={() =>
                void signIn(provider.provider.id, { callbackUrl: "/" })
              }
            >
              <span className="text-xl"> Sign up with {provider.text}</span>
            </AccountButton>
          ))}
          <Link href='/auth/register/credentials' className="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="h-6 w-6" style={{ fontSize: "25px" }}>
                <Mail className="text-yellow-700"/>
              </span>
            </span>
            <span className="ml-3 text-xl">Sign up with Email</span>
          </Link>
        </div>
        {/* Other */}
        <div className="mt-6 text-center text-sm text-gray-500 lg:text-xl">
          By signing up, you are agreeing to our{" "}
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
          <Link href="/auth/login">
            <span className="text-xl font-medium text-slate-500 transition-all duration-100 ease-linear hover:text-red-700">
              Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
