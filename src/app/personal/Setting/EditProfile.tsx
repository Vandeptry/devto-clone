//src/app/Setting/EditProfile.tsx
"use client";
import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { IUser } from "~/app/props/interface";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  Button,
} from "~/components/ui/form";
import { api } from "~/trpc/react";

export default function EditProfile() {
  const { data: session } = useSession();
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser) as IUser);
    }
  }, []);
  const utils = api.useContext();
  const updateProfileMutation = api.user.editprofile.updateProfile.useMutation({
    async onSuccess() {
      await utils.user.editprofile.invalidate();
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const bio = formData.get("bio") as string;
    const location = formData.get("location") as string;
    const website = formData.get("website") as string;
    const brandColor = formData.get("brandColor") as string;

    let image = null;
    const imageFile = formData.get("image") as File | null;
    if (imageFile) {
      try {
        image = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(imageFile);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) =>
            reject(new Error((error.target as any)?.error?.message)); 
        });
      } catch (error) {
        alert("Lỗi cập nhật thông tin")
        console.error("Error reading image file:", error);
      }
    }

    try {
      await updateProfileMutation.mutateAsync({
        name,
        email,
        username,
        image,
        bio,
        location,
        website,
        brandColor,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* User */}
        <div className="flex flex-col rounded-lg bg-slate-100 p-8">
          <span className="mb-4 text-2xl font-semibold">User</span>
          <div className="my-2 flex flex-col gap-4">
            <label className="font-semibold">Name</label>
            <input
              className="rounded-lg border-2 p-2 outline-blue-500"
              type="text"
              name="name"
              defaultValue={session?.user.name ?? user?.name ?? ""}
            />
          </div>
          <div className="my-2 flex flex-col gap-4">
            <label className="font-semibold">Email</label>
            <input
              className="rounded-lg border-2 p-2 outline-blue-500"
              type="text"
              name="email"
              defaultValue={session?.user.email ?? user?.email ?? ""}
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
              name="username"
              defaultValue={user?.username ?? session?.user.username ?? ""}
            />
          </div>
          <div className="my-2 flex flex-col gap-4">
            <label className="font-semibold">Profile image</label>
            <div className="flex gap-4">
              {session?.user.image || session?.user.uploadAva ? (
                <Image
                  src={session?.user.image ?? session?.user.uploadAva??"public/logo_devto.png"}
                  alt="Avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              ) : null}
              <input
                className="rounded-lg border-2 p-2 outline-blue-500"
                type="file"
                name="image"
              />
            </div>
          </div>
        </div>

        {/* Basic */}
        <div className="flex flex-col rounded-lg bg-slate-100 p-8">
          <span className="mb-6 text-2xl font-semibold">Basic</span>
          <div className="my-2 flex flex-col gap-4">
            <label className="font-semibold">Website URL</label>
            <input
              className="rounded-lg border-2 p-2 outline-blue-500"
              type="url"
              name="website"
              placeholder="https://yoursite.com"
              defaultValue={
                session?.user.profile?.website ?? user?.profile?.website ?? ""
              }
            />
          </div>
          <div className="my-2 flex flex-col gap-4">
            <label className="font-semibold">Location</label>
            <input
              className="rounded-lg border-2 p-2 outline-blue-500"
              type="text"
              name="location"
              placeholder="VietNam"
              defaultValue={
                session?.user.profile?.location ?? user?.profile?.location ?? ""
              }
            />
          </div>
          <div className="my-2 flex flex-col gap-4">
            <label className="font-semibold">Bio</label>
            <textarea
              className="rounded-lg border-2 p-2 outline-blue-500"
              name="bio"
              placeholder="your bio ..."
              defaultValue={
                session?.user.profile?.bio ?? user?.profile?.bio ?? ""
              }
            ></textarea>
          </div>
        </div>

        {/* Branding */}
        <div className="flex flex-col rounded-lg bg-slate-100 p-8">
          <span className="mb-8 text-2xl font-semibold">Branding</span>
          <div>
            <span className="font-semibold">Brand color</span>
            <p className="font-light text-slate-700">
              Used for backgrounds, borders etc.
            </p>
            <div className="border-1 rounded-xl">
              <input type="color" name="brandColor" className="h-10 w-10 p-1" />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="bg-slate-100 p-8">
          <button
            type="submit"
            className="rounded-lg bg-purple-800 p-2 text-center text-white transition-colors ease-linear hover:bg-purple-900"
          >
            Save Profile Information
          </button>
        </div>
      </form>
    </div>
  );
}
