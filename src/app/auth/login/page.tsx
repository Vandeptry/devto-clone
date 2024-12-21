// src/app/auth/login/Login.tsx
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
import { signIn } from "next-auth/react";
import gsap from "gsap";
import {useGSAP} from '@gsap/react'

export default function Login() {
  const methods = useForm();
  useGSAP(()=>{
    gsap.fromTo('#signin',{
      opacity:0
    },{
      delay:1,
      opacity:1,
      duration:3,
      ease: 'bounce.inOut'
    })
  })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-tr from-cyan-100 to-red-100">
      <div className="w-full max-w-2xl space-y-8 border-2 py-6 px-8 rounded-md shadow-md shadow-slate-600">
        <div className="flex flex-col items-center">
          {/* <Logo /> */}
          <Image
            src="/logo_devto.png"
            alt="Dev.to logo"
            width={100}
            height={80}
          />
          <h2 id="signin" className="mt-6 text-center lg:text-4xl text-3xl font-bold tracking-tight bg-gradient-to-tr from-red-600 to-slate-600 text-transparent bg-clip-text">
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
        <div className="mt-6 text-center text-sm lg:text-xl text-gray-500 ">
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
          <Link
            href="/"
          >
            <span className="text-xl font-medium text-indigo-500 hover:text-indigo-700 transition-all duration-100 ease-linear">Back to Home</span>
          </Link>
          <Link
            href="/auth/register"
        
          >
            <span className="text-xl font-medium text-slate-500 hover:text-red-700 transition-all duration-100 ease-linear">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
