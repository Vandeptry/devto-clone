//src/app/Setting/EditProfile.tsx
"use client"
import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";
import { useState,useEffect } from "react";
import { IUser } from "~/app/props/interface";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  Button,
} from "~/components/ui/form";

export default function EditProfile() {
  const {data:session} = useSession();
  const [user,setUser] = useState<IUser|null>(null);
  useEffect(()=>{
    const storedUser = localStorage.getItem("user");
    if(storedUser){
      setUser(JSON.parse(storedUser) as IUser);
    }
  },[]);

  return (
    <div>
      <div className="flex flex-col rounded-lg bg-slate-100 p-8">
        <span className="mb-4 text-2xl font-semibold">User</span>
        <div className="my-2 flex flex-col gap-4">
          <label className="font-semibold">Name</label>
          <input
            className="rounded-lg border-2 p-2 outline-blue-500"
            type="text"
            placeholder=""
            defaultValue={session?.user.name??user?.name??""}
          />
        </div>
        <div className="my-2 flex flex-col gap-4">
          <label className="font-semibold">Email</label>
          <input
            className="rounded-lg border-2 p-2 outline-blue-500"
            type="text"
            defaultValue={session?.user.email??user?.email??""}
          />
          <div>
            <input type="checkbox" id="display-email" />
            <span className="mx-4 font-medium text-slate-600">
              Display email on profile
            </span>
          </div>
        </div>
        <div className="my-4 flex flex-col gap-4">
          <label className="font-semibold">Username</label>
          <input
            className="rounded-lg border-2 p-2 outline-blue-500"
            type="text"
            defaultValue={user?.username??session?.user.username??""}
          />
        </div>
        <div className="my-2 flex flex-col gap-4">
          <label className="font-semibold">Profile image</label>
          <div className="flex gap-4">
            <Image
              src={session?.user.image??session?.user.uploadAva??""}
              alt="Dev.to logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <input
              className="rounded-lg border-2 p-2 outline-blue-500"
              type="file"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col rounded-lg bg-slate-100 p-8">
        <span className="mb-6 text-2xl font-semibold">Basic</span>
        <div className="my-2 flex flex-col gap-4">
          <label className="font-semibold">Website URL</label>
          <input
            className="rounded-lg border-2 p-2 outline-blue-500"
            type="url"
            placeholder="https://yoursite.com"
          />
        </div>
        <div className="my-2 flex flex-col gap-4">
          <label className="font-semibold">Location</label>
          <input
            className="rounded-lg border-2 p-2 outline-blue-500"
            type="text"
            placeholder="VietNam"
          />
        </div>
        <div className="my-2 flex flex-col gap-4">
          <label className="font-semibold">Bio</label>
          <textarea
            className="rounded-lg border-2 p-2 outline-blue-500"
            placeholder="your bio ..."
          ></textarea>
        </div>
      </div>

      <div className="flex flex-col rounded-lg bg-slate-100 p-8">
        <span className="mb-8 text-2xl font-semibold">Branding</span>
        <div>
          <span className="font-semibold">Brand color</span>
          <p className="font-light text-slate-700">
            Used for backgrounds, borders etc.
          </p>
          <div className="border-1 rounded-xl">
            <input type="color" className="h-10 w-10 p-1" />
          </div>
        </div>
      </div>

      <div className="bg-slate-100 p-8">
        <button className="rounded-lg bg-purple-800 p-2 text-center text-white transition-colors ease-linear hover:bg-purple-900">
          Save Profile Information
        </button>
      </div>
    </div>
  );
}
